export type HeroIntroProps = {
  role: string;
  // The other titles the role flips through once, with motion, before it lands on `role`.
  roleFlips: readonly string[];
  tagline: string;
};
