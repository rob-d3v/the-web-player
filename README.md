# ania-avatar-react

React library for animated avatars with TTS (6 providers including browser-side Piper ONNX), STT, lip sync, action frames, chatbot/LLM integration, and file attachments.

## Installation

```bash
npm install ania-avatar-react
```

**Peer dependencies:** `react >= 17.0.0`, `react-dom >= 17.0.0`

**Required:** Load AniaPlayer before using. Pin a specific version and add a
[Subresource Integrity](https://developer.mozilla.org/docs/Web/Security/Subresource_Integrity)
hash so a compromised or MITM'd CDN cannot run tampered JavaScript in your page:
```html
<script
  src="https://cdn.example.com/ania-player@1.5.0.min.js"
  integrity="sha384-REPLACE_WITH_REAL_HASH_OF_THE_PINNED_FILE"
  crossorigin="anonymous"
></script>
```
Generate the hash for the exact file you pin, e.g.
`curl -s https://cdn.example.com/ania-player@1.5.0.min.js | openssl dgst -sha384 -binary | openssl base64 -A`,
and prefix the result with `sha384-`. The browser will refuse to execute the
script if the delivered bytes don't match.

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
| `idleSpeed` | `number` | *(unset)* | Idle animation speed multiplier. Set it to **override** the file's authored speed + FPS heuristic; applies live. Leave unset to keep the `.ania`'s own speed. |
| `talkSpeed` | `number` | *(unset)* | Talk animation speed multiplier (same precedence as `idleSpeed`). |
| `autoCalculateSpeed` | `boolean` | `true` | Auto-detect optimal speeds from FPS (used only when `idle/talkSpeed` are unset). |
| `showSpeedControls` | `boolean` | `false` | Show speed adjustment sliders |

> **Speed precedence** (low → high): `1` < FPS heuristic < speed authored in the `.ania` < explicit `idleSpeed`/`talkSpeed` prop. Changed in **1.11.0**: an explicit prop now wins and applies live (previously the file clobbered it).

#### Chat Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `webhookUrl` | `string` | - | Webhook URL for chat messages |
| `webhookApiKey` | `string` | - | API key (sent as `Bearer` + `X-API-Key`) |
| `webhookHeaders` | `Record<string, string>` | `{}` | Custom headers for webhook |
| `onSendMessage` | `(message, metadata) => string \| {message?,content?,text?,attachments?,action?} \| Promise<…>` | - | **New in 1.11.0.** Client-side responder — when set it **replaces** the webhook POST. Return the reply directly. Enables a fake/mock provider or a custom in-app AI client with no `webhookUrl`. |
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

#### NO-AI Flow Engine Props (new in 1.6)

A **deterministic, no-LLM** bubble/balloon conversation flow. The avatar speaks
each step's prompt and the user answers by tapping clickable bubbles. No model
is called until the user explicitly escalates. Free-text input keeps working
alongside the flow, and **omitting `flow`/`flowUrl` leaves behavior identical to
1.5**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flow` | `FlowDef` | - | The flow definition (see schema below). When set, option bubbles render and the avatar speaks prompts |
| `flowUrl` | `string` | - | URL to lazily fetch a flow JSON from (ignored when `flow` is given) |
| `appId` | `string` | - | Opaque app/tenant id forwarded to the capture/escalation callbacks |
| `onFlowCapture` | `({ sessionId, appId, key, value, collected }) => void` | - | Fired on every captured answer (stream to a CRM) |
| `onFlowEscalate` | `({ collected, contact, sessionId, transcript }) => void` | - | Fired when the flow escalates. `contact` = `{ name, phone, email }`. Defaults to forwarding a name-aware escalation message to the webhook |
| `initialContext` | `object` | - | Known-user fields (e.g. `{ name, email }` from auth) pre-seeded into `collected` — the chat greets a signed-in user by name and skips inputs it already has |
| `persist` | `boolean` | `true` | Persist `{ sessionId, collected, currentNodeId }` to `localStorage` so a returning visitor (same browser) is remembered (30-day TTL) |
| `persistKey` | `string` | `ania-flow-<appId\|flowId>` | Override the localStorage key |
| `flowConsentKey` | `string` | - | LGPD: gate persistence on a `collected` key — nothing is stored until `collected[flowConsentKey]` is truthy; decline/reset clears it |

##### TYPED-INPUT nodes (free-text lead capture, new in 1.7)

A node may carry an `input` spec to capture a TYPED value (name, phone/WhatsApp,
email, …) instead of clickable bubbles. The avatar still SPEAKS the prompt; the
typed answer is **silent** and goes ONLY into `collected` (never sent to the AI
webhook). The chatbot renders a labeled field + submit button (and a "Pular"
bubble when `optionalSkip:true`); Enter submits.

```js
lead_name: {
  id: 'lead_name',
  prompt: 'Como posso te chamar?',         // spoken (TTS) + shown
  input: {
    key: 'name',                           // collected.name = the typed value
    type: 'text',                          // text | email | tel | number | textarea
    placeholder: 'Seu nome',               // i18n key or literal
    required: true,                        // default true
    next: 'lead_phone'                     // advance here on a valid submit
  }
},
lead_phone: {
  id: 'lead_phone',
  prompt: 'Qual o seu WhatsApp com DDD?',
  input: {
    key: 'phone', type: 'tel',
    validate: 'phone',                     // 'email' | 'phone' | 'cep' | <regex source>
    errorMsg: 'Informe um telefone válido.', // inline error (i18n key or literal)
    next: 'lead_email'
  }
},
lead_email: {
  id: 'lead_email',
  prompt: 'E qual o seu melhor e-mail? (opcional)',
  input: {
    key: 'email', type: 'email', validate: 'email',
    required: false, optionalSkip: true,   // render a "Pular" bubble → advance, no capture
    next: 'lead_done'
  }
}
```

This name → phone → email chain streams each field to the CRM via `onFlowCapture`
and, on escalation, hands the AI the `contact` so it greets the user personally.

##### Personalization, known users & returning visitors (new in 1.7)

- **`{var}` interpolation:** node prompts AND option labels substitute `{name}`
  or `{{name}}` from `collected` (after i18n). Once `collected.name` is captured
  (or seeded), `"Prazer, {name}!"` is spoken and shown as `"Prazer, João!"`.
  A missing var resolves to empty cleanly (no raw `{name}`), so author greetings
  to read naturally without a name: `"Bem-vindo de volta, {name}!"` → `"Bem-vindo
  de volta!"`.
- **Known users:** pass `initialContext={{ name, email }}` from your auth session
  and the chat already knows the signed-in user (greets by name, skips known
  inputs). Force a re-ask on a specific input with `alwaysAsk: true`.
- **Returning visitors:** with `persist` (default on), the same browser restores
  `collected` next visit. Gate it for LGPD with `flowConsentKey`. Call
  `clearPersistedFlow()` (or `reset()`) to forget the visitor.

**Flow definition schema** (`FlowDef`):

```js
{
  id: 'support-flow',
  version: '1.0.0',
  startNode: 'welcome',
  nodes: {
    welcome: {
      id: 'welcome',
      prompt: 'How can I help?',     // string OR i18n key; spoken via TTS on enter
      speak: true,                   // default true; false = render silently, no TTS
      collectKey: 'intent',          // optional: store the picked option.value here
      options: [
        // label = bubble text (NEVER spoken); value recorded into `collected`
        { label: 'Buy',   value: 'buy',   next: 'buy_what' },
        { label: 'Support', value: 'support', next: 'support_area',
          capture: { area: 'support' } },          // merge object into collected
        { label: 'Agent', value: 'human', escalate: true } // hand off to the AI
      ]
    },
    // ... a `terminal: true` option (or node) ends the flow
  }
}
```

`capture` may be an object (merged verbatim) or a string key (stores
`option.value`). Drive it imperatively with the `flow <nodeId>` command verb.
Use the headless `useFlowEngine` hook (or the pure `flowReducer` export) to test
flows without React. A demo flow + sanity test live under `examples/`.

```jsx
<AvatarChatbot
  avatarUrl="..."
  webhookUrl="https://.../webhook"   // used only when the user escalates
  flow={myFlow}
  appId="acme"
  onFlowCapture={({ key, value, collected }) => crm.update(collected)}
/>
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
| `onSendMessage` | `(msg, meta) => string \| object \| Promise` | **New in 1.11.0.** Client-side responder that replaces the webhook POST (fake/mock provider or custom AI). |
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
`tts <text>`, `ask <text>` (alias `provider`), `flow <nodeId>` (jump the NO-AI
flow), `wake`, `stop`, `help`.

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

## Avatar Configurator (dev tool)

The library ships its own configuration UI. Render `<AvatarConfigurator>` to
tune the avatar live — position, size, theme, animation speeds/delays, TTS
provider/voice/rate/pitch, STT, chat names/greeting — and **export the tuned
props as JSX or JSON** with one click. It's a developer tool: gate it behind a
dev/staging flag (e.g. `?config`), not an end-user surface.

> _Screenshot placeholder — panel (collapsible Avatar / Layout / Animation / TTS
> / STT / Chat sections) on the left, the live avatar it controls on the right._

```jsx
import { AvatarConfigurator } from 'ania-avatar-react';
```

Only props that DIFFER from their defaults are exported, so the copied snippet
stays minimal. The last config is persisted to `localStorage` (namespaced key,
with a **Reset** button). Importing it is optional and tree-shakeable — apps
that never reference it ship none of its code, and it is SSR-safe.

### (a) Batteries-included — the panel renders the avatar

Fastest way to eyeball a config: the configurator renders the `<AvatarChatbot>`
itself next to the controls.

```jsx
<AvatarConfigurator avatarUrl="https://example.com/avatar.ania" />
```

Any `AvatarChatbot` prop can be passed inline as a starting value (panel-owned
props seed the fields; everything else — `plugins`, `flow`, callbacks — flows
through to the previewed avatar untouched).

### (b) Controlled — your app renders its own avatar

Drive the config from your own state and render the avatar yourself:

```jsx
import { useState } from 'react';
import { AvatarConfigurator, AvatarChatbot } from 'ania-avatar-react';

function Tuner() {
  const [config, setConfig] = useState({ avatarUrl: 'https://example.com/avatar.ania' });
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <AvatarConfigurator value={config} onChange={setConfig} />
      <AvatarChatbot {...config} />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Partial<AvatarChatbotProps>` | - | Controlled config (with `onChange`) |
| `onChange` | `(config) => void` | - | Controlled setter, fired on every edit |
| `defaultValue` | `Partial<AvatarChatbotProps>` | - | Uncontrolled initial config |
| `storageKey` | `string` | `'ania-avatar-configurator'` | localStorage namespace |
| `persist` | `boolean` | `true` | Persist config to localStorage |
| `showPreview` | `boolean` | `!controlled` | Render the avatar preview beside the panel |
| `exportComponentName` | `string` | `'AvatarChatbot'` | Name used in the exported JSX |
| `onExport` | `(props) => void` | - | Fired with the export-ready prop map on change |
| `layout` | `'row'` \| `'column'` | `'row'` | Preview layout |

Any other `AvatarChatbot` prop passed inline seeds the config (if the panel owns
it) or passes through to the preview.

The pure serializers are exported too, so you can build your own export UI or
snapshot configs in tests without mounting the component:

```jsx
import { configuratorToJSX, configuratorToJSON, configuratorExportProps } from 'ania-avatar-react';

configuratorToJSX({ avatarUrl: '/a.ania', theme: 'blue' }); // '<AvatarChatbot\n  avatarUrl="/a.ania"\n  theme="blue"\n/>'
```

A build-free playground lives in [`examples/configurator/`](examples/configurator/).

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

### No backend — fake / mock provider (`onSendMessage`, new in 1.11.0)

`onSendMessage` replaces the webhook POST. Return a string, or an object
`{ message | content | text, attachments?, action? }`. No `webhookUrl` needed —
great for demos, tests, or wiring a custom AI client (OpenAI/Anthropic/your own).

```jsx
// Same canned reply for every message (a "fake provider"):
<AvatarChatbot
  avatarUrl="/avatars/assistant.ania"
  assistantName="Ania"
  onSendMessage={() => 'Olá! Esta é uma resposta de teste. 🤖'}
/>

// Or call your own AI and return the text:
<AvatarChatbot
  avatarUrl="/avatars/assistant.ania"
  onSendMessage={async (message) => {
    const reply = await myAiClient.ask(message);
    return reply; // shown as the assistant bubble
  }}
/>
```

### Start from a template (`CHATBOT_TEMPLATES`, new in 1.11.0)

Ready-made personas you can spread onto the widget (or load into
`<AvatarConfigurator defaultValue={...}>`). Each has `{ id, name, emoji,
description, config, sampleReply? }` — `config` is a partial prop map, and
`sampleReply` is an optional canned answer for the `onSendMessage` fake provider.

```jsx
import { AvatarChatbot, CHATBOT_TEMPLATES, CHATBOT_TEMPLATE_BY_ID } from 'ania-avatar-react';

const support = CHATBOT_TEMPLATE_BY_ID['support'];

<AvatarChatbot
  avatarUrl="/avatars/assistant.ania"
  {...support.config}
  onSendMessage={() => support.sampleReply}  // try it with no backend
/>

// Built-in ids: greeter · support · sales · faq · playful · ai-assistant
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
