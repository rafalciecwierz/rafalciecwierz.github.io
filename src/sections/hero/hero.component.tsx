import type { ReactElement } from 'react';

import {
  ActionGroup,
  ButtonLink,
  HeroBackdrop,
  HeroContent,
  HeroFoot,
  HeroIntro,
  HeroMeta,
  HeroSign,
  Section,
  TextLink,
} from '@/components';
import { SECTION_IDS } from '@/constants';
import { anchorHref } from '@/utils';

import { HERO_TITLE_ID, PERCH_LETTER } from './hero.constants';
import styles from './hero.module.scss';
import type { HeroProps } from './hero.types';

// The summit: the name as a lit rooftop sign over the city at night, the role, and the two
// actions a recruiter needs first. Everything here is in the pre-rendered HTML.
export function Hero({ profile, hero }: HeroProps): ReactElement {
  return (
    <Section
      id={SECTION_IDS.hero}
      labelledBy={HERO_TITLE_ID}
      spacing="none"
      className={styles.hero}
    >
      <HeroBackdrop />
      <HeroContent>
        <HeroMeta meta={hero.meta} />
        <HeroSign
          name={profile.name}
          titleId={HERO_TITLE_ID}
          perchLetter={PERCH_LETTER}
        />
        <HeroFoot>
          <HeroIntro role={profile.role} tagline={profile.tagline} />
          <ActionGroup>
            <ButtonLink
              href={profile.cvUrl}
              variant="primary"
              icon="download"
              shouldDownload
            >
              {hero.downloadCv}
            </ButtonLink>
            <ButtonLink
              href={anchorHref(SECTION_IDS.contact)}
              variant="secondary"
            >
              {hero.getInTouch}
            </ButtonLink>
            <TextLink
              href={anchorHref(SECTION_IDS.career)}
              variant="cta"
              icon="arrowDown"
            >
              {hero.startClimb}
            </TextLink>
          </ActionGroup>
        </HeroFoot>
      </HeroContent>
    </Section>
  );
}
