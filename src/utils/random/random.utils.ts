import {
  FNV_OFFSET_BASIS,
  FNV_PRIME,
  MULBERRY_INCREMENT,
  MULBERRY_MULTIPLIER,
  MULBERRY_SHIFT_A,
  MULBERRY_SHIFT_B,
  MULBERRY_SHIFT_C,
  UINT32_RANGE,
} from './random.constants';

// Turns a text into a 32-bit number (FNV-1a), so a seed can be a readable word such as
// "night session" instead of a magic number.
export function hashString(text: string): number {
  let hash: number = FNV_OFFSET_BASIS;
  for (const character of text) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, FNV_PRIME);
  }
  return hash >>> 0;
}

// A seeded random number generator (Mulberry32). Math.random() would draw a different
// skyline on the server and in the browser; this one draws the same, so the pre-rendered SVG
// and the hydrated one match (docs/ARCHITECTURE.md section 10).
export function createRandom(seed: number): () => number {
  let state: number = seed;
  return (): number => {
    state = (state + MULBERRY_INCREMENT) | 0;
    let mixed: number = Math.imul(
      state ^ (state >>> MULBERRY_SHIFT_A),
      1 | state,
    );
    mixed =
      (mixed +
        Math.imul(
          mixed ^ (mixed >>> MULBERRY_SHIFT_B),
          MULBERRY_MULTIPLIER | mixed,
        )) ^
      mixed;
    return ((mixed ^ (mixed >>> MULBERRY_SHIFT_C)) >>> 0) / UINT32_RANGE;
  };
}
