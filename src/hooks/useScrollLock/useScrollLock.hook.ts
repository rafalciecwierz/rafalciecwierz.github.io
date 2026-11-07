import { useEffect } from 'react';

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
