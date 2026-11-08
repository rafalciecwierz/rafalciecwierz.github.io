import { mixPose, POSES, type RigState } from '@/components';
import { easeInOutQuad } from '@/utils';

import {
  FLIP,
  FULL_CYCLE,
  HANDSTAND,
  JUMP,
  KONG,
} from './heroMotion.constants';
import type { RigSpot } from './heroMotion.types';
import { stateAt } from './letterHop.utils';

// The pose through a kong vault: he dives over with his hands down.
export function kongPose(progress: number): RigState['pose'] {
  if (progress < KONG.reachEnd) {
    return mixPose(POSES.crouch, POSES.reach, progress / KONG.reachEnd);
  }
  if (progress < KONG.diveEnd) {
    const diving: number =
      (progress - KONG.reachEnd) / (KONG.diveEnd - KONG.reachEnd);
    return mixPose(POSES.reach, POSES.kong, easeInOutQuad(diving));
  }
  if (progress < KONG.tuckEnd) {
    return mixPose(
      POSES.kong,
      POSES.tuck,
      (progress - KONG.diveEnd) / (KONG.tuckEnd - KONG.diveEnd),
    );
  }
  return mixPose(
    POSES.tuck,
    POSES.land,
    (progress - KONG.tuckEnd) / (1 - KONG.tuckEnd),
  );
}

export function flipState(
  spot: RigSpot,
  direction: number,
  progress: number,
): RigState {
  const height: number = FLIP.height * spot.scale;
  const pose: RigState['pose'] =
    progress < FLIP.landFrom
      ? mixPose(POSES.reach, POSES.tuck, Math.min(1, progress * FLIP.tuckBy))
      : mixPose(
          POSES.tuck,
          POSES.land,
          (progress - FLIP.landFrom) / (1 - FLIP.landFrom),
        );
  return {
    ...stateAt(spot, pose),
    y: spot.y - JUMP.arcFactor * height * progress * (1 - progress),
    // Facing left mirrors the figure, so the turn is mirrored back to keep its direction.
    spin: direction * spot.facing * FLIP.turn * easeInOutQuad(progress),
  };
}

export function handstandTurnState(
  spot: RigSpot,
  isKickingUp: boolean,
  progress: number,
): RigState {
  const turned: number = easeInOutQuad(progress) * HANDSTAND.halfTurn;
  return {
    ...stateAt(
      spot,
      isKickingUp
        ? mixPose(POSES.reach, POSES.hand, progress)
        : mixPose(POSES.hand, POSES.crouch, progress),
    ),
    spin: isKickingUp ? turned : HANDSTAND.halfTurn + turned,
    isGrounded: true,
  };
}

export function handstandHoldState(spot: RigSpot, progress: number): RigState {
  const swing: number =
    Math.sin(progress * FULL_CYCLE * HANDSTAND.scissorCycles) *
    HANDSTAND.scissorSwing;
  const [
    lean,
    head,
    nearShoulder,
    nearElbow,
    farShoulder,
    farElbow,
    nearHip,
    nearKnee,
    farHip,
    farKnee,
  ] = POSES.hand;
  return {
    ...stateAt(spot, [
      lean,
      head,
      nearShoulder,
      nearElbow,
      farShoulder,
      farElbow,
      nearHip + swing,
      nearKnee,
      farHip - swing,
      farKnee,
    ]),
    spin: HANDSTAND.halfTurn,
    isGrounded: true,
  };
}

// The platform for a kong vault from `index`: two letters on if there is room, else back, else
// one letter on or back.
export function kongTarget(index: number, count: number): number {
  const options: number[] = [
    index + KONG.skip,
    index - KONG.skip,
    index + 1,
    index - 1,
  ];
  return (
    options.find((option: number): boolean => option >= 0 && option < count) ??
    index
  );
}
