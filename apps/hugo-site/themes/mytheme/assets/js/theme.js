/**
 * Theme management — dark / light toggle with localStorage persistence.
 *
 * CSS handles which icon is visible; JS only sets data-theme and syncs ARIA.
 * The anti-FOUC inline script in <head> already sets data-theme before paint,
 * so all we do here is wire up the button and the OS-change listener.
 */

const STORAGE_KEY = 'theme';

function getResolvedTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit === 'dark' || explicit === 'light') return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme, button) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
  if (button) {
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
}

export function initTheme() {
  const button = document.getElementById('_theme-toggle');

  // Sync ARIA state with whatever the anti-FOUC script already set.
  applyTheme(getResolvedTheme(), button);

  button?.addEventListener('click', () => {
    applyTheme(getResolvedTheme() === 'dark' ? 'light' : 'dark', button);
  });

  // Follow OS changes only when the user hasn't pinned a preference.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (!stored) applyTheme(e.matches ? 'dark' : 'light', button);
  });
}
