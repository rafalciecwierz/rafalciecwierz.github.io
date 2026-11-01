import type { RefObject } from 'react';

import type { Nav } from '@/content';

export type NavProps = {
  nav: Nav;
};

// What the mobile menu hook gives the Nav component.
export type MobileMenu = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  // The menu panel, where focus is trapped while it is open.
  panelRef: RefObject<HTMLElement | null>;
  // The Menu button, where focus returns when the menu closes.
  buttonRef: RefObject<HTMLButtonElement | null>;
};
