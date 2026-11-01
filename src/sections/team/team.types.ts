import type { PosterTone } from '@/components';
import type { Team as TeamContent } from '@/content';

export type TeamProps = {
  team: TeamContent;
};

export type PosterLook = {
  tilt: number;
  tone: PosterTone;
};
