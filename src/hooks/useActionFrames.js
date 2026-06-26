import { useState, useEffect, useCallback, useRef } from 'react';
import { parseHotkey, matchesHotkey } from '../utils/hotkey-parser.js';
import { playActionAudio } from '../utils/action-renderer.js';

export const useActionFrames = ({
  actions = [],
  enabled = true,
  enableHotkeys = true,
  onActionStart,
  onActionEnd,
  animationController
} = {}) => {
  const [activeAction, setActiveAction] = useState(null);
  const [availableActions, setAvailableActions] = useState([]);
  const parsedHotkeysRef = useRef([]);
  const audioHandleRef = useRef(null);

  // Parse actions and hotkeys
  useEffect(() => {
    if (!actions || actions.length === 0) {
      // Bail without creating a new array when already empty — otherwise, if
      // the caller passes a fresh `[]` each render (common), this setState
      // re-renders, the dep changes, the effect re-runs → infinite loop
      // ("Maximum update depth exceeded"), which crashes the avatar subtree.
      setAvailableActions((prev) => (prev.length === 0 ? prev : []));
      parsedHotkeysRef.current = [];
      return;
    }

    const available = actions.map(a => ({
      id: a.id,
      name: a.name,
      hotkey: a.hotkey || null
    }));
    setAvailableActions(available);

    parsedHotkeysRef.current = actions
      .filter(a => a.hotkey)
      .map(a => ({
        actionId: a.id,
        parsed: parseHotkey(a.hotkey)
      }))
      .filter(h => h.parsed !== null);
  }, [actions]);

  // Configure animation controller with actions
  useEffect(() => {
    if (!animationController || !actions || actions.length === 0) return;

    if (animationController.configureActions) {
      animationController.configureActions(actions);
    }

    animationController.onActionCompleteCallback = () => {
      setActiveAction(null);
      if (onActionEnd) onActionEnd();
    };

    animationController.onActionCancelCallback = (id) => {
      setActiveAction(null);
      if (onActionEnd) onActionEnd();
    };

    animationController.onActionStartCallback = (id) => {
      setActiveAction(id);
      if (onActionStart) onActionStart(id);
    };
  }, [animationController, actions, onActionStart, onActionEnd]);

  const triggerAction = useCallback((actionId) => {
    if (!enabled || !animationController) return;

    const actionConfig = actions.find(a => a.id === actionId);
    if (!actionConfig) return;

    // Play action audio if present
    if (audioHandleRef.current) {
      audioHandleRef.current.cancel();
    }
    if (actionConfig.audio_base64) {
      audioHandleRef.current = playActionAudio(
        actionConfig.audio_base64,
        actionConfig.audio_delay_ms || 0
      );
    }

    if (animationController.triggerAction) {
      animationController.triggerAction(actionId);
    }
  }, [enabled, animationController, actions]);

  const cancelAction = useCallback(() => {
    if (!animationController) return;
    if (audioHandleRef.current) {
      audioHandleRef.current.cancel();
      audioHandleRef.current = null;
    }
    if (animationController.cancelAction) {
      animationController.cancelAction(true);
    }
  }, [animationController]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!enabled || !enableHotkeys || parsedHotkeysRef.current.length === 0) return;

    const handleKeyDown = (e) => {
      // Don't trigger if typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

      for (const { actionId, parsed } of parsedHotkeysRef.current) {
        if (matchesHotkey(e, parsed)) {
          e.preventDefault();
          triggerAction(actionId);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, enableHotkeys, triggerAction]);

  return {
    activeAction,
    availableActions,
    triggerAction,
    cancelAction
  };
};
