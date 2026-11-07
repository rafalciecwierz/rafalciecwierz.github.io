import type { Ref } from 'react';

import type { MotionTarget } from '@/constants';

export type Pose = readonly [
  lean: number,
  head: number,
  nearShoulder: number,
  nearElbow: number,
  farShoulder: number,
  farElbow: number,
  nearHip: number,
  nearKnee: number,
  farHip: number,
  farKnee: number,
];

export type PoseName =
  | 'stand'
  | 'crouch'
  | 'reach'
  | 'tuck'
  | 'land'
  | 'runA'
  | 'runB'
  | 'kong'
  | 'hand'
  | 'front'
  | 'wave';

export type Point = readonly [x: number, y: number];

export type RunnerBody = {
  shoulder: Point;
  head: Point;
  nearArm: readonly Point[];
  farArm: readonly Point[];
  nearLeg: readonly Point[];
  farLeg: readonly Point[];
};

export type RunnerBox = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

export type RunnerTone = 'profile' | 'front';

export type RunnerFigureProps = {
  pose: PoseName;
  tone?: RunnerTone | undefined;
};

export type RunnerProps = {
  pose: PoseName;
  tone?: RunnerTone | undefined;
  className?: string | undefined;
  motionTarget?: MotionTarget | undefined;
};

export type RigPart =
  'farLeg' | 'farArm' | 'torso' | 'nearLeg' | 'nearArm' | 'head';

export type RigPartAttributes = Readonly<
  Record<RigPart, Readonly<Record<string, string>>>
>;

export type RigState = {
  x: number;
  y: number;
  pose: Pose;
  scale: number;
  spin: number;
  isGrounded: boolean;
  facing?: Facing;
};

export type Facing = 1 | -1;

export type RunnerRigHandle = {
  set: (state: RigState) => void;
  setOpacity: (opacity: number) => void;
};

export type RunnerRigProps = {
  ref?: Ref<RunnerRigHandle> | undefined;
  tone?: RunnerTone | undefined;
};
