import { Fragment, type ReactElement } from 'react';

import { VisuallyHidden } from '@/components/visuallyHidden';
import { splitIntoWords, type TextLetter, type TextWord } from '@/utils';

import { WORD_SEPARATOR } from './kineticText.constants';
import styles from './kineticText.module.scss';
import type { KineticTextProps } from './kineticText.types';

export function KineticText({ text }: KineticTextProps): ReactElement {
  const words: TextWord[] = splitIntoWords(text);

  return (
    <>
      <VisuallyHidden>{text}</VisuallyHidden>
      <span aria-hidden="true" translate="no">
        {words.map((word: TextWord, index: number): ReactElement => (
          <Fragment key={word.key}>
            {index > 0 && WORD_SEPARATOR}
            <span className={styles.word}>
              {word.letters.map((letter: TextLetter): ReactElement => (
                <span
                  key={letter.key}
                  className={styles.letter}
                  data-kinetic-letter=""
                >
                  {letter.character}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </>
  );
}
