import type { STACK_LEVELS } from './content.constants';
import type { NumberedSectionHeading } from './shared.types';

export type StackLevel = (typeof STACK_LEVELS)[number];

export type Tool = {
  name: string;
  level: StackLevel;
};

export type ToolGroup = {
  id: string;
  name: string;
  // The AI group leads its board and gets an accent.
  isHighlighted: boolean;
  tools: readonly Tool[];
};

export type Stack = {
  heading: NumberedSectionHeading;
  intro: string;
  levels: Readonly<Record<StackLevel, { label: string; description: string }>>;
  toolCount: (count: number) => string;
  groupLabel: (group: string, level: string) => string;
  ai: { title: string; text: string; link: string };
  groups: readonly ToolGroup[];
};
