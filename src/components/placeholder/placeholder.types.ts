import type { Profile } from '@/content';

export type PlaceholderProps = {
  // Only the fields it shows, so the test fixture stays small.
  profile: Pick<Profile, 'name' | 'role' | 'tagline'>;
};
