import { useRef, useCallback, useEffect } from 'react';

export const useLipSync = ({ enabled = false, fftSize = 2048, smoothing = 0.8 } = {}) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  const prevSpectrumRef = useRef(null);
  const connectedElementRef = useRef(null);

  const getOrCreateContext = useCallback(() => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const connectAudioElement = useCallback((audioElement) => {
    if (!enabled || !audioElement) return;
    if (connectedElementRef.current === audioElement && analyserRef.current) return;

    try {
      const ctx = getOrCreateContext();
      if (ctx.state === 'suspended') ctx.resume();

      if (sourceRef.current) {
        try { sourceRef.current.disconnect(); } catch (e) {}
      }
      if (analyserRef.current) {
        try { analyserRef.current.disconnect(); } catch (e) {}
      }

      const analyser = ctx.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = smoothing;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      prevSpectrumRef.current = new Float32Array(analyser.frequencyBinCount);

      // Try to create source — may fail if already created for this element
      let source;
      try {
        source = ctx.createMediaElementSource(audioElement);
      } catch (e) {
        // Element already has a source, try to reuse
        if (sourceRef.current) {
          source = sourceRef.current;
        } else {
          console.warn('[useLipSync] Cannot create source for audio element:', e);
          return;
        }
      }
      sourceRef.current = source;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      connectedElementRef.current = audioElement;
    } catch (err) {
      console.warn('[useLipSync] Failed to connect audio:', err);
    }
  }, [enabled, fftSize, smoothing, getOrCreateContext]);

  const getSpectralOpenness = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return 0;

    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    analyser.getByteFrequencyData(data);

    const ctx = audioContextRef.current;
    if (!ctx) return 0;

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
  }, []);

  const getSpectralFlux = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !prevSpectrumRef.current) return 0;

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
  }, []);

  const getAmplitude = useCallback(() => {
    if (!analyserRef.current) return 0;
    const analyser = analyserRef.current;
    const timeData = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(timeData);

    let maxAmp = 0;
    for (let i = 0; i < timeData.length; i++) {
      const amp = Math.abs(timeData[i] - 128) / 128;
      if (amp > maxAmp) maxAmp = amp;
    }
    return maxAmp;
  }, []);

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
