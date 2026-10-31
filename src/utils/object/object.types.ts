// One value found by collectLeaves, with the path that leads to it (`projects.items[ashen].repoUrl`).
export type Leaf = {
  path: string;
  value: unknown;
};

export type PlainObject = Readonly<Record<string, unknown>>;
