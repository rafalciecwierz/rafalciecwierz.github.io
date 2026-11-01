import { useCallback, useSyncExternalStore } from 'react';

// Whether a media query matches, kept up to date as the window changes. useSyncExternalStore
// gives the server (and the first render in the browser) `isServerMatch`, so hydration
// matches; React then reads the real value (docs/ARCHITECTURE.md section 6).
export function useMediaQuery(query: string, isServerMatch: boolean): boolean {
  const subscribe: (onChange: () => void) => () => void = useCallback(
    (onChange: () => void): (() => void) => {
      const list: MediaQueryList = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return (): void => {
        list.removeEventListener('change', onChange);
      };
    },
    [query],
  );
  const getSnapshot: () => boolean = useCallback(
    (): boolean => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    (): boolean => isServerMatch,
  );
}
