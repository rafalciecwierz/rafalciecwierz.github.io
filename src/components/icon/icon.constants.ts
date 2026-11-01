import type { IconName } from './icon.types';

// Every icon is drawn with square-capped lines on a 24 × 24 grid.
export const ICON_VIEW_BOX: string = '0 0 24 24';

export const ICON_STROKE_WIDTH: number = 2.4;

export const ICON_PATHS: Readonly<Record<IconName, string>> = {
  download: 'M12 3v12m0 0-5-5m5 5 5-5M4 20h16',
  arrowRight: 'M4 12h15m0 0-6-6m6 6-6 6',
  arrowUp: 'M12 20V5m0 0-6 6m6-6 6 6',
};
