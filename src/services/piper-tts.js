/**
 * Piper TTS browser engine wrapper
 * Uses piper-tts-web (Poket-Jony) for ONNX inference in the browser.
 *
 * Architecture:
 * - ONNX inference runs in a Web Worker (OnnxWebWorkerRuntime) so the
 *   main thread stays responsive during synthesis.
 * - Phonemize runs on the main thread (fast; espeak-ng WASM is small).
 * - Engine warmup is fire-and-forget so the page never blocks waiting
 *   for the first compile + tensor allocation.
 * - `preloadPiper()` lets the host kick off model download + WASM
 *   compile in the background (e.g. on component mount) so the first
 *   user interaction does NOT include cold-start cost.
 */

// onnxruntime-web (~tens of MB of wasm glue) and piper-tts-web are imported
// LAZILY — only when the engine actually initializes (i.e. on first chat use),
// never at module load. Importing them statically here pulled the whole ONNX
// runtime into the avatar's mount path, which (a) bloated/slowed the first
// paint and (b) broke client mount under Next.js (onnxruntime-web is in
// serverExternalPackages, so a top-level import on the client could throw and
// take the whole avatar down). Keeping them out of the module graph until
// needed lets the avatar canvas render immediately.
let ort = null;
let PiperWebEngine, OnnxWebRuntime, OnnxWebWorkerRuntime, FetchProvider;
let depsPromise = null;

const ensureDeps = () => {
  if (depsPromise) return depsPromise;
  depsPromise = (async () => {
    const [ortMod, piperMod] = await Promise.all([
      import('onnxruntime-web'),
      import('piper-tts-web'),
    ]);
    ort = ortMod.default || ortMod;
    PiperWebEngine = piperMod.PiperWebEngine;
    OnnxWebRuntime = piperMod.OnnxWebRuntime;
    OnnxWebWorkerRuntime = piperMod.OnnxWebWorkerRuntime;
    FetchProvider = piperMod.FetchProvider;
    // Disable ONNX proxy worker (clashes with piper's own worker protocol).
    ort.env.wasm.proxy = false;
    // Multi-thread WASM needs SharedArrayBuffer, which requires the page to be
    // cross-origin isolated (COOP/COEP headers). When it is, using real threads
    // cuts synthesis time roughly linearly; otherwise stay single-thread (no
    // SAB requirement, works everywhere).
    ort.env.wasm.numThreads = wasmThreadCount();
  })();
  return depsPromise;
};

// How many WASM threads the current page can actually use. >1 only when the
// page is crossOriginIsolated (SharedArrayBuffer available); capped at 4 —
// ONNX inference for these small models stops scaling beyond that and extra
// threads just burn battery on mobile.
const wasmThreadCount = () => {
  try {
    if (typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated) {
      const cores = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 2;
      return Math.max(1, Math.min(4, cores - 1));
    }
  } catch (e) { /* fall through to single-thread */ }
  return 1;
};

let engine = null;
let initPromise = null;
let warmupPromise = null;
let currentVoiceName = null;
let useWorkerRuntime = true; // can be flipped to false on worker failure

let piperStatus = {
  ready: false,
  modelCached: false,
  downloading: false,
  progress: 0,
  error: null,
  warming: false,
};

const setStatus = (patch) => {
  piperStatus = { ...piperStatus, ...patch };
};

const buildVoiceProvider = (modelUrl, modelConfigUrl, options) => {
  const fetchProvider = new FetchProvider();
  return {
    destroy: () => fetchProvider.destroy(),
    list: async () => [],
    fetch: async () => {
      setStatus({ progress: 10 });
      if (options.onProgress) options.onProgress(10);

      const json = await fetchProvider.fetch(modelConfigUrl);

      setStatus({ progress: 30 });
      if (options.onProgress) options.onProgress(30);

      const blobUrl = await fetchProvider.fetch(modelUrl);

      setStatus({ progress: 90 });
      if (options.onProgress) options.onProgress(90);

      return [json, blobUrl];
    },
  };
};

const buildEngine = (voiceProvider) => {
  const numThreads = wasmThreadCount();
  if (useWorkerRuntime) {
    try {
      return new PiperWebEngine({
        onnxRuntime: new OnnxWebWorkerRuntime({ numThreads }),
        voiceProvider,
      });
    } catch (err) {
      console.warn('[PiperTTS] Worker runtime unavailable, falling back to main thread:', err);
      useWorkerRuntime = false;
    }
  }
  return new PiperWebEngine({
    onnxRuntime: new OnnxWebRuntime({ numThreads }),
    voiceProvider,
  });
};

// ---- Synthesis cache ------------------------------------------------------
// Piper output is deterministic for (text, voice, speaker), so re-speaking the
// same sentence (greetings, flow prompts, repeated answers) should never pay
// inference twice. Small LRU of raw blobs; each hit mints a FRESH objectURL so
// callers keep their revoke-after-play lifecycle unchanged.
const SYNTH_CACHE_MAX = 24;
const synthCache = new Map(); // key -> Blob (Map preserves insertion order = LRU)

const cacheGet = (key) => {
  const blob = synthCache.get(key);
  if (blob) {
    // Refresh recency.
    synthCache.delete(key);
    synthCache.set(key, blob);
  }
  return blob || null;
};

const cachePut = (key, blob) => {
  if (synthCache.has(key)) synthCache.delete(key);
  synthCache.set(key, blob);
  while (synthCache.size > SYNTH_CACHE_MAX) {
    const oldest = synthCache.keys().next().value;
    synthCache.delete(oldest);
  }
};

/**
 * Initialize the Piper TTS engine with a specific model.
 *
 * Resolves as soon as the engine instance is constructed. The model
 * download + WASM compile + first-pass warmup run asynchronously in
 * the background; the returned engine handles `generate()` calls that
 * arrive before warmup by serializing them behind warmupPromise.
 *
 * @param {string} modelUrl - URL to the .onnx model file
 * @param {string} modelConfigUrl - URL to the .onnx.json config file
 * @param {object} options - { onProgress, onReady }
 */
export const initPiper = async (modelUrl, modelConfigUrl, options = {}) => {
  if (engine && piperStatus.ready) return engine;
  if (initPromise) return initPromise;

  setStatus({ downloading: true, progress: 0, error: null, warming: true });

  initPromise = (async () => {
    try {
      // Pull onnxruntime-web + piper-tts-web now (first real use), not at import.
      await ensureDeps();

      const modelFileName = modelUrl.split('/').pop().replace('.onnx', '');
      currentVoiceName = modelFileName;

      const voiceProvider = buildVoiceProvider(modelUrl, modelConfigUrl, options);
      engine = buildEngine(voiceProvider);

      // Fire-and-forget warmup: returns the promise so subsequent
      // synthesize calls can `await warmupPromise` without blocking
      // the host that just wants the engine reference.
      warmupPromise = engine
        .generate(' ', currentVoiceName, 0)
        .then(() => {
          setStatus({
            ready: true,
            modelCached: true,
            downloading: false,
            progress: 100,
            warming: false,
          });
          if (options.onProgress) options.onProgress(100);
          if (options.onReady) options.onReady();
        })
        .catch((err) => {
          setStatus({ downloading: false, error: err.message, warming: false });
          console.error('[PiperTTS] Warmup failed:', err);
          throw err;
        });

      return engine;
    } catch (err) {
      engine = null;
      initPromise = null;
      warmupPromise = null;
      setStatus({ downloading: false, error: err.message, warming: false });
      console.error('[PiperTTS] Init failed:', err);
      throw err;
    }
  })();

  return initPromise;
};

/**
 * Kick off engine init + warmup in the background. Returns a promise
 * that resolves when the engine instance exists; full readiness can
 * be polled via checkPiperStatus().ready or awaited via warmupPromise.
 *
 * Intended for hosts that want to pre-warm Piper on component mount
 * so the first user interaction does not pay cold-start cost.
 */
export const preloadPiper = (modelUrl, modelConfigUrl, options = {}) => {
  return initPiper(modelUrl, modelConfigUrl, options);
};

/**
 * Synthesize text to audio. If called before warmup completes, blocks
 * on warmupPromise so the first real synthesis returns valid audio.
 * @param {string} text - Text to synthesize
 * @param {object} options - { speakerId }
 * @returns {{ audioUrl: string, blob: Blob }}
 */
export const piperSynthesize = async (text, options = {}) => {
  if (!engine) {
    throw new Error('Piper TTS not initialized. Call initPiper() first.');
  }

  // Wait for warmup if a synthesize arrives before the warmup tensor
  // run finishes. Silently ignore warmup errors here — the call below
  // will throw with a real error if the session is unusable.
  if (warmupPromise) {
    try {
      await warmupPromise;
    } catch {
      /* surfaced by generate() below */
    }
  }

  try {
    const speakerId = options.speakerId ?? 0;
    const cacheKey = `${currentVoiceName}|${speakerId}|${text}`;

    const cached = cacheGet(cacheKey);
    if (cached) {
      return { audioUrl: URL.createObjectURL(cached), blob: cached, cached: true };
    }

    const response = await engine.generate(text, currentVoiceName, speakerId);
    const blob = response.file;
    cachePut(cacheKey, blob);
    const audioUrl = URL.createObjectURL(blob);
    return { audioUrl, blob };
  } catch (err) {
    console.error('[PiperTTS] Synthesis failed:', err);
    throw err;
  }
};

export const getPiperStatus = () => ({ ...piperStatus });

export const checkPiperStatus = () => ({ ...piperStatus });

export const disposePiper = () => {
  if (engine?.destroy) {
    engine.destroy();
  }
  engine = null;
  initPromise = null;
  warmupPromise = null;
  currentVoiceName = null;
  piperStatus = {
    ready: false,
    modelCached: false,
    downloading: false,
    progress: 0,
    error: null,
    warming: false,
  };
};
