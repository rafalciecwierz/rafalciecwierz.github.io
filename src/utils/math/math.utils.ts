import {
  HALF,
  QUADRATIC_SLOPE,
  SMOOTHSTEP_CUBE,
  SMOOTHSTEP_SQUARE,
} from './math.constants';

// Keeps a value between a minimum and a maximum.
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// The point `amount` of the way from `from` to `to`: 0 gives `from`, 1 gives `to`.
export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

// 0 before `edgeStart`, 1 after `edgeEnd`, and a smooth S-curve between them, so a change
// (such as slowing time down) fades in and out instead of switching on at once.
export function smoothstep(
  edgeStart: number,
  edgeEnd: number,
  value: number,
): number {
  const amount: number = clamp(
    (value - edgeStart) / (edgeEnd - edgeStart),
    0,
    1,
  );
  return amount * amount * (SMOOTHSTEP_SQUARE - SMOOTHSTEP_CUBE * amount);
}

// Starts slowly, speeds up, and slows down again (quadratic), for progress from 0 to 1. The
// same curve as GSAP's "power1.inOut", written here so pure code can use it without GSAP.
export function easeInOutQuad(progress: number): number {
  if (progress < HALF) {
    return QUADRATIC_SLOPE * progress * progress;
  }
  const fromEnd: number = 1 - progress;
  return 1 - QUADRATIC_SLOPE * fromEnd * fromEnd;
}
