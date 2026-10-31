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

## 001. Ship one design, prototype 08 Ascent dark ("Night Session"), refined in iterations

Date: 26.10.2026

Context: task 2.5 compared 16 prototypes (8 directions × dark and light) in `design/index.html`. Measured with Chrome DevTools MCP: every variant shows name, role, Download CV and Get in touch above the fold at 360 × 740 and 1280 × 800, and every page held 60 fps while scrolling under a 4× CPU slowdown, so the brief's hard criteria eliminated nothing. 08 dark scored Lighthouse mobile 100 / 96 / 100 (accessibility, best practices, SEO), CLS 0.20 and 216 ms of long tasks at startup, needs no library beyond the planned GSAP, and was the only direction whose two variants both passed all four points of the design profile's feel test. Rafał liked, in order: 01 dark, 06 dark, 06 light and 08 dark. He picked 08 dark as the most personal (22+ years of parkour) and the one with the most potential, accepting that it looks less polished than 01 dark today. He also considered shipping up to four designs behind a "change design" button.

Decision: the site ships one design, prototype 08 Ascent, dark variant "Night Session" (`design/prototypes/08-ascent-dark.html`), with no theme toggle and no light variant. It is refined before phase 3 in iterations saved as new files (`design/iterations/08-ascent-dark-v2.html`, …); the 16 original prototypes are never edited. The latest iteration Rafał approves is the reference for phase 3. Two additions are agreed: a section about how Rafał works with AI, and the story of the 16 prototypes, presented on the site with a link to the prototype gallery. No elements are borrowed from other prototypes at this point; any borrowing is listed in the iteration that adds it.

Alternatives considered:

- 01 Fluid Glass dark, Rafał's closest aesthetic. Rejected: less personal; it also carried the highest performance risk measured (three.js, 406 ms startup), the "AI look" risk of acid green on black, and accessibility gaps (score 92).
- 06 RalphOS dark. Rejected: the largest build of all (window manager, a separate phone layout, list view and terminal) in a genre that already exists.
- A switcher between up to four designs, with content read from one place. Rejected: each design is a separate set of components, so every extra one costs most of the first one's work and multiplies testing; recruiters would see only the default. The prototype gallery and the story of how it was made give most of the effect at a fraction of the cost. It can return as an enhancement after launch.
- Both variants of 08. Rejected: they are two independent designs, not a theme, so shipping both means building two sites.

Consequences: no three.js in v1; the hero is an SVG scene (a rooftop sign and a free-runner rig), so the brief's 3D hero and the related roadmap tasks were rewritten, and craft is shown through GSAP scrollytelling and an SVG character instead of WebGL. Whether Lenis stays is decided by the dependency plan in task 3.1, since the prototype was built without smooth scroll. Known work for the iterations and phase 3: CLS 0.20, the brand link's accessible name, a career scene about six screens tall on desktop, and a more professional finish. Measurements are in `design/index.html`.

## 002. Pre-render every page to static HTML instead of shipping a client-only React app

Date: 29.10.2026

Context: before phase 3, Rafał asked whether rebuilding the approved prototype in React would lower the Lighthouse scores and hurt SEO. A default Vite + React app sends an almost empty HTML file (`<div id="root"></div>`) and renders the content only after its JavaScript downloads and runs. That delays the LCP element (the hero heading), costs startup CPU on phones, and hides the content and meta tags from crawlers that do not run JavaScript, including the LinkedIn link preview the site depends on (brief section 1). The prototype has the same weakness, since it also renders from a `CONTENT` object in JavaScript; it is fast only because it has no framework. GitHub Pages serves static files only (brief section 2). Rafał's goal: a fast page, good SEO and accessibility, without giving up React.

Decision: the site stays React + TypeScript, and every page is pre-rendered to static HTML at build time. The HTML that GitHub Pages serves already contains the content, headings and meta tags; JavaScript hydrates it and adds the motion. Every merge into `main` builds the pre-rendered site and deploys it (task 3.10), and pull requests run Lighthouse CI against the brief's thresholds (task 3.3). The pre-rendering tool is chosen in task 3.1, in its own entry.

Alternatives considered:

- A client-only React SPA. Rejected: empty HTML until JavaScript runs, a later LCP and no content or Open Graph tags for crawlers that skip JavaScript.
- Keep the hand-written HTML prototype as the site. Rejected: the site must show the React and TypeScript work Rafał is applying for, and a single 120 KB file with all the content and effects is hard to maintain, test or extend (a Polish locale, more projects).
- Server-side rendering on each request. Rejected: GitHub Pages has no server, and the content changes only when Rafał edits it, so rendering once at build time gives the same HTML.

Consequences: components must render on the build machine, where `window` and `document` do not exist, so GSAP, the SVG rigs and every browser API run only after mount (`useGSAP` and effects), never during render. Reduced-motion and the static hero become the default HTML, which also serves users without JavaScript. The build gets a pre-render step, and the choice of tool (for example Vite with a pre-render step, or Astro with React islands) affects how much JavaScript ships. Not verified yet: the scores are checked by Lighthouse CI from task 3.3 and the pass in task 3.16.

## 003. Pre-render with Vite and a pre-render script written in the project

Date: 29.10.2026

Context: #002 requires every page to ship as static HTML, and task 3.1 had to choose the tool, compared on initial JS, effort and fit with GSAP. The site is one page, React is the skill it has to show, and the budget is 150 KB of initial JS gzipped. Measured on 29.10.2026 (esbuild, minified, gzip -9): React and React DOM 19.3 take 68.9 KB in any setup that hydrates React, GSAP with ScrollTrigger 46.2 KB. Vite documents server builds, so pre-rendering needs only `renderToString` at build time and `hydrateRoot` in the browser.

Decision: Vite builds the browser bundle and a server bundle of the same React tree. `scripts/prerender.ts`, about 40 lines run directly by Node 24, renders every route in `ROUTES` into `dist/<route>/index.html`, head included. The browser hydrates it with `hydrateRoot`. The steps are in `docs/ARCHITECTURE.md` section 2.

Alternatives considered:

- Astro with React islands. Rejected: the React runtime (68.9 KB) still ships as soon as one island hydrates, so it saves only the code of the static sections; those sections would be written as `.astro` files instead of React; and islands hydrate at different times, which complicates the pinned ScrollTrigger scene that depends on the final layout.
- `vite-react-ssg` 0.9.2. Rejected: a pre-1.0 dependency built around routing, for a site with one page; it saves about 40 lines.
- React Router v7 framework mode with `prerender`, or Next.js static export. Rejected: a framework runtime and conventions for one page, more JS for no gain.

Consequences: no extra dependency, and every line of the build is in the repository, readable in an interview. The project owns the code: head tags, the route list and a second page if one comes. Components must be safe to render in Node (`docs/ARCHITECTURE.md` section 10). Not verified yet: the scaffold in task 3.2 builds it, and task 3.3 runs Lighthouse CI on the result.

## 004. Keep Lenis for smooth scrolling

Date: 29.10.2026

Context: the brief left Lenis to task 3.1, because the chosen prototype was built without smooth scroll. Lenis 1.3 measures 5.5 KB gzipped. It needs syncing with ScrollTrigger and must be off with reduced motion (brief section 8).

Decision: Lenis stays, as Rafał chose in task 3.1. It ships with the lazily loaded motion layer (#005), not in the initial bundle. It is created once in `src/motion/lenis.ts`, driven by `gsap.ticker`, updates ScrollTrigger on scroll, never starts with reduced motion, and anchor links use `lenis.scrollTo` when it runs and a native jump when it does not.

Alternatives considered:

- CSS `scroll-behavior: smooth` only, as Claude recommended. Rejected by Rafał: Lenis costs only 5.5 KB, and it gives the eased, continuous scroll that the brief planned from the start.
- GSAP ScrollSmoother. Rejected: it requires wrapping the whole page in extra elements and moves content with transforms, which affects fixed elements and the native `<dialog>`.

Consequences: one more runtime dependency (5.5 KB) and one more thing to test with reduced motion. The prototype was tuned without smooth scroll, so the scroll feel is checked again in task 3.11.

## 005. Load all motion as a lazy layer on top of the static page

Date: 29.10.2026

Context: the pre-rendered HTML (#002) is the complete site in its reduced-motion form. GSAP, ScrollTrigger, `@gsap/react` and Lenis together measure about 52 KB gzipped. Bundled with React (68.9 KB) and the site's own code (the prototype's script is 18.8 KB), everything would come close to the 150 KB initial budget and add parsing work before the page responds on a phone. None of it is needed to read the page, and the career run is not used below 900 px at all.

Decision: every animation lives in a client-only motion component (a folder in `src/motionComponents/`), loaded with `React.lazy` through a `MotionLayer` component, only after hydration, when the browser is idle and when reduced motion is off. The career run loads only from 900 px. Motion components animate the static DOM with `useGSAP` and never hide content that is already on screen. The rules are in `docs/ARCHITECTURE.md` sections 9 and 13.

Alternatives considered:

- GSAP in the entry bundle, with `useGSAP` directly in each section. Rejected: simpler, but about 52 KB more initial JS, which leaves almost no room in the budget and slows startup on phones.
- Motion code written without GSAP (WAAPI and `requestAnimationFrame`, as in the prototype). Rejected: the pinned, scrubbed career run is what ScrollTrigger exists for, and GSAP is part of the skill set the site has to show (brief section 1).

Consequences: initial JS is estimated at about 85–90 KB instead of about 140 KB. Animations start a moment after the page is shown, so entrances apply only to content below the viewport. Lazy modules must never be imported statically or re-exported from an `index.ts`. Not verified yet: task 3.16 measures the real chunks.

## 006. Run Lighthouse CI with a pinned `@lhci/cli` and keep the reports in GitHub

Date: 30.10.2026

Context: brief section 1 sets Lighthouse mobile thresholds (Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95), and #002 and #003 left them to be checked by CI. Task 3.3 makes every pull request fail when a score drops below them. A single Lighthouse run on a shared CI machine can be a few points off, and by default Lighthouse CI judges only the best of several runs.

Decision: `@lhci/cli` 0.15.1 (Lighthouse 12.6.1) is a pinned dev dependency, configured in `lighthouserc.yml` and run with `pnpm lighthouse`, locally and in the Lighthouse job of `.github/workflows/ci.yml` on every pull request. It audits the pre-rendered `dist/` with the default mobile settings, three runs per page, and asserts each category on the median. Reports are written to `.lighthouseci/reports/` and uploaded as a workflow artifact.

Alternatives considered:

- `treosh/lighthouse-ci-action`. Rejected: it wraps the same `@lhci/cli`, but cannot be run locally, and a third-party action has to be pinned to a commit and reviewed like a dependency anyway.
- `pnpm dlx @lhci/cli` in CI only. Rejected: no lockfile entry, so the version could differ between a local run and CI.
- Chrome DevTools MCP audits only. Rejected: they depend on someone running them; nothing stops a regression from being merged.
- Reports in `temporary-public-storage`. Rejected: a convenient link, but the reports leave GitHub and sit on a third-party server for 7 days.

Consequences: about 250 packages in `node_modules`, development only; nothing ships to the site. A Lighthouse job adds a few minutes to each pull request. Verified locally on the placeholder page: 100 / 100 / 96 / 100 (Performance, Accessibility, Best Practices, SEO), and with the meta description removed from `dist/index.html` SEO dropped to 90 and `pnpm lighthouse` exited with code 1. If Performance proves unstable on CI machines, the agreed fallback is to turn only that assertion into a warning.

## 007. Keep the copy in typed TypeScript objects and choose the language by URL, without an i18n library

Date: 31.10.2026

Context: v1 is English only, and Polish comes later (brief section 2, roadmap task 3.21). Brief section 3 asks for minimal dependencies, and the initial JS budget is 150 KB gzipped. Every page is pre-rendered to static HTML (#002), so its copy is already in the HTML before any JavaScript runs. Most of the content is data, not sentences: jobs with `{ year, month }` dates, stack levels, projects with ids and statuses, and a few templates such as plurals (`toolCount`). The site sets no cookies (brief section 12). GitHub Pages has no server, so it cannot pick a language from request headers.

Decision: every locale is one TypeScript value of the `Content` type (`src/content/en/`, later `src/content/pl/`), as `docs/ARCHITECTURE.md` section 7 describes. A missing or misshaped translation is a compile error. Plurals and small templates are typed functions in the content, and Polish plurals use the built-in `Intl.PluralRules`. The language comes from the URL: `/` is English and `/pl/` is Polish. Each path is a route, pre-rendered to its own HTML file with its own `<html lang>`, `hreflang` alternates and copy. The language switch is a plain link to the other path. The browser language is not detected and nothing redirects. Nothing stores the choice: the URL is the state.

Alternatives considered:

- An i18n library (i18next with react-i18next, react-intl). Rejected: it adds runtime JavaScript to solve problems the site does not have, such as switching language in the browser, loading translations lazily and supporting translators' file workflows. Its keys are strings (`t('career.jobs.0.points.2')`), so a typo shows up only on the page unless a typing tool is added.
- JSON files per locale. Rejected: TypeScript does not force `pl.json` to match the shape of `en.json` without a schema check (another dependency), and JSON cannot hold the template functions.
- Language held in state, with a cookie or `localStorage`. Rejected: a link to the page would not carry its language, crawlers would see one language only, and the brief rules out cookies.
- Redirect by `navigator.language`. Rejected: it can only run in JavaScript after the page has loaded, it surprises visitors who want the other language, and it hides one version from search engines.

Consequences: no i18n dependency and no runtime cost for choosing the language. Each page should load only its own locale; today the client imports `en` directly, so task 3.21 has to load the copy by route to keep that true. Content files are code, so a translator who is not a developer would need help editing them. Adding Polish means a `content/pl/` folder, a `/pl/` route, a locale-aware head and a switch link (task 3.21), and no change to sections or components, because they already receive content as props. Verified so far only for English: `en` is typed as `Content`, and `src/content/content.test.ts` runs every locale through the same checks.
