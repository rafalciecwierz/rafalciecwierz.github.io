import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { Projects as ProjectsContent } from '@/content';

import { Projects } from './projects.component';

const PROJECTS: ProjectsContent = {
  heading: { number: '04', kicker: 'Spots', title: 'Projects' },
  intro: 'Intro',
  spotLabel: (spotNumber: string): string => `Spot ${spotNumber}`,
  count: (total: number): string => `${String(total)} spots`,
  statusLabels: {
    live: 'Live',
    inProgress: 'In progress',
    archived: 'Archived',
  },
  tagsLabel: 'Tags',
  repoLink: 'Repository',
  demoLink: 'Live demo',
  panel: {
    open: 'Spot details',
    openFor: (name: string): string => `Spot details: ${name}`,
    close: 'Close',
    description: 'The spot',
    stack: 'Stack',
    screenshot: { label: 'Screenshot', todo: 'Screenshot to come' },
    role: { label: 'My role', todo: 'Role to come' },
    learned: { label: 'What I learned', todo: 'Lesson to come' },
  },
  items: [
    {
      id: 'one',
      name: 'Project One',
      status: 'live',
      description: 'The first one.',
      tags: ['React'],
      repoUrl: 'https://github.com/example/one',
      screenshot: null,
      role: null,
      learned: null,
    },
    {
      id: 'two',
      name: 'Project Two',
      status: 'archived',
      description: 'The second one.',
      tags: ['NestJS'],
      screenshot: null,
      role: 'I built the API.',
      learned: null,
    },
  ],
};

describe('Projects', (): void => {
  it('lists every project from the content, with its status in words', (): void => {
    render(<Projects projects={PROJECTS} />);

    expect(
      screen.getByRole('heading', { level: 3, name: 'Project One' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Project Two' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('2 spots')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Repository' })).toHaveAttribute(
      'href',
      PROJECTS.items[0]?.repoUrl,
    );
  });

  it('opens a project’s details in a dialog, with its TODO fields, and gives focus back on close', async (): Promise<void> => {
    render(<Projects projects={PROJECTS} />);

    await userEvent.click(
      screen.getByRole('button', { name: 'Spot details: Project Two' }),
    );

    const dialog: HTMLElement = screen.getByRole('dialog', {
      name: 'Project Two',
    });
    expect(dialog).toHaveAttribute('open');
    expect(screen.getByText('I built the API.')).toBeInTheDocument();
    expect(screen.getByText('Lesson to come')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Spot details: Project Two' }),
    ).toHaveFocus();
  });
});
