import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initCodeCopy } from './code-copy.js';
import { initTransitions } from './transitions.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const styles = getComputedStyle(root);

  const breakpoints = {
    '1': styles.getPropertyValue('--breakpoint-1').trim(),
    '2': styles.getPropertyValue('--breakpoint-2').trim(),
    '3': styles.getPropertyValue('--breakpoint-3').trim(),
    '4': styles.getPropertyValue('--breakpoint-4').trim(),
    '5': styles.getPropertyValue('--breakpoint-5').trim(),
  }

  initTheme();
  initNav(breakpoints);
  initCodeCopy();
  initTransitions({ initCodeCopy });
});
