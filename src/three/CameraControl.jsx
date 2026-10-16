// Camera control for the 3D avatar: explicit consent, one-click off, live status. Opt-in (`enableCamera3D`).
// The tracker (and MediaPipe) load only when the visitor presses "Ligar câmera": nobody pays for it otherwise.
import { createElement as h, useEffect, useRef, useState } from 'react';
import { createCameraTracker, CAMERA_MESSAGES } from './camera-tracker.js';
import { createBodyTracker } from './body-tracker.js';
import { createMouthAssist } from './mouth-fusion.js';
import { createMicLevel } from './mic-level.js';

export const CAMERA_TEXT = {
  open: 'Câmera', close: 'Fechar',
  title: 'Copiar meus movimentos',
  explain: 'O avatar vai imitar seu rosto, a cabeça e as expressões usando a sua câmera.',
  privacy: 'A imagem é analisada só neste aparelho. Nada é enviado, gravado ou salvo, e a câmera só fica ligada enquanto você não clicar em Desligar.',
  start: 'Ligar câmera', stop: 'Desligar câmera', recenter: 'Centralizar',
  starting: 'Aguardando a permissão da câmera…', loading: 'Carregando o reconhecimento facial…',
  on: 'Câmera ligada', noFace: 'Não estou vendo seu rosto. Fique de frente para a câmera.',
  mouthGain: 'Sensibilidade da boca', showPreview: 'Mostrar minha câmera ao lado do avatar', previewLabel: 'Sua câmera (espelhada)',
  followBody: 'Seguir meus braços e mãos',
  assistMouth: 'Ajudar a boca com o som do microfone', assistHint: 'Pede o microfone. Só mede o volume: nada é gravado nem enviado.',
  assistOnHint: 'Microfone só mede o volume para abrir a boca quando você fala. Nada é gravado nem enviado.', assistOffHint: 'Desligado: a boca segue só a câmera.', bodyHint: 'Mostre os braços para a câmera. Se me perder, o avatar volta ao normal.', bodyOnHint: 'Braços e mãos ligados. Movimentos limitados e suavizados.',
};

const BUSY = new Set(['starting', 'loading']);
const FAILED = new Set(['denied', 'no-camera', 'busy', 'unsupported', 'load-failed', 'error']);

export default function CameraControl({ getPlayer, text = CAMERA_TEXT, createTracker = createCameraTracker, position = 'bottom-right', holds = {}, bodyTracking = true }) {
  const [panel, setPanel] = useState(false);
  const [state, setState] = useState('off');
  const [message, setMessage] = useState('');
  const trackerRef = useRef(null);
  const live = state === 'on' || state === 'no-face';
  const busy = BUSY.has(state);

  useEffect(() => () => { trackerRef.current?.stop(); trackerRef.current = null; }, []);
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape' && panel && !busy) setPanel(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [panel, busy]);

  function ensureTracker() {
    if (!trackerRef.current) {
      trackerRef.current = createTracker({
        onFrame: (frame) => getPlayer()?.setTracking?.(frame),
        onState: (next, detail) => { setState(next); setMessage(detail?.message || ''); },
      });
    }
    return trackerRef.current;
  }
  const turnOn = () => { void ensureTracker().start(); };
  const turnOff = () => { bodyRef.current?.stop(); trackerRef.current?.stop(); getPlayer()?.setTracking?.(null); getPlayer()?.setArms?.(null); setBodyState('off'); };
  const bodyRef = useRef(null);
  const [bodyState, setBodyState] = useState('off');
  const [bodyMsg, setBodyMsg] = useState('');
  useEffect(() => () => { bodyRef.current?.stop(); bodyRef.current = null; }, []);
  // The body layer needs the live camera, so it is switched off together with it.
  useEffect(() => { if (!live && bodyRef.current) { bodyRef.current.stop(); setBodyState('off'); } }, [live]);
  function toggleBody(on) {
    if (!on) { bodyRef.current?.stop(); return; }
    if (!bodyRef.current) {
      bodyRef.current = createBodyTracker({ holds, getVideo: () => trackerRef.current?.video ?? null,
        onFrame: (frame) => getPlayer()?.setArms?.(frame),
        onState: (s, d) => { setBodyState(s); setBodyMsg(d?.message || ''); } });
    }
    void bodyRef.current.start();
  }
  const [gain, setGain] = useState(1.3);
  // "Ajudar a boca com o som do microfone": ON by default, saved. The microphone is only asked for when the camera is on AND this is on
  // (an explicit, visible action), only its loudness is measured, nothing is recorded or sent.
  const [assistOn, setAssistOn] = useState(() => { try { return localStorage.getItem('ania.mouthAssist') !== '0'; } catch { return true; } });
  const [micState, setMicState] = useState('off');
  const [micMsg, setMicMsg] = useState('');
  const micRef = useRef(null), assistRef = useRef(null);
  useEffect(() => {
    if (!assistRef.current) assistRef.current = createMouthAssist({ enabled: true });
    assistRef.current.setEnabled(assistOn && live);
    try { localStorage.setItem('ania.mouthAssist', assistOn ? '1' : '0'); } catch { /* storage blocked */ }
    if (!assistOn || !live) { micRef.current?.stop(); getPlayer()?.setMouthAssist?.(0); return undefined; }
    if (!micRef.current) {
      micRef.current = createMicLevel({
        onLevel: (level, now) => { const a = assistRef.current; const dt = a._last ? now - a._last : 16; a._last = now; getPlayer()?.setMouthAssist?.(a.update(level, dt)); },
        onState: (s, d) => { setMicState(s); setMicMsg(d?.message || ''); } });
    }
    void micRef.current.start();
    return undefined;
  }, [assistOn, live]);
  useEffect(() => () => { micRef.current?.stop(); micRef.current = null; }, []);
  const [preview, setPreview] = useState(true);
  const canvasRef = useRef(null);
  useEffect(() => { trackerRef.current?.setMouthGain?.(gain); }, [gain, state]);
  // Side-by-side test mode: the user's own camera, mirrored, drawn from the (hidden) tracking video. ~15 fps is plenty for a preview.
  useEffect(() => {
    if (!live || !preview || !panel) return undefined;
    let timer = 0;
    const draw = () => {
      const canvas = canvasRef.current, video = trackerRef.current?.video;
      if (canvas && video && video.videoWidth) {
        const ctx = canvas.getContext('2d');
        if (canvas.width !== 240) { canvas.width = 240; canvas.height = Math.round(240 * video.videoHeight / video.videoWidth); }
        ctx.save(); ctx.scale(-1, 1); ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height); ctx.restore();
      }
      timer = setTimeout(draw, 66);
    };
    draw();
    return () => clearTimeout(timer);
  }, [live, preview, panel]);

  const box = { position: 'absolute', zIndex: 6, [position.includes('top') ? 'top' : 'bottom']: 8, [position.includes('left') ? 'left' : 'right']: 8, display: 'flex', flexDirection: 'column', alignItems: position.includes('left') ? 'flex-start' : 'flex-end', gap: 8, pointerEvents: 'none' };
  const btn = (extra) => ({ pointerEvents: 'auto', cursor: 'pointer', border: '1px solid rgba(255,255,255,.28)', borderRadius: 10, padding: '8px 12px', minHeight: 44, minWidth: 44, font: '600 13px system-ui,sans-serif', color: '#fff', background: 'rgba(15,18,32,.82)', backdropFilter: 'blur(4px)', ...extra });
  const dot = h('span', { 'aria-hidden': 'true', style: { display: 'inline-block', width: 8, height: 8, borderRadius: 8, marginRight: 8, background: live ? (state === 'on' ? '#34d399' : '#fbbf24') : '#94a3b8' } });

  return h('div', { style: box, 'data-ania-camera': state },
    panel && h('div', { role: 'dialog', 'aria-label': text.title, style: { pointerEvents: 'auto', width: 'min(280px, calc(100vw - 32px))', padding: 14, borderRadius: 14, color: '#e2e8f0', background: 'rgba(15,18,32,.94)', border: '1px solid rgba(165,180,252,.35)', font: '13px/1.5 system-ui,sans-serif', boxShadow: '0 12px 32px rgba(0,0,0,.45)' } },
      h('strong', { style: { display: 'block', fontSize: 14, color: '#fff', marginBottom: 4 } }, text.title),
      h('p', { style: { margin: '0 0 6px' } }, text.explain),
      h('p', { style: { margin: '0 0 10px', color: '#aab4c8', fontSize: 12 } }, text.privacy),
      live && preview && h('canvas', { ref: canvasRef, 'aria-label': text.previewLabel, role: 'img', style: { display: 'block', width: '100%', borderRadius: 10, marginBottom: 10, background: '#000', border: '1px solid rgba(255,255,255,.18)' } }),
      live && h('label', { style: { display: 'flex', gap: 8, alignItems: 'flex-start', margin: '0 0 10px', fontSize: 12, cursor: 'pointer' } },
        h('input', { type: 'checkbox', checked: assistOn, onChange: (e) => setAssistOn(e.target.checked), 'data-testid': 'mouth-assist-toggle', style: { accentColor: '#818cf8', marginTop: 2 } }),
        h('span', null, text.assistMouth, h('small', { style: { display: 'block', color: '#aab4c8' } },
          !assistOn ? text.assistOffHint : micState === 'starting' ? micMsg : micState === 'on' ? text.assistOnHint : ['denied', 'no-mic', 'unsupported', 'error'].includes(micState) ? micMsg : text.assistHint))),
      live && bodyTracking && h('label', { style: { display: 'flex', gap: 8, alignItems: 'flex-start', margin: '0 0 10px', fontSize: 12, cursor: 'pointer' } },
        h('input', { type: 'checkbox', checked: bodyState === 'on' || bodyState === 'loading', disabled: bodyState === 'loading', onChange: (e) => toggleBody(e.target.checked), style: { accentColor: '#818cf8', marginTop: 2 } }),
        h('span', null, text.followBody, h('small', { style: { display: 'block', color: '#aab4c8' } }, bodyState === 'loading' ? bodyMsg : bodyState === 'on' ? text.bodyOnHint : bodyState === 'load-failed' || bodyState === 'error' ? bodyMsg : text.bodyHint))),
      live && h('label', { style: { display: 'block', margin: '0 0 8px', fontSize: 12 } },
        `${text.mouthGain}: ${gain.toFixed(1)}×`,
        h('input', { type: 'range', min: 0.5, max: 2.5, step: 0.1, value: gain, 'aria-label': text.mouthGain, onChange: (e) => setGain(Number(e.target.value)), style: { width: '100%', accentColor: '#818cf8' } })),
      live && h('label', { style: { display: 'flex', gap: 8, alignItems: 'center', margin: '0 0 10px', fontSize: 12, cursor: 'pointer' } },
        h('input', { type: 'checkbox', checked: preview, onChange: (e) => setPreview(e.target.checked), style: { accentColor: '#818cf8' } }), text.showPreview),
      (message || state !== 'off') && h('p', { role: FAILED.has(state) ? 'alert' : 'status', 'aria-live': 'polite', style: { margin: '0 0 10px', padding: '6px 8px', borderRadius: 8, fontSize: 12, color: FAILED.has(state) ? '#fecaca' : '#bbf7d0', background: FAILED.has(state) ? 'rgba(127,29,29,.4)' : 'rgba(20,83,45,.35)' } }, message || CAMERA_MESSAGES[state] || ''),
      h('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
        live
          ? h('button', { type: 'button', onClick: turnOff, style: btn({ background: '#b91c1c', borderColor: '#ef4444' }) }, text.stop)
          : h('button', { type: 'button', onClick: turnOn, disabled: busy, style: btn({ background: '#4f46e5', borderColor: '#818cf8', opacity: busy ? .6 : 1 }) }, busy ? (text[state] || message) : text.start),
        live && h('button', { type: 'button', onClick: () => trackerRef.current?.recenter(), style: btn({}) }, text.recenter),
        h('button', { type: 'button', onClick: () => setPanel(false), disabled: busy, style: btn({ opacity: busy ? .5 : 1 }) }, text.close))),
    h('button', { type: 'button', onClick: () => setPanel((v) => !v), 'aria-expanded': panel, 'aria-label': live ? `${text.open}: ${text.on}` : text.open, title: live ? text.stop : text.open, style: btn({}) }, dot, text.open));
}
