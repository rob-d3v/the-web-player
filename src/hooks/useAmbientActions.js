import { useRef, useEffect, useCallback } from 'react';
import { createAmbientActions } from './ambient-actions.js';

export function useAmbientActions(controller, options, sources = []) {
  const policyRef = useRef(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!controller) return;
    const policy = createAmbientActions(controller, optionsRef.current);
    policyRef.current = policy;
    return () => {
      policy.dispose();
      if (policyRef.current === policy) policyRef.current = null;
    };
  }, [controller, ...sources]);

  useEffect(() => {
    policyRef.current?.update(optionsRef.current);
  }, [options.ambientActions, options.ambientActionMinSeconds, options.ambientActionMaxSeconds,
    options.ambientActionIds, options.actions, options.availableActions, options.visible,
    options.isTalking, options.isTyping, options.isListening, options.onActivity, options.isVisible]);

  const refresh = useCallback(() => policyRef.current?.refresh(), []);
  const triggerResponseAction = useCallback((id, trigger) => policyRef.current?.triggerResponseAction(id, trigger), []);
  const triggerGreetingAction = useCallback((setting) => policyRef.current?.triggerGreetingAction(setting), []);
  return { refresh, triggerResponseAction, triggerGreetingAction };
}
