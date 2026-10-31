// The widths (in px) where the layout changes. The same values are in
// src/styles/_breakpoints.scss, because CSS media queries cannot read TypeScript;
// scripts/breakpoints.test.ts fails if the two differ. What each one changes is
// listed in that file.
export const BREAKPOINTS = {
  xs: 520,
  sm: 600,
  md: 760,
  lg: 900,
  xl: 960,
  xxl: 1000,
} as const;
