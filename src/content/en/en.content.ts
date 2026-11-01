import type { Content } from '../content.types';
import { about } from './about.content';
import { career } from './career.content';
import { contact } from './contact.content';
import { brand, consoleGreeting, footer, nav } from './frame.content';
import { hero } from './hero.content';
import { notFound } from './notFound.content';
import { process } from './process.content';
import { profile } from './profile.content';
import { projects } from './projects.content';
import { seo } from './seo.content';
import { stack } from './stack.content';
import { team } from './team.content';

// The English content. Typing it as Content makes the compiler check every area against the shape.
export const en: Content = {
  seo,
  profile,
  nav,
  brand,
  hero,
  about,
  stack,
  career,
  team,
  projects,
  process,
  contact,
  footer,
  notFound,
  console: consoleGreeting,
};
