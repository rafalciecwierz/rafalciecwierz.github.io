import { PAGE_PATHS } from '@/constants';
import { content } from '@/content';
import { HomePage, NotFoundPage } from '@/pages';

import type { AppRoute } from './app.types';

// GitHub Pages serves 404.html for every address without a file, so in the browser this route
// stands for any unknown path (routeForLocation).
export const NOT_FOUND_ROUTE: AppRoute = {
  path: PAGE_PATHS.notFound,
  page: NotFoundPage,
  seo: content.seo.notFound,
  isIndexed: false,
};

// Every page of the site. scripts/prerender.ts writes one HTML file for each.
export const ROUTES: readonly AppRoute[] = [
  {
    path: PAGE_PATHS.home,
    page: HomePage,
    seo: content.seo.home,
    isIndexed: true,
  },
  NOT_FOUND_ROUTE,
];

// The element in index.html that React renders into.
export const ROOT_ELEMENT_ID: string = 'root';
