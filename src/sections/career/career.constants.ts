import type { BreakpointName } from '@/constants';

export const CAREER_TITLE_ID: string = 'career-title';

// The pinned run needs a wide screen: below this the career stays a list (as the reference).
export const RUN_BREAKPOINT: BreakpointName = 'lg';

// How high each job's building stands (0 to 1), newest first, as in the reference: every roof
// is higher than the last. A job beyond the list gets the lowest one.
export const BUILDING_HEIGHTS: readonly number[] = [0.86, 0.74, 0.58, 0.3];

// The unbuilt roof at the top of the line, "Your team?", is the highest.
export const NEXT_ROOF_HEIGHT: number = 1;

// The run starts on the oldest job's first move.
export const FIRST_MOVE: number = 0;
