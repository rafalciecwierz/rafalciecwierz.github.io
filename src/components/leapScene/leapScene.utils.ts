import { createRandom, hashString } from '@/utils';

import {
  DISTANT,
  DISTANT_SEED,
  LIT_SHARE,
  WINDOW,
} from './leapScene.constants';
import type { RoofSpec, SceneRect } from './leapScene.types';

// Seeded, so the build and the browser draw the same.
export function distantBuildings(): SceneRect[] {
  const random: () => number = createRandom(hashString(DISTANT_SEED));
  const buildings: SceneRect[] = [];
  let x: number = DISTANT.startX;
  while (x < DISTANT.endX) {
    const width: number = DISTANT.minWidth + random() * DISTANT.widthRange;
    const height: number = DISTANT.minHeight + random() * DISTANT.heightRange;
    buildings.push({
      key: String(buildings.length),
      x: Math.round(x),
      y: Math.round(DISTANT.ground - height),
      width: Math.round(width),
      height: Math.round(height + DISTANT.depth),
    });
    x += width + random() * DISTANT.gapRange;
  }
  return buildings;
}

export function windowArea(roof: RoofSpec): SceneRect {
  const left: number = roof.left + WINDOW.insetLeft;
  const top: number = roof.top + WINDOW.dropTop;
  const columns: number = Math.ceil(
    (roof.right - WINDOW.insetRight - left) / WINDOW.stepX,
  );
  const rows: number = Math.ceil((WINDOW.bottom - top) / WINDOW.stepY);
  return {
    key: 'area',
    x: left,
    y: top,
    width: columns * WINDOW.stepX,
    height: rows * WINDOW.stepY,
  };
}

// The unlit ones are an SVG pattern, so only these few are separate elements in the HTML.
export function litWindows(roof: RoofSpec, sign: string): SceneRect[] {
  const random: () => number = createRandom(hashString(sign));
  const area: SceneRect = windowArea(roof);
  const lit: SceneRect[] = [];
  for (let y: number = area.y; y < WINDOW.bottom; y += WINDOW.stepY) {
    for (
      let x: number = area.x;
      x < roof.right - WINDOW.insetRight;
      x += WINDOW.stepX
    ) {
      if (random() < LIT_SHARE) {
        lit.push({
          key: `${String(x)}-${String(y)}`,
          x,
          y,
          width: WINDOW.width,
          height: WINDOW.height,
        });
      }
    }
  }
  return lit;
}
