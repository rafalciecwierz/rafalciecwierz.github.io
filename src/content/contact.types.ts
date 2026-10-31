import type { NumberedSectionHeading } from './shared.types';

export type Contact = {
  heading: NumberedSectionHeading;
  channels: {
    email: string;
    linkedin: string;
    github: string;
    calendly: string;
  };
  urlTodo: string;
  downloadCv: string;
  writeEmail: string;
  copy: string;
  copyLabel: string;
  copied: string;
  copiedStatus: string;
  selected: string;
};
