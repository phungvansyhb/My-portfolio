"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Check, Command, Copy, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { useLanguage } from "./LanguageProvider";
import { ViewTransitionLink } from "./ViewTransitionLink";
import styles from "./BentoHero.module.css";

type WorkbenchTab = "preview" | "architecture" | "telemetry";

export function BentoHero() {
  const { locale } = useLanguage();
  const [tab, setTab] = useState<WorkbenchTab>("preview");
  const [selectedNode, setSelectedNode] = useState(0);
  const [copied, setCopied] = useState(false);
  const [vnTime, setVnTime] = useState("--:--");
  const [mousePos, setMousePos] = useState({ x: "50%", y: "35%" });

  const profile = portfolioData.profile;
  const profileCopy = profile[locale];
  const heroCopy = portfolioData.ui[locale].hero;
  const flagship = portfolioData.projects[0];
  const flagshipCopy = flagship[locale];

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setVnTime(formatted);
      } catch {
        setVnTime("UTC+7");
      }
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  };

  return (
    <section className={styles.heroGrid} aria-label="Introduction and Engineering Workbench">
      {/* Main Hero Bento Card */}
      <motion.article
        className={`glass-bento ${styles.heroMain}`}
        onMouseMove={handleMouseMove}
        style={
          {
            "--mx": mousePos.x,
            "--my": mousePos.y,
          } as React.CSSProperties
        }
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.heroSpotlight} aria-hidden="true" />

        <div>
          <div className={styles.identityRow}>
            <span className={styles.nameTag}>
              {profile.name} — {profileCopy.role}
            </span>
            <span className={styles.availability}>{profileCopy.availability}</span>
          </div>

          <h1 className={`display-heading ${styles.headline}`}>{profileCopy.headline}</h1>
          <p className={styles.subheadline}>{profileCopy.subheadline}</p>
        </div>

        <div className={styles.ctaRow}>
          <a href="#work" className={styles.btnPrimary}>
            <span>{heroCopy.ctaPrimary}</span>
            <ArrowDownRight size={16} />
          </a>

          <button
            type="button"
            className={styles.btnGhost}
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
          >
            <Command size={15} />
            <span>{heroCopy.ctaSecondary}</span>
          </button>

          <div className={styles.socialGroup}>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="GitHub"
            >
              <GitHubIcon size={17} />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={17} />
            </a>
          </div>
        </div>
      </motion.article>

      {/* Interactive Workbench Bento Card */}
      <motion.aside
        className={`glass-bento ${styles.workbench}`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.workbenchHeader}>
          <span className="mono-label">{heroCopy.workbenchTitle}</span>
          <div className={styles.tabs} role="tablist" aria-label="Workbench modes">
            {(["preview", "architecture", "telemetry"] as WorkbenchTab[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`${styles.tabBtn} ${tab === key ? styles.tabActive : ""}`}
              >
                {heroCopy.tabs[key]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.workbenchBody}>
          {tab === "preview" && (
            <>
              <div className={styles.previewMedia}>
                <Image
                  src={flagship.image}
                  alt={flagshipCopy.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className={styles.previewImg}
                  priority
                />
              </div>
              <div className={styles.previewFooter}>
                <div>
                  <div className="mono-label">
                    {flagship.index} • {flagship.year}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.96rem", marginTop: "2px" }}>
                    {flagshipCopy.title}
                  </div>
                </div>
                <ViewTransitionLink href={`/projects/${flagship.slug}`} className="glass-pill">
                  <span>{portfolioData.ui[locale].projects.readCase}</span>
                  <ArrowUpRight size={14} />
                </ViewTransitionLink>
              </div>
            </>
          )}

          {tab === "architecture" && (
            <>
              <div className={styles.nodeFlow}>
                {flagship.architecture.map((node, idx) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNode(idx)}
                    className={`${styles.nodeCard} ${
                      selectedNode === idx ? styles.nodeCardActive : ""
                    }`}
                  >
                    <div className={styles.nodeTitle}>{node.label}</div>
                    <div className={styles.nodeMeta}>{node.meta}</div>
                  </button>
                ))}
              </div>
              <div className={styles.nodeInspect}>
                <span>
                  [NODE 0{selectedNode + 1}] {flagship.architecture[selectedNode]?.label} →{" "}
                  {flagship.architecture[selectedNode]?.meta}
                </span>
              </div>
            </>
          )}

          {tab === "telemetry" && (
            <div className={styles.telemetryList}>
              {flagshipCopy.metrics.map((metric, idx) => (
                <div key={metric.label} className={styles.metricRow}>
                  <div className={styles.metricTop}>
                    <span style={{ color: "var(--text-secondary)" }}>{metric.label}</span>
                    <span className={styles.metricVal}>{metric.value}</span>
                  </div>
                  <div className={styles.barTrack}>
                    <motion.div
                      className={styles.barFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${92 - idx * 12}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.aside>

      {/* Bottom 3-Card Bento Strip */}
      <motion.div
        className={`glass-bento ${styles.miniTile}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14 }}
      >
        <div className="mono-label">{heroCopy.timezoneLabel}</div>
        <div>
          <div className={styles.clockVal}>{vnTime}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-secondary)",
              fontSize: "0.88rem",
              marginTop: "4px",
            }}
          >
            <MapPin size={14} />
            <span>{profile.location}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`glass-bento ${styles.miniTile}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
      >
        <div className="mono-label">{heroCopy.focusTitle}</div>
        <div className={styles.statsInline}>
          {portfolioData.stats.map((stat) => (
            <div key={stat.value}>
              <div className={styles.statVal}>{stat.value}</div>
              <div className={styles.statLbl}>{stat[locale].label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={`glass-bento ${styles.miniTile}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
      >
        <div className="mono-label">Direct Connect</div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {profileCopy.aboutQuote}
        </p>
        <button type="button" onClick={handleCopyEmail} className={styles.copyBtn}>
          <span>{copied ? heroCopy.copied : profile.email}</span>
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </motion.div>
    </section>
  );
}
