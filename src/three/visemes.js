// Voice -> VRM visemes from a handful of spectral bands. Pure maths (no DOM): tested under plain node.
//
// The web player already feeds the mouth with loudness (RMS). That opens and closes the mouth in time with the
// voice, but every sound looks like "aa". Four band energies let the mouth also round for "o/u" and spread for "e/i".
// This is a heuristic on formants, not phoneme recognition: it improves the read, it does not make perfect lip-sync.
//
// Bands (Hz): 0 = 150-500 (F1 of u/o), 1 = 500-1100 (F1 of a/o, F2 of u/o), 2 = 1100-2300 (F2 of a/e/i), 3 = 2300-4500 (fricatives, F3).

export const BAND_EDGES = [150, 500, 1100, 2300, 4500];
const clamp01 = (v) => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0);
const smooth = (v, lo, hi) => { const t = clamp01((v - lo) / (hi - lo)); return t * t * (3 - 2 * t); };

export const VISEMES = ['aa', 'ih', 'ou', 'ee', 'oh'];

/**
 * @param {number} openness 0..1 loudness envelope (already smoothed by the caller)
 * @param {number[]|null} bands four non-negative band energies (any consistent scale); null/all-zero -> plain "aa"
 */
export function visemesFromBands(openness, bands) {
  const open = clamp01(openness);
  const zero = { aa: 0, ih: 0, ou: 0, ee: 0, oh: 0 };
  if (open <= 0) return zero;
  const b = Array.isArray(bands) && bands.length >= 4 ? bands.slice(0, 4).map((v) => Math.max(0, Number(v) || 0)) : null;
  const total = b ? b[0] + b[1] + b[2] + b[3] : 0;
  if (!b || total < 1e-6) return { ...zero, aa: open };
  const s = b.map((v) => v / total);
  const high = s[2] + s[3];
  const ou = open * smooth(s[0] + 0.3 * s[1], 0.50, 0.85) * (1 - smooth(high, 0.2, 0.5));
  const ee = open * smooth(s[2] * 0.7 + s[3], 0.30, 0.65) * (1 - smooth(s[1], 0.35, 0.6));
  const ih = open * smooth(s[2], 0.30, 0.55) * 0.6 * (1 - ee);
  const oh = open * smooth(s[1], 0.30, 0.55) * smooth(s[0], 0.12, 0.35) * (1 - smooth(high, 0.3, 0.55)) * (1 - ou);
  const aa = open * smooth(s[1] + 0.5 * s[2], 0.35, 0.7) * (1 - 0.7 * Math.max(ou, ee)) * (1 - 0.6 * oh);
  const out = { aa: clamp01(aa), ih: clamp01(ih), ou: clamp01(ou), ee: clamp01(ee), oh: clamp01(oh) };
  // The bands only choose the SHAPE; how far the mouth opens is the loudness. Real speech has fairly flat band shares,
  // so the raw scores above stay small (~0.1 at full voice) and the mouth barely moved: rescale so the shapes add up to
  // the opening. A frame whose spectrum matches no shape opens as a plain "aa".
  const sum = out.aa + out.ih + out.ou + out.ee + out.oh;
  if (sum < 1e-3) return { ...zero, aa: open };
  for (const k of VISEMES) out[k] = clamp01(out[k] * open / sum);
  return out;
}

/** Band energies (4) from an AnalyserNode byte spectrum. Returns null if the spectrum is empty. */
export function bandsFromSpectrum(bytes, sampleRate, fftSize) {
  if (!bytes || !bytes.length || !sampleRate || !fftSize) return null;
  const bin = sampleRate / fftSize;
  const out = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    const lo = Math.max(1, Math.floor(BAND_EDGES[i] / bin)), hi = Math.min(bytes.length - 1, Math.ceil(BAND_EDGES[i + 1] / bin));
    let sum = 0, n = 0;
    for (let k = lo; k <= hi; k++) { const v = bytes[k] / 255; sum += v * v; n++; }
    out[i] = n ? Math.sqrt(sum / n) : 0;
  }
  return out;
}
