/**
 * Pure, side-effect-free flow-engine reducer for the NO-AI bubble/balloon
 * chatbot flow. Kept separate from the React hook so the transition logic can
 * be unit-tested standalone (no DOM, no React, no TTS) — see
 * examples/test-flow-engine.mjs.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * FLOW DEFINITION SCHEMA
 * ─────────────────────────────────────────────────────────────────────────
 *   {
 *     id:        string,                 // flow identifier (sent to host/CRM)
 *     version:   string|number,          // author's version tag (optional)
 *     startNode: string,                 // id of the first node to enter
 *     nodes: {
 *       [id]: {
 *         id:        string,
 *         prompt:    string,             // text OR an i18n key; spoken on enter
 *         speak:     boolean,            // default true; false = render silent
 *         options: [                     // clickable bubbles
 *           {
 *             label:    string,          // bubble text (NEVER spoken)
 *             value:    any,             // value recorded into `collected`
 *             next:     string,          // id of the node to advance to
 *             capture:  {key:value}|key, // record answer(s) into collected
 *             escalate: boolean,         // this option escalates to the AI
 *             terminal: boolean,         // this option ends the flow
 *           }
 *         ],
 *         input: {                       // TYPED free-text capture (lead-gen)
 *           key:         string,         // collected[key] = the typed value
 *           type:        'text'|'email'|'tel'|'number'|'textarea',
 *           placeholder: string,         // field placeholder (i18n key or text)
 *           required:    boolean,        // default true
 *           validate:    string,         // regex source OR 'email'|'phone'|'cep'
 *           errorMsg:    string,         // inline error (i18n key or text)
 *           submitLabel: string,         // submit button label (i18n key or text)
 *           next:        string,         // id of the node to advance to on submit
 *           optionalSkip:boolean,        // render a "Pular" bubble → advance, no capture
 *         },
 *         autoNext:   string,            // optional id to auto-advance to
 *         escalate:   boolean,           // node-level: entering escalates
 *         terminal:   boolean,           // entering ends the flow
 *         collectKey: string,            // store selected option.value here
 *       }
 *     }
 *   }
 *
 * `capture` shapes:
 *   - { key: value, ... } → merges those pairs verbatim into collected.
 *   - "someKey" (string)  → records collected[someKey] = option.value.
 *
 * INPUT NODES — a node carrying an `input` spec collects a TYPED value instead
 * of (or alongside) clickable options. On enter it speaks/shows its prompt like
 * any node; the host renders a text field + submit button. The typed value is
 * recorded into `collected` ONLY (structured capture) and is NEVER sent to the
 * AI webhook. Submission is driven by the SUBMIT_INPUT action (see below).
 *
 * STATE shape (the reducer owns this):
 *   {
 *     currentNodeId: string|null,
 *     backStack:     string[],     // node ids to pop on goBack()
 *     collected:     object,       // accumulated answers
 *     done:          boolean,      // terminal reached
 *     escalated:     boolean,      // escalation reached
 *     inputError:    string|null,  // last input-validation error (i18n key/text)
 *   }
 *
 * The reducer NEVER speaks or fetches. It returns the next state plus a list of
 * declarative `effects` the host (React hook) is responsible for running:
 *   - { type: 'message', text }                  — append prompt to the visible chat log
 *   - { type: 'speak', text }                    — TTS the resolved prompt
 *   - { type: 'capture', key, value, collected } — one captured answer
 *   - { type: 'escalate', collected }            — hand off to the AI/webhook
 *
 * A node with a `prompt` always emits a `message` effect (so the prompt shows in
 * the transcript even when `speak:false`); the `speak` effect is additionally
 * emitted only when `speak !== false`.
 */

/** Resolve a node by id from a flow definition. */
export function getNode(flowDef, nodeId) {
  if (!flowDef || !flowDef.nodes || nodeId == null) return null;
  return flowDef.nodes[nodeId] || null;
}

/**
 * Substitute `{var}` and `{{var}}` placeholders in `text` with values from the
 * `collected` answers map (so prompts/labels can address the user by a captured
 * field, e.g. their name). Pure. Unknown or empty vars resolve to '' and any
 * resulting double spaces are collapsed, so a missing value never surfaces a
 * raw `{name}`. Text with no placeholders is returned unchanged.
 */
export function interpolate(text, collected) {
  if (text == null) return '';
  const str = String(text);
  if (str.indexOf('{') === -1) return str; // fast path: nothing to fill
  const map = collected || {};
  // {{var}} first (so the inner {var} pass doesn't see leftover braces), then {var}.
  const fill = (s) =>
    s.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_m, k) => {
      const v = map[k];
      return v == null ? '' : String(v);
    }).replace(/\{\s*([\w.-]+)\s*\}/g, (_m, k) => {
      const v = map[k];
      return v == null ? '' : String(v);
    });
  // Clean up the whitespace a removed placeholder can leave: drop a space that
  // now sits right before punctuation, collapse runs of spaces, then trim — so
  // "Olá {name}, tudo bem?" with no name reads "Olá, tudo bem?" not "Olá ,…".
  return fill(str)
    .replace(/[ \t]+([,.;:!?])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/**
 * Resolve a prompt string. `prompt` may be literal text or an i18n key; if a
 * translator is supplied we try it first and fall back to the raw value when
 * the key is unknown (createTranslator returns the key unchanged on a miss).
 * After i18n resolution, `{var}`/`{{var}}` placeholders are interpolated from
 * the optional `collected` map (so prompts personalize with captured answers).
 */
export function resolvePrompt(prompt, translate, collected) {
  if (prompt == null) return '';
  let out = String(prompt);
  if (typeof translate === 'function') {
    const t = translate(prompt);
    // translator returns the key itself on a miss → fall back to raw prompt
    if (t != null && t !== prompt) out = String(t);
  }
  return interpolate(out, collected);
}

/** The visible, clickable options of a node (always an array). */
export function visibleOptions(node) {
  if (!node || !Array.isArray(node.options)) return [];
  return node.options;
}

/**
 * The TYPED-input spec of a node (or null). A node is an "input node" when it
 * carries an `input` object with a `key`. Returned so the host can render a
 * text field instead of (or alongside) option bubbles.
 */
export function nodeInput(node) {
  if (!node || !node.input || typeof node.input !== 'object') return null;
  if (node.input.key == null) return null;
  return node.input;
}

// ── Built-in validators ────────────────────────────────────────────────────
// Each returns true when the (trimmed) value is acceptable. Lenient by design:
// they accept the common Brazilian shapes operators actually type, not a strict
// RFC. The host still records the raw typed value verbatim into `collected`.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Accepts BR phones: (xx) xxxxx-xxxx, +55…, or 10–13 bare digits. */
function isValidPhoneBR(value) {
  const digits = String(value).replace(/\D/g, '');
  // Strip a leading 55 country code before counting the national number.
  const national = digits.startsWith('55') && digits.length > 11
    ? digits.slice(2)
    : digits;
  return national.length === 10 || national.length === 11;
}

/** Accepts a Brazilian CEP: 8 digits, optionally hyphenated (00000-000). */
function isValidCEP(value) {
  return /^\d{5}-?\d{3}$/.test(String(value).trim());
}

const BUILTIN_VALIDATORS = {
  email: (v) => EMAIL_RE.test(String(v).trim()),
  phone: isValidPhoneBR,
  cep: isValidCEP,
};

/**
 * Validate a typed value against an input spec. Pure — no side effects.
 * Returns { ok: true } or { ok: false, errorKey } where errorKey is the spec's
 * `errorMsg` (i18n key or literal) or the generic 'chat.flow.inputInvalid'.
 *
 * Order: required-check first, then (if non-empty) the `validate` rule. An
 * empty value is allowed only when `required === false`.
 */
export function validateInput(input, rawValue) {
  if (!input) return { ok: true };
  const value = rawValue == null ? '' : String(rawValue).trim();
  const required = input.required !== false; // default true
  const errKey = input.errorMsg || 'chat.flow.inputInvalid';

  if (value === '') {
    return required ? { ok: false, errorKey: errKey } : { ok: true };
  }

  const rule = input.validate;
  if (rule != null && rule !== '') {
    const builtin = BUILTIN_VALIDATORS[String(rule).toLowerCase()];
    if (builtin) {
      return builtin(value) ? { ok: true } : { ok: false, errorKey: errKey };
    }
    // Otherwise treat `validate` as a regex source string.
    let re = null;
    try { re = new RegExp(rule); } catch (_) { re = null; }
    if (re && !re.test(value)) return { ok: false, errorKey: errKey };
  }
  return { ok: true };
}

/** Apply an option's `capture` directive onto a collected map (immutably). */
function applyCapture(collected, option) {
  if (!option || option.capture == null) return collected;
  const next = { ...collected };
  if (typeof option.capture === 'string') {
    next[option.capture] = option.value;
  } else if (typeof option.capture === 'object') {
    Object.assign(next, option.capture);
  }
  return next;
}

/**
 * The fresh, pre-entry state for a flow (before the start node is entered).
 * An optional `seed` pre-populates `collected` (used to seed known-user context
 * and/or restored persistence so the flow already knows the visitor).
 */
export function initialState(seed) {
  return {
    currentNodeId: null,
    backStack: [],
    collected: seed && typeof seed === 'object' ? { ...seed } : {},
    done: false,
    escalated: false,
    inputError: null,
  };
}

/**
 * Does `collected` already hold a usable value for an input node's key? Used by
 * the skip-known logic so a value seeded from known-user context or restored
 * persistence isn't re-asked. A value counts as known when it's present, non-
 * empty, AND passes the node's own validator (a seeded bad value still asks).
 */
function inputAlreadyKnown(input, collected) {
  if (!input || input.key == null) return false;
  const v = (collected || {})[input.key];
  if (v == null || String(v).trim() === '') return false;
  return validateInput(input, v).ok;
}

/**
 * Has a consent node already been satisfied? A node "is" the consent node when
 * one of its options captures `consentKey`; it counts as satisfied when
 * `collected[consentKey]` already holds a truthy (and non-"declined") value.
 * Used by the landing resolver so a RETURNING visitor who already consented
 * isn't re-asked for consent on resume / skip-known.
 */
function consentAlreadyGiven(consentKey, collected) {
  if (consentKey == null) return false;
  const v = (collected || {})[consentKey];
  if (v == null) return false;
  if (v === false) return false;
  const s = String(v).trim().toLowerCase();
  if (s === '' || s === 'false' || s === 'recusado' || s === 'declined' || s === 'no') return false;
  return true;
}

/**
 * For a consent node that's already satisfied, find the option that ADVANCES
 * (captures the consentKey with a truthy/accepted value and carries a `next`)
 * so the landing resolver can step past it. Returns the next node id, or null
 * when no such forward option exists (e.g. only a decline branch).
 */
function consentAdvanceNext(node, consentKey) {
  if (!node || !Array.isArray(node.options)) return null;
  for (const opt of node.options) {
    if (!opt || opt.next == null) continue;
    // The accept option captures the consentKey (string capture → opt.value, or
    // an object capture carrying the key). We treat any option that records the
    // consentKey AND advances as the "accept" branch, preferring a non-falsy
    // captured value.
    let capturesConsent = false;
    let capturedVal;
    if (typeof opt.capture === 'string' && opt.capture === consentKey) {
      capturesConsent = true;
      capturedVal = opt.value;
    } else if (opt.capture && typeof opt.capture === 'object' && consentKey in opt.capture) {
      capturesConsent = true;
      capturedVal = opt.capture[consentKey];
    }
    if (!capturesConsent) continue;
    const s = capturedVal == null ? '' : String(capturedVal).trim().toLowerCase();
    if (s === 'false' || s === 'recusado' || s === 'declined' || s === 'no') continue;
    return opt.next;
  }
  return null;
}

/**
 * Resolve the node we actually LAND on when navigating to `targetId`: follow a
 * chain of nodes that should be auto-skipped for a returning/known visitor —
 *   • input nodes whose key is already known (skip-known), and
 *   • the consent node when `consentKey` is already satisfied (skip-consent),
 * unless a node forces a re-ask with `alwaysAsk: true`. Returns the landing
 * node id and the intermediate (skipped) node ids so the caller can keep them
 * on the backStack. Pure; never captures (skip means the value is already
 * present). `consentKey` is optional — when omitted, only input skip-known runs.
 */
function resolveLanding(flowDef, targetId, collected, consentKey) {
  const skipped = [];
  let id = targetId;
  // Bounded by node count to guard against an authoring cycle.
  const limit = flowDef && flowDef.nodes ? Object.keys(flowDef.nodes).length + 1 : 1;
  for (let i = 0; i < limit; i++) {
    const node = getNode(flowDef, id);
    if (!node) break;
    if (node.alwaysAsk === true) break;
    const input = nodeInput(node);
    if (input) {
      if (!inputAlreadyKnown(input, collected)) break;
      // Known input → skip past it to its next.
      const nextId = input.next != null ? input.next : null;
      if (nextId == null || nextId === id) break;
      skipped.push(id);
      id = nextId;
      continue;
    }
    // Non-input node: only auto-skip it when it's the consent node and consent
    // was already given (a returning visitor must not re-do consent).
    if (consentKey != null && consentAlreadyGiven(consentKey, collected)) {
      const nextId = consentAdvanceNext(node, consentKey);
      if (nextId != null && nextId !== id) {
        skipped.push(id);
        id = nextId;
        continue;
      }
    }
    break;
  }
  return { landingId: id, skipped };
}

/**
 * Resolve the user's known name from `collected` (tolerant of common key
 * aliases). Returns a non-empty trimmed string or null. Used so the engine can
 * personalize the returning/known greeting independent of per-flow authoring.
 */
function knownName(collected) {
  const c = collected || {};
  for (const k of ['name', 'nome', 'firstName', 'fullName']) {
    if (c[k] != null && String(c[k]).trim() !== '') return String(c[k]).trim();
  }
  return null;
}

/**
 * Build the personalized returning-greeting text. Pure. Falls back to a generic
 * "welcome back" when no name is known (callers only emit it when a name is
 * present, but the helper stays safe regardless). i18n via `translate` when the
 * host supplies a `chat.flow.welcomeBack` / `chat.flow.welcomeBackNamed` key;
 * otherwise a built-in pt-BR string. {name} is interpolated last.
 */
function returningGreetingText(collected, translate) {
  const name = knownName(collected);
  const key = name ? 'chat.flow.welcomeBackNamed' : 'chat.flow.welcomeBack';
  let tmpl = name ? 'Bem-vindo de volta, {name}!' : 'Bem-vindo de volta!';
  if (typeof translate === 'function') {
    const t = translate(key);
    if (t != null && t !== key) tmpl = String(t);
  }
  return interpolate(tmpl, collected);
}

/**
 * Compute the side effects of ENTERING a node (speak / escalate). Does not
 * mutate state. `translate` is optional (prompt i18n resolution).
 *
 * `opts.returning` (RESUME path) prepends a personalized returning greeting
 * when a name is known AND the node's own resolved prompt doesn't already
 * include that name — so a returning visitor is consistently greeted by name
 * even when the landing node's prompt wasn't authored with {name}. The greeting
 * is both shown (message) and spoken (speak, unless the landing node is silent).
 */
function enterEffects(flowDef, nodeId, collected, translate, opts = {}) {
  const node = getNode(flowDef, nodeId);
  const effects = [];
  if (!node) return effects;

  // Returning-visitor greeting (RESUME only). Personalize when a name is known
  // and the landing prompt won't already say it.
  if (opts.returning) {
    const name = knownName(collected);
    if (name) {
      const landingText = node.prompt != null ? resolvePrompt(node.prompt, translate, collected) : '';
      const alreadyNamesUser = landingText.indexOf(name) !== -1;
      if (!alreadyNamesUser) {
        const greet = returningGreetingText(collected, translate);
        if (greet) {
          effects.push({ type: 'message', text: greet });
          if (node.speak !== false) effects.push({ type: 'speak', text: greet });
        }
      }
    }
  }

  if (node.prompt != null) {
    // Resolve i18n then interpolate {var}/{{var}} from the answers collected so
    // far, so a node entered after (say) a name capture greets the user by name
    // in BOTH the visible message and the spoken (TTS) text.
    const text = resolvePrompt(node.prompt, translate, collected);
    // Always surface the prompt in the visible transcript…
    effects.push({ type: 'message', text });
    // …but only SPEAK it when the node isn't marked silent.
    if (node.speak !== false) {
      effects.push({ type: 'speak', text });
    }
  }
  if (node.escalate || node.terminal) {
    if (node.escalate) effects.push({ type: 'escalate', collected });
  }
  return effects;
}

/**
 * The reducer. Pure: (state, action, flowDef, opts) → { state, effects }.
 *
 * Actions:
 *   { type: 'START' }                       — enter startNode (returning visitor:
 *                                             auto-skip consent + answered inputs)
 *   { type: 'RESET' }                       — back to startNode, clear answers
 *   { type: 'RESUME', nodeId }              — returning visitor: land on the saved
 *                                             node id (then skip-known/consent)
 *   { type: 'SELECT', option }              — pick a bubble
 *   { type: 'SUBMIT_INPUT', value }         — submit a typed value on an input node
 *   { type: 'BACK' }                        — pop backStack, re-enter prev node
 *   { type: 'GOTO', nodeId }                — jump to a node (command verb)
 *
 * SUBMIT_INPUT validates `value` against the current node's `input` spec; on a
 * valid value it records collected[input.key] = value (also honoring
 * collectKey), emits a `capture` effect, and advances to input.next. On an
 * invalid value it sets state.inputError (and does NOT advance). The typed
 * value is recorded into `collected` only — never spoken, never webhook-sent.
 *
 * Skip-known: navigating onto an input node whose `key` is already known (from
 * seeded known-user context or restored persistence) auto-advances past it,
 * unless the node sets `alwaysAsk: true`. The chain is followed transitively.
 *
 * opts: { translate, seed, consentKey } — optional prompt translator, a
 * collected seed applied on START/RESET/RESUME (known-user context / restored
 * persistence), and the consent key gating consent-node auto-skip on resume.
 */
export function flowReducer(state, action, flowDef, opts = {}) {
  const { translate, seed, consentKey } = opts;
  const safeState = state || initialState(seed);

  switch (action && action.type) {
    case 'START': {
      const startId = flowDef && flowDef.startNode;
      // Seed collected with known-user context / restored persistence so the
      // start prompt can greet by name and known inputs skip themselves. On a
      // RETURNING visitor (consent already given) we also auto-skip the consent
      // node and any already-answered input chain, landing at the first
      // unanswered step (so a reload from start doesn't replay consent/name).
      const collected = seed && typeof seed === 'object' ? { ...seed } : {};
      const consented = consentAlreadyGiven(consentKey, collected);
      const { landingId, skipped } = resolveLanding(flowDef, startId, collected, consentKey);
      const node = getNode(flowDef, landingId);
      // A returning greeting personalizes only when we actually skipped past the
      // start/consent node for a known visitor (first-run behavior unchanged).
      const returning = consented && landingId !== startId && knownName(collected) != null;
      const next = {
        currentNodeId: node ? landingId : null,
        backStack: skipped,
        collected,
        done: !!(node && node.terminal),
        escalated: !!(node && node.escalate),
        inputError: null,
      };
      return { state: next, effects: enterEffects(flowDef, landingId, collected, translate, { returning }) };
    }

    case 'RESET': {
      const startId = flowDef && flowDef.startNode;
      // RESET forgets the visitor: re-seed from known-user context only (the
      // host clears persistence) and ALWAYS land on the real start node (no
      // skip-known / skip-consent — a reset must replay consent).
      const collected = seed && typeof seed === 'object' ? { ...seed } : {};
      const node = getNode(flowDef, startId);
      const next = {
        currentNodeId: node ? startId : null,
        backStack: [],
        collected,
        done: !!(node && node.terminal),
        escalated: !!(node && node.escalate),
        inputError: null,
      };
      return { state: next, effects: enterEffects(flowDef, startId, collected, translate) };
    }

    case 'RESUME': {
      // Return a known visitor to the saved node id (persisted currentNodeId),
      // seeding collected from restored persistence. From that node we follow
      // skip-known / skip-consent so a value answered since (or auth identity)
      // doesn't get re-asked, landing at the first unanswered step. Falls back
      // to START semantics when the saved node id is missing/unknown.
      const collected = seed && typeof seed === 'object' ? { ...seed } : {};
      const savedId = action.nodeId;
      const savedNode = getNode(flowDef, savedId);
      const fromId = savedNode ? savedId : (flowDef && flowDef.startNode);
      const { landingId, skipped } = resolveLanding(flowDef, fromId, collected, consentKey);
      const node = getNode(flowDef, landingId);
      const returning = knownName(collected) != null;
      const next = {
        currentNodeId: node ? landingId : null,
        backStack: skipped,
        collected,
        done: !!(node && node.terminal),
        escalated: !!(node && node.escalate),
        inputError: null,
      };
      return { state: next, effects: enterEffects(flowDef, landingId, collected, translate, { returning }) };
    }

    case 'SELECT': {
      const { option } = action;
      const current = getNode(flowDef, safeState.currentNodeId);
      if (!current || !option) return { state: safeState, effects: [] };

      // 1) record captures (option.capture + node.collectKey)
      let collected = applyCapture(safeState.collected, option);
      if (current.collectKey != null) {
        collected = { ...collected, [current.collectKey]: option.value };
      }
      const captureEffects = [];
      const before = safeState.collected;
      for (const key of Object.keys(collected)) {
        if (collected[key] !== before[key]) {
          captureEffects.push({ type: 'capture', key, value: collected[key], collected });
        }
      }

      // 2) push current node so goBack() can return here
      const backStack = [...safeState.backStack, safeState.currentNodeId];

      // 3) escalation option short-circuits navigation
      if (option.escalate) {
        const next = { ...safeState, collected, backStack, escalated: true, inputError: null };
        return { state: next, effects: [...captureEffects, { type: 'escalate', collected }] };
      }

      // 4) terminal option ends the flow (no further navigation)
      if (option.terminal) {
        const next = { ...safeState, collected, backStack, done: true, inputError: null };
        return { state: next, effects: captureEffects };
      }

      // 5) normal advance to option.next (skipping already-known input nodes)
      const rawNextId = option.next != null ? option.next : null;
      const { landingId, skipped } = resolveLanding(flowDef, rawNextId, collected, consentKey);
      const nextNode = getNode(flowDef, landingId);
      const next = {
        currentNodeId: nextNode ? landingId : safeState.currentNodeId,
        backStack: nextNode ? [...backStack, ...skipped] : backStack,
        collected,
        done: !!(nextNode && nextNode.terminal),
        escalated: !!(nextNode && nextNode.escalate),
        inputError: null,
      };
      const enter = nextNode ? enterEffects(flowDef, landingId, collected, translate) : [];
      return { state: next, effects: [...captureEffects, ...enter] };
    }

    case 'SUBMIT_INPUT': {
      const current = getNode(flowDef, safeState.currentNodeId);
      const input = nodeInput(current);
      // Not an input node (or no current node) → no-op, keep state.
      if (!input) return { state: safeState, effects: [] };

      const rawValue = action.value;
      const result = validateInput(input, rawValue);
      if (!result.ok) {
        // Invalid: record the error, do NOT advance, emit no effects.
        const next = { ...safeState, inputError: result.errorKey };
        return { state: next, effects: [] };
      }

      // Valid: record the typed value into `collected` (input.key + optional
      // collectKey). The value is captured ONLY here — never spoken, never sent
      // to the webhook.
      const value = rawValue == null ? '' : String(rawValue).trim();
      let collected = { ...safeState.collected, [input.key]: value };
      if (current.collectKey != null) {
        collected = { ...collected, [current.collectKey]: value };
      }
      const captureEffects = [];
      const before = safeState.collected;
      for (const key of Object.keys(collected)) {
        if (collected[key] !== before[key]) {
          captureEffects.push({ type: 'capture', key, value: collected[key], collected });
        }
      }

      // Push current node so goBack() returns to the input.
      const backStack = [...safeState.backStack, safeState.currentNodeId];

      // Advance to input.next (skipping any already-known input nodes ahead).
      const rawNextId = input.next != null ? input.next : null;
      const { landingId, skipped } = resolveLanding(flowDef, rawNextId, collected, consentKey);
      const nextNode = getNode(flowDef, landingId);
      const next = {
        currentNodeId: nextNode ? landingId : safeState.currentNodeId,
        backStack: nextNode ? [...backStack, ...skipped] : backStack,
        collected,
        done: !!(nextNode && nextNode.terminal),
        escalated: !!(nextNode && nextNode.escalate),
        inputError: null,
      };
      const enter = nextNode ? enterEffects(flowDef, landingId, collected, translate) : [];
      return { state: next, effects: [...captureEffects, ...enter] };
    }

    case 'BACK': {
      if (safeState.backStack.length === 0) return { state: safeState, effects: [] };
      const backStack = safeState.backStack.slice(0, -1);
      const prevId = safeState.backStack[safeState.backStack.length - 1];
      const prevNode = getNode(flowDef, prevId);
      const next = {
        ...safeState,
        currentNodeId: prevNode ? prevId : safeState.currentNodeId,
        backStack,
        done: false,
        escalated: !!(prevNode && prevNode.escalate),
        inputError: null,
      };
      // re-enter (re-speak) the previous node
      return { state: next, effects: enterEffects(flowDef, prevId, safeState.collected, translate) };
    }

    case 'GOTO': {
      const targetId = action.nodeId;
      const target = getNode(flowDef, targetId);
      if (!target) return { state: safeState, effects: [] };
      const backStack = safeState.currentNodeId != null
        ? [...safeState.backStack, safeState.currentNodeId]
        : safeState.backStack;
      const next = {
        ...safeState,
        currentNodeId: targetId,
        backStack,
        done: !!target.terminal,
        escalated: !!target.escalate,
        inputError: null,
      };
      return { state: next, effects: enterEffects(flowDef, targetId, safeState.collected, translate) };
    }

    default:
      return { state: safeState, effects: [] };
  }
}
