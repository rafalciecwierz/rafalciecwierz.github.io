import type { Footer } from '@/content';

export type SiteFooterProps = {
  footer: Footer;
  // The build year (BUILD_YEAR), passed in so a test can render any year.
  year: number;
};
