# Examples

Practical examples of using `ania-avatar-react` in different scenarios.

## Table of Contents

- [Basic Chatbot](#basic-chatbot)
- [E-commerce Assistant](#e-commerce-assistant)
- [Customer Support](#customer-support)
- [Educational Tutor](#educational-tutor)
- [Streaming Overlay](#streaming-overlay)
- [Custom UI](#custom-ui)

---

## Basic Chatbot

Simple chatbot with all features enabled:

```jsx
import { AvatarChatbot } from 'ania-avatar-react';

function App() {
  return (
    <AvatarChatbot
      avatarUrl="/avatars/assistant.ania"
      avatarPassword="secret123"
      webhookUrl="https://api.example.com/chat"

      // Positioning
      position="bottom-right"
      width={400}
      height={300}

      // Appearance
      theme="dark"
      transparent={true}
      startMinimized={false}

      // Chat
      assistantName="Luna"
      userName="You"
      autoGreeting={true}

      // TTS
      enableTTS={true}
      ttsProvider="browser"
      ttsLang="en-US"

      // STT
      enableSTT={true}
      sttLang="en-US"

      // Attachments
      enableAttachments={true}
    />
  );
}
```

---

## E-commerce Assistant

Product recommendation bot with image uploads:

```jsx
import { AvatarChatbot } from 'ania-avatar-react';

function ShopAssistant() {
  const sessionId = useSessionId(); // Your session hook

  return (
    <AvatarChatbot
      avatarUrl="/avatars/shop-assistant.ania"
      webhookUrl="https://api.shop.com/chat"
      webhookHeaders={{
        'X-Session-Id': sessionId,
        'X-Store-Id': 'store-123'
      }}

      position="bottom-right"
      theme="light"

      assistantName="Emma"
      userName="Customer"

      // Enable image uploads for product search
      enableAttachments={true}

      // High quality TTS for professional feel
      enableTTS={true}
      ttsProvider="google"
      ttsApiKey={process.env.REACT_APP_GOOGLE_TTS_KEY}
      ttsVoiceId="en-US-Neural2-F"

      // Callbacks for analytics
      onTalkStart={() => analytics.track('bot_speaking')}
      onTalkEnd={() => analytics.track('bot_finished')}
    />
  );
}
```

---

## Customer Support

24/7 support bot with ticket integration:

```jsx
import { AvatarChatbot } from 'ania-avatar-react';

function SupportWidget() {
  const { user } = useAuth();

  return (
    <AvatarChatbot
      avatarUrl="/avatars/support.ania"
      webhookUrl="https://support.company.com/webhook/chat"
      webhookApiKey={process.env.REACT_APP_SUPPORT_API_KEY}
      webhookHeaders={{
        'X-User-Id': user?.id,
        'X-User-Email': user?.email,
        'X-Plan': user?.subscription
      }}

      position="bottom-right"
      theme="blue"
      width={450}
      height={350}

      assistantName="Support Team"
      userName={user?.name || "Guest"}

      // Enable file uploads for screenshots
      enableAttachments={true}

      // Professional TTS
      enableTTS={true}
      ttsProvider="azure"
      ttsApiKey={process.env.REACT_APP_AZURE_TTS_KEY}
      ttsVoiceId="en-US-JennyNeural"

      // Continuous listening for hands-free support
      enableSTT={true}
      sttContinuous={false}
      sttAutoSend={true}
    />
  );
}
```

---

## Educational Tutor

Interactive learning assistant:

```jsx
import { AvatarChatbot } from 'ania-avatar-react';

function TutorBot({ subject, studentLevel }) {
  return (
    <AvatarChatbot
      avatarUrl={`/avatars/tutor-${subject}.ania`}
      webhookUrl="https://learn.example.com/api/tutor"
      webhookHeaders={{
        'X-Subject': subject,
        'X-Level': studentLevel
      }}

      position="bottom-left"
      theme="purple"
      width={500}
      height={400}

      assistantName="Professor"
      userName="Student"

      // Clear, slow speech for learning
      enableTTS={true}
      ttsProvider="google"
      ttsApiKey={process.env.REACT_APP_GOOGLE_TTS_KEY}
      ttsVoiceId="en-US-Wavenet-D"
      ttsRate={0.9}  // Slightly slower

      // STT for verbal answers
      enableSTT={true}
      sttLang="en-US"
      sttInterimResults={true}

      // Allow image uploads for homework help
      enableAttachments={true}

      // Longer delays for comprehension
      postTalkDelay={2000}
    />
  );
}
```

---

## Streaming Overlay

Avatar for OBS/streaming:

```jsx
import { AniaAvatar, useTTSDetection } from 'ania-avatar-react';
import { useEffect, useState } from 'react';

function StreamOverlay() {
  const [player, setPlayer] = useState(null);

  const { speak, cancel } = useTTSDetection({
    onTalkStart: () => player?.animationController.setTalkingState(true),
    onTalkEnd: () => player?.animationController.setTalkingState(false),
    ttsProvider: 'elevenlabs',
    ttsConfig: {
      ttsApiKey: process.env.REACT_APP_ELEVENLABS_KEY,
      ttsVoiceId: '21m00Tcm4TlvDq8ikWAM'
    }
  });

  // Listen for TTS commands from chat/donations
  useEffect(() => {
    const ws = new WebSocket('wss://your-stream-server.com/tts');
    ws.onmessage = (event) => {
      const { text } = JSON.parse(event.data);
      speak(text);
    };
    return () => ws.close();
  }, [speak]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      width: 300,
      height: 300
    }}>
      <AniaAvatar
        avatarUrl="/avatars/streamer.ania"
        width={300}
        height={300}
        transparent={true}
        preserveQuality={true}
        onLoad={setPlayer}
      />
    </div>
  );
}
```

---

## Custom UI

Build your own chat interface:

```jsx
import {
  AniaAvatar,
  useChatbot,
  useTTSDetection,
  useSpeechRecognition
} from 'ania-avatar-react';
import { useState, useRef } from 'react';

function CustomChat() {
  const [player, setPlayer] = useState(null);
  const inputRef = useRef();

  // Chat hook
  const { messages, sendMessage, isLoading } = useChatbot({
    webhookUrl: '/api/chat',
    onResponse: (msg) => speak(msg.content)
  });

  // TTS hook
  const { isTalking, speak, cancel } = useTTSDetection({
    onTalkStart: () => player?.animationController.setTalkingState(true),
    onTalkEnd: () => player?.animationController.setTalkingState(false),
    ttsProvider: 'browser',
    ttsConfig: { ttsLang: 'en-US' }
  });

  // STT hook
  const {
    isListening,
    transcript,
    startListening,
    stopListening
  } = useSpeechRecognition({
    sttLang: 'en-US',
    onFinalTranscript: (text) => {
      sendMessage(text);
    }
  });

  const handleSend = () => {
    const text = inputRef.current.value;
    if (text.trim()) {
      sendMessage(text);
      inputRef.current.value = '';
    }
  };

  return (
    <div className="custom-chat">
      {/* Avatar */}
      <div className="avatar-container">
        <AniaAvatar
          avatarUrl="/avatar.ania"
          width={200}
          height={200}
          transparent={true}
          onLoad={setPlayer}
        />
        {isTalking && <span className="speaking-indicator">Speaking...</span>}
      </div>

      {/* Messages */}
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong>
            <p>{msg.content}</p>
          </div>
        ))}
        {isLoading && <div className="loading">Thinking...</div>}
      </div>

      {/* Input */}
      <div className="input-area">
        <input
          ref={inputRef}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          value={isListening ? transcript : undefined}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Send
        </button>
        <button
          onClick={isListening ? stopListening : startListening}
          className={isListening ? 'recording' : ''}
        >
          {isListening ? '🔴 Stop' : '🎤 Voice'}
        </button>
        {isTalking && (
          <button onClick={cancel}>
            ⏹️ Stop Speaking
          </button>
        )}
      </div>
    </div>
  );
}
```

### CSS for Custom UI

```css
.custom-chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.speaking-indicator {
  color: #4CAF50;
  font-size: 14px;
  margin-top: 10px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 10px;
}

.message {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
}

.message.user {
  background: #e3f2fd;
  margin-left: 20%;
}

.message.assistant {
  background: white;
  margin-right: 20%;
}

.loading {
  text-align: center;
  color: #666;
  padding: 10px;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.input-area input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.input-area button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: #2196F3;
  color: white;
  cursor: pointer;
}

.input-area button:disabled {
  background: #ccc;
}

.input-area button.recording {
  background: #f44336;
}
```

---

## More Examples

- Check the [README](../README.md) for prop references
- See [TTS Guide](./TTS_GUIDE.md) for voice configuration
- See [Webhook Guide](./WEBHOOK_GUIDE.md) for backend integration
