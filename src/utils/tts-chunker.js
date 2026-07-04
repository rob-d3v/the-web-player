/**
 * TTS sentence chunker.
 *
 * Splits a (possibly long) block of text into speakable chunks at SENTENCE
 * boundaries so the avatar can stream a reply sentence-by-sentence through a
 * queue (synthesize the next chunk while the current one plays) instead of
 * blocking on one giant synth. The win is latency + naturalness: the first
 * sentence starts speaking almost immediately, and the listener hears natural
 * pauses between sentences.
 *
 * Rules (intentionally pragmatic, not a full NLP sentence tokenizer):
 *  - Split AFTER sentence enders: `.`  `!`  `?`  `…` (and the ASCII `...`),
 *    plus hard newlines. Optionally also `;` and `:` (off by default).
 *  - DO NOT split at commas — a comma continues the same chunk.
 *  - Keep the punctuation attached to the chunk it ends.
 *  - Don't split on a `.` that is clearly mid-token:
 *      * a single uppercase-letter abbreviation immediately before it
 *        (e.g. "Dr.", "Sr.", "Sra." -> the letter before the dot is a
 *        capital and the token is short), common pt/en abbreviations,
 *      * a digit on BOTH sides ("1.000", "3.14", "R$ 1.500,00"),
 *      * a decimal/thousands dot,
 *      * a URL / domain / file-extension dot ("aniamodels.shop", "file.json").
 *  - Merge very short trailing fragments into the NEXT chunk (min ~12 chars)
 *    so we never speak a 1-word blip like "Sim." on its own.
 *  - Optionally hard-wrap chunks longer than `maxChunkChars` at the last
 *    space before the limit (so a single comma-spliced run-on still streams).
 *
 * Pure + dependency-free so it can be unit-tested in node and bundled tiny.
 */

const SENTENCE_ENDERS = new Set(['.', '!', '?', '…']);

// Lower-cased abbreviations (without the trailing dot) that should NOT end a
// sentence. Mostly pt-BR + a few en. Single capital letters (initials like
// "J.") are handled structurally, not via this list.
const ABBREVIATIONS = new Set([
  'sr', 'sra', 'srta', 'dr', 'dra', 'prof', 'profa', 'exmo', 'exma',
  'sto', 'sta', 'av', 'r', 'pç', 'ed', 'ap', 'apto', 'bl', 'cep',
  'tel', 'cel', 'ramal', 'cnpj', 'cpf', 'rg', 'ltda', 'cia', 'me',
  'ne', 'no', 'nro', 'pag', 'pags', 'fl', 'fls', 'art', 'inc', 'par',
  'etc', 'ex', 'p', 'pp', 'cap', 'vol', 'ed', 'séc', 'sec', 'min', 'seg',
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez',
  'mr', 'mrs', 'ms', 'jr', 'st', 'vs', 'eg', 'ie', 'inc', 'corp', 'co', 'al',
]);

const isDigit = (ch) => ch >= '0' && ch <= '9';
const isUpper = (ch) => ch >= 'A' && ch <= 'Z' || (ch && ch.toLowerCase() !== ch.toUpperCase() && ch === ch.toUpperCase());
const isLetter = (ch) => !!ch && ch.toLowerCase() !== ch.toUpperCase();
const isSpace = (ch) => ch === ' ' || ch === '\t' || ch === ' ';

/**
 * Read the alphabetic/numeric "word" ending at index `i` (the char before the
 * dot). Returns the lower-cased word and whether it was a single capital.
 */
const wordBeforeDot = (text, dotIndex) => {
  let j = dotIndex - 1;
  let word = '';
  while (j >= 0 && (isLetter(text[j]) || isDigit(text[j]) || text[j] === '$')) {
    word = text[j] + word;
    j--;
  }
  return word;
};

/**
 * Decide whether the `.` at index `i` is a real sentence ender or a mid-token
 * dot (abbreviation / number / decimal / domain) that must NOT split.
 */
const isAbbreviationOrNumberDot = (text, i) => {
  const prev = text[i - 1];
  const next = text[i + 1];

  // Digit on both sides => decimal / thousands separator ("1.000", "3.14").
  if (isDigit(prev) && isDigit(next)) return true;

  // Dot directly followed by a letter/digit with no space => mid-token, e.g.
  // a domain or file ext: "aniamodels.shop", "index.html", "v1.8.0".
  if (next && !isSpace(next) && (isLetter(next) || isDigit(next))) return true;

  const word = wordBeforeDot(text, i);
  if (!word) return false;

  // Single capital letter initial: "J. R. R." / "R. Pereira".
  if (word.length === 1 && isUpper(word)) return true;

  // Short capitalized token whose lower-case form is a known abbreviation, OR
  // any all-caps short token followed by lowercase continuation ("Dr.").
  const lower = word.toLowerCase();
  if (ABBREVIATIONS.has(lower)) return true;

  return false;
};

/**
 * Normalize an ASCII "..." run into a single ellipsis marker for boundary
 * detection (we still keep the original chars in the emitted chunk).
 */
const isEllipsisRun = (text, i) =>
  text[i] === '.' && text[i + 1] === '.' && text[i + 2] === '.';

/**
 * Split `text` into sentence chunks.
 *
 * @param {string} text
 * @param {object} [opts]
 * @param {number} [opts.minChunkChars=12]  merge fragments shorter than this
 *                                           into the next chunk.
 * @param {number} [opts.maxChunkChars=0]    if > 0, hard-wrap chunks longer
 *                                           than this at the last space.
 * @param {boolean} [opts.splitOnSemicolon=false] also break at `;` and `:`.
 * @param {number} [opts.firstChunkMaxChars=0] if > 0, cap ONLY the first chunk
 *                                           at this many chars, splitting at
 *                                           the last comma (preferred) or space
 *                                           before the limit. This minimizes
 *                                           time-to-first-audio: the engine
 *                                           synthesizes a short clause first
 *                                           and the rest streams behind it.
 * @returns {string[]} non-empty trimmed chunks, in order.
 */
export const chunkText = (text, opts = {}) => {
  const {
    minChunkChars = 12,
    maxChunkChars = 0,
    splitOnSemicolon = false,
    firstChunkMaxChars = 0,
  } = opts;

  if (text == null) return [];
  const src = String(text);
  if (!src.trim()) return [];

  const rawChunks = [];
  let start = 0;
  let i = 0;
  const n = src.length;

  const push = (end) => {
    const piece = src.slice(start, end);
    if (piece.trim()) rawChunks.push(piece.trim());
    start = end;
  };

  while (i < n) {
    const ch = src[i];

    // Hard newline always ends a chunk.
    if (ch === '\n' || ch === '\r') {
      push(i);
      // Skip the newline char(s) so they don't start the next chunk.
      while (i < n && (src[i] === '\n' || src[i] === '\r')) i++;
      start = i;
      continue;
    }

    if (ch === '…') {
      push(i + 1);
      i++;
      continue;
    }

    if (isEllipsisRun(src, i)) {
      // Consume the whole run of dots.
      let j = i;
      while (j < n && src[j] === '.') j++;
      push(j);
      i = j;
      continue;
    }

    if (SENTENCE_ENDERS.has(ch)) {
      if (ch === '.' && isAbbreviationOrNumberDot(src, i)) {
        i++;
        continue;
      }
      // Consume any immediately following closing quotes/brackets and repeated
      // enders ("?!", '."') so they stay attached.
      let end = i + 1;
      while (end < n && ('!?.…'.includes(src[end]) || '")’”\''.includes(src[end]))) {
        end++;
      }
      push(end);
      i = end;
      continue;
    }

    if (splitOnSemicolon && (ch === ';' || ch === ':')) {
      push(i + 1);
      i++;
      continue;
    }

    i++;
  }

  // Trailing remainder.
  if (start < n) push(n);

  // Merge short fragments forward into the next chunk; if the short fragment is
  // the LAST one, merge it backward into the previous chunk instead.
  const merged = [];
  for (let k = 0; k < rawChunks.length; k++) {
    const cur = rawChunks[k];
    if (cur.length < minChunkChars && k < rawChunks.length - 1) {
      // Prepend to next chunk.
      rawChunks[k + 1] = `${cur} ${rawChunks[k + 1]}`;
      continue;
    }
    if (cur.length < minChunkChars && merged.length > 0) {
      // Short last fragment -> append to previous emitted chunk.
      merged[merged.length - 1] = `${merged[merged.length - 1]} ${cur}`;
      continue;
    }
    merged.push(cur);
  }

  // Optional fast-start split: cap ONLY the first chunk so the very first
  // synthesis is short (low latency), preferring a comma boundary so the
  // break sounds like a natural breath, falling back to the last space.
  if (firstChunkMaxChars > 0 && merged.length > 0 && merged[0].length > firstChunkMaxChars) {
    const first = merged[0];
    let cut = first.lastIndexOf(',', firstChunkMaxChars);
    // A comma too close to the start makes a useless blip; require some meat.
    if (cut < Math.min(minChunkChars, firstChunkMaxChars)) {
      cut = first.lastIndexOf(' ', firstChunkMaxChars);
    }
    if (cut <= 0) cut = firstChunkMaxChars;
    const head = first.slice(0, first[cut] === ',' ? cut + 1 : cut).trim();
    const tail = first.slice(first[cut] === ',' ? cut + 1 : cut).trim();
    if (head && tail) {
      merged.splice(0, 1, head, tail);
    }
  }

  // Optional hard-wrap of over-long chunks (run-on sentences spliced by commas).
  if (maxChunkChars > 0) {
    const wrapped = [];
    for (const chunk of merged) {
      if (chunk.length <= maxChunkChars) {
        wrapped.push(chunk);
        continue;
      }
      let rest = chunk;
      while (rest.length > maxChunkChars) {
        // Find last space at/under the limit; fall back to a hard cut.
        let cut = rest.lastIndexOf(' ', maxChunkChars);
        if (cut <= 0) cut = maxChunkChars;
        wrapped.push(rest.slice(0, cut).trim());
        rest = rest.slice(cut).trim();
      }
      if (rest) wrapped.push(rest);
    }
    return wrapped.filter(Boolean);
  }

  return merged.filter(Boolean);
};

export default chunkText;
