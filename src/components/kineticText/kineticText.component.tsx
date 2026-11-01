import { Fragment, type ReactElement } from 'react';

import { VisuallyHidden } from '@/components/visuallyHidden';
import { splitIntoWords, type TextLetter, type TextWord } from '@/utils';

import { WORD_SEPARATOR } from './kineticText.constants';
import styles from './kineticText.module.scss';
import type { KineticTextProps } from './kineticText.types';

// A text split into letters for the motion layer (the "vault and land" titles, task 3.13).
// Screen readers get the text once, whole; the letters are hidden from them, because a reader
// would otherwise spell the title letter by letter. Without motion, the letters simply read as
// the text, so the static page is complete.
export function KineticText({ text }: KineticTextProps): ReactElement {
  const words: TextWord[] = splitIntoWords(text);

  return (
    <>
      <VisuallyHidden>{text}</VisuallyHidden>
      <span aria-hidden="true">
        {words.map((word: TextWord, index: number): ReactElement => (
          <Fragment key={word.key}>
            {index > 0 && WORD_SEPARATOR}
            {/* A word never breaks inside, so a line can only wrap between words. */}
            <span className={styles.word}>
              {word.letters.map((letter: TextLetter): ReactElement => (
                // The motion layer finds the letters by this attribute, because CSS
                // Module class names are hashed.
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
