# Operations & Vercel Deployment Guide

## 1. Local Verification
```bash
npm install
npx tsc --noEmit
npm run lint
npm run build
npm run start
```

## 2. Deploying to Vercel
1. Push this repository (`phungvansyhb/My-portfolio`) to GitHub.
2. Import the project in the Vercel Dashboard (`Framework Preset: Next.js`).
3. Set `NEXT_PUBLIC_SITE_URL` in Project Settings → Environment Variables (e.g., `https://your-domain.vercel.app`) so `metadataBase`, `sitemap.xml`, and OpenGraph canonical URLs resolve to your production domain.
4. Enable **Vercel Analytics** and **Vercel Speed Insights** in the Vercel Dashboard (the React components are pre-wired in `src/app/layout.tsx`).

## 3. Customizing Content & Themes
- **Content (EN / VI)**: Edit `src/data/portfolio.json`.
- **Colors & Dynamic Palettes**: Edit CSS custom properties in `src/styles/tokens.css`.
