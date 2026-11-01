import { renderToString } from 'react-dom/server';

import { content } from '@/content';

import { App } from './app.component';
import { ROUTES } from './app.constants';
import type { AppRoute, RenderResult } from './app.types';
import { findRoute, renderHead, renderSitemap } from './app.utils';

// Built for Node by `vite build --ssr` and called by scripts/prerender.ts at build time.

export const ROUTE_PATHS: readonly string[] = ROUTES.map(
  (route: AppRoute): string => route.path,
);

export const SITEMAP: string = renderSitemap(ROUTES);

export function render(path: string): RenderResult {
  const route: AppRoute = findRoute(ROUTES, path);

  return {
    head: renderHead(route, content.seo.imageAlt),
    html: renderToString(<App route={route} />),
  };
}
