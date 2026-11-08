export type Profile = {
  name: string;
  initials: string;
  role: string;
  roleFlips: readonly string[];
  tagline: string;
  availability: string;
  email: { user: string; domain: string };
  githubUrl: string;
  linkedinUrl: string | null;
  calendlyUrl: string | null;
  cvUrl: string;
};
