import type { ReactElement } from 'react';

import { Container } from '@/components/container';

import styles from './pageFooter.module.scss';
import type { PageFooterProps } from './pageFooter.types';

export function PageFooter({ scene, children }: PageFooterProps): ReactElement {
  return (
    <footer className={styles.pageFooter}>
      {scene}
      <div className={styles.text}>
        <Container className={styles.grid}>{children}</Container>
      </div>
    </footer>
  );
}
