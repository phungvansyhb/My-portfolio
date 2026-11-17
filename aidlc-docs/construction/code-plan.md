# Construction Code Plan

Checklist of application and governance files generated:

- [x] `next.config.ts` — Image optimization (`avif`/`webp`)
- [x] `src/styles/tokens.css` — Dynamic CSS palette presets + semantic light/dark variables
- [x] `src/app/globals.css` — Reset, glassmorphism utilities, and View Transition animations
- [x] `src/data/portfolio.json` — Complete editable EN/VI portfolio content
- [x] `src/lib/portfolio.ts` — Strongly-typed JSON loader & helpers
- [x] `src/components/ThemeProvider.tsx` — Mode (`dark`/`light`) + Palette (`glacier`/`sapphire`/`jade`/`baltic`) context via `useSyncExternalStore`
- [x] `src/components/LanguageProvider.tsx` — Bilingual (`en`/`vi`) context via `useSyncExternalStore`
- [x] `src/components/ViewTransitionLink.tsx` — Wrapper around `next/link` calling `document.startViewTransition`
- [x] `src/components/AuroraBackground.tsx` & `.module.css` — Animated multi-layer aurora backdrop
- [x] `src/components/BrandIcons.tsx` — Inline GitHub & LinkedIn icons
- [x] `src/components/Navbar.tsx` & `.module.css` — Floating glass nav, EN/VI toggle, palette & mode controls, `⌘K` trigger
- [x] `src/components/CommandPalette.tsx` & `.module.css` — Keyboard launcher (`⌘K` / `Ctrl+K`)
- [x] `src/components/BentoHero.tsx` & `.module.css` — Hero Bento + Interactive Workbench + Quick Profile tiles
- [x] `src/components/ProjectsBento.tsx` & `.module.css` — Case Studies Bento Grid with shared `view-transition-name`
- [x] `src/components/StackExperienceBento.tsx` & `.module.css` — Interactive Stack Matrix & Experience Timeline
- [x] `src/components/ContactBento.tsx` & `.module.css` — Quick-Copy Email + Contact Drawer
- [x] `src/components/ProjectDetailClient.tsx` & `.module.css` — Case Study detail view with morphing cover & title
- [x] `src/app/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/app/layout.tsx`
- [x] `src/app/opengraph-image.tsx`, `src/app/projects/[slug]/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- [x] `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/ai-dlc-workflow.mdc`, `README.md`
