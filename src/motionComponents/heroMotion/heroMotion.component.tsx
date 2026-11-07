import { type ReactElement, type RefObject, useRef, useState } from 'react';

import { RunnerRig, type RunnerRigHandle, type RunnerTone } from '@/components';
import { MOTION_TARGETS } from '@/constants';
import { useGSAP } from '@/motion/gsap';
import type { ContextSafe } from '@/motion/gsap.types';
import { saveInlineStyles } from '@/motion/inlineStyles';
import type { MotionComponentProps } from '@/motion/motionLayer';
import { motionTarget, motionTargets } from '@/motion/motionTarget';

import { startHeroInteractions } from './heroInteractions.animation';
import { SIGN_LETTER_SELECTOR } from './heroMotion.constants';
import styles from './heroMotion.module.scss';
import {
  createRoleFlip,
  createSignFlicker,
  createWindowFlicker,
} from './heroScene.animation';

export function HeroMotion({ scope }: MotionComponentProps): ReactElement {
  const overlayRef: RefObject<SVGSVGElement | null> =
    useRef<SVGSVGElement>(null);
  const rigBoxRef: RefObject<SVGGElement | null> = useRef<SVGGElement>(null);
  const hitRef: RefObject<SVGCircleElement | null> =
    useRef<SVGCircleElement>(null);
  const rigRef: RefObject<RunnerRigHandle | null> =
    useRef<RunnerRigHandle>(null);
  const { contextSafe }: { contextSafe: ContextSafe } = useGSAP();
  const [tone, setTone] = useState<RunnerTone>('profile');

  useGSAP((): (() => void) | undefined => {
    const hero: HTMLElement | null | undefined = scope?.current;
    const overlay: SVGSVGElement | null = overlayRef.current;
    const rigBox: SVGGElement | null = rigBoxRef.current;
    const hit: SVGCircleElement | null = hitRef.current;
    const rig: RunnerRigHandle | null = rigRef.current;
    if (
      hero === null ||
      hero === undefined ||
      overlay === null ||
      rigBox === null ||
      hit === null ||
      rig === null
    ) {
      return undefined;
    }
    const letters: HTMLElement[] = [
      ...hero.querySelectorAll<HTMLElement>(SIGN_LETTER_SELECTOR),
    ];
    const windows: HTMLElement[] = motionTargets(
      hero,
      MOTION_TARGETS.skylineWindow,
    );
    const role: Element | null = motionTarget(hero, MOTION_TARGETS.heroRole);
    const roleText: string = role?.textContent ?? '';
    const titles: string[] = motionTargets(hero, MOTION_TARGETS.roleFlip).map(
      (title: HTMLElement): string => title.textContent,
    );
    const restoreStyles: () => void = saveInlineStyles([
      ...letters,
      ...windows,
    ]);

    createSignFlicker(letters);
    createWindowFlicker(hero, windows);
    if (role instanceof HTMLElement && titles.length > 0) {
      createRoleFlip(role, titles);
    }

    const staticRunner: Element | null = motionTarget(
      hero,
      MOTION_TARGETS.heroRunner,
    );
    const perch: Element | null | undefined =
      staticRunner?.parentElement?.querySelector(SIGN_LETTER_SELECTOR);
    const perchIndex: number = letters.findIndex(
      (letter: HTMLElement): boolean => letter === perch,
    );
    const stopInteractions: () => void =
      staticRunner === null || perchIndex < 0
        ? (): void => undefined
        : startHeroInteractions(
            {
              hero,
              letters,
              staticRunner,
              perchIndex,
              overlay,
              rigBox,
              hit,
              rig,
              setTone,
            },
            contextSafe,
          );

    return (): void => {
      stopInteractions();
      restoreStyles();
      if (role !== null) {
        role.textContent = roleText;
      }
    };
  }, []);

  return (
    <svg
      ref={overlayRef}
      className={styles.overlay}
      aria-hidden="true"
      focusable="false"
    >
      <g ref={rigBoxRef} className={styles.rig}>
        <RunnerRig ref={rigRef} tone={tone} />
      </g>
      <circle ref={hitRef} className={styles.hit} />
    </svg>
  );
}
