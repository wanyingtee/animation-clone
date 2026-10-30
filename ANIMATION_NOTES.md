# Animation comparison

Compared against the live ORDR home page, its rendered styles, and its published animation definitions.

## Verified desktop hover behavior

| Element | Reference | Local implementation |
| --- | --- | --- |
| Navigation links | Italic text on hover | Italic text; current page remains italic |
| Newsletter sheet | Resting rotation −2°, lifts 6.25 reference rem and straightens; 0.4s cubic-bezier(.455,.03,.515,.955) | Same resting angle/easing; measured −66.944px at 1280px viewport versus reference −66.932px |
| Archive cards | Alternating −1°/+1° rotations; whole card lifts 4 reference rem and straightens; 0.5s cubic-bezier(.86,0,.07,1) | Same angles/easing; measured −42.88px versus reference −42.837px at 1280px |
| Oval controls | Outline rotates −4°; label stays still | Separate pseudo-element border rotates −4° in 0.2s; label transform remains none |

## Scroll and entrance behavior

- Hero characters rise independently through masks, staggered across both title lines.
- Hero patches enter with a diagonal fade, then use separate layers for pointer movement, scroll parallax, and idle drift.
- The crest travels from the editorial photo into the benefits grid. Divider rules grow and stars rotate into view; text rises through masks.
- The newsletter panel narrows from full viewport width to 97%; the paper's movement is its hover effect.
- Archive cards overlap in normal flow on desktop, rather than being sticky. The small program card moves from 30% to −10% vertically over its scroll range.
- Mobile preserves readable stacked content and removes desktop-only large hover lifts. Reduced-motion preferences reveal content without decorative movement.

## Scope and remaining differences

The original uses GSAP/Webflow timelines; the clone uses Framer Motion and CSS. Spring smoothing, responsive spacing, and the crest's sticky travel are approximations, not frame-identical reproductions. Mobile content prioritizes keeping the complete article descriptions reachable. Signup is intentionally a static blank line and text, per request. The program CTA links to the original program article rather than implementing an external survey.
