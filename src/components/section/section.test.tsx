import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Section } from './section.component';

const TITLE: string = 'About';

describe('Section', (): void => {
  it('is a region named by its heading, with the anchor id', (): void => {
    render(
      <Section id="about" labelledBy="about-title">
        <h2 id="about-title">{TITLE}</h2>
      </Section>,
    );

    expect(screen.getByRole('region', { name: TITLE })).toHaveAttribute(
      'id',
      'about',
    );
  });

  it('takes focus from a link to it, without joining the Tab order', (): void => {
    render(
      <Section id="team" labelledBy="team-title">
        <h2 id="team-title">{TITLE}</h2>
      </Section>,
    );

    expect(screen.getByRole('region', { name: TITLE })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });
});
