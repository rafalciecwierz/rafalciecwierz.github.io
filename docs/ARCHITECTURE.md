# Architecture

How the site is built and how its code is written. Every task in phase 3 follows this file. When the code needs to differ from it, this file changes first, in the same branch.

- **Status:** approved by Rafał on 29.10.2026 (roadmap task 3.1).
- **Reference design:** `design/iterations/08-ascent-dark-v2.html` (brief section 0).
- **Requirements:** [PROJECT_BRIEF.md](PROJECT_BRIEF.md). **Decisions and rejected alternatives:** [DECISIONS.md](DECISIONS.md) #002–#006.

Contents:

1. [Principles](#1-principles)
2. [Build and pre-rendering](#2-build-and-pre-rendering)
3. [Folder structure](#3-folder-structure)
4. [File naming](#4-file-naming)
5. [TypeScript rules](#5-typescript-rules)
6. [Component rules](#6-component-rules)
7. [Content layer](#7-content-layer)
8. [Styles](#8-styles)
9. [Motion layer](#9-motion-layer)
10. [Code that runs at build time](#10-code-that-runs-at-build-time)
11. [Component map](#11-component-map)
12. [Dependency plan](#12-dependency-plan)
13. [JavaScript budget and code splitting](#13-javascript-budget-and-code-splitting)
14. [Testing](#14-testing)
15. [How the rules are enforced](#15-how-the-rules-are-enforced)
16. [Sources](#16-sources)

---

## 1. Principles

Rafał's requirements (task 3.1, 29.10.2026). Sections 4–8 turn them into rules.

1. **Readability first.** Code is read far more often than it is written, and Rafał must be able to explain every line in an interview. Clear beats clever.
2. **Three layers: pages, sections, components.** A page arranges sections. A section is one part of the landing page (Hero, About, Career and so on). Components are the general building blocks every section is made from.
3. **Everything is a component.** A section's main component only composes other components. It contains no plain HTML tags: `<section>`, `<h2>`, `<p>` and `<ul>` are already wrapped in components.
4. **Everything is typed, explicitly.** Every variable, parameter and return value has a written type, hooks and components included (`const label: string = …`, `function useX(): Result`). When a type is missing, it is created.
5. **Types live in `.types.ts` files.** A component file never declares a type.
6. **A suffix tells what a file does:** `.component.tsx`, `.module.scss`, `.types.ts`, `.utils.ts` and the others in section 4.
7. **No magic numbers or hard-coded strings.** A number has a name (a constant or a design token), and copy comes from the content layer.
8. **Logic moves out of components.** Anything that can be a function becomes a pure function next to the component (`<name>.utils.ts`). Side effects such as browser APIs or requests are wrapped in a service or a hook, so the component only reads.
9. **Folders have an `index.ts`** that lists what the folder offers to the rest of the code. The one exception is `src/motionComponents/`, whose files are loaded lazily (section 4).
10. **Content flows down as props.** Only the page imports the content layer. Sections and components get their data through props, so each one can be rendered and tested with any data.
11. **Static first, motion on top.** The pre-rendered HTML is the complete, readable site (brief section 8). Motion is a separate layer that is loaded later and only animates what is already there (section 9).
12. **Rules are enforced by tools, not by memory.** Every rule above that a linter or the compiler can check is checked in `lint` and `typecheck` (section 15), so a review is about design, not about style.
13. **Small, deep modules.** A file does one thing. A component is short (about 120 lines; the linter stops a file at 150) and has a small props interface. A long one is split before it grows.

## 2. Build and pre-rendering

Vite, React 19 and TypeScript, with a pre-render step written in the project (about 40 lines, no extra dependency). Chosen in [DECISIONS.md](DECISIONS.md) #003.

`pnpm build` runs four steps:

1. `tsc -b`: type-check the whole project.
2. `vite build`: the browser bundle and `dist/index.html`, which holds two placeholders: `<!--app-head-->` and `<!--app-html-->`.
3. `vite build --ssr src/app/entryServer.tsx --outDir dist-server`: the same React tree, built for Node.
4. `node scripts/prerender.ts`. Node 24 runs TypeScript directly, without a compile step, as long as the code uses only syntax that can be stripped. For each route in `ROUTES` (only `/` for now), the script:
   - calls `render(route)` from `dist-server`,
   - writes the returned `head` (title, meta, Open Graph) and `html` into the template,
   - saves `dist/<route>/index.html`,
   - deletes `dist-server`.

In the browser, `src/app/entryClient.tsx` calls `hydrateRoot`: React attaches to the HTML that is already on screen instead of rendering it again. The dev server (`pnpm dev`) serves the template without pre-rendered content, so there the same file renders the page with `createRoot` instead.

The head comes from the same content layer as the page (`content.seo`), through a typed function `renderHead(seo: Seo): string`. The title and descriptions are written only once.

## 3. Folder structure

```
public/
  fonts/                       # self-hosted woff2 files and their OFL licences (section 8)
  Rafal_Ciecwierz_CV.pdf
  favicon.svg
  og-image.png
scripts/
  prerender.ts                 # step 4 of the build
  prerender.utils.ts           # fillTemplate, outputFileFor, isServerEntry (tested)
  prerender.constants.ts       # paths and template markers
  cssModules.utils.ts          # findRawValues: raw values in a stylesheet that have a token (tested)
  cssModules.test.ts           # runs findRawValues on every CSS Module (section 8)
  breakpoints.test.ts          # the SCSS and TypeScript breakpoints match (section 8)
src/
  app/                         # entry points; nothing imports this folder, so it has no index.ts
    app.component.tsx          # the root: page layout and the motion layer
    app.constants.ts           # ROUTES (the pages to pre-render) and the root element id
    app.utils.ts               # findRoute, renderHead
    entryClient.tsx            # hydrateRoot (createRoot on the dev server)
    entryServer.tsx            # render(path): { head, html }, and ROUTE_PATHS
  pages/
    home/
      home.component.tsx       # imports the content and composes the sections in order
      index.ts
  sections/                    # one folder per part of the page, and nothing else
    siteHeader/
    hero/
    about/
    stack/
    career/
    testimonials/
    projects/
    process/
    contact/
    siteFooter/
  components/                  # every component, one folder each, no subgroups
    button/                    # e.g. Button, Heading, Section, List, Runner, Skyline,
    heading/                   #      JobEntry, SpotCard, Poster, LevelBoard (section 11)
    …
    index.ts                   # re-exports every component
  motionComponents/            # lazy, client-only motion components (section 9); no index.ts
    heroMotion/
    careerRunMotion/
    …
  motion/
    gsap.ts                    # registers GSAP plugins once
    lenis.ts                   # creates Lenis and syncs it with ScrollTrigger
    motionLayer/               # loads and mounts the lazy motion components (section 9)
  hooks/                       # shared hooks: useReducedMotion, useIsHydrated, useMediaQuery,
                               # useInView, usePageVisible, useFocusTrap, useScrollLock,
                               # useEscapeKey, useCopyToClipboard
  services/                    # side effects behind a small interface: clipboard, email address
  utils/                       # shared pure functions: math (clamp, lerp), random (seeded rng)
  constants/                   # shared named values: breakpoints, section ids, motion timings
  content/
    content.types.ts           # the Content type, the shape of every locale
    <area>.types.ts            # the shape of one area (career.types.ts, projects.types.ts, …)
    content.constants.ts       # STACK_LEVELS, PROJECT_STATUSES (the unions derive from them)
    content.test.ts            # checks every locale (section 14)
    en/                        # the English content: one file per area, joined in en.content.ts
    index.ts                   # exports `content` (English until a locale switch exists)
  styles/
    tokens.scss                # design tokens as CSS custom properties
    global.scss                # imports tokens and fonts; the page-wide base (reset, links, focus)
    fonts.scss                 # @font-face rules and the metric-adjusted fallback faces
    _breakpoints.scss          # the breakpoint map and the from()/below() media query mixins
  types/                       # ambient declarations only (*.d.ts): APP_BUILD_YEAR from Vite's define
  test/
    setup.ts                   # Vitest and Testing Library setup
```

A section folder holds the section and nothing else (Career as the example):

```
sections/career/
  career.component.tsx         # composes components; no HTML tags
  career.types.ts              # CareerProps
  career.module.scss           # the section's own layout only
  career.test.tsx              # renders the section from fixture content
  index.ts                     # exports Career and CareerProps
```

A component folder holds the component and everything it needs (JobEntry as the example):

```
components/jobEntry/
  jobEntry.component.tsx
  jobEntry.types.ts
  jobEntry.module.scss
  jobEntry.utils.ts            # e.g. buildingHeight(job)
  jobEntry.utils.test.ts
  jobEntry.constants.ts        # e.g. BUILDING_MIN_HEIGHT
  index.ts
```

**Where a component lives:** always in `src/components/`, even when only one section uses it. The project is small, so one flat folder is easier to scan than groups or per-section folders. A section is not a module with its own components below it. `src/components/` never imports from `sections/` or `pages/`, so every component can be used anywhere.

**Import direction**, one way only:

`app → pages → sections → components → hooks, services, utils, constants`

Content types may be imported anywhere. Content data only in `pages/` (principle 10) and in `app/`, which writes the head from `content.seo`.

`src/app/`, `src/test/` and `src/types/` have no `index.ts`: nothing imports them.

## 4. File naming

Folders and files use camelCase. The suffix says what the file does:

| Suffix | Holds | Example |
| --- | --- | --- |
| `.component.tsx` | one React component, exported by name | `button.component.tsx` |
| `.module.scss` | the CSS Module of that component | `button.module.scss` |
| `.types.ts` | every type of the folder: props, unions, data shapes | `button.types.ts` |
| `.utils.ts` | pure functions: no side effects, same input gives the same output | `career.utils.ts` |
| `.constants.ts` | named values (numbers, ids, lookup tables, pose data) | `runner.constants.ts` |
| `.hook.ts` | one hook, named `useX` | `useReducedMotion.hook.ts` |
| `.service.ts` | a wrapper around a browser API or a request | `clipboard.service.ts` |
| `.animation.ts` | functions that build GSAP timelines for one component | `careerRun.animation.ts` |
| `.content.ts` | one area of the content | `en/career.content.ts` |
| `.test.ts(x)` | tests, next to the file they test | `career.utils.test.ts` |
| `index.ts` | the folder's public interface, re-exports only | `index.ts` |
| `.d.ts` | ambient declarations, only in `src/types/` | `scssModules.d.ts` |

A folder holds one unit: `button/` holds the Button and its files. Global styles are the only `.scss` files without `.module`, and they live in `src/styles/`.

**`index.ts` rules:**

- Re-exports only, listed by name: `export { Button } from './button.component'; export type { ButtonProps } from './button.types';`. No `export *`, so the file shows exactly what the folder offers.
- Code outside a folder imports through its `index.ts` (`import { Button, Heading } from '@/components'`). Files inside a folder import each other by relative path, never through their own `index.ts`, which avoids import cycles.
- A component that uses another component imports it from that component's own folder (`import { Icon } from '@/components/icon'`), not from `@/components`. The root `index.ts` also re-exports the importing component, so going through it would form an import cycle.
- `src/motionComponents/` has no `index.ts`. A motion component is loaded only through `import()` of its own file (section 13); a barrel or any static import would pull it back into the main bundle. Its name ends in `Motion` (`CareerRunMotion`), so it never clashes with the section it animates.

**Names inside the code:**

- Components and types use PascalCase.
- Functions and variables use camelCase.
- Module-level constants use UPPER_SNAKE_CASE.
- Hooks start with `use`.
- Booleans start with `is`, `has`, `should` or `can`.
- Event props are `onX`, and their handlers are `handleX`.

## 5. TypeScript rules

**Compiler** (`tsconfig.json`):

- `strict`
- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `noImplicitReturns`
- `noImplicitOverride`
- `noFallthroughCasesInSwitch`
- `noUnusedLocals`, `noUnusedParameters`
- `verbatimModuleSyntax`, `isolatedModules`
- `erasableSyntaxOnly`: no `enum` and no `namespace`, the syntax Node cannot strip (section 2)

**Explicit types everywhere** (principle 4):

- Every function, arrow function and method declares its parameter types and its return type, callbacks included: `jobs.map((job: Job): ReactElement => …)`.
- Every variable declared with a plain name has a type annotation: `const label: string = …`, `const isOpen: boolean = …`. The linter rule that would normally remove these annotations (`no-inferrable-types`) is turned off.
- Destructured values get their type from the typed value they come from. A hook's generic is always written: `const [isOpen, setIsOpen] = useState<boolean>(false)`. TypeScript cannot annotate a single destructured name, so this is the explicit form.
- Components return `ReactElement` (or `ReactElement | null`). Hooks return a named type from their `.types.ts` file.

**Types:**

- Object shapes use `type`, not `interface`, so there is one way to write them.
- A fixed set of values is a union of string literals (`type ProjectStatus = 'live' | 'inProgress' | 'archived'`). When the code also needs the values at runtime, they come from an `as const` object and the type is derived from it.
- No `any`, no `as` casts (except `as const`) and no `!`. A value of unknown shape is narrowed with a type guard (`isHTMLElement(node)`).
- A `switch` over a union handles every member. The linter checks this.
- Type-only imports use `import type`.

## 6. Component rules

**Shape of a component:**

```tsx
// button.component.tsx
import type { ReactElement } from 'react';

import styles from './button.module.scss';
import type { ButtonProps } from './button.types';
import { buttonClassName } from './button.utils';

export function Button({ variant, children, onClick }: ButtonProps): ReactElement {
  return (
    <button type="button" className={buttonClassName(styles, variant)} onClick={onClick}>
      {children}
    </button>
  );
}
```

- A component is a named function declaration with one named export. No default exports and no `React.FC`.
- Props are destructured in the signature, and their type comes from the folder's `.types.ts`.
- React 19 passes `ref` as an ordinary prop, so `forwardRef` is not used.
- Children and composition replace render props.

**Sections compose, components render:**

- Sections and pages use components only. Plain HTML tags appear only in `src/components/`.
- The semantic tags still reach the HTML: `Section` renders `<section aria-labelledby>`, `Heading` renders `<h1>`–`<h3>` from a `level` prop, `List` renders `<ul>` or `<ol>`.
- The goal is a section file that reads like an outline of the section.

**Props design** (adapted from Vercel's composition patterns, section 16):

- **Explicit variants over boolean flags.** Use `variant: 'primary' | 'secondary'`, not `isPrimary`, `isGhost`, `isLarge`.
- **Small interfaces.** When a component needs many props, it is usually two components, or it should take one typed object (`job: Job`) instead of its fields.
- **Stable keys.** Lists use a stable id from the content (`id` on every job, project and quote), never the array index.

**State and effects:**

- **Local state only.** No global store and no state library. Context only for values that many distant components read and that change rarely; none is planned.
- **Derive, don't sync.** A value that can be computed during render is computed during render (in a `.utils.ts` function), not copied into state through an effect.
- **`useEffect` only to sync with something outside React:** a browser API, a subscription, GSAP. A response to an event goes in the event handler.
- **`useSyncExternalStore` for browser state:** media queries, reduced motion, page visibility. It gives the server and the browser their own values without a hydration mismatch.
- **One concern per hook.** A hook that does two unrelated things is two hooks.
- **No component defined inside another component.**

**Logic out of components** (principle 8):

- A calculation goes in `<name>.utils.ts` as a pure function with a test, for example the height of a building, the letter platforms of the sign or the order of the jobs.
- A browser API goes behind a service. The service exposes a small typed function (`copyText(text: string): Promise<CopyResult>`), and a hook adapts it for React (`useCopyToClipboard`).
- A component never calls `navigator`, `document` or `window` directly.

**Accessibility, built into the components:**

- `Button` always sets `type`.
- `Dialog` uses the native `showModal()`.
- `Section` requires the id of its heading.
- `KineticText` keeps the real text available to screen readers.
- Decorative graphics are `aria-hidden`.

The rules in brief section 8 are checked by `eslint-plugin-jsx-a11y` and by the audits in task 3.16.

## 7. Content layer

- **One type, one file per locale.** `content.types.ts` defines `Content`, the shape of the whole site's copy and data; each area's shape is in its own `<area>.types.ts`, named like the file that holds its English value (`career.types.ts` ↔ `en/career.content.ts`), so no file passes the line limit. `content/en/` builds the English value from one file per area (`profile.content.ts`, `career.content.ts`, …), and `en/en.content.ts` joins them and checks that they match: `export const en: Content = { … }`. A Polish version will be a `content/pl/` folder of the same type, so a missing translation is a compile error.
- **Every user-facing string is content.** This includes labels, button text, `aria-label` values, alt text and the console greeting. Plurals and small templates are typed functions in the content (`count: (n: number) => string`).
- **The data has ids.** Every job, project and quote has an `id`. Adding, removing or reordering a project changes only `projects.content.ts` (brief section 4.7).
- **Nothing outside the content layer is copy.** Section ids for the anchors (`SECTION_IDS`) are constants, not content, because they are part of the URL.
- **Data, not formatted text.** Dates are `{ year, month }` (`Period`), formatted by `formatPeriod` in `src/utils/`, so a test can check the order of the jobs. A promotion is a job with more than one role. A link sits in a field whose name ends in `Url` (`githubUrl`, `repoUrl`), so the content test can find and check every link.
- **`TODO` values are typed.** A missing LinkedIn or Calendly URL is `null` in the content, and the component renders the "Rafał to provide" state. The `null` is listed in `LISTED_TODOS` in `content.test.ts` and in the summary of task 3.18.

## 8. Styles

- **CSS Modules for every component** (`<name>.module.scss`). The class names are local, so a component's styles cannot leak.
- **Design tokens** are CSS custom properties in `styles/tokens.scss` (task 3.5): colours, fonts, the type scale, spacing, layout widths, borders, radii, durations, easings and page-wide z-index layers. A module uses `var(--token)`, never a raw value that has a token. `scripts/cssModules.test.ts` fails when a module writes a colour, a font family, a font size, a transition or animation duration, or a z-index above 9 as a raw value. Small local stacking (−9 to 9) stays in the component.
- **How the tokens are built:**
  - They come from the reference design. Values that differed by at most 0.5 px (or 0.01 em, or 50 ms) share one token, so the scales stay short.
  - Fixed font sizes are a t-shirt scale where `md` is the body text (17 px). Fluid sizes (`clamp()`) are named by role (`--font-size-section-title`).
  - `--space-N` is N × 4 px, with half steps (`--space-1-5`) where the design uses them.
  - Colours keep the design's names (`--color-night`, `--color-sodium`). There is one dark theme, so there is no second, semantic layer. A colour with transparency is mixed from a token: `color-mix(in srgb, var(--color-night) 80%, transparent)`.
- **Units:** font sizes and spacing are in `rem`, so they follow the reader's browser font size (WCAG 1.4.4). 1 rem is 16 px by default, so the design's pixel values are kept. Borders and focus rings stay in px.
- **Global styles** (`global.scss`) are imported once, by `app/entryClient.tsx`, so they come before every module in the built CSS. They hold the reset, the body text, links, one `:focus-visible` style and the reduced-motion path (no transitions or CSS animations, no smooth scroll).
- **Breakpoints:** the six widths where the reference design's layout changes (520, 600, 760, 900, 960 and 1000 px, named `xs` to `xxl`) live both in `_breakpoints.scss` and in `constants/breakpoints/`, because CSS media queries cannot read TypeScript. `scripts/breakpoints.test.ts` reads both and fails if they differ. A module writes `@use '@/styles/breakpoints' as *;` and then `@include from(lg) { … }` (900 px and wider) or `@include below(md) { … }` (narrower than 760 px).
- **Class names** are combined with a small `classNames(...)` function from `utils/`, not a library.
- **Fonts are self-hosted.** Big Shoulders Display and Barlow (both SIL Open Font License) are woff2 files in `public/fonts/`, limited to the Latin and Latin Extended subsets. They use `font-display: swap`, the display font is preloaded, and the fallback font's metrics are adjusted (`size-adjust`, `ascent-override`) so the swap does not shift the layout. The page then makes no request to Google, a third party (brief section 12, no trackers), and needs no extra connection before the fonts load.
- **How the fonts are set up** (`styles/fonts.scss`):
  - The files are Google Fonts' own Latin and Latin Extended subsets, each with its `unicode-range`. The browser downloads Latin Extended only for characters such as Ł and Ć.
  - Big Shoulders Display is one variable file per subset (weights 500–900). Barlow has one file per weight (400, 500, 600, 700) and subset, and no italics.
  - `index.html` preloads both Big Shoulders files, because the hero name uses both.
  - The fallback faces are Arial and Arial Bold, adjusted with `size-adjust`, `ascent-override` and `descent-override`. The numbers were measured with fontTools, and `fonts.scss` explains how.

## 9. Motion layer

**The idea:** the pre-rendered HTML is the reduced-motion version of the site: the sign lit, the runner perched on the Ł, the career as a list and the leap already landed. That version is complete. Motion is added on top of it by **motion components**: client-only React components that render nothing visible (or only a decorative SVG) and animate the DOM of the static component they belong to.

```tsx
// sections/stack/stack.component.tsx (sketch)
<Section id={SECTION_IDS.stack} labelledBy={titleId} ref={sectionRef}>
  …
  <MotionLayer load={loadStackMotion} scope={sectionRef} />
</Section>
```

**How it works:**

- `MotionLayer` renders nothing on the server and during hydration.
- After hydration, and only when `useReducedMotion()` is false, it loads its motion component with `React.lazy` while the browser is idle, then mounts it.
- The motion component uses `useGSAP({ scope })`, so every tween and ScrollTrigger is reverted when it unmounts.
- Its timelines are built by plain functions in `<name>.animation.ts` (`createBoardReveal(boards: HTMLElement[]): gsap.core.Timeline`), with named durations and easings from `constants/motion.constants.ts`.

**Rules:**

- **Motion never hides content that is already visible.** An entrance animation applies only to elements below the viewport when the layer loads. Anything already on screen keeps its final state.
- **One source of truth for reduced motion.** `useReducedMotion` reads `prefers-reduced-motion` through `useSyncExternalStore`, and its server value is "reduce". When it changes to "reduce", the motion components unmount and GSAP reverts the DOM to the static version.
- **Plugins are registered once,** in `motion/gsap.ts`, which only motion code imports.
- **Lenis** is created in `motion/lenis.ts` by the root motion layer and synced with ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`, with Lenis driven by `gsap.ticker`). It never starts with reduced motion. Anchor links use `lenis.scrollTo` when Lenis is running and a native jump when it is not. See [DECISIONS.md](DECISIONS.md) #004.
- **Paused when not seen.** The hero and every looping animation pause when they are off-screen (`useInView`) or the tab is hidden (`usePageVisible`).

## 10. Code that runs at build time

Pre-rendering runs every component in Node, where `window`, `document` and `matchMedia` do not exist ([DECISIONS.md](DECISIONS.md) #002). Rules:

- **Render is pure.** Browser APIs are used only in effects, event handlers, services and motion components, never while rendering.
- **Generated graphics are rendered at build time.** The Skyline and the night map of Projects come from a seeded random generator with a fixed `viewBox`, so the build and the browser produce the same SVG and it ships in the HTML.
- **Values that differ per visitor appear after hydration,** in a slot whose size is reserved so nothing shifts:
  - the time in the hero meta line,
  - the email address, joined from parts (brief section 4.9),
  - the letter platforms of the sign, found by a canvas scan after the fonts load.

  Without JavaScript, the email channel shows the LinkedIn, GitHub and Calendly links only, as the brief accepts.
- **The year in the footer is the build year.** Vite's `define` replaces `APP_BUILD_YEAR` with one number in both builds, and `BUILD_YEAR` in `constants/` reads it. A year taken from `new Date()` while rendering could differ between the build and the visit (a build in December, a visit in January) and break hydration. Every merge redeploys the site, so the year stays current.
- **The mobile menu needs JavaScript.** Below 760 px the links sit behind the Menu button. Without JavaScript the page is still one readable scroll, and the skip link works.
- **Hydration must match.** The server and the first browser render produce identical HTML. Hooks that read the browser return their server value during hydration, through `useSyncExternalStore`. `suppressHydrationWarning` is not used.

## 11. Component map

Every effect in the reference (its comment header names them) mapped to where it lives. "Static" means it is in the pre-rendered HTML. "Motion" means a lazy motion component.

| Section | Static components | Motion components | Content |
| --- | --- | --- | --- |
| `siteHeader` | Brand (monogram, label in name), Nav, MobileMenu (focus trap, Escape, focus return), header state solid once the page moves | – | `nav`, `brand`, `profile.initials` |
| `hero` | HeroSign (the name as letters, sized by container query units; FitName fine-tunes it after the fonts load), Role, Tagline, HeroActions (Download CV, Get in touch), HeroMeta, Skyline, Parapet, Runner perched on the Ł | `heroMotion`: SignFlicker, window flicker, RoleFlip (a split-flap scramble written by us, driven by a GSAP tween; no ScrambleText plugin), LetterHop (letter clicks, tricks on runner clicks) | `profile`, `hero` |
| `about` | AboutText, Facts (the `StatList` component) | `aboutMotion`: Vault on the title | `about` |
| `stack` | AiBand, LevelBoard × 3, ToolGroup, level legend with text labels | `stackMotion`: BoardReveal stagger, Vault | `stack` |
| `career` | CareerList (newest first, a Building per job, promotions highlighted), Education, skip link | `careerRunMotion` (only from 900 px): RooftopRun with ScrollTrigger `pin` + `scrub`, a building per company, a tower per promotion, the job card following the runner, progress bar | `career` |
| `testimonials` | Poster (with a seeded torn edge) × 3 | `testimonialsMotion`: PasteUp | `team` |
| `projects` | SpotMap (seeded SVG, pins), SpotCard list, SpotPanel (`Dialog`: side panel on desktop, bottom sheet on phones) | `projectsMotion`: panel slide, pin highlight | `projects` |
| `process` | Leap scene drawn landed, the "1 → 16" headline, Stats, links (gallery, `docs/AI_USAGE.md`, both repositories) | `processMotion`: GapLeap with bullet time, replay button | `process` |
| `contact` | Availability, Channels (Email with CopyButton, LinkedIn, GitHub, Calendly), Download CV | `contactMotion`: Vault | `contact`, `profile` |
| `siteFooter` | Built-with line, repo link, year, Runner standing with the bubble, back to top | `footerMotion`: FooterLanding (drop, roll, turn, wave) | `footer` |

Across the page:

- `PageLayout`: the skip link, the landmarks (`header`, `main`, `footer`) and the root motion layer (Lenis). The page passes the `siteHeader` and `siteFooter` sections in as props, because a component never imports a section. Since task 3.7 the header is `HeaderBar` (solid once a sentinel at the top of the document leaves the screen, seen by `useInView`), `Brand` and `Nav` (one list of links; below 760 px a full-screen menu with `useFocusTrap`, `useEscapeKey` and `useScrollLock`, open only while `useMediaQuery` reports the mobile layout), and the footer is `PageFooter`, `SignOff` and `FooterMeta`.
- `ConsoleHello`: one effect in `app.component.tsx` that prints `content.console`.

**UI primitives used by several sections** (task 3.6), all in `src/components/`:

- Structure: `Section` (a named region; `surface` plain or concrete, `spacing` padded or none), `Container` (the page's maximum width), `SectionHeading` (kicker with the section number, the title as `KineticText`, an optional intro), `Heading` (`level` for the outline, `size` for the look), `Text`, `List` and `ListItem`.
- Small parts: `TagList`, `Badge` (solid, caution, muted), `StatList`, `Todo` (the visible marker for a `null` in the content), `VisuallyHidden`, `KineticText` (the real text for screen readers, letters marked `data-kinetic-letter` for the motion layer) and `Icon`.
- Actions: `ButtonLink` (an `<a>` that looks like a button: primary or secondary, optional download), `Button` (a native `<button type="button">`: outline, strong for Menu and Close, or solid) and `TextLink` (inline or cta). They pass the native attributes through (`aria-*`, `onClick`) but take no `className`, so their look comes only from the variant. Layout primitives (`Section`, `Container`, `Text`, `List`, `ListItem`) take an optional `className` for the parent's layout.

**Graphics used by several sections:**

- **Runner**, the SVG pose rig. It is used by the hero, the career run, the leap and the footer. Its poses are data in `runner.constants.ts`, and blending between them is a pure function in `runner.utils.ts`.
- **Skyline and Building**, used by the hero, the career and the process scene.
- **TornEdge**, a seeded `clip-path` function in `utils/` (posters and concrete edges).

Elements that only present the prototype are not carried over (brief section 0).

## 12. Dependency plan

**Runtime dependencies** (everything a visitor downloads):

| Package | Why | Size (min + gzip) | Loaded |
| --- | --- | --- | --- |
| `react`, `react-dom` 19 | the UI library; hydration | 68.9 KB | initially |
| `gsap` 3.15 (core + ScrollTrigger) | every animation, the pinned career run | 46.2 KB | with the motion layer |
| `@gsap/react` | `useGSAP`: scoped, auto-reverted GSAP in React | 0.8 KB | with the motion layer |
| `lenis` 1.3 | smooth scroll, synced with ScrollTrigger (#004) | 5.5 KB | with the motion layer |

Sizes were measured on 29.10.2026 by bundling each package with esbuild (minified, gzip -9). Task 3.16 measures the real chunks.

**Effects: port or install.** Every effect in the reference is custom code with no library ("Libraries in this file: none"). All of them are ported onto GSAP and the rest of the stack, so none adds a dependency:

| Effect | In the prototype | In the React build |
| --- | --- | --- |
| SignFlicker, Vault, PasteUp | WAAPI | GSAP timelines |
| BoardReveal | IntersectionObserver + CSS | GSAP stagger with ScrollTrigger |
| RoleFlip | `requestAnimationFrame` scramble | the same scramble function, driven by a GSAP tween (saves 3.6 KB against the ScrambleText plugin, which scrambles rather than flips) |
| LetterHop, Rig tricks, FooterLanding | `requestAnimationFrame` tweens | GSAP timelines updating the rig's angles |
| GapLeap | `requestAnimationFrame` with a time scale | a GSAP timeline whose `timeScale` is tweened |
| RooftopRun | a custom scroll handler | ScrollTrigger `pin` + `scrub` |
| SkylineGen, SpotMap, TornEdge, MiniBuilding | seeded SVG at runtime | the same seeded functions, rendered at build time |
| SpotPanel, NavMenu, CopyEmail, HeaderState | custom DOM code | components with `Dialog`, `useFocusTrap`, `useCopyToClipboard` and `useInView` |

**Development dependencies** (installed in task 3.2, never shipped):

| Area | Packages |
| --- | --- |
| Build | `vite`, `@vitejs/plugin-react`, `typescript`, `sass`, `@types/react`, `@types/react-dom`, `@types/node` |
| Lint and format | `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `eslint-plugin-simple-import-sort`, `eslint-config-prettier`, `prettier` |
| Tests | `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/dom` (its required peer), `@testing-library/user-event`, `@testing-library/jest-dom` |
| Commits | `@commitlint/cli`, `@commitlint/config-conventional`, `simple-git-hooks` (as in ashen-contracts) |
| Lighthouse | `@lhci/cli` (added in task 3.3, [DECISIONS.md](DECISIONS.md) #006) |

Versions are exact in `package.json` and locked in `pnpm-lock.yaml`. Two are held back by their peers (checked on 29.10.2026): TypeScript stays on 6.0 because `typescript-eslint` 8 supports TypeScript below 6.1 (7.0 is out), and ESLint stays on 9 because `eslint-plugin-jsx-a11y` 6 supports ESLint up to 9 (10 is out). `pnpm-workspace.yaml` runs no install scripts.

The package manager is pnpm, as in ashen-contracts. When this file is approved, these development tools are approved too. Any package beyond the two lists still needs Rafał's yes first (brief section 3).

**Considered and not used:**

- `three` and React Three Fiber: no 3D in v1 (#001).
- `motion` and React Bits components: no effect needs them.
- `focus-trap` and `clsx`: each is a few lines of our own code.
- `react-router`: one page. `ROUTES` and the pre-render loop are ready for a second one.
- `vite-react-ssg` and Astro: see #003.

## 13. JavaScript budget and code splitting

The budget is **initial JS ≤ 150 KB gzipped** (brief section 8). Initial JS means the entry chunk and everything it imports statically, which is what the browser must download before the page is interactive.

| Chunk | Contents | Estimate (gzip) |
| --- | --- | --- |
| Entry | React, React DOM, the content, the static components | ~85–90 KB |
| Motion core | GSAP, ScrollTrigger, `@gsap/react`, Lenis, `motion/` | ~55 KB, loaded when the browser is idle after hydration |
| Per-section motion | each folder in `src/motionComponents/` (career run, leap, footer landing, …) | a few KB each, loaded when allowed and near the viewport |

The estimate for our own code follows the prototype's script: 18.8 KB gzipped with all of its content.

**What is lazy-loaded:**

- every motion component, through `MotionLayer` and `React.lazy`,
- the career run only from 900 px, so phones never download it,
- anything else task 3.16 finds worth splitting.

**Rules that keep splitting working:**

- A lazy module is imported only through `import()`. Nothing imports it statically and no `index.ts` re-exports it (section 4).
- Lazy components never render during pre-rendering. Their static version is the HTML.
- A chunk the visitor will soon need can be preloaded on hover or focus (for example the motion core when the page becomes idle), but it is never added to the entry.

## 14. Testing

Vitest and React Testing Library, light as in the brief, and aimed where a bug would hurt.

| What | How |
| --- | --- |
| Pure functions (`.utils.ts`, seeded random, rig pose blending, sorting jobs, email assembly) | unit tests, written first (the `tdd` skill from task 3.2) |
| Content | a test that every id is unique, every link is absolute or a known file, and every `null` is a listed `TODO` |
| Sections | render each section from fixture content; check headings, landmarks and labels by role, not by class |
| Reduced motion | with `prefers-reduced-motion: reduce` mocked, no motion component mounts and the static content is complete |
| Pre-rendering | a smoke test of `render('/')`: the HTML has the `h1`, the meta tags and every section, and does not contain the email address |
| Breakpoints | the SCSS and TypeScript values match (section 8) |
| Design tokens | no CSS Module uses a raw value that has a token (section 8) |

Tests that read files with Node (`node:fs`) live in `scripts/`. The code in `src/` has no Node types, because it also runs in the browser, and Vitest replaces every stylesheet with an empty stub, so a test in `src/` cannot read SCSS.

Tests sit next to the file they test and query the DOM by role and accessible name. Snapshot tests are not used: they break on every change and protect nothing.

## 15. How the rules are enforced

Set up in task 3.2. The `.claude/rules/` file for `src/**` points to this document instead of copying it.

| Rule | Enforced by |
| --- | --- |
| Strict types, no `any`, exhaustive `switch`, `import type` | `tsconfig` (section 5) and `typescript-eslint` `strictTypeChecked`, `stylisticTypeChecked`, `switch-exhaustiveness-check`, `consistent-type-imports` |
| Return types everywhere, callbacks included | `@typescript-eslint/explicit-function-return-type` (with `allowTypedFunctionExpressions: false`), `explicit-module-boundary-types` |
| Annotated variables and parameters; hook type arguments | `no-restricted-syntax`: a variable with a plain name (except an `as const` value, whose type the union is derived from; section 5), or a parameter, without a type annotation, and `useState`, `useRef`, `useReducer` or `createContext` without a type argument; `no-inferrable-types` off. The older `typedef` rule is deprecated in typescript-eslint, so it is not used |
| Types only in `.types.ts` | `no-restricted-syntax` on `type` and `interface` declarations in every other file |
| `type`, not `interface`; no casts | `consistent-type-definitions: type`, `consistent-type-assertions` |
| Names (PascalCase, `use`, `is`/`has`, UPPER_SNAKE) | `@typescript-eslint/naming-convention` |
| No magic numbers | `@typescript-eslint/no-magic-numbers` (0, 1 and −1 allowed). Off in `.constants.ts` files, where numbers get their names and data tables live, and in tests, which check concrete values |
| No hard-coded copy | `no-restricted-syntax` on text inside JSX and on string literals in `aria-label`, `alt` and `title` |
| No HTML tags in pages and section roots | `no-restricted-syntax` on lowercase JSX elements in `src/pages/**` and `src/sections/**` |
| Named exports only | `no-restricted-syntax` on `export default` (config files excepted) |
| Import direction; content data only in pages; no static import from `src/motionComponents/` | `no-restricted-imports` per folder |
| Import order | `simple-import-sort` |
| Hooks, accessibility | `react-hooks` (recommended), `jsx-a11y` (strict) |
| No raw values in CSS Modules | `scripts/cssModules.test.ts` (section 8) |
| File size | `max-lines`: 150 lines without blank lines and comments, as an error |
| Functions as declarations | `func-style: declaration` |
| Formatting | Prettier, the same config as ashen-contracts, run on every file the agent edits (the `PostToolUse` hook in `.claude/hooks/formatEditedFile.mjs`). Markdown is not formatted: the docs are hand-edited, and aligning a table rewrites all of it for a one-cell change |

## 16. Sources

Researched on 29.10.2026:

- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills): `react-best-practices` and `composition-patterns` (MIT). Most of the 70 performance rules target Next.js and server components. The ones that apply here are taken over above: dynamic imports for heavy code, loading modules only when needed, preloading on hover or focus, deriving state instead of syncing it with effects, no components inside components, stable callbacks, explicit variants over boolean props, and no `forwardRef` in React 19. Its rule against barrel files is answered by the `index.ts` rules in section 4. The skills are not installed: most of their content does not apply.
- [mattpocock/skills](https://github.com/mattpocock/skills): `codebase-design` (deep modules, small interfaces) informs principle 13; `tdd` is installed in task 3.2.
- [typescript-eslint `typedef`](https://typescript-eslint.io/rules/typedef/): deprecated, hence the `no-restricted-syntax` rule in section 15.
- [ashen-contracts](https://github.com/rafalciecwierz/ashen-contracts): file suffixes, `index.ts` without self-imports, Prettier, commitlint and simple-git-hooks.
- [Vite: Server-Side Rendering](https://vite.dev/guide/ssr): the server build and the pre-render step in section 2.
