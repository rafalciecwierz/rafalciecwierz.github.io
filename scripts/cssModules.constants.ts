import type { RawValueRule } from './cssModules.types';

export const RAW_VALUE_RULES: readonly RawValueRule[] = [
  {
    name: 'colour',
    pattern: /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/i,
  },
  {
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
    name: 'z-index',
    pattern: /^z-index\s*:\s*-?\d{2,}/i,
  },
];

export const DECLARATION_PATTERN: RegExp = /[\w-]+\s*:[^;{}]*;/g;

export const BLOCK_COMMENT_PATTERN: RegExp = /\/\*[\s\S]*?\*\//g;

export const LINE_COMMENT_PATTERN: RegExp = /(^|\s)\/\/.*$/gm;
