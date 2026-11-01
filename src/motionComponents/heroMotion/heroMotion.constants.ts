// HeroMotion, from the reference design (design/iterations/08-ascent-dark-v2.html): SignFlicker,
// RoleFlip, the skyline's window flicker, and LetterHop (the runner's hops and tricks).

// SignFlicker: each letter flickers on once, like a warming rooftop sign. The opacities and
// where they fall (share of the move) are the reference's; every step is a jump, not a fade.
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

// RoleFlip: a split-flap scramble through the other titles, then back to the role.
export const ROLE_FLIP = {
  // After the sign has flickered on.
  startDelay: 1.2,
  flipDuration: 0.56,
  hold: 1.1,
  // A letter settles once the progress passes 0.3 + its share of the remaining 0.7, so the
  // letters land from left to right.
  settleStart: 0.3,
  settleSpread: 0.7,
  glyphs: 'ABCDEFGHIJKLMNOPRSTUWZ#/+',
} as const;

// The window flicker: a random window switches on or off about every 1.3 seconds. A clock
// ticks every 0.2 s and switches one with this chance, so the gaps vary like the reference's
// random 0.6–2 s, with one repeating tween that can pause and is reverted with the rest.
export const WINDOW_FLICKER = { tick: 0.2, averageGap: 1.3 } as const;

// The percentage of a keyframe's place in the move.
export const PERCENT: number = 100;

// LetterHop: his size follows the sign's font size (half of it is 92 rig units at scale 1).
export const RIG_SCALE = { perFontPx: 0.5 / 92, min: 0.32, max: 1.05 } as const;

// A jump: its arc rises 24 px plus 28% of the distance (for a runner at scale 0.8), and it
// takes 0.33 s plus 0.7 ms per pixel, up to 0.9 s.
export const JUMP = {
  arcBase: 24,
  arcPerPx: 0.28,
  arcScale: 0.8,
  minDuration: 0.33,
  durationPerPx: 0.0007,
  maxDuration: 0.9,
  // The pose: crouch to reach until 15%, reach to tuck until 72%, then open to land.
  reachEnd: 0.15,
  tuckEnd: 0.72,
  // After landing he settles into a crouch.
  settle: 0.26,
  arcFactor: 4,
} as const;

// The kong vault dives over the next letter: reach until 15%, dive until 45%, tuck until 75%.
export const KONG = {
  duration: 0.76,
  // He lands this many letters away.
  skip: 2,
  reachEnd: 0.15,
  diveEnd: 0.45,
  tuckEnd: 0.75,
} as const;

// Flips in place: a quick crouch-to-reach, then up 110 rig units and one full turn.
export const FLIP = {
  windUp: 0.14,
  air: 0.72,
  height: 110,
  turn: 360,
  // Tucked within the first third of the air time, opening to land in the last 20%.
  tuckBy: 3,
  landFrom: 0.8,
  settle: 0.26,
} as const;

// The handstand: kick up (half a turn), hold with the legs scissoring, step down.
export const HANDSTAND = {
  kickWindUp: 0.16,
  kickUp: 0.52,
  hold: 1,
  stepDown: 0.52,
  halfTurn: 180,
  scissorSwing: 14,
  scissorCycles: 2,
} as const;

// The tricks, in the order clicks on him play them.
export const TRICK_ORDER = [
  'backflip',
  'kongVault',
  'frontFlip',
  'handstand',
] as const;

// The invisible circle that catches clicks on him: centred 50 rig units above his feet, with a
// radius of 46 rig units.
// Before the first move it is placed on the static runner, whose hip is the middle of his box.
export const HIT = { rise: 50, radius: 46, middle: 0.5 } as const;

// One full sine cycle.
export const FULL_CYCLE: number = Math.PI * 2;

// The sign's letters, as HeroSign marks them.
export const SIGN_LETTER_SELECTOR: string = '[data-sign-letter]';

// The glyph scan draws a letter on a canvas 1.2 font sizes wide and 1.6 high, with its baseline
// 1.2 font sizes down, and counts a pixel as ink above half opacity.
export const GLYPH_SCAN = {
  widthShare: 1.2,
  heightShare: 1.6,
  baselineShare: 1.2,
  inkAlpha: 128,
  rgbaChannels: 4,
  alphaChannel: 3,
  // Columns within one pixel of the highest ink belong to the same top edge.
  edgeTolerance: 1,
  // The middle of the edge: halfway between its first and last column.
  half: 0.5,
} as const;

// After a resize, the sign is measured again once the window has stopped changing for 200 ms.
export const RESIZE_SETTLE_MS: number = 200;

// The glyph scan runs in the next idle moment after the font has loaded, at the latest after
// this long (ms); Safari, without requestIdleCallback, waits the fallback delay instead.
export const SCAN_IDLE = { timeout: 4000, fallbackDelay: 1000 } as const;

// The greeting: once, after the sign has lit, he stands up on the Ł, turns to the viewer,
// waves and crouches back, so the eye finds him (and the reader may click him). Seconds.
export const GREETING = {
  // From the layer's start: after the sign flicker (0.7 s, letters starting within 0.65 s).
  delayMs: 1800,
  standUp: 0.32,
  turn: 0.26,
  raiseArm: 0.24,
  wave: 1.5,
  lowerArm: 0.24,
  turnBack: 0.26,
  crouch: 0.32,
} as const;
