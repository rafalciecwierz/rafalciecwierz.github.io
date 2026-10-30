import { HomePage } from '@/pages';

import type { AppRoute } from './app.types';

// Every page of the site. scripts/prerender.ts writes one HTML file for each.
export const ROUTES: readonly AppRoute[] = [{ path: '/', page: HomePage }];

// The element in index.html that React renders into.
export const ROOT_ELEMENT_ID: string = 'root';
