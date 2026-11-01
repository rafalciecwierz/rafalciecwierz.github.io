import { type ReactElement, type RefObject, useRef } from 'react';

import {
  FooterMeta,
  FooterStreet,
  PageFooter,
  SignOff,
  Text,
  TextLink,
} from '@/components';
import { SECTION_IDS } from '@/constants';
import { MotionLayer, type MotionModule } from '@/motion/motionLayer';
import { anchorHref } from '@/utils';

import type { SiteFooterProps } from './siteFooter.types';

// Loads the runner's landing as its own chunk (docs/ARCHITECTURE.md section 13).
async function loadFooterMotion(): Promise<MotionModule> {
  const { FooterMotion } =
    await import('@/motionComponents/footerMotion/footerMotion.component');
  return { default: FooterMotion };
}

// The footer (brief section 4.10): the street where the runner lands, then the text.
export function SiteFooter({ footer, year }: SiteFooterProps): ReactElement {
  const streetRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  return (
    <PageFooter
      scene={
        <FooterStreet ref={streetRef} bubble={footer.bubble}>
          <MotionLayer load={loadFooterMotion} scope={streetRef} />
        </FooterStreet>
      }
    >
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
