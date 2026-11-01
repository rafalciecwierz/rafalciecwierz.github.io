import { mixPose, POSES, type RigState } from '@/components';
import { clamp, easeInOutQuad, lerp } from '@/utils';

import {
  DROP,
  FULL_CYCLE,
  ROLL,
  SCALE_BY_HEIGHT,
  SPOT_SHARE,
  WAVE,
} from './footerLanding.constants';
import type { StreetGeometry } from './footerMotion.types';

// The states of each part of FooterLanding, as pure functions of the progress (0 to 1).

// Where he lands on a street of this size.
export function streetGeometry(
  width: number,
  height: number,
  isNarrow: boolean,
): StreetGeometry {
  return {
    x: width * (isNarrow ? SPOT_SHARE.narrow : SPOT_SHARE.wide),
    ground: height,
    scale: clamp(
      height / SCALE_BY_HEIGHT.unit,
      SCALE_BY_HEIGHT.min,
      SCALE_BY_HEIGHT.max,
    ),
  };
}

function upright(geometry: StreetGeometry, x: number): Omit<RigState, 'pose'> {
  return {
    x,
    y: geometry.ground,
    scale: geometry.scale,
    spin: 0,
    isGrounded: false,
  };
}

// He falls in from above and to the left, faster and faster (y grows with progress²).
export function dropState(
  geometry: StreetGeometry,
  progress: number,
): RigState {
  return {
    ...upright(
      geometry,
      lerp(
        geometry.x + DROP.startOffsetX,
        geometry.x + DROP.landOffsetX,
        progress,
      ),
    ),
    y: lerp(DROP.startY, geometry.ground, progress * progress),
    pose: mixPose(POSES.reach, POSES.land, progress),
  };
}

// A forward roll along the street into a crouch at his spot.
export function rollState(
  geometry: StreetGeometry,
  progress: number,
): RigState {
  const opening: number = clamp(
    (progress - ROLL.tuckShare) / (1 - ROLL.tuckShare),
    0,
    1,
  );
  return {
    ...upright(
      geometry,
      lerp(geometry.x + DROP.landOffsetX, geometry.x, progress),
    ),
    pose: mixPose(POSES.tuck, POSES.crouch, opening),
    spin: ROLL.turn * easeInOutQuad(progress),
    isGrounded: true,
  };
}

export function standUpState(
  geometry: StreetGeometry,
  progress: number,
): RigState {
  return {
    ...upright(geometry, geometry.x),
    pose: mixPose(POSES.crouch, POSES.stand, progress),
  };
}

export function turnState(
  geometry: StreetGeometry,
  progress: number,
): RigState {
  return {
    ...upright(geometry, geometry.x),
    pose: mixPose(POSES.stand, POSES.front, progress),
  };
}

export function raiseArmState(
  geometry: StreetGeometry,
  progress: number,
): RigState {
  return {
    ...upright(geometry, geometry.x),
    pose: mixPose(POSES.front, POSES.wave, easeInOutQuad(progress)),
  };
}

// The raised arm waves: the elbow and the shoulder swing on a sine, and end where they began,
// so the last frame is exactly the static waving pose.
export function waveState(
  geometry: StreetGeometry,
  progress: number,
): RigState {
  const swing: number = Math.sin(progress * FULL_CYCLE * WAVE.cycles);
  const [lean, head, nearShoulder, nearElbow, farShoulder, , ...legs] =
    POSES.wave;
  return {
    ...upright(geometry, geometry.x),
    pose: [
      lean,
      head,
      nearShoulder,
      nearElbow,
      farShoulder + swing * WAVE.shoulderSwing,
      swing * WAVE.elbowSwing,
      ...legs,
    ],
  };
}
