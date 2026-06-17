<img width="1373" height="433" alt="image" src="https://github.com/user-attachments/assets/156c5ae2-9030-4bf8-a784-2b783d356766" /># Profolyo

Profolyo is a portfolio builder and editor built with Next.js 16, React 19, Tailwind CSS, and TipTap. It focuses on dynamic portfolio creation, editable portfolio sections, and reusable template components for developer, designers and creators.

The app is live at [profolyo.me](https://profolyo.me)

## Key Features

- Portfolio editor with drag-and-drop support using `@dnd-kit`
- Rich text editing powered by `@tiptap/react` and TipTap extensions
- Template-driven portfolio structure with prebuilt portfolio JSON templates
- Public portfolio preview for user portfolios under `app/[username]`
- Modular layout components for editor, landing, and portfolio pages

## Project Structure

- `app/` - Next.js App Router pages and layouts
  - `app/page.tsx` - Landing / home entrypoint
  - `app/[username]/` - Public portfolio rendering pages
  - `app/editor/` - Portfolio editor UI
  - `app/login/` and `app/onboarding/` - authentication and first-run flows
- `components/` - UI components and editor-specific subcomponents
- `contexts/` - React context providers such as `EditorContext`
- `lib/` - utility helpers, templates, fonts, and mock data
- `templates/` - portfolio template definitions and metadata
- `types/` - application TypeScript types
- `public/` - static assets such as logos and icons
- `new templates/` and `portfolio-template-components/` - additional HTML-based portfolio templates and design guide assets

## Local Development

This repository uses `pnpm` as the package manager. Run the following commands from the project root.

```bash
pnpm install
pnpm dev
```

Then open:

```bash
http://localhost:3000
```

### Available scripts

- `pnpm dev` - starts the Next.js development server
- `pnpm build` - builds the production app
- `pnpm start` - serves the production build
- `pnpm lint` - runs ESLint

## Dependencies

Key dependencies include:

- `next` 16.2.6
- `react` 19.2.4
- `react-dom` 19.2.4
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-placeholder`
- `lucide-react`, `clsx`, `tailwind-merge`

## How to Contribute

The editor interface is built with reusable components in `components/editor/`, while global UI pieces are in `components/landing/` and `components/ui/`.

To add a new portfolio section or template:

1. Add the template definition to `templates/` or `lib/templates.ts`
2. Add component rendering logic in the appropriate `components/` folder
3. Update type definitions in `types/` as needed

## Deployment

The app is live at [profolyo.me](https://profolyo.me), hosted on **Vercel** with the domain registered on **Cloudflare**.

## GitHub Push Instructions

This repository currently does not have a GitHub remote configured locally.

To add a remote and push your branch, run:

```bash
git remote add origin <git@github.com:username/repo.git>
git branch -M main
git add README.md
git commit -m "Update README with project overview and usage"
git push -u origin main
```

If you already have an existing remote repository, replace `<git@github.com:username/repo.git>` with your repository URL.

## Notes

- The repository uses `pnpm-lock.yaml`, so continuing with `pnpm` is recommended for consistent dependency management.
- The app routing is based on Next.js App Router conventions in `app/`.
- The editor state and portfolio templates are organized through `contexts/` and `lib/mock-data.ts`.
