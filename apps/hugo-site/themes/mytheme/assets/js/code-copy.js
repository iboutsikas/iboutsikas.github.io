export function initCopyButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy-btn]');
    if (!btn) return;

    const code = btn.closest('.code-block')?.querySelector('code');
    const text = code ? code.innerText : '';

    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('code-copy-btn--copied');
      btn.setAttribute('aria-label', 'Copied!');
      setTimeout(() => {
        btn.classList.remove('code-copy-btn--copied');
        btn.setAttribute('aria-label', 'Copy code');
      }, 2000);
    });
  });
}
