import { MOTION_TARGET_ATTRIBUTE, type MotionTarget } from '@/constants';

export function motionTarget(
  scope: Element,
  name: MotionTarget,
): HTMLElement | SVGElement | null {
  return scope.querySelector<HTMLElement | SVGElement>(
    `[${MOTION_TARGET_ATTRIBUTE}="${name}"]`,
  );
}

export function motionTargets(
  scope: Element,
  name: MotionTarget,
): HTMLElement[] {
  return [
    ...scope.querySelectorAll<HTMLElement>(
      `[${MOTION_TARGET_ATTRIBUTE}="${name}"]`,
    ),
  ];
}

// An entrance animation may hide an element only then; anything already on screen keeps its
// final state (docs/ARCHITECTURE.md section 9).
export function isBelowViewport(element: Element): boolean {
  return element.getBoundingClientRect().top >= window.innerHeight;
}
