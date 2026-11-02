import { describe, expect, it } from 'vitest';

import { BREAKPOINTS } from '@/constants';

import { mediaQueryBelow, mediaQueryFrom } from './media.utils';

describe('mediaQueryBelow', (): void => {
  it('matches the widths narrower than the breakpoint, like the SCSS below() mixin', (): void => {
    expect(mediaQueryBelow('md')).toBe(`(width < ${String(BREAKPOINTS.md)}px)`);
  });
});

describe('mediaQueryFrom', (): void => {
  it('matches the breakpoint and wider, like the SCSS from() mixin', (): void => {
    expect(mediaQueryFrom('lg')).toBe(`(width >= ${String(BREAKPOINTS.lg)}px)`);
  });
});
