# Personal Portfolio — Rafał Ciećwierz

Project spec for building a personal portfolio site with Claude Code.
Read this whole file before writing any code.

---


## 0. Project plan — read this first

This brief was used to generate a first HTML prototype: `design/prototypes/01-fluid-glass-dark.html` (prototype 01). That prototype is one of several candidate designs, not the final one. The work is planned task by task in [ROADMAP.md](ROADMAP.md) and runs in three phases:

1. **Documentation and AI tooling.** Set up the project docs and a professional, minimal AI setup (see section 13).
2. **Design exploration.**
   - Research current design trends, with a plain-language glossary of design styles and terms.
   - Hold a discovery session about what fits Rafał. The result is [design/DESIGN_PROFILE.md](design/DESIGN_PROFILE.md).
   - Explore eight design directions as HTML prototypes:
     - prototype 01,
     - six new directions, each completely different,
     - one extra direction built around Rafał's interests.

     Every direction has a dark and a light variant: two independent designs that share only the style, with nothing else carried over. Directions may depart as far as needed from the visual direction in section 7.
   - Choose the best one, possibly borrowing elements from others. Every implementation task is design-agnostic and builds *the chosen design*. Whether the final site ships the dark variant, the light one or both is decided at that point.
3. **Implementation and deployment.**
   - Before any code, write `docs/ARCHITECTURE.md` with Rafał's requirements for architecture and code quality. Clean, well-structured components are a top priority.
   - Rebuild the chosen prototype as the React project described in this brief.
   - Deploy it to GitHub Pages with CI/CD.

Steps may be added between phases when needed (for example extra documentation).

**The chosen design (task 2.5):** prototype 08 Ascent, dark variant "Night Session" (`design/prototypes/08-ascent-dark.html`), shipped alone, with no light variant and no theme toggle ([DECISIONS.md](DECISIONS.md), #001). Before phase 3 it is refined in iterations saved as new files in `design/iterations/`; the latest one Rafał approves is the reference for phase 3. **Approved:** iteration v2 (`design/iterations/08-ascent-dark-v2.html`), 29.10.2026; later fixes wait for the working site (roadmap task 3.19). The 16 prototypes stay unedited and are published with the site as a gallery.

**Using a prototype as a reference:** the final site reproduces the chosen prototype's look and behaviour. Elements that only exist to present the prototype are not carried over (for example the "React Bits labels" toggle and its labels, hint texts such as the ClickSpark label, and "Prototype: …" toasts). Effects themselves, such as ClickSpark, stay.


## 1. Goal

A personal website that works as an interactive CV and a small showcase of frontend skill.

It has two jobs:

1. **Get Rafał hired.** A recruiter or tech lead must understand who he is within 5 seconds and be able to download the CV or get in touch in one click.
2. **Show craft.** The site itself proves the skills from the CV: React, TypeScript, animation (GSAP scrollytelling), graphics drawn in code (an SVG scene and character rig), performance and accessibility. It also shows, openly, how Rafał works with AI (sections 4.8 and 13).

The site will be linked from a LinkedIn post asking people to recommend Rafał at their companies, and from job applications (including creative studios that value motion and WebGL).

### Audience

- **Recruiters** (non-technical, often on a phone, 10–30 seconds of attention)
- **Tech leads / engineers** (will open DevTools, look at the repo, judge code quality and performance)
- **Creative studios** (will judge animation quality, detail and smoothness)

### Success criteria

- Name, role and the two primary actions (Download CV, Contact) are visible above the fold on mobile and desktop.
- Lighthouse on mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- The page is fully usable and readable with JavaScript animations disabled and with `prefers-reduced-motion: reduce`.
- Smooth (60 fps) scrolling on a mid-range phone.
- Rafał can update content (new job, new project) by editing one content file.

---

## 2. Constraints

- **Hosting:** GitHub Pages, repository `rafalciecwierz.github.io` (user site → served at the root, so Vite `base` is `/`).
- **Fully static.** No server, no backend, no environment secrets.
- **Free.** No paid services. Calendly free plan for scheduling.
- **Language:** English only for v1. Structure content so Polish can be added later without refactoring (see section 6).
- **Time box:** two weekends. Prefer finishing over perfecting. On the other hand the product needs to feel polished.

---

## 3. Tech stack

| Area | Choice | Notes |
| --- | --- | --- |
| Build | Vite + React + TypeScript (strict), pre-rendered | Every page is pre-rendered to static HTML at build time, not a client-only SPA ([DECISIONS.md](DECISIONS.md), #002). The tool is chosen in task 3.1 |
| Styling | SCSS + CSS Modules | Design tokens as CSS custom properties |
| 3D | none in v1 | The chosen design draws its scenes in SVG ([DECISIONS.md](DECISIONS.md), #001). three / React Three Fiber return only with a new decision |
| Animation | gsap + ScrollTrigger, @gsap/react (`useGSAP`) | Scroll-driven reveals, the pinned career run |
| Smooth scroll | lenis, only if task 3.1 keeps it | The chosen prototype was built without it; if kept, synced with ScrollTrigger and disabled for reduced motion |
| UI effects | Optional: [React Bits](https://reactbits.dev), GSAP plugins, other sources | Enhancers chosen per design, installed or ported onto the stack above (see below) |
| Lint/format | ESLint + Prettier | One config for the whole project, following [ashen-contracts](https://github.com/rafalciecwierz/ashen-contracts) |
| Tests | Vitest + React Testing Library | Light: content rendering, reduced-motion behavior |
| Deploy | GitHub Actions → GitHub Pages | `actions/deploy-pages` |

**Effects are enhancers, not the foundation.** React Bits is one good source, but it is optional. A design may use many of its components, just one, or none, and may take effects from elsewhere when they fit the style better. Since 2025 all GSAP plugins (SplitText, DrawSVG, MorphSVG, Physics2D, Inertia, ScrollSmoother and others) are free, so many effects need no extra dependency.

**Keep dependencies minimal**, because the site must stay fast and responsive. Some effect components depend on extra libraries (for example `motion`, or GSAP's InertiaPlugin) that overlap with the stack above. For each such component, weigh adding the library against porting the effect onto GSAP, Three.js / React Three Fiber or CSS. Add a library only when porting would cost far more than it is worth. Ask Rafał before adding any new dependency.

---

## 4. Page structure

Single page with anchor navigation. Sections in order:

### 4.1 Header / navigation
- Fixed, minimal: name/monogram on the left, anchor links (About, Stack, Career, Projects, Process, Contact) on the right. The monogram's accessible name starts with its visible text (WCAG 2.5.3).
- Mobile: collapsible menu, keyboard accessible, focus trapped while open.
- Smooth scroll to sections (Lenis if task 3.1 keeps it, otherwise CSS `scroll-behavior`); a native anchor jump with reduced motion.

### 4.2 Hero
- **Content (must render immediately, before any effect):**
  - Name: Rafał Ciećwierz
  - Role: Frontend Engineer
  - Tagline: React & TypeScript · 5+ years building production apps
  - Primary button: **Download CV** (`/Rafal_Ciecwierz_CV.pdf`)
  - Secondary button: **Get in touch** (scrolls to Contact)
- **Hero scene (the "flashy" part), from the chosen design:**
  - The name is a floodlit rooftop sign over a generated night skyline, drawn in SVG. It flickers on letter by letter.
  - A free-runner (an SVG pose rig built in code, no image files) hops along the letters and perches on the Ł; clicking a letter sends him there; each click on him plays the next trick (backflip, kong vault, front flip, handstand).
  - The role flips once, like a split-flap board, through Rafał's other titles (section 5.1, `roleFlips`) and lands back on "Frontend Engineer". Screen readers get only the role; with reduced motion it does not flip.
  - The scene is decoration: `aria-hidden="true"`, and the hero meaning is fully conveyed by the text. The heading is the LCP element.
  - Its space is reserved, so nothing shifts when it draws. Animation pauses when the hero is off-screen or the tab is hidden.
  - **Reduced motion:** the sign is lit and the runner perches still.
  - The exact form follows the latest approved iteration (roadmap task 2.7).

### 4.3 About
Short, human, first person. Draft (Rafał may edit):

> I'm a frontend engineer with 5+ years of commercial experience in React and TypeScript. I started my career in QA automation, moved into frontend development after three months at my team's request, and later led a team of six developers.
>
> I care about clean architecture, reusable UI and tests that actually protect the product. Lately I've been going deeper into the backend with NestJS and experimenting with motion and 3D in the browser.
>
> Outside of code: parkour (for over 22 years) and climbing.

### 4.4 Stack
Grouped technologies with three experience levels (same legend as the CV):
- `strong` — strong production experience
- `medium` — medium production experience
- `low` — low production experience

Show levels with something more visual than coloured dots (e.g. a subtle fill, ring or label), but always include a text label for accessibility. Animate groups in on scroll (stagger).

Data is in section 5.

### 4.5 Career
- The baseline is a vertical list, newest first. It is what phones, reduced motion and no-JavaScript visitors get.
- Each entry: company, role (show promotions with "→"), dates, 2–4 bullet points, stack tags.
- On desktop, the chosen design adds a pinned scene (GSAP ScrollTrigger `pin` + `scrub`): scrolling runs a parkour line from roof to roof, one building per company, a tower per promotion. It can be skipped with a link and the navigation.
- Promotions (QA → Developer at mTab, Developer → Team Leader at Mood up) get a visual highlight.

### 4.6 Testimonials
Up to three quotes from Rafał's team at Mood up (section 5.6), after Career. In the chosen design: "Spotters", each quote a poster wheat-pasted on the wall.

### 4.7 Projects
Cards with: name, one-line description, status badge (`live`, `in progress`, `archived`), tech tags, links (repo / demo when available).

The project list will change and grow over time, and the current entries are placeholders. The section must handle any number of projects, and adding, removing or reordering a project must only require editing the content file.

In the chosen design each project is a pin on a night map ("Spots"); a pin or the card's "Spot details" button opens a detail panel (a native `<dialog>`) with the full description, the stack and fields still to be written (screenshot, role, what was learned).

### 4.8 AI and process
A short section after Projects, not a wall of text. Its one job is to show that Rafał uses AI tools to their full extent (docs-first specs, skills, MCP servers, subagents, hooks, guardrails) and stays in charge of the work. It is based on two public repositories, this one and Ashen Contracts, and links to both, to `docs/AI_USAGE.md` and to the prototype gallery. Honest and factual, not a claim of expertise. Content is in section 5.7; its form is designed in roadmap task 2.7.

### 4.9 Contact
- Short line: "Open to frontend roles (React / TypeScript), remote or hybrid."
- Email (`mailto:`) with a Copy button, LinkedIn, GitHub, Calendly ("Book a 20-min call"). The address is joined from parts at runtime, so it is not in the HTML source for the simplest scrapers; a contact form was rejected because the site is fully static (section 2) and form services add third parties.
- Repeat the **Download CV** button.
- Do **not** publish the phone number on the site (spam risk). It is in the CV PDF.

### 4.10 Footer
- "Built with React, TypeScript and GSAP" + link to the site's own repo.
- Year.

---

## 5. Content

All content lives in typed files in `src/content/` (see section 6). Use exactly this content for v1.

### 5.1 Profile

```ts
name: "Rafał Ciećwierz"
role: "Frontend Engineer"
roleFlips: ["Parkour Old Veteran", "Climbing Enjoyer", "Fullstack Engineer wannabe"]  // Rafał's words, 27.10.2026; shown in the hero before the role
tagline: "React & TypeScript · 5+ years building production apps"
email: "rafal.ciecwierz4@gmail.com"
github: "https://github.com/rafalciecwierz"
linkedin: "TODO: Rafał to provide URL"
calendly: "TODO: Rafał to provide URL"
cvFile: "/Rafal_Ciecwierz_CV.pdf"
availability: "Open to frontend roles (React / TypeScript), remote or hybrid."
```

### 5.2 Stack

```ts
Frontend:
  React (strong), TypeScript (strong), JavaScript (strong), HTML5 (strong),
  CSS / SCSS / Styled-components (strong), Next.js (medium), Gatsby (medium),
  Module Federation (medium), React Native (low)

Data & UI:
  TanStack Query (strong), Redux (strong), Zod (strong), React Hook Form (strong),
  Storybook (strong), Ant Design (strong), Material UI (strong),
  Tailwind CSS (medium), WebSockets (medium)

Testing:
  Jest / Vitest (strong), React Testing Library (strong), Cypress (strong)

Backend:
  Node.js (medium), NestJS (medium), PostgreSQL (medium), Strapi (medium)

Tooling:
  Git (strong), Figma (strong), Postman (strong), Vite (strong), Webpack (strong),
  Docker (medium)

AI:  // Rafał, 28.10.2026; each backed by this repo or ashen-contracts
  Claude Code (medium), Agent skills (medium), Subagents (medium), MCP servers (medium),
  Claude Code hooks (medium), AI code review in CI (medium), Context engineering (medium),
  Spec-driven development (medium), Agent guardrails (medium)
```

### 5.3 Career

**MUG Software** — Front-end Software Engineer — 04.2025 – 08.2026
- Maintained and extended a white-label React platform: a core repository with client-specific forks, propagating global changes upstream-to-fork while keeping client customizations isolated.
- Developed and maintained a shared Storybook component library (50+ components), improving UI consistency and speeding up feature development.
- Introduced TanStack Query (replacing Redux for server state) and Zod (replacing Yup), adopting them incrementally across the app as part of ongoing feature work.
- Stack: React, TypeScript, Styled Components, Jest, Redux, Storybook, Webpack, TanStack Query, Zod

**VML Enterprise Solutions** — Front-end Software Engineer — 09.2024 – 04.2025
- Owned a reference-data micro-frontend (countries, currencies and other company-wide dictionaries) integrated into a large enterprise advertising platform via Webpack Module Federation.
- Maintained and developed the module's codebase, increasing unit test coverage from 11% to over 80%.
- Took part in the migration of a subdomain to a standalone microservice.
- Stack: React, TypeScript, SCSS, Jest, React Hook Form, Webpack, Vite, Module Federation

**Mood up** — React Developer → Front-end Team Leader — 10.2022 – 08.2024
- Built the React/Redux interface for a smart intercom running on an embedded Raspberry Pi device.
- Promoted to Front-end Team Leader; led a team of 6 developers delivering MVPs for international startup clients.
- Delivered projects from requirements gathering and estimation with clients through development, testing (Jest) and deployment.
- Led a headless CMS evaluation (Strapi, Sanity, Contentful, headless WordPress and others), narrowing the shortlist to Strapi and Payload CMS for the company's stack.
- Stack: React, Gatsby, Next.js, React Native, TypeScript, SCSS, Strapi, Material UI, Ant Design, Webpack, Vite, Figma

**mTab sp. z o.o.** — QA Automation Engineer → JavaScript Developer — 07.2021 – 09.2022
- Promoted from QA Automation Engineer (Cypress E2E) to front-end developer after 3 months at the product team's request.
- Developed views and features in React for a data visualization platform with dynamic, reactive charts and presentation-style reports.
- Built Node.js scripts run nightly by Jenkins that aggregated test results into reports and posted them to Slack.
- Maintained and extended a legacy Backbone.js codebase.
- Stack: React, JavaScript, TypeScript, Redux, SCSS, Jest, Cypress, Node.js, Backbone.js

### 5.4 Education

**Adam Mickiewicz University** — Engineer's degree in Computer Science — 2015 – 2021

### 5.5 Projects

**Ashen Contracts** — `in progress`
- Browser-based idle/RPG game built as a full-stack showcase: pnpm monorepo with a Next.js app, NestJS API, shared Storybook UI library and shared TypeScript types. Architecture decisions documented in an ADR-style log.
- Tags: Next.js, NestJS, PostgreSQL, Prisma, Storybook, Docker, GitHub Actions
- Repo: https://github.com/rafalciecwierz/ashen-contracts

**Ultimate Frisbee Tournament Platform** — `archived` — Engineering thesis (team of 4), built for the Polish Ultimate Players Association
- Owned the entire NestJS + PostgreSQL backend, built live match scoring with Socket.io (scorekeeper tablet view + real-time spectator view), designed the full UI in Figma, deployed to AWS and tested at a live tournament in Szczecin.
- Tags: NestJS, PostgreSQL, Socket.io, Swagger, AWS, Nuxt, Figma

**This website** — `live`
- Personal site with a hero scene and character drawn in code (SVG) and scroll-driven storytelling (GSAP), built with a performance and accessibility budget.
- Tags: React, TypeScript, GSAP, Vite
- Repo: https://github.com/rafalciecwierz/rafalciecwierz.github.io

**Next.js page transitions** — `archived` (placeholder; may be replaced when the final project list is known)
- Comparison of three page-transition approaches in Next.js: custom implementation, Framer Motion and GSAP.
- Repo: https://github.com/rafalciecwierz/Nextjs-page-transition

### 5.6 Testimonials

From LinkedIn recommendations written by Rafał's team at Mood up (June 2024). Quote them word for word. Shorten them only with "…", and never reword them. Show each author as first name, surname initial and role, with "Mood up, 2024".

**Status:** the authors must agree before the final site is published. This is an open item for Rafał.

- **Wiktoria W.**, Marketing & Communication (another team): "Seriously, I've never met a leader as tuned in and supportive as him." / "Whoever snags him next is super lucky - yeah, I'm a bit envious. 😉"
- **Rafał H.**, Frontend Developer (on Rafał's team): "His enthusiasm and optimism were contagious, making him a joy to work with."
- **Szymon K.**, Frontend Developer (on Rafał's team): "His technical skills and ability to simplify complex concepts, guiding others through challenges, have been invaluable in enhancing the overall quality and efficiency of our development processes."

### 5.7 AI and process

For the section in 4.8. Written in roadmap task 2.6 from Rafał's answers and the two repositories. Keep it short on the site: the headline, the short text and the links; the lists below are the facts it may draw on, not copy to show in full.

**Headline idea (Rafał's, for task 2.7):** one page, built from ~~1~~ 16 designs, with the "1" crossed out.

**Short text (first person):**

> I work docs-first: requirements, a roadmap and decisions are written down before any code, so the AI agent builds from a spec, not from a guess. I set the frame, the direction and the rules; the agent works inside them; I verify the result and commit it myself. This site and Ashen Contracts are both built this way with Claude Code, and the whole setup is public in their repositories.

**How Rafał works with AI** (his answers in task 2.6):

- Principle: good documentation before any implementation.
- His role: he comes up with the idea, designs the workflow and the project's rules, sets the frame and the direction, and verifies the work.
- What he keeps for himself: git operations on the repository (commits, pushes, merges) and access to confidential data.
- How he checks the output: diff review, manual testing, unit and integration tests passing, sometimes e2e tests.
- What he watches for: inconsistency and hallucinations.
- At work: GitHub Copilot at VML Enterprise Solutions, where it helped with unit tests. At his other employers he worked without AI tools; at the earlier ones they were not allowed.

**The setup, in the repositories** (source: the files named):

- This site: `CLAUDE.md`, area rules in `.claude/rules/`, six skills (three own: `roadmap-task`, `design-prototype`, `adr`; three pinned third-party copies), a read-only `site-auditor` subagent, Chrome DevTools MCP for screenshots, Lighthouse and performance traces, and git commands that change history denied in `.claude/settings.json`. Described in `docs/AI_USAGE.md`.
- [Ashen Contracts](https://github.com/rafalciecwierz/ashen-contracts): `CLAUDE.md`, eight skills (four own: `implement-feature`, `refactor-task`, `adr`, `release`; four pinned copies from mattpocock/skills, among them `tdd` and `diagnosing-bugs`), a hook that formats every file the agent edits (`.claude/hooks/formatEditedFile.mjs`), Next.js DevTools and Playwright MCP servers (`.mcp.json`), reading `.env` files denied, an AI review on pull requests that only comments (`.github/workflows/claude-review.yml`), one spec per feature in `docs/features/` and 23 decisions in `docs/DECISIONS.md`.

**How this site was made** (source: git history of `main`):

- 23.10.2026: the brief, the roadmap and the first prototype, generated with Claude Code from the brief (`c19037b`; today's 01 Fluid Glass dark).
- 24.10.2026: the AI setup (`be820c3`), then design research (`910fa04`), a discovery session about Rafał (`04f5da9`) and eight design directions (`10f6983`).
- 24.10–26.10.2026: the other 15 prototypes, from 01 light (`6832f5a`) to 08 Ascent (`01d6321`). 16 in total, 8 directions × dark and light, 17,572 lines of HTML.
- 26.10.2026: all 16 compared and measured, 08 Ascent dark chosen (`d1072b4`, `docs/DECISIONS.md` #001).
- Rafał's role: he set the requirements in the brief, answered the discovery session, approved the directions, judged every prototype and chose the design. Every change reached `main` through a pull request he merged (15 by 26.10.2026).
- Do not state working hours: commit times show when something was made, not how long it took.

**Links:** the prototype gallery (`design/index.html`), `docs/AI_USAGE.md`, this repository and Ashen Contracts.

---

## 6. Architecture

```
public/
  Rafal_Ciecwierz_CV.pdf
  og-image.png
  favicon.svg
src/
  content/
    profile.ts
    stack.ts
    career.ts
    projects.ts
    types.ts            # shared content types
  components/
    Header/
    Hero/
      Hero.tsx
      HeroScene.tsx     # the SVG rooftop sign and skyline
      Runner.tsx        # the SVG free-runner rig
    About/
    Stack/
    Career/
    Testimonials/
    Projects/
    AiProcess/
    Contact/
    Footer/
    ui/                 # Button, Tag, Badge, SectionHeading
  hooks/
    useReducedMotion.ts
    useLenis.ts         # only if task 3.1 keeps Lenis
  animation/
    gsap.ts             # register plugins once
  styles/
    tokens.scss         # colors, spacing, type scale as CSS custom properties
    global.scss
  App.tsx
  main.tsx
.github/workflows/deploy.yml
```

Rules:
- Effects come from the chosen design: [React Bits](https://reactbits.dev/get-started/index) components, GSAP plugins or other sources, used only where they fit (section 3).
- Content files export typed data only; components never hard-code copy.
- Every user-facing string goes through the content layer so a `pl` variant can be added later (e.g. `{ en: string; pl?: string }` or a locale map).
- All GSAP code uses `useGSAP` with a scope ref so animations clean up on unmount.
- Register GSAP plugins once in `animation/gsap.ts`.
- One `useReducedMotion` hook is the single source of truth; GSAP, the hero scene and smooth scroll (if kept) all respect it.
- This tree is a starting point; `docs/ARCHITECTURE.md` (task 3.1) sets the final structure for the chosen design.

---

## 7. Design direction

The chosen direction is 08 Ascent, dark variant "Night Session": a parkour night session on rooftops lit by sodium street lamps. Its palette, type, layout and effects are in the "As built" block and the iterations in [design/DIRECTIONS.md](design/DIRECTIONS.md), and the latest approved iteration is the visual reference. What the site must feel like is in [design/DESIGN_PROFILE.md](design/DESIGN_PROFILE.md). The technical requirements in sections 2, 3, 6, 8 and 9 apply.

- **Typography:** one display font for headings, one clean sans for body (Google Fonts, `font-display: swap`, preload the display font). In the prototype: Big Shoulders Display + Barlow.
- **Motion:** fewer, better animations. Ease-out reveals, nothing that blocks reading. No animation longer than ~1 s except the scroll-scrubbed career run.
- **Responsive:** mobile first. Test at 360 px, 768 px, 1280 px, 1920 px.
- **Character:** the SVG free-runner is the character, in the hero and wherever the design uses him. There is no photo in the hero; a photo of Rafał may appear in About (optional, brief section 14).

---

## 8. Performance & accessibility budget

- Initial JS: ≤ 150 KB gzipped.
- Pre-rendered HTML: the content, headings and meta tags are in the HTML the server sends, so the page is readable, indexable and previewable before any JavaScript runs ([DECISIONS.md](DECISIONS.md), #002). JavaScript adds the motion on top.
- LCP element is the hero heading text.
- No layout shift from fonts or the hero scene (reserve space). The prototype measured CLS 0.20; iteration v2 brought it to 0.01 on mobile with container query units for the name.
- Images: modern formats (AVIF/WebP), explicit width/height, lazy below the fold.
- Semantic HTML: `header`, `nav`, `main`, `section` with headings, `footer`.
- Visible focus styles, skip-to-content link, contrast AA minimum.
- Decorative SVG scenes have `aria-hidden="true"`; the hero meaning is fully conveyed by text.
- `prefers-reduced-motion: reduce` → no smooth scroll, no pinned or scroll-scrubbed motion (the career is the plain list), a static hero, simple fades at most.

---

## 9. SEO & sharing

- `<title>`: "Rafał Ciećwierz — Frontend Engineer (React & TypeScript)"
- Meta description from the tagline + availability line.
- Open Graph + Twitter card with a 1200×630 `og-image.png` (important: this is what shows on LinkedIn).
- `lang="en"`, favicon, theme colour.
- All of the above is in the pre-rendered HTML, because LinkedIn and other link previews do not run JavaScript (section 8).

---

## 10. Deployment

- Repository: `rafalciecwierz.github.io`, default branch `main`.
- In repo settings → Pages → Source: **GitHub Actions**.
- Workflow `.github/workflows/deploy.yml`: on push to `main` (every merge) → install → lint → test → build with pre-rendering → upload `dist` → deploy with `actions/deploy-pages`.
- Pull requests run the quality checks and Lighthouse CI against the thresholds in section 1 (roadmap task 3.3).
- Vite `base: '/'`.

---

## 11. Milestones

Milestones are planned as tasks in [ROADMAP.md](ROADMAP.md), grouped into the three phases from section 0.

Within phase 3, the order follows the original plan. First comes a usable site without motion: scaffold, content, tokens, static sections, accessibility, SEO and deploy. **Checkpoint:** the site is good enough to share. After that come the enhancements: motion, effects, the hero scene, the career run, a performance pass, the prototype gallery, final content, a final polish from Rafał's notes on the working site, and the README.

---

## 12. Working agreement for Claude Code

- **One task at a time.** Work on one roadmap task at a time, each on its own branch. After each task, stop and summarise what changed and what to check in the browser.
- **Git is Rafał's.** Claude proposes branch names (conventional prefixes: `feat/`, `fix/`, `docs/`, `chore/`, `ci/`, `perf/`, `refactor/`) and they are listed in the roadmap. Rafał creates the branches, commits, pushes and merges into `main`. Claude never commits, pushes or merges.
- **Commit messages.** At the end of each task, Claude proposes small, focused commit message(s) following Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:` …), together with the files that belong to each.
- **Language.** Everything in the repository (code, comments, docs, commit messages) is in English. Conversation with Rafał may be in Polish.
- **Explain non-obvious code.** Rafał must be able to explain every part of this site in a job interview without AI. When writing GSAP, SVG animation or performance-related code, add a short explanation in the chat of *what* it does and *why* this approach was chosen. In that way he can challenge and correct your decisions. Record significant decisions in `docs/DECISIONS.md` (one short entry per decision: context, decision, alternatives considered).
- **Readable over clever.** Prefer readable code over clever code. Architecture and clean code follow `docs/ARCHITECTURE.md` once it exists.
- **No invented content.** If something is missing (LinkedIn URL, Calendly URL, photo), leave a clearly marked `TODO` and list it at the end of the task summary.
- **No tracking.** Do not add analytics, cookies or trackers.

---

## 13. AI tooling

The AI setup used to build the site (`CLAUDE.md`, `.claude/`) is **kept in the repository and described openly** in `docs/AI_USAGE.md`. AI-assisted development is part of Rafał's skill set (Claude Code is on his stack list), and hiding it would risk looking dishonest.

Because tech leads will read it, the setup must be professional:
- Keep it minimal. Every file has a clear, documented purpose, and nothing is experimental or left unused.
- Follow current Claude Code best practices, researched before setup.
- Keep `CLAUDE.md` short. It points to the docs instead of duplicating them.
- Commit shared settings. Personal settings stay git-ignored.
- `docs/AI_USAGE.md` explains what AI did, what Rafał owns and how the output was verified.

---

## 14. Open items for Rafał

These are provided near the end of the project. Until then, use `TODO` placeholders.

- [ ] LinkedIn profile URL
- [ ] Calendly link (free plan, 20–30 min "Intro call" event)
- [ ] Final CV PDF exported as `Rafal_Ciecwierz_CV.pdf`
- [ ] Final list of projects
- [ ] Optional: photo, if the chosen design has a good place for it
- [ ] Consent from the three testimonial authors (section 5.6); the chosen design shows testimonials
- [x] How Rafał works with AI, for the AI and process section (section 5.7, roadmap task 2.6)
