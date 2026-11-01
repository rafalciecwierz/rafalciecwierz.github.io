import type { RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { assignRef } from './ref.utils';

describe('assignRef', (): void => {
  it('sets an object ref and calls a callback ref', (): void => {
    const objectRef: RefObject<string | null> = { current: null };
    const callbackRef: (value: string | null) => void =
      vi.fn<(value: string | null) => void>();

    assignRef(objectRef, 'node');
    assignRef(callbackRef, 'node');

    expect(objectRef.current).toBe('node');
    expect(callbackRef).toHaveBeenCalledWith('node');
  });

  it('does nothing without a ref', (): void => {
    expect((): void => {
      assignRef(undefined, 'node');
      assignRef(null, 'node');
    }).not.toThrow();
  });
});
