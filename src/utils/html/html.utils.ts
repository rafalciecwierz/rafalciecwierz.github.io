import { HTML_ESCAPES, HTML_SPECIAL_CHARACTERS } from './html.constants';

export function escapeHtml(text: string): string {
  return text.replace(
    HTML_SPECIAL_CHARACTERS,
    (character: string): string => HTML_ESCAPES[character] ?? character,
  );
}
