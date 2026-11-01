import {
  type ReactElement,
  type RefObject,
  useImperativeHandle,
  useRef,
} from 'react';

import { OPACITY_DECIMALS, RIG_PART_ATTRIBUTE } from './runner.constants';
import type {
  RigPart,
  RigPartAttributes,
  RigState,
  RunnerBody,
  RunnerRigHandle,
  RunnerRigProps,
} from './runner.types';
import { solvePose } from './runner.utils';
import { RunnerFigure } from './runnerFigure.component';
import {
  rigFoot,
  rigPartAttributes,
  rigTransform,
  spinTransform,
} from './runnerRig.utils';

function isRigPart(name: string | null): name is RigPart {
  return (
    name === 'farLeg' ||
    name === 'farArm' ||
    name === 'torso' ||
    name === 'nearLeg' ||
    name === 'nearArm' ||
    name === 'head'
  );
}

// The runner as a puppet for motion code. It draws the figure once, and its handle redraws it
// for every frame of a move: GSAP calls set() about 60 times a second, and set() writes the SVG
// attributes directly. A React render per frame would be far slower, and nothing on the page
// depends on the figure's state. Only motion components use it, and only inside an SVG that is
// already decorative. Its first frame is the standing pose at (0, 0) until set() is called.
export function RunnerRig({ ref, tone }: RunnerRigProps): ReactElement {
  const placeRef: RefObject<SVGGElement | null> = useRef<SVGGElement>(null);
  const spinRef: RefObject<SVGGElement | null> = useRef<SVGGElement>(null);

  useImperativeHandle(
    ref,
    (): RunnerRigHandle => ({
      set(state: RigState): void {
        const place: SVGGElement | null = placeRef.current;
        const spin: SVGGElement | null = spinRef.current;
        if (place === null || spin === null) {
          return;
        }
        const body: RunnerBody = solvePose(state.pose);
        const attributes: RigPartAttributes = rigPartAttributes(body);
        for (const part of spin.querySelectorAll(`[${RIG_PART_ATTRIBUTE}]`)) {
          const name: string | null = part.getAttribute(RIG_PART_ATTRIBUTE);
          if (isRigPart(name)) {
            for (const [attribute, value] of Object.entries(attributes[name])) {
              part.setAttribute(attribute, value);
            }
          }
        }
        const foot: number = rigFoot(body, state.spin, state.isGrounded);
        place.setAttribute('transform', rigTransform(state, foot));
        spin.setAttribute('transform', spinTransform(body, state.spin));
      },
      setOpacity(opacity: number): void {
        placeRef.current?.setAttribute(
          'opacity',
          opacity.toFixed(OPACITY_DECIMALS),
        );
      },
    }),
    [],
  );

  return (
    <g ref={placeRef}>
      <g ref={spinRef}>
        <RunnerFigure pose="stand" tone={tone} />
      </g>
    </g>
  );
}
