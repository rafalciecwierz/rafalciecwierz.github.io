import type { Quote } from '@/content';

// paper: off-white. sodium: printed on orange, for every second poster.
export type PosterTone = 'paper' | 'sodium';

export type PosterProps = {
  quote: Quote;
  heading: string;
  // "01"
  number: string;
  // "Frontend Developer · Mood up, 2024"
  caption: string;
  tone: PosterTone;
  // Degrees: a pasted poster is never quite straight.
  tilt: number;
  // The first poster sets its first sentence as a big headline.
  isLead: boolean;
};
