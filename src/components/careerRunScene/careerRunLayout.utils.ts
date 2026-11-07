import { runLine, stageStarts } from './careerRunLine.utils';
import {
  BUILDING,
  CRANE,
  LEVELS,
  NEXT_ROOF_WIDTH,
  TOWER_WIDTH,
  WORLD_MARGIN,
} from './careerRunScene.constants';
import type {
  CareerRunLayout,
  Facade,
  RunBuilding,
  RunRoof,
  RunSegment,
  WorldBox,
} from './careerRunScene.types';

// The static scene and the motion layer both use it, so they always agree, and a new job in
// the content gets its building without new numbers.

function levelHeight(level: number): number {
  return LEVELS.first + LEVELS.step * level;
}

// One building per job, side by side, with a tower on the right end for each promotion.
function runBuildings(roleCounts: readonly number[]): RunBuilding[] {
  const buildings: RunBuilding[] = [];
  let x: number = 0;
  let level: number = 0;
  roleCounts.forEach((roles: number, index: number): void => {
    const promotions: number = Math.max(0, roles - 1);
    const baseWidth: number =
      promotions > 0 ? BUILDING.promotedBase : BUILDING.width;
    const towers: Facade[] = [];
    for (let tower: number = 0; tower < promotions; tower += 1) {
      towers.push({
        x: x + baseWidth + tower * TOWER_WIDTH,
        width: TOWER_WIDTH,
        height: levelHeight(level + tower + 1),
      });
    }
    const width: number = baseWidth + promotions * TOWER_WIDTH;
    buildings.push({
      key: String(index),
      x,
      width,
      baseWidth,
      height: levelHeight(level),
      towers,
    });
    x += width + BUILDING.gap;
    level += roles;
  });
  return buildings;
}

function runRoofs(buildings: readonly RunBuilding[]): RunRoof[] {
  return buildings.flatMap((building: RunBuilding): RunRoof[] => [
    {
      left: building.x,
      right: building.x + building.baseWidth,
      height: building.height,
      isTower: false,
    },
    ...building.towers.map((tower: Facade): RunRoof => ({
      left: tower.x,
      right: tower.x + tower.width,
      height: tower.height,
      isTower: true,
    })),
  ]);
}

function worldBox(next: Facade): WorldBox {
  const minX: number = -WORLD_MARGIN.side;
  const minY: number = -(next.height + CRANE.rise + WORLD_MARGIN.above);
  return {
    minX,
    minY,
    width: next.x + next.width + WORLD_MARGIN.side - minX,
    height: WORLD_MARGIN.below - minY,
  };
}

export function careerRunLayout(
  roleCounts: readonly number[],
): CareerRunLayout {
  const buildings: RunBuilding[] = runBuildings(roleCounts);
  const roofs: RunRoof[] = runRoofs(buildings);
  const last: RunBuilding | undefined = buildings.at(-1);
  const next: Facade = {
    x: last === undefined ? 0 : last.x + last.width + BUILDING.gap,
    width: NEXT_ROOF_WIDTH,
    height: levelHeight(roofs.length),
  };
  const line: RunSegment[] = runLine(roofs);
  const length: number = line.reduce(
    (total: number, segment: RunSegment): number => total + segment.length,
    0,
  );
  return {
    buildings,
    next,
    roofs,
    line,
    length,
    stageStarts: stageStarts(line, length),
    box: worldBox(next),
  };
}
