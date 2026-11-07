import {
  HALF,
  QUADRATIC_SLOPE,
  SMOOTHSTEP_CUBE,
  SMOOTHSTEP_SQUARE,
} from './math.constants';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

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

// GSAP's "power1.inOut", for pure code that does not import GSAP.
export function easeInOutQuad(progress: number): number {
  if (progress < HALF) {
    return QUADRATIC_SLOPE * progress * progress;
  }
  const fromEnd: number = 1 - progress;
  return 1 - QUADRATIC_SLOPE * fromEnd * fromEnd;
}
