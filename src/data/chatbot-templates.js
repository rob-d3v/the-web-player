// Ready-made <AvatarChatbot> starting points. Each template is a partial prop
// map you can spread straight onto <AvatarChatbot {...template.config} /> (or
// load into <AvatarConfigurator defaultValue={template.config} />) and then
// tweak. `sampleReply` is an optional canned answer for the `onSendMessage`
// fake/mock provider so a template can be tried with zero backend — the core
// library ignores it; the site playground uses it.
//
// These are intentionally keyless and browser-only (Web Speech TTS/STT) so they
// render the instant they load. Swap `ttsProvider`/`webhookUrl` for production.

export const CHATBOT_TEMPLATES = [
  {
    id: 'greeter',
    name: 'Recepcionista',
    emoji: '👋',
    description: 'Recebe o visitante e oferece ajuda. Fala sozinho ao abrir.',
    config: {
      assistantName: 'Ania',
      theme: 'dark',
      transparent: true,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: 'browser',
      ttsLang: 'pt-BR',
      enableSTT: false,
    },
    sampleReply: 'Olá! Seja bem-vindo(a) 😊 Como posso te ajudar hoje?',
  },
  {
    id: 'support',
    name: 'Suporte',
    emoji: '🎧',
    description: 'Tom profissional para atendimento. Conecte seu webhook de IA.',
    config: {
      assistantName: 'Suporte',
      theme: 'blue',
      transparent: false,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: 'browser',
      ttsLang: 'pt-BR',
      enableSTT: true,
      sttProvider: 'browser',
      sttLang: 'pt-BR',
    },
    sampleReply: 'Certo! Já estou verificando isso para você. Pode me dar mais um detalhe?',
  },
  {
    id: 'sales',
    name: 'Vendas',
    emoji: '💼',
    description: 'Energético e persuasivo para qualificar leads.',
    config: {
      assistantName: 'Vic',
      theme: 'purple',
      transparent: true,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: 'browser',
      ttsLang: 'pt-BR',
      enableSTT: false,
    },
    sampleReply: 'Ótima escolha! 🚀 Posso te mostrar o plano ideal em 30 segundos. Qual seu objetivo?',
  },
  {
    id: 'faq',
    name: 'FAQ',
    emoji: '📚',
    description: 'Respostas curtas e diretas. Sem saudação automática.',
    config: {
      assistantName: 'FAQ',
      theme: 'dark',
      transparent: false,
      autoGreeting: false,
      enableTTS: false,
      enableSTT: false,
    },
    sampleReply: 'Sim! Isso está disponível no seu plano. Veja mais em /docs.',
  },
  {
    id: 'playful',
    name: 'Divertido',
    emoji: '🎉',
    description: 'Casual e bem-humorado, com voz e escuta ativa.',
    config: {
      assistantName: 'Bolt',
      theme: 'purple',
      transparent: true,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: 'browser',
      ttsLang: 'pt-BR',
      enableSTT: true,
      sttProvider: 'browser',
      sttLang: 'pt-BR',
    },
    sampleReply: 'Eba, adorei a pergunta! 😄 Bora resolver isso juntos!',
  },
  {
    id: 'ai-assistant',
    name: 'Assistente IA',
    emoji: '🤖',
    description: 'Voz neural on-device (Piper) + escuta. O pacote completo.',
    config: {
      assistantName: 'Ania',
      theme: 'dark',
      transparent: true,
      autoGreeting: true,
      enableTTS: true,
      ttsProvider: 'piper',
      ttsLang: 'pt-BR',
      piperModelUrl: 'https://seguranca.ropeco-rv.workers.dev/models/pt_BR-nanda-medium.onnx',
      piperModelConfigUrl: 'https://seguranca.ropeco-rv.workers.dev/models/pt_BR-nanda-medium.onnx.json',
      enableSTT: true,
      sttProvider: 'browser',
      sttLang: 'pt-BR',
    },
    sampleReply: 'Claro! Estou aqui para ajudar no que precisar. Sobre o que você quer falar?',
  },
];

// Convenience lookup by id.
export const CHATBOT_TEMPLATE_BY_ID = CHATBOT_TEMPLATES.reduce((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {});
