const isMobile = (breakpoints) => {
  return window.matchMedia(`(max-width: ${breakpoints['lg']})`).matches;
};

const logMissing = (name) => {
  console.warn(`[sidebar] Element not found: ${name}`);
};

function setupToggle(ctx) {
  if (!ctx.toggle || !ctx.coverpage) return;

  ctx.toggle.addEventListener('click', () => {
    const isOpen = ctx.coverpage.open;
    if (isOpen) {
      ctx.coverpage.hide();
      ctx.toggle.setAttribute('aria-expanded', 'false');
    } else {
      ctx.coverpage.show();
      ctx.toggle.setAttribute('aria-expanded', 'true');
    }
  });
}

function onBeforeAnimation(ctx) {
  document.documentElement.style.overflow = 'hidden';

  if (ctx.sidebarContainer) {
    ctx.sidebarContainer.style.willChange = 'transform';
  }

  if (ctx.sidebarContent && isMobile(ctx.breakpoints)) {
    ctx.sidebarContent.style.willChange = 'opacity';
  }

  if (ctx.pageContent) {
    ctx.pageContent.style.pointerEvents = 'none';
  }

  if (ctx.swipeIcon) {
    ctx.swipeIcon.classList.add('hidden');
  }
}

function onAfterAnimation(ctx) {
  if (!ctx.coverpage.open) {
    document.documentElement.style.overflow = '';
  }

  if (ctx.sidebarContainer) {
    ctx.sidebarContainer.style.willChange = 'auto';
  }

  if (ctx.sidebarContent && isMobile(ctx.breakpoints)) {
    ctx.sidebarContent.style.willChange = 'auto';
  }

  if (ctx.pageContent) {
    ctx.pageContent.style.pointerEvents = 'auto';
  }

  if (ctx.coverpage.open) {
    ctx.toggle.setAttribute('aria-expanded', 'true');
  } else {
    ctx.toggle.setAttribute('aria-expanded', 'false');
  }

  if (ctx.swipeIcon) {
    ctx.swipeIcon.classList.toggle('hidden', !ctx.coverpage?.open ?? true);
  }
}

function onCoverpageProgress(e, ctx) {
  const { t, travel } = e.detail;

  if (ctx.sidebarContainer) {
    ctx.sidebarContainer.style.transform = `translateX(${travel * (1 - t)}px)`;
  }

  if (ctx.sidebarContent) {
    ctx.sidebarContent.style.opacity = isMobile(ctx.breakpoints) ? `${t}` : '1';
  }
}

function updateActiveNav(url) {
  const pathname = new URL(url, location.href).pathname;
  document.querySelectorAll('.sidebar-nav-item[data-nav-path]').forEach((li) => {
    const linkPath = new URL(li.dataset.navPath, location.href).pathname;
    const isActive = linkPath === pathname || (linkPath !== '/' && pathname.startsWith(linkPath));
    li.classList.toggle('active', isActive);
  });
}

/**
 * Wires up interactions based on and in the sidebar
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
  const swipeIcon = document.getElementById('_swipe-icon');

  if (!sidebarContainer) logMissing('.sidebar-container');
  if (!sidebarContent) logMissing('.sidebar-sticky');
  if (!pageContent) logMissing('_content');
  if (!swipeIcon) logMissing('_swipe-icon');

  const ctx = {
    toggle,
    coverpage,
    sidebarContainer,
    sidebarContent,
    pageContent,
    swipeIcon,
    breakpoints,
  };

  updateActiveNav(location.href);

  document.addEventListener('router-navigated', (e) => {
    coverpage.hide();
    updateActiveNav(e.detail.url);
  });

  setupToggle(ctx);

  coverpage.addEventListener('coverpage-before-animation', () => onBeforeAnimation(ctx));
  coverpage.addEventListener('coverpage-after-animation', () => onAfterAnimation(ctx));
  coverpage.addEventListener('coverpage-progress', (event) => onCoverpageProgress(event, ctx));
}
