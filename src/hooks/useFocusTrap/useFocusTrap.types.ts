import type { RefObject } from 'react';

export type FocusTrapOptions = {
  containerRef: RefObject<HTMLElement | null>;
  returnFocusRef: RefObject<HTMLElement | null>;
  isActive: boolean;
};
