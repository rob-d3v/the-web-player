/**
 * Lip sync API service — fetches lip sync config and builds openness map
 */

export const fetchLipSyncConfig = async (serverUrl, contentHash) => {
  try {
    const url = `${serverUrl}/api/avatars/json-config/fetch?contentHash=${encodeURIComponent(contentHash)}&type=lips_sync`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.found || !data.jsonData) return null;
    return data.jsonData;
  } catch (err) {
    console.warn('[LipSyncAPI] Failed to fetch config:', err);
    return null;
  }
};

export const buildOpennessMap = (keyframes, talkLow, talkHigh) => {
  const talkSpan = talkHigh - talkLow;
  if (talkSpan <= 0 || !keyframes || keyframes.length === 0) return [];

  const n = talkSpan + 1;
  const result = new Array(n).fill(0.5);

  const sortedKf = [...keyframes].sort((a, b) => a[0] - b[0]);
  let kfRel = sortedKf.map(([idx, val]) => [
    Math.max(0, Math.min(talkSpan, Math.floor(idx) - talkLow)),
    parseFloat(val)
  ]);

  if (kfRel[0][0] > 0) {
    kfRel = [[0, kfRel[0][1]], ...kfRel];
  }
  if (kfRel[kfRel.length - 1][0] < talkSpan) {
    kfRel = [...kfRel, [talkSpan, kfRel[kfRel.length - 1][1]]];
  }

  for (let i = 0; i < kfRel.length - 1; i++) {
    const [i0, v0] = kfRel[i];
    const [i1, v1] = kfRel[i + 1];
    const span = Math.max(1, i1 - i0);
    for (let j = i0; j <= i1; j++) {
      const t = (j - i0) / span;
      result[j] = v0 + (v1 - v0) * t;
    }
  }

  return result;
};
