import { CLOCK_FORMAT } from './clock.constants';

export function formatClockTime(date: Date, locale?: string): string {
  return date.toLocaleTimeString(locale, CLOCK_FORMAT);
}
