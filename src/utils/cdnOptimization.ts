'use client';

// CDN and Resource Optimization Utilities for Lumo Platform
import { useEffect, useState, useCallback } from 'react';

// CDN configuration interface
export interface CDNConfig {
  baseUrl: string;
  provider: 'cloudflare' | 'aws' | 'google' | 'azure' | 'fastly' | 'custom';
  zones: {
    images: string;
    fonts: string;
    assets: string;
    api: string;
  };
  optimization: {
    imageCompression: boolean;
    imageFormats: string[];
    fontFormats: string[];
    minification: boolean;
    caching: {
      images: number; // seconds
      fonts: number; // seconds
      assets: number; // seconds
    };
  };
  features: {
    webp: boolean;
    avif: boolean;
    responsiveImages: boolean;
    lazyLoading: boolean;
    progressiveJpeg: boolean;
    fontDisplay: 'swap' | 'block' | 'fallback' | 'optional' | 'auto';
  };
}

// Image optimization interface
export interface ImageOptimization {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png' | 'gif' | 'svg';
  compression?: number;
  progressive?: boolean;
  placeholder?: 'blur' | 'empty' | 'color';
  blurRadius?: number;
  crop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

// Font optimization interface
export interface FontOptimization {
  family: string;
  weights: number[];
  styles: string[];
  display: 'swap' | 'block' | 'fallback' | 'optional' | 'auto';
  preload: boolean;
  subset?: string[];
  unicodeRange?: string;
  variable?: boolean;
}

// CDN Manager Class
export class CDNManager {
  private static instance: CDNManager;
  private config: CDNConfig;
  private loadedResources: Set<string> = new Set();
  private loadingResources: Set<string> = new Set();
  private resourceCache: Map<string, any> = new Map();

  private constructor() {
    this.config = this.getDefaultConfig();
    this.initializeCDN();
  }

  public static getInstance(): CDNManager {
    if (!CDNManager.instance) {
      CDNManager.instance = new CDNManager();
    }
    return CDNManager.instance;
  }

  // Get default CDN configuration
  private getDefaultConfig(): CDNConfig {
    return {
      baseUrl: process.env.NEXT_PUBLIC_CDN_URL || 'https://cdn.lumo-platform.com',
      provider: 'cloudflare',
      zones: {
        images: '/images',
        fonts: '/fonts',
        assets: '/assets',
        api: '/api',
      },
      optimization: {
        imageCompression: true,
        imageFormats: ['webp', 'avif', 'jpg', 'png', 'gif', 'svg'],
        fontFormats: ['woff2', 'woff', 'ttf', 'eot'],
        minification: true,
        caching: {
          images: 31536000, // 1 year
          fonts: 31536000, // 1 year
          assets: 2592000, // 30 days
        },
      },
      features: {
        webp: true,
        avif: true,
        responsiveImages: true,
        lazyLoading: true,
        progressiveJpeg: true,
        fontDisplay: 'swap',
      },
    };
  }

  // Initialize CDN
  private initializeCDN(): void {
    if (typeof window === 'undefined') return;

    // Set up resource hints
    this.setupResourceHints();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Monitor network conditions
    this.monitorNetworkConditions();
  }

  // Setup resource hints
  private setupResourceHints(): void {
    const head = document.head;

    // DNS prefetch for CDN domains
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = this.config.baseUrl;
    head.appendChild(dnsPrefetch);

    // Preconnect to CDN
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = this.config.baseUrl;
    preconnect.crossOrigin = 'anonymous';
    head.appendChild(preconnect);
  }

  // Preload critical resources
  private preloadCriticalResources(): void {
    // Preload critical fonts
    const criticalFonts = [
      'Inter-400.woff2',
      'Inter-500.woff2',
      'Inter-600.woff2',
      'Inter-700.woff2',
    ];

    criticalFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `${this.config.baseUrl}${this.config.zones.fonts}/${font}`;
      document.head.appendChild(link);
    });
  }

  // Monitor network conditions
  private monitorNetworkConditions(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const handleNetworkChange = () => {
        // Adjust optimization based on network conditions
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          this.config.optimization.imageCompression = true;
          this.config.features.webp = false;
          this.config.features.avif = false;
        } else if (connection.effectiveType === '4g') {
          this.config.features.webp = true;
          this.config.features.avif = true;
        }
      };

      connection.addEventListener('change', handleNetworkChange);
    }
  }

  // Optimize image URL
  public optimizeImage(options: ImageOptimization): string {
    const {
      src,
      width,
      height,
      quality = 80,
      format = 'webp',
      compression = 0.8,
      progressive = true,
      placeholder = 'blur',
      blurRadius = 10,
      crop,
      fit = 'cover',
    } = options;

    // Check if image is already optimized
    const cacheKey = this.generateImageCacheKey(options);
    if (this.resourceCache.has(cacheKey)) {
      return this.resourceCache.get(cacheKey);
    }

    let optimizedUrl = src;

    // If src is relative, make it absolute
    if (!src.startsWith('http')) {
      optimizedUrl = `${this.config.baseUrl}${this.config.zones.images}${src}`;
    }

    // Add optimization parameters
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    if (quality !== 80) params.append('q', quality.toString());
    if (compression !== 0.8) params.append('c', compression.toString());
    if (progressive) params.append('p', '1');
    if (placeholder !== 'blur') params.append('pl', placeholder);
    if (blurRadius !== 10) params.append('br', blurRadius.toString());
    if (crop) {
      params.append('cx', crop.x.toString());
      params.append('cy', crop.y.toString());
      params.append('cw', crop.width.toString());
      params.append('ch', crop.height.toString());
    }
    if (fit !== 'cover') params.append('fit', fit);

    // Add format
    const supportedFormat = this.getSupportedFormat(format);
    params.append('f', supportedFormat);

    // Add cache busting
    params.append('t', Date.now().toString());

    const queryString = params.toString();
    optimizedUrl = `${optimizedUrl}?${queryString}`;

    // Cache the result
    this.resourceCache.set(cacheKey, optimizedUrl);

    return optimizedUrl;
  }

  // Generate image cache key
  private generateImageCacheKey(options: ImageOptimization): string {
    return JSON.stringify(options);
  }

  // Get supported format
  private getSupportedFormat(preferredFormat: string): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return 'jpg';

    // Check format support
    const formatSupport = {
      avif: ctx.createImageData(1, 1).data.buffer && 'AVIF' in window,
      webp: 'webp' in window && canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
    };

    if (preferredFormat === 'avif' && formatSupport.avif) return 'avif';
    if (preferredFormat === 'webp' && formatSupport.webp) return 'webp';
    if (preferredFormat === 'png') return 'png';
    if (preferredFormat === 'gif') return 'gif';
    if (preferredFormat === 'svg') return 'svg';
    
    return 'jpg';
  }

  // Generate responsive image srcset
  public generateSrcSet(src: string, sizes: number[], format?: string): string {
    return sizes
      .map(size => {
        const optimizedUrl = this.optimizeImage({
          src,
          width: size,
          format: format as any,
        });
        return `${optimizedUrl} ${size}w`;
      })
      .join(', ');
  }

  // Generate sizes attribute
  public generateSizes(sizes: number[]): string {
    return sizes
      .map(size => `(max-width: ${size}px) ${size}px`)
      .join(', ');
  }

  // Optimize font URL
  public optimizeFont(options: FontOptimization): string {
    const {
      family,
      weights = [400],
      styles = ['normal'],
      display = 'swap',
      preload = true,
      subset,
      unicodeRange,
      variable = false,
    } = options;

    const fontName = family.replace(/\s+/g, '-').toLowerCase();
    const baseUrl = `${this.config.baseUrl}${this.config.zones.fonts}`;

    // Generate font URLs for each weight and style combination
    const fontUrls: string[] = [];

    weights.forEach(weight => {
      styles.forEach(style => {
        const fileName = variable 
          ? `${fontName}-variable-${weight}-${style}.woff2`
          : `${fontName}-${weight}-${style}.woff2`;
        
        const url = `${baseUrl}/${fileName}`;
        
        if (preload) {
          fontUrls.push(url);
        }
      });
    });

    return fontUrls[0] || '';
  }

  // Load font
  public loadFont(options: FontOptimization): Promise<void> {
    const fontUrl = this.optimizeFont(options);
    
    if (!fontUrl || this.loadedResources.has(fontUrl)) {
      return Promise.resolve();
    }

    this.loadingResources.add(fontUrl);

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = fontUrl;
      
      link.onload = () => {
        this.loadedResources.add(fontUrl);
        this.loadingResources.delete(fontUrl);
        
        // Create font face
        this.createFontFace(options).then(resolve).catch(reject);
      };
      
      link.onerror = () => {
        this.loadingResources.delete(fontUrl);
        reject(new Error(`Failed to load font: ${fontUrl}`));
      };
      
      document.head.appendChild(link);
    });
  }

  // Create font face
  private createFontFace(options: FontOptimization): Promise<void> {
    const {
      family,
      weights = [400],
      styles = ['normal'],
      display = 'swap',
      subset,
      unicodeRange,
      variable = false,
    } = options;

    const fontFace = new FontFace(
      family,
      `url(${this.optimizeFont(options)}) format('woff2')`,
      {
        weight: weights.join(' '),
        style: styles[0],
        display,
        unicodeRange,
      }
    );

    return fontFace.load().then(() => {
      (document.fonts as any).add(fontFace);
    });
  }

  // Get resource loading status
  public getResourceStatus(): {
    total: number;
    loaded: number;
    loading: number;
    failed: number;
  } {
    const total = this.loadedResources.size + this.loadingResources.size;
    const loaded = this.loadedResources.size;
    const loading = this.loadingResources.size;
    const failed = 0; // We could track failed resources if needed

    return { total, loaded, loading, failed };
  }

  // Clear cache
  public clearCache(): void {
    this.resourceCache.clear();
  }

  // Update configuration
  public updateConfig(updates: Partial<CDNConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Get configuration
  public getConfig(): CDNConfig {
    return { ...this.config };
  }

  // Check if resource is loaded
  public isResourceLoaded(url: string): boolean {
    return this.loadedResources.has(url);
  }

  // Check if resource is loading
  public isResourceLoading(url: string): boolean {
    return this.loadingResources.has(url);
  }

  // Preload resource
  public preloadResource(url: string, type: 'image' | 'font' | 'script' | 'style'): Promise<void> {
    if (this.isResourceLoaded(url) || this.isResourceLoading(url)) {
      return Promise.resolve();
    }

    this.loadingResources.add(url);

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      
      switch (type) {
        case 'image':
          link.as = 'image';
          break;
        case 'font':
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
          break;
        case 'script':
          link.as = 'script';
          break;
        case 'style':
          link.as = 'style';
          break;
      }

      link.onload = () => {
        this.loadedResources.add(url);
        this.loadingResources.delete(url);
        resolve();
      };

      link.onerror = () => {
        this.loadingResources.delete(url);
        reject(new Error(`Failed to preload resource: ${url}`));
      };

      document.head.appendChild(link);
    });
  }

  // Batch preload resources
  public preloadResources(resources: Array<{ url: string; type: 'image' | 'font' | 'script' | 'style' }>): Promise<void[]> {
    return Promise.all(resources.map(resource => this.preloadResource(resource.url, resource.type)));
  }
}

// React hooks
export const useCDNOptimization = () => {
  const manager = CDNManager.getInstance();
  const [status, setStatus] = useState(manager.getResourceStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(manager.getResourceStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, [manager]);

  return {
    status,
    optimizeImage: (options: ImageOptimization) => manager.optimizeImage(options),
    generateSrcSet: (src: string, sizes: number[], format?: string) => manager.generateSrcSet(src, sizes, format),
    generateSizes: (sizes: number[]) => manager.generateSizes(sizes),
    optimizeFont: (options: FontOptimization) => manager.optimizeFont(options),
    loadFont: (options: FontOptimization) => manager.loadFont(options),
    preloadResource: (url: string, type: 'image' | 'font' | 'script' | 'style') => manager.preloadResource(url, type),
    preloadResources: (resources: Array<{ url: string; type: 'image' | 'font' | 'script' | 'style' }>) => manager.preloadResources(resources),
    isResourceLoaded: (url: string) => manager.isResourceLoaded(url),
    isResourceLoading: (url: string) => manager.isResourceLoading(url),
    clearCache: () => manager.clearCache(),
    updateConfig: (updates: Partial<CDNConfig>) => manager.updateConfig(updates),
    getConfig: () => manager.getConfig(),
  };
};

// Utility functions
export const cdnUtils = {
  // Create CDN manager instance
  createManager: () => CDNManager.getInstance(),

  // Generate responsive image markup
  generateResponsiveImage: (src: string, alt: string, sizes: number[], className?: string, loading?: 'lazy' | 'eager') => {
    const manager = CDNManager.getInstance();
    const srcset = manager.generateSrcSet(src, sizes);
    const sizesAttr = manager.generateSizes(sizes);
    const optimizedSrc = manager.optimizeImage({ src, width: sizes[0] });

    return {
      src: optimizedSrc,
      srcset,
      sizes: sizesAttr,
      alt,
      className,
      loading: loading || 'lazy',
    };
  },

  // Generate font loading markup
  generateFontLink: (options: FontOptimization) => {
    const manager = CDNManager.getInstance();
    const fontUrl = manager.optimizeFont(options);

    return {
      rel: 'preload',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
      href: fontUrl,
    };
  },

  // Check browser support
  checkBrowserSupport: () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    return {
      webp: 'webp' in window && canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
      avif: 'AVIF' in window,
      progressiveJpeg: true, // Most modern browsers support this
      fontDisplay: 'font-display' in CSS.supports,
      preload: 'preload' in document.createElement('link'),
      intersectionObserver: 'IntersectionObserver' in window,
      resizeObserver: 'ResizeObserver' in window,
    };
  },

  // Get optimal image format
  getOptimalImageFormat: (preferredFormat?: string): string => {
    const support = cdnUtils.checkBrowserSupport();
    
    if (preferredFormat === 'avif' && support.avif) return 'avif';
    if (preferredFormat === 'webp' && support.webp) return 'webp';
    if (preferredFormat === 'png') return 'png';
    if (preferredFormat === 'gif') return 'gif';
    if (preferredFormat === 'svg') return 'svg';
    
    // Default to webp if supported, otherwise jpg
    return support.webp ? 'webp' : 'jpg';
  },

  // Calculate optimal image quality
  getOptimalQuality: (networkSpeed: 'slow' | 'medium' | 'fast' = 'medium'): number => {
      switch (networkSpeed) {
        case 'slow': return 60;
        case 'medium': return 75;
        case 'fast': return 85;
        default: return 80;
      }
    },

  // Get network speed
  getNetworkSpeed: (): 'slow' | 'medium' | 'fast' => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection.effectiveType;
      
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          return 'slow';
        case '3g':
          return 'medium';
        case '4g':
          return 'fast';
        default:
          return 'medium';
      }
    }
    
    return 'medium';
  },

  // Generate placeholder image
  generatePlaceholder: (width: number, height: number, color: string = '#f3f4f6'): string => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
      
      // Add subtle pattern
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  },

  // Generate blur placeholder
  generateBlurPlaceholder: (imageUrl: string, width: number, height: number, blurRadius: number = 10): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.filter = `blur(${blurRadius}px)`;
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.1));
        } else {
          resolve('');
        }
      };
      
      img.src = imageUrl;
    });
  },
};

// Default instance
export const defaultCDNManager = CDNManager.getInstance();

export default {
  CDNManager,
  useCDNOptimization,
  cdnUtils,
  defaultCDNManager,
};
