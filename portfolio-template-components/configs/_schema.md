# Profolyo — Portfolio Templates Schema (v2)

The portfolio renderer takes **profile data** (your user's info) and a **template config** (style + section choices) and produces the public portfolio at `profolyo.me/[handle]`.

This folder ships **14 template configs** + a **sample data file** for previewing them.

---

## Design principles

1. **One profile, many templates.** A user fills in their data once. Switching templates re-presents the same data — never reshapes it.
2. **Everything beyond `user` is optional.** Templates render only sections that have data. A profile with zero projects, zero publications, zero testimonials still renders cleanly — the sections just don't appear.
3. **Sections relabel per template.** A `projects[]` entry shows as "Selected work" on Folio, "Case studies" on Prism, "Engagements" on Marquee, or "Selected writing" on Anthology. The data is the same; the framing is the template's job.
4. **Custom sections are the escape valve.** If we don't ship a first-class field for your thing, drop it into `custom[]` and every template will render it generically.

---

## 1. Portfolio data — what the user fills in

A single JSON object. `user` is the only required block. Everything else is an array that defaults to empty.

```ts
type PortfolioData = {
  // ---------- REQUIRED ----------
  user: User;

  // ---------- OPTIONAL ARRAYS ----------
  projects?:       Project[];
  experience?:     Experience[];
  education?:      Education[];
  skills?:         SkillGroup[];

  // ---------- ADDITIONAL SECTIONS (all optional) ----------
  publications?:   Publication[];   // articles, talks, podcasts, books
  testimonials?:   Testimonial[];   // public endorsements
  awards?:         Award[];         // honours, recognitions
  certifications?: Certification[]; // pro certs, courses
  languages?:      Language[];      // spoken, with proficiency
  volunteer?:      Volunteer[];     // volunteering, mentoring
  custom?:         CustomSection[]; // user-defined sections
};
```

### `User` — the only required block

```ts
type User = {
  name:              string;             // "Hadia Naveed"
  handle:            string;             // "hadia" → profolyo.me/hadia
  headline:          string;             // one-line role
  pronouns?:         string;             // "she/her"
  location:          string;             // "Berlin, Germany"
  available:         boolean;            // drives the dot in availability pills
  availability_text?: string;            // free-form availability copy

  // PHOTO (optional — every template has a designated slot for it,
  // and a graceful fallback when absent)
  avatar_url?:       string;             // 480×480+ recommended, square
  cover_image_url?:  string;             // optional banner (used by Cover, Showcase)

  // BIO (both required — short for hero, long for about)
  bio_short:         string;             // ~140 chars
  bio_long:          string;             // ~600 chars

  email:             string;
  phone?:            string;
  website?:          string;             // user's primary external link

  social: SocialProfile[];               // see below
};

type SocialProfile = {
  type:    "github" | "twitter" | "linkedin" | "readcv" | "instagram" | "dribbble" | "behance" | "youtube" | "website" | "other";
  url:     string;
  label?:  string;                       // display label, e.g. "@hadianaveed"
};
```

### `Project` — work, products, case studies

Used by every template's "Work / Projects" section. **Premium templates use the optional `description`, `gallery`, and `links` fields to render full case-study pages** (`profolyo.me/[handle]/work/[slug]`).

```ts
type Project = {
  id:           string;                  // stable unique id
  slug:         string;                  // /work/[slug]
  title:        string;
  tagline:      string;                  // one-line description (~80 chars)
  description?: string;                  // long prose for case-study page (~500 chars)
  role?:        string;                  // "Frontend Lead"
  period?:      string;                  // "2021 — 2024"
  team?:        string;                  // "Solo" or "4-person team"
  status:       "live" | "in_progress" | "archived";
  featured?:    boolean;                 // hint for templates that highlight one

  // VISUALS
  cover_color?: string;                  // hex or gradient — fallback when no image
  cover_image_url?: string;
  gallery?:     string[];                // additional image URLs (or hex fallbacks)
                                         // used by Halcyon / Prism / Anthology case-study pages

  tech_stack:   string[];                // ["React", "TypeScript", "Stripe"]
  links?: Array<{
    type:  "live" | "repo" | "case_study" | "design" | "other";
    url:   string;
    label?: string;
  }>;
};
```

### `Experience` — roles, jobs, advisory positions

```ts
type Experience = {
  company:      string;
  title:        string;
  period:       string;                  // "2021 — 2024" or "Jan 2021 — Mar 2024"
  location?:    string;
  description?: string;                  // ~120 chars summary
  highlights?:  string[];                // bullet points — short, impact-led
};
```

### `Education`

```ts
type Education = {
  institution:  string;
  degree:       string;                  // "M.S. Human-Computer Interaction"
  period:       string;
  location?:    string;
  description?: string;
};
```

### `SkillGroup` — grouped chips

```ts
type SkillGroup = {
  category:     string;                  // "Languages" / "Frameworks" / "Design"
  items:        string[];                // ["TypeScript", "Python", "Go"]
};
```

### `Publication` — articles, talks, podcasts, books

Anything you've published, spoken at, or appeared on. The `type` field lets templates filter / colour-code.

```ts
type Publication = {
  id:       string;
  title:    string;
  venue:    string;                      // "Smashing Magazine" / "Frontend Nation"
  year:     string;                      // "2024" or "Jun 2024"
  type:     "article" | "talk" | "podcast" | "paper" | "book" | "other";
  url?:     string;
  summary?: string;                      // ~140 chars
};
```

### `Testimonial` — public endorsements

Different from private references — these are quotes the user wants displayed.

```ts
type Testimonial = {
  id:           string;
  quote:        string;                  // ~280 chars
  author:       string;
  role?:        string;                  // "VP Design"
  company?:     string;
  avatar_url?:  string;
};
```

### `Award`

```ts
type Award = {
  id:       string;
  title:    string;                      // "Awwwards · Site of the Day"
  issuer:   string;                      // "Awwwards"
  year:     string;
  summary?: string;
};
```

### `Certification`

```ts
type Certification = {
  id:      string;
  name:    string;                       // "AWS Certified Solutions Architect"
  issuer:  string;
  year:    string;
  url?:    string;                       // verification link
};
```

### `Language`

```ts
type Language = {
  name:        string;                   // "German"
  proficiency: "Native" | "Fluent" | "Professional" | "Conversational" | "Beginner";
};
```

### `Volunteer`

```ts
type Volunteer = {
  organization: string;
  role:         string;
  period:       string;
  description?: string;
};
```

### `CustomSection` — user-defined

The escape valve. If a user has "Press features", "Open source", "Side hustles", "Residencies", whatever — they drop it here and every template renders it with a unified card/row pattern.

```ts
type CustomSection = {
  id:    string;                         // stable, used in visibility config
  title: string;                         // "Press features"
  items: Array<{
    heading:      string;                // "Featured in Wired UK"
    subheading?:  string;                // "December 2023 issue"
    date?:        string;                // "Dec 2023"
    description?: string;                // ~120 chars
    link?:        string;
  }>;
};
```

---

## 2. Template config — what we ship pre-built

One JSON per template (`01-folio.json` … `14-prism.json`). Defines style tokens and which sections render where, in what variant.

```ts
type Template = {
  id:           string;                  // "folio"
  name:         string;
  tagline:      string;
  description:  string;
  best_for:     string[];                // ["designers", "design engineers"]
  premium:      boolean;                 // shown with a $ badge in the picker
  multi_page:   boolean;                 // has case-study sub-pages
  preview_image: string;                 // /templates/folio.png

  defaults: {
    accent_color: string;                // hex
    color_mode:   "light" | "dark";
    density:      "compact" | "comfortable" | "spacious";
  };

  typography: {
    heading: TypeSpec;
    body:    TypeSpec;
    mono:    TypeSpec;
    serif?:  TypeSpec;                   // only for serif-leaning templates
  };

  tokens: {
    background: string;
    surface:    string;
    ink:        string;
    ink_muted:  string;
    border:     string;
    radius_card_px:   number;
    radius_button_px: number;
    radius_image_px:  number;
  };

  // Sections in render order. User can toggle visibility + reorder per profile.
  sections: Array<{
    id:      string;                     // "work", "publications", etc.
    type:    SectionType;                // see below
    layout:  string;                     // template-specific layout key
    visible: boolean;                    // default; user can override per-profile
    order:   number;
    options?: Record<string, unknown>;   // section-specific knobs
  }>;
};

type TypeSpec = {
  font_family:       string;             // "Bricolage Grotesque"
  font_weights:      number[];
  font_size_pt:      number;             // base size at this section
  line_height:       number;
  letter_spacing_em?: number;
};

type SectionType =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "education"
  | "skills"
  | "publications"
  | "testimonials"
  | "awards"
  | "certifications"
  | "languages"
  | "volunteer"
  | "custom"
  | "contact";
```

---

## 3. User-customizable knobs

When the user picks a template, they can override these without changing the template's identity:

1. `defaults.accent_color`
2. `defaults.color_mode` (light / dark — templates that support both)
3. `defaults.density`
4. `sections[].visible` per section, including `custom[]` items by id (e.g. `custom:speaking`)
5. `sections[].order` (reorder)
6. `user.avatar_url` show/hide (each template has a graceful fallback)

Everything else is baked into the template — that's what gives each template its identity.

---

## 4. The 14 templates

| ID | Name | Premium | Multi-page | Best for | Layout idea |
|---|---|---|---|---|---|
| `01-folio`    | **Folio**    |       |       | Designers, writers, design engineers | Editorial. Single column, big display, horizontal project rows. |
| `02-atelier`  | **Atelier**  |       |       | Senior ICs, studios                  | Two-column. Sticky bio left, scrolling work right. |
| `03-console`  | **Console**  |       |       | Developers, infra engineers          | Dark mode, mono accents, terminal-styled blocks. |
| `04-showcase` | **Showcase** |       |       | Visual designers, art directors      | Bold asymmetric grid, huge project hero images. |
| `05-index`    | **Index**    |       |       | PMs, generalists, many-project folks | Pinterest-style masonry with filter chips. |
| `06-press`    | **Press**    |       |       | Editorial, classical, journalists    | Newsprint serif, drop caps, multi-column. |
| `07-linear`   | **Linear**   |       |       | Skim-first CV folks                  | Single-page condensed, table-row dense. |
| `08-story`    | **Story**    |       |       | Long-form scrollers                  | Each project a full cinematic hero. |
| `09-quartz`   | **Quartz**   | **$**  |       | Premium minimal                      | Sleek, warm-white, generous whitespace. |
| `10-cover`    | **Cover**    |       |       | Photo-first creatives                | Dark full-bleed hero, alternating gallery. |
| `11-halcyon`  | **Halcyon**  | **$$** | ✓     | Modern senior engineers              | Dark/light toggle, "Now" block, numbered work list, full case-study pages. |
| `12-marquee`  | **Marquee**  |       |       | Leaders, speakers, managers          | Photo-forward split hero, stats strip, talks + testimonials wall. |
| `13-anthology`| **Anthology**| **$$** | ✓     | Writers, journalists, academics      | Editorial portrait, drop caps, reading-list feed, full article pages. |
| `14-prism`    | **Prism**    | **$$** | ✓     | UI / product designers               | Browser-framed mockups, asymmetric tile grid, case-study pages. |

---

## 5. What templates render which sections

Every template renders the section if data exists, *unless explicitly hidden by the user*. The differences are **how** they render and **how prominently**:

| Section        | Folio | Atelier | Console | Showcase | Index | Press | Linear | Story | Quartz | Cover | Halcyon | Marquee | Anthology | Prism |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| projects       | ★ | ★ | ★ | ★ | ★ | ★ | ★ | ★ | ★ | ★ | ★ | • | • | ★ |
| experience     | • | • | • | • | • | • | ★ | • | • | • | • | ★ | • | • |
| education      | • | • | • | • | • | • | • | • | • | • | • | • | • | • |
| skills         | • | • | • | • | • | • | • | • | • | • | • | • | • | • |
| publications   | + | + | + | + | + | + | + | + | + | + | ★ | ★ | ★ | + |
| testimonials   | + | + | + | + | + | + | + | + | + | + | + | ★ | + | + |
| awards         | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| certifications | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| languages      | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| volunteer      | + | + | + | + | + | + | + | + | + | + | + | + | + | + |
| custom         | + | + | + | + | + | + | + | + | + | + | + | + | + | + |

Legend: **★** primary section (gets prime real estate), **•** standard section, **+** rendered if data exists, in a compact treatment.

---

## 6. Multi-page templates

`halcyon`, `anthology`, and `prism` ship a **case-study / article detail page** at `/work/[slug]`. Clicking a project on the index opens the rich detail view with:

- Larger imagery / gallery slider (from `project.gallery`)
- Long-form `project.description`
- Stack, role, period, status meta block
- All `project.links`
- Back navigation to the index

Other templates render projects as single-page anchors. Both modes share the exact same `Project` data shape — templates just choose how much of it to surface.

— *Profolyo Design System v2.0*
