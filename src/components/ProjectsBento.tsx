"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio";
import { useLanguage } from "./LanguageProvider";
import { ViewTransitionLink } from "./ViewTransitionLink";
import styles from "./ProjectsBento.module.css";

interface ProjectsBentoProps {
  highlightedSlugs: string[] | null;
}

export function ProjectsBento({ highlightedSlugs }: ProjectsBentoProps) {
  const { locale } = useLanguage();
  const copy = portfolioData.ui[locale].projects;

  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={styles.sectionHeader}>
        <div>
          <div className="mono-label">{copy.eyebrow}</div>
          <h2 id="work-heading" className={`display-heading ${styles.sectionTitle}`}>
            {copy.title}
          </h2>
        </div>
        <p className={styles.sectionSubtitle}>{copy.subtitle}</p>
      </div>

      <div className={styles.bentoGrid}>
        {portfolioData.projects.map((project, idx) => {
          const localized = project[locale];
          const isMatched =
            highlightedSlugs === null || highlightedSlugs.includes(project.slug);
          const spanClass =
            project.featuredSpan === "wide" ? styles.cardWide : styles.cardStandard;

          return (
            <motion.article
              key={project.slug}
              className={`glass-bento ${styles.card} ${spanClass} ${
                highlightedSlugs !== null
                  ? isMatched
                    ? styles.cardHighlighted
                    : styles.cardDimmed
                  : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <ViewTransitionLink
                href={`/projects/${project.slug}`}
                className={styles.cardLink}
                ariaLabel={`${localized.title} — ${copy.readCase}`}
              >
                <div
                  className={styles.mediaWrap}
                  style={{ viewTransitionName: `project-cover-${project.slug}` }}
                >
                  <span className={styles.cardIndex}>
                    {project.index} / {project.year}
                  </span>
                  <Image
                    src={project.image}
                    alt={localized.title}
                    fill
                    sizes="(max-width: 960px) 100vw, 660px"
                    className={styles.mediaImg}
                  />
                </div>

                <div className={styles.cardBody}>
                  <div>
                    <h3
                      className={styles.projectTitle}
                      style={{ viewTransitionName: `project-title-${project.slug}` }}
                    >
                      {localized.title}
                    </h3>
                    <p className={styles.projectTagline}>{localized.tagline}</p>
                  </div>

                  <div className={styles.metricsRow}>
                    {localized.metrics.map((m) => (
                      <div key={m.label} className={styles.metricPill}>
                        <span className={styles.metricVal}>{m.value}</span>
                        <span className={styles.metricLabel}>{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.footerRow}>
                    <div className={styles.stackRow}>
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className={styles.stackTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className={styles.ctaBadge}>
                      <span>{copy.readCase}</span>
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </ViewTransitionLink>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
