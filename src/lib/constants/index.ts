// Export all constants
export * from './colors';
export * from './spacing';
export * from './typography';

// Common Component Patterns
export const patterns = {
  // Card Patterns
  card: {
    base: 'rounded-3xl border bg-white text-gray-950 shadow-lg transition-all duration-200',
    hover: 'hover:shadow-2xl hover:scale-105',
    interactive: 'cursor-pointer active:scale-95',
    elevated: 'border-gray-100 shadow-xl',
    glass: 'border-white/20 bg-white/80 backdrop-blur-md',
  },
  
  // Button Patterns
  button: {
    base: 'inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
    gradient: 'bg-linear-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
  },
  
  // Layout Patterns
  layout: {
    container: 'container mx-auto px-6',
    section: 'py-20',
    sectionSmall: 'py-16',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    gridTwo: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    flexCenter: 'flex items-center justify-center',
    flexBetween: 'flex items-center justify-between',
  },
  
  // Animation Patterns
  animation: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    scale: 'hover:scale-105 transition-transform duration-200',
    shadow: 'hover:shadow-xl transition-shadow duration-200',
    smooth: 'transition-all duration-200',
  },
  
  // Form Patterns
  form: {
    input: 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    error: 'text-red-600 text-sm mt-1',
    success: 'text-green-600 text-sm mt-1',
  },
  
  // Navigation Patterns
  navigation: {
    link: 'text-gray-600 hover:text-blue-600 font-medium transition-colors',
    active: 'text-blue-600 font-medium',
    dropdown: 'absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50',
  },
  
  // Badge Patterns
  badge: {
    base: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    new: 'bg-green-100 text-green-800',
    important: 'bg-red-100 text-red-800',
  },
  
  // Icon Patterns
  icon: {
    base: 'w-5 h-5',
    small: 'w-4 h-4',
    large: 'w-6 h-6',
    xl: 'w-8 h-8',
    button: 'w-5 h-5 mr-2',
    card: 'w-8 h-8 text-white',
  },
};

// Utility Classes
export const utilities = {
  // Text utilities
  textEllipsis: 'truncate',
  textBreak: 'break-words',
  textNoWrap: 'whitespace-nowrap',
  
  // Layout utilities
  fullHeight: 'min-h-screen',
  fullWidth: 'w-full',
  centered: 'flex items-center justify-center min-h-screen',
  
  // Spacing utilities
  sectionSpacing: 'py-20',
  cardSpacing: 'p-6',
  buttonSpacing: 'px-6 py-3',
  
  // Border utilities
  rounded: 'rounded-xl',
  roundedFull: 'rounded-full',
  rounded2xl: 'rounded-2xl',
  rounded3xl: 'rounded-3xl',
  
  // Shadow utilities
  shadow: 'shadow-lg',
  shadowLarge: 'shadow-xl',
  shadowHover: 'hover:shadow-xl',
  
  // Transition utilities
  transition: 'transition-all duration-200',
  transitionSlow: 'transition-all duration-300',
  
  // Focus utilities
  focus: 'focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  outline: 'outline-none',
};

// Responsive Utilities
export const responsive = {
  // Hide/Show
  hideMobile: 'hidden md:block',
  showMobile: 'block md:hidden',
  hideDesktop: 'md:hidden',
  showDesktop: 'hidden md:block',
  
  // Text sizes
  responsiveText: 'text-sm md:text-base lg:text-lg',
  responsiveHeading: 'text-2xl md:text-3xl lg:text-4xl',
  
  // Grid
  responsiveGrid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  responsiveGridTwo: 'grid-cols-1 md:grid-cols-2',
  
  // Spacing
  responsivePadding: 'px-4 md:px-6 lg:px-8',
  responsiveMargin: 'my-4 md:my-6 lg:my-8',
};
