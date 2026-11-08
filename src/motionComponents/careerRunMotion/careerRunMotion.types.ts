import type { RigState, RunnerRigHandle } from '@/components';

export type RunFrame = {
  x: number;
  height: number;
  ground: number;
  pose: RigState['pose'];
  stage: number;
};

export type RunView = {
  scale: number;
  anchorX: number;
  anchorY: number;
};

export type LayerOrigin = {
  minX: number;
  minY: number;
};

export type StageCard = {
  card: number;
  role: number;
};

export type RunTargets = {
  world: SVGSVGElement;
  far: SVGSVGElement;
  fill: HTMLElement;
  skip: HTMLElement;
  ticks: readonly HTMLElement[];
  moves: readonly HTMLElement[];
};

export type RunParts = {
  world: SVGSVGElement;
  far: SVGSVGElement;
  fill: HTMLElement;
  camera: SVGGElement;
  rig: RunnerRigHandle;
};
