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
    // Disable ONNX proxy worker (clashes with piper's own worker protocol) and
    // force single-thread WASM (no SAB / COOP-COEP requirement).
    ort.env.wasm.proxy = false;
    ort.env.wasm.numThreads = 1;
  })();
  return depsPromise;
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
  if (useWorkerRuntime) {
    try {
      return new PiperWebEngine({
        onnxRuntime: new OnnxWebWorkerRuntime({ numThreads: 1 }),
        voiceProvider,
      });
    } catch (err) {
      console.warn('[PiperTTS] Worker runtime unavailable, falling back to main thread:', err);
      useWorkerRuntime = false;
    }
  }
  return new PiperWebEngine({
    onnxRuntime: new OnnxWebRuntime({ numThreads: 1 }),
    voiceProvider,
  });
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
    const response = await engine.generate(text, currentVoiceName, speakerId);
    const blob = response.file;
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
