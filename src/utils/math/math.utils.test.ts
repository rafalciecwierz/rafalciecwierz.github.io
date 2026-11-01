import { describe, expect, it } from 'vitest';

import { clamp, easeInOutQuad, lerp, smoothstep } from './math.utils';

describe('clamp', (): void => {
  it('keeps a value inside the range', (): void => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(12, 0, 10)).toBe(10);
  });
});

describe('lerp', (): void => {
  it('goes from the start to the end', (): void => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 0.25)).toBe(12.5);
    expect(lerp(10, 20, 1)).toBe(20);
  });
});

describe('smoothstep', (): void => {
  it('is 0 before the start, 1 after the end and a half in the middle', (): void => {
    expect(smoothstep(0.3, 0.5, 0.1)).toBe(0);
    expect(smoothstep(0.3, 0.5, 0.4)).toBeCloseTo(0.5);
    expect(smoothstep(0.3, 0.5, 0.9)).toBe(1);
  });
});

describe('easeInOutQuad', (): void => {
  it('starts and ends where the progress does, and is symmetric', (): void => {
    expect(easeInOutQuad(0)).toBe(0);
    expect(easeInOutQuad(0.5)).toBe(0.5);
    expect(easeInOutQuad(1)).toBe(1);
    expect(easeInOutQuad(0.25)).toBeCloseTo(1 - easeInOutQuad(0.75));
  });
});
