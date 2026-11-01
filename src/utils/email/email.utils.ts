import type { EmailParts } from './email.types';

// The address is kept in two parts in the content and joined only in the browser, so it is
// never written whole into the HTML that the simplest scrapers read (brief section 4.9).
export function joinEmail(parts: EmailParts): string {
  return `${parts.user}@${parts.domain}`;
}
