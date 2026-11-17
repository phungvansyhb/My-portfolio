# AI-DLC Operations Rule: Vercel Deployment & Observability

1. **Vercel Ecosystem Telemetry**: Keep `<Analytics />` (`@vercel/analytics/next`) and `<SpeedInsights />` (`@vercel/speed-insights/next`) mounted in `src/app/layout.tsx`.
2. **Dynamic Metadata & OG**: Ensure `app/opengraph-image.tsx`, `app/projects/[slug]/opengraph-image.tsx`, `app/sitemap.ts`, and `app/robots.ts` build cleanly for Edge/static delivery.
3. **Production Readiness**: Verify zero console/hydration errors and document deployment steps and environment variables in `aidlc-docs/operations/deployment-guide.md`.
