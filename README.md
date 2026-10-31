# ORDR animation clone

Responsive React + TypeScript recreation of the ORDR home and About pages, using Framer Motion.

## Run

```sh
npm install
npm run dev
```

- `/` — home page
- `/about` — About page

`npm run build` checks TypeScript and builds the production files in `dist/`. Production hosting needs an SPA fallback to `index.html` for direct `/about` navigation.

## Animation implementation

- `src/page/home/HomeMotion.tsx`: scroll-driven masked text reveals and independently layered scroll, pointer, and idle patch movement.
- `src/page/home/HomePage.tsx`: letter-by-letter hero entrance, sticky crest moving into the benefits grid, animated dividers, newsletter hover lift, overlapping archive cards, and program-card parallax.
- `src/page/home/HomePage.css`: desktop, tablet, mobile, and reduced-motion layouts.
- `src/page/about/SectionThree.tsx`: image reveal followed by five staggered masked text lines.

Home and About use local links. Archive articles, Contact, social, and legal links lead to the original ORDR website. The program card links to the original longevity programs. Signup areas are intentionally static blank lines and text, as requested; they do not collect, store, or submit email addresses.

## Asset naming

Images in `src/assets` are named by purpose:

- `home-*`: home editorial photo, benefits crest, newsletter preview.
- `about-*`: the About story portraits and mission photograph.
- `archive-*`: article cover images.
- `patch-*`: embroidered decorations, including the winged shoe, runner, varsity O, Atlas, health club, anniversary badge, and crest variants.
- `divider-star.svg`: decorative divider ornament.
- `paper-background-original.jpg`: retained original background asset.

Shared fonts, the paper overlay, and the ORDR wordmark live in `public/assets` with descriptive names. Existing alternate patches are retained even where not currently displayed. Assets originate from the supplied ORDR reference and the existing workspace.

## Accessibility

Reduced-motion preferences disable decorative movement and reveal all text. Mobile navigation supports Escape and focus wrapping. A skip link provides keyboard access to the main content. On smaller screens the archive cards use normal document flow so article content remains reachable.

## Styling

`src/main.tsx` imports `src/tailwind.css`, which loads Tailwind's theme and
utilities through the existing Vite plugin. The project's reset stays in the
`base` layer in `src/index.css`; Preflight is deliberately omitted to preserve
native controls and the existing typography.

Use utility classes for layout, spacing, sizing, and other static styles.
Remaining semantic classes are hooks for the page stylesheets' responsive,
contextual, and animation rules. Those rules remain unlayered so their existing
breakpoint and interaction overrides take precedence over base utilities.
Framer Motion continues to own scroll-driven inline transforms.
