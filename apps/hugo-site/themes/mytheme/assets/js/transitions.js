const SUPPORTS_VT = typeof document.startViewTransition === 'function';

function fadeOut(el) {
  el.classList.add('spa-fade-out');
  return new Promise(resolve =>
    el.addEventListener('transitionend', resolve, { once: true })
  );
}

function fadeIn(el) {
  el.classList.remove('spa-fade-out');
  el.classList.add('spa-fade-in');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.remove('spa-fade-in'));
  });
}

function isSameOrigin(url) {
  try { return new URL(url, location.href).origin === location.origin; }
  catch { return false; }
}

function isSamePage(url) {
  const t = new URL(url, location.href);
  return t.pathname === location.pathname && t.search === location.search;
}

async function fetchPage(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const doc  = new DOMParser().parseFromString(html, 'text/html');
  return {
    content: doc.getElementById('_content')?.innerHTML ?? '',
    title:   doc.title,
  };
}

function applySwap(url, content, title, { initCodeCopy, pushState = true }) {
  document.getElementById('_content').innerHTML = content;
  document.title = title;
  if (pushState) history.pushState({ spa: true }, title, url);
  document.dispatchEvent(new CustomEvent('router-navigated', { detail: { url } }));
  window.scrollTo({ top: 0, behavior: 'instant' });
  initCodeCopy();
}

export function initTransitions({ initCodeCopy }) {
  const content = document.getElementById('_content');
  if (!content) return;

  let controller = null;

  async function navigate(url, { pushState = true } = {}) {
    if (controller) controller.abort();
    controller = new AbortController();
    const signal = controller.signal;

    try {
      const { content: html, title } = await fetchPage(url, signal);

      if (SUPPORTS_VT) {
        const transition = document.startViewTransition(() =>
          applySwap(url, html, title, { initCodeCopy, pushState })
        );
        await transition.ready.catch(() => {});
      } else {
        await fadeOut(content);
        applySwap(url, html, title, { initCodeCopy, pushState });
        fadeIn(content);
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      location.assign(url);
    } finally {
      if (!signal.aborted) controller = null;
    }
  }

  document.addEventListener('click', (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;

    const a = e.target.closest('a');
    if (!a || !a.href) return;
    if (a.target === '_blank') return;
    if (a.hasAttribute('download')) return;
    if (a.getAttribute('rel')?.includes('external')) return;
    if (!isSameOrigin(a.href)) return;

    const parsed = new URL(a.href);
    if (isSamePage(a.href) && parsed.hash !== '') return;
    if (isSamePage(a.href) && !parsed.hash) return;

    e.preventDefault();
    navigate(a.href);
  });

  window.addEventListener('popstate', () => {
    navigate(location.href, { pushState: false });
  });
}
