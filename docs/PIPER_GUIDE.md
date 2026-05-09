# Piper TTS Browser Guide

Piper TTS runs ONNX-based text-to-speech directly in the browser — no server required.

## Setup

1. Install the Piper TTS web package in your project:

```bash
npm install @mintplex-labs/piper-tts-web
# or
npm install piper-tts-web
```

2. Host a Piper ONNX model file (`.onnx`, ~81MB) and its config (`.onnx.json`) on a CDN or static server.

3. Configure your component:

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  avatarPassword="password"
  ttsProvider="piper"
  piperModelUrl="https://cdn.example.com/models/en-us-amy-medium.onnx"
  piperModelConfigUrl="https://cdn.example.com/models/en-us-amy-medium.onnx.json"
  piperPitch={1.0}
  piperSpeed={1.0}
/>
```

## How It Works

- **First load**: Downloads the ONNX model (~81MB) and caches it in the browser's OPFS (Origin Private File System)
- **Subsequent loads**: Model is loaded from cache instantly
- **Synthesis**: Text is phonemized via espeak-ng WASM, then inferred through the ONNX model to produce WAV audio
- **Playback**: WAV audio is played through an `<audio>` element, which can also be connected to lip sync

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ttsProvider` | `'piper'` | `'browser'` | Set to `'piper'` to enable |
| `piperModelUrl` | `string` | — | URL to the `.onnx` model file |
| `piperModelConfigUrl` | `string` | — | URL to the `.onnx.json` config |
| `piperPitch` | `number` | `1.0` | Pitch adjustment (0.75-1.3) |
| `piperSpeed` | `number` | `1.0` | Speed adjustment (0.75-1.3) |

## Programmatic API

```javascript
import { checkPiperStatus, initPiper, disposePiper } from 'ania-avatar-react';

// Check status
const status = checkPiperStatus();
// { ready: false, modelCached: false, downloading: false, progress: 0, error: null }

// Pre-initialize
await initPiper(modelUrl, configUrl, {
  onProgress: (pct) => console.log(`Downloading: ${pct}%`),
  onReady: () => console.log('Piper ready!')
});

// Clean up
disposePiper();
```

## Fallback

If Piper fails to initialize (missing package, network error, etc.), the component automatically falls back to browser-native TTS (`speechSynthesis`).

## Model Sources

Find Piper ONNX models at:
- [Piper Voices Repository](https://github.com/rhasspy/piper/blob/master/VOICES.md)
- Models are available in multiple languages and quality levels (low, medium, high)
