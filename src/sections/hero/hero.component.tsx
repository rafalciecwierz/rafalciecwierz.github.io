import { type ReactElement, type RefObject, useRef } from 'react';

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
import { MotionLayer, type MotionModule } from '@/motion/motionLayer';
import { anchorHref } from '@/utils';

import { HERO_TITLE_ID, PERCH_LETTER } from './hero.constants';
import styles from './hero.module.scss';
import type { HeroProps } from './hero.types';

// Loads the hero's motion as its own chunk (docs/ARCHITECTURE.md section 13).
async function loadHeroMotion(): Promise<MotionModule> {
  const { HeroMotion } =
    await import('@/motionComponents/heroMotion/heroMotion.component');
  return { default: HeroMotion };
}

// The summit: the name as a lit rooftop sign over the city at night, the role, and the two
// actions a recruiter needs first. Everything here is in the pre-rendered HTML; HeroMotion
// adds the sign flicker, the role flip, the window flicker and the runner's hops and tricks.
export function Hero({ profile, hero }: HeroProps): ReactElement {
  const heroRef: RefObject<HTMLElement | null> = useRef<HTMLElement>(null);

  return (
    <Section
      ref={heroRef}
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
          <HeroIntro
            role={profile.role}
            roleFlips={profile.roleFlips}
            tagline={profile.tagline}
          />
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
      <MotionLayer load={loadHeroMotion} scope={heroRef} />
    </Section>
  );
}
