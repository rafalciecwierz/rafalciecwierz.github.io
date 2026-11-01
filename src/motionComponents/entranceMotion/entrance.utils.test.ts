import { describe, expect, it } from 'vitest';

import type { PercentKeyframes } from './entrance.types';
import {
  pasteUpKeyframes,
  tiltOf,
  vaultKeyframes,
  vaultStart,
} from './entrance.utils';

describe('vaultKeyframes', (): void => {
  it('measures the jump in the title’s font size', (): void => {
    expect(vaultStart(100)).toEqual({
      x: -50,
      y: -90,
      rotation: -28,
      opacity: 0,
    });
    expect(vaultStart(200).y).toBe(-180);
  });

  it('starts invisible, ends standing in place, and is linear between keyframes', (): void => {
    const keyframes: PercentKeyframes = vaultKeyframes(100);

    expect(keyframes['0%']).toEqual(vaultStart(100));
    expect(keyframes['100%']).toEqual({
      x: 0,
      y: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    });
    expect(keyframes.easeEach).toBe('none');
  });
});

describe('pasteUpKeyframes', (): void => {
  it('starts turned against the tilt, swings past it and lands on it', (): void => {
    const keyframes: PercentKeyframes = pasteUpKeyframes(2);

    expect(keyframes['0%']).toMatchObject({ opacity: 0, rotation: -8 });
    expect(keyframes['70%']).toMatchObject({ rotation: 2.8 });
    expect(keyframes['100%']).toEqual({
      opacity: 1,
      y: 0,
      rotation: 2,
      scale: 1,
    });
  });
});

describe('tiltOf', (): void => {
  it('reads the tilt, and falls back to 0', (): void => {
    expect(tiltOf('-1.5')).toBe(-1.5);
    expect(tiltOf(undefined)).toBe(0);
    expect(tiltOf('tilted')).toBe(0);
  });
});
