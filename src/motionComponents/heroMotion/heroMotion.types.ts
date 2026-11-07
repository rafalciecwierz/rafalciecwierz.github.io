import type {
  Facing,
  PoseName,
  RigState,
  RunnerRigHandle,
  RunnerTone,
} from '@/components';

import type { TRICK_ORDER } from './heroMotion.constants';

export type GlyphTop = {
  x: number;
  top: number;
};

export type Platform = {
  x: number;
  y: number;
};

export type RigSpot = {
  x: number;
  y: number;
  scale: number;
  facing: Facing;
};

export type PoseAt = (progress: number) => RigState['pose'];

export type JumpOptions = {
  duration?: number;
  arc?: number;
  poseAt?: PoseAt;
};

export type JumpPoses = readonly [PoseName, PoseName, PoseName, PoseName];

export type RunnerParts = {
  hero: HTMLElement;
  letters: readonly HTMLElement[];
  staticRunner: Element;
  perchIndex: number;
  overlay: SVGSVGElement;
  rigBox: SVGGElement;
  hit: SVGCircleElement;
  rig: RunnerRigHandle;
  setTone: (tone: RunnerTone) => void;
};

export type HeroRunner = {
  sendTo: (index: number) => void;
  playTrick: () => void;
  relayout: () => void;
  prepare: () => void;
  greet: () => void;
};

export type Trick = (typeof TRICK_ORDER)[number];

export type TrickMove = {
  move: gsap.core.Timeline;
  landsOn: number;
  facing: Facing;
};
