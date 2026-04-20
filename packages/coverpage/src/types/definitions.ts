export type Side = 'left' | 'right' | 'top' | 'bottom';

export interface CoverConfig {
  side: Side;
  range: number | undefined;
  movementThreshold: number;
  speedThreshold: number;
}

export interface IConfigProvider {
  get side(): Side;
  get range(): number | undefined;
  get movementThreshold(): number;
  get speedThreshold(): number;
}

export interface Vec2 {
  x: number;
  y: number;
}