// @vitest-environment node
// The breakpoints live twice, in SCSS for media queries and in TypeScript for code
// (docs/ARCHITECTURE.md section 8). This test fails when the two differ. It lives in scripts/
// because it reads the SCSS file with Node.
import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { BREAKPOINTS } from '../src/constants/breakpoints/breakpoints.constants.ts';

const SCSS_FILE: URL = new URL(
  '../src/styles/_breakpoints.scss',
  import.meta.url,
);

// Reads `$breakpoints: ( xs: 520px, … );` from the SCSS file as { xs: 520, … }.
function readScssBreakpoints(scss: string): Record<string, number> {
  const map: string | undefined = /\$breakpoints:\s*\(([^)]*)\)/.exec(
    scss,
  )?.[1];
  if (map === undefined) {
    throw new Error('_breakpoints.scss has no $breakpoints map.');
  }
  return Object.fromEntries(
    [...map.matchAll(/(\w+):\s*(\d+)px/g)].map(
      (entry: RegExpExecArray): [string, number] => [
        entry[1] ?? '',
        Number(entry[2]),
      ],
    ),
  );
}

describe('BREAKPOINTS', (): void => {
  it('match the media query breakpoints in _breakpoints.scss', (): void => {
    expect(readScssBreakpoints(readFileSync(SCSS_FILE, 'utf8'))).toEqual(
      BREAKPOINTS,
    );
  });
});
