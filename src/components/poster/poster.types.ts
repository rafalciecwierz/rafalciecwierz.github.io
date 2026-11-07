import type { Quote } from '@/content';

export type PosterTone = 'paper' | 'sodium';

export type PosterProps = {
  quote: Quote;
  heading: string;
  number: string;
  caption: string;
  tone: PosterTone;
  tilt: number;
  isLead: boolean;
};
