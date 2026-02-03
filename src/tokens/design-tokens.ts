/**
 * LUMO DESIGN SYSTEM TOKENS
 * Professional Design Tokens for Global Platform
 */

export const tokens = {
  // ===== COLOR SYSTEM =====
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },

    // Secondary Neutral Colors
    neutral: {
      0: '#ffffff',
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },

    // Semantic Colors
    semantic: {
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
      info: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
    },

    // Accent Colors for Categories
    accent: {
      purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
      },
      pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
      },
      teal: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
      },
      orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
      },
      emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
      },
      yellow: {
        50: '#fefce8',
        100: '#fef3c7',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
      },
    },
  },

  // ===== TYPOGRAPHY SYSTEM =====
  typography: {
    // Font Families
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
      display: ['Clash Display', 'Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },

    // Font Sizes
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },

    // Font Weights
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },

    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },

    // Line Height
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },

  // ===== SPACING SYSTEM =====
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // ===== BORDER RADIUS SYSTEM =====
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // ===== SHADOW SYSTEM =====
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgb(59 130 246 / 0.3)',
    'glow-lg': '0 0 40px rgb(59 130 246 / 0.4)',
  },

  // ===== Z-INDEX SYSTEM =====
  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800',
  },

  // ===== TRANSITION SYSTEM =====
  transition: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      entrance: 'cubic-bezier(0, 0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },

  // ===== BREAKPOINT SYSTEM =====
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  },

  // ===== CONTAINER SYSTEM =====
  container: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  },
};

// ===== THEME CONFIGURATIONS =====
export const lightTheme = {
  colors: {
    background: tokens.colors.neutral[0],
    foreground: tokens.colors.neutral[900],
    primary: tokens.colors.primary[600],
    'primary-foreground': tokens.colors.neutral[0],
    secondary: tokens.colors.neutral[100],
    'secondary-foreground': tokens.colors.neutral[900],
    muted: tokens.colors.neutral[100],
    'muted-foreground': tokens.colors.neutral[500],
    accent: tokens.colors.neutral[100],
    'accent-foreground': tokens.colors.neutral[900],
    destructive: tokens.colors.semantic.error[500],
    'destructive-foreground': tokens.colors.neutral[0],
    border: tokens.colors.neutral[200],
    input: tokens.colors.neutral[50],
    ring: tokens.colors.primary[600],
  },
};

export const darkTheme = {
  colors: {
    background: tokens.colors.neutral[900],
    foreground: tokens.colors.neutral[0],
    primary: tokens.colors.primary[500],
    'primary-foreground': tokens.colors.neutral[0],
    secondary: tokens.colors.neutral[800],
    'secondary-foreground': tokens.colors.neutral[0],
    muted: tokens.colors.neutral[800],
    'muted-foreground': tokens.colors.neutral[400],
    accent: tokens.colors.neutral[800],
    'accent-foreground': tokens.colors.neutral[0],
    destructive: tokens.colors.semantic.error[500],
    'destructive-foreground': tokens.colors.neutral[0],
    border: tokens.colors.neutral[700],
    input: tokens.colors.neutral[800],
    ring: tokens.colors.primary[500],
  },
};

export type Theme = typeof lightTheme | typeof darkTheme;
