// Tiny, dependency-free i18n table for ania-avatar-react.
//
// This is a LIBRARY, so we deliberately avoid pulling in a heavy runtime
// (i18next & friends). All this module does is resolve a string key for a
// locale, fall back to English, do `{{var}}` interpolation, and let a consumer
// override individual strings. No global state, no side effects.
//
// The locale tables live as plain JSON under ./strings/<code>.json. en + pt-BR
// are hand-authored; the other ~190 are machine-generated. They are bundled
// eagerly (Vite inlines `import.meta.glob({ eager: true })` at build time) so
// `getString` stays fully synchronous and consumers don't pay extra network
// round-trips to switch language.

const DEFAULT_LOCALE = 'pt-BR';
const FALLBACK_LOCALE = 'en';

// Is this an index-keyed object that stands in for a list? (e.g.
// { "0": "...", "1": "..." } — how greetings/waiting are stored so the keyless
// translate.py script, which can't handle JSON arrays, can fill them.)
function isIndexObject(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const keys = Object.keys(v);
  return keys.length > 0 && keys.every((k) => /^\d+$/.test(k));
}

// Normalise a loaded table to FLAT dotted keys. The hand-authored base files
// store keys flat ({ "chat.enableSound": "..." }); translate.py re-nests them
// into a tree ({ chat: { enableSound: "..." } }). Flattening here makes both
// shapes resolve identically. List values (arrays or index-objects) are kept as
// leaves so getStringList can reconstruct them.
function flatten(obj, prefix, out) {
  for (const k in obj) {
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v) && !isIndexObject(v)) {
      flatten(v, key, out);
    } else {
      out[key] = v;
    }
  }
  return out;
}

// Build the registry from every strings/<code>.json. eager:true → inlined into
// the bundle, no dynamic chunks (important for a dual ESM/CJS library build).
const STRINGS = (() => {
  const modules = import.meta.glob('./strings/*.json', { eager: true });
  const out = {};
  for (const path in modules) {
    const code = path.replace(/^.*\/([^/]+)\.json$/, '$1');
    const mod = modules[path];
    const raw = (mod && mod.default) || mod || {};
    out[code] = flatten(raw, '', {});
  }
  return out;
})();

/** All locale codes that ship with the library (e.g. ['en','pt-BR','es',...]). */
export function availableLocales() {
  return Object.keys(STRINGS).sort();
}

/** True if a locale table is bundled for `locale`. */
export function hasLocale(locale) {
  return !!(locale && STRINGS[locale]);
}

// Resolve a locale code to the best available table, trying:
//   exact ('pt-BR') → base language ('pt') → any region of that base
//   ('pt-PT' for 'pt') → fallback ('en').
function resolveTable(locale) {
  if (locale && STRINGS[locale]) return STRINGS[locale];
  if (locale) {
    const base = String(locale).split('-')[0];
    if (STRINGS[base]) return STRINGS[base];
    const regional = Object.keys(STRINGS).find((c) => c.split('-')[0] === base);
    if (regional) return STRINGS[regional];
  }
  return STRINGS[FALLBACK_LOCALE] || {};
}

// List-valued keys (greetings/waiting) are stored as index-keyed objects
// ({ "0": "...", "1": "..." }) so the keyless translate.py script — which only
// understands nested objects, not JSON arrays — can fill them for all ~190
// locales. Reconstruct the ordered array here.
function asList(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .filter((k) => /^\d+$/.test(k))
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => value[k]);
  }
  return null;
}

function interpolate(value, vars) {
  if (!vars || typeof value !== 'string') return value;
  return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (m, name) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : m
  );
}

/**
 * Resolve a single string by key for a locale.
 * @param {string} key       dotted key, e.g. 'chat.enableSound'
 * @param {string} [locale]  BCP-47 code; defaults to 'pt-BR' (today's strings)
 * @param {object} [opts]
 * @param {object} [opts.vars]      values for `{{var}}` interpolation
 * @param {object} [opts.override]  consumer override table (key -> string)
 * @returns {string} the resolved string, or the key itself if nothing matched
 */
export function getString(key, locale = DEFAULT_LOCALE, opts = {}) {
  const { vars, override } = opts;
  if (override && override[key] != null) return interpolate(override[key], vars);
  const table = resolveTable(locale);
  let value = table[key];
  if (value == null) {
    const fb = STRINGS[FALLBACK_LOCALE] || {};
    value = fb[key];
  }
  if (value == null) return key;
  return interpolate(value, vars);
}

/**
 * Resolve a list-valued key (e.g. 'greetings', 'waiting').
 * @param {string} key
 * @param {string} [locale]
 * @param {object} [opts]  { override } — override may supply a replacement array
 * @returns {string[]} the array, or [] if the key is not a list
 */
export function getStringList(key, locale = DEFAULT_LOCALE, opts = {}) {
  const { override } = opts;
  if (override && Array.isArray(override[key])) return override[key];
  const table = resolveTable(locale);
  let list = asList(table[key]);
  if (list == null) {
    const fb = STRINGS[FALLBACK_LOCALE] || {};
    list = asList(fb[key]);
  }
  return list || [];
}

/**
 * Build a bound translator for one locale + optional override table.
 * Handy inside a component: `const t = createTranslator(locale, messagesOverride)`.
 * @param {string} [locale]
 * @param {object} [override]
 * @returns {{ t: (key:string, vars?:object)=>string, list:(key:string)=>string[], locale:string }}
 */
export function createTranslator(locale = DEFAULT_LOCALE, override) {
  return {
    locale,
    t: (key, vars) => getString(key, locale, { vars, override }),
    list: (key) => getStringList(key, locale, { override }),
  };
}

export { DEFAULT_LOCALE, FALLBACK_LOCALE };
