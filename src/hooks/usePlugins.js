/**
 * usePlugins — React binding around PluginRegistry.
 *
 * Creates (or adopts) a registry, registers the library built-ins, and
 * registers any consumer-supplied custom plugins. Returns the registry plus
 * helpers to resolve the active engine for a subsystem and to flip the active
 * provider. Re-renders when the registry changes.
 *
 *   const { registry, setActive, resolveEngine } = usePlugins({
 *     plugins: [myCustomTts],
 *     activeTts: 'my-tts',
 *   });
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { PluginRegistry, getDefaultRegistry } from '../plugins/plugin-registry.js';
import { registerBuiltins } from '../plugins/builtins.js';

export const usePlugins = ({
  plugins = [],
  registry: externalRegistry = null,
  includeBuiltins = true,
  activeTts = null,
  activeStt = null,
  activeWakeword = null,
  useSharedRegistry = false,
} = {}) => {
  // One registry per hook instance unless the caller hands one in or opts into
  // the shared default. Created lazily so SSR import never touches it.
  const registryRef = useRef(null);
  if (!registryRef.current) {
    registryRef.current = externalRegistry
      || (useSharedRegistry ? getDefaultRegistry() : new PluginRegistry());
  }
  const registry = registryRef.current;

  const [, force] = useState(0);

  // Register built-ins once.
  useEffect(() => {
    if (includeBuiltins) registerBuiltins(registry);
  }, [registry, includeBuiltins]);

  // Register/refresh custom plugins. Unregister on change so a removed plugin
  // leaves the registry (keyed by id; re-registering same id is a no-op-ish
  // overwrite).
  useEffect(() => {
    if (!plugins || plugins.length === 0) return;
    const ids = [];
    for (const p of plugins) {
      try {
        registry.register(p);
        ids.push(p.id);
      } catch (e) {
        registry.logger.warn('[usePlugins] failed to register plugin:', e);
      }
    }
    return () => {
      for (const id of ids) {
        const plugin = registry.get(id);
        if (plugin && !plugin.builtin) registry.unregister(id);
      }
    };
  }, [registry, plugins]);

  // Apply requested active providers.
  useEffect(() => {
    if (activeTts) registry.setActive('tts', activeTts);
  }, [registry, activeTts]);
  useEffect(() => {
    if (activeStt) registry.setActive('stt', activeStt);
  }, [registry, activeStt]);
  useEffect(() => {
    if (activeWakeword) registry.setActive('wakeword', activeWakeword);
  }, [registry, activeWakeword]);

  // Re-render on any registry change.
  useEffect(() => registry.subscribe(() => force((n) => n + 1)), [registry]);

  const setActive = useCallback((kind, id) => registry.setActive(kind, id), [registry]);
  const register = useCallback((p) => registry.register(p), [registry]);
  const resolveEngine = useCallback((kind, ctx) => registry.resolveEngine(kind, ctx), [registry]);
  const resolveHandlers = useCallback((kind, ctx) => registry.resolveHandlers(kind, ctx), [registry]);

  return {
    registry,
    plugins: registry.list(),
    setActive,
    register,
    resolveEngine,
    resolveHandlers,
    getActive: (kind) => registry.getActive(kind),
    getActiveId: (kind) => registry.getActiveId(kind),
    getByKind: (kind) => registry.getByKind(kind),
  };
};
