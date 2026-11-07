import type { PROJECT_STATUSES } from './content.constants';
import type { NumberedSectionHeading, TodoField } from './shared.types';

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  note?: string;
  description: string;
  tags: readonly string[];
  repoUrl?: string;
  demoUrl?: string;
  screenshot: Screenshot | null;
  role: string | null;
  learned: string | null;
};

export type Projects = {
  heading: NumberedSectionHeading;
  intro: string;
  spotLabel: (spotNumber: string) => string;
  count: (total: number) => string;
  statusLabels: Readonly<Record<ProjectStatus, string>>;
  tagsLabel: string;
  repoLink: string;
  demoLink: string;
  panel: {
    open: string;
    openFor: (name: string) => string;
    close: string;
    description: string;
    stack: string;
    screenshot: TodoField;
    role: TodoField;
    learned: TodoField;
  };
  items: readonly Project[];
};
