import { describe, expect, it } from 'vitest';

import { scrambleText } from './roleFlip.utils';

function alwaysFirstGlyph(): number {
  return 0;
}

describe('scrambleText', (): void => {
  it('is all glyphs (except spaces) before the first letter settles', (): void => {
    expect(scrambleText('Frontend', 'Climb it', 0, alwaysFirstGlyph)).toBe(
      'AAAAA AA',
    );
  });

  it('settles from left to right and ends on the new title', (): void => {
    const middle: string = scrambleText(
      'Frontend',
      'Climbing',
      0.6,
      alwaysFirstGlyph,
    );

    expect(middle.startsWith('Cli')).toBe(true);
    expect(middle.endsWith('A')).toBe(true);
    expect(scrambleText('Frontend', 'Climbing', 1, alwaysFirstGlyph)).toBe(
      'Climbing',
    );
  });

  it('drops the extra letters when the new title is shorter', (): void => {
    expect(scrambleText('Fullstack wannabe', 'Role', 1, alwaysFirstGlyph)).toBe(
      'Role',
    );
  });
});
