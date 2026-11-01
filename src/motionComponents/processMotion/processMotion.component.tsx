import { type ReactElement, type RefObject, useId, useRef } from 'react';

import { LEAP_GEOMETRY, RunnerRig, type RunnerRigHandle } from '@/components';
import { gsap, ScrollTrigger, useGSAP } from '@/motion/gsap';
import type { ContextSafe } from '@/motion/gsap.types';
import type { MotionComponentProps } from '@/motion/motionLayer';
import { isBelowViewport } from '@/motion/motionTarget';

import { createGapLeap, drawLeap, findLeapTargets } from './gapLeap.animation';
import { GHOST_OPACITIES, TRIGGER_START, VIGNETTE } from './gapLeap.constants';
import styles from './processMotion.module.scss';
import type { LeapParts, LeapTargets } from './processMotion.types';

// GapLeap (docs/ARCHITECTURE.md section 11): the runner takes the gap between the two roofs,
// with bullet time at the apex, and a button replays it. The static scene shows him landed.
// When the scene starts below the screen, he is put back on the take-off roof and the leap
// plays once 80% of the scene is in view; when it is already on screen, he stays landed until
// the reader presses Replay. The motion draws him in its own SVG over the scene and moves the
// static scene's camera with it. Unmounting (reduced motion turned on) puts the static scene
// back and hides the replay button.
export function ProcessMotion({ scope }: MotionComponentProps): ReactElement {
  const gradientId: string = `${useId()}-vignette`;
  const overlayRef: RefObject<SVGSVGElement | null> =
    useRef<SVGSVGElement>(null);
  const cameraRef: RefObject<SVGGElement | null> = useRef<SVGGElement>(null);
  const vignetteRef: RefObject<SVGRectElement | null> =
    useRef<SVGRectElement>(null);
  const rigRef: RefObject<RunnerRigHandle | null> =
    useRef<RunnerRigHandle>(null);
  const ghostRefs: RefObject<(RunnerRigHandle | null)[]> = useRef<
    (RunnerRigHandle | null)[]
  >([]);

  // contextSafe() wraps code that runs later (a scroll or click callback), so the animations it
  // creates still belong to this component and are reverted when it unmounts.
  const { contextSafe }: { contextSafe: ContextSafe } = useGSAP();
  useGSAP(
    (): (() => void) | undefined => {
      const frame: HTMLElement | null | undefined = scope?.current;
      const overlay: SVGSVGElement | null = overlayRef.current;
      const camera: SVGGElement | null = cameraRef.current;
      const vignette: SVGRectElement | null = vignetteRef.current;
      const rig: RunnerRigHandle | null = rigRef.current;
      if (
        frame === null ||
        frame === undefined ||
        overlay === null ||
        camera === null ||
        vignette === null ||
        rig === null
      ) {
        return undefined;
      }
      const targets: LeapTargets | null = findLeapTargets(frame);
      if (targets === null) {
        return undefined;
      }
      const { staticCamera, fog, staticRunner, replayBox, replayButton } =
        targets;
      const ghosts: RunnerRigHandle[] = ghostRefs.current.filter(
        (ghost: RunnerRigHandle | null): ghost is RunnerRigHandle =>
          ghost !== null,
      );
      const parts: LeapParts = {
        staticCamera,
        fog,
        camera,
        rig,
        ghosts,
        vignette,
      };
      const leap: gsap.core.Tween = createGapLeap(parts);

      // The motion layer's runner takes over from the static one.
      const takeOver: () => void = contextSafe((): void => {
        gsap.set(staticRunner, { autoAlpha: 0 });
        gsap.set(overlay, { autoAlpha: 1 });
      });
      const replay: () => void = contextSafe((): void => {
        takeOver();
        drawLeap(parts, 0);
        leap.restart();
      });
      gsap.set(replayBox, { display: 'block' });
      replayButton.addEventListener('click', replay);

      if (isBelowViewport(frame)) {
        takeOver();
        drawLeap(parts, 0);
        ScrollTrigger.create({
          trigger: frame,
          start: TRIGGER_START,
          once: true,
          onEnter: (): void => {
            leap.play();
          },
        });
      }

      // GSAP reverts what it set; the attributes drawLeap wrote every frame are removed here.
      return (): void => {
        replayButton.removeEventListener('click', replay);
        staticCamera.removeAttribute('transform');
        fog.style.removeProperty('opacity');
      };
    },
    // No scope: this code targets elements, never selector text, which is all a scope limits.
    [],
  );

  return (
    <svg
      ref={overlayRef}
      className={styles.overlay}
      viewBox={`0 0 ${String(LEAP_GEOMETRY.width)} ${String(LEAP_GEOMETRY.height)}`}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={gradientId} r={VIGNETTE.radius}>
          <stop
            offset={VIGNETTE.clearUntil}
            className={styles.vignetteStop}
            stopOpacity="0"
          />
          <stop
            offset="1"
            className={styles.vignetteStop}
            stopOpacity={VIGNETTE.edgeOpacity}
          />
        </radialGradient>
      </defs>
      <g ref={cameraRef}>
        {GHOST_OPACITIES.map((opacity: number, index: number): ReactElement => (
          <RunnerRig
            key={opacity}
            ref={(ghost: RunnerRigHandle | null): void => {
              ghostRefs.current[index] = ghost;
            }}
          />
        ))}
        <RunnerRig ref={rigRef} />
      </g>
      <rect
        ref={vignetteRef}
        className={styles.vignette}
        width={LEAP_GEOMETRY.width}
        height={LEAP_GEOMETRY.height}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
