import type { Projects } from '../projects.types';

// Brief 5.5. The list is a placeholder until Rafał gives the final one (task 3.18).
// Adding, removing or reordering a project only changes `items` below.
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
  repoLink: 'Repository ↗',
  demoLink: 'Live demo ↗',
  panel: {
    open: 'Spot details',
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
  // TODO (task 3.18): screenshot, role and learned for every project.
  items: [
    {
      id: 'ashenContracts',
      name: 'Ashen Contracts',
      status: 'inProgress',
      description:
        'Browser-based idle/RPG game built as a full-stack showcase: pnpm monorepo with a Next.js app, NestJS API, shared Storybook UI library and shared TypeScript types. Architecture decisions documented in an ADR-style log.',
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
      screenshot: null,
      role: null,
      learned: null,
    },
    {
      id: 'ultimateFrisbee',
      name: 'Ultimate Frisbee Tournament Platform',
      status: 'archived',
      note: 'Engineering thesis (team of 4), built for the Polish Ultimate Players Association',
      description:
        'Owned the entire NestJS + PostgreSQL backend, built live match scoring with Socket.io (scorekeeper tablet view + real-time spectator view), designed the full UI in Figma, deployed to AWS and tested at a live tournament in Szczecin.',
      tags: [
        'NestJS',
        'PostgreSQL',
        'Socket.io',
        'Swagger',
        'AWS',
        'Nuxt',
        'Figma',
      ],
      screenshot: null,
      role: null,
      learned: null,
    },
    {
      id: 'thisWebsite',
      name: 'This website',
      status: 'live',
      description:
        'Personal site with a hero scene and character drawn in code (SVG) and scroll-driven storytelling (GSAP), built with a performance and accessibility budget.',
      tags: ['React', 'TypeScript', 'GSAP', 'Vite'],
      repoUrl: 'https://github.com/rafalciecwierz/rafalciecwierz.github.io',
      screenshot: null,
      role: null,
      learned: null,
    },
    {
      id: 'nextjsPageTransitions',
      name: 'Next.js page transitions',
      status: 'archived',
      description:
        'Comparison of three page-transition approaches in Next.js: custom implementation, Framer Motion and GSAP.',
      tags: ['Next.js', 'Framer Motion', 'GSAP'],
      repoUrl: 'https://github.com/rafalciecwierz/Nextjs-page-transition',
      screenshot: null,
      role: null,
      learned: null,
    },
  ],
};
