import type { ReactElement } from 'react';

import { PageLayout } from '@/components';
import { PAGE_PATHS } from '@/constants';
import { content } from '@/content';
import { NotFound } from '@/sections';

// The page GitHub Pages serves for an address with no file. No header or footer: their links
// point to sections of the home page, and the one way on from here is back home.
export function NotFoundPage(): ReactElement {
  return (
    <PageLayout
      skipLinkLabel={content.nav.skipToContent}
      header={null}
      footer={null}
    >
      <NotFound notFound={content.notFound} homeUrl={PAGE_PATHS.home} />
    </PageLayout>
  );
}
