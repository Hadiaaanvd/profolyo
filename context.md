# Profolyo — Complete Project Specification

## What This Is

Profolyo is a unified professional presence tool. A user enters their profile data once — experience, education, skills, and projects — and the platform generates two outputs from that single source:

1. A live portfolio website at `profolyo.me/username`
2. A downloadable resume PDF

No existing tool does both from one data entry point. Reactive Resume outputs documents only. Framer outputs websites only. Profolyo does both from one unified editor.

---

## Domain and Branding

- **Domain:** `profolyo.me`
- **User portfolio URLs:** `profolyo.me/username`
- **Project detail URLs:** `profolyo.me/username/projects/project-slug`
- **Branding on free tier footer:** "Built with Profolyo"

---

## Tech Stack

- **Framework:** Next.js 14+ with App Router, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma
- **Auth:** NextAuth.js v5 (beta) with GitHub OAuth provider
- **Image storage:** Cloudinary (free tier) for all user-uploaded images
- **PDF generation:** Playwright (headless browser renders resume HTML page, exports to PDF)
- **Deployment:** Vercel

---

## Tier Model

### Free Tier
- Live portfolio at `profolyo.me/username`
- Resume PDF export
- All templates
- "Built with Profolyo" footer branding

### Paid Tier (v2, not v1)
- Custom domain (`janedoe.com` pointing to their portfolio)
- Remove Profolyo branding from footer
- Analytics on portfolio views

---

## Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String    @id @default(cuid())
  email       String    @unique
  username    String    @unique
  github_id   String?   @unique
  created_at  DateTime  @default(now())
  portfolio   Portfolio?
  accounts    Account[]
  sessions    Session[]
}

model Portfolio {
  id            String       @id @default(cuid())
  user_id       String       @unique
  user          User         @relation(fields: [user_id], references: [id])

  // Basics
  name          String       @default("")
  headline      String       @default("")
  photo_url     String?
  bio           String?
  email         String?
  phone         String?
  location      String?
  availability  String?      // e.g. "Available · Berlin 2026"

  // Social links
  github_url    String?
  linkedin_url  String?
  website_url   String?
  twitter_url   String?

  // Styling
  accent_color  String       @default("#3B82F6")
  template      String       @default("default")

  updated_at    DateTime     @updatedAt

  projects      Project[]
  experiences   Experience[]
  educations    Education[]
  skills        Skill[]
}

model Project {
  id            String    @id @default(cuid())
  portfolio_id  String
  portfolio     Portfolio @relation(fields: [portfolio_id], references: [id])

  title         String
  slug          String    // URL-safe version of title, auto-generated
  tagline       String    // one-line description, e.g. "B2B SaaS donor management platform"
  thumbnail_url String?   // primary screenshot, shown on card
  tech_stack    String[]  // e.g. ["React", "Firebase", "Node.js"]
  live_url      String?
  repo_url      String?
  role          String?   // user's specific role if team project
  period        String?   // e.g. "2021 - 2024"
  body          String?   // richtext stored as HTML, shown on detail page
  images        String[]  // additional screenshot URLs
  featured      Boolean   @default(true)
  status        String    @default("live") // live / archived / in-progress
  order         Int       @default(0)

  created_at    DateTime  @default(now())
}

model Experience {
  id            String    @id @default(cuid())
  portfolio_id  String
  portfolio     Portfolio @relation(fields: [portfolio_id], references: [id])

  company       String
  company_url   String?
  role          String
  period        String    // e.g. "June 2025 - Now"
  bullets       String[]  // list of achievement bullet points
  tech          String[]  // tech tags shown under experience entry
  order         Int       @default(0)
}

model Education {
  id            String    @id @default(cuid())
  portfolio_id  String
  portfolio     Portfolio @relation(fields: [portfolio_id], references: [id])

  institution   String
  degree        String
  period        String
  grade         String?
  order         Int       @default(0)
}

model Skill {
  id            String    @id @default(cuid())
  portfolio_id  String
  portfolio     Portfolio @relation(fields: [portfolio_id], references: [id])

  category      String    // e.g. "Frontend", "Backend & Databases"
  items         String[]  // e.g. ["React", "Vue", "TypeScript"]
  order         Int       @default(0)
}

// NextAuth required models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

---

## Application Routes

### Public routes (no auth required)
```
/                          Landing page
/[username]                Live portfolio for that user
/[username]/projects/[slug] Project detail page
```

### Auth routes
```
/login                     Login page, GitHub OAuth only
/api/auth/[...nextauth]    NextAuth handler
```

### Editor routes (auth required)
```
/editor                    Main editor, redirects to /editor/basics
/editor/basics             Edit name, headline, photo, bio, links, availability
/editor/experience         Add/edit/reorder experience entries
/editor/education          Add/edit/reorder education entries
/editor/skills             Add/edit/reorder skill categories
/editor/projects           Add/edit/reorder projects
/editor/projects/[id]      Edit individual project with full content model
/editor/appearance         Accent color, template selection
```

### API routes
```
/api/portfolio             GET/PUT portfolio basics
/api/projects              GET/POST projects
/api/projects/[id]         GET/PUT/DELETE individual project
/api/experience            GET/POST experience
/api/experience/[id]       GET/PUT/DELETE individual experience
/api/education             GET/POST education
/api/education/[id]        GET/PUT/DELETE individual education
/api/skills                GET/POST skills
/api/skills/[id]           GET/PUT/DELETE individual skill
/api/upload                POST image upload to Cloudinary
/api/resume/pdf            GET generates and returns resume PDF via Playwright
/api/github/repos          GET fetches user's GitHub repos for import
```

---

## Feature Specifications

### Authentication
- GitHub OAuth only in v1
- On first login: prompt user to choose a username, validate uniqueness, create User and empty Portfolio records
- Username rules: lowercase, alphanumeric and hyphens only, 3-30 characters, cannot be reserved words (api, editor, login, admin, etc.)
- Session persisted via NextAuth session strategy

### Editor UX
- Left sidebar navigation between sections
- Each section renders its entries as a list with edit/delete/reorder controls
- Reordering via drag and drop (use `@dnd-kit/core`)
- Changes save on blur or explicit save button, not autosave on every keystroke
- Real-time preview panel on the right showing how the portfolio looks (desktop only, hidden on mobile editor)
- Image upload: drag and drop or click to upload, sends to `/api/upload` which proxies to Cloudinary, returns URL stored in database

### Project Editor (most important section)
Each project entry has a full editing modal or page with all fields:
- Title (text input, required)
- Slug (auto-generated from title, editable)
- Tagline (text input, required, one line, shown on card)
- Thumbnail (image upload, shown on card grid)
- Tech stack (tag input, add/remove tags)
- Live URL (text input, optional)
- Repo URL (text input, optional)
- Role (text input, optional, e.g. "Frontend Lead")
- Period (text input, optional, e.g. "2021 - 2024")
- Status (select: live / archived / in-progress)
- Featured (toggle, controls visibility and ordering)
- Body (rich text editor using Tiptap, optional, shown on detail page only)
- Additional images (multiple image upload, shown in gallery on detail page)

### GitHub Import
- Button in editor: "Import from GitHub"
- Calls `/api/github/repos` which uses the user's GitHub OAuth access token to fetch their public repos via GitHub API (`GET /user/repos`)
- Returns list of repos with: name, description, homepage URL, language, stars, html_url
- User sees a selectable list, picks repos to import
- Each selected repo creates a Project with: title from repo name (formatted), tagline from description, repo_url from html_url, live_url from homepage if set, tech_stack with primary language as first tag
- User then edits the imported projects to add thumbnail, additional tech, etc.

### Portfolio Renderer (`/[username]`)
Renders the user's full portfolio as a public page. 

**Sections in order:**
1. **Hero:** photo, name, headline, availability badge, bio excerpt, CTA buttons (View Work, Resume PDF), social links
2. **About:** full bio text, experience entries (two-column layout: bio left, experience+education right)
3. **Projects grid:** cards in a responsive grid, each card shows thumbnail, title, tagline, tech tags. Clicking a card goes to the project detail page.
4. **Contact:** email, social links, mailto link (no form backend in v1)
5. **Footer:** "Built with Profolyo" with link

**Accent color** from portfolio settings applied to headings, tags, badges, and interactive elements.

**Template** field reserved for v2 multiple templates. In v1 there is one template only.

### Project Detail Page (`/[username]/projects/[slug]`)
Full project showcase page:
- Hero: title, tagline, role, period, status badge
- Links: live demo button, repo button
- Thumbnail / primary image
- Tech stack tags
- Body: full richtext content rendered as HTML
- Image gallery: additional screenshots in a grid or lightbox
- Back link to portfolio

This page is the core differentiator. No existing tool generates individual project detail pages from structured data entry.

### Resume PDF Output
- Dedicated resume template at `/[username]/resume` (can be a hidden route, not linked publicly)
- Print-optimized HTML layout: single page or multi-page, clean typography, no background colors
- Uses same data: basics, experience, education, skills, projects (text fields only, no images)
- Projects rendered as: title, tagline, tech tags, live URL and repo URL as text
- `/api/resume/pdf` endpoint: launches Playwright, navigates to `/[username]/resume`, calls `page.pdf()`, returns PDF buffer with appropriate headers
- User downloads from editor via "Download Resume PDF" button

### Contact Form (v1)
- Rendered as a contact section with email display and social links
- "Send Message" button is a `mailto:` link using the user's email from portfolio basics
- No backend form processing in v1

---

## Build Order (8 Weeks)

### Week 1: Foundation
- Initialize Next.js app with TypeScript, Tailwind, App Router
- Set up Prisma with full schema above, connect to Supabase Postgres
- Implement NextAuth with GitHub provider
- Username selection flow on first login
- User and Portfolio records created on signup
- Deploy skeleton to Vercel, confirm domain `profolyo.me` points correctly

### Week 2: Editor
- Editor layout with sidebar navigation
- Basics section: all fields, photo upload to Cloudinary
- Experience section: add/edit/delete/reorder entries
- Education section: add/edit/delete/reorder entries
- Skills section: add/edit/delete/reorder categories and items
- Projects section: list view with add/edit/delete/reorder
- Project detail editor: all fields including Tiptap richtext and image uploads
- All data persisting to database correctly

### Week 3: Portfolio Renderer
- `/[username]` dynamic route
- Full portfolio page with all sections
- Accent color applied throughout
- Project cards linking to detail pages
- `/[username]/projects/[slug]` detail pages
- Deploy and confirm `profolyo.me/hadia` renders correctly using real data
- **This is the critical milestone. Everything after improves a working product.**

### Week 4: Polish and Project Detail
- Project detail page fully styled
- Image gallery on detail page
- Responsive design across all public pages
- Loading states, error states, empty states in editor
- SEO meta tags on portfolio and project pages (og:image, title, description)

### Week 5: GitHub Import
- Fetch user repos using stored GitHub OAuth access token
- Import flow UI in editor
- Map repo fields to project fields
- Handle edge cases: no description, no homepage, private repos excluded

### Week 6: Resume PDF
- `/[username]/resume` HTML template, print-optimized
- Playwright PDF generation endpoint
- Download button in editor
- Test across common resume lengths (one page, two page)

### Week 7: Own Portfolio Migration + Bug Fix
- Migrate `hadia-naveed.web.app` content entirely into Profolyo editor
- Use `profolyo.me/hadia` as the live portfolio going forward
- This surfaces every bug and missing field that planning missed
- Fix everything that feels wrong in real use

### Week 8: Launch Preparation
- Landing page at `profolyo.me` explaining the product
- README on GitHub repo with live demo link, features, self-hosting instructions
- Post on Hacker News Show HN
- Post on dev.to: "Why I built my own portfolio tool"
- Post in r/webdev, r/cscareerquestions when context fits

---

## Environment Variables Required

```env
DATABASE_URL=                    # Supabase Postgres connection string
NEXTAUTH_SECRET=                 # Random secret for NextAuth
NEXTAUTH_URL=                    # https://profolyo.me in production, http://localhost:3000 in dev
GITHUB_CLIENT_ID=                # From GitHub OAuth App settings
GITHUB_CLIENT_SECRET=            # From GitHub OAuth App settings
CLOUDINARY_CLOUD_NAME=           # From Cloudinary dashboard
CLOUDINARY_API_KEY=              # From Cloudinary dashboard
CLOUDINARY_API_SECRET=           # From Cloudinary dashboard
```

---

## Key Decisions and Constraints

**Static-first architecture is wrong for this product.** Every user gets a live URL at `profolyo.me/username` served dynamically from the database. This is not a static export tool. The Next.js app serves portfolio pages dynamically. Use Next.js route-level caching (`revalidate`) on public portfolio pages to avoid hitting the database on every recruiter visit.

**No custom sections.** The content model is fixed and opinionated. If the predefined sections are wrong, fix them. Do not add a custom sections feature.

**No AI features in v1.** Too expensive to run for free users. No exceptions.

**No email auth in v1.** GitHub OAuth only. Reduces auth complexity significantly.

**One template in v1.** The template field exists in the schema for v2. Do not build template switching in v1.

**Image storage is Cloudinary only.** Do not store images in your own server or Supabase storage. Cloudinary free tier is sufficient for v1 and handles resizing, optimization, and CDN delivery automatically.

**Playwright is available** because the builder already has production experience with it from Staffbase. Use it for PDF generation without hesitation.

**Contact form is mailto only in v1.** Static pages cannot process form submissions. The paid tier hosted version can add a form backend in v2.

**Reserved usernames** that cannot be claimed: `api`, `editor`, `login`, `logout`, `admin`, `dashboard`, `settings`, `resume`, `projects`, `static`, `public`, `profolyo`.

---

## The Core Differentiator (Never Lose Sight of This)

Every other tool makes you choose: document or website. Profolyo makes you enter your data once and gives you both. The unified data model is the product. The dual output is the feature. Every implementation decision should protect this and not compromise it.

The project detail page at `/username/projects/slug` is the specific capability no existing tool provides. Reactive Resume cannot do it. Framer requires you to build it manually. This page, generated automatically from structured data entry, is why Profolyo exists.