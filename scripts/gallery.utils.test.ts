// @vitest-environment node
import { describe, expect, it } from 'vitest';

import {
  findBrokenLinks,
  findLocalLinks,
  resolveLink,
} from './gallery.utils.ts';

const PAGE: string = '/site/dist/design';
const ROOT: string = '/site/dist';

describe('findLocalLinks', (): void => {
  it('keeps links to files on the site, without #anchor or ?query', (): void => {
    const html: string =
      '<a href="prototypes/a.html">A</a> <a href="/">Site</a> <a href="iterations/b.html#top">B</a> <img src="c.png?v=1">';

    expect(findLocalLinks(html)).toEqual([
      'prototypes/a.html',
      '/',
      'iterations/b.html',
      'c.png',
    ]);
  });

  it('skips external links, mailto:, data: and in-page anchors', (): void => {
    const html: string =
      '<a href="https://github.com/x">G</a> <a href="mailto:a@b.c">M</a> <link href="data:,"> <a href="#main">Skip</a> <script src="//cdn.example/x.js"></script>';

    expect(findLocalLinks(html)).toEqual([]);
  });
});

describe('resolveLink', (): void => {
  it('resolves a relative link from the page folder', (): void => {
    expect(resolveLink('prototypes/a.html', PAGE, ROOT)).toBe(
      '/site/dist/design/prototypes/a.html',
    );
  });

  it('resolves a link that starts with / from the site root', (): void => {
    expect(resolveLink('/', PAGE, ROOT)).toBe('/site/dist/index.html');
  });

  it('opens index.html for a folder link', (): void => {
    expect(resolveLink('iterations/', PAGE, ROOT)).toBe(
      '/site/dist/design/iterations/index.html',
    );
  });
});

describe('findBrokenLinks', (): void => {
  const files: ReadonlySet<string> = new Set([
    '/site/dist/index.html',
    '/site/dist/design/prototypes/a.html',
  ]);
  function exists(file: string): boolean {
    return files.has(file);
  }

  it('accepts a page whose links all point to files', (): void => {
    const html: string =
      '<a href="/">Site</a> <a href="prototypes/a.html">A</a> <a href="https://github.com/x">G</a>';

    expect(findBrokenLinks(html, PAGE, ROOT, exists)).toEqual([]);
  });

  it('reports a missing file and a link out of the published folder', (): void => {
    const html: string =
      '<a href="prototypes/missing.html">X</a> <a href="../docs/DECISIONS.md">D</a>';

    expect(findBrokenLinks(html, PAGE, ROOT, exists)).toEqual([
      'prototypes/missing.html',
      '../docs/DECISIONS.md',
    ]);
  });
});
