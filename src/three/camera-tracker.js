// Webcam mirror for the 3D avatar: camera -> MediaPipe FaceLandmarker (in the browser) -> FaceTracker -> viewer.
//
// Privacy contract (the UI repeats it to the user): frames are analysed on this device only. Nothing is uploaded,
// recorded or stored. `stop()` releases every camera track, so the browser's camera indicator turns off.
//
// Everything environmental (camera, video element, scheduler, MediaPipe) is injectable so the state machine runs
// under plain node (examples/test-camera-tracker.mjs). In the browser the defaults are used.
import { FaceTracker } from './tracking-core.js';

export const MP_VERSION = '0.10.14';
export const DEFAULT_WASM_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/wasm`;
export const DEFAULT_MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

/** pt-BR messages per failure; `state` is what the UI switches on. */
export const CAMERA_MESSAGES = {
  unsupported: 'Este navegador não permite usar a câmera aqui. Abra o site em HTTPS no Chrome, Edge, Firefox ou Safari atualizado.',
  denied: 'A câmera está bloqueada para este site. Clique no cadeado ao lado do endereço, permita a câmera e tente de novo.',
  'no-camera': 'Não encontrei nenhuma câmera neste computador. Conecte uma e tente de novo.',
  busy: 'A câmera está em uso por outro programa. Feche-o e tente de novo.',
  'load-failed': 'Não consegui carregar o reconhecimento facial. Verifique a conexão e tente de novo.',
  error: 'Não foi possível ligar a câmera agora. Tente de novo.',
};

export function classifyCameraError(error) {
  const name = error?.name || '';
  if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') return 'denied';
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError' || name === 'OverconstrainedError') return 'no-camera';
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') return 'busy';
  return 'error';
}

async function defaultLoadLandmarker({ wasmBase = DEFAULT_WASM_BASE, modelUrl = DEFAULT_MODEL_URL } = {}) {
  const vision = await import('@mediapipe/tasks-vision');
  const fileset = await vision.FilesetResolver.forVisionTasks(wasmBase);
  const options = (delegate) => ({
    baseOptions: { modelAssetPath: modelUrl, delegate },
    runningMode: 'VIDEO', numFaces: 1,
    outputFaceBlendshapes: true, outputFacialTransformationMatrixes: true,
  });
  try { return await vision.FaceLandmarker.createFromOptions(fileset, options('GPU')); }
  catch { return await vision.FaceLandmarker.createFromOptions(fileset, options('CPU')); }
}

function defaultEnv() {
  return {
    mediaDevices: typeof navigator !== 'undefined' ? navigator.mediaDevices : undefined,
    createVideo() {
      const video = document.createElement('video');
      video.muted = true; video.playsInline = true; video.setAttribute('aria-hidden', 'true');
      video.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px';
      document.body.appendChild(video);
      return video;
    },
    schedule: (fn, ms) => setTimeout(fn, ms),
    cancel: (id) => clearTimeout(id),
    now: () => (typeof performance !== 'undefined' ? performance.now() : Date.now()),
    isHidden: () => typeof document !== 'undefined' && document.hidden,
  };
}

/**
 * @param {object} o
 * @param {(frame: {head:{x:number,y:number,z:number}, expressions:Record<string,number>} | null) => void} o.onFrame  null = no face / stopped
 * @param {(state: string, detail?: {message?: string}) => void} [o.onState]
 *   states: off | starting | loading | on | no-face | denied | no-camera | busy | unsupported | load-failed | error
 */
export function createCameraTracker({ onFrame, onState, mirror = true, smoothing = 1, fps = 30, loadLandmarker = defaultLoadLandmarker,
  landmarkerOptions, env: envOverride, faceLostMs = 600 } = {}) {
  const env = { ...defaultEnv(), ...(envOverride || {}) };
  const tracker = new FaceTracker({ mirror, smoothing });
  let state = 'off', session = 0, stream = null, video = null, landmarker = null, timer = null, lastFaceAt = 0, lastVideoTime = -1;

  const setState = (next, message) => { state = next; onState?.(next, { message: message ?? CAMERA_MESSAGES[next] }); };

  function release() {
    if (timer !== null) { env.cancel(timer); timer = null; }
    if (stream) { for (const track of stream.getTracks()) { try { track.stop(); } catch { /* already stopped */ } } stream = null; }
    if (video) { try { video.pause?.(); video.srcObject = null; video.remove?.(); } catch { /* detached */ } video = null; }
    if (landmarker) { try { landmarker.close?.(); } catch { /* closed */ } landmarker = null; }
  }

  function fail(ticket, kind) {
    if (ticket !== session) return;
    release(); tracker.reset(); onFrame?.(null); setState(kind);
  }

  async function start() {
    if (state !== 'off' && state !== 'denied' && state !== 'no-camera' && state !== 'busy' && state !== 'unsupported' && state !== 'load-failed' && state !== 'error') return false;
    const ticket = ++session;
    if (!env.mediaDevices?.getUserMedia) { setState('unsupported'); return false; }
    setState('starting', 'Aguardando a permissão da câmera…');
    try {
      const media = await env.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }, audio: false });
      if (ticket !== session) { for (const t of media.getTracks()) t.stop(); return false; } // user hit "Desligar" while the prompt was open
      stream = media;
    } catch (error) { fail(ticket, classifyCameraError(error)); return false; }

    setState('loading', 'Carregando o reconhecimento facial…');
    try {
      video = env.createVideo(); video.srcObject = stream;
      await video.play?.();
      landmarker = await loadLandmarker(landmarkerOptions);
    } catch (error) { fail(ticket, error?.name && classifyCameraError(error) !== 'error' ? classifyCameraError(error) : 'load-failed'); return false; }
    if (ticket !== session) { release(); return false; }
    tracker.reset(); lastFaceAt = env.now(); lastVideoTime = -1;
    setState('on', 'Câmera ligada');
    loop(ticket);
    return true;
  }

  function loop(ticket) {
    if (ticket !== session || !landmarker || !video) return;
    const interval = 1000 / fps;
    try {
      const nowMs = env.now();
      const ready = !env.isHidden() && (video.readyState === undefined || video.readyState >= 2);
      const fresh = video.currentTime === undefined || video.currentTime !== lastVideoTime;
      if (ready && fresh) {
        lastVideoTime = video.currentTime;
        const result = landmarker.detectForVideo(video, nowMs);
        const frame = tracker.process(result, nowMs / 1000);
        if (frame) {
          lastFaceAt = nowMs; if (state === 'no-face') setState('on', 'Câmera ligada');
          onFrame?.(frame);
        } else if (nowMs - lastFaceAt > faceLostMs) {
          if (state === 'on') { setState('no-face', 'Não estou vendo seu rosto. Fique de frente para a câmera.'); onFrame?.(null); }
        }
      }
    } catch (error) {
      // A single bad frame must not kill the session; a persistent failure surfaces as an error.
      if (++loop.failures > 30) { loop.failures = 0; fail(ticket, 'error'); return; }
    }
    timer = env.schedule(() => loop(ticket), interval);
  }
  loop.failures = 0;

  function stop() {
    session++;                       // invalidates any start() still awaiting the permission prompt or the model
    const was = state;
    release(); tracker.reset();
    if (was !== 'off') { onFrame?.(null); setState('off'); }
  }

  return { start, stop, recenter: () => tracker.recenter(), setMirror: (value) => { tracker.mirror = !!value; tracker.reset(); },
    /** Mouth sensitivity (0.5 = shy, 1 = default, 2 = very sensitive). Takes effect on the next frame. */
    setMouthGain: (value) => { tracker.mouthGain = Math.min(3, Math.max(0.3, Number(value) || 1)); },
    /** The live camera element, for a side-by-side preview (null when off). The caller must not start/stop it. */
    get video() { return video; }, get state() { return state; } };
}
