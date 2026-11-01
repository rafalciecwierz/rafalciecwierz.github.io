import { describe, expect, it } from 'vitest';

import { displayUrl, padNumber } from './format.utils';

describe('padNumber', (): void => {
  it('numbers a list from 01', (): void => {
    expect(padNumber(0)).toBe('01');
    expect(padNumber(11)).toBe('12');
  });
});

describe('displayUrl', (): void => {
  it('drops the protocol', (): void => {
    expect(displayUrl('https://github.com/rafalciecwierz')).toBe(
      'github.com/rafalciecwierz',
    );
    expect(displayUrl('http://example.com')).toBe('example.com');
  });
});
