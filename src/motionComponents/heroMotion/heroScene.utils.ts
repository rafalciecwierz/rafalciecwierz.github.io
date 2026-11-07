import type { PercentKeyframes } from '@/motion/keyframes.types';

import { PERCENT, SIGN_FLICKER, WINDOW_FLICKER } from './heroMotion.constants';

export function signFlickerKeyframes(): PercentKeyframes {
  const keyframes: PercentKeyframes = { easeEach: SIGN_FLICKER.ease };
  return SIGN_FLICKER.steps.reduce(
    (
      all: PercentKeyframes,
      [at, opacity]: readonly [number, number],
    ): PercentKeyframes => ({
      ...all,
      [`${String(at * PERCENT)}%`]: { opacity },
    }),
    keyframes,
  );
}

// The chance that a window switches on a tick of the clock, so one switches about every
// averageGap seconds.
export function windowFlickerChance(): number {
  return WINDOW_FLICKER.tick / WINDOW_FLICKER.averageGap;
}
