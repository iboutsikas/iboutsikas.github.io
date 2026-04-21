import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import './coverpage.js';
import type { IbCoverpage } from './coverpage.js';

// Mock ResizeObserver since jsdom doesn't implement it
let lastResizeObserver: any = null;

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  callback: (entries: any[]) => void = () => {};

  constructor(callback: (entries: any[]) => void) {
    this.callback = callback;
    lastResizeObserver = this;
  }

  trigger(entries: any[]) {
    this.callback(entries);
  }
}
(globalThis as any).ResizeObserver = ResizeObserverMock;

// --- helpers ---

function setViewport(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true, configurable: true });
}

async function createElement(side = 'left', extra?: Partial<IbCoverpage>): Promise<IbCoverpage> {
  const el = document.createElement('ib-coverpage') as IbCoverpage;
  el.setAttribute('side', side);
  el.peekSize = 0; // default to no peek so _closedTranslate() = -(viewport size)
  if (extra) Object.assign(el, extra);
  document.body.appendChild(el);
  await el.updateComplete;

  if (lastResizeObserver) {
    lastResizeObserver.trigger([{ contentRect: { width: 1000, height: 800 } }]);
    await vi.runAllTimersAsync();
  }

  return el;
}

function queryElement(root: IbCoverpage, selector: string): HTMLElement {
  const e = root.shadowRoot!.querySelector(selector);
  if (e == null)
    throw new Error('Make sure the webcomponent has finished updating before querying it');
  return e as HTMLElement;
}

/**
 * Simulate slow drag: advance fake time 1000ms between down and move so
 * velocity = delta / 1000 stays well below the default speedThreshold of 1 px/ms.
 */
async function slowDrag(el: HTMLElement, fromX: number, toX: number, fromY = 100, toY = 100) {
  el.dispatchEvent(new PointerEvent('pointerdown', { clientX: fromX, clientY: fromY, isPrimary: true, bubbles: true }));
  await vi.advanceTimersByTimeAsync(1000);
  window.dispatchEvent(new PointerEvent('pointermove', { clientX: toX, clientY: toY, isPrimary: true, bubbles: true }));
  await vi.runAllTimersAsync(); // flush animationFrameScheduler throttle
}

/**
 * Simulate flick: 5ms between down and up → velocity = delta/5 px/ms >> speedThreshold.
 */
async function simulateFlick(el: HTMLElement, fromX: number, toX: number, fromY = 100, toY = 100) {
  el.dispatchEvent(new PointerEvent('pointerdown', { clientX: fromX, clientY: fromY, isPrimary: true, bubbles: true }));
  await vi.advanceTimersByTimeAsync(5);
  window.dispatchEvent(new PointerEvent('pointerup', { clientX: toX, clientY: toY, isPrimary: true, bubbles: true }));
  await vi.runAllTimersAsync();
}

// --- suite ---

describe('IbCoverpage', () => {
  let el: IbCoverpage;

  beforeAll(() => {
    // jsdom returns 0 for all element dimensions; mock them so _closedTranslate() is non-zero.
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get() { return 1000; },
      configurable: true
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() { return 800; },
      configurable: true
    });

    // getComputedStyle mock: check the element's own inline styles for CSS custom properties
    // so tests can override them without a real CSS engine.
    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = (element: any) => {
      return {
        getPropertyValue: (name: string) => {
          if (name === '--cover-peek-size') {
            // Return '' when not set → _getCssPeekSize falls back to this.peekSize property
            return element?.style?.getPropertyValue?.('--cover-peek-size') ?? '';
          }
          if (name === '--cover-anim-duration') {
            return element?.style?.getPropertyValue?.('--cover-anim-duration') || '300ms';
          }
          return '';
        }
      } as any;
    };
    (window as any)._originalGetComputedStyle = originalGetComputedStyle;
  });

  afterAll(() => {
    window.getComputedStyle = (window as any)._originalGetComputedStyle;
    delete (HTMLElement.prototype as any).offsetWidth;
    delete (HTMLElement.prototype as any).offsetHeight;
  });

  beforeEach(async () => {
    vi.useFakeTimers({ now: 0 });
    setViewport(1000, 800);
    el = await createElement();
  });

  afterEach(() => {
    el.remove();
    vi.restoreAllMocks();
    vi.useRealTimers();
    lastResizeObserver = null;
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders .cover and .scrim in shadow DOM', () => {
      expect(el.shadowRoot!.querySelector('.cover')).toBeTruthy();
      expect(el.shadowRoot!.querySelector('.scrim')).toBeTruthy();
    });

    it('applies the correct side class to .cover', () => {
      const cover = el.shadowRoot!.querySelector('.cover')!;
      expect(cover.classList.contains('left')).toBe(true);
    });

    it('scrim is not visible on initial render', () => {
      const scrim = queryElement(el, '.scrim');
      expect(scrim.classList.contains('is-active')).toBe(false);
      expect(scrim.style.opacity).toBe('0');
    });
  });

  // ── Drag (position updates) ─────────────────────────────────────────────────

  describe('Drag interactions', () => {
    it('updates cover translate when dragging (left side)', async () => {
      // origin=-1000, delta=+200 → clamp(-800, -1000, 0) = -800
      await slowDrag(el, 0, 200);
      await el.updateComplete;

      const cover = queryElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(-800px, 0)');
    });

    it('shows scrim when cover is dragged past peek position', async () => {
      await slowDrag(el, 0, 200);
      await el.updateComplete;

      const scrim = queryElement(el, '.scrim');
      expect(scrim.classList.contains('is-active')).toBe(true);
      expect(parseFloat(scrim.style.opacity)).toBeGreaterThan(0);
    });

    it('marks cover as is-dragging during drag', async () => {
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      await el.updateComplete;

      const cover = el.shadowRoot!.querySelector('.cover')!;
      expect(cover.classList.contains('is-dragging')).toBe(true);
    });

    it('removes is-dragging class after release', async () => {
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();
      await el.updateComplete;

      const cover = el.shadowRoot!.querySelector('.cover')!;
      expect(cover.classList.contains('is-dragging')).toBe(false);
    });

    it('right side: drag moves cover proportionally', async () => {
      const rightEl = await createElement('right');

      // origin=+1000, delta=-200 → clamp(800, 0, 1000) = 800
      await slowDrag(rightEl, 1000, 800);
      await rightEl.updateComplete;

      const cover = queryElement(rightEl, '.cover');
      expect(cover.style.transform).toBe('translate(800px, 0)');
      rightEl.remove();
    });

    it('top side: animates translateY instead of translateX', async () => {
      const topEl = await createElement('top');

      // origin=-800, delta=+200 → clamp(-600, -800, 0) = -600
      await slowDrag(topEl, 100, 100, 0, 200);
      await topEl.updateComplete;

      const cover = queryElement(topEl, '.cover');
      expect(cover.style.transform).toBe('translate(0, -600px)');
      topEl.remove();
    });
  });

  // ── Snap to resting ─────────────────────────────────────────────────────────

  describe('Snap to resting position', () => {
    it('snaps open when released past midpoint', async () => {
      // translate=-400 after drag; |400| < |1000|/2=500 → show()
      await slowDrag(el, 0, 600);
      await el.updateComplete;

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 600, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const cover = queryElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0px, 0)');
    });

    it('snaps to peek when released before midpoint', async () => {
      // translate=-600 after drag; |600| > |1000|/2=500 → hide()
      await slowDrag(el, 0, 400);
      await el.updateComplete;

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 400, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const cover = queryElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(-1000px, 0)');
    });

    it('opens scrim after snapping open', async () => {
      await slowDrag(el, 0, 600);
      await el.updateComplete;

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 600, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const scrim = queryElement(el, '.scrim');
      expect(scrim.classList.contains('is-active')).toBe(true);
    });
  });

  // ── Flick ───────────────────────────────────────────────────────────────────

  describe('Flick behavior', () => {
    it('flick outward (right) snaps cover to full viewport width', async () => {
      await simulateFlick(el, 50, 200);
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const cover = queryElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0px, 0)');
    });

    it('flick inward (left) closes cover to peek size', async () => {
      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      await simulateFlick(el, 200, 50);
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const cover = queryElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(-1000px, 0)');
    });

    it('right side: flick leftward opens cover', async () => {
      const rightEl = await createElement('right');

      await simulateFlick(rightEl, 950, 800);
      await vi.advanceTimersByTimeAsync(400);
      await rightEl.updateComplete;

      const cover = queryElement(rightEl, '.cover');
      expect(cover.style.transform).toBe('translate(0px, 0)');
      rightEl.remove();
    });
  });

  // ── Scrim ───────────────────────────────────────────────────────────────────

  describe('Scrim behavior', () => {
    it('scrim becomes visible when cover is open', async () => {
      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const scrim = el.shadowRoot!.querySelector('.scrim')!;
      expect(scrim.classList.contains('is-active')).toBe(true);
    });

    it('clicking scrim closes the cover', async () => {
      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;
      const scrim = queryElement(el, '.scrim');

      scrim.click();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      expect(scrim.classList.contains('is-active')).toBe(false);
    });

    it('clicking scrim does nothing when not open', async () => {
      const scrim = queryElement(el, '.scrim');

      scrim.click();
      await vi.runAllTimersAsync();
      await el.updateComplete;

      expect(scrim.classList.contains('is-active')).toBe(false);
    });
  });

  // ── Peek size ───────────────────────────────────────────────────────────────

  describe('Peek size', () => {
    it('uses peekSize property as initial offset', async () => {
      const peekEl = await createElement('left', { peekSize: 80 } as any);
      const cover = queryElement(peekEl, '.cover');
      // _getCssPeekSize: no inline var → NaN → falls back to peekSize=80
      // _closedTranslate: -(1000 - 80) = -920
      expect(cover.style.transform).toBe('translate(-920px, 0)');
      peekEl.remove();
    });

    it('peek size from CSS variable overrides property', async () => {
      const peekEl = document.createElement('ib-coverpage') as IbCoverpage;
      peekEl.peekSize = 40;
      peekEl.style.setProperty('--cover-peek-size', '60px');
      document.body.appendChild(peekEl);
      await peekEl.updateComplete;
      await Promise.resolve();

      const cover = queryElement(peekEl, '.cover');
      // _getCssPeekSize: inline var '60px' → 60 (overrides property=40)
      // _closedTranslate: -(1000 - 60) = -940
      expect(cover.style.transform).toBe('translate(-940px, 0)');
      peekEl.remove();
    });

    it('snaps to peek size (not 0) when peek is configured', async () => {
      const peekEl = await createElement('left', { peekSize: 80 } as any);
      // initial=-920; drag 300 → -920+300=-620; |620| > |920|/2=460 → hide()
      await slowDrag(peekEl, 0, 300);
      await peekEl.updateComplete;

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 300, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.advanceTimersByTimeAsync(400);
      await peekEl.updateComplete;

      const cover = queryElement(peekEl, '.cover');
      expect(cover.style.transform).toBe('translate(-920px, 0)');
      peekEl.remove();
    });
  });

  // ── Animation ──────────────────────────────────────────────────────────────

  describe('Animation', () => {
    it('animation uses CSS variable --cover-anim-duration', async () => {
      el.style.setProperty('--cover-anim-duration', '500ms');

      el.show();
      await el.updateComplete;
      await vi.advanceTimersByTimeAsync(600);
      await el.updateComplete;

      expect(el.open).toBe(true);
      const cover = queryElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0px, 0)');
    });

    it('progress event emits interpolated t values during animation', async () => {
      const tValues: number[] = [];
      el.addEventListener('coverpage-progress', (e: Event) => {
        tValues.push((e as CustomEvent).detail.t);
      });

      el.show();
      await vi.advanceTimersByTimeAsync(100);
      await el.updateComplete;

      expect(tValues.length).toBeGreaterThan(0);
      expect(tValues.some(t => t > 0 && t <= 1)).toBe(true);
    });

    it('progress event includes travel and side fields', async () => {
      const events: any[] = [];
      el.addEventListener('coverpage-progress', (e: Event) => {
        events.push((e as CustomEvent).detail);
      });

      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const travelValues = events.map(e => e.travel);
      const sideValues = events.map(e => e.side);
      expect(travelValues.every(t => typeof t === 'number' && t > 0)).toBe(true);
      expect(sideValues.every(s => s === 'left')).toBe(true);
    });

    it('progress event emits t=1 when animation finishes', async () => {
      const tValues: number[] = [];
      el.addEventListener('coverpage-progress', (e: Event) => {
        tValues.push((e as CustomEvent).detail.t);
      });

      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      expect(tValues).toContain(1);
    });

    it('changing side after mount flips animation axis from width to height', async () => {
      el.setAttribute('side', 'top');
      await el.updateComplete;

      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const cover = queryElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0, 0px)');
    });

    it('non-primary pointer events are ignored by the gesture controller', async () => {
      const gestureEvents: string[] = [];
      (el as any)._gestureController.gesture$.subscribe((e: any) => {
        gestureEvents.push(e.type);
      });

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, clientY: 100, isPrimary: false, bubbles: true }));

      expect(gestureEvents).toHaveLength(0);
    });
  });

  // ── Pointer interactions ────────────────────────────────────────────────────

  describe('Pointer drag', () => {
    it('handles pointerdown triggers gesture start', async () => {
      const gestureEvents: string[] = [];
      (el as any)._gestureController.gesture$.subscribe((e: any) => {
        gestureEvents.push(e.type);
      });

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, clientY: 100, isPrimary: true, bubbles: true }));

      expect(gestureEvents).toContain('start');
    });

    it('updates cover via pointermove', async () => {
      // pointerdown, advance 1000ms (slow), pointermove, flush rAF
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.advanceTimersByTimeAsync(1000);
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 200, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();
      await el.updateComplete;

      const cover = queryElement(el, '.cover');
      // origin=-1000, delta=+200 → -800
      expect(cover.style.transform).toBe('translate(-800px, 0)');
    });
  });

  // ── Events ──────────────────────────────────────────────────────────────────

  describe('Events', () => {
    it('emits progress when cover opens/closes', async () => {
      const events: any[] = [];
      const newEl = document.createElement('ib-coverpage') as IbCoverpage;
      newEl.setAttribute('side', 'left');
      document.body.appendChild(newEl);
      await newEl.updateComplete;
      await Promise.resolve();

      newEl.addEventListener('coverpage-progress', (e: Event) => {
        events.push((e as CustomEvent).detail);
      });

      newEl.show();
      await vi.advanceTimersByTimeAsync(400);
      await newEl.updateComplete;

      expect(events.length).toBeGreaterThan(0);
      expect(events.some(e => e.t === 1)).toBe(true);
      expect(events.every(e => typeof e.travel === 'number' && e.travel > 0)).toBe(true);
      expect(events.every(e => e.side === 'left')).toBe(true);

      newEl.hide();
      await vi.advanceTimersByTimeAsync(400);
      await newEl.updateComplete;

      expect(events.some(e => e.t === 0)).toBe(true);

      newEl.remove();
    });

    it('emits shutdown event on disconnect', async () => {
      const events: string[] = [];
      el.addEventListener('coverpage-shutdown', (e: Event) => {
        events.push((e as CustomEvent).detail.elementId);
      });

      el.remove();
      await Promise.resolve();

      expect(events).toContain(el.id ?? '');
    });

    it('emits startup event on first render', async () => {
      const events: string[] = [];
      const newEl = document.createElement('ib-coverpage') as IbCoverpage;
      newEl.setAttribute('side', 'left');
      newEl.id = 'test-cover';

      newEl.addEventListener('coverpage-startup', (e: Event) => {
        events.push((e as CustomEvent).detail.elementId);
      });

      document.body.appendChild(newEl);
      await newEl.updateComplete;
      await Promise.resolve();
      newEl.remove();

      expect(events).toContain('test-cover');
    });
  });

  describe('Lifecycle', () => {
    it('does not throw when disconnected during active gesture', async () => {
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      expect(() => el.remove()).not.toThrow();
    });
  });
});
