export const SPOT_SHARE = { wide: 0.8, narrow: 0.78 } as const;

export const SCALE_BY_HEIGHT = { unit: 150, min: 0.8, max: 1.2 } as const;

export const DROP = {
  startOffsetX: -220,
  startY: -60,
  landOffsetX: -70,
} as const;

export const ROLL = { turn: 360, tuckShare: 0.8 } as const;

export const DURATIONS = {
  drop: 0.62,
  roll: 0.56,
  standUp: 0.32,
  turn: 0.26,
  raiseArm: 0.24,
  wave: 1.5,
  bubble: 0.4,
} as const;

export const BUBBLE = { fromScale: 0.6, ease: 'back.out(2)' } as const;

export const TRIGGER_START: string = '60% bottom';
