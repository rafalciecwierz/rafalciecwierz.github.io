import { LEAP_GEOMETRY, mixPose, POSES, type RigState } from '@/components';
import { easeInOutQuad, lerp, smoothstep } from '@/utils';

import {
  CAMERA,
  FLIGHT,
  LANDING_CROUCH_SHARE,
  PHASES,
  RUN_UP,
  SINE_TO_BLEND,
  SLOW_IN,
  SLOW_OUT,
  SLOWEST_SHARE,
} from './gapLeap.constants';

// The leap as pure functions of its progress (0 to 1), in the scene's units.

// How deep in bullet time the move is: 0 is real time, 1 is the slowest.
export function slowAt(progress: number): number {
  return (
    smoothstep(SLOW_IN.start, SLOW_IN.end, progress) *
    (1 - smoothstep(SLOW_OUT.start, SLOW_OUT.end, progress))
  );
}

// The speed of time at this point of the move, for GSAP's timeScale.
export function timeScaleAt(progress: number): number {
  return 1 - SLOWEST_SHARE * slowAt(progress);
}

function at(x: number, y: number, pose: RigState['pose']): RigState {
  return { x, y, pose, scale: LEAP_GEOMETRY.scale, spin: 0, isGrounded: false };
}

function flightPose(flight: number): RigState['pose'] {
  if (flight < FLIGHT.reachEnd) {
    return mixPose(POSES.runA, POSES.reach, flight / FLIGHT.reachEnd);
  }
  if (flight < FLIGHT.tuckEnd) {
    const tucking: number =
      (flight - FLIGHT.reachEnd) / (FLIGHT.tuckEnd - FLIGHT.reachEnd);
    return mixPose(POSES.reach, POSES.tuck, easeInOutQuad(tucking));
  }
  return mixPose(
    POSES.tuck,
    POSES.land,
    (flight - FLIGHT.tuckEnd) / (1 - FLIGHT.tuckEnd),
  );
}

// Where he is and what he does at this point of the move.
export function leapState(progress: number): RigState {
  const { takeOffFeet, landingFeet, landedX } = LEAP_GEOMETRY;
  if (progress <= 0) {
    return at(RUN_UP.startX, takeOffFeet, POSES.stand);
  }
  if (progress < PHASES.runUpEnd) {
    const x: number = lerp(
      RUN_UP.startX,
      RUN_UP.edgeX,
      progress / PHASES.runUpEnd,
    );
    // The stride follows the distance run, so his feet do not slide.
    const stride: number =
      (Math.sin(x / RUN_UP.strideLength) + 1) * SINE_TO_BLEND;
    return at(x, takeOffFeet, mixPose(POSES.runA, POSES.runB, stride));
  }
  if (progress < PHASES.flightEnd) {
    const flight: number =
      (progress - PHASES.runUpEnd) / (PHASES.flightEnd - PHASES.runUpEnd);
    // A parabola over the straight line between the two ledges.
    const rise: number =
      FLIGHT.arcFactor * FLIGHT.height * flight * (1 - flight);
    return at(
      lerp(RUN_UP.edgeX, landedX, flight),
      lerp(takeOffFeet, landingFeet, flight) - rise,
      flightPose(flight),
    );
  }
  const landing: number =
    (progress - PHASES.flightEnd) / (1 - PHASES.flightEnd);
  const pose: RigState['pose'] =
    landing < LANDING_CROUCH_SHARE
      ? mixPose(POSES.land, POSES.crouch, landing / LANDING_CROUCH_SHARE)
      : mixPose(
          POSES.crouch,
          POSES.stand,
          (landing - LANDING_CROUCH_SHARE) / LANDING_CROUCH_SHARE,
        );
  return at(landedX, landingFeet, pose);
}

// The camera eases in on him while time is slow: a zoom around a point just above his feet.
export function cameraTransform(state: RigState, slow: number): string {
  const zoom: number = 1 + CAMERA.zoom * slow;
  const focusX: string = state.x.toFixed(1);
  const focusY: number = state.y - CAMERA.focusRise;
  return `translate(${focusX} ${focusY.toFixed(1)}) scale(${zoom.toFixed(CAMERA.zoomDecimals)}) translate(${(-state.x).toFixed(1)} ${(-focusY).toFixed(1)})`;
}
