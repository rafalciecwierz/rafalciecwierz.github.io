// Conventional Commits: `type(scope): subject`, header ≤ 100 characters (see CLAUDE.md).
// Checked locally by the commit-msg hook (simple-git-hooks); task 3.3 adds the same check in CI.
export default {
  extends: ['@commitlint/config-conventional'],
};
