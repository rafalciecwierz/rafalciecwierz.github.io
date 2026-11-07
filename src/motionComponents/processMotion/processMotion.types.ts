import type { RunnerRigHandle } from '@/components';

export type LeapParts = {
  staticCamera: Element;
  fog: HTMLElement | SVGElement;
  camera: SVGGElement;
  rig: RunnerRigHandle;
  ghosts: readonly RunnerRigHandle[];
  vignette: SVGRectElement;
};

export type LeapTargets = {
  staticCamera: Element;
  fog: HTMLElement | SVGElement;
  staticRunner: Element;
  replayBox: Element;
  replayButton: HTMLButtonElement;
};
