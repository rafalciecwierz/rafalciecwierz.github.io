import type { Hero } from '../hero.types';

export const hero: Hero = {
  meta: (time: string): readonly string[] => [
    'Summit',
    `Night session · ${time}`,
    'Rooftop',
  ],
  downloadCv: 'Download CV',
  getInTouch: 'Get in touch',
  startClimb: 'Start the climb ↓',
};
