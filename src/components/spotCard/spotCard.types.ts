import type { Project, Projects } from '@/content';

export type SpotLabels = Pick<
  Projects,
  'spotLabel' | 'statusLabels' | 'tagsLabel' | 'repoLink' | 'demoLink' | 'panel'
>;

export type SpotCardProps = {
  project: Project;
  number: string;
  labels: SpotLabels;
  isHot: boolean;
  onHover: (isHot: boolean) => void;
  onOpen: () => void;
  openButtonRef: (button: HTMLButtonElement | null) => void;
};
