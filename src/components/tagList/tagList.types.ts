export type TagListProps = {
  // Each tag appears once in a list, so the tag itself is the key.
  tags: readonly string[];
  // The list's accessible name, e.g. "Stack" or "Tags".
  label: string;
};
