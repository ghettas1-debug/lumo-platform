'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { tokens, lightTheme, darkTheme, Theme } from '@/tokens/design-tokens';

type ThemeMode = 'light' | 'dark' | 'system';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'teal';

interface EnhancedThemeContextType {
  theme: ThemeMode;
  colorScheme: ColorScheme;
  setTheme: (theme: ThemeMode) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  resolvedTheme: 'light' | 'dark';
  customTheme: Theme;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const EnhancedThemeContext = createContext<EnhancedThemeContextType | undefined>(undefined);

export function useEnhancedTheme() {
  const context = useContext(EnhancedThemeContext);
  if (context === undefined) {
    throw new Error('useEnhancedTheme must be used within an EnhancedThemeProvider');
  }
  return context;
}

interface EnhancedThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  defaultColorScheme?: ColorScheme;
}

export default function EnhancedThemeProvider({
  children,
  defaultTheme = 'system',
  defaultColorScheme = 'blue',
}: EnhancedThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(defaultColorScheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Get reduced motion preference
  const getReducedMotionPreference = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // Generate custom theme based on color scheme
  const generateCustomTheme = (baseTheme: Theme, scheme: ColorScheme): Theme => {
    const accentColors = {
      blue: tokens.colors.primary,
      purple: tokens.colors.accent.purple,
      green: tokens.colors.accent.emerald,
      orange: tokens.colors.accent.orange,
      teal: tokens.colors.accent.teal,
    };

    const selectedAccent = accentColors[scheme];

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: selectedAccent[600],
        'primary-foreground': '#ffffff',
        ring: selectedAccent[600],
      },
    };
  };

  // Apply theme to DOM
  const applyTheme = () => {
    const root = document.documentElement;
    const systemTheme = getSystemTheme();
    const actualTheme = theme === 'system' ? systemTheme : theme;
    
    setResolvedTheme(actualTheme);

    // Apply theme classes
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);

    // Apply high contrast
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (reducedMotion || getReducedMotionPreference()) {
      root.style.setProperty('--motion-reduce', 'reduce');
    } else {
      root.style.removeProperty('--motion-reduce');
    }

    // Apply CSS custom properties
    const baseTheme = actualTheme === 'dark' ? darkTheme : lightTheme;
    const customTheme = generateCustomTheme(baseTheme, colorScheme);

    Object.entries(customTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply design tokens
    Object.entries(tokens.colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--lumo-primary-${key}`, value);
    });

    Object.entries(tokens.colors.neutral).forEach(([key, value]) => {
      root.style.setProperty(`--lumo-neutral-${key}`, value);
    });

    // Apply spacing tokens
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply typography tokens
    Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const fontSize = Array.isArray(value[0]) ? value[0][0] : value[0];
        const lineHeightData = value[1];
        const lineHeight = typeof lineHeightData === 'string' ? lineHeightData : 
                          (typeof lineHeightData === 'object' && lineHeightData?.lineHeight) ? lineHeightData.lineHeight : '1.5';
        
        root.style.setProperty(`--font-size-${key}`, String(fontSize));
        root.style.setProperty(`--line-height-${key}`, String(lineHeight));
      }
    });
  };

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('lumo-theme') as ThemeMode;
    const savedColorScheme = localStorage.getItem('lumo-color-scheme') as ColorScheme;
    const savedHighContrast = localStorage.getItem('lumo-high-contrast') === 'true';
    const savedReducedMotion = localStorage.getItem('lumo-reduced-motion') === 'true';

    if (savedTheme) setThemeState(savedTheme);
    if (savedColorScheme) setColorSchemeState(savedColorScheme);
    setIsHighContrast(savedHighContrast);
    setReducedMotion(savedReducedMotion || getReducedMotionPreference());
  }, []);

  // Apply theme when dependencies change
  useEffect(() => {
    applyTheme();
  }, [theme, colorScheme, isHighContrast, reducedMotion]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Listen for reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Theme setters
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('lumo-theme', newTheme);
  };

  const setColorScheme = (newScheme: ColorScheme) => {
    setColorSchemeState(newScheme);
    localStorage.setItem('lumo-color-scheme', newScheme);
  };

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('lumo-high-contrast', newValue.toString());
  };

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    localStorage.setItem('lumo-reduced-motion', newValue.toString());
  };

  // Generate current custom theme
  const baseTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;
  const customTheme = generateCustomTheme(baseTheme, colorScheme);

  const value: EnhancedThemeContextType = {
    theme,
    colorScheme,
    setTheme,
    setColorScheme,
    resolvedTheme,
    customTheme,
    isHighContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
  };

  return (
    <EnhancedThemeContext.Provider value={value}>
      {children}
    </EnhancedThemeContext.Provider>
  );
}

// Hook for theme-aware components
export const useThemeAwareComponent = () => {
  const { resolvedTheme, isHighContrast, reducedMotion } = useEnhancedTheme();
  
  return {
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isHighContrast,
    reducedMotion,
    getThemeClass: (lightClass: string, darkClass: string) => 
      resolvedTheme === 'dark' ? darkClass : lightClass,
    getAnimationClass: (normalClass: string, reducedClass: string) => 
      reducedMotion ? reducedClass : normalClass,
  };
};

// Color scheme utilities
export const getColorSchemeClasses = (scheme: ColorScheme) => {
  const schemes = {
    blue: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      accent: 'text-blue-600',
      border: 'border-blue-200',
    },
    purple: {
      primary: 'bg-purple-600 text-white hover:bg-purple-700',
      secondary: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      accent: 'text-purple-600',
      border: 'border-purple-200',
    },
    green: {
      primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
      secondary: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
      accent: 'text-emerald-600',
      border: 'border-emerald-200',
    },
    orange: {
      primary: 'bg-orange-600 text-white hover:bg-orange-700',
      secondary: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      accent: 'text-orange-600',
      border: 'border-orange-200',
    },
    teal: {
      primary: 'bg-teal-600 text-white hover:bg-teal-700',
      secondary: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
      accent: 'text-teal-600',
      border: 'border-teal-200',
    },
  };

  return schemes[scheme];
};
