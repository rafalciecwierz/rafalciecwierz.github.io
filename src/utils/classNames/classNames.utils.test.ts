import { describe, expect, it } from 'vitest';

import { classNames } from './classNames.utils';

describe('classNames', (): void => {
  it('joins class names with a space', (): void => {
    expect(classNames('button', 'primary')).toBe('button primary');
  });

  it('skips values that are not a class name', (): void => {
    // `false` is what `isActive && styles.active` gives when the flag is off.
    expect(classNames('button', false, undefined, null, '')).toBe('button');
  });

  it('returns an empty string when there is nothing to join', (): void => {
    expect(classNames()).toBe('');
  });
});
