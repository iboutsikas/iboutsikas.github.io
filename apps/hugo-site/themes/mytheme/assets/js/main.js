import '@iboutsikas/coverpage';
import '@iboutsikas/router';

import { initTheme } from './theme.js';
import { initSidebar } from './sidebar.js';
import { initCodeCopy } from './code-copy.js';
import { initTransitions } from './transitions.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const styles = getComputedStyle(root);

  const breakpoints = {
    sm: styles.getPropertyValue('--bp-sm').trim(),
    md: styles.getPropertyValue('--bp-md').trim(),
    lg: styles.getPropertyValue('--bp-lg').trim(),
    xl: styles.getPropertyValue('--bp-xl').trim(),
    '2xl': styles.getPropertyValue('--bp-2xl').trim(),
    '3xl': styles.getPropertyValue('--bp-3xl').trim(),
    '4xl': styles.getPropertyValue('--bp-4xl').trim(),
  };

  initTheme();
  initSidebar(breakpoints);
  initCodeCopy();
  initTransitions({ initCodeCopy });
});
