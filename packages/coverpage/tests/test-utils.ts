import { vi } from 'vitest';
import type { GestureEvent, GestureEventType } from '../src/types/gesture.js';

// ---------------------------------------------------------------------------
// ResizeObserver mock — jsdom doesn't implement it
// ---------------------------------------------------------------------------

export interface ResizeObserverMockInstance {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  trigger: (entries: { contentRect: { width: number; height: number } }[]) => void;
  reset: () => void;
}

export function createResizeObserverMock(): ResizeObserverMockInstance {
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();
  let callback: ((entries: { contentRect: { width: number; height: number } }[]) => void) | null = null;

  class ResizeObserverMock {
    constructor(cb: (entries: { contentRect: { width: number; height: number } }[]) => void) {
      callback = cb;
    }
    observe = observe;
    unobserve = unobserve;
    disconnect = disconnect;
  }

  const trigger = (entries: { contentRect: { width: number; height: number } }[]) => {
    if (callback) {
      callback(entries);
    }
  };

  const reset = () => {
    observe.mockReset();
    unobserve.mockReset();
    disconnect.mockReset();
    callback = null;
  };

  (globalThis as unknown as Record<string, unknown>).ResizeObserver = ResizeObserverMock;

  return { observe, unobserve, disconnect, trigger, reset };
}

// ---------------------------------------------------------------------------
// Pointer event helpers
// ---------------------------------------------------------------------------

export function pointerDown(clientX = 0, clientY = 100, isPrimary = true): PointerEvent {
  return new PointerEvent('pointerdown', {
    clientX, clientY, isPrimary, bubbles: true,
  });
}

export function pointerMove(clientX = 0, clientY = 100, isPrimary = true): PointerEvent {
  return new PointerEvent('pointermove', {
    clientX, clientY, isPrimary, bubbles: true,
  });
}

export function pointerUp(clientX = 0, clientY = 100, isPrimary = true): PointerEvent {
  return new PointerEvent('pointerup', {
    clientX, clientY, isPrimary, bubbles: true,
  });
}

// ---------------------------------------------------------------------------
// Gesture event type guard
// ---------------------------------------------------------------------------

export function isGestureEvent(obj: unknown): obj is GestureEvent {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'type' in obj &&
    'position' in obj &&
    'velocity' in obj &&
    'timestamp' in obj
  );
}

export function filterGestureByType(
  calls: unknown[][],
  type: GestureEventType,
): GestureEvent | undefined {
  const match = calls.find((call) => {
    const event = call[0];
    return isGestureEvent(event) && event.type === type;
  });
  return match ? match[0] : undefined;
}

// ---------------------------------------------------------------------------
// Fake timer setup / teardown
// ---------------------------------------------------------------------------

export function setupFakeTimers(): () => void {
  vi.useFakeTimers();
  vi.spyOn(performance, 'now').mockReturnValue(0);
  return () => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  };
}
