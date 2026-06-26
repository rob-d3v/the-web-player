import { useRef, useState, useCallback, useEffect } from 'react';
import { professionalTTSRequest } from '../services/tts-api.js';

export const useTTSDetection = ({
  pauseThreshold = 150,
  idleTransitionDelay = 400,
  talkStartDelay = 0,
  minTalkDuration = 500,
  minIdleDuration = 300,
  onTalkStart,
  onTalkEnd,
  ttsProvider = "browser",
  ttsConfig = {}
} = {}) => {
  const [isTalking, setIsTalking] = useState(false);
  const pauseTimeoutRef = useRef(null);
  const idleTransitionTimeoutRef = useRef(null);
  const talkStartTimeoutRef = useRef(null);
  const currentUtteranceRef = useRef(null);
  const lastBoundaryTimeRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const audioRef = useRef(null);
  const lastTalkActivationRef = useRef(null);
  const lastIdleActivationRef = useRef(null);

  const activateTalk = useCallback(() => {
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    if (talkStartTimeoutRef.current) return;

    const now = Date.now();
    const timeSinceIdle = lastIdleActivationRef.current ? now - lastIdleActivationRef.current : Infinity;

    if (timeSinceIdle < minIdleDuration) {
      return;
    }

    const doActivate = () => {
      lastTalkActivationRef.current = Date.now();
      setIsTalking((prev) => {
        if (!prev) {
          if (onTalkStart) onTalkStart();
        }
        return true;
      });
      talkStartTimeoutRef.current = null;
    };

    if (talkStartDelay > 0) {
      talkStartTimeoutRef.current = setTimeout(doActivate, talkStartDelay);
    } else {
      doActivate();
    }
  }, [onTalkStart, talkStartDelay, minIdleDuration]);

  const deactivateTalk = useCallback(() => {
    const now = Date.now();
    const timeSinceTalk = lastTalkActivationRef.current ? now - lastTalkActivationRef.current : Infinity;

    const effectiveDelay = Math.max(idleTransitionDelay, minTalkDuration - timeSinceTalk);

    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
    }

    idleTransitionTimeoutRef.current = setTimeout(() => {
      lastIdleActivationRef.current = Date.now();
      setIsTalking((prev) => {
        if (prev) {
          if (onTalkEnd) onTalkEnd();
        }
        return false;
      });
      idleTransitionTimeoutRef.current = null;
    }, effectiveDelay);
  }, [idleTransitionDelay, onTalkEnd, minTalkDuration]);

  const resetPauseTimeout = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    activateTalk();
  }, [activateTalk]);

  const speak = useCallback(async (text, options = {}) => {
    const keylessProviders = ['tiktok', 'piper'];
    if (ttsProvider !== "browser" && (ttsConfig.ttsApiKey || keylessProviders.includes(ttsProvider))) {
      if (options.cancelPrevious && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsTalking(false);
        if (onTalkEnd) onTalkEnd();
      }

      try {
        const { audioUrl } = await professionalTTSRequest(text, ttsProvider, ttsConfig);

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onplay = () => {
          isSpeakingRef.current = true;
          resetPauseTimeout();
        };

        audio.onended = () => {
          isSpeakingRef.current = false;
          audioRef.current = null;
          URL.revokeObjectURL(audioUrl);

          if (idleTransitionTimeoutRef.current) {
            clearTimeout(idleTransitionTimeoutRef.current);
          }
          idleTransitionTimeoutRef.current = setTimeout(() => {
            setIsTalking(false);
            if (onTalkEnd) onTalkEnd();
            idleTransitionTimeoutRef.current = null;
          }, idleTransitionDelay);
        };

        audio.onerror = (error) => {
          isSpeakingRef.current = false;
          setIsTalking(false);
          if (onTalkEnd) onTalkEnd();
          audioRef.current = null;
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
        return audio;

      } catch (error) {
        // Fallback to browser TTS
      }
    }

    if (!window.speechSynthesis) {
      return;
    }

    if (options.cancelPrevious && (currentUtteranceRef.current || window.speechSynthesis.speaking)) {
      window.speechSynthesis.cancel();
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
        idleTransitionTimeoutRef.current = null;
      }
      isSpeakingRef.current = false;
      setIsTalking(false);
      if (onTalkEnd) onTalkEnd();
      currentUtteranceRef.current = null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || "pt-BR";
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    if (options.voice) {
      utterance.voice = options.voice;
    }
    currentUtteranceRef.current = utterance;

    utterance.onstart = () => {
      isSpeakingRef.current = true;
      lastBoundaryTimeRef.current = Date.now();
      resetPauseTimeout();
    };

    utterance.onboundary = (event) => {
      lastBoundaryTimeRef.current = Date.now();
      resetPauseTimeout();
    };

    utterance.onend = () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (talkStartTimeoutRef.current) {
        clearTimeout(talkStartTimeoutRef.current);
        talkStartTimeoutRef.current = null;
      }
      isSpeakingRef.current = false;
      lastBoundaryTimeRef.current = null;
      currentUtteranceRef.current = null;

      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
      }
      idleTransitionTimeoutRef.current = setTimeout(() => {
        setIsTalking(false);
        if (onTalkEnd) onTalkEnd();
        idleTransitionTimeoutRef.current = null;
      }, idleTransitionDelay);
    };

    utterance.onerror = (event) => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
        idleTransitionTimeoutRef.current = null;
      }
      isSpeakingRef.current = false;
      lastBoundaryTimeRef.current = null;
      if (event.error !== "interrupted") {
        setIsTalking(false);
        if (onTalkEnd) onTalkEnd();
      }
      currentUtteranceRef.current = null;
    };

    utterance.onpause = () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
        idleTransitionTimeoutRef.current = null;
      }
      setIsTalking(false);
      if (onTalkEnd) onTalkEnd();
    };

    utterance.onresume = () => {
      resetPauseTimeout();
    };

    window.speechSynthesis.speak(utterance);
    return utterance;
  }, [onTalkStart, onTalkEnd, resetPauseTimeout, ttsProvider, ttsConfig, idleTransitionDelay]);

  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    if (idleTransitionTimeoutRef.current) {
      clearTimeout(idleTransitionTimeoutRef.current);
      idleTransitionTimeoutRef.current = null;
    }
    isSpeakingRef.current = false;
    lastBoundaryTimeRef.current = null;
    currentUtteranceRef.current = null;
    setIsTalking(false);
    if (onTalkEnd) onTalkEnd();
  }, [onTalkEnd]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      if (idleTransitionTimeoutRef.current) {
        clearTimeout(idleTransitionTimeoutRef.current);
      }
      if (talkStartTimeoutRef.current) {
        clearTimeout(talkStartTimeoutRef.current);
      }
    };
  }, []);

  return {
    isTalking,
    speak,
    cancel,
    audioRef
  };
};
