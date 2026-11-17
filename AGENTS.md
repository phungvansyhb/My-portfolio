# AGENTS.md — AI-DLC Standard Workflow Instructions

This repository follows the **AWS AI-DLC (AI-Driven Development Life Cycle)** methodology. All AI coding agents working in this repository must follow this structured three-phase workflow and enforce human-in-the-loop approval gates.

## 1. Core AI-DLC Workflow Rules

- **Three-Phase Lifecycle**:
  1. **Phase 1 — Inception** (*What & Why*): Analyze requests, inspect workspace (`aidlc-docs/`), clarify ambiguities using `.aidlc-rule-details/common/question-format-guide.md`, and document requirements + architecture in `aidlc-docs/inception/`.
  2. **Phase 2 — Construction** (*How*): Create a file-level checklist in `aidlc-docs/construction/code-plan.md`, obtain user approval before editing `src/`, implement code cleanly, and verify with `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
  3. **Phase 3 — Operations** (*Deploy & Observe*): Maintain Vercel deployment configuration, `@vercel/analytics`, `@vercel/speed-insights`, `next/og` routes, and `aidlc-docs/operations/deployment-guide.md`.
- **Approval Gates**: Never jump straight into modifying application code (`src/`) on non-trivial requests without presenting a plan and getting explicit user approval.
- **Documentation Separation**: All lifecycle state, plans, ADRs, and audit logs live strictly inside `aidlc-docs/`. Application source code lives strictly inside `src/` and static assets inside `public/`.
- **Session Continuity**: Follow `.aidlc-rule-details/common/session-continuity.md`—always read `aidlc-docs/aidlc-state.md` and `aidlc-docs/audit.md` when starting or resuming a session.

## 2. Project-Specific Technical Guardrails

- **Stack**: Next.js App Router (TypeScript, React 19), Vanilla CSS (`src/styles/tokens.css` + `*.module.css`), `framer-motion`, Native View Transitions (`ViewTransitionLink`), and Vercel Ecosystem (`@vercel/analytics`, `@vercel/speed-insights`, `next/og`).
- **Content Source**: Portfolio copy and projects live in `src/data/portfolio.json` with complete `en` and `vi` localization pairs. Never hardcode portfolio copy inside components.
- **Dynamic Theme System**: Colors, aurora gradients, and glass surfaces are configured via CSS custom properties in `src/styles/tokens.css` (`[data-palette="..."]` + `[data-theme="dark" | "light"]`). Avoid hardcoded hex colors inside component CSS modules.
- **View Transitions**: Preserve matching `view-transition-name` attributes (`project-cover-<slug>` and `project-title-<slug>`) between `ProjectsBento.tsx` and `ProjectDetailClient.tsx`.

## 3. Modular Rule References

Load detailed rules on demand from `.aidlc-rule-details/`:
- `.aidlc-rule-details/common/session-continuity.md`
- `.aidlc-rule-details/common/content-validation.md`
- `.aidlc-rule-details/common/question-format-guide.md`
- `.aidlc-rule-details/inception/requirements-and-design.md`
- `.aidlc-rule-details/construction/code-generation.md`
- `.aidlc-rule-details/operations/vercel-deployment.md`
