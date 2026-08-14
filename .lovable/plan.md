# SwainTech Independence Day Brand Film — 9:16 Web Animation

A self-playing, 48-second vertical motion-graphics film built entirely in SVG + React, rendered at `/` in the app. No video file, no user interaction beyond a small dev-only replay control.

## Deliverable

- Route `/` renders a 1080x1920 (9:16) stage, scaled responsively to fit any viewport with letterboxing on the warm ivory background.
- Timeline driven by a single `requestAnimationFrame` clock (frame-accurate at 30fps, 1440 frames total), so the film plays start-to-finish automatically and stops on the final frame.
- Dev-only replay button, hidden from the composition itself.
- Scene timestamps documented in code comments (00:00 / 00:05 / 00:11 / 00:20 / 00:26 / 00:34 / 00:41 / 00:46) for later audio sync, with sound-cue placeholder comments.

## Brand handling

- Logo: wordmark only — `SWAINTECH` in the geometric sans at 700–800 weight, graphite `#252525`, with the orange `#F47B20` accent (a dot/underline motif). No invented symbol mark.
- When you upload the real artwork, I swap the wordmark component for the actual identity and align the ecosystem ring to it — everything else is built to accept that drop-in.
- `Everything Under One Roof.` used verbatim as the brand phrase.

## Color & type system

Tokens added to `src/styles.css` (oklch), used semantically everywhere:

- ivory background `#FFFDF8`, white `#FFFFFF`
- brand orange `#F47B20`, saffron `#FF9933`, green `#138808`
- graphite text `#252525`

Typography: Manrope (display 600–800) + Inter (support 400–500), loaded via a `<link>` in `__root.tsx`. Large type, generous tracking, high whitespace.

## Scenes

| Time | Scene | Content |
| --- | --- | --- |
| 00:00–00:05 | The First Idea | Saffron point scales in, thin SVG path draws across frame; "EVERYTHING / STARTS / WITH AN IDEA." lines fade + rise 18px |
| 00:05–00:11 | Connection | Path branches into 5 nodes, sequential draw-then-node choreography; "AN IDEA / BECOMES A CONNECTION." |
| 00:11–00:20 | Ecosystem | Center wordmark, ring draws itself, 15 numbered industry nodes appear clockwise (line draws before each node), subtle orange activation pulses |
| 00:20–00:26 | Under One Roof | Full network breathes/slow-rotates; "EVERYTHING / UNDER ONE ROOF." held ~1.5s |
| 00:26–00:34 | India in Motion | Network morphs into a 24-spoke abstract chakra geometry; strokes transition saffron → white → green; "DIFFERENT DREAMS." then "ONE SPIRIT." |
| 00:34–00:41 | Progress | Geometry breaks into lines forming "WE BUILD." / "WE INNOVATE." / "WE GROW." each with a thin saffron underline; green accent only on GROW |
| 00:41–00:46 | Resolution | Lines converge to center, wordmark returns inside saffron + green arcs; "ONE NATION. / INFINITE POSSIBILITIES." |
| 00:46–00:50 | Final Card | SWAINTECH. / HAPPY INDEPENDENCE DAY / 15 AUGUST 2026 / Everything Under One Roof. / swaintechsolutions.com, tiny tricolor line motif, ~2.5s hold |

All text stays inside a safe area inset from the top/bottom for Instagram UI.

## Component structure

```text
src/routes/index.tsx            stage + timeline clock + scene switch
src/film/useFilmClock.ts        rAF frame clock, 30fps, 1440 frames
src/film/timeline.ts            scene boundaries, easing helpers, interpolate()
src/film/scenes/*.tsx           8 scene components (frame-local time)
src/film/components/            SvgWordmark, NetworkLine, NetworkNode,
                                IndustryNode, IndustryIcon, CircularRing,
                                ChakraGeometry, KineticText, TricolorLine
src/film/data/industries.ts     the 15 industries with numbering preserved
```

## Motion rules applied

- Entrances ease-out, transformations ease-in-out, no bounce/overshoot.
- Short elements 300–600ms, transitions 800–1400ms, hero morph 1600–2200ms.
- Only `transform`, `opacity`, and stroke-dash properties animate; no persistent filters, no particle fields, no glassmorphism.
- All motion derived from the frame value — deterministic, no CSS keyframes or transitions.

## Technical notes

- Stage scaling: fixed 1080x1920 SVG/absolute layer scaled with `transform: scale()` from a measured container, so composition math stays in video pixels.
- Head metadata on `/` with film-specific title/description/og tags.
- No backend, no data fetching, no dependencies added beyond the font link.
