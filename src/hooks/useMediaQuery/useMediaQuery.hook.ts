import { useCallback, useSyncExternalStore } from 'react';

// The server and the first browser render get `isServerMatch`, so hydration matches.
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
