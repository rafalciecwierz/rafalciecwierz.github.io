import { describe, expect, it } from 'vitest';

import { LIMBS, POSES } from './runner.constants';
import type { Point, RunnerBody, RunnerBox } from './runner.types';
import { pointsAttribute, runnerBox, solvePose } from './runner.utils';

function distance(from: Point, to: Point): number {
  return Math.hypot(to[0] - from[0], to[1] - from[1]);
}

describe('solvePose', (): void => {
  it('puts the shoulder a torso length from the hip, leaning by the first angle', (): void => {
    const body: RunnerBody = solvePose(POSES.stand);

    expect(distance([0, 0], body.shoulder)).toBeCloseTo(LIMBS.torso);
    expect(body.shoulder[0]).toBeGreaterThan(0); // leans forward, to the right
    expect(body.shoulder[1]).toBeLessThan(0); // above the hip
  });

  it('keeps every limb its length, whatever the pose', (): void => {
    const body: RunnerBody = solvePose(POSES.crouch);
    const [hip, knee, ankle] = body.nearLeg;
    const [shoulder, elbow, hand] = body.farArm;

    expect(distance(hip ?? [0, 0], knee ?? [0, 0])).toBeCloseTo(LIMBS.thigh);
    expect(distance(knee ?? [0, 0], ankle ?? [0, 0])).toBeCloseTo(LIMBS.shin);
    expect(distance(shoulder ?? [0, 0], elbow ?? [0, 0])).toBeCloseTo(
      LIMBS.upperArm,
    );
    expect(distance(elbow ?? [0, 0], hand ?? [0, 0])).toBeCloseTo(
      LIMBS.forearm,
    );
  });
});

describe('runnerBox', (): void => {
  it('centres the hip and puts the ground at the bottom edge', (): void => {
    const box: RunnerBox = runnerBox(solvePose(POSES.crouch));

    expect(box.minX + box.width / 2).toBeCloseTo(0);
    expect(box.minY).toBeLessThan(0);
    expect(box.height).toBeGreaterThan(0);
  });
});

describe('pointsAttribute', (): void => {
  it('writes points the way an SVG polyline reads them, rounded to one decimal', (): void => {
    expect(
      pointsAttribute([
        [0, 0],
        [1.234, -5.678],
      ]),
    ).toBe('0.0,0.0 1.2,-5.7');
  });
});
