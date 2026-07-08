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
  /** Render embedded in the parent flow (relative, no body portal) instead of the fixed floating widget. */
  inline?: boolean;
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
  /**
   * Stream a long reply sentence-by-sentence through a queue (first sentence
   * starts fast, next is synthesized while the current plays). Default true.
   * Set false for legacy one-shot whole-text synthesis.
   */
  ttsChunking?: boolean;
  /** Pause between spoken chunks, ms. Default 250. */
  chunkGapMs?: number;
  /** Hard-wrap chunks longer than this many chars (0 = off). */
  maxChunkChars?: number;
  /** Cap ONLY the first spoken chunk (chars) for fast speech start. Default 100 (0 = off). */
  firstChunkMaxChars?: number;
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
  /**
   * Client-side responder override. When set, the chat calls this instead of
   * POSTing to `webhookUrl` — receives (message, metadata) and returns the reply
   * (a string, or `{ message|content|text, attachments?, action? }`). Enables a
   * fake/mock provider or a custom AI client; no `webhookUrl` needed.
   */
  onSendMessage?: (message: string, metadata: any) => string | ChatResponsePayload | Promise<string | ChatResponsePayload>;
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
  // ===== NO-AI bubble/balloon flow engine =====
  /**
   * A deterministic decision-tree flow. When set, the avatar speaks each node's
   * prompt and the user answers by tapping clickable bubbles (no LLM until an
   * explicit escalation). Omit it and behavior is identical to today. */
  flow?: FlowDef | null;
  /** URL to lazily fetch a flow JSON from. Ignored when `flow` is supplied. */
  flowUrl?: string | null;
  /** Opaque app/tenant id forwarded to the flow capture/escalation callbacks. */
  appId?: string | null;
  /** Fired on every captured flow answer (stream to a CRM). */
  onFlowCapture?: (info: { sessionId: string; appId?: string | null; key: string; value: any; collected: Record<string, any> }) => void;
  /** Fired when the flow escalates. Defaults to forwarding to the webhook. */
  onFlowEscalate?: (info: { collected: Record<string, any>; contact: FlowContact; sessionId: string; transcript: Array<{ role: string; text: string }> }) => void;
  /**
   * Known-user fields pre-seeded into the flow's `collected` (e.g. `{ name, email }`
   * from the host app's auth/session) so an authenticated visitor is already
   * known — the chat greets them by name and skips inputs whose value is present.
   */
  initialContext?: Record<string, any> | null;
  /** Persist flow state to localStorage so a returning visitor is remembered (default true). */
  persist?: boolean;
  /** Override the localStorage persistence key (default `ania-flow-<appId|flowId>`). */
  persistKey?: string | null;
  /**
   * A `collected` key gating persistence (LGPD): nothing is written until
   * `collected[flowConsentKey]` is truthy. Unset = host owns consent gating.
   */
  flowConsentKey?: string | null;
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
  /** Split long text into sentence chunks and stream them (default true). */
  ttsChunking?: boolean;
  /** Pause between spoken chunks, ms (default 250). */
  chunkGapMs?: number;
  /** Hard-wrap chunks longer than this many chars (0 = off). */
  maxChunkChars?: number;
  /** Cap ONLY the first spoken chunk (chars) for fast speech start (default 100, 0 = off). */
  firstChunkMaxChars?: number;
  /** Merge fragments shorter than this into the next chunk (default 12). */
  minChunkChars?: number;
  /** Also split at `;` and `:` (default false). */
  splitOnSemicolon?: boolean;
  /** Fires with each chunk's <audio> element so lip-sync can reconnect. */
  onChunkAudio?: (audio: HTMLAudioElement) => void;
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
  /** Per-call override of the streaming/chunking behavior. */
  ttsChunking?: boolean;
  maxChunkChars?: number;
  minChunkChars?: number;
  splitOnSemicolon?: boolean;
}

export interface ChatResponsePayload {
  message?: string;
  content?: string;
  text?: string;
  attachments?: any[];
  action?: string;
}

export interface UseChatbotOptions {
  webhookUrl?: string;
  webhookApiKey?: string;
  webhookHeaders?: Record<string, string>;
  /**
   * Client-side responder override — replaces the webhook POST. Returns the
   * reply as a string or `{ message|content|text, attachments?, action? }`.
   */
  onSendMessage?: (message: string, metadata: any) => string | ChatResponsePayload | Promise<string | ChatResponsePayload>;
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

// ===== NO-AI Flow Engine =====

/** One clickable bubble within a flow node. */
export interface FlowOption {
  /** Bubble text (NEVER spoken by TTS). */
  label?: string;
  /** Value recorded into `collected` (via node.collectKey or option.capture). */
  value?: any;
  /** Id of the node to advance to when this option is selected. */
  next?: string;
  /**
   * Record answer(s) into `collected`. A string key stores `option.value`;
   * an object merges its pairs verbatim.
   */
  capture?: string | Record<string, any>;
  /** Selecting this option escalates to the AI/webhook instead of navigating. */
  escalate?: boolean;
  /** Selecting this option ends the flow. */
  terminal?: boolean;
  /**
   * Marks this option as a "back" affordance. The engine renders its own single
   * back bubble (when `canGoBack`), so any option flagged `isBack` — or whose
   * label matches the localized back string, or whose `next` re-targets the
   * previous node — is filtered out of `visibleOptions` to avoid a double back.
   */
  isBack?: boolean;
}

/**
 * TYPED free-text capture spec on a flow node (lead-gen contact capture). When a
 * node carries an `input`, the host renders a text field (or textarea) + submit
 * button INSTEAD of option bubbles. The avatar still SPEAKS the node's prompt;
 * the typed answer is silent and recorded into `collected` ONLY — it is never
 * sent to the AI webhook/sendMessage.
 */
export interface FlowInput {
  /** `collected[key]` receives the (trimmed) typed value on a valid submit. */
  key: string;
  /** Field kind. Drives the DOM input type + mobile keyboard. Default 'text'. */
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea';
  /** Field placeholder (i18n key or literal text). */
  placeholder?: string;
  /** Whether a non-empty value is required. Default true. */
  required?: boolean;
  /**
   * Validation rule: a built-in name (`'email'` | `'phone'` | `'cep'`) or a
   * regex source string. Omit for no format check (required-only).
   */
  validate?: string;
  /**
   * Inline error message shown on an invalid submit (i18n key or literal). May
   * contain `{var}`/`{{var}}` placeholders (e.g. `{name}`) — they are
   * interpolated from `collected`, the SAME as prompts and labels.
   */
  errorMsg?: string;
  /** Submit button label (i18n key or literal; `{var}`-interpolated). Defaults to `chat.flow.submit`. */
  submitLabel?: string;
  /** Skip ("Pular") button label (i18n key or literal; `{var}`-interpolated). Defaults to `chat.flow.skip`. */
  skipLabel?: string;
  /** Id of the node to advance to on a valid submit. */
  next?: string;
  /** When true, render a "Pular"/Skip bubble that advances to `next` without capturing. */
  optionalSkip?: boolean;
}

/** A node (step) in a flow. */
export interface FlowNode {
  id: string;
  /** Text OR an i18n key. Spoken via speak() on enter (unless `speak:false`). */
  prompt?: string;
  /** Default true. false = render silently (do not TTS the prompt). */
  speak?: boolean;
  /** Clickable bubbles shown for this node. */
  options?: FlowOption[];
  /**
   * TYPED free-text capture. When present, the host renders a text field instead
   * of (or alongside) `options`. The typed value is recorded into `collected`
   * only and never sent to the AI webhook.
   */
  input?: FlowInput;
  /** Optional id to auto-advance to. */
  autoNext?: string;
  /** Entering this node escalates to the AI/webhook. */
  escalate?: boolean;
  /** Entering this node ends the flow. */
  terminal?: boolean;
  /** Store the selected option's `value` under this key in `collected`. */
  collectKey?: string;
  /**
   * Force this input node to ALWAYS ask, even when its key is already known
   * (from seeded known-user context or restored persistence). Default false =
   * skip-known (auto-advance past an input whose value is already present).
   */
  alwaysAsk?: boolean;
}

/** A NO-AI decision-tree flow definition. */
export interface FlowDef {
  id: string;
  version?: string | number;
  startNode: string;
  nodes: Record<string, FlowNode>;
}

/** Internal reducer state (also returned to advanced consumers). */
export interface FlowState {
  currentNodeId: string | null;
  backStack: string[];
  collected: Record<string, any>;
  done: boolean;
  escalated: boolean;
  /** Last input-validation error (i18n key or literal); null when valid. */
  inputError: string | null;
}

export type FlowEffect =
  | { type: 'message'; text: string }
  | { type: 'speak'; text: string }
  | { type: 'capture'; key: string; value: any; collected: Record<string, any> }
  | { type: 'escalate'; collected: Record<string, any> };

export type FlowAction =
  | { type: 'START' }
  | { type: 'RESET' }
  | { type: 'RESUME'; nodeId: string }
  | { type: 'SELECT'; option: FlowOption }
  | { type: 'SUBMIT_INPUT'; value: string }
  | { type: 'BACK' }
  | { type: 'GOTO'; nodeId: string };

/** Captured contact fields surfaced to the AI on escalation. */
export interface FlowContact {
  name?: string;
  phone?: string;
  email?: string;
}

export interface UseFlowEngineDeps {
  /** TTS the resolved node prompt. */
  speak?: (text: string, opts?: SpeakOptions) => void;
  /** Webhook/LLM send used on escalate when no `onEscalate` is given. */
  sendMessage?: (text: string, meta?: Record<string, any>) => void;
  locale?: string;
  messagesOverride?: MessagesOverride;
  /** Fired on each captured answer (stream to a CRM). */
  onCapture?: (info: { sessionId: string; appId?: string | null; key: string; value: any; collected: Record<string, any> }) => void;
  /** Fired when the flow escalates to the AI (carries the captured contact). */
  onEscalate?: (info: { collected: Record<string, any>; contact: FlowContact; sessionId: string; transcript: Array<{ role: string; text: string }> }) => void;
  /**
   * Fired with each entered node's resolved prompt so the host can append it to
   * its visible chat log (keeps the spoken conversation visible in the transcript).
   */
  onPrompt?: (text: string) => void;
  /** Opaque app/tenant id forwarded to the callbacks. */
  appId?: string | null;
  /** BCP-47 lang passed to speak(). */
  lang?: string;
  /** Prompt i18n resolver (e.g. a Translator's `t`). */
  translate?: (key: string) => string;
  /** Known-user fields pre-seeded into `collected` (e.g. `{ name, email }` from auth). */
  initialContext?: Record<string, any> | null;
  /** Persist `{ sessionId, collected, currentNodeId }` to localStorage (default true). */
  persist?: boolean;
  /** Override the localStorage key (default `ania-flow-<appId|flowId>`). */
  persistKey?: string;
  /** A `collected` key gating persistence (LGPD) — only write once it's truthy. */
  consentKey?: string;
}

export interface UseFlowEngineResult {
  currentNode: FlowNode | null;
  /** The current node's prompt with i18n applied. */
  currentPrompt: string;
  /** The current node's TYPED-input spec, or null when it's an options node. */
  currentInput: FlowInput | null;
  visibleOptions: FlowOption[];
  /** Resolve an option label with i18n + `{var}`/`{{var}}` interpolation from `collected`. */
  resolveLabel: (label?: string) => string;
  /**
   * Resolve ANY user-facing flow string the same way prompts are: i18n key →
   * text, then `{var}`/`{{var}}` interpolation from `collected`. Use for input
   * placeholders, submit/skip labels, and option labels.
   */
  resolveText: (text?: string) => string;
  selectOption: (option: FlowOption) => void;
  /**
   * Submit a typed value for the current input node. Validates against the spec;
   * on success captures the value into `collected` + advances, on failure sets
   * `inputError` and does NOT advance. The typed value is never spoken nor sent
   * to the webhook. Returns `{ ok, error }` synchronously.
   */
  submitInput: (value: string) => { ok: boolean; error: string | null };
  /**
   * Last input-validation error, FULLY resolved (i18n key → text, then `{var}`
   * interpolated from `collected`) and ready to render directly; null when valid.
   */
  inputError: string | null;
  goBack: () => void;
  canGoBack: boolean;
  reset: () => void;
  /** Jump to a node by id (used by the `flow <nodeId>` command verb). */
  goto: (nodeId: string) => void;
  /** Clear any persisted flow state for this app/key (LGPD: forget the visitor). */
  clearPersistedFlow: () => void;
  collected: Record<string, any>;
  sessionId: string;
  isEscalated: boolean;
  isDone: boolean;
}

export function useFlowEngine(flowDef: FlowDef | null | undefined, deps?: UseFlowEngineDeps): UseFlowEngineResult;

/** Pure reducer behind useFlowEngine. */
export function flowReducer(
  state: FlowState | undefined,
  action: FlowAction,
  flowDef: FlowDef,
  opts?: { translate?: (key: string) => string }
): { state: FlowState; effects: FlowEffect[] };
export function flowInitialState(): FlowState;
export function flowGetNode(flowDef: FlowDef, nodeId: string | null): FlowNode | null;
export function flowResolvePrompt(prompt: string | null | undefined, translate?: (key: string) => string, collected?: Record<string, any>): string;
/** Interpolate `{var}`/`{{var}}` placeholders in text from a `collected` map. */
export function flowInterpolate(text: string | null | undefined, collected?: Record<string, any>): string;
export function flowVisibleOptions(node: FlowNode | null): FlowOption[];
/** The TYPED-input spec of a node, or null when it has none. */
export function flowNodeInput(node: FlowNode | null): FlowInput | null;
/** Validate a typed value against an input spec. Pure; no side effects. */
export function flowValidateInput(
  input: FlowInput | null | undefined,
  value: string
): { ok: boolean; errorKey?: string };

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

// ===== Configurator (developer-facing live config UI) =====

/** Export-ready prop map: only props that differ from their defaults, with
 *  empty strings / nulls dropped. Suitable for spreading onto <AvatarChatbot>. */
export type ConfiguratorExportProps = Partial<AvatarChatbotProps>;

export interface ConfiguratorField {
  key: keyof AvatarChatbotProps | string;
  label: string;
  type: 'text' | 'password' | 'number' | 'boolean' | 'select';
  def: any;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface ConfiguratorSection {
  id: string;
  label: string;
  fields: ConfiguratorField[];
}

export interface AvatarConfiguratorProps {
  /** Controlled mode: the current config. Provide with `onChange`. */
  value?: Partial<AvatarChatbotProps>;
  /** Controlled mode: called with the next config on every edit. */
  onChange?: (config: Partial<AvatarChatbotProps>) => void;
  /** Uncontrolled initial config (merged over schema defaults + persisted state). */
  defaultValue?: Partial<AvatarChatbotProps>;
  /** localStorage namespace key. Default `'ania-avatar-configurator'`. */
  storageKey?: string;
  /** Persist config to localStorage (default true; ignored in controlled mode). */
  persist?: boolean;
  /** Render the <AvatarChatbot> preview alongside the panel. Defaults to true
   *  in uncontrolled (batteries-included) mode, false when controlled. */
  showPreview?: boolean;
  /** Component name used in the exported JSX snippet. Default `'AvatarChatbot'`. */
  exportComponentName?: string;
  /** Fired with the export-ready (defaults-stripped) prop map on every change. */
  onExport?: (props: ConfiguratorExportProps) => void;
  /** Preview layout when showPreview is on. Default `'row'`. */
  layout?: 'row' | 'column';
  /** Any AvatarChatbot prop can be passed inline to seed the config
   *  (panel-owned props) or pass through to the preview (everything else). */
  [prop: string]: any;
}

export function AvatarConfigurator(props: AvatarConfiguratorProps): JSX.Element;

/** Serialize a config to a formatted `<AvatarChatbot .../>` JSX string
 *  (only non-default props). */
export function configuratorToJSX(config: Partial<AvatarChatbotProps>, componentName?: string): string;
/** Serialize a config to pretty JSON (only non-default props). */
export function configuratorToJSON(config: Partial<AvatarChatbotProps>): string;
/** Reduce a config to the export-ready prop map (defaults + empties stripped). */
export function configuratorExportProps(config: Partial<AvatarChatbotProps>): ConfiguratorExportProps;
/** The panel's field schema (sections + fields). */
export const CONFIGURATOR_SECTIONS: ConfiguratorSection[];

// ===== Chatbot Templates =====

export interface ChatbotTemplate {
  /** Stable id. */
  id: string;
  /** Human-friendly name. */
  name: string;
  /** Emoji glyph for cards/menus. */
  emoji: string;
  /** One-line description of the persona/use-case. */
  description: string;
  /** Partial AvatarChatbot props — spread onto the widget or a configurator. */
  config: Partial<AvatarChatbotProps>;
  /** Optional canned reply for the `onSendMessage` fake/mock provider. */
  sampleReply?: string;
}

/** Ready-made <AvatarChatbot> starting points. */
export const CHATBOT_TEMPLATES: ChatbotTemplate[];
/** Templates keyed by id. */
export const CHATBOT_TEMPLATE_BY_ID: Record<string, ChatbotTemplate>;

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
  /** Jump the NO-AI flow to a node id (the `flow <nodeId>` verb). */
  flowGoto?: (nodeId: string) => void;
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
