import type { Career as CareerContent } from '@/content';

export type CareerProps = {
  career: CareerContent;
  // "Open to frontend roles…", shown on the card of the next roof.
  availability: string;
};
