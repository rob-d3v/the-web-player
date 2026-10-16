import { useState, useRef, useEffect, createElement } from "react";
import { c as createVoiceGate, V as VOICE_DEFAULTS } from "./voice-gate-wdeXuFB7.js";
const clamp$1 = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const finite$1 = (v, fallback = 0) => Number.isFinite(v) ? v : fallback;
const DEG$1 = Math.PI / 180;
const LIMITS$1 = { yaw: 60 * DEG$1, pitch: 40 * DEG$1, roll: 35 * DEG$1 };
class OneEuro {
  constructor({ minCutoff = 1.4, beta = 0.03, dCutoff = 1 } = {}) {
    this.minCutoff = minCutoff;
    this.beta = beta;
    this.dCutoff = dCutoff;
    this.reset();
  }
  reset() {
    this.x = null;
    this.dx = 0;
    this.t = null;
  }
  static alpha(cutoff, dt) {
    const tau = 1 / (2 * Math.PI * cutoff);
    return 1 / (1 + tau / dt);
  }
  filter(value, tSeconds) {
    if (!Number.isFinite(value)) return this.x ?? 0;
    if (this.x === null || this.t === null) {
      this.x = value;
      this.t = tSeconds;
      return value;
    }
    const dt = tSeconds - this.t;
    if (!(dt > 0)) return this.x;
    this.t = tSeconds;
    const rawD = (value - this.x) / dt;
    this.dx += OneEuro.alpha(this.dCutoff, dt) * (rawD - this.dx);
    const cutoff = this.minCutoff + this.beta * Math.abs(this.dx);
    this.x += OneEuro.alpha(cutoff, dt) * (value - this.x);
    return this.x;
  }
}
function eulerFromMatrix(m) {
  if (!m || m.length < 16 || !Array.from(m).slice(0, 16).every(Number.isFinite)) return null;
  const m11 = m[0], m21 = m[1], m31 = m[2];
  m[4];
  const m22 = m[5];
  m[6];
  const m13 = m[8], m23 = m[9], m33 = m[10];
  const pitch = Math.asin(-clamp$1(m23, -1, 1));
  let yaw, roll;
  if (Math.abs(m23) < 0.9999999) {
    yaw = Math.atan2(m13, m33);
    roll = Math.atan2(m21, m22);
  } else {
    yaw = Math.atan2(-m31, m11);
    roll = 0;
  }
  return { pitch, yaw, roll };
}
function blendshapeMap(categories) {
  const out = {};
  for (const c of categories || []) if (c && typeof c.categoryName === "string") out[c.categoryName] = finite$1(c.score);
  return out;
}
const ramp = (v, lo, hi) => clamp$1((v - lo) / (hi - lo), 0, 1);
function expressionsFromBlendshapes(b, { mirror = true, mouthGain = 1 } = {}) {
  const get = (k) => finite$1(b[k]);
  const blinkL = ramp(get("eyeBlinkLeft"), 0.2, 0.75), blinkR = ramp(get("eyeBlinkRight"), 0.2, 0.75);
  const lift = (v) => clamp$1(Math.pow(v, 0.7) * mouthGain, 0, 1);
  const jaw = lift(ramp(get("jawOpen"), 0.04, 0.38));
  const funnel = ramp(get("mouthFunnel"), 0.08, 0.5), pucker = ramp(get("mouthPucker"), 0.08, 0.55);
  const smile = ramp((get("mouthSmileLeft") + get("mouthSmileRight")) / 2, 0.12, 0.55);
  const frown = ramp((get("mouthFrownLeft") + get("mouthFrownRight")) / 2, 0.12, 0.55);
  const browUp = ramp(get("browInnerUp"), 0.1, 0.6);
  const browOuterUp = ramp((get("browOuterUpLeft") + get("browOuterUpRight")) / 2, 0.1, 0.6);
  const browDown = ramp((get("browDownLeft") + get("browDownRight")) / 2, 0.15, 0.7);
  const wide = ramp((get("eyeWideLeft") + get("eyeWideRight")) / 2, 0.12, 0.6);
  const stretch = ramp((get("mouthStretchLeft") + get("mouthStretchRight")) / 2, 0.12, 0.6);
  const tongue = ramp(get("tongueOut"), 0.12, 0.6);
  const blink = Math.min(blinkL, blinkR);
  const eyeL = mirror ? blinkR : blinkL, eyeR = mirror ? blinkL : blinkR;
  const open = jaw * (1 - 0.5 * Math.max(funnel, pucker));
  const round = Math.max(funnel, pucker) * (0.4 + 0.6 * jaw);
  const lidDrop = ramp((get("eyeBlinkLeft") + get("eyeBlinkRight")) / 2, 0.18, 0.5) * (1 - blink);
  const bored = clamp$1(lidDrop * (1 - smile) * (1 - jaw) * (0.5 + 0.5 * Math.max(frown, browDown, 0.2)), 0, 1);
  return {
    blink,
    // a wink must not also trigger the full blink: report each eye only by how much it exceeds the other
    blinkLeft: Math.max(0, eyeL - blink),
    blinkRight: Math.max(0, eyeR - blink),
    aa: open * (1 - stretch * 0.4),
    oh: round * (1 - pucker * 0.6),
    ou: pucker * (0.5 + 0.5 * (1 - jaw)),
    ee: stretch * (1 - jaw * 0.3) * (0.4 + 0.6 * smile),
    ih: stretch * 0.3 * (1 - jaw * 0.5),
    happy: smile * (1 - jaw * 0.3),
    sad: Math.max(frown, browUp * 0.5 * (1 - smile)) * (1 - smile),
    angry: browDown * (1 - browUp) * (1 - smile * 0.5),
    surprised: Math.max(wide, browUp * jaw) * (1 - browDown),
    relaxed: bored * 0.6,
    // not VRM presets: the viewer drives the base's brow / tongue morph targets with these when it has them
    browUp: Math.max(browUp, browOuterUp),
    browDown,
    browInner: browUp,
    tongue,
    bored
  };
}
function headFromEuler(e, { mirror = true, offset = { x: 0, y: 0, z: 0 } } = {}) {
  const x = e.pitch, y = mirror ? -e.yaw : e.yaw, z = mirror ? -e.roll : e.roll;
  return {
    x: clamp$1(x - offset.x, -LIMITS$1.pitch, LIMITS$1.pitch),
    y: clamp$1(y - offset.y, -LIMITS$1.yaw, LIMITS$1.yaw),
    z: clamp$1(z - offset.z, -LIMITS$1.roll, LIMITS$1.roll)
  };
}
const EXPRESSION_KEYS = [
  "blink",
  "blinkLeft",
  "blinkRight",
  "aa",
  "oh",
  "ou",
  "ee",
  "ih",
  "happy",
  "sad",
  "angry",
  "surprised",
  "relaxed",
  "browUp",
  "browDown",
  "browInner",
  "tongue",
  "bored"
];
class FaceTracker {
  constructor({ mirror = true, smoothing = 1, mouthGain = 1 } = {}) {
    this.mirror = mirror;
    this.mouthGain = mouthGain;
    const cutoff = (c) => ({ minCutoff: c * smoothing, beta: 0.03 });
    this.head = { x: new OneEuro(cutoff(1.4)), y: new OneEuro(cutoff(1.4)), z: new OneEuro(cutoff(1.4)) };
    this.expr = Object.fromEntries(EXPRESSION_KEYS.map((k) => [k, new OneEuro({ minCutoff: k.startsWith("blink") ? 8 : 2.2, beta: k.startsWith("blink") ? 0.5 : 0.05 })]));
    this.offset = { x: 0, y: 0, z: 0 };
    this.last = null;
  }
  /** Treat the current pose as "looking straight". */
  recenter() {
    if (!this.lastRaw) return false;
    const h = headFromEuler(this.lastRaw, { mirror: this.mirror });
    this.offset = { x: h.x, y: h.y, z: h.z };
    for (const f of Object.values(this.head)) f.reset();
    return true;
  }
  reset() {
    for (const f of Object.values(this.head)) f.reset();
    for (const f of Object.values(this.expr)) f.reset();
    this.lastRaw = null;
    this.last = null;
  }
  /** result: { facialTransformationMatrixes: [{data}], faceBlendshapes: [{categories}] } | null. Returns a frame or null if no face. */
  process(result, tSeconds) {
    var _a, _b, _c, _d;
    const matrix = (_b = (_a = result == null ? void 0 : result.facialTransformationMatrixes) == null ? void 0 : _a[0]) == null ? void 0 : _b.data;
    const euler = eulerFromMatrix(matrix);
    if (!euler) {
      this.lastRaw = null;
      this.last = null;
      return null;
    }
    this.lastRaw = euler;
    const rawHead = headFromEuler(euler, { mirror: this.mirror, offset: this.offset });
    const head = { x: this.head.x.filter(rawHead.x, tSeconds), y: this.head.y.filter(rawHead.y, tSeconds), z: this.head.z.filter(rawHead.z, tSeconds) };
    const targets = expressionsFromBlendshapes(blendshapeMap((_d = (_c = result == null ? void 0 : result.faceBlendshapes) == null ? void 0 : _c[0]) == null ? void 0 : _d.categories), { mirror: this.mirror, mouthGain: this.mouthGain });
    const expressions = {};
    for (const k of EXPRESSION_KEYS) expressions[k] = clamp$1(this.expr[k].filter(targets[k], tSeconds), 0, 1);
    this.last = { head, expressions };
    return this.last;
  }
}
const MP_VERSION = "0.10.14";
const DEFAULT_WASM_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/wasm`;
const DEFAULT_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
const CAMERA_MESSAGES = {
  unsupported: "Este navegador não permite usar a câmera aqui. Abra o site em HTTPS no Chrome, Edge, Firefox ou Safari atualizado.",
  denied: "A câmera está bloqueada para este site. Clique no cadeado ao lado do endereço, permita a câmera e tente de novo.",
  "no-camera": "Não encontrei nenhuma câmera neste computador. Conecte uma e tente de novo.",
  busy: "A câmera está em uso por outro programa. Feche-o e tente de novo.",
  "load-failed": "Não consegui carregar o reconhecimento facial. Verifique a conexão e tente de novo.",
  error: "Não foi possível ligar a câmera agora. Tente de novo."
};
function classifyCameraError(error) {
  const name = (error == null ? void 0 : error.name) || "";
  if (name === "NotAllowedError" || name === "SecurityError" || name === "PermissionDeniedError") return "denied";
  if (name === "NotFoundError" || name === "DevicesNotFoundError" || name === "OverconstrainedError") return "no-camera";
  if (name === "NotReadableError" || name === "TrackStartError" || name === "AbortError") return "busy";
  return "error";
}
async function defaultLoadLandmarker({ wasmBase = DEFAULT_WASM_BASE, modelUrl = DEFAULT_MODEL_URL } = {}) {
  const vision = await import("@mediapipe/tasks-vision");
  const fileset = await vision.FilesetResolver.forVisionTasks(wasmBase);
  const options = (delegate) => ({
    baseOptions: { modelAssetPath: modelUrl, delegate },
    runningMode: "VIDEO",
    numFaces: 1,
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true
  });
  try {
    return await vision.FaceLandmarker.createFromOptions(fileset, options("GPU"));
  } catch {
    return await vision.FaceLandmarker.createFromOptions(fileset, options("CPU"));
  }
}
function defaultEnv() {
  return {
    mediaDevices: typeof navigator !== "undefined" ? navigator.mediaDevices : void 0,
    createVideo() {
      const video = document.createElement("video");
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("aria-hidden", "true");
      video.style.cssText = "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px";
      document.body.appendChild(video);
      return video;
    },
    schedule: (fn, ms) => setTimeout(fn, ms),
    cancel: (id) => clearTimeout(id),
    now: () => typeof performance !== "undefined" ? performance.now() : Date.now(),
    isHidden: () => typeof document !== "undefined" && document.hidden
  };
}
function createCameraTracker({
  onFrame,
  onState,
  mirror = true,
  smoothing = 1,
  fps = 30,
  loadLandmarker = defaultLoadLandmarker,
  landmarkerOptions,
  env: envOverride,
  faceLostMs = 600
} = {}) {
  const env = { ...defaultEnv(), ...envOverride || {} };
  const tracker = new FaceTracker({ mirror, smoothing });
  let state = "off", session = 0, stream = null, video = null, landmarker = null, timer = null, lastFaceAt = 0, lastVideoTime = -1;
  const setState = (next, message) => {
    state = next;
    onState == null ? void 0 : onState(next, { message: message ?? CAMERA_MESSAGES[next] });
  };
  function release() {
    var _a, _b, _c;
    if (timer !== null) {
      env.cancel(timer);
      timer = null;
    }
    if (stream) {
      for (const track of stream.getTracks()) {
        try {
          track.stop();
        } catch {
        }
      }
      stream = null;
    }
    if (video) {
      try {
        (_a = video.pause) == null ? void 0 : _a.call(video);
        video.srcObject = null;
        (_b = video.remove) == null ? void 0 : _b.call(video);
      } catch {
      }
      video = null;
    }
    if (landmarker) {
      try {
        (_c = landmarker.close) == null ? void 0 : _c.call(landmarker);
      } catch {
      }
      landmarker = null;
    }
  }
  function fail(ticket, kind) {
    if (ticket !== session) return;
    release();
    tracker.reset();
    onFrame == null ? void 0 : onFrame(null);
    setState(kind);
  }
  async function start() {
    var _a, _b;
    if (state !== "off" && state !== "denied" && state !== "no-camera" && state !== "busy" && state !== "unsupported" && state !== "load-failed" && state !== "error") return false;
    const ticket = ++session;
    if (!((_a = env.mediaDevices) == null ? void 0 : _a.getUserMedia)) {
      setState("unsupported");
      return false;
    }
    setState("starting", "Aguardando a permissão da câmera…");
    try {
      const media = await env.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }, audio: false });
      if (ticket !== session) {
        for (const t of media.getTracks()) t.stop();
        return false;
      }
      stream = media;
    } catch (error) {
      fail(ticket, classifyCameraError(error));
      return false;
    }
    setState("loading", "Carregando o reconhecimento facial…");
    try {
      video = env.createVideo();
      video.srcObject = stream;
      await ((_b = video.play) == null ? void 0 : _b.call(video));
      landmarker = await loadLandmarker(landmarkerOptions);
    } catch (error) {
      fail(ticket, (error == null ? void 0 : error.name) && classifyCameraError(error) !== "error" ? classifyCameraError(error) : "load-failed");
      return false;
    }
    if (ticket !== session) {
      release();
      return false;
    }
    tracker.reset();
    lastFaceAt = env.now();
    lastVideoTime = -1;
    setState("on", "Câmera ligada");
    loop(ticket);
    return true;
  }
  function loop(ticket) {
    if (ticket !== session || !landmarker || !video) return;
    const interval = 1e3 / fps;
    try {
      const nowMs = env.now();
      const ready = !env.isHidden() && (video.readyState === void 0 || video.readyState >= 2);
      const fresh = video.currentTime === void 0 || video.currentTime !== lastVideoTime;
      if (ready && fresh) {
        lastVideoTime = video.currentTime;
        const result = landmarker.detectForVideo(video, nowMs);
        const frame = tracker.process(result, nowMs / 1e3);
        if (frame) {
          lastFaceAt = nowMs;
          if (state === "no-face") setState("on", "Câmera ligada");
          onFrame == null ? void 0 : onFrame(frame);
        } else if (nowMs - lastFaceAt > faceLostMs) {
          if (state === "on") {
            setState("no-face", "Não estou vendo seu rosto. Fique de frente para a câmera.");
            onFrame == null ? void 0 : onFrame(null);
          }
        }
      }
    } catch (error) {
      if (++loop.failures > 30) {
        loop.failures = 0;
        fail(ticket, "error");
        return;
      }
    }
    timer = env.schedule(() => loop(ticket), interval);
  }
  loop.failures = 0;
  function stop() {
    session++;
    const was = state;
    release();
    tracker.reset();
    if (was !== "off") {
      onFrame == null ? void 0 : onFrame(null);
      setState("off");
    }
  }
  return {
    start,
    stop,
    recenter: () => tracker.recenter(),
    setMirror: (value) => {
      tracker.mirror = !!value;
      tracker.reset();
    },
    /** Mouth sensitivity (0.5 = shy, 1 = default, 2 = very sensitive). Takes effect on the next frame. */
    setMouthGain: (value) => {
      tracker.mouthGain = Math.min(3, Math.max(0.3, Number(value) || 1));
    },
    /** The live camera element, for a side-by-side preview (null when off). The caller must not start/stop it. */
    get video() {
      return video;
    },
    get state() {
      return state;
    }
  };
}
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const finite = (v, d = 0) => Number.isFinite(v) ? v : d;
const DEG = Math.PI / 180;
const v3 = {
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  norm: (a) => {
    const l = Math.hypot(a[0], a[1], a[2]);
    return l > 1e-9 ? [a[0] / l, a[1] / l, a[2] / l] : null;
  },
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
};
const q = {
  ident: () => [0, 0, 0, 1],
  mul: (a, b) => [
    a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
    a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
    a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
    a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]
  ],
  inv: (a) => [-a[0], -a[1], -a[2], a[3]],
  rotate: (a, v) => {
    const t = v3.cross([a[0], a[1], a[2]], v).map((x) => 2 * x);
    const c = v3.cross([a[0], a[1], a[2]], t);
    return [v[0] + a[3] * t[0] + c[0], v[1] + a[3] * t[1] + c[1], v[2] + a[3] * t[2] + c[2]];
  },
  axisAngle: (axis, angle) => {
    const s = Math.sin(angle / 2);
    return [axis[0] * s, axis[1] * s, axis[2] * s, Math.cos(angle / 2)];
  },
  fromUnitVectors: (from, to) => {
    const d = v3.dot(from, to);
    if (d > 0.999999) return [0, 0, 0, 1];
    if (d < -0.999999) {
      const axis = Math.abs(from[0]) < 0.9 ? v3.norm(v3.cross(from, [1, 0, 0])) : v3.norm(v3.cross(from, [0, 1, 0]));
      return [axis[0], axis[1], axis[2], 0];
    }
    const c = v3.cross(from, to);
    const out = [c[0], c[1], c[2], 1 + d];
    const l = Math.hypot(...out);
    return out.map((x) => x / l);
  },
  angle: (a) => 2 * Math.acos(clamp(Math.abs(a[3]), 0, 1)),
  slerp: (a, b, t) => {
    let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    let bb = b;
    if (d < 0) {
      d = -d;
      bb = b.map((x) => -x);
    }
    if (d > 0.9995) {
      const o = a.map((x, i) => x + (bb[i] - x) * t);
      const l = Math.hypot(...o);
      return o.map((x) => x / l);
    }
    const th = Math.acos(d), s = Math.sin(th), wa = Math.sin((1 - t) * th) / s, wb = Math.sin(t * th) / s;
    return a.map((x, i) => x * wa + bb[i] * wb);
  },
  /** Rotate `a` toward `b` by at most `maxAngle` radians. */
  towards: (a, b, maxAngle) => {
    const delta = q.mul(q.inv(a), b);
    const ang = q.angle(delta);
    if (ang <= maxAngle || ang < 1e-6) return b;
    return q.slerp(a, b, maxAngle / ang);
  }
};
const POSE = { lShoulder: 11, rShoulder: 12, lElbow: 13, rElbow: 14, lWrist: 15, rWrist: 16, lHip: 23, rHip: 24 };
const LIMITS = {
  upperArmBehindBack: 35 * DEG,
  // how far behind the torso plane the upper arm may go
  elbowMax: 150 * DEG,
  // flexion
  maxSpeed: 7
  // rad/s for any bone
};
const REST_DIR = { left: [1, 0, 0], right: [-1, 0, 0] };
const IDLE_ANGLE = 1.15;
const idleQuat = (side) => q.axisAngle([0, 0, 1], side === "left" ? -IDLE_ANGLE : IDLE_ANGLE);
function toAvatar(p, mirror) {
  return [mirror ? -p.x : p.x, -p.y, -p.z];
}
function pinMin(vec, axis, limit, sign = 1) {
  if (vec[axis] * sign >= limit * sign) return vec;
  const rest = [0, 1, 2].filter((i) => i !== axis);
  const planar = Math.hypot(vec[rest[0]], vec[rest[1]]);
  const out = [0, 0, 0];
  out[axis] = limit;
  const scale = Math.sqrt(Math.max(0, 1 - limit * limit));
  if (planar < 1e-6) {
    out[rest[0]] = rest[0] === 1 ? -scale : 0;
    out[rest[1]] = rest[1] === 1 ? -scale : 0;
    return out;
  }
  out[rest[0]] = vec[rest[0]] / planar * scale;
  out[rest[1]] = vec[rest[1]] / planar * scale;
  return out;
}
const vis = (p) => p && Number.isFinite(p.x) ? finite(p.visibility, 1) : 0;
function solveArm(pose, side, { mirror = true } = {}) {
  const userSide = side === "left" === mirror ? "r" : "l";
  const S = pose[userSide === "l" ? POSE.lShoulder : POSE.rShoulder], E = pose[userSide === "l" ? POSE.lElbow : POSE.rElbow], W = pose[userSide === "l" ? POSE.lWrist : POSE.rWrist];
  const confidence = Math.min(vis(S), vis(E), vis(W));
  if (!S || !E || !W || confidence <= 0) return null;
  const s = toAvatar(S, mirror), e = toAvatar(E, mirror), w = toAvatar(W, mirror);
  let du = v3.norm(v3.sub(e, s)), dl = v3.norm(v3.sub(w, e));
  if (!du || !dl) return null;
  du = pinMin(du, 2, Math.sin(-LIMITS.upperArmBehindBack));
  const outward = side === "left" ? 1 : -1;
  du = pinMin(du, 0, -0.45 * outward, outward);
  const rest = REST_DIR[side];
  const upper = q.fromUnitVectors(rest, du);
  let local = v3.norm(q.rotate(q.inv(upper), dl));
  const flex = Math.acos(clamp(v3.dot(local, rest), -1, 1));
  if (flex > LIMITS.elbowMax) {
    const axis = v3.norm(v3.cross(rest, local)) ?? [0, 0, 1];
    local = q.rotate(q.axisAngle(axis, LIMITS.elbowMax), rest);
  }
  return { upper, lower: q.fromUnitVectors(rest, local), confidence };
}
function fingerCurls(hand) {
  if (!hand || hand.length < 21 || !hand.every((p) => p && Number.isFinite(p.x))) return null;
  const P = hand.map((p) => [p.x, p.y, p.z ?? 0]);
  const out = {};
  const fingers = { index: [5, 6, 7, 8], middle: [9, 10, 11, 12], ring: [13, 14, 15, 16], pinky: [17, 18, 19, 20] };
  for (const [name, [mcp, pip, dip, tip]] of Object.entries(fingers)) {
    const a = v3.norm(v3.sub(P[pip], P[mcp])), b = v3.norm(v3.sub(P[dip], P[pip])), c = v3.norm(v3.sub(P[tip], P[dip]));
    if (!a || !b || !c) {
      out[name] = 0;
      continue;
    }
    const bendP = Math.acos(clamp(v3.dot(a, b), -1, 1)), bendD = Math.acos(clamp(v3.dot(b, c), -1, 1));
    const palm = v3.norm(v3.sub(P[mcp], P[0]));
    const bendM = palm ? Math.max(0, Math.acos(clamp(v3.dot(palm, a), -1, 1)) - 12 * DEG) : 0;
    out[name] = clamp(bendM / (70 * DEG) * 0.4 + bendP / (95 * DEG) * 0.4 + bendD / (65 * DEG) * 0.2, 0, 1);
  }
  return out;
}
const TORSO_LIMITS = { pitch: 18 * DEG, yaw: 25 * DEG, roll: 16 * DEG };
const TORSO_MAX_SPEED = 2.2;
function solveTorso(pose, { mirror = true } = {}) {
  const L = pose[POSE.lShoulder], R = pose[POSE.rShoulder];
  const confidence = Math.min(vis(L), vis(R));
  if (!L || !R || confidence <= 0) return null;
  const dx = L.x - R.x, dy = L.y - R.y, dz = L.z - R.z;
  const width = Math.hypot(dx, dy, dz);
  if (!(width > 1e-4)) return null;
  let roll = Math.atan2(dy, Math.abs(dx) < 1e-6 ? 1e-6 : dx);
  roll = Math.abs(roll) > Math.PI / 2 ? 0 : roll;
  let yaw = Math.asin(clamp(dz / width, -1, 1));
  let pitch = 0;
  const lh = pose[POSE.lHip], rh = pose[POSE.rHip];
  if (lh && rh && Math.min(vis(lh), vis(rh)) > 0.4) {
    const sm = [(L.x + R.x) / 2, (L.y + R.y) / 2, (L.z + R.z) / 2], hm = [(lh.x + rh.x) / 2, (lh.y + rh.y) / 2, (lh.z + rh.z) / 2];
    const trunk = v3.norm(v3.sub(sm, hm));
    if (trunk) pitch = Math.atan2(-trunk[2], -trunk[1]);
  }
  roll = mirror ? roll : -roll;
  yaw = mirror ? -yaw : yaw;
  return { x: clamp(finite(pitch), -TORSO_LIMITS.pitch, TORSO_LIMITS.pitch), y: clamp(finite(yaw), -TORSO_LIMITS.yaw, TORSO_LIMITS.yaw), z: clamp(finite(roll), -TORSO_LIMITS.roll, TORSO_LIMITS.roll), confidence };
}
class BodyTracker {
  constructor({ mirror = true, holds = {}, trackTau = 0.1, idleTau = 0.45, minConfidence = 0.55, trackTorso = true } = {}) {
    this.mirror = mirror;
    this.holds = holds;
    this.trackTau = trackTau;
    this.idleTau = idleTau;
    this.minConfidence = minConfidence;
    this.trackTorso = trackTorso;
    this.torso = { x: 0, y: 0, z: 0 };
    this.state = {};
    for (const side of ["left", "right"]) this.state[side] = { upper: idleQuat(side), lower: q.ident(), weight: 0, fingers: { index: 0, middle: 0, ring: 0, pinky: 0 } };
    this.lostFor = { left: 0, right: 0 };
  }
  reset() {
    this.torso = { x: 0, y: 0, z: 0 };
    for (const side of ["left", "right"]) {
      this.state[side] = { upper: idleQuat(side), lower: q.ident(), weight: 0, fingers: { index: 0, middle: 0, ring: 0, pinky: 0 } };
      this.lostFor[side] = 0;
    }
  }
  /** Trunk lean/twist: smoothed, clamped, eases to upright when the person is lost. Returns Euler radians {x: pitch, y: yaw, z: roll}. */
  _torso(pose, dt) {
    const st = this.torso;
    const solved = this.trackTorso && pose ? solveTorso(pose, { mirror: this.mirror }) : null;
    const good = !!solved && solved.confidence >= this.minConfidence;
    const tgt = good ? solved : { x: 0, y: 0, z: 0 };
    const k = 1 - Math.exp(-dt / (good ? this.trackTau * 1.6 : this.idleTau));
    const maxStep = TORSO_MAX_SPEED * dt;
    for (const axis of ["x", "y", "z"]) st[axis] += clamp((tgt[axis] - st[axis]) * k, -maxStep, maxStep);
    return { x: st.x, y: st.y, z: st.z, tracking: good };
  }
  /** pose: array of world landmarks | null, hands: { left?: landmarks, right?: landmarks } | null, dt seconds. Returns the bone targets. */
  update(pose, hands, dt) {
    dt = clamp(finite(dt, 1 / 30), 1e-3, 0.1);
    const out = { left: null, right: null, torso: null };
    out.torso = this._torso(pose, dt);
    for (const side of ["left", "right"]) {
      const st = this.state[side];
      if (this.holds[side]) {
        st.upper = this.holds[side].upper;
        st.lower = this.holds[side].lower ?? q.ident();
        st.weight = 1;
        out[side] = { ...st, held: true };
        continue;
      }
      const solved = pose ? solveArm(pose, side, { mirror: this.mirror }) : null;
      const good = !!solved && solved.confidence >= this.minConfidence;
      let tu, tl, tau;
      if (good) {
        tu = solved.upper;
        tl = solved.lower;
        tau = this.trackTau;
        this.lostFor[side] = 0;
      } else {
        tu = idleQuat(side);
        tl = q.ident();
        tau = this.idleTau;
        this.lostFor[side] += dt;
      }
      const k = 1 - Math.exp(-dt / tau);
      const maxStep = LIMITS.maxSpeed * dt;
      st.upper = q.towards(st.upper, q.slerp(st.upper, tu, k), maxStep);
      st.lower = q.towards(st.lower, q.slerp(st.lower, tl, k), maxStep);
      st.weight += ((good ? 1 : 0) - st.weight) * (1 - Math.exp(-dt / (good ? 0.15 : this.idleTau)));
      const hand = good && hands ? hands[side] : null;
      const curls = hand ? fingerCurls(hand) : null;
      for (const f of Object.keys(st.fingers)) st.fingers[f] += ((curls ? curls[f] : 0) - st.fingers[f]) * (1 - Math.exp(-dt / (curls ? 0.08 : 0.3)));
      out[side] = { upper: st.upper, lower: st.lower, weight: st.weight, fingers: { ...st.fingers }, held: false, tracking: good };
    }
    return out;
  }
}
const POSE_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";
const HAND_MODEL_URL = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
async function defaultLoad({ wasmBase = DEFAULT_WASM_BASE } = {}) {
  const vision = await import("@mediapipe/tasks-vision");
  const fileset = await vision.FilesetResolver.forVisionTasks(wasmBase);
  const make = async (Klass, extra) => {
    const options = (delegate) => ({ baseOptions: { modelAssetPath: extra.url, delegate }, runningMode: "VIDEO", ...extra.options });
    try {
      return await Klass.createFromOptions(fileset, options("GPU"));
    } catch {
      return Klass.createFromOptions(fileset, options("CPU"));
    }
  };
  const pose = await make(vision.PoseLandmarker, { url: POSE_MODEL_URL, options: { numPoses: 1 } });
  const hands = await make(vision.HandLandmarker, { url: HAND_MODEL_URL, options: { numHands: 2 } });
  return { pose, hands };
}
function createBodyTracker({ getVideo, onFrame, onState, mirror = true, fps = 20, holds = {}, load = defaultLoad, env: envOverride } = {}) {
  const env = { schedule: (fn, ms) => setTimeout(fn, ms), cancel: (id) => clearTimeout(id), now: () => performance.now(), isHidden: () => typeof document !== "undefined" && document.hidden, ...envOverride || {} };
  const body = new BodyTracker({ mirror, holds });
  let state = "off", session = 0, models = null, timer = null, lastTime = null, failures = 0, lastVideoTime = -1;
  const set = (s, message) => {
    state = s;
    onState == null ? void 0 : onState(s, { message });
  };
  async function start() {
    if (state === "loading" || state === "on") return false;
    const ticket = ++session;
    set("loading", "Carregando o rastreamento de braços e mãos…");
    try {
      models = await load();
    } catch {
      if (ticket === session) {
        set("load-failed", "Não consegui carregar o rastreamento de braços e mãos. O rosto continua funcionando.");
      }
      return false;
    }
    if (ticket !== session) {
      close(models);
      models = null;
      return false;
    }
    body.reset();
    lastTime = null;
    failures = 0;
    set("on", "Braços e mãos ligados");
    loop(ticket);
    return true;
  }
  function close(m) {
    var _a, _b;
    for (const k of ["pose", "hands"]) {
      try {
        (_b = (_a = m == null ? void 0 : m[k]) == null ? void 0 : _a.close) == null ? void 0 : _b.call(_a);
      } catch {
      }
    }
  }
  function loop(ticket) {
    var _a, _b;
    if (ticket !== session || !models) return;
    try {
      const video = getVideo == null ? void 0 : getVideo();
      const nowMs = env.now();
      const dt = lastTime === null ? 1 / fps : (nowMs - lastTime) / 1e3;
      lastTime = nowMs;
      let pose = null, hands = null;
      if (video && !env.isHidden() && (video.readyState === void 0 || video.readyState >= 2) && (video.currentTime === void 0 || video.currentTime !== lastVideoTime)) {
        lastVideoTime = video.currentTime;
        const p = models.pose.detectForVideo(video, nowMs);
        pose = ((_a = p == null ? void 0 : p.worldLandmarks) == null ? void 0 : _a[0]) ?? null;
        const h = models.hands.detectForVideo(video, nowMs);
        if ((_b = h == null ? void 0 : h.landmarks) == null ? void 0 : _b.length) {
          hands = {};
          h.landmarks.forEach((lm, i) => {
            var _a2, _b2, _c;
            const label = (_c = (_b2 = (_a2 = h.handedness) == null ? void 0 : _a2[i]) == null ? void 0 : _b2[0]) == null ? void 0 : _c.categoryName;
            const userRight = label === "Right";
            const avatarSide = userRight === mirror ? "left" : "right";
            hands[avatarSide] = lm;
          });
        }
      }
      onFrame == null ? void 0 : onFrame(body.update(pose, hands, Math.min(dt, 0.1)));
      failures = 0;
    } catch {
      if (++failures > 30) {
        stop();
        set("error", "O rastreamento de braços e mãos parou. O rosto continua funcionando.");
        return;
      }
    }
    timer = env.schedule(() => loop(ticket), 1e3 / fps);
  }
  function stop() {
    session++;
    if (timer !== null) {
      env.cancel(timer);
      timer = null;
    }
    close(models);
    models = null;
    body.reset();
    if (state !== "off") {
      onFrame == null ? void 0 : onFrame(null);
      set("off");
    }
  }
  return { start, stop, get state() {
    return state;
  } };
}
const FUSION_DEFAULTS = Object.freeze({ maxAssist: 0.55, gain: 5, floorLevel: 0.012 });
function assistFromLevel(level, gateOpen, { maxAssist = FUSION_DEFAULTS.maxAssist, gain = FUSION_DEFAULTS.gain, floorLevel = FUSION_DEFAULTS.floorLevel } = {}) {
  if (!gateOpen) return 0;
  const lv = Number.isFinite(level) && level > 0 ? level : 0;
  return Math.min(maxAssist, Math.max(0, (lv - floorLevel) * gain));
}
function createMouthAssist({ enabled = true, thresholds = VOICE_DEFAULTS, options } = {}) {
  const gate = createVoiceGate(thresholds);
  let on = !!enabled, assist = 0, smooth = 0;
  return {
    get enabled() {
      return on;
    },
    get assist() {
      return assist;
    },
    get speaking() {
      return gate.talking;
    },
    configure(t) {
      gate.configure(t);
    },
    setEnabled(v) {
      on = !!v;
      if (!on) {
        gate.reset();
        assist = 0;
        smooth = 0;
      }
    },
    update(level, dtMs) {
      if (!on) return 0;
      const open = gate.update(level, dtMs);
      const target = assistFromLevel(level, open, options);
      smooth += (target - smooth) * (target > smooth ? 0.6 : 0.25);
      assist = smooth < 0.01 ? 0 : smooth;
      return assist;
    }
  };
}
function createMicLevel({ onLevel, onState, env: envOverride } = {}) {
  const env = {
    getUserMedia: (c) => navigator.mediaDevices.getUserMedia(c),
    AudioContext: typeof AudioContext !== "undefined" ? AudioContext : null,
    schedule: (fn, ms) => setTimeout(fn, ms),
    cancel: (id) => clearTimeout(id),
    now: () => performance.now(),
    ...envOverride || {}
  };
  let state = "off", session = 0, stream = null, ctx = null, analyser = null, buf = null, timer = null;
  const set = (s, message) => {
    state = s;
    onState == null ? void 0 : onState(s, { message });
  };
  const MESSAGES = { denied: "Sem permissão do microfone. O avatar segue só a câmera.", "no-mic": "Nenhum microfone encontrado. O avatar segue só a câmera.", unsupported: "Este navegador não permite medir o microfone.", error: "Não consegui usar o microfone." };
  const kind = (e) => {
    const n = e == null ? void 0 : e.name;
    if (n === "NotAllowedError" || n === "SecurityError" || n === "PermissionDeniedError") return "denied";
    if (n === "NotFoundError" || n === "DevicesNotFoundError") return "no-mic";
    return "error";
  };
  async function start() {
    if (state === "on" || state === "starting") return false;
    if (!env.AudioContext || !env.getUserMedia) {
      set("unsupported", MESSAGES.unsupported);
      return false;
    }
    const ticket = ++session;
    set("starting", "Aguardando a permissão do microfone…");
    try {
      const media = await env.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false });
      if (ticket !== session) {
        media.getTracks().forEach((t) => t.stop());
        return false;
      }
      stream = media;
      ctx = new env.AudioContext();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      buf = new Uint8Array(analyser.fftSize);
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      set("on", "Microfone ligado");
      loop(ticket);
      return true;
    } catch (e) {
      cleanup();
      const k = kind(e);
      set(k, MESSAGES[k]);
      return false;
    }
  }
  function loop(ticket) {
    if (ticket !== session || !analyser) return;
    analyser.getByteTimeDomainData(buf);
    let s = 0;
    for (let i = 0; i < buf.length; i++) {
      const v = (buf[i] - 128) / 128;
      s += v * v;
    }
    onLevel == null ? void 0 : onLevel(Math.sqrt(s / buf.length), env.now());
    timer = env.schedule(() => loop(ticket), 33);
  }
  function cleanup() {
    var _a;
    if (timer !== null) {
      env.cancel(timer);
      timer = null;
    }
    try {
      stream == null ? void 0 : stream.getTracks().forEach((t) => t.stop());
    } catch {
    }
    try {
      (_a = ctx == null ? void 0 : ctx.close) == null ? void 0 : _a.call(ctx);
    } catch {
    }
    stream = ctx = analyser = buf = null;
  }
  function stop() {
    session++;
    cleanup();
    if (state !== "off") {
      onLevel == null ? void 0 : onLevel(0, env.now());
      set("off");
    }
  }
  return { start, stop, get state() {
    return state;
  } };
}
const CAMERA_TEXT = {
  open: "Câmera",
  close: "Fechar",
  title: "Copiar meus movimentos",
  explain: "O avatar vai imitar seu rosto, a cabeça e as expressões usando a sua câmera.",
  privacy: "A imagem é analisada só neste aparelho. Nada é enviado, gravado ou salvo, e a câmera só fica ligada enquanto você não clicar em Desligar.",
  start: "Ligar câmera",
  stop: "Desligar câmera",
  recenter: "Centralizar",
  starting: "Aguardando a permissão da câmera…",
  loading: "Carregando o reconhecimento facial…",
  on: "Câmera ligada",
  noFace: "Não estou vendo seu rosto. Fique de frente para a câmera.",
  mouthGain: "Sensibilidade da boca",
  showPreview: "Mostrar minha câmera ao lado do avatar",
  previewLabel: "Sua câmera (espelhada)",
  followBody: "Seguir meus braços e mãos",
  assistMouth: "Ajudar a boca com o som do microfone",
  assistHint: "Pede o microfone. Só mede o volume: nada é gravado nem enviado.",
  assistOnHint: "Microfone só mede o volume para abrir a boca quando você fala. Nada é gravado nem enviado.",
  assistOffHint: "Desligado: a boca segue só a câmera.",
  bodyHint: "Mostre os braços para a câmera. Se me perder, o avatar volta ao normal.",
  bodyOnHint: "Braços e mãos ligados. Movimentos limitados e suavizados."
};
const BUSY = /* @__PURE__ */ new Set(["starting", "loading"]);
const FAILED = /* @__PURE__ */ new Set(["denied", "no-camera", "busy", "unsupported", "load-failed", "error"]);
function CameraControl({ getPlayer, text = CAMERA_TEXT, createTracker = createCameraTracker, position = "bottom-right", holds = {}, bodyTracking = true }) {
  const [panel, setPanel] = useState(false);
  const [state, setState] = useState("off");
  const [message, setMessage] = useState("");
  const trackerRef = useRef(null);
  const live = state === "on" || state === "no-face";
  const busy = BUSY.has(state);
  useEffect(() => () => {
    var _a;
    (_a = trackerRef.current) == null ? void 0 : _a.stop();
    trackerRef.current = null;
  }, []);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && panel && !busy) setPanel(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, busy]);
  function ensureTracker() {
    if (!trackerRef.current) {
      trackerRef.current = createTracker({
        onFrame: (frame) => {
          var _a, _b;
          return (_b = (_a = getPlayer()) == null ? void 0 : _a.setTracking) == null ? void 0 : _b.call(_a, frame);
        },
        onState: (next, detail) => {
          setState(next);
          setMessage((detail == null ? void 0 : detail.message) || "");
        }
      });
    }
    return trackerRef.current;
  }
  const turnOn = () => {
    void ensureTracker().start();
  };
  const turnOff = () => {
    var _a, _b, _c, _d, _e, _f;
    (_a = bodyRef.current) == null ? void 0 : _a.stop();
    (_b = trackerRef.current) == null ? void 0 : _b.stop();
    (_d = (_c = getPlayer()) == null ? void 0 : _c.setTracking) == null ? void 0 : _d.call(_c, null);
    (_f = (_e = getPlayer()) == null ? void 0 : _e.setArms) == null ? void 0 : _f.call(_e, null);
    setBodyState("off");
  };
  const bodyRef = useRef(null);
  const [bodyState, setBodyState] = useState("off");
  const [bodyMsg, setBodyMsg] = useState("");
  useEffect(() => () => {
    var _a;
    (_a = bodyRef.current) == null ? void 0 : _a.stop();
    bodyRef.current = null;
  }, []);
  useEffect(() => {
    if (!live && bodyRef.current) {
      bodyRef.current.stop();
      setBodyState("off");
    }
  }, [live]);
  function toggleBody(on) {
    var _a;
    if (!on) {
      (_a = bodyRef.current) == null ? void 0 : _a.stop();
      return;
    }
    if (!bodyRef.current) {
      bodyRef.current = createBodyTracker({
        holds,
        getVideo: () => {
          var _a2;
          return ((_a2 = trackerRef.current) == null ? void 0 : _a2.video) ?? null;
        },
        onFrame: (frame) => {
          var _a2, _b;
          return (_b = (_a2 = getPlayer()) == null ? void 0 : _a2.setArms) == null ? void 0 : _b.call(_a2, frame);
        },
        onState: (s, d) => {
          setBodyState(s);
          setBodyMsg((d == null ? void 0 : d.message) || "");
        }
      });
    }
    void bodyRef.current.start();
  }
  const [gain, setGain] = useState(1.3);
  const [assistOn, setAssistOn] = useState(() => {
    try {
      return localStorage.getItem("ania.mouthAssist") !== "0";
    } catch {
      return true;
    }
  });
  const [micState, setMicState] = useState("off");
  const [micMsg, setMicMsg] = useState("");
  const micRef = useRef(null), assistRef = useRef(null);
  useEffect(() => {
    var _a, _b, _c;
    if (!assistRef.current) assistRef.current = createMouthAssist({ enabled: true });
    assistRef.current.setEnabled(assistOn && live);
    try {
      localStorage.setItem("ania.mouthAssist", assistOn ? "1" : "0");
    } catch {
    }
    if (!assistOn || !live) {
      (_a = micRef.current) == null ? void 0 : _a.stop();
      (_c = (_b = getPlayer()) == null ? void 0 : _b.setMouthAssist) == null ? void 0 : _c.call(_b, 0);
      return void 0;
    }
    if (!micRef.current) {
      micRef.current = createMicLevel({
        onLevel: (level, now) => {
          var _a2, _b2;
          const a = assistRef.current;
          const dt = a._last ? now - a._last : 16;
          a._last = now;
          (_b2 = (_a2 = getPlayer()) == null ? void 0 : _a2.setMouthAssist) == null ? void 0 : _b2.call(_a2, a.update(level, dt));
        },
        onState: (s, d) => {
          setMicState(s);
          setMicMsg((d == null ? void 0 : d.message) || "");
        }
      });
    }
    void micRef.current.start();
    return void 0;
  }, [assistOn, live]);
  useEffect(() => () => {
    var _a;
    (_a = micRef.current) == null ? void 0 : _a.stop();
    micRef.current = null;
  }, []);
  const [preview, setPreview] = useState(true);
  const canvasRef = useRef(null);
  useEffect(() => {
    var _a, _b;
    (_b = (_a = trackerRef.current) == null ? void 0 : _a.setMouthGain) == null ? void 0 : _b.call(_a, gain);
  }, [gain, state]);
  useEffect(() => {
    if (!live || !preview || !panel) return void 0;
    let timer = 0;
    const draw = () => {
      var _a;
      const canvas = canvasRef.current, video = (_a = trackerRef.current) == null ? void 0 : _a.video;
      if (canvas && video && video.videoWidth) {
        const ctx = canvas.getContext("2d");
        if (canvas.width !== 240) {
          canvas.width = 240;
          canvas.height = Math.round(240 * video.videoHeight / video.videoWidth);
        }
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
      }
      timer = setTimeout(draw, 66);
    };
    draw();
    return () => clearTimeout(timer);
  }, [live, preview, panel]);
  const box = { position: "absolute", zIndex: 6, [position.includes("top") ? "top" : "bottom"]: 8, [position.includes("left") ? "left" : "right"]: 8, display: "flex", flexDirection: "column", alignItems: position.includes("left") ? "flex-start" : "flex-end", gap: 8, pointerEvents: "none" };
  const btn = (extra) => ({ pointerEvents: "auto", cursor: "pointer", border: "1px solid rgba(255,255,255,.28)", borderRadius: 10, padding: "8px 12px", minHeight: 44, minWidth: 44, font: "600 13px system-ui,sans-serif", color: "#fff", background: "rgba(15,18,32,.82)", backdropFilter: "blur(4px)", ...extra });
  const dot = createElement("span", { "aria-hidden": "true", style: { display: "inline-block", width: 8, height: 8, borderRadius: 8, marginRight: 8, background: live ? state === "on" ? "#34d399" : "#fbbf24" : "#94a3b8" } });
  return createElement(
    "div",
    { style: box, "data-ania-camera": state },
    panel && createElement(
      "div",
      { role: "dialog", "aria-label": text.title, style: { pointerEvents: "auto", width: "min(280px, calc(100vw - 32px))", padding: 14, borderRadius: 14, color: "#e2e8f0", background: "rgba(15,18,32,.94)", border: "1px solid rgba(165,180,252,.35)", font: "13px/1.5 system-ui,sans-serif", boxShadow: "0 12px 32px rgba(0,0,0,.45)" } },
      createElement("strong", { style: { display: "block", fontSize: 14, color: "#fff", marginBottom: 4 } }, text.title),
      createElement("p", { style: { margin: "0 0 6px" } }, text.explain),
      createElement("p", { style: { margin: "0 0 10px", color: "#aab4c8", fontSize: 12 } }, text.privacy),
      live && preview && createElement("canvas", { ref: canvasRef, "aria-label": text.previewLabel, role: "img", style: { display: "block", width: "100%", borderRadius: 10, marginBottom: 10, background: "#000", border: "1px solid rgba(255,255,255,.18)" } }),
      live && createElement(
        "label",
        { style: { display: "flex", gap: 8, alignItems: "flex-start", margin: "0 0 10px", fontSize: 12, cursor: "pointer" } },
        createElement("input", { type: "checkbox", checked: assistOn, onChange: (e) => setAssistOn(e.target.checked), "data-testid": "mouth-assist-toggle", style: { accentColor: "#818cf8", marginTop: 2 } }),
        createElement("span", null, text.assistMouth, createElement(
          "small",
          { style: { display: "block", color: "#aab4c8" } },
          !assistOn ? text.assistOffHint : micState === "starting" ? micMsg : micState === "on" ? text.assistOnHint : ["denied", "no-mic", "unsupported", "error"].includes(micState) ? micMsg : text.assistHint
        ))
      ),
      live && bodyTracking && createElement(
        "label",
        { style: { display: "flex", gap: 8, alignItems: "flex-start", margin: "0 0 10px", fontSize: 12, cursor: "pointer" } },
        createElement("input", { type: "checkbox", checked: bodyState === "on" || bodyState === "loading", disabled: bodyState === "loading", onChange: (e) => toggleBody(e.target.checked), style: { accentColor: "#818cf8", marginTop: 2 } }),
        createElement("span", null, text.followBody, createElement("small", { style: { display: "block", color: "#aab4c8" } }, bodyState === "loading" ? bodyMsg : bodyState === "on" ? text.bodyOnHint : bodyState === "load-failed" || bodyState === "error" ? bodyMsg : text.bodyHint))
      ),
      live && createElement(
        "label",
        { style: { display: "block", margin: "0 0 8px", fontSize: 12 } },
        `${text.mouthGain}: ${gain.toFixed(1)}×`,
        createElement("input", { type: "range", min: 0.5, max: 2.5, step: 0.1, value: gain, "aria-label": text.mouthGain, onChange: (e) => setGain(Number(e.target.value)), style: { width: "100%", accentColor: "#818cf8" } })
      ),
      live && createElement(
        "label",
        { style: { display: "flex", gap: 8, alignItems: "center", margin: "0 0 10px", fontSize: 12, cursor: "pointer" } },
        createElement("input", { type: "checkbox", checked: preview, onChange: (e) => setPreview(e.target.checked), style: { accentColor: "#818cf8" } }),
        text.showPreview
      ),
      (message || state !== "off") && createElement("p", { role: FAILED.has(state) ? "alert" : "status", "aria-live": "polite", style: { margin: "0 0 10px", padding: "6px 8px", borderRadius: 8, fontSize: 12, color: FAILED.has(state) ? "#fecaca" : "#bbf7d0", background: FAILED.has(state) ? "rgba(127,29,29,.4)" : "rgba(20,83,45,.35)" } }, message || CAMERA_MESSAGES[state] || ""),
      createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        live ? createElement("button", { type: "button", onClick: turnOff, style: btn({ background: "#b91c1c", borderColor: "#ef4444" }) }, text.stop) : createElement("button", { type: "button", onClick: turnOn, disabled: busy, style: btn({ background: "#4f46e5", borderColor: "#818cf8", opacity: busy ? 0.6 : 1 }) }, busy ? text[state] || message : text.start),
        live && createElement("button", { type: "button", onClick: () => {
          var _a;
          return (_a = trackerRef.current) == null ? void 0 : _a.recenter();
        }, style: btn({}) }, text.recenter),
        createElement("button", { type: "button", onClick: () => setPanel(false), disabled: busy, style: btn({ opacity: busy ? 0.5 : 1 }) }, text.close)
      )
    ),
    createElement("button", { type: "button", onClick: () => setPanel((v) => !v), "aria-expanded": panel, "aria-label": live ? `${text.open}: ${text.on}` : text.open, title: live ? text.stop : text.open, style: btn({}) }, dot, text.open)
  );
}
const CameraControl$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CAMERA_TEXT,
  default: CameraControl
}, Symbol.toStringTag, { value: "Module" }));
export {
  CAMERA_MESSAGES as C,
  CAMERA_TEXT as a,
  CameraControl as b,
  createCameraTracker as c,
  createMicLevel as d,
  createMouthAssist as e,
  CameraControl$1 as f
};
