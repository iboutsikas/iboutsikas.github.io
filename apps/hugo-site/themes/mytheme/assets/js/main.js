// Mobile nav toggle — wires the hamburger button to the coverpage component.
const toggle = document.getElementById('_nav-toggle');
const coverpage = document.getElementById('_coverpage');

if (toggle && coverpage) {
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
