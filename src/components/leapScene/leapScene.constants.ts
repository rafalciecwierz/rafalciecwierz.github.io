export const SCENE_WIDTH: number = 1600;
export const SCENE_HEIGHT: number = 700;
export const DISTANT_SEED: string = 'the leap';
export const DISTANT = {
  startX: -120,
  endX: 1720,
  minWidth: 60,
  widthRange: 120,
  minHeight: 160,
  heightRange: 280,
  ground: 560,
  depth: 240,
  gapRange: 8,
} as const;
export const TAKE_OFF_ROOF = { left: -140, right: 680, top: 430 } as const;
export const LANDING_ROOF = { left: 930, right: 1800, top: 380 } as const;
export const ROOF_BOTTOM: number = 900;
export const LEDGE = { overhang: 8, rise: 12, height: 14, glow: 2 } as const;
export const SIGN = { inset: 40, drop: 84, size: 72, spacing: 2 } as const;
export const WINDOW = {
  width: 16,
  height: 24,
  stepX: 36,
  stepY: 44,
  insetLeft: 30,
  insetRight: 24,
  dropTop: 120,
  bottom: 860,
} as const;
export const LIT_SHARE: number = 0.2;
export const FOG = { x: 720, y: -100, width: 1100, height: 900 } as const;
export const LANDED = { x: 1010, scale: 1.7 } as const;
export const LEAP_GEOMETRY = {
  width: SCENE_WIDTH,
  height: SCENE_HEIGHT,
  takeOffFeet: TAKE_OFF_ROOF.top - LEDGE.rise,
  landingFeet: LANDING_ROOF.top - LEDGE.rise,
  landedX: LANDED.x,
  scale: LANDED.scale,
} as const;
