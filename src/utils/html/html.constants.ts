// The characters that would end an attribute or start a tag, and their safe HTML entities.
export const HTML_ESCAPES: Readonly<Record<string, string>> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export const HTML_SPECIAL_CHARACTERS: RegExp = /[&<>"']/g;
