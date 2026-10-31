export type Profile = {
  name: string;
  initials: string;
  role: string;
  // Rafał's other titles, flipped through once in the hero before the role lands.
  roleFlips: readonly string[];
  tagline: string;
  availability: string;
  // Joined only at runtime, so the address is not in the HTML for the simplest scrapers.
  email: { user: string; domain: string };
  githubUrl: string;
  linkedinUrl: string | null;
  calendlyUrl: string | null;
  cvUrl: string;
};
