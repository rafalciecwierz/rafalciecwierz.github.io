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

  const { contextSafe }: { contextSafe: ContextSafe } = useGSAP();
  useGSAP((): (() => void) | undefined => {
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

    return (): void => {
      replayButton.removeEventListener('click', replay);
      staticCamera.removeAttribute('transform');
      fog.style.removeProperty('opacity');
    };
  }, []);

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
