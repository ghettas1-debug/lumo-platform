// Dynamic ClassNames Optimization
// Optimized class name generation and caching

// Cache for computed class names
const classNameCache = new Map<string, string>();
const MAX_CACHE_SIZE = 1000;

// Utility for creating optimized class names
export function createClassName(...classes: (string | undefined | null | false)[]): string {
  const key = classes.filter(Boolean).join('|');
  
  if (classNameCache.has(key)) {
    return classNameCache.get(key)!;
  }

  const result = classes
    .filter(Boolean)
    .join(' ')
    .trim();

  // Cache management
  if (classNameCache.size >= MAX_CACHE_SIZE) {
    const firstKey = classNameCache.keys().next().value;
    if (firstKey) {
      classNameCache.delete(firstKey);
    }
  }
  
  classNameCache.set(key, result);
  return result;
}

// Optimized conditional class names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return createClassName(...classes);
}

// Class name builder for complex conditions
export class ClassNameBuilder {
  private classes: string[] = [];

  add(className: string | undefined | null | false): this {
    if (className) {
      this.classes.push(className);
    }
    return this;
  }

  addIf(condition: boolean, className: string): this {
    if (condition && className) {
      this.classes.push(className);
    }
    return this;
  }

  addIfElse(condition: boolean, trueClass: string, falseClass?: string): this {
    if (condition && trueClass) {
      this.classes.push(trueClass);
    } else if (!condition && falseClass) {
      this.classes.push(falseClass);
    }
    return this;
  }

  addMany(...classNames: (string | undefined | null | false)[]): this {
    classNames.forEach(className => this.add(className));
    return this;
  }

  build(): string {
    return createClassName(...this.classes);
  }

  reset(): this {
    this.classes = [];
    return this;
  }
}

// Create a new builder instance
export function createBuilder(): ClassNameBuilder {
  return new ClassNameBuilder();
}

// Theme-aware class names
export function createThemeClassName(
  base: string,
  theme?: 'light' | 'dark' | 'system',
  variants?: Record<string, string>
): string {
  const builder = createBuilder();
  builder.add(base);

  if (theme && variants[theme]) {
    builder.add(variants[theme]);
  }

  if (theme === 'system') {
    builder.add(variants.light);
    builder.add('dark:system-dark');
  }

  return builder.build();
}

// Size-aware class names
export function createSizeClassName(
  base: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  sizeMap?: Record<string, string>
): string {
  const builder = createBuilder();
  builder.add(base);

  if (size && sizeMap?.[size]) {
    builder.add(sizeMap[size]);
  }

  return builder.build();
}

// State-aware class names
export function createStateClassName(
  base: string,
  states?: {
    active?: boolean;
    disabled?: boolean;
    loading?: boolean;
    error?: boolean;
    success?: boolean;
    warning?: boolean;
  },
  stateMap?: Record<string, string>
): string {
  const builder = createBuilder();
  builder.add(base);

  if (states) {
    Object.entries(states).forEach(([state, isActive]) => {
      if (isActive && stateMap?.[state]) {
        builder.add(stateMap[state]);
      }
    });
  }

  return builder.build();
}

// Responsive class names
export function createResponsiveClassName(
  base: string,
  breakpoints?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  }
): string {
  const builder = createBuilder();
  builder.add(base);

  if (breakpoints) {
    Object.entries(breakpoints).forEach(([breakpoint, className]) => {
      if (className) {
        if (breakpoint === 'xs') {
          builder.add(className);
        } else {
          builder.add(`${breakpoint}:${className}`);
        }
      }
    });
  }

  return builder.build();
}

// Animation class names
export function createAnimationClassName(
  base: string,
  animation?: {
    type?: 'fade' | 'slide' | 'scale' | 'bounce' | 'spin';
    duration?: 'fast' | 'normal' | 'slow';
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
  }
): string {
  const builder = createBuilder();
  builder.add(base);

  if (animation) {
    // Animation type
    if (animation.type) {
      builder.add(`animate-${animation.type}`);
    }

    // Animation duration
    if (animation.duration) {
      const durationMap = {
        fast: 'duration-150',
        normal: 'duration-300',
        slow: 'duration-500'
      };
      builder.add(durationMap[animation.duration]);
    }

    // Animation delay
    if (animation.delay) {
      builder.add(`delay-${animation.delay}`);
    }

    // Animation direction
    if (animation.direction) {
      builder.add(`${animation.type}-${animation.direction}`);
    }
  }

  return builder.build();
}

// Utility for merging class names with cache optimization
export function mergeClassNames(...classNamesList: (string | undefined | null)[]): string {
  return createClassName(...classNamesList);
}

// Performance monitoring for class name generation
export function getClassNameStats(): {
  cacheSize: number;
  cacheHits: number;
  cacheMisses: number;
  hitRate: number;
} {
  // This would require implementing hit/miss tracking
  // For now, return basic cache info
  return {
    cacheSize: classNameCache.size,
    cacheHits: 0, // Would need tracking implementation
    cacheMisses: 0, // Would need tracking implementation
    hitRate: 0
  };
}

// Clear cache utility
export function clearClassNameCache(): void {
  classNameCache.clear();
}

// Pre-warm cache with common class combinations
export function preWarmCache(): void {
  const commonCombinations = [
    ['flex', 'items-center', 'justify-center'],
    ['bg-blue-500', 'text-white', 'px-4', 'py-2'],
    ['text-sm', 'font-medium', 'text-gray-700'],
    ['border', 'border-gray-300', 'rounded-lg'],
    ['w-full', 'h-full'],
    ['hidden', 'md:block'],
    ['animate-fade-in', 'duration-300'],
    ['hover:bg-gray-100', 'transition-colors'],
    ['focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500'],
    ['shadow-lg', 'hover:shadow-xl']
  ];

  commonCombinations.forEach(classes => {
    createClassName(...classes);
  });
}

// Export all utilities
export const ClassNameUtils = {
  createClassName,
  cn,
  createBuilder,
  createThemeClassName,
  createSizeClassName,
  createStateClassName,
  createResponsiveClassName,
  createAnimationClassName,
  mergeClassNames,
  getClassNameStats,
  clearClassNameCache,
  preWarmCache
};

export default ClassNameUtils;
