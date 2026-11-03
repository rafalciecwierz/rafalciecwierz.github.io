import { TAGLINE_SEPARATOR } from './heroIntro.constants';

// The tagline's lines on phones: split after the first middle dot, which stays at the end of
// the first line. A tagline without one is a single line.
export function taglineLines(tagline: string): string[] {
  const index: number = tagline.indexOf(TAGLINE_SEPARATOR);
  if (index === -1) {
    return [tagline];
  }
  return [
    tagline.slice(0, index + TAGLINE_SEPARATOR.length).trimEnd(),
    tagline.slice(index + TAGLINE_SEPARATOR.length),
  ];
}
