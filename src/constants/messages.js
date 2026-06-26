// DEPRECATED in 1.5.0 — kept only for backward compatibility with any code that
// deep-imported these constants. The library now resolves greetings/waiting
// messages (and every other UI string) through the locale table in
// ../i18n/index.js, honoring the `locale` / `messagesOverride` props.
//
// These exports preserve the original pt-BR wording (the default locale) so a
// deep importer sees no behavior change. Prefer `getStringList('greetings')` /
// `getStringList('waiting')` from the package root for locale-aware lists.
import { getStringList } from '../i18n/index.js';

export const GREETINGS = getStringList('greetings', 'pt-BR');

export const WAITING_MESSAGES = getStringList('waiting', 'pt-BR');
