import type { TextLetter, TextWord } from '@/utils';

export function perchLetterKey(
  words: readonly TextWord[],
  perchLetter: string,
): string | null {
  const letters: TextLetter[] = words.flatMap(
    (word: TextWord): TextLetter[] => [...word.letters],
  );
  const perch: TextLetter | undefined = letters.find(
    (letter: TextLetter): boolean =>
      letter.character.toUpperCase() === perchLetter,
  );
  return perch?.key ?? null;
}
