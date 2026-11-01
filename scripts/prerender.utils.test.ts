// @vitest-environment node
import { describe, expect, it } from 'vitest';

import type { RenderResult } from '../src/app/app.types';
import {
  fillTemplate,
  isServerEntry,
  outputFileFor,
} from './prerender.utils.ts';

const RESULT: RenderResult = {
  head: '<title>T</title>',
  html: '<main>Page</main>',
};

describe('fillTemplate', (): void => {
  it('replaces both markers with the rendered head and page', (): void => {
    const template: string =
      '<head><!--app-head--></head><div id="root"><!--app-html--></div>';

    expect(fillTemplate(template, RESULT)).toBe(
      '<head><title>T</title></head><div id="root"><main>Page</main></div>',
    );
  });

  it('fails when a marker is missing, instead of shipping an empty page', (): void => {
    expect((): string =>
      fillTemplate('<head><!--app-head--></head>', RESULT),
    ).toThrow('<!--app-html-->');
  });
});

describe('outputFileFor', (): void => {
  it('writes the home page to index.html at the root', (): void => {
    expect(outputFileFor('/site/dist', '/')).toBe('/site/dist/index.html');
  });

  it('writes any other page to index.html in its own folder', (): void => {
    expect(outputFileFor('/site/dist', '/design/')).toBe(
      '/site/dist/design/index.html',
    );
  });

  it('writes a path that names a file (the 404 page) to that file', (): void => {
    expect(outputFileFor('/site/dist', '/404.html')).toBe(
      '/site/dist/404.html',
    );
  });
});

describe('isServerEntry', (): void => {
  it('accepts a module with render(), ROUTE_PATHS and SITEMAP', (): void => {
    expect(
      isServerEntry({
        render: (): RenderResult => RESULT,
        ROUTE_PATHS: ['/'],
        SITEMAP: '<urlset />',
      }),
    ).toBe(true);
  });

  it('rejects anything else', (): void => {
    expect(isServerEntry(null)).toBe(false);
    expect(
      isServerEntry({ render: 'not a function', ROUTE_PATHS: ['/'] }),
    ).toBe(false);
    expect(isServerEntry({ render: (): RenderResult => RESULT })).toBe(false);
    expect(
      isServerEntry({ render: (): RenderResult => RESULT, ROUTE_PATHS: ['/'] }),
    ).toBe(false);
  });
});
