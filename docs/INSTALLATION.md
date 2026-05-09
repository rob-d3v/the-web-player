# Installation Guide

Complete guide for installing and setting up `ania-avatar-react` in your project.

## Requirements

- Node.js 16 or higher
- React 17.0.0 or higher
- react-dom 17.0.0 or higher

## Installation

### Using npm

```bash
npm install ania-avatar-react
```

### Using yarn

```bash
yarn add ania-avatar-react
```

### Using pnpm

```bash
pnpm add ania-avatar-react
```

## Basic Setup

### 1. Import the Component

```jsx
import { AvatarChatbot } from 'ania-avatar-react';
```

### 2. Add to Your App

```jsx
function App() {
  return (
    <div>
      <h1>My Application</h1>

      <AvatarChatbot
        avatarUrl="https://your-server.com/avatar.ania"
        avatarPassword="your-password"
        webhookUrl="https://your-webhook.com/chat"
      />
    </div>
  );
}
```

## Framework-Specific Setup

### Next.js

For Next.js applications, use dynamic import to avoid SSR issues:

```jsx
// components/AvatarWidget.jsx
'use client';

import dynamic from 'next/dynamic';

const AvatarChatbot = dynamic(
  () => import('ania-avatar-react').then(mod => mod.AvatarChatbot),
  { ssr: false }
);

export default function AvatarWidget() {
  return (
    <AvatarChatbot
      avatarUrl="/avatar.ania"
      webhookUrl="/api/chat"
    />
  );
}
```

### Vite

Works out of the box with Vite:

```jsx
import { AvatarChatbot } from 'ania-avatar-react';

function App() {
  return <AvatarChatbot avatarUrl="/avatar.ania" webhookUrl="/api/chat" />;
}
```

### Create React App

Works directly without additional configuration:

```jsx
import { AvatarChatbot } from 'ania-avatar-react';

function App() {
  return <AvatarChatbot avatarUrl="/avatar.ania" webhookUrl="/api/chat" />;
}
```

## Environment Variables

For sensitive data like API keys, use environment variables:

### Vite

```env
# .env
VITE_WEBHOOK_URL=https://your-webhook.com/chat
VITE_GOOGLE_TTS_KEY=your-google-api-key
VITE_ELEVENLABS_KEY=your-elevenlabs-key
```

```jsx
<AvatarChatbot
  webhookUrl={import.meta.env.VITE_WEBHOOK_URL}
  ttsApiKey={import.meta.env.VITE_GOOGLE_TTS_KEY}
/>
```

### Create React App / Next.js

```env
# .env.local
REACT_APP_WEBHOOK_URL=https://your-webhook.com/chat
REACT_APP_GOOGLE_TTS_KEY=your-google-api-key
```

```jsx
<AvatarChatbot
  webhookUrl={process.env.REACT_APP_WEBHOOK_URL}
  ttsApiKey={process.env.REACT_APP_GOOGLE_TTS_KEY}
/>
```

## Hosting Avatar Files

### Option 1: Public Folder

Place `.ania` files in your public folder:

```
public/
  avatars/
    assistant.ania
```

```jsx
<AvatarChatbot avatarUrl="/avatars/assistant.ania" />
```

### Option 2: CDN or External Server

Host on any accessible URL:

```jsx
<AvatarChatbot avatarUrl="https://cdn.example.com/avatars/assistant.ania" />
```

### Option 3: With Authentication

Use `authToken` for protected avatar files:

```jsx
<AvatarChatbot
  avatarUrl="https://api.example.com/avatars/assistant.ania"
  authToken="Bearer your-jwt-token"
/>
```

## Optional: Piper TTS Setup

[Piper TTS](https://github.com/rhasspy/piper) lets you run text-to-speech entirely in the browser using ONNX models — no API keys or cloud services required.

### 1. Install the Piper package

```bash
# npm
npm install @mintplex-labs/piper-tts-web

# yarn
yarn add @mintplex-labs/piper-tts-web

# pnpm
pnpm add @mintplex-labs/piper-tts-web
```

> You can also use the `piper-tts-web` package if you prefer the community build.

### 2. Host an ONNX model

Download a Piper voice model (`.onnx` + `.onnx.json` config) from the [Piper voices repository](https://huggingface.co/rhasspy/piper-voices) and host both files on a CDN or in your `public/` folder.

```
public/
  models/
    en-us-amy-medium.onnx
    en-us-amy-medium.onnx.json
```

### 3. Use Piper in your component

```jsx
<AvatarChatbot
  enableTTS={true}
  ttsProvider="piper"
  piperModelUrl="/models/en-us-amy-medium.onnx"
  piperModelConfigUrl="/models/en-us-amy-medium.onnx.json"
/>
```

The model (~81 MB) is downloaded once and cached in the browser's Origin Private File System (OPFS). Subsequent page loads use the cached copy instantly.

See the [Piper Guide](./PIPER_GUIDE.md) and [TTS Guide](./TTS_GUIDE.md#piper-tts-browser-onnx) for voice options and advanced configuration.

---

## Troubleshooting

### Avatar not loading

1. Check if the URL is accessible (try opening in browser)
2. Verify CORS settings on the server hosting the avatar
3. Check if password is correct for encrypted avatars

### TTS not working

1. Ensure `enableTTS={true}` is set
2. For browser TTS, check if voices are available
3. For cloud providers, verify API key is correct

### STT not working

1. Browser STT only works in Chrome/Edge
2. Ensure microphone permission is granted
3. Check browser console for errors

## Next Steps

- [TTS Configuration Guide](./TTS_GUIDE.md)
- [Webhook Integration](./WEBHOOK_GUIDE.md)
- [API Reference](../README.md#props-reference)
