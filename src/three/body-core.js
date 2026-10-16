// Arms + fingers from MediaPipe pose/hand landmarks -> VRM normalized-bone rotations. Pure maths (plain arrays), runs under node.
//
// Design rules (the uncanny valley is a bug, not a style):
//  * Only what is anatomically safe is driven: upper arm swing, elbow flexion, finger curl. Wrist twist, shoulders and thumbs stay at rest.
//  * Every output is clamped to joint limits, speed-limited, and low-pass smoothed.
//  * Low confidence NEVER freezes the arm in an odd pose: it eases back to the idle pose (arms down) within ~0.5 s.
//  * `holds` (e.g. a character that must keep carrying a lantern) pins a side to a fixed pose; the tracker never moves it.
//
// Frames. Pose world landmarks: x right in the IMAGE, y down, z away from the camera (smaller = nearer). Avatar frame: +X = avatar's
// left (screen-right when it faces the viewer), +Y up, +Z toward the viewer. VRM left arm rests along +X, right along -X.
// `mirror` (default): the user's RIGHT arm drives the avatar's LEFT bone, like a mirror.

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const finite = (v, d = 0) => (Number.isFinite(v) ? v : d);
const DEG = Math.PI / 180;

// ---- tiny vec3 / quat (arrays) ----
export const v3 = {
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  len: (a) => Math.hypot(a[0], a[1], a[2]),
  norm: (a) => { const l = Math.hypot(a[0], a[1], a[2]); return l > 1e-9 ? [a[0] / l, a[1] / l, a[2] / l] : null; },
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
};
export const q = {
  ident: () => [0, 0, 0, 1],
  mul: (a, b) => [a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1], a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
    a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3], a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]],
  inv: (a) => [-a[0], -a[1], -a[2], a[3]],
  rotate: (a, v) => { const t = v3.cross([a[0], a[1], a[2]], v).map((x) => 2 * x); const c = v3.cross([a[0], a[1], a[2]], t); return [v[0] + a[3] * t[0] + c[0], v[1] + a[3] * t[1] + c[1], v[2] + a[3] * t[2] + c[2]]; },
  axisAngle: (axis, angle) => { const s = Math.sin(angle / 2); return [axis[0] * s, axis[1] * s, axis[2] * s, Math.cos(angle / 2)]; },
  fromUnitVectors: (from, to) => {
    const d = v3.dot(from, to);
    if (d > 0.999999) return [0, 0, 0, 1];
    if (d < -0.999999) { const axis = Math.abs(from[0]) < 0.9 ? v3.norm(v3.cross(from, [1, 0, 0])) : v3.norm(v3.cross(from, [0, 1, 0])); return [axis[0], axis[1], axis[2], 0]; }
    const c = v3.cross(from, to); const out = [c[0], c[1], c[2], 1 + d]; const l = Math.hypot(...out); return out.map((x) => x / l);
  },
  angle: (a) => 2 * Math.acos(clamp(Math.abs(a[3]), 0, 1)),
  slerp: (a, b, t) => {
    let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]; let bb = b;
    if (d < 0) { d = -d; bb = b.map((x) => -x); }
    if (d > 0.9995) { const o = a.map((x, i) => x + (bb[i] - x) * t); const l = Math.hypot(...o); return o.map((x) => x / l); }
    const th = Math.acos(d), s = Math.sin(th), wa = Math.sin((1 - t) * th) / s, wb = Math.sin(t * th) / s;
    return a.map((x, i) => x * wa + bb[i] * wb);
  },
  /** Rotate `a` toward `b` by at most `maxAngle` radians. */
  towards: (a, b, maxAngle) => { const delta = q.mul(q.inv(a), b); const ang = q.angle(delta); if (ang <= maxAngle || ang < 1e-6) return b; return q.slerp(a, b, maxAngle / ang); },
};

export const POSE = { lShoulder: 11, rShoulder: 12, lElbow: 13, rElbow: 14, lWrist: 15, rWrist: 16, lHip: 23, rHip: 24 };

/** Joint limits in radians. */
export const LIMITS = {
  upperArmMaxFromDown: 175 * DEG,   // can reach straight up
  upperArmBehindBack: 35 * DEG,     // how far behind the torso plane the upper arm may go
  elbowMax: 150 * DEG,              // flexion
  fingerProximal: 85 * DEG, fingerIntermediate: 100 * DEG, fingerDistal: 70 * DEG,
  maxSpeed: 7,                      // rad/s for any bone
};

const REST_DIR = { left: [1, 0, 0], right: [-1, 0, 0] };
/** Idle pose used by the viewer (arms down at ~66 degrees from the T-pose). */
export const IDLE_ANGLE = 1.15;
export const idleQuat = (side) => q.axisAngle([0, 0, 1], side === 'left' ? -IDLE_ANGLE : IDLE_ANGLE);

function toAvatar(p, mirror) { return [mirror ? -p.x : p.x, -p.y, -p.z]; }

/**
 * Keep a unit vector's component `axis` on the allowed side of `limit` (sign = +1: value must be >= limit; -1: <= -limit mirrored).
 * The component is pinned EXACTLY at the limit and the other two are rescaled so the vector stays unit length. Plain renormalising
 * after overwriting one component (the obvious fix) moves the pinned component again and breaks the limit.
 */
function pinMin(vec, axis, limit, sign = 1) {
  if (vec[axis] * sign >= limit * sign) return vec;
  const rest = [0, 1, 2].filter((i) => i !== axis);
  const planar = Math.hypot(vec[rest[0]], vec[rest[1]]);
  const out = [0, 0, 0]; out[axis] = limit;
  const scale = Math.sqrt(Math.max(0, 1 - limit * limit));
  if (planar < 1e-6) { out[rest[0]] = rest[0] === 1 ? -scale : 0; out[rest[1]] = rest[1] === 1 ? -scale : 0; return out; }
  out[rest[0]] = vec[rest[0]] / planar * scale; out[rest[1]] = vec[rest[1]] / planar * scale;
  return out;
}

/** Visibility of a landmark in 0..1 (pose landmarks carry `visibility`; hands do not). */
const vis = (p) => (p && Number.isFinite(p.x) ? finite(p.visibility, 1) : 0);

/**
 * Solve one arm from pose world landmarks.
 * @returns {null | { upper: number[], lower: number[], confidence: number }}  quaternions are LOCAL bone rotations (normalized rig).
 */
export function solveArm(pose, side, { mirror = true } = {}) {
  // mirror: the user's RIGHT drives the avatar's left bone
  const userSide = (side === 'left') === mirror ? 'r' : 'l';
  const S = pose[userSide === 'l' ? POSE.lShoulder : POSE.rShoulder], E = pose[userSide === 'l' ? POSE.lElbow : POSE.rElbow], W = pose[userSide === 'l' ? POSE.lWrist : POSE.rWrist];
  const confidence = Math.min(vis(S), vis(E), vis(W));
  if (!S || !E || !W || confidence <= 0) return null;
  const s = toAvatar(S, mirror), e = toAvatar(E, mirror), w = toAvatar(W, mirror);
  let du = v3.norm(v3.sub(e, s)), dl = v3.norm(v3.sub(w, e));
  if (!du || !dl) return null;
  // Anatomical limit 1: the upper arm cannot go far behind the torso plane (z is toward the viewer).
  du = pinMin(du, 2, Math.sin(-LIMITS.upperArmBehindBack));
  // Anatomical limit 2: do not cross the arm through the body: the upper arm may not point past the midline toward the other side.
  const outward = side === 'left' ? 1 : -1;
  du = pinMin(du, 0, -0.45 * outward, outward);
  const rest = REST_DIR[side];
  const upper = q.fromUnitVectors(rest, du);
  // Forearm in the upper arm's frame, with elbow flexion limited (the forearm cannot fold past `elbowMax`).
  let local = v3.norm(q.rotate(q.inv(upper), dl));
  const flex = Math.acos(clamp(v3.dot(local, rest), -1, 1));
  if (flex > LIMITS.elbowMax) {
    const t = LIMITS.elbowMax / flex;
    const axis = v3.norm(v3.cross(rest, local)) ?? [0, 0, 1];
    local = q.rotate(q.axisAngle(axis, LIMITS.elbowMax), rest);
    void t;
  }
  return { upper, lower: q.fromUnitVectors(rest, local), confidence };
}

/** Finger curl 0..1 per finger from 21 hand landmarks (index, middle, ring, pinky). Thumb is intentionally not driven. */
export function fingerCurls(hand) {
  if (!hand || hand.length < 21 || !hand.every((p) => p && Number.isFinite(p.x))) return null;
  const P = hand.map((p) => [p.x, p.y, p.z ?? 0]);
  const out = {};
  const fingers = { index: [5, 6, 7, 8], middle: [9, 10, 11, 12], ring: [13, 14, 15, 16], pinky: [17, 18, 19, 20] };
  for (const [name, [mcp, pip, dip, tip]] of Object.entries(fingers)) {
    const a = v3.norm(v3.sub(P[pip], P[mcp])), b = v3.norm(v3.sub(P[dip], P[pip])), c = v3.norm(v3.sub(P[tip], P[dip]));
    if (!a || !b || !c) { out[name] = 0; continue; }
    // bend angles between consecutive segments; a straight finger is 0, a fist ~ (80, 90, 60) degrees
    const bendP = Math.acos(clamp(v3.dot(a, b), -1, 1)), bendD = Math.acos(clamp(v3.dot(b, c), -1, 1));
    // MCP bend: angle between the palm direction (wrist->MCP) and the proximal segment. Even a flat open hand has ~12 degrees
    // here (the knuckles are not in line with the wrist), so that rest offset is removed first or an open hand reads as slightly curled.
    const palm = v3.norm(v3.sub(P[mcp], P[0]));
    const bendM = palm ? Math.max(0, Math.acos(clamp(v3.dot(palm, a), -1, 1)) - 12 * DEG) : 0;
    out[name] = clamp((bendM / (70 * DEG) * 0.4 + bendP / (95 * DEG) * 0.4 + bendD / (65 * DEG) * 0.2), 0, 1);
  }
  return out;
}

/** Distribute one curl value over the three finger joints within anatomical limits. Angles in radians. */
export function fingerAngles(curl) {
  const c = clamp(curl, 0, 1);
  return { proximal: c * LIMITS.fingerProximal, intermediate: c * LIMITS.fingerIntermediate, distal: c * LIMITS.fingerDistal * 0.9 };
}

/** Trunk limits (radians): pitch (lean forward/back), yaw (twist), roll (lean sideways). Deliberately small: a bust shot, not a contortionist. */
export const TORSO_LIMITS = { pitch: 18 * DEG, yaw: 25 * DEG, roll: 16 * DEG };
const TORSO_MAX_SPEED = 2.2; // rad/s

/**
 * Trunk lean/twist from pose world landmarks (shoulders + hips). Image frame: x right, y down, z away from the camera.
 *  - roll: tilt of the shoulder line (left shoulder lower than the right = lean toward the avatar's... mirrored when `mirror`)
 *  - yaw: depth difference between the shoulders (one nearer to the camera = torso turned)
 *  - pitch: the shoulder midpoint in front of / behind the hip midpoint (lean toward the camera)
 * Hips are optional: without them pitch is 0. All outputs are clamped to TORSO_LIMITS. Returns null if the shoulders are unusable.
 */
export function solveTorso(pose, { mirror = true } = {}) {
  const L = pose[POSE.lShoulder], R = pose[POSE.rShoulder];
  const confidence = Math.min(vis(L), vis(R));
  if (!L || !R || confidence <= 0) return null;
  // The user's LEFT shoulder (landmark 11) sits on the image RIGHT, so the vector image-left -> image-right is L - R and dx > 0 when facing the camera.
  const dx = L.x - R.x, dy = L.y - R.y, dz = L.z - R.z;
  const width = Math.hypot(dx, dy, dz);
  if (!(width > 1e-4)) return null;
  let roll = Math.atan2(dy, Math.abs(dx) < 1e-6 ? 1e-6 : dx);       // 0 when level; dy > 0: the user's left shoulder is lower
  roll = Math.abs(roll) > Math.PI / 2 ? 0 : roll;
  let yaw = Math.asin(clamp(dz / width, -1, 1));                    // dz < 0: the user's left shoulder is nearer = turned to their right
  let pitch = 0;
  const lh = pose[POSE.lHip], rh = pose[POSE.rHip];
  if (lh && rh && Math.min(vis(lh), vis(rh)) > 0.4) {
    const sm = [(L.x + R.x) / 2, (L.y + R.y) / 2, (L.z + R.z) / 2], hm = [(lh.x + rh.x) / 2, (lh.y + rh.y) / 2, (lh.z + rh.z) / 2];
    const trunk = v3.norm(v3.sub(sm, hm));                          // hips -> shoulders; upright = (0,-1,0) in image frame
    if (trunk) pitch = Math.atan2(-trunk[2], -trunk[1]);            // shoulders nearer to the camera (smaller z) = lean forward (+x on the avatar)
  }
  // Avatar axes: +z roll lowers the avatar's screen-LEFT shoulder, +y yaw turns it toward screen-RIGHT. As a mirror (the display is flipped) the user's
  // left shoulder dropping lowers the screen-left one, and turning to the user's right turns the avatar to screen-right.
  roll = mirror ? roll : -roll; yaw = mirror ? -yaw : yaw;
  return { x: clamp(finite(pitch), -TORSO_LIMITS.pitch, TORSO_LIMITS.pitch), y: clamp(finite(yaw), -TORSO_LIMITS.yaw, TORSO_LIMITS.yaw), z: clamp(finite(roll), -TORSO_LIMITS.roll, TORSO_LIMITS.roll), confidence };
}

/**
 * Stateful arm controller: confidence gating, smoothing, speed limit, ease back to idle, held sides.
 * `holds`: { left?: {upper, lower}, right?: {...} } -> that side is pinned to the given local rotations and never tracked.
 */
export class BodyTracker {
  constructor({ mirror = true, holds = {}, trackTau = 0.10, idleTau = 0.45, minConfidence = 0.55, trackTorso = true } = {}) {
    this.mirror = mirror; this.holds = holds; this.trackTau = trackTau; this.idleTau = idleTau; this.minConfidence = minConfidence; this.trackTorso = trackTorso;
    this.torso = { x: 0, y: 0, z: 0 };
    this.state = {};
    for (const side of ['left', 'right']) this.state[side] = { upper: idleQuat(side), lower: q.ident(), weight: 0, fingers: { index: 0, middle: 0, ring: 0, pinky: 0 } };
    this.lostFor = { left: 0, right: 0 };
  }
  reset() { this.torso = { x: 0, y: 0, z: 0 }; for (const side of ['left', 'right']) { this.state[side] = { upper: idleQuat(side), lower: q.ident(), weight: 0, fingers: { index: 0, middle: 0, ring: 0, pinky: 0 } }; this.lostFor[side] = 0; } }
  /** Trunk lean/twist: smoothed, clamped, eases to upright when the person is lost. Returns Euler radians {x: pitch, y: yaw, z: roll}. */
  _torso(pose, dt) {
    const st = this.torso;
    const solved = this.trackTorso && pose ? solveTorso(pose, { mirror: this.mirror }) : null;
    const good = !!solved && solved.confidence >= this.minConfidence;
    const tgt = good ? solved : { x: 0, y: 0, z: 0 };
    const k = 1 - Math.exp(-dt / (good ? this.trackTau * 1.6 : this.idleTau));
    const maxStep = TORSO_MAX_SPEED * dt;
    for (const axis of ['x', 'y', 'z']) st[axis] += clamp((tgt[axis] - st[axis]) * k, -maxStep, maxStep);
    return { x: st.x, y: st.y, z: st.z, tracking: good };
  }
  /** pose: array of world landmarks | null, hands: { left?: landmarks, right?: landmarks } | null, dt seconds. Returns the bone targets. */
  update(pose, hands, dt) {
    dt = clamp(finite(dt, 1 / 30), 0.001, 0.1);
    const out = { left: null, right: null, torso: null };
    out.torso = this._torso(pose, dt);
    for (const side of ['left', 'right']) {
      const st = this.state[side];
      if (this.holds[side]) { st.upper = this.holds[side].upper; st.lower = this.holds[side].lower ?? q.ident(); st.weight = 1; out[side] = { ...st, held: true }; continue; }
      const solved = pose ? solveArm(pose, side, { mirror: this.mirror }) : null;
      const good = !!solved && solved.confidence >= this.minConfidence;
      let tu, tl, tau;
      if (good) { tu = solved.upper; tl = solved.lower; tau = this.trackTau; this.lostFor[side] = 0; }
      else { tu = idleQuat(side); tl = q.ident(); tau = this.idleTau; this.lostFor[side] += dt; }
      const k = 1 - Math.exp(-dt / tau);
      const maxStep = LIMITS.maxSpeed * dt;
      st.upper = q.towards(st.upper, q.slerp(st.upper, tu, k), maxStep);
      st.lower = q.towards(st.lower, q.slerp(st.lower, tl, k), maxStep);
      st.weight += ((good ? 1 : 0) - st.weight) * (1 - Math.exp(-dt / (good ? 0.15 : this.idleTau)));
      // fingers follow only while the arm is tracked, and relax to open when the hand is lost
      const hand = good && hands ? hands[side] : null;
      const curls = hand ? fingerCurls(hand) : null;
      for (const f of Object.keys(st.fingers)) st.fingers[f] += ((curls ? curls[f] : 0) - st.fingers[f]) * (1 - Math.exp(-dt / (curls ? 0.08 : 0.3)));
      out[side] = { upper: st.upper, lower: st.lower, weight: st.weight, fingers: { ...st.fingers }, held: false, tracking: good };
    }
    return out;
  }
}
