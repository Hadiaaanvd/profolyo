# Profolyo — User Journey & Flow

## Core Mental Model
The portfolio is not "generated" — it is always live at `profolyo.me/username` from the moment the user signs up, updating in real time as they edit. The resume PDF is the only thing that is explicitly exported. This distinction shapes every UX decision below.

---

## Full User Flow

### 1. Landing Page
- Hero: single headline communicating the value prop. "One profile. Portfolio website and resume PDF."
- Single primary CTA: "Get Started Free"
- Below fold sections:
  - Live example: show a real portfolio (profolyo.me/hadia) embedded or screenshotted
  - Three-step explainer: Fill your profile → Your portfolio goes live → Export your resume PDF
  - GitHub link in footer (open source signal)
- No pricing page in v1. Free is the only tier.
- No secondary CTAs, no feature lists, no testimonials. Keep it minimal.

---

### 2. Authentication
- "Get Started Free" navigates to `/login`
- Single button: "Continue with GitHub"
- GitHub OAuth only in v1. No email auth, no Google, no LinkedIn.
- On successful OAuth: check if user exists
  - Existing user → go to `/editor`
  - New user → go to username selection screen

---

### 3. Username Selection (First Login Only)
- Single screen, single input field
- Real-time availability check as user types (debounced, 300ms)
- Rules enforced: lowercase, alphanumeric and hyphens only, 3–30 characters
- Reserved words blocked: api, editor, login, logout, admin, dashboard, settings, resume, projects, static, public, profolyo
- Show live preview of their URL: `profolyo.me/[username]`
- Single confirm button: "Claim my URL"
- On confirm: create User record, create empty Portfolio record, redirect to `/editor`
- This is the only onboarding step. No wizard, no questionnaire, no email verification.

---

### 4. Editor — First Visit (Empty State)
- User lands in `/editor` immediately after username selection
- Layout: left sidebar (section navigation) + main content area + right preview panel
- **First thing shown: Appearance / Template selection**
  - Show available templates visually before any data entry
  - User picks a template first — seeing a beautiful output immediately is motivating
  - Staring at an empty form is not
  - After picking template, sidebar navigates to Basics automatically
- Empty state for each section is not blank:
  - Each shows a prompt: "Add your first experience →" with an action button
  - Projects section empty state prominently shows "Import from GitHub" as the fastest path for developers
- Top bar: two persistent action buttons always visible regardless of which section is active
  - "View Live Site" — opens `profolyo.me/username` in new tab
  - "Download Resume PDF" — triggers PDF generation and download

---

### 5. Filling the Profile
- User fills sections in any order. No enforced linear flow.
- Sidebar sections in recommended order (not enforced):
  1. Appearance (template, accent color)
  2. Basics (name, headline, photo, bio, availability, social links)
  3. Experience (add multiple entries)
  4. Education (add multiple entries)
  5. Skills (add categories with tag lists)
  6. Projects (add multiple entries with full content model)
- Save behavior: auto-save on blur. No manual save button. No "unsaved changes" warning.
- Right panel: live preview updates as user edits. Desktop only — hidden on mobile.
- Reordering: drag and drop within each section using @dnd-kit/core

---

### 6. Project Entry (Most Important Section)
Each project is added via a modal or dedicated page with these fields:
- Title (required)
- Tagline — one line description shown on the card (required)
- Thumbnail — primary screenshot shown on the card grid (image upload)
- Tech stack — tag input, add/remove (required)
- Live URL (optional)
- Repo URL (optional)
- Role — user's specific contribution if team project (optional)
- Period — e.g. "2021–2024" (optional)
- Status — select: live / archived / in-progress (optional)
- Featured — toggle controlling visibility and ordering
- Body — rich text editor (Tiptap) for long-form case study, shown on detail page only (optional)
- Additional images — multiple uploads shown in gallery on detail page (optional)

---

### 7. GitHub Import Flow
- Triggered from "Import from GitHub" button in Projects section
- Uses stored GitHub OAuth access token to call `GET /user/repos`
- User sees a selectable list of their public repos
- Each selected repo pre-fills:
  - Title: repo name formatted (e.g. "across-lms" → "ACROSS LMS")
  - Tagline: repo description
  - Repo URL: html_url
  - Live URL: homepage field if set
  - Tech stack: primary language as first tag
- User edits imported projects to add thumbnail, additional tech, body, etc.
- Import is additive — does not overwrite existing projects

---

### 8. Portfolio — Always Live
- No "Generate Portfolio" button. This framing is wrong — it implies a one-time action.
- The portfolio at `profolyo.me/username` is live from signup, always reflects current editor data.
- "View Live Site" button in editor header opens it in a new tab.
- Template switching in Appearance section takes effect immediately on the live site.
- Public portfolio structure:
  1. Hero: photo, name, headline, availability badge, bio, CTA buttons, social links
  2. About: full bio, experience entries, education entries (two-column layout)
  3. Projects grid: cards with thumbnail, title, tagline, tech tags — each links to detail page
  4. Contact: email display, social links, mailto button
  5. Footer: "Built with Profolyo" with link

---

### 9. Project Detail Pages — Core Differentiator
- URL: `profolyo.me/username/projects/project-slug`
- Auto-generated from project data. No manual page building required.
- Structure:
  - Title, tagline, role, period, status badge
  - Live demo button, repo button
  - Thumbnail / primary image
  - Tech stack tags
  - Body: full richtext rendered as HTML
  - Image gallery: additional screenshots
  - Back link to portfolio
- This page does not exist in any competing tool. Reactive Resume cannot generate it. Framer requires manual creation. This is why Profolyo exists.

---

### 10. Resume PDF Export
- Triggered by "Download Resume PDF" button — always visible in editor header
- Server renders `/username/resume` (a hidden, print-optimized HTML route) using Playwright
- Playwright calls `page.pdf()`, returns PDF buffer, browser downloads it
- Loading state shown during generation (10–15 seconds)
- Resume uses same data as portfolio — no separate data entry required
- Resume template renders: basics, experience, education, skills, projects (text only — no images)
- Projects on resume: title, tagline, tech tags, live URL and repo URL as plain text
- One resume template in v1. Template options are v2.

---

### 11. Returning User
- Login → directly to `/editor`. No re-onboarding.
- No separate dashboard in v1. One portfolio per user. Go straight to editing.
- All previously entered data pre-populated in editor on load.

---

## Frontend Development Approach

### Mock Data Strategy
Use typed TypeScript objects matching the Prisma schema exactly — not flat JSON files.

```typescript
// types/portfolio.ts
export interface Portfolio {
  name: string
  headline: string
  photo_url?: string
  bio?: string
  availability?: string
  accent_color: string
  template: string
  github_url?: string
  linkedin_url?: string
  website_url?: string
  email?: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
}

export interface Project {
  id: string
  title: string
  slug: string
  tagline: string
  thumbnail_url?: string
  tech_stack: string[]
  live_url?: string
  repo_url?: string
  role?: string
  period?: string
  body?: string
  images: string[]
  featured: boolean
  status: 'live' | 'archived' | 'in-progress'
  order: number
}

export interface Experience {
  id: string
  company: string
  company_url?: string
  role: string
  period: string
  bullets: string[]
  tech: string[]
  order: number
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: string
  grade?: string
  order: number
}

export interface Skill {
  id: string
  category: string
  items: string[]
  order: number
}
```

```typescript
// lib/mock-data.ts
import { Portfolio } from '@/types/portfolio'

export const mockPortfolio: Portfolio = {
  name: "Hadia Naveed",
  headline: "Software Engineer",
  accent_color: "#3B82F6",
  template: "default",
  availability: "Available · Berlin 2026",
  // ... rest of your real data
}
```

### Why This Matters
- Define the type once in `types/portfolio.ts`
- Share it across mock data, editor components, and API responses
- When backend is wired, replace `mockPortfolio` with a fetch call returning the same type
- Zero component rewrites required
- Type errors surface immediately if mock data diverges from schema

### Rendering Templates
- Templates are React components that accept a `Portfolio` prop
- Switching templates = swapping the component, same data
- Accent color applied via CSS custom property on the root element:
  `style={{ '--accent-color': portfolio.accent_color }}`
- All `text-accent`, `bg-accent`, `border-accent` Tailwind utilities pick it up automatically

```typescript
// components/templates/DefaultTemplate.tsx
export function DefaultTemplate({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div style={{ '--accent-color': portfolio.accent_color } as React.CSSProperties}>
      {/* render portfolio sections */}
    </div>
  )
}
```

---

## Key UX Decisions Summary

| Decision | Choice | Reason |
|---|---|---|
| Template selection timing | Before data entry | Motivation — show the output first |
| Save behavior | Auto-save on blur | Reduce anxiety, no lost work |
| Portfolio availability | Always live from signup | Correct mental model, no "generate" gate |
| Resume export | On-demand PDF via Playwright | Same data, no re-entry |
| Auth | GitHub OAuth only | Simplest, right audience |
| Onboarding steps | Username only | Get to editor fast |
| Dashboard | None — go straight to editor | One portfolio per user, no need |
| Contact form | Mailto only in v1 | Static-friendly, no backend needed |
| Custom sections | None | Opinionated model is the product |
| AI features | None in v1 | Cost, complexity, not the differentiator |

---

## Pages and Routes Reference

| Route | Auth | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public | GitHub OAuth login |
| `/onboarding` | Auth | Username selection, first login only |
| `/editor` | Auth | Main editor, all sections |
| `/editor/appearance` | Auth | Template and accent color |
| `/[username]` | Public | Live portfolio |
| `/[username]/projects/[slug]` | Public | Project detail page |
| `/[username]/resume` | Public (hidden) | Print-optimized resume for PDF generation |