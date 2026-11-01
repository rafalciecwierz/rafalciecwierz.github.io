import type { ReactElement } from 'react';

import { Runner } from '@/components/runner';
import { VisuallyHidden } from '@/components/visuallyHidden';
import { splitIntoWords, type TextLetter, type TextWord } from '@/utils';

import styles from './heroSign.module.scss';
import type { HeroSignProps } from './heroSign.types';
import { perchLetterKey } from './heroSign.utils';

// The name as a lit rooftop sign: the page's h1, and the largest text on screen (the LCP).
// Screen readers get the name once, whole; the letters are for the eye, one element each, so
// the motion layer can flicker them on and the runner can jump between them (task 3.14).
// The runner perches on the Ł here, placed with CSS relative to the letter (heroSign.module.scss),
// so he is in the pre-rendered HTML and needs no script.
export function HeroSign({
  name,
  titleId,
  perchLetter,
}: HeroSignProps): ReactElement {
  const words: TextWord[] = splitIntoWords(name);
  const perchKey: string | null = perchLetterKey(words, perchLetter);

  function renderLetter(letter: TextLetter): ReactElement {
    const glyph: ReactElement = (
      <span
        key={letter.key}
        className={styles.letter}
        data-sign-letter=""
        data-letter={letter.character}
      >
        {letter.character}
      </span>
    );
    if (letter.key !== perchKey) {
      return glyph;
    }
    return (
      <span key={letter.key} className={styles.perch}>
        {glyph}
        <Runner pose="crouch" className={styles.runner} />
      </span>
    );
  }

  return (
    <div className={styles.sign}>
      <div className={styles.truss} aria-hidden="true" />
      <h1 id={titleId} className={styles.name}>
        <VisuallyHidden>{name}</VisuallyHidden>
        <span aria-hidden="true">
          {words.map((word: TextWord): ReactElement => (
            <span key={word.key} className={styles.word}>
              {word.letters.map(renderLetter)}
            </span>
          ))}
        </span>
      </h1>
    </div>
  );
}
