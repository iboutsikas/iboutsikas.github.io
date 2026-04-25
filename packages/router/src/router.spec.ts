import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { IbRouter, RouterEvents } from './index.js';

// ─── location mock ────────────────────────────────────────────────────────────
// jsdom's location.assign is non-configurable; replace the whole object once.

const assignMock = vi.fn();

function makLocationValue(overrides: Partial<Location> = {}): Location {
  return {
    href: 'http://localhost/',
    origin: 'http://localhost',
    pathname: '/',
    search: '',
    hash: '',
    host: 'localhost',
    hostname: 'localhost',
    port: '',
    protocol: 'http:',
    assign: assignMock,
    replace: vi.fn(),
    reload: vi.fn(),
    toString: () => 'http://localhost/',
    ancestorOrigins: [] as unknown as DOMStringList,
    ...overrides,
  } as Location;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function buildPageHtml(contentHtml: string, title: string): string {
  return `<!DOCTYPE html><html><head><title>${title}</title></head><body><div id="_content">${contentHtml}</div></body></html>`;
}

function makeFetch(contentHtml = '<p>new</p>', title = 'New Page') {
  return vi.fn().mockResolvedValue(
    new Response(buildPageHtml(contentHtml, title), {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    }),
  );
}

function clickAnchor(
  href: string,
  opts: Partial<MouseEventInit> = {},
): { event: MouseEvent; anchor: HTMLAnchorElement } {
  const a = document.createElement('a');
  a.href = href;
  document.body.appendChild(a);
  const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...opts });
  a.dispatchEvent(event);
  a.remove();
  return { event, anchor: a };
}

function flushMicrotasks(): Promise<void> {
  return new Promise(resolve => queueMicrotask(resolve));
}

// Advance fake timers through both markLeaving + markEntering (each 1000ms) and flush microtasks.
async function advanceNavigation(): Promise<void> {
  await vi.advanceTimersByTimeAsync(2100);
  await flushMicrotasks();
  await flushMicrotasks();
}

// ─── suite ───────────────────────────────────────────────────────────────────

describe('IbRouter', () => {
  let router: IbRouter;
  let content: HTMLDivElement;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: makLocationValue(),
    });
  });

  afterAll(() => {
    // jsdom resets between files; no explicit restore needed
  });

  beforeEach(() => {
    assignMock.mockReset();
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

  // ── lifecycle ──────────────────────────────────────────────────────────────

  describe('lifecycle', () => {
    it('registers document click listener on connectedCallback', () => {
      const spy = vi.spyOn(document, 'addEventListener');
      const r = document.createElement('ib-router') as IbRouter;
      document.body.appendChild(r);
      expect(spy).toHaveBeenCalledWith('click', expect.any(Function));
      r.remove();
    });

    it('registers window popstate listener on connectedCallback', () => {
      const spy = vi.spyOn(window, 'addEventListener');
      const r = document.createElement('ib-router') as IbRouter;
      document.body.appendChild(r);
      expect(spy).toHaveBeenCalledWith('popstate', expect.any(Function));
      r.remove();
    });

    it('removes click listener on disconnectedCallback', () => {
      const spy = vi.spyOn(document, 'removeEventListener');
      router.remove();
      expect(spy).toHaveBeenCalledWith('click', expect.any(Function));
      document.body.appendChild(router); // restore for afterEach
    });

    it('removes popstate listener on disconnectedCallback', () => {
      const spy = vi.spyOn(window, 'removeEventListener');
      router.remove();
      expect(spy).toHaveBeenCalledWith('popstate', expect.any(Function));
      document.body.appendChild(router);
    });

    it('stops intercepting clicks after disconnect', () => {
      router.remove();
      clickAnchor('http://localhost/page2');
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
      document.body.appendChild(router);
    });

    it('aborts in-flight fetch on disconnect', async () => {
      let capturedSignal!: AbortSignal;
      vi.stubGlobal(
        'fetch',
        vi.fn((_url: string, init: RequestInit) => {
          capturedSignal = init.signal as AbortSignal;
          return new Promise(() => {}); // never resolves
        }),
      );

      clickAnchor('http://localhost/slow');
      await flushMicrotasks();

      expect(capturedSignal.aborted).toBe(false);
      router.remove();
      expect(capturedSignal.aborted).toBe(true);
      document.body.appendChild(router);
    });
  });

  // ── click handling ─────────────────────────────────────────────────────────

  describe('click handling', () => {
    it('navigates on same-origin link click', () => {
      clickAnchor('http://localhost/page2');
      expect(vi.mocked(fetch)).toHaveBeenCalledWith(
        'http://localhost/page2',
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });

    it('prevents default on intercepted clicks', () => {
      const { event } = clickAnchor('http://localhost/page2');
      expect(event.defaultPrevented).toBe(true);
    });

    it('ignores ctrl+click', () => {
      clickAnchor('http://localhost/page2', { ctrlKey: true });
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores meta+click', () => {
      clickAnchor('http://localhost/page2', { metaKey: true });
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores shift+click', () => {
      clickAnchor('http://localhost/page2', { shiftKey: true });
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores alt+click', () => {
      clickAnchor('http://localhost/page2', { altKey: true });
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores non-primary button clicks', () => {
      clickAnchor('http://localhost/page2', { button: 1 });
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores already-prevented events', () => {
      const a = document.createElement('a');
      a.href = 'http://localhost/page2';
      document.body.appendChild(a);
      const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
      event.preventDefault();
      a.dispatchEvent(event);
      a.remove();
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores _blank target links', () => {
      const a = document.createElement('a');
      a.href = 'http://localhost/page2';
      a.target = '_blank';
      document.body.appendChild(a);
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      a.remove();
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores download links', () => {
      const a = document.createElement('a');
      a.href = 'http://localhost/file.pdf';
      a.setAttribute('download', '');
      document.body.appendChild(a);
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      a.remove();
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores rel=external links', () => {
      const a = document.createElement('a');
      a.href = 'http://localhost/page2';
      a.rel = 'external';
      document.body.appendChild(a);
      a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      a.remove();
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores cross-origin links', () => {
      clickAnchor('https://external.example.com/page');
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores same-page hash-only navigation', () => {
      clickAnchor(`${location.href}#section`);
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores same-page click with no hash', () => {
      clickAnchor(location.href);
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores events with no ancestor anchor', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      div.remove();
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('navigates when click target is child element inside anchor', () => {
      const a = document.createElement('a');
      a.href = 'http://localhost/page2';
      const span = document.createElement('span');
      a.appendChild(span);
      document.body.appendChild(a);
      span.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      a.remove();
      expect(vi.mocked(fetch)).toHaveBeenCalledWith('http://localhost/page2', expect.any(Object));
    });
  });

  // ── navigation core ────────────────────────────────────────────────────────

  describe('navigation', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('swaps content innerHTML after successful fetch', async () => {
      vi.stubGlobal('fetch', makeFetch('<p>swapped</p>', 'Swapped'));
      clickAnchor('http://localhost/page2');
      await advanceNavigation();
      expect(content.innerHTML).toBe('<p>swapped</p>');
    });

    it('updates document.title', async () => {
      vi.stubGlobal('fetch', makeFetch('<p>x</p>', 'My Title'));
      clickAnchor('http://localhost/page2');
      await advanceNavigation();
      expect(document.title).toBe('My Title');
    });

    it('pushes state to history with spa flag', async () => {
      clickAnchor('http://localhost/page2');
      await advanceNavigation();
      expect(history.pushState).toHaveBeenCalledWith(
        { spa: true },
        expect.any(String),
        'http://localhost/page2',
      );
    });

    it('scrolls to top after swap', async () => {
      clickAnchor('http://localhost/page2');
      await advanceNavigation();
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
    });

    it('does not push to history on popstate navigation', async () => {
      window.dispatchEvent(new PopStateEvent('popstate'));
      await advanceNavigation();
      expect(history.pushState).not.toHaveBeenCalled();
    });

    it('falls back to location.assign on HTTP error', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('Not Found', { status: 404 })),
      );
      clickAnchor('http://localhost/missing');
      await advanceNavigation();
      expect(assignMock).toHaveBeenCalledWith('http://localhost/missing');
    });

    it('does not swap content on HTTP error', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('Server Error', { status: 500 })),
      );
      clickAnchor('http://localhost/broken');
      await advanceNavigation();
      expect(content.innerHTML).toBe('<p>initial</p>');
    });

    it('silently ignores AbortError (cancelled fetch)', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(Object.assign(new Error('Aborted'), { name: 'AbortError' })),
      );
      const errors: CustomEvent[] = [];
      router.addEventListener(RouterEvents.NavigationError, e => errors.push(e as CustomEvent));

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(errors).toHaveLength(0);
      expect(assignMock).not.toHaveBeenCalled();
    });

    it('aborts first request when second navigation starts', async () => {
      const signals: AbortSignal[] = [];
      vi.stubGlobal(
        'fetch',
        vi.fn((_url: string, init: RequestInit) => {
          signals.push(init.signal as AbortSignal);
          return new Promise(() => {}); // never resolves
        }),
      );

      clickAnchor('http://localhost/page1');
      await flushMicrotasks();
      clickAnchor('http://localhost/page2');
      await flushMicrotasks();

      expect(signals).toHaveLength(2);
      expect(signals[0].aborted).toBe(true);
      expect(signals[1].aborted).toBe(false);
    });

    it('does nothing when content element is missing', async () => {
      content.remove();
      clickAnchor('http://localhost/page2');
      await advanceNavigation();
      // no throw, no assign — just a silent early return
      expect(assignMock).not.toHaveBeenCalled();
      document.body.appendChild(content);
    });

    it('uses contentSelector property to find content element', async () => {
      const custom = document.createElement('div');
      custom.id = 'my-content';
      custom.innerHTML = '<p>custom initial</p>';
      document.body.appendChild(custom);

      router.contentSelector = '#my-content';
      vi.stubGlobal('fetch', makeFetch('<p>custom swapped</p>', 'Custom'));

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(custom.innerHTML).toBe('<p>custom swapped</p>');
      expect(content.innerHTML).toBe('<p>initial</p>'); // default slot untouched
      custom.remove();
      router.contentSelector = '#_content'; // reset
    });
  });

  // ── events ─────────────────────────────────────────────────────────────────

  describe('events', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('fires router-before-navigate with url and title before swap', async () => {
      vi.stubGlobal('fetch', makeFetch('<p>x</p>', 'Target'));
      const events: CustomEvent[] = [];
      router.addEventListener(RouterEvents.BeforeNavigate, e => events.push(e as CustomEvent));

      clickAnchor('http://localhost/target');
      await advanceNavigation();

      expect(events).toHaveLength(1);
      expect(events[0].detail.url).toBe('http://localhost/target');
      expect(events[0].detail.title).toBe('Target');
    });

    it('fires router-navigated with url, title, from, isBackForward', async () => {
      const fromPath = location.pathname;
      const events: CustomEvent[] = [];
      router.addEventListener(RouterEvents.Navigated, e => events.push(e as CustomEvent));

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(events).toHaveLength(1);
      expect(events[0].detail.url).toBe('http://localhost/page2');
      expect(events[0].detail.from).toBe(fromPath);
      expect(events[0].detail.isBackForward).toBe(false);
    });

    it('fires router-navigation-complete after full navigation', async () => {
      const events: CustomEvent[] = [];
      router.addEventListener(RouterEvents.NavigationComplete, e => events.push(e as CustomEvent));

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(events).toHaveLength(1);
      expect(events[0].detail.url).toBe('http://localhost/page2');
    });

    it('fires router-navigation-error on HTTP error with correct detail', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('', { status: 500 })),
      );
      const errors: CustomEvent[] = [];
      router.addEventListener(RouterEvents.NavigationError, e => errors.push(e as CustomEvent));

      clickAnchor('http://localhost/broken');
      await advanceNavigation();

      expect(errors).toHaveLength(1);
      expect(errors[0].detail.url).toBe('http://localhost/broken');
      expect(errors[0].detail.error.message).toBe('HTTP 500');
    });

    it('calls location.assign and skips swap when before-navigate is prevented', async () => {
      router.addEventListener(RouterEvents.BeforeNavigate, e => e.preventDefault());

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(assignMock).toHaveBeenCalledWith('http://localhost/page2');
      expect(content.innerHTML).toBe('<p>initial</p>');
    });

    it('fires router-navigated with isBackForward=true on popstate', async () => {
      const events: CustomEvent[] = [];
      router.addEventListener(RouterEvents.Navigated, e => events.push(e as CustomEvent));

      window.dispatchEvent(new PopStateEvent('popstate'));
      await advanceNavigation();

      expect(events[0].detail.isBackForward).toBe(true);
    });

    it('NavigationComplete fires after Navigated', async () => {
      const order: string[] = [];
      router.addEventListener(RouterEvents.Navigated, () => order.push('navigated'));
      router.addEventListener(RouterEvents.NavigationComplete, () => order.push('complete'));

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(order).toEqual(['navigated', 'complete']);
    });

    it('BeforeNavigate fires before content is swapped', async () => {
      let htmlAtEvent = '';
      router.addEventListener(RouterEvents.BeforeNavigate, () => {
        htmlAtEvent = content.innerHTML;
      });
      vi.stubGlobal('fetch', makeFetch('<p>new</p>', 'New'));

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(htmlAtEvent).toBe('<p>initial</p>');
    });
  });

  // ── transition classes (non-VT path) ───────────────────────────────────────

  describe('transition classes', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('adds leavingClass before content swap', async () => {
      let classAtFetch = '';
      vi.stubGlobal(
        'fetch',
        vi.fn(async () => {
          // fetch is called, but markLeaving runs AFTER fetch resolves
          return new Response(buildPageHtml('<p>new</p>', 'New'), { status: 200 });
        }),
      );

      clickAnchor('http://localhost/page2');
      // flush fetch microtask then check class before 1000ms elapses
      await vi.advanceTimersByTimeAsync(0);
      await flushMicrotasks();
      classAtFetch = content.className;

      await vi.advanceTimersByTimeAsync(2100);
      await flushMicrotasks();

      expect(classAtFetch).toContain('router-leaving');
    });

    it('adds enteringClass after swap', async () => {
      clickAnchor('http://localhost/page2');
      await vi.advanceTimersByTimeAsync(1100); // through markLeaving
      await flushMicrotasks();

      expect(content.classList.contains('router-entering')).toBe(true);
    });

    it('removes both classes after navigation completes', async () => {
      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(content.classList.contains('router-leaving')).toBe(false);
      expect(content.classList.contains('router-entering')).toBe(false);
    });

    it('resolves markLeaving early when transitionend fires', async () => {
      clickAnchor('http://localhost/page2');

      // fetch resolves, markLeaving starts
      await vi.advanceTimersByTimeAsync(0);
      await flushMicrotasks();

      // fire transitionend early instead of waiting 1000ms
      content.dispatchEvent(new Event('transitionend'));
      await flushMicrotasks();
      await vi.advanceTimersByTimeAsync(0);

      // _applySwap should have run — content is swapped
      expect(content.innerHTML).not.toBe('<p>initial</p>');
    });

    it('uses custom leavingClass property', async () => {
      router.leavingClass = 'my-leave';
      clickAnchor('http://localhost/page2');
      await vi.advanceTimersByTimeAsync(0);
      await flushMicrotasks();

      expect(content.classList.contains('my-leave')).toBe(true);
    });

    it('uses custom enteringClass property', async () => {
      router.enteringClass = 'my-enter';
      clickAnchor('http://localhost/page2');
      await vi.advanceTimersByTimeAsync(1100);
      await flushMicrotasks();

      expect(content.classList.contains('my-enter')).toBe(true);
    });
  });
});
