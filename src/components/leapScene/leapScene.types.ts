import type { ReactNode, Ref } from 'react';

export type SceneRect = {
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RoofSpec = {
  left: number;
  right: number;
  top: number;
};

export type LeapSceneProps = {
  // The signs on the two roofs: where he comes from, where he lands.
  signs: readonly [string, string];
  // "Replay the leap": shown only once the motion layer can play it.
  replayLabel: string;
  // The scene's frame, for the motion layer that plays the jump.
  ref?: Ref<HTMLDivElement> | undefined;
  // The motion layer, placed inside the frame so its drawing lines up with the scene.
  children?: ReactNode;
};

export type LeapRoofProps = {
  roof: RoofSpec;
  sign: string;
  // The sign sits at the roof's right end (the take-off roof) or its left end (the landing).
  signAlign: 'start' | 'end';
  // Unique per scene, so two scenes on a page never share a pattern.
  patternId: string;
};
