import { useRef, useCallback, useEffect } from 'react';

/**
 * useLipSync — Web Audio FFT analysis for mouth movement.
 *
 * Robustness notes (the "mouth stopped moving" class of bugs):
 * - An AudioContext created outside a user-gesture task starts `suspended`,
 *   and a context can also be suspended by the browser when the tab is
 *   backgrounded. A media element ROUTED through a suspended context is
 *   silent AND its analyser reads zeros (mouth shut). So the context is
 *   resumed aggressively: at connect time, on visibilitychange, on the next
 *   user gesture, and (throttled) from the read path itself — the animation
 *   loop calling getAmplitude() is exactly the moment we know we need it.
 * - `createMediaElementSource()` works ONCE per element, ever. Sources are
 *   cached per element (WeakMap) so a reconnect of the same element reuses
 *   ITS source — never another element's (routing chunk B's analyser to
 *   chunk A's dead source is how the mouth silently dies mid-queue).
 * - One persistent context + one analyser; per chunk we only swap which
 *   source feeds the analyser.
 */
export const useLipSync = ({ enabled = false, fftSize = 2048, smoothing = 0.8 } = {}) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  const prevSpectrumRef = useRef(null);
  const connectedElementRef = useRef(null);
  // audioElement -> MediaElementAudioSourceNode (valid for that element's ctx)
  const elementSourcesRef = useRef(typeof WeakMap !== 'undefined' ? new WeakMap() : null);
  const resumeListenersRef = useRef(null);
  const lastResumeKickRef = useRef(0);

  const getOrCreateContext = useCallback(() => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Try to move a suspended context to running. Safe to call often; resume()
  // is a no-op on a running context and the promise rejection (no user
  // activation yet) is swallowed — a later kick will succeed.
  const kickResume = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || ctx.state !== 'suspended') return;
    const now = Date.now();
    if (now - lastResumeKickRef.current < 250) return; // throttle
    lastResumeKickRef.current = now;
    try { ctx.resume().catch(() => {}); } catch (e) {}
  }, []);

  // Global self-heal hooks, installed once: a backgrounded tab can suspend the
  // context, and the FIRST context creation may happen outside a gesture. Any
  // return-to-tab or user gesture re-arms it.
  const installResumeListeners = useCallback(() => {
    if (resumeListenersRef.current || typeof document === 'undefined') return;
    const onVisibility = () => { if (!document.hidden) kickResume(); };
    const onGesture = () => { kickResume(); };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointerdown', onGesture, { passive: true });
    window.addEventListener('keydown', onGesture);
    resumeListenersRef.current = () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
    };
  }, [kickResume]);

  const connectAudioElement = useCallback((audioElement) => {
    if (!enabled || !audioElement) return;
    if (connectedElementRef.current === audioElement && analyserRef.current) {
      kickResume();
      return;
    }

    try {
      const ctx = getOrCreateContext();
      installResumeListeners();
      if (ctx.state === 'suspended') kickResume();

      // One analyser per context, reused across chunks.
      if (!analyserRef.current || analyserRef.current.context !== ctx) {
        if (analyserRef.current) {
          try { analyserRef.current.disconnect(); } catch (e) {}
        }
        const analyser = ctx.createAnalyser();
        analyser.fftSize = fftSize;
        analyser.smoothingTimeConstant = smoothing;
        analyser.connect(ctx.destination);
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
        prevSpectrumRef.current = new Float32Array(analyser.frequencyBinCount);
      }
      const analyser = analyserRef.current;

      // Detach the previous chunk's source. Sources only ever connect to the
      // analyser, so this fully unlinks the old element's graph path.
      if (sourceRef.current) {
        try { sourceRef.current.disconnect(); } catch (e) {}
      }

      // A media element can be sourced exactly once, ever. Reuse the source
      // that belongs to THIS element; never borrow another element's.
      let source = elementSourcesRef.current ? elementSourcesRef.current.get(audioElement) : null;
      if (source && source.context !== ctx) {
        // Element is bound to a dead/closed context — it cannot be re-routed.
        // Leave it un-analysed rather than wiring the analyser to garbage.
        console.warn('[useLipSync] Audio element belongs to a closed AudioContext; skipping analyser hookup');
        return;
      }
      if (!source) {
        source = ctx.createMediaElementSource(audioElement);
        if (elementSourcesRef.current) elementSourcesRef.current.set(audioElement, source);
      }

      source.connect(analyser);
      sourceRef.current = source;
      connectedElementRef.current = audioElement;
    } catch (err) {
      console.warn('[useLipSync] Failed to connect audio:', err);
    }
  }, [enabled, fftSize, smoothing, getOrCreateContext, installResumeListeners, kickResume]);

  const getSpectralOpenness = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return 0;
    const ctx = audioContextRef.current;
    if (!ctx) return 0;
    // Self-heal from the read path: the animation loop asking for data IS the
    // signal that lip sync should be live right now.
    if (ctx.state !== 'running') { kickResume(); return 0; }

    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    analyser.getByteFrequencyData(data);

    const sampleRate = ctx.sampleRate;
    const binSize = sampleRate / analyser.fftSize;

    // Speech frequency range: 85-3000 Hz
    const lowBin = Math.floor(85 / binSize);
    const highBin = Math.min(data.length - 1, Math.ceil(3000 / binSize));

    let sum = 0;
    let count = 0;
    for (let i = lowBin; i <= highBin; i++) {
      sum += data[i];
      count++;
    }

    if (count === 0) return 0;
    return Math.min(1, (sum / count) / 255);
  }, [kickResume]);

  const getSpectralFlux = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !prevSpectrumRef.current) return 0;
    const ctx = audioContextRef.current;
    if (ctx && ctx.state !== 'running') { kickResume(); return 0; }

    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    const prev = prevSpectrumRef.current;
    analyser.getByteFrequencyData(data);

    let flux = 0;
    const len = Math.min(data.length, prev.length);
    for (let i = 0; i < len; i++) {
      const diff = (data[i] / 255) - prev[i];
      if (diff > 0) flux += diff;
      prev[i] = data[i] / 255;
    }

    return Math.min(1, flux / (len * 0.1));
  }, [kickResume]);

  const getAmplitude = useCallback(() => {
    if (!analyserRef.current) return 0;
    const ctx = audioContextRef.current;
    if (ctx && ctx.state !== 'running') { kickResume(); return 0; }
    const analyser = analyserRef.current;
    const timeData = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(timeData);

    let maxAmp = 0;
    for (let i = 0; i < timeData.length; i++) {
      const amp = Math.abs(timeData[i] - 128) / 128;
      if (amp > maxAmp) maxAmp = amp;
    }
    return maxAmp;
  }, [kickResume]);

  const disconnect = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.disconnect(); } catch (e) {}
      sourceRef.current = null;
    }
    if (analyserRef.current) {
      try { analyserRef.current.disconnect(); } catch (e) {}
      analyserRef.current = null;
    }
    connectedElementRef.current = null;
    dataArrayRef.current = null;
    prevSpectrumRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
      if (resumeListenersRef.current) {
        resumeListenersRef.current();
        resumeListenersRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [disconnect]);

  return {
    connectAudioElement,
    getSpectralOpenness,
    getSpectralFlux,
    getAmplitude,
    disconnect,
    isConnected: () => !!connectedElementRef.current
  };
};
