"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { portfolioData, type ProjectItem } from "@/lib/portfolio";
import { GitHubIcon } from "./BrandIcons";
import { useLanguage } from "./LanguageProvider";
import { ViewTransitionLink } from "./ViewTransitionLink";
import styles from "./ProjectDetailClient.module.css";

interface ProjectDetailClientProps {
  project: ProjectItem;
  nextProject: ProjectItem;
}

export function ProjectDetailClient({
  project,
  nextProject,
}: ProjectDetailClientProps) {
  const { locale } = useLanguage();
  const copy = portfolioData.ui[locale].projects;
  const content = project[locale];
  const nextContent = nextProject[locale];

  return (
    <main className="page-shell">
      <div className={styles.backRow}>
        <ViewTransitionLink href="/#work" className={`glass-pill ${styles.backLink}`}>
          <ArrowLeft size={15} />
          <span>{copy.backToWork}</span>
        </ViewTransitionLink>
      </div>

      <article className={`glass-bento ${styles.heroCard}`}>
        <div className={styles.metaBar}>
          <span className="mono-label">
            {project.index} / {content.role} • {project.year}
          </span>
          <div className={styles.linksRow}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionPill}
            >
              <ExternalLink size={14} />
              <span>{copy.liveDemo}</span>
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionPill}
            >
              <GitHubIcon size={14} />
              <span>{copy.sourceCode}</span>
            </a>
          </div>
        </div>

        <div>
          <h1
            className={`display-heading ${styles.title}`}
            style={{ viewTransitionName: `project-title-${project.slug}` }}
          >
            {content.title}
          </h1>
          <p className={styles.tagline}>{content.tagline}</p>
        </div>

        <div className={styles.stackList}>
          {project.stack.map((tech) => (
            <span key={tech} className={styles.stackBadge}>
              {tech}
            </span>
          ))}
        </div>

        <div
          className={styles.coverFrame}
          style={{ viewTransitionName: `project-cover-${project.slug}` }}
        >
          <Image
            src={project.image}
            alt={content.title}
            fill
            sizes="(max-width: 1220px) 100vw, 1150px"
            className={styles.coverImg}
            priority
          />
        </div>
      </article>

      <section className={styles.bentoBody} aria-label="Case study breakdown">
        <div className={`glass-bento ${styles.metricsCell}`}>
          {content.metrics.map((metric) => (
            <div key={metric.label} className={styles.metricItem}>
              <span className={styles.metricVal}>{metric.value}</span>
              <span className={styles.metricLbl}>{metric.label}</span>
            </div>
          ))}
        </div>

        <article className={`glass-bento ${styles.halfCell}`}>
          <div className="mono-label">{copy.challenge}</div>
          <p className={styles.bodyCopy}>{content.challenge}</p>
        </article>

        <article className={`glass-bento ${styles.halfCell}`}>
          <div className="mono-label">{copy.architecture}</div>
          <div className={styles.topologyGrid}>
            {project.architecture.map((node, i) => (
              <div key={node.id} className={styles.nodeBox}>
                <div className={styles.nodeIndex}>0{i + 1}</div>
                <div className={styles.nodeName}>{node.label}</div>
                <div className={styles.nodeMeta}>{node.meta}</div>
              </div>
            ))}
          </div>
        </article>

        <article className={`glass-bento ${styles.halfCell}`}>
          <div className="mono-label">{copy.solution}</div>
          <p className={styles.bodyCopy}>{content.solution}</p>
        </article>

        <article className={`glass-bento ${styles.halfCell}`}>
          <div className="mono-label">{copy.tradeoffs}</div>
          <ul className={styles.tradeoffList}>
            {content.tradeoffs.map((item) => (
              <li key={item} className={styles.tradeoffItem}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <ViewTransitionLink
        href={`/projects/${nextProject.slug}`}
        className={`glass-bento ${styles.nextCard}`}
      >
        <div>
          <div className="mono-label">
            {copy.nextProject} ({nextProject.index})
          </div>
          <div className={styles.nextTitle}>{nextContent.title}</div>
        </div>
        <ArrowRight size={22} />
      </ViewTransitionLink>
    </main>
  );
}
