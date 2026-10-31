// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { content } from '@/content';

import type { RenderResult } from './app.types';
import { render, ROUTE_PATHS } from './entryServer';

// Runs in Node, as the pre-render step does: no window and no document.
describe('render', (): void => {
  it('pre-renders every route without browser APIs', (): void => {
    for (const path of ROUTE_PATHS) {
      expect((): RenderResult => render(path)).not.toThrow();
    }
  });

  it('puts the heading in the HTML and the title in the head of the home page', (): void => {
    const result: RenderResult = render('/');

    expect(result.html).toContain(`<h1`);
    expect(result.html).toContain(content.profile.name);
    expect(result.head).toContain('<title>');
  });

  it('keeps the email address out of the HTML, so simple scrapers cannot read it', (): void => {
    const result: RenderResult = render('/');
    const { user, domain } = content.profile.email;

    expect(result.html).not.toContain(`${user}@${domain}`);
    expect(result.head).not.toContain(`${user}@${domain}`);
  });
});
