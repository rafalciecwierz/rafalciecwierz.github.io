// GSAP's ticker reports time in seconds; Lenis expects milliseconds.
export const MS_PER_SECOND: number = 1000;

// GSAP's default lag smoothing (gsap.ticker.lagSmoothing(500, 33)), restored when Lenis stops.
export const LAG_THRESHOLD: number = 500;
export const LAG_ADJUSTED_DELTA: number = 33;
