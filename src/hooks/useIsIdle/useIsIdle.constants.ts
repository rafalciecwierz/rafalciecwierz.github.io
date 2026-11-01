// The longest wait for an idle moment (ms). A busy page still gets its motion after this.
export const IDLE_TIMEOUT: number = 2000;

// Safari has no requestIdleCallback, so it waits this long instead (ms).
export const IDLE_FALLBACK_DELAY: number = 200;
