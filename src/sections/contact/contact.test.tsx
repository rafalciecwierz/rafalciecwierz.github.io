import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { Contact as ContactContent } from '@/content';

import { Contact } from './contact.component';
import type { ContactProps } from './contact.types';

const CONTACT: ContactContent = {
  heading: { number: '06', kicker: 'Contact', title: 'Climb with me.' },
  channels: {
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    calendly: 'Book a call',
  },
  urlTodo: 'URL to come',
  downloadCv: 'Download CV',
  writeEmail: 'Write an email',
  copy: 'Copy',
  copyLabel: 'Copy email address',
  copied: 'Copied',
  copiedStatus: 'Email address copied',
  selected: 'Selected',
};

const PROFILE: ContactProps['profile'] = {
  availability: 'Open to roles.',
  email: { user: 'name', domain: 'example.com' },
  githubUrl: 'https://github.com/example',
  linkedinUrl: null,
  calendlyUrl: null,
  cvUrl: '/cv.pdf',
};

describe('Contact', (): void => {
  it('shows the channels, the GitHub address without its protocol, and TODOs for missing links', (): void => {
    render(<Contact contact={CONTACT} profile={PROFILE} />);

    expect(
      screen.getByRole('link', { name: 'github.com/example' }),
    ).toHaveAttribute('href', PROFILE.githubUrl);
    expect(screen.getAllByText('URL to come')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute(
      'download',
      '',
    );
  });

  it('joins the email address in the browser and copies it', async (): Promise<void> => {
    const writeText: (text: string) => Promise<void> = vi.fn<
      (text: string) => Promise<void>
    >((): Promise<void> => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<Contact contact={CONTACT} profile={PROFILE} />);

    expect(
      screen.getByRole('link', { name: 'name@example.com' }),
    ).toHaveAttribute('href', 'mailto:name@example.com');
    expect(
      screen.getByRole('link', { name: 'Write an email' }),
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: 'Copy email address' }),
    );

    expect(writeText).toHaveBeenCalledWith('name@example.com');
    expect(
      await screen.findByRole('button', { name: 'Copied' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Email address copied')).toBeInTheDocument();
  });
});
