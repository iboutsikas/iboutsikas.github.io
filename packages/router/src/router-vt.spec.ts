/**
 * View Transitions path tests.
 *
 * SUPPORTS_VT is a module-level const evaluated on first import.
 * vi.hoisted runs before static imports, so we can patch document
 * before the module loads and force SUPPORTS_VT = true.
 */
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';

const startViewTransitionMock = vi.hoisted(() => {
  const mock = vi.fn((cb: () => void | Promise<void>) => {
    cb();
    return { finished: Promise.resolve() };
  });
  Object.defineProperty(document, 'startViewTransition', {
    value: mock,
    configurable: true,
    writable: true,
  });
  return mock;
});

// Import AFTER hoisted patch — SUPPORTS_VT is now true
import { IbRouter, RouterEvents } from './index.js';

// ─── helpers ─────────────────────────────────────────────────────────────────

function buildPageHtml(contentHtml: string, title: string): string {
  return `<!DOCTYPE html><html><head><title>${title}</title></head><body><div id="_content">${contentHtml}</div></body></html>`;
}

function makeFetch(contentHtml = '<p>vt-new</p>', title = 'VT Page') {
  return vi.fn().mockResolvedValue(
    new Response(buildPageHtml(contentHtml, title), {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    }),
  );
}

function clickAnchor(href: string): MouseEvent {
  const a = document.createElement('a');
  a.href = href;
  document.body.appendChild(a);
  const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
  a.dispatchEvent(event);
  a.remove();
  return event;
}

function flushMicrotasks(): Promise<void> {
  return new Promise(resolve => queueMicrotask(resolve));
}

async function settleNavigation(): Promise<void> {
  // VT path: fetch tick + 2 ticks for `await transition.finished.catch()` chain + queueMicrotask tick
  for (let i = 0; i < 6; i++) await flushMicrotasks();
}

// ─── location mock ────────────────────────────────────────────────────────────

const assignMock = vi.fn();

// ─── suite ───────────────────────────────────────────────────────────────────

describe('IbRouter (View Transitions)', () => {
  let router: IbRouter;
  let content: HTMLDivElement;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: {
        href: 'http://localhost/',
        origin: 'http://localhost',
        pathname: '/',
        search: '',
        hash: '',
        assign: assignMock,
        replace: vi.fn(),
        reload: vi.fn(),
        toString: () => 'http://localhost/',
      },
    });
  });

  beforeEach(() => {
    assignMock.mockReset();
    startViewTransitionMock.mockClear();
    vi.stubGlobal('fetch', makeFetch());
    vi.stubGlobal('scrollTo', vi.fn());
    vi.spyOn(history, 'pushState').mockImplementation(() => {});

    content = document.createElement('div');
    content.id = '_content';
    content.innerHTML = '<p>initial</p>';
    document.body.appendChild(content);

    router = document.createElement('ib-router') as IbRouter;
    document.body.appendChild(router);
  });

  afterEach(() => {
    router.remove();
    content.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('calls document.startViewTransition for navigation', async () => {
    clickAnchor('http://localhost/page2');
    await settleNavigation();
    expect(startViewTransitionMock).toHaveBeenCalledOnce();
  });

  it('swaps content inside the transition callback', async () => {
    vi.stubGlobal('fetch', makeFetch('<p>vt-swapped</p>', 'VT Swapped'));
    clickAnchor('http://localhost/page2');
    await settleNavigation();
    expect(content.innerHTML).toBe('<p>vt-swapped</p>');
  });

  it('updates document.title', async () => {
    vi.stubGlobal('fetch', makeFetch('<p>x</p>', 'VT Title'));
    clickAnchor('http://localhost/page2');
    await settleNavigation();
    expect(document.title).toBe('VT Title');
  });

  it('pushes state to history', async () => {
    clickAnchor('http://localhost/page2');
    await settleNavigation();
    expect(history.pushState).toHaveBeenCalledWith({ spa: true }, expect.any(String), 'http://localhost/page2');
  });

  it('fires router-before-navigate before transition', async () => {
    vi.stubGlobal('fetch', makeFetch('<p>x</p>', 'T'));
    const events: CustomEvent[] = [];
    router.addEventListener(RouterEvents.BeforeNavigate, e => events.push(e as CustomEvent));

    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(events).toHaveLength(1);
    expect(events[0].detail.url).toBe('http://localhost/page2');
  });

  it('fires router-navigated inside the transition callback', async () => {
    const events: CustomEvent[] = [];
    router.addEventListener(RouterEvents.Navigated, e => events.push(e as CustomEvent));

    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(events).toHaveLength(1);
    expect(events[0].detail.isBackForward).toBe(false);
  });

  it('fires router-navigation-complete after transition.finished', async () => {
    const events: CustomEvent[] = [];
    router.addEventListener(RouterEvents.NavigationComplete, e => events.push(e as CustomEvent));

    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(events).toHaveLength(1);
    expect(events[0].detail.url).toBe('http://localhost/page2');
  });

  it('calls location.assign and skips transition when before-navigate prevented', async () => {
    router.addEventListener(RouterEvents.BeforeNavigate, e => e.preventDefault());

    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(startViewTransitionMock).not.toHaveBeenCalled();
    expect(assignMock).toHaveBeenCalledWith('http://localhost/page2');
    expect(content.innerHTML).toBe('<p>initial</p>');
  });

  it('fires router-navigation-error on HTTP error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 503 })));
    const errors: CustomEvent[] = [];
    router.addEventListener(RouterEvents.NavigationError, e => errors.push(e as CustomEvent));

    clickAnchor('http://localhost/broken');
    await settleNavigation();

    expect(errors).toHaveLength(1);
    expect(errors[0].detail.error.message).toBe('HTTP 503');
    expect(assignMock).toHaveBeenCalledWith('http://localhost/broken');
  });

  it('does not add transition classes (VT handles animations)', async () => {
    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(content.classList.contains('router-leaving')).toBe(false);
    expect(content.classList.contains('router-entering')).toBe(false);
  });

  describe('same-page navigation', () => {
    it('does not call startViewTransition on same-page click', async () => {
      clickAnchor('http://localhost/');
      await settleNavigation();
      expect(startViewTransitionMock).not.toHaveBeenCalled();
    });

    it('fires all three events on same-page click without fetching', async () => {
      const before: CustomEvent[] = [];
      const navigated: CustomEvent[] = [];
      const complete: CustomEvent[] = [];
      router.addEventListener(RouterEvents.BeforeNavigate, e => before.push(e as CustomEvent));
      router.addEventListener(RouterEvents.Navigated, e => navigated.push(e as CustomEvent));
      router.addEventListener(RouterEvents.NavigationComplete, e => complete.push(e as CustomEvent));

      clickAnchor('http://localhost/');
      await settleNavigation();

      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
      expect(before).toHaveLength(1);
      expect(navigated).toHaveLength(1);
      expect(complete).toHaveLength(1);
    });

    it('does not swap content on same-page click', async () => {
      clickAnchor('http://localhost/');
      await settleNavigation();
      expect(content.innerHTML).toBe('<p>initial</p>');
    });
  });
});
