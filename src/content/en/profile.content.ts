import type { Profile } from '../profile.types';

// Brief section 5.1.
export const profile: Profile = {
  name: 'Rafał Ciećwierz',
  initials: 'RC',
  role: 'Frontend Engineer',
  // Rafał's own titles (27.10.2026).
  roleFlips: [
    'Parkour Old Veteran',
    'Climbing Enjoyer',
    'Fullstack Engineer wannabe',
  ],
  tagline: 'React & TypeScript · 5+ years building production apps',
  availability:
    'Open to frontend roles (React / TypeScript), remote or hybrid.',
  email: { user: 'rafal.ciecwierz4', domain: 'gmail.com' },
  githubUrl: 'https://github.com/rafalciecwierz',
  linkedinUrl: null, // TODO: Rafał to provide the URL (task 3.18)
  calendlyUrl: null, // TODO: Rafał to provide the URL (task 3.18)
  cvUrl: '/Rafal_Ciecwierz_CV.pdf',
};
