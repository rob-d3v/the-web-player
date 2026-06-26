/**
 * Plugin contract — JS mirror of the desktop Ania Player `PluginBase`
 * (src/ania_player/plugins/plugin_base.py) and the provider engine shapes
 * (`TTSEngine` / `STTEngine` / `WakeWordEngine` in provider_api.py).
 *
 * There are no classes to extend here: a Plugin is a plain object that
 * satisfies the shape below. This keeps the browser surface tiny and lets a
 * consumer register a custom plugin with a literal:
 *
 *   registry.register({
 *     id: 'my-tts', name: 'My TTS', version: '1.0.0',
 *     kind: 'tts',
 *     createEngine: (ctx) => ({ async speak(text, opts) { ... } })
 *   });
 *
 * @typedef {'tts'|'stt'|'wakeword'|'action'|'integration'} PluginKind
 *
 * @typedef {Object} PluginContext
 * @property {Object} [config]   Per-subsystem config (e.g. the TTS config bag).
 * @property {Object} [registry] The owning PluginRegistry.
 * @property {Object} [logger]   Optional logger (defaults to console).
 *
 * @typedef {Object} TTSEngine
 * @property {(text: string, options?: Object) => (Promise<any>|any)} speak
 *           Synthesize + play `text`. May return the underlying Audio/utterance.
 * @property {(text: string, options?: Object) => Promise<{audioUrl:string, blob?:Blob}>} [synthesize]
 *           Synthesize without playing — returns an object audio URL.
 * @property {() => void} [stop]    Interrupt in-progress playback.
 * @property {() => void} [cleanup] Release resources.
 *
 * @typedef {Object} STTEngine
 * @property {(options?: Object) => Promise<boolean>} startListening
 * @property {() => void} stopListening
 * @property {() => void} [cleanup]
 *
 * @typedef {Object} WakeWordEngine
 * @property {(modelUrl?: string) => Promise<void>} [loadModel]
 * @property {(config: {threshold:number,onDetect:()=>void,onError?:(e:Error)=>void}) => Promise<boolean>} startListening
 * @property {() => (void|Promise<void>)} stopListening
 * @property {() => boolean} [isModelLoaded]
 * @property {() => boolean} [isCurrentlyListening]
 * @property {() => (void|Promise<void>)} [dispose]
 *
 * @typedef {Object} Plugin
 * @property {string} id                       Unique id (e.g. 'tts-browser').
 * @property {string} name                     Human-friendly name.
 * @property {string} [version]                Semver string.
 * @property {string} [description]
 * @property {PluginKind} kind
 * @property {boolean} [enabled]               Default true.
 * @property {boolean} [builtin]               True for library built-ins.
 * @property {(ctx: PluginContext) => (void|Promise<void>)} [init]
 * @property {() => (void|Promise<void>)} [start]
 * @property {() => (void|Promise<void>)} [stop]
 * @property {(ctx: PluginContext) => (TTSEngine|STTEngine|WakeWordEngine|any)} [createEngine]
 *           Engine factory for `tts` / `stt` / `wakeword` providers.
 * @property {(ctx: PluginContext) => any} [createHandler]
 *           Handler factory for `action` / `integration` plugins. The returned
 *           value (often `(command, ctx) => boolean` for actions, or an object
 *           for integrations) is what the host consumes.
 * @property {Array<Object>} [settingsSchema] Field descriptors a host can render.
 */

export const PLUGIN_KINDS = ['tts', 'stt', 'wakeword', 'action', 'integration'];

/**
 * Lightweight runtime validation. Throws a descriptive Error if `plugin`
 * does not satisfy the minimum contract, so registration fails loudly
 * instead of silently misbehaving at resolve time.
 * @param {Plugin} plugin
 * @returns {Plugin}
 */
export const validatePlugin = (plugin) => {
  if (!plugin || typeof plugin !== 'object') {
    throw new Error('[PluginRegistry] plugin must be an object');
  }
  if (!plugin.id || typeof plugin.id !== 'string') {
    throw new Error('[PluginRegistry] plugin.id is required (string)');
  }
  if (!PLUGIN_KINDS.includes(plugin.kind)) {
    throw new Error(
      `[PluginRegistry] plugin.kind must be one of ${PLUGIN_KINDS.join(', ')} (got "${plugin.kind}")`
    );
  }
  return plugin;
};
