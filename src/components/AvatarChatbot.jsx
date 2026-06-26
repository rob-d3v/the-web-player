import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Volume2, Send, Mic, MicOff, Paperclip, X, Image } from 'lucide-react';
import { AniaAvatar } from './AniaAvatar.jsx';
import { THEMES } from '../constants/themes.js';
import { createTranslator } from '../i18n/index.js';
import { useTTSDetection } from '../hooks/useTTSDetection.js';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition.js';
import { useChatbot } from '../hooks/useChatbot.js';
import { useLipSync } from '../hooks/useLipSync.js';
import { useActionFrames } from '../hooks/useActionFrames.js';
import { usePlugins } from '../hooks/usePlugins.js';
import { useWakeWord } from '../hooks/useWakeWord.js';
import { preloadPiper } from '../services/piper-tts.js';
import { executeCommand, installPostMessageControl } from '../utils/commands.js';
import { TTS_PROVIDER_TO_PLUGIN, STT_PROVIDER_TO_PLUGIN } from '../plugins/builtins.js';

// Stable empty-array identity for the plugins prop default (see EMPTY_ACTIONS).
const EMPTY_PLUGINS = [];

// Stable empty-array identity so `actions || EMPTY_ACTIONS` doesn't hand
// useActionFrames a new array every render (which would loop its effect).
const EMPTY_ACTIONS = [];

export const AvatarChatbot = ({
  avatarUrl,
  avatarPassword,
  avatarData,
  authToken,
  webhookUrl,
  position = "bottom-right",
  width = 400,
  height = 300,
  transparent = false,
  theme = "dark",
  enableTTS = true,
  autoGreeting = true,
  idleSpeed = 1,
  talkSpeed = 1,
  autoCalculateSpeed = true,
  showSpeedControls = false,
  startMinimized = false,
  preserveQuality = true,
  /** Força o avatar sempre acima de todos os outros elementos (default: true) */
  alwaysOnTop = true,
  talkStartDelay = 0,
  postTalkDelay = 1500,
  minTalkDuration = 800,
  minIdleDuration = 400,
  ttsVoice = "auto",
  ttsGender = "auto",
  ttsRate = 1,
  ttsPitch = 1,
  ttsLang = "pt-BR",
  ttsProvider = "browser",
  ttsApiKey = null,
  ttsApiUrl = null,
  ttsVoiceId = null,
  ttsModel = null,
  enableSTT = false,
  sttProvider = "browser",
  sttLang = "pt-BR",
  sttContinuous = false,
  sttInterimResults = true,
  sttApiKey = null,
  sttApiUrl = null,
  sttAutoSend = true,
  transparentChat = false,
  // New props
  assistantName = "Assistant",
  userName = "You",
  enableAttachments = false,
  // i18n: locale for built-in UI strings (greetings, button titles, aria/labels).
  // Defaults to 'pt-BR' to preserve the library's original wording. Pass any
  // BCP-47 code shipped under src/i18n/strings (en, es, fr, ja, ...). Unknown
  // codes fall back to the base language, then to English.
  locale = "pt-BR",
  // Consumer override table { key: string | string[] } — supply your own copy
  // for any built-in string without forking the component (e.g.
  // { "chat.enableSound": "Turn on sound", greetings: ["Hey!"] }).
  messagesOverride = null,
  // n8n authentication
  webhookApiKey = null,
  webhookHeaders = {},
  // Lip sync props
  lipSyncEnabled = false,
  lipSyncServerUrl = null,
  lipSyncIntensity = 0.6,
  lipSyncResponsiveness = 0.5,
  lipSyncSustainStyle = null,
  lipSyncWiggleSpeed = null,
  // Action frame props
  actions = null,
  enableActionHotkeys = true,
  // Initial action props
  initialAction = null,
  initialActionLoop = false,
  // Piper TTS props
  piperModelUrl = null,
  piperModelConfigUrl = null,
  piperPitch = 1,
  piperSpeed = 1,
  // When true, the ~84 MB onnx model + WASM are fetched eagerly at mount
  // (instant first voice, but every page load pays the download). Default
  // false = lazy: the model is fetched only when the user first opens the
  // chat, keeping it off the page-load critical path.
  piperPreload = false,
  // ---- Plugin architecture ----
  // Consumer-supplied custom plugins (custom TTS/STT/action/integration). The
  // library built-ins are always registered; these are added on top and can
  // override a built-in by reusing its id.
  plugins = null,
  // Force the active provider for a subsystem by plugin id. When null, the
  // legacy ttsProvider/sttProvider props select the built-in provider.
  activeTtsPlugin = null,
  activeSttPlugin = null,
  // Receives the PluginRegistry once it's ready (escape hatch for advanced use).
  onPluginsReady = null,
  // ---- Wake word ----
  wakeWordEnabled = false,
  wakeWordModelUrl = null,
  wakeWordThreshold = 0.5,
  wakeWordWasmPaths = undefined,
  onWake = null,
  // ---- External control (postMessage) ----
  enablePostMessageControl = false,
  postMessageOrigins = null,
  onClose
}) => {
  // i18n translator (memoised on locale + override). `tr.t(key, vars)` for
  // scalar strings, `tr.list(key)` for the greeting/waiting arrays.
  const tr = useMemo(
    () => createTranslator(locale, messagesOverride || undefined),
    [locale, messagesOverride]
  );

  const [inputMessage, setInputMessage] = useState("");
  const [avatarRef, setAvatarRef] = useState(null);
  const [systemMessages, setSystemMessages] = useState([]);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [currentIdleSpeed, setCurrentIdleSpeed] = useState(idleSpeed);
  const [currentTalkSpeed, setCurrentTalkSpeed] = useState(talkSpeed);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [isCurrentlyMinimized, setIsCurrentlyMinimized] = useState(startMinimized);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const hasGreetedRef = useRef(false);
  const speakRef = useRef(null);
  const greetingPendingRef = useRef(null);
  const previousMinimizedRef = useRef(startMinimized);
  const sttTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const sttRestartTimeoutRef = useRef(null);
  const piperPreloadedRef = useRef(false);
  const speakFnRef = useRef(null);
  const cancelTtsRef = useRef(null);
  const sendMessageRef = useRef(null);

  // ---- Plugin registry ----
  // Built-ins are always registered; the legacy ttsProvider/sttProvider props
  // pick the active built-in unless an explicit activeTtsPlugin/activeSttPlugin
  // id is given. Custom `plugins` are layered on top.
  const pluginsApi = usePlugins({
    plugins: plugins || EMPTY_PLUGINS,
    activeTts: activeTtsPlugin || TTS_PROVIDER_TO_PLUGIN[ttsProvider] || null,
    activeStt: activeSttPlugin || STT_PROVIDER_TO_PLUGIN[sttProvider] || null,
  });
  const pluginRegistry = pluginsApi.registry;

  useEffect(() => {
    if (onPluginsReady) onPluginsReady(pluginRegistry);
  }, [onPluginsReady, pluginRegistry]);

  // Kick off the Piper model download + WASM compile exactly once. The
  // ~84 MB onnx fetch is the single heaviest thing this widget pulls, so
  // we keep it OFF the page-load critical path by default and only call
  // this when the user signals intent to interact (opens the chat). Hosts
  // that want instant first voice can opt into eager preload via the
  // `piperPreload` prop. Fire-and-forget; never blocks render.
  const ensurePiperPreload = useCallback(() => {
    if (piperPreloadedRef.current) return;
    if (!enableTTS || ttsProvider !== 'piper' || !piperModelUrl) return;
    if (typeof window === 'undefined') return;
    piperPreloadedRef.current = true;
    preloadPiper(piperModelUrl, piperModelConfigUrl).catch((err) => {
      console.warn('[AvatarChatbot] Piper preload failed (will retry on demand):', err);
    });
  }, [enableTTS, ttsProvider, piperModelUrl, piperModelConfigUrl]);

  // Eager preload only when the host explicitly opts in. Otherwise the
  // model stays unfetched until the user first opens the chat (see
  // handleMinimizeToggle), so a fresh visitor's first paint is not stuck
  // behind an 84 MB download on a slow connection.
  useEffect(() => {
    if (!piperPreload) return;
    if (typeof window === 'undefined') return;
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(ensurePiperPreload, { timeout: 2000 });
      return () => window.cancelIdleCallback && window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(ensurePiperPreload, 0);
    return () => window.clearTimeout(id);
  }, [piperPreload, ensurePiperPreload]);

  const { isTalking, speak, cancel, audioRef: ttsAudioRef } = useTTSDetection({
    pauseThreshold: 350,
    idleTransitionDelay: postTalkDelay,
    talkStartDelay: talkStartDelay,
    minTalkDuration: minTalkDuration,
    minIdleDuration: minIdleDuration,
    onTalkStart: () => {},
    onTalkEnd: () => {},
    ttsProvider: ttsProvider,
    ttsConfig: {
      ttsApiKey,
      ttsApiUrl,
      ttsVoiceId,
      ttsModel,
      ttsLang,
      ttsGender,
      ttsRate,
      ttsPitch,
      piperModelUrl,
      piperModelConfigUrl,
      piperPitch,
      piperSpeed
    }
  });

  // Lip sync hook — Web Audio FFT analysis
  const lipSync = useLipSync({ enabled: lipSyncEnabled && ttsProvider !== 'browser' });

  // Connect TTS audio to lip sync when it plays
  useEffect(() => {
    if (!lipSyncEnabled || !ttsAudioRef?.current) return;
    lipSync.connectAudioElement(ttsAudioRef.current);
  }, [lipSyncEnabled, ttsAudioRef?.current]);

  // Action frames state
  const animationController = avatarRef?.playerRef?.current?.animationController || null;
  const { activeAction, availableActions, triggerAction: triggerActionFrame, cancelAction: cancelActionFrame } = useActionFrames({
    actions: actions || EMPTY_ACTIONS,
    enabled: isAvatarLoaded,
    enableHotkeys: enableActionHotkeys,
    animationController,
    onActionStart: undefined,
    onActionEnd: undefined
  });

  const {
    isListening,
    transcript: sttTranscript,
    interimTranscript,
    startListening,
    stopListening,
    clearTranscript
  } = useSpeechRecognition({
    sttProvider,
    sttLang,
    sttContinuous: true,
    sttInterimResults,
    sttApiKey,
    sttApiUrl,
    onTranscriptChange: (text, isFinal) => {
      if (!isFinal && sttInterimResults) {
        setInputMessage(text);
      }
    },
    onFinalTranscript: (text) => {
      setInputMessage(text);
      if (sttAutoSend && text.trim()) {
        if (sttTimeoutRef.current) {
          clearTimeout(sttTimeoutRef.current);
        }
        sttTimeoutRef.current = setTimeout(() => {
          if (text.trim()) {
            handleSendWithText(text.trim());
            clearTranscript();
          }
        }, 800);
      }
    },
    onEnd: () => {
      if (enableSTT && isListening) {
        if (sttRestartTimeoutRef.current) {
          clearTimeout(sttRestartTimeoutRef.current);
        }
        sttRestartTimeoutRef.current = setTimeout(() => {
          startListening();
        }, 300);
      }
    },
    onError: (error) => {
      if (error.message !== 'no-speech' && error.message !== 'aborted') {
        setSystemMessages((prev) => [
          ...prev,
          {
            id: "error-" + Date.now(),
            role: "assistant",
            content: tr.t("chat.stt.heardError"),
            timestamp: new Date().toISOString(),
            isError: true,
          },
        ]);
      }
      if (enableSTT && isListening) {
        if (sttRestartTimeoutRef.current) {
          clearTimeout(sttRestartTimeoutRef.current);
        }
        sttRestartTimeoutRef.current = setTimeout(() => {
          startListening();
        }, 500);
      }
    },
  });

  useEffect(() => {
    speakRef.current = speak;
    speakFnRef.current = speak;
    cancelTtsRef.current = cancel;
  }, [speak, cancel]);

  useEffect(() => {
    if (enableTTS && !ttsEnabled && isAvatarLoaded && !isCurrentlyMinimized) {
      const timer = setTimeout(() => {
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance("");
          window.speechSynthesis.speak(utterance);
        }
        setTtsEnabled(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAvatarLoaded, isCurrentlyMinimized, enableTTS, ttsEnabled]);

  useEffect(() => {
    if (isListening && interimTranscript) {
      setInputMessage(interimTranscript);
    }
  }, [interimTranscript, isListening]);

  const handleMicToggle = async () => {
    if (isListening) {
      stopListening();
    } else {
      clearTranscript();
      const success = await startListening();
      if (!success) {
        setSystemMessages((prev) => [
          ...prev,
          {
            id: "error-" + Date.now(),
            role: "assistant",
            content: tr.t("chat.stt.micAccessError"),
            timestamp: new Date().toISOString(),
            isError: true,
          },
        ]);
      }
    }
  };

  const selectVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();

    if (ttsVoice && ttsVoice !== "auto") {
      const voice = voices.find(v => v.name === ttsVoice);
      if (voice) {
        return voice;
      }
    }

    let filteredVoices = voices.filter(v => v.lang.startsWith(ttsLang.split('-')[0]));

    if (filteredVoices.length === 0) {
      filteredVoices = voices.filter(v => v.lang.startsWith('en'));
    }

    if (ttsGender !== "auto") {
      const genderKeywords = {
        male: ['male', 'macho', 'homem', 'masculino', 'masculina', 'carlos', 'pedro', 'daniel', 'man', 'david', 'mark', 'wavenet-b', 'wavenet-d', 'standard-b', 'standard-d'],
        female: ['female', 'mulher', 'feminino', 'feminina', 'maria', 'ana', 'lucia', 'woman', 'samantha', 'victoria', 'zira', 'wavenet-a', 'wavenet-c', 'standard-a', 'standard-c']
      };

      const keywords = genderKeywords[ttsGender] || [];
      const oppositeKeywords = genderKeywords[ttsGender === 'male' ? 'female' : 'male'] || [];

      const genderVoices = filteredVoices.filter(v =>
        keywords.some(keyword => v.name.toLowerCase().includes(keyword))
      );

      if (genderVoices.length > 0) {
        filteredVoices = genderVoices;
      } else {
        const nonOppositeVoices = filteredVoices.filter(v =>
          !oppositeKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
        );

        if (nonOppositeVoices.length > 0) {
          filteredVoices = nonOppositeVoices;
        }
      }

      const localVoices = filteredVoices.filter(v => v.localService);
      if (localVoices.length > 0) {
        filteredVoices = localVoices;
      }
    }

    return filteredVoices[0] || voices[0];
  }, [ttsVoice, ttsGender, ttsLang]);

  const handleEnableSound = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("");
      window.speechSynthesis.speak(utterance);
    }
    setTtsEnabled(true);
  };

  const handleMinimizeToggle = (isMinimized) => {
    setIsCurrentlyMinimized(isMinimized);

    // User opened the chat = first real signal of intent. Start the lazy
    // Piper model download now (no-op if already started or eager-preloaded)
    // so by the time they send a message the model is likely warm.
    if (!isMinimized) {
      ensurePiperPreload();
    }

    if (!isMinimized && previousMinimizedRef.current && enableTTS && !ttsEnabled && isAvatarLoaded) {
      handleEnableSound();
    }

    previousMinimizedRef.current = isMinimized;
  };

  const { messages, sendMessage, isLoading, error } = useChatbot({
    webhookUrl,
    webhookApiKey,
    webhookHeaders,
    availableActions,
    onActionTriggered: (actionId) => {
      if (triggerActionFrame) triggerActionFrame(actionId);
    },
    onResponse: (botMessage) => {
      if (enableTTS && ttsEnabled && botMessage.content) {
        speak(botMessage.content, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }
    },
    onError: (err, friendlyMessage) => {
      if (enableTTS && ttsEnabled && friendlyMessage && speakRef.current) {
        speakRef.current(friendlyMessage, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }
    }
  });

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  // ---- Command context (drives executeCommand / postMessage control) ----
  const buildCommandCtx = useCallback(() => ({
    player: avatarRef?.playerRef?.current || null,
    getActions: () => availableActions.map((a) => ({ id: a.id, name: a.name })),
    triggerAction: (id) => { if (triggerActionFrame) triggerActionFrame(id); },
    cancelAction: () => { if (cancelActionFrame) cancelActionFrame(); },
    setSpeeds: (idle, talk) => {
      handleIdleSpeedChange(idle);
      handleTalkSpeedChange(talk);
    },
    setVisible: (v) => setIsCurrentlyMinimized(!v),
    getVisible: () => !isCurrentlyMinimized,
    speak: (text, opts) => {
      if (speakFnRef.current) {
        speakFnRef.current(text, {
          lang: ttsLang, rate: ttsRate, pitch: ttsPitch, voice: selectVoice(),
          cancelPrevious: true, ...opts
        });
      }
    },
    ask: (text) => { if (sendMessageRef.current) sendMessageRef.current(text); },
    stopSpeaking: () => { if (cancelTtsRef.current) cancelTtsRef.current(); },
    triggerWake: () => { if (onWake) onWake(); else if (wakeTriggerRef.current) wakeTriggerRef.current(); },
    logger: console,
  }), [avatarRef, availableActions, triggerActionFrame, cancelActionFrame, isCurrentlyMinimized, ttsLang, ttsRate, ttsPitch, selectVoice, onWake]);

  // Imperative command runner exposed to consumers via onPluginsReady ctx and
  // used internally by wake/postMessage.
  const runCommand = useCallback((line) => executeCommand(line, buildCommandCtx()), [buildCommandCtx]);

  // ---- Wake word ----
  // Default greeting-style wake action: open the chat + speak a greeting, like
  // the desktop wake pipeline. Hosts can override via onWake.
  const wakeTriggerRef = useRef(null);
  useEffect(() => {
    wakeTriggerRef.current = () => {
      setIsCurrentlyMinimized(false);
      ensurePiperPreload();
    };
  }, [ensurePiperPreload]);

  useWakeWord({
    enabled: wakeWordEnabled && !!wakeWordModelUrl,
    modelUrl: wakeWordModelUrl,
    threshold: wakeWordThreshold,
    wasmPaths: wakeWordWasmPaths,
    onWake: () => {
      if (onWake) onWake();
      else if (wakeTriggerRef.current) wakeTriggerRef.current();
    },
    onError: (err) => console.warn('[AvatarChatbot] Wake word error:', err),
  });

  // ---- postMessage external control ----
  useEffect(() => {
    if (!enablePostMessageControl) return;
    const uninstall = installPostMessageControl(buildCommandCtx(), {
      origins: postMessageOrigins || [],
    });
    return uninstall;
  }, [enablePostMessageControl, postMessageOrigins, buildCommandCtx]);

  useEffect(() => {
    if (!autoGreeting || hasGreetedRef.current || !isAvatarLoaded) return;

    const greetings = tr.list("greetings");
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    greetingPendingRef.current = randomGreeting;

    const timer = setTimeout(() => {
      hasGreetedRef.current = true;
      setSystemMessages([{
        id: "greeting-" + Date.now(),
        role: "assistant",
        content: randomGreeting,
        timestamp: (new Date()).toISOString()
      }]);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [autoGreeting, isAvatarLoaded]);

  useEffect(() => {
    if (ttsEnabled && greetingPendingRef.current && speakRef.current && !isCurrentlyMinimized) {
      const greetingText = greetingPendingRef.current;
      greetingPendingRef.current = null;
      setTimeout(() => {
        speakRef.current(greetingText, {
          lang: ttsLang,
          rate: ttsRate,
          pitch: ttsPitch,
          voice: selectVoice(),
          cancelPrevious: true
        });
      }, 500);
    }
  }, [ttsEnabled, isCurrentlyMinimized]);

  const allMessages = [...systemMessages, ...messages];

  useEffect(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    var _a, _b;
    if (!((_b = (_a = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a.current) == null ? void 0 : _b.animationController)) {
      return;
    }
    const controller = avatarRef.playerRef.current.animationController;
    if (controller.isTalking === isTalking) {
      return;
    }
    controller.setTalkingState(isTalking);
  }, [isTalking, avatarRef]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newAttachments.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          type: file.type,
          size: file.size,
          preview: file.type.startsWith('image/') ? event.target.result : null,
          data: event.target.result
        });
        if (newAttachments.length === files.length) {
          setAttachments((prev) => [...prev, ...newAttachments]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSendWithText = async (text) => {
    if (!text.trim() || isLoading) return;
    const message = text.trim();
    const currentAttachments = [...attachments];
    setAttachments([]);

    const waitingList = tr.list("waiting");
    const randomWaiting = waitingList[Math.floor(Math.random() * waitingList.length)];
    let waitingShown = false;
    let waitingMsgId = null;
    const waitingTimer = setTimeout(() => {
      if (isLoading) {
        waitingShown = true;
        waitingMsgId = "waiting-" + Date.now();
        setSystemMessages((prev) => [...prev, {
          id: waitingMsgId,
          role: "assistant",
          content: randomWaiting,
          timestamp: (new Date()).toISOString(),
          isWaiting: true
        }]);
        if (enableTTS && ttsEnabled && speakRef.current) {
          speakRef.current(randomWaiting, { lang: ttsLang });
        }
      }
    }, 500);

    await sendMessage(message, {
      attachments: currentAttachments.map(a => ({
        name: a.name,
        type: a.type,
        size: a.size,
        data: a.data
      }))
    });
    clearTimeout(waitingTimer);
    if (waitingShown && waitingMsgId) {
      setSystemMessages((prev) => prev.filter((msg) => msg.id !== waitingMsgId));
    }
  };

  const handleSend = async () => {
    if ((!inputMessage.trim() && attachments.length === 0) || isLoading) return;
    const message = inputMessage.trim();
    const currentAttachments = [...attachments];
    setInputMessage("");
    setAttachments([]);

    const waitingList = tr.list("waiting");
    const randomWaiting = waitingList[Math.floor(Math.random() * waitingList.length)];
    let waitingShown = false;
    let waitingMsgId = null;
    const waitingTimer = setTimeout(() => {
      if (isLoading) {
        waitingShown = true;
        waitingMsgId = "waiting-" + Date.now();
        setSystemMessages((prev) => [...prev, {
          id: waitingMsgId,
          role: "assistant",
          content: randomWaiting,
          timestamp: (new Date()).toISOString(),
          isWaiting: true
        }]);
        if (enableTTS && ttsEnabled && speakRef.current) {
          speakRef.current(randomWaiting, { lang: ttsLang });
        }
      }
    }, 500);

    await sendMessage(message, {
      attachments: currentAttachments.map(a => ({
        name: a.name,
        type: a.type,
        size: a.size,
        data: a.data
      }))
    });
    clearTimeout(waitingTimer);
    if (waitingShown && waitingMsgId) {
      setSystemMessages((prev) => prev.filter((msg) => msg.id !== waitingMsgId));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleIdleSpeedChange = (speed) => {
    var _a, _b;
    setCurrentIdleSpeed(speed);
    if ((_b = (_a = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a.current) == null ? void 0 : _b.animationController) {
      avatarRef.playerRef.current.animationController.setIdleSpeed(speed);
    }
  };

  const handleTalkSpeedChange = (speed) => {
    var _a, _b;
    setCurrentTalkSpeed(speed);
    if ((_b = (_a = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a.current) == null ? void 0 : _b.animationController) {
      avatarRef.playerRef.current.animationController.setTalkSpeed(speed);
    }
  };

  return jsx(
    AniaAvatar,
    {
      avatarUrl,
      avatarPassword,
      avatarData,
      authToken,
      position,
      width,
      height,
      transparent,
      theme,
      locale,
      messagesOverride,
      minimizable: true,
      closable: true,
      idleSpeed: currentIdleSpeed,
      talkSpeed: currentTalkSpeed,
      autoCalculateSpeed,
      preserveQuality,
      alwaysOnTop,
      startMinimized: startMinimized || !isAvatarLoaded,
      // Lip sync passthrough
      lipSyncEnabled,
      lipSyncServerUrl,
      lipSyncIntensity,
      lipSyncResponsiveness,
      lipSyncSustainStyle,
      lipSyncWiggleSpeed,
      lipSyncHook: lipSyncEnabled ? lipSync : null,
      // Action frames passthrough
      actions,
      enableActionHotkeys,
      // Initial action passthrough
      initialAction,
      initialActionLoop,
      onLoad: (player) => {
        setAvatarRef({ playerRef: { current: player } });
        setIsAvatarLoaded(true);
      },
      onToggleMinimize: handleMinimizeToggle,
      onClose,
      children: jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          minHeight: 0,
          overflow: "hidden"
        },
        children: [

          // ========== ÁREA DE MENSAGENS ==========
          jsxs("div", {
            style: {
              flex: "1 1 auto",
              minHeight: "60px",
              maxHeight: `max(120px, calc(100vh - ${height + 180}px))`,
              overflowY: "auto",
              padding: "12px 16px",
              WebkitOverflowScrolling: "touch"
            },
            children: [
              // Lista de mensagens
              allMessages.map((msg) => {
                const isUser = msg.role === "user";
                return jsx("div", {
                  key: msg.id,
                  style: {
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    marginBottom: "12px"
                  },
                  children: jsxs("div", {
                    style: { maxWidth: "80%" },
                    children: [
                      // Nome do remetente
                      jsx("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: "600",
                          marginBottom: "4px",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          display: "inline-block",
                          backgroundColor: isUser ? "#3b82f6" : "#ffffff",
                          color: isUser ? "#ffffff" : "#374151",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        },
                        children: isUser ? userName : assistantName
                      }),
                      // Balão da mensagem
                      jsxs("div", {
                        style: {
                          padding: "12px 18px",
                          borderRadius: "20px",
                          borderBottomLeftRadius: isUser ? "20px" : "6px",
                          borderBottomRightRadius: isUser ? "6px" : "20px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          backgroundColor: isUser ? "#3b82f6" : "#ffffff",
                          color: isUser ? "#ffffff" : "#1f2937",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                        },
                        children: [
                          // Attachments
                          msg.attachments && msg.attachments.length > 0 && jsx("div", {
                            style: { marginBottom: "10px", display: "flex", flexWrap: "wrap", gap: "8px" },
                            children: msg.attachments.map((att, idx) =>
                              att.type && att.type.startsWith("image/")
                                ? jsx("img", {
                                    key: idx,
                                    src: att.data || att.preview,
                                    alt: att.name,
                                    style: { maxWidth: "120px", maxHeight: "80px", borderRadius: "12px", objectFit: "cover" }
                                  })
                                : jsx("span", {
                                    key: idx,
                                    style: {
                                      padding: "4px 10px",
                                      borderRadius: "12px",
                                      fontSize: "11px",
                                      backgroundColor: isUser ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                                      color: isUser ? "#ffffff" : "#6b7280"
                                    },
                                    children: att.name
                                  })
                            )
                          }),
                          msg.content
                        ]
                      })
                    ]
                  })
                });
              }),

              // Loading indicator
              isLoading && jsx("div", {
                style: { display: "flex", justifyContent: "flex-start", marginBottom: "12px" },
                children: jsxs("div", {
                  style: { maxWidth: "80%" },
                  children: [
                    jsx("div", {
                      style: {
                        fontSize: "11px",
                        fontWeight: "600",
                        marginBottom: "4px",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        display: "inline-block",
                        backgroundColor: "#ffffff",
                        color: "#374151",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                      },
                      children: assistantName
                    }),
                    jsx("div", {
                      style: {
                        padding: "12px 18px",
                        borderRadius: "20px",
                        borderBottomLeftRadius: "6px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        display: "flex",
                        gap: "6px"
                      },
                      children: [
                        jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6", animation: "bounce 1s infinite" } }),
                        jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6", animation: "bounce 1s infinite 0.15s" } }),
                        jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3b82f6", animation: "bounce 1s infinite 0.3s" } })
                      ]
                    })
                  ]
                })
              }),

              jsx("div", { ref: messagesEndRef })
            ]
          }),

          // ========== BOTÃO ENABLE SOUND ==========
          enableTTS && !ttsEnabled && jsx("div", {
            style: { padding: "8px 16px", flexShrink: 0 },
            children: jsxs("button", {
              onClick: handleEnableSound,
              style: {
                width: "100%",
                padding: "14px 20px",
                borderRadius: "16px",
                border: "none",
                backgroundColor: "#f97316",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(249,115,22,0.4)"
              },
              children: [
                jsx(Volume2, { size: 20 }),
                tr.t("chat.enableSound")
              ]
            })
          }),

          // ========== SPEED CONTROLS ==========
          showSpeedControls && jsx("div", {
            style: {
              margin: "0 16px 12px",
              padding: "14px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              flexShrink: 0
            },
            children: jsxs("div", {
              style: { display: "flex", flexDirection: "column", gap: "10px" },
              children: [
                jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  jsx("span", { style: { fontSize: "12px", color: "#6b7280", width: "40px" }, children: tr.t("chat.speed.idle") }),
                  jsx("input", { type: "range", min: "0.25", max: "10", step: "0.25", value: currentIdleSpeed, onChange: (e) => handleIdleSpeedChange(parseFloat(e.target.value)), style: { flex: 1 } }),
                  jsx("span", { style: { fontSize: "12px", fontWeight: "600", color: "#374151", width: "45px", textAlign: "right" }, children: currentIdleSpeed.toFixed(2) + "x" })
                ]}),
                jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  jsx("span", { style: { fontSize: "12px", color: "#6b7280", width: "40px" }, children: tr.t("chat.speed.talk") }),
                  jsx("input", { type: "range", min: "0.25", max: "10", step: "0.25", value: currentTalkSpeed, onChange: (e) => handleTalkSpeedChange(parseFloat(e.target.value)), style: { flex: 1 } }),
                  jsx("span", { style: { fontSize: "12px", fontWeight: "600", color: "#374151", width: "45px", textAlign: "right" }, children: currentTalkSpeed.toFixed(2) + "x" })
                ]})
              ]
            })
          }),

          // ========== PREVIEW DE ATTACHMENTS ==========
          attachments.length > 0 && jsx("div", {
            style: {
              margin: "0 16px 12px",
              padding: "12px",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexWrap: "wrap",
              flexShrink: 0,
              gap: "8px"
            },
            children: attachments.map((att) => jsx("div", {
              key: att.id,
              style: { position: "relative" },
              children: [
                att.preview
                  ? jsx("img", { src: att.preview, alt: att.name, style: { width: "60px", height: "60px", objectFit: "cover", borderRadius: "12px" } })
                  : jsx("div", { style: { width: "60px", height: "60px", borderRadius: "12px", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }, children: jsx(Paperclip, { size: 20, color: "#9ca3af" }) }),
                jsx("button", {
                  onClick: () => removeAttachment(att.id),
                  style: { position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#ef4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
                  children: jsx(X, { size: 12, color: "#ffffff" })
                })
              ]
            }))
          }),

          // ========== BARRA DE INPUT ==========
          jsxs("div", {
            style: { padding: "8px 12px", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 },
            children: [
              // Botão anexar
              enableAttachments && jsx("button", {
                onClick: () => fileInputRef.current?.click(),
                disabled: isLoading,
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                },
                children: jsx(Paperclip, { size: 18, color: "#6b7280" })
              }),
              enableAttachments && jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: "image/*,.pdf,.doc,.docx,.txt", onChange: handleFileSelect, style: { display: "none" } }),

              // Input de texto
              jsx("input", {
                type: "text",
                value: inputMessage,
                onChange: (e) => setInputMessage(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: isListening ? tr.t("chat.input.listening") : tr.t("chat.input.placeholder"),
                disabled: isLoading,
                style: {
                  flex: "1 1 0%",
                  minWidth: 0,
                  padding: "12px 16px",
                  borderRadius: "24px",
                  border: isListening ? "2px solid #ef4444" : "2px solid #e5e7eb",
                  backgroundColor: isListening ? "#fef2f2" : "#ffffff",
                  fontSize: "14px",
                  color: "#1f2937",
                  outline: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  boxSizing: "border-box"
                }
              }),

              // Botão mic
              enableSTT && jsx("button", {
                onClick: handleMicToggle,
                disabled: isLoading,
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: isListening ? "#ef4444" : "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isListening ? "0 4px 12px rgba(239,68,68,0.4)" : "0 4px 12px rgba(0,0,0,0.15)"
                },
                children: isListening ? jsx(MicOff, { size: 18, color: "#ffffff" }) : jsx(Mic, { size: 18, color: "#6b7280" })
              }),

              // Botão enviar
              jsx("button", {
                onClick: handleSend,
                disabled: (!inputMessage.trim() && attachments.length === 0) || isLoading,
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: (!inputMessage.trim() && attachments.length === 0) || isLoading ? "#d1d5db" : "#3b82f6",
                  cursor: (!inputMessage.trim() && attachments.length === 0) || isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(59,130,246,0.4)"
                },
                children: jsx(Send, { size: 18, color: "#ffffff" })
              }),

              // Indicador TTS falando
              enableTTS && isTalking && jsx("div", {
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(34,197,94,0.4)"
                },
                children: jsx(Volume2, { size: 18, color: "#ffffff" })
              })
            ]
          }),

          // ========== FEEDBACK DE TRANSCRIÇÃO ==========
          isListening && jsx("div", {
            style: {
              margin: "0 12px 8px",
              padding: "8px 12px",
              flexShrink: 0,
              borderRadius: "20px",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              jsx("div", { style: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: interimTranscript ? "#ef4444" : "#22c55e" } }),
              jsx("span", { style: { color: "#6b7280" }, children: interimTranscript ? tr.t("chat.stt.transcribing") : tr.t("chat.stt.micActive") }),
              interimTranscript && jsx("span", { style: { color: "#1f2937", fontWeight: "500" }, children: interimTranscript })
            ]
          }),

          // ========== ERRO ==========
          error && jsx("div", {
            style: {
              margin: "0 12px 8px",
              padding: "8px 12px",
              flexShrink: 0,
              borderRadius: "20px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              fontSize: "12px",
              color: "#dc2626"
            },
            children: error
          })
        ]
      })
    }
  );
};
