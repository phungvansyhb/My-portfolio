# AI-DLC Common Rule: Session Continuity

When resuming work across sessions in this repository:
1. Read `aidlc-docs/aidlc-state.md` to determine the active Phase (`Inception`, `Construction`, `Operations`) and the first incomplete item (`⏳` or `⏸️`).
2. Read `aidlc-docs/audit.md` to review approved architectural decisions, palette/theme choices, and user constraints.
3. Read relevant phase artifacts in `aidlc-docs/<phase>/` before modifying any file under `src/`.
4. Do not regenerate completed stages unless `aidlc-state.md` indicates a revision.
5. Keep `aidlc-docs/` updated whenever requirements, design tokens, or project phases change.
