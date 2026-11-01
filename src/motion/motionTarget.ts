import { MOTION_TARGET_ATTRIBUTE, type MotionTarget } from '@/constants';

// The element marked with `data-motion-target="<name>"` inside a motion component's scope,
// or null when the static component has none (docs/ARCHITECTURE.md section 9).
export function motionTarget(
  scope: Element,
  name: MotionTarget,
): HTMLElement | SVGElement | null {
  return scope.querySelector<HTMLElement | SVGElement>(
    `[${MOTION_TARGET_ATTRIBUTE}="${name}"]`,
  );
}

// Every element marked with this name inside the scope, in document order.
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

// Whether an element starts below the bottom of the screen. An entrance animation may hide an
// element only then; anything already on screen keeps its final state (section 9).
export function isBelowViewport(element: Element): boolean {
  return element.getBoundingClientRect().top >= window.innerHeight;
}
