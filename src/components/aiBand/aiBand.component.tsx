import type { ReactElement } from 'react';

import { TextLink } from '@/components/textLink';

import styles from './aiBand.module.scss';
import type { AiBandProps } from './aiBand.types';

export function AiBand({
  title,
  text,
  linkLabel,
  href,
}: AiBandProps): ReactElement {
  return (
    <aside className={styles.aiBand} aria-label={title}>
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
      <span className={styles.link}>
        <TextLink href={href} variant="cta" icon="arrowDown">
          {linkLabel}
        </TextLink>
      </span>
    </aside>
  );
}
