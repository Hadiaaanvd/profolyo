# Profolyo — Work in Progress

## Current session goal
Full rewrite of all 10 portfolio templates + dynamic section management + editor UX pass (batch items 1–12).

---

## Completed

### Infrastructure & foundations
- `globals.css` — lavender brand tokens
- `types/portfolio.ts` — Portfolio, Project, Experience, Education, SkillCategory, SocialLink types
- `types/template.ts` — Template, TemplateSection, TemplateLayout, TemplateTokens types
- `lib/templates.ts` — template registry + `getTemplate()` + `getDefaultSections()` helpers
- `lib/mock-data.ts` — full mock portfolio (Hadia Naveed) including `sections` + `contact_note`
- All landing page components in `components/landing/`
- All `components/ui/` primitives
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` installed

### Data model (Phase 1) ✅
- `types/portfolio.ts` — added `SectionConfig`, `CustomSectionItem`, `SectionType`; `sections: SectionConfig[]` on `Portfolio`; `contact_note` on `PortfolioUser`
- `lib/mock-data.ts` — `defaultSections` export + `sections` field on `mockPortfolio`
- `lib/templates.ts` — `getDefaultSections()` helper

### EditorContext (Phase 2) ✅
- Full rewrite: `activePanel`, `setActivePanel`, `reorderSections`, `toggleSectionVisibility`, `renameSection`, `addCustomSection`, `deleteSection`
- Template switching resets built-in sections to new defaults while preserving custom sections

### Template utilities ✅
- `components/templates/utils.ts` — `sectionVisible`, `sectionLabel`, `customSections`, `orderedBuiltInTypes`, `firstName`, `lastName`, `yearRange`, `COVER_COLOR_FALLBACK`, `PUBLICATION_TYPE_LABEL`, `PROFICIENCY_LABEL`
- `components/templates/PortfolioPage.tsx` — passes `sections` prop to all render components

### Template renders (Phase 3) — all 10 ✅
- All 10 templates sections-aware with edge cases fixed

### EditorSidebar (Phase 4) ✅
- Full rewrite with `@dnd-kit` sortable section list
- Per-section: drag handle, rename popover, visibility eye toggle, delete (custom only)
- Hero + Contact pinned rows (no drag)
- "Add section" button → opens `CreateSectionModal`
- Collapsible sidebar preserved, user avatar from live portfolio data

### Single-page editor (Phase 5) ✅
- `app/editor/page.tsx` — renders `SectionEditorPanel` (no redirect)
- `SectionEditorPanel.tsx` — state-driven: welcome, appearance, basics, or per-section panel based on `activePanel`
- All sub-pages redirect to `/editor`

### Type alignment — schema v2 (Phase A) ✅
- New interfaces: `Publication`, `Testimonial`, `Award`, `Certification`, `Language`, `Volunteer`
- Expanded `SocialType`, `LinkType`, `SectionType`
- `Portfolio` gains 6 new optional arrays
- `PortfolioUser` gains `phone?`, `website?`
- Mock data updated with all new types

### Basics wired to state (Phase C) ✅
- All form fields in `BasicsPanel` call `updatePortfolio` on change

### Accent color UX (Phase D) ✅
- Rainbow conic-gradient swatch + hidden `<input type="color">` for custom colors
- "Random" button with Shuffle icon
- Active ring state on custom swatch

### Template full-page preview modal (Phase E) ✅
- `components/ui/TemplatePreviewModal.tsx` — full-screen modal at ~55% zoom, scrollable, Escape to close
- `components/ui/TemplatePicker.tsx` — hover overlay with "Preview" button triggers modal
- Modal has "Use this template" / "Selected" button + close button

### New section types in all 10 templates (Phase F) ✅
- All 10 renders now handle: `publications`, `testimonials`, `awards`, `certifications`, `languages`, `volunteer`
- `defaultSections` in `mock-data.ts` updated to include all 6 new types (4 visible, 2 hidden by default)
- Each template renders with per-template styled treatments

### Projects editor CRUD (Phase G) ✅
- `ProjectsPanel` — card grid with hover edit/delete overlay; delete requires confirmation
- `ProjectForm` — full add/edit form: title, tagline, description, role, period, cover color, tech stack (TagsInput), featured toggle
- **Team and Status removed from form** (status defaults to `"in_progress"` on new projects)
- All mutations via `updatePortfolio({ projects: [...] })`
- `EmptyState` component updated to accept optional `onAction` callback

### TypeScript ✅
- `pnpm tsc --noEmit` passes with 0 errors

### Editor UX batch (items 1–12) ✅
1. **Empty initial state** — `EditorContext` initializes with `emptyPortfolio` (blank strings/arrays); `mockPortfolio` still used by `TemplatePreviewModal`
2. **Bio restructure** — `bio_short` → `bio` (~250 chars, hero block); `bio_long` now optional (About section). Updated in `types/`, `lib/mock-data.ts`, all 10 template renders, `SectionEditorPanel`. Bio counter in Basics panel.
3. **About section panel** — "About" sidebar row now routes to `AboutSectionPanel` (edits `bio_long`), separate from BasicsPanel
4. **Basics panel cleanup** — removed Phone and Website fields; social links: 3 primary (GitHub, LinkedIn, Twitter) always visible + "＋ Add more" expander for rest; `contact_note` removed (lives in ContactPanel only)
5. **TagsInput component** — `components/ui/TagsInput.tsx`: pill tags, Enter/comma to add, × to remove, Backspace to delete last
6. **Project form** — removed Team and Status fields; tech stack now uses `TagsInput`
7. **Skills editor rewrite** — optional category title (per group), `TagsInput` for skills, add/delete group, fully wired to `updatePortfolio`; all 10 template renders guard empty `category` with conditional
8. **Experience CRUD** — `ExperiencePanel`: list → `ExperienceForm` with title, company, period, location, description, highlights (TagsInput); delete with inline confirm
9. **Education CRUD** — `EducationPanel`: list → `EducationForm` with degree, institution, period, location; delete with inline confirm
10. **Template preview modal** — zoom normalized to `820 / container_max_px` (consistent across all templates); header `background: #ffffff` + solid `border-color`
11. **Hero shows LinkedIn** — all 6 templates that showed `profolyo.me/{handle}` now use `user.social.find(s => s.type === "linkedin")?.url ?? \`profolyo.me/${user.handle}\``
12. **Welcome panel** — 3-step onboarding (Pick template → Basics → Projects) with numbered tiles
13. **dnd-kit SSR hydration fix** — `suppressHydrationWarning` added to drag handle `<button>` in `EditorSidebar.tsx`

---

## Architecture decisions made
- **Per-template components** — one self-contained component per template in `components/templates/renders/`. No shared section components.
- **CSS zoom** (not `transform: scale`) for preview panels
- **`div role="radio"`** for TemplatePicker thumbnails — avoids button-in-button hydration error
- **Thumbnail render width** = `template.layout.container_max_px`
- **Section config lives in `Portfolio`** (user-owned), not in `Template` (template defaults only)
- **Single-page editor** at `/editor` — `activePanel` in context drives main panel, no per-section routes
- **Hero + Contact always pinned** — not reorderable, show/hide only
- **`orderedBuiltInTypes(sections)`** returns reorderable types sorted by `order`, excluding hero/contact
- **`cover_color`** stays as per-project color placeholder, not replaced with image upload
- **New section types in `defaultSections`** — 4 visible by default (publications, awards, certifications, languages), 2 hidden (testimonials, volunteer)
- **`emptyPortfolio`** is the editor's starting state; `mockPortfolio` is only used for template previews

### Bug fixes + polish batch ✅
- `reorderSections` no-op bug — fixed (removed second `.map()`)
- "View Live Site" URL hardcoded — fixed to use `handle` variable
- `SocialLink.type` as React key in all 10 templates → `s.id`
- `s.label ?? s.type` → `s.label` across all templates
- `<a href="/">` → `<Link href="/">` in EditorSidebar
- ExperienceForm + ProjectForm description textareas used wrong CSS class — fixed
- Dead "Upload photo" and "Download Résumé PDF" buttons visually disabled with tooltips
- `TemplatePreviewModal` "Selected" button no longer re-triggers `onSelect()`
- Sidebar avatar: `"?"` when name blank; italic placeholder; handle fallback

### Logo ✅
- `components/ui/Logo.tsx` — inline SVG React component, `wordmark` + `monogram` variants
- `public/logos/` — SVG copies for OG/meta
- `landing/Nav.tsx` and `EditorSidebar.tsx` use `<Logo>`

### Types + data ✅
- `Language` and `Volunteer` types gain `id: string`
- Mock data updated with proper `id` fields
- `emptyPortfolio` explicitly initializes all 6 extended section arrays as `[]`

### 6 missing section editors ✅
- `PublicationsPanel` + `PublicationForm`
- `AwardsPanel` + `AwardForm`
- `CertificationsPanel` + `CertificationForm`
- `LanguagesPanel` (inline row editing)
- `TestimonialsPanel` + `TestimonialForm`
- `VolunteerPanel` + `VolunteerForm`
- All 6 wired in `SectionEditorPanel` switch

### localStorage persistence ✅
- `EditorContext` lazy-inits from `localStorage` and persists on every change
- Keys: `profolyo_portfolio_v1`, `profolyo_templateId_v1`, `profolyo_accentColor_v1`

### ProjectForm enhanced ✅
- Status toggle: 3-way button group (Live / In progress / Archived)
- Links editor: inline rows with type dropdown, URL, label, delete; `+ Add link`

### Public portfolio page ✅
- `app/[username]/PublicPortfolioView.tsx` — client component reads `profolyo_portfolio_v1`, `profolyo_templateId_v1`, `profolyo_accentColor_v1` from localStorage
- If stored portfolio's `user.handle` matches URL username → renders it with stored template/accent
- Falls back to `mockPortfolio` for the legacy `hadia` demo route
- Any other username with no matching localStorage data → `notFound()`
- `?t=` and `?a=` query params override template and accent color (for shareable preview links)
- `app/[username]/page.tsx` simplified to a thin server shell that passes username + query params down

### TemplatePreviewModal uses live portfolio ✅
- `TemplatePreviewModal` accepts optional `portfolio` prop (falls back to `mockPortfolio`)
- `TemplatePicker` threads `portfolio` prop through
- `AppearancePanel` passes live `portfolio` from `useEditor()`

### Cover photo upload ✅
- `HeroPanel` now has a real `<input type="file" accept="image/*">` wired to FileReader → base64
- Uploads stored as `user.avatar_url` (persisted to localStorage via existing effect)
- Avatar preview shows uploaded image; "Change photo" / "Remove" buttons appear after upload

### DnD reorder for Experience + Education ✅
- Shared `SortableEntryRow` component with drag handle, edit/delete with inline confirm
- Both `ExperiencePanel` and `EducationPanel` wrapped in `DndContext` + `SortableContext`
- `arrayMove` on drag end, persisted via `updatePortfolio`

### Custom section full CRUD ✅
- `updateSectionItems(sectionId, items)` added to `EditorContext` + `EditorState`
- `CustomSectionPanel` fully rewritten: add / edit / delete / DnD reorder
- `CustomItemForm`: heading (required), subheading, date, description, link URL
- All mutations persist to localStorage

---

### Onboarding handle persistence ✅
- `handleClaim()` in `app/onboarding/page.tsx` now reads `profolyo_portfolio_v1` from localStorage, patches `user.handle`, and writes it back before `router.push("/editor")`
- Handle field already existed in `BasicsPanel` (line 338 of `SectionEditorPanel.tsx`) — wired to `updatePortfolio`

---

### Mobile responsiveness — all 10 templates ✅
- `useIsMobile()` hook in `components/templates/hooks.ts` (matchMedia + resize listener, SSR-safe)
- All 10 template renders in `components/templates/renders/` are fully responsive:
  - Fluid font sizes via `clamp()` (inline styles, per rules)
  - Single-column grid layouts on mobile via `gridTemplateColumns: m ? "1fr" : "..."`
  - Reduced padding on mobile (`20px` horizontal, smaller vertical)
  - Sticky sidebars become static on mobile (AtelierTemplate)
  - Hero strips become flex column on mobile (IndexTemplate)
  - CSS `columnCount` disabled on mobile (PressTemplate)
- Code cleanup: removed `_ink` alias in `CoverTemplate.tsx`; removed unused `yearRange` import + `void` suppression in `IndexTemplate.tsx`
- `pnpm tsc --noEmit` passes with 0 errors

---

## Remaining / future work
- Real persistence (API / database) — currently localStorage only, not cross-device
- Cover photo base64 is a large payload — future: upload to object storage, store URL
- PDF export — "Download Résumé PDF" button is disabled; needs a PDF renderer (e.g. Puppeteer or react-pdf)
- Auth / login — `/login` page has GitHub button but is not wired to any auth provider
- Handle uniqueness enforcement — currently client-side reserved-word list only; no server-side check
