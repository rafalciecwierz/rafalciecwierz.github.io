import type { RunnerRigHandle } from '@/components';

// Everything one frame of the leap changes: the static scene's camera group and fog, and the
// motion layer's own camera group, runner, after-images and vignette.
export type LeapParts = {
  staticCamera: Element;
  fog: HTMLElement | SVGElement;
  camera: SVGGElement;
  rig: RunnerRigHandle;
  ghosts: readonly RunnerRigHandle[];
  vignette: SVGRectElement;
};

// The static scene's parts the leap uses, found by their motion target names.
export type LeapTargets = {
  staticCamera: Element;
  fog: HTMLElement | SVGElement;
  staticRunner: Element;
  replayBox: Element;
  replayButton: HTMLButtonElement;
};
