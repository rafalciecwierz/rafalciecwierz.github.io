// @vitest-environment node
import { describe, expect, it } from 'vitest';

import type { RawValue } from './cssModules.types';
import { findRawValues } from './cssModules.utils.ts';

function rulesFound(scss: string): string[] {
  return findRawValues(scss).map((found: RawValue): string => found.rule);
}

describe('findRawValues', (): void => {
  it('accepts a module that uses only tokens', (): void => {
    const scss: string = `
      .card {
        color: var(--color-chalk);
        font: var(--font-weight-black) var(--font-size-card-title) / var(--line-height-display) var(--font-display);
        transition: transform var(--duration-fast) var(--ease-out);
        z-index: 2;
      }`;

    expect(findRawValues(scss)).toEqual([]);
  });

  it('finds hex and functional colours', (): void => {
    expect(rulesFound('.a { color: #FF9F38; }')).toEqual(['colour']);
    expect(rulesFound('.a { background: rgba(11, 11, 14, .8); }')).toEqual([
      'colour',
    ]);
    expect(rulesFound('.a { color: hsl(30 100% 60%); }')).toEqual(['colour']);
  });

  it('finds a font family named in the module', (): void => {
    expect(rulesFound(`.a { font-family: 'Barlow', sans-serif; }`)).toEqual([
      'font family',
    ]);
    expect(rulesFound('.a { font: 800 20px/1 system-ui; }')).toContain(
      'font family',
    );
  });

  it('finds a font size written as a number', (): void => {
    expect(rulesFound('.a { font-size: 17px; }')).toEqual(['font size']);
    expect(
      rulesFound('.a { font: 800 1.25rem/1 var(--font-display); }'),
    ).toEqual(['font size']);
  });

  it('finds a duration written as a number', (): void => {
    expect(rulesFound('.a { transition: opacity .3s; }')).toEqual(['duration']);
    expect(rulesFound('.a { animation: ping 1200ms infinite; }')).toEqual([
      'duration',
    ]);
  });

  it('finds a page-wide z-index written as a number, but allows local stacking', (): void => {
    expect(rulesFound('.a { z-index: 50; }')).toEqual(['z-index']);
    expect(rulesFound('.a { z-index: -1; }')).toEqual([]);
  });

  it('ignores comments', (): void => {
    expect(
      findRawValues(
        '// was #FF9F38\n.a { /* 17px */ color: var(--color-sodium); }',
      ),
    ).toEqual([]);
  });

  it('reports the line of each raw value', (): void => {
    expect(findRawValues('.a {\n  color: red;\n  color: #fff;\n}')).toEqual([
      { rule: 'colour', line: 3, text: 'color: #fff;' },
    ]);
  });
});
