# Profolyo — Portfolio Templates Schema

The portfolio renderer takes **profile data** (your user's info) and a **template config** (style + section choices) and produces the public portfolio at `profolyo.me/[handle]`.

This folder ships **5 template configs** + 1 **sample data file** for previewing them.

---

## Two JSON shapes

### 1. Portfolio data — what the user fills in
See `_sample-data.json` for a fully-filled example.

```ts
type PortfolioData = {
  user: {
    name: string;                 // "Hadia Naveed"
    handle: string;               // "hadia" — profolyo.me/hadia
    headline: string;             // one-line role
    pronouns?: string;
    location: string;
    available: boolean;
    availability_text?: string;   // shown in pill
    avatar_url?: string;
    cover_image_url?: string;
    bio_short: string;            // ~140 chars, hero
    bio_long: string;             // ~600 chars, about section
    email: string;
    social: Array<{
      type: "github" | "twitter" | "linkedin" | "readcv" | "website" | "other";
      url: string;
      label?: string;
    }>;
  };
  projects: Array<{
    id: string;
    slug: string;                 // /projects/[slug]
    title: string;
    tagline: string;
    description?: string;
    role?: string;
    period?: string;              // "2021 — 2024"
    team?: string;
    status: "live" | "in_progress" | "archived";
    cover_image_url?: string;
    cover_color?: string;         // fallback if no image
    gallery?: string[];
    tech_stack: string[];
    links?: Array<{ type: "live" | "repo" | "case_study"; url: string; label?: string }>;
    featured: boolean;
  }>;
  experience: Array<{
    company: string;
    title: string;
    period: string;
    location?: string;
    description?: string;
    highlights?: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
    location?: string;
    description?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
};
```

### 2. Template config — what you ship pre-built
Five of these in this folder (`01-folio.json` … `05-index.json`).

```ts
type Template = {
  id: string;                                 // "folio"
  name: string;                               // "Folio"
  tagline: string;                            // one-liner for the picker
  description: string;                        // longer
  best_for: string[];                         // ["designers", "design engineers"]
  preview_image: string;                      // /templates/folio.png

  defaults: {
    accent_color: string;                     // hex
    font_display: string;                     // google font family
    font_body: string;
    font_mono?: string;
    color_mode: "light" | "dark";
    density: "compact" | "comfortable" | "spacious";
  };

  // Sections in render order. User can hide / reorder.
  sections: Array<{
    id: string;                               // unique within template
    type: "hero" | "about" | "projects" | "experience" | "education" | "skills" | "contact";
    layout: string;                           // template-specific variant key
    visible: boolean;                         // default; user can override
    order: number;
    options?: Record<string, unknown>;        // section-specific knobs
  }>;

  // Design tokens that vary per template (independent of accent color)
  tokens: {
    background: string;
    surface: string;
    ink: string;
    ink_muted: string;
    border: string;
    radius_card: string;
    radius_button: string;
    container_max: string;
    section_padding_y: string;
  };
};
```

---

## User-customizable knobs (per your direction)

When the user picks a template, they can override:
1. `defaults.accent_color`
2. `defaults.font_display` and `defaults.font_body`
3. `defaults.color_mode` (light / dark toggle)
4. `sections[].visible` and `sections[].order` (hide / reorder)
5. `defaults.density`

Everything else is baked into the template — that's what gives each template its identity.

---

## The 5 templates

| ID | Name | Best for | Layout idea |
|---|---|---|---|
| `01-folio` | **Folio** | Designers, design engineers, writers | Editorial. Single column, big serif-ish display, horizontal project rows. |
| `02-atelier` | **Atelier** | Senior ICs, studios | Two-column. Sticky bio on the left, scrolling work on the right. |
| `03-console` | **Console** | Developers, infra engineers | Dark mode. Mono accents. Project cards as code blocks. |
| `04-showcase` | **Showcase** | Visual designers, art directors | Bold. Asymmetric. Huge project hero images. |
| `05-index` | **Index** | PMs, generalists, anyone with many projects | Pinterest-style masonry. Filter chips. Visual-first. |
