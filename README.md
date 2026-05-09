# ANIA Avatar React

A powerful React component library for animated avatars with Text-to-Speech (TTS), Speech-to-Text (STT), and chatbot integration.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%3E%3D17.0.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-supported-blue.svg)

---

## What is ANIA?

**ANIA** (Animated Network Interactive Avatars) is a complete ecosystem for creating, customizing, and using animated avatars in your applications. Whether you're building chatbots, streaming overlays, virtual assistants, or interactive experiences - ANIA has you covered.

### Get Avatars

Visit **[aniamodels.shop](https://aniamodels.shop)** to:

- Browse and download avatars from the **Marketplace**
- Find free and premium avatar models
- Discover avatars created by the community
- Upload and sell your own avatar creations

### ANIA Ecosystem Tools

| Tool | Description | Download |
|------|-------------|----------|
| **ANIA Player** | Desktop application to play and interact with avatars. Perfect for streaming, presentations, and desktop use. | [Windows](https://github.com/rob-d3v/ania-player/releases) |
| **ANIA Creators** | Create and customize your own animated avatars. Design unique characters with custom animations. | [Windows](https://github.com/rob-d3v/ania-creators/releases) |
| **ANIA Avatar React** | This library! Integrate avatars into React/web applications with full TTS, STT, and chatbot support. | `npm install ania-avatar-react` |
| **ANIA Avatar Extension** | Chrome extension to chat with your avatar on any website. Includes TTS, STT, and Wake Word detection. | [Download](https://github.com/rob-d3v/ania-avatar-extension) |

### Use Cases

- **Streaming & Gaming** - Animated avatar overlay for OBS/Twitch
- **Customer Support** - 24/7 AI chatbot with a friendly face
- **Education** - Interactive tutors and learning assistants
- **E-commerce** - Product recommendation bots
- **Presentations** - Engaging virtual presenters
- **Websites** - Interactive chat widgets

---

## Features

- Animated avatar player with `.ania` file support
- Complete chatbot UI with webhook integration
- Text-to-Speech (TTS) - Multiple providers (Browser, TikTok, Google, ElevenLabs, Azure, **Piper**)
- **Piper TTS** - Browser-side ONNX inference, no API keys needed
- **Real-time lip sync** - FFT-driven mouth animation during speech
- **Action frames** - Custom avatar gestures (wave, nod, etc.) triggered by hotkeys, API, or AI
- **Initial action** - Play an action automatically when avatar loads
- **LLM/Agent integration** - Connect to Ollama, Hermes, OpenAI, or any webhook
- Speech-to-Text (STT) - Browser and Google Cloud support
- File attachments support (images, documents)
- Customizable themes (dark, light, blue, purple)
- Draggable and minimizable widget
- Full TypeScript support
- Mobile responsive

---

## Installation

```bash
npm install ania-avatar-react
```

**Peer dependencies:**
```bash
npm install react react-dom
```

> Requires `react >= 17.0.0` and `react-dom >= 17.0.0`

---

## Quick Start

```jsx
import { AvatarChatbot } from 'ania-avatar-react';

function App() {
  return (
    <AvatarChatbot
      avatarUrl="https://example.com/avatar.ania"
      avatarPassword="your-password"
      webhookUrl="https://your-webhook.com/chat"
      assistantName="Luna"
      userName="User"
      enableTTS={true}
      enableSTT={true}
      enableAttachments={true}
    />
  );
}
```

---

## Components

### `<AvatarChatbot />`

Full-featured chatbot widget with avatar, TTS, STT, file uploads, and webhook integration.

```jsx
<AvatarChatbot
  avatarUrl="/avatars/assistant.ania"
  avatarPassword="secret"
  webhookUrl="https://api.example.com/chat"
  position="bottom-right"
  theme="dark"
  width={400}
  height={300}
  assistantName="Luna"
  userName="User"
  enableTTS={true}
  enableSTT={true}
  enableAttachments={true}
  startMinimized={false}
/>
```

### `<AniaAvatar />`

Standalone avatar component without chat UI. Perfect for custom implementations.

```jsx
import { AniaAvatar } from 'ania-avatar-react';

<AniaAvatar
  avatarUrl="/avatar.ania"
  avatarPassword="secret"
  width={300}
  height={300}
  onLoad={(player) => {
    // Control the avatar directly
    player.animationController.setTalkingState(true);
  }}
>
  {/* Optional overlay content */}
</AniaAvatar>
```

---

## Props Reference

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatarUrl` | `string` | - | URL to `.ania` or `.json` avatar file |
| `avatarPassword` | `string` | - | Password for encrypted `.ania` files |
| `avatarData` | `object` | - | Direct avatar data (alternative to URL) |
| `authToken` | `string` | - | Bearer token for avatar URL fetch |
| `position` | `'bottom-left'` \| `'bottom-right'` \| `'top-left'` \| `'top-right'` | `'bottom-right'` | Screen position |
| `width` | `number` | `400` | Avatar width in pixels |
| `height` | `number` | `300` | Avatar height in pixels |
| `transparent` | `boolean` | `false` | Transparent avatar background |
| `theme` | `'dark'` \| `'light'` \| `'blue'` \| `'purple'` | `'dark'` | Color theme |
| `startMinimized` | `boolean` | `false` | Start in minimized state |
| `preserveQuality` | `boolean` | `true` | Maintain original resolution |
| `draggable` | `boolean` | `true` | Allow dragging when minimized |
| `mobileMinimizedSize` | `number` | `60` | Minimized size on mobile (px) |
| `mobileBreakpoint` | `number` | `768` | Mobile breakpoint (px) |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `idleSpeed` | `number` | `1` | Idle animation speed multiplier |
| `talkSpeed` | `number` | `1` | Talk animation speed multiplier |
| `autoCalculateSpeed` | `boolean` | `true` | Auto-detect optimal speeds from FPS |
| `showSpeedControls` | `boolean` | `false` | Show speed adjustment sliders |

### Chat Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `webhookUrl` | `string` | - | Webhook URL for chat messages |
| `webhookApiKey` | `string` | - | API key (sent as `Bearer` + `X-API-Key`) |
| `webhookHeaders` | `Record<string, string>` | `{}` | Custom headers for webhook |
| `autoGreeting` | `boolean` | `true` | Auto greeting on load |
| `assistantName` | `string` | `'Assistant'` | Name shown on bot messages |
| `userName` | `string` | `'You'` | Name shown on user messages |
| `enableAttachments` | `boolean` | `false` | Enable file/image uploads |
| `transparentChat` | `boolean` | `false` | Transparent chat background |

### TTS Props (Text-to-Speech)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableTTS` | `boolean` | `true` | Enable text-to-speech |
| `ttsProvider` | `'browser'` \| `'tiktok'` \| `'elevenlabs'` \| `'google'` \| `'azure'` \| `'piper'` | `'browser'` | TTS provider |
| `ttsVoice` | `string` | `'auto'` | Voice name (browser TTS) |
| `ttsVoiceId` | `string` | - | Voice ID (cloud providers) |
| `ttsGender` | `'auto'` \| `'male'` \| `'female'` | `'auto'` | Preferred voice gender |
| `ttsLang` | `string` | `'pt-BR'` | Language code |
| `ttsRate` | `number` | `1` | Speech rate (0.5-2) |
| `ttsPitch` | `number` | `1` | Speech pitch (0.5-2) |
| `ttsApiKey` | `string` | - | API key for cloud TTS |
| `ttsApiUrl` | `string` | - | Custom TTS API endpoint |
| `ttsModel` | `string` | - | Model ID (ElevenLabs, etc.) |
| `talkStartDelay` | `number` | `0` | Delay before talk animation (ms) |
| `postTalkDelay` | `number` | `1500` | Delay after speech ends (ms) |
| `minTalkDuration` | `number` | `800` | Minimum talk state duration (ms) |
| `minIdleDuration` | `number` | `400` | Minimum idle state duration (ms) |

### STT Props (Speech-to-Text)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSTT` | `boolean` | `false` | Enable speech-to-text |
| `sttProvider` | `'browser'` \| `'google'` | `'browser'` | STT provider |
| `sttLang` | `string` | `'pt-BR'` | Recognition language |
| `sttContinuous` | `boolean` | `false` | Continuous listening mode |
| `sttInterimResults` | `boolean` | `true` | Show interim transcripts |
| `sttAutoSend` | `boolean` | `true` | Auto-send when phrase ends |
| `sttApiKey` | `string` | - | Google Cloud STT API key |
| `sttApiUrl` | `string` | - | Custom STT API endpoint |

### Piper TTS Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `piperModelUrl` | `string` | - | URL to Piper ONNX model file |
| `piperModelConfigUrl` | `string` | - | URL to model config JSON |
| `piperPitch` | `number` | `1` | Pitch adjustment (0.75-1.3) |
| `piperSpeed` | `number` | `1` | Speed adjustment (0.75-1.3) |

### Lip Sync Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lipSyncEnabled` | `boolean` | `false` | Enable real-time lip sync |
| `lipSyncServerUrl` | `string` | - | Server URL for keyframe config |
| `lipSyncIntensity` | `number` | `0.6` | Sync intensity (0-1) |
| `lipSyncResponsiveness` | `number` | `0.5` | Response speed (0.05-1) |

### Action Frame Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ActionConfig[]` | - | Custom action configurations |
| `enableActionHotkeys` | `boolean` | `true` | Enable keyboard shortcuts |
| `initialAction` | `string` | - | Action ID to play on load |
| `initialActionLoop` | `boolean` | `false` | Loop the initial action |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onLoad` | `(player) => void` | Called when avatar is loaded |
| `onTalkStart` | `() => void` | Called when avatar starts talking |
| `onTalkEnd` | `() => void` | Called when avatar stops talking |
| `onClose` | `() => void` | Called when widget is closed |
| `onToggleMinimize` | `(isMinimized: boolean) => void` | Called when minimize state changes |

---

## Hooks

### `useChatbot(options)`

Manage webhook chat with authentication and attachments.

```jsx
import { useChatbot } from 'ania-avatar-react';

const { messages, sendMessage, isLoading, error, clearMessages } = useChatbot({
  webhookUrl: 'https://n8n.example.com/webhook/chat',
  webhookApiKey: 'your-api-key',
  webhookHeaders: { 'X-Session': 'abc123' },
  onResponse: (msg, rawData) => console.log('Bot:', msg.content),
  onError: (err, friendlyMsg) => console.error(err),
  formatRequest: (text, meta) => ({ message: text, ...meta }),
  parseResponse: (data) => data.output || data.message
});

// Send message
await sendMessage('Hello!');

// Send with attachments
await sendMessage('Check this', {
  attachments: [{
    name: 'photo.jpg',
    type: 'image/jpeg',
    size: 12345,
    data: 'data:image/jpeg;base64,...'
  }]
});

// Clear history
clearMessages();
```

### `useTTSDetection(options)`

Text-to-speech with automatic talk state detection.

```jsx
import { useTTSDetection } from 'ania-avatar-react';

const { isTalking, speak, cancel } = useTTSDetection({
  pauseThreshold: 350,
  idleTransitionDelay: 1500,
  onTalkStart: () => player.animationController.setTalkingState(true),
  onTalkEnd: () => player.animationController.setTalkingState(false),
  ttsProvider: 'browser',
  ttsConfig: {
    ttsLang: 'pt-BR',
    ttsRate: 1.0,
    ttsPitch: 1.0
  }
});

// Speak text
speak('Hello world!', {
  lang: 'en-US',
  rate: 1.0,
  pitch: 1.0,
  cancelPrevious: true
});

// Stop speaking
cancel();
```

### `useSpeechRecognition(options)`

Speech-to-text with continuous mode support.

```jsx
import { useSpeechRecognition } from 'ania-avatar-react';

const {
  isListening,
  transcript,
  interimTranscript,
  startListening,
  stopListening,
  clearTranscript
} = useSpeechRecognition({
  sttProvider: 'browser',
  sttLang: 'pt-BR',
  sttContinuous: true,
  sttInterimResults: true,
  onTranscriptChange: (text, isFinal) => console.log(text),
  onFinalTranscript: (text) => sendMessage(text),
  onEnd: () => startListening(),
  onError: (err) => console.error(err)
});
```

### `useAniaAvatarRef()`

Direct avatar player control with action and lip sync support.

```jsx
import { useAniaAvatarRef } from 'ania-avatar-react';

const {
  ref, setTalking, play, pause,
  triggerAction, cancelAction, getAvailableActions,
  setLipSyncEnabled, getLipSyncState
} = useAniaAvatarRef();

<AniaAvatar ref={ref} avatarUrl="/avatar.ania" />

// Basic control
setTalking(true);
play();
pause();

// Actions
const actions = getAvailableActions(); // [{ id: 'wave', name: 'Wave' }]
triggerAction('wave');
cancelAction();

// Lip sync
setLipSyncEnabled(true);
const state = getLipSyncState(); // { enabled: true, envelope: 0.5 }
```

### `useLipSync(options)`

Web Audio API lip sync analysis.

```jsx
import { useLipSync } from 'ania-avatar-react';

const lipSync = useLipSync({ enabled: true, fftSize: 2048, smoothing: 0.8 });

// Connect to an audio element
lipSync.connectAudioElement(audioElement);

// Read FFT data per frame
const openness = lipSync.getSpectralOpenness(); // 0-1
const flux = lipSync.getSpectralFlux();         // 0-1
const amplitude = lipSync.getAmplitude();       // 0-1

// Cleanup
lipSync.disconnect();
```

### `useActionFrames(options)`

Action frame management with keyboard shortcuts.

```jsx
import { useActionFrames } from 'ania-avatar-react';

const { activeAction, availableActions, triggerAction, cancelAction } = useActionFrames({
  actions: avatarData.actions,
  enabled: true,
  enableHotkeys: true,
  animationController: player.animationController
});

triggerAction('wave');
cancelAction();
```

---

## Cache Utilities

Manage avatar cache in IndexedDB for offline support and faster loading.

```jsx
import {
  getCachedAvatar,
  setCachedAvatar,
  deleteCachedAvatar,
  clearAvatarCache,
  getCacheStats
} from 'ania-avatar-react';

// Get from cache
const data = await getCachedAvatar('https://example.com/avatar.ania');

// Save to cache
await setCachedAvatar(url, avatarData, isEncrypted);

// Delete single entry
await deleteCachedAvatar(url);

// Clear all cache
await clearAvatarCache();

// Get cache statistics
const { count, size, sizeFormatted } = await getCacheStats();
// { count: 3, size: 15728640, sizeFormatted: '15 MB' }
```

---

## Examples

### Basic Chatbot

```jsx
<AvatarChatbot
  avatarUrl="/avatars/assistant.ania"
  avatarPassword="123"
  webhookUrl="https://api.example.com/chat"
  position="bottom-right"
  theme="dark"
  assistantName="Luna"
  userName="User"
  enableTTS={true}
  enableSTT={true}
  enableAttachments={true}
/>
```

### n8n Integration with Authentication

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  avatarPassword="secret"
  webhookUrl="https://n8n.example.com/webhook/abc123"
  webhookApiKey={process.env.REACT_APP_N8N_API_KEY}
  webhookHeaders={{
    'X-Workflow-Id': 'my-workflow',
    'X-Session-Id': sessionId
  }}
  enableAttachments={true}
/>
```

### Google Cloud TTS

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  webhookUrl="/api/chat"
  enableTTS={true}
  ttsProvider="google"
  ttsApiKey={process.env.REACT_APP_GOOGLE_TTS_KEY}
  ttsVoiceId="pt-BR-Wavenet-B"
  ttsLang="pt-BR"
  ttsRate={1.0}
  ttsPitch={1.0}
/>
```

### ElevenLabs TTS

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  webhookUrl="/api/chat"
  enableTTS={true}
  ttsProvider="elevenlabs"
  ttsApiKey={process.env.REACT_APP_ELEVENLABS_KEY}
  ttsVoiceId="21m00Tcm4TlvDq8ikWAM"
  ttsModel="eleven_monolingual_v1"
/>
```

### Browser TTS (Windows Voice)

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  webhookUrl="/api/chat"
  enableTTS={true}
  ttsProvider="browser"
  ttsVoice="Microsoft Daniel - Portuguese (Brazil)"
  ttsLang="pt-BR"
  ttsRate={1.0}
  ttsPitch={0.95}
/>
```

### Continuous STT (Always Listening)

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  webhookUrl="/api/chat"
  enableSTT={true}
  sttContinuous={true}
  sttAutoSend={true}
  sttLang="pt-BR"
/>
```

### File Uploads

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  webhookUrl="/api/chat"
  enableAttachments={true}
/>

// Webhook receives:
// {
//   message: "Check this image",
//   attachments: [{
//     name: "photo.jpg",
//     type: "image/jpeg",
//     size: 12345,
//     data: "data:image/jpeg;base64,..."
//   }]
// }
```

### Piper TTS (Browser ONNX - No API Key)

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  avatarPassword="pw"
  webhookUrl="/api/chat"
  ttsProvider="piper"
  piperModelUrl="https://cdn.example.com/models/en-us-amy-medium.onnx"
  piperModelConfigUrl="https://cdn.example.com/models/en-us-amy-medium.onnx.json"
  piperPitch={1.0}
  piperSpeed={1.0}
/>
```

### Lip Sync with ElevenLabs

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  avatarPassword="pw"
  webhookUrl="/api/chat"
  ttsProvider="elevenlabs"
  ttsApiKey="your-key"
  lipSyncEnabled={true}
  lipSyncServerUrl="https://your-server.com"
  lipSyncIntensity={0.7}
/>
```

### Action Frames with Initial Action

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  avatarPassword="pw"
  webhookUrl="/api/chat"
  actions={[
    { id: 'wave', name: 'Wave', hotkey: 'ctrl+shift+w', range_low: 900, range_high: 960, speed: 1.5 },
    { id: 'nod', name: 'Nod', hotkey: 'ctrl+shift+n', range_low: 970, range_high: 1010, speed: 1.0 }
  ]}
  initialAction="wave"
  initialActionLoop={false}
  enableActionHotkeys={true}
/>
```

### Ollama / Local LLM

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  avatarPassword="pw"
  webhookUrl="http://localhost:11434/api/chat"
  formatRequest={(text) => ({
    model: 'llama3',
    messages: [{ role: 'user', content: text }],
    stream: false
  })}
  parseResponse={(data) => data.message?.content}
/>
```

### Custom Implementation

```jsx
import { AniaAvatar, useTTSDetection, useChatbot } from 'ania-avatar-react';

function CustomChat() {
  const [player, setPlayer] = useState(null);

  const { messages, sendMessage, isLoading } = useChatbot({
    webhookUrl: '/api/chat',
    onResponse: (msg) => speak(msg.content)
  });

  const { isTalking, speak } = useTTSDetection({
    onTalkStart: () => player?.animationController.setTalkingState(true),
    onTalkEnd: () => player?.animationController.setTalkingState(false)
  });

  return (
    <div>
      <AniaAvatar
        avatarUrl="/avatar.ania"
        onLoad={setPlayer}
        width={200}
        height={200}
      />
      <div>
        {messages.map(m => <div key={m.id}>{m.content}</div>)}
      </div>
      <input onKeyPress={e => e.key === 'Enter' && sendMessage(e.target.value)} />
    </div>
  );
}
```

---

## TypeScript Support

Full TypeScript support is included. Import types directly:

```typescript
import type {
  AniaAvatarProps,
  AvatarChatbotProps,
  ActionConfig,
  ActionInfo,
  PiperStatus,
  ChatMessage,
  ChatAttachment,
  UseChatbotOptions,
  UseChatbotResult,
  UseTTSDetectionOptions,
  UseTTSDetectionResult,
  UseLipSyncOptions,
  UseLipSyncResult,
  UseActionFramesOptions,
  UseActionFramesResult,
  UseSpeechRecognitionOptions,
  UseSpeechRecognitionResult,
  UseAniaAvatarRefResult,
  SpeakOptions,
  CacheStats
} from 'ania-avatar-react';
```

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Avatar | Yes | Yes | Yes | Yes |
| Browser TTS | Yes | Yes | Yes | Yes |
| Browser STT | Yes | No | No | Yes |
| Cloud TTS/STT | Yes | Yes | Yes | Yes |

> **Note:** Browser STT (Web Speech API) requires Chrome or Edge for best compatibility.

---

## TTS Providers Comparison

| Provider | Free Tier | Quality | Languages | Lip Sync |
|----------|-----------|---------|-----------|----------|
| **Browser** | Unlimited | Varies by OS | All system voices | No |
| **TikTok** | Unlimited | Good | Limited | Yes |
| **Piper** | Unlimited (local) | Good-Excellent | 20+ languages | Yes |
| **Google Cloud** | 1M chars/month | Excellent | 50+ languages | Yes |
| **ElevenLabs** | 10k chars/month | Premium | 20+ languages | Yes |
| **Azure** | 500k chars/month | Excellent | 100+ languages | Yes |

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

## Author

**robd3v** - [GitHub](https://github.com/rob-d3v) | [LinkedIn](https://www.linkedin.com/in/robseng/)

---

## ANIA Ecosystem

### Official Website & Marketplace

**[aniamodels.shop](https://aniamodels.shop)** - The official ANIA platform where you can:

- Download free and premium avatars
- Explore the avatar marketplace
- Upload and sell your creations
- Access tutorials and guides
- Join the community

### Desktop & Mobile Tools

| Tool | Platform | Description |
|------|----------|-------------|
| [ANIA Player](https://github.com/rob-d3v/ania-player) | Windows, Linux (soon) | Desktop application to play avatars. Use for streaming, presentations, or as a desktop companion. |
| [ANIA Creators](https://github.com/rob-d3v/ania-creators) | Windows, Linux (soon) | Create and customize your own animated avatars with the visual editor. |

### Web & Browser Tools

| Tool | Platform | Description |
|------|----------|-------------|
| [ANIA Avatar React](https://github.com/rob-d3v/ania-avatar-react) | npm / Web | This library - integrate avatars into React applications. |
| [ANIA Avatar Extension](https://github.com/rob-d3v/ania-avatar-extension) | Chrome | Browser extension to chat with your avatar on any website. |

### Community

- [YouTube](https://youtube.com/@robd3v) - Tutorials and guides
- [Discord](#) - Community chat
- [LinkedIn](https://www.linkedin.com/in/robseng/) - Connect with the developer
