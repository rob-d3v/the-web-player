// Pure maths for webcam face tracking. No DOM, no three.js, no MediaPipe: runs (and is tested) under plain node.
//
// MediaPipe FaceLandmarker gives us ARKit-style blendshape scores and a 4x4 face->camera matrix (column-major).
// This module turns one such result into what the 3D viewer consumes:
//   { head: { x, y, z }, expressions: { blink, blinkLeft, blinkRight, aa, ih, ou, ee, oh, happy, sad, angry, surprised } }
// (head angles in radians, in VRM normalized-bone convention; expressions 0..1).
//
// Conventions (derived from the matrix, checked in test-tracking-core.mjs):
//   raw yaw   < 0  -> the person turned to THEIR right (camera image: toward the left)
//   raw pitch < 0  -> the person looks UP
//   raw roll  > 0  -> the person tilted the head toward THEIR right shoulder
//   VRM bone: rotation.y > 0 turns the avatar's face toward screen-right; rotation.x < 0 looks up; rotation.z > 0 leans toward screen-left.
// `mirror` (default) makes the avatar behave like a mirror: you turn to your right, it turns toward screen-right.

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const finite = (v, fallback = 0) => (Number.isFinite(v) ? v : fallback);
export const DEG = Math.PI / 180;

export const LIMITS = { yaw: 60 * DEG, pitch: 40 * DEG, roll: 35 * DEG };

/** One Euro filter (Casiez et al. 2012): heavy smoothing when still, little lag when moving. */
export class OneEuro {
  constructor({ minCutoff = 1.4, beta = 0.03, dCutoff = 1.0 } = {}) {
    this.minCutoff = minCutoff; this.beta = beta; this.dCutoff = dCutoff;
    this.reset();
  }
  reset() { this.x = null; this.dx = 0; this.t = null; }
  static alpha(cutoff, dt) { const tau = 1 / (2 * Math.PI * cutoff); return 1 / (1 + tau / dt); }
  filter(value, tSeconds) {
    if (!Number.isFinite(value)) return this.x ?? 0;
    if (this.x === null || this.t === null) { this.x = value; this.t = tSeconds; return value; }
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

/** Euler angles (three.js 'YXZ' order) from a column-major 4x4. Returns radians { pitch, yaw, roll } or null. */
export function eulerFromMatrix(m) {
  if (!m || m.length < 16 || !Array.from(m).slice(0, 16).every(Number.isFinite)) return null;
  const m11 = m[0], m21 = m[1], m31 = m[2], m12 = m[4], m22 = m[5], m32 = m[6], m13 = m[8], m23 = m[9], m33 = m[10];
  const pitch = Math.asin(-clamp(m23, -1, 1));
  let yaw, roll;
  if (Math.abs(m23) < 0.9999999) { yaw = Math.atan2(m13, m33); roll = Math.atan2(m21, m22); }
  else { yaw = Math.atan2(-m31, m11); roll = 0; }
  void m12; void m32;
  return { pitch, yaw, roll };
}

/** Score lookup: MediaPipe returns [{categoryName, score}]. */
export function blendshapeMap(categories) {
  const out = {};
  for (const c of categories || []) if (c && typeof c.categoryName === 'string') out[c.categoryName] = finite(c.score);
  return out;
}

const ramp = (v, lo, hi) => clamp((v - lo) / (hi - lo), 0, 1);

/**
 * ARKit scores -> VRM expression targets. `mirror` swaps the eyes (a mirror image of your left eye is the avatar's right eye).
 * Thresholds are chosen so that a relaxed face reads ~0 (blendshape scores are rarely exactly 0).
 */
export function expressionsFromBlendshapes(b, { mirror = true, mouthGain = 1.0 } = {}) {
  const get = (k) => finite(b[k]);
  const blinkL = ramp(get('eyeBlinkLeft'), 0.20, 0.75), blinkR = ramp(get('eyeBlinkRight'), 0.20, 0.75);
  // Normal speech sits at jawOpen ~0.08-0.30 (shouting ~0.6+). A wide ramp made normal talking read as ~0.1, so the
  // mouth looked shut. Narrow ramp + gamma lifts conversation to a clearly visible opening; `mouthGain` is the user's knob.
  const lift = (v) => clamp(Math.pow(v, 0.7) * mouthGain, 0, 1);
  const jaw = lift(ramp(get('jawOpen'), 0.04, 0.38));
  const funnel = ramp(get('mouthFunnel'), 0.08, 0.50), pucker = ramp(get('mouthPucker'), 0.08, 0.55);
  const smile = ramp((get('mouthSmileLeft') + get('mouthSmileRight')) / 2, 0.12, 0.55);
  const frown = ramp((get('mouthFrownLeft') + get('mouthFrownRight')) / 2, 0.12, 0.55);
  const browUp = ramp(get('browInnerUp'), 0.10, 0.60);
  const browOuterUp = ramp((get('browOuterUpLeft') + get('browOuterUpRight')) / 2, 0.10, 0.60);
  const browDown = ramp((get('browDownLeft') + get('browDownRight')) / 2, 0.15, 0.70);
  const wide = ramp((get('eyeWideLeft') + get('eyeWideRight')) / 2, 0.12, 0.60);
  const stretch = ramp((get('mouthStretchLeft') + get('mouthStretchRight')) / 2, 0.12, 0.60);
  const tongue = ramp(get('tongueOut'), 0.12, 0.60);
  const blink = Math.min(blinkL, blinkR);
  const eyeL = mirror ? blinkR : blinkL, eyeR = mirror ? blinkL : blinkR;
  const open = jaw * (1 - 0.5 * Math.max(funnel, pucker));
  const round = Math.max(funnel, pucker) * (0.4 + 0.6 * jaw);
  // Boredom has no ARKit shape: it is the SUM of heavy lids (half-closed, not blinking), flat mouth, lowered brows, no smile.
  const lidDrop = ramp((get('eyeBlinkLeft') + get('eyeBlinkRight')) / 2, 0.18, 0.50) * (1 - blink);
  const bored = clamp(lidDrop * (1 - smile) * (1 - jaw) * (0.5 + 0.5 * Math.max(frown, browDown, 0.2)), 0, 1);
  return {
    blink,
    // a wink must not also trigger the full blink: report each eye only by how much it exceeds the other
    blinkLeft: Math.max(0, eyeL - blink), blinkRight: Math.max(0, eyeR - blink),
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
    browUp: Math.max(browUp, browOuterUp), browDown, browInner: browUp, tongue, bored,
  };
}

/** Head rotation target for VRM bones from raw Euler (applies mirror + limits). */
export function headFromEuler(e, { mirror = true, offset = { x: 0, y: 0, z: 0 } } = {}) {
  const x = e.pitch, y = mirror ? -e.yaw : e.yaw, z = mirror ? -e.roll : e.roll;
  return {
    x: clamp(x - offset.x, -LIMITS.pitch, LIMITS.pitch),
    y: clamp(y - offset.y, -LIMITS.yaw, LIMITS.yaw),
    z: clamp(z - offset.z, -LIMITS.roll, LIMITS.roll),
  };
}

const EXPRESSION_KEYS = ['blink', 'blinkLeft', 'blinkRight', 'aa', 'oh', 'ou', 'ee', 'ih', 'happy', 'sad', 'angry', 'surprised', 'relaxed',
  'browUp', 'browDown', 'browInner', 'tongue', 'bored'];

/** Stateful per-frame processor: smoothing, recentering, face-lost handling. */
export class FaceTracker {
  constructor({ mirror = true, smoothing = 1, mouthGain = 1.0 } = {}) {
    this.mirror = mirror; this.mouthGain = mouthGain;
    const cutoff = (c) => ({ minCutoff: c * smoothing, beta: 0.03 });
    this.head = { x: new OneEuro(cutoff(1.4)), y: new OneEuro(cutoff(1.4)), z: new OneEuro(cutoff(1.4)) };
    // blinks must stay fast (a blink lasts ~150 ms): light smoothing only
    this.expr = Object.fromEntries(EXPRESSION_KEYS.map((k) => [k, new OneEuro({ minCutoff: k.startsWith('blink') ? 8 : 2.2, beta: k.startsWith('blink') ? 0.5 : 0.05 })]));
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
    this.lastRaw = null; this.last = null;
  }
  /** result: { facialTransformationMatrixes: [{data}], faceBlendshapes: [{categories}] } | null. Returns a frame or null if no face. */
  process(result, tSeconds) {
    const matrix = result?.facialTransformationMatrixes?.[0]?.data;
    const euler = eulerFromMatrix(matrix);
    if (!euler) { this.lastRaw = null; this.last = null; return null; }
    this.lastRaw = euler;
    const rawHead = headFromEuler(euler, { mirror: this.mirror, offset: this.offset });
    const head = { x: this.head.x.filter(rawHead.x, tSeconds), y: this.head.y.filter(rawHead.y, tSeconds), z: this.head.z.filter(rawHead.z, tSeconds) };
    const targets = expressionsFromBlendshapes(blendshapeMap(result?.faceBlendshapes?.[0]?.categories), { mirror: this.mirror, mouthGain: this.mouthGain });
    const expressions = {};
    for (const k of EXPRESSION_KEYS) expressions[k] = clamp(this.expr[k].filter(targets[k], tSeconds), 0, 1);
    this.last = { head, expressions };
    return this.last;
  }
}
