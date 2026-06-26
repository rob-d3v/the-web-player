import { ReactNode, RefObject } from 'react';

// ===== Action Types =====

export interface ActionConfig {
  id: string;
  name: string;
  hotkey?: string;
  range_low: number;
  range_high: number;
  start_positions?: number[];
  speed?: number;
  reverse?: boolean;
  audio_base64?: string;
  audio_delay_ms?: number;
}

export interface ActionInfo {
  id: string;
  name: string;
}

// ===== Piper TTS Types =====

export interface PiperStatus {
  ready: boolean;
  modelCached: boolean;
  downloading: boolean;
  progress: number;
  error: string | null;
}

// ===== Component Props =====

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
  /**
   * Locale for the component's built-in UI strings (greetings, waiting
   * messages, control titles, loading/error text). BCP-47 code shipped under
   * `src/i18n/strings` (e.g. 'en', 'es', 'fr', 'ja', 'de'). Unknown codes fall
   * back to the base language then to 'en'. Default `'pt-BR'` preserves the
   * library's original wording. */
  locale?: string;
  /**
   * Override individual built-in strings without forking the component. Keys
   * are the i18n keys (e.g. `'chat.enableSound'`, `'avatar.loading'`); list
   * keys (`'greetings'`, `'waiting'`) take a `string[]`. Anything not provided
   * resolves from the `locale` table. */
  messagesOverride?: MessagesOverride;
  idleSpeed?: number;
  talkSpeed?: number;
  autoCalculateSpeed?: boolean;
  startMinimized?: boolean;
  preserveQuality?: boolean;
  alwaysOnTop?: boolean;
  mobileMinimizedSize?: number;
  draggable?: boolean;
  mobileBreakpoint?: number;
  // Lip sync
  lipSyncEnabled?: boolean;
  lipSyncServerUrl?: string;
  lipSyncIntensity?: number;
  lipSyncResponsiveness?: number;
  /** A3 sustain behaviour during stable speech. null = use server config / 'wiggle'. */
  lipSyncSustainStyle?: 'hold' | 'wiggle' | null;
  /** Wiggle amplitude (1..6). null = use server config / 5. */
  lipSyncWiggleSpeed?: number | null;
  // Action frames
  actions?: ActionConfig[];
  enableActionHotkeys?: boolean;
  onActionStart?: (actionId: string) => void;
  onActionEnd?: () => void;
  // Initial action
  initialAction?: string;
  initialActionLoop?: boolean;
  // Callbacks
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
  ttsProvider?: 'browser' | 'tiktok' | 'elevenlabs' | 'google' | 'azure' | 'piper';
  ttsApiKey?: string;
  ttsApiUrl?: string;
  ttsVoiceId?: string;
  ttsModel?: string;
  transparentChat?: boolean;
  // Piper TTS (browser ONNX)
  piperModelUrl?: string;
  piperModelConfigUrl?: string;
  piperPitch?: number;
  piperSpeed?: number;
  piperSpeakerId?: number;
  /** Eager-load the Piper model at mount (default false = lazy on first chat-open). */
  piperPreload?: boolean;
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
  assistantName?: string;
  userName?: string;
  enableAttachments?: boolean;
  // n8n/webhook authentication
  webhookApiKey?: string;
  webhookHeaders?: Record<string, string>;
  // ===== Plugin architecture =====
  /** Custom plugins registered on top of the built-ins (can override by id). */
  plugins?: Plugin[];
  /** Force the active TTS provider by plugin id (overrides ttsProvider mapping). */
  activeTtsPlugin?: string;
  /** Force the active STT provider by plugin id (overrides sttProvider mapping). */
  activeSttPlugin?: string;
  /** Receives the PluginRegistry instance once ready. */
  onPluginsReady?: (registry: PluginRegistry) => void;
  // ===== Wake word =====
  /** Enable on-device wake-word detection (default false). */
  wakeWordEnabled?: boolean;
  /** URL to the openWakeWord ONNX model. Required when wakeWordEnabled. */
  wakeWordModelUrl?: string;
  /** Detection threshold 0..1 (default 0.5). */
  wakeWordThreshold?: number;
  /** Path the onnxruntime-web .wasm files are served from (sets ort.env.wasm.wasmPaths). */
  wakeWordWasmPaths?: string;
  /** Fired when the wake word is detected. Without it, the chat opens + warms TTS. */
  onWake?: () => void;
  // ===== External control =====
  /** Install an origin-allowlisted window.postMessage command listener. */
  enablePostMessageControl?: boolean;
  /** Allowed origins for postMessage control. Use ['*'] to allow all (unsafe). */
  postMessageOrigins?: string[];
}

// ===== Hook Options & Results =====

export interface UseTTSDetectionOptions {
  pauseThreshold?: number;
  idleTransitionDelay?: number;
  talkStartDelay?: number;
  minTalkDuration?: number;
  minIdleDuration?: number;
  onTalkStart?: () => void;
  onTalkEnd?: () => void;
  ttsProvider?: string;
  ttsConfig?: Record<string, any>;
}

export interface UseTTSDetectionResult {
  isTalking: boolean;
  speak: (text: string, options?: SpeakOptions) => Promise<any> | undefined;
  cancel: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
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
  webhookApiKey?: string;
  webhookHeaders?: Record<string, string>;
  onResponse?: (message: ChatMessage, data: any) => void;
  onError?: (error: Error, friendlyMessage: string) => void;
  formatRequest?: (message: string, metadata: any) => any;
  parseResponse?: (data: any) => string | { message: string; attachments?: any[]; action?: string };
  availableActions?: ActionInfo[];
  onActionTriggered?: (actionId: string) => void;
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
  ref: RefObject<any>;
  setTalking: (talking: boolean) => void;
  play: () => void;
  pause: () => void;
  triggerAction: (actionId: string) => void;
  cancelAction: () => void;
  getAvailableActions: () => ActionInfo[];
  setLipSyncEnabled: (enabled: boolean) => void;
  getLipSyncState: () => { enabled: boolean; envelope?: number };
  /** Run a desktop-style command line against the avatar. */
  runCommand: (line: string, extraCtx?: Partial<CommandContext>) => CommandResult;
}

export interface UseLipSyncOptions {
  enabled?: boolean;
  fftSize?: number;
  smoothing?: number;
}

export interface UseLipSyncResult {
  connectAudioElement: (audio: HTMLAudioElement) => void;
  getSpectralOpenness: () => number;
  getSpectralFlux: () => number;
  getAmplitude: () => number;
  disconnect: () => void;
  isConnected: () => boolean;
}

export interface UseActionFramesOptions {
  actions?: ActionConfig[];
  enabled?: boolean;
  enableHotkeys?: boolean;
  onActionStart?: (actionId: string) => void;
  onActionEnd?: () => void;
  animationController?: any;
}

export interface UseActionFramesResult {
  activeAction: string | null;
  availableActions: ActionInfo[];
  triggerAction: (actionId: string) => void;
  cancelAction: () => void;
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

// ===== i18n =====

/** Variables for `{{var}}` interpolation in a string value. */
export type I18nVars = Record<string, string | number>;

/**
 * Consumer override table for built-in strings. Scalar keys map to a string;
 * the list keys (`greetings`, `waiting`) map to a `string[]`.
 */
export type MessagesOverride = Record<string, string | string[]>;

export interface Translator {
  locale: string;
  /** Resolve a scalar string by key, with optional `{{var}}` interpolation. */
  t: (key: string, vars?: I18nVars) => string;
  /** Resolve a list-valued key (e.g. `'greetings'`, `'waiting'`). */
  list: (key: string) => string[];
}

/** Resolve a single built-in string for a locale (falls back to en, then key). */
export function getString(
  key: string,
  locale?: string,
  opts?: { vars?: I18nVars; override?: MessagesOverride }
): string;

/** Resolve a list-valued built-in key (e.g. `'greetings'`). */
export function getStringList(
  key: string,
  locale?: string,
  opts?: { override?: MessagesOverride }
): string[];

/** Build a translator bound to a locale + optional override table. */
export function createTranslator(locale?: string, override?: MessagesOverride): Translator;

/** Sorted list of every locale code bundled with the library. */
export function availableLocales(): string[];

/** True when a locale table is bundled for `locale`. */
export function hasLocale(locale: string): boolean;

/** Default locale used by the components when `locale` is not passed (`'pt-BR'`). */
export const DEFAULT_LOCALE: string;

/** Locale used as the last-resort fallback (`'en'`). */
export const FALLBACK_LOCALE: string;

// ===== Component Exports =====

export function AniaAvatar(props: AniaAvatarProps): JSX.Element;
export function AvatarChatbot(props: AvatarChatbotProps): JSX.Element;

// ===== Hook Exports =====

export function useTTSDetection(options?: UseTTSDetectionOptions): UseTTSDetectionResult;
export function useChatbot(options?: UseChatbotOptions): UseChatbotResult;
export function useAniaAvatarRef(): UseAniaAvatarRefResult;
export function useSpeechRecognition(options?: UseSpeechRecognitionOptions): UseSpeechRecognitionResult;
export function useLipSync(options?: UseLipSyncOptions): UseLipSyncResult;
export function useActionFrames(options?: UseActionFramesOptions): UseActionFramesResult;

// ===== Piper TTS Exports =====

export function checkPiperStatus(): PiperStatus;
export function initPiper(modelUrl: string, modelConfigUrl?: string, options?: { onProgress?: (pct: number) => void; onReady?: () => void }): Promise<any>;
export function disposePiper(): void;

// ===== Lip Sync Exports =====

export function fetchLipSyncConfig(serverUrl: string, contentHash: string): Promise<any | null>;
export function buildOpennessMap(keyframes: [number, number][], talkLow: number, talkHigh: number): number[];

// ===== Utility Exports =====

export function parseHotkey(hotkeyString: string): { ctrl: boolean; alt: boolean; shift: boolean; meta: boolean; key: string } | null;
export function matchesHotkey(event: KeyboardEvent, parsed: ReturnType<typeof parseHotkey>): boolean;
export function playActionAudio(audioBase64: string, delayMs?: number): { cancel: () => void } | null;

// ===== Cache Exports =====

export interface CacheStats {
  count: number;
  size: number;
  sizeFormatted?: string;
}

export function getCachedAvatar(url: string): Promise<any | null>;
export function setCachedAvatar(url: string, data: any, isEncrypted?: boolean): Promise<void>;
export function deleteCachedAvatar(url: string): Promise<void>;
export function clearAvatarCache(): Promise<void>;
export function getCacheStats(): Promise<CacheStats>;

// ===== Plugin Architecture =====

export type PluginKind = 'tts' | 'stt' | 'wakeword' | 'action' | 'integration';

export interface PluginContext {
  config?: Record<string, any>;
  registry?: PluginRegistry;
  logger?: Pick<Console, 'warn' | 'error' | 'log'>;
  [key: string]: any;
}

export interface TTSEngine {
  speak: (text: string, options?: Record<string, any>) => Promise<any> | any;
  synthesize?: (text: string, options?: Record<string, any>) => Promise<{ audioUrl: string; blob?: Blob }>;
  stop?: () => void;
  cleanup?: () => void;
}

export interface STTEngine {
  /** Built-in STT engines return a `{ provider }` descriptor read by the host. */
  provider?: 'browser' | 'google' | string;
  startListening?: (options?: Record<string, any>) => Promise<boolean>;
  stopListening?: () => void;
  cleanup?: () => void;
}

export interface WakeWordEngineLike {
  loadModel?: (modelUrl?: string, options?: { wasmPaths?: string }) => Promise<any>;
  startListening: (config: { threshold: number; onDetect: () => void; onError?: (e: Error) => void; onScore?: (n: number) => void }) => Promise<boolean>;
  stopListening: () => void | Promise<void>;
  isModelLoaded?: () => boolean;
  isCurrentlyListening?: () => boolean;
  dispose?: () => void | Promise<void>;
}

export interface Plugin {
  id: string;
  name: string;
  version?: string;
  description?: string;
  kind: PluginKind;
  enabled?: boolean;
  builtin?: boolean;
  init?: (ctx: PluginContext) => void | Promise<void>;
  start?: () => void | Promise<void>;
  stop?: () => void | Promise<void>;
  createEngine?: (ctx: PluginContext) => TTSEngine | STTEngine | WakeWordEngineLike | any;
  createHandler?: (ctx: PluginContext) => any;
  settingsSchema?: Array<Record<string, any>>;
}

export class PluginRegistry {
  constructor();
  subscribe(listener: (registry: PluginRegistry) => void): () => void;
  register(plugin: Plugin): () => void;
  registerAll(plugins: Plugin[]): void;
  unregister(id: string): void;
  get(id: string): Plugin | null;
  list(): Plugin[];
  getByKind(kind: PluginKind): Plugin[];
  setEnabled(id: string, enabled: boolean): void;
  setActive(kind: PluginKind, id: string): void;
  getActiveId(kind: PluginKind): string | null;
  getActive(kind: PluginKind): Plugin | null;
  ensureInit(id: string, ctx?: PluginContext): Promise<Plugin | null>;
  resolveEngine(kind: 'tts' | 'stt' | 'wakeword', ctx?: PluginContext): Promise<TTSEngine | STTEngine | WakeWordEngineLike | null>;
  resolveHandlers(kind: 'action' | 'integration', ctx?: PluginContext): Promise<Array<{ id: string; handler: any }>>;
  startAll(ctx?: PluginContext): Promise<void>;
  stopAll(): Promise<void>;
}

export const PLUGIN_KINDS: PluginKind[];
export function validatePlugin(plugin: Plugin): Plugin;
export function getDefaultRegistry(): PluginRegistry;

export const BUILTIN_PLUGINS: Plugin[];
export function registerBuiltins(registry: PluginRegistry): void;
export const TTS_PROVIDER_TO_PLUGIN: Record<string, string>;
export const STT_PROVIDER_TO_PLUGIN: Record<string, string>;
export const ttsBrowserPlugin: Plugin;
export const ttsTiktokPlugin: Plugin;
export const ttsElevenLabsPlugin: Plugin;
export const ttsGooglePlugin: Plugin;
export const ttsAzurePlugin: Plugin;
export const ttsPiperPlugin: Plugin;
export const sttBrowserPlugin: Plugin;
export const sttGooglePlugin: Plugin;
export const actionAudioPlugin: Plugin;

export interface UsePluginsOptions {
  plugins?: Plugin[];
  registry?: PluginRegistry;
  includeBuiltins?: boolean;
  activeTts?: string | null;
  activeStt?: string | null;
  activeWakeword?: string | null;
  useSharedRegistry?: boolean;
}

export interface UsePluginsResult {
  registry: PluginRegistry;
  plugins: Plugin[];
  setActive: (kind: PluginKind, id: string) => void;
  register: (plugin: Plugin) => () => void;
  resolveEngine: (kind: 'tts' | 'stt' | 'wakeword', ctx?: PluginContext) => Promise<any>;
  resolveHandlers: (kind: 'action' | 'integration', ctx?: PluginContext) => Promise<Array<{ id: string; handler: any }>>;
  getActive: (kind: PluginKind) => Plugin | null;
  getActiveId: (kind: PluginKind) => string | null;
  getByKind: (kind: PluginKind) => Plugin[];
}

export function usePlugins(options?: UsePluginsOptions): UsePluginsResult;

// ===== Wake Word =====

export class WakeWordEngine implements WakeWordEngineLike {
  constructor();
  wasmPaths?: string;
  loadModel(modelPath: string, options?: { wasmPaths?: string }): Promise<any>;
  isModelLoaded(): boolean;
  isCurrentlyListening(): boolean;
  startListening(config: { threshold: number; onDetect: () => void; onError?: (e: Error) => void; onScore?: (n: number) => void }): Promise<boolean>;
  stopListening(): Promise<void>;
  dispose(): Promise<void>;
}

export function getWakeWordEngine(): WakeWordEngine;
export function isWakeWordSupported(): Promise<boolean>;

export interface UseWakeWordOptions {
  enabled?: boolean;
  modelUrl?: string | null;
  threshold?: number;
  wasmPaths?: string;
  onWake?: () => void;
  onError?: (error: Error) => void;
  onScore?: (score: number) => void;
}

export interface UseWakeWordResult {
  isListening: boolean;
  isLoaded: boolean;
  score: number;
  error: Error | null;
  start: () => Promise<boolean>;
  stop: () => Promise<void>;
  load: () => Promise<boolean>;
}

export function useWakeWord(options?: UseWakeWordOptions): UseWakeWordResult;

// ===== Command / External-control API =====

export interface CommandContext {
  player?: any;
  getActions?: () => ActionInfo[];
  triggerAction?: (id: string) => void;
  cancelAction?: () => void;
  speak?: (text: string, options?: Record<string, any>) => void;
  ask?: (text: string) => void | Promise<any>;
  setVisible?: (visible: boolean) => void;
  getVisible?: () => boolean;
  setMuted?: (muted: boolean) => void;
  setSensitivity?: (value: number) => void;
  setSpeeds?: (idle: number, talk: number) => void;
  triggerWake?: () => void;
  stopSpeaking?: () => void;
  onInfo?: (info: any) => void;
  logger?: Pick<Console, 'warn' | 'error' | 'log'>;
}

export interface CommandResult {
  ok: boolean;
  message: string;
  data?: any;
}

export interface CommandDescriptor {
  cmd: string;
  desc: string;
}

export const COMMAND_LIST: CommandDescriptor[];
export function parseCommandLine(line: string): { verb: string; args: string[]; rest: string };
export function executeCommand(line: string, ctx?: CommandContext): CommandResult;
export function installPostMessageControl(
  ctx: CommandContext,
  options?: { origins?: string[]; onResult?: (result: CommandResult, event: MessageEvent) => void }
): () => void;
