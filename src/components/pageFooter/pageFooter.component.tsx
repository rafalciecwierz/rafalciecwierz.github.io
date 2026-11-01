import type { ReactElement } from 'react';

import { Container } from '@/components/container';

import styles from './pageFooter.module.scss';
import type { PageFooterProps } from './pageFooter.types';

// The page's footer landmark (contentinfo). Its children sit in one column on phones and in
// two from 900px: the sign-off on the left, the links on the right.
export function PageFooter({ children }: PageFooterProps): ReactElement {
  return (
    <footer className={styles.pageFooter}>
      <Container className={styles.grid}>{children}</Container>
    </footer>
  );
}
