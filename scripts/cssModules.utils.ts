import {
  BLOCK_COMMENT_PATTERN,
  DECLARATION_PATTERN,
  LINE_COMMENT_PATTERN,
  RAW_VALUE_RULES,
} from './cssModules.constants.ts';
import type { RawValue, RawValueRule } from './cssModules.types';

// Removes comments but keeps their line breaks, so line numbers still match the file.
function removeComments(scss: string): string {
  return scss
    .replace(BLOCK_COMMENT_PATTERN, (comment: string): string =>
      comment.replace(/[^\n]/g, ''),
    )
    .replace(LINE_COMMENT_PATTERN, '$1');
}

function lineAt(text: string, index: number): number {
  return text.slice(0, index).split('\n').length;
}

// Every declaration in a stylesheet that uses a raw value where a design token exists.
export function findRawValues(scss: string): RawValue[] {
  const code: string = removeComments(scss);
  const found: RawValue[] = [];

  for (const match of code.matchAll(DECLARATION_PATTERN)) {
    const declaration: string = match[0].trim();
    const brokenRule: RawValueRule | undefined = RAW_VALUE_RULES.find(
      (rule: RawValueRule): boolean => rule.pattern.test(declaration),
    );
    if (brokenRule !== undefined) {
      found.push({
        rule: brokenRule.name,
        line: lineAt(code, match.index + match[0].indexOf(declaration)),
        text: declaration,
      });
    }
  }
  return found;
}
