import { describe, expect, it } from 'vitest';

import { POSES } from '@/components';

import {
  dropState,
  raiseArmState,
  rollState,
  standUpState,
  streetGeometry,
  turnState,
  waveState,
} from './footerLanding.utils';
import type { StreetGeometry } from './footerMotion.types';

const STREET: StreetGeometry = streetGeometry(1000, 170, false);

describe('streetGeometry', (): void => {
  it('puts his spot where the static runner stands and scales him by the street', (): void => {
    expect(STREET).toEqual({ x: 800, ground: 170, scale: 170 / 150 });
    expect(streetGeometry(400, 170, true).x).toBeCloseTo(312);
  });

  it('keeps his size within limits', (): void => {
    expect(streetGeometry(1000, 600, false).scale).toBe(1.2);
    expect(streetGeometry(1000, 60, false).scale).toBe(0.8);
  });
});

describe('the landing', (): void => {
  it('starts above the street and touches down where the roll begins', (): void => {
    expect(dropState(STREET, 0).y).toBeLessThan(0);
    expect(dropState(STREET, 1).y).toBe(STREET.ground);
    expect(dropState(STREET, 1).x).toBe(rollState(STREET, 0).x);
  });

  it('rolls one full turn on the ground and ends crouched at his spot', (): void => {
    expect(rollState(STREET, 0.5).isGrounded).toBe(true);
    expect(rollState(STREET, 1)).toMatchObject({ x: STREET.x, spin: 360 });
    expect(rollState(STREET, 1).pose).toEqual(POSES.crouch);
  });

  it('flows from one part into the next without a jump in the pose', (): void => {
    expect(standUpState(STREET, 0).pose).toEqual(rollState(STREET, 1).pose);
    expect(turnState(STREET, 0).pose).toEqual(standUpState(STREET, 1).pose);
    expect(raiseArmState(STREET, 0).pose).toEqual(turnState(STREET, 1).pose);
    expect(waveState(STREET, 0).pose).toEqual(raiseArmState(STREET, 1).pose);
  });

  it('ends on the static waving pose, so the static runner can take over', (): void => {
    const end: readonly number[] = waveState(STREET, 1).pose;

    end.forEach((angle: number, index: number): void => {
      expect(angle).toBeCloseTo(POSES.wave[index] ?? Number.NaN);
    });
  });
});
