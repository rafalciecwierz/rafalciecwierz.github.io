import { POSTER_TILTS, POSTER_TONES } from './team.constants';
import type { PosterLook } from './team.types';

// The tilt and tone of the poster at this position; the pattern repeats every three posters,
// so a fourth quote needs no new design.
export function posterLook(index: number): PosterLook {
  return {
    tilt: POSTER_TILTS[index % POSTER_TILTS.length] ?? 0,
    tone: POSTER_TONES[index % POSTER_TONES.length] ?? 'paper',
  };
}
