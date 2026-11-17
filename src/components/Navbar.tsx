"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Command, Moon, Palette, Sun } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import { ViewTransitionLink } from "./ViewTransitionLink";
import { PALETTE_OPTIONS, portfolioData } from "@/lib/portfolio";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { locale, setLocale } = useLanguage();
  const { mode, toggleMode, palette, setPalette } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const navCopy = portfolioData.ui[locale].nav;
  const activePalette = PALETTE_OPTIONS.find((p) => p.id === palette) ?? PALETTE_OPTIONS[0];

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header className={styles.header}>
      <nav className={styles.bar} aria-label="Primary Navigation">
        <ViewTransitionLink href="/" className={styles.brand}>
          <span className={styles.brandDot} aria-hidden="true" />
          <span>{portfolioData.profile.monogram}</span>
        </ViewTransitionLink>

        <div className={styles.links}>
          <Link href="/#work" className={styles.link}>
            {navCopy.work}
          </Link>
          <Link href="/#stack" className={styles.link}>
            {navCopy.stack}
          </Link>
          <Link href="/#experience" className={styles.link}>
            {navCopy.experience}
          </Link>
          <Link href="/#contact" className={styles.link}>
            {navCopy.contact}
          </Link>
        </div>

        <div className={styles.controls} ref={popoverRef}>
          <div className={styles.langToggle} role="group" aria-label="Language switcher">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`${styles.langOption} ${locale === "en" ? styles.langActive : ""}`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("vi")}
              className={`${styles.langOption} ${locale === "vi" ? styles.langActive : ""}`}
              aria-pressed={locale === "vi"}
            >
              VI
            </button>
          </div>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setPaletteOpen((prev) => !prev)}
            aria-expanded={paletteOpen}
            aria-label="Choose Aurora Palette"
            title="Switch Aurora Palette"
          >
            <Palette size={14} />
            <span className={styles.paletteSwatchMini} aria-hidden="true">
              {activePalette.swatches.map((hex) => (
                <span key={hex} style={{ backgroundColor: hex }} />
              ))}
            </span>
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleMode}
            aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={mode === "dark" ? "Light Mode" : "Dark Mode"}
          >
            {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={openCommandPalette}
            aria-label="Open Command Palette"
          >
            <Command size={14} />
            <span className={`${styles.kbd} ${styles.kbdLabel}`}>K</span>
          </button>

          {paletteOpen && (
            <div className={styles.palettePopover} role="menu" aria-label="Theme Palettes">
              <div className={styles.popoverHeader}>
                {locale === "en" ? "Aurora Theme" : "Bảng màu Aurora"}
              </div>
              {PALETTE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setPalette(option.id);
                    setPaletteOpen(false);
                  }}
                  className={`${styles.paletteOption} ${
                    palette === option.id ? styles.paletteOptionActive : ""
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={styles.paletteSwatchMini} aria-hidden="true">
                    {option.swatches.map((hex) => (
                      <span key={hex} style={{ backgroundColor: hex }} />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
