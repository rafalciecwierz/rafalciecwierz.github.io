import type { About } from '../about.types';

// Brief 4.3; each fact restates the brief.
export const about: About = {
  heading: { number: '01', kicker: 'Warm-up', title: 'About' },
  paragraphs: [
    "I'm a frontend engineer with 5+ years of commercial experience in React and TypeScript. I started my career in QA automation, moved into frontend development after three months at my team's request, and later led a team of six developers.",
    "I care about clean architecture, reusable UI and tests that actually protect the product. Lately I've been going deeper into the backend with NestJS and experimenting with motion and 3D in the browser.",
    'Outside of code: parkour (for over 22 years) and climbing.',
  ],
  facts: [
    { value: '5+', label: 'years of React and TypeScript in production' },
    { value: '3', label: 'months from QA automation to developer' },
    { value: '6', label: 'developers led as Front-end Team Leader' },
    { value: '22+', label: 'years of parkour, and climbing too' },
  ],
};
