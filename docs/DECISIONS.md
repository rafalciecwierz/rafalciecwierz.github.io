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
