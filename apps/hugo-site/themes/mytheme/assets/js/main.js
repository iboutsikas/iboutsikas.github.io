import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initCodeCopy } from './code-copy.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initCodeCopy();
});
