import type { Period, YearMonth, YearSpan } from '@/content';

import { MONTH_DIGITS, RANGE_SEPARATOR } from './date.constants';

export function formatYearMonth({ year, month }: YearMonth): string {
  return `${String(month).padStart(MONTH_DIGITS, '0')}.${String(year)}`;
}

export function formatPeriod({ start, end }: Period): string {
  return `${formatYearMonth(start)}${RANGE_SEPARATOR}${formatYearMonth(end)}`;
}

export function formatYearSpan({ start, end }: YearSpan): string {
  return `${String(start)}${RANGE_SEPARATOR}${String(end)}`;
}
