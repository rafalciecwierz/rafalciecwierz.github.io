import { describe, expect, it } from 'vitest';

import { BREAKPOINTS } from '@/constants';

import { mediaQueryBelow } from './media.utils';

describe('mediaQueryBelow', (): void => {
  it('matches the widths narrower than the breakpoint, like the SCSS below() mixin', (): void => {
    expect(mediaQueryBelow('md')).toBe(`(width < ${String(BREAKPOINTS.md)}px)`);
  });
});
