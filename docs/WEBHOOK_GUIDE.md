# Webhook Integration Guide

Complete guide for integrating `ania-avatar-react` with webhook backends.

## Overview

The chatbot sends POST requests to your webhook URL with user messages and receives bot responses.

## Request Format

### Basic Message

```json
{
  "message": "Hello, how are you?"
}
```

### Message with Attachments

```json
{
  "message": "Check this image",
  "attachments": [
    {
      "name": "photo.jpg",
      "type": "image/jpeg",
      "size": 12345,
      "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
    }
  ]
}
```

## Response Format

The webhook should return JSON with the bot's response:

### Simple Response

```json
{
  "output": "Hello! I'm doing great, thanks for asking!"
}
```

### Alternative Fields

The library automatically tries these fields:
- `output`
- `message`
- `response`
- `text`
- `content`

---

## n8n Integration

### Basic n8n Webhook

1. Create a new workflow in n8n
2. Add a "Webhook" node as trigger
3. Set HTTP Method to POST
4. Copy the webhook URL

```jsx
<AvatarChatbot
  avatarUrl="/avatar.ania"
  webhookUrl="https://your-n8n.com/webhook/abc123"
/>
```

### n8n Workflow Example

```
[Webhook] -> [Function] -> [HTTP Request to AI] -> [Respond to Webhook]
```

**Function Node (Process Input):**
```javascript
const message = $input.first().json.body.message;
const attachments = $input.first().json.body.attachments || [];

return {
  message,
  hasAttachments: attachments.length > 0,
  attachments
};
```

**Respond to Webhook Node:**
```javascript
return {
  output: $input.first().json.response
};
```

### n8n with Authentication

Add authentication to your n8n webhook:

```jsx
<AvatarChatbot
  webhookUrl="https://your-n8n.com/webhook/abc123"
  webhookApiKey="your-secret-key"
  webhookHeaders={{
    'X-Workflow-Id': 'chat-workflow',
    'X-Session-Id': sessionId
  }}
/>
```

The library sends:
- `Authorization: Bearer your-secret-key`
- `X-API-Key: your-secret-key`
- Plus any custom headers

---

## Custom Backend

### Express.js Example

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // For attachments

app.post('/api/chat', async (req, res) => {
  try {
    const { message, attachments } = req.body;

    // Process message (call AI, database, etc.)
    const response = await processMessage(message, attachments);

    res.json({ output: response });
  } catch (error) {
    res.status(500).json({ error: 'Internal error' });
  }
});

app.listen(3001);
```

### Next.js API Route

```typescript
// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, attachments } = req.body;

  // Your logic here
  const response = await generateResponse(message);

  res.json({ output: response });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
```

### Python Flask

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    attachments = data.get('attachments', [])

    # Process message
    response = process_message(message, attachments)

    return jsonify({'output': response})

if __name__ == '__main__':
    app.run(port=3001)
```

---

## OpenAI Integration

### Direct Integration

```javascript
// Express.js with OpenAI
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message }
    ]
  });

  res.json({ output: completion.choices[0].message.content });
});
```

### With Image Analysis

```javascript
app.post('/api/chat', async (req, res) => {
  const { message, attachments } = req.body;

  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' }
  ];

  // Add images if present
  if (attachments?.length > 0) {
    const content = [
      { type: 'text', text: message },
      ...attachments
        .filter(a => a.type.startsWith('image/'))
        .map(a => ({
          type: 'image_url',
          image_url: { url: a.data }
        }))
    ];
    messages.push({ role: 'user', content });
  } else {
    messages.push({ role: 'user', content: message });
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages
  });

  res.json({ output: completion.choices[0].message.content });
});
```

---

## Custom Request/Response Format

Use `formatRequest` and `parseResponse` for custom formats:

```jsx
import { useChatbot } from 'ania-avatar-react';

const { sendMessage } = useChatbot({
  webhookUrl: '/api/chat',

  // Custom request format
  formatRequest: (text, metadata) => ({
    query: text,
    context: metadata.sessionId,
    files: metadata.attachments?.map(a => ({
      filename: a.name,
      content: a.data
    }))
  }),

  // Custom response parser
  parseResponse: (data) => {
    return data.result?.answer || data.fallbackMessage;
  }
});
```

---

## Error Handling

### On the Server

```javascript
app.post('/api/chat', async (req, res) => {
  try {
    const response = await processMessage(req.body.message);
    res.json({ output: response });
  } catch (error) {
    console.error('Chat error:', error);

    // Return user-friendly error
    res.status(500).json({
      error: true,
      output: 'Sorry, I encountered an error. Please try again.'
    });
  }
});
```

### On the Client

```jsx
<AvatarChatbot
  webhookUrl="/api/chat"
  onError={(error) => {
    console.error('Chat error:', error);
    // Show notification, log to analytics, etc.
  }}
/>
```

---

## Security Best Practices

### 1. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20 // 20 requests per minute
});

app.use('/api/chat', limiter);
```

### 2. Input Validation

```javascript
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message' });
  }

  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  // Process...
});
```

### 3. API Key Validation

```javascript
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] ||
                 req.headers.authorization?.replace('Bearer ', '');

  if (apiKey !== process.env.CHAT_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

app.use('/api/chat', validateApiKey);
```

### 4. File Size Limits

```jsx
<AvatarChatbot
  enableAttachments={true}
  // Library automatically limits to ~10MB base64
/>
```

On server:
```javascript
app.use(express.json({ limit: '10mb' }));
```

---

## Debugging

### Log Requests

```javascript
app.post('/api/chat', (req, res) => {
  console.log('Received:', JSON.stringify(req.body, null, 2));
  // ...
});
```

### Test with cURL

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### Browser DevTools

1. Open Network tab
2. Look for POST request to webhook URL
3. Check Request/Response payloads
