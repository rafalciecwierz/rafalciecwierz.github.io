import type { BreakpointName } from '@/constants';

// The id the Menu button points to with aria-controls.
export const NAV_ID: string = 'site-nav';

// Below this width the links move into the full-screen menu (nav.module.scss uses below(md)).
export const MOBILE_MENU_BREAKPOINT: BreakpointName = 'md';
