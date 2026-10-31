# Roadmap

The plan for building the portfolio, from documentation to a deployed site.
Each task is done on its own branch and merged into `main` before the next one starts.

- **Source of requirements:** [PROJECT_BRIEF.md](PROJECT_BRIEF.md). It is kept up to date with everything agreed so far.
- **Decisions made during the work** are recorded in [DECISIONS.md](DECISIONS.md).
- **Design-agnostic:** Phase 3 implements *the design chosen in Phase 2*. Wherever a task mentions "the chosen design", it refers to that prototype, whichever one it is.

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
- [x] **Branch:** `docs/project-roadmap`
- **Scope:** this roadmap, an empty decision log ([DECISIONS.md](DECISIONS.md)) with its template, and an updated brief reflecting everything agreed so far.
- **Done when:** Rafał has approved the roadmap and the updated brief.

### 1.2 AI tooling setup
- [x] **Branch:** `chore/ai-tooling-setup`
- **Scope:**
  - Research current Claude Code best practices, using [ashen-contracts](https://github.com/rafalciecwierz/ashen-contracts) as the minimum standard.
  - `CLAUDE.md`, kept short. Area rules go in `.claude/rules/` (to start with, `design-prototypes.md`).
  - `.claude/settings.json`: read-only git commands allowed, and commands that change git history or branches denied.
  - `.mcp.json`: Chrome DevTools MCP, pinned to a version.
  - Subagent `.claude/agents/site-auditor.md`.
  - Skills:
    - own: `roadmap-task`, `design-prototype`, `adr`,
    - pinned third-party: `grilling` and `grill-me` (mattpocock), `frontend-design` (Anthropic).
  - `docs/AI_USAGE.md`, `.gitignore`, and the decision log in the same format as ashen-contracts.
- **Done when:** every AI file has a clear purpose described in `docs/AI_USAGE.md`, and `site-auditor` has produced a real report on prototype 01.

---

## Phase 2 — Design exploration

Goal: eight design directions as HTML prototypes, each in a dark and a light variant, and one design chosen for implementation. The directions are:

- prototype 01, which already exists in its dark variant,
- six new directions, 02–07,
- one extra direction built around Rafał's interests, 08.

What every direction must feel like is in [design/DESIGN_PROFILE.md](design/DESIGN_PROFILE.md).

All prototypes use the content from the brief (section 5) and respect the technical constraints (performance, accessibility, static hosting). The visual direction can depart freely from brief section 7.

**One direction per Claude Code session.** Start a fresh session (or `/clear`) before each prototype task. The docs carry the context, and the sessions stay within usage limits.

### 2.1 Design research
- [x] **Branch:** `docs/design-research`
- **Scope:** research of current portfolio and web design trends. Output: `docs/design/RESEARCH.md` with:
  - a plain-language glossary of design styles and terms, each with a short description and reference links,
  - notable developer and studio portfolios worth learning from,
  - what each audience from the brief (recruiters, tech leads, creative studios) responds to.
- **Done when:** Rafał can name the styles that interest him using the glossary.

### 2.2 Design discovery session
- [x] **Branch:** `docs/design-discovery`
- **Scope:** a Q&A session about Rafał's personality, interests, taste and goals. Output: `docs/design/DESIGN_PROFILE.md`, a summary of what fits him and what to avoid.
- **Done when:** Rafał agrees the profile describes him.

### 2.3 Design directions
- [x] **Branch:** `docs/design-directions`
- **Scope:**
  - Written direction briefs in `docs/design/DIRECTIONS.md`: one for 01 (describing what exists), six for the new directions 02–07, and one for the interests direction 08.
  - Each brief covers:
    - the concept,
    - the dark and the light variant as two separate takes,
    - typography, colour, layout and motion,
    - the hero idea,
    - candidate effects (React Bits or other sources) and expected dependencies,
    - how it scores against the "how the site must feel" test in the design profile.
  - Move the existing prototype to `design/prototypes/01-<slug>-dark.html`.
- **Done when:** Rafał has approved every direction, and each is clearly different from the others.

### 2.4 Design prototypes
One task per direction. Each task builds both variants, `NN-<slug>-dark.html` and `NN-<slug>-light.html`. `<slug>` is the short name of the direction from task 2.3. Build them in this order:

- [x] **Branch:** `feat/design-prototype-01-light`: the light variant of prototype 01
- [x] **Branch:** `feat/design-prototype-02-swiss-signal` (dark variant) and `feat/design-prototype-02-swiss-signal-light` (light variant)
- [x] **Branch:** `feat/design-prototype-03-clay-studio` (both variants)
- [x] **Branch:** `feat/design-prototype-04-sticker-sheet` (both variants)
- [x] **Branch:** `feat/design-prototype-05-the-issue` (both variants)
- [x] **Branch:** `feat/design-prototype-06-ralph-os` (both variants)
- [x] **Branch:** `feat/design-prototype-07-field-notes` (both variants)
- [x] **Branch:** `feat/design-prototype-08-ascent` (both variants): the interests direction, built last

More directions may be added later as new items in this list.

- **Scope:** self-contained HTML files in `design/prototypes/`, built with the `design-prototype` skill so they can be converted into the React project. Each is responsive (360 px to 1920 px) and supports reduced motion. In prototypes, go all the way; trimming happens at selection.
- **Done when:** both variants match the direction brief and work on mobile and desktop (checked with screenshots at 360 and 1280 px). No `site-auditor` audit at this stage: prototypes are explorations, and only the chosen design is audited, from phase 3.

### 2.5 Design selection
- [x] **Branch:** `docs/design-selection`
- **Scope:**
  - `design/index.html`: a page that links and compares all prototypes.
  - A comparison of the prototypes covering:
    - the brief's success criteria (5-second clarity, mobile above the fold, performance risk, accessibility),
    - the design profile's "how the site must feel" test,
    - the implementation effort and cost of each prototype's effects.
  - The choice is recorded in [DECISIONS.md](DECISIONS.md). It says which variant ships (dark, light or both), and what the brief and roadmap need to change as a result.
- **Done when:** one design is chosen. Elements borrowed from other prototypes are listed explicitly.
- **Result:** prototype 08 Ascent, dark variant "Night Session", ships alone, with no elements borrowed so far ([DECISIONS.md](DECISIONS.md), #001). It is refined in iterations (2.7) before phase 3.

### 2.6 AI and process content
- [x] **Branch:** `docs/ai-process-content`
- **Scope:**
  - A Q&A session with Rafał about how he works with AI: what he uses it for at work, which tools, what he keeps for himself and how he checks the output. Rafał may answer in Polish; Claude writes it in English.
  - The story of how this site was made: the 16 prototypes, the process and Rafał's role in it. Every number (dates, durations, counts) comes from the git history or the repository, never from memory.
  - The result goes into the brief: the section in 4 and the content in 5.7.
- **Done when:** Rafał has approved the content in the brief, and every fact in it has a source.

### 2.7 Design iterations of the chosen design
One task per iteration. Each iteration is a new file, `design/iterations/08-ascent-dark-v<N>.html`, starting from the previous one (v2 starts from `design/prototypes/08-ascent-dark.html`). The 16 prototypes in `design/prototypes/` are never edited: they are the record of the exploration and the gallery.

- [x] **Branch:** `feat/design-iteration-08-v2`: approved by Rafał on 29.10.2026 as the reference for phase 3. Later fixes are not made in new iterations: they wait for the working site (task 3.19).

The task closed with v2; no further iterations are planned.

- **Scope:**
  - The fixes Rafał lists for each section, and a more professional finish overall.
  - The new AI and process section (content from 2.6, or `TODO` until it exists), and the link to the prototype gallery.
  - The known issues from task 2.5: layout shift (CLS 0.20), the brand link's accessible name, and the length of the pinned career scene on desktop.
  - `design/index.html` lists every iteration, and the direction's entry in `docs/design/DIRECTIONS.md` gets an "Iterations" block with what changed and why.
- **Done when:** Rafał approves an iteration as the reference for phase 3, and it meets the quality floor in `.claude/rules/design-prototypes.md` (checked with screenshots at 360 and 1280 px and with reduced motion).

---

## Phase 3 — Implementation and deployment

Goal: the chosen design rebuilt as a clean React + TypeScript project and deployed to GitHub Pages. "The chosen design" is prototype 08 Ascent dark, as in the latest iteration Rafał approved in 2.7.

The first part (3.1–3.10) produces a usable, deployed site without motion or the hero scene. Everything after that is enhancement.

### 3.1 Architecture requirements
- [x] **Branch:** `docs/architecture`
- **Scope:** `docs/ARCHITECTURE.md`, which contains:
  - Rafał's requirements for architecture and code quality. He may describe them in Polish in chat, and Claude writes them in English.
  - A component map of the chosen design: sections, shared UI, effects and the content they consume.
  - A dependency plan: for each effect, either an installed library or a port onto the existing stack, with the reason.
  - The pre-rendering tool (brief section 3, [DECISIONS.md](DECISIONS.md) #002): for example Vite with a pre-render step, or Astro with React islands for the interactive parts. Compare them on initial JS, effort and how well each fits GSAP, and record the choice in a decision entry.
- **Done when:** Rafał has approved the document. All later tasks follow it.

### 3.2 Project scaffold
- [x] **Branch:** `chore/project-scaffold`
- **Scope:**
  - Vite + React + TypeScript (strict) and SCSS Modules, with the pre-render step (`scripts/prerender.ts`, [DECISIONS.md](DECISIONS.md) #003).
  - ESLint and Prettier as one config for the whole project, following [ashen-contracts](https://github.com/rafalciecwierz/ashen-contracts), with the rules in `docs/ARCHITECTURE.md` section 15.
  - Vitest and React Testing Library.
  - Folder structure from `docs/ARCHITECTURE.md`.
  - Package scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test`, `format`, `format:check`.
  - commitlint with a local `commit-msg` hook, as in ashen-contracts.
  - AI tooling for code:
    - a `PostToolUse` hook that runs Prettier and `eslint --fix` on every file the agent edits,
    - the package scripts added to the allowed commands in `.claude/settings.json`,
    - `.claude/rules/` for `src/**` (component, content and style conventions from `docs/ARCHITECTURE.md`),
    - the `tdd` skill (mattpocock, pinned), and the commands in `CLAUDE.md`.
- **Done when:** a placeholder app runs locally, all scripts pass, and an agent edit is formatted automatically.

### 3.3 Continuous integration
- [x] **Branch:** `ci/quality-checks`
- **Scope:**
  - A GitHub Actions workflow that runs lint, format check, typecheck, test, build and commitlint on every pull request and every push to `main` (a push to a branch with an open pull request runs through the pull request), plus a check of the pull request title, which a squash merge puts on `main`.
  - Lighthouse CI on the built, pre-rendered pages in every pull request, failing below the scores in brief section 1, so a regression shows up before it is merged.
- **Done when:** the workflow passes on GitHub, and a pull request that drops a Lighthouse score below the threshold fails.

### 3.4 Content layer
- [x] **Branch:** `feat/content-layer`
- **Scope:**
  - Typed content files in `src/content/` with all data from brief section 5.
  - Every user-facing string is ready for a future `pl` locale.
  - Projects are modelled so that adding, removing or reordering one only touches the content file.
- **Done when:** the content is typed, covered by tests, and no copy is hard-coded in components.

### 3.5 Design tokens and global styles
- [x] **Branch:** `feat/design-tokens`
- **Scope:** colours, spacing, type scale, radii and motion durations from the chosen design as CSS custom properties; global styles; self-hosted fonts in `public/fonts/` (`font-display: swap`, preload of the display font, adjusted fallback metrics, no layout shift; `docs/ARCHITECTURE.md` section 8).
- **Done when:** the tokens match the chosen design, and nothing in the components uses a raw value that has a token.

### 3.6 UI primitives
- [x] **Branch:** `feat/ui-primitives`
- **Scope:** shared building blocks needed by the chosen design (for example Button, Tag, Badge, SectionHeading), with visible focus states, plus tests where they carry logic.
- **Done when:** all primitives used by more than one section exist in `src/components/`.

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
- **Scope:** hero text (it replaces the scaffold's temporary `src/components/placeholder/`), the Download CV and Get in touch actions, and the static hero scene (the lit rooftop sign and skyline in SVG, with the runner perched still), with its space reserved so nothing shifts.
- **Done when:** name, role and both actions are above the fold at 360 px and 1280 px, and the heading is the LCP element.

### 3.9 Content sections (static)
- [ ] **Branch:** `feat/content-sections`
- **Scope:** About, Stack (levels with a text label), Career (the plain list newest first, with promotions highlighted), testimonials, Projects (extensible list), the AI and process section and Contact (no phone number), all rendered from the content layer.
- **Done when:** every section from the chosen design is present and readable without JavaScript animations.

### 3.10 SEO and deployment
- [ ] **Branch:** `ci/github-pages-deploy`
- **Scope:**
  - Title, meta description, Open Graph and Twitter tags, placeholder OG image, favicon, theme colour and `lang`.
  - A GitHub Actions deploy to GitHub Pages using `actions/deploy-pages`, with Vite `base: '/'`: every merge into `main` builds the pre-rendered site and deploys it (brief section 10).
- **Done when:** the site is live at `https://rafalciecwierz.github.io`, a merge into `main` redeploys it, and the served HTML contains the page content and meta tags before any JavaScript runs. **Checkpoint:** the site is good enough to share.

### 3.11 Motion foundation
- [ ] **Branch:** `feat/motion-foundation`
- **Scope:**
  - `motion/gsap.ts`, which registers plugins once, and the `MotionLayer` that loads motion components lazily after hydration ([DECISIONS.md](DECISIONS.md) #005).
  - A `useReducedMotion` hook as the single source of truth.
  - Lenis synced with ScrollTrigger and disabled for reduced motion ([DECISIONS.md](DECISIONS.md) #004).
  - AI tooling: the official GSAP skills `gsap-react`, `gsap-scrolltrigger` and `gsap-performance` ([greensock/gsap-skills](https://github.com/greensock/gsap-skills), MIT), pinned with a `NOTICE.md` and limited with `paths` to files that use GSAP.
- **Done when:** GSAP, the motion layer and the reduced-motion hook work, covered by a test, and smooth scroll is off with reduced motion.

### 3.12 Interactive effects
- [ ] **Branch:** `feat/interactive-effects`
- **Scope:** the effects used by the chosen design (React Bits, GSAP plugins or other sources), either installed or ported as decided in `docs/ARCHITECTURE.md`. Each effect respects reduced motion and adds no unplanned dependencies.
- **Done when:** all planned effects work, and each has a decision entry when it adds a dependency.

### 3.13 Scroll animations
- [ ] **Branch:** `feat/scroll-animations`
- **Scope:** section reveals, staggered groups and the title entrances of the chosen design (the "vault and land" letters), using `useGSAP` with a scope ref.
- **Done when:** the animations run at 60 fps on a mid-range phone and are reduced to simple fades or nothing with reduced motion.

### 3.14 Hero scene
- [ ] **Branch:** `feat/hero-scene`
- **Scope:**
  - The animated hero of the chosen design: the rooftop sign flickering on, the generated skyline, and the SVG free-runner (a pose rig) hopping between letters and perching on the Ł.
  - Animation paused when the hero is off-screen or the tab is hidden.
  - With reduced motion: the sign lit and the runner perched still.
- **Done when:** the scene adds no dependency, is `aria-hidden`, causes no layout shift, and the hero heading stays the LCP element.

### 3.15 Career run
- [ ] **Branch:** `feat/career-run`
- **Scope:** the pinned scrollytelling career from the chosen design (ScrollTrigger `pin` and `scrub`): one building per company, a tower per promotion, the job card that follows the runner, and a way to skip the scene. Below the desktop breakpoint and with reduced motion, the plain list from 3.9 stays.
- **Done when:** the run is smooth on a mid-range phone profile, can be skipped with the keyboard, and is off with reduced motion.

### 3.16 Performance and accessibility pass
- [ ] **Branch:** `perf/lighthouse-pass`
- **Scope:** bundle analysis, Lighthouse on mobile, and an accessibility audit (keyboard, screen reader, contrast). Fix any regressions found.
- **Done when:** Lighthouse mobile scores are Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 and SEO ≥ 95, and initial JS is ≤ 150 KB gzipped.

### 3.17 Prototype gallery
- [ ] **Branch:** `feat/prototype-gallery`
- **Scope:** the 16 prototypes, the approved iterations and `design/index.html` published with the site (for example under `/design/`), and linked from the AI and process section. They stay static files outside the React bundle.
- **Done when:** the gallery opens from the live site, every link in it works, and the initial JS budget is unaffected.

### 3.18 Final content
- [ ] **Branch:** `feat/final-content`
- **Scope:**
  - LinkedIn and Calendly URLs, the CV PDF and the optional photo (images in modern formats, with explicit sizes and lazy loading below the fold).
  - The final project list.
  - The final 1200×630 OG image.
  - The final numbers in the AI and process story, taken from the git history.
- **Done when:** no `TODO` is left in the content layer.

### 3.19 Final polish
- [ ] **Branch:** `fix/final-polish`
- **Scope:** the small design and behaviour fixes Rafał lists after using the working site. They replace further design iterations (task 2.7 closed with v2). Rafał may make some of them himself.
- **Done when:** Rafał's list is done, and the Lighthouse thresholds from 3.16 still hold.

### 3.20 README
- [ ] **Branch:** `docs/readme`
- **Scope:** the repository README covering the stack, how to run it, the architecture overview, how the hero works, performance decisions, AI usage (linking `docs/AI_USAGE.md`) and screenshots or a GIF.
- **Done when:** a tech lead can understand the project from the README alone.

### 3.21 Polish version
- [ ] **Branch:** `feat/polish-locale`
- **Scope** (after v1 is live; the mechanism is [DECISIONS.md](DECISIONS.md) #007):
  - `src/content/pl/`: the whole `Content` in Polish, typed as `Content`, so a missing translation does not compile. Claude drafts the translation and Rafał approves it. Polish plurals use `Intl.PluralRules` (1 narzędzie, 2 narzędzia, 5 narzędzi).
  - Kept in English: the testimonials, which are quoted word for word (brief section 5.6), with the Polish page marking them as English (`lang="en"`); tool and company names; the prototype gallery and the docs.
  - A `/pl/` route, pre-rendered to `dist/pl/index.html`. The page gets its locale from the route, not from a fixed import of `en`.
  - The head for each language: `<html lang>`, title, description, Open Graph locale, and `hreflang` alternates (`en`, `pl`, `x-default`) on both pages.
  - A language switch: a plain link to the other path, with `hreflang` and an accessible name in the target language. Its place in the header is designed in this task, because the reference design has none.
  - No browser-language detection, no redirect, no cookie or `localStorage`.
  - `src/content/content.test.ts` runs every check on `pl` as well.
- **Done when:** `/` and `/pl/` are both served as complete pre-rendered HTML in their language, the switch works with the keyboard and without JavaScript, the build fails when a Polish string is missing, and the Lighthouse thresholds from 3.16 hold on both pages. Open item for Rafał: a Polish CV PDF, or the English one linked from both pages.

---

## Side quests (optional)

These are not needed for the site. Pick them up any time, or never.

- [ ] **Rafał's character from a real photo.** Turn Rafał's photo into a stylised 3D figure or an illustration, to replace the character built in code (see [design/DESIGN_PROFILE.md](design/DESIGN_PROFILE.md), section 6). Options found in October 2026 (check each licence before use; terms change often):
  - **Image to 3D:** [Tripo AI](https://www.tripo3d.ai) (its free tier is non-commercial and public), [Meshy](https://www.meshy.ai) (its free tier is CC BY 4.0, so it needs attribution), [Rodin](https://hyper3d.ai) (the most realistic, but heavy). The best workflow: stylise the photo into a "figurine" image first, then convert it to 3D, then decimate it in Blender and compress it with Draco to under 300 KB.
  - **Photo to illustration:** an AI tool such as [OpenArt](https://openart.ai/features/photo-to-avatar/) (fast, but at risk of the generic AI look), or a human illustrator found on Behance, Instagram or Fiverr (paid, and the most authentic).

---

## Open items for Rafał

These are needed by task 3.18 and can arrive at any time before it.

- [ ] LinkedIn profile URL
- [ ] Calendly link (free plan, 20–30 min intro call)
- [ ] Final CV PDF, named `Rafal_Ciecwierz_CV.pdf`
- [ ] Optional: a photo, if the chosen design uses one
- [ ] Final list of projects
- [ ] Consent from the testimonial authors (brief section 5.6), if the chosen design shows testimonials
