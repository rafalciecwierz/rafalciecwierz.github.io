import type { ReactElement } from 'react';

import { PageLayout, Placeholder } from '@/components';
import { BUILD_YEAR } from '@/constants';
import { content } from '@/content';
import { SiteFooter, SiteHeader } from '@/sections';

export function HomePage(): ReactElement {
  return (
    <PageLayout
      skipLinkLabel={content.nav.skipToContent}
      header={
        <SiteHeader
          nav={content.nav}
          brand={content.brand}
          initials={content.profile.initials}
        />
      }
      footer={<SiteFooter footer={content.footer} year={BUILD_YEAR} />}
    >
      <Placeholder profile={content.profile} />
    </PageLayout>
  );
}
