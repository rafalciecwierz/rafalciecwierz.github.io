import type { ReactElement } from 'react';

import styles from './educationNote.module.scss';
import type { EducationNoteProps } from './educationNote.types';

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
