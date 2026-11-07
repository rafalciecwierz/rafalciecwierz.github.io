import type { ReactElement } from 'react';

import { Runner } from '@/components/runner';
import { VisuallyHidden } from '@/components/visuallyHidden';
import { MOTION_TARGETS } from '@/constants';
import { splitIntoWords, type TextLetter, type TextWord } from '@/utils';

import styles from './heroSign.module.scss';
import type { HeroSignProps } from './heroSign.types';
import { perchLetterKey } from './heroSign.utils';

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
        <Runner
          pose="crouch"
          className={styles.runner}
          motionTarget={MOTION_TARGETS.heroRunner}
        />
      </span>
    );
  }

  return (
    <div className={styles.sign}>
      <div className={styles.truss} aria-hidden="true" />
      <h1 id={titleId} className={styles.name} translate="no">
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
