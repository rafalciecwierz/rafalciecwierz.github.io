# Decision log

Technical decisions made while building the site, oldest first. Each entry records why it was made and what was rejected, so the decision can be explained in an interview.

Project-level requirements live in [PROJECT_BRIEF.md](PROJECT_BRIEF.md). This log is for decisions made during the work, such as adding a dependency or choosing between two approaches. The `adr` skill (`.claude/skills/adr/`) says when an entry is worth writing.

An entry is never rewritten or deleted. When a decision changes, a new entry supersedes it, and the old entry gets a `Status: **Superseded by #NNN.**` line under its date.

## Format

```md
## 001. <Decision, phrased as what was chosen>

Date: DD.MM.YYYY

Context: the problem and the forces at play, with concrete facts.

Decision: what was chosen, specifically enough to check the code against it.

Alternatives considered:

- <Option>. Rejected: <specific reason>.

Consequences: what this means in practice, including the costs, and how it was verified.
```

---

_No decisions recorded yet._
