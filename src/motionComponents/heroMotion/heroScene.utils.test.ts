import { describe, expect, it } from 'vitest';

import type { PercentKeyframes } from '@/motion/keyframes.types';

import { signFlickerKeyframes, windowFlickerChance } from './heroScene.utils';

describe('signFlickerKeyframes', (): void => {
  it('starts dim, flickers and ends fully lit, in jumps', (): void => {
    const keyframes: PercentKeyframes = signFlickerKeyframes();

    expect(keyframes['0%']).toEqual({ opacity: 0.25 });
    expect(keyframes['30%']).toEqual({ opacity: 0.3 });
    expect(keyframes['100%']).toEqual({ opacity: 1 });
    expect(keyframes.easeEach).toBe('steps(1)');
  });
});

describe('windowFlickerChance', (): void => {
  it('switches a window about every 1.3 s on a 0.2 s clock', (): void => {
    expect(windowFlickerChance()).toBeCloseTo(0.2 / 1.3);
  });
});
