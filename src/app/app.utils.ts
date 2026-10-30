import type { Seo } from '@/content';
import { escapeHtml } from '@/utils';

import type { AppRoute } from './app.types';

export function findRoute(routes: readonly AppRoute[], path: string): AppRoute {
  const route: AppRoute | undefined = routes.find(
    (candidate: AppRoute): boolean => candidate.path === path,
  );
  if (route === undefined) {
    throw new Error(`No route is defined for "${path}".`);
  }
  return route;
}

// The <head> tags of a pre-rendered page. Task 3.10 adds Open Graph and the rest.
export function renderHead(seo: Seo): string {
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  ].join('\n');
}

// The dev server serves index.html without pre-rendered content, so there is nothing to hydrate.
export function hasPrerenderedContent(rootElement: HTMLElement): boolean {
  return rootElement.firstElementChild !== null;
}
