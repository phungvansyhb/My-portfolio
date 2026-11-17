import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getNextProject,
  getProjectBySlug,
} from "@/lib/portfolio";
import { ProjectDetailClient } from "@/components/ProjectDetailClient";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.en.title,
    description: project.en.tagline,
    openGraph: {
      title: project.en.title,
      description: project.en.tagline,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return <ProjectDetailClient project={project} nextProject={nextProject} />;
}
