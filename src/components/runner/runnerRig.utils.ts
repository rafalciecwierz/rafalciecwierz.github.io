import { lerp } from '@/utils';

import {
  DEGREES_TO_RADIANS,
  FOOT_REACH,
  POSE_LENGTH,
  SCALE_DECIMALS,
  SIDES,
} from './runner.constants';
import type {
  Point,
  Pose,
  RigPartAttributes,
  RigState,
  RunnerBody,
} from './runner.types';
import { pointsAttribute } from './runner.utils';

// Pure functions behind RunnerRig: they turn a frame of motion (RigState) into SVG attributes.
// Keeping them pure lets the tests check the maths without a browser.

function isPose(angles: readonly number[]): angles is Pose {
  return angles.length === POSE_LENGTH;
}

// Blends two poses angle by angle: 0 gives `from`, 1 gives `to`. Every move of the runner is
// a chain of these blends between the keyframe poses in POSES.
export function mixPose(from: Pose, to: Pose, amount: number): Pose {
  const mixed: number[] = from.map((angle: number, index: number): number =>
    lerp(angle, to[index] ?? angle, amount),
  );
  return isPose(mixed) ? mixed : from;
}

// The middle of the torso: the point he turns around in a roll or a flip.
export function spinCentre(body: RunnerBody): Point {
  return [body.shoulder[0] / SIDES, body.shoulder[1] / SIDES];
}

// Every joint of the figure, for finding its lowest point.
function joints(body: RunnerBody): Point[] {
  return [
    [0, 0],
    body.shoulder,
    body.head,
    ...body.nearArm,
    ...body.farArm,
    ...body.nearLeg,
    ...body.farLeg,
  ];
}

// How far below the hip the ground is. Normally that is the lower ankle plus the foot's
// stroke. In a grounded roll the figure is turned, so the ground is under its lowest turned
// joint (for example his back), and he rolls along the street instead of sinking into it.
export function rigFoot(
  body: RunnerBody,
  spin: number,
  isGrounded: boolean,
): number {
  if (!isGrounded || spin === 0) {
    return (
      Math.max(body.nearLeg[2]?.[1] ?? 0, body.farLeg[2]?.[1] ?? 0) + FOOT_REACH
    );
  }
  const [centreX, centreY] = spinCentre(body);
  const angle: number = spin * DEGREES_TO_RADIANS;
  const turnedHeights: number[] = joints(body).map(
    ([x, y]: Point): number =>
      centreY +
      (x - centreX) * Math.sin(angle) +
      (y - centreY) * Math.cos(angle),
  );
  return Math.max(...turnedHeights) + FOOT_REACH;
}

// The transform that places the figure: its feet (or its lowest point in a roll) at (x, y),
// scaled. The figure is drawn with its hip at (0, 0), so it is lifted by `foot` first.
export function rigTransform(state: RigState, foot: number): string {
  return `translate(${state.x.toFixed(1)} ${state.y.toFixed(1)}) scale(${state.scale.toFixed(SCALE_DECIMALS)}) translate(0 ${(-foot).toFixed(1)})`;
}

// The rotation of a roll or a flip, around the middle of the torso; none when he is upright.
export function spinTransform(body: RunnerBody, spin: number): string {
  if (spin === 0) {
    return '';
  }
  const [centreX, centreY] = spinCentre(body);
  return `rotate(${spin.toFixed(1)} ${centreX.toFixed(1)} ${centreY.toFixed(1)})`;
}

// The attributes that draw each part of the figure, matching RunnerFigure's elements.
export function rigPartAttributes(body: RunnerBody): RigPartAttributes {
  return {
    farLeg: { points: pointsAttribute(body.farLeg) },
    farArm: { points: pointsAttribute(body.farArm) },
    torso: {
      x2: body.shoulder[0].toFixed(1),
      y2: body.shoulder[1].toFixed(1),
    },
    nearLeg: { points: pointsAttribute(body.nearLeg) },
    nearArm: { points: pointsAttribute(body.nearArm) },
    head: { cx: body.head[0].toFixed(1), cy: body.head[1].toFixed(1) },
  };
}
