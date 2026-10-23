# Personal Portfolio — Rafał Ciećwierz

Project spec for building a personal portfolio site with Claude Code.
Read this whole file before writing any code.

---


## 0. Project plan — read this first

This brief was used to generate a first HTML prototype: `design/Rafał Ciećwierz Portfolio.html` (prototype 01). That prototype is one of six candidate designs, not the final one. The work is planned task by task in [ROADMAP.md](ROADMAP.md) and runs in three phases:

1. **Documentation and AI tooling.** Set up the project docs and a professional, minimal AI setup (see section 13).
2. **Design exploration.**
   - Research current design trends, with a plain-language glossary of design styles and terms.
   - Hold a discovery session about what fits Rafał.
   - Create five new HTML prototypes, each in a completely different direction. They may depart as far as needed from the visual direction in section 7.
   - Choose the best of the six. Every implementation task is design-agnostic and builds *the chosen design*.
3. **Implementation and deployment.**
   - Before any code, write `docs/ARCHITECTURE.md` with Rafał's requirements for architecture and code quality. Clean, well-structured components are a top priority.
   - Rebuild the chosen prototype as the React project described in this brief.
   - Deploy it to GitHub Pages with CI/CD.

Steps may be added between phases when needed (for example extra documentation).

**Using a prototype as a reference:** the final site reproduces the chosen prototype's look and behaviour. Elements that only exist to present the prototype are not carried over (for example the "React Bits labels" toggle and its labels, hint texts such as the ClickSpark label, and "Prototype: …" toasts). Effects themselves, such as ClickSpark, stay.


## 1. Goal

A personal website that works as an interactive CV and a small showcase of frontend skill.

It has two jobs:

1. **Get Rafał hired.** A recruiter or tech lead must understand who he is within 5 seconds and be able to download the CV or get in touch in one click.
2. **Show craft.** The site itself proves the skills from the CV: React, TypeScript, animation (GSAP), 3D in the browser (Three.js / React Three Fiber), performance and accessibility.

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
| Build | Vite + React + TypeScript (strict) | Static output, fast dev server |
| Styling | SCSS + CSS Modules | Design tokens as CSS custom properties |
| 3D | three, @react-three/fiber, @react-three/drei | Hero scene only, lazy-loaded |
| Animation | gsap + ScrollTrigger, @gsap/react (`useGSAP`) | Scroll-driven reveals, timeline |
| Smooth scroll | lenis | Synced with ScrollTrigger; disabled for reduced motion |
| UI effects | [React Bits](https://reactbits.dev) | Installed or ported onto the stack above (see below) |
| Lint/format | ESLint + Prettier | One config for the whole project, following [ashen-contracts](https://github.com/rafalciecwierz/ashen-contracts) |
| Tests | Vitest + React Testing Library | Light: content rendering, reduced-motion behavior |
| Deploy | GitHub Actions → GitHub Pages | `actions/deploy-pages` |

**Keep dependencies minimal**, because the site must stay fast and responsive. Some React Bits components depend on extra libraries (for example `motion`, or GSAP's InertiaPlugin) that overlap with the stack above. For each such component, weigh adding the library against porting the effect onto GSAP, Three.js / React Three Fiber or CSS. Add a library only when porting would cost far more than it is worth. Ask Rafał before adding any new dependency.

---

## 4. Page structure

Single page with anchor navigation. Sections in order:

### 4.1 Header / navigation
- Fixed, minimal: name/monogram on the left, anchor links (About, Stack, Career, Projects, Contact) on the right.
- Mobile: collapsible menu, keyboard accessible, focus trapped while open.
- Smooth scroll to sections via Lenis (native anchor jump when reduced motion).

### 4.2 Hero
- **Content (must render immediately, before any 3D):**
  - Name: Rafał Ciećwierz
  - Role: Frontend Engineer
  - Tagline: React & TypeScript · 5+ years building production apps
  - Primary button: **Download CV** (`/Rafal_Ciecwierz_CV.pdf`)
  - Secondary button: **Get in touch** (scrolls to Contact)
- **3D scene (the "flashy" part):**
  - The hero object comes from the chosen design. It must be **generic, not tied to a single project or hobby**. (The frisbee disc from an earlier draft was dropped: Rafał's only link to frisbee is one project.) A good candidate is prototype 01's fluid-glass lens over the "RC" monogram (React Bits `FluidGlass`).
  - Prefer procedural geometry so no external model file is needed. If a GLB is used, compress it with Draco and keep it under 300 KB.
  - Scroll interaction: as the user scrolls out of the hero, the object animates away (GSAP ScrollTrigger driving the object's transform), unless the chosen design specifies otherwise.
  - Lazy-load the canvas with `React.lazy` + `Suspense`; the text must be the LCP element, not the canvas.
  - Cap device pixel ratio (`dpr={[1, 1.75]}`), pause rendering when the hero is off-screen (`frameloop="demand"` or visibility check).
  - **Fallback:** for `prefers-reduced-motion`, low-power devices or WebGL failure, show a static, well-designed image/gradient instead of the canvas.

### 4.3 About
Short, human, first person. Draft (Rafał may edit):

> I'm a frontend engineer with 5+ years of commercial experience in React and TypeScript. I started my career in QA automation, moved into frontend development after three months at my team's request, and later led a team of six developers.
>
> I care about clean architecture, reusable UI and tests that actually protect the product. Lately I've been going deeper into the backend with NestJS and experimenting with motion and 3D in the browser.
>
> Outside of code: parkour and bass guitar.

### 4.4 Stack
Grouped technologies with three experience levels (same legend as the CV):
- `strong` — strong production experience
- `medium` — medium production experience
- `low` — low production experience

Show levels with something more visual than coloured dots (e.g. a subtle fill, ring or label), but always include a text label for accessibility. Animate groups in on scroll (stagger).

Data is in section 5.

### 4.5 Career
- Vertical timeline, newest first.
- Each entry: company, role (show promotions with "→"), dates, 2–4 bullet points, stack tags.
- Scroll animation: the timeline line "draws" as the user scrolls, entries reveal one by one (GSAP ScrollTrigger, `scrub` for the line).
- Promotions (QA → Developer at mTab, Developer → Team Leader at Mood up) get a small visual highlight.

### 4.6 Projects
Cards with: name, one-line description, status badge (`live`, `in progress`, `archived`), tech tags, links (repo / demo when available).

The project list will change and grow over time, and the current entries are placeholders. The section must handle any number of projects, and adding, removing or reordering a project must only require editing the content file.

### 4.7 Contact
- Short line: "Open to frontend roles (React / TypeScript), remote or hybrid."
- Email (`mailto:`), LinkedIn, GitHub, Calendly ("Book a 20-min call").
- Repeat the **Download CV** button.
- Do **not** publish the phone number on the site (spam risk). It is in the CV PDF.

### 4.8 Footer
- "Built with React, Three.js and GSAP" + link to the site's own repo.
- Year.

---

## 5. Content

All content lives in typed files in `src/content/` (see section 6). Use exactly this content for v1.

### 5.1 Profile

```ts
name: "Rafał Ciećwierz"
role: "Frontend Engineer"
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
  Docker (medium), Claude Code (medium)
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
- Personal site with a procedural 3D hero (React Three Fiber) and scroll-driven animations (GSAP, Lenis), built with a performance and accessibility budget.
- Tags: React, TypeScript, Three.js, GSAP, Vite
- Repo: https://github.com/rafalciecwierz/rafalciecwierz.github.io

**Next.js page transitions** — `archived` (placeholder; may be replaced when the final project list is known)
- Comparison of three page-transition approaches in Next.js: custom implementation, Framer Motion and GSAP.
- Repo: https://github.com/rafalciecwierz/Nextjs-page-transition

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
      HeroScene.tsx     # lazy-loaded R3F canvas
      HeroObject.tsx    # the 3D object from the chosen design
      HeroFallback.tsx
    About/
    Stack/
    Career/
    Projects/
    Contact/
    Footer/
    ui/                 # Button, Tag, Badge, SectionHeading
  hooks/
    useReducedMotion.ts
    useLenis.ts
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
- Use components from https://reactbits.dev/get-started/index to build the site
- Content files export typed data only; components never hard-code copy.
- Every user-facing string goes through the content layer so a `pl` variant can be added later (e.g. `{ en: string; pl?: string }` or a locale map).
- All GSAP code uses `useGSAP` with a scope ref so animations clean up on unmount.
- Register GSAP plugins once in `animation/gsap.ts`.
- One `useReducedMotion` hook is the single source of truth; GSAP, Lenis and the 3D scene all respect it.

---

## 7. Design direction

This is the direction prototype 01 was built from. The five new prototypes (phase 2) may depart from it completely. The technical requirements in sections 2, 3, 6, 8 and 9 still apply to every design.

- **Mood:** dark, premium, calm. Lots of space, sharp typography, one strong accent colour (a vivid green to echo the CV accent).
- **Typography:** one display font for headings, one clean sans for body (Google Fonts, `font-display: swap`, preload the display font).
- **Motion:** fewer, better animations. Ease-out reveals, nothing that blocks reading. No animation longer than ~1 s except the scroll-scrubbed timeline line and hero exit.
- **Responsive:** mobile first. Test at 360 px, 768 px, 1280 px, 1920 px.
- Use a photo of Rafał only in About (optional), not in the hero. Use some mocked face which can be swiped with Rafał's face later.

---

## 8. Performance & accessibility budget

- Initial JS (without the 3D chunk): ≤ 150 KB gzipped. The three/R3F chunk loads after first paint.
- LCP element is the hero heading text.
- No layout shift from fonts or the canvas (reserve space).
- Images: modern formats (AVIF/WebP), explicit width/height, lazy below the fold.
- Semantic HTML: `header`, `nav`, `main`, `section` with headings, `footer`.
- Visible focus styles, skip-to-content link, contrast AA minimum.
- Canvas has `aria-hidden="true"`; the hero meaning is fully conveyed by text.
- `prefers-reduced-motion: reduce` → no Lenis, no scroll-scrubbed motion, static hero fallback, simple fades at most.

---

## 9. SEO & sharing

- `<title>`: "Rafał Ciećwierz — Frontend Engineer (React & TypeScript)"
- Meta description from the tagline + availability line.
- Open Graph + Twitter card with a 1200×630 `og-image.png` (important: this is what shows on LinkedIn).
- `lang="en"`, favicon, theme colour.

---

## 10. Deployment

- Repository: `rafalciecwierz.github.io`, default branch `main`.
- In repo settings → Pages → Source: **GitHub Actions**.
- Workflow `.github/workflows/deploy.yml`: on push to `main` → install → lint → test → `vite build` → upload `dist` → deploy with `actions/deploy-pages`.
- Vite `base: '/'`.

---

## 11. Milestones

Milestones are planned as tasks in [ROADMAP.md](ROADMAP.md), grouped into the three phases from section 0.

Within phase 3, the order follows the original plan. First comes a usable site without motion or 3D: scaffold, content, tokens, static sections, accessibility, SEO and deploy. **Checkpoint:** the site is good enough to share. After that come the enhancements: motion, effects, the 3D hero, a performance pass, final content and the README.

---

## 12. Working agreement for Claude Code

- **One task at a time.** Work on one roadmap task at a time, each on its own branch. After each task, stop and summarise what changed and what to check in the browser.
- **Git is Rafał's.** Claude proposes branch names (conventional prefixes: `feat/`, `fix/`, `docs/`, `chore/`, `ci/`, `perf/`, `refactor/`) and they are listed in the roadmap. Rafał creates the branches, commits, pushes and merges into `main`. Claude never commits, pushes or merges.
- **Commit messages.** At the end of each task, Claude proposes small, focused commit message(s) following Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:` …), together with the files that belong to each.
- **Language.** Everything in the repository (code, comments, docs, commit messages) is in English. Conversation with Rafał may be in Polish.
- **Explain non-obvious code.** Rafał must be able to explain every part of this site in a job interview without AI. When writing GSAP, R3F or performance-related code, add a short explanation in the chat of *what* it does and *why* this approach was chosen. In that way he can challenge and correct your decisions. Record significant decisions in `docs/DECISIONS.md` (one short entry per decision: context, decision, alternatives considered).
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
