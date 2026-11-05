// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { GALLERY_CORRECTIONS } from './gallery.corrections.ts';
import type { GalleryCorrection } from './gallery.types.ts';
import {
  addDraftNote,
  applyCorrections,
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

describe('applyCorrections', (): void => {
  const correction: GalleryCorrection = {
    find: 'at my team’s request',
    replace: 'backed by a great team',
    count: 2,
  };

  it('replaces every occurrence, in every page', (): void => {
    const pages: Map<string, string> = new Map<string, string>([
      ['a.html', 'moved at my team’s request.'],
      ['b.html', 'Also at my team’s request.'],
    ]);

    expect(applyCorrections(pages, [correction])).toEqual(
      new Map([
        ['a.html', 'moved backed by a great team.'],
        ['b.html', 'Also backed by a great team.'],
      ]),
    );
  });

  it('leaves the pages it is given unchanged', (): void => {
    const pages: Map<string, string> = new Map<string, string>([
      ['a.html', 'at my team’s request'],
      ['b.html', 'at my team’s request'],
    ]);

    applyCorrections(pages, [correction]);

    expect(pages.get('a.html')).toBe('at my team’s request');
  });

  it('fails when a sentence is no longer found', (): void => {
    const pages: Map<string, string> = new Map<string, string>([
      ['a.html', 'reworded'],
    ]);

    expect((): void => {
      applyCorrections(pages, [correction]);
    }).toThrow('found 0 times, expected 2: "at my team’s request"');
  });

  it('fails when a sentence is found a different number of times', (): void => {
    const pages: Map<string, string> = new Map<string, string>([
      ['a.html', 'at my team’s request'],
    ]);

    expect((): void => {
      applyCorrections(pages, [correction]);
    }).toThrow('found 1 times, expected 2');
  });
});

describe('GALLERY_CORRECTIONS', (): void => {
  it.each(GALLERY_CORRECTIONS)(
    'has a replacement that is safe inside a JS string and in HTML: $replace',
    ({ replace }: GalleryCorrection): void => {
      expect(replace).not.toMatch(/['"`<>&\\]/);
    },
  );
});

describe('addDraftNote', (): void => {
  it('puts the note right before </body>', (): void => {
    expect(
      addDraftNote('<body><main></main></body></html>', '<aside></aside>'),
    ).toBe('<body><main></main><aside></aside></body></html>');
  });

  it('fails on a page without </body>', (): void => {
    expect((): void => {
      addDraftNote('<main></main>', '<aside></aside>');
    }).toThrow('</body>');
  });
});
