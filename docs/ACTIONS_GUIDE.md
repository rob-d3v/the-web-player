# Action Frames Guide

Action frames allow avatar animations beyond idle/talk — like waving, nodding, or custom gestures.

## How Actions Work

Actions are defined in the `.ania` avatar file with frame ranges, speed, and optional audio. They can be triggered by:

1. **Keyboard shortcuts** — hotkey combos (e.g., `ctrl+shift+h`)
2. **Programmatic API** — `triggerAction(actionId)`
3. **AI/Webhook response** — LLM includes `action` field in response

## Setup

Actions are automatically loaded from the avatar data. You can also provide them via props:

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  avatarPassword="pw"
  actions={[
    {
      id: 'wave',
      name: 'Wave',
      hotkey: 'ctrl+shift+w',
      range_low: 900,
      range_high: 960,
      speed: 1.5
    }
  ]}
  enableActionHotkeys={true}
/>
```

## Initial Action

Play an action automatically when the avatar loads:

```jsx
<AniaAvatar
  initialAction="wave"
  initialActionLoop={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ActionConfig[]` | — | Array of action configurations |
| `enableActionHotkeys` | `boolean` | `true` | Enable keyboard shortcuts |
| `initialAction` | `string` | — | Action ID to play on load |
| `initialActionLoop` | `boolean` | `false` | Loop the initial action |

## ActionConfig Interface

```typescript
interface ActionConfig {
  id: string;
  name: string;
  hotkey?: string;         // e.g., "ctrl+shift+h"
  range_low: number;       // Start frame
  range_high: number;      // End frame
  start_positions?: number[];
  speed?: number;          // 0.1-10.0
  reverse?: boolean;
  audio_base64?: string;   // WAV audio
  audio_delay_ms?: number;
}
```

## Programmatic API

```javascript
import { useAniaAvatarRef } from 'ania-avatar-react';

const { ref, triggerAction, cancelAction, getAvailableActions } = useAniaAvatarRef();

// Get available actions
const actions = getAvailableActions();
// [{ id: 'wave', name: 'Wave' }, ...]

// Trigger
triggerAction('wave');

// Cancel (with reverse animation)
cancelAction();
```

## AI-Triggered Actions

When using with a webhook/LLM, include available actions in the system prompt and parse the response:

```jsx
<AvatarChatbot
  actions={myActions}
  parseResponse={(data) => ({
    message: data.text,
    action: data.action  // action ID from LLM
  })}
/>
```
