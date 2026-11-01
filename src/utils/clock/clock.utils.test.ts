import { describe, expect, it } from 'vitest';

import { formatClockTime } from './clock.utils';

describe('formatClockTime', (): void => {
  it('shows hours and minutes in the reader’s locale', (): void => {
    const evening: Date = new Date(2026, 10, 1, 21, 5);

    expect(formatClockTime(evening, 'en-GB')).toBe('21:05');
    expect(formatClockTime(evening, 'en-US')).toBe('09:05 PM');
  });
});
