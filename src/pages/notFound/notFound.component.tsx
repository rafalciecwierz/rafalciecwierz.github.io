import type { ReactElement } from 'react';

import { PageLayout } from '@/components';
import { PAGE_PATHS } from '@/constants';
import { content } from '@/content';
import { NotFound } from '@/sections';

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
