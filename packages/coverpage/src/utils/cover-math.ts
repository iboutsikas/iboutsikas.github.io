import type { Vec2 } from "../types/definitions.js";

export class CoverMath {
  /**
   * Clamps a value between a minimum and maximum.
   */
  static clamp<T extends number>(value: T, min: T, max: T): T {
    return Math.min(Math.max(value, min), max) as T;
  }

  /**
   * Returns the squared distance between two vec2
   */
  static distanceSq(a:Vec2, b: Vec2): number {
    const diffX = a.x - b.x;
    const diffY = a.y - b.y;
    return (diffX * diffX) + (diffY * diffY); 
  }

  /**
   * Returns the squared magnitude of a vector
   */
  static magnitudeSq(a: Vec2): number {
    return (a.x * a.x) + (a.y * a.y);
  }

}

