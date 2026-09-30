---
name: brutalist-web
description: Design and build a web-brutalist (野兽派 / 粗野主义) website that is raw but deliberate — exposed grid, heavy type, hard borders, offset shadows, no gradients — and verify it with a scored multi-reviewer loop. Use when the user asks for a brutalist / neo-brutalist / 野兽派 style site, landing page, or UI.
---

# Brutalist Web

Brutalism on the web = **honesty of material**: the HTML, the grid, the type and the
border are the decoration. It must look *raw on purpose*, never broken by accident.
"Ugly" is allowed; "sloppy" is not.

## 0. Pick a theme before pixels

Choose a subject whose content *earns* the style (architecture archive, indie label,
type foundry, zine, protest poster, tool manual). Write down, in one line each:

- **Subject** — what the site is about (e.g. `BETON — 粗野主义建筑档案馆`).
- **Material metaphor** — concrete / newsprint / photocopy / steel. Drives palette + texture.
- **One loud accent** — a single saturated colour used for ≤10% of the surface.
- **Voice** — terse, declarative, ALL-CAPS labels, numbered sections, catalogue codes.

## 1. Tokens (copy, then adjust — never add gradients or blur)

```css
:root{
  --ink:#0a0a0a;        /* text, borders, shadows */
  --paper:#ecebe6;      /* raw concrete / unbleached paper */
  --slab:#c9c7bf;       /* secondary concrete tone */
  --accent:#ff3b00;     /* ONE loud colour; alt: #ffe600, #0038ff */
  --b:3px;              /* default border; heavy = calc(var(--b)*2) */
  --shadow:8px 8px 0 var(--ink);   /* hard offset, zero blur */
  --font-display:"Archivo Black","Noto Sans SC",Impact,sans-serif;
  --font-body:"Space Grotesk","Noto Sans SC",system-ui,sans-serif;
  --font-mono:"JetBrains Mono","IBM Plex Mono",ui-monospace,monospace;
  --radius:0;           /* always 0 */
}
```

Type scale: display `clamp(3.5rem, 13vw, 13rem)`, line-height 0.85, letter-spacing −0.04em;
h2 `clamp(2rem,6vw,5rem)`; body 17–18px / 1.5; labels mono 12–13px uppercase +0.08em.

## 2. Hard rules

1. **Grid is visible.** 12-col grid, sections separated by full-bleed `var(--b)` rules.
   Cells share borders (use `gap:0` + `border-right/bottom`, or `outline` tricks) — no
   double lines, no hairline misalignment.
2. **Zero radius, zero blur, zero gradient, zero soft shadow.** Shadows are offset solids.
3. **Two fonts max + mono.** Display face does the shouting; body stays readable.
4. **One accent colour.** Everything else is ink / paper / slab. Images are grayscale
   (`filter:grayscale(1) contrast(1.2)`) until hover.
5. **Content is structure.** Numbered sections (`01 / 索引`), catalogue codes
   (`BTN-1964-LDN`), coordinates, years, spec tables. No lorem ipsum.
6. **Interaction is mechanical.** Hover = invert colours or shift by the shadow offset
   (`translate(4px,4px)` + shadow shrinks). Transitions ≤120ms `steps()` or linear. No
   easing flourishes, no parallax.
7. **Asymmetry with intent.** Break the grid once or twice per page (rotated stamp,
   overlapping headline, marquee band) — every break aligned to a grid line.
8. **Accessible despite the noise.** Contrast ≥ 4.5:1 for body text, visible focus
   (`outline: var(--b) solid var(--accent); outline-offset:3px`), semantic landmarks,
   `prefers-reduced-motion` stops marquees, alt text on every image.
9. **Responsive by collapsing, not shrinking.** ≤768px: columns stack, borders stay
   3px, display type still ≥ 3.5rem, no horizontal scroll (except deliberate marquee
   inside `overflow:hidden`).
10. **No build step required.** Single `index.html` + `styles.css` + tiny `main.js`.
    Images: inline SVG / CSS drawings or grayscale public-domain photos with credits.

## 3. Page recipe (landing / archive)

1. Top bar: mono label left (`EST. 1953 — ARCHIVE Nº 047`), nav as bordered cells.
2. Hero: giant word (the subject), sub-line, rotated accent stamp, coordinates block.
3. Marquee band in accent colour (ink text), pauses on hover / reduced-motion.
4. Index grid: numbered cards (code, name, city, year, architect), hard shadow, hover invert.
5. Manifesto: huge quote, 2–3 numbered principles in mono.
6. Spec table / timeline: bordered table, zebra via `--slab`.
7. Form (newsletter / submit a building): chunky inputs, accent submit button.
8. Footer: oversized wordmark bleeding off the edge, credits, colophon (fonts used).

## 4. Verification loop (run until stable)

Serve locally (`python3 -m http.server 8080 -d site`) and capture screenshots at
**1440×900, 768×1024, 390×844**, full page. Then have ≥2 independent reviewers
(different models if available) score with this rubric, each 0–10:

| # | Criterion | 10 looks like |
|---|-----------|---------------|
| A | Brutalist authenticity | Raw, structural, obviously intentional |
| B | Typography | Display type dominates; hierarchy instantly readable |
| C | Grid & alignment | Every border meets; no double/hairline seams |
| D | Colour discipline | One accent, ≤10% area, no stray hues |
| E | Interaction | Mechanical hovers, visible focus, nothing janky |
| F | Responsiveness | 390px is as intentional as 1440px, no h-scroll |
| G | Accessibility | Contrast, landmarks, alt, reduced-motion |
| H | Content & theme | Real, specific, theme-coherent copy |

Each reviewer returns: scores, top 3 must-fix issues (with selector/section), and
optional nice-to-haves. Apply all must-fixes, re-screenshot, re-review.

**Stop when:** every reviewer's mean ≥ 8.5, no criterion < 8, and no new must-fix
issues appear for one full round (score change between rounds ≤ 0.3).

## 5. Common failures (check before each review)

- Borders doubling where cards meet → use shared-border grid.
- Display type overflowing on 390px → clamp min too large or long unbreakable word;
  use `overflow-wrap:anywhere` only on hero, or shorter word.
- Accent creeping everywhere → count accent surfaces; keep to hero stamp, marquee, CTA.
- Hover shift causes layout jump → transform only, never margin/padding.
- Marquee duplicated content read twice by screen readers → `aria-hidden` on the clone.
- Web fonts FOUT making layout jump → `font-display:swap` + metric-compatible fallback.
