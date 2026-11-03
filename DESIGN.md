# Reset Detox web — DESIGN.md

Source of truth: the Website Requirement Document (Claude Docs, "Reset Detox — Website Requirement Document v1.0").

## Idea
The coral dot in the logo is a full stop. A reset puts a full stop after old patterns.
On the page, the label colours of the day's bottles become colour chapters, one per hour.

## Tokens (src/styles/global.css)
| Token | Value | Use |
| --- | --- | --- |
| ink | #161514 | text, buttons |
| stone | #e9e9e6 | page ground (neutral, matches packshot backgrounds) |
| paper | #ffffff | forms, cards, cart |
| dot | #ec7050 | the dot only: headline full stop, cart badge, "now" marker, closing CTA |
| gw / tonic / day / broth / night / shot | #1f1d1a / #8e9a55 / #e2804f / #f2dc93 / #242324 / #b48ac9 | chapter fields, from bottle labels; text is ink (≥6:1) or stone on dark fields |

Type: Archivo variable, self-hosted. Display at font-stretch 112–118%, tracking -0.03 to -0.035em. Body 17px / 1.55.
Shape: square corners everywhere; the dot is the only round thing. Buttons 52px, one ink fill.
Motion: ease-out cubic-bezier(0.23,1,0.32,1); drawers cubic-bezier(0.32,0.72,0,1); press scale(0.97); entrances rise 24px staggered 80ms; header takes the ink and ground of the chapter beneath it; reduced motion drops all travel.

## Rules
No eyebrows, no 01/02 numbering, no icon cards, no gradients, no shadows at rest (dialogs only), no glass, no icon fonts, no styled accent word, no AI people. Coral never for text or a large surface.
Gate: `.agents/skills/design-taste-frontend/scripts/inspect.mjs` 0 FAIL at 1440/768/390 (`--allow palette-terracotta`: the orange is the real Body Reset Meal Day label colour).
