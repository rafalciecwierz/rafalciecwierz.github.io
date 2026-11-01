// One step of a GSAP keyframe animation: the values the element reaches at that point.
export type Keyframe = Readonly<Record<string, number>>;

// GSAP's percentage keyframes: "0%" is the start, "100%" the end. easeEach is the ease between
// two keyframes.
export type PercentKeyframes = Readonly<{
  [percent: `${number}%`]: Keyframe;
  easeEach: string;
}>;
