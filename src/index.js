// Componentes principais
export { AniaAvatar } from './components/AniaAvatar.jsx';
export { AvatarChatbot } from './components/AvatarChatbot.jsx';

// Hooks públicos
export { useAniaAvatarRef } from './hooks/useAniaAvatarRef.js';
export { useTTSDetection } from './hooks/useTTSDetection.js';
export { useSpeechRecognition } from './hooks/useSpeechRecognition.js';
export { useChatbot } from './hooks/useChatbot.js';
export { useFlowEngine } from './hooks/useFlowEngine.js';
export { useLipSync } from './hooks/useLipSync.js';
export { useActionFrames } from './hooks/useActionFrames.js';
export { usePlugins } from './hooks/usePlugins.js';
export { useWakeWord } from './hooks/useWakeWord.js';

// Services
export { checkPiperStatus, initPiper, preloadPiper, disposePiper, piperSynthesize, getPiperStatus } from './services/piper-tts.js';
export { fetchLipSyncConfig, buildOpennessMap } from './services/lip-sync-api.js';
export { WakeWordEngine, getWakeWordEngine, isWakeWordSupported } from './services/wake-word.js';

// Plugin architecture
export { PluginRegistry, getDefaultRegistry } from './plugins/plugin-registry.js';
export { PLUGIN_KINDS, validatePlugin } from './plugins/plugin-types.js';
export {
  BUILTIN_PLUGINS,
  registerBuiltins,
  TTS_PROVIDER_TO_PLUGIN,
  STT_PROVIDER_TO_PLUGIN,
  ttsBrowserPlugin,
  ttsTiktokPlugin,
  ttsElevenLabsPlugin,
  ttsGooglePlugin,
  ttsAzurePlugin,
  ttsPiperPlugin,
  sttBrowserPlugin,
  sttGooglePlugin,
  actionAudioPlugin
} from './plugins/builtins.js';

// i18n — built-in locale table (greetings/waiting/UI strings) for the
// avatar + chatbot. Lets a consumer pick a locale or override strings without
// pulling in a heavy i18n runtime.
export {
  getString,
  getStringList,
  createTranslator,
  availableLocales,
  hasLocale,
  DEFAULT_LOCALE,
  FALLBACK_LOCALE
} from './i18n/index.js';

// Utilities
export { parseHotkey, matchesHotkey } from './utils/hotkey-parser.js';
export { playActionAudio } from './utils/action-renderer.js';
export { executeCommand, parseCommandLine, installPostMessageControl, COMMAND_LIST } from './utils/commands.js';

// NO-AI flow engine — the pure reducer + helpers behind useFlowEngine. Exposed
// so hosts can drive / test the flow logic headlessly (no React, no TTS).
export { flowReducer, initialState as flowInitialState, getNode as flowGetNode, resolvePrompt as flowResolvePrompt, visibleOptions as flowVisibleOptions, nodeInput as flowNodeInput, validateInput as flowValidateInput, interpolate as flowInterpolate } from './hooks/flow-reducer.js';

// Utilitarios de cache
export {
  getCachedAvatar,
  setCachedAvatar,
  deleteCachedAvatar,
  clearAvatarCache,
  getCacheStats
} from './utils/avatar-cache.js';
