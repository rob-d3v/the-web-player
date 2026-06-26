/**
 * Wake-word detection engine — browser port of the Avatar Chrome extension's
 * `wake-word-engine.ts` (openWakeWord chain on onnxruntime-web).
 *
 * Pipeline: getUserMedia(16 kHz mono) -> ScriptProcessor frames of 1280
 * samples (80 ms) -> buffer 12 frames (~960 ms) -> single ONNX inference ->
 * max output score; fire onDetect when score > threshold.
 *
 * onnxruntime-web is an OPTIONAL peer dependency and is imported LAZILY. If it
 * is not installed, loadModel() rejects with a clear, swallow-able error and
 * the hook degrades gracefully (no wake word, rest of the app unaffected).
 */

const SAMPLE_RATE = 16000;
const FRAME_SIZE = 1280; // 80 ms at 16 kHz
const FRAMES_PER_INFERENCE = 12; // ~960 ms

let ortPromise = null;
/** Lazy-load onnxruntime-web exactly once. Resolves to the ort module. */
const loadOrt = () => {
  if (ortPromise) return ortPromise;
  ortPromise = import('onnxruntime-web')
    .then((m) => m.default || m)
    .catch((err) => {
      ortPromise = null;
      throw new Error(
        'onnxruntime-web is not installed. Add it to enable wake-word detection: ' +
        'npm i onnxruntime-web. (' + (err && err.message ? err.message : err) + ')'
      );
    });
  return ortPromise;
};

export class WakeWordEngine {
  constructor() {
    this.session = null;
    this.audioContext = null;
    this.stream = null;
    this.processor = null;
    this.source = null;
    this.isListening = false;
    this.threshold = 0.5;
    this.onDetect = null;
    this.onError = null;
    this.onScore = null;
    this.audioBuffer = [];
    /** Optional path where the ort .wasm files are served from. */
    this.wasmPaths = undefined;
  }

  /**
   * Load the ONNX wake-word model.
   * @param {string} modelPath URL to the .onnx model
   * @param {{ wasmPaths?: string }} [options]
   */
  async loadModel(modelPath, options = {}) {
    const ort = await loadOrt();
    if (options.wasmPaths !== undefined) this.wasmPaths = options.wasmPaths;
    if (this.wasmPaths !== undefined) ort.env.wasm.wasmPaths = this.wasmPaths;
    // single-thread WASM avoids the SAB / COOP-COEP requirement (same as Piper)
    try { ort.env.wasm.numThreads = 1; } catch (e) {}

    this.session = await ort.InferenceSession.create(modelPath, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
    return this.session;
  }

  isModelLoaded() {
    return this.session !== null;
  }

  isCurrentlyListening() {
    return this.isListening;
  }

  /**
   * Start mic capture + inference loop.
   * @param {{ threshold:number, onDetect:()=>void, onError?:(e:Error)=>void, onScore?:(n:number)=>void }} config
   * @returns {Promise<boolean>}
   */
  async startListening(config) {
    if (this.isListening) return true;
    if (!this.session) {
      const err = new Error('Wake-word model not loaded. Call loadModel() first.');
      if (config.onError) config.onError(err);
      return false;
    }

    this.threshold = config.threshold ?? 0.5;
    this.onDetect = config.onDetect || null;
    this.onError = config.onError || null;
    this.onScore = config.onScore || null;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: SAMPLE_RATE,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new Ctx({ sampleRate: SAMPLE_RATE });
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.processor = this.audioContext.createScriptProcessor(FRAME_SIZE, 1, 1);

      this.processor.onaudioprocess = async (e) => {
        if (!this.isListening) return;
        const input = e.inputBuffer.getChannelData(0);
        this.audioBuffer.push(new Float32Array(input));

        if (this.audioBuffer.length >= FRAMES_PER_INFERENCE) {
          const full = this._concat(this.audioBuffer);
          this.audioBuffer = [];
          try {
            const score = await this._inference(full);
            if (this.onScore) this.onScore(score);
            if (score > this.threshold && this.onDetect) this.onDetect(score);
          } catch (err) {
            if (this.onError) this.onError(err);
          }
        }
      };

      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
      this.isListening = true;
      return true;
    } catch (err) {
      if (this.onError) this.onError(err);
      await this.stopListening();
      return false;
    }
  }

  async stopListening() {
    this.isListening = false;
    if (this.processor) {
      try { this.processor.disconnect(); } catch (e) {}
      this.processor.onaudioprocess = null;
      this.processor = null;
    }
    if (this.source) {
      try { this.source.disconnect(); } catch (e) {}
      this.source = null;
    }
    if (this.audioContext) {
      try { await this.audioContext.close(); } catch (e) {}
      this.audioContext = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    this.audioBuffer = [];
  }

  async dispose() {
    await this.stopListening();
    this.session = null;
  }

  _concat(buffers) {
    const total = buffers.reduce((s, b) => s + b.length, 0);
    const out = new Float32Array(total);
    let offset = 0;
    for (const b of buffers) { out.set(b, offset); offset += b.length; }
    return out;
  }

  async _inference(audio) {
    const ort = await loadOrt();
    const tensor = new ort.Tensor('float32', audio, [1, audio.length]);
    const feeds = {};
    feeds[this.session.inputNames[0]] = tensor;
    const results = await this.session.run(feeds);
    const output = results[this.session.outputNames[0]];
    const data = output.data;
    let max = 0;
    for (let i = 0; i < data.length; i++) if (data[i] > max) max = data[i];
    return max;
  }
}

/** Module singleton, matching the Chrome ext's getWakeWordEngine(). */
let _instance = null;
export const getWakeWordEngine = () => {
  if (!_instance) _instance = new WakeWordEngine();
  return _instance;
};

/** True if onnxruntime-web can be imported in this environment. */
export const isWakeWordSupported = async () => {
  try { await loadOrt(); return true; } catch (e) { return false; }
};
