import { describe, expect, it } from 'vitest';

import { LEAP_GEOMETRY, POSES, type RigState } from '@/components';

import {
  cameraTransform,
  leapState,
  slowAt,
  timeScaleAt,
} from './gapLeap.utils';

describe('slowAt and timeScaleAt', (): void => {
  it('runs in real time at take-off and landing, and slowest at the apex', (): void => {
    expect(slowAt(0.1)).toBe(0);
    expect(slowAt(0.5)).toBe(1);
    expect(slowAt(0.9)).toBe(0);
    expect(timeScaleAt(0.1)).toBe(1);
    expect(timeScaleAt(0.5)).toBeCloseTo(0.14);
  });
});

describe('leapState', (): void => {
  it('starts standing on the take-off ledge', (): void => {
    expect(leapState(0)).toMatchObject({
      y: LEAP_GEOMETRY.takeOffFeet,
      pose: POSES.stand,
    });
  });

  it('ends where the static scene draws him, so the hand-over is seamless', (): void => {
    const end: RigState = leapState(1);

    expect(end.x).toBe(LEAP_GEOMETRY.landedX);
    expect(end.y).toBe(LEAP_GEOMETRY.landingFeet);
    expect(end.scale).toBe(LEAP_GEOMETRY.scale);
    expect(end.pose).toEqual(POSES.stand);
  });

  it('flies above both ledges in the middle of the flight', (): void => {
    const apex: RigState = leapState(0.5);

    expect(apex.y).toBeLessThan(LEAP_GEOMETRY.landingFeet);
    expect(apex.y).toBeLessThan(LEAP_GEOMETRY.takeOffFeet);
  });

  it('moves forward all the way', (): void => {
    const xs: number[] = [0, 0.2, 0.4, 0.6, 0.8, 1].map(
      (progress: number): number => leapState(progress).x,
    );

    xs.slice(1).forEach((x: number, index: number): void => {
      expect(x).toBeGreaterThanOrEqual(xs[index] ?? 0);
    });
  });
});

describe('cameraTransform', (): void => {
  it('does not zoom in real time and zooms in by 14% at full bullet time', (): void => {
    const state: RigState = leapState(0.5);

    expect(cameraTransform(state, 0)).toContain('scale(1.000)');
    expect(cameraTransform(state, 1)).toContain('scale(1.140)');
  });
});
