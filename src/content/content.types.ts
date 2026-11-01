import type { About } from './about.types';
import type { Career } from './career.types';
import type { Contact } from './contact.types';
import type { Brand, Footer, Nav } from './frame.types';
import type { Hero } from './hero.types';
import type { NotFound } from './notFound.types';
import type { Process } from './process.types';
import type { Profile } from './profile.types';
import type { Projects } from './projects.types';
import type { Seo } from './seo.types';
import type { Stack } from './stack.types';
import type { Team } from './team.types';

// The shape of the whole site's copy and data. Every locale is a value of this type, so a
// missing translation is a compile error (docs/ARCHITECTURE.md section 7). Each area's shape is
// in its own `<area>.types.ts`, named like the file that holds its value in `en/`.
// A `null` value is a TODO for Rafał; the component shows a "Rafał to provide" state for it.
export type Content = {
  seo: Seo;
  profile: Profile;
  nav: Nav;
  brand: Brand;
  hero: Hero;
  about: About;
  stack: Stack;
  career: Career;
  team: Team;
  projects: Projects;
  process: Process;
  contact: Contact;
  footer: Footer;
  notFound: NotFound;
  // Printed once in the browser console, for developers who open it.
  console: string;
};
