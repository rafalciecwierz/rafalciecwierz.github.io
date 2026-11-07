import {
  mixPose,
  POSES,
  type RigState,
  type RunnerRigHandle,
  type RunnerTone,
  wavePose,
} from '@/components';
import { gsap } from '@/motion/gsap';
import { progressTween } from '@/motion/progressTween';

import { GREETING } from './heroMotion.constants';
import type { RigSpot } from './heroMotion.types';
import { stateAt } from './letterHop.utils';

// Facing the viewer, both sides of the figure share one tone (setTone).
export function createGreeting(
  rig: RunnerRigHandle,
  spot: RigSpot,
  setTone: (tone: RunnerTone) => void,
): gsap.core.Timeline {
  function blend(
    duration: number,
    from: RigState['pose'],
    to: RigState['pose'],
  ): gsap.core.Tween {
    return progressTween(duration, (progress: number): void => {
      rig.set(stateAt(spot, mixPose(from, to, progress)));
    });
  }

  return gsap
    .timeline()
    .add(blend(GREETING.standUp, POSES.crouch, POSES.stand))
    .call(setTone, ['front'])
    .add(blend(GREETING.turn, POSES.stand, POSES.front))
    .add(blend(GREETING.raiseArm, POSES.front, POSES.wave))
    .add(
      progressTween(GREETING.wave, (progress: number): void => {
        rig.set(stateAt(spot, wavePose(progress)));
      }),
    )
    .add(blend(GREETING.lowerArm, POSES.wave, POSES.front))
    .add(blend(GREETING.turnBack, POSES.front, POSES.stand))
    .call(setTone, ['profile'])
    .add(blend(GREETING.crouch, POSES.stand, POSES.crouch));
}
