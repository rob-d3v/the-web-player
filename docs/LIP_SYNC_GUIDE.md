# Lip Sync Guide

The Ania Web Player supports real-time lip sync animation driven by audio FFT analysis.

## How It Works

1. TTS audio plays through a cloud/Piper provider (not browser TTS)
2. Web Audio API captures the audio stream via `AnalyserNode`
3. FFT data is analyzed to extract speech frequency openness (85-3000 Hz)
4. The AnimationController maps openness to talk animation frames
5. Optional server-side keyframe configuration provides precise mouth shape mapping

## Setup

### Basic Lip Sync

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  avatarPassword="pw"
  ttsProvider="elevenlabs"
  ttsApiKey="your-key"
  lipSyncEnabled={true}
/>
```

### With Server Configuration

```jsx
<AvatarChatbot
  lipSyncEnabled={true}
  lipSyncServerUrl="https://your-server.com"
  lipSyncIntensity={0.6}
  lipSyncResponsiveness={0.5}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lipSyncEnabled` | `boolean` | `false` | Enable lip sync |
| `lipSyncServerUrl` | `string` | — | Server URL for keyframe config |
| `lipSyncIntensity` | `number` | `0.6` | Sync intensity (0-1) |
| `lipSyncResponsiveness` | `number` | `0.5` | Response speed (0.05-1) |

## Programmatic API

```javascript
import { useLipSync } from 'ania-avatar-react';

const lipSync = useLipSync({ enabled: true });

// Connect to any audio element
lipSync.connectAudioElement(audioElement);

// Read values per frame
const openness = lipSync.getSpectralOpenness(); // 0-1
const flux = lipSync.getSpectralFlux(); // 0-1
const amplitude = lipSync.getAmplitude(); // 0-1
```

## Limitations

- Browser-native TTS (`speechSynthesis`) does NOT expose an audio stream, so lip sync only works with cloud providers (ElevenLabs, Google, Azure, TikTok) or Piper TTS.
- Lip sync requires a `contentHash` in avatar data for server-side config.

## Server Config API

The lip sync server endpoint:
```
GET {serverUrl}/api/avatars/json-config/fetch?contentHash={hash}&type=lips_sync
```

Response:
```json
{
  "found": true,
  "jsonData": {
    "lips_sync_keyframes": [[327, 0.0], [400, 0.3], [500, 0.7], [600, 1.0]],
    "lips_sync_sync_intensity": 0.6,
    "lips_sync_responsiveness": 0.5,
    "lips_sync_sustain_style": "wiggle",
    "lips_sync_wiggle_speed": 5
  }
}
```
