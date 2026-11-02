import type { Job } from '@/content';
import { createRandom, hashString } from '@/utils';

import {
  FAR,
  FAR_SEED,
  LIT_SHARE,
  SCREENS_PER_SEGMENT,
  VH_PER_SCREEN,
  WARM_SHARE,
  WINDOW,
} from './careerRunScene.constants';
import type {
  Facade,
  FacadeWindows,
  FarBuilding,
  RunWindow,
  WorldBox,
} from './careerRunScene.types';

// The run's generated graphics, seeded so the build and the browser draw the same SVG
// (docs/ARCHITECTURE.md section 10).

// A facade's windows: the grid from under the ledge down to just above the street. The unlit
// ones are one SVG pattern over `area`; only the lit ones become elements of their own.
export function facadeWindows(facade: Facade, seed: string): FacadeWindows {
  const random: () => number = createRandom(hashString(seed));
  const left: number = facade.x + WINDOW.insetLeft;
  const top: number = -facade.height + WINDOW.dropTop;
  const right: number = facade.x + facade.width - WINDOW.insetRight;
  const bottom: number = -WINDOW.bottomGap;
  const columns: number = Math.max(0, Math.ceil((right - left) / WINDOW.stepX));
  const rows: number = Math.max(0, Math.ceil((bottom - top) / WINDOW.stepY));
  const lit: RunWindow[] = [];
  for (let row: number = 0; row < rows; row += 1) {
    for (let column: number = 0; column < columns; column += 1) {
      if (random() < LIT_SHARE) {
        const x: number = left + column * WINDOW.stepX;
        const y: number = top + row * WINDOW.stepY;
        lit.push({
          key: `${String(x)}-${String(y)}`,
          x,
          y,
          isWarm: random() < WARM_SHARE,
        });
      }
    }
  }
  return {
    area: {
      x: left,
      y: top,
      width: columns * WINDOW.stepX,
      height: rows * WINDOW.stepY,
    },
    lit,
  };
}

// The far city: a row of tall buildings with a few faint windows, from edge to edge.
export function farBuildings(): FarBuilding[] {
  const random: () => number = createRandom(hashString(FAR_SEED));
  const buildings: FarBuilding[] = [];
  let x: number = FAR.startX;
  while (x < FAR.endX) {
    const width: number = Math.round(FAR.minWidth + random() * FAR.widthRange);
    const height: number = Math.round(
      FAR.minHeight + random() * FAR.heightRange,
    );
    const windows: RunWindow[] = [];
    for (let index: number = 0; index < FAR.windows; index += 1) {
      if (random() < FAR.windowShare) {
        const windowX: number = Math.round(
          x +
            FAR.windowInset +
            random() * (width - FAR.windowInset - FAR.windowInset),
        );
        const windowY: number = Math.round(
          -height +
            FAR.windowTop +
            random() * (height - FAR.windowTop - FAR.windowBottom),
        );
        windows.push({
          key: String(index),
          x: windowX,
          y: windowY,
          isWarm: true,
        });
      }
    }
    buildings.push({
      key: String(buildings.length),
      x: Math.round(x),
      y: -height,
      width,
      height: height + FAR.depth,
      windows,
    });
    x += width + random() * FAR.gapRange;
  }
  return buildings;
}

// The far city's area in its own units: from its first building to past its last, from the
// tallest roof it can have down to the bottom of its walls.
export function farBox(): WorldBox {
  const tallest: number = FAR.minHeight + FAR.heightRange;
  return {
    minX: FAR.startX,
    minY: -tallest,
    width: FAR.endX + FAR.minWidth + FAR.widthRange - FAR.startX,
    height: tallest + FAR.depth,
  };
}

// The number of roles in each job, oldest first, as careerRunLayout() takes them. The content
// lists the jobs newest first.
export function roleCountsOf(jobs: readonly Job[]): number[] {
  return jobs.map((job: Job): number => job.roles.length).reverse();
}

// How far the page scrolls through the run, as a CSS length in screens (vh), so the browser
// keeps it right when the window changes height.
export function runDistance(segmentCount: number): string {
  return `${(segmentCount * SCREENS_PER_SEGMENT * VH_PER_SCREEN).toFixed(1)}vh`;
}
