// RooftopRun, from the reference design (design/iterations/08-ascent-dark-v2.html): scrolling
// through the pinned career section runs the line from roof to roof.

// His stride follows the distance run (one cycle every 26 units × 2π), so his feet do not
// slide; a sine runs from -1 to 1, and (sine + 1) × 0.5 turns it into a blend from 0 to 1.
export const STRIDE_LENGTH: number = 26;
export const SINE_TO_BLEND: number = 0.5;
// After a landing he blends from the landing pose back into the run over 40 units.
export const LANDING_BLEND: number = 40;

// A jump's arc rises 50 units, plus 0.9 of the climb and 0.12 of the distance, above the
// straight line between the two roofs. The pose goes from the reach to the tuck at 15% of the
// jump and opens to land at 72%. The card changes half-way through the air (STAGE_SWITCH,
// shared with the scene's progress bar).
export const JUMP = {
  baseArc: 50,
  climbArc: 0.9,
  distanceArc: 0.12,
  arcFactor: 4,
  reachEnd: 0.15,
  tuckEnd: 0.72,
} as const;

// On the last roof he lands and crouches in the first third of the wait.
export const HOLD_CROUCH_SPEED: number = 3;

// The camera: the world is drawn 1 unit = 1 px for a 980 px high window, between 0.55 and 1.1
// of that, and 0.85 of it below 1180 px wide. His feet are kept at 30% of the width (26% on
// narrower screens) and 70% of the height.
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

// The far city is drawn at 0.8 of the scale and moves slower: 0.375 of his distance sideways,
// and half of his climb, 150 units lower (parallax).
export const FAR_LAYER = {
  scale: 0.8,
  parallaxX: 0.375,
  parallaxY: 0.5,
  drop: 150,
} as const;

// The runner is 1.15 × his drawn size in this scene.
export const RIG_SCALE: number = 1.15;

// A card comes in from 28 px lower with a small overshoot; the one leaving fades out faster.
// A promotion not reached yet loses its colour and fades to 80%: dimmed enough to read as
// "not yet", and still above the AA contrast for its text (the reference's 28% was not).
export const CARD = {
  drop: 28,
  inDuration: 0.45,
  outDuration: 0.35,
  ease: 'back.out(1.4)',
  waitOpacity: 0.8,
  waitFilter: 'grayscale(1)',
} as const;

// Pixels are written with one decimal and scales with four: finer steps cannot be seen.
export const PIXEL_DECIMALS: number = 1;
export const SCALE_DECIMALS: number = 4;

// When the run has to show a card (focus moved to it, or the run started on it), the page
// jumps half-way through its stage, where the runner stands on its roof.
export const HALF: number = 0.5;

// Marks the move name the runner is on (MoveCard's CSS shows only that one during the run).
export const CURRENT_MARK: string = 'data-current';
