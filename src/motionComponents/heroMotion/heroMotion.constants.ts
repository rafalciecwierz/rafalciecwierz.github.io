export const SIGN_FLICKER = {
  duration: 0.7,
  maxDelay: 0.65,
  steps: [
    [0, 0.25],
    [0.2, 0.9],
    [0.3, 0.3],
    [0.45, 1],
    [0.55, 0.55],
    [1, 1],
  ],
  ease: 'steps(1)',
} as const;

export const ROLE_FLIP = {
  startDelay: 1.2,
  flipDuration: 0.56,
  hold: 1.1,
  settleStart: 0.3,
  settleSpread: 0.7,
  glyphs: 'ABCDEFGHIJKLMNOPRSTUWZ#/+',
  maxDuration: 5,
} as const;

export const WINDOW_FLICKER = { tick: 0.2, averageGap: 1.3 } as const;

export const PERCENT: number = 100;

export const RIG_SCALE = { perFontPx: 0.5 / 92, min: 0.32, max: 1.05 } as const;

export const JUMP = {
  arcBase: 24,
  arcPerPx: 0.28,
  arcScale: 0.8,
  minDuration: 0.33,
  durationPerPx: 0.0007,
  maxDuration: 0.9,
  reachEnd: 0.15,
  tuckEnd: 0.72,
  settle: 0.26,
  arcFactor: 4,
} as const;

export const KONG = {
  duration: 0.76,
  skip: 2,
  reachEnd: 0.15,
  diveEnd: 0.45,
  tuckEnd: 0.75,
} as const;

export const FLIP = {
  windUp: 0.14,
  air: 0.72,
  height: 110,
  turn: 360,
  tuckBy: 3,
  landFrom: 0.8,
  settle: 0.26,
} as const;

export const HANDSTAND = {
  kickWindUp: 0.16,
  kickUp: 0.52,
  hold: 1,
  stepDown: 0.52,
  halfTurn: 180,
  scissorSwing: 14,
  scissorCycles: 2,
} as const;

export const TRICK_ORDER = [
  'backflip',
  'kongVault',
  'frontFlip',
  'handstand',
] as const;

export const HIT = { rise: 50, radius: 46, middle: 0.5 } as const;

export const FULL_CYCLE: number = Math.PI * 2;

export const SIGN_LETTER_SELECTOR: string = '[data-sign-letter]';

export const GLYPH_SCAN = {
  widthShare: 1.2,
  heightShare: 1.6,
  baselineShare: 1.2,
  inkAlpha: 128,
  rgbaChannels: 4,
  alphaChannel: 3,
  edgeTolerance: 1,
  half: 0.5,
} as const;

export const RESIZE_SETTLE_MS: number = 200;

export const SCAN_IDLE = { timeout: 4000, fallbackDelay: 1000 } as const;

export const GREETING = {
  delayMs: 1800,
  standUp: 0.32,
  turn: 0.26,
  raiseArm: 0.24,
  wave: 1.5,
  lowerArm: 0.24,
  turnBack: 0.26,
  crouch: 0.32,
} as const;
