import { describe, expect, it } from 'vitest';

import { careerRunLayout } from './careerRunLayout.utils';
import type {
  CareerRunLayout,
  FacadeWindows,
  RunSegment,
} from './careerRunScene.types';
import {
  facadeWindows,
  farBuildings,
  runDistance,
} from './careerRunScene.utils';

// The real career, oldest first: two promoted jobs, then two with one role each.
const ROLE_COUNTS: readonly number[] = [2, 2, 1, 1];
const LAYOUT: CareerRunLayout = careerRunLayout(ROLE_COUNTS);

describe('careerRunLayout', (): void => {
  it('puts one building per job, a tower per promotion, and every roof higher than the last', (): void => {
    expect(LAYOUT.buildings).toHaveLength(ROLE_COUNTS.length);
    expect(
      LAYOUT.buildings.map(
        (building: CareerRunLayout['buildings'][number]): number =>
          building.towers.length,
      ),
    ).toEqual([1, 1, 0, 0]);
    const heights: number[] = LAYOUT.roofs.map(
      (roof: CareerRunLayout['roofs'][number]): number => roof.height,
    );
    expect(heights).toEqual([170, 255, 340, 425, 510, 595]);
    expect(LAYOUT.next.height).toBe(680);
  });

  it('leaves a gap between buildings and puts the next roof after the last one', (): void => {
    const [first, second] = LAYOUT.buildings;
    expect(first).toMatchObject({ x: 0, baseWidth: 280, width: 445 });
    expect(first?.towers[0]).toEqual({ x: 280, width: 165, height: 255 });
    expect(second?.x).toBe(585);
    expect(LAYOUT.next.x).toBe(2210);
  });

  it('runs every roof, jumps between them and waits on the last one', (): void => {
    const kinds: string[] = LAYOUT.line.map(
      (segment: RunSegment): string => segment.kind,
    );
    expect(kinds).toEqual([
      'run',
      'jump',
      'run',
      'jump',
      'run',
      'jump',
      'run',
      'jump',
      'run',
      'jump',
      'run',
      'hold',
    ]);
    expect(LAYOUT.line[0]).toMatchObject({ fromX: 40, toX: 260, stage: 0 });
    // Onto the first tower: from 20 before its edge to 30 into the tower.
    expect(LAYOUT.line[1]).toMatchObject({
      fromX: 260,
      fromHeight: 170,
      toX: 310,
      toHeight: 255,
      stage: 1,
    });
    expect(LAYOUT.line.at(-1)).toMatchObject({
      kind: 'hold',
      x: 2050,
      height: 595,
      // Six roles, so the next roof is stage 6.
      stage: 6,
    });
  });

  it('adds up the line and starts each stage in order, the first at 0', (): void => {
    const sum: number = LAYOUT.line.reduce(
      (total: number, segment: RunSegment): number => total + segment.length,
      0,
    );
    expect(LAYOUT.length).toBeCloseTo(sum);
    expect(LAYOUT.stageStarts).toHaveLength(LAYOUT.roofs.length + 1);
    expect(LAYOUT.stageStarts[0]).toBe(0);
    LAYOUT.stageStarts
      .slice(1)
      .forEach((start: number, index: number): void => {
        expect(start).toBeGreaterThan(LAYOUT.stageStarts[index] ?? 1);
        expect(start).toBeLessThan(1);
      });
  });

  it('holds the whole line inside the world box', (): void => {
    expect(LAYOUT.box.minX).toBeLessThan(0);
    expect(LAYOUT.box.minX + LAYOUT.box.width).toBeGreaterThan(
      LAYOUT.next.x + LAYOUT.next.width,
    );
    expect(LAYOUT.box.minY).toBeLessThan(-LAYOUT.next.height);
  });

  it('builds a career of any length', (): void => {
    const longer: CareerRunLayout = careerRunLayout([1, 3, 1]);
    expect(longer.buildings[1]?.towers).toHaveLength(2);
    expect(longer.roofs).toHaveLength(5);
    expect(longer.stageStarts).toHaveLength(6);
  });
});

describe('facadeWindows', (): void => {
  it('fills whole grid steps between the ledge and the street, and lights a few', (): void => {
    const windows: FacadeWindows = facadeWindows(
      { x: 0, width: 380, height: 510 },
      'seed',
    );

    expect(windows.area.x).toBe(22);
    expect(windows.area.y).toBe(-510 + 104);
    expect(windows.area.width % 36).toBe(0);
    expect(windows.lit.length).toBeGreaterThan(0);
    expect(windows.lit.length).toBeLessThan(windows.area.width);
  });

  it('draws the same windows for the same seed, so the build and the browser agree', (): void => {
    const facade: { x: number; width: number; height: number } = {
      x: 0,
      width: 380,
      height: 510,
    };
    expect(facadeWindows(facade, 'a')).toEqual(facadeWindows(facade, 'a'));
  });
});

describe('farBuildings', (): void => {
  it('covers the far city from edge to edge, the same every time', (): void => {
    expect(farBuildings()).toEqual(farBuildings());
    expect(farBuildings()[0]?.x).toBe(-600);
    expect(farBuildings().at(-1)?.x).toBeLessThan(3200);
  });
});

describe('runDistance', (): void => {
  it('gives every piece of the line the same share of the window', (): void => {
    expect(runDistance(12)).toBe('504.0vh');
  });
});
