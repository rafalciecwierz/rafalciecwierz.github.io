import { describe, expect, it } from 'vitest';

import { pickActiveSection } from './useActiveSection.utils';

const IDS: readonly string[] = ['about', 'stack', 'career'];

describe('pickActiveSection', (): void => {
  it('marks the section in the reading band', (): void => {
    expect(pickActiveSection(IDS, new Set(['stack']))).toBe('stack');
  });

  it('marks the first in page order when two touch the band', (): void => {
    expect(pickActiveSection(IDS, new Set(['career', 'stack']))).toBe('stack');
  });

  it('marks none when the band is over a section outside the navigation', (): void => {
    expect(pickActiveSection(IDS, new Set())).toBeNull();
  });
});
