import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';

import type { AppRoute } from './app.types';
import {
  findRoute,
  hasPrerenderedContent,
  renderHead,
  renderSitemap,
  routeForLocation,
} from './app.utils';

function TestPage(): ReactElement | null {
  return null;
}

const HOME: AppRoute = {
  path: '/',
  page: TestPage,
  seo: { title: 'Home', description: 'The home page' },
  isIndexed: true,
};

const DESIGN: AppRoute = {
  path: '/design/',
  page: TestPage,
  seo: { title: 'Design', description: 'The gallery' },
  isIndexed: true,
};

const NOT_FOUND: AppRoute = {
  path: '/404.html',
  page: TestPage,
  seo: { title: 'Not found', description: 'Nothing here' },
  isIndexed: false,
};

const ROUTES: readonly AppRoute[] = [HOME, DESIGN, NOT_FOUND];

describe('findRoute', (): void => {
  it('returns the route with the given path', (): void => {
    expect(findRoute(ROUTES, '/design/')).toBe(DESIGN);
  });

  it('fails loudly for a path that has no route', (): void => {
    expect((): AppRoute => findRoute(ROUTES, '/missing/')).toThrow('/missing/');
  });
});

describe('routeForLocation', (): void => {
  it('returns the route with the address’s path', (): void => {
    expect(routeForLocation(ROUTES, NOT_FOUND, '/design/')).toBe(DESIGN);
  });

  it('treats a folder’s index.html as the folder', (): void => {
    expect(routeForLocation(ROUTES, NOT_FOUND, '/index.html')).toBe(HOME);
    expect(routeForLocation(ROUTES, NOT_FOUND, '/design/index.html')).toBe(
      DESIGN,
    );
  });

  it('returns the not-found route for any other address, as GitHub Pages serves 404.html there', (): void => {
    expect(routeForLocation(ROUTES, NOT_FOUND, '/missing/page')).toBe(
      NOT_FOUND,
    );
  });
});

describe('renderHead', (): void => {
  it('escapes the title and the description for HTML', (): void => {
    const route: AppRoute = {
      ...HOME,
      seo: { title: 'R&D "lab"', description: 'A <b>bold</b> claim' },
    };
    const head: string = renderHead(route, 'Alt');

    expect(head).toContain('<title>R&amp;D &quot;lab&quot;</title>');
    expect(head).toContain(
      '<meta name="description" content="A &lt;b&gt;bold&lt;/b&gt; claim" />',
    );
  });

  it('gives an indexed page a canonical link, Open Graph and a large Twitter card, with absolute URLs', (): void => {
    const head: string = renderHead(DESIGN, 'The sign at night');

    expect(head).toContain(
      '<link rel="canonical" href="https://rafalciecwierz.github.io/design/" />',
    );
    expect(head).toContain(
      '<meta property="og:url" content="https://rafalciecwierz.github.io/design/" />',
    );
    expect(head).toContain('<meta property="og:title" content="Design" />');
    expect(head).toContain(
      '<meta property="og:image" content="https://rafalciecwierz.github.io/og-image.png" />',
    );
    expect(head).toContain('<meta property="og:image:width" content="1200" />');
    expect(head).toContain(
      '<meta property="og:image:alt" content="The sign at night" />',
    );
    expect(head).toContain(
      '<meta name="twitter:card" content="summary_large_image" />',
    );
    expect(head).not.toContain('noindex');
  });

  it('keeps a page that is not indexed out of search results and previews', (): void => {
    const head: string = renderHead(NOT_FOUND, 'Alt');

    expect(head).toContain('<meta name="robots" content="noindex" />');
    expect(head).not.toContain('canonical');
    expect(head).not.toContain('og:');
  });
});

describe('renderSitemap', (): void => {
  it('lists the absolute URL of every indexed page, and only those', (): void => {
    const sitemap: string = renderSitemap(ROUTES);

    expect(sitemap).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/);
    expect(sitemap).toContain('<loc>https://rafalciecwierz.github.io/</loc>');
    expect(sitemap).toContain(
      '<loc>https://rafalciecwierz.github.io/design/</loc>',
    );
    expect(sitemap).not.toContain('404');
  });
});

describe('hasPrerenderedContent', (): void => {
  it('is false for the empty template, which holds only a comment', (): void => {
    const root: HTMLDivElement = document.createElement('div');
    root.append(document.createComment('app-html'));

    expect(hasPrerenderedContent(root)).toBe(false);
  });

  it('is true once the pre-rendered page is inside', (): void => {
    const root: HTMLDivElement = document.createElement('div');
    root.append(document.createElement('main'));

    expect(hasPrerenderedContent(root)).toBe(true);
  });
});
