import type { RefObject } from 'react';

export type FocusTrapOptions = {
  // The element whose Tab order is trapped while the trap is active.
  containerRef: RefObject<HTMLElement | null>;
  // Where focus goes when the trap ends: the button that opened it. Named explicitly, because
  // Safari does not focus a button when it is clicked.
  returnFocusRef: RefObject<HTMLElement | null>;
  isActive: boolean;
};
