import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import '../src/coverpage.js';
import type { IbCoverpage } from '../src/coverpage.js';
import type { CoverpageProgress } from '../src/types/events.js';
import {
  createResizeObserverMock,
  setViewport,
  setupCoverpageJsdomMocks,
  createElement,
  queryShadowElement,
  slowDrag,
  simulateFlick,
  type ResizeObserverMockInstance,
} from './test-utils.js';

const resizeObserver: ResizeObserverMockInstance = createResizeObserverMock();

describe('IbCoverpage', () => {
  let el: IbCoverpage;
  let teardownMocks: () => void;

  beforeAll(() => {
    teardownMocks = setupCoverpageJsdomMocks();
  });

  afterAll(() => {
    teardownMocks();
  });

  beforeEach(async () => {
    vi.useFakeTimers({ now: 0 });
    setViewport(1000, 800);
    el = await createElement(resizeObserver);
  });

  afterEach(() => {
    el.remove();
    vi.restoreAllMocks();
    vi.useRealTimers();
    resizeObserver.reset();
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
      const scrim = queryShadowElement(el, '.scrim');
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

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(-800px, 0)');
    });

    it('shows scrim when cover is dragged past peek position', async () => {
      await slowDrag(el, 0, 200);
      await el.updateComplete;

      const scrim = queryShadowElement(el, '.scrim');
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
      const rightEl = await createElement(resizeObserver, 'right');

      // origin=+1000, delta=-200 → clamp(800, 0, 1000) = 800
      await slowDrag(rightEl, 1000, 800);
      await rightEl.updateComplete;

      const cover = queryShadowElement(rightEl, '.cover');
      expect(cover.style.transform).toBe('translate(800px, 0)');
      rightEl.remove();
    });

    it('top side: animates translateY instead of translateX', async () => {
      const topEl = await createElement(resizeObserver, 'top');

      // origin=-800, delta=+200 → clamp(-600, -800, 0) = -600
      await slowDrag(topEl, 100, 100, 0, 200);
      await topEl.updateComplete;

      const cover = queryShadowElement(topEl, '.cover');
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

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0px, 0)');
    });

    it('snaps to peek when released before midpoint', async () => {
      // translate=-600 after drag; |600| > |1000|/2=500 → hide()
      await slowDrag(el, 0, 400);
      await el.updateComplete;

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 400, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(-1000px, 0)');
    });

    it('opens scrim after snapping open', async () => {
      await slowDrag(el, 0, 600);
      await el.updateComplete;

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 600, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const scrim = queryShadowElement(el, '.scrim');
      expect(scrim.classList.contains('is-active')).toBe(true);
    });
  });

  // ── Flick ───────────────────────────────────────────────────────────────────

  describe('Flick behavior', () => {
    it('flick outward (right) snaps cover to full viewport width', async () => {
      await simulateFlick(el, 50, 200);
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0px, 0)');
    });

    it('flick inward (left) closes cover to peek size', async () => {
      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      await simulateFlick(el, 200, 50);
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(-1000px, 0)');
    });

    it('right side: flick leftward opens cover', async () => {
      const rightEl = await createElement(resizeObserver, 'right');

      await simulateFlick(rightEl, 950, 800);
      await vi.advanceTimersByTimeAsync(400);
      await rightEl.updateComplete;

      const cover = queryShadowElement(rightEl, '.cover');
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
      const scrim = queryShadowElement(el, '.scrim');

      scrim.click();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      expect(scrim.classList.contains('is-active')).toBe(false);
    });

    it('clicking scrim does nothing when not open', async () => {
      const scrim = queryShadowElement(el, '.scrim');

      scrim.click();
      await vi.runAllTimersAsync();
      await el.updateComplete;

      expect(scrim.classList.contains('is-active')).toBe(false);
    });
  });

  // ── Peek size ───────────────────────────────────────────────────────────────

  describe('Peek size', () => {
    it('uses peekSize property as initial offset', async () => {
      const peekEl = await createElement(resizeObserver, 'left', { peekSize: 80 });
      const cover = queryShadowElement(peekEl, '.cover');
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

      const cover = queryShadowElement(peekEl, '.cover');
      // _getCssPeekSize: inline var '60px' → 60 (overrides property=40)
      // _closedTranslate: -(1000 - 60) = -940
      expect(cover.style.transform).toBe('translate(-940px, 0)');
      peekEl.remove();
    });

    it('snaps to peek size (not 0) when peek is configured', async () => {
      const peekEl = await createElement(resizeObserver, 'left', { peekSize: 80 });
      // initial=-920; drag 300 → -920+300=-620; |620| > |920|/2=460 → hide()
      await slowDrag(peekEl, 0, 300);
      await peekEl.updateComplete;

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 300, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.advanceTimersByTimeAsync(400);
      await peekEl.updateComplete;

      const cover = queryShadowElement(peekEl, '.cover');
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
      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0px, 0)');
    });

    it('progress event emits interpolated t values during animation', async () => {
      const tValues: number[] = [];
      el.addEventListener('coverpage-progress', (e: Event) => {
        tValues.push((e as CustomEvent<CoverpageProgress>).detail.t);
      });

      el.show();
      await vi.advanceTimersByTimeAsync(100);
      await el.updateComplete;

      expect(tValues.length).toBeGreaterThan(0);
      expect(tValues.some(t => t > 0 && t <= 1)).toBe(true);
    });

    it('progress event includes travel and side fields', async () => {
      const events: CoverpageProgress[] = [];
      el.addEventListener('coverpage-progress', (e: Event) => {
        events.push((e as CustomEvent<CoverpageProgress>).detail);
      });

      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      expect(events.every(e => typeof e.travel === 'number' && e.travel > 0)).toBe(true);
      expect(events.every(e => e.side === 'left')).toBe(true);
    });

    it('progress event emits t=1 when animation finishes', async () => {
      const tValues: number[] = [];
      el.addEventListener('coverpage-progress', (e: Event) => {
        tValues.push((e as CustomEvent<CoverpageProgress>).detail.t);
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

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0, 0px)');
    });

    it('non-primary pointer events are ignored by the gesture controller', () => {
      const gestureEvents: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (el as any)._gestureController.gesture$.subscribe((e: { type: string }) => {
        gestureEvents.push(e.type);
      });

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, clientY: 100, isPrimary: false, bubbles: true }));

      expect(gestureEvents).toHaveLength(0);
    });
  });

  // ── Pointer interactions ────────────────────────────────────────────────────

  describe('Pointer drag', () => {
    it('handles pointerdown triggers gesture start', () => {
      const gestureEvents: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (el as any)._gestureController.gesture$.subscribe((e: { type: string }) => {
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

      const cover = queryShadowElement(el, '.cover');
      // origin=-1000, delta=+200 → -800
      expect(cover.style.transform).toBe('translate(-800px, 0)');
    });
  });

  // ── Events ──────────────────────────────────────────────────────────────────

  describe('Events', () => {
    it('emits progress when cover opens/closes', async () => {
      const events: CoverpageProgress[] = [];
      const newEl = document.createElement('ib-coverpage') as IbCoverpage;
      newEl.setAttribute('side', 'left');
      document.body.appendChild(newEl);
      await newEl.updateComplete;
      await Promise.resolve();

      newEl.addEventListener('coverpage-progress', (e: Event) => {
        events.push((e as CustomEvent<CoverpageProgress>).detail);
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
        events.push((e as CustomEvent<{ elementId: string }>).detail.elementId);
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
        events.push((e as CustomEvent<{ elementId: string }>).detail.elementId);
      });

      document.body.appendChild(newEl);
      await newEl.updateComplete;
      await Promise.resolve();
      newEl.remove();

      expect(events).toContain('test-cover');
    });
  });

  describe('Lifecycle', () => {
    it('does not throw when disconnected during active gesture', () => {
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      expect(() => el.remove()).not.toThrow();
    });
  });

  // ── Window resize ────────────────────────────────────────────────────────────

  describe('Window resize handling', () => {
    it('snaps closed panel to new closed position when viewport narrows', async () => {
      resizeObserver.trigger([{ contentRect: { width: 500, height: 800 } }]);
      await vi.runAllTimersAsync();
      await el.updateComplete;

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(-500px, 0)');
    });

    it('snaps closed panel to new closed position when viewport widens', async () => {
      resizeObserver.trigger([{ contentRect: { width: 500, height: 800 } }]);
      await vi.runAllTimersAsync();
      await el.updateComplete;

      resizeObserver.trigger([{ contentRect: { width: 1200, height: 800 } }]);
      await vi.runAllTimersAsync();
      await el.updateComplete;

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(-1200px, 0)');
    });

    it('does not change translate when open panel resizes', async () => {
      el.show();
      await vi.advanceTimersByTimeAsync(400);
      await el.updateComplete;

      resizeObserver.trigger([{ contentRect: { width: 500, height: 800 } }]);
      await vi.runAllTimersAsync();
      await el.updateComplete;

      const cover = queryShadowElement(el, '.cover');
      expect(cover.style.transform).toBe('translate(0px, 0)');
    });

    it('snaps closed vertical panel to new height on resize', async () => {
      const topEl = await createElement(resizeObserver, 'top');

      resizeObserver.trigger([{ contentRect: { width: 1000, height: 600 } }]);
      await vi.runAllTimersAsync();
      await topEl.updateComplete;

      const cover = queryShadowElement(topEl, '.cover');
      expect(cover.style.transform).toBe('translate(0, -600px)');
      topEl.remove();
    });
  });
});
