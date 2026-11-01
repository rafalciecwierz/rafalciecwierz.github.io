# rafalciecwierz.github.io — project context

> Rule: keep this file SHORT. Details live in `docs/`, and rules that apply to one area live in `.claude/rules/` (loaded only when Claude works on matching files). Point to them, don't copy them.

## What this project is

Rafał Ciećwierz's personal portfolio: an interactive CV and a showcase of frontend craft (React, TypeScript, GSAP, Three.js), served from GitHub Pages. It has to help him get hired as a frontend engineer.

Requirements: `docs/PROJECT_BRIEF.md`, kept up to date with everything agreed. Rafał must be able to explain every line in a job interview, so readable code and written-down reasoning beat clever code.

## Where the project is

Work is planned task by task in `docs/ROADMAP.md`, in three phases: documentation and AI tooling → design prototypes (eight directions, each with a dark and a light variant) and a choice → implementation and deployment. The site is a Vite + React + TypeScript app in `src/`, pre-rendered at build time; its structure and conventions are in `docs/ARCHITECTURE.md`.

## Working agreement

- **One roadmap task at a time**, started with `/roadmap-task <number or name>`. Stay inside the task's scope.
- **IMPORTANT: Git belongs to Rafał.** Never commit, push, merge, rebase, tag, switch branches or open PRs. Settings deny these commands, but the rule applies to every other form of them too. Rafał creates the branch before a task. Claude proposes branch names and commit messages.
- **Language:** everything written in the project should be in English.
- **No invented facts.** Facts about Rafał come only from the brief (section 5). Mark anything missing as a clear `TODO` and list it in the task summary. Design prototypes may add new copy, marked and listed (see `.claude/rules/design-prototypes.md`).
- **Explain non-obvious code** in the chat (GSAP, React Three Fiber, performance): what it does and why this approach was chosen.
- **Ask before adding a dependency** (brief section 3: minimal dependencies).
- No analytics, cookies or trackers.
- **Keep docs in sync:** a change to a convention or a requirement updates the brief, the roadmap, this file or a rule in the same change. Claude trusts these files more than the code, so a stale line produces wrong work.

## Commit messages and branches

[Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`, header ≤ 100 characters, imperative and lowercase, with no trailing period.

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Scope is optional: the area changed, e.g. `design`, `hero`, `content`.
- Example: `feat(design): add prototype 03 with an editorial layout`.
- Branches: `<type>/<kebab-case-task-name>`. Each task's branch is listed in `docs/ROADMAP.md`.

## Commands

Node 24 (`.nvmrc`) and pnpm. After `pnpm install`, a `commit-msg` hook checks commit messages with commitlint.

- `pnpm dev`: the dev server
- `pnpm build`: type-check, build and pre-render into `dist/`; `pnpm preview` serves the result
- `pnpm lint`, `pnpm typecheck`, `pnpm test`: run all three before calling code work done
- `pnpm format` / `pnpm format:check`: Prettier (Markdown is excluded)
- `pnpm lighthouse`: Lighthouse CI on `dist/` against the brief's thresholds (`lighthouserc.yml`); run `pnpm build` first
- CI (`.github/workflows/`): `ci.yml` runs all of the above and commitlint on pull requests and on `main`, Lighthouse on pull requests, and deploys `main` to GitHub Pages; `pr-title.yml` lints the PR title

## Verifying work

- Check UI with the Chrome DevTools MCP server (`.mcp.json`). Use these viewports: 360, 768, 1280 and 1920 px. Also check with `prefersReducedMotion: reduce`. For mobile performance, use a 4× CPU slowdown and Slow 4G.
- Before calling UI work done, have the `site-auditor` subagent audit it in a fresh context. Report its evidence (scores, screenshots, console output), not a claim that it works. Exception: design prototypes (task 2.4) are not audited; only the chosen design is, from phase 3.
- Serve pages over HTTP for audits (`python3 -m http.server`), not `file://`.

## Where to find more context

- Requirements: `docs/PROJECT_BRIEF.md`
- Architecture and code conventions (phase 3): `docs/ARCHITECTURE.md`
- Task list and definition of done: `docs/ROADMAP.md`
- Technical decisions with rejected alternatives: `docs/DECISIONS.md`
- How AI is used here and why: `docs/AI_USAGE.md`
- Design prototypes: `design/` (rules in `.claude/rules/design-prototypes.md`)
- Skills (`.claude/skills/`):
  - `roadmap-task`: one roadmap task, end to end
  - `design-prototype`: one HTML prototype
  - `adr`: a decision entry
  - `grilling`, with `/grill-me` as a shortcut: settle a plan through questions
  - `frontend-design` (Anthropic): distinctive visual design
  - `tdd` (mattpocock): test-first loop for new logic
  - `gsap-react`, `gsap-scrolltrigger`, `gsap-performance` (GreenSock): GSAP guidance, loaded only for motion code
- Subagent `site-auditor` (`.claude/agents/`): independent UI audit

## Current status (keep this updated)

- Phase: 3, implementation
- Last completed: 3.11 motion foundation: `motion/gsap.ts`, the lazy `MotionLayer`, `useReducedMotion` and `useIsIdle`, Lenis synced with ScrollTrigger and off with reduced motion, an ESLint guard that keeps GSAP and Lenis out of the initial bundle, and the official GSAP skills
- Next step: 3.12 interactive effects, branch `feat/interactive-effects`
