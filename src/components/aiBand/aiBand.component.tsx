import type { ReactElement } from 'react';

import { TextLink } from '@/components/textLink';

import styles from './aiBand.module.scss';
import type { AiBandProps } from './aiBand.types';

// The band above the stack boards: how AI works alongside every tool below, with a link down to
// the section about it. An aside, named by its title, because it comments on the boards.
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
