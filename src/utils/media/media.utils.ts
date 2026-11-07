import { type BreakpointName, BREAKPOINTS } from '@/constants';

// The same as below() and from() in src/styles/_breakpoints.scss.
export function mediaQueryBelow(name: BreakpointName): string {
  return `(width < ${String(BREAKPOINTS[name])}px)`;
}

export function mediaQueryFrom(name: BreakpointName): string {
  return `(width >= ${String(BREAKPOINTS[name])}px)`;
}
