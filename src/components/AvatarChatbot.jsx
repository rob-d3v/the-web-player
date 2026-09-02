import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Volume2, Send, Mic, MicOff, Paperclip, X, Image } from 'lucide-react';
import { AniaAvatar } from './AniaAvatar.jsx';
import { THEMES } from '../constants/themes.js';
import { createTranslator } from '../i18n/index.js';
import { useTTSDetection } from '../hooks/useTTSDetection.js';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition.js';
import { useChatbot } from '../hooks/useChatbot.js';
import { useFlowEngine } from '../hooks/useFlowEngine.js';
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

// ── Flow INPUT-node field helpers ──────────────────────────────────────────
// Map a flow `input.type` to the right DOM <input type>, virtual-keyboard hint
// (inputMode), and autocomplete token so mobile keyboards + browser autofill
// behave for lead-gen fields (name / tel / email). `textarea` is handled by the
// component (renders a <textarea>), so these only cover the <input> path.
function flowInputDomType(type) {
  switch (type) {
    case 'email': return 'email';
    case 'tel': return 'tel';
    case 'number': return 'number';
    default: return 'text';
  }
}
function flowInputMode(type) {
  switch (type) {
    case 'email': return 'email';
    case 'tel': return 'tel';
    case 'number': return 'numeric';
    default: return 'text';
  }
}
function flowInputAutocomplete(input) {
  if (!input) return 'off';
  // Prefer an explicit hint keyed off type; fall back to a name-like key heuristic.
  switch (input.type) {
    case 'email': return 'email';
    case 'tel': return 'tel';
    default: break;
  }
  const key = String(input.key || '').toLowerCase();
  if (/mail/.test(key)) return 'email';
  if (/phone|whats|tel|cel|fone/.test(key)) return 'tel';
  if (/name|nome/.test(key)) return 'name';
  return 'on';
}

const AvatarChatbotWidget = ({
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
  // Forwarded to <AniaAvatar>. Percentage of viewport HEIGHT the avatar stage
  // may take once the chat is open; the requested `height` still wins whenever
  // it is smaller. Lower it when the conversation matters more than the face.
  avatarMaxHeightVh = 34,
  // How the avatar bitmap fits its stage (contain/cover/fill) — forwarded to the
  // inner AniaAvatar so a host (e.g. the site avatar tuned on /test-avatar) can
  // pin the framing it chose.
  fit = 'contain',
  // Minimized framing: false (default) = whole avatar, smaller (no crop);
  // true = classic cropped badge. Forwarded to the inner AniaAvatar.
  cropMinimized = false,
  enableTTS = true,
  autoGreeting = true,
  // undefined = inherit the file's authored speed (creator intent); a number is
  // an explicit override. See AniaAvatar's speed-precedence note.
  idleSpeed = undefined,
  talkSpeed = undefined,
  autoCalculateSpeed = true,
  // Playback is held to 24-30 fps by default so every avatar looks
  // consistent. `false` restores the legacy unbounded behaviour;
  // `{min, max}` sets a custom window. Forwarded to <AniaAvatar>.
  fpsClamp = undefined,
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
  // ---- Streaming / chunked TTS ----
  // When true (default), a long reply is split at sentence boundaries and
  // spoken sentence-by-sentence through a queue: the first sentence starts
  // fast and the next is synthesized while the current one plays. Set false to
  // fall back to one-shot whole-text synthesis (legacy behavior).
  ttsChunking = true,
  // Pause inserted between spoken chunks, in milliseconds. The audio already
  // carries each sentence's trailing silence, so this is just a short breath.
  chunkGapMs = 250,
  // Optional: hard-wrap chunks longer than this many chars (0 = off) so a
  // comma-spliced run-on still streams.
  maxChunkChars = 0,
  // Cap ONLY the first spoken chunk (chars) so the very first synthesis is
  // short and speech starts fast; the rest streams behind it (0 = off).
  firstChunkMaxChars = 100,
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
  // Constant fields merged into EVERY webhook POST body — the host's way of
  // telling the backend something the widget itself does not know (tenant,
  // route context, campaign...). Merged FIRST, so it can never overwrite
  // `message`, `attachments` or the flow metadata. Default `null` = the body
  // is byte-for-byte what it was before this prop existed.
  extraPayload = null,
  // A stable per-browser id is sent with every message so the backend can keep
  // visitors' conversations apart. `false` opts out — note that without it the
  // backend cannot distinguish visitors and may merge them. It is a persistent
  // identifier, so it belongs in the host's privacy notice; Global Privacy
  // Control is honoured automatically.
  deviceIdEnabled = true,
  // Client-side responder override. When provided, the chat calls this instead
  // of POSTing to webhookUrl — receives (message, metadata), returns the reply
  // (a string, or an object with { message, attachments?, action? }). Use it for
  // a fake/mock provider, local testing, or a custom AI client. No webhookUrl
  // required. See useChatbot.
  onSendMessage,
  // Lip sync props
  // Default ON since 1.13.0. The sweep model works fully without any openness
  // map — branch C never consults one — so this costs nothing and no network.
  lipSyncEnabled = true,
  // null = origem padrão da API ANIA (ver AniaAvatar / lip-sync-api.js).
  lipSyncServerUrl = null,
  // Com lip sync ligado, baixa sozinho a melhor config publicada para este
  // avatar (contentHash) e aplica; false = só o que veio no .ania + props.
  // Default OFF since 1.13.0, deliberately paired with lipSyncEnabled going ON.
  // Leaving BOTH on would make every host page issue a third-party request to
  // the lip sync server on mount: a CSP break, a privacy-notice item, and a new
  // hard dependency in the first-paint path. Not an acceptable side effect of a
  // rendering fix. Maps authored into the .ania still work with zero network.
  lipSyncAutoFetch = false,
  lipSyncConfigId = null,
  lipSyncMaxCandidates = 5,
  onLipSyncConfig = null,
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
  // ---- Robs Voice TTS (on-device neural pt-BR, beta) ----
  // Base dir holding acoustic.onnx + vocoder.onnx + robsvoice.json, OR set the
  // three explicit urls below. Active when ttsProvider="robsvoice".
  robsVoiceUrl = null,
  robsAcousticUrl = null,
  robsVocoderUrl = null,
  robsManifestUrl = null,
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
  // ---- NO-AI bubble/balloon flow engine ----
  // A deterministic decision-tree flow. When set, the avatar speaks each node's
  // prompt and the user answers by tapping clickable bubbles (no LLM until an
  // explicit escalation). Omit it and behavior is identical to today.
  flow = null,
  // Optional URL to fetch a flow JSON from (ignored when `flow` is supplied).
  flowUrl = null,
  // Opaque app/tenant id forwarded to capture/escalation callbacks (for CRM).
  appId = null,
  // Fired on every captured answer: ({ sessionId, appId, key, value, collected }).
  onFlowCapture = null,
  // Fired when the flow escalates: ({ collected, contact, sessionId, transcript }).
  // Defaults to forwarding an escalation message to the webhook (sendMessage).
  onFlowEscalate = null,
  // Known-user fields pre-seeded into the flow's `collected` (e.g. { name, email }
  // from the host app's auth/session) so the chat already knows a signed-in user.
  initialContext = null,
  // Persist { sessionId, collected, currentNodeId } to localStorage so a
  // returning visitor in the same browser is remembered (default true).
  persist = true,
  // Override the localStorage key (default `ania-flow-<appId|flowId>`).
  persistKey = null,
  // A `collected` key gating persistence (LGPD): nothing is written until
  // `collected[consentKey]` is truthy. Unset = host owns its own consent gating.
  flowConsentKey = null,
  onClose
}) => {
  // i18n translator (memoised on locale + override). `tr.t(key, vars)` for
  // scalar strings, `tr.list(key)` for the greeting/waiting arrays.
  const tr = useMemo(
    () => createTranslator(locale, messagesOverride || undefined),
    [locale, messagesOverride]
  );

  // Inject the flow-bubble appear animation + hover/lift keyframes once. Mirrors
  // AniaAvatar's keyframe-injection pattern (no runtime CSS dependency).
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'ania-flow-keyframes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent =
      '@keyframes ania-flow-pop{0%{opacity:0;transform:translateY(8px) scale(0.96);}100%{opacity:1;transform:translateY(0) scale(1);}}' +
      '.ania-flow-bubble{transition:transform .15s ease,box-shadow .15s ease,filter .15s ease;}' +
      '.ania-flow-bubble:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.22);filter:brightness(1.04);}' +
      '.ania-flow-bubble:active{transform:translateY(0) scale(0.98);}' +
      // Message entrance: small rise + fade, once, per bubble.
      '@keyframes ania-msg-in{0%{opacity:0;transform:translateY(6px);}100%{opacity:1;transform:translateY(0);}}' +
      '.ania-msg-in{animation:ania-msg-in .22s cubic-bezier(0.22,1,0.36,1) both;}' +
      // Transcript scrollbar: thin + quiet, never a gray slab.
      '.ania-chat-scroll{scrollbar-width:thin;scrollbar-color:rgba(100,116,139,0.35) transparent;overscroll-behavior:contain;}' +
      '.ania-chat-scroll::-webkit-scrollbar{width:6px;}' +
      '.ania-chat-scroll::-webkit-scrollbar-track{background:transparent;}' +
      '.ania-chat-scroll::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.35);border-radius:999px;}' +
      // Text input focus ring (inline styles cannot express :focus).
      '.ania-chat-input{transition:border-color .15s ease,box-shadow .15s ease;}' +
      '.ania-chat-input:focus{border-color:#6366f1 !important;box-shadow:0 0 0 3px rgba(99,102,241,0.18) !important;}' +
      // Round icon buttons: gentle press/hover feedback.
      '.ania-chat-iconbtn{transition:transform .12s ease,box-shadow .12s ease,background-color .12s ease;}' +
      '.ania-chat-iconbtn:not(:disabled):hover{transform:translateY(-1px);}' +
      '.ania-chat-iconbtn:not(:disabled):active{transform:scale(0.94);}' +
      '@media (prefers-reduced-motion: reduce){' +
        '.ania-msg-in,.ania-flow-bubble{animation:none !important;}' +
        '.ania-flow-bubble,.ania-chat-iconbtn{transition:none !important;}' +
      '}';
    document.head.appendChild(style);
  }, []);

  const [inputMessage, setInputMessage] = useState("");
  const [avatarRef, setAvatarRef] = useState(null);
  const [systemMessages, setSystemMessages] = useState([]);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [currentIdleSpeed, setCurrentIdleSpeed] = useState(idleSpeed);
  const [currentTalkSpeed, setCurrentTalkSpeed] = useState(talkSpeed);
  // Keep the effective speed in sync when the HOST changes the idleSpeed/talkSpeed
  // props at runtime (e.g. a live tuner). Without this, currentIdleSpeed was only
  // seeded once at mount and later prop changes never reached the avatar. The
  // in-widget speed slider still overrides locally between prop changes.
  useEffect(() => {
    if (typeof idleSpeed === 'number') setCurrentIdleSpeed(idleSpeed);
  }, [idleSpeed]);
  useEffect(() => {
    if (typeof talkSpeed === 'number') setCurrentTalkSpeed(talkSpeed);
  }, [talkSpeed]);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  // The avatar reported that it cannot be shown. Distinct from "not loaded yet":
  // this is terminal, and the chat has to stop waiting for a face that is never
  // coming. Two apps in the fleet ship no `aniaplayer.min.js` at all.
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [isCurrentlyMinimized, setIsCurrentlyMinimized] = useState(startMinimized);
  const [attachments, setAttachments] = useState([]);
  // Typed value for the current flow INPUT node (free-text lead capture).
  const [flowInputValue, setFlowInputValue] = useState("");
  // Flow definition: the `flow` prop wins; otherwise lazily fetched from flowUrl.
  const [fetchedFlow, setFetchedFlow] = useState(null);
  const messagesEndRef = useRef(null);
  // Ref to the PINNED flow-question header. When a new flow node enters we scroll
  // THIS to the top of the viewport (block:'start') so the question reads first,
  // instead of scrolling to the bottom (which buried the question under options).
  const flowQuestionRef = useRef(null);
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
  const flowGotoRef = useRef(null);

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

  // Holds the live lipSync.connectAudioElement so the per-chunk audio callback
  // (fired from inside useTTSDetection, which is declared BEFORE lipSync) can
  // reconnect the analyser to each streamed chunk's <audio> element. Each TTS
  // chunk is a fresh Audio() and createMediaElementSource can only run once
  // per element, so we MUST reconnect per chunk for the mouth to track it.
  const lipSyncConnectRef = useRef(null);

  // Reaches the animation controller so speech-end and word boundaries can act
  // on it directly. Declared here because useTTSDetection is created BEFORE the
  // avatar ref exists.
  const lipsControlRef = useRef({ close: null, pulse: null });

  const { isTalking, speak, cancel } = useTTSDetection({
    // The four timing knobs are gone: mouth movement is driven by the audio
    // envelope now, not by timers. See the deprecation note in useTTSDetection.
    // `postTalkDelay` in particular defaulted to 1500 ms here, which is why the
    // avatar kept talking for a second and a half after the audio ended.
    idleTransitionDelay: 0,
    onTalkStart: () => {},
    onTalkEnd: () => {},
    onForceLipsClosed: () => {
      const close = lipsControlRef.current && lipsControlRef.current.close;
      if (close) close();
    },
    onSyntheticPulse: (v) => {
      const pulse = lipsControlRef.current && lipsControlRef.current.pulse;
      if (pulse) pulse(v);
    },
    ttsProvider: ttsProvider,
    ttsChunking: ttsChunking,
    chunkGapMs: chunkGapMs,
    maxChunkChars: maxChunkChars,
    firstChunkMaxChars: firstChunkMaxChars,
    onChunkAudio: (audioEl) => {
      if (lipSyncEnabled && lipSyncConnectRef.current && audioEl) {
        lipSyncConnectRef.current(audioEl);
      }
    },
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
      piperSpeed,
      robsVoiceUrl,
      robsAcousticUrl,
      robsVocoderUrl,
      robsManifestUrl
    }
  });

  // Lip sync hook — Web Audio FFT analysis
  // No longer gated on the provider. The browser SpeechSynthesis path has no
  // element to analyse, but it drives the same envelope via synthetic pulses,
  // and the hook is inert when nothing is connected to it.
  const lipSync = useLipSync({ enabled: lipSyncEnabled });

  // Keep the per-chunk reconnect ref pointed at the current connect fn.
  useEffect(() => {
    lipSyncConnectRef.current = lipSync.connectAudioElement;
  }, [lipSync.connectAudioElement]);

  // NOTE: no render-effect connect here. Every played chunk (including the
  // first, and the single-chunk/non-chunked case — the queue runner handles
  // both) announces its <audio> via onChunkAudio above, which is the ONLY
  // connect path. A render-time effect keyed on a ref was racy: it could
  // re-connect a STALE element mid-queue and point the analyser at a dead
  // source, freezing the mouth while audio kept playing.

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
    deviceIdEnabled,
    webhookUrl,
    webhookApiKey,
    webhookHeaders,
    extraPayload,
    onSendMessage,
    availableActions,
    // Localize the friendly fallback copy (chat.error.generic) shown on failure.
    translate: tr.t,
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

  // ---- NO-AI flow engine ----
  // Lazily fetch the flow JSON when only `flowUrl` is given (the `flow` object
  // prop always wins). Fire-and-forget; never blocks render.
  useEffect(() => {
    if (flow || !flowUrl || typeof fetch === 'undefined') return;
    let cancelled = false;
    fetch(flowUrl)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((def) => { if (!cancelled) setFetchedFlow(def); })
      .catch((err) => console.warn('[AvatarChatbot] flowUrl fetch failed:', err));
    return () => { cancelled = true; };
  }, [flow, flowUrl]);

  const activeFlow = flow || fetchedFlow;

  // Speak helper bound to the chatbot's TTS settings, reused by the flow engine.
  const flowSpeak = useCallback((text, opts) => {
    if (!enableTTS || !ttsEnabled || !speakFnRef.current || !text) return;
    speakFnRef.current(text, {
      lang: ttsLang, rate: ttsRate, pitch: ttsPitch, voice: selectVoice(),
      cancelPrevious: true, ...opts
    });
  }, [enableTTS, ttsEnabled, ttsLang, ttsRate, ttsPitch, selectVoice]);

  const flow_ = useFlowEngine(activeFlow, {
    speak: flowSpeak,
    sendMessage: (text, meta) => { if (sendMessageRef.current) sendMessageRef.current(text, meta); },
    locale,
    messagesOverride,
    appId,
    lang: ttsLang,
    translate: tr.t,
    initialContext: initialContext || undefined,
    persist,
    persistKey: persistKey || undefined,
    consentKey: flowConsentKey || undefined,
    onCapture: onFlowCapture || undefined,
    onEscalate: onFlowEscalate || undefined,
    // Append each entered node's (resolved) prompt to the visible transcript so
    // the chat shows the running conversation, not just the current bubbles.
    onPrompt: (text) => {
      if (!text) return;
      setSystemMessages((prev) => [
        ...prev,
        {
          id: "flow-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
          role: "assistant",
          content: text,
          timestamp: (new Date()).toISOString(),
          isFlowPrompt: true,
        },
      ]);
    },
  });

  // Expose the flow's goto() to the command runner (the `flow <nodeId>` verb).
  useEffect(() => {
    flowGotoRef.current = flow_.goto;
  }, [flow_.goto]);

  // Reset the typed-input field whenever the flow advances to a different node
  // (so a captured/skipped value doesn't bleed into the next input node).
  const flowNodeId = flow_.currentNode ? flow_.currentNode.id : null;
  useEffect(() => {
    setFlowInputValue("");
  }, [flowNodeId]);

  // Submit the current flow INPUT node's typed value. The avatar already SPOKE
  // the prompt (TTS); the typed answer is silent and goes only into the flow's
  // `collected` map. On success we clear the field; on failure inputError shows
  // inline and we keep the value so the user can fix it.
  const handleFlowInputSubmit = useCallback(() => {
    if (!flow_.currentInput) return;
    const res = flow_.submitInput(flowInputValue);
    if (res && res.ok) setFlowInputValue("");
  }, [flow_, flowInputValue]);

  // Advance past an optional input node WITHOUT capturing (the "Pular" bubble).
  const handleFlowInputSkip = useCallback(() => {
    const input = flow_.currentInput;
    if (!input || !input.optionalSkip) return;
    setFlowInputValue("");
    if (input.next != null) flow_.goto(input.next);
  }, [flow_]);

  // When a flow is active, typed free-text must carry the SAME rich context the
  // escalate button sends (sessionId, appId, collected) so the AI keeps the
  // conversation after escalation — otherwise free-text dropped the flow state.
  // Returns {} when no flow is active so non-flow usage is unchanged.
  const buildFlowMetadata = useCallback(() => {
    // Returning {} when no flow was mounted is what let the backend fall through
    // to its shared-transcript fallback: no sessionId in the body, so the proxy
    // dropped the session header, so the agent derived one from the prompt text
    // — the same value for every visitor. appId still identifies the app; the
    // per-browser and per-tab ids are added by useChatbot itself, so they are
    // present on every path including the `ask` command verb.
    if (!activeFlow) return { appId };
    return {
      sessionId: flow_.sessionId,
      appId: appId,
      collected: flow_.collected,
      flowId: activeFlow.id,
    };
  }, [activeFlow, flow_.sessionId, flow_.collected, appId]);

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
    ask: (text) => { if (sendMessageRef.current) sendMessageRef.current(text, buildFlowMetadata()); },
    stopSpeaking: () => { if (cancelTtsRef.current) cancelTtsRef.current(); },
    triggerWake: () => { if (onWake) onWake(); else if (wakeTriggerRef.current) wakeTriggerRef.current(); },
    flowGoto: (nodeId) => { if (flowGotoRef.current) flowGotoRef.current(nodeId); },
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
    // When a flow is active, ITS start-node prompt is the greeting (spoken AND
    // shown via onPrompt) — skip the generic greeting so we don't double-speak.
    if (activeFlow) {
      hasGreetedRef.current = true;
      return;
    }

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
  }, [autoGreeting, isAvatarLoaded, activeFlow]);

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

  // ---- Active flow-node detection (drives question-pinning + scroll mode) ----
  // A flow "interaction" is live when a flow is active AND the current node has
  // either clickable options or a typed-input spec. While it's live we PIN the
  // current question at the top of the interaction area and let only the options
  // scroll — so the question is never buried (operator's bug on housestudio.online).
  const flowNode = activeFlow ? flow_.currentNode : null;
  const flowNodeActive = !!(
    flowNode && (flow_.currentInput || flow_.visibleOptions.length > 0)
  );

  // The current question text to pin. Prefer the flow's resolved+interpolated
  // prompt; fall back to the last spoken flow-prompt in the transcript so a
  // node whose prompt was only surfaced via onPrompt still shows a header.
  const lastFlowPromptText = useMemo(() => {
    for (let i = allMessages.length - 1; i >= 0; i--) {
      if (allMessages[i] && allMessages[i].isFlowPrompt) return allMessages[i].content;
    }
    return "";
  }, [allMessages]);
  const flowQuestionText = flowNodeActive
    ? (flow_.currentPrompt || lastFlowPromptText || "")
    : "";

  // When the question is pinned above the options we must NOT also repeat it as
  // the last transcript bubble (it would read twice). Hide ONLY the most-recent
  // flow-prompt message from the scrollable history while it's pinned; earlier
  // prompts (past Q&A) stay in the transcript so history remains readable.
  const lastFlowPromptId = useMemo(() => {
    if (!flowNodeActive) return null;
    for (let i = allMessages.length - 1; i >= 0; i--) {
      if (allMessages[i] && allMessages[i].isFlowPrompt) return allMessages[i].id;
    }
    return null;
  }, [allMessages, flowNodeActive]);
  const transcriptMessages = lastFlowPromptId != null
    ? allMessages.filter((m) => m.id !== lastFlowPromptId)
    : allMessages;

  // ---- Scroll behavior ----
  // Scroll the transcript to the latest message. This runs in BOTH modes.
  //
  // It used to bail out whenever a flow node was live, because back then the
  // question and its options lived inside the transcript and scrolling to the
  // bottom buried the question under them. v1.7.1 moved both out into
  // `flowInteractionRegion` (see the pinned-question block below), and the bail
  // was left behind. The cost: with a flow node live, nothing scrolled the
  // transcript at all — the effect underneath only fires when the NODE changes,
  // and sending a message does not change the node. Measured at 478x826: the
  // transcript sat at scrollTop 0 with 24px of content below the fold, so the
  // user's own message rendered 19px past the visible edge and was read as
  // "it cut my blue bubble off".
  //
  // `block: 'end'` rather than the default so it scrolls the transcript to its
  // own bottom instead of scrolling ancestors to centre the sentinel.
  const flowNodeId2 = flowNode ? flowNode.id : null;
  useEffect(() => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [allMessages, flowNodeActive]);

  // On each NEW live flow node, bring the pinned question to the TOP of the
  // visible area (block:'start') instead of scrolling past it to the options.
  useEffect(() => {
    if (!flowNodeActive) return;
    var _a;
    (_a = flowQuestionRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [flowNodeId2, flowNodeActive]);

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

  // Point the TTS callbacks at the live controller. Feature-detected: an app
  // still serving an aniaplayer.min.js older than ext 2.0.0 simply has neither
  // method, and degrades to the previous behaviour instead of throwing.
  useEffect(() => {
    var _a, _b;
    const controller = (_b = (_a = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a.current) == null ? void 0 : _b.animationController;
    if (!controller) return;
    lipsControlRef.current = {
      close: typeof controller.forceLipsClosed === 'function'
        ? () => { try { controller.forceLipsClosed(); } catch (e) {} }
        : null,
      pulse: typeof controller.pushSyntheticOpenness === 'function'
        ? (v) => { try { controller.pushSyntheticOpenness(v); } catch (e) {} }
        : null
    };
    return () => { lipsControlRef.current = { close: null, pulse: null }; };
  }, [avatarRef, isAvatarLoaded]);

  // The chatbot owns the talk state (AniaAvatar's internal detection is off in
  // this mode), so when the user returns to the tab we re-assert the CURRENT
  // state onto the controller. While the tab is hidden the player's rAF loop
  // halts and the controller can come back stale/desynced — without this, a
  // reply that started while the tab was hidden plays audio with a frozen
  // mouth. Registered once; reads the live value from a ref.
  const isTalkingLiveRef = useRef(isTalking);
  useEffect(() => { isTalkingLiveRef.current = isTalking; }, [isTalking]);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const resync = () => {
      var _a, _b;
      if (document.hidden) return;
      const controller = (_b = (_a = avatarRef == null ? void 0 : avatarRef.playerRef) == null ? void 0 : _a.current) == null ? void 0 : _b.animationController;
      if (!controller) return;
      try { controller.setTalkingState(isTalkingLiveRef.current); } catch (e) {}
    };
    document.addEventListener('visibilitychange', resync);
    return () => document.removeEventListener('visibilitychange', resync);
  }, [avatarRef]);

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
      ...buildFlowMetadata(),
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
      ...buildFlowMetadata(),
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

  // ── Flow INPUT-node element (typed lead-capture field + submit/skip) ────────
  // Built once here so the new flow-interaction region (pinned question above,
  // scrollable answers below) can render it under the pinned question. Gating
  // (currentInput present) is done by the region, not here.
  const flowInputElement = (flowNodeActive && flow_.currentInput) ? jsx("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      paddingTop: "2px"
    },
    children: jsxs("form", {
      onSubmit: (e) => { e.preventDefault(); handleFlowInputSubmit(); },
      style: { display: "flex", flexDirection: "column", gap: "8px" },
      children: [
        // Visually-hidden label tied to the field (a11y).
        jsx("label", {
          htmlFor: "ania-flow-input",
          style: {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0
          },
          children: flow_.currentInput.placeholder
            ? flow_.resolveText(flow_.currentInput.placeholder)
            : tr.t("chat.flow.submit")
        }),
        (flow_.currentInput.type === "textarea"
          ? jsx("textarea", {
              id: "ania-flow-input",
              name: flow_.currentInput.key || "ania-flow-input",
              value: flowInputValue,
              onChange: (e) => setFlowInputValue(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleFlowInputSubmit();
                }
              },
              rows: 3,
              placeholder: flow_.currentInput.placeholder
                ? flow_.resolveText(flow_.currentInput.placeholder)
                : "",
              autoComplete: flowInputAutocomplete(flow_.currentInput),
              style: {
                width: "100%",
                minHeight: "44px",
                padding: "12px 16px",
                borderRadius: "16px",
                border: flow_.inputError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                backgroundColor: flow_.inputError ? "#fef2f2" : "#ffffff",
                fontSize: "16px",
                color: "#1f2937",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                fontFamily: "inherit",
                boxShadow: "0 4px 12px rgba(0,0,0,0.10)"
              }
            })
          : jsx("input", {
              id: "ania-flow-input",
              name: flow_.currentInput.key || "ania-flow-input",
              type: flowInputDomType(flow_.currentInput.type),
              inputMode: flowInputMode(flow_.currentInput.type),
              value: flowInputValue,
              onChange: (e) => setFlowInputValue(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleFlowInputSubmit();
                }
              },
              placeholder: flow_.currentInput.placeholder
                ? flow_.resolveText(flow_.currentInput.placeholder)
                : "",
              autoComplete: flowInputAutocomplete(flow_.currentInput),
              style: {
                width: "100%",
                minHeight: "44px",
                padding: "12px 16px",
                borderRadius: "24px",
                border: flow_.inputError ? "2px solid #ef4444" : "2px solid #e5e7eb",
                backgroundColor: flow_.inputError ? "#fef2f2" : "#ffffff",
                fontSize: "16px",
                color: "#1f2937",
                outline: "none",
                boxSizing: "border-box",
                boxShadow: "0 4px 12px rgba(0,0,0,0.10)"
              }
            })
        ),
        // Inline validation error. flow_.inputError is ALREADY fully resolved by
        // the engine (i18n key → text, then {var} interpolated from collected),
        // so a flow errorMsg like "…tá estranho, {name}." shows the real name —
        // render it directly (no extra tr.t / interpolation).
        flow_.inputError && jsx("div", {
          style: {
            fontSize: "12px",
            color: "#dc2626",
            padding: "0 8px"
          },
          children: flow_.inputError
        }),
        // Submit + optional "Pular" (skip) row.
        jsxs("div", {
          style: { display: "flex", gap: "8px", flexWrap: "wrap" },
          children: [
            jsx("button", {
              type: "submit",
              className: "ania-flow-bubble",
              style: {
                flex: "1 1 auto",
                minHeight: "44px",
                padding: "11px 18px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "1.2",
                color: "#ffffff",
                background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                WebkitTapHighlightColor: "transparent"
              },
              children: flow_.currentInput.submitLabel
                ? flow_.resolveText(flow_.currentInput.submitLabel)
                : tr.t("chat.flow.submit")
            }),
            flow_.currentInput.optionalSkip && jsx("button", {
              type: "button",
              className: "ania-flow-bubble",
              onClick: handleFlowInputSkip,
              style: {
                minHeight: "44px",
                padding: "11px 18px",
                borderRadius: "20px",
                border: "2px solid #e5e7eb",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "1.2",
                color: "#6b7280",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                WebkitTapHighlightColor: "transparent"
              },
              children: flow_.currentInput.skipLabel
                ? flow_.resolveText(flow_.currentInput.skipLabel)
                : flow_.resolveText(tr.t("chat.flow.skip"))
            })
          ]
        })
      ]
    })
  }) : null;

  // ── Flow OPTION bubbles element (clickable answers + "Voltar") ──────────────
  const flowOptionsElement = (flowNodeActive && !flow_.currentInput && flow_.visibleOptions.length > 0) ? jsx("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      justifyContent: "flex-start",
      paddingTop: "2px"
    },
    children: [
      ...flow_.visibleOptions.map((opt, idx) => {
        const isEscalate = !!opt.escalate;
        return jsx("button", {
          key: "flowopt-" + (opt.value != null ? String(opt.value) : idx),
          className: "ania-flow-bubble",
          onClick: () => flow_.selectOption(opt),
          style: {
            flex: "0 1 auto",
            maxWidth: "100%",
            minHeight: "44px",
            padding: "11px 18px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "1.25",
            color: "#ffffff",
            whiteSpace: "normal",
            overflowWrap: "anywhere",
            textAlign: "left",
            background: isEscalate
              ? "linear-gradient(135deg, #f97316 0%, #ef4444 100%)"
              : "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
            boxShadow: isEscalate
              ? "0 4px 14px rgba(249,115,22,0.40)"
              : "0 4px 14px rgba(59,130,246,0.35)",
            animation: `ania-flow-pop .28s ease ${0.04 * idx}s both`,
            WebkitTapHighlightColor: "transparent"
          },
          children: opt.label != null
            ? flow_.resolveLabel(opt.label)
            : (isEscalate ? tr.t("chat.flow.escalate") : String(opt.value))
        });
      }),
      // "Voltar" bubble (only when there's history to pop)
      flow_.canGoBack && jsx("button", {
        key: "flow-back",
        className: "ania-flow-bubble",
        onClick: () => flow_.goBack(),
        style: {
          flex: "0 1 auto",
          maxWidth: "100%",
          minHeight: "44px",
          padding: "11px 18px",
          borderRadius: "20px",
          border: "2px solid #e5e7eb",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "1.25",
          color: "#6b7280",
          whiteSpace: "normal",
          overflowWrap: "anywhere",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          animation: "ania-flow-pop .28s ease both",
          WebkitTapHighlightColor: "transparent"
        },
        children: "← " + tr.t("chat.flow.back")
      })
    ]
  }) : null;

  // ── Flow INTERACTION region ─────────────────────────────────────────────────
  // Rendered as a sibling BELOW the scrollable transcript whenever a flow node
  // is live. It pins the CURRENT QUESTION at the top (prominent, always visible)
  // and puts the answer affordances (option bubbles OR typed input) in their own
  // independently-scrolling sub-area below it. This is the fix for the operator's
  // bug: the options can never scroll the question out of view, and the question
  // reads first. Backward-compatible: null when no flow node is active.
  const flowInteractionRegion = flowNodeActive ? jsxs("div", {
    style: {
      // Shrinkable, not rigid. This region already has its own scrolling
      // sub-area for the answer affordances, but that scroller never engaged:
      // with `flexShrink: 0` the region kept its full natural height and the
      // transcript — the only flexible sibling — absorbed the entire squeeze.
      // Measured at 478x826 with six options: region 246px, transcript 168px.
      // The answers scroll now instead of the conversation disappearing.
      flexShrink: 1,
      minHeight: 120,
      display: "flex",
      flexDirection: "column",
      // Clip. Without this a child taller than the region paints straight over
      // the input bar below it — measured live at 1536x674: region 180px,
      // question header 218px, the overflow landing on top of the text field.
      // Every child in here either scrolls or is bounded, so clipping can only
      // ever hide something that is already unreachable.
      overflow: "hidden",
      // Cap the whole region so it + transcript + input bar fit small screens.
      // `dvh`, not `vh`: on mobile `vh` is the LARGE viewport, which counts the
      // space behind the browser's own chrome.
      maxHeight: `min(55dvh, max(180px, calc(100dvh - ${height + 140}px)))`,
      margin: "0 0 4px",
      padding: "10px 12px 4px",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      background: "linear-gradient(180deg, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0) 100%)",
      boxSizing: "border-box"
    },
    children: [
      // PINNED QUESTION HEADER — prominent, bold, larger; never scrolled away.
      //
      // "Never scrolled away" was implemented as `flexShrink: 0`, which is a
      // different promise: it says the header keeps its full natural height no
      // matter how little room exists. A long answer makes that height larger
      // than the region, and the surplus rendered over the input bar. Bounded
      // and scrollable instead: the question stays pinned above the options,
      // which is the point, and a very long one scrolls within its own box
      // rather than escaping it.
      jsxs("div", {
        ref: flowQuestionRef,
        style: {
          flexShrink: 1,
          minHeight: 0,
          maxHeight: "min(46%, 40dvh)",
          overflowY: "auto",
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
          padding: "12px 14px",
          marginBottom: "8px",
          borderRadius: "14px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(15,23,42,0.14)"
        },
        children: [
          jsx("div", {
            "aria-hidden": "true",
            style: {
              flexShrink: 0,
              marginTop: "2px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#6366f1",
              boxShadow: "0 0 0 4px rgba(99,102,241,0.18)"
            }
          }),
          jsx("div", {
            role: "status",
            "aria-live": "polite",
            style: {
              minWidth: 0,
              flex: "1 1 auto",
              fontSize: "clamp(15px, 4.2vw, 18px)",
              fontWeight: "700",
              lineHeight: "1.35",
              color: "#111827",
              overflowWrap: "anywhere",
              wordBreak: "break-word"
            },
            children: flowQuestionText
          })
        ]
      }),
      // SCROLLABLE ANSWERS — options/input scroll here; the question stays put.
      jsx("div", {
        className: "ania-chat-scroll",
        style: {
          flex: "1 1 auto",
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          paddingRight: "2px"
        },
        children: flow_.currentInput ? flowInputElement : flowOptionsElement
      })
    ]
  }) : null;

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
      fit,
      cropMinimized,
      locale,
      messagesOverride,
      minimizable: true,
      closable: true,
      idleSpeed: currentIdleSpeed,
      talkSpeed: currentTalkSpeed,
      autoCalculateSpeed,
      fpsClamp,
      preserveQuality,
      alwaysOnTop,
      // Start minimised while the avatar is still loading — but not forever.
      // `!isAvatarLoaded` alone meant that an app whose `/player/aniaplayer.min.js`
      // 404s could never open its chat, because the flag that un-minimises it is
      // set by an avatar that never arrives. The chat does not need the avatar.
      startMinimized: startMinimized || (!isAvatarLoaded && !avatarFailed),
      // Lip sync passthrough
      lipSyncEnabled,
      lipSyncServerUrl,
      lipSyncAutoFetch,
      lipSyncConfigId,
      lipSyncMaxCandidates,
      onLipSyncConfig,
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
      avatarMaxHeightVh,
      onLoad: (player) => {
        setAvatarRef({ playerRef: { current: player } });
        setIsAvatarLoaded(true);
        setAvatarFailed(false);
      },
      onError: (err) => {
        console.warn('[AvatarChatbot] avatar unavailable, continuing without it:', err);
        setAvatarFailed(true);
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
            className: "ania-chat-scroll",
            style: {
              flex: "1 1 auto",
              // A real floor, not 60px. The transcript used to be the only
              // shrinkable block in the column, so every rigid sibling took its
              // space and it collapsed to 168px — a fifth of the screen for the
              // conversation itself. Now that the avatar and the flow region
              // both give way, this floor is what stops the squeeze here.
              minHeight: "min(180px, 24dvh)",
              // Growth cap only — when space is tight the flex parent (which is
              // clamped to the viewport) shrinks this area, so the input bar is
              // never pushed off screen.
              maxHeight: flowNodeActive ? "min(320px, 40dvh)" : "min(420px, 48dvh)",
              overflowY: "auto",
              padding: "14px 14px 6px",
              WebkitOverflowScrolling: "touch",
              overflowX: "hidden"
            },
            children: [
              // Lista de mensagens (transcript). The CURRENT flow question is
              // pinned in its own header below, so it's filtered out here.
              // Messages by the same sender are GROUPED: the name renders once
              // per run and bubbles inside a run sit closer together.
              transcriptMessages.map((msg, idx) => {
                const isUser = msg.role === "user";
                const prev = transcriptMessages[idx - 1];
                const isFirstOfGroup = !prev || prev.role !== msg.role;
                return jsx("div", {
                  key: msg.id,
                  className: "ania-msg-in",
                  style: {
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    marginTop: isFirstOfGroup && idx > 0 ? "14px" : "4px"
                  },
                  children: jsxs("div", {
                    style: { maxWidth: "85%", minWidth: 0 },
                    children: [
                      // Nome do remetente — once per group, quiet label.
                      isFirstOfGroup && jsx("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "0.01em",
                          marginBottom: "3px",
                          padding: "2px 10px",
                          borderRadius: "999px",
                          display: "inline-block",
                          backgroundColor: "rgba(255,255,255,0.92)",
                          color: "#475569",
                          float: isUser ? "right" : "none"
                        },
                        children: isUser ? userName : assistantName
                      }),
                      // Balão da mensagem
                      jsxs("div", {
                        style: {
                          clear: "both",
                          padding: "11px 15px",
                          borderRadius: "18px",
                          borderBottomLeftRadius: isUser ? "18px" : "5px",
                          borderBottomRightRadius: isUser ? "5px" : "18px",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          background: isUser
                            ? "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)"
                            : "#ffffff",
                          color: isUser ? "#ffffff" : "#1f2937",
                          boxShadow: "0 2px 8px rgba(15,23,42,0.12)",
                          overflowWrap: "anywhere",
                          wordBreak: "break-word"
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

              // NOTE: the flow QUESTION + answer affordances (option bubbles /
              // typed input) are no longer rendered inside this scrollable
              // transcript. They live in `flowInteractionRegion` below — a
              // sibling that pins the current question at the top and lets only
              // the answers scroll, so the question is never buried (v1.7.1).

              // Loading indicator
              isLoading && jsx("div", {
                className: "ania-msg-in",
                style: { display: "flex", justifyContent: "flex-start", marginTop: "14px" },
                children: jsxs("div", {
                  style: { maxWidth: "80%" },
                  children: [
                    jsx("div", {
                      style: {
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.01em",
                        marginBottom: "3px",
                        padding: "2px 10px",
                        borderRadius: "999px",
                        display: "inline-block",
                        backgroundColor: "rgba(255,255,255,0.92)",
                        color: "#475569"
                      },
                      children: assistantName
                    }),
                    jsx("div", {
                      style: {
                        padding: "13px 15px",
                        borderRadius: "18px",
                        borderBottomLeftRadius: "5px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 8px rgba(15,23,42,0.12)",
                        display: "flex",
                        gap: "5px",
                        width: "fit-content"
                      },
                      children: [
                        jsx("div", { style: { width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#6366f1", animation: "ania-pulse 1s infinite" } }),
                        jsx("div", { style: { width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#6366f1", animation: "ania-pulse 1s infinite 0.18s" } }),
                        jsx("div", { style: { width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#6366f1", animation: "ania-pulse 1s infinite 0.36s" } })
                      ]
                    })
                  ]
                })
              }),

              jsx("div", { ref: messagesEndRef })
            ]
          }),

          // ========== FLOW: QUESTION PINNED + SCROLLABLE ANSWERS ==========
          // Sibling below the transcript. Pins the current question at the top
          // (prominent) and scrolls only the options/input below it (v1.7.1 fix).
          flowInteractionRegion,

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
                  jsx("input", { type: "range", min: "0.25", max: "10", step: "0.25", value: currentIdleSpeed ?? 1, onChange: (e) => handleIdleSpeedChange(parseFloat(e.target.value)), style: { flex: 1 } }),
                  jsx("span", { style: { fontSize: "12px", fontWeight: "600", color: "#374151", width: "45px", textAlign: "right" }, children: (currentIdleSpeed ?? 1).toFixed(2) + "x" })
                ]}),
                jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
                  jsx("span", { style: { fontSize: "12px", color: "#6b7280", width: "40px" }, children: tr.t("chat.speed.talk") }),
                  jsx("input", { type: "range", min: "0.25", max: "10", step: "0.25", value: currentTalkSpeed ?? 1, onChange: (e) => handleTalkSpeedChange(parseFloat(e.target.value)), style: { flex: 1 } }),
                  jsx("span", { style: { fontSize: "12px", fontWeight: "600", color: "#374151", width: "45px", textAlign: "right" }, children: (currentTalkSpeed ?? 1).toFixed(2) + "x" })
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
            // The bottom padding clears the home indicator / gesture bar. Without
            // it the send button sits underneath the system UI on an iPhone and
            // on gesture-navigation Android.
            style: {
              padding: "8px 12px",
              paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0
            },
            children: [
              // Botão anexar
              enableAttachments && jsx("button", {
                onClick: () => fileInputRef.current?.click(),
                disabled: isLoading,
                className: "ania-chat-iconbtn",
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
                  boxShadow: "0 2px 8px rgba(15,23,42,0.14)"
                },
                children: jsx(Paperclip, { size: 18, color: "#6b7280" })
              }),
              enableAttachments && jsx("input", { ref: fileInputRef, type: "file", multiple: true, accept: "image/*,.pdf,.doc,.docx,.txt", onChange: handleFileSelect, style: { display: "none" } }),

              // Input de texto
              jsx("input", {
                id: "ania-chat-input",
                name: "ania-chat-input",
                className: "ania-chat-input",
                type: "text",
                value: inputMessage,
                onChange: (e) => setInputMessage(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: isListening ? tr.t("chat.input.listening") : tr.t("chat.input.placeholder"),
                disabled: isLoading,
                style: {
                  flex: "1 1 0%",
                  minWidth: 0,
                  padding: "11px 16px",
                  borderRadius: "999px",
                  border: isListening ? "2px solid #ef4444" : "1.5px solid #e2e8f0",
                  backgroundColor: isListening ? "#fef2f2" : "#ffffff",
                  // 16px prevents iOS Safari from auto-zooming the page on focus.
                  fontSize: "16px",
                  fontFamily: "inherit",
                  color: "#1f2937",
                  outline: "none",
                  boxSizing: "border-box"
                }
              }),

              // Botão mic
              enableSTT && jsx("button", {
                onClick: handleMicToggle,
                disabled: isLoading,
                className: "ania-chat-iconbtn",
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
                  boxShadow: isListening ? "0 2px 8px rgba(239,68,68,0.45)" : "0 2px 8px rgba(15,23,42,0.14)"
                },
                children: isListening ? jsx(MicOff, { size: 18, color: "#ffffff" }) : jsx(Mic, { size: 18, color: "#6b7280" })
              }),

              // Botão enviar
              jsx("button", {
                onClick: handleSend,
                disabled: (!inputMessage.trim() && attachments.length === 0) || isLoading,
                className: "ania-chat-iconbtn",
                style: {
                  width: "44px",
                  height: "44px",
                  minWidth: "44px",
                  minHeight: "44px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "none",
                  background: (!inputMessage.trim() && attachments.length === 0) || isLoading
                    ? "#d1d5db"
                    : "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
                  cursor: (!inputMessage.trim() && attachments.length === 0) || isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(59,130,246,0.35)"
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

AvatarChatbotWidget.displayName = 'AvatarChatbotWidget';

/**
 * Chave geral (`disabled`): com `disabled` o widget inteiro deixa de montar —
 * sem avatar, sem download do modelo Piper/Robs (~44-84 MB), sem webhook, sem
 * saudação automática, sem microfone. O host mantém o `<AvatarChatbot>` na
 * árvore e vira UM prop (ex.: enquanto troca o arquivo `.ania`) em vez de
 * comentar o bloco inteiro e perder a configuração.
 *
 * O guard vive neste wrapper: todo o widget está em `AvatarChatbotWidget`, então
 * nenhum hook, efeito ou fetch chega a rodar quando `disabled` é true (um
 * `return null` lá dentro rodaria depois dos hooks e ainda pagaria a rede).
 */
export const AvatarChatbot = ({ disabled = false, ...props }) =>
  disabled ? null : jsx(AvatarChatbotWidget, { ...props });

AvatarChatbot.displayName = 'AvatarChatbot';
