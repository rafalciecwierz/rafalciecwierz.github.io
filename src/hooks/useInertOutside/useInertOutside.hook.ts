import { type RefObject, useEffect } from 'react';

import { elementsOutside } from './useInertOutside.utils';

// Makes the rest of the page `inert` while a full-screen layer is open (the mobile menu), so a
// screen reader's virtual cursor, a click or Tab cannot reach the page behind it. A <nav>
// cannot be an `aria-modal` dialog, so this is how it becomes modal. Elements that were inert
// already are left alone, and only the ones set here are released.
export function useInertOutside(
  containerRef: RefObject<HTMLElement | null>,
  isActive: boolean,
): void {
  useEffect((): (() => void) | undefined => {
    const container: HTMLElement | null = containerRef.current;
    if (!isActive || container === null) {
      return undefined;
    }
    const madeInert: HTMLElement[] = elementsOutside(
      container,
      document.body,
    ).filter((element: HTMLElement): boolean => !element.inert);
    for (const element of madeInert) {
      element.inert = true;
    }
    return (): void => {
      for (const element of madeInert) {
        element.inert = false;
      }
    };
  }, [containerRef, isActive]);
}
