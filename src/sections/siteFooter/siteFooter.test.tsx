import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Footer } from '@/content';

import { SiteFooter } from './siteFooter.component';

const FOOTER: Footer = {
  builtWith: 'Built with React',
  separator: '·',
  repoUrl: 'https://github.com/example/repo',
  repoLabel: 'Source on GitHub',
  sign: 'Test Name',
  copyright: (year: number, sign: string): string =>
    `© ${String(year)} ${sign}`,
  bubble: 'Bubble',
  sessionOver: 'Session over.',
  line: 'Line',
  backToTop: 'Back to the summit',
};

describe('SiteFooter', (): void => {
  it('is the contentinfo landmark with the build line, the repo link and the year', (): void => {
    render(<SiteFooter footer={FOOTER} year={2031} />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(
      screen.getByText(FOOTER.builtWith, { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: FOOTER.repoLabel }),
    ).toHaveAttribute('href', FOOTER.repoUrl);
    expect(screen.getByText('© 2031 Test Name')).toBeInTheDocument();
  });

  it('links back to the top, and the arrow is not part of the link name', (): void => {
    render(<SiteFooter footer={FOOTER} year={2031} />);

    expect(
      screen.getByRole('link', { name: FOOTER.backToTop }),
    ).toHaveAttribute('href', '#top');
  });
});
