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
};

export type LeapRoofProps = {
  roof: RoofSpec;
  sign: string;
  // The sign sits at the roof's right end (the take-off roof) or its left end (the landing).
  signAlign: 'start' | 'end';
  // Unique per scene, so two scenes on a page never share a pattern.
  patternId: string;
};
