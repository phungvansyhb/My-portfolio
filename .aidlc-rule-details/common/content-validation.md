# AI-DLC Common Rule: Content & Artifact Validation

Before marking any stage complete:
- **Zero Placeholders**: Never leave `TODO`, `Lorem ipsum`, or broken image paths in `src/` or `public/`.
- **Strict Separation**: Keep all AI-DLC planning, requirements, ADRs, and logs inside `aidlc-docs/`. Keep application source code strictly inside `src/` and static assets inside `public/`.
- **Type & Build Integrity**: All changes to `src/` must pass `npx tsc --noEmit`, `npm run lint`, and `npm run build` with zero errors.
- **Bilingual & Theme Parity**: Any user-facing copy added to `src/data/portfolio.json` must provide both `en` and `vi` entries, and UI styling must use semantic CSS tokens in `src/styles/tokens.css` rather than hardcoded hex values.
