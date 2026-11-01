import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import type { Nav as NavContent } from '@/content';
import { setMediaMatches } from '@/test/matchMedia';

import { Nav } from './nav.component';

const NAV: NavContent = {
  skipToContent: 'Skip',
  label: 'Main',
  menu: 'Menu',
  close: 'Close',
  links: [
    { sectionId: 'about', label: 'About' },
    { sectionId: 'contact', label: 'Contact' },
  ],
};

function menuButton(): HTMLElement {
  return screen.getByRole('button', { name: NAV.menu });
}

async function openMenu(): Promise<void> {
  render(<Nav nav={NAV} />);
  await userEvent.click(menuButton());
}

describe('Nav', (): void => {
  // The mobile layout, where the menu exists.
  beforeEach((): void => {
    setMediaMatches(true);
  });

  it('links to every section by its anchor', (): void => {
    render(<Nav nav={NAV} />);

    const nav: HTMLElement = screen.getByRole('navigation', {
      name: NAV.label,
    });
    expect(nav).toContainElement(screen.getByRole('link', { name: 'About' }));
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '#contact',
    );
  });

  it('opens the menu and moves focus to its first link', async (): Promise<void> => {
    await openMenu();

    expect(menuButton()).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'About' })).toHaveFocus();
  });

  it('keeps focus inside the open menu, both ways', async (): Promise<void> => {
    await openMenu();

    await userEvent.tab({ shift: true });
    expect(screen.getByRole('button', { name: NAV.close })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('link', { name: 'About' })).toHaveFocus();
  });

  it('closes on Escape and gives focus back to the Menu button', async (): Promise<void> => {
    await openMenu();

    await userEvent.keyboard('{Escape}');

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton()).toHaveFocus();
  });

  it('closes when a link is chosen, and with the Close button', async (): Promise<void> => {
    await openMenu();
    await userEvent.click(screen.getByRole('link', { name: 'Contact' }));
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(menuButton());
    await userEvent.click(screen.getByRole('button', { name: NAV.close }));
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('stops the page from scrolling only while the menu is open', async (): Promise<void> => {
    await openMenu();
    expect(document.documentElement.style.overflow).toBe('hidden');

    await userEvent.keyboard('{Escape}');
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('ends the open menu when the window grows to the desktop layout', async (): Promise<void> => {
    await openMenu();

    act((): void => {
      setMediaMatches(false);
    });

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
    expect(document.documentElement.style.overflow).toBe('');
  });
});
