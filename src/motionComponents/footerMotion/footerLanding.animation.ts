import { gsap } from '@/motion/gsap';
import { progressTween } from '@/motion/progressTween';
import { mediaQueryBelow } from '@/utils';

import { BUBBLE, DURATIONS } from './footerLanding.constants';
import {
  dropState,
  raiseArmState,
  rollState,
  standUpState,
  streetGeometry,
  turnState,
  waveState,
} from './footerLanding.utils';
import type {
  FooterLandingOptions,
  LandingStep,
  StreetGeometry,
} from './footerMotion.types';

// Measures the street now, so the landing fits the window it is played in.
export function measureStreet(street: HTMLElement): StreetGeometry {
  return streetGeometry(
    street.clientWidth,
    street.clientHeight,
    window.matchMedia(mediaQueryBelow('sm')).matches,
  );
}

function landingPart(
  { rig, geometry }: FooterLandingOptions,
  duration: number,
  step: LandingStep,
): gsap.core.Tween {
  return progressTween(duration, (progress: number): void => {
    rig.set(step(geometry, progress));
  });
}

// The callbacks change what GSAP does not draw: the figure's tone and the speech bubble.
export function createFooterLanding(
  options: FooterLandingOptions,
): gsap.core.Timeline {
  options.rig.set(dropState(options.geometry, 0));
  return gsap
    .timeline()
    .add(landingPart(options, DURATIONS.drop, dropState))
    .add(landingPart(options, DURATIONS.roll, rollState))
    .add(landingPart(options, DURATIONS.standUp, standUpState))
    .call(options.onTurn)
    .add(landingPart(options, DURATIONS.turn, turnState))
    .add(landingPart(options, DURATIONS.raiseArm, raiseArmState))
    .call(options.onGreet)
    .add(landingPart(options, DURATIONS.wave, waveState))
    .call(options.onEnd);
}

export function popBubble(bubble: Element): gsap.core.Tween {
  return gsap.fromTo(
    bubble,
    { autoAlpha: 0, scale: BUBBLE.fromScale },
    { autoAlpha: 1, scale: 1, duration: DURATIONS.bubble, ease: BUBBLE.ease },
  );
}
