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

// RooftopRun (docs/ARCHITECTURE.md section 9): from 900 px, scrolling through the career runs
// it as one parkour line. CSS has already laid the section out as the run, wherever the
// reader is (DECISIONS.md #010); this brings it to life. The section's screen stays in place
// for about five screens; the runner crosses a roof per role and jumps from building to
// building, the camera rises with the roofs, the card of the move he is on floats on the
// right and the progress bar fills. Unmounting (reduced motion, a narrow window) leaves the
// static page, which CSS shows as the list there.
export function CareerRunMotion({ scope }: MotionComponentProps): ReactElement {
  const cameraRef: RefObject<SVGGElement | null> = useRef<SVGGElement>(null);
  const rigRef: RefObject<RunnerRigHandle | null> =
    useRef<RunnerRigHandle>(null);
  // Card changes happen later, in scroll callbacks; contextSafe() keeps them in this second
  // context. React reverts it only after the run's cleanup, so the cleanup reverts it first:
  // otherwise its card tweens would write their styles back over the restored page.
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
      // After a refresh (a resize): a new camera, and the stage again.
      (): void => {
        view = cameraFor(window.innerWidth, window.innerHeight);
        draw(progress, true);
      },
    );
    const stopKeyboard: (() => void) | null =
      run.scrollTrigger === undefined
        ? null
        : startRunKeyboard(targets, run.scrollTrigger, layout, roleCounts);
    // The city is placed where the scroll is: CSS fades it in.
    section.setAttribute(CAREER_RUN_LIVE_ATTRIBUTE, '');

    // Runs after GSAP has reverted this context's tweens (not the card context's, see above).
    return (): void => {
      stopKeyboard?.();
      // Reverting the run renders it once more at its start, and that update asks for the
      // first stage's cards: new card tweens that would finish after the page is restored.
      // Revert the card context and kill whatever is left before restoring.
      context.revert();
      gsap.killTweensOf(cardParts);
      section.removeAttribute(CAREER_RUN_LIVE_ATTRIBUTE);
      // The move names keep their data-current: it only counts in the run, and the next run
      // sets it again. The first tick is lit by CSS.
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
