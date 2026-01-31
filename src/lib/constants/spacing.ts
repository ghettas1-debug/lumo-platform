// Spacing Constants
export const spacing = {
  // Base spacing units
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px
  
  // Component specific spacing
  container: {
    padding: 'px-6',
    maxWidth: 'max-w-7xl mx-auto',
  },
  
  section: {
    padding: 'py-20',
    paddingSmall: 'py-16',
    paddingLarge: 'py-32',
  },
  
  card: {
    padding: 'p-6',
    paddingSmall: 'p-4',
    paddingLarge: 'p-8',
    gap: 'gap-6',
  },
  
  grid: {
    gap: 'gap-6',
    gapSmall: 'gap-4',
    gapLarge: 'gap-8',
  },
  
  button: {
    paddingX: 'px-6',
    paddingY: 'py-3',
    gap: 'gap-2',
  },
  
  navigation: {
    height: 'h-16 md:h-20',
    padding: 'px-4',
    gap: 'gap-6',
  },
  
  hero: {
    padding: 'py-20 md:py-32',
    gap: 'gap-12',
  },
  
  footer: {
    padding: 'py-16',
    paddingBottom: 'py-6',
  },
};

// Responsive Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Common Layout Classes
export const layout = {
  container: 'container mx-auto px-6',
  section: 'py-20',
  sectionSmall: 'py-16',
  card: 'p-6',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  gridTwo: 'grid grid-cols-1 md:grid-cols-2',
  gridThree: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  textCenter: 'text-center',
  textRight: 'text-right',
};
