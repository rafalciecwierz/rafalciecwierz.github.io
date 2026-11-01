import { useSyncExternalStore } from 'react';

import { formatClockTime } from '@/utils';

// Nothing to subscribe to: the time is read once, when the page hydrates, and does not tick.
function subscribe(): () => void {
  return (): void => {
    // Nothing to clean up.
  };
}

function readTime(): string {
  return formatClockTime(new Date());
}

function readServerTime(): null {
  return null;
}

// The reader's local time ("21:40"), or null on the server and during hydration, so the
// pre-rendered HTML and the first browser render match (docs/ARCHITECTURE.md section 10).
export function useCurrentTime(): string | null {
  return useSyncExternalStore<string | null>(
    subscribe,
    readTime,
    readServerTime,
  );
}
