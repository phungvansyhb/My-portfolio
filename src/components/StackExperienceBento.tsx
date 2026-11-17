"use client";

import React from "react";
import { portfolioData } from "@/lib/portfolio";
import { useLanguage } from "./LanguageProvider";
import styles from "./StackExperienceBento.module.css";

interface StackExperienceBentoProps {
  activeSkill: string | null;
  onSelectSkill: (name: string | null, slugs: string[] | null) => void;
}

export function StackExperienceBento({
  activeSkill,
  onSelectSkill,
}: StackExperienceBentoProps) {
  const { locale } = useLanguage();
  const stackCopy = portfolioData.ui[locale].stack;
  const expCopy = portfolioData.ui[locale].experience;

  return (
    <section className={styles.grid} aria-label="Technical Capabilities and Experience">
      <article id="stack" className={`glass-bento ${styles.stackCard}`}>
        <div>
          <div className="mono-label">{stackCopy.eyebrow}</div>
          <h2 className={`display-heading ${styles.cardTitle}`}>{stackCopy.title}</h2>
          <p className={styles.hint}>{stackCopy.hint}</p>
        </div>

        <div className={styles.groups}>
          {portfolioData.skills.map((group) => (
            <div key={group.id} className={styles.groupBox}>
              <div className={styles.groupTitle}>{group[locale].title}</div>
              <div className={styles.chips}>
                {group.items.map((item) => {
                  const isActive = activeSkill === item.name;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() =>
                        isActive
                          ? onSelectSkill(null, null)
                          : onSelectSkill(item.name, item.projects)
                      }
                      onMouseEnter={() => {
                        if (!activeSkill) onSelectSkill(null, item.projects);
                      }}
                      onMouseLeave={() => {
                        if (!activeSkill) onSelectSkill(null, null);
                      }}
                      className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                      aria-pressed={isActive}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article id="experience" className={`glass-bento ${styles.expCard}`}>
        <div>
          <div className="mono-label">{expCopy.eyebrow}</div>
          <h2 className={`display-heading ${styles.cardTitle}`}>{expCopy.title}</h2>
        </div>

        <div className={styles.timeline}>
          {portfolioData.experience.map((exp) => (
            <div key={`${exp.company}-${exp.period}`} className={styles.expItem}>
              <div className={styles.expTop}>
                <span className={styles.expRole}>{exp[locale].role}</span>
                <span className={styles.expPeriod}>{exp.period}</span>
              </div>
              <div className={styles.expCompany}>{exp.company}</div>
              <p className={styles.expSummary}>{exp[locale].summary}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
