import { useEffect, useState } from 'react';

import { IDLE_FALLBACK_DELAY, IDLE_TIMEOUT } from './useIsIdle.constants';

// False until the browser has an idle moment after the first render, then true for good. Work
// that can wait (loading the motion layer) waits for it, so it does not compete with hydration
// and the first paint. On the server and during hydration it is false.
export function useIsIdle(): boolean {
  const [isIdle, setIsIdle] = useState<boolean>(false);

  useEffect((): (() => void) => {
    function markIdle(): void {
      setIsIdle(true);
    }
    if ('requestIdleCallback' in window) {
      const handle: number = window.requestIdleCallback(markIdle, {
        timeout: IDLE_TIMEOUT,
      });
      return (): void => {
        window.cancelIdleCallback(handle);
      };
    }
    const timer: number = setTimeout(markIdle, IDLE_FALLBACK_DELAY);
    return (): void => {
      clearTimeout(timer);
    };
  }, []);

  return isIdle;
}
