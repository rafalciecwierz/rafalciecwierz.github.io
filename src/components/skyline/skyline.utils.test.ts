import { describe, expect, it } from 'vitest';

import {
  SKYLINE_END_X,
  SKYLINE_HEIGHT,
  SKYLINE_START_X,
} from './skyline.constants';
import type {
  SkylineBuilding,
  SkylineDrawing,
  SkylineWindow,
} from './skyline.types';
import { drawSkyline } from './skyline.utils';

describe('drawSkyline', (): void => {
  it('draws the same city for the same seed, so the build and the browser match', (): void => {
    expect(drawSkyline('night session')).toEqual(drawSkyline('night session'));
    expect(drawSkyline('night session')).not.toEqual(
      drawSkyline('another night'),
    );
  });

  it('covers the whole width with buildings standing on the bottom edge', (): void => {
    const { buildings }: SkylineDrawing = drawSkyline('night session');
    const rightEdge: number = Math.max(
      ...buildings.map(
        (building: SkylineBuilding): number => building.x + building.width,
      ),
    );

    expect(
      Math.min(
        ...buildings.map((building: SkylineBuilding): number => building.x),
      ),
    ).toBe(SKYLINE_START_X);
    expect(rightEdge).toBeGreaterThanOrEqual(SKYLINE_END_X);
    expect(
      buildings.every(
        (building: SkylineBuilding): boolean =>
          building.y + building.height <= SKYLINE_HEIGHT,
      ),
    ).toBe(true);
  });

  it('gives every rectangle a unique key and lights some windows', (): void => {
    const { buildings, windows }: SkylineDrawing = drawSkyline('night session');
    const keys: string[] = [...buildings, ...windows].map(
      (rect: SkylineBuilding | SkylineWindow): string => rect.key,
    );

    expect(new Set(keys).size).toBe(keys.length);
    expect(windows.length).toBeGreaterThan(0);
  });
});
