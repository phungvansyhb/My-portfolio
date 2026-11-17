# GitHub Copilot Custom Instructions (AI-DLC Standard)

Follow the AI-DLC workflow and architectural standards defined in `AGENTS.md` and `.aidlc-rule-details/`.

- Check `aidlc-docs/aidlc-state.md` and `aidlc-docs/audit.md` before proposing changes.
- Keep `src/data/portfolio.json` bilingual (`en` and `vi`) and theme colors driven by `src/styles/tokens.css`.
- Verify all changes with `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
