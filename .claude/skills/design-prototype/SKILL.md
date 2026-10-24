---
name: design-prototype
description: Build or revise one HTML design prototype in design/prototypes/ from an approved direction in docs/design/DIRECTIONS.md, then have it audited. Use for roadmap task 2.4, or when the user asks to build, change or redo a design prototype.
argument-hint: <direction number, e.g. 03>
---

# Design prototype

Each prototype shows one design direction for Rafał's portfolio as a single HTML file. The six prototypes are compared in task 2.5, and the winner is rebuilt in React in phase 3. So a prototype must be **clearly different from the others**, must **follow its direction**, and must be **easy to convert**. The rules for files in `design/` (`.claude/rules/design-prototypes.md`) apply throughout.

## Who decides what

The point of phase 2 is to **discover bold, interesting designs**. They don't have to be calm, minimal or safe.

- **The direction decides the look.** Variety comes from the research, the discovery session and the direction briefs (tasks 2.1–2.3), not from any skill's taste. Push the direction as far as it goes. A maximalist, loud, chaotic or effect-heavy direction is built maximalist, loud, chaotic or effect-heavy.
- **`frontend-design` is for craft, not for taste.** Use it for the plan pass, typography, self-critique on screenshots and copy, and to avoid *accidental* templated defaults. Its advice on restraint ("spend your boldness in one place", sparing motion, removing decoration) applies only where the direction doesn't say otherwise. Its list of generic traits is a warning against using them by accident, not a ban: a direction may use any of them on purpose.
- **The quality floor is fixed** in every direction: responsiveness, accessibility and the reduced-motion path. Boldness never costs readability or the brief's performance budget.

## 1. Read

- The direction `$ARGUMENTS` in `docs/design/DIRECTIONS.md`. If it is missing or not yet approved, stop: task 2.3 comes first.
- `docs/design/DESIGN_PROFILE.md` (who Rafał is and what to avoid), and `docs/design/RESEARCH.md` for any term the direction uses.
- Brief sections 4 (page structure), 5 (content) and 8 (performance and accessibility budget).
- The existing prototypes in `design/prototypes/`, skimmed for their palette, type and layout, so this one does not repeat them.

## 2. Plan, then stop for approval

Use the `frontend-design` skill for the plan pass, within the roles above.

- Tokens: 4–6 named hex colours, the typefaces and their roles, and the type scale.
- Layout: an ASCII wireframe for mobile and for desktop.
- The hero, and the one memorable moment.
- Effects: each one mapped to a React Bits component or marked custom, with its dependency cost and its reduced-motion behaviour.
- How it differs from every existing prototype, in one line each.
- Any content beyond the brief you plan to add (see the rules file).

Show the plan to Rafał and wait for approval before building.

## 3. Build

Write the file the rules describe: `design/prototypes/NN-<slug>.html`. Build it mobile-first.

While you build, take screenshots with Chrome DevTools MCP at 360 and 1280 px, and fix what looks wrong before moving on.

## 4. Audit

Have the `site-auditor` subagent audit the file against its direction. Fix every failure it reports, then audit again. After two rounds, stop and report what is still failing instead of looping.

## 5. Record and hand over

- In the direction's entry in `docs/design/DIRECTIONS.md`, add the file path and the final list of effects and dependencies.
- Hand over as in the `roadmap-task` skill, step 8. Include the audit's measurements table and the screenshot paths.
