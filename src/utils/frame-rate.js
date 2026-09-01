/**
 * Frame-rate resolution and clamping.
 *
 * THE BUG THIS EXISTS TO FIX
 *
 * The player runtime computes its per-frame delay as
 *
 *     frameDuration = configState.idle_frame_duration / animationState.idle_speed_slider_value
 *
 * with nothing normalising or bounding the result. The speed slider is a bare
 * multiplier against a duration authored inside the `.ania`, so its meaning
 * depends entirely on that file. Nearly every consumer app hardcodes
 * `idleSpeed={6.4} talkSpeed={5.3}`, which against the legacy 50 ms default is
 *
 *     50 / 6.4 = 7.8 ms  ->  128 fps
 *
 * while `diario-de-obra` passes 2.8 and lands at 56 fps. Same library, same
 * component, wildly different playback. That is the "some avatars are slow,
 * others are way too fast" report.
 *
 * THE FIX
 *
 * Stop treating the slider as an absolute divisor. Resolve what the footage's
 * REAL frame rate is, treat the slider as a multiplier relative to that, and
 * clamp the result into a sane window (24-30 fps by default). The legacy 6.4 /
 * 5.3 / 2.8 values then all collapse onto the clamp and become no-ops, so the
 * nineteen apps that pass them need no edits.
 *
 * Hosts that genuinely want something else opt out explicitly with `fpsClamp`.
 *
 * This module is pure and has no imports, so `examples/test-frame-rate.mjs` can
 * exercise it under plain `node`.
 */

/** The window playback is held to unless the host opts out. */
export const FPS_CLAMP_DEFAULT = { min: 24, max: 30 };

/**
 * Assumed frame rate when the `.ania` declares none.
 *
 * 25 sits inside the default window, so an undeclared file plays at its assumed
 * rate rather than being dragged to a boundary. Old files predate the studio
 * writing `video.fps` at all, and there are plenty of them in the wild.
 */
export const FPS_FALLBACK = 25;

/**
 * The legacy default for `idleFrameDuration`/`talkCycleDuration`.
 *
 * This value means "nobody set this", NOT "20 fps". Studio-authored files carry
 * a real, fps-correct duration (~1000/fps); files that predate that carry 50
 * because 50 was the hardcoded fallback. Reading 50 as a genuine 20 fps would
 * make every legacy avatar play 20% slow, so it is explicitly not trusted as an
 * fps source.
 */
const LEGACY_DURATION_SENTINEL = 50;

const isPositiveFinite = (v) => Number.isFinite(v) && v > 0;

/**
 * Normalise the `fpsClamp` prop into a `{min, max}` window, or `null` for "off".
 *
 * Accepts: `undefined`/`true` -> the default window; `false` -> no clamping at
 * all (full legacy behaviour); `{min, max}` -> a custom window.
 *
 * An invalid custom window falls back to the default rather than throwing: this
 * runs inside a render path in nineteen host apps, and a bad prop should
 * degrade to correct playback, not to a blank avatar.
 */
export const normalizeFpsClamp = (fpsClamp) => {
  if (fpsClamp === false) return null;
  if (fpsClamp === undefined || fpsClamp === null || fpsClamp === true) {
    return { ...FPS_CLAMP_DEFAULT };
  }
  if (typeof fpsClamp === 'object') {
    const min = Number(fpsClamp.min);
    const max = Number(fpsClamp.max);
    if (isPositiveFinite(min) && isPositiveFinite(max) && min <= max && max <= 120) {
      return { min, max };
    }
    console.warn(
      '[AniaAvatar] fpsClamp must be {min, max} with 0 < min <= max <= 120; ' +
        'falling back to the default 24-30 fps window. Got:',
      fpsClamp
    );
  }
  return { ...FPS_CLAMP_DEFAULT };
};

/**
 * Work out the true frame rate of the avatar's footage.
 *
 * @returns {{fps: number, source: string}} `source` names which signal won, for
 *   logging — when playback looks wrong, the first question is always "what did
 *   it think the fps was, and why".
 */
export const resolveNativeFps = (avatarData) => {
  const data = avatarData || {};
  const video = data.video || {};
  const config = data.config || {};

  // 1. The studio writes this. Trust it first.
  const declared = Number(video.fps);
  if (isPositiveFinite(declared) && declared <= 240) {
    return { fps: declared, source: 'video.fps' };
  }

  // 2. Studio-authored files also carry an fps-correct frame duration. Usable,
  //    but only when it is not the "nobody set this" sentinel.
  const idleMs = Number(config.idleFrameDuration);
  if (isPositiveFinite(idleMs) && idleMs !== LEGACY_DURATION_SENTINEL) {
    const derived = 1000 / idleMs;
    if (derived >= 8 && derived <= 120) {
      return { fps: derived, source: 'config.idleFrameDuration' };
    }
  }

  // 3. Last resort before guessing: frame count over clip duration.
  const frameCount = Array.isArray(video.frames) ? video.frames.length : Number(video.frameCount);
  const duration = Number(video.duration);
  if (isPositiveFinite(frameCount) && frameCount > 1 && isPositiveFinite(duration) && duration > 0.5) {
    const derived = frameCount / duration;
    if (derived >= 8 && derived <= 120) {
      return { fps: derived, source: 'frames/duration' };
    }
  }

  return { fps: FPS_FALLBACK, source: 'fallback' };
};

/**
 * The per-frame interval, in ms, that the runtime should actually use.
 *
 * `speed` is a multiplier relative to the footage's native rate: 1 means "play
 * it as shot". The clamp then bounds the result, which is what neutralises the
 * legacy absolute values.
 *
 * @param {object}  args
 * @param {number}  args.nativeFps       from {@link resolveNativeFps}
 * @param {number}  [args.speed=1]       host/file speed multiplier
 * @param {number}  [args.playbackSpeed=1] the runtime's own global scalar
 * @param {{min,max}|null} [args.clamp]  from {@link normalizeFpsClamp}; `null` disables
 */
export const frameIntervalMs = ({
  nativeFps,
  speed = 1,
  playbackSpeed = 1,
  clamp = FPS_CLAMP_DEFAULT
} = {}) => {
  const fps = isPositiveFinite(nativeFps) ? nativeFps : FPS_FALLBACK;
  const s = isPositiveFinite(speed) ? speed : 1;
  const ps = isPositiveFinite(playbackSpeed) ? playbackSpeed : 1;

  const raw = 1000 / fps / s / ps;
  if (!clamp) return raw;

  const minMs = 1000 / clamp.max; // fastest allowed -> shortest interval
  const maxMs = 1000 / clamp.min; // slowest allowed -> longest interval
  return Math.max(minMs, Math.min(maxMs, raw));
};

/** Convenience for logs and tests: the effective fps of an interval. */
export const fpsFromIntervalMs = (intervalMs) =>
  isPositiveFinite(intervalMs) ? 1000 / intervalMs : 0;
