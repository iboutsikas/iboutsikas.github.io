import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GestureController } from '../../src/controllers/gesture-controller.js';
import type { CoverConfig } from '../../src/types/definitions.js';
import {
  setupFakeTimers,
  pointerDown,
  pointerMove,
  pointerUp,
  filterGestureByType,
  countGesturesByType,
} from '../test-utils.js';

// @vitest-environment jsdom
describe('GestureController', () => {
  let config: CoverConfig;
  let element: HTMLElement;
  let teardownTimers: () => void;

  beforeEach(() => {
    teardownTimers = setupFakeTimers();
    config = {
      side: 'right',
      movementThreshold: 10,
      speedThreshold: 5
    };
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    teardownTimers();
    document.body.removeChild(element);
  });

  describe('Basic Interactions', () => {
    it('should emit start gesture on pointerdown', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(pointerDown(100, 100));
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

      element.dispatchEvent(pointerDown(100, 100));
      await vi.runAllTimersAsync();

      window.dispatchEvent(pointerMove(150, 150));
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

      element.dispatchEvent(pointerDown(100, 100));
      await vi.runAllTimersAsync();

      window.dispatchEvent(pointerUp(105, 105));
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

      element.dispatchEvent(pointerDown(100, 100));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'start',
        position: expect.objectContaining({ x: 100, y: 100 }),
        velocity: expect.objectContaining({ x: expect.any(Number), y: expect.any(Number) }),
        timestamp: expect.any(Number)
      }));

      window.dispatchEvent(pointerMove(150, 150));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'move',
        position: { x: 150, y: 150 },
        timestamp: expect.any(Number)
      }));

      window.dispatchEvent(pointerUp(150, 150));
      await vi.runAllTimersAsync();

      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: 'end',
        position: { x: 150, y: 150 },
        timestamp: expect.any(Number)
      }));
    });

    it('should emit start gesture on duplicate pointerdown', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(pointerDown(100, 100));
      element.dispatchEvent(pointerDown(100, 100));

      await vi.runAllTimersAsync();

      expect(countGesturesByType(gestureSpy.mock.calls, 'start')).toBe(1);
    });
  });

  describe('Optimization and Edge Cases', () => {
    it('should not emit duplicate positions', async () => {
      const controller = new GestureController(config);
      controller.connect(element);
      const positionSpy = vi.fn();
      controller.position$.subscribe(positionSpy);

      element.dispatchEvent(pointerDown(100, 100));
      window.dispatchEvent(pointerMove(150, 150));
      window.dispatchEvent(pointerMove(150, 150)); // duplicate

      await vi.runAllTimersAsync();

      expect(positionSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle switchMap by cancelling previous sequence on new start', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(pointerDown(100, 100));
      expect(gestureSpy).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'start' }));

      element.dispatchEvent(pointerDown(200, 200));
      expect(gestureSpy).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'start' }));

      window.dispatchEvent(pointerUp(205, 205));
      await vi.runAllTimersAsync();

      expect(countGesturesByType(gestureSpy.mock.calls, 'end')).toBe(1);
    });

    it('should ignore non-primary pointer events', async () => {
      const controller = new GestureController(config);
      controller.connect(element);
      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      element.dispatchEvent(pointerDown(100, 100, false));
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

      element.dispatchEvent(pointerDown(100, 100));
      window.dispatchEvent(pointerMove(105, 105)); // distance ~7.07 < 10

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

      element.dispatchEvent(pointerDown(100, 100));
      await vi.runAllTimersAsync();

      window.dispatchEvent(pointerMove(120, 120)); // distance ~28.28 > 10
      await vi.runAllTimersAsync();

      expect(positionSpy).toHaveBeenCalledWith({ x: 120, y: 120 });
      expect(gestureSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'move' }));
    });

    it('should calculate correct velocity vector', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const gestureSpy = vi.fn();
      controller.gesture$.subscribe(gestureSpy);

      // dx=100, dy=200, dt=100ms → vx=1, vy=2 (below speedThreshold=5 so it's a move, not flick)
      let perfTime = 0;
      vi.spyOn(performance, 'now').mockImplementation(() => perfTime);

      element.dispatchEvent(pointerDown(100, 100));
      perfTime = 100;
      window.dispatchEvent(pointerMove(200, 300));

      await vi.runAllTimersAsync();

      const moveEvent = filterGestureByType(gestureSpy.mock.calls, 'move');
      expect(moveEvent).toBeDefined();
      expect(moveEvent!.velocity.x).toBeCloseTo(1, 0);
      expect(moveEvent!.velocity.y).toBeCloseTo(2, 0);
    });

    it('should respect animation frame throttling', async () => {
      const controller = new GestureController(config);
      controller.connect(element);

      const positionSpy = vi.fn();
      controller.position$.subscribe(positionSpy);

      element.dispatchEvent(pointerDown(100, 100));

      window.dispatchEvent(pointerMove(120, 120));
      window.dispatchEvent(pointerMove(130, 130));
      window.dispatchEvent(pointerMove(140, 140));
      window.dispatchEvent(pointerMove(150, 150));

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

      element.dispatchEvent(pointerDown(100, 100));
      perfTime = 50;
      // dx=500, dy=1000, dt=50ms → vx=10, vy=20, |v|^2=500 > speedThreshold^2=25
      window.dispatchEvent(pointerMove(600, 1100));

      await vi.runAllTimersAsync();

      const flickEvent = filterGestureByType(gestureSpy.mock.calls, 'flick');
      expect(flickEvent).toBeDefined();
      expect(flickEvent!.velocity.x).toBeCloseTo(10, 0);
      expect(flickEvent!.velocity.y).toBeCloseTo(20, 0);
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

      element.dispatchEvent(pointerDown(100, 100));
      perfTime = 50;
      window.dispatchEvent(pointerMove(600, 1100));

      await vi.runAllTimersAsync();

      expect(positionSpy).not.toHaveBeenCalled();
      expect(filterGestureByType(gestureSpy.mock.calls, 'flick')).toBeDefined();
    });
  });
});
