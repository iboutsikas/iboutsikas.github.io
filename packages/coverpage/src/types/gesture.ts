import type { Vec2 } from './definitions.js';

export type GestureEventType = 'start' | 'move' | 'end' | 'flick';

/** Pure value type representing a single pointer event in the gesture stream. */
export interface GestureEvent {
  readonly type: GestureEventType;
  readonly position: Vec2;
  readonly velocity: Vec2;
  readonly timestamp: number;
}

/**
 * Creates a new GestureEvent.
 * Defaults velocity to zero and timestamp to performance.now() for high-resolution timing.
 */
export function createGestureEvent(
  type: GestureEventType,
  position: Vec2,
  velocity: Vec2 = { x: 0, y: 0 },
  timestamp: number = performance.now()
): GestureEvent {
  return { type, position, velocity, timestamp };
}

/**
 * Creates a new GestureEvent from an existing one with optional field overrides.
 * Position is shallow-copied to prevent accidental mutation.
 */
export function gestureEventFrom(other: GestureEvent, overrides?: Partial<GestureEvent>): GestureEvent {
  return {
    type: overrides?.type ?? other.type,
    position: overrides?.position ?? { ...other.position },
    velocity: overrides?.velocity ?? other.velocity,
    timestamp: overrides?.timestamp ?? other.timestamp
  };
}
