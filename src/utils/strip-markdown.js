/**
 * stripMarkdown — remove the markdown syntax an LLM sometimes puts in a reply.
 *
 * The chat bubble renders plain text, so `**bold**` shows its asterisks, and the
 * browser's speechSynthesis (and most TTS providers) read them out loud. Agent
 * personas ask for unformatted text, but the model slips now and then — so the
 * cleanup lives here, at the one point where an agent reply becomes both the
 * bubble content and the text that is spoken (useChatbot).
 *
 * Design rules:
 *   - OUTPUT IS TEXT. Never HTML; whoever renders keeps rendering a string.
 *   - Text without markdown comes out identical (the common case must not move).
 *   - Idempotent: running it twice changes nothing. That also makes it safe for
 *     streamed text — clean the ACCUMULATED text on every chunk, and a `**`
 *     that has not closed yet disappears instead of flickering on screen.
 *   - When in doubt, keep the content: "2 * 3", "snake_case", URLs and emoji
 *     pass untouched. Only the markup symbol is lost.
 *
 * Ported from the per-site fix in my-page (frontend/src/utils/textoSemMarkdown.js),
 * which is being retired in favour of this single implementation.
 */

const FENCE_LINE = /^[ \t]*(?:```|~~~)[^\n]*\n?/gm;
const HEADING = /^[ \t]{0,3}#{1,6}[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$/gm;
const BLOCKQUOTE = /^[ \t]*>[ \t]?/gm;
const RULE = /^[ \t]*([-*_])(?:[ \t]*\1){2,}[ \t]*$/gm;
const BULLET = /^([ \t]*)[-*+][ \t]+/gm;
const IMAGE = /!\[([^\]\n]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const LINK = /\[([^\]\n]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const INLINE_CODE = /(`+)([^\n]*?[^`\n])\1(?!`)/g;
const BOLD_ITALIC = /\*\*\*(?=\S)([^\n]*?\S)\*\*\*/g;
const BOLD = /\*\*(?=\S)([^\n]*?\S)\*\*/g;
const BOLD_UNDERSCORE = /__(?=\S)([^\n]*?\S)__/g;
const STRIKE = /~~(?=\S)([^\n]*?\S)~~/g;
// Italic only when the `*` hugs the text on both sides: "2 * 3" does not match.
const ITALIC = /(^|[^\w*\\])\*(?=[^\s*])([^*\n]*?[^\s*\\])\*(?![\w*])/gm;
// `_x_` only between word boundaries: snake_case stays as it is.
const ITALIC_UNDERSCORE = /(^|[^\w\\])_(?=[^\s_])([^_\n]*?[^\s_\\])_(?!\w)/gm;
// Leftover unpaired `**` / `__` (a stream cut in the middle of a bold run).
const LEFTOVER_DOUBLE = /\*{2,}|(?<!\w)_{2,}|_{2,}(?!\w)/g;
// A `*` that opens and never closes on its line (cut stream, or a slip).
const ORPHAN_OPEN = /(^|\s)\*(?=[^\s*])(?![^\n]*\*)/gm;
// A dangling backtick at the end (inline code still arriving).
const ORPHAN_BACKTICK = /`+(?=[^`\n]*$)(?![^\n]*`)/gm;
// A lone `*` at the very end (the next stream chunk has not arrived yet).
const TRAILING_ASTERISK = /[ \t]+\*+$/;
const ESCAPE = /\\([\\`*_{}[\]()#+\-.!>~|])/g;

/** Is there any character that could be markup? If not, do not touch it. */
const MAY_HAVE_MARKUP = /[*_`#>[~\\]|^[ \t]*[-+]/m;

export function stripMarkdown(text) {
  if (typeof text !== 'string' || !MAY_HAVE_MARKUP.test(text)) return text;

  let t = text;
  t = t.replace(FENCE_LINE, '');
  t = t.replace(HEADING, '$1');
  t = t.replace(BLOCKQUOTE, '');
  t = t.replace(RULE, '');
  t = t.replace(BULLET, '$1• ');
  t = t.replace(IMAGE, '$1');
  t = t.replace(LINK, (_, label, url) => (label.trim() === url ? url : `${label} (${url})`));
  t = t.replace(INLINE_CODE, '$2');
  t = t.replace(BOLD_ITALIC, '$1');
  t = t.replace(BOLD, '$1');
  t = t.replace(BOLD_UNDERSCORE, '$1');
  t = t.replace(STRIKE, '$1');
  t = t.replace(ITALIC, '$1$2');
  t = t.replace(ITALIC_UNDERSCORE, '$1$2');
  t = t.replace(LEFTOVER_DOUBLE, '');
  t = t.replace(ORPHAN_OPEN, '$1');
  t = t.replace(ORPHAN_BACKTICK, '');
  t = t.replace(TRAILING_ASTERISK, '');
  t = t.replace(ESCAPE, '$1');
  // Removed fences leave runs of blank lines behind.
  t = t.replace(/\n{3,}/g, '\n\n');
  return t === text ? text : t.trim();
}

export default stripMarkdown;
