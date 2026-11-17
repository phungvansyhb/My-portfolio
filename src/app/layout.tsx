import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { portfolioData } from "@/lib/portfolio";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://phungvansy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${portfolioData.profile.name} — ${portfolioData.profile.en.role}`,
    template: `%s | ${portfolioData.profile.name}`,
  },
  description: portfolioData.profile.en.subheadline,
  openGraph: {
    title: `${portfolioData.profile.name} — ${portfolioData.profile.en.role}`,
    description: portfolioData.profile.en.subheadline,
    type: "website",
    siteName: portfolioData.profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.profile.name} — ${portfolioData.profile.en.role}`,
    description: portfolioData.profile.en.subheadline,
  },
};

const themeInitScript = `
(function() {
  try {
    var mode = localStorage.getItem('pvs-theme-mode');
    var palette = localStorage.getItem('pvs-theme-palette');
    if (mode === 'light' || mode === 'dark') {
      document.documentElement.setAttribute('data-theme', mode);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    if (palette === 'glacier' || palette === 'sapphire' || palette === 'jade' || palette === 'baltic') {
      document.documentElement.setAttribute('data-palette', palette);
    } else {
      document.documentElement.setAttribute('data-palette', 'glacier');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-palette="glacier"
      suppressHydrationWarning
      className={`${syne.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AuroraBackground />
            <Navbar />
            <CommandPalette />
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
