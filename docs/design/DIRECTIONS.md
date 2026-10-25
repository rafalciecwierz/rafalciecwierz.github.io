# Design directions

Eight directions for Rafał's portfolio, written for roadmap task 2.3. Each one becomes two HTML prototypes in task 2.4, a **dark** and a **light** variant.

**The two variants share only the style.** Each is an independent design: concept, hero, layout, section structure, typography, palette and effects are designed from scratch, and nothing is carried over from the other variant. Someone who sees both should recognise the shared style and nothing else. The "dark take" and "light take" lines below are starting moods, not a shared layout.

Read with:

- [DESIGN_PROFILE.md](DESIGN_PROFILE.md): who Rafał is, and the feel test every variant must pass (*professional, creative and bold, playful and positive, never boring*);
- [RESEARCH.md](RESEARCH.md): the style vocabulary used below;
- [PROJECT_BRIEF.md](../PROJECT_BRIEF.md): sections 4 (page structure), 5 (content) and 8 (the performance and accessibility budget).

Each direction has a **Status**: `proposed` → `approved` (by Rafał) → `built`. Approved directions are a starting point: they are refined while building (task 2.4), and every change is written back here.

Each built variant gets an **As built** block under its take: palette, type, layout, the hero moment, effects and what was left out. Read these before building a new prototype, so it does not repeat an earlier one. The HTML file is the reference for details; the block is the reasoning.

---

## The map

How the directions spread across the axes from the research. No two directions sit in the same place.

| # | Direction | Calm ↔ loud | Flat ↔ tactile ↔ immersive | Type-led ↔ image or 3D-led | Serious ↔ playful | Main styles |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Fluid Glass | medium | immersive (WebGL) | 3D | serious | dark premium, glass, WebGL |
| 02 | Swiss Signal | calm, with loud type | flat | type | serious, witty | Swiss, kinetic type |
| 03 | Clay Studio | medium | tactile 3D | 3D character | very playful | claymorphism, soft 3D |
| 04 | Sticker Sheet | loud | flat, tactile | mixed | very playful | neubrutalism, hand-drawn, bento |
| 05 | The Issue | calm | flat | type and image | serious | editorial, quiet luxury, scrollytelling |
| 06 | RalphOS | medium | interactive | interface | playful | OS metaphor, liquid glass |
| 07 | Field Notes | medium | immersive (generative) | code-drawn | creative | creative coding, kinetic, gradient light |
| 08 | Ascent | loud | immersive | 3D and type | playful | scrollytelling, kinetic, interests |

---

## Rules for every direction

- **The first screen:** name, role, tagline, **Download CV** and **Get in touch** are real HTML and visible immediately at 360 px and 1280 px, before any effect loads. The effect sits behind or around them, never in front.
- **Content:** brief section 5, plus the testimonials (5.6) where the direction uses them. New copy is allowed, but marked and listed (rules file).
- **Rafał's character:** built in code, or a stock placeholder. Never block on the real photo.
- **Fonts:** every typeface named below was checked to include Polish glyphs (`latin-ext`) on Google Fonts in October 2026. They are candidates: the builder may swap one, as long as the replacement includes Polish glyphs and the reason is stated.
- **Effects are enhancers, and the candidates below are suggestions.** Use what fits the style: many components, one, or none. Swap a candidate for something better from any source. Good sources:
  - [React Bits](https://reactbits.dev): component names below refer to it;
  - [GSAP plugins](https://gsap.com/docs/v3/Plugins/): all free since 2025, including SplitText, DrawSVG, MorphSVG, Physics2D, Inertia, Draggable and ScrollSmoother;
  - [Codrops](https://tympanus.net/codrops/) demos;
  - Three.js examples;
  - small focused libraries such as [Rough.js](https://roughjs.com) (hand-drawn shapes) or [Matter.js](https://brm.io/matter-js/) (2D physics).

  Check each effect's dependencies at build time. Prefer porting onto GSAP, Three.js or CSS over adding libraries (brief section 3), and list every dependency in the prototype header.
- **Never:** sound, a blocking preloader, Matrix or `{ }` decoration, generic stock illustrations (design profile section 7).

---

## 01 — Fluid Glass (`fluid-glass`)

**Status:** built (both variants). **Files:** `design/prototypes/01-fluid-glass-dark.html`, `design/prototypes/01-fluid-glass-light.html`.

**Shared by both variants:** only the style: glass, liquid and refracted light.

**Concept (dark take):** A premium, calm page with one spectacular moment: a refracting glass lens with the "RC" monogram floats over the hero and bends the name behind it. Everything else is quiet and precise, so the lens is the memorable thing.

**Styles (dark take):** dark premium, glassmorphism and Liquid Glass, WebGL, soft motion (React Bits heavy).

**Feel test (dark take):**
- *professional:* a clear structure and a calm palette;
- *creative and bold:* the glass lens;
- *playful:* ClickSpark, magnetic buttons, rotating role text;
- *never boring:* the hero.
- **Risk:** dark plus acid green is a known "AI look" trait (research, section 1). The lens is what makes it distinct.

**Dark take (exists):** near-black, acid green, Unbounded + Geist. Audit notes from task 1.2 are known issues to fix in React, not in the prototype.

**Light take (built): "Underwater".** The page is a glass tank of water seen from the side, and scrolling is a dive. A completely separate design from the dark take: no lens, no monogram, no shared layout, type or effects.

**Style drift (accepted by Rafał):** this take is about liquid rather than glass, so it reflects Fluid Glass only loosely. Rafał kept it as it is because it works on its own. Judge it in task 2.5 as a standalone design.

**As built (light), task 2.4:**
- **Palette:** sky `#F3FAFD` above the water; water `#D3F0F3` → `#BCE5EB` → `#A3D6E1`, deepening as you scroll; navy ink `#0F2340`, muted `#34506A`; rubber-duck yellow `#FFC531` for fills only (navy text on it).
- **Type:** Fraunces (soft, wonky variable serif, italics for voice) + Figtree (body). No other direction uses either.
- **Layout:** left-aligned single column with a fixed **depth gauge** as the navigation on wide screens (0 m at the surface, 30 m at Contact); a menu with depths and a depth chip below 1180 px. Sections: hero, About, Stack, Career ("dive log"), team quotes (new, after Career), Projects, Contact ("the bottom of the tank").
- **Hero moment:** the water line cuts through the surname: the top of the letters is crisp, the bottom wobbles under water. The cursor and taps make waves (a 64-spring simulation), a rubber duck rides them, and scrolling raises the water over the name.
- **Section forms:** stats as floating bubbles; skills as capsules sized by level that rise into place; career as a dive log with wavy dividers and a focus pull; quotes in slowly morphing liquid blobs; projects as specimen jars whose liquid level shows the status; a caustic floor behind Contact.
- **Effects:** WaterSurface (custom raw WebGL), WaveSim, RubberDuck, BubbleTrail, DepthGauge, DepthTint, LightRays, RisingBubbles, FocusPull, LiquidBlobs, SpecimenJars, CausticFloor (SVG filter), a console message. All custom.
- **Left out on purpose:** everything from the dark take (the RC lens, PillNav, StarBorder, Magnet, RotatingText, CountUp, bento cards, DotGrid, ClickSpark, VariableProximity), so the two variants share only the style.
- **Dependencies:** none. The React build needs no 3D library for this variant: the shader runs on a plain WebGL context in a small hook. GSAP (ScrollTrigger) is optional.

**Effects (dark take):** FluidGlass (custom WebGL in the prototype), ShinyText, RotatingText, StarBorder, Magnet, ScrollVelocity, MagicBento, SpotlightCard, ScrollReveal, DecryptedText, CountUp, VariableProximity, DotGrid, ClickSpark, PillNav.
- **Dependencies:** three.js (lazy-loaded in React).

---

## 02 — Swiss Signal (`swiss-signal`)

**Status:** built (both variants). **Files:** `design/prototypes/02-swiss-signal-dark.html`, `design/prototypes/02-swiss-signal-light.html`.

**Concept:** Rafał's name *is* the hero. It is set enormous on a strict, visible grid, in the tradition of 1950s Swiss posters. The type is alive: it changes width and weight as you scroll and move the cursor, and it reflows into the grid section by section. Ł and Ć become graphic marks: the stroke of the Ł extends into a grid line, and the acute accent of the Ć becomes the site's "signal" accent, used for active states and links. Serious structure, with a wink in the details.

**Styles:** Swiss / International Typographic Style, kinetic typography.

**Feel test:**
- *professional:* the grid discipline reads as "systems thinker", which fits his design-system work;
- *creative and bold:* giant moving type;
- *playful:* the letters react to the cursor, and the Ł and Ć marks have a life of their own;
- *never boring:* the type never sits still.

**Hero:** "RAFAŁ / CIEĆWIERZ" spans the viewport width, with the role and CTAs aligned to grid columns below. On scroll, the letters compress in width (the variable-font `wdth` axis) and slide into a smaller header lockup.

**Sections:**
- **Career:** numbered steps on the grid (the numbering is justified, because a career is a sequence), with promotions marked by the accent.
- **Stack:** a typographic table, with levels shown as type weight (strong = bold, medium = regular, low = light) plus a text label.
- **Projects:** a growing list of rows.
- **Contact:** the email set huge.

**Dark take:** black ground, off-white type, **cobalt blue** as the signal colour, and the grid lines glowing faintly. The night version is more cinematic: the type moves more, and the accent glows.

**As built (dark), task 2.4: "Night Grid".** The concept, hero and sections above belong to this variant; the light variant gets its own.
- **Palette:** black `#000000`, ink `#EDEBE6`, muted `#8E8C86`, cobalt `#2F5BFF` (fills, marks, large type; white on it is 5.2:1), light cobalt `#7B9BFF` for small text and links.
- **Type:** Archivo (variable `wdth` 62–125 and `wght`) for the name, headings, stack, quotes and buttons; Hanken Grotesk for body text.
- **Layout:** a 12/8/4-column grid whose column lines glow faintly and brighten around the cursor. Huge left-aligned section titles. Sections: hero, About, Stack, Career, "Signals" (team quotes, new, after Career, not in the nav), Projects, Contact.
- **Hero moment:** "RAFAŁ / CIEĆWIERZ" fitted to the grid by the width axis (RAFAŁ wide at about 4/5 of the width, CIEĆWIERZ narrower at full width). Letters swell towards the cursor (a tap pulse on touch). The Ł stroke runs out into a tapering grid line. On scroll the name compresses to its narrowest width and docks into the header as a two-line lockup; the Ć acute then hops out to mark the active nav link. When the name is width-limited (phones, portrait tablets), the hero hugs its content instead of filling the screen.
- **Section forms:** About lead with VariableProximity; stack as a real table (area × strong/medium/low) where weight is the level; career as numbered steps (04 → 01) on a grid column line that fills with cobalt on scroll, promotions in cobalt; quotes set large with acute-shaped quote marks; projects as rows whose names widen on hover; the email fitted to the grid width under a field of magnet lines that point at it.
- **Effects:** KineticName (custom, TextPressure ported in), SignalAccent, HeadingReveal (GSAP SplitText), StackReveal and CareerLine (GSAP ScrollTrigger), VariableProximity and MagnetLines (React Bits, ported), FitText, GridGlow, GridOverlay (`G` easter egg, also a footer button), console message.
- **Left out on purpose:** WebGL, Lenis smooth scroll, ScrollFloat, glass, bento cards and anything from prototype 01.
- **Dependencies:** GSAP 3.13 (ScrollTrigger, SplitText) only; the React build needs `gsap` + `@gsap/react`.

**Light take:** a white page, black type, **signal red-orange** as the accent, and printed-poster calm. Stricter and quieter, with motion limited to the hero and hover states.

**As built (light), task 2.4: "Plakat".** The page is a series of International Typographic Style posters printed on white paper (Müller-Brockmann's concert posters as the reference), with one geometric actor throughout: a red-orange signal disc. Nothing from "Night Grid" is reused: no Archivo, no width axis, no visible grid, no docking name, no Ł/Ć marks.
- **Palette:** paper `#FFFFFF`, ink `#000000`, grey `#626262`, pale `#EDEDED`; signal `#FF4000` for fills and large type only (ink on it is 6:1), deep signal `#C43000` for small marks and focus; navy `#1E2B4F` in the portrait only.
- **Type:** Schibsted Grotesk (400–900) as the only typeface, as on Swiss posters. Display type (the name, section titles) is heavy, tight and lowercase. No other direction uses this font.
- **Layout:** an invisible grid (6/2 columns) felt only through alignment: a section title in the narrow left column, content on the right, each section opened by a thick rule. Contact is the one inverted section (a full signal field). Sections: hero, About, Stack, Career, "From the team" (quotes, new, after Career, not in the nav), Projects, Contact.
- **Hero moment:** a poster composition: role and tagline at the top, the name fitted large at the bottom, CTAs below. A big signal disc bites into the name; the letters it covers knock out to white, and the letters at its edge step aside and tilt. The disc follows the mouse with a spring and settles into the nearest grid module when the cursor rests; on touch, a tap moves it.
- **Section forms:** About with a geometric Swiss-poster portrait (it winks on hover); stack as columns where the level is a shape (full disc, half disc, ring) plus a text label; career as a list where each job has a bar on a shared 2021–2026 time scale (the bar length is the job's real duration) and promotions get a signal disc; quotes in three columns under initial discs; projects as mini posters generated from the list (four layouts cycled by position, the shape moves on hover); the email fitted to the grid width on the signal field.
- **Effects:** SignalDisc, KnockoutName, LetterRepel, FitName, FitText, NavSignal, ProjectPosters, PortraitWink, PrintPoster (easter egg: printing the page gives a one-page A4 poster CV), MobileMenu, a console message. All custom.
- **Left out on purpose:** scroll-driven motion of any kind (the direction asks for motion only in the hero and hover states), GSAP, smooth scroll, the `G` grid overlay (the dark variant's easter egg) and everything else from "Night Grid".
- **Dependencies:** none. The React build needs nothing beyond React.

**Typography:** Archivo (variable width and weight, used for the kinetic type), Hanken Grotesk for the body.

**Effects:**
- custom kinetic type (GSAP + variable font axes);
- TextPressure (letters stretch towards the cursor);
- VariableProximity;
- ScrollFloat or SplitText-style reveals;
- MagnetLines in the grid background.
- **Dependencies:** none beyond GSAP. Very light, and the best performance of all directions.

**Easter egg:** pressing `G` toggles a visible "design grid overlay" with column numbers, like a designer's debug view.

**Mobile:** the name stacks on two lines at full width, and the grid collapses to 4 columns.

**Risk:** hairline rules and broadsheet density are on the "AI look" list. Use the grid as space and alignment, not as a mass of thin lines.

---

## 03 — Clay Studio (`clay-studio`)

**Status:** built (both variants). **Files:** `design/prototypes/03-clay-studio-dark.html`, `design/prototypes/03-clay-studio-light.html`.

**Shared by both variants:** only the style: claymorphism and soft, hand-made clay.

**Concept:** A soft, toy-like 3D world. In the hero stands **a little clay figure of Rafał**, made in Three.js from simple rounded shapes: swept-up hair, a smile, a navy blazer over a white T-shirt, arms crossed. He follows the cursor with his head and waves when the visitor clicks him. Every UI element is "clay": puffy, rounded, and squishing when pressed. It's the friendliest direction, built to make people smile in the first second.

**Styles:** claymorphism, soft 3D, playful interactions.

**Feel test:**
- *professional:* the content stays crisp and readable on calm surfaces;
- *creative and bold:* a self-made 3D character is unusual and shows real WebGL skill;
- *playful:* the figure, squishy buttons, and a ballpit of tech-logo balls;
- *never boring:* the figure reacts.

**Hero:** the clay figure on a soft pedestal, with the name in big rounded type next to it, and CTAs as chunky clay buttons that compress on press.

**Sections:**
- **Stack:** a ball pit of clay balls labelled with technologies. Strong items are bigger. The visitor can stir them with the cursor, and the full text list is always present.
- **Career:** clay "level-up" badges for the promotions.
- **Testimonials:** speech bubbles above smaller clay colleague figures.
- **Contact:** the figure holds a clay envelope.

**Dark take:** "toys at night": a deep plum and indigo room lit by warm lamps, with the clay glowing in saturated pastels like a night light. Cosy and magical.

**Changed while building (agreed with Rafał, task 2.4):** Rafał questioned whether a toy shelf shows a professional frontend engineer. Both variants are therefore *professional first*: humour stays in small details, and the copy and content blocks stay businesslike. The dark take became a photo studio after hours instead of a toy room.

**As built (dark), task 2.4: "After Hours".** Rafał is shown as a handmade designer collectible: a clay figure on a turntable pedestal against a seamless plum backdrop, lit by one warm key light. The concept, hero and sections above belong to this variant.
- **Palette:** plum backdrop `#1C1030`, clay panels `#2A1D47` / `#3A2A60`, warm light `#FFC98A` (buttons, role, links), pastels for clay only: pink `#FF9EC0`, mint `#8CE8CB`, lilac `#B9A4FF`, sky `#93CBFF`; text `#F7F0FF`, muted `#CBBDE6`, ink on pastel `#2A1640`.
- **Type:** Fredoka (display; the name has a stacked lilac "clay" extrusion) + Nunito (body).
- **Layout:** two-column hero (name and CTAs left, figure right; on phones the figure sits under the CTAs). Puffy clay panels with inner light and shadow. Sections: hero, About (text and three tilted fact tokens), Stack (ballpit with the grouped list beside it), Career (timeline groove that fills with light), "What the team said" (quotes, new, after Career, not in the nav), Projects, Contact (the figure holds an envelope).
- **Hero moment:** a procedural clay Ralph (38 meshes: spheres, capsules, a lathe pedestal, an extruded V-neck; a generated fingerprint bump map) turns his head to the cursor, blinks, breathes and sways on the turntable while the warm key light follows the cursor. Clicking him (or "Say hi") makes him wave with a speech bubble; 10 quick clicks give a parkour backflip. The caption counts his shapes at runtime ("no model files").
- **Section forms:** stack as a 2D ballpit (ball size = level, colour = group, stirred by the cursor) next to the full list grouped by level; career as clay panels on a groove that fills on scroll, with mint "Level up" badges for both promotions; quotes in cream speech bubbles above small SVG clay colleagues; projects as tilted clay cards with a generated clay composition per project (straighten with a spring on hover); contact with a second, non-interactive figure holding a clay envelope.
- **Effects:** ClayFigure with KeyLight and SpeechBubble (custom, three.js), Ballpit (inspired by React Bits, rewritten in 2D canvas), CareerTrack, ClayCards (inspired by BounceCards), SquishButton, ClayCrumbs (inspired by ClickSpark), NavPill, MobileMenu, console message.
- **Phones and reduced motion:** on small or touch screens the figure renders on demand (a still pose that animates only when tapped) at DPR ≤ 1.5 without shadows, and the ballpit is a pre-settled static cluster. Reduced motion: one static frame, no tracking, a lit groove, no crumbs. If WebGL or the module fails, a flat SVG figure is shown.
- **Left out on purpose:** the toy-room setting; Lenis smooth scroll; a physics engine; matcap textures (a procedural bump map does the job without an image); anything from 01 and 02.
- **Dependencies:** three@0.160.0 (jsDelivr, dynamic `import()`, so the text never waits). The React build needs `three` (or R3F + drei), lazy-loaded.

**Light take:** "studio in the morning": the warm pastels Rafał asked for (peach, butter yellow, mint, lilac) on a soft, warm-white set, with soft daylight shadows. Bright and happy.

**As built (light), task 2.4: "Morning Claymation".** A stop-motion animator's table on a sunny morning. Everything is plasticine, and motion runs the way claymation does: 12 frames per second with a slight "boil". No 3D and no figure in the hero (that is the dark variant's hero object); Rafał appears only as a flat clay portrait in About.
- **Palette:** table `#FFF9F2`; clay boards in peach `#FFC9AE`, butter `#FFE59C`, mint `#B7EBD7`, lilac `#D9CCF8`; ink `#2B2140`, muted `#5C5270`; the name in navy clay `#2F3C8F` (side `#1C2560`, like the blazer) with pink `#E04A74` loose marks; deep clay pink, blue, green and violet for the project initials only.
- **Type:** Baloo 2 (display, 500–800) + Onest (body). No other direction uses either.
- **Layout:** a typographic hero (the name fills the width, role and tagline bottom left, CTAs bottom right); sections as flattened clay boards with fingerprints pressed in. Sections: hero, About, Stack, Career, "Notes from the team" (quotes, new, after Career, not in the nav), Projects, Contact.
- **Hero moment:** the name modelled from clay letters, each tilted slightly as if placed by hand. Letters squash towards the cursor or finger and spring back, redrawn only on the 12 fps clock. The stroke of the Ł and the accent of the Ć are separate pink clay pieces that pop off when poked and fall back with a bounce. Morning window light falls across the table.
- **Section forms:** About with a flat SVG clay portrait that blinks; stack as trays (one per group) of rolled clay pieces, size and thickness by level, grouped under visible level labels, placed two per frame when a tray scrolls into view; career as a staircase of blocks (newest highest and furthest right on desktop) with an ink "Promoted" chip; quotes on plasticine notes pressed on with a pink thumbprint; projects as white modelling tiles with a pressed clay initial; contact with the email set large and a clay envelope that opens on hover or focus to show a ready "let's talk about a frontend role" mailto.
- **Effects:** StopMotion (one 12 fps clock cycling three SVG turbulence filters), ClayLetters, LooseMarks, ClayPortrait, PlaceOnTray, Thumbprint, ClayEnvelope, PressButton (stepped timing), MobileMenu, console message. All custom.
- **Changed from the first draft:** the letters were first a rainbow of clay colours; they read as a children's alphabet, so the name became one navy clay with pink marks (professional first).
- **Left out on purpose:** WebGL, the clay figure, the ballpit, speech bubbles, smooth scroll and everything from "After Hours".
- **Dependencies:** none. The React build needs nothing beyond React.

**Typography:** Fredoka (rounded display), Nunito (body).

**Effects:**
- a custom Three.js clay character and scene (rounded geometry with a soft physical material and matcap-style shading);
- Ballpit (React Bits) for the stack;
- BounceCards or Stack for the projects;
- squishy CSS buttons;
- ClickSpark with clay crumbs.
- **Dependencies:** three.js, with physics kept simple (Ballpit's own, no physics engine).

**Easter egg:** clicking the figure 10 times makes him do a parkour backflip.

**Mobile:** a static pose of the figure (a pre-rendered fallback), with the ballpit reduced to a static cluster.

**Risk:** "too cute". The copy and the content blocks must stay grown-up so the figure reads as craft, not as a children's site.

---

## 04 — Sticker Sheet (`sticker-sheet`)

**Status:** built (both variants). **Files:** `design/prototypes/04-sticker-sheet-dark.html`, `design/prototypes/04-sticker-sheet-light.html`.

**Shared by both variants:** only the style: neubrutalism (thick outlines, hard offset shadows, flat bright colour), Ralph's hand-drawn notes and stickers.

**Concept:** The portfolio as Rafał's sketchbook and sticker sheet. It has neubrutalist blocks (thick outlines, hard offset shadows, flat bright colour) arranged as a bento grid, covered in **hand-drawn notes from Ralph himself**: scribbled arrows, circled numbers, and margin comments such as "yes, really: 11% → 80% test coverage". Stickers can be peeled and dragged. It is loud, funny and human, the clearest "anti-AI" direction.

**Styles:** neubrutalism, hand-drawn / scribble, soft maximalism, bento grid.

**Feel test:**
- *professional:* the facts are big, clear and easy to scan in the bento layout;
- *creative and bold:* loud colour and a confident layout;
- *playful:* stickers, doodles and Ralph's comments;
- *never boring:* every block has a detail to discover.

**Hero:** a big outlined name card, with a sticker reading "call me Ralph" stuck on it at an angle. CTAs are chunky buttons with hard shadows that press down on click. A hand-drawn arrow points at Download CV.

**Sections:**
- **Stack:** bento tiles grouped by area, with levels as filled sticker stamps plus a text label.
- **Career:** a vertical strip of cards, with a hand-drawn line connecting them and scribbled "promoted!" stars.
- **Testimonials:** quotes as sticky notes taped to the page.
- **Projects:** polaroid-style cards.

**Dark take:** "neon zine at night": a charcoal ground, white outlines, electric blocks (hot pink, electric yellow, cyan) and a risograph-like glow. A night-market energy.

**As built (dark), task 2.4: "Night Zine".** A risograph zine printed at night: neubrutalist bento blocks on charcoal paper with a halftone dot screen, gone over with Ralph's yellow marker, with his sticker collection stuck around the blocks. The concept, hero and sections above belong to this variant.
- **Palette:** charcoal paper `#1F1E26`, blocks `#2A2933`, white outlines and text `#F5F3FA`, muted `#C5C2D3`; fluorescent inks for fills, shadows and marker: pink `#FF4FA3`, yellow `#FFE83D` (also the marker), cyan `#3DE3FF`; ink on neon `#17161C`; blue `#4A5BFF` in the portrait only.
- **Type:** Bricolage Grotesque (variable `opsz`/`wdth`/`wght`, condensed 800 for display, also the body) + Caveat Brush for the marker notes.
- **Layout:** a 12/6/1-column bento grid. The hero is a bento of a name card, a CTA card and four fact tiles. Sections: hero, About (text, portrait, "Outside of code"), Stack (one tile per group), Career (a vertical strip of cards on a hand-drawn line, margin notes beside them on wide screens), "Team notes" (quotes, new, after Career, not in the nav), Projects, Contact (one pink block).
- **Hero moment:** the name is printed in two riso plates (pink and cyan, blended with `screen`, so the overlap reads near-white); the cyan plate drifts out of register towards the cursor. A "call me Ralph" sticker is stuck on the card, and a marker arrow points at Download CV.
- **Section forms:** fact tiles (5+ years, 6 developers led, 2 promotions circled, 50+ components); a marker-and-riso-fill portrait; stack chips where the level is the fill (solid, hatched, dashed outline) under handwritten level labels; career cards with "promoted!" circles around the new role and margin comments ("yes, really: 11% → 80% test coverage"); quotes as taped sticky notes; projects as polaroids with a generated two-ink riso print; the email circled in marker.
- **Effects:** RisoPlates, Scribble (seeded marker paths), DrawOnScroll and FitScribbles (DrawSVG-style `stroke-dashoffset`), CareerLine (scrubbed), StickerPeel (inspired by React Bits StickerPeel: corner curls on hover, drag to move on desktop, tap to peel on touch), StickerBook (the easter egg: 9 stickers to peel into a `<dialog>` book; the full set opens it with the CV), HardPress buttons, RisoPortrait, PolaroidArt, console message. All custom.
- **Left out on purpose:** GSAP and Draggable (pointer events are enough), WebGL, smooth scroll, and anything from 01–03.
- **Dependencies:** none. The React build needs nothing beyond React (GSAP Draggable only if inertia is wanted).

**Light take:** "fresh sketchbook": a bright paper-white page with lime, sunshine yellow, sky blue and bubblegum pink blocks, black outlines and pencil-grey doodles. A summer-sticker energy.

**As built (light), task 2.4: "Fresh Sketchbook".** A sheet of die-cut stickers on white sketchbook paper. Every content block is a real sticker type with its own vernacular, and Ralph's notes are in pencil. Nothing from "Night Zine" is reused: no bento grid, no marker, no riso plates, no polaroids, no sticker book, no Bricolage or Caveat Brush.
- **Palette:** white paper `#FFFFFF` with a dot grid `#DCDCE2`; black `#000000` for outlines, text and hard shadows; pencil `#55555C`; lime `#B8F03C`, sunshine yellow `#FFD52E`, sky `#86CCFF`, bubblegum pink `#FF92CB`; glossy backing paper `#EAF5FF` with a printed grid and print `#3A6E9C`; label tape in black, deep pink, blue and green.
- **Type:** Gabarito (400–900, display and body) + Caveat (pencil notes) + Rubik Mono One (label-maker tape only).
- **Layout:** single column, no bento. Notebook divider tabs on the right edge are the navigation on wide screens (a Menu button below 1100 px). Section titles are die-cut label stickers. Sections: hero, About, Stack, Career, "Hello from the team" (quotes, new, after Career, not in the nav), Projects, Contact.
- **Hero moment:** the name is one big yellow die-cut sticker on glossy backing paper, with its corner already lifted. Dragging the corner peels it back along a real fold line, and the backing underneath has "call me Ralph" pencilled on it; on release it re-sticks with a spring.
- **Section forms:** a graphite pencil portrait (double strokes, hatching, a lime "R" sticker on the blazer) and round stickers for parkour and climbing; stack as small sticker sheets in columns, where the level is the sticker's size and fill under pencil level labels; career as label-maker tape (company, dates) beside lined index cards, promotions with a pencil star and a "promoted" tape; quotes on "HELLO my name is" badges; projects as numbered shipping labels with a generated barcode and a rubber status stamp; contact with the email as a pink pill sticker, a seal badge whose ring of text turns with scroll, and a wall where a click or tap sticks a sticker.
- **Effects:** PeelBack (fold-line geometry: clip-path plus a mirrored SVG flap), StickerSlap (stickers land as they scroll in), Pencil (seeded double strokes and an SVG graphite filter), DymoTape (CSS), Barcode, SealBadge (inspired by React Bits CircularText), StickerWall (the easter egg), IndexTabs, MobileMenu, console message. All custom.
- **Left out on purpose:** everything from "Night Zine" (see above), GSAP, smooth scroll, WebGL.
- **Dependencies:** none. The React build needs nothing beyond React.

**Typography:** Bricolage Grotesque (chunky, quirky), Caveat for Ralph's handwritten notes.

**Effects:**
- StickerPeel (draggable, peelable stickers);
- custom SVG hand-drawn strokes that draw themselves on scroll (GSAP DrawSVG-style, using `stroke-dashoffset`);
- MagicBento or a custom bento grid;
- hard-shadow press states in CSS.
- **Dependencies:** GSAP (+ Draggable). No WebGL. Light and fast.

**Easter egg:** collecting all the hidden stickers unlocks a "sticker book" page showing the full set.

**Mobile:** the bento grid becomes one column of cards, the stickers are fixed in place (no dragging), and the doodles are kept.

**Risk:** neubrutalism is very common in 2026. The hand-drawn layer by "Ralph" is what makes it personal, so it must not be dropped.

---

## 05 — The Issue (`the-issue`)

**Status:** approved.

**Concept:** The portfolio as a magazine issue dedicated to one person. The hero is a **cover**: a masthead, a cover line ("The frontend engineer who started in QA") and an issue number. Scrolling opens a feature story told in chapters (QA → Developer → Team Leader → What's next), with pull quotes from the team, drop caps and generous margins. It's the calmest, most "grown-up" direction, and it shows craft through typography and pacing rather than effects.

**Styles:** editorial / magazine, quiet luxury, scrollytelling.

**Feel test:**
- *professional:* very credible, like being profiled in a magazine;
- *creative and bold:* the cover concept and the confident typography;
- *playful:* witty cover lines, and the masthead name playing with Ł and Ć;
- *never boring:* the chapters pull the reader along.

**Hero:** the magazine cover. The name is the masthead, with cover lines as the role and tagline. CTAs: "Download CV (the full issue)" and "Get in touch". A cover image of Rafał's character (code-drawn, or a stock placeholder).

**Sections:**
- **Career:** chapters, each opening with a big number and a pull quote. The promotions are the plot twists.
- **Stack:** an "index" page in the style of a magazine back index.
- **Testimonials:** pull quotes set large across the full width.
- **Projects:** "Also in this issue".
- **Contact:** "Letters to the editor".

**Dark take:** "the night edition": a black, film-magazine look with a warm serif in off-white, one deep accent (wine red or amber), and dramatic photography-style contrast. Cinematic.

**Light take:** "the weekend edition": a cool paper grey (not cream, which is on the "AI look" list), ink-black type, one vivid accent (ultramarine), and lots of white space. Bright and gallery-like.

**Typography:** Instrument Serif (display), Instrument Sans (body).

**Effects:**
- scroll-driven chapter transitions (GSAP ScrollTrigger: pinned chapter openers);
- a page-turn reveal from the cover into the story;
- SplitText reveals for headlines;
- CircularText for an "issue" seal;
- ScrollReveal for pull quotes.
- **Dependencies:** GSAP only.

**Easter egg:** a "subscribe" box that answers with a joke subscription confirmation and the CV download.

**Mobile:** a natural fit, since magazines read well in one column. The cover fills the phone screen.

**Risk:** calm can tip into boring. The cover lines and chapter pacing must carry the personality.

---

## 06 — RalphOS (`ralph-os`)

**Status:** approved.

**Concept:** The site is an operating system, **RalphOS**. The desktop opens with a "Welcome" window already showing the name, role and CTAs, so recruiters get everything at once. Sections are apps: About.app, Stack (a settings panel), Career (a timeline app), Projects (folders), Contact (a mail composer), and CV.pdf, a file icon that downloads the CV. Windows drag, stack, minimise and maximise. It shows real frontend engineering (window management, state, focus and keyboard handling) as the design itself.

**Styles:** OS / desktop metaphor, Liquid Glass (material and light), playful interaction.

**Feel test:**
- *professional:* it demonstrates complex UI state and accessibility in practice;
- *creative and bold:* the whole concept;
- *playful:* the windows, the dock, and a terminal easter egg;
- *never boring:* it invites exploring.

**Hero:** the desktop, with the Welcome window centred (it is real HTML, rendered first). A dock at the bottom with app icons. The wallpaper is generative.

**Sections:** each brief section 4 section is one app window, opened from the dock or desktop icons. Below the desktop, a plain scrollable "list view" with the same content is always reachable through a toggle, for accessibility and for scanners in a hurry.

**Dark take:** "midnight glass": dark translucent windows with Liquid Glass edges over a slowly moving aurora wallpaper in deep teal and violet.

**Light take:** "daylight glass": frosted white windows, soft pastel wallpaper and crisp shadows. A friendly, modern-OS feel.

**Typography:** Manrope (UI), JetBrains Mono (terminal only).

**Effects:**
- Dock (magnifying dock);
- GlassSurface or GlassIcons;
- Folder (projects);
- custom window manager (drag, focus, z-order, keyboard);
- an Aurora or LiquidEther wallpaper;
- a terminal easter egg.
- **Dependencies:** check Dock's (it may use `motion`; port it to GSAP if so). The wallpaper is WebGL and lazy-loaded.

**Easter egg:** a Terminal app with commands (`help`, `whoami`, `cv`, `sudo hire ralph`).

**Mobile:** it becomes a **phone home screen**: app icons open full-screen sheets. It is redesigned for touch, not shrunk.

**Risk:** OS portfolios are a known genre. The quality of the window feel (snappy, accessible, keyboard-friendly) is what lifts it. A desktop half-done is worse than no desktop.

---

## 07 — Field Notes (`field-notes`)

**Status:** approved.

**Concept:** A living, code-drawn page. A generative field of flowing lines (a flow field) fills the background and **reorganises itself per section**:
- it spells out the name in the hero,
- it bundles into clusters for the stack,
- it draws a single path through time for the career,
- it scatters when you move fast.

The site feels like a scientist's or plotter artist's notebook where the drawings are alive. It shows creative coding as a skill, without 3D.

**Styles:** creative coding / generative, kinetic type, material and light (gradient glow).

**Feel test:**
- *professional:* clean, annotated layouts, like technical notes;
- *creative and bold:* a generative art system made by the developer himself;
- *playful:* the lines react to the cursor and the visitor can "draw" in them;
- *never boring:* it is never the same twice.

**Hero:** the field converges into the letters of "Rafał Ciećwierz". Real HTML text sits on top, and the field is decoration (`aria-hidden`). CTAs in plain, clear buttons.

**Sections:**
- **Career:** the field forms a single line that bends at each job, with promotions as bright knots in it.
- **Stack:** clusters sized by level, with a text list beside them.
- **Projects:** "specimen cards" with small generative thumbnails.

**Dark take:** "night sky": a deep blue-black ground with luminous lines in a shifting multi-hue gradient (no acid green), like long-exposure light painting.

**Light take:** "plotter on paper": a white page, ink-blue and graphite lines like a pen plotter drawing, with hand-written annotations. Scientific and crafty.

**Typography:** Syne (display), DM Sans (body).

**Effects:**
- a custom 2D canvas flow field (no WebGL needed; OffscreenCanvas where available);
- Threads or Particles as a fallback reference;
- TextPressure or ScrambledText for headings;
- an ImageTrail-style cursor trail of lines.
- **Dependencies:** none (vanilla canvas plus GSAP).

**Easter egg:** a "seed" control in the footer: type your name and the field redraws with your own seed.

**Mobile:** fewer lines, a lower frame rate, and the field pauses when off-screen. It stays static with reduced motion.

**Risk:** generative backgrounds can feel decorative. The field must *mean* something in each section (the career line, the stack clusters).

---

## 08 — Ascent (`ascent`): extra, built last

**Status:** approved.

**Concept:** Built around Rafał's 22+ years of parkour and his climbing. **The career is a climbing route.** The page starts at the bottom of a wall, and scrolling *climbs* it, so the visitor moves up through grades:
- QA Automation (the first moves),
- JavaScript Developer (the first promotion, a harder move),
- React Developer, then Front-end Team Leader (the crux),
- the current role at the top.

Movement between sections borrows from parkour: elements vault, roll and land with momentum. A metaphor, not a sports page.

**Styles:** scrollytelling, kinetic type, an immersive hero, interests.

**Feel test:**
- *professional:* the career story is told clearly, with each "move" naming the role and the dates;
- *creative and bold:* an inverted, climbing scroll;
- *playful:* parkour-style motion, and chalk marks;
- *never boring:* a story with momentum.

**Hero:** at the top of the page (the summit) are the name, role and CTAs, so recruiters see them first. A "start the climb ↓" link drops the visitor to the bottom of the wall, from where the story is climbed back up. The normal reading order stays intact for assistive technology.

**Sections:**
- **Career:** holds on the wall, each a job.
- **Stack:** the "gear rack".
- **Projects:** routes the visitor can try, with grades as the status.
- **Testimonials:** belay partners.
- **Contact:** "climb with me".

**Dark take:** "night session": urban concrete at night, with sodium-orange street light, rooftop silhouettes, chalk-white type and a parkour feel.

**Light take:** "crag in the sun": limestone and sandstone tones, chalk dust, rope-coloured accents (teal and coral) and an outdoor-climbing feel.

**Typography:** Big Shoulders Display (condensed, signage-like), Barlow (body).

**Effects:**
- a custom scroll-driven climb (GSAP ScrollTrigger);
- chalk-dust particles on clicks (ClickSpark variant);
- elements that enter with momentum curves (vault and land);
- an optional low-poly 3D wall in the hero (lazy-loaded three.js).
- **Dependencies:** GSAP; three.js only if the 3D wall stays.

**Easter egg:** a hidden "boulder problem": a tiny drag-to-climb mini game in the footer.

**Mobile:** a natural vertical story. Shorter climbs, and no 3D.

**Risk:** the scroll order must not confuse anyone. The summit-first hero and a plain "skip the climb" path keep it usable.
