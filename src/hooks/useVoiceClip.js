import { useCallback, useEffect, useRef, useState } from 'react';
import { createVoiceGate, VOICE_DEFAULTS } from '../utils/voice-gate.js';

/**
 * Plays an audio file (mp3/wav/ogg…) and makes the avatar react as if it were TTS: the loudness of the file goes through the
 * same lip-sync analyser, and a hysteresis gate decides when to switch to the talk frames (`.ania` `audio.talkThreshold`).
 * Works for 2D (.ania frames) and 3D avatars because it only needs: lipSync.connectAudioElement/getRms and controller.setTalkingState.
 *
 * @param {object} o
 * @param {object} o.lipSync            result of useLipSync (needs connectAudioElement, getRms)
 * @param {() => ({setTalkingState:(b:boolean)=>void}|null)} o.getController   where talk frames are switched
 * @param {{talkThreshold?:number, silenceThreshold?:number}} [o.thresholds]
 */
export function useVoiceClip({ lipSync, getController, thresholds = VOICE_DEFAULTS } = {}) {
  const [state, setState] = useState('idle');   // idle | playing | error
  const [error, setError] = useState('');
  const audioRef = useRef(null), rafRef = useRef(0), gateRef = useRef(null), urlRef = useRef(null), talkingRef = useRef(false);
  const live = useRef({ lipSync, getController });
  live.current = { lipSync, getController };
  if (!gateRef.current) gateRef.current = createVoiceGate(thresholds);
  useEffect(() => { gateRef.current.configure(thresholds); }, [thresholds?.talkThreshold, thresholds?.silenceThreshold]);

  const setTalking = (v) => { try { live.current.getController?.()?.setTalkingState?.(v); } catch { /* controller gone */ } };

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current); rafRef.current = 0;
    const a = audioRef.current;
    if (a) { a.onended = a.onerror = null; try { a.pause(); } catch { /* already stopped */ } }
    audioRef.current = null;
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
    gateRef.current.reset(); talkingRef.current = false; setTalking(false);
    setState((s) => (s === 'error' ? s : 'idle'));
  }, []);
  useEffect(() => stop, [stop]);

  /** @param {File|Blob|string} source  a File/Blob from an <input>, or a URL */
  const play = useCallback(async (source) => {
    stop(); setError('');
    try {
      const url = typeof source === 'string' ? source : URL.createObjectURL(source);
      if (typeof source !== 'string') urlRef.current = url;
      const audio = new Audio(url); audio.crossOrigin = 'anonymous'; audioRef.current = audio;
      live.current.lipSync?.connectAudioElement?.(audio);
      audio.onended = () => stop();
      audio.onerror = () => { stop(); setError('Não consegui tocar este áudio. Use um arquivo mp3, wav ou ogg.'); setState('error'); };
      await audio.play();
      setState('playing');
      let last = performance.now();
      const tick = (now) => {
        if (audioRef.current !== audio) return;
        const dt = now - last; last = now;
        const level = live.current.lipSync?.getRms?.() ?? 0;
        const talking = gateRef.current.update(level, dt);
        if (typeof window !== 'undefined' && window.__voiceClipProbe) window.__voiceClipProbe.push([Math.round(now), +Number(level).toFixed(3), talking ? 1 : 0, audio.currentTime]);
        if (talking !== talkingRef.current) { talkingRef.current = talking; setTalking(talking); }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch (e) {
      stop(); setState('error');
      setError(e?.name === 'NotAllowedError' ? 'O navegador bloqueou o som. Clique de novo para tocar.' : 'Não consegui tocar este áudio.');
    }
  }, [stop]);

  return { play, stop, state, error, playing: state === 'playing' };
}
