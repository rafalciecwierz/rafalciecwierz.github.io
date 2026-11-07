import { ROLE_FLIP } from './heroMotion.constants';

// Letters settle left to right, and spaces stay spaces. `random` is passed in, so the test can
// make it repeatable.
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

export function roleFlipDuration(titleCount: number): number {
  return (
    (titleCount + 1) * ROLE_FLIP.flipDuration + titleCount * ROLE_FLIP.hold
  );
}
