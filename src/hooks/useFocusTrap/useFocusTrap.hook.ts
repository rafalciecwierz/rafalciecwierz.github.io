import { useEffect } from 'react';

import type { FocusTrapOptions } from './useFocusTrap.types';
import { focusableIn, wrapFocusTarget } from './useFocusTrap.utils';

// Keeps keyboard focus inside a container while it is active (the open mobile menu): focus
// moves to its first element when it opens, Tab and Shift+Tab wrap around at the ends, and
// focus goes back to `returnFocusRef` when it closes. Our own few lines instead of the
// focus-trap package (docs/ARCHITECTURE.md section 12).
export function useFocusTrap({
  containerRef,
  returnFocusRef,
  isActive,
}: FocusTrapOptions): void {
  useEffect((): (() => void) | undefined => {
    const container: HTMLElement | null = containerRef.current;
    if (!isActive || container === null) {
      return undefined;
    }
    focusableIn(container)[0]?.focus();

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key !== 'Tab' || container === null) {
        return;
      }
      const target: HTMLElement | null = wrapFocusTarget(
        focusableIn(container),
        document.activeElement,
        event.shiftKey,
      );
      if (target !== null) {
        event.preventDefault();
        target.focus();
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    return (): void => {
      container.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [containerRef, returnFocusRef, isActive]);
}
