# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-08

### Added

- **Piper TTS (Browser ONNX)**
  - Run text-to-speech entirely in the browser using ONNX inference
  - No API keys required — just host an ONNX model file
  - Automatic OPFS caching (~81MB model downloaded once)
  - Props: `piperModelUrl`, `piperModelConfigUrl`, `piperPitch`, `piperSpeed`
  - `checkPiperStatus()`, `initPiper()`, `disposePiper()` utilities
- **Lip Sync System**
  - Real-time FFT-driven lip sync animation during speech
  - Web Audio API pipeline: speech frequencies (85-3000 Hz) mapped to mouth openness
  - Server-side keyframe configuration support
  - Sustain detection with wiggle mode for natural-looking held sounds
  - `useLipSync` hook for programmatic audio analysis
  - Props: `lipSyncEnabled`, `lipSyncServerUrl`, `lipSyncIntensity`, `lipSyncResponsiveness`
- **Action Frames**
  - Avatar animations beyond idle/talk (wave, nod, custom gestures)
  - Keyboard shortcut triggers (e.g., `ctrl+shift+h`)
  - Programmatic triggers via `triggerAction()` / `cancelAction()`
  - AI/webhook-triggered actions — LLM can include `action` in response
  - Post-cancel reverse animation for smooth transitions
  - Action audio playback (base64 WAV with configurable delay)
  - `useActionFrames` hook for standalone action management
- **Initial Action on Load**
  - `initialAction` prop — play an action when avatar loads
  - `initialActionLoop` prop — loop the initial action continuously
- **Agent/LLM Compatibility**
  - Ollama direct integration via `formatRequest`/`parseResponse`
  - Hermes, OpenAI-compatible API support documented
  - `availableActions` sent in webhook requests for AI-triggered actions
- **New Hooks**
  - `useLipSync` — Web Audio FFT analysis for lip sync
  - `useActionFrames` — action state management and keyboard shortcuts
- **New Utilities**
  - `parseHotkey()`, `matchesHotkey()` — keyboard shortcut parsing
  - `playActionAudio()` — base64 WAV audio playback
  - `fetchLipSyncConfig()`, `buildOpennessMap()` — lip sync configuration
- **Enhanced `useAniaAvatarRef`**
  - `triggerAction(actionId)`, `cancelAction()`
  - `getAvailableActions()`
  - `setLipSyncEnabled()`, `getLipSyncState()`

### Changed

- `useTTSDetection` now exposes `audioRef` for lip sync integration
- `useChatbot` now accepts `availableActions` and `onActionTriggered`
- `ttsProvider` union type now includes `'piper'`
- Keyless TTS providers (TikTok, Piper) no longer require `ttsApiKey`

## [1.0.0] - 2024-02-08

### Added

- Initial release of `ania-avatar-react`
- **Components**
  - `AvatarChatbot` - Full-featured chatbot widget with avatar, TTS, STT, and webhook integration
  - `AniaAvatar` - Standalone avatar component for custom implementations
- **Hooks**
  - `useChatbot` - Webhook chat management with attachments support
  - `useTTSDetection` - Text-to-speech with automatic talk state detection
  - `useSpeechRecognition` - Speech-to-text with continuous mode
  - `useAniaAvatarRef` - Direct avatar player control
- **TTS Providers**
  - Browser (Web Speech API)
  - TikTok TTS (free)
  - Google Cloud TTS
  - ElevenLabs
  - Azure
- **STT Providers**
  - Browser (Web Speech API)
  - Google Cloud STT
- **Features**
  - Encrypted `.ania` avatar file support
  - IndexedDB avatar caching
  - File attachments (images, documents)
  - Multiple themes (dark, light, blue, purple)
  - Draggable and minimizable widget
  - Mobile responsive design
  - Full TypeScript support
- **Cache Utilities**
  - `getCachedAvatar`
  - `setCachedAvatar`
  - `deleteCachedAvatar`
  - `clearAvatarCache`
  - `getCacheStats`
