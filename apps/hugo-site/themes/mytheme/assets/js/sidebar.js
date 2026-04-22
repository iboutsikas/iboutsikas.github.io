
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
  if (!toggle || !coverpage) return;
  
  const sidebarContainer = document.querySelector('.sidebar-container');
  const sidebarContent = document.querySelector('.sidebar-sticky');
  const pageContent = document.getElementById('_content');
  // All the links that are to our own website
  const sidebarLinks = sidebarContent.querySelectorAll('a[href^="/"]');
  const swipeIcon = sidebarContent.querySelector('#_swipe-icon');


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

    if (sidebarContainer) {
      sidebarContainer.style.willChange = 'transform';
    }

    if (sidebarContent && isMobile(breakpoints)) {
      sidebarContent.style.willChange = 'opacity';
    }

    if (pageContent) {
      pageContent.style.pointerEvents = 'none';
    }

    // if (swipeIcon && coverpage.open) {
    //   swipeIcon.classList.remove('hidden');
    // }
  });

  coverpage.addEventListener('coverpage-after-animation', (e) => {
    if (!coverpage.open) {
      document.documentElement.style.overflow = '';
    }

    if (sidebarContainer) {
      sidebarContainer.style.willChange = 'auto';
    }

    if (sidebarContent && isMobile(breakpoints)) {
      sidebarContent.style.willChange = 'auto';
    }

    if (pageContent) {
      pageContent.style.pointerEvents = 'auto';
    }

    // if (swipeIcon) {
    //   swipeIcon.classList.toggle('hidden', !coverpage.open);
    // }

    if (coverpage.open) {
      toggle.setAttribute('aria-expanded', 'true');
    }
    else {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Sync button state when the scrim is dismissed by tapping outside.
  coverpage.addEventListener('coverpage-progress', (e) => {
    const { t, travel } = e.detail;

    if (sidebarContainer) {
      sidebarContainer.style.transform = `translateX(${travel * (1 - t)}px)`;
    }

    if (sidebarContent) {
      sidebarContent.style.opacity = isMobile(breakpoints) ? `${t}` : '1';
    }
  });
}
