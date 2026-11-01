import { mixPose, POSES, type RunnerRigHandle } from '@/components';
import { gsap } from '@/motion/gsap';
import { progressTween } from '@/motion/progressTween';

import { FLIP, HANDSTAND, KONG } from './heroMotion.constants';
import type { Platform, RigSpot, Trick, TrickMove } from './heroMotion.types';
import { createJump } from './letterHop.animation';
import { stateAt } from './letterHop.utils';
import {
  flipState,
  handstandHoldState,
  handstandTurnState,
  kongPose,
  kongTarget,
} from './tricks.utils';

// The runner's tricks as timelines. Clicks on him play them in turn (HeroRunner).

// A backflip (direction -1) or a front flip (1) in place.
export function createFlip(
  rig: RunnerRigHandle,
  spot: RigSpot,
  direction: number,
): gsap.core.Timeline {
  return gsap
    .timeline()
    .add(
      progressTween(FLIP.windUp, (progress: number): void => {
        rig.set(stateAt(spot, mixPose(POSES.crouch, POSES.reach, progress)));
      }),
    )
    .add(
      progressTween(FLIP.air, (progress: number): void => {
        rig.set(flipState(spot, direction, progress));
      }),
    )
    .add(
      progressTween(FLIP.settle, (progress: number): void => {
        rig.set(stateAt(spot, mixPose(POSES.land, POSES.crouch, progress)));
      }),
    );
}

// A kong vault: a long jump with a dive, hands first, over the next letter.
export function createKongVault(
  rig: RunnerRigHandle,
  spot: RigSpot,
  to: Platform,
): gsap.core.Timeline {
  return createJump(rig, spot, to, {
    duration: KONG.duration,
    poseAt: kongPose,
  });
}

// A handstand: kick up, hold with the legs scissoring, step down.
export function createHandstand(
  rig: RunnerRigHandle,
  spot: RigSpot,
): gsap.core.Timeline {
  return gsap
    .timeline()
    .add(
      progressTween(HANDSTAND.kickWindUp, (progress: number): void => {
        rig.set(stateAt(spot, mixPose(POSES.crouch, POSES.reach, progress)));
      }),
    )
    .add(
      progressTween(HANDSTAND.kickUp, (progress: number): void => {
        rig.set(handstandTurnState(spot, true, progress));
      }),
    )
    .add(
      progressTween(HANDSTAND.hold, (progress: number): void => {
        rig.set(handstandHoldState(spot, progress));
      }),
    )
    .add(
      progressTween(HANDSTAND.stepDown, (progress: number): void => {
        rig.set(handstandTurnState(spot, false, progress));
      }),
    )
    .call((): void => {
      rig.set(stateAt(spot, POSES.crouch));
    });
}

// The move for one trick from where he stands on letter `at`, the letter he ends on, and the
// way he faces after it.
export function createTrick(
  kind: Trick,
  rig: RunnerRigHandle,
  from: RigSpot,
  platforms: readonly Platform[],
  at: number,
): TrickMove {
  switch (kind) {
    case 'backflip':
      return {
        move: createFlip(rig, from, -1),
        landsOn: at,
        facing: from.facing,
      };
    case 'frontFlip':
      return {
        move: createFlip(rig, from, 1),
        landsOn: at,
        facing: from.facing,
      };
    case 'handstand':
      return {
        move: createHandstand(rig, from),
        landsOn: at,
        facing: from.facing,
      };
    case 'kongVault': {
      const to: number = kongTarget(at, platforms.length);
      const target: Platform = platforms[to] ?? from;
      const facing: RigSpot['facing'] = target.x >= from.x ? 1 : -1;
      return {
        move: createKongVault(rig, { ...from, facing }, target),
        landsOn: to,
        facing,
      };
    }
  }
}
