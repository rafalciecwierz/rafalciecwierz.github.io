// The map's own units.
export const MAP_SIZE: number = 400;

// The panel zooms on a 300 × 169 window (16:9) around the pin.
export const ZOOM_WIDTH: number = 300;
export const ZOOM_HEIGHT: number = 169;
export const ZOOM_OFFSET_X: number = 150;
export const ZOOM_OFFSET_Y: number = 100;

export const STREETS_SEED: string = 'spots';
export const STREET_COUNT: number = 9;
// Every third street is a wide avenue.
export const AVENUE_EVERY: number = 3;
export const STREET = {
  start: -40,
  end: 440,
  horizontalFirst: 20,
  horizontalStep: 44,
  verticalFirst: 18,
  verticalStep: 46,
  jitter: 10,
  skew: 30,
} as const;

// The river across the map and the main road on the diagonal.
export const RIVER_PATH: string =
  'M-10 290 C 80 250, 140 330, 230 300 S 360 220, 410 250 L410 300 C 360 270, 300 350, 230 345 S 80 300, -10 335 Z';
export const MAIN_ROAD = { x1: -20, y1: 397, x2: 420, y2: 13 } as const;

// Pins stay inside this area and at least MIN_PIN_GAP apart; after enough tries a pin keeps
// its last spot even if it is close to another.
export const PIN_AREA = { x: 60, width: 280, y: 60, height: 200 } as const;
export const MIN_PIN_GAP: number = 70;
export const MAX_PIN_TRIES: number = 40;

// The pin: a teardrop with the number on it, and a ring that pings on the highlighted pin.
export const PIN_RING = { radius: 16, rise: 22 } as const;
export const PIN_NUMBER_RISE: number = 17;
