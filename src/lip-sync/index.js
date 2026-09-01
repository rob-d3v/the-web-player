/**
 * Pure lip-sync core: no DOM, no clock, no RNG.
 *
 * These two modules are the single source of truth for the lip-sync maths. The
 * React hook (`useLipSync`) only ACQUIRES audio; the player runtime only
 * ADAPTS these outputs to its frame loop. Keeping the maths here means it is
 * testable under plain `node`, shipped in the npm package (`files: ["dist",
 * "src"]`), and inherited by every wrapper (vue/svelte/angular/web-component)
 * instead of being re-implemented per host.
 */
export { LipSyncDsp } from './dsp.js';
export { LipAnimator, findClosedFrame } from './animator.js';
