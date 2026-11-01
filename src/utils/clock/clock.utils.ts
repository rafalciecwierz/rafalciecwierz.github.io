import { CLOCK_FORMAT } from './clock.constants';

// The time of day for the hero's meta line. Without a locale it uses the reader's own.
export function formatClockTime(date: Date, locale?: string): string {
  return date.toLocaleTimeString(locale, CLOCK_FORMAT);
}
