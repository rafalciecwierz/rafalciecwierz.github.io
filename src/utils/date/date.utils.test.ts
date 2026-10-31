import { describe, expect, it } from 'vitest';

import { formatPeriod, formatYearMonth, formatYearSpan } from './date.utils';

describe('formatYearMonth', (): void => {
  it('writes the month with two digits, then the year', (): void => {
    expect(formatYearMonth({ year: 2025, month: 4 })).toBe('04.2025');
    expect(formatYearMonth({ year: 2022, month: 10 })).toBe('10.2022');
  });
});

describe('formatPeriod', (): void => {
  it('joins the start and the end with a spaced en dash, as in the CV', (): void => {
    expect(
      formatPeriod({
        start: { year: 2025, month: 4 },
        end: { year: 2026, month: 8 },
      }),
    ).toBe('04.2025 – 08.2026');
  });
});

describe('formatYearSpan', (): void => {
  it('joins two years with a spaced en dash', (): void => {
    expect(formatYearSpan({ start: 2015, end: 2021 })).toBe('2015 – 2021');
  });
});
