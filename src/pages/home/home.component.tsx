import type { ReactElement } from 'react';

import { PageLayout } from '@/components';
import { BUILD_YEAR } from '@/constants';
import { content } from '@/content';
import {
  About,
  Career,
  Contact,
  Hero,
  Process,
  Projects,
  SiteFooter,
  SiteHeader,
  Stack,
  Team,
} from '@/sections';

// The landing page: every section in the brief's order (section 4), fed from the content layer.
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
      <Hero profile={content.profile} hero={content.hero} />
      <About about={content.about} />
      <Stack stack={content.stack} />
      <Career
        career={content.career}
        availability={content.profile.availability}
      />
      <Team team={content.team} />
      <Projects projects={content.projects} />
      <Process process={content.process} />
      <Contact contact={content.contact} profile={content.profile} />
    </PageLayout>
  );
}
