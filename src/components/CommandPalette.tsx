"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import {
  ArrowUpRight,
  Check,
  Copy,
  Globe,
  Layers,
  Moon,
  Palette,
  Search,
  Sun,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PALETTE_OPTIONS, portfolioData } from "@/lib/portfolio";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";
import styles from "./CommandPalette.module.css";

interface CommandAction {
  id: string;
  group: "navigation" | "appearance" | "actions";
  label: string;
  meta?: string;
  icon: React.ReactNode;
  run: () => void;
}

type DocumentWithTransition = Document & {
  startViewTransition?: (cb: () => void) => void;
};

export function CommandPalette() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const { mode, toggleMode, setPalette } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const copy = portfolioData.ui[locale].command;

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        router.push(href);
        return;
      }
      const doc = document as DocumentWithTransition;
      if (typeof doc.startViewTransition === "function") {
        doc.startViewTransition(() => {
          flushSync(() => router.push(href));
        });
      } else {
        router.push(href);
      }
    },
    [router]
  );

  const triggerToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }, []);

  const actions = useMemo<CommandAction[]>(() => {
    const projectActions: CommandAction[] = portfolioData.projects.map((p) => ({
      id: `project-${p.slug}`,
      group: "navigation",
      label: p[locale].title,
      meta: `${p.index} • ${p.year}`,
      icon: <Layers size={15} />,
      run: () => navigateWithTransition(`/projects/${p.slug}`),
    }));

    const paletteActions: CommandAction[] = PALETTE_OPTIONS.map((pal) => ({
      id: `palette-${pal.id}`,
      group: "appearance",
      label: `${locale === "en" ? "Palette:" : "Bảng màu:"} ${pal.label}`,
      meta: "CSS Theme",
      icon: <Palette size={15} />,
      run: () => setPalette(pal.id),
    }));

    return [
      ...projectActions,
      {
        id: "toggle-mode",
        group: "appearance",
        label:
          mode === "dark"
            ? locale === "en"
              ? "Switch to Light Mode"
              : "Chuyển sang Giao diện Sáng"
            : locale === "en"
            ? "Switch to Dark Mode"
            : "Chuyển sang Giao diện Tối",
        meta: mode === "dark" ? "Light" : "Dark",
        icon: mode === "dark" ? <Sun size={15} /> : <Moon size={15} />,
        run: toggleMode,
      },
      {
        id: "toggle-locale",
        group: "appearance",
        label:
          locale === "en"
            ? "Chuyển sang Tiếng Việt (VI)"
            : "Switch to English (EN)",
        meta: locale === "en" ? "EN → VI" : "VI → EN",
        icon: <Globe size={15} />,
        run: toggleLocale,
      },
      ...paletteActions,
      {
        id: "copy-email",
        group: "actions",
        label:
          locale === "en"
            ? `Copy Email (${portfolioData.profile.email})`
            : `Sao chép Email (${portfolioData.profile.email})`,
        meta: "Clipboard",
        icon: <Copy size={15} />,
        run: () => {
          navigator.clipboard?.writeText(portfolioData.profile.email);
          triggerToast(
            locale === "en"
              ? `Copied ${portfolioData.profile.email}`
              : `Đã sao chép ${portfolioData.profile.email}`
          );
        },
      },
      {
        id: "open-github",
        group: "actions",
        label: "GitHub Profile",
        meta: portfolioData.profile.handle,
        icon: <ArrowUpRight size={15} />,
        run: () => window.open(portfolioData.profile.githubUrl, "_blank", "noopener,noreferrer"),
      },
    ];
  }, [locale, mode, navigateWithTransition, setPalette, toggleLocale, toggleMode, triggerToast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        (a.meta && a.meta.toLowerCase().includes(q))
    );
  }, [actions, query]);

  const clampedIndex =
    filtered.length === 0 ? 0 : Math.min(selectedIndex, filtered.length - 1);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSelectedIndex(0);
        setOpen((prev) => !prev);
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === "Enter" && filtered[clampedIndex]) {
        e.preventDefault();
        filtered[clampedIndex].run();
        setOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }
    };

    const onCustomOpen = () => {
      setSelectedIndex(0);
      setOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, [clampedIndex, filtered, open]);

  const grouped = useMemo(() => {
    const groups: { key: CommandAction["group"]; title: string; items: CommandAction[] }[] = [
      { key: "navigation", title: copy.groups.navigation, items: [] },
      { key: "appearance", title: copy.groups.appearance, items: [] },
      { key: "actions", title: copy.groups.actions, items: [] },
    ];
    for (const item of filtered) {
      groups.find((g) => g.key === item.group)?.items.push(item);
    }
    return groups.filter((g) => g.items.length > 0);
  }, [copy.groups, filtered]);

  let flatCounter = -1;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className={styles.dialog}
              role="dialog"
              aria-modal="true"
              aria-label="Command Palette"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.searchRow}>
                <Search size={17} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder={copy.placeholder}
                  className={styles.input}
                />
                <span className={styles.escBadge}>ESC</span>
              </div>

              <div className={styles.list}>
                {grouped.length === 0 ? (
                  <div className={styles.empty}>{copy.empty}</div>
                ) : (
                  grouped.map((group) => (
                    <div key={group.key}>
                      <div className={styles.groupLabel}>{group.title}</div>
                      {group.items.map((action) => {
                        flatCounter += 1;
                        const idx = flatCounter;
                        return (
                          <button
                            key={action.id}
                            type="button"
                            className={`${styles.item} ${
                              clampedIndex === idx ? styles.itemActive : ""
                            }`}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            onClick={() => {
                              action.run();
                              setOpen(false);
                              setQuery("");
                            }}
                          >
                            <span className={styles.itemLeft}>
                              {action.icon}
                              <span>{action.label}</span>
                            </span>
                            {action.meta && (
                              <span className={styles.itemMeta}>{action.meta}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <Check size={15} />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
