/**
 * Mobile navigation — wires the hamburger button to the <ib-coverpage> component.
 */

export function initNav() {
  const toggle = document.getElementById('_nav-toggle');
  const coverpage = document.getElementById('_coverpage');

  if (!toggle || !coverpage) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      coverpage.close();
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      coverpage.open();
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Sync button state when the scrim is dismissed by tapping outside.
  coverpage.addEventListener('scrim-change', (e) => {
    if (!e.detail.visible) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
