const isMobile = (breakpoints) => {
  return window.matchMedia(`(max-width: ${breakpoints['lg']})`).matches;
};

const logMissing = (name) => {
  console.warn(`[sidebar] Element not found: ${name}`);
};

function setupToggle(toggle, coverpage) {
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
}

function onBeforeAnimation(sidebarContainer, sidebarContent, pageContent, breakpoints) {
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
}

function onAfterAnimation(sidebarContainer, sidebarContent, pageContent, toggle, breakpoints, coverpage) {
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

  if (coverpage.open) {
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    toggle.setAttribute('aria-expanded', 'false');
  }
}

function onCoverpageProgress(sidebarContainer, sidebarContent, breakpoints, coverpage) {
  return (e) => {
    const { t, travel } = e.detail;

    if (sidebarContainer) {
      sidebarContainer.style.transform = `translateX(${travel * (1 - t)}px)`;
    }

    if (sidebarContent) {
      sidebarContent.style.opacity = isMobile(breakpoints) ? `${t}` : '1';
    }
  };
}

/**
 * Mobile navigation — wires the hamburger button to the <ib-coverpage> component.
 */
export function initSidebar(breakpoints) {
  const toggle = document.getElementById('_nav-toggle');
  const coverpage = document.getElementById('_coverpage');
  if (!toggle) {
    logMissing('_nav-toggle');
    return;
  }
  if (!coverpage) {
    logMissing('_coverpage');
    return;
  }

  const sidebarContainer = document.querySelector('.sidebar-container');
  const sidebarContent = document.querySelector('.sidebar-sticky');
  const pageContent = document.getElementById('_content');

  if (!sidebarContainer) logMissing('.sidebar-container');
  if (!sidebarContent) logMissing('.sidebar-sticky');
  if (!pageContent) logMissing('_content');

  document.addEventListener('router-navigated', () => coverpage.hide());

  // Same-page links are skipped by the router (no router-navigated fires).
  // Close the cover immediately on click so the user can see current content.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || !a.href) return;
    const t = new URL(a.href, location.href);
    const isSamePage = t.pathname === location.pathname && t.search === location.search && !t.hash;
    if (isSamePage) coverpage.hide();
  });

  if (toggle && coverpage) {
    setupToggle(toggle, coverpage);
  }

  if (coverpage) {
    coverpage.addEventListener('coverpage-before-animation', () => {
      onBeforeAnimation(sidebarContainer, sidebarContent, pageContent, breakpoints);
    });

    coverpage.addEventListener('coverpage-after-animation', () => {
      onAfterAnimation(sidebarContainer, sidebarContent, pageContent, toggle, breakpoints, coverpage);
    });

    coverpage.addEventListener('coverpage-progress', onCoverpageProgress(sidebarContainer, sidebarContent, breakpoints, coverpage));
  }
}
