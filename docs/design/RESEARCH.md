# Design research

Research for roadmap task 2.1 (October 2026). It has one job: give us a shared vocabulary, so we can name the design directions we want to explore in the discovery session (2.2) and the direction briefs (2.3).

How to use it:

1. Skim the **style glossary** (section 2). Open the example links for any style that sounds interesting.
2. Note the styles you like, and the ones you dislike. Both are useful.
3. Read **what each audience responds to** (section 4) before choosing: a direction has to work for recruiters too, not only for studios.

Every link was checked to load in October 2026. Live sites get redesigned, so an example may look different from its description later.

---

## 1. The design climate in 2026

What the trend reports agree on, in plain words:

- **A backlash against the "AI look".** AI site builders made a lot of websites look alike: tasteful, polished and forgettable ("AI slop"). Designers are pushing back with work that looks made by a person: hand-drawn marks, texture, real photos and imperfection on purpose. Landor calls it "anti-AI crafting". [Creative Bloq](https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026), [noqta](https://noqta.tn/en/blog/ai-design-slop-overused-ui-patterns-fix-2026)
- **Typography is the hero.** Big, expressive type now carries a site's identity, often instead of images. [Figma](https://www.figma.com/resource-library/web-design-trends/), [Graphic Design Junction](https://graphicdesignjunction.com/2026/08/did-the-2026-web-design-trends-predictions-come-true/)
- **Boldness, but in one place.** Maximalism and loud colour work best in the hero or one section, while the rest stays readable ("soft maximalism"). [Graphic Design Junction](https://graphicdesignjunction.com/2026/08/did-the-2026-web-design-trends-predictions-come-true/)
- **Retro and bright colour are back:** Y2K, the 1980s and saturated "dopamine" palettes. [Wix](https://www.wix.com/blog/web-design-trends)
- **Neubrutalism and bento grids** are the most-cited layout styles. [DesignRush](https://www.designrush.com/agency/website-design-development/trends/web-design-trends), [GoDaddy](https://www.godaddy.com/resources/skills/web-design-trends)
- **Losing momentum:** too much glassmorphism, 3D used only as decoration, auto-playing video, over-complicated scroll animations, hidden navigation and generic AI landing-page templates. [Graphic Design Junction](https://graphicdesignjunction.com/2026/08/did-the-2026-web-design-trends-predictions-come-true/)

### The "AI look" to avoid by accident

Anthropic's `frontend-design` skill (in `.claude/skills/`) lists the traits that make a page read as AI-generated:

- a cream background with a serif headline and a terracotta accent;
- **a near-black background with a single acid-green accent;**
- newspaper-style hairline rules and dense columns;
- identical rounded cards with the same soft shadow;
- small monospace labels, ALL-CAPS eyebrows above headings, `A · B · C` meta lines, and `→` on every button.

Prototype 01 uses several of these (dark plus green, mono labels, middle dots, arrows). That doesn't disqualify it. Any of these can be a deliberate choice. It only means a viewer who has seen many AI-built sites may recognise the pattern. Each new direction should either avoid these traits or use them on purpose.

---

## 2. Style glossary

Each entry says what the style is, how to recognise it, where to see it, and how it fits this portfolio. Styles combine: a site can be "brutalist + kinetic type + bento grid".

The groups go roughly from calm to loud, and from flat to immersive.

### 2.1 Calm and clean

**Minimalism (text-first)**

- **What it is:** Almost nothing but text, space and one font, with no decoration. The content and writing do all the work.
- **Recognise it by:** a single column, plain links and very fast loading.
- **Examples:** [leerob.com](https://leerob.com), [paco.me](https://paco.me)
- **Fit:** Tech leads respect it, and it's the easiest to make fast and accessible. Risk: it shows little frontend craft unless small interaction details carry it.

**Interaction-craft minimalism**

- **What it is:** Minimal layouts where the craft is in tiny, perfect details: how a menu opens, how a button presses, how a list reorders.
- **Recognise it by:** quiet pages that feel unusually good to click.
- **Examples:** [rauno.me](https://rauno.me), [emilkowal.ski](https://emilkowal.ski)
- **Fit:** Very strong signal to engineers and design-minded teams. Hard to do well: the details must be excellent.

**Editorial / magazine**

- **What it is:** Layouts borrowed from print magazines: big headlines, generous margins, columns, pull quotes and a strong typographic hierarchy.
- **Recognise it by:** reading like a feature article rather than an app.
- **Examples:** [itsnicethat.com](https://www.itsnicethat.com), [readymag.com](https://readymag.com)
- **Fit:** Good for telling a career story (QA → developer → team lead). Note that broadsheet-style hairline rules are on the "AI look" list.

**Swiss / International Typographic Style**

- **What it is:** 1950s Swiss graphic design: a strict grid, sans-serif type, alignment as decoration, black, white and one colour.
- **Recognise it by:** everything snapping to a visible grid, oversized type and asymmetric but orderly layouts.
- **Examples:** [signal-a.studio](https://signal-a.studio) (Awwwards Site of the Day, October 2026: justified mixed serif and sans headlines on white), [swissted.com](https://www.swissted.com), [pentagram.com](https://www.pentagram.com)
- **Fit:** Looks rigorous, which suits an engineer who cares about systems and design systems.

**Quiet luxury / gallery**

- **What it is:** An off-white page, lots of empty space, small type and large images, like a fashion brand or an art gallery.
- **Recognise it by:** restraint, slow and smooth transitions, and a signature or monogram logo.
- **Examples:** [brandonyasin.com](https://brandonyasin.com) (Awwwards Site of the Day, October 2026)
- **Fit:** Elegant, but it depends on strong imagery, which a developer portfolio mostly lacks. It would need a different "image", such as live UI or 3D.

### 2.2 Loud and bold

**Brutalism**

- **What it is:** From "béton brut", raw concrete. A deliberately raw, unpolished web: default fonts, visible structure and broken conventions. It confronts the viewer.
- **Recognise it by:** system fonts, harsh contrast, and layouts that look unfinished on purpose.
- **Examples:** [brutalistwebsites.com](https://brutalistwebsites.com) (a gallery)
- **Fit:** Memorable and anti-AI by nature. Risk: recruiters may read "raw" as "unfinished", and usability suffers easily.

**Neubrutalism (neo-brutalism)**

- **What it is:** Brutalism made friendly and usable: thick black outlines, hard offset shadows with no blur, flat bright colour blocks and chunky type.
- **Recognise it by:** sticker-like cards and buttons with a solid shadow, in yellow, lime, cyan or pink.
- **Examples:** [neobrutalism.dev](https://neobrutalism.dev), [feastables.com](https://feastables.com)
- **More:** [Bejamas: neubrutalism explained](https://bejamas.com/blog/neubrutalism-web-design-trend)
- **Fit:** Playful and confident, and cheap to render (no 3D). Now very common, so it needs a personal twist.

**Maximalism / soft maximalism**

- **What it is:** More is more: many colours, patterns, layered elements and big images. "Soft" maximalism keeps the excess to the hero or one section.
- **Recognise it by:** the feeling that every corner has something going on.
- **Examples:** [cosmos.so](https://www.cosmos.so) and [are.na](https://www.are.na) are good places to collect maximalist references.
- **Fit:** Shows confidence and range. Risk: it can bury the CV content that recruiters need first.

**Anti-design**

- **What it is:** Breaking design rules on purpose: clashing colours, overlapping text, odd cursors, chaos as a statement.
- **Recognise it by:** "is this broken?", followed by "oh, it's intentional".
- **Fit:** Polarising. Studios may love it, recruiters may bounce. It could be used as one hidden layer (an easter egg) rather than the whole site.

**Retro / Y2K / dopamine colour**

- **What it is:** Nostalgia. Y2K means the late 1990s and early 2000s: chrome, bubbles, glossy buttons and pixel fonts. "Dopamine" means saturated, joyful colour.
- **Recognise it by:** chrome text, pixel or bubble fonts, and loud gradients.
- **Examples:** [Space Jam 1996](https://www.spacejam.com/1996/) (the original), and [CARI](https://cari.institute), a research archive that names hundreds of these aesthetics.
- **Fit:** Fun and personal. It needs care to still look professional.

**Kinetic typography**

- **What it is:** Type that moves: letters that scramble, stretch, follow the cursor or react to scroll. The text itself is the visual.
- **Recognise it by:** headlines that animate, distort or reassemble.
- **Examples:** [Awwwards kinetic-type collection](https://www.awwwards.com/inspiration/kinetic-typography-page-transition), [Digital Silk overview](https://www.digitalsilk.com/web-design/web-trends/kinetic-typography/)
- **Fit:** Typography as hero is the strongest 2026 trend, and GSAP is in our stack. It has to stay readable and respect reduced motion.

### 2.3 Tactile and human

**Hand-drawn / scribble ("anti-AI crafting")**

- **What it is:** Pen strokes, doodles, handwriting, arrows drawn by hand and sketchy underlines layered over a clean site.
- **Recognise it by:** marks that look made by a hand, not generated.
- **Examples:** [joshwcomeau.com](https://www.joshwcomeau.com) (whimsical, hand-made feel), [lynnandtonic.com](https://lynnandtonic.com) (Lynn Fisher redesigns her site every year, often with playful hand-made details)
- **Fit:** The clearest answer to the "AI look". Personal and warm. It needs real drawings, which are custom work.

**Texture, grain and print**

- **What it is:** Paper grain, noise, halftone dots and risograph-style colour misprints: the web made to look printed.
- **Recognise it by:** a faint grain over everything, and colours that look slightly off-register.
- **Fit:** Cheap to add (CSS or SVG noise) and warms up any style. Too much of it hurts contrast.

**Skeuomorphism / tactile hardware**

- **What it is:** Interfaces that imitate real objects: knobs, switches, screens and materials. A softer, modern version is trending again.
- **Recognise it by:** buttons that look physically pressable, and product-like UI.
- **Examples:** [teenage.engineering](https://teenage.engineering) (hardware-inspired), and [NN/g on skeuomorphism](https://www.nngroup.com/articles/skeuomorphism/)
- **Fit:** A site that behaves like a physical device (an amp, a control panel) is memorable, but it takes a lot of custom work.

**Claymorphism**

- **What it is:** Soft, puffy, clay-like 3D shapes with inner shadows. Friendly and toy-like.
- **More:** [Hype4: claymorphism](https://hype4.academy/articles/design/claymorphism-in-user-interfaces)
- **Fit:** It reads as playful and consumer-focused. Probably too cute for this brief.

**Collage / zine**

- **What it is:** Cut-out images, torn paper, stickers and mixed fonts, like a self-made magazine.
- **Fit:** Very personal, and it could tell the "outside of code" story (parkour, music). Hard to keep readable on mobile.

### 2.4 Material and light

**Glassmorphism / Liquid Glass**

- **What it is:** Frosted, translucent panels that blur what's behind them. Apple's 2025 "Liquid Glass" adds light refraction and moving highlights.
- **Recognise it by:** see-through blurred cards and glossy edges.
- **Examples:** [Apple HIG: materials](https://developer.apple.com/design/human-interface-guidelines/materials), [NN/g on glassmorphism](https://www.nngroup.com/articles/glassmorphism/)
- **Fit:** Prototype 01's FluidGlass lens is a refracting, WebGL version of this. Note that "excessive glassmorphism" is on the 2026 losing-momentum list. One hero moment works; glass everywhere doesn't.

**Dark premium**

- **What it is:** Near-black backgrounds, a single bright accent, crisp type and a calm, expensive feel. This is the brief's original direction (section 7) and prototype 01.
- **Fit:** Looks professional and suits WebGL. As noted in section 1, dark plus one acid accent is a recognised AI default, so it needs a distinctive detail.

**Gradient mesh / aurora**

- **What it is:** Soft, blurred, slowly moving colour blobs as a background.
- **Fit:** Easy and pretty, but very common in SaaS and AI products.

### 2.5 Immersive and interactive

**WebGL / immersive 3D**

- **What it is:** The page is a real-time 3D scene (Three.js). You move through it, and objects react to the cursor and to scrolling.
- **Recognise it by:** depth, lighting, particles, and a short load before the scene appears.
- **Examples:** [igloo.inc](https://www.igloo.inc) (Awwwards Site of the Year 2024), [lusion.co](https://lusion.co), [activetheory.net](https://activetheory.net)
- **Fit:** Exactly what creative studios hire for, and React Three Fiber is in our stack. Risk: performance on phones, and the 2026 fatigue with "3D as decoration". The 3D needs a purpose.

**Playable portfolio (game-like)**

- **What it is:** The portfolio is a small game: drive, walk or play to discover the content.
- **Examples:** [bruno-simon.com](https://bruno-simon.com) (drive a toy car around a 3D world; the best-known developer portfolio of this kind)
- **Fit:** Unforgettable for studios. Recruiters need a "skip to CV" exit within one click. It is also a lot of work in a two-weekend time box.

**Scrollytelling**

- **What it is:** A story told by scrolling. Each scroll step changes a graphic, reveals a chapter or advances an animation, like an interactive news feature.
- **Examples:** [pudding.cool](https://pudding.cool), and Apple product pages such as [apple.com/iphone](https://www.apple.com/iphone/)
- **Fit:** A natural fit for the career timeline (QA → developer → team leader), and GSAP ScrollTrigger is in the stack. It needs restraint: "over-complicated scroll animations" are losing favour.

**Desktop / OS metaphor**

- **What it is:** The site looks like an operating system: windows, a dock, icons, a fake desktop. Projects open as "apps".
- **Examples:** [henryheffernan.com](https://henryheffernan.com) (a 3D computer with a working OS on its screen), [dustinbrett.com](https://dustinbrett.com) (a full desktop environment in the browser), [poolsuite.net](https://poolsuite.net) (retro Mac style)
- **Fit:** Fun, and it shows real frontend engineering (window management and state). Clichéd if done half-way, and weak on mobile unless it is redesigned for touch.

**Terminal / CLI**

- **What it is:** The site is a command line: you type `about` or `projects`.
- **Fit:** Instantly says "developer", but it is the most-copied developer portfolio idea, and it is hard for recruiters. Better as a hidden easter egg than as the main interface.

**Creative coding / generative**

- **What it is:** Visuals drawn by code: flow fields, particles, shaders and patterns that are different on every visit.
- **Examples:** [jhey.dev](https://jhey.dev) and [cassie.codes](https://www.cassie.codes) (playful CSS and SVG animation), [Codrops](https://tympanus.net/codrops/) (tutorials)
- **Fit:** Shows craft directly. It works as a hero background or a section accent.

### 2.6 Layout patterns

These combine with any style above.

| Pattern | What it is | Example |
| --- | --- | --- |
| **Bento grid** | Content in a grid of boxes of different sizes, like a Japanese bento lunch box. | [bentogrids.com](https://bentogrids.com) |
| **Broken grid / asymmetry** | Elements deliberately overlap or break out of the columns. | Common on [Awwwards portfolios](https://www.awwwards.com/websites/portfolio/) |
| **Horizontal scroll** | A section that scrolls sideways while you scroll down. | Common in studio sites |
| **Split screen** | Two halves: one fixed (for example the name), one scrolling. | [brittanychiang.com](https://brittanychiang.com) |
| **Single column** | One narrow reading column. | [leerob.com](https://leerob.com) |

### 2.7 Motion vocabulary

Names for effects we'll mention in direction briefs:

| Term | Meaning |
| --- | --- |
| **Micro-interaction** | A small reaction to an action: a button press, a toggle, a copy confirmation. |
| **Magnetic button** | A button that pulls slightly towards the cursor. Made famous by [dennissnellenberg.com](https://dennissnellenberg.com). |
| **Smooth scroll** | Inertia-based scrolling (Lenis), which feels softer than native. |
| **Scroll-triggered / scrubbed** | An animation that plays when a section enters the viewport, or that moves exactly with the scrollbar ("scrub"). |
| **Page / section transition** | An animated change between views. |
| **Custom cursor** | A cursor replaced by a shape that reacts to what it hovers. |
| **Marquee / ticker** | Text scrolling endlessly sideways (prototype 01's ScrollVelocity rows). |
| **Text scramble / decrypt** | Letters cycling through random characters before settling. |
| **Parallax** | Layers moving at different speeds to suggest depth. |
| **Preloader** | An intro animation while assets load. Recruiters dislike it when it delays the content. |

---

## 3. Portfolios worth learning from

### Developers

| Who | Style | What to learn |
| --- | --- | --- |
| [Bruno Simon](https://bruno-simon.com) | Playable 3D | How far a portfolio can go, and how to offer a simple fallback. |
| [Brittany Chiang](https://brittanychiang.com) | Dark minimal, split screen | Clear hierarchy: name, role, experience and projects, readable in seconds. Widely copied, so it's a "classic" to diverge from. |
| [Josh W. Comeau](https://www.joshwcomeau.com) | Whimsical, hand-made | Personality through small, delightful interactions. |
| [Lynn Fisher](https://lynnandtonic.com) | Yearly redesign, playful CSS | Treating the site itself as the experiment. |
| [Rauno Freiberg](https://rauno.me) | Interaction craft | Quality of small details over big effects. |
| [Emil Kowalski](https://emilkowal.ski) | Motion craft | Animation that feels right: timing, easing, purpose. |
| [Paco Coursey](https://paco.me) | Extreme minimalism | Confidence through restraint. |
| [Cassie Evans](https://www.cassie.codes) | Playful SVG and GSAP | Character animation with GSAP, our stack. |
| [Jhey Tompkins](https://jhey.dev) | Creative CSS | Clever, lightweight effects without heavy libraries. |
| [Henry Heffernan](https://henryheffernan.com) | 3D computer and OS | Combining 3D with a usable interface. |
| [Dustin Brett](https://dustinbrett.com) | Desktop OS in the browser | Engineering depth shown through the site itself. |
| [Robin Noguier](https://robin-noguier.com) | Motion-led creative developer | Studio-level motion in a personal portfolio. |
| [Dennis Snellenberg](https://dennissnellenberg.com) | Smooth motion, magnetic UI | Polished micro-interactions that many studios imitate. |

### Studios and award winners

| Who | Style | What to learn |
| --- | --- | --- |
| [Igloo Inc.](https://www.igloo.inc) | Immersive WebGL | The 2024 benchmark for WebGL storytelling. |
| [Lusion](https://lusion.co) | WebGL studio | Purposeful 3D with high-end lighting. |
| [Active Theory](https://activetheory.net) | Immersive experiences | Interactive 3D at scale. |
| [Locomotive](https://locomotive.ca) | Smooth scroll, editorial | The studio behind the Locomotive Scroll library. |
| [Signal-A](https://signal-a.studio) | Swiss typographic | A type-only hero that still feels premium (October 2026 Site of the Day). |
| [Brandon Yasin](https://brandonyasin.com) | Quiet luxury | Restraint and space (October 2026 Site of the Day). |

### Galleries for browsing

- [Awwwards: portfolios](https://www.awwwards.com/websites/portfolio/) and [Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/): award-winning work, the creative-studio benchmark
- [Godly](https://godly.website): curated, motion-heavy sites
- [Hoverstates](https://www.hoverstat.es): experimental and odd
- [Minimal Gallery](https://minimal.gallery), [curated.design](https://curated.design), [One Page Love](https://onepagelove.com): calmer and single-page
- [Dark Mode Design](https://www.darkmodedesign.com): dark sites only
- [Brutalist Websites](https://brutalistwebsites.com): brutalism
- [Typewolf](https://typewolf.com), [Fonts In Use](https://fontsinuse.com): typeface pairings
- [Laws of UX](https://lawsofux.com): the usability principles behind design rules

---

## 4. What each audience responds to

The brief names three audiences. They want different things, and a direction has to serve all three.

### Recruiters (non-technical, often on a phone, 10–90 seconds)

- **Clarity first.** Within seconds they need who you are, your role and headline stack, and how to contact you. Estimates of total viewing time range from about 10 seconds on the homepage to 30–90 seconds overall. [devplaybook](https://devplaybook.cc/blog/developer-portfolio-checklist-20-things-hiring-managers), [scale.jobs](https://scale.jobs/blog/portfolio-content-for-tech-jobs-what-recruiters-want)
- **Contact and CV in one click**, ideally both in the hero and in the footer.
- **Speed and mobile.** The page should load in about 2 seconds, and be tested on iOS Safari and Android Chrome.
- **Nothing in the way.** Preloaders, intros and "scroll to discover" heroes cost them the few seconds they have. Heavy motion before content loads is a common mistake. [GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-portfolio)

### Tech leads and engineers (open DevTools and the repo)

- **Evidence over polish.** They look for decisions and trade-offs (state, performance, accessibility, maintainability), personal ownership ("what *you* did"), and quality proof such as tests, measurements and a README. [GreatFrontEnd](https://www.greatfrontend.com/blog/frontend-developer-portfolio)
- **Specific beats impressive.** "Raised unit test coverage from 11% to over 80%" is stronger than "optimised the app". Never invent impact.
- **The site is a code sample.** Semantic HTML, no console errors, a good Lighthouse score and a clean repo all count. Our `docs/AI_USAGE.md` and `docs/DECISIONS.md` are part of that.
- **Avoid generic copy** that could describe anyone, such as "creating beautiful digital experiences".

### Creative studios (judge motion, detail and originality)

- **Motion quality:** easing, timing, 60 fps and no jank. One great interaction beats ten average ones.
- **Originality:** they recognise templates and unmodified library components instantly. That includes React Bits defaults, so every borrowed effect needs our own tuning.
- **Craft in the details:** typography, transitions, hover states and how the site behaves on resize.
- **A memorable moment:** something they'd send to a colleague. Award galleries (Awwwards, Godly) are their reference point.

### Where they conflict, and how to resolve it

| Conflict | Resolution |
| --- | --- |
| Studios want spectacle; recruiters want instant clarity. | **Content first, effect second.** The name, role and CTAs render as HTML immediately; the effect loads behind or after them (the brief already requires this). |
| Immersive 3D vs. mobile speed. | Progressive enhancement: a strong static design that the 3D *adds to*, with a fallback that still looks designed. |
| Bold style vs. readability. | Spend the boldness in the hero or one section, and keep the CV parts (career, stack, contact) plain and scannable. |
| Playful vs. professional. | Personality in the details (micro-interactions, copy, one easter egg), professionalism in structure and content. |

---

## 5. What this means for the new directions

Inputs for tasks 2.2 and 2.3. Nothing here is decided yet.

- **Spread them across the map.** Prototype 01 is *dark · immersive WebGL · motion-heavy*. The new ones should each take a clearly different position on these axes:
  - calm ↔ loud
  - flat ↔ tactile ↔ immersive
  - light ↔ dark
  - type-led ↔ image or 3D-led
  - serious ↔ playful
- **Use Rafał's real story as raw material.** These are what make a design specific instead of generic:
  - the QA → developer → team leader path,
  - design systems and Storybook,
  - micro-frontends,
  - real-time scoring,
  - parkour (movement, momentum, urban space),
  - climbing (routes, holds, the ascent).

  Bass guitar was dropped in the discovery session (see `DESIGN_PROFILE.md`).
- **Keep the brief's floor in every direction.** The name, role, Download CV and Get in touch visible immediately; the performance budget; reduced motion.
- **Decide "AI look" traits on purpose:** avoid them, or use them knowingly.

---

## 6. Rafał's shortlist (24.10.2026)

Rafał's reaction to the glossary, the starting point for task 2.2.

**Liked:**

| Style | Reaction |
| --- | --- |
| Editorial / magazine | Fine |
| Swiss / International Typographic Style | Really good |
| Quiet luxury / gallery | Nice, but unsure whether it fits a developer portfolio |
| Neubrutalism | Really good |
| Maximalism / soft maximalism | Fine |
| Kinetic typography | Interesting |
| Hand-drawn / scribble ("anti-AI crafting") | Very good |
| Claymorphism | Excellent |
| Material and light (whole group: glass, dark premium, gradients) | Great |
| Immersive and interactive (whole group: WebGL, playable, scrollytelling, OS, terminal, creative coding) | Excellent |

**Not picked:** text-first minimalism, interaction-craft minimalism, raw brutalism, anti-design, retro / Y2K, texture and print, skeuomorphism, collage / zine.

**No single direction yet, on purpose.** The goal of phase 2 is to see the portfolio in very different variants and experiment, for example:

- soft, friendly and warm, with pastel tones;
- bold and dark with an acid-green accent, like prototype 01.

**How the site should feel**, as a guide for every prototype: on arrival, it is obvious this is a **professional** who is also **creative and bold**. It can be **playful and positive**, and it is never boring.

---

## Sources

Trend reports (mostly from agencies and site builders, so treat their rankings as opinion):

- [Wix](https://www.wix.com/blog/web-design-trends)
- [GoDaddy](https://www.godaddy.com/resources/skills/web-design-trends)
- [DesignRush](https://www.designrush.com/agency/website-design-development/trends/web-design-trends)
- [Figma](https://www.figma.com/resource-library/web-design-trends/)
- [Bubble](https://bubble.io/blog/web-design-trends/)
- [Vistaprint](https://www.vistaprint.com/hub/web-design-trends)
- [The Digital](https://www.theedigital.com/blog/web-design-trends)
- [Buzz Interactive](https://www.itsbuzzinteractive.com/blog/top-web-design-trends)
- [Graphic Design Junction (review of 2026 predictions)](https://graphicdesignjunction.com/2026/08/did-the-2026-web-design-trends-predictions-come-true/)
- [Creative Bloq](https://www.creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026)
- [noqta: AI design slop](https://noqta.tn/en/blog/ai-design-slop-overused-ui-patterns-fix-2026)

Styles:

- [Bejamas: neubrutalism](https://bejamas.com/blog/neubrutalism-web-design-trend)
- [Digital Silk: kinetic typography](https://www.digitalsilk.com/web-design/web-trends/kinetic-typography/)
- [NN/g: glassmorphism](https://www.nngroup.com/articles/glassmorphism/)
- [NN/g: skeuomorphism](https://www.nngroup.com/articles/skeuomorphism/)
- [Hype4: claymorphism](https://hype4.academy/articles/design/claymorphism-in-user-interfaces)

Audiences:

- [GreatFrontEnd: frontend developer portfolio (2026)](https://www.greatfrontend.com/blog/frontend-developer-portfolio)
- [devplaybook: 20 things hiring managers look for](https://devplaybook.cc/blog/developer-portfolio-checklist-20-things-hiring-managers)
- [scale.jobs: what recruiters want](https://scale.jobs/blog/portfolio-content-for-tech-jobs-what-recruiters-want)
- [Elementor: web developer portfolio examples](https://elementor.com/blog/best-web-developer-portfolio-examples/)
