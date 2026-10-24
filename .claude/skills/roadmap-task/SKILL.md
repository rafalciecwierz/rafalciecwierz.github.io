---
name: roadmap-task
description: Do one task from docs/ROADMAP.md, chosen by its number or branch name (e.g. 2.1 or design-research), verify it, and hand it over with proposed commit messages. Use when the user asks to do, continue or finish a roadmap task.
argument-hint: <task number or name, e.g. 2.1 or design-research>
allowed-tools: Bash(git branch --show-current), Bash(git status *)
---

# Roadmap task

`docs/ROADMAP.md` lists the project's tasks, each with a branch, a scope and a "Done when". Rafał works through them one at a time and **commits every task himself**. He is the gate that decides what goes in. You never commit, push, merge or switch branches.

## Git state when this skill started

- Current branch: !`git branch --show-current`
- Working tree:

!`git status --short`

## 1. Find the task

Find `$ARGUMENTS` in `docs/ROADMAP.md`. It may be a task number (`2.1`), a branch name or part of one (`design-research`), or a numbered item inside a task (`2.4 03` for prototype 03).

- No argument, no match, or more than one match: list the candidates and ask. Don't guess.
- The task is already ticked: say so and ask whether to revise it.

## 2. Check before changing anything

Stop and report, without editing any file, when:

- **The branch is wrong:** the current branch above is not the task's branch (for example `main`). Give Rafał the branch name to create.
- **The working tree has unrelated changes:** they belong to something else and would end up in this task's commit.
- **A prerequisite is missing:** an earlier task this one builds on is not done. For example, a prototype needs its direction in `docs/design/DIRECTIONS.md`.

## 3. Read what the task needs

Read the brief sections the task touches, the docs it names and the files it changes. Follow existing patterns rather than inventing new ones.

## 4. Settle the open decisions

When the task leaves choices open, present them in one list, each with your recommendation, and wait for the answers. For a large set of linked decisions, use the `grilling` skill. Decisions are Rafał's. Finding facts is your job: look them up instead of asking.

Skip this step when nothing is open.

## 5. Do only this task

- Stay inside the task's scope. If you find a problem that belongs elsewhere, mention it in the summary, or propose a new roadmap task. Don't fix it now.
- If the task cannot be done as written, stop and agree the change with Rafał. Then update the task in `docs/ROADMAP.md` in the same change.
- Use the matching skill when there is one: `design-prototype` for prototypes, `frontend-design` for visual work, `adr` for decisions.

## 6. Verify for real

Check every point of the task's "Done when" and of the roadmap's definition of done. Use the strongest check that fits:

- **UI:** Chrome DevTools MCP for screenshots, then an independent audit by the `site-auditor` subagent.
- **Code (from task 3.2):** `lint`, `typecheck`, `test` and `build`.
- **Docs:** check every link and file path you mention.

Clean up whatever you started: servers and temporary files.

## 7. Update the docs

- `docs/ROADMAP.md`: tick the task's checkbox.
- `CLAUDE.md` "Current status": the last completed task and the next step.
- `docs/DECISIONS.md`: use the `adr` skill when a decision meets its criteria.
- `docs/PROJECT_BRIEF.md`, `CLAUDE.md` or `.claude/rules/`: update them if a requirement or convention changed.

## 8. Hand over

Write the summary in Polish, short, outcome first:

- **What changed:** files, grouped by purpose.
- **How it was verified:** the evidence (scores, screenshots, command output).
- **What Rafał should check himself**, e.g. what to open in the browser.
- **Open `TODO`s** and anything surprising.
- **Proposed commit message(s)** in English, following "Commit messages and branches" in `CLAUDE.md`, each with the files it covers. Split the work into several commits when it naturally splits.
