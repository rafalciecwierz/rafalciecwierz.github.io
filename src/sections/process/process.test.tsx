import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Process as ProcessContent } from '@/content';

import { Process } from './process.component';

const PROCESS: ProcessContent = {
  heading: { number: '05', kicker: 'AI & process', title: 'The leap' },
  intro: 'Intro',
  sceneSigns: ['Frontend', 'AI'],
  replay: 'Replay the leap',
  how: { title: 'How I work with AI', paragraphs: null, todo: 'How to come' },
  site: {
    title: 'How this site was made',
    paragraphs: ['Sixteen prototypes.'],
    facts: [{ value: '16', label: 'design prototypes' }],
    source: 'Counts from the repository.',
    role: null,
    roleTodo: 'Role to come',
    galleryLabel: 'See all 16 prototypes',
    galleryUrl: null,
  },
};

describe('Process', (): void => {
  it('tells how the site was made, and marks what is still missing', (): void => {
    render(<Process process={PROCESS} />);

    expect(screen.getByRole('region', { name: 'The leap' })).toHaveAttribute(
      'id',
      'process',
    );
    expect(
      screen.getByRole('heading', { level: 3, name: 'How this site was made' }),
    ).toBeInTheDocument();
    expect(screen.getByText('How to come')).toBeInTheDocument();
    expect(screen.getByText('Role to come')).toBeInTheDocument();
    expect(screen.getByRole('term')).toHaveTextContent('16');
  });

  it('links the gallery once it has an address', (): void => {
    render(
      <Process
        process={{
          ...PROCESS,
          site: { ...PROCESS.site, galleryUrl: '/design/' },
        }}
      />,
    );

    expect(
      screen.getByRole('link', { name: 'See all 16 prototypes' }),
    ).toHaveAttribute('href', '/design/');
  });
});
