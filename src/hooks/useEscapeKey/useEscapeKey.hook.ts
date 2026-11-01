import { useEffect } from 'react';

// Calls `onEscape` when Escape is pressed anywhere on the page, while active. Pass a stable
// function (useCallback), or the listener is added again on every render.
export function useEscapeKey(isActive: boolean, onEscape: () => void): void {
  useEffect((): (() => void) | undefined => {
    if (!isActive) {
      return undefined;
    }
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onEscape();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onEscape]);
}
