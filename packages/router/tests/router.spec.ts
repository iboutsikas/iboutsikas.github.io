import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { IbRouter, RouterEvents } from '../src/index.js';
import {
  buildPageHtml,
  makeFetch,
  clickAnchor,
  flushMicrotasks,
  makeLocationValue,
  createRouterTestBed,
  teardownRouterTestBed,
  listenFor,
} from './test-utils.js';

const assignMock = vi.fn();

async function advanceNavigation(): Promise<void> {
  await vi.advanceTimersByTimeAsync(2100);
  await flushMicrotasks();
  await flushMicrotasks();
}

describe('IbRouter', () => {
  let router: IbRouter;
  let content: HTMLDivElement;
  let pushStateSpy: ReturnType<typeof vi.spyOn<History, 'pushState'>>;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: makeLocationValue({ assign: assignMock }),
    });
  });

  beforeEach(() => {
    const bed = createRouterTestBed(assignMock);
    router = bed.router as unknown as IbRouter;
    content = bed.content;
    pushStateSpy = bed.pushStateSpy;
  });

  afterEach(() => {
    teardownRouterTestBed(router, content);
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
      document.body.appendChild(router);
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
          return new Promise(() => { /* never resolves */ });
        })
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
        expect.objectContaining({ signal: expect.any(AbortSignal) })
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
      clickAnchor('http://localhost/page2', {}, { target: '_blank' });
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores download links', () => {
      clickAnchor('http://localhost/file.pdf', {}, { download: '' });
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores rel=external links', () => {
      clickAnchor('http://localhost/page2', {}, { rel: 'external' });
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('ignores cross-origin links', () => {
      clickAnchor('https://external.example.com/page');
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('intercepts same-page hash-only link but does not fetch', () => {
      const { event } = clickAnchor(`${location.href}#section`);
      expect(event.defaultPrevented).toBe(true);
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });

    it('intercepts same-page click with no hash but does not fetch', () => {
      const { event } = clickAnchor(location.href);
      expect(event.defaultPrevented).toBe(true);
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
      expect(pushStateSpy).toHaveBeenCalledWith(
        { spa: true },
        expect.any(String),
        'http://localhost/page2'
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
      expect(pushStateSpy).not.toHaveBeenCalled();
    });

    it('fetches and swaps content on popstate even when target url matches current location', async () => {
      // Regression: _handlePopstate calls _navigate(location.href) AFTER the browser has
      // already updated location to the back-target. isSamePage() then compared the target
      // URL against itself and always returned true, so no fetch ever happened on back nav.
      vi.stubGlobal('fetch', makeFetch('<p>previous-page</p>', 'Previous'));
      window.location.href = 'http://localhost/previous-page';
      (window.location as unknown as Record<string, unknown>).pathname = '/previous-page';

      window.dispatchEvent(new PopStateEvent('popstate'));
      await advanceNavigation();

      expect(vi.mocked(fetch)).toHaveBeenCalledWith('http://localhost/previous-page', expect.any(Object));
      expect(content.innerHTML).toBe('<p>previous-page</p>');
    });

    it('falls back to location.assign on HTTP error', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('Not Found', { status: 404 })));
      clickAnchor('http://localhost/missing');
      await advanceNavigation();
      expect(assignMock).toHaveBeenCalledWith('http://localhost/missing');
    });

    it('does not swap content on HTTP error', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue(new Response('Server Error', { status: 500 }))
      );
      clickAnchor('http://localhost/broken');
      await advanceNavigation();
      expect(content.innerHTML).toBe('<p>initial</p>');
    });

    it('silently ignores AbortError (cancelled fetch)', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(Object.assign(new Error('Aborted'), { name: 'AbortError' }))
      );
      const errors = listenFor(router, RouterEvents.NavigationError);

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
          return new Promise(() => { /* never resolves */ });
        })
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
      expect(content.innerHTML).toBe('<p>initial</p>');
      custom.remove();
      router.contentSelector = '#_content';
    });
  });

  // ── events ─────────────────────────────────────────────────────────────────

  describe('events', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('fires router-before-navigate with url and title before swap', async () => {
      vi.stubGlobal('fetch', makeFetch('<p>x</p>', 'Target'));
      const events = listenFor(router, RouterEvents.BeforeNavigate);

      clickAnchor('http://localhost/target');
      await advanceNavigation();

      expect(events).toHaveLength(1);
      expect(events[0].detail.url).toBe('http://localhost/target');
      expect(events[0].detail.title).toBe('Target');
    });

    it('fires router-navigated with url, title, from, isBackForward', async () => {
      const fromPath = location.pathname;
      const events = listenFor(router, RouterEvents.Navigated);

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(events).toHaveLength(1);
      expect(events[0].detail.url).toBe('http://localhost/page2');
      expect(events[0].detail.from).toBe(fromPath);
      expect(events[0].detail.isBackForward).toBe(false);
    });

    it('fires router-navigation-complete after full navigation', async () => {
      const events = listenFor(router, RouterEvents.NavigationComplete);

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(events).toHaveLength(1);
      expect(events[0].detail.url).toBe('http://localhost/page2');
    });

    it('fires router-navigation-error on HTTP error with correct detail', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 500 })));
      const errors = listenFor(router, RouterEvents.NavigationError);

      clickAnchor('http://localhost/broken');
      await advanceNavigation();

      expect(errors).toHaveLength(1);
      expect(errors[0].detail.url).toBe('http://localhost/broken');
      expect(errors[0].detail.error.message).toBe('HTTP 500');
    });

    it('calls location.assign and skips swap when before-navigate is prevented', async () => {
      router.addEventListener(RouterEvents.BeforeNavigate, (e) => e.preventDefault());

      clickAnchor('http://localhost/page2');
      await advanceNavigation();

      expect(assignMock).toHaveBeenCalledWith('http://localhost/page2');
      expect(content.innerHTML).toBe('<p>initial</p>');
    });

    it('fires router-navigated with isBackForward=true on popstate', async () => {
      const events = listenFor(router, RouterEvents.Navigated);

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

  // ── same-page navigation ──────────────────────────────────────────────────

  describe('same-page navigation', () => {
    it('fires BeforeNavigate, Navigated, NavigationComplete without fetching', async () => {
      const before = listenFor(router, RouterEvents.BeforeNavigate);
      const navigated = listenFor(router, RouterEvents.Navigated);
      const complete = listenFor(router, RouterEvents.NavigationComplete);

      clickAnchor(location.href);
      await flushMicrotasks();
      await flushMicrotasks();

      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
      expect(before).toHaveLength(1);
      expect(navigated).toHaveLength(1);
      expect(complete).toHaveLength(1);
    });

    it('does not swap content on same-page navigation', async () => {
      clickAnchor(location.href);
      await flushMicrotasks();
      expect(content.innerHTML).toBe('<p>initial</p>');
    });

    it('does not scroll to top on same-page navigation', async () => {
      clickAnchor(location.href);
      await flushMicrotasks();
      expect(vi.mocked(scrollTo)).not.toHaveBeenCalled();
    });

    it('pushes state to history on same-page navigation', async () => {
      clickAnchor(location.href);
      await flushMicrotasks();
      expect(pushStateSpy).toHaveBeenCalledWith(
        { spa: true },
        expect.any(String),
        location.href
      );
    });

    it('Navigated detail has correct url, from, isBackForward', async () => {
      const fromPath = location.pathname;
      const events = listenFor(router, RouterEvents.Navigated);

      clickAnchor(location.href);
      await flushMicrotasks();

      expect(events[0].detail.url).toBe(location.href);
      expect(events[0].detail.from).toBe(fromPath);
      expect(events[0].detail.isBackForward).toBe(false);
    });

    it('location.assign called and no events fire when BeforeNavigate prevented', async () => {
      router.addEventListener(RouterEvents.BeforeNavigate, (e) => e.preventDefault());
      const navigated = listenFor(router, RouterEvents.Navigated);

      clickAnchor(location.href);
      await flushMicrotasks();

      expect(assignMock).toHaveBeenCalledWith(location.href);
      expect(pushStateSpy).not.toHaveBeenCalled();
      expect(navigated).toHaveLength(0);
    });

    it('same-page navigation aborts in-flight fetch', async () => {
      const signals: AbortSignal[] = [];
      vi.stubGlobal(
        'fetch',
        vi.fn((_url: string, init: RequestInit) => {
          signals.push(init.signal as AbortSignal);
          return new Promise(() => { /* never resolves */ });
        })
      );

      clickAnchor('http://localhost/page2');
      await flushMicrotasks();

      expect(signals[0].aborted).toBe(false);

      clickAnchor(location.href);
      await flushMicrotasks();

      expect(signals[0].aborted).toBe(true);
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
        vi.fn(() => {
          return Promise.resolve(new Response(buildPageHtml('<p>new</p>', 'New'), { status: 200 }));
        })
      );

      clickAnchor('http://localhost/page2');
      await vi.advanceTimersByTimeAsync(0);
      await flushMicrotasks();
      classAtFetch = content.className;

      await vi.advanceTimersByTimeAsync(2100);
      await flushMicrotasks();

      expect(classAtFetch).toContain('router-leaving');
    });

    it('adds enteringClass after swap', async () => {
      clickAnchor('http://localhost/page2');
      await vi.advanceTimersByTimeAsync(1100);
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

      await vi.advanceTimersByTimeAsync(0);
      await flushMicrotasks();

      content.dispatchEvent(new Event('transitionend'));
      await flushMicrotasks();
      await vi.advanceTimersByTimeAsync(0);

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
