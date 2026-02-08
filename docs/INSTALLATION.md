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
