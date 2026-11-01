import { NUMBER_DIGITS, PROTOCOL } from './format.constants';

// A list position as a two-digit label: 0 → "01".
export function padNumber(index: number): string {
  return String(index + 1).padStart(NUMBER_DIGITS, '0');
}

// A link's address as people read it, without the protocol: "github.com/rafalciecwierz".
export function displayUrl(url: string): string {
  return url.replace(PROTOCOL, '');
}
