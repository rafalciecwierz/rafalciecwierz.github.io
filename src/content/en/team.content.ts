import type { Team } from '../team.types';

// Brief 5.6: LinkedIn recommendations from Rafał's team at Mood up (June 2024), word for word.
// TODO: the three authors must agree before the site is published (brief section 14).
export const team: Team = {
  heading: { kicker: 'Spotters', title: 'From the team' },
  intro:
    'In parkour, a spotter watches your back on a hard move. These are mine from Mood up: LinkedIn recommendations, pasted up word for word.',
  posterHeading: 'From the team',
  source: 'Mood up, 2024',
  caption: (role: string, source: string): string => `${role} · ${source}`,
  quotes: [
    {
      id: 'wiktoriaW',
      author: 'Wiktoria W.',
      role: 'Marketing & Communication',
      paragraphs: [
        "Seriously, I've never met a leader as tuned in and supportive as him.",
        "Whoever snags him next is super lucky - yeah, I'm a bit envious. 😉",
      ],
    },
    {
      id: 'rafalH',
      author: 'Rafał H.',
      role: 'Frontend Developer',
      paragraphs: [
        'His enthusiasm and optimism were contagious, making him a joy to work with.',
      ],
    },
    {
      id: 'szymonK',
      author: 'Szymon K.',
      role: 'Frontend Developer',
      paragraphs: [
        'His technical skills and ability to simplify complex concepts, guiding others through challenges, have been invaluable in enhancing the overall quality and efficiency of our development processes.',
      ],
    },
  ],
};
