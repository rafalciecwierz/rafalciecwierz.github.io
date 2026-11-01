import { ROLE_FLIP } from './heroMotion.constants';

// One frame of the split-flap scramble from one title to the next. Each letter shows a random
// glyph until its moment to settle, then the new title's letter; letters settle left to right,
// and spaces stay spaces. `random` is passed in, so the test can make it repeatable.
export function scrambleText(
  from: string,
  to: string,
  progress: number,
  random: () => number,
): string {
  const length: number = Math.max(from.length, to.length);
  let text: string = '';
  for (let index: number = 0; index < length; index += 1) {
    const settlesAt: number =
      ROLE_FLIP.settleStart + (index / length) * ROLE_FLIP.settleSpread;
    const target: string = to[index] ?? '';
    if (progress >= settlesAt || target === ' ') {
      text += target;
    } else {
      text +=
        ROLE_FLIP.glyphs[Math.floor(random() * ROLE_FLIP.glyphs.length)] ?? '';
    }
  }
  return text;
}
