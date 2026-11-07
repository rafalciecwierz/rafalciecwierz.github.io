import { describe, expect, it } from 'vitest';

import { craneOver } from './careerRunCrane.utils';
import type { Crane, Facade } from './careerRunScene.types';

const ROOF: Facade = { x: 2210, width: 300, height: 680 };
const CRANE_SHAPE: Crane = craneOver(ROOF);

function pointsOf(path: string): [number, number][] {
  const numbers: number[] = path
    .replace(/[ML]/g, ' ')
    .trim()
    .split(/\s+/)
    .map(Number);
  const points: [number, number][] = [];
  for (let index: number = 0; index < numbers.length; index += 2) {
    points.push([numbers[index] ?? 0, numbers[index + 1] ?? 0]);
  }
  return points;
}

describe('craneOver', (): void => {
  it('stands its mast on the street, 40 units in from the roof edge', (): void => {
    expect(CRANE_SHAPE.frame).toContain('M2463 0 L2463 -860');
    expect(CRANE_SHAPE.frame).toContain('M2477 0 L2477 -860');
  });

  it('reaches its jib past the roof and its counter-jib behind the mast, under a peak', (): void => {
    const xs: number[] = pointsOf(CRANE_SHAPE.frame).map(
      ([x]: [number, number]): number => x,
    );
    expect(Math.min(...xs)).toBe(2030);
    expect(Math.max(...xs)).toBe(2570);
    expect(CRANE_SHAPE.frame).toContain('L2470 -920');
  });

  it('keeps the lattice inside the frame', (): void => {
    for (const [x, y] of pointsOf(CRANE_SHAPE.lattice)) {
      expect(x).toBeGreaterThanOrEqual(2030);
      expect(x).toBeLessThanOrEqual(2570);
      expect(y).toBeGreaterThanOrEqual(-876);
      expect(y).toBeLessThanOrEqual(0);
    }
  });

  it('hangs the beam under the trolley, above the roof it is building', (): void => {
    const { trolley, block, load }: Crane = CRANE_SHAPE;

    expect(trolley.x + trolley.width / 2).toBe(2090);
    expect(block.x + block.width / 2).toBe(2090);
    expect(load.x + load.width / 2).toBe(2090);
    expect(load.y + load.height).toBeLessThan(-ROOF.height);
  });

  it('puts the counterweight on the end of the counter-jib', (): void => {
    expect(CRANE_SHAPE.weight.x + CRANE_SHAPE.weight.width).toBe(2570);
    expect(CRANE_SHAPE.weight.y).toBe(-860);
  });
});
