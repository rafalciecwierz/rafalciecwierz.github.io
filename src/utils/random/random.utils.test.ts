import { describe, expect, it } from 'vitest';

import { createRandom, hashString } from './random.utils';

describe('hashString', (): void => {
  it('gives the same number for the same text and a different one for other text', (): void => {
    expect(hashString('night session')).toBe(hashString('night session'));
    expect(hashString('night session')).not.toBe(hashString('day session'));
  });

  it('gives an unsigned 32-bit integer', (): void => {
    const hash: number = hashString('Ciećwierz');

    expect(Number.isInteger(hash)).toBe(true);
    expect(hash).toBeGreaterThanOrEqual(0);
    expect(hash).toBeLessThan(2 ** 32);
  });
});

describe('createRandom', (): void => {
  it('repeats the same sequence for the same seed, so the build and the browser agree', (): void => {
    const first: () => number = createRandom(42);
    const second: () => number = createRandom(42);

    const firstValues: number[] = [first(), first(), first()];
    expect([second(), second(), second()]).toEqual(firstValues);
  });

  it('returns numbers from 0 up to, but not including, 1', (): void => {
    const random: () => number = createRandom(7);

    for (let index: number = 0; index < 1000; index += 1) {
      const value: number = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
