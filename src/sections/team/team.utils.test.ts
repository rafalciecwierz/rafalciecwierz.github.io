import { describe, expect, it } from 'vitest';

import { posterLook } from './team.utils';

describe('posterLook', (): void => {
  it('makes the middle poster of every three orange', (): void => {
    expect(posterLook(0).tone).toBe('paper');
    expect(posterLook(1).tone).toBe('sodium');
    expect(posterLook(4).tone).toBe('sodium');
  });

  it('repeats the tilts every three posters', (): void => {
    expect(posterLook(3).tilt).toBe(posterLook(0).tilt);
    expect(posterLook(0).tilt).not.toBe(posterLook(1).tilt);
  });
});
