export const DURATION: number = 2.6;

export const PHASES = { runUpEnd: 0.25, flightEnd: 0.75 } as const;

export const RUN_UP = { startX: 380, edgeX: 640, strideLength: 22 } as const;
export const SINE_TO_BLEND: number = 0.5;

export const FLIGHT = {
  height: 170,
  arcFactor: 4,
  reachEnd: 0.15,
  tuckEnd: 0.72,
} as const;

export const LANDING_CROUCH_SHARE: number = 0.5;

export const SLOW_IN = { start: 0.33, end: 0.42 } as const;
export const SLOW_OUT = { start: 0.6, end: 0.7 } as const;
export const SLOWEST_SHARE: number = 0.86;

export const GHOST_OPACITIES: readonly number[] = [0.3, 0.18, 0.09];
export const GHOST_LAG: number = 0.02;
export const GHOST_THRESHOLD: number = 0.01;

export const CAMERA = { zoom: 0.14, focusRise: 80, zoomDecimals: 3 } as const;

export const FOG_THINNING: number = 0.8;
export const VIGNETTE_STRENGTH: number = 0.85;
export const VIGNETTE = {
  radius: 0.75,
  clearUntil: 0.45,
  edgeOpacity: 0.9,
} as const;

export const TRIGGER_START: string = '80% bottom';

export const OPACITY_DECIMALS: number = 3;
