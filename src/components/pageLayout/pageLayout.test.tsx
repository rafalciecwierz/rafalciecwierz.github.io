import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PageLayout } from './pageLayout.component';

const SKIP_LABEL: string = 'Skip to content';
const HEADER: string = 'Header';
const CONTENT: string = 'Content';
const FOOTER: string = 'Footer';

describe('PageLayout', (): void => {
  it('puts the header, the content and the footer in their landmarks', (): void => {
    render(
      <PageLayout
        skipLinkLabel={SKIP_LABEL}
        header={<header>{HEADER}</header>}
        footer={<footer>{FOOTER}</footer>}
      >
        {CONTENT}
      </PageLayout>,
    );

    expect(screen.getByRole('banner')).toHaveTextContent(HEADER);
    expect(screen.getByRole('main')).toHaveTextContent(CONTENT);
    expect(screen.getByRole('contentinfo')).toHaveTextContent(FOOTER);
  });

  it('makes the skip link the first Tab stop, pointing at the main content', async (): Promise<void> => {
    render(
      <PageLayout
        skipLinkLabel={SKIP_LABEL}
        header={<a href="#top">{HEADER}</a>}
        footer={null}
      >
        {CONTENT}
      </PageLayout>,
    );

    await userEvent.tab();

    const skipLink: HTMLElement = screen.getByRole('link', {
      name: SKIP_LABEL,
    });
    expect(skipLink).toHaveFocus();
    expect(skipLink).toHaveAttribute('href', `#${screen.getByRole('main').id}`);
  });
});
