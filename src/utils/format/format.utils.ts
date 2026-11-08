import { NUMBER_DIGITS, PROTOCOL } from './format.constants';

export function padNumber(index: number): string {
  return String(index + 1).padStart(NUMBER_DIGITS, '0');
}

export function displayUrl(url: string): string {
  return url.replace(PROTOCOL, '');
}
