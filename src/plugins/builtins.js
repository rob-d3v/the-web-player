/**
 * Built-in plugins — wrap the library's existing, working subsystems
 * (tts-api providers, Piper ONNX, the browser/Google STT, action audio)
 * as registered Plugin objects WITHOUT rewriting any of that code.
 *
 * Each TTS/STT provider is exposed as a separate plugin so a host can pick
 * the active one with `registry.setActive('tts', 'tts-piper')`, mirroring the
 * desktop where each provider is its own plugin.
 */

import { professionalTTSRequest } from '../services/tts-api.js';
import { playActionAudio } from '../utils/action-renderer.js';

// ---------------------------------------------------------------------------
// TTS providers
// ---------------------------------------------------------------------------

/**
 * Factory for a cloud/keyless tts-api provider (tiktok/elevenlabs/google/
 * azure/piper). Returns a TTSEngine whose `synthesize` defers to the existing
 * `professionalTTSRequest`, and whose `speak` plays the resulting object URL.
 */
const makeApiTtsEngine = (providerId, ctx) => {
  const config = (ctx && ctx.config) || {};
  let current = null;
  return {
    async synthesize(text, options = {}) {
      return professionalTTSRequest(text, providerId, { ...config, ...options });
    },
    async speak(text, options = {}) {
      const { audioUrl } = await professionalTTSRequest(text, providerId, { ...config, ...options });
      if (current) { try { current.pause(); } catch (e) {} }
      const audio = new Audio(audioUrl);
      current = audio;
      audio.addEventListener('ended', () => URL.revokeObjectURL(audioUrl), { once: true });
      await audio.play();
      return audio;
    },
    stop() { if (current) { try { current.pause(); } catch (e) {} current = null; } },
    cleanup() { this.stop(); },
  };
};

const apiProvider = (id, label, providerId, description) => ({
  id,
  name: label,
  version: '1.4.0',
  kind: 'tts',
  builtin: true,
  description,
  createEngine: (ctx) => makeApiTtsEngine(providerId, ctx),
});

export const ttsBrowserPlugin = {
  id: 'tts-browser',
  name: 'Browser TTS (Web Speech)',
  version: '1.4.0',
  kind: 'tts',
  builtin: true,
  description: 'window.speechSynthesis — no key, no network.',
  createEngine: () => ({
    async speak(text, options = {}) {
      if (typeof window === 'undefined' || !window.speechSynthesis) return null;
      if (options.cancelPrevious) window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = options.lang || 'pt-BR';
      u.rate = options.rate || 1;
      u.pitch = options.pitch || 1;
      u.volume = options.volume ?? 1;
      if (options.voice) u.voice = options.voice;
      window.speechSynthesis.speak(u);
      return u;
    },
    stop() { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); },
  }),
};

export const ttsTiktokPlugin = apiProvider('tts-tiktok', 'TikTok TTS', 'tiktok', 'Keyless TikTok voices (br_003/br_005).');
export const ttsElevenLabsPlugin = apiProvider('tts-elevenlabs', 'ElevenLabs', 'elevenlabs', 'ElevenLabs multilingual (needs API key).');
export const ttsGooglePlugin = apiProvider('tts-google', 'Google Cloud TTS', 'google', 'Google Cloud Text-to-Speech (needs API key).');
export const ttsAzurePlugin = apiProvider('tts-azure', 'Azure TTS', 'azure', 'Azure Cognitive Services Speech (needs API key).');

/** Piper is the on-device ONNX provider; wrap the existing piper-tts service. */
export const ttsPiperPlugin = {
  id: 'tts-piper',
  name: 'Piper (on-device ONNX)',
  version: '1.4.0',
  kind: 'tts',
  builtin: true,
  description: 'Browser-side neural TTS via piper-tts-web + onnxruntime-web.',
  async init(ctx) {
    const cfg = (ctx && ctx.config) || {};
    if (cfg.piperModelUrl) {
      const { preloadPiper } = await import('../services/piper-tts.js');
      // fire-and-forget; synthesize() awaits readiness internally
      preloadPiper(cfg.piperModelUrl, cfg.piperModelConfigUrl).catch(() => {});
    }
  },
  createEngine: (ctx) => {
    const cfg = (ctx && ctx.config) || {};
    let current = null;
    return {
      async synthesize(text, options = {}) {
        const { initPiper, piperSynthesize } = await import('../services/piper-tts.js');
        if (cfg.piperModelUrl) await initPiper(cfg.piperModelUrl, cfg.piperModelConfigUrl);
        return piperSynthesize(text, { speakerId: options.speakerId ?? cfg.piperSpeakerId });
      },
      async speak(text, options = {}) {
        const { audioUrl } = await this.synthesize(text, options);
        if (current) { try { current.pause(); } catch (e) {} }
        const audio = new Audio(audioUrl);
        current = audio;
        audio.addEventListener('ended', () => URL.revokeObjectURL(audioUrl), { once: true });
        await audio.play();
        return audio;
      },
      stop() { if (current) { try { current.pause(); } catch (e) {} current = null; } },
    };
  },
};

// ---------------------------------------------------------------------------
// STT providers
// ---------------------------------------------------------------------------
//
// The existing STT lives in the `useSpeechRecognition` React hook. Rather than
// duplicate that recognizer here, the STT built-ins are thin descriptors: the
// active STT plugin id selects which provider the hook should drive. The
// `createEngine` returns a descriptor the host (AvatarChatbot) reads to pick
// the hook's `sttProvider`. This keeps the working hook untouched.

export const sttBrowserPlugin = {
  id: 'stt-browser',
  name: 'Browser STT (Web Speech)',
  version: '1.4.0',
  kind: 'stt',
  builtin: true,
  description: 'webkitSpeechRecognition — Chrome/Edge only, no key.',
  createEngine: () => ({ provider: 'browser' }),
};

export const sttGooglePlugin = {
  id: 'stt-google',
  name: 'Google Cloud STT',
  version: '1.4.0',
  kind: 'stt',
  builtin: true,
  description: 'Google Cloud Speech-to-Text (needs API key).',
  createEngine: () => ({ provider: 'google' }),
};

// ---------------------------------------------------------------------------
// Action handler built-in — plays an action's bundled audio (parity with the
// desktop action audio). action/integration plugins expose createHandler.
// ---------------------------------------------------------------------------

export const actionAudioPlugin = {
  id: 'action-audio',
  name: 'Action Audio',
  version: '1.4.0',
  kind: 'action',
  builtin: true,
  description: 'Plays an action config\'s base64 audio when the action fires.',
  createHandler: () => ({
    /** Called by the host when an action triggers; plays its bundled audio. */
    onAction(actionConfig) {
      if (actionConfig && actionConfig.audio_base64) {
        return playActionAudio(actionConfig.audio_base64, actionConfig.audio_delay_ms || 0);
      }
      return null;
    },
  }),
};

/** Every built-in, in registration order. */
export const BUILTIN_PLUGINS = [
  ttsBrowserPlugin,
  ttsTiktokPlugin,
  ttsElevenLabsPlugin,
  ttsGooglePlugin,
  ttsAzurePlugin,
  ttsPiperPlugin,
  sttBrowserPlugin,
  sttGooglePlugin,
  actionAudioPlugin,
];

/**
 * Map a legacy `ttsProvider` / `sttProvider` string to its built-in plugin id,
 * so the existing props keep selecting the right active provider.
 */
export const TTS_PROVIDER_TO_PLUGIN = {
  browser: 'tts-browser',
  tiktok: 'tts-tiktok',
  elevenlabs: 'tts-elevenlabs',
  google: 'tts-google',
  azure: 'tts-azure',
  piper: 'tts-piper',
};

export const STT_PROVIDER_TO_PLUGIN = {
  browser: 'stt-browser',
  google: 'stt-google',
};

/**
 * Register all built-ins onto a registry (idempotent — skips ids already
 * present so a host can pre-register a custom override of a built-in id).
 */
export const registerBuiltins = (registry) => {
  for (const p of BUILTIN_PLUGINS) {
    if (!registry.get(p.id)) registry.register(p);
  }
};
