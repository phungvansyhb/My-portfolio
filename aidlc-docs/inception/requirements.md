# Requirements Specification

## Functional Requirements
1. **Bento Grid Showcase**: Asymmetric, responsive glassmorphic Bento Grid presenting Hero identity, Interactive Engineering Workbench (`Preview` / `Architecture` / `Edge Telemetry`), Featured Case Studies (`01`–`04`), Interactive Stack Matrix, Experience Timeline, and Contact Stage.
2. **Case Study Detail Pages (`/projects/[slug]`)**: Dedicated deep-dive routes displaying challenge, architecture node flow, engineering trade-offs, measured outcomes, and next-project navigation.
3. **View Transitions**: Shared-element morphing (`view-transition-name`) for project cover artwork and titles when navigating between the home Bento grid and `/projects/[slug]`.
4. **Dynamic CSS Theme System**:
   - Dark / Light mode toggle persisted in `localStorage`.
   - Multi-palette aurora preset switcher (`glacier`, `sapphire`, `jade`, `baltic`) driven cleanly by CSS custom properties in `src/styles/tokens.css`.
5. **Bilingual Support (EN / VI)**: Instant English / Vietnamese switching across all UI labels and `src/data/portfolio.json` content, persisted in `localStorage`.
6. **Command Palette (`⌘K` / `Ctrl+K`)**: Keyboard-accessible quick launcher for case studies, theme/palette toggles, language toggle, and 1-click email copy.
7. **Contact Experience**: Quick-copy email button with feedback toast + interactive Contact Drawer generating a pre-filled `mailto:` link.

## Non-Functional Requirements
- **Performance**: Server Components by default; GPU-composited transforms/backdrop blur; `prefers-reduced-motion` respected.
- **Vercel Native**: `@vercel/analytics`, `@vercel/speed-insights`, `next/og` dynamic OpenGraph cards, `sitemap.ts`, and `robots.ts`.
- **Maintainability**: Single `src/data/portfolio.json` for all content and single `src/styles/tokens.css` for theme customization.
