// FooterLanding, from the reference design (design/iterations/08-ascent-dark-v2.html):
// the runner drops onto the street, rolls, stands up, turns to the viewer and waves.

// Where he ends up: at 80% of the street's width, 78% on phones (as FooterStreet's CSS).
export const SPOT_SHARE = { wide: 0.8, narrow: 0.78 } as const;

// His size follows the street's height: 150 px of street is scale 1, within these limits.
export const SCALE_BY_HEIGHT = { unit: 150, min: 0.8, max: 1.2 } as const;

// The drop starts above the street, 220 px left of his spot, and he touches down 70 px short
// of it; the roll carries him the rest of the way.
export const DROP = {
  startOffsetX: -220,
  startY: -60,
  landOffsetX: -70,
} as const;

// One full turn on the ground; he stays tucked for 80% of it, then opens into a crouch.
export const ROLL = { turn: 360, tuckShare: 0.8 } as const;

// Three waves of the raised arm: the elbow swings 38° each way, the shoulder 6°.
export const WAVE = { cycles: 3, elbowSwing: 38, shoulderSwing: 6 } as const;
// One wave is one full sine cycle.
export const FULL_CYCLE: number = Math.PI * 2;

// How long each part takes, in seconds.
export const DURATIONS = {
  drop: 0.62,
  roll: 0.56,
  standUp: 0.32,
  turn: 0.26,
  raiseArm: 0.24,
  wave: 1.5,
  bubble: 0.4,
} as const;

// The bubble pops in from 60% of its size, with an overshoot.
export const BUBBLE = { fromScale: 0.6, ease: 'back.out(2)' } as const;

// He starts when 60% of the street is on screen, so the drop is seen.
export const TRIGGER_START: string = '60% bottom';
