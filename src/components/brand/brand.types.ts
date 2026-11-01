export type BrandProps = {
  href: string;
  initials: string;
  text: string;
  // Starts with the visible text, so voice control users can say what they see (WCAG 2.5.3).
  accessibleName: string;
};
