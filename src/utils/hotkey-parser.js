/**
 * Parse hotkey strings and detect key combos in browser
 */

export const parseHotkey = (hotkeyString) => {
  if (!hotkeyString) return null;

  const parts = hotkeyString.toLowerCase().split('+').map(p => p.trim());
  const result = {
    ctrl: false,
    alt: false,
    shift: false,
    meta: false,
    key: ''
  };

  for (const part of parts) {
    switch (part) {
      case 'ctrl':
      case 'control':
        result.ctrl = true;
        break;
      case 'alt':
        result.alt = true;
        break;
      case 'shift':
        result.shift = true;
        break;
      case 'meta':
      case 'cmd':
      case 'command':
      case 'win':
        result.meta = true;
        break;
      default:
        result.key = part;
    }
  }

  return result.key ? result : null;
};

export const matchesHotkey = (event, parsed) => {
  if (!parsed) return false;

  if (event.ctrlKey !== parsed.ctrl) return false;
  if (event.altKey !== parsed.alt) return false;
  if (event.shiftKey !== parsed.shift) return false;
  if (event.metaKey !== parsed.meta) return false;

  const eventKey = event.key.toLowerCase();
  return eventKey === parsed.key;
};
