// Internationalization Hook and Context
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supportedLanguages, LanguageCode, Language } from './config';
import { ar } from './locales/ar';
import { en } from './locales/en';

// Type definitions
type Translations = typeof ar;
type TranslationKey = keyof Translations;

// All translations - only include supported languages
const translations: Record<'ar' | 'en', Translations> = {
  ar,
  en,
};

// Context
interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguage: Language;
  t: (key: TranslationKey, params?: Record<string, string>) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Hook
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

// Provider
interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<LanguageCode>('ar');

  // Get current language info
  const currentLanguage = supportedLanguages.find((lang: Language) => lang.code === language) || supportedLanguages[0];
  const isRTL = currentLanguage.dir === 'rtl';

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('lumo-language') as LanguageCode;
    if (savedLanguage && supportedLanguages.find((lang: Language) => lang.code === savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
      if (supportedLanguages.find((lang: Language) => lang.code === browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  // Save language to localStorage
  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('lumo-language', lang);
    
    // Update document direction
    const langInfo = supportedLanguages.find((l: Language) => l.code === lang);
    if (langInfo) {
      document.documentElement.dir = langInfo.dir;
      document.documentElement.lang = langInfo.code;
    }
  };

  // Translation function
  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    // Get translation for current language or fallback to English
    const currentTranslations = translations[language as keyof typeof translations] || translations.en;
    const translation = currentTranslations[key] || key;
    
    // Replace parameters
    if (params) {
      return Object.entries(params).reduce(
        (str, [param, value]) => str.replace(`{{${param}}}`, value),
        translation
      );
    }
    
    return translation;
  };

  // Update document direction on language change
  useEffect(() => {
    document.documentElement.dir = currentLanguage.dir;
    document.documentElement.lang = currentLanguage.code;
  }, [currentLanguage]);

  return (
    <I18nContext.Provider value={{
      language,
      setLanguage,
      currentLanguage,
      t,
      isRTL,
    }}>
      {children}
    </I18nContext.Provider>
  );
}

// Export translations type for type safety
export type { Translations, TranslationKey };
