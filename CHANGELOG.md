# Changelog

All notable changes to `ania-avatar-react` are documented here.

## [1.10.1]

### Fixed — `<AniaAvatar>` no longer demands a password for MARKET .ania files
`<AniaAvatar>` threw "Password required for encrypted .ania file" whenever
`avatarPassword` was omitted, even for v3.0 MARKET files that are plain JSON
(all-zero HMAC/salt/IV, no AES). `<AvatarChatbot>` only worked because hosts
passed `avatarPassword=""` explicitly.

- **New helper `isPlainMarketAnia(buffer)`** in `src/utils/crypto.js` — sniffs
  the v3.0 header (magic + version + optional flag byte, then 64 zero bytes of
  HMAC/salt/IV) to detect unencrypted MARKET files.
- **`AniaAvatar` now fetches the file first and only requires a password when
  the file is actually encrypted.** MARKET files load with no `avatarPassword`
  prop at all; encrypted files still throw the same passwordRequired error.

## [1.10.0]

### Added — `<AvatarConfigurator>` developer-facing live config UI
The library now SHIPS its own configuration interface. Render
`<AvatarConfigurator>` to tune the avatar live and **export the resulting props
as JSX or JSON** — no code round-trips while dialing in a look/voice/behavior.

- **New component `src/components/AvatarConfigurator.jsx`**, exported from the
  index alongside pure helpers (`configuratorToJSX`, `configuratorToJSON`,
  `configuratorExportProps`, `CONFIGURATOR_SECTIONS`). TypeScript types added to
  `src/index.d.ts` (`AvatarConfiguratorProps`, `ConfiguratorField`,
  `ConfiguratorSection`, `ConfiguratorExportProps`).
- **Two usage modes.** *Controlled* — `<AvatarConfigurator value={config}
  onChange={setConfig}>` and the host renders its own `<AvatarChatbot {...config}>`.
  *Batteries-included* — `<AvatarConfigurator avatarUrl="…">` renders the avatar
  itself next to the panel (preview auto-on when uncontrolled).
- **Collapsible sections** (Avatar, Layout, Animation, TTS, STT, Chat) with
  live-editable controls for the main `AvatarChatbot` props — URL/password,
  position/size/theme/transparency, idle/talk speed + auto-calc + delays,
  TTS provider/voice/rate/pitch/lang + Piper model URLs, STT provider/lang, chat
  webhook/names/greeting/attachments/locale.
- **Export.** *Copy JSX* (formatted `<AvatarChatbot …/>`) and *Copy JSON*
  buttons. Only props that DIFFER from their defaults are emitted, so the copied
  snippet stays minimal. Secure-context clipboard with an execCommand fallback.
- **Persistence.** Last config saved to `localStorage`
  (`ania-avatar-configurator`, override via `storageKey`, disable with
  `persist={false}`), with a *Reset* button.
- **Zero new runtime deps.** Self-contained inline styles + one injected
  `<style>` block for `:focus`/`:hover`. SSR-safe (no window/document at render;
  all storage/DOM access guarded) and tree-shakeable — consumers who never
  import it pay nothing.
- **Playground** in `examples/configurator/` (build-free `index.html` +
  README) demonstrating batteries-included mode against a sample `.ania` URL.

## [1.8.0]

### Added — Streaming / chunked TTS (speak long replies sentence-by-sentence)
A long reply is no longer synthesized + spoken as one giant blocking block
(slow first-audio, unnatural delivery). `speak(text, opts)` now splits the text
at SENTENCE boundaries and feeds the pieces through a QUEUE, so the avatar
starts talking almost immediately and speaks one sentence at a time with a
natural pause between them.

- **Sentence chunker (`src/utils/tts-chunker.js`, pure + unit-tested).** Splits
  at sentence enders — `.` `!` `?` `…` / `...` and hard newlines — and
  optionally `;`/`:` (off by default). **Never splits at a comma** (a comma
  continues the same chunk). Punctuation stays attached to its chunk.
  Pragmatic abbreviation/number handling: does NOT split on a `.` that is
  clearly mid-token — single-capital initials ("R. Pereira"), known
  abbreviations ("Dr.", "Sr.", "Sra.", "etc."), decimals/thousands ("3.14",
  "1.500", "R$ 1.500,00"), and domains/file-exts ("aniamodels.shop",
  "index.html"). Very short fragments (< ~12 chars) are merged into the
  neighbouring chunk so the avatar never speaks a 1-word blip. Optional
  `maxChunkChars` hard-wraps comma-spliced run-ons.

- **Streaming queue in `useTTSDetection`.** chunk 1 starts ASAP; while it plays
  the NEXT chunk is synthesized (PREFETCH), so the gap between sentences is just
  the configured pause, not a re-synthesis stall — that's the latency win. After
  each chunk a configurable `chunkGapMs` (~1000 ms) pause is inserted, then the
  next plays. `isTalking` stays true across the WHOLE queue and only goes idle
  after the last chunk + trailing gap. The lip-sync `audioRef` is repointed to
  the currently-playing chunk's `<audio>` and a new `onChunkAudio(audioEl)`
  callback fires per chunk so the host reconnects its analyser (mouth tracks
  each sentence).

- **All providers stream.** Browser `speechSynthesis` (one utterance per chunk,
  `onend` → gap → next), Piper (browser ONNX, per-chunk buffer, prefetch next),
  and cloud TTS (`tiktok`/`elevenlabs`/`google`/`azure` — per-chunk fetch + play,
  prefetch next).

- **Cancel is clean.** `cancel()`, a fresh `speak()`, or `cancelPrevious:true`
  bump a generation token that invalidates every in-flight synth/gap callback,
  stop the current `<audio>` / `speechSynthesis`, abort in-flight fetches, revoke
  all object URLs, and reset `isTalking`. No overlap, no leaked audio.

- **New config (opts + `AvatarChatbot` props), backward compatible.**
  `ttsChunking` (default `true`), `chunkGapMs` (default `1000`), `maxChunkChars`
  (default `0` = off). `ttsChunking=false` or a single-sentence text behaves
  exactly like before (one-shot synth, no inter-chunk gap). The greeting /
  flow-prompt speak path and the AI-reply speak path (`onResponse`) both route
  through the queue.

- **Tests** in `examples/`: `test-tts-chunker.mjs` (splits on `.`/`!`/`?`/`…`/
  newline not comma; abbreviations/numbers/domains not split; short-fragment
  merge; semicolon opt-in; hard-wrap; edge cases) and `test-tts-queue.mjs`
  (chunk order preserved, no audio overlap, next-chunk prefetch during current
  playback, inter-chunk gap present). `npm test` runs them.

## [1.7.2]

### Fixed — Flow `{var}` interpolation now reaches ALL user-facing strings (live browser bug)
- **Input validation errors interpolate `{name}` (and any captured var).** A
  flow-authored `errorMsg` such as `"Esse telefone tá estranho, {name}. Confere o
  DDD…"` previously rendered the LITERAL token `{name}`. The validation itself was
  correct — only the error string skipped interpolation. The engine now resolves
  `inputError` through the SAME `resolvePrompt(collected)` path used for prompts:
  i18n key → text, then `{var}`/`{{var}}` filled from `collected`. The error is
  returned from `useFlowEngine` already fully resolved (render it directly).
- **Every user-facing flow string interpolates now**, not just prompts: input
  **placeholders**, **submit/skip** button labels, and option **labels** all flow
  through the new `resolveText()` (i18n + interpolation). A new `resolveText` is
  exposed from `useFlowEngine`; `resolveLabel` is now an alias of it. Optional
  `FlowInput.skipLabel` added (i18n key or literal, `{var}`-interpolated).

### Fixed — Reload now RESUMES instead of restarting at consent (returning-visitor bug)
- **Persistence saves the REAL current node id on every transition** (it already
  did, but the restore path ignored it). A returning visitor who had passed the
  consent step no longer re-does consent or re-answers already-captured fields.
- **New `RESUME` action + restore logic.** On mount, when consented persistence
  exists (`collected[consentKey]` truthy) and a real saved `currentNodeId` is
  present, the hook dispatches `RESUME` to land the visitor back at the saved node
  instead of replaying `START`. If we resume from start anyway, `START` now
  **auto-skips the consent node** (when consent was already given) **and any
  already-answered input** (skip-known), landing the user at the first unanswered
  step. A declined consent is NOT treated as consent (still asks).
- **First-run is unchanged.** With no persisted state (or no consent), `START`
  still enters the consent/start node and speaks its prompt. Persistence stays
  consent-gated — nothing is written before consent is accepted.

### Fixed — Returning greeting personalizes consistently, independent of flow authoring
- On `RESUME`, when `collected.name` (or `nome`/`firstName`/`fullName`) is known
  AND the landing node's prompt does NOT already name the user, the engine
  prepends a personalized **"Bem-vindo de volta, {name}!"** greeting (shown and
  spoken). When the landing prompt already names the user, no redundant greeting
  is added. With no known name, the greeting resolves cleanly with no raw braces.
  Hosts can override via `chat.flow.welcomeBackNamed` / `chat.flow.welcomeBack`.

## [1.7.1]

### Fixed — Flow question no longer buried by its options (live UX bug)
- **The current flow QUESTION is now PINNED, prominent, and always visible above
  its answers.** When a bubble-flow node asks something, the question that the
  avatar says/asks is rendered as a bold, larger header (`clamp(15px,4.2vw,18px)`,
  `font-weight:700`, accent rule) in a dedicated **flow interaction region** that
  sits below the transcript. The answer affordances — option bubbles OR the typed
  input — render in their OWN independently-scrolling sub-area *below* the pinned
  question. The options can no longer scroll the question out of view.
  Previously, when a node rendered its options the view auto-scrolled to the
  bottom, pushing the question off-screen ("não dá pra ler o que foi dito" — the
  user had to scroll UP to read what was asked, reported live on housestudio.online).
- **Auto-scroll reworked.** When a NEW flow node enters, the view now scrolls the
  pinned question to the TOP of the visible area (`scrollIntoView({ block:'start' })`)
  so the question reads first; the user then scrolls down to the options. The old
  scroll-to-bottom behavior is KEPT ONLY for free-text AI chat replies (no active
  flow node), where bottom = latest reply is the right target.
- **Transcript de-duplication.** The current question is shown once (pinned); the
  most-recent flow-prompt is filtered out of the scrollable history while pinned.
  Earlier prompts (past Q&A) stay in the transcript so history is still readable.

### Improved — Responsive on small screens (mobile)
- The widget container already adapted (`min(width, calc(100vw - 24px))`); the
  chat content now follows: question + option/message text **wrap** (`overflow-wrap:
  anywhere`, `word-break`), options **stack/wrap** with `white-space:normal` and no
  horizontal overflow (`overflow-x:hidden` on scroll areas), tap targets stay
  **>=44px**, and the typed-input font is bumped to **16px** so iOS doesn't
  zoom-on-focus. The flow region is capped (`min(55vh, …)`) so question + options +
  input bar fit a phone viewport without the layout overflowing.

### Changed — Default copy (no acronyms, real-attendant framing)
- `chat.flow.escalate` default reworded away from the AI framing:
  **pt-BR** `"Falar com a IA"` → **`"Falar com um atendente"`**;
  **en** `"Talk to the AI"` → **`"Talk to a real person"`**. Presents a real
  attendant/handoff, never "IA"/"agente de IA". (Per-app authored flow text and AI
  persona are swept separately.) The library ships no built-in consent-prompt
  string — consent wording is author-supplied per-app flow JSON; only the
  consent-gating mechanism (`flowConsentKey`) lives in the lib.

## [1.7.0]

### Added — TYPED-INPUT flow nodes (free-text lead capture)
- **Flow nodes can now collect a TYPED value, not just clickable bubbles.** A
  node may carry an `input` spec — `{ key, type, placeholder, required, validate,
  errorMsg, submitLabel, next, optionalSkip, alwaysAsk }` — and the chatbot
  renders a labeled text field (or `textarea`) + a gradient submit button in the
  bubble area INSTEAD of option bubbles. `type` is `'text' | 'email' | 'tel' |
  'number' | 'textarea'`; the `<input>` gets the matching DOM `type`/`inputMode`
  and an `autocomplete` hint (name/tel/email) for mobile keyboards + autofill.
  Enter submits; an optional "Pular"/Skip bubble (when `optionalSkip:true`)
  advances without capturing.
- **Validation, lead-gen ready.** Built-in validators: `'email'`, `'phone'` (BR —
  accepts `(xx) xxxxx-xxxx`, `+55…`, or 10–13 bare digits), `'cep'` (8 digits,
  optional hyphen). `validate` may also be a raw regex source string. On an
  invalid submit the node's `errorMsg` (or `chat.flow.inputInvalid`) shows inline
  and the flow does NOT advance; on a valid submit the value is recorded into
  `collected[key]` (also honoring `collectKey`) and the flow advances to
  `input.next`. **The typed value goes ONLY into the flow's `collected` map — it
  is never spoken (TTS) and never sent to the AI webhook/`sendMessage`.** The
  avatar still SPEAKS the node prompt as usual.
- **Reducer:** new pure action `SUBMIT_INPUT(value)` → `{ state, effects }`
  (validate → capture + advance, or set `state.inputError` without advancing).
  New exports `flowNodeInput`, `flowValidateInput`. `useFlowEngine` now exposes
  `currentInput`, `submitInput(value) → { ok, error }`, and `inputError`.

### Added — Prompt variable interpolation (talk to the user by name)
- **Node prompts and option labels interpolate `{var}` and `{{var}}` from the
  `collected` map** after i18n resolution. Once an input captures
  `collected.name = "João"`, a later prompt `"Prazer, {name}! O que procura?"` is
  both SPOKEN and SHOWN as `"Prazer, João! O que procura?"`. Unknown/empty vars
  resolve to `''` (leftover spaces before punctuation are trimmed) so a missing
  value never surfaces a raw `{name}` — author greetings so they still read
  naturally without a name (e.g. `"Bem-vindo de volta, {name}!"` → `"Bem-vindo
  de volta!"`). New export `flowInterpolate`; `flowResolvePrompt` takes an
  optional `collected` 3rd arg; `useFlowEngine` exposes `resolveLabel`.
- **Escalation now carries the captured contact.** `onFlowEscalate` /
  `onEscalate` receive a `contact` object (`{ name, phone, email }`, tolerant of
  key aliases like `nome`/`whatsapp`/`mail`) alongside `collected`, and the
  synthesized webhook message addresses the user by name — so the AI greets the
  user personally and has their contact on hand after handoff.

### Added — Returning-visitor memory + known-user seeding
- **Persistence (returning visitor, same browser).** `{ sessionId, collected,
  currentNodeId }` is persisted to `localStorage` under `ania-flow-<appId|flowId>`
  (override with `persistKey`) whenever `collected` changes; on mount it is
  restored and used to seed the flow (entries older than a **30-day TTL** are
  ignored). New props `persist` (default `true`) and `persistKey`. Hook exposes
  `clearPersistedFlow()`; `reset()` clears storage. **LGPD:** when `flowConsentKey`
  /`consentKey` is set, nothing is persisted until `collected[consentKey]` is
  truthy, and a declined/withdrawn consent or a reset clears any stored state.
- **Known-user seeding (logged-in user).** New prop `initialContext` (e.g.
  `{ name, email, phone }` from the host app's auth/session) pre-seeds `collected`
  on init — merged UNDER any persisted values so the authenticated identity wins.
  An authenticated app passes the signed-in user's fields and the chat already
  knows them (greets by name, skips inputs it already has).
- **Skip-known.** An input node whose `key` already holds a VALID value (from
  seeding or persistence) auto-advances to its `next` without re-asking (chained
  transitively). Default for input nodes; force a re-ask with `alwaysAsk: true`.
  A seeded value that fails the node's validator is still asked.

### i18n
- New keys `chat.flow.submit`, `chat.flow.skip`, `chat.flow.inputInvalid`
  (en + pt-BR; other locales fall back to English).

### Notes
- Backward compatible: all changes are additive. Flows authored for 1.6.x run
  unchanged (no `input` → bubbles as before; no `initialContext`/persisted state →
  empty `collected` = today's behavior; prompts without `{var}` are untouched).
  `examples/flow-demo.json` gains a name → phone → email lead-capture chain;
  `examples/test-flow-engine.mjs` now runs 91 assertions
  (`node examples/test-flow-engine.mjs`).

## [1.6.1]

### Fixed — flow-engine production-canary hardening
- **No more raw HTTP errors leaked to users.** On a webhook failure, `useChatbot`
  now shows a friendly, localized message instead of a raw `HTTP <code>` string —
  both in the chat bubble AND in the error chip. New i18n key
  `chat.error.generic` (en + pt-BR; other locales fall back to English). The raw
  cause is logged via `console.error` for developers only.
- **Friendlier fallback copy.** The bot fallback message changed from
  *"O sistema está em desenvolvimento…"* to the localized retry copy
  (*"Tive um probleminha aqui, pode tentar de novo?"* / *"I ran into a little
  hiccup here — could you try again?"*).
- **Single auto-retry on transient failures.** On a 5xx or a network/CORS error,
  `useChatbot` now waits ~1.2 s and retries the POST once before falling back —
  masking backend cold-starts that lost first-leads in the canary. A 4xx is
  surfaced immediately (not retried). New optional `useChatbot` dep `translate`.
- **Free-text keeps flow context.** When a flow is active, typed free-text now
  carries the same rich metadata the escalate button sends — `sessionId`,
  `appId`, the flow's `collected` map, and `flowId` — so the AI keeps context
  after escalation (previously free-text sent only `{ message }`).
- **Exactly one back affordance.** The engine remains the single source for the
  back bubble; author-supplied back options are now filtered out of
  `visibleOptions` (detected by an `isBack: true` flag, a label matching the
  localized back string, or a `next` that re-targets the previous node). Existing
  flows work without re-authoring.
- **Spoken prompts are now visible in the transcript.** Entering a node appends
  its resolved prompt to the visible chat log (new reducer `message` effect +
  `useFlowEngine` `onPrompt` dep), so the running conversation shows its history
  instead of only the static greeting + current bubbles. Nodes marked
  `speak:false` still surface their prompt in the transcript (silently). When a
  flow is active the generic auto-greeting is suppressed — the flow's start-node
  prompt is the greeting — so it is not double-spoken.
- **a11y:** the message text input now has an `id`/`name` (`ania-chat-input`).

### Notes
- Backward compatible: all changes are additive or internal. Flows authored for
  1.6.0 run unchanged; the new `useChatbot` `translate` and `useFlowEngine`
  `onPrompt` deps are optional.

## [1.6.0]

### Added — NO-AI bubble/balloon flow engine
- New `useFlowEngine(flowDef, deps)` hook that drives a **deterministic
  decision-tree** chat flow. The avatar SPEAKS each node's prompt and the user
  answers by tapping clickable bubbles — no LLM in the loop until an explicit
  escalation. State: `currentNode`, `backStack`, `collected` (answers map),
  `sessionId` (generated once client-side via `crypto.randomUUID` with a
  fallback), `done`/`isEscalated`. API: `{ currentNode, currentPrompt,
  visibleOptions, selectOption, goBack, canGoBack, reset, goto, collected,
  sessionId, isEscalated, isDone }`.
- The transition logic is factored into a **pure, side-effect-free reducer**
  (`src/hooks/flow-reducer.js`, exported as `flowReducer` + `flowInitialState`,
  `flowGetNode`, `flowResolvePrompt`, `flowVisibleOptions`) so it can be driven
  and tested headlessly (no React/DOM/TTS). A standalone sanity test lives at
  `examples/test-flow-engine.mjs` (`node examples/test-flow-engine.mjs`, 29
  assertions) and a demo flow at `examples/flow-demo.json`.
- New `AvatarChatbot` props: `flow` (a flow def object), `flowUrl` (lazily
  fetched JSON, ignored when `flow` is set), `appId`, `onFlowCapture`
  (`{ sessionId, appId, key, value, collected }` per captured answer — stream to
  a CRM), and `onFlowEscalate` (`{ collected, sessionId, transcript }`; defaults
  to forwarding an escalation message to the webhook via `sendMessage`).
- The current node's options render as **animated, mobile-friendly clickable
  bubbles** (min 44px tap targets, gradient fill, hover-lift, pop-in animation)
  in the message area, with an auto-shown "Voltar"/Back bubble when history
  exists and a highlighted "Falar com a IA"/escalate bubble. **Free-text input
  keeps working alongside the flow.**
- New `flow <nodeId>` command verb (and `ctx.flowGoto`) to jump the flow from
  the external-control / postMessage command surface.
- New exports: `useFlowEngine`, `flowReducer`, `flowInitialState`,
  `flowGetNode`, `flowResolvePrompt`, `flowVisibleOptions`, plus the `FlowDef`,
  `FlowNode`, `FlowOption`, `FlowState`, `FlowEffect`, `FlowAction`,
  `UseFlowEngineDeps`, and `UseFlowEngineResult` types.
- New i18n keys `chat.flow.back` / `chat.flow.escalate` (en + pt-BR; other
  locales fall back to English).

### Notes
- Backward compatible: when no `flow`/`flowUrl` prop is passed, the chatbot
  behaves identically to 1.5.0. The new surface is additive only.

## [1.5.0]

### Added — Localization (i18n)
- Built-in, **dependency-free** locale table for every user-facing string the
  library renders: greetings + waiting messages (previously hard-coded
  Portuguese in `src/constants/messages.js`), the *Enable Sound* button, the
  Idle/Talk speed-slider labels, the STT placeholder/feedback/error toasts, and
  the avatar control titles + loading/error text. No `i18next` (or any other
  runtime) is pulled in — just a tiny synchronous resolver with English
  fallback.
- **~190 languages bundled** under `src/i18n/strings/<code>.json`. `en` + `pt-BR`
  are hand-authored; the rest are machine-translated (and shipped in `files` so
  consumers get every language with zero extra fetches — locale tables are
  inlined into the bundle at build time).
- New `locale` prop on `AvatarChatbot` and `AniaAvatar` (default `'pt-BR'`, which
  preserves the library's original wording — existing apps are unaffected).
  Unknown codes fall back to the base language (`es-MX` → `es`) then to English;
  a string is never rendered as a raw key.
- New `messagesOverride` prop (`Record<string, string | string[]>`) lets a
  consumer override any individual built-in string (or the `greetings` /
  `waiting` lists) without forking the component.
- New exports: `getString`, `getStringList`, `createTranslator`,
  `availableLocales`, `hasLocale`, `DEFAULT_LOCALE`, `FALLBACK_LOCALE`, plus the
  `MessagesOverride`, `Translator`, and `I18nVars` types.
- The waiting-message TTS now speaks in the configured `ttsLang` instead of a
  hard-coded `pt-BR`.

### Notes
- Backward compatible: all existing exports and props are unchanged; the new
  surface is additive and defaults preserve today's behavior.

## [1.4.0]

### Added — Plugin architecture
- `PluginRegistry` class + `Plugin` contract (`{ id, name, version, description,
  kind: 'tts'|'stt'|'wakeword'|'action'|'integration', enabled, init?, start?,
  stop?, createEngine?, createHandler?, settingsSchema? }`), mirroring the desktop
  Ania Player `PluginBase` / `TTSEngine` / `STTEngine` / `WakeWordEngine` shapes.
- All existing providers re-expressed as registered built-in plugins (wrapping the
  working code, not rewriting it): `tts-browser`, `tts-tiktok`, `tts-elevenlabs`,
  `tts-google`, `tts-azure`, `tts-piper`, `stt-browser`, `stt-google`, `action-audio`.
- `usePlugins()` hook + `plugins`, `activeTtsPlugin`, `activeSttPlugin`,
  `onPluginsReady` props on `AvatarChatbot` to register custom plugins and resolve
  the active provider per subsystem at runtime.
- New exports: `PluginRegistry`, `getDefaultRegistry`, `PLUGIN_KINDS`,
  `validatePlugin`, `registerBuiltins`, `BUILTIN_PLUGINS`, `TTS_PROVIDER_TO_PLUGIN`,
  `STT_PROVIDER_TO_PLUGIN`, and each built-in plugin object.

### Added — Wake word detection
- `WakeWordEngine` (browser port of the Chrome extension's openWakeWord engine:
  16 kHz mono, 1280-sample frames, 12-frame buffer, threshold) in
  `src/services/wake-word.js`. `onnxruntime-web` is lazy-imported and optional —
  degrades gracefully when absent.
- `useWakeWord()` hook + `getWakeWordEngine()`, `isWakeWordSupported()` exports.
- New `AvatarChatbot` props: `wakeWordEnabled`, `wakeWordModelUrl`,
  `wakeWordThreshold`, `wakeWordWasmPaths`, `onWake` (default off).

### Added — Command / external-control API
- `executeCommand(line, ctx)` (and `parseCommandLine`, `COMMAND_LIST`) porting the
  desktop socket command set: `show`, `hide`, `toggle`, `action <id|index>`,
  `actions`, `info`, `speed <idle> [talk]`, `sensitivity <v>`, `mute`, `unmute`,
  `tts <text>`, `ask <text>` (alias `provider`), `wake`, `stop`, `help`.
- `useAniaAvatarRef()` gains `runCommand(line, extraCtx?)`.
- `installPostMessageControl(ctx, options)` + `enablePostMessageControl` /
  `postMessageOrigins` props on `AvatarChatbot` — an origin-allowlisted
  `window.postMessage({ source: 'ania', cmd })` listener lets a host page drive the
  embedded avatar.

### Added — Lip-sync parity
- `lipSyncSustainStyle` (`'hold' | 'wiggle'`) and `lipSyncWiggleSpeed` props on
  `AniaAvatar` / `AvatarChatbot`, threaded into
  `configureLipsSync(enabled, intensity, responsiveness, opennessMap, sustainStyle,
  wiggleSpeed)`. Explicit props override server config; lip sync is now configured
  even without a server URL (so the sustain knobs apply to audio-driven FFT lip sync).

### Notes
- Backward compatible: all existing exports and props are unchanged. New surface is
  additive only.
