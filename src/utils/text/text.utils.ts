import { WHITESPACE } from './text.constants';
import type { TextLetter, TextWord } from './text.types';

// Array.from splits by code point, so "ć" stays one letter. Keys come from positions, so the
// server and the browser agree.
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
