# LLM / Agent Integration Guide

The Ania Web Player connects to any LLM or AI agent through its webhook system. This includes Ollama, Hermes, OpenAI, and any custom server.

## Ollama (Direct)

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

## Hermes (via Ollama)

```jsx
<AvatarChatbot
  webhookUrl="http://localhost:11434/api/chat"
  formatRequest={(text) => ({
    model: 'hermes3',
    messages: [
      { role: 'system', content: 'You are a helpful assistant avatar.' },
      { role: 'user', content: text }
    ],
    stream: false
  })}
  parseResponse={(data) => data.message?.content}
/>
```

## OpenAI-Compatible APIs

```jsx
<AvatarChatbot
  webhookUrl="https://api.openai.com/v1/chat/completions"
  webhookHeaders={{ 'Authorization': 'Bearer YOUR_API_KEY' }}
  formatRequest={(text) => ({
    model: 'gpt-4',
    messages: [{ role: 'user', content: text }]
  })}
  parseResponse={(data) => data.choices?.[0]?.message?.content}
/>
```

## Action Triggers from LLM

When `actions` are provided, the webhook request includes `availableActions` so the LLM can trigger avatar actions:

```jsx
<AvatarChatbot
  actions={avatarData.actions}
  webhookUrl="http://localhost:11434/api/chat"
  formatRequest={(text, meta) => ({
    model: 'hermes3',
    messages: [
      {
        role: 'system',
        content: `You can trigger actions: ${JSON.stringify(meta.availableActions)}. Include "action": "actionId" in your response.`
      },
      { role: 'user', content: text }
    ],
    stream: false
  })}
  parseResponse={(data) => {
    const content = data.message?.content;
    try {
      const parsed = JSON.parse(content);
      return { message: parsed.message, action: parsed.action };
    } catch {
      return content;
    }
  }}
/>
```

## Important Notes

- All LLMs run **server-side only** — the web player connects via HTTP
- The `formatRequest` and `parseResponse` functions let you adapt to any API format
- For streaming responses, implement a proxy server that buffers the stream
