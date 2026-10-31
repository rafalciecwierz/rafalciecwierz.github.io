import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ButtonLink } from './buttonLink.component';

const DOWNLOAD_LABEL: string = 'Download CV';
const CONTACT_LABEL: string = 'Get in touch';

describe('ButtonLink', (): void => {
  it('downloads the file when asked to, and its name is the label alone', (): void => {
    render(
      <ButtonLink
        href="/cv.pdf"
        variant="primary"
        icon="download"
        shouldDownload
      >
        {DOWNLOAD_LABEL}
      </ButtonLink>,
    );

    expect(screen.getByRole('link', { name: DOWNLOAD_LABEL })).toHaveAttribute(
      'download',
      '',
    );
  });

  it('is an ordinary link otherwise', (): void => {
    render(
      <ButtonLink href="#contact" variant="secondary">
        {CONTACT_LABEL}
      </ButtonLink>,
    );

    const link: HTMLElement = screen.getByRole('link', { name: CONTACT_LABEL });
    expect(link).toHaveAttribute('href', '#contact');
    expect(link).not.toHaveAttribute('download');
  });
});
