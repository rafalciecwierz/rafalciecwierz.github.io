# Roadmap

The plan for building the portfolio, from documentation to a deployed site.
Each task is done on its own branch and merged into `main` before the next one starts.

- **Source of requirements:** [PROJECT_BRIEF.md](PROJECT_BRIEF.md). It is kept up to date with everything agreed so far.
- **Decisions made during the work** are recorded in [DECISIONS.md](DECISIONS.md).
- **Design-agnostic:** Phase 3 implements *the design chosen in Phase 2*. Wherever a task mentions "the chosen design", it refers to that prototype, whichever of the six it is.

## How we work

1. Claude proposes a branch name (listed below for each task). Rafał verifies it and creates the branch.
2. Claude implements the task and lists what changed and what to check.
3. Claude proposes commit message(s) in [Conventional Commits](https://www.conventionalcommits.org/) format.
4. Rafał reviews, commits, pushes and merges into `main`.
5. The task's checkbox is ticked in this file as part of the same branch.

Tasks may be added, split or reordered between phases when needed. Any such change is made in this file.

### Definition of done (every task)

- The task's "Done when" criteria are met.
- From Phase 3 on: `lint`, `typecheck`, `test` and `build` pass locally.
- From Phase 3 on: checked with `prefers-reduced-motion: reduce` and at 360 px width when the task touches UI.
- Significant decisions are recorded in [DECISIONS.md](DECISIONS.md).
- Missing content is left as a clearly marked `TODO` and listed in the task summary.

---

## Phase 1 — Documentation and AI tooling

Goal: a documented project and a professional, minimal AI setup that is ready for the design and implementation work.

### 1.1 Project roadmap
- [ ] **Branch:** `docs/project-roadmap`
- **Scope:** this roadmap, an empty decision log ([DECISIONS.md](DECISIONS.md)) with its template, and an updated brief reflecting everything agreed so far.
- **Done when:** Rafał has approved the roadmap and the updated brief.

### 1.2 AI tooling setup
- [ ] **Branch:** `chore/ai-tooling-setup`
- **Scope:**
  - Research current Claude Code best practices before writing anything.
  - `CLAUDE.md`: project context, conventions, working agreement and links to the docs. It stays short and points to docs instead of duplicating them.
  - `.claude/settings.json`: shared permissions for the project. Personal settings stay in the git-ignored `settings.local.json`.
  - Project skills in `.claude/skills/`, only where a workflow repeats. Candidates: building a design prototype, porting a React Bits component, writing a decision record, preparing a task summary with commit message(s).
  - `docs/AI_USAGE.md`: an open statement of how AI is used in this project, what Rafał owns and how the output is verified.
- **Done when:** every AI file has a clear purpose described in `docs/AI_USAGE.md`, and the tooling has been tried on a real task.

---

## Phase 2 — Design exploration

Goal: six distinct design directions as HTML prototypes (the existing one plus five new ones), and one of them chosen for implementation.

All prototypes use the same content from the brief (section 5) and respect the technical constraints (performance, accessibility, static hosting). The visual direction can depart freely from brief section 7.

### 2.1 Design research
- [ ] **Branch:** `docs/design-research`
- **Scope:** research of current portfolio and web design trends. Output: `docs/design/RESEARCH.md` with:
  - a plain-language glossary of design styles and terms, each with a short description and reference links,
  - notable developer and studio portfolios worth learning from,
  - what each audience from the brief (recruiters, tech leads, creative studios) responds to.
- **Done when:** Rafał can name the styles that interest him using the glossary.

### 2.2 Design discovery session
- [ ] **Branch:** `docs/design-discovery`
- **Scope:** a Q&A session about Rafał's personality, interests, taste and goals. Output: `docs/design/DESIGN_PROFILE.md`, a summary of what fits him and what to avoid.
- **Done when:** Rafał agrees the profile describes him.

### 2.3 Design directions
- [ ] **Branch:** `docs/design-directions`
- **Scope:**
  - Five written direction briefs in `docs/design/DIRECTIONS.md`. Each one covers the concept, mood, typography, colour, layout, motion, hero idea, candidate React Bits components and expected dependencies.
  - Move the existing prototype to `design/prototypes/01-<slug>.html` as direction 01.
- **Done when:** Rafał has approved all five directions, and each is clearly different from the others and from 01.

### 2.4 Design prototypes 02–06
One task per prototype, so each can be reviewed on its own.

- [ ] **Branch:** `feat/design-prototype-02-<slug>`
- [ ] **Branch:** `feat/design-prototype-03-<slug>`
- [ ] **Branch:** `feat/design-prototype-04-<slug>`
- [ ] **Branch:** `feat/design-prototype-05-<slug>`
- [ ] **Branch:** `feat/design-prototype-06-<slug>`

`<slug>` is the short name of the direction from task 2.3.

- **Scope:** a single, self-contained HTML file in `design/prototypes/`, built like prototype 01 so it can be converted into the React project. It is responsive (360 px to 1920 px) and supports reduced motion.
- **Done when:** the prototype matches its direction brief and works on mobile and desktop.

### 2.5 Design selection
- [ ] **Branch:** `docs/design-selection`
- **Scope:**
  - `design/index.html`: a page that links and compares all six prototypes.
  - A comparison against the brief's success criteria (5-second clarity, mobile above the fold, performance risk, accessibility, effort within the time box).
  - The choice is recorded in [DECISIONS.md](DECISIONS.md).
- **Done when:** one design is chosen. Elements borrowed from other prototypes are listed explicitly.

---

## Phase 3 — Implementation and deployment

Goal: the chosen design rebuilt as a clean React + TypeScript project and deployed to GitHub Pages.

The first part (3.1–3.10) produces a usable, deployed site without motion or 3D. Everything after that is enhancement.

### 3.1 Architecture requirements
- [ ] **Branch:** `docs/architecture`
- **Scope:** `docs/ARCHITECTURE.md`, which contains:
  - Rafał's requirements for architecture and code quality. He may describe them in Polish in chat, and Claude writes them in English.
  - A component map of the chosen design: sections, shared UI, effects and the content they consume.
  - A dependency plan: for each effect, either an installed library or a port onto the existing stack, with the reason.
- **Done when:** Rafał has approved the document. All later tasks follow it.

### 3.2 Project scaffold
- [ ] **Branch:** `chore/project-scaffold`
- **Scope:**
  - Vite + React + TypeScript (strict) and SCSS Modules.
  - ESLint and Prettier as one config for the whole project, following [ashen-contracts](https://github.com/rafalciecwierz/ashen-contracts).
  - Vitest and React Testing Library.
  - Folder structure from `docs/ARCHITECTURE.md`.
  - Package scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test`, `format`.
- **Done when:** a placeholder app runs locally and all scripts pass.

### 3.3 Continuous integration
- [ ] **Branch:** `ci/quality-checks`
- **Scope:** a GitHub Actions workflow that runs lint, typecheck, test and build on every push and pull request.
- **Done when:** the workflow passes on GitHub.

### 3.4 Content layer
- [ ] **Branch:** `feat/content-layer`
- **Scope:**
  - Typed content files in `src/content/` with all data from brief section 5.
  - Every user-facing string is ready for a future `pl` locale.
  - Projects are modelled so that adding, removing or reordering one only touches the content file.
- **Done when:** the content is typed, covered by tests, and no copy is hard-coded in components.

### 3.5 Design tokens and global styles
- [ ] **Branch:** `feat/design-tokens`
- **Scope:** colours, spacing, type scale, radii and motion durations from the chosen design as CSS custom properties; global styles; fonts (`font-display: swap`, preload of the display font, no layout shift).
- **Done when:** the tokens match the chosen design, and nothing in the components uses a raw value that has a token.

### 3.6 UI primitives
- [ ] **Branch:** `feat/ui-primitives`
- **Scope:** shared building blocks needed by the chosen design (for example Button, Tag, Badge, SectionHeading), with visible focus states, plus tests where they carry logic.
- **Done when:** all primitives used by more than one section exist in `components/ui/`.

### 3.7 Layout and navigation
- [ ] **Branch:** `feat/layout-navigation`
- **Scope:**
  - Skip-to-content link.
  - Header with anchor navigation.
  - Accessible mobile menu with focus trap, Escape to close and focus return.
  - Footer.
  - Semantic page landmarks.
- **Done when:** the whole page can be navigated with the keyboard alone.

### 3.8 Hero (static)
- [ ] **Branch:** `feat/hero-static`
- **Scope:** hero text, the Download CV and Get in touch actions, and a static fallback visual with reserved space for the future 3D canvas.
- **Done when:** name, role and both actions are above the fold at 360 px and 1280 px, and the heading is the LCP element.

### 3.9 Content sections (static)
- [ ] **Branch:** `feat/content-sections`
- **Scope:** About, Stack (levels with a text label), Career (timeline with promotions highlighted), Projects (extensible list) and Contact (no phone number), all rendered from the content layer.
- **Done when:** every section from the chosen design is present and readable without JavaScript animations.

### 3.10 SEO and deployment
- [ ] **Branch:** `ci/github-pages-deploy`
- **Scope:**
  - Title, meta description, Open Graph and Twitter tags, placeholder OG image, favicon, theme colour and `lang`.
  - A GitHub Actions deploy to GitHub Pages using `actions/deploy-pages`, with Vite `base: '/'`.
- **Done when:** the site is live at `https://rafalciecwierz.github.io`. **Checkpoint:** the site is good enough to share.

### 3.11 Motion foundation
- [ ] **Branch:** `feat/motion-foundation`
- **Scope:** `animation/gsap.ts` (registers plugins once), a `useReducedMotion` hook as the single source of truth, and Lenis synced with ScrollTrigger and disabled for reduced motion.
- **Done when:** smooth scroll works, and is off with reduced motion, as covered by a test.

### 3.12 Interactive effects
- [ ] **Branch:** `feat/interactive-effects`
- **Scope:** the React Bits (or equivalent) effects used by the chosen design, either installed or ported as decided in `docs/ARCHITECTURE.md`. Each effect respects reduced motion and adds no unplanned dependencies.
- **Done when:** all planned effects work, and each has a decision entry when it adds a dependency.

### 3.13 Scroll animations
- [ ] **Branch:** `feat/scroll-animations`
- **Scope:** section reveals, staggered groups, and the scroll-drawn career timeline (`scrub`), using `useGSAP` with a scope ref.
- **Done when:** the animations run at 60 fps on a mid-range phone and are reduced to simple fades or nothing with reduced motion.

### 3.14 Hero 3D scene
- [ ] **Branch:** `feat/hero-3d-scene`
- **Scope:**
  - The hero object from the chosen design. It is generic and procedural where possible, and any model is compressed and under 300 KB.
  - React Three Fiber canvas lazy-loaded after first paint.
  - Capped device pixel ratio and rendering paused off-screen.
  - Fallback for reduced motion, low-power devices and WebGL failure.
- **Done when:** the 3D chunk is loaded separately from the initial JS, and the fallback is shown in every case where the scene is unavailable.

### 3.15 Hero scroll exit
- [ ] **Branch:** `feat/hero-scroll-exit`
- **Scope:** the hero object animates out as the user scrolls past the hero, driven by ScrollTrigger.
- **Done when:** the exit is smooth, and it is disabled with reduced motion.

### 3.16 Performance and accessibility pass
- [ ] **Branch:** `perf/lighthouse-pass`
- **Scope:** bundle analysis, Lighthouse on mobile, and an accessibility audit (keyboard, screen reader, contrast). Fix any regressions found.
- **Done when:** Lighthouse mobile scores are Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 and SEO ≥ 95, and initial JS is ≤ 150 KB gzipped.

### 3.17 Final content
- [ ] **Branch:** `feat/final-content`
- **Scope:**
  - LinkedIn and Calendly URLs, the CV PDF and the optional photo (images in modern formats, with explicit sizes and lazy loading below the fold).
  - The final project list.
  - The final 1200×630 OG image.
- **Done when:** no `TODO` is left in the content layer.

### 3.18 README
- [ ] **Branch:** `docs/readme`
- **Scope:** the repository README covering the stack, how to run it, the architecture overview, how the hero works, performance decisions, AI usage (linking `docs/AI_USAGE.md`) and screenshots or a GIF.
- **Done when:** a tech lead can understand the project from the README alone.

---

## Open items for Rafał

These are needed by task 3.17 and can arrive at any time before it.

- [ ] LinkedIn profile URL
- [ ] Calendly link (free plan, 20–30 min intro call)
- [ ] Final CV PDF, named `Rafal_Ciecwierz_CV.pdf`
- [ ] Optional: a photo, if the chosen design uses one
- [ ] Final list of projects
