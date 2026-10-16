import { createAvatar3DViewer } from './index.js';
import { visemesFromBands } from './visemes.js';

/** Bridge to the existing chatbot controller; owns no TTS/context/chat state. */
export function create3DPlayerAdapter(container, { getRms = () => 0, getBands = () => null } = {}) {
  const viewer = createAvatar3DViewer(container);
  let disposed = false, frameId = 0, info = null, active = null, talking = false;
  let pulse = 0, pulseUntil = 0, envelope = 0, previous = 0, paused = false;
  const configs = () => (info?.actions || []).map((a, i) => ({ id: a.id, name: a.label, hotkey: i < 9 ? String(i + 1) : null }));
  function closeMouth() { pulse = 0; pulseUntil = 0; envelope = 0; viewer.setSpeechLevel(0); viewer.setVisemes(null); }
  function cancelAction() {
    const id = active; active = null; viewer.stopAction();
    if (id !== null) controller.onActionCancelCallback?.(id);
  }
  function dispose() {
    if (disposed) return;
    disposed = true; cancelAnimationFrame(frameId); closeMouth(); viewer.dispose(); active = null;
  }
  const controller = {
    get isTalking() { return talking; },
    get is3D() { return true; },
    setTalkingState(value) { talking = !!value; if (!talking) closeMouth(); },
    forceLipsClosed: closeMouth,
    pushSyntheticOpenness(value) { pulse = Math.max(0, Math.min(1, Number(value) || 0)); pulseUntil = performance.now() + 180; },
    getActions: configs,
    getActionConfigs: () => Object.fromEntries(configs().map((a) => [a.id, a])),
    isActionPlaying: () => active !== null,
    triggerAction(id) {
      if (disposed || !info?.actions.some((a) => a.id === id)) return false;
      cancelAction(); viewer.playAction(id); active = id; controller.onActionStartCallback?.(id); return true;
    },
    cancelAction,
    cleanup: dispose,
  };
  const tick = (now) => {
    if (disposed) return;
    if (now - previous >= 1000 / 30) {
      previous = now;
      if (active !== null && typeof viewer.isActionPlaying === 'function' && !viewer.isActionPlaying()) {
        active = null; controller.onActionCompleteCallback?.();
      }
      if (talking && !paused) {
        const rms = Number(getRms()) || 0;
        const synthetic = now < pulseUntil ? pulse * ((pulseUntil - now) / 180) : 0;
        const target = Math.max(Math.min(1, Math.max(0, (rms - .012) * 5)), synthetic);
        envelope += (target - envelope) * (target > envelope ? .5 : .25);
        const level = envelope < .005 ? 0 : envelope;
        // With a live spectrum the mouth takes a shape (a/e/i/o/u); without one (synthetic pulses, suspended audio
        // context) it falls back to the plain loudness opening that has always shipped.
        const bands = level > 0 && synthetic === 0 ? getBands() : null;
        if (bands) { viewer.setSpeechLevel(0); viewer.setVisemes(visemesFromBands(level, bands)); }
        else { viewer.setVisemes(null); viewer.setSpeechLevel(level); }
      }
    }
    frameId = requestAnimationFrame(tick);
  };
  frameId = requestAnimationFrame(tick);
  return {
    animationController: controller,
    async load(project) {
      if (!(project?.model instanceof Blob) || !/\.(vrm|glb)$/i.test(project.name || '')) throw new Error('Projeto 3D inválido. Abra um VRM ou GLB no Creators.');
      if (project.model.size > 32 * 1024 * 1024) throw new Error('O limite do avatar é 32 MB.');
      const buffer = await project.model.arrayBuffer();
      if (disposed) throw new Error('O visualizador foi fechado.');
      info = await viewer.load(buffer, project.name);
      if (disposed) throw new Error('O visualizador foi fechado.');
      this.applySettings(project);
      return this;
    },
    applySettings(project) {
      if (disposed || !info) return;
      viewer.setIdle(project.idle !== false);
      for (const name of info.expressions) viewer.setExpression(name, project.expressionValues?.[name] ?? 0);
    },
    setTalkingState: controller.setTalkingState,
    /** Webcam mirror frame, or null to stop. While set, it overrides the idle sway and the automatic blink. */
    setTracking(frame) { if (!disposed) viewer.setTracking(frame); },
    setFraming(mode) { if (!disposed) viewer.setFraming(mode); },
    setArms(frame) { if (!disposed) viewer.setArms(frame); },
    setQuality(tier) { if (!disposed) viewer.setQuality(tier); },
    setMouthAssist(value) { if (!disposed) viewer.setMouthAssist(value); },
    faceSupport() { return disposed ? {} : viewer.faceSupport(); },
    play() { paused = false; },
    pause() { paused = true; closeMouth(); },
    stop: dispose,
    dispose,
  };
}
