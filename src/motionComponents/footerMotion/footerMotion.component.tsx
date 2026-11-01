import { type ReactElement, type RefObject, useRef, useState } from 'react';

import { RunnerRig, type RunnerRigHandle, type RunnerTone } from '@/components';
import { MOTION_TARGETS } from '@/constants';
import { gsap, ScrollTrigger, useGSAP } from '@/motion/gsap';
import type { ContextSafe } from '@/motion/gsap.types';
import type { MotionComponentProps } from '@/motion/motionLayer';
import { isBelowViewport, motionTarget } from '@/motion/motionTarget';

import {
  createFooterLanding,
  measureStreet,
  popBubble,
} from './footerLanding.animation';
import { TRIGGER_START } from './footerLanding.constants';
import styles from './footerMotion.module.scss';

// FooterLanding (docs/ARCHITECTURE.md section 11): when the street comes into view, the runner
// drops onto it, rolls, turns to the viewer and waves, and the bubble pops in. The static
// street already shows the last frame, so the motion only plays when the street starts below
// the screen: then the static runner and bubble are hidden until the landing reaches them. The
// rig draws the move in its own SVG over the street and hands over to the static runner at the
// end. Unmounting (reduced motion turned on) reverts everything to the static street.
export function FooterMotion({ scope }: MotionComponentProps): ReactElement {
  const overlayRef: RefObject<SVGSVGElement | null> =
    useRef<SVGSVGElement>(null);
  const rigRef: RefObject<RunnerRigHandle | null> =
    useRef<RunnerRigHandle>(null);
  // In profile while he moves; facing the viewer once he turns.
  const [tone, setTone] = useState<RunnerTone>('profile');

  // contextSafe() wraps code that runs later (a scroll or click callback), so the animations it
  // creates still belong to this component and are reverted when it unmounts.
  const { contextSafe }: { contextSafe: ContextSafe } = useGSAP();
  useGSAP(
    (): void => {
      const street: HTMLElement | null | undefined = scope?.current;
      const overlay: SVGSVGElement | null = overlayRef.current;
      const rig: RunnerRigHandle | null = rigRef.current;
      if (
        street === null ||
        street === undefined ||
        overlay === null ||
        rig === null ||
        !isBelowViewport(street)
      ) {
        return;
      }
      const staticParts: Element[] = [
        motionTarget(street, MOTION_TARGETS.streetRunner),
        motionTarget(street, MOTION_TARGETS.streetBubble),
      ].filter(
        (
          part: HTMLElement | SVGElement | null,
        ): part is HTMLElement | SVGElement => part !== null,
      );
      const bubble: Element | null = motionTarget(
        street,
        MOTION_TARGETS.streetBubble,
      );
      gsap.set(staticParts, { autoAlpha: 0 });

      // Built when it starts (in contextSafe, so it is still reverted on unmount), so it fits
      // the street's size at that moment.
      const land: () => void = contextSafe((): void => {
        // The overlay fills the street inside its border (clientWidth × clientHeight), so its
        // viewBox uses the same size and one unit is one pixel. The bounding box would add the
        // street's bottom border, and the drawing would shrink and shift by a few pixels.
        overlay.setAttribute(
          'viewBox',
          `0 0 ${String(street.clientWidth)} ${String(street.clientHeight)}`,
        );
        gsap.set(overlay, { autoAlpha: 1 });
        createFooterLanding({
          rig,
          geometry: measureStreet(street),
          onTurn: (): void => {
            setTone('front');
          },
          onGreet: (): void => {
            if (bubble !== null) {
              popBubble(bubble);
            }
          },
          onEnd: (): void => {
            gsap.set(staticParts, { autoAlpha: 1 });
            gsap.set(overlay, { autoAlpha: 0 });
          },
        });
      });
      ScrollTrigger.create({
        trigger: street,
        start: TRIGGER_START,
        once: true,
        onEnter: land,
      });
    },
    // No scope: this code targets elements, never selector text, which is all a scope limits.
    [],
  );

  return (
    <svg
      ref={overlayRef}
      className={styles.overlay}
      aria-hidden="true"
      focusable="false"
    >
      <RunnerRig ref={rigRef} tone={tone} />
    </svg>
  );
}
