// Audio + camera fusion for the 3D mouth. Pure logic (no DOM): examples/test-mouth-fusion.mjs.
//
// The camera gives the SHAPE of the mouth (smile, vowel). The microphone (or any audio source) is only a confirmation: it uses the very same
// hysteresis gate that switches the 2D avatar to its talk frames (voice-gate.js, thresholds of the avatar). When the gate says "there is speech"
// and the camera sees little mouth movement, the mouth is nudged open to a modest level that follows the loudness. Noise below the gate never
// opens the mouth, and a mouth the camera already opened wide is left alone (max, never a sum).
import { createVoiceGate, VOICE_DEFAULTS } from '../utils/voice-gate.js';

export const FUSION_DEFAULTS = Object.freeze({ maxAssist: 0.55, gain: 5, floorLevel: 0.012 });

/** Assist value 0..maxAssist for a gated loudness. 0 when the gate is closed. */
export function assistFromLevel(level, gateOpen, { maxAssist = FUSION_DEFAULTS.maxAssist, gain = FUSION_DEFAULTS.gain, floorLevel = FUSION_DEFAULTS.floorLevel } = {}) {
  if (!gateOpen) return 0;
  const lv = Number.isFinite(level) && level > 0 ? level : 0;
  return Math.min(maxAssist, Math.max(0, (lv - floorLevel) * gain));
}

/** Final mouth opening: the camera value, lifted (never lowered) by the audio assist. */
export const fuseMouth = (cameraOpen, assist, enabled = true) => {
  const cam = Number.isFinite(cameraOpen) ? Math.max(0, cameraOpen) : 0;
  return enabled ? Math.min(1, Math.max(cam, assist || 0)) : cam;
};

/**
 * Stateful helper: feed it the audio level every frame, read `assist` back.
 * `enabled` can be switched at any time (the interface switch); turning it off closes the gate immediately.
 */
export function createMouthAssist({ enabled = true, thresholds = VOICE_DEFAULTS, options } = {}) {
  const gate = createVoiceGate(thresholds);
  let on = !!enabled, assist = 0, smooth = 0;
  return {
    get enabled() { return on; },
    get assist() { return assist; },
    get speaking() { return gate.talking; },
    configure(t) { gate.configure(t); },
    setEnabled(v) { on = !!v; if (!on) { gate.reset(); assist = 0; smooth = 0; } },
    update(level, dtMs) {
      if (!on) return 0;
      const open = gate.update(level, dtMs);
      const target = assistFromLevel(level, open, options);
      // fast attack, slower release: the mouth snaps open with the voice and relaxes between syllables
      smooth += (target - smooth) * (target > smooth ? 0.6 : 0.25);
      assist = smooth < 0.01 ? 0 : smooth;
      return assist;
    },
  };
}
