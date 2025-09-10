"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { translations } from "../lib/translations";

type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)["en"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
