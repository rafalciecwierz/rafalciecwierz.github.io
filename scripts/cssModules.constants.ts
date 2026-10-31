import type { RawValueRule } from './cssModules.types';

// The raw values a CSS Module must take from a token in tokens.scss (docs/ARCHITECTURE.md
// section 8). Each pattern is tested against one declaration, comments removed.
export const RAW_VALUE_RULES: readonly RawValueRule[] = [
  {
    name: 'colour',
    pattern: /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/i,
  },
  {
    // A family named in the module: a quoted name or a generic one such as sans-serif.
    name: 'font family',
    pattern:
      /^font(?:-family)?\s*:[^;]*(?:['"]|\b(?:sans-serif|serif|monospace|system-ui|cursive)\b)/i,
  },
  {
    name: 'font size',
    pattern: /^font(?:-size)?\s*:[^;]*(?<![\w-])\d*\.?\d+(?:px|rem|em)\b/i,
  },
  {
    name: 'duration',
    pattern:
      /^(?:transition|animation)[\w-]*\s*:[^;]*(?<![\w-])\d*\.?\d+m?s\b/i,
  },
  {
    // Local stacking (-9 to 9) stays in the component; page-wide layers are tokens.
    name: 'z-index',
    pattern: /^z-index\s*:\s*-?\d{2,}/i,
  },
];

// One declaration: `property: value;`. Braces are excluded, so a selector such as `a:hover {`
// never starts a match.
export const DECLARATION_PATTERN: RegExp = /[\w-]+\s*:[^;{}]*;/g;

export const BLOCK_COMMENT_PATTERN: RegExp = /\/\*[\s\S]*?\*\//g;

// `//` at the start of a line or after a space, so `url(//example.com)` is kept.
export const LINE_COMMENT_PATTERN: RegExp = /(^|\s)\/\/.*$/gm;
