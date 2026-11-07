import type { Ref } from 'react';

// For a component that needs its own ref and also passes the element on to its parent's ref.
export function assignRef<Value>(
  ref: Ref<Value> | undefined,
  value: Value | null,
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}
