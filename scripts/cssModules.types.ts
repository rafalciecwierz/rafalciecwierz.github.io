export type RawValueRule = {
  name: string;
  pattern: RegExp;
};

export type RawValue = {
  rule: string;
  line: number;
  text: string;
};
