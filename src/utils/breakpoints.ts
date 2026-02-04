'use client';

// Unified Breakpoints System for Lumo Platform
export interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface ContainerConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface GridConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface SpacingConfig {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
}

export interface TypographyConfig {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
}

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  '3xl'?: T;
  '4xl'?: T;
}

export type Breakpoint = keyof BreakpointConfig;

// Default Breakpoint Configuration
export const defaultBreakpoints: BreakpointConfig = {
  xs: 320,   // Extra Small - Small phones
  sm: 480,   // Small - Large phones
  md: 768,   // Medium - Tablets
  lg: 1024,  // Large - Small laptops
  xl: 1280,  // Extra Large - Laptops
  '2xl': 1536, // 2X Large - Desktops
  '3xl': 1920, // 3X Large - Large desktops
  '4xl': 2560, // 4X Large - Ultra-wide
};

// Container Max Widths
export const containerWidths: ContainerConfig = {
  xs: '100%',
  sm: '100%',
  md: '728px',
  lg: '960px',
  xl: '1144px',
  '2xl': '1320px',
  '3xl': '1584px',
  '4xl': '1920px',
};

// Grid Columns
export const gridColumns: GridConfig = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
  '2xl': 12,
  '3xl': 12,
  '4xl': 12,
};

// Spacing Scale
export const spacing: SpacingConfig = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
};

// Typography Scale
export const typography: TypographyConfig = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
};

// Breakpoint Manager Class
export class BreakpointManager {
  private breakpoints: BreakpointConfig;
  private currentBreakpoint: Breakpoint | null = null;
  private listeners: Set<(breakpoint: Breakpoint) => void> = new Set();
  private mediaQueries: Map<Breakpoint, MediaQueryList> = new Map();

  constructor(breakpoints: Partial<BreakpointConfig> = {}) {
    this.breakpoints = { ...defaultBreakpoints, ...breakpoints };
    this.setupMediaQueries();
    this.updateCurrentBreakpoint();
  }

  // Setup media queries
  private setupMediaQueries(): void {
    Object.entries(this.breakpoints).forEach(([key, value]) => {
      const mediaQuery = window.matchMedia(`(min-width: ${value}px)`);
      this.mediaQueries.set(key as Breakpoint, mediaQuery);
      
      mediaQuery.addEventListener('change', () => {
        this.updateCurrentBreakpoint();
      });
    });
  }

  // Update current breakpoint
  private updateCurrentBreakpoint(): void {
    const newBreakpoint = this.getCurrentBreakpoint();
    
    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint;
      this.notifyListeners();
    }
  }

  // Get current breakpoint
  public getCurrentBreakpoint(): Breakpoint {
    const width = window.innerWidth;
    
    // Find the largest breakpoint that matches
    const sortedBreakpoints = Object.entries(this.breakpoints)
      .sort(([, a], [, b]) => b - a);
    
    for (const [key, value] of sortedBreakpoints) {
      if (width >= value) {
        return key as Breakpoint;
      }
    }
    
    return 'xs'; // Fallback to smallest
  }

  // Check if current breakpoint matches or is larger
  public isBreakpointUp(breakpoint: Breakpoint): boolean {
    const current = this.getCurrentBreakpoint();
    const currentIndex = this.getBreakpointIndex(current);
    const targetIndex = this.getBreakpointIndex(breakpoint);
    
    return currentIndex >= targetIndex;
  }

  // Check if current breakpoint matches or is smaller
  public isBreakpointDown(breakpoint: Breakpoint): boolean {
    const current = this.getCurrentBreakpoint();
    const currentIndex = this.getBreakpointIndex(current);
    const targetIndex = this.getBreakpointIndex(breakpoint);
    
    return currentIndex <= targetIndex;
  }

  // Check if current breakpoint exactly matches
  public isBreakpoint(breakpoint: Breakpoint): boolean {
    return this.getCurrentBreakpoint() === breakpoint;
  }

  // Get breakpoint index
  private getBreakpointIndex(breakpoint: Breakpoint): number {
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    return breakpointOrder.indexOf(breakpoint);
  }

  // Get breakpoint value
  public getBreakpointValue(breakpoint: Breakpoint): number {
    return this.breakpoints[breakpoint];
  }

  // Get all breakpoints
  public getBreakpoints(): BreakpointConfig {
    return { ...this.breakpoints };
  }

  // Add breakpoint change listener
  public addListener(listener: (breakpoint: Breakpoint) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Remove breakpoint change listener
  public removeListener(listener: (breakpoint: Breakpoint) => void): void {
    this.listeners.delete(listener);
  }

  // Notify all listeners
  private notifyListeners(): void {
    if (this.currentBreakpoint) {
      this.listeners.forEach(listener => {
        listener(this.currentBreakpoint!);
      });
    }
  }

  // Get responsive value
  public getResponsiveValue<T>(values: ResponsiveValue<T>): T | undefined {
    const current = this.getCurrentBreakpoint();
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    const currentIndex = this.getBreakpointIndex(current);
    
    // Find the first value that matches current or smaller breakpoint
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (values[bp] !== undefined) {
        return values[bp];
      }
    }
    
    return undefined;
  }

  // Generate media query
  public generateMediaQuery(breakpoint: Breakpoint, direction: 'up' | 'down' | 'only' = 'up'): string {
    const value = this.breakpoints[breakpoint];
    
    switch (direction) {
      case 'up':
        return `(min-width: ${value}px)`;
      case 'down':
        const nextBreakpoint = this.getNextBreakpoint(breakpoint);
        if (nextBreakpoint) {
          const nextValue = this.breakpoints[nextBreakpoint];
          return `(max-width: ${nextValue - 1}px)`;
        }
        return `(max-width: ${value - 1}px)`;
      case 'only':
        const nextBp = this.getNextBreakpoint(breakpoint);
        if (nextBp) {
          const nextVal = this.breakpoints[nextBp];
          return `(min-width: ${value}px) and (max-width: ${nextVal - 1}px)`;
        }
        return `(min-width: ${value}px)`;
      default:
        return `(min-width: ${value}px)`;
    }
  }

  // Get next breakpoint
  private getNextBreakpoint(breakpoint: Breakpoint): Breakpoint | null {
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    const index = breakpointOrder.indexOf(breakpoint);
    
    if (index < breakpointOrder.length - 1) {
      return breakpointOrder[index + 1];
    }
    
    return null;
  }

  // Get previous breakpoint
  private getPreviousBreakpoint(breakpoint: Breakpoint): Breakpoint | null {
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    const index = breakpointOrder.indexOf(breakpoint);
    
    if (index > 0) {
      return breakpointOrder[index - 1];
    }
    
    return null;
  }

  // Update breakpoints
  public updateBreakpoints(breakpoints: Partial<BreakpointConfig>): void {
    this.breakpoints = { ...this.breakpoints, ...breakpoints };
    this.setupMediaQueries();
    this.updateCurrentBreakpoint();
  }

  // Destroy manager
  public destroy(): void {
    this.listeners.clear();
    this.mediaQueries.clear();
  }
}

// React Hook for Breakpoints
export const useBreakpoints = (customBreakpoints?: Partial<BreakpointConfig>) => {
  const [manager] = useState(() => new BreakpointManager(customBreakpoints));
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(() => manager.getCurrentBreakpoint());

  // Update breakpoint when it changes
  useEffect(() => {
    const unsubscribe = manager.addListener((bp) => {
      setCurrentBreakpoint(bp);
    });

    return unsubscribe;
  }, [manager]);

  // Get responsive value
  const getResponsiveValue = useCallback(<T>(values: ResponsiveValue<T>): T | undefined => {
    return manager.getResponsiveValue(values);
  }, [manager]);

  // Check breakpoint conditions
  const isUp = useCallback((breakpoint: Breakpoint) => {
    return manager.isBreakpointUp(breakpoint);
  }, [manager]);

  const isDown = useCallback((breakpoint: Breakpoint) => {
    return manager.isBreakpointDown(breakpoint);
  }, [manager]);

  const is = useCallback((breakpoint: Breakpoint) => {
    return manager.isBreakpoint(breakpoint);
  }, [manager]);

  // Generate media query
  const mediaQuery = useCallback((breakpoint: Breakpoint, direction?: 'up' | 'down' | 'only') => {
    return manager.generateMediaQuery(breakpoint, direction);
  }, [manager]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, [manager]);

  return {
    currentBreakpoint,
    getResponsiveValue,
    isUp,
    isDown,
    is,
    mediaQuery,
    breakpoints: manager.getBreakpoints(),
  };
};

// Utility Functions
export const breakpointUtils = {
  // Create breakpoint manager
  createManager: (breakpoints?: Partial<BreakpointConfig>) => {
    return new BreakpointManager(breakpoints);
  },

  // Get breakpoint value
  getValue: (breakpoint: Breakpoint, customBreakpoints?: Partial<BreakpointConfig>): number => {
    const bp = { ...defaultBreakpoints, ...customBreakpoints };
    return bp[breakpoint];
  },

  // Generate CSS media query
  generateCSSMediaQuery: (breakpoint: Breakpoint, direction: 'up' | 'down' | 'only' = 'up', customBreakpoints?: Partial<BreakpointConfig>): string => {
    const value = breakpointUtils.getValue(breakpoint, customBreakpoints);
    const bp = { ...defaultBreakpoints, ...customBreakpoints };
    
    switch (direction) {
      case 'up':
        return `@media (min-width: ${value}px)`;
      case 'down':
        const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
        const index = breakpointOrder.indexOf(breakpoint);
        if (index < breakpointOrder.length - 1) {
          const nextBp = breakpointOrder[index + 1];
          const nextValue = bp[nextBp];
          return `@media (max-width: ${nextValue - 1}px)`;
        }
        return `@media (max-width: ${value - 1}px)`;
      case 'only':
        const order: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
        const idx = order.indexOf(breakpoint);
        if (idx < order.length - 1) {
          const nextB = order[idx + 1];
          const nextVal = bp[nextB];
          return `@media (min-width: ${value}px) and (max-width: ${nextVal - 1}px)`;
        }
        return `@media (min-width: ${value}px)`;
      default:
        return `@media (min-width: ${value}px)`;
    }
  },

  // Generate responsive CSS
  generateResponsiveCSS: (property: string, values: ResponsiveValue<string>, customBreakpoints?: Partial<BreakpointConfig>): string => {
    const bp = { ...defaultBreakpoints, ...customBreakpoints };
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    let css = '';

    // Generate base styles (xs)
    if (values.xs) {
      css += `${property}: ${values.xs};\n`;
    }

    // Generate responsive styles
    breakpointOrder.slice(1).forEach(breakpoint => {
      if (values[breakpoint]) {
        const mediaQuery = breakpointUtils.generateCSSMediaQuery(breakpoint, 'up', customBreakpoints);
        css += `${mediaQuery} {\n`;
        css += `  ${property}: ${values[breakpoint]};\n`;
        css += `}\n`;
      }
    });

    return css;
  },

  // Get container width
  getContainerWidth: (breakpoint: Breakpoint): string => {
    return containerWidths[breakpoint];
  },

  // Get grid columns
  getGridColumns: (breakpoint: Breakpoint): number => {
    return gridColumns[breakpoint];
  },

  // Get spacing value
  getSpacing: (key: keyof SpacingConfig): string => {
    return spacing[key];
  },

  // Get typography value
  getTypography: (key: keyof TypographyConfig): string => {
    return typography[key];
  },

  // Validate breakpoint configuration
  validateBreakpoints: (breakpoints: Partial<BreakpointConfig>): string[] => {
    const errors: string[] = [];
    const order: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    
    // Check if values are numbers and in ascending order
    let lastValue = 0;
    order.forEach(bp => {
      const value = breakpoints[bp];
      if (value !== undefined) {
        if (typeof value !== 'number' || value <= 0) {
          errors.push(`Breakpoint ${bp} must be a positive number`);
        }
        if (value <= lastValue) {
          errors.push(`Breakpoint ${bp} must be larger than previous breakpoint`);
        }
        lastValue = value;
      }
    });
    
    return errors;
  },

  // Create default configuration
  createDefaultConfig: () => ({
    breakpoints: defaultBreakpoints,
    containers: containerWidths,
    grids: gridColumns,
    spacing,
    typography,
  }),

  // Format breakpoint name
  formatBreakpointName: (breakpoint: Breakpoint): string => {
    const names: Record<Breakpoint, string> = {
      xs: 'Extra Small',
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
      xl: 'Extra Large',
      '2xl': '2X Large',
      '3xl': '3X Large',
      '4xl': '4X Large',
    };
    return names[breakpoint];
  },

  // Get breakpoint range
  getBreakpointRange: (breakpoint: Breakpoint, customBreakpoints?: Partial<BreakpointConfig>): { min: number; max?: number } => {
    const bp = { ...defaultBreakpoints, ...customBreakpoints };
    const value = bp[breakpoint];
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    const index = breakpointOrder.indexOf(breakpoint);
    
    if (index < breakpointOrder.length - 1) {
      const nextBp = breakpointOrder[index + 1];
      const nextValue = bp[nextBp];
      return { min: value, max: nextValue - 1 };
    }
    
    return { min: value };
  },
};

// Default breakpoint manager instance
export const defaultBreakpointManager = new BreakpointManager();

export default BreakpointManager;
export type { BreakpointConfig, ContainerConfig, GridConfig, SpacingConfig, TypographyConfig, ResponsiveValue, Breakpoint };
