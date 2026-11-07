import type { CareerRunLayout } from '@/components';
import { MOTION_TARGETS } from '@/constants';
import { gsap } from '@/motion/gsap';
import { motionTarget, motionTargets } from '@/motion/motionTarget';

import { FAR_LAYER, RIG_SCALE, SCALE_DECIMALS } from './careerRun.constants';
import { runnerAt } from './careerRun.utils';
import { layerTransform, rigCameraTransform } from './careerRunCamera.utils';
import type {
  LayerOrigin,
  RunFrame,
  RunParts,
  RunTargets,
  RunView,
} from './careerRunMotion.types';

// Null when a part is missing: then the run does not start and the list stays as it is.
export function findRunTargets(section: Element): RunTargets | null {
  const world: Element | null = motionTarget(
    section,
    MOTION_TARGETS.careerWorld,
  );
  const far: Element | null = motionTarget(section, MOTION_TARGETS.careerFar);
  const fill: Element | null = motionTarget(
    section,
    MOTION_TARGETS.careerBarFill,
  );
  const skip: Element | null = motionTarget(section, MOTION_TARGETS.careerSkip);
  if (
    !(world instanceof SVGSVGElement) ||
    !(far instanceof SVGSVGElement) ||
    !(fill instanceof HTMLElement) ||
    !(skip instanceof HTMLElement)
  ) {
    return null;
  }
  return {
    world,
    far,
    fill,
    skip,
    ticks: motionTargets(section, MOTION_TARGETS.careerTick),
    moves: motionTargets(section, MOTION_TARGETS.careerMove),
  };
}

function originOf(svg: SVGSVGElement): LayerOrigin {
  const { x, y }: DOMRect = svg.viewBox.baseVal;
  return { minX: x, minY: y };
}

// Only transforms change, so nothing on the page is laid out again.
export function drawRun(
  parts: RunParts,
  layout: CareerRunLayout,
  view: RunView,
  progress: number,
): RunFrame {
  const frame: RunFrame = runnerAt(layout, progress);
  parts.world.style.transform = layerTransform(
    { x: frame.x, y: -frame.ground },
    originOf(parts.world),
    view,
  );
  parts.far.style.transform = layerTransform(
    {
      x: frame.x * FAR_LAYER.parallaxX,
      y: -frame.ground * FAR_LAYER.parallaxY - FAR_LAYER.drop,
    },
    originOf(parts.far),
    { ...view, scale: view.scale * FAR_LAYER.scale },
  );
  parts.camera.setAttribute('transform', rigCameraTransform(frame, view));
  parts.rig.set({
    x: frame.x,
    y: -frame.height,
    pose: frame.pose,
    scale: RIG_SCALE,
    spin: 0,
    isGrounded: false,
  });
  parts.fill.style.transform = `scaleX(${progress.toFixed(SCALE_DECIMALS)})`;
  return frame;
}

// The section's screen sticks with CSS position: sticky, so the browser keeps it in place with
// no layout shift and no lag. ScrollTrigger only scrubs a progress value from 0 to 1.
export function createCareerRun(
  section: HTMLElement,
  onProgress: (progress: number) => void,
  onRefresh: () => void,
): gsap.core.Tween {
  const clock: { progress: number } = { progress: 0 };
  return gsap.to(clock, {
    progress: 1,
    ease: 'none',
    onUpdate: (): void => {
      onProgress(clock.progress);
    },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onRefresh,
    },
  });
}
