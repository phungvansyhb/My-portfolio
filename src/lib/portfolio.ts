import rawData from "@/data/portfolio.json";

export type Locale = "en" | "vi";
export type PaletteId = "glacier" | "sapphire" | "jade" | "baltic";
export type ThemeMode = "dark" | "light";

export interface LocalizedText {
  en: string;
  vi: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  meta: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLocaleContent {
  title: string;
  tagline: string;
  role: string;
  metrics: ProjectMetric[];
  challenge: string;
  solution: string;
  tradeoffs: string[];
}

export interface ProjectItem {
  slug: string;
  index: string;
  featuredSpan: "wide" | "standard";
  year: string;
  image: string;
  liveUrl: string;
  repoUrl: string;
  stack: string[];
  architecture: ArchitectureNode[];
  en: ProjectLocaleContent;
  vi: ProjectLocaleContent;
}

export interface SkillGroup {
  id: string;
  en: { title: string };
  vi: { title: string };
  items: {
    name: string;
    projects: string[];
  }[];
}

export interface ExperienceItem {
  period: string;
  company: string;
  en: { role: string; summary: string };
  vi: { role: string; summary: string };
}

export type PortfolioData = Omit<
  typeof rawData,
  "projects" | "skills" | "experience"
> & {
  projects: ProjectItem[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
};

export const portfolioData = rawData as unknown as PortfolioData;

export function getAllProjectSlugs(): string[] {
  return portfolioData.projects.map((project) => project.slug);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return portfolioData.projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): ProjectItem {
  const idx = portfolioData.projects.findIndex((p) => p.slug === slug);
  const nextIdx = idx === -1 ? 0 : (idx + 1) % portfolioData.projects.length;
  return portfolioData.projects[nextIdx];
}

export const PALETTE_OPTIONS: {
  id: PaletteId;
  label: string;
  swatches: [string, string, string];
}[] = [
  { id: "glacier", label: "Glacier", swatches: ["#0f4c5c", "#10b981", "#38bdf8"] },
  { id: "sapphire", label: "Sapphire", swatches: ["#1e3a8a", "#3b82f6", "#f59e0b"] },
  { id: "jade", label: "Jade", swatches: ["#14532d", "#2dd4bf", "#64748b"] },
  { id: "baltic", label: "Baltic", swatches: ["#166088", "#4a6fa5", "#4f6d7a"] },
];
