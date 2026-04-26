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
    void cb();
    return { finished: Promise.resolve() };
  });
  Object.defineProperty(document, 'startViewTransition', {
    value: mock,
    configurable: true,
    writable: true,
  });
  return mock;
});

import { IbRouter, RouterEvents } from '../src/index.js';
import {
  makeFetch,
  clickAnchor,
  flushMicrotasks,
  makeLocationValue,
  createRouterTestBed,
  teardownRouterTestBed,
  listenFor,
} from './test-utils.js';

const assignMock = vi.fn();

async function settleNavigation(): Promise<void> {
  // VT path: fetch tick + 2 ticks for `await transition.finished.catch()` chain + queueMicrotask tick
  for (let i = 0; i < 6; i++) await flushMicrotasks();
}

describe('IbRouter (View Transitions)', () => {
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
    startViewTransitionMock.mockClear();
  });

  afterEach(() => {
    teardownRouterTestBed(router, content);
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
    expect(pushStateSpy).toHaveBeenCalledWith(
      { spa: true },
      expect.any(String),
      'http://localhost/page2'
    );
  });

  it('fires router-before-navigate before transition', async () => {
    vi.stubGlobal('fetch', makeFetch('<p>x</p>', 'T'));
    const events = listenFor(router, RouterEvents.BeforeNavigate);

    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(events).toHaveLength(1);
    expect(events[0].detail.url).toBe('http://localhost/page2');
  });

  it('fires router-navigated inside the transition callback', async () => {
    const events = listenFor(router, RouterEvents.Navigated);

    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(events).toHaveLength(1);
    expect(events[0].detail.isBackForward).toBe(false);
  });

  it('fires router-navigation-complete after transition.finished', async () => {
    const events = listenFor(router, RouterEvents.NavigationComplete);

    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(events).toHaveLength(1);
    expect(events[0].detail.url).toBe('http://localhost/page2');
  });

  it('calls location.assign and skips transition when before-navigate prevented', async () => {
    router.addEventListener(RouterEvents.BeforeNavigate, (e) => e.preventDefault());

    clickAnchor('http://localhost/page2');
    await settleNavigation();

    expect(startViewTransitionMock).not.toHaveBeenCalled();
    expect(assignMock).toHaveBeenCalledWith('http://localhost/page2');
    expect(content.innerHTML).toBe('<p>initial</p>');
  });

  it('fires router-navigation-error on HTTP error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 503 })));
    const errors = listenFor(router, RouterEvents.NavigationError);

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
      const before = listenFor(router, RouterEvents.BeforeNavigate);
      const navigated = listenFor(router, RouterEvents.Navigated);
      const complete = listenFor(router, RouterEvents.NavigationComplete);

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
