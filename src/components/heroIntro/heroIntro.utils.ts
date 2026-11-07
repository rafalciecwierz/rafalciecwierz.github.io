import { TAGLINE_SEPARATOR } from './heroIntro.constants';

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
