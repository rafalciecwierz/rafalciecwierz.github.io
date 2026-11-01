import { describe, expect, it } from 'vitest';

import { BUILDING_VIEW_HEIGHT } from './miniBuilding.constants';
import type { BuildingWindow, WindowArea } from './miniBuilding.types';
import {
  buildingPixels,
  buildingWindows,
  roofTop,
  windowArea,
} from './miniBuilding.utils';

describe('MiniBuilding geometry', (): void => {
  it('stands higher for a larger height', (): void => {
    expect(roofTop(0.86)).toBeLessThan(roofTop(0.3));
    expect(buildingPixels(1)).toBeGreaterThan(buildingPixels(0.3));
  });

  it('lights the same windows every time, all of them under the roof', (): void => {
    const windows: BuildingWindow[] = buildingWindows(0.58);

    expect(buildingWindows(0.58)).toEqual(windows);
    expect(
      windows.every(
        (window: BuildingWindow): boolean => window.y > roofTop(0.58),
      ),
    ).toBe(true);
    expect(
      windows.every(
        (window: BuildingWindow): boolean => window.y < BUILDING_VIEW_HEIGHT,
      ),
    ).toBe(true);
    expect(
      windows.some((window: BuildingWindow): boolean => window.isLit),
    ).toBe(true);
  });

  it('covers exactly the window grid with the pattern area', (): void => {
    const windows: BuildingWindow[] = buildingWindows(0.74);
    const area: WindowArea = windowArea(0.74);

    windows.forEach((window: BuildingWindow): void => {
      expect(window.x).toBeGreaterThanOrEqual(area.x);
      expect(window.x).toBeLessThan(area.x + area.width);
      expect(window.y).toBeGreaterThanOrEqual(area.y - 0.1);
      expect(window.y).toBeLessThan(area.y + area.height);
    });
  });
});
