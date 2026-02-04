'use client';

// Responsive Images, Typography, and Layouts Utilities for Lumo Platform
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

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  crop?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  gravity?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  sharpen?: boolean;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

export interface TypographyScale {
  xs: { fontSize: string; lineHeight: string; letterSpacing?: string };
  sm: { fontSize: string; lineHeight: string; letterSpacing?: string };
  base: { fontSize: string; lineHeight: string; letterSpacing?: string };
  lg: { fontSize: string; lineHeight: string; letterSpacing?: string };
  xl: { fontSize: string; lineHeight: string; letterSpacing?: string };
  '2xl': { fontSize: string; lineHeight: string; letterSpacing?: string };
  '3xl': { fontSize: string; lineHeight: string; letterSpacing?: string };
  '4xl': { fontSize: string; lineHeight: string; letterSpacing?: string };
  '5xl': { fontSize: string; lineHeight: string; letterSpacing?: string };
  '6xl': { fontSize: string; lineHeight: string; letterSpacing?: string };
  '7xl': { fontSize: string; lineHeight: string; letterSpacing?: string };
  '8xl': { fontSize: string; lineHeight: string; letterSpacing?: string };
  '9xl': { fontSize: string; lineHeight: string; letterSpacing?: string };
}

export interface LayoutConfig {
  container: {
    maxWidth: Record<string, string>;
    padding: Record<string, string>;
  };
  grid: {
    columns: Record<string, number>;
    gap: Record<string, string>;
  };
  spacing: {
    scale: Record<string, string>;
    responsive: Record<string, Record<string, string>>;
  };
  typography: TypographyScale;
}

// Image Optimization Manager
export class ImageOptimizationManager {
  private config: ImageOptimizationOptions;
  private supportedFormats: string[] = [];

  constructor(config: Partial<ImageOptimizationOptions> = {}) {
    this.config = {
      quality: 75,
      format: 'webp',
      fit: 'cover',
      gravity: 'center',
      sharpen: true,
      ...config,
    };
    
    this.detectSupportedFormats();
  }

  // Detect supported image formats
  private detectSupportedFormats(): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Test WebP support
      canvas.width = 1;
      canvas.height = 1;
      const webpData = canvas.toDataURL('image/webp');
      if (webpData.indexOf('data:image/webp') === 0) {
        this.supportedFormats.push('webp');
      }
      
      // Test AVIF support
      const avifData = canvas.toDataURL('image/avif');
      if (avifData.indexOf('data:image/avif') === 0) {
        this.supportedFormats.push('avif');
      }
    }
    
    // Always support JPEG and PNG
    this.supportedFormats.push('jpg', 'png');
  }

  // Generate optimized image URL
  public generateOptimizedUrl(
    originalUrl: string,
    options: Partial<ImageOptimizationOptions> = {}
  ): string {
    const mergedOptions = { ...this.config, ...options };
    const params = new URLSearchParams();
    
    // Add dimensions
    if (mergedOptions.width) params.append('w', mergedOptions.width.toString());
    if (mergedOptions.height) params.append('h', mergedOptions.height.toString());
    
    // Add quality
    if (mergedOptions.quality && mergedOptions.quality !== 75) {
      params.append('q', mergedOptions.quality.toString());
    }
    
    // Add format
    if (mergedOptions.format && mergedOptions.format !== 'jpg') {
      params.append('f', mergedOptions.format);
    }
    
    // Add fit
    if (mergedOptions.fit && mergedOptions.fit !== 'cover') {
      params.append('fit', mergedOptions.fit);
    }
    
    // Add gravity
    if (mergedOptions.gravity && mergedOptions.gravity !== 'center') {
      params.append('g', mergedOptions.gravity);
    }
    
    // Add crop
    if (mergedOptions.crop) {
      params.append('c', mergedOptions.crop);
    }
    
    // Add filters
    const filters: string[] = [];
    
    if (mergedOptions.sharpen) filters.push('sharpen');
    if (mergedOptions.blur) filters.push(`blur:${mergedOptions.blur}`);
    if (mergedOptions.brightness) filters.push(`brightness:${mergedOptions.brightness}`);
    if (mergedOptions.contrast) filters.push(`contrast:${mergedOptions.contrast}`);
    if (mergedOptions.saturation) filters.push(`saturation:${mergedOptions.saturation}`);
    
    if (filters.length > 0) {
      params.append('fm', filters.join(','));
    }
    
    const paramString = params.toString();
    return paramString ? `${originalUrl}?${paramString}` : originalUrl;
  }

  // Generate responsive srcset
  public generateSrcSet(
    originalUrl: string,
    widths: number[],
    options: Partial<ImageOptimizationOptions> = {}
  ): string {
    return widths
      .map(width => {
        const optimizedUrl = this.generateOptimizedUrl(originalUrl, { ...options, width });
        return `${optimizedUrl} ${width}w`;
      })
      .join(', ');
  }

  // Generate sizes attribute
  public generateSizes(breakpoints: Record<string, number>): string {
    const sizeRules: string[] = [];
    
    const sortedBreakpoints = Object.entries(breakpoints)
      .sort(([, a], [, b]) => a - b);
    
    sortedBreakpoints.forEach(([breakpoint, width], index) => {
      if (index === sortedBreakpoints.length - 1) {
        sizeRules.push(`${width}px`);
      } else {
        const maxWidth = sortedBreakpoints[index + 1][1] - 1;
        sizeRules.push(`(max-width: ${maxWidth}px) ${width}px`);
      }
    });
    
    return sizeRules.join(', ');
  }

  // Get best format for browser
  public getBestFormat(): string {
    if (this.supportedFormats.includes('avif')) return 'avif';
    if (this.supportedFormats.includes('webp')) return 'webp';
    return 'jpg';
  }

  // Generate picture element sources
  public generatePictureSources(
    originalUrl: string,
    widths: number[],
    options: Partial<ImageOptimizationOptions> = {}
  ): Array<{ srcSet: string; type: string; media?: string }> {
    const sources: Array<{ srcSet: string; type: string; media?: string }> = [];
    const bestFormat = this.getBestFormat();
    
    // Generate sources for different formats
    const formats = bestFormat === 'avif' ? ['avif', 'webp', 'jpg'] : ['webp', 'jpg'];
    
    formats.forEach(format => {
      const srcSet = this.generateSrcSet(originalUrl, widths, { ...options, format });
      sources.push({
        srcSet,
        type: `image/${format}`,
      });
    });
    
    return sources;
  }

  // Preload critical images
  public preloadImage(url: string, options: Partial<ImageOptimizationOptions> = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const optimizedUrl = this.generateOptimizedUrl(url, options);
      
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to preload image: ${optimizedUrl}`));
      img.src = optimizedUrl;
    });
  }

  // Batch preload images
  public async preloadImages(
    urls: string[],
    options: Partial<ImageOptimizationOptions> = {},
    concurrency: number = 4
  ): Promise<void[]> {
    const results: Promise<void>[] = [];
    
    for (let i = 0; i < urls.length; i += concurrency) {
      const batch = urls.slice(i, i + concurrency);
      const batchPromises = batch.map(url => this.preloadImage(url, options));
      results.push(...batchPromises);
      await Promise.allSettled(batchPromises);
    }
    
    return Promise.all(results);
  }

  // Get image dimensions
  public getImageDimensions(url: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }

  // Calculate aspect ratio
  public calculateAspectRatio(width: number, height: number): string {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  }

  // Generate placeholder image
  public generatePlaceholder(
    width: number,
    height: number,
    text?: string,
    bgColor: string = '#f3f4f6',
    textColor: string = '#9ca3af'
  ): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return '';
    
    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add text if provided
    if (text) {
      ctx.fillStyle = textColor;
      ctx.font = `${Math.min(width, height) / 10}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);
    }
    
    return canvas.toDataURL('image/png');
  }

  // Update configuration
  public updateConfig(config: Partial<ImageOptimizationOptions>): void {
    this.config = { ...this.config, ...config };
  }

  // Get configuration
  public getConfig(): ImageOptimizationOptions {
    return { ...this.config };
  }
}

// Typography Manager
export class TypographyManager {
  private scale: TypographyScale;
  private currentBreakpoint: string = 'base';

  constructor(customScale?: Partial<TypographyScale>) {
    this.scale = {
      xs: { fontSize: '0.75rem', lineHeight: '1rem' },
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      base: { fontSize: '1rem', lineHeight: '1.5rem' },
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
      '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
      '5xl': { fontSize: '3rem', lineHeight: '1' },
      '6xl': { fontSize: '3.75rem', lineHeight: '1' },
      '7xl': { fontSize: '4.5rem', lineHeight: '1' },
      '8xl': { fontSize: '6rem', lineHeight: '1' },
      '9xl': { fontSize: '8rem', lineHeight: '1' },
      ...customScale,
    };
  }

  // Set current breakpoint
  public setBreakpoint(breakpoint: string): void {
    this.currentBreakpoint = breakpoint;
  }

  // Get responsive typography value
  public getResponsiveValue(
    values: ResponsiveValue<string>,
    defaultValue: string = 'base'
  ): string {
    const breakpointOrder: (keyof ResponsiveValue<string>)[] = [
      'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
    ];
    
    const currentIndex = breakpointOrder.indexOf(this.currentBreakpoint as keyof ResponsiveValue<string>);
    
    // Find the first value that matches current or smaller breakpoint
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (values[bp]) {
        return values[bp];
      }
    }
    
    return values.xs || defaultValue;
  }

  // Get typography scale value
  public getScaleValue(size: keyof TypographyScale): TypographyScale[keyof TypographyScale] {
    return this.scale[size];
  }

  // Generate responsive CSS
  public generateResponsiveCSS(
    property: string,
    values: ResponsiveValue<string>
  ): string {
    const css: string[] = [];
    
    // Base value (xs)
    if (values.xs) {
      css.push(`${property}: ${values.xs};`);
    }
    
    // Responsive values
    const breakpointOrder: (keyof ResponsiveValue<string>)[] = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    const mediaQueries: Record<string, string> = {
      sm: '@media (min-width: 480px)',
      md: '@media (min-width: 768px)',
      lg: '@media (min-width: 1024px)',
      xl: '@media (min-width: 1280px)',
      '2xl': '@media (min-width: 1536px)',
      '3xl': '@media (min-width: 1920px)',
      '4xl': '@media (min-width: 2560px)',
    };
    
    breakpointOrder.forEach(breakpoint => {
      if (values[breakpoint]) {
        css.push(`${mediaQueries[breakpoint]} {`);
        css.push(`  ${property}: ${values[breakpoint]};`);
        css.push('}');
      }
    });
    
    return css.join('\n');
  }

  // Calculate optimal font size based on viewport
  public calculateOptimalFontSize(
    minSize: number,
    maxSize: number,
    minViewport: number = 320,
    maxViewport: number = 1920
  ): string {
    return `clamp(${minSize}px, ${minSize}px + ${maxSize - minSize} * (100vw - ${minViewport}px) / ${maxViewport - minViewport}, ${maxSize}px)`;
  }

  // Generate fluid typography
  public generateFluidTypography(
    minSize: number,
    maxSize: number,
    minViewport: number = 320,
    maxViewport: number = 1920
  ): {
    fontSize: string;
    lineHeight: string;
  } {
    const fontSize = this.calculateOptimalFontSize(minSize, maxSize, minViewport, maxViewport);
    const lineHeight = this.calculateOptimalFontSize(
      Math.round(minSize * 1.5),
      Math.round(maxSize * 1.5),
      minViewport,
      maxViewport
    );
    
    return { fontSize, lineHeight };
  }

  // Get readable line height for font size
  public getReadableLineHeight(fontSize: number): number {
    if (fontSize < 12) return 1.2;
    if (fontSize < 16) return 1.4;
    if (fontSize < 20) return 1.5;
    if (fontSize < 32) return 1.4;
    return 1.2;
  }

  // Scale typography
  public scaleTypography(
    baseSize: number,
    ratio: number = 1.25
  ): Record<string, { fontSize: string; lineHeight: string }> {
    const scale: Record<string, { fontSize: string; lineHeight: string }> = {};
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
    const multipliers = [0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3, 3.75, 4.5, 6, 8];
    
    sizes.forEach((size, index) => {
      const fontSize = baseSize * Math.pow(ratio, multipliers[index] - 1);
      const lineHeight = this.getReadableLineHeight(fontSize);
      
      scale[size] = {
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight.toString(),
      };
    });
    
    return scale;
  }

  // Update scale
  public updateScale(customScale: Partial<TypographyScale>): void {
    this.scale = { ...this.scale, ...customScale };
  }

  // Get scale
  public getScale(): TypographyScale {
    return { ...this.scale };
  }
}

// Layout Manager
export class LayoutManager {
  private config: LayoutConfig;
  private currentBreakpoint: string = 'md';

  constructor(customConfig?: Partial<LayoutConfig>) {
    this.config = {
      container: {
        maxWidth: {
          xs: '100%',
          sm: '100%',
          md: '728px',
          lg: '960px',
          xl: '1144px',
          '2xl': '1320px',
          '3xl': '1584px',
          '4xl': '1920px',
        },
        padding: {
          xs: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '3rem',
          '3xl': '3rem',
          '4xl': '3rem',
        },
      },
      grid: {
        columns: {
          xs: 1,
          sm: 2,
          md: 4,
          lg: 6,
          xl: 8,
          '2xl': 12,
          '3xl': 12,
          '4xl': 12,
        },
        gap: {
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '2rem',
          '3xl': '2rem',
          '4xl': '2rem',
        },
      },
      spacing: {
        scale: {
          0: '0',
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
        },
        responsive: {
          padding: {
            xs: '1rem',
            sm: '1.5rem',
            md: '2rem',
            lg: '2.5rem',
            xl: '3rem',
          },
          margin: {
            xs: '1rem',
            sm: '1.5rem',
            md: '2rem',
            lg: '2.5rem',
            xl: '3rem',
          },
          gap: {
            xs: '0.5rem',
            sm: '0.75rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
          },
        },
      },
      typography: {
        xs: { fontSize: '0.75rem', lineHeight: '1rem' },
        sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
        base: { fontSize: '1rem', lineHeight: '1.5rem' },
        lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
        xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
        '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
        '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
        '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
        '5xl': { fontSize: '3rem', lineHeight: '1' },
        '6xl': { fontSize: '3.75rem', lineHeight: '1' },
        '7xl': { fontSize: '4.5rem', lineHeight: '1' },
        '8xl': { fontSize: '6rem', lineHeight: '1' },
        '9xl': { fontSize: '8rem', lineHeight: '1' },
      },
      ...customConfig,
    };
  }

  // Set current breakpoint
  public setBreakpoint(breakpoint: string): void {
    this.currentBreakpoint = breakpoint;
  }

  // Get responsive value
  public getResponsiveValue<T>(values: ResponsiveValue<T>, defaultValue?: T): T | undefined {
    const breakpointOrder: (keyof ResponsiveValue<T>)[] = [
      'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
    ];
    
    const currentIndex = breakpointOrder.indexOf(this.currentBreakpoint as keyof ResponsiveValue<T>);
    
    // Find the first value that matches current or smaller breakpoint
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (values[bp] !== undefined) {
        return values[bp];
      }
    }
    
    return defaultValue || values.xs;
  }

  // Get container styles
  public getContainerStyles(): {
    maxWidth: string;
    padding: string;
    margin: string;
  } {
    return {
      maxWidth: this.config.container.maxWidth[this.currentBreakpoint] || '100%',
      padding: this.config.container.padding[this.currentBreakpoint] || '1rem',
      margin: '0 auto',
    };
  }

  // Get grid styles
  public getGridStyles(): {
    display: string;
    gridTemplateColumns: string;
    gap: string;
  } {
    const columns = this.config.grid.columns[this.currentBreakpoint] || 1;
    const gap = this.config.grid.gap[this.currentBreakpoint] || '1rem';
    
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    };
  }

  // Get spacing value
  public getSpacingValue(type: 'padding' | 'margin' | 'gap', scale: string): string {
    return this.config.spacing.responsive[type]?.[this.currentBreakpoint] || 
           this.config.spacing.scale[scale] || 
           '1rem';
  }

  // Generate responsive grid classes
  public generateResponsiveGridClasses(
    columns: ResponsiveValue<number>
  ): string[] {
    const classes: string[] = [];
    const breakpointOrder: (keyof ResponsiveValue<number>)[] = [
      'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
    ];
    
    breakpointOrder.forEach(breakpoint => {
      if (columns[breakpoint]) {
        if (breakpoint === 'xs') {
          classes.push(`grid-cols-${columns[breakpoint]}`);
        } else {
          classes.push(`${breakpoint}:grid-cols-${columns[breakpoint]}`);
        }
      }
    });
    
    return classes;
  }

  // Generate responsive spacing classes
  public generateResponsiveSpacingClasses(
    type: 'p' | 'm' | 'gap',
    scale: ResponsiveValue<string>
  ): string[] {
    const classes: string[] = [];
    const breakpointOrder: (keyof ResponsiveValue<string>)[] = [
      'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
    ];
    
    breakpointOrder.forEach(breakpoint => {
      if (scale[breakpoint]) {
        if (breakpoint === 'xs') {
          classes.push(`${type}-${scale[breakpoint]}`);
        } else {
          classes.push(`${breakpoint}:${type}-${scale[breakpoint]}`);
        }
      }
    });
    
    return classes;
  }

  // Calculate optimal container width
  public calculateOptimalContainerWidth(
    contentWidth: number,
    padding: number = 32
  ): number {
    const viewportWidth = window.innerWidth;
    const maxWidth = parseInt(this.config.container.maxWidth[this.currentBreakpoint]) || viewportWidth;
    
    return Math.min(contentWidth + padding * 2, maxWidth, viewportWidth);
  }

  // Generate responsive layout CSS
  public generateResponsiveCSS(
    property: string,
    values: ResponsiveValue<string>
  ): string {
    const css: string[] = [];
    
    // Base value (xs)
    if (values.xs) {
      css.push(`${property}: ${values.xs};`);
    }
    
    // Responsive values
    const breakpointOrder: (keyof ResponsiveValue<string>)[] = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    const mediaQueries: Record<string, string> = {
      sm: '@media (min-width: 480px)',
      md: '@media (min-width: 768px)',
      lg: '@media (min-width: 1024px)',
      xl: '@media (min-width: 1280px)',
      '2xl': '@media (min-width: 1536px)',
      '3xl': '@media (min-width: 1920px)',
      '4xl': '@media (min-width: 2560px)',
    };
    
    breakpointOrder.forEach(breakpoint => {
      if (values[breakpoint]) {
        css.push(`${mediaQueries[breakpoint]} {`);
        css.push(`  ${property}: ${values[breakpoint]};`);
        css.push('}');
      }
    });
    
    return css.join('\n');
  }

  // Update configuration
  public updateConfig(customConfig: Partial<LayoutConfig>): void {
    this.config = { ...this.config, ...customConfig };
  }

  // Get configuration
  public getConfig(): LayoutConfig {
    return JSON.parse(JSON.stringify(this.config));
  }
}

// Responsive Utilities
export const responsiveUtils = {
  // Create image optimization manager
  createImageManager: (config?: Partial<ImageOptimizationOptions>) => {
    return new ImageOptimizationManager(config);
  },

  // Create typography manager
  createTypographyManager: (scale?: Partial<TypographyScale>) => {
    return new TypographyManager(scale);
  },

  // Create layout manager
  createLayoutManager: (config?: Partial<LayoutConfig>) => {
    return new LayoutManager(config);
  },

  // Generate responsive value
  getResponsiveValue: <T>(
    values: ResponsiveValue<T>,
    currentBreakpoint: string,
    defaultValue?: T
  ): T | undefined => {
    const breakpointOrder: (keyof ResponsiveValue<T>)[] = [
      'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
    ];
    
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint as keyof ResponsiveValue<T>);
    
    // Find the first value that matches current or smaller breakpoint
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (values[bp] !== undefined) {
        return values[bp];
      }
    }
    
    return defaultValue || values.xs;
  },

  // Generate responsive CSS
  generateResponsiveCSS: (
    property: string,
    values: ResponsiveValue<string>
  ): string => {
    const css: string[] = [];
    
    // Base value (xs)
    if (values.xs) {
      css.push(`${property}: ${values.xs};`);
    }
    
    // Responsive values
    const breakpointOrder: (keyof ResponsiveValue<string>)[] = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    const mediaQueries: Record<string, string> = {
      sm: '@media (min-width: 480px)',
      md: '@media (min-width: 768px)',
      lg: '@media (min-width: 1024px)',
      xl: '@media (min-width: 1280px)',
      '2xl': '@media (min-width: 1536px)',
      '3xl': '@media (min-width: 1920px)',
      '4xl': '@media (min-width: 2560px)',
    };
    
    breakpointOrder.forEach(breakpoint => {
      if (values[breakpoint]) {
        css.push(`${mediaQueries[breakpoint]} {`);
        css.push(`  ${property}: ${values[breakpoint]};`);
        css.push('}');
      }
    });
    
    return css.join('\n');
  },

  // Calculate aspect ratio
  calculateAspectRatio: (width: number, height: number): string => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  },

  // Generate fluid value
  generateFluidValue: (
    minSize: number,
    maxSize: number,
    minViewport: number = 320,
    maxViewport: number = 1920
  ): string => {
    return `clamp(${minSize}px, ${minSize}px + ${maxSize - minSize} * (100vw - ${minViewport}px) / ${maxViewport - minViewport}, ${maxSize}px)`;
  },

  // Check if value is responsive
  isResponsive: <T>(value: any): value is ResponsiveValue<T> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  },

  // Flatten responsive values
  flattenResponsiveValues: <T>(
    values: ResponsiveValue<T>,
    currentBreakpoint: string
  ): T => {
    return responsiveUtils.getResponsiveValue(values, currentBreakpoint) as T;
  },

  // Generate responsive classes
  generateResponsiveClasses: (
    prefix: string,
    values: ResponsiveValue<string>
  ): string[] => {
    const classes: string[] = [];
    const breakpointOrder: (keyof ResponsiveValue<string>)[] = [
      'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'
    ];
    
    breakpointOrder.forEach(breakpoint => {
      if (values[breakpoint]) {
        if (breakpoint === 'xs') {
          classes.push(`${prefix}-${values[breakpoint]}`);
        } else {
          classes.push(`${breakpoint}:${prefix}-${values[breakpoint]}`);
        }
      }
    });
    
    return classes;
  },

  // Validate responsive configuration
  validateResponsiveConfig: (config: any): string[] => {
    const errors: string[] = [];
    
    if (!config || typeof config !== 'object') {
      errors.push('Configuration must be an object');
      return errors;
    }
    
    const validBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
    
    Object.keys(config).forEach(key => {
      if (!validBreakpoints.includes(key)) {
        errors.push(`Invalid breakpoint: ${key}`);
      }
    });
    
    return errors;
  },

  // Get breakpoint from width
  getBreakpointFromWidth: (width: number): string => {
    if (width < 480) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1536) return 'xl';
    if (width < 1920) return '2xl';
    if (width < 2560) return '3xl';
    return '4xl';
  },

  // Get default configuration
  getDefaultConfig: (): LayoutConfig => {
    const manager = new LayoutManager();
    return manager.getConfig();
  },
};

// Default instances
export const defaultImageManager = new ImageOptimizationManager();
export const defaultTypographyManager = new TypographyManager();
export const defaultLayoutManager = new LayoutManager();

export default {
  ImageOptimizationManager,
  TypographyManager,
  LayoutManager,
  responsiveUtils,
  defaultImageManager,
  defaultTypographyManager,
  defaultLayoutManager,
};
