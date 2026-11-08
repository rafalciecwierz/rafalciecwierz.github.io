import type { Hero, Profile } from '@/content';

export type HeroProps = {
  profile: Pick<Profile, 'name' | 'role' | 'roleFlips' | 'tagline' | 'cvUrl'>;
  hero: Hero;
};
