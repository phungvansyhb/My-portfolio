"use client";

import React, { useState } from "react";
import { Check, Copy, Mail, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio";
import { useLanguage } from "./LanguageProvider";
import styles from "./ContactBento.module.css";

export function ContactBento() {
  const { locale } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const copy = portfolioData.ui[locale].contact;
  const heroCopy = portfolioData.ui[locale].hero;
  const footerCopy = portfolioData.ui[locale].footer;

  const handleCopy = () => {
    navigator.clipboard?.writeText(portfolioData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject || `[Portfolio] Inquiry from ${name || "Visitor"}`
    );
    const mailBody = encodeURIComponent(
      `${name ? `From: ${name}\n\n` : ""}${message}`
    );
    window.location.href = `mailto:${portfolioData.profile.email}?subject=${mailSubject}&body=${mailBody}`;
    setDrawerOpen(false);
  };

  return (
    <footer id="contact">
      <article className={`glass-bento ${styles.contactCard}`}>
        <div className={styles.copyCol}>
          <div className="mono-label">{copy.eyebrow}</div>
          <h2 className={`display-heading ${styles.title}`}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>

        <div className={styles.actionsCol}>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => setDrawerOpen(true)}
          >
            <Mail size={16} />
            <span>{copy.openDrawer}</span>
          </button>

          <button type="button" className={styles.secondaryBtn} onClick={handleCopy}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? heroCopy.copied : portfolioData.profile.email}</span>
          </button>
        </div>
      </article>

      <div className={styles.footerBar}>
        <span>
          © {new Date().getFullYear()} {portfolioData.profile.name}. {footerCopy.note}
        </span>
        <span>{footerCopy.editHint}</span>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className={styles.drawerBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
          >
            <motion.aside
              className={styles.drawer}
              role="dialog"
              aria-modal="true"
              aria-label={copy.drawerTitle}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className={styles.drawerHeader}>
                  <div>
                    <div className="mono-label">{portfolioData.profile.email}</div>
                    <h3 className="display-heading" style={{ fontSize: "1.5rem", marginTop: "4px" }}>
                      {copy.drawerTitle}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={() => setDrawerOpen(false)}
                    aria-label={copy.close}
                  >
                    <X size={16} />
                  </button>
                </div>

                <form id="contact-drawer-form" className={styles.form} onSubmit={handleSendMail}>
                  <label className={styles.field}>
                    <span className={styles.label}>{copy.nameLabel}</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={copy.namePlaceholder}
                      className={styles.input}
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{copy.subjectLabel}</span>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={copy.subjectPlaceholder}
                      className={styles.input}
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.label}>{copy.messageLabel}</span>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={copy.messagePlaceholder}
                      className={styles.textarea}
                    />
                  </label>
                </form>
              </div>

              <button type="submit" form="contact-drawer-form" className={styles.primaryBtn}>
                <Send size={15} />
                <span>{copy.sendMail}</span>
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
