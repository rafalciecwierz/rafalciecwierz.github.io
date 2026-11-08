export const LEVELS = { first: 170, step: 85 } as const;

export const BUILDING = { gap: 140, width: 380, promotedBase: 280 } as const;
export const TOWER_WIDTH: number = 165;
export const NEXT_ROOF_WIDTH: number = 300;

export const SCREENS_PER_SEGMENT: number = 0.42;
export const VH_PER_SCREEN: number = 100;

export const STAGE_SWITCH: number = 0.5;

export const HALF: number = 0.5;

export const LINE = {
  startInset: 40,
  edgeInset: 20,
  buildingLanding: 40,
  towerLanding: 30,
  jumpStretch: 1.35,
  holdLength: 260,
} as const;

export const WORLD_MARGIN = { side: 400, below: 400, above: 40 } as const;

export const LAMP = {
  spacing: 260,
  height: 150,
  reach: 30,
  curve: 10,
  glowRadius: 90,
  tipDrop: 8,
  headWidth: 26,
  headHeight: 6,
  headInset: 10,
  headDrop: 12,
  postWidth: 5,
  glowOpacity: 0.55,
} as const;

export const LEDGE = { overhang: 6, rise: 10, height: 12, glow: 2 } as const;
export const WINDOW = {
  width: 16,
  height: 24,
  stepX: 36,
  stepY: 44,
  insetLeft: 22,
  insetRight: 24,
  dropTop: 104,
  bottomGap: 20,
} as const;
export const LIT_SHARE: number = 0.2;
export const WARM_SHARE: number = 0.75;

export const ROOF_BOX = { at: 0.62, width: 44, height: 24 } as const;
export const ANTENNA = { inset: 30, height: 60, width: 4 } as const;

export const PLATE = { inset: 10, drop: 12, height: 74 } as const;
export const SIGN = { x: 22, y: 50, size: 44, spacing: 1 } as const;
export const DATES = { x: 24, y: 70, size: 15, spacing: 2 } as const;
export const TOWER_LABEL = { drop: 40, size: 20, spacing: 2 } as const;

export const NEXT_ROOF = {
  scaffoldStep: 60,
  labelDrop: 70,
  labelSize: 54,
  dash: '10 8',
} as const;

export const CRANE = {
  inset: 40,
  mastHalf: 7,
  rise: 240,
  peak: 44,
  depth: 16,
  reach: 180,
  counterReach: 100,
  bay: 20,
  cab: { width: 20, height: 18 },
  weight: { width: 30, height: 28 },
  trolley: { at: 120, width: 14, height: 6 },
  block: { width: 10, height: 12 },
  rope: 80,
  sling: 18,
  load: { width: 64, height: 8 },
} as const;

export const FAR_SEED: string = 'the line';
export const FAR = {
  startX: -600,
  endX: 3200,
  minWidth: 80,
  widthRange: 140,
  minHeight: 320,
  heightRange: 520,
  gapRange: 10,
  depth: 400,
  windows: 6,
  windowShare: 0.6,
  windowInset: 10,
  windowTop: 20,
  windowBottom: 20,
} as const;
export const FAR_WINDOW = { width: 5, height: 8 } as const;
