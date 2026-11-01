import { createRandom } from '@/utils';

import {
  BUILDING_BASE_PX,
  BUILDING_MAX_RISE,
  BUILDING_RANGE_PX,
  BUILDING_VIEW_HEIGHT,
  COORDINATE_PRECISION,
  DIM_SHARE,
  LIT_SHARE,
  SEED_SCALE,
  WINDOW,
} from './miniBuilding.constants';
import type { BuildingWindow, WindowArea } from './miniBuilding.types';

// The y of the roof in the drawing's units.
export function roofTop(height: number): number {
  return BUILDING_VIEW_HEIGHT - height * BUILDING_MAX_RISE;
}

// The building's height on screen, in px.
export function buildingPixels(height: number): number {
  return Math.round(BUILDING_BASE_PX + height * BUILDING_RANGE_PX);
}

// The window grid under the roof, a few of them lit. Seeded by the height, so the build and the
// browser light the same windows.
export function buildingWindows(height: number): BuildingWindow[] {
  const random: () => number = createRandom(Math.round(height * SEED_SCALE));
  const windows: BuildingWindow[] = [];
  for (
    let y: number = roofTop(height) + WINDOW.offsetY;
    y < WINDOW.lastY;
    y += WINDOW.stepY
  ) {
    for (let x: number = WINDOW.firstX; x < WINDOW.lastX; x += WINDOW.stepX) {
      windows.push({
        key: `${String(x)}-${y.toFixed(1)}`,
        x,
        y: Math.round(y * COORDINATE_PRECISION) / COORDINATE_PRECISION,
        isLit: random() < LIT_SHARE,
        isDim: random() < DIM_SHARE,
      });
    }
  }
  return windows;
}

// The area the window pattern fills: from the first window to the end of the last full column
// and row, so the pattern's windows fall exactly where buildingWindows() puts them.
export function windowArea(height: number): WindowArea {
  const y: number = roofTop(height) + WINDOW.offsetY;
  const columns: number = Math.ceil(
    (WINDOW.lastX - WINDOW.firstX) / WINDOW.stepX,
  );
  const rows: number = Math.ceil((WINDOW.lastY - y) / WINDOW.stepY);
  return {
    x: WINDOW.firstX,
    y,
    width: columns * WINDOW.stepX,
    height: rows * WINDOW.stepY,
  };
}
