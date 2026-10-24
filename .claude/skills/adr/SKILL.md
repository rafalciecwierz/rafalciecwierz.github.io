---
name: adr
description: Record a technical decision in docs/DECISIONS.md in the project's ADR format. Use when a hard-to-reverse decision with real alternatives has just been made (for example adding a dependency or choosing between two approaches), or when the user asks to record, supersede or explain a decision.
---

# Architecture decision record

`docs/DECISIONS.md` is the project's single decision log. It doubles as interview preparation: Rafał must be able to justify every technical decision, so each entry records **why**, and what was rejected.

Project-level requirements belong in `docs/PROJECT_BRIEF.md`, not here. This log is for decisions made while building.

## When an entry is worth it

Offer one only when all three are true (criteria adapted from [mattpocock/skills](https://github.com/mattpocock/skills), MIT):

1. **Hard to reverse:** changing your mind later has a real cost (a library, the hero technique, the deployment setup). A helper function doesn't qualify.
2. **Surprising without context:** a future reader would ask "why did they do it this way?", or might "fix" something deliberate.
3. **A real trade-off:** there were real alternatives, and one was picked for specific reasons.

If any of the three is missing, skip the entry: a code comment or a line in the task summary is enough.

Every added runtime dependency always gets an entry (brief section 3).

Propose the entry and let Rafał confirm the reasoning. The decision and its motives are his, not yours.

## Format

Append the entry at the end, numbered after the highest existing entry (three digits). Each field is its own paragraph, and the date is `DD.MM.YYYY`:

```md
## 001. <Decision, phrased as what was chosen>

Date: 23.10.2026

Context: the problem and the forces at play, with concrete facts (versions, sizes, measurements, constraints).

Decision: what was chosen, specifically enough that someone could check the code against it.

Alternatives considered:

- <Option>. Rejected: <specific reason>.
- <Option>. Rejected: <specific reason>.

Consequences: what this means in practice, including the costs. Mention how it was verified, if it was.
```

## Rules

- **Never rewrite or delete an entry.** When a decision changes, add a new entry. Under the old entry's date, add `Status: **Superseded by #NNN.** <one line why>`.
- Keep it short: a few sentences per field, not a design doc.
- Write facts, not hype. Real measurements (gzipped KB, Lighthouse scores, fps) beat adjectives.
- Don't commit. Propose a `docs:` commit message, or include the entry in the task's commit.
