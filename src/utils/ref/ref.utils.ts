import type { Ref } from 'react';

// Gives an element to a ref of either kind: a callback ref is called, an object ref gets it as
// `current`. For a component that needs its own ref to an element and also passes the
// element on to the ref its parent gave it.
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
