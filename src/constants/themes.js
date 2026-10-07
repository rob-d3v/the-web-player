export const THEMES = {
  dark: {
    background: "rgba(15, 23, 42, 0.95)",
    textPrimary: "#ffffff",
    textSecondary: "#cbd5e1",
    controlBg: "rgba(0, 0, 0, 0.3)",
    controlHover: "rgba(0, 0, 0, 0.5)"
  },
  light: {
    background: "rgba(248, 250, 252, 0.95)",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    controlBg: "rgba(255, 255, 255, 0.5)",
    controlHover: "rgba(255, 255, 255, 0.8)"
  },
  blue: {
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)",
    textPrimary: "#ffffff",
    textSecondary: "#dbeafe",
    // Header buttons (minimize/maximize/close): a darker shade of the theme's own hue, so the
    // white icons pass the 3:1 of a non-text component. The old white wash (0.2/0.3) left them at
    // 2.3–2.6:1. blue-700 / blue-800 at 90%: >= 6.2:1 idle, >= 7.9:1 hover, over any page.
    controlBg: "rgba(29, 78, 216, 0.9)",
    controlHover: "rgba(30, 64, 175, 0.9)"
  },
  purple: {
    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.95) 0%, rgba(147, 51, 234, 0.95) 100%)",
    textPrimary: "#ffffff",
    textSecondary: "#e9d5ff",
    // Same as blue: purple-700 / purple-800 at 90% (was a white wash at 2.4–2.8:1).
    // White icon >= 6.5:1 idle, >= 8:1 hover, over any page.
    controlBg: "rgba(126, 34, 206, 0.9)",
    controlHover: "rgba(107, 33, 168, 0.9)"
  }
};

/**
 * Colours of the "Carregando avatar..." pill. They do NOT come from the theme on purpose: the
 * blue/purple theme backgrounds give white text only ~3.7–4:1, and a transparent stage shows the
 * host page, which the lib cannot see. Both pills are SOLID (no alpha), so the pair is the whole
 * story whatever sits behind: white on slate-900 17.9:1, slate-900 on slate-50 17.1:1. Solid also
 * lets axe measure it on a gradient card, where a translucent pill left it "needs review".
 */
export const LOADING_PILL = {
  dark: { bg: '#0f172a', fg: '#ffffff' },
  light: { bg: '#f8fafc', fg: '#0f172a' },
};
