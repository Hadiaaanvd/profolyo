# Profolyo — Logo Pack

The Profolyo brand mark in every variant you'll need. All files are SVG.

## What's inside

### `wordmark/` — Primary mark
Use anywhere there's room (≥ 18 px tall). Marketing, app header, footer, social.

| File | Use |
|---|---|
| `profolyo-wordmark.svg` | Default — black text + brand-blue period. Use on light surfaces. |
| `profolyo-wordmark-white.svg` | White text + brand-blue period. Use on dark surfaces. |
| `profolyo-wordmark-black.svg` | Single-color black (period and all). Print, foil, stamping. |
| `profolyo-wordmark-mono-white.svg` | Single-color white. Dark single-color contexts. |

### `monogram/` — Compact mark
Use only when the wordmark drops below 18 px wide. Editor sidebar, dense UI corners.

| File | Use |
|---|---|
| `profolyo-monogram.svg` | Default P. — black + brand-blue period. |
| `profolyo-monogram-white.svg` | White P. + brand-blue period. |
| `profolyo-monogram-black.svg` | Solid black, single-color. |
| `profolyo-monogram-mono-white.svg` | Solid white, single-color. |

### `favicon/` — Browser tab icon
Square, padded, rounded corners. Drop directly into a Next.js `app/` folder.

| File | Use |
|---|---|
| `profolyo-favicon.svg` | Light favicon — cream background, dark P. |
| `profolyo-favicon-dark.svg` | Dark favicon — ink background, white P. (use with `prefers-color-scheme`) |

---

## Colors

| Role | Hex |
|---|---|
| Ink (black) | `#0A0A09` |
| Cream background | `#FAFAF7` |
| Ink dark background | `#0B1020` |
| Brand blue (the period) | `#3358FF` |
| Pure white | `#FFFFFF` |

---

## Typography

The wordmark is set in **Bricolage Grotesque, weight 700**, tracking `-3.5%`.
Free on Google Fonts → https://fonts.google.com/specimen/Bricolage+Grotesque

The SVGs reference the font via `@import` so they render correctly when opened in a browser. For **final production assets** (printed material, logos baked into images, or use in tools that can't load the font), please **outline the text** in your design tool:

- **Figma**: select text → right-click → `Outline stroke` / `Flatten`
- **Illustrator**: select text → `Type → Create Outlines` (⇧⌘O)
- **Inkscape**: select text → `Path → Object to Path`

Once outlined, the SVG is fully self-contained and has no font dependency.

---

## Don'ts

1. **Don't lowercase the P.** It's always `Profolyo.`
2. **Don't drop the blue period.** It's the brand signature, not decoration.
3. **Don't re-set the wordmark in another typeface.** Bricolage Grotesque 700, always.
4. **Don't add extra elements** (taglines, stars, swooshes) inside the clear-space.
5. **Clear space**: leave at least the height of the period in all directions.

---

## Minimum sizes

| Mark | Floor |
|---|---|
| Wordmark | 18 px tall |
| Monogram | 16 px tall |

Below the floor, switch to the next-smaller mark (or to text only if it's already micro).

---

## License

These marks are the property of Profolyo. Use them to reference the product (links back to profolyo.me, "Built with Profolyo" credits, press, etc.). Don't modify the proportions, weights, or colors.

— Profolyo Design System v1.0
