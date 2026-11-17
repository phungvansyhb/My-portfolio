# Phùng Văn Sỹ — Full-Stack Software Engineer Portfolio

Interactive Bento Grid & Aurora Glassmorphism portfolio built with **Next.js App Router**, **TypeScript**, **Native View Transitions**, **Dynamic CSS Theme Presets**, **EN / VI Localization**, and the **Vercel Ecosystem** (`@vercel/analytics`, `@vercel/speed-insights`, `next/og`), governed by **AWS AI-DLC** standard instructions.

## Key Features
- **Bento Grid + Glassmorphism & Aurora Gradients**: Asymmetric frosted glass tiles layered over drifting multi-stop aurora ambient gradients.
- **Dynamic CSS Theme System**: Live Light / Dark toggle + 4 built-in Aurora Palette presets (*Glacier*, *Sapphire*, *Jade*, *Baltic*). Edit or add palettes anytime in `src/styles/tokens.css`.
- **Single Editable JSON Data File**: Update your profile, experience, skills, and bilingual case studies (`en` / `vi`) in `src/data/portfolio.json`.
- **View Transitions**: Shared-element morphing (`view-transition-name`) from the Bento case-study list to `/projects/[slug]` detail pages.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Quick-jump to case studies, switch themes/languages, or copy contact email.
- **Vercel Native**: Integrated `@vercel/analytics`, `@vercel/speed-insights`, Edge `next/og` social cards, `sitemap.ts`, and `robots.ts`.
- **AI-DLC Standard Instructions**: Includes `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/ai-dlc-workflow.mdc`, `.aidlc-rule-details/`, and `aidlc-docs/`.

## Local Development
```bash
npm install
npm run dev
```

## Verification
```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Customizing Content & Colors
1. **Portfolio Content (`EN` & `VI`)**: Edit `src/data/portfolio.json`.
2. **Project Artwork**: Replace images in `public/images/`.
3. **Theme Palettes**: Edit the `--palette-aurora-*` and `--palette-canvas-*` CSS variables in `src/styles/tokens.css`.
