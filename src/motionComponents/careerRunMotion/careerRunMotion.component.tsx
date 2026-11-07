import { type ReactElement, type RefObject, useRef } from 'react';

import {
  type CareerRunLayout,
  careerRunLayout,
  RunnerRig,
  type RunnerRigHandle,
} from '@/components';
import { CAREER_RUN_LIVE_ATTRIBUTE, MOTION_TARGETS } from '@/constants';
import { gsap, ScrollTrigger, useGSAP } from '@/motion/gsap';
import type { ContextSafe } from '@/motion/gsap.types';
import { saveInlineStyles } from '@/motion/inlineStyles';
import type { MotionComponentProps } from '@/motion/motionLayer';
import { motionTargets } from '@/motion/motionTarget';

import {
  createCareerRun,
  drawRun,
  findRunTargets,
} from './careerRun.animation';
import { cameraFor } from './careerRunCamera.utils';
import {
  cardItem,
  createStageSwitcher,
  roleCountsOf,
} from './careerRunCards.animation';
import { startRunKeyboard } from './careerRunKeyboard.animation';
import styles from './careerRunMotion.module.scss';
import type { RunParts, RunTargets, RunView } from './careerRunMotion.types';

export function CareerRunMotion({ scope }: MotionComponentProps): ReactElement {
  const cameraRef: RefObject<SVGGElement | null> = useRef<SVGGElement>(null);
  const rigRef: RefObject<RunnerRigHandle | null> =
    useRef<RunnerRigHandle>(null);
  const {
    context,
    contextSafe,
  }: { context: gsap.Context; contextSafe: ContextSafe } = useGSAP();

  useGSAP((): (() => void) | undefined => {
    const section: HTMLElement | null | undefined = scope?.current;
    const camera: SVGGElement | null = cameraRef.current;
    const rig: RunnerRigHandle | null = rigRef.current;
    if (
      section === null ||
      section === undefined ||
      camera === null ||
      rig === null
    ) {
      return undefined;
    }
    const targets: RunTargets | null = findRunTargets(section);
    if (targets === null) {
      return undefined;
    }
    const roleCounts: number[] = roleCountsOf(targets.moves);
    const layout: CareerRunLayout = careerRunLayout(roleCounts);
    const cardParts: HTMLElement[] = targets.moves.flatMap(
      (move: HTMLElement): HTMLElement[] => [
        cardItem(move),
        ...motionTargets(move, MOTION_TARGETS.careerPromotion),
      ],
    );
    const restoreStyles: () => void = saveInlineStyles([
      targets.world,
      targets.far,
      targets.fill,
      ...cardParts,
    ]);

    const parts: RunParts = { ...targets, camera, rig };
    const showStage: (stage: number, shouldForce: boolean) => void =
      contextSafe(createStageSwitcher(targets, roleCounts));
    let view: RunView = cameraFor(window.innerWidth, window.innerHeight);
    let progress: number = 0;
    function draw(next: number, shouldForce: boolean): void {
      progress = next;
      showStage(drawRun(parts, layout, view, progress).stage, shouldForce);
    }
    const run: gsap.core.Tween = createCareerRun(
      section,
      (next: number): void => {
        draw(next, false);
      },
      (): void => {
        view = cameraFor(window.innerWidth, window.innerHeight);
        draw(progress, true);
      },
    );
    const stopKeyboard: (() => void) | null =
      run.scrollTrigger === undefined
        ? null
        : startRunKeyboard(targets, run.scrollTrigger, layout, roleCounts);
    section.setAttribute(CAREER_RUN_LIVE_ATTRIBUTE, '');

    return (): void => {
      stopKeyboard?.();
      context.revert();
      gsap.killTweensOf(cardParts);
      section.removeAttribute(CAREER_RUN_LIVE_ATTRIBUTE);
      for (const tick of targets.ticks) {
        tick.removeAttribute('data-reached');
      }
      restoreStyles();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <svg className={styles.overlay} aria-hidden="true" focusable="false">
      <g ref={cameraRef}>
        <RunnerRig ref={rigRef} />
      </g>
    </svg>
  );
}
