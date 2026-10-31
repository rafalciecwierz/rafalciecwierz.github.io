import type { Process } from '../process.types';

// "The leap" (brief 4.8), as in the reference design. Its open fields are TODOs for task 3.18;
// the facts brief 5.7 now has can fill them then.
export const process: Process = {
  heading: { number: '05', kicker: 'AI & process', title: 'The leap' },
  intro:
    'Working with AI felt like a leap of faith: a jump to a roof I could not quite see from where I stood. This is what the other side looks like.',
  sceneSigns: ['Frontend', 'AI'],
  replay: 'Replay the leap ↺',
  how: {
    title: 'How I work with AI',
    paragraphs: null, // TODO (task 3.18)
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
      { value: '1', label: 'design chosen: this one' },
    ],
    source: 'Counts from the repository, dates from the commit history.',
    role: null, // TODO (task 3.18)
    roleTodo:
      'Task 2.6: what AI did, what Rafał decided and how the work was checked.',
    galleryLabel: 'See all 16 prototypes',
    galleryUrl: null, // TODO: the gallery's path on the live site (task 3.17)
  },
};
