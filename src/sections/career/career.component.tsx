import { type ReactElement, type RefObject, useRef } from 'react';

import {
  ActionGroup,
  Box,
  ButtonLink,
  CareerRunScene,
  Container,
  EducationNote,
  JobRoles,
  List,
  ListItem,
  MoveCard,
  PointList,
  RunBar,
  RunTrack,
  Section,
  SectionHeading,
  TagList,
  Text,
} from '@/components';
import { SECTION_IDS } from '@/constants';
import type { Job } from '@/content';
import { MotionLayer, type MotionModule } from '@/motion/motionLayer';
import {
  anchorHref,
  formatPeriod,
  formatYearSpan,
  mediaQueryFrom,
} from '@/utils';

import {
  CAREER_TITLE_ID,
  FIRST_MOVE,
  NEXT_ROOF_HEIGHT,
  RUN_BREAKPOINT,
} from './career.constants';
import styles from './career.module.scss';
import type { CareerProps } from './career.types';
import {
  buildingHeight,
  jobMoveNames,
  nextMoveName,
  runTicks,
} from './career.utils';

// Loads the pinned career run as its own chunk, only from the desktop breakpoint, so phones
// never download it (docs/ARCHITECTURE.md section 13).
async function loadCareerRunMotion(): Promise<MotionModule> {
  const { CareerRunMotion } =
    await import('@/motionComponents/careerRunMotion/careerRunMotion.component');
  return { default: CareerRunMotion };
}

// "The line": the jobs as moves up the rooftops, newest first, starting with the roof that is
// not built yet. This list is the whole career on phones, with reduced motion and without
// JavaScript. From 900 px, CSS lays the section out as the run (DECISIONS.md #010): RunTrack
// makes it as long as the run, its stage is held on screen while the page scrolls, the city
// (CareerRunScene), the skip link and the progress bar (RunBar) show, and the cards float
// over the city one at a time, starting with the first stage. The motion layer brings it to
// life.
export function Career({ career, availability }: CareerProps): ReactElement {
  const moves: string[][] = jobMoveNames(career.jobs, career.moveNames);
  const sectionRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

  return (
    <Section
      id={SECTION_IDS.career}
      labelledBy={CAREER_TITLE_ID}
      className={styles.career}
      ref={sectionRef}
    >
      <RunTrack jobs={career.jobs}>
        <Box className={styles.stage}>
          <CareerRunScene
            jobs={career.jobs}
            promotedLabel={career.promoted}
            nextSign={career.next.sign}
          >
            <MotionLayer
              load={loadCareerRunMotion}
              scope={sectionRef}
              media={mediaQueryFrom(RUN_BREAKPOINT)}
            />
          </CareerRunScene>
          <Container>
            <Box className={styles.head}>
              <SectionHeading
                heading={career.heading}
                titleId={CAREER_TITLE_ID}
                intro={career.intro}
              />
            </Box>
            {/* The section after the career is the team's. */}
            <RunBar
              ticks={runTicks(career.jobs, career.next.sign)}
              skipLabel={career.skipRun}
              skipHref={anchorHref(SECTION_IDS.team)}
            />
            <List kind="ordered" className={styles.moves}>
              <ListItem className={styles.move}>
                <MoveCard
                  marks={[nextMoveName(career.moveNames)]}
                  title={career.next.company}
                  buildingHeight={NEXT_ROOF_HEIGHT}
                  hasTower={false}
                >
                  <Text className={styles.role}>{career.next.role}</Text>
                  <Text variant="muted" className={styles.dates}>
                    {career.next.text} {availability}
                  </Text>
                  <ActionGroup className={styles.action}>
                    <ButtonLink
                      href={anchorHref(SECTION_IDS.contact)}
                      variant="primary"
                    >
                      {career.next.cta}
                    </ButtonLink>
                  </ActionGroup>
                </MoveCard>
              </ListItem>
              {career.jobs.map((job: Job, index: number): ReactElement => (
                <ListItem key={job.id} className={styles.move}>
                  <MoveCard
                    marks={moves[index] ?? []}
                    currentMark={
                      index === career.jobs.length - 1 ? FIRST_MOVE : undefined
                    }
                    title={job.company}
                    buildingHeight={buildingHeight(index)}
                    hasTower={job.roles.length > 1}
                  >
                    <JobRoles
                      roles={job.roles}
                      promotedLabel={career.promoted}
                    />
                    <Text variant="muted" className={styles.dates}>
                      {formatPeriod(job.period)}
                    </Text>
                    <PointList points={job.points} />
                    <Box className={styles.tags}>
                      <TagList tags={job.stack} label={career.stackLabel} />
                    </Box>
                  </MoveCard>
                </ListItem>
              ))}
            </List>
            <Box className={styles.education}>
              <EducationNote
                label={career.educationLabel}
                school={career.education.school}
                detail={career.educationDetail(
                  career.education.degree,
                  formatYearSpan(career.education.years),
                )}
              />
            </Box>
          </Container>
        </Box>
      </RunTrack>
    </Section>
  );
}
