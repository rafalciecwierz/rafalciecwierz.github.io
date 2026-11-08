import type { Pose, PoseName } from './runner.types';

export const POSES: Readonly<Record<PoseName, Pose>> = {
  stand: [4, 0, -10, 20, 12, 20, 4, -6, -4, -6],
  crouch: [36, -30, 50, -40, 34, -30, 100, -150, 86, -140],
  reach: [16, -12, 160, 0, 148, 6, 14, -8, -14, -28],
  tuck: [28, -22, 108, -62, 94, -52, 116, -136, 102, -130],
  land: [34, -20, 78, -8, 62, -4, 82, -118, 66, -106],
  runA: [17, -6, -46, 82, 52, 72, 52, -24, -30, -78],
  runB: [17, -6, 52, 72, -46, 82, -30, -78, 52, -24],
  kong: [70, -50, 18, 0, 30, 0, 108, -142, 96, -136],
  hand: [0, 0, 176, 0, 184, 0, 10, 0, -10, 0],
  front: [0, 0, -22, 0, 22, 0, 9, 0, -9, 0],
  wave: [0, 0, -22, 0, 150, 0, 9, 0, -9, 0],
};

export const LIMBS = {
  torso: 30,
  neck: 4,
  head: 7.5,
  upperArm: 17,
  forearm: 16,
  thigh: 22,
  shin: 22,
  foot: 6,
} as const;

export const LIMB_STROKE: number = 7;
export const TORSO_STROKE: number = 9;
export const HEAD_RADIUS: number = 7.5;

export const STROKE_REACH: number = TORSO_STROKE / 2;

export const FOOT_REACH: number = LIMB_STROKE / 2;

export const SIDES: number = 2;

export const DEGREES_TO_RADIANS: number = Math.PI / 180;

export const POSE_LENGTH: number = 10;

export const RIG_PART_ATTRIBUTE: string = 'data-rig-part';

export const OPACITY_DECIMALS: number = 3;
export const SCALE_DECIMALS: number = 3;

export const WAVE = { cycles: 3, elbowSwing: 38, shoulderSwing: 6 } as const;

export const FULL_CYCLE: number = Math.PI * 2;
