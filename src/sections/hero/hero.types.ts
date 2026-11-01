import type { Hero, Profile } from '@/content';

export type HeroProps = {
  // Only the fields it shows, so the test fixture stays small.
  profile: Pick<Profile, 'name' | 'role' | 'tagline' | 'cvUrl'>;
  hero: Hero;
};
