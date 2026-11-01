import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Career as CareerContent } from '@/content';

import { Career } from './career.component';

const CAREER: CareerContent = {
  heading: { number: '03', kicker: 'The line', title: 'Career' },
  intro: 'Intro',
  skipRun: 'Skip the run',
  promoted: 'Promoted',
  stackLabel: 'Stack',
  moveNames: ['Move 01', 'Move 02', 'Move 03', 'Next roof'],
  next: {
    sign: 'Next',
    company: 'Your team?',
    role: 'Frontend Engineer',
    text: 'Not built yet.',
    cta: 'Get in touch',
  },
  jobs: [
    {
      id: 'newer',
      company: 'Newer Co',
      sign: 'Newer',
      roles: ['Engineer'],
      period: {
        start: { year: 2024, month: 1 },
        end: { year: 2025, month: 6 },
      },
      points: ['Built things.'],
      stack: ['React'],
    },
    {
      id: 'older',
      company: 'Older Co',
      sign: 'Older',
      roles: ['QA', 'Developer'],
      period: {
        start: { year: 2021, month: 7 },
        end: { year: 2023, month: 12 },
      },
      points: ['Tested things.'],
      stack: ['Cypress'],
    },
  ],
  educationLabel: 'Before the first roof',
  educationDetail: (degree: string, years: string): string =>
    `${degree}, ${years}`,
  education: {
    school: 'University',
    degree: 'Degree',
    years: { start: 2015, end: 2021 },
  },
};

describe('Career', (): void => {
  it('lists the next roof first, then the jobs newest first, as an ordered list', (): void => {
    const { container } = render(
      <Career career={CAREER} availability="Open to roles." />,
    );

    const titles: string[] = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading: HTMLElement): string => heading.textContent);
    expect(titles).toEqual(['Your team?', 'Newer Co', 'Older Co']);
    expect(container.querySelector('ol')?.children).toHaveLength(
      CAREER.jobs.length + 1,
    );
  });

  it('says a promotion in words and names the moves of each job', (): void => {
    render(<Career career={CAREER} availability="Open to roles." />);

    expect(screen.getByText('Promoted')).toBeInTheDocument();
    expect(screen.getByText('Move 01')).toBeInTheDocument();
    expect(screen.getByText('Move 02')).toBeInTheDocument();
    expect(screen.getByText('Move 03')).toBeInTheDocument();
  });

  it('ends with the education line and offers the contact', (): void => {
    render(<Career career={CAREER} availability="Open to roles." />);

    expect(screen.getByText('University')).toBeInTheDocument();
    expect(screen.getByText(/^Degree, 2015/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
      'href',
      '#contact',
    );
  });
});
