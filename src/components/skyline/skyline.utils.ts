import { createRandom, hashString } from '@/utils';

import {
  ANTENNA_HEIGHT,
  ANTENNA_OFFSET,
  ANTENNA_SHARE,
  ANTENNA_WIDTH,
  COORDINATE_PRECISION,
  GRID_MARGIN_X,
  GRID_MARGIN_Y,
  ROOF_BOX_HEIGHT,
  ROOF_BOX_OFFSET,
  ROOF_BOX_SHARE,
  ROOF_BOX_WIDTH,
  SKYLINE_END_X,
  SKYLINE_HEIGHT,
  SKYLINE_LAYERS,
  SKYLINE_START_X,
  WARM_SHARE,
  WINDOW_INSET_TOP,
  WINDOW_INSET_X,
} from './skyline.constants';
import type {
  SkylineBuilding,
  SkylineDrawing,
  SkylineLayerSpec,
  SkylineWindow,
} from './skyline.types';

function round(value: number): number {
  return Math.round(value * COORDINATE_PRECISION) / COORDINATE_PRECISION;
}

// One row of buildings, left to right. The random numbers are drawn in the reference's order
// (width, height, antenna, roof box, windows, gap), so the city looks the same as there.
function drawLayer(
  spec: SkylineLayerSpec,
  random: () => number,
  buildings: SkylineBuilding[],
  windows: SkylineWindow[],
): void {
  let x: number = SKYLINE_START_X;
  while (x < SKYLINE_END_X) {
    const width: number = spec.minWidth + random() * spec.widthRange;
    const height: number =
      spec.minHeight + random() * (spec.maxHeight - spec.minHeight);
    const roof: number = SKYLINE_HEIGHT - height;
    const id: string = `${spec.layer}-${String(buildings.length)}`;
    buildings.push({
      key: id,
      layer: spec.layer,
      x: round(x),
      y: round(roof),
      width: round(width),
      height: round(height),
    });
    if (random() < ANTENNA_SHARE) {
      buildings.push({
        key: `${id}-antenna`,
        layer: spec.layer,
        x: round(x + width * ANTENNA_OFFSET),
        y: round(roof - ANTENNA_HEIGHT),
        width: ANTENNA_WIDTH,
        height: ANTENNA_HEIGHT,
      });
    }
    if (random() < ROOF_BOX_SHARE) {
      buildings.push({
        key: `${id}-box`,
        layer: spec.layer,
        x: round(x + width * ROOF_BOX_OFFSET),
        y: round(roof - ROOF_BOX_HEIGHT),
        width: round(width * ROOF_BOX_WIDTH),
        height: ROOF_BOX_HEIGHT,
      });
    }
    const columns: number = Math.floor(
      (width - GRID_MARGIN_X) / spec.columnStep,
    );
    const rows: number = Math.floor((height - GRID_MARGIN_Y) / spec.rowStep);
    for (let row: number = 0; row < rows; row += 1) {
      for (let column: number = 0; column < columns; column += 1) {
        if (random() > spec.litShare) {
          continue;
        }
        windows.push({
          key: `${id}-${String(row)}-${String(column)}`,
          layer: spec.layer,
          tone: random() < WARM_SHARE ? 'warm' : 'cool',
          x: round(x + WINDOW_INSET_X + column * spec.columnStep),
          y: round(roof + WINDOW_INSET_TOP + row * spec.rowStep),
          width: spec.windowWidth,
          height: spec.windowHeight,
        });
      }
    }
    x += width + spec.minGap + random() * spec.gapRange;
  }
}

// A city skyline drawn from a seed: the far row, then the near row in front of it, each
// building with a few lit windows. The same seed always gives the same drawing.
export function drawSkyline(seed: string): SkylineDrawing {
  const random: () => number = createRandom(hashString(seed));
  const buildings: SkylineBuilding[] = [];
  const windows: SkylineWindow[] = [];
  SKYLINE_LAYERS.forEach((spec: SkylineLayerSpec): void => {
    drawLayer(spec, random, buildings, windows);
  });
  return { buildings, windows };
}
