export type Leaf = {
  path: string;
  value: unknown;
};

export type PlainObject = Readonly<Record<string, unknown>>;
