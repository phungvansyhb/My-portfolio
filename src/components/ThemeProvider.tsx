"use client";

import React, { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import type { PaletteId, ThemeMode } from "@/lib/portfolio";

interface ThemeContextValue {
  mode: ThemeMode;
  palette: PaletteId;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setPalette: (palette: PaletteId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const MODE_STORAGE_KEY = "pvs-theme-mode";
const PALETTE_STORAGE_KEY = "pvs-theme-palette";
const THEME_EVENT = "pvs-theme-change";

function subscribeTheme(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getModeSnapshot(): ThemeMode {
  const saved = window.localStorage.getItem(MODE_STORAGE_KEY);
  return saved === "light" || saved === "dark" ? saved : "dark";
}

function getPaletteSnapshot(): PaletteId {
  const saved = window.localStorage.getItem(PALETTE_STORAGE_KEY);
  return saved === "glacier" || saved === "sapphire" || saved === "jade" || saved === "baltic"
    ? saved
    : "glacier";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore<ThemeMode>(subscribeTheme, getModeSnapshot, () => "dark");
  const palette = useSyncExternalStore<PaletteId>(subscribeTheme, getPaletteSnapshot, () => "glacier");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", palette);
  }, [palette]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    window.localStorage.setItem(MODE_STORAGE_KEY, nextMode);
    document.documentElement.setAttribute("data-theme", nextMode);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const setPalette = useCallback((nextPalette: PaletteId) => {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, nextPalette);
    document.documentElement.setAttribute("data-palette", nextPalette);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, palette, setMode, toggleMode, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
