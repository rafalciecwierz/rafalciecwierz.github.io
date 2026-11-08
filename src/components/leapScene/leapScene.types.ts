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
  signs: readonly [string, string];
  replayLabel: string;
  ref?: Ref<HTMLDivElement> | undefined;
  children?: ReactNode;
};

export type LeapRoofProps = {
  roof: RoofSpec;
  sign: string;
  signAlign: 'start' | 'end';
  patternId: string;
};
