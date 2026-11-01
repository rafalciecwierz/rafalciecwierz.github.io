import type {
  Facing,
  PoseName,
  RigState,
  RunnerRigHandle,
  RunnerTone,
} from '@/components';

import type { TRICK_ORDER } from './heroMotion.constants';

// The top of a letter's glyph, found by the pixel scan: x is the middle of its highest edge,
// top is how far above the baseline that edge is (a negative number), both in px.
export type GlyphTop = {
  x: number;
  top: number;
};

// A letter the runner can stand on, in the hero's pixels: where his feet go.
export type Platform = {
  x: number;
  y: number;
};

// Where he stands now and how he moves: the start of every move.
export type RigSpot = {
  x: number;
  y: number;
  scale: number;
  facing: Facing;
};

// The pose for each moment (0 to 1) of a jump.
export type PoseAt = (progress: number) => RigState['pose'];

export type JumpOptions = {
  duration?: number;
  arc?: number;
  poseAt?: PoseAt;
};

// The poses a jump blends through, for its default shape.
export type JumpPoses = readonly [PoseName, PoseName, PoseName, PoseName];

// The parts of the hero the runner needs.
export type RunnerParts = {
  hero: HTMLElement;
  letters: readonly HTMLElement[];
  // The perched runner of the static page, and the letter he perches on.
  staticRunner: Element;
  perchIndex: number;
  overlay: SVGSVGElement;
  rigBox: SVGGElement;
  hit: SVGCircleElement;
  rig: RunnerRigHandle;
  // Facing the viewer (the greeting), both sides of the figure share one tone.
  setTone: (tone: RunnerTone) => void;
};

// What HeroMotion can ask the runner to do.
export type HeroRunner = {
  // Jump to the letter at this index.
  sendTo: (index: number) => void;
  // Play the next trick where he stands.
  playTrick: () => void;
  // Measure the sign again (after a resize) and put him back on his letter.
  relayout: () => void;
  // Scan the letters now, if that has not happened yet (in an idle moment).
  prepare: () => void;
  // Wave to the viewer once from the Ł, where the static runner stands.
  greet: () => void;
};

export type Trick = (typeof TRICK_ORDER)[number];

// A trick as a timeline, the letter he ends on, and the way he faces after it.
export type TrickMove = {
  move: gsap.core.Timeline;
  landsOn: number;
  facing: Facing;
};
