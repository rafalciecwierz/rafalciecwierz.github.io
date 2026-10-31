import type { PROJECT_STATUSES } from './content.constants';
import type { NumberedSectionHeading, TodoField } from './shared.types';

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type Screenshot = {
  src: string;
  alt: string;
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
  // Shown in the detail panel; TODO until Rafał writes them.
  screenshot: Screenshot | null;
  role: string | null;
  learned: string | null;
};

export type Projects = {
  heading: NumberedSectionHeading;
  intro: string;
  // The number comes already padded ("01"), as the map pins show it.
  spotLabel: (spotNumber: string) => string;
  count: (total: number) => string;
  statusLabels: Readonly<Record<ProjectStatus, string>>;
  tagsLabel: string;
  repoLink: string;
  demoLink: string;
  panel: {
    open: string;
    close: string;
    description: string;
    stack: string;
    screenshot: TodoField;
    role: TodoField;
    learned: TodoField;
  };
  // In the order they are shown; adding, removing or reordering a project only changes this.
  items: readonly Project[];
};
