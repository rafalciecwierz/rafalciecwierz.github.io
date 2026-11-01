import type { ReactElement } from 'react';

import styles from './educationNote.module.scss';
import type { EducationNoteProps } from './educationNote.types';

// The line under the career: where it started. The colon and the comma are punctuation added
// by the CSS Module, so the content holds only the words.
export function EducationNote({
  label,
  school,
  detail,
}: EducationNoteProps): ReactElement {
  return (
    <p className={styles.educationNote}>
      <span className={styles.label}>{label}</span>{' '}
      <strong className={styles.school}>{school}</strong> <span>{detail}</span>
    </p>
  );
}
