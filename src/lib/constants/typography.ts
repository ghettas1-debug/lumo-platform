// Typography Constants
export const typography = {
  // Font Families
  fonts: {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
    arabic: '"Noto Sans Arabic", sans-serif',
  },
  
  // Font Sizes
  sizes: {
    xs: 'text-xs',      // 12px
    sm: 'text-sm',      // 14px
    base: 'text-base',  // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl',  // 24px
    '3xl': 'text-3xl',  // 30px
    '4xl': 'text-4xl',  // 36px
    '5xl': 'text-5xl',  // 48px
    '6xl': 'text-6xl',  // 60px
    '7xl': 'text-7xl',  // 72px
    '8xl': 'text-8xl',  // 96px
    '9xl': 'text-9xl',  // 128px
  },
  
  // Font Weights
  weights: {
    thin: 'font-thin',      // 100
    extralight: 'font-extralight', // 200
    light: 'font-light',    // 300
    normal: 'font-normal',  // 400
    medium: 'font-medium',  // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',      // 700
    extrabold: 'font-extrabold', // 800
    black: 'font-black',    // 900
  },
  
  // Line Heights
  lineHeights: {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  },
  
  // Letter Spacing
  letterSpacings: {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest',
  },
  
  // Text Colors
  colors: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    accent: 'text-blue-600',
    white: 'text-white',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  },
};

// Common Typography Classes
export const text = {
  // Headings
  h1: 'text-4xl md:text-6xl font-black text-gray-900 leading-tight',
  h2: 'text-3xl md:text-5xl font-black text-gray-900 leading-tight',
  h3: 'text-2xl md:text-4xl font-bold text-gray-900 leading-tight',
  h4: 'text-xl md:text-3xl font-bold text-gray-900 leading-tight',
  h5: 'text-lg md:text-2xl font-bold text-gray-900 leading-tight',
  h6: 'text-base md:text-xl font-bold text-gray-900 leading-tight',
  
  // Body Text
  body: 'text-gray-600 leading-relaxed',
  bodyLarge: 'text-xl text-gray-600 leading-relaxed',
  bodySmall: 'text-sm text-gray-600 leading-relaxed',
  
  // UI Text
  ui: 'text-sm text-gray-700',
  uiSmall: 'text-xs text-gray-600',
  uiLarge: 'text-base text-gray-700',
  
  // Special Text
  caption: 'text-xs text-gray-500',
  overline: 'text-xs font-bold uppercase tracking-wider text-gray-400',
  badge: 'text-xs font-bold',
  
  // Links
  link: 'text-blue-600 hover:text-blue-700 transition-colors',
  linkUnderline: 'text-blue-600 underline-offset-4 hover:underline transition-colors',
  
  // Buttons
  buttonText: 'font-medium',
  buttonSmall: 'text-sm font-medium',
  buttonLarge: 'text-lg font-bold',
  
  // Navigation
  navLink: 'text-gray-600 hover:text-blue-600 font-medium transition-colors',
  navActive: 'text-blue-600 font-medium',
  
  // Cards
  cardTitle: 'text-lg font-bold text-gray-900',
  cardDescription: 'text-sm text-gray-600 leading-relaxed',
  
  // Forms
  label: 'text-sm font-medium text-gray-700',
  input: 'text-sm text-gray-900',
  placeholder: 'text-gray-500',
  helper: 'text-xs text-gray-500',
  
  // Status
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-600',
};

// Responsive Typography
export const responsive = {
  heading: 'text-2xl md:text-3xl lg:text-4xl',
  subheading: 'text-xl md:text-2xl lg:text-3xl',
  title: 'text-lg md:text-xl lg:text-2xl',
  body: 'text-sm md:text-base',
  small: 'text-xs md:text-sm',
};
