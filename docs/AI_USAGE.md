# How I use AI in this project

Much of this site is built with an AI coding agent ([Claude Code](https://claude.com/claude-code)). I'm open about that, because how the agent is set up and kept in check is part of what this project shows. The whole setup is in the repository, and changes to it are reviewed like any other change.

## The setup

| File | Purpose |
| --- | --- |
| [`CLAUDE.md`](../CLAUDE.md) | Short project context and working rules, loaded in every session. It points to the docs instead of repeating them. |
| [`.claude/rules/`](../.claude/rules/) | Rules for one area of the repo. They load only when the agent works on matching files (prototype rules for `design/**`, code rules for `src/**` and `scripts/**`), so they don't add noise everywhere else. |
| [`.claude/settings.json`](../.claude/settings.json) | Shared permissions: read-only git commands and the package scripts (`pnpm lint`, `test`, `build`, …) are pre-approved, and commands that change git history or branches are denied. It also registers the formatting hook. |
| [`.claude/hooks/formatEditedFile.mjs`](../.claude/hooks/formatEditedFile.mjs) | Runs Prettier and `eslint --fix` on every file the agent edits, so its code already matches the project's style when I read the diff. |
| [`.claude/skills/`](../.claude/skills/) | Step-by-step procedures for repeated work. |
| [`.claude/agents/site-auditor.md`](../.claude/agents/site-auditor.md) | A read-only reviewer that audits pages in a fresh context. |
| [`.mcp.json`](../.mcp.json) | Chrome DevTools MCP, pinned to a version, so the agent can measure pages in a real browser. |

Personal settings (`.claude/settings.local.json`, `CLAUDE.local.md`) are git-ignored.

## Principles

**Specs before code.** The requirements live in [`PROJECT_BRIEF.md`](PROJECT_BRIEF.md) and the work in [`ROADMAP.md`](ROADMAP.md): one task per branch, each with a scope and a "Done when". The agent works on one task at a time (`/roadmap-task 2.1`) and doesn't expand its scope.

**Context that stays small.** `CLAUDE.md` holds only what applies everywhere. Area-specific rules and procedures load on demand, which keeps the agent's instructions short enough to be followed.

**Guardrails that are enforced, not just asked for.** The agent may not commit, push, merge, rebase, reset, tag or switch branches: these commands are in the settings' `deny` list, not just in an instruction. A deny rule matches the usual form of a command, not every possible spelling (`git -C . push`, for example), so it is a strong default, not a security boundary. The rule in `CLAUDE.md` covers the rest, and my review is the final gate.

**Evidence, not "it works".** The agent checks pages in a real, headless Chrome through [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp):

- screenshots at 360, 768, 1280 and 1920 px,
- emulated `prefers-reduced-motion`,
- Lighthouse audits,
- a performance trace on a throttled "mid-range phone" (4× CPU, Slow 4G),
- console errors.

These are the success criteria from the brief, measured rather than assumed. Usage statistics and CrUX lookups are turned off.

**A second opinion in a fresh context.** The agent that builds a page doesn't grade it. The `site-auditor` subagent audits it without the builder's reasoning in its context, can only read and measure, and reports numbers and screenshots.

**Skills for repeated procedures:**

| Skill | Source | What it does |
| --- | --- | --- |
| `roadmap-task` | own | One roadmap task, end to end. It refuses to start on the wrong branch, verifies the result and proposes commit messages. |
| `design-prototype` | own | One HTML design prototype, or one iteration of the chosen design as a new file: a plan I approve, then the build. Prototypes are not audited; only the chosen design is. |
| `adr` | own (criteria adapted from mattpocock/skills) | A decision entry in [`DECISIONS.md`](DECISIONS.md), written only when the decision is worth one. |
| `grilling`, `grill-me` | [mattpocock/skills](https://github.com/mattpocock/skills), MIT | The agent questions my plan until every open decision is settled. |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills), Apache 2.0 | Guidance against generic, templated "AI look" design. |
| `tdd` | [mattpocock/skills](https://github.com/mattpocock/skills), MIT | The red → green loop for new logic: one failing test, then just enough code to pass it. |
| `gsap-react`, `gsap-scrolltrigger`, `gsap-performance` | [greensock/gsap-skills](https://github.com/greensock/gsap-skills), MIT | GSAP's official guidance: `useGSAP` with a scope and cleanup, ScrollTrigger (pinning, scrub, refresh order) and animation performance. Limited with `paths` to the motion code (`src/motion/`, `src/motionComponents/`, `*.animation.ts`), so they load only where GSAP is used. |

Third-party skills are copied from a pinned commit, with the licence and a `NOTICE.md` in each folder. Updates are manual and reviewed, and nothing installs or syncs skills automatically.

## Deliberately not used

- **Marketplace plugins:** their content can change without review. Pinned copies are used instead.
- **An `AGENTS.md` file:** only one agent is used here, so it would duplicate `CLAUDE.md`.
- **AI code review in CI:** the site is static and has little logic. Local audits and my own review cover it without secrets or running costs.

## What stays with me

- **Every commit.** I read the diff, make my own changes, decide what goes in and commit it. The agent proposes commit messages; it doesn't commit.
- **Decisions.** The agent proposes options and argues for one, but every decision in the brief and the decision log is mine.
- **Understanding.** I must be able to explain every part of this site in an interview without AI. The agent explains non-obvious code as it writes it, and the reasoning is recorded in [`DECISIONS.md`](DECISIONS.md).
