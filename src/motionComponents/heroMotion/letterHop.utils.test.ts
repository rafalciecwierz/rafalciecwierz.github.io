import { describe, expect, it } from 'vitest';

import { POSES } from '@/components';

import type { GlyphTop, RigSpot } from './heroMotion.types';
import {
  glyphTop,
  jumpArc,
  jumpDuration,
  jumpPose,
  jumpState,
  rigScale,
} from './letterHop.utils';

const SPOT: RigSpot = { x: 100, y: 200, scale: 0.8, facing: 1 };

// A 6 × 6 canvas with ink (alpha 255) at the given cells.
function canvasWith(
  cells: readonly (readonly [number, number])[],
): Uint8ClampedArray {
  const pixels: Uint8ClampedArray = new Uint8ClampedArray(6 * 6 * 4);
  for (const [x, y] of cells) {
    pixels[(y * 6 + x) * 4 + 3] = 255;
  }
  return pixels;
}

describe('glyphTop', (): void => {
  it('finds the highest edge and the middle of the columns that reach it', (): void => {
    // A stem two pixels wide from row 1, and a lower bowl from row 3.
    const top: GlyphTop = glyphTop(
      canvasWith([
        [1, 1],
        [2, 1],
        [1, 2],
        [2, 2],
        [4, 3],
        [5, 3],
      ]),
      6,
      6,
      5,
    );

    expect(top).toEqual({ x: 1.5, top: -4 });
  });
});

describe('rigScale, jumpArc and jumpDuration', (): void => {
  it('sizes him by the sign and keeps him within limits', (): void => {
    expect(rigScale(92 * 2)).toBeCloseTo(1);
    expect(rigScale(10)).toBe(0.32);
    expect(rigScale(1000)).toBe(1.05);
  });

  it('jumps higher and longer over a longer distance, up to a limit', (): void => {
    expect(jumpArc(200, 0.8)).toBeGreaterThan(jumpArc(50, 0.8));
    expect(jumpDuration(0)).toBe(0.33);
    expect(jumpDuration(5000)).toBe(0.9);
  });
});

describe('jumpState', (): void => {
  it('starts at the spot, lands on the platform, and is above the line mid-air', (): void => {
    const to: { x: number; y: number } = { x: 300, y: 180 };

    expect(jumpState(SPOT, to, 40, jumpPose, 0)).toMatchObject({
      x: 100,
      y: 200,
    });
    expect(jumpState(SPOT, to, 40, jumpPose, 1)).toMatchObject({
      x: 300,
      y: 180,
    });
    expect(jumpState(SPOT, to, 40, jumpPose, 0.5).y).toBe(190 - 40);
    expect(jumpPose(1)).toEqual(POSES.land);
  });
});
