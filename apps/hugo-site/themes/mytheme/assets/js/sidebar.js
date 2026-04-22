
// TODO: Let's rename these instead of using numbers
const isMobile = (breakpoints) => {
  return window.matchMedia(`(max-width: ${breakpoints['lg']})`).matches;
} 
/**
 * Mobile navigation — wires the hamburger button to the <ib-coverpage> component.
 */

export function initSidebar(breakpoints) {
  const toggle = document.getElementById('_nav-toggle');
  const coverpage = document.getElementById('_coverpage');
  const background = document.querySelector('.sidebar-container');
  const nav = document.querySelector('.sidebar-sticky');
  const mainContent = document.getElementById('_content');
  // All the links that are to our own website
  const sidebarLinks = nav.querySelectorAll('a[href^="/"]');

  if (!toggle || !coverpage) return;

  // When we click _our_ links, we close the cover so we can see the content
  sidebarLinks.forEach(a => {
    a.addEventListener('click', () => coverpage.hide());
  });

  toggle.addEventListener('click', () => {
    const isOpen = coverpage.open;
    if (isOpen) {
      coverpage.hide();
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      coverpage.show();
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  coverpage.addEventListener('coverpage-before-animation', (e) => {
    document.documentElement.style.overflow = 'hidden';

    if (background) {
      background.style.willChange = 'transform';
    }

    if (nav && isMobile(breakpoints)) {
      nav.style.willChange = 'opacity';
    }

    if (mainContent) {
      mainContent.style.pointerEvents = 'none';
    }
  });

  coverpage.addEventListener('coverpage-after-animation', (e) => {
    if (!coverpage.open) {
      document.documentElement.style.overflow = '';
    }

    if (background) {
      background.style.willChange = 'auto';
    }

    if (nav && isMobile(breakpoints)) {
      nav.style.willChange = 'auto';
    }

    if (mainContent) {
      mainContent.style.pointerEvents = 'auto';
    }

    if (coverpage.open)
      toggle.setAttribute('aria-expanded', 'true');
    else
      toggle.setAttribute('aria-expanded', 'false');
  });

  // Sync button state when the scrim is dismissed by tapping outside.
  coverpage.addEventListener('coverpage-progress', (e) => {
    const { t, travel } = e.detail;

    if (background) {
      background.style.transform = `translateX(${travel * (1 - t)}px)`;
    }

    if (nav) {
      nav.style.opacity = isMobile(breakpoints) ? `${t}` : '1';
    }
  });
}
