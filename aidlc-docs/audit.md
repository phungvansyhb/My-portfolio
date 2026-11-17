# AI-DLC Audit Trail

Chronological log of user requirements, clarifications, architectural decisions, and approval gates.

## 2026-11-16 — Phase 1: Inception
1. **Initial Intent**: User requested a portfolio website using Next.js stack and the Vercel ecosystem.
2. **Clarification Round 1 (Role, Scope, Vercel Tools)**:
   - Role focus: **Full-Stack / Software Engineer**
   - Core sections: **Hero + Featured Case Studies** (paired with Stack/Experience and Contact)
   - Vercel ecosystem: **Vercel Analytics, Speed Insights, and Dynamic OG Images (`next/og`)**
   - Visual expectation: **"có thể wow hơn được không"** -> Elevated to interactive kinetic Bento showcase + live Engineering Workbench + `⌘K` Command Palette.
3. **Clarification Round 2 (Content, Layout, Localization, Transitions)**:
   - Localization: **Include EN / VI language switcher**
   - Data source: **Generated sample showcase stored in a single editable JSON file (`src/data/portfolio.json`)**
   - Contact flow: **Quick-Copy Email + Pre-filled `mailto:` Contact Drawer**
   - Visual style: **Bento Grid + Glassmorphism & Aurora Gradients**
   - Navigation motion: **View Transitions when navigating from project list to detail (`/projects/[slug]`)**
4. **Clarification Round 3 (Theming & Governance)**:
   - Color system: **Dynamic CSS-configurable theme** allowing live palette switching + easy CSS token editing in `src/styles/tokens.css` (built-in presets: *Nordic Glacier*, *Sapphire Amber*, *Midnight Jade*, *Baltic Slate*, plus Dark/Light mode).
   - Process standard: **Adopt AWS AI-DLC standard instructions** (`AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/ai-dlc-workflow.mdc`, `.aidlc-rule-details/`, and `aidlc-docs/`).
5. **Approval Gate**: User approved `implementation_plan.md` to transition from Inception to Construction.

## 2026-11-16 — Phase 2 & 3: Construction & Operations Complete
6. **Implementation**: Scaffolded Next.js 16.4.6 App Router (`TypeScript`, `Vanilla CSS Modules`, `framer-motion`, `lucide-react`, `@vercel/analytics`, `@vercel/speed-insights`).
7. **Design & Features Delivered**:
   - Dynamic CSS Theme System (`src/styles/tokens.css`) with 4 live Aurora palettes (`glacier`, `sapphire`, `jade`, `baltic`) and Light/Dark modes.
   - Single bilingual JSON data file (`src/data/portfolio.json`) supporting instant EN / VI switching.
   - Bento Grid layout with Frosted Glassmorphism, Multi-layer Aurora Gradients, Interactive Engineering Workbench, `⌘K` Command Palette, Contact Drawer, and Native View Transitions (`view-transition-name`) to `/projects/[slug]`.
   - Dynamic `next/og` social cards, `sitemap.xml`, `robots.txt`, and AI-DLC harness steering files.
