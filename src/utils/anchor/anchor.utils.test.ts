import { describe, expect, it } from 'vitest';

import { SECTION_IDS } from '@/constants';

import { anchorHref } from './anchor.utils';

describe('anchorHref', (): void => {
  it('links to a section on the same page', (): void => {
    expect(anchorHref(SECTION_IDS.career)).toBe('#career');
  });
});
