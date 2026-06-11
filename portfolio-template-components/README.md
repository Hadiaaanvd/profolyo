# Profolyo — Portfolio Template Components

10 React/JSX portfolio templates. Each is a single self-contained component
that takes `(data, accent)` props and renders a complete portfolio.

## Structure

```
portfolio-template-components/
├── templates/                    # The components — one .jsx per template
│   ├── FolioTemplate.jsx
│   ├── AtelierTemplate.jsx
│   ├── ConsoleTemplate.jsx
│   ├── ShowcaseTemplate.jsx
│   ├── IndexTemplate.jsx
│   ├── PressTemplate.jsx
│   ├── LinearTemplate.jsx
│   ├── StoryTemplate.jsx
│   ├── QuartzTemplate.jsx
│   └── CoverTemplate.jsx
├── configs/                       # JSON template configs (typography, tokens, sections)
│   ├── _schema.md
│   ├── _sample-data.json
│   ├── 01-folio.json
│   ├── ...
│   └── 10-cover.json
└── data/
    └── sample-portfolio.js        # Sample profile data used for preview
```

---

## The templates

| # | ID | Name | Vibe |
|---|---|---|---|
| 1 | folio    | Folio    | Editorial · single column, spacious, serif-feel display |
| 2 | atelier  | Atelier  | Studio · two-column with sticky bio sidebar |
| 3 | console  | Console  | Developer · dark terminal with mono headings |
| 4 | showcase | Showcase | Designer · bold asymmetric grid, huge display |
| 5 | index    | Index    | Masonry · pinterest-style card grid with filters |
| 6 | press    | Press    | Newsprint · serif body, drop caps, classical hierarchy |
| 7 | linear   | Linear   | Résumé · single-page condensed, table-row dense |
| 8 | story    | Story    | Long-form · each project a full hero, cinematic |
| 9 | quartz   | Quartz   | Premium · sleek minimal, warm-white, deep-forest accent |
| 10 | cover   | Cover    | Gallery · dark full-bleed photo hero, alternating layout |

---

## Component contract

Every template is a single React function component with the same signature:

```tsx
type Props = {
  data: PortfolioData;   // See configs/_schema.md for full type
  accent?: string;       // hex string, e.g. "#7C5AFF"
};

const FolioTemplate = ({ data, accent = "#E76F51" }) => { ... };
```

Each template self-contains:
- All inline styles (no external CSS dependencies)
- Color tokens scoped to that template's aesthetic
- Layout, typography, hierarchy

This makes them easy to drop into a Next.js `app/` router or any React setup.

## How to use in Next.js

```tsx
// app/[handle]/page.tsx
import FolioTemplate from '@/templates/FolioTemplate';
import AtelierTemplate from '@/templates/AtelierTemplate';
// ... import all 10

const TEMPLATES = {
  folio: FolioTemplate,
  atelier: AtelierTemplate,
  console: ConsoleTemplate,
  showcase: ShowcaseTemplate,
  index: IndexTemplate,
  press: PressTemplate,
  linear: LinearTemplate,
  story: StoryTemplate,
  quartz: QuartzTemplate,
  cover: CoverTemplate,
};

export default async function PortfolioPage({ params }) {
  const profile = await getProfileByHandle(params.handle);
  const Template = TEMPLATES[profile.template_id] ?? FolioTemplate;
  return <Template data={profile} accent={profile.accent_color} />;
}
```

## Customizing further

To match the new schema (Reactive-Resume-style granular control), each template's
`configs/0N-name.json` exposes:

- `defaults` — accent, color mode, density
- `typography.heading` / `.body` / `.mono` — family, weights, size_pt, line_height
- `tokens` — background, surface, ink, ink_muted, border, radii
- `sections[]` — id, type, layout, visible, order, per-section options

In a v2 you'd factor the inline styles into a token-driven render function that
reads the config. For now they're inline so each template is dead-simple to
read and modify.

## Required fonts (Google Fonts)

- Bricolage Grotesque (display)
- Inter (body)
- JetBrains Mono (mono)
- Source Serif 4 (only for the Press template)

## Required deps

These are plain JSX. No deps beyond React 18.

---

— Profolyo Design System v1.0
