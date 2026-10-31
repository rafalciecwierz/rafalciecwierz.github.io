// A rule of scripts/cssModules.test.ts: a kind of raw value that must come from a token.
export type RawValueRule = {
  name: string;
  // Matches one declaration (`color: #fff;`) that breaks the rule.
  pattern: RegExp;
};

// One declaration in a stylesheet that uses a raw value instead of a token.
export type RawValue = {
  rule: string;
  line: number;
  text: string;
};
