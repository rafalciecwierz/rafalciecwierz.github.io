import type { RigState, RunnerRigHandle } from '@/components';

export type StreetGeometry = {
  x: number;
  ground: number;
  scale: number;
};

export type LandingStep = (
  geometry: StreetGeometry,
  progress: number,
) => RigState;

export type FooterLandingOptions = {
  rig: RunnerRigHandle;
  geometry: StreetGeometry;
  onTurn: () => void;
  onGreet: () => void;
  onEnd: () => void;
};
