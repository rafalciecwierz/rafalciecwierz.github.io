import { WHITESPACE } from './kineticText.constants';
import type { KineticLetter, KineticWord } from './kineticText.types';

// Splits a title into words, and each word into letters, so each letter can be animated on its
// own. Array.from splits by code point, so a letter such as "ć" stays one letter. The keys come
// from the positions: the same text always gives the same keys, on the server and in the browser.
export function splitIntoWords(text: string): KineticWord[] {
  const words: string[] = text.trim().split(WHITESPACE).filter(Boolean);

  return words.map((word: string, wordIndex: number): KineticWord => ({
    key: String(wordIndex),
    letters: Array.from(word).map(
      (character: string, letterIndex: number): KineticLetter => ({
        key: `${String(wordIndex)}-${String(letterIndex)}`,
        character,
      }),
    ),
  }));
}
