import type { Project, Projects } from '@/content';

// The copy a card and the panel need, picked from the projects content.
export type SpotLabels = Pick<
  Projects,
  'spotLabel' | 'statusLabels' | 'tagsLabel' | 'repoLink' | 'demoLink' | 'panel'
>;

export type SpotCardProps = {
  project: Project;
  // "01"
  number: string;
  labels: SpotLabels;
  isHot: boolean;
  onHover: (isHot: boolean) => void;
  onOpen: () => void;
  // The card's "Spot details" button, so focus can return to it when the panel closes.
  openButtonRef: (button: HTMLButtonElement | null) => void;
};
