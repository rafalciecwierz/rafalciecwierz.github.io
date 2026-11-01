import type { RigState, RunnerRigHandle } from '@/components';

// Where the landing happens, in the street's pixels: his final spot, the street level and
// his size.
export type StreetGeometry = {
  x: number;
  ground: number;
  scale: number;
};

// One part of the landing: the rig's state for progress from 0 to 1.
export type LandingStep = (
  geometry: StreetGeometry,
  progress: number,
) => RigState;

export type FooterLandingOptions = {
  rig: RunnerRigHandle;
  geometry: StreetGeometry;
  // He turns to face the viewer: both sides of the figure in one tone.
  onTurn: () => void;
  // The arm is up: the speech bubble appears.
  onGreet: () => void;
  // The last frame: the static runner takes over from the rig.
  onEnd: () => void;
};
