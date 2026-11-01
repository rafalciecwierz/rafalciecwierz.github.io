import { describe, expect, it } from 'vitest';

import { POSES, type RigState } from '@/components';

import type { RigSpot } from './heroMotion.types';
import {
  flipState,
  handstandHoldState,
  handstandTurnState,
  kongTarget,
} from './tricks.utils';

const SPOT: RigSpot = { x: 100, y: 200, scale: 0.8, facing: 1 };

describe('the tricks', (): void => {
  it('flips one full turn and lands where it took off', (): void => {
    const end: RigState = flipState(SPOT, -1, 1);

    expect(end.spin).toBe(-360);
    expect(end.y).toBeCloseTo(SPOT.y);
    expect(flipState({ ...SPOT, facing: -1 }, -1, 1).spin).toBe(360);
  });

  it('kicks up to a handstand and steps down a full turn later, on the ground', (): void => {
    expect(handstandTurnState(SPOT, true, 1)).toMatchObject({
      spin: 180,
      isGrounded: true,
    });
    expect(handstandHoldState(SPOT, 0.3).spin).toBe(180);
    expect(handstandTurnState(SPOT, false, 1)).toMatchObject({
      spin: 360,
      pose: POSES.crouch,
    });
  });

  it('vaults two letters on, or back when there is no room', (): void => {
    expect(kongTarget(3, 14)).toBe(5);
    expect(kongTarget(13, 14)).toBe(11);
    expect(kongTarget(0, 2)).toBe(1);
  });
});
