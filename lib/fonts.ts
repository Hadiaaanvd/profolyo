// ─── Curated font options ─────────────────────────────────────────────────────
// Each entry maps a font ID to its CSS variable (set in layout.tsx) and display name.
// The `stack` is the full font-family string used in inline styles in templates.

export interface FontOption {
  id: string;
  name: string;
  variable: string;
  stack: string;
  /** Category used for grouping in the picker */
  type: "heading" | "body" | "both";
}

export const HEADING_FONTS: FontOption[] = [
  {
    id: "bricolage",
    name: "Bricolage Grotesque",
    variable: "--font-bricolage",
    stack: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
    type: "heading",
  },
  {
    id: "playfair",
    name: "Playfair Display",
    variable: "--font-playfair",
    stack: "var(--font-playfair), 'Playfair Display', serif",
    type: "heading",
  },
  {
    id: "space-grotesk",
    name: "Space Grotesk",
    variable: "--font-space-grotesk",
    stack: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
    type: "heading",
  },
  {
    id: "fraunces",
    name: "Fraunces",
    variable: "--font-fraunces",
    stack: "var(--font-fraunces), 'Fraunces', serif",
    type: "heading",
  },
  {
    id: "dm-serif-display",
    name: "DM Serif Display",
    variable: "--font-dm-serif-display",
    stack: "var(--font-dm-serif-display), 'DM Serif Display', serif",
    type: "heading",
  },
];

export const BODY_FONTS: FontOption[] = [
  {
    id: "inter",
    name: "Inter",
    variable: "--font-inter",
    stack: "var(--font-inter), 'Inter', sans-serif",
    type: "body",
  },
  {
    id: "dm-sans",
    name: "DM Sans",
    variable: "--font-dm-sans",
    stack: "var(--font-dm-sans), 'DM Sans', sans-serif",
    type: "body",
  },
  {
    id: "source-serif-4",
    name: "Source Serif 4",
    variable: "--font-source-serif-4",
    stack: "var(--font-source-serif-4), 'Source Serif 4', serif",
    type: "body",
  },
];

export function getHeadingFont(id: string): FontOption {
  return HEADING_FONTS.find((f) => f.id === id) ?? HEADING_FONTS[0];
}

export function getBodyFont(id: string): FontOption {
  return BODY_FONTS.find((f) => f.id === id) ?? BODY_FONTS[0];
}
