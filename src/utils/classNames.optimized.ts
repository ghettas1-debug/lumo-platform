// Optimized class name utilities for better performance
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Memoized class name combinations
const classNameCache = new Map<string, string>();

// Optimized clsx + tailwind-merge combination
export const cn = (...inputs: ClassValue[]) => {
  const key = inputs.join('|');
  
  if (classNameCache.has(key)) {
    return classNameCache.get(key)!;
  }
  
  const result = twMerge(clsx(inputs));
  classNameCache.set(key, result);
  
  return result;
};

// Pre-defined class combinations for common patterns
export const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
  outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  ghost: 'hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
  destructive: 'bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  success: 'bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
  warning: 'bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2',
  gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  link: 'text-blue-600 hover:text-blue-700 underline font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
} as const;

export const cardVariants = {
  default: 'bg-white rounded-lg shadow-md border border-gray-200 p-6',
  elevated: 'bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200',
  outlined: 'bg-white rounded-lg border-2 border-gray-300 p-6 hover:border-gray-400 transition-colors duration-200',
  glass: 'bg-white/80 backdrop-blur-sm rounded-lg border border-white/20 p-6 shadow-lg',
  dark: 'bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6',
} as const;

export const inputVariants = {
  default: 'border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
  error: 'border border-red-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200',
  success: 'border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200',
  ghost: 'border-0 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-gray-100 transition-all duration-200',
} as const;

export const badgeVariants = {
  default: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
  secondary: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800',
  success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800',
  warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
  destructive: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800',
  outline: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700',
} as const;

export const modalVariants = {
  default: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50',
  slideUp: 'fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 z-50',
  slideDown: 'fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50',
  slideLeft: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end p-4 z-50',
  slideRight: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-start p-4 z-50',
} as const;

export const alertVariants = {
  info: 'bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg',
  success: 'bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg',
  warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg',
  error: 'bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg',
} as const;

export const loadingVariants = {
  spinner: 'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
  dots: 'flex space-x-1',
  pulse: 'animate-pulse bg-gray-200 rounded',
  skeleton: 'animate-pulse bg-gray-200 rounded',
} as const;

// Responsive breakpoint utilities
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const responsive = {
  // Container max widths
  container: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  },
  // Grid layouts
  grid: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  },
  // Text sizes
  text: {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl',
    '4xl': 'text-4xl sm:text-5xl',
  },
  // Spacing
  spacing: {
    xs: 'p-2 sm:p-4',
    sm: 'p-4 sm:p-6',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-12',
    xl: 'p-12 sm:p-16',
  },
} as const;

// Animation utilities
export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
  scaleIn: 'animate-scale-in',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  ping: 'animate-ping',
} as const;

// State-based class utilities
export const stateClasses = {
  active: 'ring-2 ring-blue-500 ring-offset-2',
  disabled: 'opacity-50 cursor-not-allowed',
  loading: 'opacity-75 cursor-wait',
  error: 'ring-2 ring-red-500 ring-offset-2',
  success: 'ring-2 ring-green-500 ring-offset-2',
  warning: 'ring-2 ring-yellow-500 ring-offset-2',
  focus: 'outline-none ring-2 ring-blue-500 ring-offset-2',
  hover: 'hover:bg-gray-100 hover:text-gray-900',
  selected: 'bg-blue-50 border-blue-500 text-blue-700',
} as const;

// Theme-based utilities
export const themeClasses = {
  light: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-50',
  },
  dark: {
    bg: 'bg-gray-900',
    text: 'text-gray-100',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-800',
  },
} as const;

// Component-specific utilities
export const componentClasses = {
  navigation: {
    base: 'flex items-center justify-between w-full px-4 py-3 bg-white border-b border-gray-200',
    mobile: 'sm:hidden',
    desktop: 'hidden sm:flex',
  },
  hero: {
    base: 'relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24',
  },
  footer: {
    base: 'bg-gray-900 text-white',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12',
  },
  sidebar: {
    base: 'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
    open: 'translate-x-0',
    closed: '-translate-x-full',
  },
} as const;

// Performance monitoring for class name generation
export const getClassNameStats = () => {
  return {
    cacheSize: classNameCache.size,
    cacheHitRate: classNameCache.size > 0 ? 'Available' : 'Empty',
  };
};

// Clear cache utility for development
export const clearClassNameCache = () => {
  classNameCache.clear();
};

// Debounced class name utility for dynamic classes
export const debounceClassName = (fn: (...args: any[]) => string, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Throttled class name utility for frequent updates
export const throttleClassName = (fn: (...args: any[]) => string, limit: number) => {
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Conditional class name utility
export const conditionalClass = (condition: boolean, className: string) => {
  return condition ? className : '';
};

// Multiple conditional class names
export const conditionalClasses = (conditions: Record<string, boolean>) => {
  return Object.entries(conditions)
    .filter(([_, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
};

// Dynamic class name builder
export const buildClassName = (base: string, modifiers: Record<string, boolean> = {}, additional: string[] = []) => {
  const modifierClasses = Object.entries(modifiers)
    .filter(([_, condition]) => condition)
    .map(([modifier]) => `${base}--${modifier}`);
  
  return cn(base, ...modifierClasses, ...additional);
};

// Size-based class utilities
export const sizeClasses = {
  button: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  },
  icon: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
  },
  spacing: {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
    xl: 'p-6',
    '2xl': 'p-8',
  },
} as const;

// Color-based class utilities
export const colorClasses = {
  primary: {
    50: 'bg-blue-50 text-blue-900 border-blue-200',
    100: 'bg-blue-100 text-blue-900 border-blue-300',
    500: 'bg-blue-500 text-white border-blue-600',
    600: 'bg-blue-600 text-white border-blue-700',
    700: 'bg-blue-700 text-white border-blue-800',
  },
  secondary: {
    50: 'bg-gray-50 text-gray-900 border-gray-200',
    100: 'bg-gray-100 text-gray-900 border-gray-300',
    500: 'bg-gray-500 text-white border-gray-600',
    600: 'bg-gray-600 text-white border-gray-700',
    700: 'bg-gray-700 text-white border-gray-800',
  },
  success: {
    50: 'bg-green-50 text-green-900 border-green-200',
    100: 'bg-green-100 text-green-900 border-green-300',
    500: 'bg-green-500 text-white border-green-600',
    600: 'bg-green-600 text-white border-green-700',
    700: 'bg-green-700 text-white border-green-800',
  },
  warning: {
    50: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    100: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    500: 'bg-yellow-500 text-white border-yellow-600',
    600: 'bg-yellow-600 text-white border-yellow-700',
    700: 'bg-yellow-700 text-white border-yellow-800',
  },
  error: {
    50: 'bg-red-50 text-red-900 border-red-200',
    100: 'bg-red-100 text-red-900 border-red-300',
    500: 'bg-red-500 text-white border-red-600',
    600: 'bg-red-600 text-white border-red-700',
    700: 'bg-red-700 text-white border-red-800',
  },
} as const;

// Export all utilities
export {
  cn,
  buttonVariants,
  cardVariants,
  inputVariants,
  badgeVariants,
  modalVariants,
  alertVariants,
  loadingVariants,
  breakpoints,
  responsive,
  animations,
  stateClasses,
  themeClasses,
  componentClasses,
  sizeClasses,
  colorClasses,
};
