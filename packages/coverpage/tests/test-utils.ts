import { vi } from 'vitest';
import type { IbCoverpage } from '../src/coverpage.js';
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
// jsdom dimension + CSS mock setup for IbCoverpage tests
// Returns a teardown function to call in afterAll.
// ---------------------------------------------------------------------------

export function setupCoverpageJsdomMocks(): () => void {
  // jsdom returns 0 for all element dimensions; mock so _closedTranslate() is non-zero.
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    get() { return 1000; },
    configurable: true,
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() { return 800; },
    configurable: true,
  });

  // Mock getComputedStyle to read inline CSS custom properties.
  // A real CSS engine is not available in jsdom, so tests set inline styles directly.
  const savedGetComputedStyle = window.getComputedStyle;
  (window as unknown as Record<string, unknown>).getComputedStyle = (element: Element): CSSStyleDeclaration => {
    const el = element as HTMLElement;
    return {
      getPropertyValue(name: string): string {
        if (name === '--cover-peek-size') return el.style.getPropertyValue('--cover-peek-size') ?? '';
        if (name === '--cover-anim-duration') return el.style.getPropertyValue('--cover-anim-duration') || '300ms';
        return '';
      },
    } as CSSStyleDeclaration;
  };

  return () => {
    (window as unknown as Record<string, unknown>).getComputedStyle = savedGetComputedStyle;
    delete (HTMLElement.prototype as unknown as Record<string, unknown>).offsetWidth;
    delete (HTMLElement.prototype as unknown as Record<string, unknown>).offsetHeight;
  };
}

// ---------------------------------------------------------------------------
// IbCoverpage element helpers
// ---------------------------------------------------------------------------

export function setViewport(width: number, height: number): void {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true, configurable: true });
}

export async function createElement(
  resizeObserver: ResizeObserverMockInstance,
  side = 'left',
  extra?: Partial<IbCoverpage>,
): Promise<IbCoverpage> {
  const el = document.createElement('ib-coverpage') as IbCoverpage;
  el.setAttribute('side', side);
  el.peekSize = 0; // default: no peek so _closedTranslate() = -(viewport size)
  if (extra) Object.assign(el, extra);
  document.body.appendChild(el);
  await el.updateComplete;
  resizeObserver.trigger([{ contentRect: { width: 1000, height: 800 } }]);
  await vi.runAllTimersAsync();
  return el;
}

export function queryShadowElement(root: IbCoverpage, selector: string): HTMLElement {
  const e = root.shadowRoot?.querySelector(selector);
  if (e == null) throw new Error(`"${selector}" not found — ensure the component has finished updating.`);
  return e as HTMLElement;
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
// Drag / flick simulation helpers
// Require fake timers to be active.
// ---------------------------------------------------------------------------

/**
 * Slow drag: 1000ms between down and move → velocity ≪ speedThreshold.
 */
export async function slowDrag(
  el: HTMLElement,
  fromX: number,
  toX: number,
  fromY = 100,
  toY = 100,
): Promise<void> {
  el.dispatchEvent(pointerDown(fromX, fromY));
  await vi.advanceTimersByTimeAsync(1000);
  window.dispatchEvent(pointerMove(toX, toY));
  await vi.runAllTimersAsync();
}

/**
 * Flick: 5ms between down and up → velocity = delta/5 px/ms ≫ speedThreshold.
 */
export async function simulateFlick(
  el: HTMLElement,
  fromX: number,
  toX: number,
  fromY = 100,
  toY = 100,
): Promise<void> {
  el.dispatchEvent(pointerDown(fromX, fromY));
  await vi.advanceTimersByTimeAsync(5);
  window.dispatchEvent(pointerUp(toX, toY));
  await vi.runAllTimersAsync();
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
  return match ? (match[0] as GestureEvent) : undefined;
}

export function countGesturesByType(calls: unknown[][], type: GestureEventType): number {
  return calls.filter((call) => isGestureEvent(call[0]) && call[0].type === type).length;
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
