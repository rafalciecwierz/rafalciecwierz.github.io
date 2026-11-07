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

export function FooterMotion({ scope }: MotionComponentProps): ReactElement {
  const overlayRef: RefObject<SVGSVGElement | null> =
    useRef<SVGSVGElement>(null);
  const rigRef: RefObject<RunnerRigHandle | null> =
    useRef<RunnerRigHandle>(null);
  const [tone, setTone] = useState<RunnerTone>('profile');

  const { contextSafe }: { contextSafe: ContextSafe } = useGSAP();
  useGSAP((): void => {
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

    const land: () => void = contextSafe((): void => {
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
  }, []);

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
