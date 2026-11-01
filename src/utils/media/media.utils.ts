import { type BreakpointName, BREAKPOINTS } from '@/constants';

// The media query for "narrower than the breakpoint", the same as below() in
// src/styles/_breakpoints.scss, so CSS and code switch at the same width.
export function mediaQueryBelow(name: BreakpointName): string {
  return `(width < ${String(BREAKPOINTS[name])}px)`;
}
