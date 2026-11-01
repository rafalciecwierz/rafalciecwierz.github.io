import type { ReactElement } from 'react';

import { Container, Section, SectionHeading, SpotBoard } from '@/components';
import { SECTION_IDS } from '@/constants';

import { PROJECTS_TITLE_ID } from './projects.constants';
import type { ProjectsProps } from './projects.types';

// "Spots": the projects as training spots on a night map of the city.
export function Projects({ projects }: ProjectsProps): ReactElement {
  return (
    <Section
      id={SECTION_IDS.projects}
      labelledBy={PROJECTS_TITLE_ID}
      surface="concrete"
    >
      <Container>
        <SectionHeading
          heading={projects.heading}
          titleId={PROJECTS_TITLE_ID}
          intro={projects.intro}
        />
        <SpotBoard projects={projects} />
      </Container>
    </Section>
  );
}
