import type { TextLetter, TextWord } from '@/utils';

// The key of the first letter that matches the perch letter, compared in uppercase because the
// sign is set in capitals. Null when the name has no such letter: the runner is then left out.
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
