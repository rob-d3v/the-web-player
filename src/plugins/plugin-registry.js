/**
 * PluginRegistry — runtime registry for Ania avatar plugins.
 *
 * Mirrors the desktop Ania Player plugin manager: plugins of kind
 * 'tts' | 'stt' | 'wakeword' | 'action' | 'integration' are registered,
 * one provider per subsystem is marked "active", and hosts resolve the
 * active engine/handler on demand.
 *
 * The registry is intentionally framework-agnostic (plain class, no React),
 * so it can be created once and shared, used in tests, or driven imperatively.
 */

import { validatePlugin, PLUGIN_KINDS } from './plugin-types.js';

export class PluginRegistry {
  constructor() {
    /** @type {Map<string, import('./plugin-types.js').Plugin>} */
    this._plugins = new Map();
    /** active provider id per kind */
    this._active = {};
    /** init() resolution cache so a plugin is initialized at most once */
    this._initialized = new Set();
    this._listeners = new Set();
    this.logger = console;
  }

  /** Subscribe to registry changes. Returns an unsubscribe fn. */
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  _emit() {
    for (const l of this._listeners) {
      try { l(this); } catch (e) { /* listener errors must not break the registry */ }
    }
  }

  /**
   * Register a plugin. The first registered plugin of a given kind becomes
   * the active provider for that kind unless one is already active.
   * @param {import('./plugin-types.js').Plugin} plugin
   * @returns {() => void} an unregister fn for this plugin
   */
  register(plugin) {
    validatePlugin(plugin);
    const normalized = { enabled: true, builtin: false, version: '0.0.0', ...plugin };
    this._plugins.set(normalized.id, normalized);

    // Auto-select the first provider of each kind so a consumer that just
    // registers one custom TTS gets it picked up without extra wiring.
    if (
      (normalized.kind === 'tts' || normalized.kind === 'stt' || normalized.kind === 'wakeword') &&
      !this._active[normalized.kind] &&
      normalized.enabled !== false
    ) {
      this._active[normalized.kind] = normalized.id;
    }
    this._emit();
    return () => this.unregister(normalized.id);
  }

  /** Register many plugins at once. */
  registerAll(plugins = []) {
    plugins.forEach((p) => this.register(p));
  }

  /** Remove a plugin by id. Clears the active slot if it pointed here. */
  unregister(id) {
    const plugin = this._plugins.get(id);
    if (!plugin) return;
    this._plugins.delete(id);
    this._initialized.delete(id);
    if (this._active[plugin.kind] === id) {
      // fall back to the next enabled provider of the same kind, if any
      const next = this.getByKind(plugin.kind).find((p) => p.enabled !== false);
      this._active[plugin.kind] = next ? next.id : undefined;
    }
    this._emit();
  }

  get(id) {
    return this._plugins.get(id) || null;
  }

  /** All registered plugins (insertion order). */
  list() {
    return Array.from(this._plugins.values());
  }

  /** All plugins of a given kind. */
  getByKind(kind) {
    return this.list().filter((p) => p.kind === kind);
  }

  /** Enable/disable a plugin. Disabling the active provider re-selects. */
  setEnabled(id, enabled) {
    const plugin = this._plugins.get(id);
    if (!plugin) return;
    plugin.enabled = enabled;
    if (!enabled && this._active[plugin.kind] === id) {
      const next = this.getByKind(plugin.kind).find((p) => p.id !== id && p.enabled !== false);
      this._active[plugin.kind] = next ? next.id : undefined;
    } else if (enabled && !this._active[plugin.kind] &&
      (plugin.kind === 'tts' || plugin.kind === 'stt' || plugin.kind === 'wakeword')) {
      this._active[plugin.kind] = id;
    }
    this._emit();
  }

  /**
   * Mark which provider is active for a subsystem.
   * @param {import('./plugin-types.js').PluginKind} kind
   * @param {string} id
   */
  setActive(kind, id) {
    if (!PLUGIN_KINDS.includes(kind)) {
      throw new Error(`[PluginRegistry] unknown kind "${kind}"`);
    }
    if (id != null && !this._plugins.has(id)) {
      this.logger.warn(`[PluginRegistry] setActive("${kind}", "${id}") — plugin not registered`);
    }
    this._active[kind] = id;
    this._emit();
  }

  /** Id of the active provider for a kind (or null). */
  getActiveId(kind) {
    return this._active[kind] || null;
  }

  /** The active provider plugin for a kind (or null). */
  getActive(kind) {
    const id = this._active[kind];
    return id ? this._plugins.get(id) || null : null;
  }

  /**
   * Ensure a plugin's init() has run exactly once, then return the plugin.
   * @param {string} id
   * @param {import('./plugin-types.js').PluginContext} [ctx]
   */
  async ensureInit(id, ctx = {}) {
    const plugin = this._plugins.get(id);
    if (!plugin) return null;
    if (!this._initialized.has(id) && typeof plugin.init === 'function') {
      await plugin.init({ registry: this, logger: this.logger, ...ctx });
      this._initialized.add(id);
    }
    return plugin;
  }

  /**
   * Resolve the active engine for a tts/stt/wakeword subsystem. Runs the
   * provider's init() (once) and createEngine(), returning the engine object.
   * @param {'tts'|'stt'|'wakeword'} kind
   * @param {import('./plugin-types.js').PluginContext} [ctx]
   */
  async resolveEngine(kind, ctx = {}) {
    const plugin = this.getActive(kind);
    if (!plugin) return null;
    await this.ensureInit(plugin.id, ctx);
    if (typeof plugin.createEngine !== 'function') return null;
    return plugin.createEngine({ registry: this, logger: this.logger, ...ctx });
  }

  /**
   * Resolve handlers for action/integration plugins. Returns an array of
   * handler objects from every enabled plugin of that kind (action handlers
   * are typically chained; integrations run side-effects).
   * @param {'action'|'integration'} kind
   * @param {import('./plugin-types.js').PluginContext} [ctx]
   */
  async resolveHandlers(kind, ctx = {}) {
    const out = [];
    for (const plugin of this.getByKind(kind)) {
      if (plugin.enabled === false) continue;
      await this.ensureInit(plugin.id, ctx);
      if (typeof plugin.createHandler === 'function') {
        out.push({ id: plugin.id, handler: plugin.createHandler({ registry: this, logger: this.logger, ...ctx }) });
      }
    }
    return out;
  }

  /** Start every enabled plugin that exposes start(). */
  async startAll(ctx = {}) {
    for (const plugin of this.list()) {
      if (plugin.enabled === false) continue;
      await this.ensureInit(plugin.id, ctx);
      if (typeof plugin.start === 'function') await plugin.start();
    }
  }

  /** Stop every plugin that exposes stop(). */
  async stopAll() {
    for (const plugin of this.list()) {
      if (typeof plugin.stop === 'function') {
        try { await plugin.stop(); } catch (e) { this.logger.warn(`[PluginRegistry] stop("${plugin.id}") failed:`, e); }
      }
    }
  }
}

/** Shared default registry instance (built-ins are registered onto it). */
let _defaultRegistry = null;
export const getDefaultRegistry = () => {
  if (!_defaultRegistry) _defaultRegistry = new PluginRegistry();
  return _defaultRegistry;
};
