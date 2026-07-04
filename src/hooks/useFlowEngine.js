// useFlowEngine — drives a NO-AI bubble/balloon chatbot flow.
//
// A "flow" is a deterministic decision tree (see flow-reducer.js for the full
// schema). The avatar SPEAKS each node's prompt and the user answers by tapping
// clickable bubbles — no LLM in the loop until an explicit escalation. This
// hook owns the navigation state and runs the declarative effects the pure
// reducer emits (speak / capture / escalate), wiring them to the host-supplied
// callbacks.
//
// It is fully backward compatible by omission: a component only instantiates it
// when a `flow` prop is supplied, so when no flow is passed nothing here runs.

import { useReducer, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  flowReducer,
  initialState,
  getNode,
  visibleOptions as nodeVisibleOptions,
  nodeInput,
  resolvePrompt,
  interpolate,
} from './flow-reducer.js';

// Generate a client-side session id. Prefer crypto.randomUUID; degrade to a
// timestamp+random token on older browsers / non-secure contexts.
function genSessionId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch (_) { /* fall through */ }
  return (
    'flow-' +
    Date.now().toString(36) +
    '-' +
    Math.random().toString(36).slice(2, 10)
  );
}

// ── localStorage persistence (returning-visitor memory) ────────────────────
// Persist { sessionId, collected, currentNodeId, ts } under a per-app key so a
// returning visitor in the SAME browser is remembered. LGPD-aware: writing is
// gated on consent (see `consentKey`), and reset/decline clears it. Entries
// older than PERSIST_TTL_MS are ignored on restore.
const PERSIST_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function persistStore() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  } catch (_) { /* access can throw in sandboxed iframes */ }
  return null;
}

function loadPersisted(key) {
  const store = persistStore();
  if (!store || !key) return null;
  try {
    const raw = store.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return null;
    if (typeof data.ts === 'number' && Date.now() - data.ts > PERSIST_TTL_MS) {
      store.removeItem(key);
      return null;
    }
    return data;
  } catch (_) {
    return null;
  }
}

function savePersisted(key, payload) {
  const store = persistStore();
  if (!store || !key) return;
  try {
    store.setItem(key, JSON.stringify({ ...payload, ts: Date.now() }));
  } catch (_) { /* quota / private mode — best effort */ }
}

function removePersisted(key) {
  const store = persistStore();
  if (!store || !key) return;
  try { store.removeItem(key); } catch (_) { /* ignore */ }
}

// Mirrors the reducer's consent gate: a consentKey value counts as "consented"
// when it's truthy and not an explicit decline token. Kept local so the hook can
// decide RESUME-vs-START without importing reducer internals.
function isConsented(v) {
  if (v == null) return false;
  if (v === false) return false;
  const s = String(v).trim().toLowerCase();
  if (s === '' || s === 'false' || s === 'recusado' || s === 'declined' || s === 'no') return false;
  return true;
}

/**
 * @param {object} flowDef  The flow definition (see flow-reducer.js schema).
 * @param {object} deps
 * @param {(text:string, opts?:object)=>void} deps.speak  TTS the resolved prompt.
 * @param {(text:string, meta?:object)=>void} [deps.sendMessage]  Webhook/LLM send (used on escalate, optional — onEscalate is preferred).
 * @param {string} [deps.locale]
 * @param {object} [deps.messagesOverride]
 * @param {(info:{sessionId,appId,key,value,collected})=>void} [deps.onCapture]
 * @param {(info:{collected,sessionId,transcript})=>void} [deps.onEscalate]
 * @param {string} [deps.appId]
 * @param {string} [deps.lang]   BCP-47 lang passed to speak().
 * @param {(key:string)=>string} [deps.translate]  Prompt i18n resolver (e.g. tr.t).
 * @param {object} [deps.initialContext]  Known-user fields pre-seeded into `collected` (e.g. { name, email } from auth).
 * @param {boolean} [deps.persist=true]   Persist { collected, currentNodeId } to localStorage (returning visitor).
 * @param {string} [deps.persistKey]      Override the localStorage key (default `ania-flow-<appId|flowId>`).
 * @param {string} [deps.consentKey]      A `collected` key gating persistence — only write once `collected[consentKey]` is truthy (LGPD).
 */
export function useFlowEngine(flowDef, deps = {}) {
  const {
    speak,
    sendMessage,
    onCapture,
    onEscalate,
    onPrompt,
    appId,
    lang,
    translate,
    initialContext,
    persist = true,
    persistKey,
    consentKey,
  } = deps;

  // Resolve the localStorage key for this app/flow (override > appId > flowId).
  const storageKey = useMemo(() => {
    if (persistKey) return persistKey;
    const id = appId != null ? appId : (flowDef && flowDef.id != null ? flowDef.id : 'default');
    return 'ania-flow-' + id;
  }, [persistKey, appId, flowDef]);

  // Build the START seed once: restored persistence (if any) MERGED UNDER the
  // known-user initialContext (auth identity wins over a stale persisted value).
  const persistedRef = useRef(undefined);
  if (persistedRef.current === undefined) {
    persistedRef.current = persist ? loadPersisted(storageKey) : null;
  }
  const seed = useMemo(() => {
    const restored = (persist && persistedRef.current && persistedRef.current.collected) || {};
    const known = (initialContext && typeof initialContext === 'object') ? initialContext : {};
    const merged = { ...restored, ...known };
    return Object.keys(merged).length ? merged : null;
  }, [persist, initialContext]);

  // One session id per mounted flow instance — reuse a persisted one so a
  // returning visitor keeps the same CRM session id.
  const sessionIdRef = useRef(null);
  if (sessionIdRef.current == null) {
    const restoredSid = persist && persistedRef.current && persistedRef.current.sessionId;
    sessionIdRef.current = restoredSid || genSessionId();
  }
  const sessionId = sessionIdRef.current;

  // Keep the latest callbacks in refs so the effect-runner identity is stable
  // (the reducer dispatch should not churn when a parent re-renders).
  const speakRef = useRef(speak);
  const sendMessageRef = useRef(sendMessage);
  const onCaptureRef = useRef(onCapture);
  const onEscalateRef = useRef(onEscalate);
  const onPromptRef = useRef(onPrompt);
  const translateRef = useRef(translate);
  const langRef = useRef(lang);
  const appIdRef = useRef(appId);
  useEffect(() => {
    speakRef.current = speak;
    sendMessageRef.current = sendMessage;
    onCaptureRef.current = onCapture;
    onEscalateRef.current = onEscalate;
    onPromptRef.current = onPrompt;
    translateRef.current = translate;
    langRef.current = lang;
    appIdRef.current = appId;
  });

  // A running transcript of prompts + chosen labels (for escalation context).
  const transcriptRef = useRef([]);

  // Run one declarative effect emitted by the reducer.
  const runEffect = useCallback((effect) => {
    switch (effect.type) {
      case 'message': {
        // Record the prompt in the escalation transcript AND surface it in the
        // host's visible chat log so the running conversation stays visible
        // (the node prompt was previously spoken-only and left no history).
        transcriptRef.current.push({ role: 'assistant', text: effect.text });
        if (onPromptRef.current && effect.text) {
          onPromptRef.current(effect.text);
        }
        break;
      }
      case 'speak': {
        if (speakRef.current && effect.text) {
          speakRef.current(effect.text, { lang: langRef.current, cancelPrevious: true });
        }
        break;
      }
      case 'capture': {
        if (onCaptureRef.current) {
          onCaptureRef.current({
            sessionId: sessionIdRef.current,
            appId: appIdRef.current,
            key: effect.key,
            value: effect.value,
            collected: effect.collected,
          });
        }
        break;
      }
      case 'escalate': {
        const transcript = transcriptRef.current.slice();
        // Surface the captured contact (name/phone/email) so the AI can address
        // the user by name and has their contact on hand after escalation.
        const contact = extractContact(effect.collected);
        if (onEscalateRef.current) {
          onEscalateRef.current({
            collected: effect.collected,
            contact,
            sessionId: sessionIdRef.current,
            transcript,
          });
        } else if (sendMessageRef.current) {
          // Fallback: synthesize a name-aware escalation message for the webhook.
          const text = buildEscalationText(effect.collected);
          sendMessageRef.current(text, {
            flowId: flowDef && flowDef.id,
            sessionId: sessionIdRef.current,
            appId: appIdRef.current,
            collected: effect.collected,
            contact,
            escalate: true,
          });
        }
        break;
      }
      default:
        break;
    }
  }, [flowDef]);

  // Keep the START/RESET seed in a ref so the reducer wrapper (stable identity)
  // always reads the latest merged known-user + restored-persistence context.
  const seedRef = useRef(seed);
  useEffect(() => { seedRef.current = seed; }, [seed]);

  // Reducer wrapper: each dispatch advances state AND runs the emitted effects.
  // We keep effects out of render by running them inside the reducer's
  // commit via a microtask queue collected on the side.
  const pendingEffectsRef = useRef([]);
  const consentKeyRef = useRef(consentKey);
  useEffect(() => { consentKeyRef.current = consentKey; });
  const reducer = useCallback((state, action) => {
    const { state: nextState, effects } = flowReducer(state, action, flowDef, {
      translate: translateRef.current,
      seed: seedRef.current,
      consentKey: consentKeyRef.current,
    });
    if (effects && effects.length) {
      pendingEffectsRef.current.push(...effects);
    }
    return nextState;
  }, [flowDef]);

  // Seed the initial reducer state with the known-user/restored context so the
  // very first render already knows the visitor (before START is dispatched).
  const [state, dispatch] = useReducer(reducer, seed, initialState);

  // Keep a ref mirror of the latest committed state so submitInput() can run a
  // pure validation probe against it and return {ok,error} synchronously (the
  // dispatched action above drives the real state + effects).
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; });

  // Flush queued effects after each committed state change. Running effects in
  // an effect (not during reducer) keeps the reducer pure and avoids
  // double-invocation under React StrictMode's intentional re-runs.
  useEffect(() => {
    if (pendingEffectsRef.current.length === 0) return;
    const queued = pendingEffectsRef.current;
    pendingEffectsRef.current = [];
    for (const eff of queued) runEffect(eff);
  });

  // Enter the flow once on mount (and whenever the flow identity changes).
  // RETURNING visitor: when consented persistence exists, RESUME at the saved
  // node id instead of replaying the start/consent node. Otherwise START.
  const startedForRef = useRef(null);
  const flowKey = flowDef && (flowDef.id != null ? flowDef.id : flowDef);
  useEffect(() => {
    if (!flowDef) return;
    if (startedForRef.current === flowKey) return;
    startedForRef.current = flowKey;
    transcriptRef.current = [];

    // Decide RESUME vs START from the restored persistence (gated on consent).
    const p = persist ? persistedRef.current : null;
    const restoredCollected = (p && p.collected && typeof p.collected === 'object') ? p.collected : null;
    const consentGiven = restoredCollected
      ? (consentKey == null ? true : isConsented(restoredCollected[consentKey]))
      : false;
    const savedNodeId = p && typeof p.currentNodeId === 'string' ? p.currentNodeId : null;
    // Only RESUME when consent was already given AND the saved node is real and
    // is NOT the start/consent node (resuming at start is just a START anyway).
    const startNodeId = flowDef.startNode;
    const canResume = consentGiven && savedNodeId != null
      && getNode(flowDef, savedNodeId) != null
      && savedNodeId !== startNodeId;

    if (canResume) {
      dispatch({ type: 'RESUME', nodeId: savedNodeId });
    } else if (consentGiven) {
      // Consent given but no usable saved node (or it equals start) → START will
      // auto-skip the consent node + answered inputs (skip-known) for us.
      dispatch({ type: 'START' });
    } else {
      dispatch({ type: 'START' });
    }
  }, [flowDef, flowKey, persist, consentKey]);

  // ---- public API ----
  const currentNode = useMemo(
    () => getNode(flowDef, state.currentNodeId),
    [flowDef, state.currentNodeId]
  );

  // The node id we'd return to on goBack() (top of the backStack). Used to
  // detect author-supplied "back" options whose `next` simply re-targets it.
  const prevNodeId = state.backStack.length > 0
    ? state.backStack[state.backStack.length - 1]
    : null;

  // Author-supplied options that are themselves a "back" affordance must be
  // filtered out so the UI shows exactly ONE back control (the engine's own,
  // rendered when canGoBack). We detect a back option by any of:
  //   • an explicit `isBack: true` flag,
  //   • a label matching the localized back string ("Voltar"/"Back"),
  //   • an option whose `next` targets the node we'd pop back to anyway.
  // This keeps existing flows working without re-authoring.
  const isBackOption = useCallback((opt) => {
    if (!opt) return false;
    if (opt.isBack === true) return true;
    if (prevNodeId != null && opt.next != null && opt.next === prevNodeId) return true;
    const label = opt.label != null ? String(opt.label).trim() : '';
    if (label) {
      const tr = translateRef.current;
      const backLabel = typeof tr === 'function' ? tr('chat.flow.back') : null;
      // Strip a leading arrow ("← Voltar") before comparing, case-insensitively.
      const norm = (s) => String(s).replace(/^[\s←⬅<-]+/, '').trim().toLowerCase();
      if (backLabel && backLabel !== 'chat.flow.back' && norm(label) === norm(backLabel)) {
        return true;
      }
    }
    return false;
  }, [prevNodeId]);

  const visibleOptions = useMemo(
    () => nodeVisibleOptions(currentNode).filter((opt) => !isBackOption(opt)),
    [currentNode, isBackOption]
  );

  const selectOption = useCallback((opt) => {
    if (!opt) return;
    transcriptRef.current.push({ role: 'user', text: opt.label != null ? String(opt.label) : String(opt.value) });
    dispatch({ type: 'SELECT', option: opt });
  }, []);

  const goBack = useCallback(() => {
    dispatch({ type: 'BACK' });
  }, []);

  // Clear any persisted flow state for this app/key (LGPD: forget the visitor).
  const clearPersistedFlow = useCallback(() => {
    removePersisted(storageKey);
    persistedRef.current = null;
  }, [storageKey]);

  const reset = useCallback(() => {
    transcriptRef.current = [];
    // Reset forgets the visitor: clear persisted state (consent is withdrawn /
    // the conversation is starting over). Known-user `initialContext` re-seeds.
    clearPersistedFlow();
    dispatch({ type: 'RESET' });
  }, [clearPersistedFlow]);

  const goto = useCallback((nodeId) => {
    dispatch({ type: 'GOTO', nodeId });
  }, []);

  const canGoBack = state.backStack.length > 0;

  // ---- persistence (returning-visitor memory) ----
  // Persist { sessionId, collected, currentNodeId } whenever collected changes,
  // GATED on consent: when `consentKey` is set, nothing is written until
  // `collected[consentKey]` is truthy (LGPD — do not persist before the consent
  // node is accepted). When `consentKey` is unset, the host opted in by passing
  // `persist` and owns its own consent gating. A consent that becomes falsy
  // (declined) clears any previously persisted state.
  useEffect(() => {
    if (!persist) return;
    const consented = consentKey == null ? true : !!state.collected[consentKey];
    if (!consented) {
      // Consent absent/withdrawn → ensure nothing lingers in storage.
      if (consentKey != null) removePersisted(storageKey);
      return;
    }
    // Only persist once something has actually been collected.
    if (!state.collected || Object.keys(state.collected).length === 0) return;
    savePersisted(storageKey, {
      sessionId: sessionIdRef.current,
      collected: state.collected,
      currentNodeId: state.currentNodeId,
    });
  }, [persist, consentKey, storageKey, state.collected, state.currentNodeId]);

  // Resolve the current prompt text (i18n applied + {var} interpolated from the
  // collected answers) for components that want to render it as a bubble in
  // addition to speaking it.
  const currentPrompt = useMemo(
    () => (currentNode ? resolvePrompt(currentNode.prompt, translateRef.current, state.collected) : ''),
    [currentNode, state.collected]
  );

  // Resolve ANY user-facing flow string the SAME way prompts are resolved: i18n
  // (when the string is a translation key) THEN {var}/{{var}} interpolation from
  // the collected answers. Use this for option labels, input placeholders,
  // submit/skip labels, and validation error messages so {name} (and any other
  // captured var) fills in everywhere — not just in prompts. Stable-ish identity
  // (re-created only when collected changes).
  const resolveText = useCallback(
    (text) => resolvePrompt(text, translateRef.current, state.collected),
    [state.collected]
  );

  // Back-compat alias: option labels were resolved via resolveLabel(). Route it
  // through the same i18n+interpolate path (a literal label misses i18n and
  // falls back to itself, so this only ADDS interpolation — never breaks
  // literal labels).
  const resolveLabel = resolveText;

  // The current input-validation error, FULLY resolved (i18n key → text, then
  // {var} interpolated from collected) so a flow-authored errorMsg like
  // "Esse telefone tá estranho, {name}." renders the real name instead of the
  // literal token. null when there's no error.
  const resolvedInputError = useMemo(
    () => (state.inputError ? resolvePrompt(state.inputError, translateRef.current, state.collected) : null),
    [state.inputError, state.collected]
  );

  // The TYPED-input spec of the current node (or null when it's an
  // options-only / terminal node). When non-null the host renders a text field
  // instead of option bubbles and calls submitInput() on submit.
  const currentInput = useMemo(
    () => nodeInput(currentNode),
    [currentNode]
  );

  // Submit a typed value against the current input node. Returns { ok, error }:
  // on success the engine captures the value + advances; on failure the reducer
  // records state.inputError (also returned here) and does NOT advance. The
  // typed value goes ONLY into `collected` — it is never spoken nor sent to the
  // webhook/sendMessage.
  const submitInput = useCallback((value) => {
    if (!currentInput) return { ok: false, error: null };
    // Mirror the chosen answer into the escalation transcript (so an escalation
    // after a typed answer keeps the value as context) — same as selectOption.
    const trimmed = value == null ? '' : String(value).trim();
    dispatch({ type: 'SUBMIT_INPUT', value });
    // The reducer is synchronous-by-dispatch; read the resulting validity from
    // a fresh pure run so callers get an immediate {ok,error} without waiting a
    // render. (The dispatched action drives the actual state + effects.)
    const probe = flowReducer(stateRef.current, { type: 'SUBMIT_INPUT', value }, flowDef, {
      translate: translateRef.current,
    });
    const ok = probe.state.inputError == null;
    if (ok && trimmed) {
      transcriptRef.current.push({ role: 'user', text: trimmed });
    }
    return { ok, error: ok ? null : probe.state.inputError };
  }, [currentInput, flowDef]);

  return {
    currentNode,
    currentPrompt,
    currentInput,
    visibleOptions,
    resolveLabel,
    resolveText,
    selectOption,
    submitInput,
    // FULLY-resolved (i18n + {var}-interpolated) validation error — render this
    // directly (do NOT pass it back through tr.t / interpolate, it's done).
    inputError: resolvedInputError,
    goBack,
    canGoBack,
    reset,
    goto,
    clearPersistedFlow,
    collected: state.collected,
    sessionId,
    isEscalated: state.escalated,
    isDone: state.done,
  };
}

/**
 * Pull the captured contact fields out of the collected map. Tolerant of common
 * key aliases so a flow authored with `nome`/`whatsapp`/`mail` still surfaces
 * the contact to the AI.
 */
function extractContact(collected) {
  const c = collected || {};
  const pick = (...keys) => {
    for (const k of keys) {
      if (c[k] != null && String(c[k]).trim() !== '') return String(c[k]).trim();
    }
    return undefined;
  };
  const contact = {};
  const name = pick('name', 'nome', 'fullName', 'firstName');
  const phone = pick('phone', 'telefone', 'whatsapp', 'celular', 'tel', 'fone');
  const email = pick('email', 'mail', 'e-mail');
  if (name) contact.name = name;
  if (phone) contact.phone = phone;
  if (email) contact.email = email;
  return contact;
}

/**
 * Build a human-readable escalation message from the collected answers. When a
 * name was captured the message addresses the user by name and leads with the
 * contact block so the AI greets them personally and has their contact handy.
 */
function buildEscalationText(collected) {
  const entries = Object.entries(collected || {});
  if (entries.length === 0) return 'O usuário deseja falar com o atendimento.';
  const contact = extractContact(collected);
  const lines = entries.map(([k, v]) => `${k}: ${v}`).join('; ');
  const who = contact.name ? `O usuário ${contact.name} deseja` : 'O usuário deseja';
  const contactBits = [];
  if (contact.name) contactBits.push(`nome: ${contact.name}`);
  if (contact.phone) contactBits.push(`telefone: ${contact.phone}`);
  if (contact.email) contactBits.push(`e-mail: ${contact.email}`);
  const contactLine = contactBits.length
    ? ` Contato — ${contactBits.join('; ')}.`
    : '';
  return `${who} falar com o atendimento.${contactLine} Contexto: ${lines}.`;
}
