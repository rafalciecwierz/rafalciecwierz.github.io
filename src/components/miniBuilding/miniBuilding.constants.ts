// The drawing's own units; the SVG keeps them and stands on its bottom edge.
export const BUILDING_VIEW_WIDTH: number = 56;
export const BUILDING_VIEW_HEIGHT: number = 200;

// The building's height is a share (0 to 1) of this many units.
export const BUILDING_MAX_RISE: number = 190;

// Its height on screen (px): a base plus the share times the range.
export const BUILDING_BASE_PX: number = 120;
export const BUILDING_RANGE_PX: number = 120;

export const BODY = { x: 4, width: 48 } as const;
export const ROOF = { x: 2, width: 52, height: 5, overhang: 4 } as const;
export const TOWER = { x: 28, width: 22, height: 26, rise: 30 } as const;
export const TOWER_CAP = { x: 26, width: 26, height: 4, rise: 33 } as const;

// The window grid.
export const WINDOW = {
  width: 6,
  height: 9,
  firstX: 10,
  lastX: 46,
  stepX: 12,
  offsetY: 12,
  lastY: 192,
  stepY: 16,
} as const;

// The share of lit windows, and of windows drawn a little dimmer.
export const LIT_SHARE: number = 0.22;
export const DIM_SHARE: number = 0.22;

// The seed is the height in thousandths, so each building gets its own windows.
export const SEED_SCALE: number = 1000;

// Window positions are rounded to one decimal: the same picture, a shorter HTML file.
export const COORDINATE_PRECISION: number = 10;
