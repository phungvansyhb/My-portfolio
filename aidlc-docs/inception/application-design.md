# Application Design

## Architecture & Routing
- `src/app/layout.tsx` (Server Component): Loads `Syne`, `Plus_Jakarta_Sans`, and `JetBrains_Mono`, injects `ThemeProvider`, `LanguageProvider`, `AuroraBackground`, `Navbar`, `CommandPalette`, `<Analytics />`, and `<SpeedInsights />`.
- `src/app/page.tsx` (Server Component): Reads `src/data/portfolio.json` via `src/lib/portfolio.ts` and renders the interactive Bento client sections.
- `src/app/projects/[slug]/page.tsx` (Server Component): Statically generated via `generateStaticParams()`, passes case study + next project to the detail view with matching `view-transition-name`.
- `src/app/opengraph-image.tsx` & `src/app/projects/[slug]/opengraph-image.tsx`: Edge `ImageResponse` social preview cards via `next/og`.
- `src/app/sitemap.ts` & `src/app/robots.ts`: Search engine indexing metadata.

## Data Schema (`src/data/portfolio.json`)
Single JSON document typed in `src/lib/portfolio.ts` with `en` and `vi` localization blocks for `profile`, `ui`, `projects`, `skills`, and `experience`.
