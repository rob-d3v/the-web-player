// Política compartilhada por gestos ambientes, respostas e saudação.
// Só acorda por eventos ou pelo único timeout; nunca mantém o render loop vivo.
const COOLDOWN_MS = 20000;
const GREETING_NAMES = new Set(['GREETING', 'SAUDACAO', 'WAVE', 'ACENO']);
const normalizeName = (value) => String(value ?? '').normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();
const isEditable = (element) => !!element && (
  ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) || element.isContentEditable
);

export function createAmbientActions(controller, initialOptions = {}) {
  let options = initialOptions;
  let timer = null;
  let disposed = false;
  let lastActionAt = -Infinity;
  let lastActionId = null;
  const doc = typeof document === 'undefined' ? null : document;
  const motion = typeof window === 'undefined' ? null
    : window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const restores = [];

  const clear = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };
  const configuredActions = () => {
    const configured = controller.getActions?.()
      || Object.values(controller.getActionConfigs?.() || {});
    return configured.filter((action) => action?.id != null)
      .filter((action) => options.actions == null
        || options.actions.some((allowed) => String(allowed.id) === String(action.id)))
      .filter((action) => options.availableActions == null
        || options.availableActions.some((allowed) => String(allowed.id) === String(action.id)));
  };
  const canAct = (allowTalking = false, allowTyping = false) => !disposed
    && options.visible !== false && options.isVisible?.() !== false
    && (!doc || doc.visibilityState === 'visible') && !motion?.matches
    && !options.isListening
    && (allowTyping || (!options.isTyping && !isEditable(doc?.activeElement)))
    && (allowTalking || (!options.isTalking && !controller.isTalking))
    && !controller.isActionPlaying?.();
  const ambientCandidates = () => configuredActions().filter((action) =>
    options.ambientActionIds == null
      || options.ambientActionIds.some((id) => String(id) === String(action.id)));

  const schedule = () => {
    clear();
    if (options.ambientActions === false || !canAct() || !ambientCandidates().length) return;
    const seconds = (value, fallback) => typeof value === 'number' && Number.isFinite(value)
      && value >= 0 ? Math.min(value, 2147483) : fallback;
    const min = Math.max(20, seconds(options.ambientActionMinSeconds, 40));
    const max = Math.max(min, seconds(options.ambientActionMaxSeconds, 90));
    const delay = (min + Math.random() * (max - min)) * 1000;
    timer = setTimeout(() => {
      timer = null;
      if (!canAct()) return;
      if (Date.now() - lastActionAt < COOLDOWN_MS) { schedule(); return; }
      let candidates = ambientCandidates();
      if (candidates.length > 1) {
        candidates = candidates.filter((action) => String(action.id) !== String(lastActionId));
      }
      if (!candidates.length) return;
      controller.triggerAction(candidates[Math.floor(Math.random() * candidates.length)].id);
    }, Math.max(delay, COOLDOWN_MS - (Date.now() - lastActionAt)));
  };

  // Encadeia os métodos, sem ocupar os callbacks usados por atalhos/initialAction.
  // triggerAction segue direto para o controller do runtime.
  const wrap = (name, after) => {
    const original = controller[name];
    if (typeof original !== 'function') return;
    const hadOwn = Object.prototype.hasOwnProperty.call(controller, name);
    const wrapped = function(...args) {
      const result = original.apply(this, args);
      after(result, args);
      schedule();
      return result;
    };
    controller[name] = wrapped;
    restores.push(() => {
      if (controller[name] !== wrapped) return;
      if (hadOwn) controller[name] = original;
      else delete controller[name];
    });
  };
  wrap('triggerAction', (result, args) => {
    if (result === false) return;
    lastActionAt = Date.now();
    lastActionId = args[0];
  });
  wrap('setTalkingState', () => {});
  wrap('configureActions', () => {});
  wrap('cancelAction', () => { options.onActivity?.(); });

  const refresh = () => schedule();
  // O DOM atualiza activeElement depois de focusout; uma microtask basta.
  const onFocusOut = () => { clear(); queueMicrotask(refresh); };
  doc?.addEventListener('visibilitychange', refresh);
  doc?.addEventListener('focusin', refresh);
  doc?.addEventListener('focusout', onFocusOut);
  if (motion?.addEventListener) motion.addEventListener('change', refresh);
  else motion?.addListener?.(refresh);
  schedule();

  return {
    update(nextOptions) { options = nextOptions; schedule(); },
    refresh,
    triggerResponseAction(id, trigger) {
      if (!canAct(true, true) || Date.now() - lastActionAt < COOLDOWN_MS
        || !configuredActions().some((action) => String(action.id) === String(id))) return false;
      return (trigger ? trigger(id) : controller.triggerAction(id)) !== false;
    },
    triggerGreetingAction(setting = 'auto') {
      if (setting === false || !canAct(true)) return false;
      const candidates = configuredActions();
      const action = setting === 'auto'
        ? candidates.find((candidate) => GREETING_NAMES.has(normalizeName(candidate.id))
          || GREETING_NAMES.has(normalizeName(candidate.name)))
        : candidates.find((candidate) => String(candidate.id) === String(setting));
      return action ? controller.triggerAction(action.id) !== false : false;
    },
    dispose() {
      disposed = true;
      clear();
      doc?.removeEventListener('visibilitychange', refresh);
      doc?.removeEventListener('focusin', refresh);
      doc?.removeEventListener('focusout', onFocusOut);
      if (motion?.removeEventListener) motion.removeEventListener('change', refresh);
      else motion?.removeListener?.(refresh);
      restores.reverse().forEach((restore) => restore());
    }
  };
}
