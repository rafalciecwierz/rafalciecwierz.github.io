import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';

import type { Seo } from '@/content';

import type { AppRoute } from './app.types';
import { findRoute, hasPrerenderedContent, renderHead } from './app.utils';

function TestPage(): ReactElement | null {
  return null;
}

const ROUTES: readonly AppRoute[] = [
  { path: '/', page: TestPage },
  { path: '/design/', page: TestPage },
];

describe('findRoute', (): void => {
  it('returns the route with the given path', (): void => {
    expect(findRoute(ROUTES, '/design/')).toBe(ROUTES[1]);
  });

  it('fails loudly for a path that has no route', (): void => {
    expect((): AppRoute => findRoute(ROUTES, '/missing/')).toThrow('/missing/');
  });
});

describe('renderHead', (): void => {
  it('writes the title and the description, escaped for HTML', (): void => {
    const seo: Seo = { title: 'R&D "lab"', description: 'A <b>bold</b> claim' };

    expect(renderHead(seo)).toBe(
      '<title>R&amp;D &quot;lab&quot;</title>\n' +
        '<meta name="description" content="A &lt;b&gt;bold&lt;/b&gt; claim" />',
    );
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
