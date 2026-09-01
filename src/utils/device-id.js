/**
 * A stable per-browser identifier for the chat backend.
 *
 * THE BUG THIS EXISTS TO FIX
 *
 * Interacting with the avatar on one machine advanced the conversation another
 * machine saw. The leak is not in the browser — every client-side store here is
 * origin- and profile-scoped and cannot cross machines. It is server side:
 *
 *   1. `useChatbot` only ever put a `sessionId` in the request body when a FLOW
 *      was active. `AvatarChatbot.buildFlowMetadata()` returned `{}` otherwise,
 *      and the `ask:` command verb sent no metadata at all.
 *   2. The backend proxies drop the `X-Hermes-Session-Id` header when that value
 *      is blank.
 *   3. Hermes, receiving no header, falls back to deriving a session id from
 *      `SHA-256(system_prompt + first user message)` — a value that is byte
 *      identical for every visitor who opens with the same text against the same
 *      persona. Everyone lands in one shared transcript.
 *
 * So the fix is to always have an id to send. This module is the client half.
 *
 * PRIVACY — read before enabling anything on top of this.
 *
 * A value that persists across sessions and identifies a returning browser is a
 * tracking identifier, whatever it is called. It is used here solely to keep one
 * visitor's conversation separate from another's, but that intent is not
 * enforced by anything downstream. Consequences a host must handle:
 *   - it belongs in the site's privacy notice;
 *   - `deviceIdEnabled={false}` turns it off (the backend then falls back to a
 *     per-request anonymous id, so conversations stop being continuous);
 *   - `navigator.globalPrivacyControl === true` is honoured automatically by
 *     downgrading to a per-tab id that is never written to disk.
 */

/** Version-suffixed so a future format change is a key change, not a migration. */
export const DEVICE_ID_KEY = 'ania.deviceId.v1';

/**
 * Last-resort store. Used when localStorage AND sessionStorage both throw —
 * Safari private mode, embedded webviews, or a browser configured to block site
 * data. Stable for the page's lifetime, which is better than minting a new id on
 * every request and fragmenting the conversation into single turns.
 */
let memoryFallback = null;

const generate = () => {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) { /* fall through */ }
  // No crypto at all (an ancient or unusually locked-down environment). Weak,
  // but the alternative is no id, which means the shared-transcript bug.
  return 'dev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
};

/** Does the visitor's browser signal a global opt-out of cross-session tracking? */
const privacyControlled = () => {
  try {
    return typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
  } catch (e) {
    return false;
  }
};

const readFrom = (store, key) => {
  try {
    const v = store.getItem(key);
    return v && typeof v === 'string' ? v : null;
  } catch (e) {
    return null;
  }
};

const writeTo = (store, key, value) => {
  try {
    store.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * The identifier for this browser.
 *
 * @param {{enabled?: boolean, key?: string}} [options]
 *   `enabled: false` returns a per-tab id that is never persisted — the caller
 *   still gets conversation continuity within the tab, and nothing is written to
 *   disk. Same behaviour when Global Privacy Control is on.
 */
export const getDeviceId = ({ enabled = true, key = DEVICE_ID_KEY } = {}) => {
  const ephemeral = enabled === false || privacyControlled();

  if (!ephemeral && typeof localStorage !== 'undefined') {
    const existing = readFrom(localStorage, key);
    if (existing) return existing;
    const fresh = generate();
    if (writeTo(localStorage, key, fresh)) return fresh;
  }

  // Session scope: survives reloads within the tab, dies when it closes.
  if (typeof sessionStorage !== 'undefined') {
    const existing = readFrom(sessionStorage, key);
    if (existing) return existing;
    const fresh = generate();
    if (writeTo(sessionStorage, key, fresh)) return fresh;
  }

  if (!memoryFallback) memoryFallback = generate();
  return memoryFallback;
};

/**
 * Forget this browser and mint a new identity.
 *
 * Exposed because "start a fresh conversation, forget who I am" is a thing a
 * host will legitimately want to offer, and because a privacy notice that
 * mentions an identifier should come with a way to clear it.
 */
export const resetDeviceId = ({ key = DEVICE_ID_KEY } = {}) => {
  try { if (typeof localStorage !== 'undefined') localStorage.removeItem(key); } catch (e) {}
  try { if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(key); } catch (e) {}
  memoryFallback = null;
  return getDeviceId({ key });
};
