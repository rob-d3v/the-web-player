import { ReactNode } from 'react';

export interface AniaAvatarProps {
  avatarUrl?: string;
  avatarPassword?: string;
  avatarData?: any;
  authToken?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  width?: number;
  height?: number;
  transparent?: boolean;
  theme?: 'dark' | 'light' | 'blue' | 'purple';
  minimizable?: boolean;
  closable?: boolean;
  detectAudio?: boolean;
  idleSpeed?: number;
  talkSpeed?: number;
  autoCalculateSpeed?: boolean;
  startMinimized?: boolean;
  preserveQuality?: boolean;
  /** Força o avatar sempre acima de todos os outros elementos da página (default: true) */
  alwaysOnTop?: boolean;
  /** Tamanho do avatar quando minimizado em mobile (default: 60) */
  mobileMinimizedSize?: number;
  /** Habilitar arraste do avatar em mobile (default: true) */
  draggable?: boolean;
  /** Breakpoint para considerar mobile em pixels (default: 768) */
  mobileBreakpoint?: number;
  onLoad?: (player: any) => void;
  onTalkStart?: () => void;
  onTalkEnd?: () => void;
  onClose?: () => void;
  onToggleMinimize?: (isMinimized: boolean) => void;
  children?: ReactNode;
}

export interface AvatarChatbotProps extends AniaAvatarProps {
  webhookUrl?: string;
  enableTTS?: boolean;
  autoGreeting?: boolean;
  showSpeedControls?: boolean;
  talkStartDelay?: number;
  postTalkDelay?: number;
  minTalkDuration?: number;
  minIdleDuration?: number;
  ttsVoice?: string;
  ttsGender?: 'auto' | 'male' | 'female';
  ttsRate?: number;
  ttsPitch?: number;
  ttsLang?: string;
  ttsProvider?: 'browser' | 'tiktok' | 'elevenlabs' | 'google' | 'azure';
  ttsApiKey?: string;
  ttsApiUrl?: string;
  ttsVoiceId?: string;
  ttsModel?: string;
  transparentChat?: boolean;
  // Speech-to-Text options
  enableSTT?: boolean;
  sttProvider?: 'browser' | 'google';
  sttLang?: string;
  sttContinuous?: boolean;
  sttInterimResults?: boolean;
  sttApiKey?: string;
  sttApiUrl?: string;
  sttAutoSend?: boolean;
  // Chat customization
  /** Name displayed for assistant messages (default: "Assistant") */
  assistantName?: string;
  /** Name displayed for user messages (default: "You") */
  userName?: string;
  /** Enable file/image attachments in chat (default: false) */
  enableAttachments?: boolean;
  // n8n/webhook authentication
  /** API key for webhook authentication (sent as Bearer token and X-API-Key header) */
  webhookApiKey?: string;
  /** Custom headers to send with webhook requests */
  webhookHeaders?: Record<string, string>;
}

export interface UseTTSDetectionOptions {
  pauseThreshold?: number;
  idleTransitionDelay?: number;
  onTalkStart?: () => void;
  onTalkEnd?: () => void;
}

export interface UseTTSDetectionResult {
  isTalking: boolean;
  speak: (text: string, options?: SpeakOptions) => SpeechSynthesisUtterance | undefined;
  cancel: () => void;
}

export interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
  cancelPrevious?: boolean;
}

export interface UseChatbotOptions {
  webhookUrl?: string;
  /** API key for webhook authentication */
  webhookApiKey?: string;
  /** Custom headers for webhook requests */
  webhookHeaders?: Record<string, string>;
  onResponse?: (message: ChatMessage, data: any) => void;
  onError?: (error: Error, friendlyMessage: string) => void;
  formatRequest?: (message: string, metadata: any) => any;
  parseResponse?: (data: any) => string | { message: string; attachments?: any[] };
}

export interface ChatAttachment {
  name: string;
  type: string;
  size: number;
  data: string;
  preview?: string;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant' | 'error';
  content: string;
  timestamp: string;
  raw?: any;
  isWaiting?: boolean;
  isError?: boolean;
  attachments?: ChatAttachment[];
}

export interface UseChatbotResult {
  messages: ChatMessage[];
  sendMessage: (message: string, metadata?: any) => Promise<ChatMessage | null>;
  isLoading: boolean;
  error: string | null;
  clearMessages: () => void;
}

export interface UseAniaAvatarRefResult {
  ref: React.RefObject<any>;
  setTalking: (talking: boolean) => void;
  play: () => void;
  pause: () => void;
}

export interface UseSpeechRecognitionOptions {
  sttProvider?: 'browser' | 'google';
  sttLang?: string;
  sttContinuous?: boolean;
  sttInterimResults?: boolean;
  sttApiKey?: string;
  sttApiUrl?: string;
  onTranscriptChange?: (text: string, isFinal: boolean) => void;
  onFinalTranscript?: (text: string) => void;
  /** Called when recognition ends (useful for restarting in continuous mode) */
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

export interface UseSpeechRecognitionResult {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  startListening: () => Promise<boolean>;
  stopListening: () => void;
  clearTranscript: () => void;
}

export function AniaAvatar(props: AniaAvatarProps): JSX.Element;
export function AvatarChatbot(props: AvatarChatbotProps): JSX.Element;
export function useTTSDetection(options?: UseTTSDetectionOptions): UseTTSDetectionResult;
export function useChatbot(options?: UseChatbotOptions): UseChatbotResult;
export function useAniaAvatarRef(): UseAniaAvatarRefResult;
export function useSpeechRecognition(options?: UseSpeechRecognitionOptions): UseSpeechRecognitionResult;

// Cache utilities
export interface CacheStats {
  count: number;
  size: number;
  sizeFormatted?: string;
}

/** Recupera avatar do cache IndexedDB */
export function getCachedAvatar(url: string): Promise<any | null>;
/** Salva avatar no cache IndexedDB */
export function setCachedAvatar(url: string, data: any, isEncrypted?: boolean): Promise<void>;
/** Remove avatar do cache */
export function deleteCachedAvatar(url: string): Promise<void>;
/** Limpa todo o cache de avatares */
export function clearAvatarCache(): Promise<void>;
/** Retorna estatisticas do cache */
export function getCacheStats(): Promise<CacheStats>;
