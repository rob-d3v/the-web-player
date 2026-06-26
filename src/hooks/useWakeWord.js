/**
 * useWakeWord — React hook around the WakeWordEngine.
 *
 * Loads the ONNX model from `modelUrl`, opens the mic, runs the openWakeWord
 * chain, and fires `onWake` whenever the detection score crosses `threshold`.
 * Default OFF: nothing happens until `enabled` is true and a `modelUrl` is
 * provided. Degrades gracefully when onnxruntime-web is absent.
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { WakeWordEngine } from '../services/wake-word.js';

export const useWakeWord = ({
  enabled = false,
  modelUrl = null,
  threshold = 0.5,
  wasmPaths = undefined,
  onWake,
  onError,
  onScore,
} = {}) => {
  const engineRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  // Keep callbacks fresh without re-creating the engine.
  const onWakeRef = useRef(onWake);
  const onErrorRef = useRef(onError);
  const onScoreRef = useRef(onScore);
  useEffect(() => { onWakeRef.current = onWake; }, [onWake]);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);
  useEffect(() => { onScoreRef.current = onScore; }, [onScore]);

  const getEngine = useCallback(() => {
    if (!engineRef.current) engineRef.current = new WakeWordEngine();
    return engineRef.current;
  }, []);

  const load = useCallback(async () => {
    if (!modelUrl) return false;
    try {
      const engine = getEngine();
      if (!engine.isModelLoaded()) {
        await engine.loadModel(modelUrl, { wasmPaths });
      }
      setIsLoaded(true);
      setError(null);
      return true;
    } catch (err) {
      setError(err);
      setIsLoaded(false);
      if (onErrorRef.current) onErrorRef.current(err);
      return false;
    }
  }, [modelUrl, wasmPaths, getEngine]);

  const start = useCallback(async () => {
    if (!modelUrl) return false;
    const ok = await load();
    if (!ok) return false;
    const engine = getEngine();
    const started = await engine.startListening({
      threshold,
      onDetect: () => { if (onWakeRef.current) onWakeRef.current(); },
      onError: (err) => {
        setError(err);
        if (onErrorRef.current) onErrorRef.current(err);
      },
      onScore: (s) => {
        setScore(s);
        if (onScoreRef.current) onScoreRef.current(s);
      },
    });
    setIsListening(started);
    return started;
  }, [modelUrl, threshold, load, getEngine]);

  const stop = useCallback(async () => {
    if (engineRef.current) await engineRef.current.stopListening();
    setIsListening(false);
  }, []);

  // Auto start/stop on `enabled`.
  useEffect(() => {
    let cancelled = false;
    if (enabled && modelUrl) {
      start().catch(() => {});
    } else {
      stop().catch(() => {});
    }
    return () => {
      cancelled = true;
      stop().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, modelUrl, threshold]);

  // Dispose on unmount.
  useEffect(() => () => {
    if (engineRef.current) engineRef.current.dispose().catch(() => {});
    engineRef.current = null;
  }, []);

  return { isListening, isLoaded, score, error, start, stop, load };
};
