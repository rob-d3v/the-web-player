import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { AvatarChatbot } from './AvatarChatbot.jsx';

/**
 * <AvatarConfigurator> — a developer-facing, live configuration UI for the
 * <AvatarChatbot> player.
 *
 * Ship this to your own developers (or keep it behind a `?config` flag in a
 * staging build) so they can tune the avatar live and export the resulting
 * props as JSX or JSON — no code round-trips.
 *
 * Two usage modes:
 *
 *   (a) Controlled — the host app renders its own avatar and receives the
 *       config back through onChange:
 *
 *         const [config, setConfig] = useState({ avatarUrl: '...' });
 *         <AvatarConfigurator value={config} onChange={setConfig} />
 *         <AvatarChatbot {...config} />
 *
 *   (b) Batteries-included — the configurator ALSO renders the avatar it
 *       controls (the fastest way to eyeball a config):
 *
 *         <AvatarConfigurator avatarUrl="https://example.com/avatar.ania" />
 *
 * Zero new runtime dependencies. All styling is inline (self-contained), with a
 * single injected <style> block for the few things inline styles cannot express
 * (:focus / :hover / range track). SSR-safe: nothing touches window/document at
 * module scope, and localStorage/DOM access is guarded.
 */

// ── Field schema ────────────────────────────────────────────────────────────
// One entry per configurable prop, grouped into collapsible sections. This is
// the single source of truth for the panel; the JSX/JSON exporters read the
// same list so what you see is what you copy.
//
// type: 'text' | 'password' | 'number' | 'boolean' | 'select'
// Only values that DIFFER from `def` are exported (keeps the copied snippet
// minimal and future-proof against default changes).

const SECTIONS = [
  {
    id: 'avatar',
    label: 'Avatar',
    fields: [
      { key: 'avatarUrl', label: 'Avatar URL', type: 'text', def: '', placeholder: 'https://…/avatar.ania' },
      { key: 'avatarPassword', label: 'Avatar password', type: 'password', def: '' },
      { key: 'authToken', label: 'Auth token (Bearer)', type: 'password', def: '' },
      { key: 'preserveQuality', label: 'Preserve quality', type: 'boolean', def: true },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    fields: [
      { key: 'position', label: 'Position', type: 'select', def: 'bottom-right', options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'] },
      { key: 'width', label: 'Width (px)', type: 'number', def: 400, min: 80, max: 1200, step: 10 },
      { key: 'height', label: 'Height (px)', type: 'number', def: 300, min: 80, max: 1200, step: 10 },
      { key: 'theme', label: 'Theme', type: 'select', def: 'dark', options: ['dark', 'light', 'blue', 'purple'] },
      { key: 'transparent', label: 'Transparent avatar bg', type: 'boolean', def: false },
      { key: 'transparentChat', label: 'Transparent chat bg', type: 'boolean', def: false },
      { key: 'startMinimized', label: 'Start minimized', type: 'boolean', def: false },
      { key: 'alwaysOnTop', label: 'Always on top', type: 'boolean', def: true },
    ],
  },
  {
    id: 'animation',
    label: 'Animation',
    fields: [
      { key: 'autoCalculateSpeed', label: 'Auto-calculate speed', type: 'boolean', def: true },
      { key: 'idleSpeed', label: 'Idle speed', type: 'number', def: 1, min: 0.1, max: 5, step: 0.1 },
      { key: 'talkSpeed', label: 'Talk speed', type: 'number', def: 1, min: 0.1, max: 5, step: 0.1 },
      { key: 'showSpeedControls', label: 'Show speed controls', type: 'boolean', def: false },
      { key: 'talkStartDelay', label: 'Talk start delay (ms)', type: 'number', def: 0, min: 0, max: 5000, step: 50 },
      { key: 'postTalkDelay', label: 'Post-talk delay (ms)', type: 'number', def: 1500, min: 0, max: 10000, step: 50 },
      { key: 'minTalkDuration', label: 'Min talk duration (ms)', type: 'number', def: 800, min: 0, max: 10000, step: 50 },
      { key: 'minIdleDuration', label: 'Min idle duration (ms)', type: 'number', def: 400, min: 0, max: 10000, step: 50 },
    ],
  },
  {
    id: 'tts',
    label: 'TTS (Text-to-Speech)',
    fields: [
      { key: 'enableTTS', label: 'Enable TTS', type: 'boolean', def: true },
      { key: 'ttsProvider', label: 'Provider', type: 'select', def: 'browser', options: ['browser', 'tiktok', 'elevenlabs', 'google', 'azure', 'piper'] },
      { key: 'ttsLang', label: 'Language', type: 'text', def: 'pt-BR', placeholder: 'pt-BR' },
      { key: 'ttsVoice', label: 'Voice (browser)', type: 'text', def: 'auto' },
      { key: 'ttsVoiceId', label: 'Voice ID (cloud)', type: 'text', def: '' },
      { key: 'ttsGender', label: 'Gender', type: 'select', def: 'auto', options: ['auto', 'male', 'female'] },
      { key: 'ttsRate', label: 'Rate', type: 'number', def: 1, min: 0.5, max: 2, step: 0.05 },
      { key: 'ttsPitch', label: 'Pitch', type: 'number', def: 1, min: 0.5, max: 2, step: 0.05 },
      { key: 'ttsApiKey', label: 'API key (cloud)', type: 'password', def: '' },
      { key: 'ttsApiUrl', label: 'Custom API URL', type: 'text', def: '' },
      { key: 'ttsModel', label: 'Model (ElevenLabs, …)', type: 'text', def: '' },
      // Piper (browser ONNX)
      { key: 'piperModelUrl', label: 'Piper model URL', type: 'text', def: '', placeholder: 'https://…/model.onnx' },
      { key: 'piperModelConfigUrl', label: 'Piper model config URL', type: 'text', def: '', placeholder: 'https://…/model.onnx.json' },
      { key: 'piperPitch', label: 'Piper pitch', type: 'number', def: 1, min: 0.75, max: 1.3, step: 0.05 },
      { key: 'piperSpeed', label: 'Piper speed', type: 'number', def: 1, min: 0.75, max: 1.3, step: 0.05 },
    ],
  },
  {
    id: 'stt',
    label: 'STT (Speech-to-Text)',
    fields: [
      { key: 'enableSTT', label: 'Enable STT', type: 'boolean', def: false },
      { key: 'sttProvider', label: 'Provider', type: 'select', def: 'browser', options: ['browser', 'google'] },
      { key: 'sttLang', label: 'Language', type: 'text', def: 'pt-BR' },
      { key: 'sttContinuous', label: 'Continuous listening', type: 'boolean', def: false },
      { key: 'sttInterimResults', label: 'Interim results', type: 'boolean', def: true },
      { key: 'sttAutoSend', label: 'Auto-send phrase', type: 'boolean', def: true },
      { key: 'sttApiKey', label: 'API key (Google)', type: 'password', def: '' },
      { key: 'sttApiUrl', label: 'Custom API URL', type: 'text', def: '' },
    ],
  },
  {
    id: 'chat',
    label: 'Chat',
    fields: [
      { key: 'webhookUrl', label: 'Webhook URL', type: 'text', def: '', placeholder: 'https://n8n.example.com/webhook/…' },
      { key: 'webhookApiKey', label: 'Webhook API key', type: 'password', def: '' },
      { key: 'assistantName', label: 'Assistant name', type: 'text', def: 'Assistant' },
      { key: 'userName', label: 'User name', type: 'text', def: 'You' },
      { key: 'autoGreeting', label: 'Auto greeting', type: 'boolean', def: true },
      { key: 'enableAttachments', label: 'Enable attachments', type: 'boolean', def: false },
      { key: 'locale', label: 'Locale', type: 'text', def: 'pt-BR', placeholder: 'pt-BR | en | es …' },
    ],
  },
];

// A flat lookup { key: fieldSpec } for the exporters.
const FIELD_BY_KEY = SECTIONS.reduce((acc, s) => {
  for (const f of s.fields) acc[f.key] = f;
  return acc;
}, {});

const DEFAULT_STORAGE_KEY = 'ania-avatar-configurator';

// Build a config object of every field at its default value.
function buildDefaults() {
  const out = {};
  for (const section of SECTIONS) {
    for (const f of section.fields) out[f.key] = f.def;
  }
  return out;
}

// Reduce a full config down to only the entries that differ from defaults and
// carry a meaningful value (drops '' / null so the export stays terse).
function toExportProps(config) {
  const out = {};
  for (const key of Object.keys(FIELD_BY_KEY)) {
    const f = FIELD_BY_KEY[key];
    const v = config[key];
    if (v === undefined || v === null) continue;
    if (typeof v === 'string' && v.trim() === '') continue;
    if (v === f.def) continue;
    out[key] = v;
  }
  return out;
}

// Format an export prop map as a pretty <AvatarChatbot .../> JSX string.
function toJSX(config, componentName = 'AvatarChatbot') {
  const props = toExportProps(config);
  const keys = Object.keys(props);
  if (keys.length === 0) return `<${componentName} />`;
  const lines = keys.map((k) => {
    const v = props[k];
    if (typeof v === 'string') return `  ${k}="${v.replace(/"/g, '&quot;')}"`;
    if (typeof v === 'boolean') return v ? `  ${k}` : `  ${k}={false}`;
    return `  ${k}={${JSON.stringify(v)}}`;
  });
  return `<${componentName}\n${lines.join('\n')}\n/>`;
}

// Format an export prop map as pretty JSON.
function toJSON(config) {
  return JSON.stringify(toExportProps(config), null, 2);
}

// ── localStorage helpers (SSR / private-mode safe) ──────────────────────────
function loadPersisted(key) {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function savePersisted(key, value) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode — non-fatal */
  }
}
function clearPersisted(key) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* non-fatal */
  }
}

// One-time <style> injection for the states inline styles can't reach.
function useConfiguratorStyles() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const id = 'ania-configurator-styles';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent =
      '.ania-cfg-field:focus{outline:none;border-color:#6366f1 !important;box-shadow:0 0 0 3px rgba(99,102,241,0.25) !important;}' +
      '.ania-cfg-btn{transition:background-color .12s ease,transform .12s ease;}' +
      '.ania-cfg-btn:hover{filter:brightness(1.08);}' +
      '.ania-cfg-btn:active{transform:scale(0.97);}' +
      '.ania-cfg-section-hdr{transition:background-color .12s ease;}' +
      '.ania-cfg-section-hdr:hover{background:rgba(99,102,241,0.12);}' +
      '.ania-cfg-scroll{scrollbar-width:thin;scrollbar-color:rgba(100,116,139,0.4) transparent;}' +
      '.ania-cfg-scroll::-webkit-scrollbar{width:8px;}' +
      '.ania-cfg-scroll::-webkit-scrollbar-thumb{background:rgba(100,116,139,0.4);border-radius:999px;}';
    document.head.appendChild(style);
  }, []);
}

// ── styling tokens ──────────────────────────────────────────────────────────
const S = {
  panel: {
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    fontSize: 13,
    color: '#e2e8f0',
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: 12,
    width: 340,
    maxWidth: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    boxSizing: 'border-box',
  },
  header: {
    padding: '12px 14px',
    borderBottom: '1px solid #1e293b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: { fontSize: 14, fontWeight: 600, margin: 0, color: '#f8fafc' },
  scrollArea: { overflowY: 'auto', padding: '6px 0', flex: 1 },
  sectionHdr: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '9px 14px',
    cursor: 'pointer',
    userSelect: 'none',
    fontWeight: 600,
    color: '#cbd5e1',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    fontSize: 13,
  },
  sectionBody: { padding: '2px 14px 10px' },
  field: { marginBottom: 10 },
  fieldLabel: { display: 'block', marginBottom: 4, color: '#94a3b8', fontSize: 12 },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#1e293b',
    color: '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: 8,
    padding: '7px 9px',
    fontSize: 13,
    fontFamily: 'inherit',
  },
  checkboxRow: { display: 'flex', alignItems: 'center', gap: 8 },
  footer: {
    padding: 12,
    borderTop: '1px solid #1e293b',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  btn: {
    flex: '1 1 auto',
    padding: '8px 10px',
    borderRadius: 8,
    border: '1px solid #334155',
    background: '#1e293b',
    color: '#e2e8f0',
    cursor: 'pointer',
    fontSize: 12.5,
    fontWeight: 600,
    fontFamily: 'inherit',
  },
  btnPrimary: { background: '#4f46e5', borderColor: '#4f46e5', color: '#fff' },
  btnGhost: { background: 'transparent' },
};

function Field({ field, value, onChange }) {
  const id = `ania-cfg-${field.key}`;
  if (field.type === 'boolean') {
    return (
      <label htmlFor={id} style={{ ...S.field, ...S.checkboxRow, cursor: 'pointer' }}>
        <input
          id={id}
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(field.key, e.target.checked)}
          style={{ width: 16, height: 16, accentColor: '#4f46e5', cursor: 'pointer' }}
        />
        <span style={{ color: '#cbd5e1', fontSize: 13 }}>{field.label}</span>
      </label>
    );
  }
  if (field.type === 'select') {
    return (
      <div style={S.field}>
        <label htmlFor={id} style={S.fieldLabel}>{field.label}</label>
        <select
          id={id}
          className="ania-cfg-field"
          value={value ?? field.def}
          onChange={(e) => onChange(field.key, e.target.value)}
          style={S.input}
        >
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }
  if (field.type === 'number') {
    return (
      <div style={S.field}>
        <label htmlFor={id} style={S.fieldLabel}>{field.label}</label>
        <input
          id={id}
          className="ania-cfg-field"
          type="number"
          value={value ?? ''}
          min={field.min}
          max={field.max}
          step={field.step}
          onChange={(e) => {
            const raw = e.target.value;
            onChange(field.key, raw === '' ? field.def : Number(raw));
          }}
          style={S.input}
        />
      </div>
    );
  }
  // text | password
  return (
    <div style={S.field}>
      <label htmlFor={id} style={S.fieldLabel}>{field.label}</label>
      <input
        id={id}
        className="ania-cfg-field"
        type={field.type === 'password' ? 'password' : 'text'}
        value={value ?? ''}
        placeholder={field.placeholder || ''}
        autoComplete="off"
        onChange={(e) => onChange(field.key, e.target.value)}
        style={S.input}
      />
    </div>
  );
}

function Section({ section, config, onChange, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid #1e293b' }}>
      <button
        type="button"
        className="ania-cfg-section-hdr"
        style={S.sectionHdr}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{section.label}</span>
        <span style={{ color: '#64748b', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s' }}>▸</span>
      </button>
      {open && (
        <div style={S.sectionBody}>
          {section.fields.map((f) => (
            <Field key={f.key} field={f} value={config[f.key]} onChange={onChange} />
          ))}
        </div>
      )}
    </div>
  );
}

export const AvatarConfigurator = ({
  // Controlled mode
  value,
  onChange,
  // Uncontrolled initial config (also accepts any AvatarChatbot prop as a seed
  // for batteries-included mode, e.g. avatarUrl="…").
  defaultValue,
  // localStorage namespace. Set persist={false} to disable persistence.
  storageKey = DEFAULT_STORAGE_KEY,
  persist = true,
  // When true (default when NOT controlled), render the AvatarChatbot itself
  // next to the panel. Set false to only render the panel.
  showPreview,
  // Component name used in the exported JSX snippet.
  exportComponentName = 'AvatarChatbot',
  // Fired with the export-ready (defaults-stripped) prop map on every change.
  onExport,
  // Layout: 'row' (panel + preview side by side) | 'column'.
  layout = 'row',
  // Extra seed props merged into the initial config (batteries-included mode).
  // Any AvatarChatbot prop not surfaced by the panel is passed through to the
  // rendered avatar but not editable here.
  ...seedProps
}) => {
  useConfiguratorStyles();

  const isControlled = value !== undefined && typeof onChange === 'function';

  // The seed = explicit defaultValue, else any known props passed inline
  // (batteries-included), applied over the schema defaults.
  const initial = useMemo(() => {
    const base = buildDefaults();
    const persisted = persist ? loadPersisted(storageKey) : null;
    const seed = {};
    for (const k of Object.keys(seedProps)) {
      if (k in FIELD_BY_KEY) seed[k] = seedProps[k];
    }
    return { ...base, ...(persisted || {}), ...seed, ...(defaultValue || {}) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [internal, setInternal] = useState(initial);
  const config = isControlled ? { ...buildDefaults(), ...value } : internal;

  // Pass-through props: anything given inline that the panel doesn't own is
  // forwarded to the rendered avatar (e.g. onLoad, plugins, flow, callbacks).
  const passthrough = useMemo(() => {
    const out = {};
    for (const k of Object.keys(seedProps)) {
      if (!(k in FIELD_BY_KEY)) out[k] = seedProps[k];
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedProps]);

  const [openSections, setOpenSections] = useState(() => ({ avatar: true, layout: true }));
  const [copied, setCopied] = useState(null); // 'jsx' | 'json' | null
  const copyResetRef = useRef(null);

  const handleChange = useCallback(
    (key, val) => {
      if (isControlled) {
        onChange({ ...value, [key]: val });
      } else {
        setInternal((prev) => ({ ...prev, [key]: val }));
      }
    },
    [isControlled, onChange, value]
  );

  // Persist (uncontrolled) + notify onExport on every config change.
  useEffect(() => {
    if (persist && !isControlled) savePersisted(storageKey, config);
    if (typeof onExport === 'function') onExport(toExportProps(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const doCopy = useCallback(async (kind) => {
    const text = kind === 'jsx' ? toJSX(config, exportComponentName) : toJSON(config);
    let ok = false;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok && typeof document !== 'undefined') {
      // Fallback for non-secure contexts / older browsers.
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        ok = true;
      } catch {
        ok = false;
      }
    }
    setCopied(ok ? kind : null);
    if (copyResetRef.current) clearTimeout(copyResetRef.current);
    copyResetRef.current = setTimeout(() => setCopied(null), 1600);
  }, [config, exportComponentName]);

  useEffect(() => () => { if (copyResetRef.current) clearTimeout(copyResetRef.current); }, []);

  const handleReset = useCallback(() => {
    const defaults = buildDefaults();
    if (persist) clearPersisted(storageKey);
    if (isControlled) onChange(defaults);
    else setInternal(defaults);
  }, [isControlled, onChange, persist, storageKey]);

  const toggleSection = useCallback((id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const shouldPreview = showPreview !== undefined ? showPreview : !isControlled;

  const panel = (
    <div style={S.panel} className="ania-cfg-scroll">
      <div style={S.header}>
        <h3 style={S.title}>Avatar Configurator</h3>
        <button
          type="button"
          className="ania-cfg-btn"
          style={{ ...S.btn, flex: '0 0 auto', padding: '5px 9px' }}
          onClick={handleReset}
          title="Reset all fields to defaults"
        >
          Reset
        </button>
      </div>

      <div style={S.scrollArea} className="ania-cfg-scroll">
        {SECTIONS.map((section) => (
          <Section
            key={section.id}
            section={section}
            config={config}
            onChange={handleChange}
            open={!!openSections[section.id]}
            onToggle={() => toggleSection(section.id)}
          />
        ))}
      </div>

      <div style={S.footer}>
        <button
          type="button"
          className="ania-cfg-btn"
          style={{ ...S.btn, ...S.btnPrimary }}
          onClick={() => doCopy('jsx')}
        >
          {copied === 'jsx' ? 'Copied ✓' : 'Copy JSX'}
        </button>
        <button
          type="button"
          className="ania-cfg-btn"
          style={S.btn}
          onClick={() => doCopy('json')}
        >
          {copied === 'json' ? 'Copied ✓' : 'Copy JSON'}
        </button>
      </div>
    </div>
  );

  if (!shouldPreview) return panel;

  // Batteries-included: render the avatar itself next to the panel. Give the
  // rendered chatbot a `key` derived from remount-sensitive props so changing
  // e.g. the avatarUrl / provider cleanly re-initializes it.
  const remountKey = [
    config.avatarUrl,
    config.avatarPassword,
    config.ttsProvider,
    config.sttProvider,
    config.piperModelUrl,
  ].join('|');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: layout === 'column' ? 'column' : 'row',
        gap: 16,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      {panel}
      <div style={{ flex: '1 1 320px', minWidth: 280, position: 'relative' }}>
        <AvatarChatbot key={remountKey} {...config} {...passthrough} />
      </div>
    </div>
  );
};

// Named exports of the pure helpers so hosts can build their own export UI or
// snapshot configs in tests without mounting the component.
AvatarConfigurator.toJSX = toJSX;
AvatarConfigurator.toJSON = toJSON;
AvatarConfigurator.toExportProps = toExportProps;
AvatarConfigurator.SECTIONS = SECTIONS;

export { toJSX as configuratorToJSX, toJSON as configuratorToJSON, toExportProps as configuratorExportProps, SECTIONS as CONFIGURATOR_SECTIONS };
