import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initCodeCopy } from './code-copy.js';
import { initTransitions } from './transitions.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initCodeCopy();
  initTransitions({ initCodeCopy });
});
