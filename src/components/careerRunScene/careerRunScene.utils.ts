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

export function farBox(): WorldBox {
  const tallest: number = FAR.minHeight + FAR.heightRange;
  return {
    minX: FAR.startX,
    minY: -tallest,
    width: FAR.endX + FAR.minWidth + FAR.widthRange - FAR.startX,
    height: tallest + FAR.depth,
  };
}

export function roleCountsOf(jobs: readonly Job[]): number[] {
  return jobs.map((job: Job): number => job.roles.length).reverse();
}

export function runDistance(segmentCount: number): string {
  return `${(segmentCount * SCREENS_PER_SEGMENT * VH_PER_SCREEN).toFixed(1)}vh`;
}
