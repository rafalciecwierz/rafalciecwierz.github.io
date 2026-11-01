// GapLeap, from the reference design (design/iterations/08-ascent-dark-v2.html): the runner
// takes the gap from the known roof to the one in the fog, with bullet time at the apex.

// The move at real speed, in seconds; bullet time stretches it to about 5.6 s.
export const DURATION: number = 2.6;

// The move's progress (0 to 1) in three parts: the run-up until 0.25, the flight until 0.75,
// then the landing.
export const PHASES = { runUpEnd: 0.25, flightEnd: 0.75 } as const;

// Where he runs, in the scene's units: from x 380 to the edge of the roof at 640.
export const RUN_UP = { startX: 380, edgeX: 640, strideLength: 22 } as const;
// A sine runs from -1 to 1; (sine + 1) × 0.5 turns it into a blend from 0 to 1.
export const SINE_TO_BLEND: number = 0.5;

// The flight's arc rises 170 units above the straight line between the two ledges; the pose
// goes from the reach to the tuck at 15% of the flight and opens to land at 72%.
export const FLIGHT = {
  height: 170,
  arcFactor: 4,
  reachEnd: 0.15,
  tuckEnd: 0.72,
} as const;

// The landing: half of it to crouch, the other half to stand up.
export const LANDING_CROUCH_SHARE: number = 0.5;

// Bullet time fades in between 33% and 42% of the move and out between 60% and 70%. At its
// deepest, time runs at 14% of its speed.
export const SLOW_IN = { start: 0.33, end: 0.42 } as const;
export const SLOW_OUT = { start: 0.6, end: 0.7 } as const;
export const SLOWEST_SHARE: number = 0.86;

// Three after-images trail him while time is slow, each 2% of the move behind the last and
// fainter.
export const GHOST_OPACITIES: readonly number[] = [0.3, 0.18, 0.09];
export const GHOST_LAG: number = 0.02;
// Below this much bullet time the after-images are invisible and are not redrawn.
export const GHOST_THRESHOLD: number = 0.01;

// The camera pushes in by 14% at full bullet time, centred 80 units above his feet.
export const CAMERA = { zoom: 0.14, focusRise: 80, zoomDecimals: 3 } as const;

// The fog thins as he crosses, to a fifth of it once he has landed (as the static scene).
export const FOG_THINNING: number = 0.8;
// The edges darken to 85% at full bullet time.
export const VIGNETTE_STRENGTH: number = 0.85;
// The vignette's gradient: clear in the middle, dark at the edges.
export const VIGNETTE = {
  radius: 0.75,
  clearUntil: 0.45,
  edgeOpacity: 0.9,
} as const;

// He starts once 80% of the scene is on screen, so the take-off is seen.
export const TRIGGER_START: string = '80% bottom';

// Opacity is written with three decimals: finer steps cannot be seen.
export const OPACITY_DECIMALS: number = 3;
