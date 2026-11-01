import { describe, expect, it } from 'vitest';

import type { TextWord } from './text.types';
import { splitIntoWords } from './text.utils';

function charactersOf(words: readonly TextWord[]): string[][] {
  return words.map((word: TextWord): string[] =>
    word.letters.map(
      (letter: TextWord['letters'][number]): string => letter.character,
    ),
  );
}

describe('splitIntoWords', (): void => {
  it('splits the text into words and each word into letters', (): void => {
    expect(charactersOf(splitIntoWords('On the move'))).toEqual([
      ['O', 'n'],
      ['t', 'h', 'e'],
      ['m', 'o', 'v', 'e'],
    ]);
  });

  it('keeps Polish letters whole', (): void => {
    expect(charactersOf(splitIntoWords('Ciećwierz'))).toEqual([
      ['C', 'i', 'e', 'ć', 'w', 'i', 'e', 'r', 'z'],
    ]);
  });

  it('ignores extra spaces around and between the words', (): void => {
    expect(charactersOf(splitIntoWords('  From   the team '))).toEqual([
      ['F', 'r', 'o', 'm'],
      ['t', 'h', 'e'],
      ['t', 'e', 'a', 'm'],
    ]);
  });

  it('gives every word and letter a key that is unique and stays the same for the same text', (): void => {
    const words: TextWord[] = splitIntoWords('a a');
    const keys: string[] = words.flatMap((word: TextWord): string[] => [
      word.key,
      ...word.letters.map(
        (letter: TextWord['letters'][number]): string => letter.key,
      ),
    ]);

    expect(new Set(keys).size).toBe(keys.length);
    expect(splitIntoWords('a a')).toEqual(words);
  });
});
