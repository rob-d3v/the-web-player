# ANIA Avatar React

A powerful React component library for animated avatars with Text-to-Speech (TTS), Speech-to-Text (STT), and chatbot integration.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%3E%3D17.0.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-supported-blue.svg)

## Features

- Animated avatar player with `.ania` file support
- Complete chatbot UI with webhook integration
- Text-to-Speech (TTS) - Multiple providers (Browser, TikTok, Google, ElevenLabs, Azure)
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
| `ttsProvider` | `'browser'` \| `'tiktok'` \| `'elevenlabs'` \| `'google'` \| `'azure'` | `'browser'` | TTS provider |
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

Direct avatar player control.

```jsx
import { useAniaAvatarRef } from 'ania-avatar-react';

const { ref, setTalking, play, pause } = useAniaAvatarRef();

<AniaAvatar ref={ref} avatarUrl="/avatar.ania" />

// Control
setTalking(true);
setTalking(false);
play();
pause();
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
  ChatMessage,
  ChatAttachment,
  UseChatbotOptions,
  UseChatbotResult,
  UseTTSDetectionOptions,
  UseTTSDetectionResult,
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

| Provider | Free Tier | Quality | Languages |
|----------|-----------|---------|-----------|
| **Browser** | Unlimited | Varies by OS | All system voices |
| **TikTok** | Unlimited | Good | Limited |
| **Google Cloud** | 1M chars/month | Excellent | 50+ languages |
| **ElevenLabs** | 10k chars/month | Premium | 20+ languages |
| **Azure** | 500k chars/month | Excellent | 100+ languages |

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

## Related Projects

- [ANIA Player](https://github.com/rob-d3v/ania-player) - Desktop avatar player
- [ANIA Creators](https://github.com/rob-d3v/ania-creators) - Avatar creation tool
- [ANIA Avatar Extension](https://github.com/rob-d3v/ania-avatar-extension) - Chrome extension
