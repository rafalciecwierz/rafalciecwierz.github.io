import { WHITESPACE } from './text.constants';
import type { TextLetter, TextWord } from './text.types';

// Splits a text into words, and each word into letters, so each letter can be styled or animated on its
// own. Array.from splits by code point, so a letter such as "ć" stays one letter. The keys come
// from the positions: the same text always gives the same keys, on the server and in the browser.
export function splitIntoWords(text: string): TextWord[] {
  const words: string[] = text.trim().split(WHITESPACE).filter(Boolean);

  return words.map((word: string, wordIndex: number): TextWord => ({
    key: String(wordIndex),
    letters: Array.from(word).map(
      (character: string, letterIndex: number): TextLetter => ({
        key: `${String(wordIndex)}-${String(letterIndex)}`,
        character,
      }),
    ),
  }));
}
