// Conventional Commits: `type(scope): subject`, header ≤ 100 characters (see CLAUDE.md).
// Checked locally by the commit-msg hook (simple-git-hooks), and in CI by .github/workflows/ci.yml (commits)
// and .github/workflows/pr-title.yml (the PR title, which a squash merge puts on main).
export default {
  extends: ['@commitlint/config-conventional'],
};
