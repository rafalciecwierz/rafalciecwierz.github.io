import type { ComponentType } from 'react';

import type { PageSeo } from '@/content';

export type AppRoute = {
  path: string;
  page: ComponentType;
  seo: PageSeo;
  // An indexed page gets a canonical link, sharing tags and a place in the sitemap. The 404
  // page is not indexed: search engines are told to skip it.
  isIndexed: boolean;
};

export type AppProps = {
  route: AppRoute;
};

// What the server entry returns for one route: the tags for <head> and the page's HTML.
export type RenderResult = {
  head: string;
  html: string;
};

// The interface of the built server entry (dist-server/entryServer.js), as scripts/prerender.ts uses it.
export type ServerEntry = {
  ROUTE_PATHS: readonly string[];
  render: (path: string) => RenderResult;
  // The sitemap of the indexed pages, written to dist/sitemap.xml.
  SITEMAP: string;
};
