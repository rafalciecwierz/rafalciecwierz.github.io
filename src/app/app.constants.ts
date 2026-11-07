import { PAGE_PATHS } from '@/constants';
import { content } from '@/content';
import { HomePage, NotFoundPage } from '@/pages';

import type { AppRoute } from './app.types';

export const NOT_FOUND_ROUTE: AppRoute = {
  path: PAGE_PATHS.notFound,
  page: NotFoundPage,
  seo: content.seo.notFound,
  isIndexed: false,
};

export const ROUTES: readonly AppRoute[] = [
  {
    path: PAGE_PATHS.home,
    page: HomePage,
    seo: content.seo.home,
    isIndexed: true,
  },
  NOT_FOUND_ROUTE,
];

export const ROOT_ELEMENT_ID: string = 'root';
