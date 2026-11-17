"use client";

import React, { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/portfolio";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LOCALE_STORAGE_KEY = "pvs-locale";
const LOCALE_EVENT = "pvs-locale-change";

function subscribeLocale(callback: () => void) {
  window.addEventListener(LOCALE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LOCALE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getLocaleSnapshot(): Locale {
  const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return saved === "en" || saved === "vi" ? saved : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribeLocale, getLocaleSnapshot, () => "en");

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.documentElement.setAttribute("lang", nextLocale);
    window.dispatchEvent(new Event(LOCALE_EVENT));
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "vi" : "en");
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
