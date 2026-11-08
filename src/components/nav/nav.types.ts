import type { RefObject } from 'react';

import type { Nav } from '@/content';

export type NavProps = {
  nav: Nav;
};

export type MobileMenu = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  panelRef: RefObject<HTMLElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
};
