// Image Optimization Utilities
// Optimized image loading, caching, and performance monitoring

import { useState, useCallback, useEffect } from 'react';

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  width?: number;
  height?: number;
  crop?: boolean;
  fit?: 'cover' | 'contain' | 'fill';
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  optimization?: ImageOptimizationOptions;
  onLoad?: () => void;
  onError?: () => void;
}

// Image cache for performance
const imageCache = new Map<string, {
  url: string;
  loaded: boolean;
  error: boolean;
  timestamp: number;
}>();

const MAX_CACHE_SIZE = 100;
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

// Generate optimized image URL
export function generateOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const params = new URLSearchParams();
  
  if (options.quality) {
    params.set('q', options.quality.toString());
  }
  
  if (options.format) {
    params.set('f', options.format);
  }
  
  if (options.width) {
    params.set('w', options.width.toString());
  }
  
  if (options.height) {
    params.set('h', options.height.toString());
  }
  
  if (options.crop) {
    params.set('crop', 'true');
  }
  
  if (options.fit) {
    params.set('fit', options.fit);
  }
  
  const paramString = params.toString();
  return paramString ? `${src}?${paramString}` : src;
}

// Generate srcSet for responsive images
export function generateSrcSet(
  src: string,
  widths: number[],
  options: Omit<ImageOptimizationOptions, 'width'> = {}
): string {
  return widths
    .map(width => {
      const optimizedUrl = generateOptimizedImageUrl(src, { ...options, width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

// Generate sizes attribute for responsive images
export function generateSizes(breakpoints: string[]): string {
  return breakpoints.join(', ');
}

// Check if image is cached
export function isImageCached(url: string): boolean {
  const cached = imageCache.get(url);
  if (!cached) return false;
  
  // Check if cache is expired
  const now = Date.now();
  return (now - cached.timestamp) < CACHE_EXPIRY_TIME;
}

// Get cached image
export function getCachedImage(url: string): string | null {
  const cached = imageCache.get(url);
  if (!cached || !isImageCached(url)) {
    return null;
  }
  return cached.url;
}

// Cache image
export function cacheImage(url: string, optimizedUrl: string, loaded: boolean = false): void {
  // Clean old cache if needed
  if (imageCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = imageCache.keys().next().value;
    if (oldestKey) {
      imageCache.delete(oldestKey);
    }
  }
  
  imageCache.set(url, {
    url: optimizedUrl,
    loaded,
    error: !loaded,
    timestamp: Date.now()
  });
}

// Clear expired cache
export function clearExpiredCache(): void {
  const now = Date.now();
  for (const [key, value] of imageCache.entries()) {
    if ((now - value.timestamp) >= CACHE_EXPIRY_TIME) {
      imageCache.delete(key);
    }
  }
}

// Generate blur placeholder
export function generateBlurDataURL(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

// Preload image
export function preloadImage(url: string, options: ImageOptimizationOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check cache first
    const cached = getCachedImage(url);
    if (cached) {
      resolve(cached);
      return;
    }
    
    const optimizedUrl = generateOptimizedImageUrl(url, options);
    const img = new Image();
    
    img.onload = () => {
      cacheImage(url, optimizedUrl, true);
      resolve(optimizedUrl);
    };
    
    img.onerror = () => {
      cacheImage(url, optimizedUrl, false);
      reject(new Error(`Failed to load image: ${url}`));
    };
    
    img.src = optimizedUrl;
  });
}

// Batch preload images
export function preloadImages(
  urls: string[],
  options: ImageOptimizationOptions = {}
): Promise<string[]> {
  return Promise.allSettled(
    urls.map(url => preloadImage(url, options))
  ).then(results => 
    results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<string>).value)
  );
}

// Optimized image component hook
export function useOptimizedImage(
  src: string,
  options: ImageOptimizationOptions = {}
): {
  url: string | null;
  isLoading: boolean;
  error: boolean;
  load: () => void;
} {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(false);
    
    preloadImage(src, options)
      .then(loadedUrl => {
        setUrl(loadedUrl);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [src, options]);

  useEffect(() => {
    if (src) {
      load();
    }
  }, [src, load]);

  return { url, isLoading, error, load };
}

// Image optimization stats
export function getImageOptimizationStats(): {
  cacheSize: number;
  cachedImages: number;
  errorRate: number;
} {
  const totalImages = imageCache.size;
  const errorImages = Array.from(imageCache.values()).filter(img => img.error).length;
  
  return {
    cacheSize: totalImages,
    cachedImages: totalImages - errorImages,
    errorRate: totalImages > 0 ? (errorImages / totalImages) * 100 : 0
  };
}

// Responsive image helper
export function createResponsiveImageProps(
  src: string,
  alt: string,
  breakpoints: {
    sm?: { width: number; height: number };
    md?: { width: number; height: number };
    lg?: { width: number; height: number };
    xl?: { width: number; height: number };
  },
  options: ImageOptimizationOptions = {}
): {
  src: string;
  alt: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  loading: 'lazy' | 'eager';
} {
  const widths = Object.values(breakpoints).map(bp => bp.width);
  const sizes = Object.entries(breakpoints)
    .map(([bp, { width }]) => {
      if (bp === 'sm') return `(max-width: 640px) ${width}px`;
      if (bp === 'md') return `(max-width: 768px) ${width}px`;
      if (bp === 'lg') return `(max-width: 1024px) ${width}px`;
      if (bp === 'xl') return `${width}px`;
      return '';
    })
    .filter(Boolean)
    .join(', ');

  const largestBreakpoint = Object.values(breakpoints).reduce((largest, bp) => 
    bp.width > largest.width ? bp : largest
  );

  return {
    src: generateOptimizedImageUrl(src, { ...options, ...largestBreakpoint }),
    alt,
    srcSet: generateSrcSet(src, widths, options),
    sizes,
    width: largestBreakpoint.width,
    height: largestBreakpoint.height,
    loading: options.loading || 'lazy'
  };
}

// WebP format detection
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      resolve(false);
      return;
    }
    
    const webpDataUrl = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    const img = new Image();
    
    img.onload = () => {
      resolve(img.width > 0 && img.height > 0);
    };
    
    img.onerror = () => {
      resolve(false);
    };
    
    img.src = webpDataUrl;
  });
}

// AVIF format detection
export function supportsAVIF(): Promise<boolean> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      resolve(false);
      return;
    }
    
    const avifDataUrl = 'data:image/avif;base64,AAAAIGZ0eXBxdgEAAABAGuZGJlbm8yAAAABHRyWFwgAAAABFbdWR0YQAAAABDbG9ja2xlAAAABG9tbWFyAAAABHR0cmhlcAAAAABtZGFyYQAAAABQdGJ1bWYAAAABHZ2VubWYAAAABG1sdW1mAQAAAAABRyWVuZgAAABR2bWVuZgAAABRsdW1veAAAABR0cnVlZWYAAAABRzbWluZgAAABRiaXN0b3JzAAAABR0aW1vbWYAAAABRpbWctZW4AAAABRyZWFyb24AAAABR0c2xlYWYAAAABRpdGVyYWYAAAABRiaXRlcG9zAAAABR0YXRhYmFzZQAAAABR0cmFuc2Zvcm0AAAABRlc2NhcGxpZGUAAAABG1yZXN0ZW1wb3J0AAAAAaWxzdWJzdWJzZXJzZXNzZXJzZXNzZXNz';
    const img = new Image();
    
    img.onload = () => {
      resolve(img.width > 0 && img.height > 0);
    };
    
    img.onerror = () => {
      resolve(false);
    };
    
    img.src = avifDataUrl;
  });
}

// Get best image format for browser
export async function getBestImageFormat(): Promise<'webp' | 'avif' | 'jpg'> {
  if (await supportsAVIF()) {
    return 'avif';
  }
  if (await supportsWebP()) {
    return 'webp';
  }
  return 'jpg';
}

// Export all utilities
export const ImageOptimizationUtils = {
  generateOptimizedImageUrl,
  generateSrcSet,
  generateSizes,
  isImageCached,
  getCachedImage,
  cacheImage,
  clearExpiredCache,
  generateBlurDataURL,
  preloadImage,
  preloadImages,
  useOptimizedImage,
  getImageOptimizationStats,
  createResponsiveImageProps,
  supportsWebP,
  supportsAVIF,
  getBestImageFormat
};

export default ImageOptimizationUtils;
