import type { SpotLabels } from '@/components/spotCard';
import type { MapPoint } from '@/components/spotMap';
import type { Project, TodoField } from '@/content';

export type SpotPanelProps = {
  project: Project;
  index: number;
  pins: readonly MapPoint[];
  labels: SpotLabels;
  titleId: string;
  onClose: () => void;
};

export type PanelField = {
  field: TodoField;
  value: string | null;
};
