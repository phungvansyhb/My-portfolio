# AI-DLC Construction Rule: Two-Step Code Generation & Verification

## Step 1: Code Plan
Maintain a file-level generation checklist in `aidlc-docs/construction/code-plan.md` specifying `[NEW]` or `[MODIFY]` per file before editing code.

## Step 2: Execution & Guardrails
- **Next.js App Router Conventions**: Default to Server Components; isolate `"use client"` strictly to interactive islands (Theme/Language providers, Command Palette, Hero Workbench, Framer Motion wrappers, Contact Drawer).
- **CSS Architecture**: Define all theme palettes and glass/aurora tokens in `src/styles/tokens.css` and component styles in `*.module.css`.
- **View Transitions**: Maintain matching `view-transition-name` tokens between Bento project cards and `/projects/[slug]` detail headers.
- **Verification**: Run `npx tsc --noEmit`, `npm run lint`, and `npm run build` after implementation, and verify rendered routes in a running dev server.
