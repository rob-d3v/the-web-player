# Changelog

All notable changes to `ania-avatar-react` are documented here.

## [1.5.0]

### Added — Localization (i18n)
- Built-in, **dependency-free** locale table for every user-facing string the
  library renders: greetings + waiting messages (previously hard-coded
  Portuguese in `src/constants/messages.js`), the *Enable Sound* button, the
  Idle/Talk speed-slider labels, the STT placeholder/feedback/error toasts, and
  the avatar control titles + loading/error text. No `i18next` (or any other
  runtime) is pulled in — just a tiny synchronous resolver with English
  fallback.
- **~190 languages bundled** under `src/i18n/strings/<code>.json`. `en` + `pt-BR`
  are hand-authored; the rest are machine-translated (and shipped in `files` so
  consumers get every language with zero extra fetches — locale tables are
  inlined into the bundle at build time).
- New `locale` prop on `AvatarChatbot` and `AniaAvatar` (default `'pt-BR'`, which
  preserves the library's original wording — existing apps are unaffected).
  Unknown codes fall back to the base language (`es-MX` → `es`) then to English;
  a string is never rendered as a raw key.
- New `messagesOverride` prop (`Record<string, string | string[]>`) lets a
  consumer override any individual built-in string (or the `greetings` /
  `waiting` lists) without forking the component.
- New exports: `getString`, `getStringList`, `createTranslator`,
  `availableLocales`, `hasLocale`, `DEFAULT_LOCALE`, `FALLBACK_LOCALE`, plus the
  `MessagesOverride`, `Translator`, and `I18nVars` types.
- The waiting-message TTS now speaks in the configured `ttsLang` instead of a
  hard-coded `pt-BR`.

### Notes
- Backward compatible: all existing exports and props are unchanged; the new
  surface is additive and defaults preserve today's behavior.

## [1.4.0]

### Added — Plugin architecture
- `PluginRegistry` class + `Plugin` contract (`{ id, name, version, description,
  kind: 'tts'|'stt'|'wakeword'|'action'|'integration', enabled, init?, start?,
  stop?, createEngine?, createHandler?, settingsSchema? }`), mirroring the desktop
  Ania Player `PluginBase` / `TTSEngine` / `STTEngine` / `WakeWordEngine` shapes.
- All existing providers re-expressed as registered built-in plugins (wrapping the
  working code, not rewriting it): `tts-browser`, `tts-tiktok`, `tts-elevenlabs`,
  `tts-google`, `tts-azure`, `tts-piper`, `stt-browser`, `stt-google`, `action-audio`.
- `usePlugins()` hook + `plugins`, `activeTtsPlugin`, `activeSttPlugin`,
  `onPluginsReady` props on `AvatarChatbot` to register custom plugins and resolve
  the active provider per subsystem at runtime.
- New exports: `PluginRegistry`, `getDefaultRegistry`, `PLUGIN_KINDS`,
  `validatePlugin`, `registerBuiltins`, `BUILTIN_PLUGINS`, `TTS_PROVIDER_TO_PLUGIN`,
  `STT_PROVIDER_TO_PLUGIN`, and each built-in plugin object.

### Added — Wake word detection
- `WakeWordEngine` (browser port of the Chrome extension's openWakeWord engine:
  16 kHz mono, 1280-sample frames, 12-frame buffer, threshold) in
  `src/services/wake-word.js`. `onnxruntime-web` is lazy-imported and optional —
  degrades gracefully when absent.
- `useWakeWord()` hook + `getWakeWordEngine()`, `isWakeWordSupported()` exports.
- New `AvatarChatbot` props: `wakeWordEnabled`, `wakeWordModelUrl`,
  `wakeWordThreshold`, `wakeWordWasmPaths`, `onWake` (default off).

### Added — Command / external-control API
- `executeCommand(line, ctx)` (and `parseCommandLine`, `COMMAND_LIST`) porting the
  desktop socket command set: `show`, `hide`, `toggle`, `action <id|index>`,
  `actions`, `info`, `speed <idle> [talk]`, `sensitivity <v>`, `mute`, `unmute`,
  `tts <text>`, `ask <text>` (alias `provider`), `wake`, `stop`, `help`.
- `useAniaAvatarRef()` gains `runCommand(line, extraCtx?)`.
- `installPostMessageControl(ctx, options)` + `enablePostMessageControl` /
  `postMessageOrigins` props on `AvatarChatbot` — an origin-allowlisted
  `window.postMessage({ source: 'ania', cmd })` listener lets a host page drive the
  embedded avatar.

### Added — Lip-sync parity
- `lipSyncSustainStyle` (`'hold' | 'wiggle'`) and `lipSyncWiggleSpeed` props on
  `AniaAvatar` / `AvatarChatbot`, threaded into
  `configureLipsSync(enabled, intensity, responsiveness, opennessMap, sustainStyle,
  wiggleSpeed)`. Explicit props override server config; lip sync is now configured
  even without a server URL (so the sustain knobs apply to audio-driven FFT lip sync).

### Notes
- Backward compatible: all existing exports and props are unchanged. New surface is
  additive only.
