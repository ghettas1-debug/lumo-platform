/**
 * LUMO DESIGN SYSTEM EXPORTS
 * Professional Design System Components and Utilities
 */

// ===== CORE DESIGN SYSTEM COMPONENTS =====
export { default as ErrorBoundary, useErrorHandler } from './ErrorBoundary';
export {
  Spinner,
  Skeleton,
  CardSkeleton,
  CourseCardSkeleton,
  ListSkeleton,
  TableSkeleton,
  FullPageLoading,
  ProgressLoading,
  PulseLoadingOverlay,
} from './LoadingStates';
export {
  HoverEffect,
  RippleEffect,
  MagneticEffect,
  StaggeredAnimation,
  MorphingShape,
  ParallaxEffect,
  FloatingAnimation,
  TypingAnimation,
  CounterAnimation,
  ProgressRing,
  SlideInAnimation,
} from './MicroInteractions';
export {
  ResponsiveGrid,
  ResponsiveContainer,
  ResponsiveStack,
  ResponsiveCard,
  ResponsiveText,
  ResponsiveImage,
  ResponsiveButton,
  useBreakpoint,
  useResponsiveValue,
} from './ResponsiveGrid';
export {
  default as EnhancedThemeProvider,
  useEnhancedTheme,
  useThemeAwareComponent,
  getColorSchemeClasses,
} from './EnhancedThemeProvider';

// ===== DESIGN TOKENS =====
export { tokens, lightTheme, darkTheme } from '@/tokens/design-tokens';
export type { Theme } from '@/tokens/design-tokens';

// ===== RE-EXPORT EXISTING UI COMPONENTS =====
export { Button } from '@/components/ui/Button';
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants 
} from '@/components/ui/Card';
export { Badge, badgeVariants } from '@/components/ui/atoms/Badge';

// ===== UTILITY HOOKS =====
import { useEnhancedTheme, useThemeAwareComponent } from './EnhancedThemeProvider';
import { useBreakpoint } from './ResponsiveGrid';
import { tokens } from '@/tokens/design-tokens';

export const useDesignSystem = () => {
  const theme = useEnhancedTheme();
  const breakpoint = useBreakpoint();
  const themeAware = useThemeAwareComponent();
  
  return {
    theme,
    breakpoint,
    themeAware,
    tokens,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  };
};

// ===== COMPONENT VARIANTS =====
export const createComponentVariant = <T extends Record<string, string>>(
  base: string,
  variants: T
) => {
  return (variant: keyof T, additionalClasses = '') => {
    return `${base} ${variants[variant]} ${additionalClasses}`.trim();
  };
};

// ===== ANIMATION PRESETS =====
export const animationPresets = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  scaleIn: 'animate-scale-in',
  float: 'animate-float',
  pulseGlow: 'animate-pulse-glow',
  shimmer: 'animate-shimmer',
  bounceIn: 'animate-bounce-in',
  slideInRight: 'animate-slide-in-right',
  cardEntrance: 'animate-card-entrance',
};

// ===== RESPONSIVE BREAKPOINTS =====
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
};

// ===== COLOR PALETTES =====
export const colorPalettes = {
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
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  neutral: {
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
  },
};

// ===== TYPOGRAPHY SCALE =====
export const typography = {
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    arabic: ['Cairo', 'Noto Sans Arabic', 'sans-serif'],
    display: ['Clash Display', 'Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
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
  },
};

// ===== SPACING SCALE =====
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

// ===== SHADOW SCALE =====
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  glow: '0 0 20px rgb(59 130 246 / 0.3)',
  'glow-lg': '0 0 40px rgb(59 130 246 / 0.4)',
};

// ===== BORDER RADIUS SCALE =====
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};
