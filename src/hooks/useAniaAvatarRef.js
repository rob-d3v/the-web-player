import { useRef } from 'react';
import { executeCommand } from '../utils/commands.js';

export const useAniaAvatarRef = () => {
  const ref = useRef(null);

  const getPlayer = () => ref.current?.playerRef?.current || null;

  const getController = () => {
    const player = getPlayer();
    return player?.animationController || null;
  };

  const setTalking = (talking) => {
    const ctrl = getController();
    if (ctrl) ctrl.setTalkingState(talking);
  };

  const play = () => {
    const player = ref.current?.playerRef?.current;
    if (player?.play) player.play();
  };

  const pause = () => {
    const player = ref.current?.playerRef?.current;
    if (player?.pause) player.pause();
  };

  const triggerAction = (actionId) => {
    const ctrl = getController();
    if (ctrl?.triggerAction) ctrl.triggerAction(actionId);
  };

  const cancelAction = () => {
    const ctrl = getController();
    if (ctrl?.cancelAction) ctrl.cancelAction(true);
  };

  const getAvailableActions = () => {
    const ctrl = getController();
    if (ctrl?.getActionConfigs) {
      const configs = ctrl.getActionConfigs();
      return Object.values(configs).map(c => ({ id: c.id, name: c.name }));
    }
    return [];
  };

  const setLipSyncEnabled = (enabled) => {
    const ctrl = getController();
    if (ctrl) ctrl.lipsSyncEnabled = enabled;
  };

  const getLipSyncState = () => {
    const ctrl = getController();
    if (!ctrl) return { enabled: false };
    return {
      enabled: ctrl.lipsSyncEnabled || false,
      envelope: ctrl._lipsEnvelope || 0
    };
  };

  // Imperative command runner — drives the avatar with the desktop-style
  // command set (show/hide/toggle/action/actions/info/speed/...). `extraCtx`
  // lets a caller wire speak/ask/wake/mute handlers the ref alone can't reach.
  const runCommand = (line, extraCtx = {}) => {
    const player = getPlayer();
    const ctx = {
      player,
      getActions: getAvailableActions,
      triggerAction,
      cancelAction,
      setSpeeds: (idle, talk) => {
        const ctrl = getController();
        if (ctrl?.setIdleSpeed) ctrl.setIdleSpeed(idle);
        if (ctrl?.setTalkSpeed) ctrl.setTalkSpeed(talk);
      },
      ...extraCtx
    };
    return executeCommand(line, ctx);
  };

  return { ref, setTalking, play, pause, triggerAction, cancelAction, getAvailableActions, setLipSyncEnabled, getLipSyncState, runCommand };
};
