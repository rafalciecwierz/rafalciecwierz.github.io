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
};
