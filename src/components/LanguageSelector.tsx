'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

const languages: Language[] = [
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    rtl: true
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    rtl: false
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    rtl: false
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    rtl: false
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    rtl: false
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    rtl: false
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    rtl: false
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    rtl: false
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    rtl: false
  }
];

interface Translations {
  [key: string]: {
    [languageCode: string]: string;
  };
}

const translations: Translations = {
  'welcome': {
    ar: 'مرحباً بك في منصة Lumo',
    en: 'Welcome to Lumo Platform',
    fr: 'Bienvenue sur la plateforme Lumo',
    es: 'Bienvenido a la plataforma Lumo',
    de: 'Willkommen auf der Lumo-Plattform',
    zh: '欢迎来到Lumo平台',
    ja: 'Lumoプラットフォームへようこそ',
    pt: 'Bem-vindo à plataforma Lumo',
    ru: 'Добро пожаловать на платформу Lumo',
    hi: 'Lumo प्लेटफॉर्म में आपका स्वागत है'
  },
  'courses': {
    ar: 'الدورات',
    en: 'Courses',
    fr: 'Cours',
    es: 'Cursos',
    de: 'Kurse',
    zh: '课程',
    ja: 'コース',
    pt: 'Cursos',
    ru: 'Курсы',
    hi: 'पाठ्यक्रम'
  },
  'learn': {
    ar: 'تعلم',
    en: 'Learn',
    fr: 'Apprendre',
    es: 'Aprender',
    de: 'Lernen',
    zh: '学习',
    ja: '学ぶ',
    pt: 'Aprender',
    ru: 'Учиться',
    hi: 'सीखें'
  },
  'dashboard': {
    ar: 'لوحة التحكم',
    en: 'Dashboard',
    fr: 'Tableau de bord',
    es: 'Panel de control',
    de: 'Dashboard',
    zh: '仪表板',
    ja: 'ダッシュボード',
    pt: 'Painel',
    ru: 'Панель управления',
    hi: 'डैशबोर्ड'
  },
  'profile': {
    ar: 'الملف الشخصي',
    en: 'Profile',
    fr: 'Profil',
    es: 'Perfil',
    de: 'Profil',
    zh: '个人资料',
    ja: 'プロフィール',
    pt: 'Perfil',
    ru: 'Профиль',
    hi: 'प्रोफाइल'
  },
  'settings': {
    ar: 'الإعدادات',
    en: 'Settings',
    fr: 'Paramètres',
    es: 'Configuración',
    de: 'Einstellungen',
    zh: '设置',
    ja: '設定',
    pt: 'Configurações',
    ru: 'Настройки',
    hi: 'सेटिंग्स'
  },
  'help': {
    ar: 'المساعدة',
    en: 'Help',
    fr: 'Aide',
    es: 'Ayuda',
    de: 'Hilfe',
    zh: '帮助',
    ja: 'ヘルプ',
    pt: 'Ajuda',
    ru: 'Помощь',
    hi: 'सहायता'
  },
  'search': {
    ar: 'بحث',
    en: 'Search',
    fr: 'Rechercher',
    es: 'Buscar',
    de: 'Suchen',
    zh: '搜索',
    ja: '検索',
    pt: 'Pesquisar',
    ru: 'Поиск',
    hi: 'खोजें'
  }
};

export default function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const lang = languages.find(l => l.code === savedLanguage);
      if (lang) {
        setCurrentLanguage(lang);
        applyLanguage(lang);
      }
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      const detectedLang = languages.find(l => l.code === browserLang) || languages[0];
      setCurrentLanguage(detectedLang);
      applyLanguage(detectedLang);
    }
  }, []);

  const applyLanguage = (language: Language) => {
    const html = document.documentElement;
    html.lang = language.code;
    html.dir = language.rtl ? 'rtl' : 'ltr';
    
    // Update language in localStorage
    localStorage.setItem('selectedLanguage', language.code);
    
    // Trigger custom event for language change
    window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    applyLanguage(language);
    setIsOpen(false);
  };

  const translate = (key: string, fallback?: string) => {
    if (!translations[key]) return fallback || key;
    return translations[key][currentLanguage.code] || fallback || key;
  };

  // Make translate function available globally
  useEffect(() => {
    (window as any).translate = translate;
  }, [currentLanguage]);

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium hidden sm:block">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-64">
          <div className="max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentLanguage.code === language.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex-1 text-right">
                  <div className="font-medium text-sm">
                    {language.nativeName}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {language.name}
                  </div>
                </div>
                {currentLanguage.code === language.code && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for using translations in components
export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const lang = languages.find(l => l.code === savedLanguage);
      if (lang) setCurrentLanguage(lang);
    }
  }, []);

  const translate = (key: string, fallback?: string) => {
    if (!translations[key]) return fallback || key;
    return translations[key][currentLanguage.code] || fallback || key;
  };

  return { translate, currentLanguage, setCurrentLanguage };
}

// Component for displaying translated text
export function TranslatedText({ 
  key, 
  fallback, 
  className = '',
  as: Component = 'span' 
}: { 
  key: string; 
  fallback?: string; 
  className?: string; 
  as?: React.ElementType; 
}) {
  const { translate } = useTranslation();
  const Tag = Component as any;
  
  return (
    <Tag className={className}>
      {translate(key, fallback)}
    </Tag>
  );
}
