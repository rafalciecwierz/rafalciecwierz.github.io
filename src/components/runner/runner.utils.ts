import {
  DEGREES_TO_RADIANS,
  FOOT_REACH,
  HEAD_RADIUS,
  LIMBS,
  SIDES,
  STROKE_REACH,
} from './runner.constants';
import type { Point, Pose, RunnerBody, RunnerBox } from './runner.types';

// An arm hangs from the shoulder: the shoulder angle turns the upper arm, and the elbow angle
// turns the forearm further. An angle of 0 points straight down.
function solveArm(
  shoulder: Point,
  shoulderAngle: number,
  elbowAngle: number,
): Point[] {
  const elbow: Point = [
    shoulder[0] + Math.sin(shoulderAngle) * LIMBS.upperArm,
    shoulder[1] + Math.cos(shoulderAngle) * LIMBS.upperArm,
  ];
  const hand: Point = [
    elbow[0] + Math.sin(shoulderAngle + elbowAngle) * LIMBS.forearm,
    elbow[1] + Math.cos(shoulderAngle + elbowAngle) * LIMBS.forearm,
  ];
  return [shoulder, elbow, hand];
}

// A leg hangs from the hip the same way, and ends with the foot pointing forward.
function solveLeg(hipAngle: number, kneeAngle: number): Point[] {
  const knee: Point = [
    Math.sin(hipAngle) * LIMBS.thigh,
    Math.cos(hipAngle) * LIMBS.thigh,
  ];
  const ankle: Point = [
    knee[0] + Math.sin(hipAngle + kneeAngle) * LIMBS.shin,
    knee[1] + Math.cos(hipAngle + kneeAngle) * LIMBS.shin,
  ];
  const toe: Point = [ankle[0] + LIMBS.foot, ankle[1]];
  return [[0, 0], knee, ankle, toe];
}

// Forward kinematics: from the ten angles of a pose to the position of every joint, with the
// hip at (0, 0). Pure, so the build and the browser draw the same figure.
export function solvePose(pose: Pose): RunnerBody {
  const [
    lean,
    head,
    nearShoulder,
    nearElbow,
    farShoulder,
    farElbow,
    nearHip,
    nearKnee,
    farHip,
    farKnee,
  ] = pose.map((degrees: number): number => degrees * DEGREES_TO_RADIANS);
  const leanAngle: number = lean ?? 0;
  const shoulder: Point = [
    Math.sin(leanAngle) * LIMBS.torso,
    -Math.cos(leanAngle) * LIMBS.torso,
  ];
  const headAngle: number = leanAngle + (head ?? 0);
  const headReach: number = LIMBS.neck + LIMBS.head;

  return {
    shoulder,
    head: [
      shoulder[0] + Math.sin(headAngle) * headReach,
      shoulder[1] - Math.cos(headAngle) * headReach,
    ],
    nearArm: solveArm(shoulder, nearShoulder ?? 0, nearElbow ?? 0),
    farArm: solveArm(shoulder, farShoulder ?? 0, farElbow ?? 0),
    nearLeg: solveLeg(nearHip ?? 0, nearKnee ?? 0),
    farLeg: solveLeg(farHip ?? 0, farKnee ?? 0),
  };
}

// The viewBox for a solved figure. It is symmetric around the hip, so the figure can be placed
// by its hip; its bottom edge is the ground the feet stand on (the lower ankle).
export function runnerBox(body: RunnerBody): RunnerBox {
  const joints: Point[] = [
    [0, 0],
    body.shoulder,
    ...body.nearArm,
    ...body.farArm,
    ...body.nearLeg,
    ...body.farLeg,
  ];
  const halfWidth: number = Math.max(
    ...joints.map((joint: Point): number => Math.abs(joint[0]) + STROKE_REACH),
    Math.abs(body.head[0]) + HEAD_RADIUS,
  );
  const top: number = Math.min(
    ...joints.map((joint: Point): number => joint[1] - STROKE_REACH),
    body.head[1] - HEAD_RADIUS,
  );
  const ground: number =
    Math.max(body.nearLeg[2]?.[1] ?? 0, body.farLeg[2]?.[1] ?? 0) + FOOT_REACH;

  return {
    minX: -halfWidth,
    minY: top,
    width: halfWidth * SIDES,
    height: ground - top,
  };
}

// "x,y x,y" for an SVG polyline, one decimal: precise enough to see, short in the HTML.
export function pointsAttribute(points: readonly Point[]): string {
  return points
    .map(
      (point: Point): string => `${point[0].toFixed(1)},${point[1].toFixed(1)}`,
    )
    .join(' ');
}

// The SVG viewBox attribute for a box, one decimal.
export function viewBoxAttribute(box: RunnerBox): string {
  return [box.minX, box.minY, box.width, box.height]
    .map((value: number): string => value.toFixed(1))
    .join(' ');
}
