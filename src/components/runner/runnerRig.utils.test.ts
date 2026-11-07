import { describe, expect, it } from 'vitest';

import { FOOT_REACH, POSES } from './runner.constants';
import type {
  Pose,
  RigPartAttributes,
  RigState,
  RunnerBody,
  RunnerBox,
} from './runner.types';
import { runnerBox, solvePose } from './runner.utils';
import {
  mixPose,
  rigFoot,
  rigPartAttributes,
  rigTransform,
  spinCentre,
  spinTransform,
  wavePose,
} from './runnerRig.utils';

const STATE: RigState = {
  x: 120,
  y: 170,
  pose: POSES.stand,
  scale: 1.5,
  spin: 0,
  isGrounded: false,
};

describe('mixPose', (): void => {
  it('gives the first pose at 0, the second at 1 and the halfway angles at 0.5', (): void => {
    expect(mixPose(POSES.stand, POSES.crouch, 0)).toEqual(POSES.stand);
    expect(mixPose(POSES.stand, POSES.crouch, 1)).toEqual(POSES.crouch);

    const half: Pose = mixPose(POSES.stand, POSES.crouch, 0.5);
    expect(half[0]).toBe((POSES.stand[0] + POSES.crouch[0]) / 2);
    expect(half).toHaveLength(POSES.stand.length);
  });
});

describe('rigFoot', (): void => {
  it('puts the ground where the static Runner puts it', (): void => {
    const body: RunnerBody = solvePose(POSES.stand);
    const box: RunnerBox = runnerBox(body);

    expect(rigFoot(body, 0, false)).toBeCloseTo(box.minY + box.height);
  });

  it('ignores the spin in the air', (): void => {
    const body: RunnerBody = solvePose(POSES.tuck);

    expect(rigFoot(body, 180, false)).toBe(rigFoot(body, 0, false));
  });

  it('puts the ground under the lowest turned joint in a grounded roll', (): void => {
    const body: RunnerBody = solvePose(POSES.hand);
    const [, centreY] = spinCentre(body);
    const handY: number = Math.min(
      body.nearArm[2]?.[1] ?? 0,
      body.farArm[2]?.[1] ?? 0,
    );

    expect(rigFoot(body, 360, true)).toBeCloseTo(rigFoot(body, 0, false));
    expect(rigFoot(body, 180, true)).toBeCloseTo(
      centreY + (centreY - handY) + FOOT_REACH,
    );
  });
});

describe('rigTransform and spinTransform', (): void => {
  it('places the feet at (x, y) and scales the figure', (): void => {
    expect(rigTransform(STATE, 60)).toBe(
      'translate(120.0 170.0) scale(1.500 1.500) translate(0 -60.0)',
    );
  });

  it('mirrors him when he faces left', (): void => {
    expect(rigTransform({ ...STATE, facing: -1 }, 60)).toContain(
      'scale(-1.500 1.500)',
    );
  });

  it('turns around the middle of the torso, and not at all when upright', (): void => {
    const body: RunnerBody = solvePose(POSES.stand);

    expect(spinTransform(body, 0)).toBe('');
    expect(spinTransform(body, 90)).toMatch(/^rotate\(90\.0 /);
  });
});

describe('rigPartAttributes', (): void => {
  it('draws every part the figure has', (): void => {
    const attributes: RigPartAttributes = rigPartAttributes(
      solvePose(POSES.wave),
    );

    expect(Object.keys(attributes).sort()).toEqual(
      ['farArm', 'farLeg', 'head', 'nearArm', 'nearLeg', 'torso'].sort(),
    );
    expect(attributes.nearArm.points).toMatch(/^-?\d+\.\d,-?\d+\.\d /);
  });
});

describe('wavePose', (): void => {
  it('starts and ends on the still waving pose, and swings the arm between', (): void => {
    const start: Pose = wavePose(0);
    const end: Pose = wavePose(1);

    start.forEach((angle: number, index: number): void => {
      expect(angle).toBeCloseTo(POSES.wave[index] ?? Number.NaN);
      expect(end[index]).toBeCloseTo(POSES.wave[index] ?? Number.NaN);
    });
    expect(wavePose(1 / 12)[5]).toBeCloseTo(38);
  });
});
