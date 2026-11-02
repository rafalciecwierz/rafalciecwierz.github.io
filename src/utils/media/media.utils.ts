import { type BreakpointName, BREAKPOINTS } from '@/constants';

// The media query for "narrower than the breakpoint", the same as below() in
// src/styles/_breakpoints.scss, so CSS and code switch at the same width.
export function mediaQueryBelow(name: BreakpointName): string {
  return `(width < ${String(BREAKPOINTS[name])}px)`;
}

// The media query for "the breakpoint and wider", the same as from() in
// src/styles/_breakpoints.scss.
export function mediaQueryFrom(name: BreakpointName): string {
  return `(width >= ${String(BREAKPOINTS[name])}px)`;
}
