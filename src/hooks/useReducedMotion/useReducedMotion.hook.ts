import { useMediaQuery } from '@/hooks/useMediaQuery';

import { REDUCED_MOTION_QUERY } from './useReducedMotion.constants';

// Whether the reader asked for less motion: the single source of truth for every animation
// (docs/ARCHITECTURE.md section 9). On the server and during hydration it answers "reduce",
// because the pre-rendered HTML is the reduced-motion version of the site. After hydration it
// follows the system setting, also when it changes while the page is open.
export function useReducedMotion(): boolean {
  return useMediaQuery(REDUCED_MOTION_QUERY, true);
}
