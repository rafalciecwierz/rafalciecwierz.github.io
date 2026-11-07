import type { Projects } from '../projects.types';

export const projects: Projects = {
  heading: { number: '04', kicker: 'Spots', title: 'Projects' },
  intro: 'Where I train outside of work. Every project is a spot on the map.',
  spotLabel: (spotNumber: string): string => `Spot ${spotNumber}`,
  count: (total: number): string =>
    `${String(total)} spots on the map. New ones get pinned as they ship.`,
  statusLabels: {
    live: 'Live',
    inProgress: 'In progress',
    archived: 'Archived',
  },
  tagsLabel: 'Tags',
  repoLink: 'Repository',
  demoLink: 'Live demo',
  panel: {
    open: 'Spot details',
    openFor: (name: string): string => `Spot details: ${name}`,
    close: 'Close',
    description: 'The spot',
    stack: 'Stack',
    screenshot: {
      label: 'Screenshot',
      todo: 'Rafał to provide a screenshot or a short clip',
    },
    role: {
      label: 'My role',
      todo: 'Rafał to describe what he did on this project',
    },
    learned: {
      label: 'What I learned',
      todo: 'Rafał to provide one or two sentences',
    },
  },
  items: [
    {
      id: 'ashenContracts',
      name: 'Ashen Contracts',
      status: 'inProgress',
      description:
        'Browser-based idle/RPG game built as a full-stack portfolio project: pnpm monorepo with a Next.js app, NestJS API, shared Storybook UI library and shared TypeScript types. Architecture decisions documented in an ADR-style log.',
      tags: [
        'Next.js',
        'NestJS',
        'PostgreSQL',
        'Prisma',
        'Storybook',
        'Docker',
        'GitHub Actions',
      ],
      repoUrl: 'https://github.com/rafalciecwierz/ashen-contracts',
      screenshot: {
        src: '/projects/ashenContracts.webp',
        alt: 'The Ashen Contracts logo: the name in carved iron letters under a burning phoenix',
        width: 1200,
        height: 639,
      },
      role: 'Solo, from the idea to the architecture: my latest full-stack project. I wrote the spec and designed the architecture, talked through with Claude. I delegate implementation tasks to an AI agent, review every change and keep the docs and the decision log up to date. My goal is to ship a full-stack product on my own, and one you can actually play.',
      learned:
        'How to share types across a monorepo, so the frontend and the API cannot drift apart. That with an AI agent, the quality of the result depends on the quality of the spec. And CI, which I had barely touched before and am still getting to grips with.',
    },
    {
      id: 'thisWebsite',
      name: 'This website',
      status: 'live',
      description:
        'Personal site with a hero scene and character drawn in code (SVG) and scroll-driven storytelling (GSAP), built with a performance and accessibility budget.',
      tags: ['React', 'TypeScript', 'GSAP', 'Vite'],
      repoUrl: 'https://github.com/rafalciecwierz/rafalciecwierz.github.io',
      screenshot: {
        src: '/projects/thisWebsite.webp',
        alt: 'The hero of this site: the runner crouched on the name RAFAŁ CIEĆWIERZ under three spotlights, with the Download CV button',
        width: 1200,
        height: 750,
      },
      role: 'Product owner and reviewer. I wrote the brief and the rules, judged sixteen design prototypes and chose the direction. Claude Code wrote most of the code inside that frame; I reviewed every change as a frontend engineer, sent back fixes where it fell short, and merged each one myself.',
      learned:
        'That sixteen quick prototypes find a better design faster than one careful mockup. And how much GSAP and scroll-driven motion can do, when there is a reduced-motion version for everyone who needs one.',
    },
    {
      id: 'skyFreerun',
      name: 'Sky Freerun',
      status: 'live',
      note: 'For my own parkour group in Poznań',
      description:
        'One-page site for my parkour and freerunning group: who we are, the training academy for beginners, and contact. Hand-written HTML, SCSS and vanilla JavaScript, with an npm-script build that compiles, prefixes and minifies the CSS.',
      tags: ['HTML', 'SCSS', 'JavaScript', 'PostCSS', 'Glider.js'],
      repoUrl: 'https://github.com/rafalciecwierz/Sky-Freerun-Website',
      demoUrl: 'https://skyfreerun.com/',
      screenshot: {
        src: '/projects/skyFreerun.webp',
        alt: 'The Sky Freerun home page: a photo of a traceur leaping off a wall between blocks of flats, next to the heading SKY FREERUN',
        width: 1200,
        height: 750,
      },
      role: 'My own initiative, solo: the design, the code and the deployment.',
      learned:
        'Building the CSS pipeline by hand taught me what the tools do under the hood. And a plain static site has run since 2020 with no upkeep.',
    },
    {
      id: 'ultimateFrisbee',
      name: 'UltiTracker',
      status: 'archived',
      note: 'Engineering thesis (team of 4), built for the Polish Ultimate Players Association',
      description:
        'A platform for the ultimate frisbee community: create teams and tournaments, score matches live from a tablet by the pitch while spectators follow in real time, and build up statistics for every team and player. Tested at a live tournament in Szczecin.',
      tags: [
        'NestJS',
        'PostgreSQL',
        'Socket.io',
        'Swagger',
        'AWS',
        'Nuxt',
        'Figma',
      ],
      screenshot: {
        src: '/projects/ultimateFrisbee.webp',
        alt: 'The scorekeeper’s tablet view in Figma: the clock, the score of both teams, timeout and score buttons, and a grid of players for each team',
        width: 1194,
        height: 834,
      },
      role: 'Backend developer and UI designer in a team of four. I owned the whole NestJS backend, including live scoring over Socket.io, deployed it to AWS and designed every screen in Figma. Two teammates built the Nuxt frontend from my designs.',
      learned:
        'That a live tournament teaches more than any local test. Real scorekeepers on a tablet by the pitch, real spectators refreshing, and no second take.',
    },
  ],
};
