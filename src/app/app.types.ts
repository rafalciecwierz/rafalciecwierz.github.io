import type { ComponentType } from 'react';

import type { PageSeo } from '@/content';

export type AppRoute = {
  path: string;
  page: ComponentType;
  seo: PageSeo;
  isIndexed: boolean;
};

export type AppProps = {
  route: AppRoute;
};

export type RenderResult = {
  head: string;
  html: string;
};

export type ServerEntry = {
  ROUTE_PATHS: readonly string[];
  render: (path: string) => RenderResult;
  SITEMAP: string;
};
