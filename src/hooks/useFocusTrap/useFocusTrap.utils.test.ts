import { describe, expect, it } from 'vitest';

import { wrapFocusTarget } from './useFocusTrap.utils';

function buttons(count: number): HTMLButtonElement[] {
  return Array.from({ length: count }, (): HTMLButtonElement =>
    document.createElement('button'),
  );
}

describe('wrapFocusTarget', (): void => {
  it('moves from the last element forward to the first', (): void => {
    const elements: HTMLButtonElement[] = buttons(3);

    expect(wrapFocusTarget(elements, elements[2] ?? null, false)).toBe(
      elements[0],
    );
  });

  it('moves from the first element backward to the last', (): void => {
    const elements: HTMLButtonElement[] = buttons(3);

    expect(wrapFocusTarget(elements, elements[0] ?? null, true)).toBe(
      elements[2],
    );
  });

  it('leaves the browser to move focus inside the trap', (): void => {
    const elements: HTMLButtonElement[] = buttons(3);

    expect(wrapFocusTarget(elements, elements[1] ?? null, false)).toBeNull();
    expect(wrapFocusTarget(elements, elements[1] ?? null, true)).toBeNull();
  });

  it('brings focus back to the first element when it is outside the trap', (): void => {
    const elements: HTMLButtonElement[] = buttons(2);

    expect(wrapFocusTarget(elements, document.body, false)).toBe(elements[0]);
  });

  it('does nothing when there is nothing to focus', (): void => {
    expect(wrapFocusTarget([], document.body, false)).toBeNull();
  });
});
