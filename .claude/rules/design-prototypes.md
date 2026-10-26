---
paths:
  - "design/**"
---

# Design prototypes

A prototype is a reference for the React build in phase 3, not production code. Build it so it is easy to convert: the same sections, content and effects map one to one onto components.

## File

- Each direction has two self-contained HTML files: `design/prototypes/NN-<slug>-dark.html` and `design/prototypes/NN-<slug>-light.html`. CSS and JS are inline.
- The two variants are **independent designs that share only the style**, one dominantly dark and one dominantly light. Design each from scratch: concept, hero, layout, section structure, typography, palette and effects must all differ, and nothing is carried over from the other variant (not even the hero object). Someone who sees both should recognise the shared style and nothing else. Neither file has a theme toggle.
- The only external resources allowed are Google Fonts and libraries from cdnjs or jsDelivr pinned to an exact version (e.g. `three@0.160.0`, never `@latest`).
- The file starts with a comment block that lists:
  - the direction's number and name (from `docs/design/DIRECTIONS.md`),
  - each effect and where it comes from (a React Bits component, a GSAP plugin, another library or demo, or "custom"),
  - the libraries used, and the dependencies the React build would need.
- After building, the direction's entry in `docs/design/DIRECTIONS.md` gets an **As built** block for the variant (palette, type, layout, hero moment, effects, what was left out, dependencies). It records the reasoning the HTML cannot.

## Iterations of the chosen design

Task 2.5 chose prototype 08 Ascent, dark variant. From then on (roadmap task 2.7):

- The 16 files in `design/prototypes/` are **never edited**. They are the record of the exploration and are published as a gallery.
- Each iteration is a new file, `design/iterations/08-ascent-dark-v<N>.html`, copied from the previous one (v2 from the original prototype) and then changed.
- The header comment adds a "Changes from v<N-1>" list. The direction's entry in `docs/design/DIRECTIONS.md` gets an "Iterations" block, and `design/index.html` links the new file.
- Everything in this file still applies to iterations, including the quality floor. The latest iteration Rafał approves is the reference for phase 3.

## Structure

- Keep one `<section id="…">` per section from brief section 4, in the brief's order, unless the direction changes the order on purpose and says so.
- Keep all content in one object at the top of the script (as `src/content/` will hold it). Markup is rendered from that object, so no copy is scattered through the HTML.
- Write each effect as its own named function with a comment naming its source (React Bits component, GSAP plugin, library or "custom"), so it maps to a component later.
- Effects serve the direction. Don't force in a library component that doesn't fit the style; one well-chosen effect beats many generic ones.

## Content

- The content comes from brief section 5. Anything missing gets a visible `TODO`.
- Content beyond the brief is welcome when it makes the prototype more interesting: a section intro, micro-copy, a new section idea, a playful interaction text. Mark every addition with a `<!-- NEW CONTENT -->` comment and list it in the task summary, so Rafał can keep or remove it.
- Facts about Rafał (dates, numbers, companies, roles, skills and their levels) are never invented.
- Testimonials, when a direction uses them, come only from brief section 5.6: word for word, shown as first name, surname initial and role.
- Never wait for Rafał's photo. Use a character built in code (a clay-like 3D figure or a hand-drawn SVG, based on the reference traits in `docs/design/DESIGN_PROFILE.md`), or a stock face as a placeholder marked `TODO`.
- No sound of any kind (`docs/design/DESIGN_PROFILE.md`, section 7).
- Never show the phone number.
- Make it obvious that the project list can grow: build it from the content array, never as hand-placed cards.

## Not allowed

- Presentation-only UI: component labels, label toggles, "Prototype: …" toasts and hint texts. Effects themselves are fine.
- Copying another prototype's layout, palette or type pairing. Each direction must look different at a glance.

## Quality floor

- Responsive from 360 to 1920 px, with no horizontal scroll.
- Semantic landmarks, a skip link, visible focus and AA contrast.
- A complete `prefers-reduced-motion: reduce` path: no smooth scroll, no scrubbed motion, a static hero.
- A fallback when WebGL fails, and a canvas marked `aria-hidden="true"`.
- Name, role, Download CV and Get in touch above the fold at 360 px and 1280 px.
