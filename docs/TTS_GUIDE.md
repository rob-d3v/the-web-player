# Text-to-Speech (TTS) Guide

Complete guide for configuring TTS providers in `ania-avatar-react`.

## Available Providers

| Provider | Cost | Quality | Setup |
|----------|------|---------|-------|
| Browser | Free | Varies | None |
| TikTok | Free | Good | None |
| Google Cloud | 1M chars/month free | Excellent | API Key |
| ElevenLabs | 10k chars/month free | Premium | API Key |
| Azure | 500k chars/month free | Excellent | API Key |

---

## Browser TTS (Default)

Uses the Web Speech API built into browsers. Quality varies by operating system.

```jsx
<AvatarChatbot
  enableTTS={true}
  ttsProvider="browser"
  ttsLang="pt-BR"
  ttsRate={1.0}
  ttsPitch={1.0}
/>
```

### Selecting Specific Voices

Windows has high-quality Microsoft voices:

```jsx
// Windows - Portuguese
<AvatarChatbot
  ttsProvider="browser"
  ttsVoice="Microsoft Daniel - Portuguese (Brazil)"
  ttsLang="pt-BR"
/>

// Windows - English
<AvatarChatbot
  ttsProvider="browser"
  ttsVoice="Microsoft David - English (United States)"
  ttsLang="en-US"
/>
```

### Auto Voice Selection

Let the library choose the best available voice:

```jsx
<AvatarChatbot
  ttsProvider="browser"
  ttsGender="male"  // or "female" or "auto"
  ttsLang="pt-BR"
/>
```

---

## TikTok TTS (Free)

100% free TikTok voices. Good quality, no API key needed.

```jsx
<AvatarChatbot
  enableTTS={true}
  ttsProvider="tiktok"
  ttsVoiceId="br_001"  // Brazilian Portuguese male
/>
```

### Available TikTok Voices

| Voice ID | Language | Gender |
|----------|----------|--------|
| `br_001` | Portuguese (BR) | Male |
| `br_002` | Portuguese (BR) | Female |
| `en_us_001` | English (US) | Female |
| `en_us_002` | English (US) | Male |
| `en_uk_001` | English (UK) | Male |

---

## Google Cloud TTS

High-quality neural voices. 1 million characters/month FREE.

### Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the "Cloud Text-to-Speech API"
3. Create an API key
4. Restrict the key to "Cloud Text-to-Speech API"

### Usage

```jsx
<AvatarChatbot
  enableTTS={true}
  ttsProvider="google"
  ttsApiKey="YOUR_GOOGLE_API_KEY"
  ttsVoiceId="pt-BR-Wavenet-B"  // Male voice
  ttsLang="pt-BR"
/>
```

### Recommended Google Voices

**Portuguese (Brazil):**
- `pt-BR-Wavenet-A` - Female
- `pt-BR-Wavenet-B` - Male (recommended)
- `pt-BR-Wavenet-C` - Female
- `pt-BR-Standard-A` - Female (cheaper)
- `pt-BR-Standard-B` - Male (cheaper)

**English (US):**
- `en-US-Wavenet-D` - Male
- `en-US-Wavenet-F` - Female
- `en-US-Neural2-J` - Male (best quality)
- `en-US-Neural2-F` - Female (best quality)

---

## ElevenLabs

Premium quality AI voices. Ultra realistic. 10,000 chars/month free.

### Setup

1. Create account at [ElevenLabs](https://elevenlabs.io/)
2. Go to Profile > API Key
3. Copy your API key

### Usage

```jsx
<AvatarChatbot
  enableTTS={true}
  ttsProvider="elevenlabs"
  ttsApiKey="YOUR_ELEVENLABS_API_KEY"
  ttsVoiceId="21m00Tcm4TlvDq8ikWAM"
  ttsModel="eleven_monolingual_v1"
/>
```

### Popular ElevenLabs Voices

| Voice ID | Name | Description |
|----------|------|-------------|
| `21m00Tcm4TlvDq8ikWAM` | Rachel | Calm, professional |
| `AZnzlk1XvdvUeBnXmlld` | Domi | Strong, confident |
| `EXAVITQu4vr4xnSDxMaL` | Bella | Soft, gentle |
| `ErXwobaYiN019PkySvjV` | Antoni | Professional male |
| `MF3mGyEYCl7XYWbV9V6O` | Elli | Emotional female |

---

## Azure TTS

Microsoft's neural voices. 500,000 chars/month FREE.

### Setup

1. Create [Azure account](https://azure.microsoft.com/)
2. Create a "Speech" resource
3. Copy the API key and region

### Usage

```jsx
<AvatarChatbot
  enableTTS={true}
  ttsProvider="azure"
  ttsApiKey="YOUR_AZURE_KEY"
  ttsApiUrl="https://YOUR_REGION.tts.speech.microsoft.com"
  ttsVoiceId="pt-BR-AntonioNeural"
/>
```

### Recommended Azure Voices

**Portuguese (Brazil):**
- `pt-BR-AntonioNeural` - Male
- `pt-BR-FranciscaNeural` - Female
- `pt-BR-ThalitaNeural` - Female (young)

**English (US):**
- `en-US-GuyNeural` - Male
- `en-US-JennyNeural` - Female
- `en-US-AriaNeural` - Female (conversational)

---

## Animation Timing

Fine-tune how the avatar syncs with speech:

```jsx
<AvatarChatbot
  enableTTS={true}
  talkStartDelay={50}      // Delay before starting talk animation (ms)
  postTalkDelay={350}      // Delay after speech ends before idle (ms)
  minTalkDuration={400}    // Minimum time in talking state (ms)
  minIdleDuration={300}    // Minimum time in idle state (ms)
/>
```

### Recommended Settings by Provider

**Browser TTS:**
```jsx
talkStartDelay={0}
postTalkDelay={500}
```

**Google/Azure TTS:**
```jsx
talkStartDelay={100}
postTalkDelay={300}
```

**ElevenLabs:**
```jsx
talkStartDelay={200}
postTalkDelay={400}
```

---

## Comparing Providers

### Cost Comparison (per 1M characters)

| Provider | Free Tier | Paid |
|----------|-----------|------|
| Browser | Unlimited | - |
| TikTok | Unlimited | - |
| Google Cloud | 1M chars | ~$4-16 |
| ElevenLabs | 10k chars | ~$100 |
| Azure | 500k chars | ~$4-16 |

### Quality Comparison

1. **ElevenLabs** - Best quality, most realistic
2. **Google Cloud (Neural2)** - Excellent, natural
3. **Azure (Neural)** - Very good, professional
4. **Google Cloud (Wavenet)** - Good quality
5. **Browser (Windows)** - Good on Windows
6. **TikTok** - Acceptable for casual use
7. **Browser (Other OS)** - Variable quality

### Recommendation

- **Free + Good Quality**: Browser TTS (Windows) or TikTok
- **Free + Best Quality**: Google Cloud (1M chars/month)
- **Premium Quality**: ElevenLabs (paid after 10k chars)
- **Enterprise**: Azure or Google Cloud

---

## Troubleshooting

### No sound

1. Check browser console for errors
2. Verify API key is correct
3. Test with browser TTS first

### Voice not found

```jsx
// List available browser voices
speechSynthesis.getVoices().forEach(v => console.log(v.name));
```

### Audio delayed

- Reduce `talkStartDelay`
- Check internet connection for cloud providers

### Audio cutting off

- Increase `postTalkDelay`
- Increase `minTalkDuration`
