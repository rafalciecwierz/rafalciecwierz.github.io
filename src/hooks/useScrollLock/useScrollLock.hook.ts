import { useEffect } from 'react';

// Stops the page from scrolling under a full-screen layer (the open mobile menu). The lock
// sits on <html>, and the page's own value comes back when the lock ends.
export function useScrollLock(isLocked: boolean): void {
  useEffect((): (() => void) | undefined => {
    if (!isLocked) {
      return undefined;
    }
    const root: HTMLElement = document.documentElement;
    const previousOverflow: string = root.style.overflow;
    root.style.overflow = 'hidden';
    return (): void => {
      root.style.overflow = previousOverflow;
    };
  }, [isLocked]);
}
