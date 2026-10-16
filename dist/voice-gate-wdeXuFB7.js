const num = (v, d) => Number.isFinite(Number(v)) ? Number(v) : d;
const VOICE_DEFAULTS = Object.freeze({ talkThreshold: 0.08, silenceThreshold: 0.03, openMs: 40, holdMs: 220 });
function createVoiceGate(options = {}) {
  let o = { ...VOICE_DEFAULTS };
  const configure = (next = {}) => {
    const talk = Math.max(1e-3, num(next.talkThreshold, o.talkThreshold));
    const silence = Math.min(talk, Math.max(0, num(next.silenceThreshold, o.silenceThreshold)));
    o = { talkThreshold: talk, silenceThreshold: silence, openMs: Math.max(0, num(next.openMs, o.openMs)), holdMs: Math.max(0, num(next.holdMs, o.holdMs)) };
  };
  configure(options);
  let talking = false, above = 0, below = 0;
  return {
    configure,
    get options() {
      return { ...o };
    },
    get talking() {
      return talking;
    },
    reset() {
      talking = false;
      above = below = 0;
    },
    /** @returns {boolean} whether the avatar should be in its talk frames now. NaN / negative levels count as silence. */
    update(level, dtMs) {
      const lv = Number.isFinite(level) && level > 0 ? level : 0;
      const dt = Number.isFinite(dtMs) ? Math.min(Math.max(dtMs, 0), 250) : 16;
      if (lv >= o.talkThreshold) {
        above += dt;
        below = 0;
      } else if (lv <= o.silenceThreshold) {
        below += dt;
        above = 0;
      } else {
        above = 0;
        below = 0;
      }
      if (!talking && above >= o.openMs) talking = true;
      else if (talking && below >= o.holdMs) talking = false;
      return talking;
    }
  };
}
export {
  VOICE_DEFAULTS as V,
  createVoiceGate as c
};
