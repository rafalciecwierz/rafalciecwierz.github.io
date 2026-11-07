export type Keyframe = Readonly<Record<string, number>>;

export type PercentKeyframes = Readonly<{
  [percent: `${number}%`]: Keyframe;
  easeEach: string;
}>;
