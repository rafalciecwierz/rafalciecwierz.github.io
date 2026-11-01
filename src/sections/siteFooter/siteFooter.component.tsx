import type { ReactElement } from 'react';

import {
  FooterMeta,
  FooterStreet,
  PageFooter,
  SignOff,
  Text,
  TextLink,
} from '@/components';
import { SECTION_IDS } from '@/constants';
import { anchorHref } from '@/utils';

import type { SiteFooterProps } from './siteFooter.types';

// The footer (brief section 4.10): the street where the runner lands, then the text.
export function SiteFooter({ footer, year }: SiteFooterProps): ReactElement {
  return (
    <PageFooter scene={<FooterStreet bubble={footer.bubble} />}>
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
