// Quality tier selection ("modo automatico"). Pure logic: examples/test-quality.mjs. The measurements come from quality-bench.js (browser).
//
// Tiers:  'full'  = 3D completo (pixel ratio up to 1.5, 30 fps, full textures, antialias, outlines)
//         'light' = 3D leve (at most ~0.4 megapixel drawn, textures downscaled to 1024, 24 fps, no antialias, no outlines)
//         '2d'    = 2D (the 3D is too heavy for this device; a light 2D pack is recommended)
// The choice is a recommendation: the user can always override it and the override is saved.

export const TIERS = Object.freeze(['full', 'light', '2d']);

/** What each tier changes in the viewer. */
// maxPixels = drawn pixels budget (CSS size x pixel ratio²); software GPUs pay per pixel, so the light tier caps it.
export const TIER_SETTINGS = Object.freeze({
  full: Object.freeze({ pixelRatioMax: 1.5, fps: 30, textureMax: 2048, antialias: true, outlines: true, maxPixels: 2.4e6 }),
  light: Object.freeze({ pixelRatioMax: 1, fps: 24, textureMax: 1024, antialias: false, outlines: false, maxPixels: 3e5 }),
  '2d': Object.freeze({ pixelRatioMax: 1, fps: 24, textureMax: 1024, antialias: false, outlines: false, maxPixels: 3e5 }),
});

const num = (v) => (v === null || v === undefined || v === '' ? null : Number.isFinite(Number(v)) ? Number(v) : null);

/**
 * @param {{webgl?:boolean, softwareRenderer?:boolean, caveat?:boolean, fps?:number, loadMs?:number, memoryGB?:number, cores?:number, jsHeapMB?:number}} m
 *   caveat: the browser itself flags a "major performance caveat" for WebGL (GPU blocked by the driver list, or software).
 * @returns {{tier:'full'|'light'|'2d', reasons:string[], camera:{allowed:boolean, reason:string}}}
 */
export function chooseTier(m = {}) {
  const reasons = [];
  const fps = num(m.fps), loadMs = num(m.loadMs), mem = num(m.memoryGB), cores = num(m.cores);
  // No WebGL, or software rendering (SwiftShader/llvmpipe): 3D would crawl. Raspberry Pi without GPU acceleration lands here.
  if (m.webgl === false) return { tier: '2d', reasons: ['Este aparelho não tem WebGL.'], camera: { allowed: false, reason: 'A câmera precisa do 3D, que não roda aqui.' } };
  if (m.softwareRenderer) reasons.push('Sem aceleração de vídeo (renderização por software).');
  else if (m.caveat) reasons.push('O navegador avisa que o vídeo deste computador é lento para 3D.');
  let score = 2; // 2 = full, 1 = light, 0 = 2d
  if (m.softwareRenderer) score = Math.min(score, 0);
  if (m.caveat) score = Math.min(score, 1);
  if (fps !== null) { if (fps < 12) { score = Math.min(score, 0); reasons.push(`Só ${Math.round(fps)} quadros por segundo no teste.`); } else if (fps < 26) { score = Math.min(score, 1); reasons.push(`${Math.round(fps)} quadros por segundo no teste.`); } }
  if (mem !== null && mem <= 2) { score = Math.min(score, 1); reasons.push(`Pouca memória (${mem} GB).`); }
  if (mem !== null && mem <= 1) score = Math.min(score, 0);
  if (cores !== null && cores <= 2) { score = Math.min(score, 1); reasons.push(`Poucos núcleos (${cores}).`); }
  if (loadMs !== null && loadMs > 9000) { score = Math.min(score, 1); reasons.push('Carregamento do modelo lento.'); }
  const tier = score >= 2 ? 'full' : score === 1 ? 'light' : '2d';
  if (!reasons.length) reasons.push('Aparelho com folga para o 3D completo.');
  // The camera needs the 3D to be smooth AND room for the tracker: only where it holds.
  const camera = tier === 'full' ? { allowed: true, reason: '' }
    : tier === 'light' && (fps === null || fps >= 18) && (mem === null || mem > 2) ? { allowed: true, reason: '' }
    : { allowed: false, reason: tier === '2d' ? 'A câmera fica desligada: o 3D não roda bem neste aparelho.' : 'A câmera fica desligada: este aparelho está no limite do 3D.' };
  return { tier, reasons, camera };
}

const KEY = 'ania.quality';
/** Saved user choice wins over the benchmark. 'auto' (or nothing) means: use the benchmark's recommendation. */
export function resolveTier({ saved, recommended } = {}) {
  if (TIERS.includes(saved)) return { tier: saved, source: 'user' };
  return { tier: TIERS.includes(recommended) ? recommended : 'full', source: TIERS.includes(recommended) ? 'auto' : 'default' };
}
export const readSavedTier = (storage) => { try { const v = storage?.getItem(KEY); return TIERS.includes(v) ? v : 'auto'; } catch { return 'auto'; } };
export const saveTier = (storage, tier) => { try { if (TIERS.includes(tier)) storage.setItem(KEY, tier); else storage.removeItem(KEY); } catch { /* storage blocked: the choice just is not remembered */ } };

/** One line the UI can show for the active tier. */
export function tierLabel(tier) { return { full: '3D completo', light: '3D leve', '2d': '2D' }[tier] || '3D completo'; }
