'use client';

// Dynamic Text Direction Change Utilities for Lumo Platform
import { useState, useEffect, useCallback } from 'react';

// Text direction types
export type TextDirection = 'ltr' | 'rtl' | 'auto';
export type LanguageDirection = 'ltr' | 'rtl';

// Language configuration interface
export interface LanguageConfig {
  code: string;
  name: string;
  direction: LanguageDirection;
  fontFamily?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  textIndent?: string;
}

// Text direction manager class
export class TextDirectionManager {
  private static instance: TextDirectionManager;
  private currentDirection: TextDirection = 'ltr';
  private currentLanguage: string = 'en';
  private listeners: Set<(direction: TextDirection, language: string) => void> = new Set();
  private languageConfigs: Map<string, LanguageConfig> = new Map();

  private constructor() {
    this.initializeLanguageConfigs();
    this.detectSystemDirection();
  }

  public static getInstance(): TextDirectionManager {
    if (!TextDirectionManager.instance) {
      TextDirectionManager.instance = new TextDirectionManager();
    }
    return TextDirectionManager.instance;
  }

  // Initialize language configurations
  private initializeLanguageConfigs(): void {
    const configs: LanguageConfig[] = [
      // Left-to-right languages
      { code: 'en', name: 'English', direction: 'ltr', fontFamily: 'Inter, system-ui, sans-serif' },
      { code: 'es', name: 'Español', direction: 'ltr', fontFamily: 'Inter, system-ui, sans-serif' },
      { code: 'fr', name: 'Français', direction: 'ltr', fontFamily: 'Inter, system-ui, sans-serif' },
      { code: 'de', name: 'Deutsch', direction: 'ltr', fontFamily: 'Inter, system-ui, sans-serif' },
      { code: 'it', name: 'Italiano', direction: 'ltr', fontFamily: 'Inter, system-ui, sans-serif' },
      { code: 'pt', name: 'Português', direction: 'ltr', fontFamily: 'Inter, system-ui, sans-serif' },
      { code: 'ru', name: 'Русский', direction: 'ltr', fontFamily: 'Inter, system-ui, sans-serif' },
      { code: 'ja', name: '日本語', direction: 'ltr', fontFamily: 'Noto Sans JP, sans-serif' },
      { code: 'ko', name: '한국어', direction: 'ltr', fontFamily: 'Noto Sans KR, sans-serif' },
      { code: 'zh', name: '中文', direction: 'ltr', fontFamily: 'Noto Sans SC, sans-serif' },
      
      // Right-to-left languages
      { code: 'ar', name: 'العربية', direction: 'rtl', fontFamily: 'Noto Sans Arabic, sans-serif', textAlign: 'right' },
      { code: 'he', name: 'עברית', direction: 'rtl', fontFamily: 'Noto Sans Hebrew, sans-serif', textAlign: 'right' },
      { code: 'fa', name: 'فارسی', direction: 'rtl', fontFamily: 'Noto Sans Arabic, sans-serif', textAlign: 'right' },
      { code: 'ur', name: 'اردو', direction: 'rtl', fontFamily: 'Noto Sans Arabic, sans-serif', textAlign: 'right' },
      { code: 'ps', name: 'پښتو', direction: 'rtl', fontFamily: 'Noto Sans Arabic, sans-serif', textAlign: 'right' },
      { code: 'ku', name: 'کوردی', direction: 'rtl', fontFamily: 'Noto Sans Arabic, sans-serif', textAlign: 'right' },
      { code: 'sd', name: 'سنڌي', direction: 'rtl', fontFamily: 'Noto Sans Arabic, sans-serif', textAlign: 'right' },
    ];

    configs.forEach(config => {
      this.languageConfigs.set(config.code, config);
    });
  }

  // Detect system direction
  private detectSystemDirection(): void {
    if (typeof window !== 'undefined') {
      const htmlLang = document.documentElement.lang;
      const htmlDir = document.documentElement.dir;
      
      if (htmlDir) {
        this.currentDirection = htmlDir as TextDirection;
      } else if (htmlLang) {
        const config = this.languageConfigs.get(htmlLang);
        this.currentDirection = config?.direction || 'ltr';
      } else {
        // Detect from system locale
        const systemLang = navigator.language.split('-')[0];
        const config = this.languageConfigs.get(systemLang);
        this.currentDirection = config?.direction || 'ltr';
      }
      
      this.currentLanguage = htmlLang || 'en';
    }
  }

  // Set text direction
  public setDirection(direction: TextDirection, language?: string): void {
    const previousDirection = this.currentDirection;
    this.currentDirection = direction;
    
    if (language) {
      this.currentLanguage = language;
    }

    // Update DOM
    if (typeof window !== 'undefined') {
      document.documentElement.dir = direction;
      if (language) {
        document.documentElement.lang = language;
      }
      
      // Update CSS custom properties
      this.updateCSSProperties(direction, language);
      
      // Update font family
      this.updateFontFamily(language);
    }

    // Notify listeners
    if (previousDirection !== direction) {
      this.notifyListeners();
    }
  }

  // Update CSS custom properties
  private updateCSSProperties(direction: TextDirection, language?: string): void {
    const root = document.documentElement;
    
    // Set direction-specific CSS variables
    root.style.setProperty('--text-direction', direction);
    root.style.setProperty('--text-align-start', direction === 'rtl' ? 'right' : 'left');
    root.style.setProperty('--text-align-end', direction === 'rtl' ? 'left' : 'right');
    root.style.setProperty('--border-radius-start', direction === 'rtl' ? 'border-top-right-radius' : 'border-top-left-radius');
    root.style.setProperty('--border-radius-end', direction === 'rtl' ? 'border-top-left-radius' : 'border-top-right-radius');
    root.style.setProperty('--margin-start', direction === 'rtl' ? 'margin-right' : 'margin-left');
    root.style.setProperty('--margin-end', direction === 'rtl' ? 'margin-left' : 'margin-right');
    root.style.setProperty('--padding-start', direction === 'rtl' ? 'padding-right' : 'padding-left');
    root.style.setProperty('--padding-end', direction === 'rtl' ? 'padding-left' : 'padding-right');
    
    // Set language-specific properties
    if (language) {
      const config = this.languageConfigs.get(language);
      if (config) {
        root.style.setProperty('--text-align', config.textAlign || 'left');
        root.style.setProperty('--text-indent', config.textIndent || '0');
      }
    }
  }

  // Update font family
  private updateFontFamily(language?: string): void {
    if (!language) return;
    
    const config = this.languageConfigs.get(language);
    if (config?.fontFamily) {
      document.documentElement.style.setProperty('--font-family', config.fontFamily);
    }
  }

  // Get current direction
  public getDirection(): TextDirection {
    return this.currentDirection;
  }

  // Get current language
  public getLanguage(): string {
    return this.currentLanguage;
  }

  // Get language config
  public getLanguageConfig(language: string): LanguageConfig | undefined {
    return this.languageConfigs.get(language);
  }

  // Toggle direction
  public toggleDirection(): void {
    const newDirection = this.currentDirection === 'ltr' ? 'rtl' : 'ltr';
    this.setDirection(newDirection);
  }

  // Set language
  public setLanguage(language: string): void {
    const config = this.languageConfigs.get(language);
    if (config) {
      this.setDirection(config.direction, language);
    }
  }

  // Check if RTL
  public isRTL(): boolean {
    return this.currentDirection === 'rtl';
  }

  // Check if LTR
  public isLTR(): boolean {
    return this.currentDirection === 'ltr';
  }

  // Get available languages
  public getAvailableLanguages(): LanguageConfig[] {
    return Array.from(this.languageConfigs.values());
  }

  // Get RTL languages
  public getRTLLanguages(): LanguageConfig[] {
    return Array.from(this.languageConfigs.values()).filter(config => config.direction === 'rtl');
  }

  // Get LTR languages
  public getLTRLanguages(): LanguageConfig[] {
    return Array.from(this.languageConfigs.values()).filter(config => config.direction === 'ltr');
  }

  // Add listener
  public addListener(listener: (direction: TextDirection, language: string) => void): () => void {
    this.listeners.add(listener);
    
    // Call listener immediately with current values
    listener(this.currentDirection, this.currentLanguage);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Remove listener
  public removeListener(listener: (direction: TextDirection, language: string) => void): void {
    this.listeners.delete(listener);
  }

  // Notify listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentDirection, this.currentLanguage);
      } catch (error) {
        console.error('Error in text direction listener:', error);
      }
    });
  }

  // Get text alignment for current direction
  public getTextAlignment(align: 'start' | 'end' | 'center' | 'justify'): string {
    if (align === 'center' || align === 'justify') {
      return align;
    }
    
    const config = this.languageConfigs.get(this.currentLanguage);
    if (config?.textAlign) {
      return config.textAlign;
    }
    
    return this.currentDirection === 'rtl' 
      ? (align === 'start' ? 'right' : 'left')
      : (align === 'start' ? 'left' : 'right');
  }

  // Get margin/padding for current direction
  public getSpacingProperty(property: 'margin' | 'padding', side: 'start' | 'end'): string {
    const direction = this.currentDirection === 'rtl' ? 'end' : 'start';
    const actualSide = side === 'start' ? (this.currentDirection === 'rtl' ? 'right' : 'left') : (this.currentDirection === 'rtl' ? 'left' : 'right');
    return `${property}-${actualSide}`;
  }

  // Get border radius for current direction
  public getBorderRadius(corner: 'start' | 'end'): string {
    const actualCorner = corner === 'start' 
      ? (this.currentDirection === 'rtl' ? 'right' : 'left')
      : (this.currentDirection === 'rtl' ? 'left' : 'right');
    return `border-${actualCorner}-radius`;
  }

  // Add language config
  public addLanguageConfig(config: LanguageConfig): void {
    this.languageConfigs.set(config.code, config);
  }

  // Remove language config
  public removeLanguageConfig(languageCode: string): void {
    this.languageConfigs.delete(languageCode);
  }

  // Update language config
  public updateLanguageConfig(languageCode: string, updates: Partial<LanguageConfig>): void {
    const existing = this.languageConfigs.get(languageCode);
    if (existing) {
      this.languageConfigs.set(languageCode, { ...existing, ...updates });
    }
  }
}

// React hooks
export const useTextDirection = () => {
  const manager = TextDirectionManager.getInstance();
  const [direction, setDirection] = useState(manager.getDirection());
  const [language, setLanguage] = useState(manager.getLanguage());

  useEffect(() => {
    const unsubscribe = manager.addListener((newDirection, newLanguage) => {
      setDirection(newDirection);
      setLanguage(newLanguage);
    });

    return unsubscribe;
  }, [manager]);

  return {
    direction,
    language,
    isRTL: direction === 'rtl',
    isLTR: direction === 'ltr',
    setDirection: (dir: TextDirection, lang?: string) => manager.setDirection(dir, lang),
    toggleDirection: () => manager.toggleDirection(),
    setLanguage: (lang: string) => manager.setLanguage(lang),
    getTextAlignment: (align: 'start' | 'end' | 'center' | 'justify') => manager.getTextAlignment(align),
    getSpacingProperty: (property: 'margin' | 'padding', side: 'start' | 'end') => manager.getSpacingProperty(property, side),
    getBorderRadius: (corner: 'start' | 'end') => manager.getBorderRadius(corner),
    getLanguageConfig: (lang: string) => manager.getLanguageConfig(lang),
    getAvailableLanguages: () => manager.getAvailableLanguages(),
    getRTLLanguages: () => manager.getRTLLanguages(),
    getLTRLanguages: () => manager.getLTRLanguages(),
  };
};

export const useDirectionalStyles = () => {
  const { direction, getTextAlignment, getSpacingProperty, getBorderRadius } = useTextDirection();

  return {
    // Text alignment
    textAlign: {
      start: getTextAlignment('start'),
      end: getTextAlignment('end'),
      center: 'center',
      justify: 'justify',
    },
    
    // Spacing
    spacing: {
      marginStart: getSpacingProperty('margin', 'start'),
      marginEnd: getSpacingProperty('margin', 'end'),
      paddingStart: getSpacingProperty('padding', 'start'),
      paddingEnd: getSpacingProperty('padding', 'end'),
    },
    
    // Border radius
    borderRadius: {
      start: getBorderRadius('start'),
      end: getBorderRadius('end'),
    },
    
    // Direction classes
    directionClasses: {
      'text-start': direction === 'rtl' ? 'text-right' : 'text-left',
      'text-end': direction === 'rtl' ? 'text-left' : 'text-right',
      'float-start': direction === 'rtl' ? 'float-right' : 'float-left',
      'float-end': direction === 'rtl' ? 'float-left' : 'float-right',
    },
  };
};

// Utility functions
export const textDirectionUtils = {
  // Create text direction manager instance
  createManager: () => TextDirectionManager.getInstance(),

  // Check if language is RTL
  isRTLLanguage: (languageCode: string): boolean => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ps', 'ku', 'sd'];
    return rtlLanguages.includes(languageCode);
  },

  // Get language direction
  getLanguageDirection: (languageCode: string): LanguageDirection => {
    return textDirectionUtils.isRTLLanguage(languageCode) ? 'rtl' : 'ltr';
  },

  // Convert logical properties to physical properties
  logicalToPhysical: (property: string, direction: TextDirection): string => {
    const mapping: Record<string, Record<TextDirection, string>> = {
      'text-align': {
        ltr: { start: 'left', end: 'right' },
        rtl: { start: 'right', end: 'left' },
      },
      'float': {
        ltr: { start: 'left', end: 'right' },
        rtl: { start: 'right', end: 'left' },
      },
      'clear': {
        ltr: { start: 'left', end: 'right' },
        rtl: { start: 'right', end: 'left' },
      },
      'margin': {
        ltr: { start: 'margin-left', end: 'margin-right' },
        rtl: { start: 'margin-right', end: 'margin-left' },
      },
      'padding': {
        ltr: { start: 'padding-left', end: 'padding-right' },
        rtl: { start: 'padding-right', end: 'padding-left' },
      },
      'border': {
        ltr: { start: 'border-left', end: 'border-right' },
        rtl: { start: 'border-right', end: 'border-left' },
      },
      'border-radius': {
        ltr: { start: 'border-top-left-radius', end: 'border-top-right-radius' },
        rtl: { start: 'border-top-right-radius', end: 'border-top-left-radius' },
      },
    };

    const [prop, side] = property.split('-');
    const propMapping = mapping[prop];
    
    if (propMapping && side && (side === 'start' || side === 'end')) {
      return propMapping[direction][side];
    }
    
    return property;
  },

  // Generate CSS for text direction
  generateDirectionCSS: (direction: TextDirection): string => {
    return `
      :root {
        --text-direction: ${direction};
        --text-align-start: ${direction === 'rtl' ? 'right' : 'left'};
        --text-align-end: ${direction === 'rtl' ? 'left' : 'right'};
        --float-start: ${direction === 'rtl' ? 'right' : 'left'};
        --float-end: ${direction === 'rtl' ? 'left' : 'right'};
        --margin-start: ${direction === 'rtl' ? 'margin-right' : 'margin-left'};
        --margin-end: ${direction === 'rtl' ? 'margin-left' : 'margin-right'};
        --padding-start: ${direction === 'rtl' ? 'padding-right' : 'padding-left'};
        --padding-end: ${direction === 'rtl' ? 'padding-left' : 'padding-right'};
        --border-start: ${direction === 'rtl' ? 'border-right' : 'border-left'};
        --border-end: ${direction === 'rtl' ? 'border-left' : 'border-right'};
        --border-radius-start: ${direction === 'rtl' ? 'border-top-right-radius' : 'border-top-left-radius'};
        --border-radius-end: ${direction === 'rtl' ? 'border-top-left-radius' : 'border-top-right-radius'};
      }
      
      .text-start { text-align: var(--text-align-start); }
      .text-end { text-align: var(--text-align-end); }
      .float-start { float: var(--float-start); }
      .float-end { float: var(--float-end); }
      .margin-start { margin: var(--margin-start); }
      .margin-end { margin: var(--margin-end); }
      .padding-start { padding: var(--padding-start); }
      .padding-end { padding: var(--padding-end); }
      .border-start { border: var(--border-start); }
      .border-end { border: var(--border-end); }
      .border-radius-start { border-radius: var(--border-radius-start); }
      .border-radius-end { border-radius: var(--border-radius-end); }
    `;
  },

  // Get appropriate font family for language
  getFontFamily: (languageCode: string): string => {
    const fontFamilies: Record<string, string> = {
      'ar': 'Noto Sans Arabic, sans-serif',
      'he': 'Noto Sans Hebrew, sans-serif',
      'fa': 'Noto Sans Arabic, sans-serif',
      'ur': 'Noto Sans Arabic, sans-serif',
      'ps': 'Noto Sans Arabic, sans-serif',
      'ku': 'Noto Sans Arabic, sans-serif',
      'sd': 'Noto Sans Arabic, sans-serif',
      'ja': 'Noto Sans JP, sans-serif',
      'ko': 'Noto Sans KR, sans-serif',
      'zh': 'Noto Sans SC, sans-serif',
      'th': 'Noto Sans Thai, sans-serif',
      'bn': 'Noto Sans Bengali, sans-serif',
      'ta': 'Noto Sans Tamil, sans-serif',
      'te': 'Noto Sans Telugu, sans-serif',
      'ml': 'Noto Sans Malayalam, sans-serif',
      'gu': 'Noto Sans Gujarati, sans-serif',
      'kn': 'Noto Sans Kannada, sans-serif',
      'or': 'Noto Sans Oriya, sans-serif',
      'pa': 'Noto Sans Gurmukhi, sans-serif',
      'si': 'Noto Sans Sinhala, sans-serif',
      'my': 'Noto Sans Myanmar, sans-serif',
      'km': 'Noto Sans Khmer, sans-serif',
      'lo': 'Noto Sans Lao, sans-serif',
      'ka': 'Noto Sans Georgian, sans-serif',
      'am': 'Noto Sans Ethiopic, sans-serif',
      'hy': 'Noto Sans Armenian, sans-serif',
      'yi': 'Noto Sans Yi, sans-serif',
      'bo': 'Noto Sans Tibetan, sans-serif',
      'dz': 'Noto Sans Tibetan, sans-serif',
      'mn': 'Noto Sans Mongolian, sans-serif',
      'ne': 'Noto Sans Devanagari, sans-serif',
      'mr': 'Noto Sans Devanagari, sans-serif',
      'hi': 'Noto Sans Devanagari, sans-serif',
      'gu': 'Noto Sans Gujarati, sans-serif',
      'pa': 'Noto Sans Gurmukhi, sans-serif',
      'bn': 'Noto Sans Bengali, sans-serif',
      'as': 'Noto Sans Bengali, sans-serif',
      'te': 'Noto Sans Telugu, sans-serif',
      'ta': 'Noto Sans Tamil, sans-serif',
      'ml': 'Noto Sans Malayalam, sans-serif',
      'kn': 'Noto Sans Kannada, sans-serif',
      'or': 'Noto Sans Oriya, sans-serif',
      'gu': 'Noto Sans Gujarati, sans-serif',
    };

    return fontFamilies[languageCode] || 'Inter, system-ui, sans-serif';
  },

  // Format text for RTL/LTR
  formatText: (text: string, direction: TextDirection): string => {
    if (direction === 'rtl') {
      // Add RTL marks for better rendering
      return `\u202B${text}\u202C`;
    }
    return text;
  },

  // Check if text contains RTL characters
  containsRTLCharacters: (text: string): boolean => {
    const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    return rtlRegex.test(text);
  },

  // Detect text direction from content
  detectTextDirection: (text: string): TextDirection => {
    return textDirectionUtils.containsRTLCharacters(text) ? 'rtl' : 'ltr';
  },
};

// Default instance
export const defaultTextDirectionManager = TextDirectionManager.getInstance();

export default {
  TextDirectionManager,
  useTextDirection,
  useDirectionalStyles,
  textDirectionUtils,
  defaultTextDirectionManager,
};
