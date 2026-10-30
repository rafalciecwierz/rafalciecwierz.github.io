---
paths:
  - "src/**"
  - "scripts/**"
---

# Code

`docs/ARCHITECTURE.md` is the source of truth for all code. Read the section that matches the change before writing it; this file only points to it and lists what is easy to get wrong.

## Before writing

- Where a file goes and what it is called: sections 3 and 4. Sections hold only sections; every component lives in `src/components/`; motion components live in `src/motionComponents/` and are never imported statically.
- How a component looks: section 6. Pages and sections contain no HTML tags.
- Copy and data: section 7. Only pages (and `src/app/` for the head) import content data.
- Anything that runs in the browser only: section 10. Rendering must work in Node.

## While writing

- Every variable, parameter and return type is written out, callbacks included. Hooks get their type argument: `useState<boolean>(false)`.
- Types go in the folder's `.types.ts`, numbers in `.constants.ts` or a design token, calculations in `.utils.ts` with a test.
- Use `.hook.ts`, `.service.ts` or `.animation.ts` for side effects, never a bare `window`, `document` or `navigator` in a component.

## After writing

Run `pnpm lint`, `pnpm typecheck` and `pnpm test`; run `pnpm build` when the change touches the app entries, the pre-render script or the build config. The lint rules enforce most of the above (section 15), so fix the code, not the rule. A rule that is wrong for a case is changed in `eslint.config.js` and in `docs/ARCHITECTURE.md` together, with Rafał's agreement.

Write new logic test-first with the `tdd` skill.
