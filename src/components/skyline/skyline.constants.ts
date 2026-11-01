import type { SkylineLayerSpec } from './skyline.types';

// The drawing's own units; the SVG scales them to the box and keeps the bottom edge.
export const SKYLINE_WIDTH: number = 1600;
export const SKYLINE_HEIGHT: number = 640;

// Buildings start a little left of the edge and run past the right one, so no gap shows.
export const SKYLINE_START_X: number = -20;
export const SKYLINE_END_X: number = 1620;

export const SKYLINE_LAYERS: readonly SkylineLayerSpec[] = [
  {
    layer: 'far',
    minHeight: 230,
    maxHeight: 520,
    minWidth: 60,
    widthRange: 110,
    minGap: 0,
    gapRange: 12,
    columnStep: 14,
    rowStep: 18,
    windowWidth: 5,
    windowHeight: 7,
    litShare: 0.06,
  },
  {
    layer: 'near',
    minHeight: 110,
    maxHeight: 330,
    minWidth: 60,
    widthRange: 150,
    minGap: 4,
    gapRange: 30,
    columnStep: 18,
    rowStep: 22,
    windowWidth: 7,
    windowHeight: 10,
    litShare: 0.1,
  },
];

// Rooftop details: how often a building has one, and where and how big it is.
export const ANTENNA_SHARE: number = 0.35;
export const ANTENNA_OFFSET: number = 0.2;
export const ANTENNA_WIDTH: number = 6;
export const ANTENNA_HEIGHT: number = 24;
export const ROOF_BOX_SHARE: number = 0.25;
export const ROOF_BOX_OFFSET: number = 0.55;
export const ROOF_BOX_WIDTH: number = 0.3;
export const ROOF_BOX_HEIGHT: number = 20;

// The window grid keeps clear of the walls and the roof.
export const WINDOW_INSET_X: number = 10;
export const WINDOW_INSET_TOP: number = 18;
export const GRID_MARGIN_X: number = 16;
export const GRID_MARGIN_Y: number = 30;

// The share of lit windows that are warm (sodium) rather than cool (screens).
export const WARM_SHARE: number = 0.7;

// Coordinates are rounded to one decimal: the same picture, a shorter HTML file.
export const COORDINATE_PRECISION: number = 10;
