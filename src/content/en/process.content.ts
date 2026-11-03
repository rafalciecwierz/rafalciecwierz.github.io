import type { Process } from '../process.types';

// "The leap" (brief 4.8), as in the reference design. The text comes from brief 5.7; the pull-ups
// are Rafał's (20 a day since the first commit on 22.10.2026, 3.11.2026).
export const process: Process = {
  heading: { number: '05', kicker: 'AI & process', title: 'The leap' },
  intro:
    'Working with AI felt like a leap of faith: a jump to a roof I could not quite see from where I stood. This is what the other side looks like.',
  sceneSigns: ['Frontend', 'AI'],
  replay: 'Replay the leap',
  how: {
    title: 'How I work with AI',
    paragraphs: [
      'I work docs-first: requirements, a roadmap and decisions are written down before any code, so the AI agent builds from a spec, not from a guess. I set the frame, the direction and the rules; the agent works inside them.',
      'Then I check everything as a frontend engineer: I review every diff, test it by hand, and run the unit and integration tests, watching for inconsistency and made-up details. Git and confidential data stay with me. This site and Ashen Contracts are both built this way with Claude Code, and the whole setup is public in their repositories.',
    ],
    todo: 'Rafał to provide in task 2.6: the tools, what AI does at work, what he keeps for himself and how he checks the output.',
  },
  site: {
    title: 'How this site was made',
    paragraphs: [
      'Before a line of React was written, this site was designed sixteen times: eight design directions, each built as a dark and a light prototype, then compared against the brief and narrowed down to one.',
    ],
    facts: [
      { value: '16', label: 'design prototypes' },
      { value: '8', label: 'directions, each dark and light' },
      { value: '3', label: 'days of prototyping, 24–26.10.2026' },
      { value: '200+', label: 'pull-ups on the bar while the AI was working' },
    ],
    source:
      'Counts from the repository, dates from the commit history. The pull-ups are on my word.',
    role: 'My part: the requirements, the answers in the discovery session, approving the directions, judging every prototype and choosing this one. Every change reached the main branch through a pull request I reviewed and merged.',
    roleTodo:
      'Task 2.6: what AI did, what Rafał decided and how the work was checked.',
    galleryLabel: 'See all 16 prototypes',
    galleryUrl: '/design/',
  },
};
