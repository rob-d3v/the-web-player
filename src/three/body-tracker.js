// Optional arms + hands tracking, layered on the face camera. Loads MediaPipe pose + hand landmarkers only when started
// (they add ~15 MB of models), and runs at a lower rate than the face because arm motion is slower than facial motion.
// Everything environmental is injectable so the lifecycle is tested under node (examples/test-body-tracker.mjs).
import { BodyTracker } from './body-core.js';
import { DEFAULT_WASM_BASE, MP_VERSION } from './camera-tracker.js';

export const POSE_MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
export const HAND_MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';
void MP_VERSION;

async function defaultLoad({ wasmBase = DEFAULT_WASM_BASE } = {}) {
  const vision = await import('@mediapipe/tasks-vision');
  const fileset = await vision.FilesetResolver.forVisionTasks(wasmBase);
  const make = async (Klass, extra) => {
    const options = (delegate) => ({ baseOptions: { modelAssetPath: extra.url, delegate }, runningMode: 'VIDEO', ...extra.options });
    try { return await Klass.createFromOptions(fileset, options('GPU')); } catch { return Klass.createFromOptions(fileset, options('CPU')); }
  };
  const pose = await make(vision.PoseLandmarker, { url: POSE_MODEL_URL, options: { numPoses: 1 } });
  const hands = await make(vision.HandLandmarker, { url: HAND_MODEL_URL, options: { numHands: 2 } });
  return { pose, hands };
}

/**
 * @param {object} o
 * @param {() => (HTMLVideoElement|null)} o.getVideo   the live camera element (owned by the face tracker)
 * @param {(frame: {left: object|null, right: object|null} | null) => void} o.onFrame   null = stopped / lost
 * @param {object} [o.holds]   sides that must never move, e.g. a character that carries a lantern: { left: { upper, lower } }
 */
export function createBodyTracker({ getVideo, onFrame, onState, mirror = true, fps = 20, holds = {}, load = defaultLoad, env: envOverride } = {}) {
  const env = { schedule: (fn, ms) => setTimeout(fn, ms), cancel: (id) => clearTimeout(id), now: () => performance.now(), isHidden: () => typeof document !== 'undefined' && document.hidden, ...(envOverride || {}) };
  const body = new BodyTracker({ mirror, holds });
  let state = 'off', session = 0, models = null, timer = null, lastTime = null, failures = 0, lastVideoTime = -1;
  const set = (s, message) => { state = s; onState?.(s, { message }); };

  async function start() {
    if (state === 'loading' || state === 'on') return false;
    const ticket = ++session;
    set('loading', 'Carregando o rastreamento de braços e mãos…');
    try { models = await load(); } catch { if (ticket === session) { set('load-failed', 'Não consegui carregar o rastreamento de braços e mãos. O rosto continua funcionando.'); } return false; }
    if (ticket !== session) { close(models); models = null; return false; }
    body.reset(); lastTime = null; failures = 0;
    set('on', 'Braços e mãos ligados');
    loop(ticket);
    return true;
  }
  function close(m) { for (const k of ['pose', 'hands']) { try { m?.[k]?.close?.(); } catch { /* closed */ } } }

  function loop(ticket) {
    if (ticket !== session || !models) return;
    try {
      const video = getVideo?.();
      const nowMs = env.now();
      const dt = lastTime === null ? 1 / fps : (nowMs - lastTime) / 1000; lastTime = nowMs;
      let pose = null, hands = null;
      if (video && !env.isHidden() && (video.readyState === undefined || video.readyState >= 2) && (video.currentTime === undefined || video.currentTime !== lastVideoTime)) {
        lastVideoTime = video.currentTime;
        const p = models.pose.detectForVideo(video, nowMs);
        pose = p?.worldLandmarks?.[0] ?? null;
        const h = models.hands.detectForVideo(video, nowMs);
        if (h?.landmarks?.length) {
          hands = {};
          h.landmarks.forEach((lm, i) => {
            // MediaPipe reports handedness as seen in the (un-mirrored) image: the user's right hand is labelled "Right".
            const label = h.handedness?.[i]?.[0]?.categoryName;
            const userRight = label === 'Right';
            const avatarSide = (userRight === mirror) ? 'left' : 'right';
            hands[avatarSide] = lm;
          });
        }
      }
      onFrame?.(body.update(pose, hands, Math.min(dt, 0.1)));
      failures = 0;
    } catch { if (++failures > 30) { stop(); set('error', 'O rastreamento de braços e mãos parou. O rosto continua funcionando.'); return; } }
    timer = env.schedule(() => loop(ticket), 1000 / fps);
  }

  function stop() {
    session++;
    if (timer !== null) { env.cancel(timer); timer = null; }
    close(models); models = null; body.reset();
    if (state !== 'off') { onFrame?.(null); set('off'); }
  }
  return { start, stop, get state() { return state; } };
}
