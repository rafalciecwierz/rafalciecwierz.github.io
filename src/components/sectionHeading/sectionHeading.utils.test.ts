import { describe, expect, it } from 'vitest';

import { sectionNumber } from './sectionHeading.utils';

describe('sectionNumber', (): void => {
  it('returns the number of a numbered section', (): void => {
    expect(
      sectionNumber({ number: '01', kicker: 'Kicker', title: 'Title' }),
    ).toBe('01');
  });

  it('returns null for a section without a number', (): void => {
    expect(sectionNumber({ kicker: 'Kicker', title: 'Title' })).toBeNull();
  });
});
