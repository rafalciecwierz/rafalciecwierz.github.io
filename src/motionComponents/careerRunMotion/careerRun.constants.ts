export const STRIDE_LENGTH: number = 26;
export const SINE_TO_BLEND: number = 0.5;
export const LANDING_BLEND: number = 40;

export const JUMP = {
  baseArc: 50,
  climbArc: 0.9,
  distanceArc: 0.12,
  arcFactor: 4,
  reachEnd: 0.15,
  tuckEnd: 0.72,
} as const;

export const HOLD_CROUCH_SPEED: number = 3;

export const CAMERA = {
  designHeight: 980,
  minScale: 0.55,
  maxScale: 1.1,
  narrowWidth: 1180,
  narrowScale: 0.85,
  anchorX: 0.3,
  anchorXNarrow: 0.26,
  anchorY: 0.7,
} as const;

export const FAR_LAYER = {
  scale: 0.8,
  parallaxX: 0.375,
  parallaxY: 0.5,
  drop: 150,
} as const;

export const RIG_SCALE: number = 1.15;

export const CARD = {
  drop: 28,
  inDuration: 0.45,
  outDuration: 0.35,
  ease: 'back.out(1.4)',
  waitOpacity: 0.8,
  waitFilter: 'grayscale(1)',
} as const;

export const PIXEL_DECIMALS: number = 1;
export const SCALE_DECIMALS: number = 4;

export const HALF: number = 0.5;

export const CURRENT_MARK: string = 'data-current';
