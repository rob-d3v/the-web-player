// Microphone LEVEL only. Asks for the microphone with an explicit user action, measures loudness with an AnalyserNode and throws the samples away:
// nothing is recorded, stored or sent, and the audio is never routed to the speakers. Environment is injectable for tests.
export function createMicLevel({ onLevel, onState, env: envOverride } = {}) {
  const env = {
    getUserMedia: (c) => navigator.mediaDevices.getUserMedia(c),
    AudioContext: typeof AudioContext !== 'undefined' ? AudioContext : null,
    schedule: (fn, ms) => setTimeout(fn, ms), cancel: (id) => clearTimeout(id), now: () => performance.now(),
    ...(envOverride || {}),
  };
  let state = 'off', session = 0, stream = null, ctx = null, analyser = null, buf = null, timer = null;
  const set = (s, message) => { state = s; onState?.(s, { message }); };
  const MESSAGES = { denied: 'Sem permissão do microfone. O avatar segue só a câmera.', 'no-mic': 'Nenhum microfone encontrado. O avatar segue só a câmera.', unsupported: 'Este navegador não permite medir o microfone.', error: 'Não consegui usar o microfone.' };
  const kind = (e) => { const n = e?.name; if (n === 'NotAllowedError' || n === 'SecurityError' || n === 'PermissionDeniedError') return 'denied'; if (n === 'NotFoundError' || n === 'DevicesNotFoundError') return 'no-mic'; return 'error'; };

  async function start() {
    if (state === 'on' || state === 'starting') return false;
    if (!env.AudioContext || !env.getUserMedia) { set('unsupported', MESSAGES.unsupported); return false; }
    const ticket = ++session; set('starting', 'Aguardando a permissão do microfone…');
    try {
      const media = await env.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false });
      if (ticket !== session) { media.getTracks().forEach((t) => t.stop()); return false; }
      stream = media; ctx = new env.AudioContext(); analyser = ctx.createAnalyser(); analyser.fftSize = 1024; buf = new Uint8Array(analyser.fftSize);
      const source = ctx.createMediaStreamSource(stream); source.connect(analyser);   // deliberately NOT connected to ctx.destination
      set('on', 'Microfone ligado'); loop(ticket); return true;
    } catch (e) { cleanup(); const k = kind(e); set(k, MESSAGES[k]); return false; }
  }
  function loop(ticket) {
    if (ticket !== session || !analyser) return;
    analyser.getByteTimeDomainData(buf);
    let s = 0; for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; s += v * v; }
    onLevel?.(Math.sqrt(s / buf.length), env.now());
    timer = env.schedule(() => loop(ticket), 33);
  }
  function cleanup() {
    if (timer !== null) { env.cancel(timer); timer = null; }
    try { stream?.getTracks().forEach((t) => t.stop()); } catch { /* already stopped */ }
    try { ctx?.close?.(); } catch { /* closed */ }
    stream = ctx = analyser = buf = null;
  }
  function stop() { session++; cleanup(); if (state !== 'off') { onLevel?.(0, env.now()); set('off'); } }
  return { start, stop, get state() { return state; } };
}
