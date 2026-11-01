import type { MOTION_TARGETS } from './motion.constants';

export type MotionTarget = (typeof MOTION_TARGETS)[keyof typeof MOTION_TARGETS];
