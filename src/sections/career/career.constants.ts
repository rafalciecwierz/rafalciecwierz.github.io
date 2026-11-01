export const CAREER_TITLE_ID: string = 'career-title';

// How high each job's building stands (0 to 1), newest first, as in the reference: every roof
// is higher than the last. A job beyond the list gets the lowest one.
export const BUILDING_HEIGHTS: readonly number[] = [0.86, 0.74, 0.58, 0.3];

// The unbuilt roof at the top of the line, "Your team?", is the highest.
export const NEXT_ROOF_HEIGHT: number = 1;
