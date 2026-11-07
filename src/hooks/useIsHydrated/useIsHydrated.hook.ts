import { useSyncExternalStore } from 'react';

function subscribe(): () => void {
  return (): void => {
    // Nothing changes after hydration.
  };
}

function readClient(): boolean {
  return true;
}

function readServer(): boolean {
  return false;
}

// For values that must not be in the pre-rendered HTML, such as the email address.
export function useIsHydrated(): boolean {
  return useSyncExternalStore<boolean>(subscribe, readClient, readServer);
}
