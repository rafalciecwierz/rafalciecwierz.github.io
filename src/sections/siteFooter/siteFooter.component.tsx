import type { ReactElement } from 'react';

import { FooterMeta, PageFooter, SignOff, Text, TextLink } from '@/components';
import { SECTION_IDS } from '@/constants';
import { anchorHref } from '@/utils';

import type { SiteFooterProps } from './siteFooter.types';

// The text of the footer (brief section 4.10). The street with the runner above it comes with
// the content sections (task 3.9).
export function SiteFooter({ footer, year }: SiteFooterProps): ReactElement {
  return (
    <PageFooter>
      <SignOff title={footer.sessionOver} line={footer.line} />
      <FooterMeta>
        <TextLink
          href={anchorHref(SECTION_IDS.hero)}
          variant="cta"
          icon="arrowUp"
        >
          {footer.backToTop}
        </TextLink>
        <Text variant="muted">
          {footer.builtWith} {footer.separator}{' '}
          <TextLink href={footer.repoUrl}>{footer.repoLabel}</TextLink>
        </Text>
        <Text variant="muted">{footer.copyright(year, footer.sign)}</Text>
      </FooterMeta>
    </PageFooter>
  );
}
