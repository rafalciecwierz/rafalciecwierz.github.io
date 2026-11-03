import type { PROJECT_STATUSES } from './content.constants';
import type { NumberedSectionHeading, TodoField } from './shared.types';

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

// A WebP in public/projects/. Its size in pixels is written out, so the page keeps its space
// before the image loads (no layout shift).
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
  // Shown in the detail panel; `null` shows a TODO marker (none is left since task 3.18).
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
    // The open button's accessible name: it starts with the visible text (WCAG 2.5.3).
    openFor: (name: string) => string;
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
