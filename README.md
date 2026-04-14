# Ali Abdulhadi – Engineering Portfolio

A dark, futuristic, case-study-driven engineering portfolio built with React + Vite + TypeScript + Tailwind CSS.

## Latest Updates (April 2026)

- Curated project detail pages so **code snippets are shown only where they represent strong engineering accomplishments**.
- Upgraded selected snippets (e.g., Roomaty and AI Financial Chat) to more advanced, architecture-level examples.
- Contact form now submits via **Formspree** (async submit, loading, success, and error states).
- Media references verified for production: all assets referenced in `src/data/projects.ts` resolve to files in `public/images`.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy to GitHub Pages

This project is configured to deploy automatically to **GitHub Pages** using GitHub Actions.

### 1) Repository settings (one-time)

In your GitHub repository:
- Go to **Settings → Pages**
- Set **Source** to **GitHub Actions**

### 2) Push to `main`

Every push to the `main` branch triggers the workflow at:

```text
.github/workflows/deploy.yml
```

The workflow builds the app and publishes `dist/` to GitHub Pages.

### 3) Push your updates

```bash
git add .
git commit -m "Update portfolio projects, Formspree contact, and deployment docs"
git push origin main
```

After push, check:
- **Actions** tab for successful workflow run
- **Settings → Pages** shows the deployed site URL

### Notes

- `vite.config.ts` sets the correct base path during GitHub Actions builds, so project pages like
  `https://<username>.github.io/<repo>/` work correctly.
- The app already uses `HashRouter`, which is compatible with GitHub Pages routing.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── SectionHeader.tsx
│       ├── ProjectCard.tsx
│       ├── TechBadge.tsx
│       ├── CodeBlock.tsx       ← Prism.js syntax highlighting
│       ├── DiagramContainer.tsx ← Mermaid.js diagrams
│       └── CTASection.tsx
├── data/
│   ├── projects.ts             ← All 10 project case studies
│   └── stack.ts                ← Full tech stack list
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── App.tsx                     ← Router + layout
├── main.tsx
└── index.css                   ← Tailwind + custom globals
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** – fast dev server and bundler
- **Tailwind CSS v3** – utility-first styling
- **Framer Motion** – page transitions and scroll animations
- **React Router v6** – client-side routing
- **Mermaid.js** – architecture/workflow diagrams
- **Prism.js** – syntax-highlighted code snippets

## Adding / Editing Projects

All project content lives in `src/data/projects.ts`. Each project object includes:
- Title, slug, category, summary, role, stack
- Problem, solution, features, technicalDetails, outcome
- Optional `diagram` (Mermaid code) and `codeSnippet`

## Contact Form (Formspree)

- Current endpoint in app: `https://formspree.io/f/meevonzw`
- Optional override via env:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/meevonzw
```

If `VITE_FORMSPREE_ENDPOINT` is set, it takes priority.

## Media Reliability Notes

- Project gallery assets are sourced from `public/images`.
- `src/data/projects.ts` uses `asset('/images/...')` paths, which are stable for Vite + GitHub Pages output.
- Keep filenames lowercase/kebab-case where possible to avoid case-sensitivity issues on some hosts.

## Design System

- **Background**: `#020510` (near-black navy)
- **Accent**: `#06b6d4` (electric cyan)
- **Text**: `slate-100` / `slate-400`
- **Cards**: `#071428` with `border-cyan-500/10`
