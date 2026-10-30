import { describe, expect, it } from 'vitest';

import { escapeHtml } from './html.utils';

describe('escapeHtml', (): void => {
  it('replaces the characters that could break out of an attribute or a tag', (): void => {
    expect(escapeHtml(`<a href="x" title='y'>R&D</a>`)).toBe(
      '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;R&amp;D&lt;/a&gt;',
    );
  });

  it('leaves other text, including non-Latin letters, unchanged', (): void => {
    expect(escapeHtml('Rafał Ciećwierz · Frontend Engineer')).toBe(
      'Rafał Ciećwierz · Frontend Engineer',
    );
  });
});
