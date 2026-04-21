import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GestureController } from './gesture-controller.js';
import type { CoverConfig } from '../types/definitions.js';
import type { GestureEvent } from '../types/gesture.js';

// @vitest-environment jsdom
describe('GestureController', () => {
  let config: CoverConfig;
  let element: HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers();
    // vi.useFakeTimers() does not mock performance.now by default in vitest;
    // pin it to 0 so consecutive synchronous events have dt=0 → velocity=0,
    // preventing accidental flick detection in tests that don't need time control.
    vi.spyOn(performance, 'now').mockReturnValue(0);
    config = {
      side: 'right',
      range: 300,
      movementThreshold: 10,
      speedThreshold: 5
    };
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    document.body.removeChild(element);
  });

  describe('Basic Interactions', () => {
    it('should emit start gesture on pointerdown', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'start',
        position: { x: 100, y: 100 },
        velocity: { x: 0, y: 0 }
      }));
    });

    it('should emit move gesture on pointermove', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 150, clientY: 150, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'move',
        position: { x: 150, y: 150 }
      }));
    });

    it('should emit end gesture on pointerup', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 105, clientY: 105, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'end',
        position: { x: 105, y: 105 }
      }));
    });
  });

  describe('Disconnect', () => {
    it('should be safe to call disconnect without connect', () => {
      const controller = new GestureController(config);
      expect(() => controller.disconnect()).not.toThrow();
    });
  });

  describe('Gesture Stream', () => {
    it('should emit start, move, and end events in sequence', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      const startX = 100;
      const startY = 100;
      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: startX, clientY: startY, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'start',
        position: expect.objectContaining({ x: startX, y: startY }),
        velocity: expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }),
        timestamp: expect.any(Number)
      }));

      const moveX = 150;
      const moveY = 150;
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: moveX, clientY: moveY, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'move',
        position: { x: moveX, y: moveY },
        timestamp: expect.any(Number)
      }));

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: moveX, clientY: moveY, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'end',
        position: { x: moveX, y: moveY },
        timestamp: expect.any(Number)
      }));
    });

    it('should emit start gesture on duplicate pointerdown', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));

      await vi.runAllTimersAsync();

      const startEvents = gestureSpy.mock.calls.map(call => call[0]);
      const startCounts = startEvents.filter(e => e.type === 'start').length;
      expect(startCounts).toBe(1);
    });
  });

  describe('Optimization and Edge Cases', () => {
    it('should not emit duplicate positions', async () => {
      const controller = new GestureController(config);
      controller.connect(element);
      const positionSpy = vi.fn();
      controller.position$.subscribe(positionSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 150, clientY: 150, isPrimary: true, bubbles: true }));
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 150, clientY: 150, isPrimary: true, bubbles: true })); // duplicate

      await vi.runAllTimersAsync();

      expect(positionSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle switchMap by cancelling previous sequence on new start', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      expect(gestureSpy).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'start' }));

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 200, clientY: 200, isPrimary: true, bubbles: true }));
      expect(gestureSpy).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'start' }));

      window.dispatchEvent(new PointerEvent('pointerup', { clientX: 205, clientY: 205, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      const endEvents = gestureSpy.mock.calls.map(call => call[0]);
      const endCounts = endEvents.filter(e => e.type === 'end').length;
      expect(endCounts).toBe(1);
    });

    it('should ignore non-primary pointer events', async () => {
      const controller = new GestureController(config);
      controller.connect(element);
      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: false, bubbles: true }));
      await vi.runAllTimersAsync();

      expect(gestureSpy).not.toHaveBeenCalled();
    });
  });

  describe('Advanced Logic', () => {
    it('should ignore microdrags below threshold', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const positionSpy = vi.fn();
      const gestureSpy = vi.fn();
      controller.position$.subscribe(positionSpy);
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 105, clientY: 105, isPrimary: true, bubbles: true })); // distance ~7.07 < 10

      await vi.runAllTimersAsync();

      expect(positionSpy).not.toHaveBeenCalled();
      expect(gestureSpy).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'move' }));
    });

    it('should emit move events once threshold is exceeded', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const positionSpy = vi.fn();
      const gestureSpy = vi.fn();
      controller.position$.subscribe(positionSpy);
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      await vi.runAllTimersAsync();

      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 120, isPrimary: true, bubbles: true })); // distance ~28.28 > 10
      await vi.runAllTimersAsync();

      expect(positionSpy).toHaveBeenCalledWith({ x: 120, y: 120 });
      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'move' }));
    });

    it('should calculate correct velocity vector', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      // Control performance.now directly: t=0 at pointerdown, t=100 at pointermove
      // dx=100, dy=200, dt=100ms → vx=1, vy=2 (below speedThreshold=5 so it's a move, not flick)
      let perfTime = 0;
      vi.spyOn(performance, 'now').mockImplementation(() => perfTime);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      perfTime = 100;
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 200, clientY: 300, isPrimary: true, bubbles: true }));

      await vi.runAllTimersAsync();

      const moveEvent = gestureSpy.mock.calls.find(call => call[0].type === 'move')[0];
      expect(moveEvent.velocity.x).toBeCloseTo(1, 0);
      expect(moveEvent.velocity.y).toBeCloseTo(2, 0);
    });

    it('should respect animation frame throttling', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const positionSpy = vi.fn();
      controller.position$.subscribe(positionSpy);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));

      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 120, isPrimary: true, bubbles: true }));
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 130, clientY: 130, isPrimary: true, bubbles: true }));
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 140, clientY: 140, isPrimary: true, bubbles: true }));
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 150, clientY: 150, isPrimary: true, bubbles: true }));

      await vi.runAllTimersAsync();

      expect(positionSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit flick gesture when velocity exceeds speed threshold', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      let perfTime = 0;
      vi.spyOn(performance, 'now').mockImplementation(() => perfTime);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      perfTime = 50;
      // dx=500, dy=1000, dt=50ms → vx=10, vy=20, |v|^2=500 > speedThreshold^2=25
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 600, clientY: 1100, isPrimary: true, bubbles: true }));

      await vi.runAllTimersAsync();

      const flickEvent = gestureSpy.mock.calls.find(call => call[0].type === 'flick');
      expect(flickEvent).toBeDefined();
      expect(flickEvent![0].velocity.x).toBeCloseTo(10, 0);
      expect(flickEvent![0].velocity.y).toBeCloseTo(20, 0);
    });

    it('should not emit position on flick events', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      const positionSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);
      controller.position$.subscribe(positionSpy);

      let perfTime = 0;
      vi.spyOn(performance, 'now').mockImplementation(() => perfTime);

      element.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, isPrimary: true, bubbles: true }));
      perfTime = 50;
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 600, clientY: 1100, isPrimary: true, bubbles: true }));

      await vi.runAllTimersAsync();

      expect(positionSpy).not.toHaveBeenCalled();
      const flickEvent = gestureSpy.mock.calls.find(call => call[0].type === 'flick');
      expect(flickEvent).toBeDefined();
    });
  });
});
