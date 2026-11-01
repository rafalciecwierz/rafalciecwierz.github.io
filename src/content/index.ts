export type { About } from './about.types';
export type {
  Career,
  Education,
  Job,
  Period,
  YearMonth,
  YearSpan,
} from './career.types';
export type { Contact } from './contact.types';
export { PROJECT_STATUSES, STACK_LEVELS } from './content.constants';
export type { Content } from './content.types';
export type { Brand, Footer, Nav, NavLink } from './frame.types';
export type { Hero, HeroMeta } from './hero.types';
export type { Process } from './process.types';
export type { Profile } from './profile.types';
export type {
  Project,
  Projects,
  ProjectStatus,
  Screenshot,
} from './projects.types';
export type { Seo } from './seo.types';
export type {
  NumberedSectionHeading,
  SectionHeading,
  Stat,
  TodoField,
} from './shared.types';
export type { Stack, StackLevel, Tool, ToolGroup } from './stack.types';
export type { Quote, Team } from './team.types';
// English is the only locale until a locale switch exists (brief section 2).
export { en as content } from './en';
