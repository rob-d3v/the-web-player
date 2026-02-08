# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
