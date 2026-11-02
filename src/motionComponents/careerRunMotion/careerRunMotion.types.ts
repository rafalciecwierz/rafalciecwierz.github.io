import type { RigState, RunnerRigHandle } from '@/components';

// Where the runner is at one point of the run: his place on the line (x), how high his feet
// are (height), the roof under him (ground, which the camera follows), his pose, and the stage
// whose card is shown.
export type RunFrame = {
  x: number;
  height: number;
  ground: number;
  pose: RigState['pose'];
  stage: number;
};

// The camera for one window size: how big the world is drawn and where his feet are kept.
export type RunView = {
  scale: number;
  anchorX: number;
  anchorY: number;
};

// A layer's top left corner in its own units, read from its viewBox.
export type LayerOrigin = {
  minX: number;
  minY: number;
};

// The card for a stage: its index among the move cards (newest first, the next roof at 0) and
// which of its roles the runner is on.
export type StageCard = {
  card: number;
  role: number;
};

// The static page's parts the run moves, found by their motion target names.
export type RunTargets = {
  world: SVGSVGElement;
  far: SVGSVGElement;
  fill: HTMLElement;
  skip: HTMLElement;
  ticks: readonly HTMLElement[];
  moves: readonly HTMLElement[];
};

// Everything one frame of the run changes.
export type RunParts = {
  world: SVGSVGElement;
  far: SVGSVGElement;
  fill: HTMLElement;
  camera: SVGGElement;
  rig: RunnerRigHandle;
};
