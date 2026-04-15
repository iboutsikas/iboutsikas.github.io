import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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

function makeAnimateMock() {
  return vi.fn().mockReturnValue({ finished: Promise.resolve(), cancel: vi.fn() });
}

function setViewport(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true, configurable: true });
}

async function createElement(side = 'left', extra?: Partial<IbCoverpage>): Promise<IbCoverpage> {
  const el = document.createElement('ib-coverpage') as IbCoverpage;
  el.setAttribute('side', side);
  if (extra) Object.assign(el, extra);
  document.body.appendChild(el);
  await el.updateComplete;
  await Promise.resolve(); // flush connectedCallback's updateComplete.then()

  if (lastResizeObserver) {
    lastResizeObserver.trigger([{ contentRect: { width: 1000, height: 800 } }]);
    await new Promise(r => setTimeout(r, 0));
  }

  return el;
}

/**
 * Simulate slow drag: pointerdown then pointermove with large dt so velocity stays
 * below the default speedThreshold of 1 px/ms and no flick is triggered.
 * Uses a performance.now spy: t=0 at pointerdown, t=1000 at pointermove (1000ms elapsed).
 * Maximum safe displacement = 999 px (v = 999/1000 = 0.999 < 1).
 */
async function slowDrag(el: HTMLElement, fromX: number, toX: number, fromY = 100, toY = 100) {
  let t = 0;
  const spy = vi.spyOn(performance, 'now').mockImplementation(() => t);
  el.dispatchEvent(new PointerEvent('pointerdown', { clientX: fromX, clientY: fromY, isPrimary: true, bubbles: true }));
  t = 1000;
  window.dispatchEvent(new PointerEvent('pointermove', { clientX: toX, clientY: toY, isPrimary: true, bubbles: true }));
  await new Promise(r => requestAnimationFrame(r));
  spy.mockRestore();
}

/** Simulate flick by controlling performance.now so velocity is high */
async function simulateFlick(el: HTMLElement, fromX: number, toX: number, fromY = 100, toY = 100) {
  let t = 0;
  const spy = vi.spyOn(performance, 'now').mockImplementation(() => t);
  el.dispatchEvent(new PointerEvent('pointerdown', { clientX: fromX, clientY: fromY, isPrimary: true, bubbles: true }));
  t = 5; // 5ms later → large displacement / tiny dt = high velocity
  window.dispatchEvent(new PointerEvent('pointerup', { clientX: toX, clientY: toY, isPrimary: true, bubbles: true }));
  spy.mockRestore();
}

// --- suite ---

describe('IbCoverpage', () => {
  let el: IbCoverpage;

  beforeEach(async () => {
    HTMLElement.prototype.animate = makeAnimateMock();
    setViewport(1000, 800);
    el = await createElement();
  });

  afterEach(() => {
    el.remove();
    vi.restoreAllMocks();
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
      const scrim = el.shadowRoot!.querySelector('.scrim')!;
      expect(scrim.classList.contains('visible')).toBe(false);
    });
  });

  // ── Drag (position updates) ─────────────────────────────────────────────────

  describe('Drag interactions', () => {
    it('animates cover width when dragging (left side)', async () => {
      const animateSpy = HTMLElement.prototype.animate as ReturnType<typeof vi.fn>;
      animateSpy.mockClear();

      await slowDrag(el, 0, 200);
      await el.updateComplete;

      expect(animateSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ width: '200px' })]),
        expect.objectContaining({ fill: 'forwards' })
      );
    });

    it('shows scrim when cover is dragged past peek position', async () => {
      await slowDrag(el, 0, 200);
      await el.updateComplete;

      const scrim = el.shadowRoot!.querySelector('.scrim')!;
      expect(scrim.classList.contains('visible')).toBe(true);
    });

    it('marks cover as is-interacting during drag', async () => {
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      await el.updateComplete;

      const cover = el.shadowRoot!.querySelector('.cover')!;
      expect(cover.classList.contains('is-interacting')).toBe(true);
    });

    it('removes is-interacting class after release', async () => {
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      await new Promise(r => setTimeout(r, 10));
      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      await new Promise(r => setTimeout(r, 10));
      await el.updateComplete;

      const cover = el.shadowRoot!.querySelector('.cover')!;
      expect(cover.classList.contains('is-interacting')).toBe(false);
    });

    it('clamps offset to range property', async () => {
      el.range = 300;

      await slowDrag(el, 0, 500);
      await el.updateComplete;

      expect((el as any)._currentOffset).toBe(300);
    });

    it('right side: offset = viewport - drag position', async () => {
      const animateSpy = HTMLElement.prototype.animate as ReturnType<typeof vi.fn>;
      const rightEl = await createElement('right');
      animateSpy.mockClear();

      // Start at x=1000 (right edge), drag to x=800 → offset = 1000 - 800 = 200
      await slowDrag(rightEl, 1000, 800);
      await rightEl.updateComplete;

      expect(animateSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ width: '200px' })]),
        expect.any(Object)
      );
      rightEl.remove();
    });

    it('top side: animates height instead of width', async () => {
      const animateSpy = HTMLElement.prototype.animate as ReturnType<typeof vi.fn>;
      const topEl = await createElement('top');
      animateSpy.mockClear();

      await slowDrag(topEl, 100, 100, 0, 200);
      await topEl.updateComplete;

      expect(animateSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ height: '200px' })]),
        expect.any(Object)
      );
      topEl.remove();
    });
  });

  // ── Snap to resting ─────────────────────────────────────────────────────────

  describe('Snap to resting position', () => {
    it('snaps open when released past midpoint', async () => {
      // midpoint = (innerWidth + peekSize) / 2 = (1000 + 0) / 2 = 500
      (el as any)._currentOffset = 600;
      (el as any)._snapToResting();
      await el.updateComplete;

      expect((el as any)._currentOffset).toBe(1000);
    });

    it('snaps to peek when released before midpoint', async () => {
      (el as any)._currentOffset = 400;
      (el as any)._snapToResting();
      await el.updateComplete;

      expect((el as any)._currentOffset).toBe(0); // peekSize = 0
    });

    it('snaps open via gesture lifecycle (slow release past midpoint)', async () => {
      // midpoint = (1000 + 0) / 2 = 500; drag to 600 then release slowly
      let t = 0;
      const dateSpy = vi.spyOn(performance, 'now').mockImplementation(() => t);

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      t = 1000; // dt=1000ms, dx=600 → v=0.6 < 1 → no flick
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 600, clientY: 100, isPrimary: true, bubbles: true }));
      await new Promise(r => requestAnimationFrame(r));

      // dt=9000ms, dx=0 → v=0 → idle → snap open (600 ≥ 500)
      t = 10000;
      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 600, clientY: 100, isPrimary: true, bubbles: true }));
      await new Promise(r => setTimeout(r, 10));
      await el.updateComplete;

      dateSpy.mockRestore();
      expect((el as any)._currentOffset).toBe(1000);
    });

    it('snaps closed via gesture lifecycle (slow release before midpoint)', async () => {
      // midpoint = 500; drag to 400 then release slowly
      let t = 0;
      const dateSpy = vi.spyOn(performance, 'now').mockImplementation(() => t);

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      t = 1000; // dt=1000ms, dx=400 → v=0.4 < 1 → no flick
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 400, clientY: 100, isPrimary: true, bubbles: true }));
      await new Promise(r => requestAnimationFrame(r));

      // dt=9000ms, dx=0 → v=0 → idle → snap closed (400 < 500)
      t = 10000;
      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 400, clientY: 100, isPrimary: true, bubbles: true }));
      await new Promise(r => setTimeout(r, 10));
      await el.updateComplete;

      dateSpy.mockRestore();
      expect((el as any)._currentOffset).toBe(0);
    });

    it('opens scrim after snapping open', async () => {
      (el as any)._currentOffset = 600;
      (el as any)._snapToResting();
      await el.updateComplete;

      expect(el.scrimOpen).toBe(true);
    });
  });

  // ── Flick ───────────────────────────────────────────────────────────────────

  describe('Flick behavior', () => {
    it('flick outward (right) snaps cover to full viewport width', async () => {
      // For left side: positive x velocity = flick outward = open
      await simulateFlick(el, 50, 200); // dx=150, dt=5ms → vx=30 >> speedThreshold=1
      await new Promise(r => setTimeout(r, 10));
      await el.updateComplete;

      expect((el as any)._currentOffset).toBe(1000); // innerWidth
    });

    it('flick inward (left) closes cover to peek size', async () => {
      (el as any)._currentOffset = 800;
      (el as any)._isSliding = false;

      await simulateFlick(el, 200, 50); // dx=-150, dt=5ms → vx=-30 = inward
      await new Promise(r => setTimeout(r, 10));
      await el.updateComplete;

      expect((el as any)._currentOffset).toBe(0); // peekSize = 0
    });

    it('right side: flick leftward opens cover', async () => {
      const rightEl = await createElement('right');

      await simulateFlick(rightEl, 950, 800); // drag from near-right edge leftward
      await new Promise(r => setTimeout(r, 10));
      await rightEl.updateComplete;

      // For right: invert=true, sign=-1. vx = (800-950)/5 = -30. vx * sign = 30 > 0 → open
      expect((rightEl as any)._currentOffset).toBe(1000);
      rightEl.remove();
    });

    it('flick does not trigger while already sliding', async () => {
      (el as any)._isSliding = true;

      let t = 0;
      const dateSpy = vi.spyOn(performance, 'now').mockImplementation(() => t);
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, clientY: 100, isPrimary: true, bubbles: true }));
      t = 5;
      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 200, clientY: 100, isPrimary: true, bubbles: true }));
      dateSpy.mockRestore();
      await new Promise(r => setTimeout(r, 10));
      await el.updateComplete;

      // _isSliding was true → flick filter blocks → offset stays at whatever it was
      expect((el as any)._currentOffset).toBe(0);
    });
  });

  // ── Scrim ───────────────────────────────────────────────────────────────────

  describe('Scrim behavior', () => {
    it('scrim becomes visible when cover is open', async () => {
      el.open();
      await el.updateComplete;

      const scrim = el.shadowRoot!.querySelector('.scrim')!;
      expect(scrim.classList.contains('visible')).toBe(true);
    });

    it('clicking scrim closes the cover', async () => {
      el.open();
      await el.updateComplete;

      (el.shadowRoot!.querySelector('.scrim') as HTMLElement).click();
      await el.updateComplete;

      expect(el.scrimOpen).toBe(false);
      expect((el as any)._currentOffset).toBe(0); // peekSize = 0
    });

    it('clicking scrim does nothing when not open', async () => {
      // Cover starts closed by default; verify click is a no-op
      (el.shadowRoot!.querySelector('.scrim') as HTMLElement).click();
      await el.updateComplete;

      expect(el.scrimOpen).toBe(false);
      expect((el as any)._currentOffset).toBe(0);
    });
  });

  // ── Peek size ───────────────────────────────────────────────────────────────

  describe('Peek size', () => {
    it('uses peekSize property as initial offset', async () => {
      const peekEl = await createElement('left', { peekSize: 80 } as any);
      expect((peekEl as any)._currentOffset).toBe(80);
      peekEl.remove();
    });

     it('peek size from CSS variable overrides property', async () => {
       const peekEl = document.createElement('ib-coverpage') as IbCoverpage;
       peekEl.peekSize = 40;
       peekEl.style.setProperty('--cover-peek-size', '60px');
       document.body.appendChild(peekEl);
       await peekEl.updateComplete;
       await Promise.resolve();

       expect((peekEl as any)._resolvedPeekSize).toBe(60);
       peekEl.remove();
     });

    it('updates resolved peek size on host resize', async () => {
      el.style.setProperty('--cover-peek-size', '50px');

      if (lastResizeObserver) {
        lastResizeObserver.trigger([{ contentRect: { width: 1000, height: 800 } }]);
      }

      await Promise.resolve();
      expect((el as any)._resolvedPeekSize).toBe(50);
    });

    it('snaps to peek size (not 0) when peek is configured', async () => {
      const peekEl = await createElement('left', { peekSize: 80 } as any);

      (peekEl as any)._currentOffset = 300; // before midpoint ((1000+80)/2 = 540)
      (peekEl as any)._snapToResting();
      await peekEl.updateComplete;

      expect((peekEl as any)._currentOffset).toBe(80);
      peekEl.remove();
    });
  });

  // ── Animation ──────────────────────────────────────────────────────────────

  describe('Animation', () => {
    it('animationDuration property controls the duration passed to animate()', async () => {
      const animateSpy = HTMLElement.prototype.animate as ReturnType<typeof vi.fn>;
      el.animationDuration = 500;
      animateSpy.mockClear();

      (el as any)._currentOffset = 400;
      await el.updateComplete;

      expect(animateSpy).toHaveBeenCalledWith(
        expect.any(Array),
        expect.objectContaining({ duration: 500 })
      );
    });

    it('cover-progress emits interpolated value at a known point during animation', async () => {
      // startOffset=0, finalOffset=600, duration=300ms, currentTime=150ms → t=0.5 → value=300
      const animObj = {
        finished: new Promise<void>(() => {}), // never resolves — keeps animation 'running'
        cancel: vi.fn(),
        playState: 'running' as AnimationPlayState,
        currentTime: 150 as CSSNumberish
      };
      HTMLElement.prototype.animate = vi.fn().mockReturnValue(animObj);

      const offsets: number[] = [];
      el.addEventListener('cover-progress', (e: Event) => {
        offsets.push((e as CustomEvent).detail.offset);
      });

      // _currentOffset was 0 → animates to 600; startOffset = 0
      (el as any)._currentOffset = 600;
      await el.updateComplete;
      await new Promise(r => requestAnimationFrame(r)); // let _trackAnimation tick once

      expect(offsets).toContain(300);
    });

    it('cover-progress emits final offset once animation finishes', async () => {
      const animObj = {
        finished: Promise.resolve(),
        cancel: vi.fn(),
        playState: 'finished' as AnimationPlayState,
        currentTime: 300 as CSSNumberish
      };
      HTMLElement.prototype.animate = vi.fn().mockReturnValue(animObj);

      const offsets: number[] = [];
      el.addEventListener('cover-progress', (e: Event) => {
        offsets.push((e as CustomEvent).detail.offset);
      });

      (el as any)._currentOffset = 600;
      await el.updateComplete;
      await new Promise(r => requestAnimationFrame(r));

      expect(offsets).toContain(600);
    });

    it('changing side after mount flips animation axis from width to height', async () => {
      const animateSpy = HTMLElement.prototype.animate as ReturnType<typeof vi.fn>;

      // Start as left (animates width), then switch to top (should animate height)
      el.setAttribute('side', 'top');
      await el.updateComplete;
      animateSpy.mockClear();

      (el as any)._currentOffset = 300;
      await el.updateComplete;

      expect(animateSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ height: '300px' })]),
        expect.any(Object)
      );
    });

    it('non-primary pointer events are ignored by the gesture controller', async () => {
      const stateSpy = vi.fn();
      (el as any)._gestureController.state$.subscribe(stateSpy);

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, clientY: 100, isPrimary: false, bubbles: true }));

      expect(stateSpy).not.toHaveBeenCalled();
    });
  });

  // ── Pointer interactions ────────────────────────────────────────────────────

  describe('Pointer drag', () => {
    it('handles pointerdown → dragging state', async () => {
      const stateSpy = vi.fn();
      (el as any)._gestureController.state$.subscribe(stateSpy);

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 50, clientY: 100, isPrimary: true, bubbles: true }));

      expect(stateSpy).toHaveBeenCalledWith('dragging');
    });

    it('updates cover via pointermove', async () => {
      const animateSpy = HTMLElement.prototype.animate as ReturnType<typeof vi.fn>;
      animateSpy.mockClear();

      // Control timestamps so velocity = 200/1000 = 0.2 px/ms < 1 → no flick
      let t = 0;
      const dateSpy = vi.spyOn(performance, 'now').mockImplementation(() => t);

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));

      t = 1000;
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 200, clientY: 100, isPrimary: true, bubbles: true }));
      await new Promise(r => requestAnimationFrame(r));
      await el.updateComplete;

      dateSpy.mockRestore();

      expect(animateSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ width: '200px' })]),
        expect.any(Object)
      );
    });
  });

  // ── Cleanup ─────────────────────────────────────────────────────────────────

  // ── Events ──────────────────────────────────────────────────────────────────

  describe('Events', () => {
    it('emits scrim-change when scrimOpen changes', async () => {
      const callback = vi.fn();
      el.addEventListener('scrim-change', callback);

      el.open();
      await el.updateComplete;

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { visible: true }
        })
      );

      el.close();
      await el.updateComplete;

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { visible: false }
        })
      );
    });

    it('emits peek-mode-change when transitioning between peek and non-peek', async () => {
      const callback = vi.fn();
      el.addEventListener('peek-mode-change', callback);

      (el as any)._resolvedPeekSize = 50;
      (el as any)._currentOffset = 0;
      await el.updateComplete;
      callback.mockClear();

      // 1. Transition to non-peek (offset 100 > 50)
      (el as any)._currentOffset = 100;
      await el.updateComplete;

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { isPeeking: false }
        })
      );
      callback.mockClear();

      // 2. Change offset within non-peek (offset 200 > 50) - should NOT emit
      (el as any)._currentOffset = 200;
      await el.updateComplete;

      expect(callback).not.toHaveBeenCalled();
      callback.mockClear();

      // 3. Transition back to peek (offset 20 < 50)
      (el as any)._currentOffset = 20;
      await el.updateComplete;

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { isPeeking: true }
        })
      );
      callback.mockClear();

      // 4. Change offset within peek (offset 10 < 50) - should NOT emit
      (el as any)._currentOffset = 10;
      await el.updateComplete;

      expect(callback).not.toHaveBeenCalled();
    });

    it('does NOT emit peek-mode-change when scrimOpen changes but offset mode remains same', async () => {
      const callback = vi.fn();
      el.addEventListener('peek-mode-change', callback);

      (el as any)._resolvedPeekSize = 50;
      (el as any)._currentOffset = 100; // non-peeking
      // Toggle _scrimOpen directly so _currentOffset stays fixed at 100
      (el as any)._scrimOpen = true;
      await el.updateComplete;
      callback.mockClear();

      // Change _scrimOpen but keep offset at 100 (still non-peeking) — no peek-mode-change expected
      (el as any)._scrimOpen = false;
      await el.updateComplete;

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Lifecycle', () => {
    it('disconnects ResizeObserver on disconnect', () => {
      const disconnectSpy = vi.spyOn(lastResizeObserver, 'disconnect');
      el.remove();
      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('does not throw when disconnected during active gesture', async () => {
      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, clientY: 100, isPrimary: true, bubbles: true }));
      expect(() => el.remove()).not.toThrow();
    });
  });
});
