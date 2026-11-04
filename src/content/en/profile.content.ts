import type { Profile } from '../profile.types';

// Brief section 5.1.
export const profile: Profile = {
  name: 'Rafał Ciećwierz',
  initials: 'RC',
  role: 'Frontend Engineer',
  // Rafał's own titles (27.10.2026, cut to two on 2.11.2026). At most two, so the flip ends
  // within WCAG 2.2.2's 5 s (roleFlipDuration in src/motionComponents/heroMotion/).
  roleFlips: ['Parkour & Climbing Addict', 'Backend Explorer'],
  tagline: 'React & TypeScript · 5+ years building production apps',
  availability:
    'Open to frontend and full-stack roles (React / TypeScript / NestJS), remote or hybrid.',
  email: { user: 'rafal.ciecwierz4', domain: 'gmail.com' },
  githubUrl: 'https://github.com/rafalciecwierz',
  linkedinUrl: 'https://www.linkedin.com/in/rafalciecwierz/',
  calendlyUrl: 'https://calendly.com/rafal-ciecwierz4/30min',
  cvUrl: '/Rafal_Ciecwierz_CV.pdf',
};
