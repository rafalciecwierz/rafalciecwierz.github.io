import { describe, expect, it } from 'vitest';

import { splitIntoWords } from '@/utils';

import { perchLetterKey } from './heroSign.utils';

describe('perchLetterKey', (): void => {
  it('finds the perch letter whatever its case in the name', (): void => {
    expect(perchLetterKey(splitIntoWords('Rafał Ciećwierz'), 'Ł')).toBe('0-4');
  });

  it('returns null when the name has no such letter', (): void => {
    expect(perchLetterKey(splitIntoWords('Test Name'), 'Ł')).toBeNull();
  });
});
