/**
 * Lip sync API service — descobre, baixa e classifica as configurações de lip
 * sync que vivem no servidor ANIA, e converte os keyframes escolhidos no mapa
 * de abertura de boca que o AnimationController consome.
 *
 * Espelha o que o player DESKTOP faz (ania_player/main_player.py
 * `_try_fetch_lips_sync_config` + dialog_manager `_browse_lips_configs`), com
 * uma diferença: o desktop mostra uma lista para a pessoa escolher, e aqui não
 * há ninguém para escolher — o widget roda sozinho no site do cliente. Por isso
 * o navegador baixa os candidatos e ESCOLHE O MELHOR sozinho (ver
 * `scoreLipSyncConfig`): qualquer avatar aceita até 10 uploads de lip sync do
 * mesmo tipo, e na prática vêm configs pela metade, com 2 keyframes ou cobrindo
 * só um pedaço do range de fala.
 *
 * Endpoints (backend Spring, AvatarController):
 *   GET /api/avatars/json-config/list?contentHash=..&type=lips_sync
 *       -> [{ configId, configName, isActive }]  (APPROVED, mais recente antes)
 *   GET /api/avatars/json-config/fetch?contentHash=..&type=lips_sync
 *       -> { found, configName, jsonData }       (a ativa; senão a mais recente)
 *   GET /api/avatars/json-config/fetch?configId=..
 *       -> { found, configName, jsonData }       (uma específica)
 *
 * ATENÇÃO: `jsonData` vem como STRING JSON (o servidor devolve o arquivo cru do
 * R2), não como objeto. Antes deste módulo fazer o parse, o widget lia
 * `config.lips_sync_keyframes` de uma string e recebia `undefined` — ou seja, a
 * config do servidor nunca era aplicada de fato.
 */

/**
 * Mesma origem que o player desktop usa por padrão (ANIA_API_URL). O host pode
 * trocar com a prop `lipSyncServerUrl` (ex.: um proxy da própria aplicação).
 * Sem `/api` no fim: as funções abaixo montam o caminho completo.
 */
export const DEFAULT_LIP_SYNC_SERVER_URL =
  'https://0iadasasasmasmdams2ma22xxhhh2.housestudio.online';

/** Quantas configs baixar para comparar antes de escolher (o servidor guarda até 10). */
const DEFAULT_MAX_CANDIDATES = 5;

/** Timeout de rede por requisição — o desktop usa 8s; nada pode travar o mount. */
const DEFAULT_TIMEOUT_MS = 8000;

const trimUrl = (serverUrl) => String(serverUrl || '').replace(/\/+$/, '');

const withTimeout = async (url, timeoutMs) => {
  // AbortController existe em todo browser suportado; sem ele o fetch fica sem
  // teto e uma API lenta seguraria o lip sync para sempre.
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    return await fetch(url, controller ? { signal: controller.signal } : undefined);
  } finally {
    if (timer) clearTimeout(timer);
  }
};

/**
 * `jsonData` chega como string JSON; algumas ferramentas antigas já mandaram o
 * objeto direto, e o web studio embrulha em `{ config: {...} }`. Aceita os três.
 * @returns {object|null}
 */
export const parseLipSyncConfig = (raw) => {
  if (!raw) return null;
  let data = raw;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (err) {
      console.warn('[LipSyncAPI] jsonData is not valid JSON:', err);
      return null;
    }
  }
  if (!data || typeof data !== 'object') return null;
  // Formatos aninhados vistos em uploads antigos.
  if (!data.lips_sync_keyframes && data.config && typeof data.config === 'object') {
    data = data.config;
  }
  if (!data.lips_sync_keyframes && data.lipsync && typeof data.lipsync === 'object') {
    data = data.lipsync;
  }
  return data;
};

/**
 * Hash do conteúdo do avatar: SHA-256 sobre a concatenação UTF-8 das strings de
 * frame, na ordem do arquivo. É a MESMA conta do desktop
 * (`license_verifier.calculate_content_hash`) e do web studio
 * (`computeContentHash` em aniaWriter.ts) — é essa chave que o servidor usa para
 * achar o avatar (`Avatar.contentHash`, UNIQUE).
 *
 * Usado só como plano B: os .ania exportados pelo studio já trazem
 * `contentHash` no JSON, e os licenciados trazem em `license.contentHash`.
 *
 * @param {string[]} frames frames base64 do .ania
 * @returns {Promise<string|null>} hex de 64 chars, ou null sem WebCrypto
 */
export const computeContentHash = async (frames) => {
  if (!Array.isArray(frames) || frames.length === 0) return null;
  if (typeof crypto === 'undefined' || !crypto.subtle) return null;
  try {
    const encoder = new TextEncoder();
    const parts = frames.map((f) => encoder.encode(typeof f === 'string' ? f : String(f)));
    const total = parts.reduce((sum, p) => sum + p.length, 0);
    const buf = new Uint8Array(total);
    let offset = 0;
    for (const part of parts) {
      buf.set(part, offset);
      offset += part.length;
    }
    const digest = await crypto.subtle.digest('SHA-256', buf);
    const bytes = new Uint8Array(digest);
    let hex = '';
    for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, '0');
    return hex;
  } catch (err) {
    console.warn('[LipSyncAPI] Failed to compute contentHash:', err);
    return null;
  }
};

/**
 * Config que o servidor considera a boa da vez (a ativa; senão a APPROVED mais
 * recente). Mantida com a assinatura original — agora devolvendo objeto já
 * parseado em vez da string crua.
 */
export const fetchLipSyncConfig = async (serverUrl, contentHash, options = {}) => {
  const { timeoutMs = DEFAULT_TIMEOUT_MS } = options;
  try {
    const url = `${trimUrl(serverUrl)}/api/avatars/json-config/fetch?contentHash=${encodeURIComponent(contentHash)}&type=lips_sync`;
    const response = await withTimeout(url, timeoutMs);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.found || !data.jsonData) return null;
    return parseLipSyncConfig(data.jsonData);
  } catch (err) {
    console.warn('[LipSyncAPI] Failed to fetch config:', err);
    return null;
  }
};

/** Uma config específica pelo id (usado depois do /list). */
export const fetchLipSyncConfigById = async (serverUrl, configId, options = {}) => {
  const { timeoutMs = DEFAULT_TIMEOUT_MS } = options;
  try {
    const url = `${trimUrl(serverUrl)}/api/avatars/json-config/fetch?configId=${encodeURIComponent(configId)}`;
    const response = await withTimeout(url, timeoutMs);
    if (!response.ok) return null;
    const data = await response.json();
    if (!data.found || !data.jsonData) return null;
    return parseLipSyncConfig(data.jsonData);
  } catch (err) {
    console.warn('[LipSyncAPI] Failed to fetch config by id:', err);
    return null;
  }
};

/**
 * Lista as configs de lip sync APROVADAS do avatar.
 * @returns {Promise<Array<{configId:string, configName:string, isActive:boolean}>>}
 */
export const listLipSyncConfigs = async (serverUrl, contentHash, options = {}) => {
  const { timeoutMs = DEFAULT_TIMEOUT_MS } = options;
  try {
    const url = `${trimUrl(serverUrl)}/api/avatars/json-config/list?contentHash=${encodeURIComponent(contentHash)}&type=lips_sync`;
    const response = await withTimeout(url, timeoutMs);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn('[LipSyncAPI] Failed to list configs:', err);
    return [];
  }
};

/**
 * Nota de qualidade de uma config de lip sync. Quanto maior, melhor — `-Infinity`
 * significa inutilizável (sem keyframes aproveitáveis).
 *
 * A régua sai do que estraga o lip sync na prática, em ordem de peso:
 *
 * 1. COBERTURA do range de fala. Uma config que só marca o começo da fala deixa
 *    o resto da animação com a boca travada. É o defeito mais comum e o mais
 *    visível, então vale mais que todo o resto.
 * 2. AMPLITUDE. Se todos os valores são iguais a boca nunca abre nem fecha —
 *    tecnicamente válido, visualmente morto.
 * 3. DENSIDADE de keyframes, com retorno decrescente: 12 keyframes bem
 *    distribuídos já dão uma curva boa; 60 não são 5x melhores.
 * 4. Marca de ATIVA. Empate desempatado por quem o dono do avatar (ou o
 *    moderador) escolheu — é curadoria humana, mas não compensa uma config
 *    objetivamente pela metade.
 * 5. AJUSTE FINO presente (intensidade/responsividade/sustain/wiggle): sinal de
 *    config terminada, não de rascunho.
 *
 * @param {object} config config já parseada
 * @param {{talkLow?:number, talkHigh?:number, isActive?:boolean, order?:number}} ctx
 * @returns {number}
 */
export const scoreLipSyncConfig = (config, ctx = {}) => {
  if (!config || typeof config !== 'object') return -Infinity;
  const kf = config.lips_sync_keyframes;
  if (!Array.isArray(kf) || kf.length === 0) return -Infinity;

  // Keyframes válidos: [frameIndex, openness] com números de verdade. Uploads
  // quebrados (strings, nulls, pares incompletos) são simplesmente descartados.
  const valid = [];
  for (const entry of kf) {
    if (!Array.isArray(entry) || entry.length < 2) continue;
    const idx = Number(entry[0]);
    const val = Number(entry[1]);
    if (!Number.isFinite(idx) || !Number.isFinite(val)) continue;
    valid.push([idx, val]);
  }
  if (valid.length === 0) return -Infinity;

  const talkLow = Number.isFinite(ctx.talkLow) ? ctx.talkLow : null;
  const talkHigh = Number.isFinite(ctx.talkHigh) ? ctx.talkHigh : null;

  let score = 0;

  // 1. Cobertura (0-45). Sem o range de fala conhecido, dá um crédito neutro.
  if (talkLow != null && talkHigh != null && talkHigh > talkLow) {
    const span = talkHigh - talkLow;
    const inRange = valid.filter(([i]) => i >= talkLow && i <= talkHigh);
    if (inRange.length === 0) {
      // Keyframes todos fora do range de fala deste arquivo: config de outro
      // avatar/corte. buildOpennessMap ia grampear tudo num extremo só.
      return -Infinity;
    }
    const indices = inRange.map(([i]) => i);
    const covered = (Math.max(...indices) - Math.min(...indices)) / span;
    score += Math.max(0, Math.min(1, covered)) * 45;
    // Penaliza quem perdeu muitos keyframes fora do range (mistura de arquivos).
    score -= (valid.length - inRange.length) * 1.5;
  } else {
    score += 22;
  }

  // 2. Amplitude (0-20): diferença entre boca mais fechada e mais aberta.
  const values = valid.map(([, v]) => v);
  const amplitude = Math.max(...values) - Math.min(...values);
  score += Math.max(0, Math.min(1, amplitude)) * 20;

  // 3. Densidade (0-20), saturando em ~15 keyframes.
  score += Math.min(1, valid.length / 15) * 20;

  // 4. Curadoria humana (ativa) e ordem de recência vinda do /list.
  if (ctx.isActive) score += 12;
  if (Number.isFinite(ctx.order)) score += Math.max(0, 5 - ctx.order);

  // 5. Ajuste fino presente.
  if (Number.isFinite(Number(config.lips_sync_sync_intensity))) score += 2;
  if (Number.isFinite(Number(config.lips_sync_responsiveness))) score += 2;
  if (config.lips_sync_sustain_style) score += 2;
  if (Number.isFinite(Number(config.lips_sync_wiggle_speed))) score += 2;

  // Valores fora de 0..1 indicam escala errada (ex.: 0-100): ainda dá para usar
  // (buildOpennessMap interpola), mas perde para uma config bem normalizada.
  if (values.some((v) => v < 0 || v > 1)) score -= 15;

  return score;
};

/**
 * Baixa a MELHOR config de lip sync disponível para o avatar.
 *
 * Fluxo: lista o que existe -> baixa os primeiros `maxCandidates` (a ativa
 * sempre entre eles) -> pontua cada um com `scoreLipSyncConfig` -> devolve o
 * vencedor. Se o /list não responder nada (servidor antigo, avatar sem configs
 * aprovadas), cai no /fetch simples, que é o que o desktop faz.
 *
 * @param {string} serverUrl origem da API (sem /api)
 * @param {string} contentHash hash do avatar
 * @param {{talkLow?:number, talkHigh?:number, maxCandidates?:number, timeoutMs?:number}} options
 * @returns {Promise<{config:object, configId:string|null, configName:string|null,
 *   isActive:boolean, score:number, candidates:number}|null>}
 */
export const fetchBestLipSyncConfig = async (serverUrl, contentHash, options = {}) => {
  const {
    talkLow = null,
    talkHigh = null,
    maxCandidates = DEFAULT_MAX_CANDIDATES,
    timeoutMs = DEFAULT_TIMEOUT_MS
  } = options;

  if (!serverUrl || !contentHash) return null;

  const listed = await listLipSyncConfigs(serverUrl, contentHash, { timeoutMs });

  // Sem lista utilizável: caminho simples (a config que o servidor elege).
  if (!listed.length) {
    const config = await fetchLipSyncConfig(serverUrl, contentHash, { timeoutMs });
    if (!config) return null;
    const score = scoreLipSyncConfig(config, { talkLow, talkHigh, isActive: true, order: 0 });
    if (score === -Infinity) return null;
    return { config, configId: null, configName: null, isActive: true, score, candidates: 1 };
  }

  // A ativa primeiro; o resto na ordem do servidor (reviewedAt desc).
  const ordered = [
    ...listed.filter((c) => c && c.isActive),
    ...listed.filter((c) => c && !c.isActive)
  ].filter((c) => c && c.configId);
  const candidates = ordered.slice(0, Math.max(1, maxCandidates));

  const downloaded = await Promise.all(
    candidates.map(async (meta, order) => {
      const config = await fetchLipSyncConfigById(serverUrl, meta.configId, { timeoutMs });
      if (!config) return null;
      return {
        config,
        configId: meta.configId,
        configName: meta.configName || null,
        isActive: !!meta.isActive,
        score: scoreLipSyncConfig(config, { talkLow, talkHigh, isActive: meta.isActive, order }),
        candidates: candidates.length
      };
    })
  );

  const usable = downloaded.filter((d) => d && d.score !== -Infinity);
  if (!usable.length) return null;

  usable.sort((a, b) => b.score - a.score);
  return usable[0];
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
