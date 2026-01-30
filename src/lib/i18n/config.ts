// Internationalization Configuration
export const supportedLanguages = [
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'es', name: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', dir: 'ltr', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', dir: 'ltr', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', dir: 'ltr', flag: '🇷🇺' },
  { code: 'zh', name: '中文', dir: 'ltr', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', dir: 'ltr', flag: '🇯🇵' },
] as const;

export type LanguageCode = typeof supportedLanguages[number]['code'];
export type Language = typeof supportedLanguages[number];
