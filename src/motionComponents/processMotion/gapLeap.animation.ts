import type { RigState, RunnerRigHandle } from '@/components';
import { MOTION_TARGETS } from '@/constants';
import { gsap } from '@/motion/gsap';
import { motionTarget } from '@/motion/motionTarget';

import {
  DURATION,
  FOG_THINNING,
  GHOST_LAG,
  GHOST_OPACITIES,
  GHOST_THRESHOLD,
  OPACITY_DECIMALS,
  VIGNETTE_STRENGTH,
} from './gapLeap.constants';
import {
  cameraTransform,
  leapState,
  slowAt,
  timeScaleAt,
} from './gapLeap.utils';
import type { LeapParts, LeapTargets } from './processMotion.types';

// The camera and the fog belong to the static scene, so both cameras move together.
export function drawLeap(parts: LeapParts, progress: number): void {
  const state: RigState = leapState(progress);
  const slow: number = slowAt(progress);
  parts.rig.set(state);
  parts.ghosts.forEach((ghost: RunnerRigHandle, index: number): void => {
    ghost.setOpacity((GHOST_OPACITIES[index] ?? 0) * slow);
    if (slow > GHOST_THRESHOLD) {
      ghost.set(leapState(Math.max(0, progress - (index + 1) * GHOST_LAG)));
    }
  });
  const camera: string = cameraTransform(state, slow);
  parts.camera.setAttribute('transform', camera);
  parts.staticCamera.setAttribute('transform', camera);
  parts.fog.style.opacity = (1 - progress * FOG_THINNING).toFixed(
    OPACITY_DECIMALS,
  );
  parts.vignette.style.opacity = (slow * VIGNETTE_STRENGTH).toFixed(
    OPACITY_DECIMALS,
  );
}

// Bullet time is the tween's own timeScale: each frame sets it from the progress, so time slows
// down smoothly around the apex and snaps back for the landing.
export function createGapLeap(parts: LeapParts): gsap.core.Tween {
  const clock: { progress: number } = { progress: 0 };
  const leap: gsap.core.Tween = gsap.to(clock, {
    progress: 1,
    duration: DURATION,
    ease: 'none',
    paused: true,
    onUpdate: (): void => {
      drawLeap(parts, clock.progress);
      leap.timeScale(timeScaleAt(clock.progress));
    },
  });
  return leap;
}

// Null when a part is missing: then the static scene stays as it is.
export function findLeapTargets(frame: Element): LeapTargets | null {
  const staticCamera: Element | null = motionTarget(
    frame,
    MOTION_TARGETS.leapCamera,
  );
  const fog: HTMLElement | SVGElement | null = motionTarget(
    frame,
    MOTION_TARGETS.leapFog,
  );
  const staticRunner: Element | null = motionTarget(
    frame,
    MOTION_TARGETS.leapRunner,
  );
  const replayBox: Element | null = motionTarget(
    frame,
    MOTION_TARGETS.leapReplay,
  );
  const replayButton: HTMLButtonElement | null | undefined =
    replayBox?.querySelector('button');
  if (
    staticCamera === null ||
    fog === null ||
    staticRunner === null ||
    replayBox === null ||
    replayButton === null ||
    replayButton === undefined
  ) {
    return null;
  }
  return { staticCamera, fog, staticRunner, replayBox, replayButton };
}
