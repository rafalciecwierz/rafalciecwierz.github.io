import { useSyncExternalStore } from 'react';

function subscribe(): () => void {
  return (): void => {
    // Nothing changes after hydration, so there is nothing to clean up.
  };
}

function readClient(): boolean {
  return true;
}

function readServer(): boolean {
  return false;
}

// False on the server and during hydration, true afterwards. For values that must not be in the
// pre-rendered HTML, such as the email address, while hydration still matches
// (docs/ARCHITECTURE.md section 10).
export function useIsHydrated(): boolean {
  return useSyncExternalStore<boolean>(subscribe, readClient, readServer);
}
