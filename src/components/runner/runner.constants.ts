import type { Pose, PoseName } from './runner.types';

// The keyframe poses of the rig, from the reference design (design/iterations/08-ascent-dark-v2.html).
// The motion layer blends between them; the static page shows one.
export const POSES: Readonly<Record<PoseName, Pose>> = {
  stand: [4, 0, -10, 20, 12, 20, 4, -6, -4, -6],
  crouch: [36, -30, 50, -40, 34, -30, 100, -150, 86, -140],
  reach: [16, -12, 160, 0, 148, 6, 14, -8, -14, -28],
  tuck: [28, -22, 108, -62, 94, -52, 116, -136, 102, -130],
  land: [34, -20, 78, -8, 62, -4, 82, -118, 66, -106],
  runA: [17, -6, -46, 82, 52, 72, 52, -24, -30, -78],
  runB: [17, -6, 52, 72, -46, 82, -30, -78, 52, -24],
  // Dives over an obstacle, hands down.
  kong: [70, -50, 18, 0, 30, 0, 108, -142, 96, -136],
  // A straight body with the arms up; spun 180° it is a handstand.
  hand: [0, 0, 176, 0, 184, 0, 10, 0, -10, 0],
  // Facing the viewer: the limbs go out to the sides.
  front: [0, 0, -22, 0, 22, 0, 9, 0, -9, 0],
  // Facing the viewer with one arm up (the motion layer animates the elbow).
  wave: [0, 0, -22, 0, 150, 0, 9, 0, -9, 0],
};

// Lengths of the body parts in rig units. At scale 1 the standing figure is about 90 units tall.
export const LIMBS = {
  torso: 30,
  neck: 4,
  head: 7.5,
  upperArm: 17,
  forearm: 16,
  thigh: 22,
  shin: 22,
  // The foot points forward from the ankle.
  foot: 6,
} as const;

export const LIMB_STROKE: number = 7;
export const TORSO_STROKE: number = 9;
export const HEAD_RADIUS: number = 7.5;

// Half of the widest stroke: the drawing reaches this far past its joints.
export const STROKE_REACH: number = TORSO_STROKE / 2;

// Feet touch the ground at the outer edge of their stroke, not at its centre line.
export const FOOT_REACH: number = LIMB_STROKE / 2;

// The viewBox reaches as far left of the hip as right of it.
export const SIDES: number = 2;

export const DEGREES_TO_RADIANS: number = Math.PI / 180;
