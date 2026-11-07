import type { About } from '../about.types';

export const about: About = {
  heading: { number: '01', kicker: 'Warm-up', title: 'About' },
  paragraphs: [
    "I'm a frontend engineer with 5+ years of commercial experience in React and TypeScript. I started out in QA automation, and three months in, backed by a great team, I made the switch to frontend development. About a year into my next company, I was promoted to lead its frontend team of six developers.",
    "I enjoy both sides of frontend work: polished, design-led interfaces (design has always been close to my heart) and data-heavy projects where structure and performance matter most. I care about clean architecture, reusable UI and tests that actually protect the product. Lately I've been going deeper into the backend with NestJS and experimenting with motion and 3D in the browser.",
    [
      'Outside of code: parkour for over 22 years (I train with my crew, ',
      { text: 'Sky Freerun', linkUrl: 'https://skyfreerun.com/' },
      ") and climbing. Turns out I just like getting over obstacles, whether they're on a city wall or in a codebase.",
    ],
  ],
  facts: [
    { value: '5+', label: 'years of React and TypeScript in production' },
    { value: '3', label: 'months from QA automation to developer' },
    { value: '6', label: 'developers led as Front-end Team Leader' },
    { value: '22+', label: 'years of parkour, and climbing too' },
  ],
};
