/**
 * Command / external-control API — browser port of the desktop Ania Player
 * socket command set (src/ania_player/cli_client.py + ania_commands.md).
 *
 * `executeCommand(line, ctx)` parses a single command line and drives the
 * embedded avatar. `ctx` wires the command verbs to the live app:
 *
 *   ctx = {
 *     player,              // AniaPlayer instance (has .animationController, play, pause)
 *     getActions,          // () => ActionInfo[]  (id+name, ordered)
 *     triggerAction,       // (id) => void
 *     cancelAction,        // () => void
 *     speak,               // (text, opts) => void          — TTS literal
 *     ask,                 // (text) => Promise|void        — send to chatbot/LLM
 *     setVisible,          // (bool) => void                — show/hide widget
 *     getVisible,          // () => bool
 *     setMuted,            // (bool) => void                — mic mute
 *     setSensitivity,      // (0..1) => void
 *     triggerWake,         // () => void                    — fire wake pipeline
 *     flowGoto,            // (nodeId) => void              — jump the NO-AI flow
 *     stopSpeaking,        // () => void                    — cancel TTS/listen
 *     onInfo,              // (infoObject) => void          — optional sink
 *     logger,              // defaults to console
 *   }
 *
 * Returns { ok: boolean, message: string, data?: any }.
 */

export const COMMAND_LIST = [
  { cmd: 'show', desc: 'Show the avatar (resume animation).' },
  { cmd: 'hide', desc: 'Hide the avatar (pause animation).' },
  { cmd: 'toggle', desc: 'Toggle avatar visibility.' },
  { cmd: 'action <id|index>', desc: 'Trigger an action by id or 1-based position.' },
  { cmd: 'actions', desc: 'List available actions (index, id, name).' },
  { cmd: 'info', desc: 'Report player info (visible, talking, action list).' },
  { cmd: 'speed <idle> [talk]', desc: 'Set idle (and optional talk) speed. talk defaults to idle.' },
  { cmd: 'sensitivity <0..1>', desc: 'Set microphone sensitivity.' },
  { cmd: 'mute', desc: 'Mute microphone capture.' },
  { cmd: 'unmute', desc: 'Unmute microphone capture.' },
  { cmd: 'tts <text>', desc: 'Speak literal text via TTS (no LLM).' },
  { cmd: 'ask <text>', desc: 'Send text to the chatbot/LLM; reply is spoken.' },
  { cmd: 'provider <text>', desc: 'Alias of "ask".' },
  { cmd: 'flow <nodeId>', desc: 'Jump the NO-AI flow to a node id.' },
  { cmd: 'wake', desc: 'Trigger the wake/assistant pipeline manually.' },
  { cmd: 'stop', desc: 'Stop speaking / listening.' },
  { cmd: 'help', desc: 'List all commands.' },
];

const helpText = () =>
  'Commands:\n' + COMMAND_LIST.map((c) => `  ${c.cmd.padEnd(22)} ${c.desc}`).join('\n');

/** Split a command line into [verb, ...args], respecting quoted strings. */
export const parseCommandLine = (line) => {
  const trimmed = String(line || '').trim();
  if (!trimmed) return { verb: '', args: [], rest: '' };
  const match = trimmed.match(/^(\S+)\s*(.*)$/s);
  const verb = (match ? match[1] : trimmed).toLowerCase();
  const rest = match ? match[2] : '';
  // tokenize args honoring "double" and 'single' quotes
  const args = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m;
  while ((m = re.exec(rest)) !== null) {
    args.push(m[1] ?? m[2] ?? m[3]);
  }
  return { verb, args, rest: rest.trim() };
};

const resolveActionId = (actions, token) => {
  if (!actions || actions.length === 0) return null;
  // literal id wins (parity with desktop)
  const byId = actions.find((a) => a.id === token);
  if (byId) return byId.id;
  // 1-based index fallback
  const idx = parseInt(token, 10);
  if (!Number.isNaN(idx) && idx >= 1 && idx <= actions.length) {
    return actions[idx - 1].id;
  }
  return null;
};

/**
 * Execute one command line against `ctx`.
 * @param {string} line
 * @param {Object} ctx
 * @returns {{ok: boolean, message: string, data?: any}}
 */
export const executeCommand = (line, ctx = {}) => {
  const logger = ctx.logger || console;
  const { verb, args, rest } = parseCommandLine(line);
  const ok = (message, data) => ({ ok: true, message, data });
  const err = (message) => ({ ok: false, message });

  try {
    switch (verb) {
      case '':
        return err('Empty command. Try "help".');

      case 'show':
        if (ctx.setVisible) ctx.setVisible(true);
        if (ctx.player && ctx.player.play) ctx.player.play();
        return ok('Avatar shown.');

      case 'hide':
        if (ctx.setVisible) ctx.setVisible(false);
        if (ctx.player && ctx.player.pause) ctx.player.pause();
        return ok('Avatar hidden.');

      case 'toggle': {
        const current = ctx.getVisible ? ctx.getVisible() : true;
        const next = !current;
        if (ctx.setVisible) ctx.setVisible(next);
        if (ctx.player) {
          if (next && ctx.player.play) ctx.player.play();
          else if (!next && ctx.player.pause) ctx.player.pause();
        }
        return ok(`Avatar ${next ? 'shown' : 'hidden'}.`);
      }

      case 'action': {
        const actions = ctx.getActions ? ctx.getActions() : [];
        if (!args[0]) return err('Usage: action <id|index>');
        const id = resolveActionId(actions, args[0]);
        if (!id) return err(`No action matches "${args[0]}".`);
        if (ctx.triggerAction) ctx.triggerAction(id);
        return ok(`Action "${id}" triggered.`, { id });
      }

      case 'actions': {
        const actions = ctx.getActions ? ctx.getActions() : [];
        const data = actions.map((a, i) => ({ index: i + 1, id: a.id, name: a.name }));
        const msg = data.length
          ? data.map((a) => `${a.index}) ${a.name} — id=${a.id}`).join('\n')
          : 'No actions available.';
        return ok(msg, data);
      }

      case 'info': {
        const actions = ctx.getActions ? ctx.getActions() : [];
        const info = {
          visible: ctx.getVisible ? ctx.getVisible() : undefined,
          talking: ctx.player && ctx.player.animationController
            ? !!ctx.player.animationController.isTalking
            : undefined,
          actions: actions.map((a, i) => ({ index: i + 1, id: a.id, name: a.name })),
        };
        if (ctx.onInfo) ctx.onInfo(info);
        return ok('Player info.', info);
      }

      case 'speed': {
        if (!args[0]) return err('Usage: speed <idle> [talk]');
        const idle = parseFloat(args[0]);
        if (Number.isNaN(idle)) return err('Invalid idle speed.');
        const talk = args[1] != null && !Number.isNaN(parseFloat(args[1]))
          ? parseFloat(args[1]) : idle;
        const ctrl = ctx.player && ctx.player.animationController;
        if (ctrl) {
          if (ctrl.setIdleSpeed) ctrl.setIdleSpeed(idle);
          if (ctrl.setTalkSpeed) ctrl.setTalkSpeed(talk);
        }
        if (ctx.setSpeeds) ctx.setSpeeds(idle, talk);
        return ok(`Speed set: idle=${idle}, talk=${talk}.`, { idle, talk });
      }

      case 'sensitivity': {
        const v = parseFloat(args[0]);
        if (Number.isNaN(v)) return err('Usage: sensitivity <0..1>');
        const clamped = Math.max(0, Math.min(1, v));
        if (ctx.setSensitivity) ctx.setSensitivity(clamped);
        return ok(`Sensitivity set to ${clamped}.`, { sensitivity: clamped });
      }

      case 'mute':
        if (ctx.setMuted) ctx.setMuted(true);
        return ok('Microphone muted.');

      case 'unmute':
        if (ctx.setMuted) ctx.setMuted(false);
        return ok('Microphone unmuted.');

      case 'tts': {
        if (!rest) return err('Usage: tts <text>');
        if (ctx.speak) ctx.speak(rest, { cancelPrevious: true });
        else return err('No TTS handler wired.');
        return ok('Speaking.', { text: rest });
      }

      case 'ask':
      case 'provider': {
        if (!rest) return err(`Usage: ${verb} <text>`);
        if (ctx.ask) { ctx.ask(rest); return ok('Asked.', { text: rest }); }
        return err('No chatbot/LLM handler wired.');
      }

      case 'flow': {
        if (!args[0]) return err('Usage: flow <nodeId>');
        if (ctx.flowGoto) { ctx.flowGoto(args[0]); return ok(`Flow jumped to "${args[0]}".`, { nodeId: args[0] }); }
        return err('No flow engine wired.');
      }

      case 'wake':
      case 'assistant':
        if (ctx.triggerWake) { ctx.triggerWake(); return ok('Wake pipeline triggered.'); }
        return err('No wake handler wired.');

      case 'stop':
        if (ctx.stopSpeaking) ctx.stopSpeaking();
        return ok('Stopped.');

      case 'help':
        return ok(helpText(), COMMAND_LIST);

      default:
        return err(`Unknown command "${verb}". Try "help".`);
    }
  } catch (e) {
    logger.warn('[commands] executeCommand failed:', e);
    return err(`Command error: ${e && e.message ? e.message : e}`);
  }
};

/**
 * Install an origin-allowlisted window.postMessage listener that runs incoming
 * commands. Host pages drive the avatar via:
 *   window.postMessage({ source: 'ania', cmd: 'action 1' }, targetOrigin)
 *
 * @param {Object} ctx          the executeCommand context (see above)
 * @param {Object} [options]
 * @param {string[]} [options.origins]  allowed origins ('*' allows all — unsafe)
 * @param {(result, event) => void} [options.onResult]
 * @returns {() => void} uninstall fn
 */
export const installPostMessageControl = (ctx, options = {}) => {
  if (typeof window === 'undefined') return () => {};
  const origins = options.origins || [];
  const allowAll = origins.includes('*');

  const handler = (event) => {
    const data = event && event.data;
    if (!data || data.source !== 'ania' || typeof data.cmd !== 'string') return;
    if (!allowAll && origins.length > 0 && !origins.includes(event.origin)) {
      (ctx.logger || console).warn(
        `[commands] postMessage from disallowed origin "${event.origin}" ignored.`
      );
      return;
    }
    if (!allowAll && origins.length === 0) {
      (ctx.logger || console).warn(
        '[commands] postMessage control received but no origins allowlisted; ignoring.'
      );
      return;
    }
    const result = executeCommand(data.cmd, ctx);
    if (options.onResult) options.onResult(result, event);
    // best-effort reply back to the sender, but only to a concrete origin.
    // When event.origin is 'null' (opaque/sandboxed origin) we must NOT fall
    // back to a '*' targetOrigin, which would disclose the command result to
    // any listener. Skip the reply in that case (fail closed).
    if (
      event.source &&
      typeof event.source.postMessage === 'function' &&
      event.origin &&
      event.origin !== 'null'
    ) {
      try {
        event.source.postMessage(
          { source: 'ania-reply', cmd: data.cmd, result },
          event.origin
        );
      } catch (e) { /* ignore */ }
    }
  };

  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
};
