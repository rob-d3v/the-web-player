/**
 * robs-tts.js — Robs Voice browser TTS runtime (BETA).
 *
 * On-device neural pt-BR voice: two ONNX graphs behind a rule-based text
 * frontend (see robs-frontend.js), all torch-free.
 *
 *   text ──normalizePtbr──▶ ──textToPhonemes──▶ ids
 *        ──acoustic.onnx(phoneme_ids)──▶ mel[1,80,T]
 *        ──vocoder.onnx(mel)──▶ wav[1,L] float
 *        ──WAV(22050 mono 16-bit)──▶ Blob
 *
 * Mirrors piper-tts.js: onnxruntime-web is imported LAZILY (never at module
 * load, so the avatar canvas paints immediately and Next.js client mount is not
 * broken by the ONNX runtime), WASM threads scale with cross-origin isolation,
 * warmup is fire-and-forget, and results are LRU-cached (synthesis is
 * deterministic for a given text + voice).
 *
 * The voice artifact is self-describing: robsvoice.json carries the audio
 * params and the INLINE phoneme→id map, so the runtime never derives the map —
 * it reads it, guaranteeing byte-parity with training (asserts map_version===1).
 */

import {
  normalizePtbr, textToPhonemes, makeVocab, chunkText, MAP_VERSION,
} from './robs-frontend.js';

// ── lazy onnxruntime-web (same rationale as piper-tts.js) ─────────────────────
let ort = null;
let depsPromise = null;
const ensureDeps = () => {
  if (depsPromise) return depsPromise;
  depsPromise = (async () => {
    const ortMod = await import('onnxruntime-web');
    ort = ortMod.default || ortMod;
    ort.env.wasm.proxy = false;
    ort.env.wasm.numThreads = wasmThreadCount();
  })();
  return depsPromise;
};

// Threads only when the page is crossOriginIsolated (SharedArrayBuffer); these
// graphs are small so cap at 4 — extra threads just burn mobile battery.
const wasmThreadCount = () => {
  try {
    if (typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated) {
      const cores = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 2;
      return Math.max(1, Math.min(4, cores - 1));
    }
  } catch (e) { /* single-thread */ }
  return 1;
};

// ── module state ──────────────────────────────────────────────────────────────
let acousticSession = null;
let vocoderSession = null;
let vocab = null;
let manifest = null;
let voiceKey = null;         // identity of the loaded voice (cache namespacing)
let initPromise = null;
let warmupPromise = null;

let robsStatus = {
  ready: false,
  modelCached: false,
  downloading: false,
  progress: 0,
  error: null,
  warming: false,
};
const setStatus = (patch) => { robsStatus = { ...robsStatus, ...patch }; };

// ── URL resolution (base dir OR explicit per-file urls) ───────────────────────
const resolveUrls = (voice) => {
  if (voice && typeof voice === 'object') {
    return {
      acousticUrl: voice.acousticUrl,
      vocoderUrl: voice.vocoderUrl,
      manifestUrl: voice.manifestUrl,
    };
  }
  const base = String(voice || '').replace(/\/+$/, '');
  return {
    acousticUrl: `${base}/acoustic.onnx`,
    vocoderUrl: `${base}/vocoder.onnx`,
    manifestUrl: `${base}/robsvoice.json`,
  };
};

// ── WAV encoder (PCM 16-bit mono) ─────────────────────────────────────────────
/**
 * Encode a mono Float32 waveform (approx [-1,1]) as a 16-bit PCM WAV Blob.
 * @param {Float32Array} samples
 * @param {number} sampleRate
 * @returns {Blob}
 */
export function encodeWav(samples, sampleRate) {
  const n = samples.length;
  const buffer = new ArrayBuffer(44 + n * 2);
  const view = new DataView(buffer);
  const writeStr = (off, s) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)); };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + n * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);          // fmt chunk size
  view.setUint16(20, 1, true);           // PCM
  view.setUint16(22, 1, true);           // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate (mono, 2 bytes/sample)
  view.setUint16(32, 2, true);           // block align
  view.setUint16(34, 16, true);          // bits per sample
  writeStr(36, 'data');
  view.setUint32(40, n * 2, true);

  let off = 44;
  for (let i = 0; i < n; i++) {
    let s = samples[i];
    if (s > 1) s = 1; else if (s < -1) s = -1;
    view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    off += 2;
  }
  return new Blob([buffer], { type: 'audio/wav' });
}

const concatFloat32 = (arrays) => {
  let total = 0;
  for (const a of arrays) total += a.length;
  const out = new Float32Array(total);
  let off = 0;
  for (const a of arrays) { out.set(a, off); off += a.length; }
  return out;
};

// ── LRU cache (synthesis is deterministic per voice+text) ─────────────────────
const SYNTH_CACHE_MAX = 24;
const synthCache = new Map(); // key -> Blob
const cacheGet = (key) => {
  const blob = synthCache.get(key);
  if (blob) { synthCache.delete(key); synthCache.set(key, blob); }
  return blob || null;
};
const cachePut = (key, blob) => {
  if (synthCache.has(key)) synthCache.delete(key);
  synthCache.set(key, blob);
  while (synthCache.size > SYNTH_CACHE_MAX) {
    synthCache.delete(synthCache.keys().next().value);
  }
};

// ── init ──────────────────────────────────────────────────────────────────────
/**
 * Initialize Robs Voice: fetch the manifest, build the vocab from its inline
 * phoneme map, and create the two ORT sessions. Resolves once sessions exist;
 * a fire-and-forget warmup runs the graphs once in the background so the first
 * real synthesis does not pay cold-start.
 *
 * @param {string|{acousticUrl:string,vocoderUrl:string,manifestUrl:string}} voice
 * @param {{onProgress?:(n:number)=>void,onReady?:()=>void}} [options]
 */
export const initRobs = async (voice, options = {}) => {
  const urls = resolveUrls(voice);
  const key = urls.manifestUrl;
  if (acousticSession && vocoderSession && robsStatus.ready && voiceKey === key) return true;
  if (initPromise && voiceKey === key) return initPromise;

  voiceKey = key;
  setStatus({ downloading: true, progress: 0, error: null, warming: true, ready: false });

  initPromise = (async () => {
    try {
      await ensureDeps();
      const progress = (n) => { setStatus({ progress: n }); if (options.onProgress) options.onProgress(n); };

      // 1) manifest (self-describing artifact)
      const res = await fetch(urls.manifestUrl);
      if (!res.ok) throw new Error(`Robs manifest fetch failed: ${res.status}`);
      manifest = await res.json();
      progress(10);

      const mapVersion = manifest?.frontend?.phoneme_map_version;
      if (mapVersion !== MAP_VERSION) {
        throw new Error(`Robs phoneme map_version mismatch: manifest=${mapVersion} runtime=${MAP_VERSION}. `
          + 'The frontend port and the voice artifact must share MAP_VERSION.');
      }
      const idMap = manifest?.frontend?.phoneme_id_map;
      if (!idMap || typeof idMap !== 'object') throw new Error('Robs manifest missing frontend.phoneme_id_map');
      const fe = manifest.frontend || {};
      vocab = makeVocab(idMap, {
        pad: fe.pad_token || '_', bos: fe.bos_token || '^',
        eos: fe.eos_token || '$', unk: fe.unk_token || '?',
      });

      // 2) ORT sessions (small graphs; single-op thread policy)
      const sessOpts = {
        executionProviders: ['wasm'],
        graphOptimizationLevel: 'all',
      };
      acousticSession = await ort.InferenceSession.create(urls.acousticUrl, sessOpts);
      progress(60);
      vocoderSession = await ort.InferenceSession.create(urls.vocoderUrl, sessOpts);
      progress(90);

      // 3) fire-and-forget warmup
      warmupPromise = _synthOne('oi', options).then(() => {
        setStatus({ ready: true, modelCached: true, downloading: false, progress: 100, warming: false });
        progress(100);
        if (options.onReady) options.onReady();
      }).catch((err) => {
        setStatus({ downloading: false, error: err.message, warming: false });
        console.error('[RobsTTS] Warmup failed:', err);
        throw err;
      });

      return true;
    } catch (err) {
      acousticSession = null;
      vocoderSession = null;
      vocab = null;
      initPromise = null;
      warmupPromise = null;
      setStatus({ downloading: false, error: err.message, warming: false, ready: false });
      console.error('[RobsTTS] Init failed:', err);
      throw err;
    }
  })();

  return initPromise;
};

/** Kick off download + session build + warmup in the background. */
export const preloadRobs = (voice, options = {}) => initRobs(voice, options);

// ── inference ─────────────────────────────────────────────────────────────────
const audioParams = () => {
  const a = (manifest && manifest.audio) || {};
  return { sampleRate: a.sample_rate || 22050, nMels: a.n_mels || 80 };
};

/** Synthesize a single (already sentence-sized) chunk → Float32 waveform. */
const _synthOne = async (chunk) => {
  const { nMels } = audioParams();
  const normalized = normalizePtbr(chunk);
  const phonemes = textToPhonemes(normalized);
  const ids = vocab.encode(phonemes); // includes BOS/EOS

  // acoustic: phoneme_ids (int64 [1,L]) -> mel (float [1,n_mels,T])
  const idData = BigInt64Array.from(ids.map((x) => BigInt(x)));
  const idTensor = new ort.Tensor('int64', idData, [1, ids.length]);
  const acOut = await acousticSession.run({ phoneme_ids: idTensor });
  const mel = acOut.mel || acOut[Object.keys(acOut)[0]];

  // vocoder: mel (float [1,n_mels,T]) -> wav (float [1,L])
  const melTensor = new ort.Tensor('float32', mel.data, mel.dims);
  const vocOut = await vocoderSession.run({ mel: melTensor });
  const wav = vocOut.wav || vocOut[Object.keys(vocOut)[0]];
  return new Float32Array(wav.data); // [1,L] flattened == L mono samples
};

/**
 * Synthesize `text` to a WAV Blob (22050 Hz mono 16-bit). Long text is split at
 * sentence/clause boundaries via the chunker and the chunk waveforms are
 * concatenated. Result is LRU-cached per voice+text.
 *
 * @param {string} text
 * @param {object} [options]  reserved (speed/pitch are baked into the graph)
 * @returns {Promise<{audioUrl:string, blob:Blob, cached?:boolean}>}
 */
export const robsSynthesize = async (text, options = {}) => {
  if (!acousticSession || !vocoderSession || !vocab) {
    throw new Error('Robs Voice not initialized. Call initRobs() first.');
  }
  if (warmupPromise) { try { await warmupPromise; } catch { /* surfaced below */ } }

  const cacheKey = `${voiceKey}|${text}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { audioUrl: URL.createObjectURL(cached), blob: cached, cached: true };

  const { sampleRate } = audioParams();
  const chunks = chunkText(text);
  const parts = [];
  if (chunks.length === 0) {
    parts.push(new Float32Array(0));
  } else {
    for (const ch of chunks) parts.push(await _synthOne(ch));
  }
  const blob = encodeWav(concatFloat32(parts), sampleRate);
  cachePut(cacheKey, blob);
  return { audioUrl: URL.createObjectURL(blob), blob };
};

export const getRobsStatus = () => ({ ...robsStatus });

export const disposeRobs = () => {
  try { acousticSession?.release?.(); } catch (e) { /* noop */ }
  try { vocoderSession?.release?.(); } catch (e) { /* noop */ }
  acousticSession = null;
  vocoderSession = null;
  vocab = null;
  manifest = null;
  voiceKey = null;
  initPromise = null;
  warmupPromise = null;
  synthCache.clear();
  robsStatus = { ready: false, modelCached: false, downloading: false, progress: 0, error: null, warming: false };
};
