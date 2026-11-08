import { mixPose, POSES, type RigState, wavePose } from '@/components';
import { clamp, easeInOutQuad, lerp } from '@/utils';

import {
  DROP,
  ROLL,
  SCALE_BY_HEIGHT,
  SPOT_SHARE,
} from './footerLanding.constants';
import type { StreetGeometry } from './footerMotion.types';

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

// Ends on the static waving pose, so the static runner can take over.
export function waveState(
  geometry: StreetGeometry,
  progress: number,
): RigState {
  return { ...upright(geometry, geometry.x), pose: wavePose(progress) };
}
