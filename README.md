# ania-avatar-react

React library for animated avatars with TTS (6 providers including browser-side Piper ONNX), STT, lip sync, action frames, chatbot/LLM integration, and file attachments.

## Installation

```bash
npm install ania-avatar-react
```

**Peer dependencies:** `react >= 17.0.0`, `react-dom >= 17.0.0`

**Required:** Load AniaPlayer before using:
```html
<script src="https://cdn.example.com/ania-player.min.js"></script>
```

---

## Quick Start

```jsx
import { AvatarChatbot } from 'ania-avatar-react';

<AvatarChatbot
  avatarUrl="https://example.com/avatar.ania"
  avatarPassword="secret"
  webhookUrl="https://n8n.example.com/webhook/chat"
  assistantName="Luna"
  userName="User"
  enableTTS={true}
  enableSTT={true}
  enableAttachments={true}
/>
```

---

## Components

### `<AvatarChatbot />`

Full chatbot with avatar, TTS, STT, file uploads, and webhook integration.

#### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatarUrl` | `string` | - | URL to `.ania` or `.json` avatar file |
| `avatarPassword` | `string` | - | Password for encrypted `.ania` files |
| `avatarData` | `object` | - | Direct avatar data (alternative to URL) |
| `authToken` | `string` | - | Bearer token for avatar URL fetch |
| `position` | `'bottom-left'` \| `'bottom-right'` \| `'top-left'` \| `'top-right'` | `'bottom-right'` | Screen position |
| `width` | `number` | `400` | Avatar width (px) |
| `height` | `number` | `300` | Avatar height (px) |
| `transparent` | `boolean` | `false` | Transparent avatar background |
| `theme` | `'dark'` \| `'light'` \| `'blue'` \| `'purple'` | `'dark'` | Color theme |
| `startMinimized` | `boolean` | `false` | Start in minimized state |
| `preserveQuality` | `boolean` | `true` | Maintain original resolution |
| `draggable` | `boolean` | `true` | Allow drag when minimized |
| `mobileMinimizedSize` | `number` | `60` | Minimized size on mobile (px) |
| `mobileBreakpoint` | `number` | `768` | Mobile breakpoint (px) |

#### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `idleSpeed` | `number` | `1` | Idle animation speed multiplier |
| `talkSpeed` | `number` | `1` | Talk animation speed multiplier |
| `autoCalculateSpeed` | `boolean` | `true` | Auto-detect optimal speeds from FPS |
| `showSpeedControls` | `boolean` | `false` | Show speed adjustment sliders |

#### Chat Props

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
| `locale` | `string` | `'pt-BR'` | Locale for built-in UI strings ([Localization](#localization-i18n)) |
| `messagesOverride` | `Record<string, string \| string[]>` | - | Override individual built-in strings ([Localization](#localization-i18n)) |

#### TTS Props (Text-to-Speech)

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
| `ttsModel` | `string` | - | Model ID (ElevenLabs, etc) |
| `talkStartDelay` | `number` | `0` | Delay before talk animation (ms) |
| `postTalkDelay` | `number` | `1500` | Delay after speech ends (ms) |
| `minTalkDuration` | `number` | `800` | Minimum talk state duration (ms) |
| `minIdleDuration` | `number` | `400` | Minimum idle state duration (ms) |

#### STT Props (Speech-to-Text)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSTT` | `boolean` | `false` | Enable speech-to-text |
| `sttProvider` | `'browser'` \| `'google'` | `'browser'` | STT provider |
| `sttLang` | `string` | `'pt-BR'` | Recognition language |
| `sttContinuous` | `boolean` | `false` | Continuous listening (always on) |
| `sttInterimResults` | `boolean` | `true` | Show interim transcripts |
| `sttAutoSend` | `boolean` | `true` | Auto-send when phrase ends |
| `sttApiKey` | `string` | - | Google Cloud STT API key |
| `sttApiUrl` | `string` | - | Custom STT API endpoint |

#### Piper TTS Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `piperModelUrl` | `string` | - | URL to Piper ONNX model file |
| `piperModelConfigUrl` | `string` | - | URL to model config JSON |
| `piperPitch` | `number` | `1` | Pitch (0.75-1.3) |
| `piperSpeed` | `number` | `1` | Speed (0.75-1.3) |

#### Lip Sync Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lipSyncEnabled` | `boolean` | `false` | Enable real-time lip sync |
| `lipSyncServerUrl` | `string` | - | Server URL for keyframe config |
| `lipSyncIntensity` | `number` | `0.6` | Sync intensity (0-1) |
| `lipSyncResponsiveness` | `number` | `0.5` | Response speed (0.05-1) |
| `lipSyncSustainStyle` | `'hold'` \| `'wiggle'` \| `null` | `null` | Mouth behaviour during stable speech. `null` = use server config (or `'wiggle'`). |
| `lipSyncWiggleSpeed` | `number` \| `null` | `null` | Wiggle amplitude (1-6). `null` = use server config (or `5`). |

#### Action Frame Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ActionConfig[]` | - | Action configurations |
| `enableActionHotkeys` | `boolean` | `true` | Enable keyboard shortcuts |
| `initialAction` | `string` | - | Action ID to play on load |
| `initialActionLoop` | `boolean` | `false` | Loop initial action |

#### Plugin Props (new in 1.4)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `plugins` | `Plugin[]` | - | Custom plugins (TTS/STT/action/integration), registered on top of the built-ins |
| `activeTtsPlugin` | `string` | - | Force the active TTS provider by plugin id |
| `activeSttPlugin` | `string` | - | Force the active STT provider by plugin id |
| `onPluginsReady` | `(registry: PluginRegistry) => void` | - | Receives the registry once ready |

#### Wake Word Props (new in 1.4)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `wakeWordEnabled` | `boolean` | `false` | Enable on-device wake-word detection |
| `wakeWordModelUrl` | `string` | - | URL to the openWakeWord ONNX model (required) |
| `wakeWordThreshold` | `number` | `0.5` | Detection threshold (0-1) |
| `wakeWordWasmPaths` | `string` | - | Path the onnxruntime-web `.wasm` files are served from |
| `onWake` | `() => void` | - | Fired on detection. Without it, the chat opens + warms TTS |

> Wake word requires the optional peer dependency `onnxruntime-web`. If it is
> not installed the feature degrades gracefully (no wake word, no crash).

#### External Control Props (new in 1.4)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enablePostMessageControl` | `boolean` | `false` | Install an origin-allowlisted `window.postMessage` command listener |
| `postMessageOrigins` | `string[]` | - | Allowed origins. Use `['*']` to allow all (unsafe) |

A host page drives the embedded avatar with:

```js
iframeOrWindow.postMessage({ source: 'ania', cmd: 'action 1' }, targetOrigin);
```

#### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onLoad` | `(player) => void` | Avatar loaded |
| `onTalkStart` | `() => void` | Started talking |
| `onTalkEnd` | `() => void` | Stopped talking |
| `onClose` | `() => void` | Widget closed |
| `onToggleMinimize` | `(isMinimized: boolean) => void` | Minimize state changed |

---

### `<AniaAvatar />`

Standalone avatar without chat UI. Use for custom implementations.

```jsx
import { AniaAvatar } from 'ania-avatar-react';

<AniaAvatar
  avatarUrl="/avatar.ania"
  avatarPassword="secret"
  width={300}
  height={300}
  onLoad={(player) => {
    player.animationController.setTalkingState(true);
  }}
>
  {/* Custom overlay content */}
</AniaAvatar>
```

Props: Same avatar/animation/callback props as AvatarChatbot.

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

**Options:**
| Option | Type | Description |
|--------|------|-------------|
| `webhookUrl` | `string` | Webhook endpoint |
| `webhookApiKey` | `string` | API key for auth |
| `webhookHeaders` | `Record<string, string>` | Custom headers |
| `onResponse` | `(msg, data) => void` | Response callback |
| `onError` | `(err, friendly) => void` | Error callback |
| `formatRequest` | `(text, meta) => any` | Custom request format |
| `parseResponse` | `(data) => string \| object` | Custom response parser |

**Returns:**
| Field | Type | Description |
|-------|------|-------------|
| `messages` | `ChatMessage[]` | All messages |
| `sendMessage` | `(text, meta?) => Promise` | Send message |
| `isLoading` | `boolean` | Request in progress |
| `error` | `string \| null` | Last error |
| `clearMessages` | `() => void` | Clear history |

---

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

---

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
  onEnd: () => startListening(), // Auto-restart for continuous
  onError: (err) => console.error(err)
});

// Start/stop
await startListening();
stopListening();
clearTranscript();
```

---

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

// Run a desktop-style command line (new in 1.4)
runCommand('action 1');
runCommand('tts Hello there', { speak: mySpeakFn });
```

---

### `usePlugins(options)` (new in 1.4)

Create/adopt a `PluginRegistry`, register the built-ins, and layer custom plugins.

```jsx
import { usePlugins } from 'ania-avatar-react';

const { registry, setActive, resolveEngine, getByKind } = usePlugins({
  plugins: [myCustomTtsPlugin],
  activeTts: 'my-tts',
});

// Resolve the active engine for a subsystem
const ttsEngine = await resolveEngine('tts', { config: { ttsApiKey } });
await ttsEngine.speak('Hello');

// Switch active provider at runtime
setActive('tts', 'tts-piper');
```

---

### `useWakeWord(options)` (new in 1.4)

On-device wake-word detection (openWakeWord on `onnxruntime-web`).

```jsx
import { useWakeWord } from 'ania-avatar-react';

const { isListening, isLoaded, score, error } = useWakeWord({
  enabled: true,
  modelUrl: '/models/hey_ania.onnx',
  threshold: 0.5,
  wasmPaths: '/',                 // where ort .wasm files are served
  onWake: () => console.log('wake!'),
});
```

---

## Plugin Architecture (new in 1.4)

A `Plugin` is a plain object mirroring the desktop `PluginBase`:

```ts
{
  id: string;
  name: string;
  version?: string;
  description?: string;
  kind: 'tts' | 'stt' | 'wakeword' | 'action' | 'integration';
  enabled?: boolean;
  init?(ctx): void | Promise<void>;
  start?(): void;
  stop?(): void;
  createEngine?(ctx): TTSEngine | STTEngine | WakeWordEngine;  // tts/stt/wakeword
  createHandler?(ctx): any;                                    // action/integration
  settingsSchema?: object[];
}
```

The built-in providers (`tts-browser`, `tts-tiktok`, `tts-elevenlabs`,
`tts-google`, `tts-azure`, `tts-piper`, `stt-browser`, `stt-google`,
`action-audio`) are registered automatically; custom plugins are layered on
top and can override a built-in by reusing its id.

```jsx
import { PluginRegistry, registerBuiltins } from 'ania-avatar-react';

const registry = new PluginRegistry();
registerBuiltins(registry);

registry.register({
  id: 'my-tts', name: 'My TTS', version: '1.0.0', kind: 'tts',
  createEngine: () => ({ async speak(text) { /* ... */ } }),
});
registry.setActive('tts', 'my-tts');

const engine = await registry.resolveEngine('tts');
await engine.speak('Hello from my plugin');
```

---

## Command / External-Control API (new in 1.4)

`executeCommand(line, ctx)` ports the desktop socket command set to the browser.

```jsx
import { executeCommand } from 'ania-avatar-react';

executeCommand('action 1', ctx);
executeCommand('speed 1.5 2', ctx);
executeCommand('tts Hello there', ctx);
```

**Commands:** `show`, `hide`, `toggle`, `action <id|index>`, `actions`,
`info`, `speed <idle> [talk]`, `sensitivity <0..1>`, `mute`, `unmute`,
`tts <text>`, `ask <text>` (alias `provider`), `wake`, `stop`, `help`.

### Drive the avatar from a host page (postMessage)

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  enablePostMessageControl
  postMessageOrigins={['https://my-host-app.com']}
/>
```

```js
// from the host page
avatarIframe.contentWindow.postMessage(
  { source: 'ania', cmd: 'action 1' },
  'https://my-host-app.com'
);
```

The library replies with `{ source: 'ania-reply', cmd, result }`.

---

## Localization (i18n)

The library ships its own lightweight, **dependency-free** locale table for every
user-facing built-in string (greetings, waiting messages, the *Enable Sound* /
speed-slider labels, control titles, loading/error text). No `i18next` or any
other runtime is required — it's a tiny synchronous resolver with English
fallback. **~190 languages are bundled** (`en` + `pt-BR` are hand-authored; the
rest are machine-translated).

### Pick a language

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  webhookUrl="https://n8n.example.com/webhook/chat"
  locale="en"        // 'es', 'fr', 'ja', 'de', 'ar', ... (BCP-47)
/>
```

`locale` defaults to **`'pt-BR'`** (the library's original wording, so existing
apps are unaffected). Unknown codes fall back to the base language (`pt` →
`pt-BR`, `es-MX` → `es`) and finally to English — a string is never rendered as a
raw key. `<AniaAvatar>` accepts the same `locale` prop.

### Override individual strings

Supply your own copy for any key without forking the component. Scalar keys take
a string; the list keys (`greetings`, `waiting`) take a `string[]`:

```jsx
<AvatarChatbot
  locale="en"
  messagesOverride={{
    "chat.enableSound": "Turn on sound",
    "avatar.loading": "Summoning your avatar…",
    greetings: ["Hey! What's up?", "Hi there!"]
  }}
/>
```

### Helper exports

The resolver is also exported for use outside the components:

```jsx
import {
  getString, getStringList, createTranslator,
  availableLocales, hasLocale, DEFAULT_LOCALE, FALLBACK_LOCALE
} from 'ania-avatar-react';

getString('chat.enableSound', 'es');                       // 'Activar sonido'
getString('avatar.error.loadFailed', 'en', { vars: { error: 'timeout' } });
getStringList('greetings', 'ja');                          // string[]
availableLocales();                                        // ['af','am',...,'zu']

const tr = createTranslator('fr');
tr.t('chat.input.placeholder');                            // 'Tapez votre message...'
```

**String keys:** `chat.input.placeholder`, `chat.input.listening`,
`chat.enableSound`, `chat.stt.transcribing`, `chat.stt.micActive`,
`chat.stt.heardError`, `chat.stt.micAccessError`, `chat.speed.idle`,
`chat.speed.talk`, `avatar.loading`, `avatar.title.{maximize,minimize,close,
clickToMaximize,clickToMinimize}`, `avatar.error.{loadFailed,playerNotLoaded,
passwordRequired,noSource}`. **List keys:** `greetings`, `waiting`.

---

## Cache Utilities

Manage avatar cache in IndexedDB.

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

// Delete
await deleteCachedAvatar(url);
await clearAvatarCache();

// Stats
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

### n8n with Authentication

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

### File Uploads to n8n

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

## TypeScript

Full TypeScript support. Import types:

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
  CacheStats,
  // new in 1.4
  Plugin,
  PluginKind,
  PluginContext,
  TTSEngine,
  STTEngine,
  WakeWordEngineLike,
  UsePluginsOptions,
  UsePluginsResult,
  UseWakeWordOptions,
  UseWakeWordResult,
  CommandContext,
  CommandResult,
  CommandDescriptor
} from 'ania-avatar-react';
```

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Avatar | ✅ | ✅ | ✅ | ✅ |
| Browser TTS | ✅ | ✅ | ✅ | ✅ |
| Browser STT | ✅ | ❌ | ❌ | ✅ |
| Cloud TTS/STT | ✅ | ✅ | ✅ | ✅ |

**Note:** Browser STT (Web Speech API) requires Chrome or Edge.

---

## Security

This library is compiled with maximum obfuscation:
- Control flow flattening
- Dead code injection
- Debug protection
- String encryption (base64 + RC4)
- Self-defending code

---

## License

MIT
