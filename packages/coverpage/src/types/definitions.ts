export type Side = 'left' | 'right' | 'top' | 'bottom';

export interface CoverConfig {
  side: Side;
  movementThreshold: number;
  speedThreshold: number;
}

export interface IConfigProvider {
  get movementThreshold(): number;
  get speedThreshold(): number;
}

export interface Vec2 {
  x: number;
  y: number;
}
