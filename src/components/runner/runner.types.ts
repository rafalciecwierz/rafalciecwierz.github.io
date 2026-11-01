import type { Ref } from 'react';

import type { MotionTarget } from '@/constants';

// Ten joint angles in degrees: lean, head, then shoulder and elbow of the near arm, of the far
// arm, then hip and knee of the near leg and of the far leg.
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

// The figure solved from a pose, with the hip at (0, 0) and y growing downwards (SVG).
export type RunnerBody = {
  shoulder: Point;
  head: Point;
  nearArm: readonly Point[];
  farArm: readonly Point[];
  nearLeg: readonly Point[];
  farLeg: readonly Point[];
};

// The area the figure covers, for the SVG viewBox. The hip is centred horizontally, and the
// bottom edge is where the feet touch the ground.
export type RunnerBox = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

// profile: seen from the side, the far arm and leg darker for depth. front: facing the viewer,
// both sides in one tone.
export type RunnerTone = 'profile' | 'front';

export type RunnerFigureProps = {
  pose: PoseName;
  tone?: RunnerTone | undefined;
};

export type RunnerProps = {
  pose: PoseName;
  tone?: RunnerTone | undefined;
  // Where and how big, from the parent's CSS Module.
  className?: string | undefined;
  // Marks him for a motion component that animates this scene (docs/ARCHITECTURE.md section 9).
  motionTarget?: MotionTarget | undefined;
};

// The parts of the figure that move, as RunnerFigure marks them (`data-rig-part`), so the rig
// can find and redraw them.
export type RigPart =
  'farLeg' | 'farArm' | 'torso' | 'nearLeg' | 'nearArm' | 'head';

// The SVG attributes that draw each part for one pose.
export type RigPartAttributes = Readonly<
  Record<RigPart, Readonly<Record<string, string>>>
>;

// Where the rig stands and what it does in one frame. x and y are where his feet touch the
// ground, in the scene's units. spin turns the whole figure (a roll) around the middle of his
// torso. When he is grounded during a spin, the lowest point of the turned figure (his back,
// his hands) touches the ground instead of his feet.
export type RigState = {
  x: number;
  y: number;
  pose: Pose;
  scale: number;
  spin: number;
  isGrounded: boolean;
};

// What a RunnerRig lets motion code do with it, 60 times a second, without a React render.
export type RunnerRigHandle = {
  set: (state: RigState) => void;
  setOpacity: (opacity: number) => void;
};

export type RunnerRigProps = {
  ref?: Ref<RunnerRigHandle> | undefined;
  tone?: RunnerTone | undefined;
};
