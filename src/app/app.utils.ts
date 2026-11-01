import { INDEX_FILE_NAME, SHARE_IMAGE, SITE_URL } from '@/constants';
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

// The route the browser shows for its address. "/index.html" is the same file as "/", and any
// address without a page was answered by GitHub Pages with 404.html.
export function routeForLocation(
  routes: readonly AppRoute[],
  notFoundRoute: AppRoute,
  pathname: string,
): AppRoute {
  const path: string = pathname.endsWith(`/${INDEX_FILE_NAME}`)
    ? pathname.slice(0, -INDEX_FILE_NAME.length)
    : pathname;
  return (
    routes.find((route: AppRoute): boolean => route.path === path) ??
    notFoundRoute
  );
}

// Link previews and search engines need full addresses, not paths.
function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

function metaName(name: string, content: string): string {
  return `<meta name="${name}" content="${escapeHtml(content)}" />`;
}

function metaProperty(property: string, content: string): string {
  return `<meta property="${property}" content="${escapeHtml(content)}" />`;
}

// The <head> tags of a pre-rendered page (brief section 9). They are in the HTML the server
// sends, because LinkedIn and other link previews do not run JavaScript.
export function renderHead(route: AppRoute, imageAlt: string): string {
  const basics: string[] = [
    `<title>${escapeHtml(route.seo.title)}</title>`,
    metaName('description', route.seo.description),
  ];
  if (!route.isIndexed) {
    return [...basics, metaName('robots', 'noindex')].join('\n');
  }

  const pageUrl: string = absoluteUrl(route.path);
  return [
    ...basics,
    `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
    metaProperty('og:type', 'website'),
    metaProperty('og:url', pageUrl),
    metaProperty('og:title', route.seo.title),
    metaProperty('og:description', route.seo.description),
    metaProperty('og:image', absoluteUrl(SHARE_IMAGE.path)),
    metaProperty('og:image:width', String(SHARE_IMAGE.width)),
    metaProperty('og:image:height', String(SHARE_IMAGE.height)),
    metaProperty('og:image:alt', imageAlt),
    // X reads the title, description and image from the Open Graph tags; it only needs the card type.
    metaName('twitter:card', 'summary_large_image'),
  ].join('\n');
}

// The sitemap search engines read (linked from public/robots.txt): every indexed page.
export function renderSitemap(routes: readonly AppRoute[]): string {
  const entries: string[] = routes
    .filter((route: AppRoute): boolean => route.isIndexed)
    .map(
      (route: AppRoute): string =>
        `  <url><loc>${escapeHtml(absoluteUrl(route.path))}</loc></url>`,
    );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

// The dev server serves index.html without pre-rendered content, so there is nothing to hydrate.
export function hasPrerenderedContent(rootElement: HTMLElement): boolean {
  return rootElement.firstElementChild !== null;
}
