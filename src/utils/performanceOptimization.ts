'use client';

// Performance Optimization Utilities for Lumo Platform
import { useEffect, useRef, useCallback, useMemo } from 'react';

// Performance monitoring interface
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  domContentLoaded: number;
  loadComplete: number;
}

// Resource optimization interface
export interface ResourceOptimization {
  lazyLoad: boolean;
  preload: boolean;
  prefetch: boolean;
  compression: boolean;
  caching: boolean;
  minification: boolean;
}

// Performance Manager Class
export class PerformanceManager {
  private static instance: PerformanceManager;
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: Set<PerformanceObserver> = new Set();
  private resourceOptimization: ResourceOptimization;

  private constructor() {
    this.resourceOptimization = {
      lazyLoad: true,
      preload: true,
      prefetch: true,
      compression: true,
      caching: true,
      minification: true,
    };
    
    this.initializePerformanceMonitoring();
  }

  public static getInstance(): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager();
    }
    return PerformanceManager.instance;
  }

  // Initialize performance monitoring
  private initializePerformanceMonitoring(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.observeWebVitals();
      this.observeResourceTiming();
      this.observeNavigationTiming();
    }
  }

  // Observe Web Vitals
  private observeWebVitals(): void {
    try {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.add(fcpObserver);

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.add(lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-input') {
            this.metrics.fid = (entry as any).processingStart - entry.startTime;
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.add(fidObserver);

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        this.metrics.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.add(clsObserver);
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error);
    }
  }

  // Observe Resource Timing
  private observeResourceTiming(): void {
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Analyze resource loading performance
          if (entry.entryType === 'resource') {
            const resource = entry as PerformanceResourceTiming;
            const loadTime = resource.responseEnd - resource.requestStart;
            
            // Log slow resources
            if (loadTime > 1000) {
              console.warn(`Slow resource detected: ${resource.name} (${loadTime}ms)`);
            }
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.add(resourceObserver);
    } catch (error) {
      console.warn('Resource timing observation not supported:', error);
    }
  }

  // Observe Navigation Timing
  private observeNavigationTiming(): void {
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const nav = entry as PerformanceNavigationTiming;
            this.metrics.ttfb = nav.responseStart - nav.requestStart;
            this.metrics.domContentLoaded = nav.domContentLoadedEventEnd - nav.navigationStart;
            this.metrics.loadComplete = nav.loadEventEnd - nav.navigationStart;
          }
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.add(navigationObserver);
    } catch (error) {
      console.warn('Navigation timing observation not supported:', error);
    }
  }

  // Get current metrics
  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  // Get performance score
  public getPerformanceScore(): number {
    const weights = {
      fcp: 0.2,
      lcp: 0.25,
      fid: 0.25,
      cls: 0.15,
      ttfb: 0.15,
    };

    const scores = {
      fcp: this.getFCPScore(this.metrics.fcp || 0),
      lcp: this.getLCPScore(this.metrics.lcp || 0),
      fid: this.getFIDScore(this.metrics.fid || 0),
      cls: this.getCLSScore(this.metrics.cls || 0),
      ttfb: this.getTTFBScore(this.metrics.ttfb || 0),
    };

    return Object.entries(weights).reduce((score, [metric, weight]) => {
      return score + (scores[metric as keyof typeof scores] * weight);
    }, 0);
  }

  // Score calculation methods
  private getFCPScore(fcp: number): number {
    if (fcp < 1800) return 100;
    if (fcp < 3000) return 80;
    return 60;
  }

  private getLCPScore(lcp: number): number {
    if (lcp < 2500) return 100;
    if (lcp < 4000) return 80;
    return 60;
  }

  private getFIDScore(fid: number): number {
    if (fid < 100) return 100;
    if (fid < 300) return 80;
    return 60;
  }

  private getCLSScore(cls: number): number {
    if (cls < 0.1) return 100;
    if (cls < 0.25) return 80;
    return 60;
  }

  private getTTFBScore(ttfb: number): number {
    if (ttfb < 800) return 100;
    if (ttfb < 1800) return 80;
    return 60;
  }

  // Optimize images
  public optimizeImages(): void {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll('img[data-optimize]');
    images.forEach((img) => {
      const image = img as HTMLImageElement;
      
      // Lazy loading
      if (this.resourceOptimization.lazyLoad) {
        image.loading = 'lazy';
      }

      // Add error handling
      image.onerror = () => {
        image.src = '/images/placeholder.jpg';
        image.alt = 'Image failed to load';
      };

      // Add loading placeholder
      if (!image.complete) {
        image.style.backgroundColor = '#f3f4f6';
      }
    });
  }

  // Optimize scripts
  public optimizeScripts(): void {
    if (typeof window === 'undefined') return;

    const scripts = document.querySelectorAll('script[data-optimize]');
    scripts.forEach((script) => {
      const scriptElement = script as HTMLScriptElement;
      
      // Add defer or async attributes
      if (!scriptElement.defer && !scriptElement.async) {
        scriptElement.defer = true;
      }
    });
  }

  // Optimize stylesheets
  public optimizeStylesheets(): void {
    if (typeof window === 'undefined') return;

    const links = document.querySelectorAll('link[rel="stylesheet"][data-optimize]');
    links.forEach((link) => {
      const linkElement = link as HTMLLinkElement;
      
      // Add preload for critical CSS
      if (this.resourceOptimization.preload) {
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.as = 'style';
        preload.href = linkElement.href;
        preload.onload = () => {
          linkElement.onload = null;
          linkElement.rel = 'stylesheet';
        };
        document.head.appendChild(preload);
      }
    });
  }

  // Preload critical resources
  public preloadCriticalResources(resources: string[]): void {
    if (typeof window === 'undefined') return;

    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      if (resource.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
        link.as = 'image';
      } else if (resource.match(/\.(css)$/i)) {
        link.as = 'style';
      } else if (resource.match(/\.(js)$/i)) {
        link.as = 'script';
      } else if (resource.match(/\.(woff|woff2|ttf|eot)$/i)) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      }
      
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Prefetch resources
  public prefetchResources(resources: string[]): void {
    if (typeof window === 'undefined') return;

    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Enable resource hints
  public enableResourceHints(): void {
    if (typeof window === 'undefined') return;

    // DNS prefetch for external domains
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdn.jsdelivr.net',
    ];

    domains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect for critical domains
    const criticalDomains = [
      'https://api.lumo-platform.com',
      'https://cdn.lumo-platform.com',
    ];

    criticalDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Optimize font loading
  public optimizeFontLoading(): void {
    if (typeof window === 'undefined') return;

    // Font display optimization
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/inter-regular.woff2') format('woff2');
      }
    `;
    document.head.appendChild(style);
  }

  // Enable compression hints
  public enableCompressionHints(): void {
    if (typeof window === 'undefined') return;

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Accept-Encoding';
    meta.content = 'gzip, deflate, br';
    document.head.appendChild(meta);
  }

  // Cleanup observers
  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  // Update resource optimization settings
  public updateResourceOptimization(settings: Partial<ResourceOptimization>): void {
    this.resourceOptimization = { ...this.resourceOptimization, ...settings };
  }

  // Get resource optimization settings
  public getResourceOptimization(): ResourceOptimization {
    return { ...this.resourceOptimization };
  }
}

// Performance Hooks
export const usePerformanceManager = () => {
  return useMemo(() => PerformanceManager.getInstance(), []);
};

export const usePerformanceMetrics = () => {
  const manager = usePerformanceManager();
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(manager.getMetrics());
    }, 1000);

    return () => clearInterval(interval);
  }, [manager]);

  return metrics;
};

export const usePerformanceScore = () => {
  const manager = usePerformanceManager();
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(manager.getPerformanceScore());
    }, 1000);

    return () => clearInterval(interval);
  }, [manager]);

  return score;
};

export const useResourceOptimization = () => {
  const manager = usePerformanceManager();

  useEffect(() => {
    manager.optimizeImages();
    manager.optimizeScripts();
    manager.optimizeStylesheets();
    manager.enableResourceHints();
    manager.optimizeFontLoading();
    manager.enableCompressionHints();
  }, [manager]);

  return manager.getResourceOptimization();
};

// Performance Utilities
export const performanceUtils = {
  // Create performance manager instance
  createManager: () => PerformanceManager.getInstance(),

  // Measure function execution time
  measureFunction: <T extends (...args: any[]) => any>(fn: T): T => {
    return ((...args: any[]) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      console.log(`Function ${fn.name} took ${end - start} milliseconds`);
      return result;
    }) as T;
  },

  // Measure component render time
  useRenderTime: (componentName: string) => {
    const startTime = useRef<number>();

    useEffect(() => {
      startTime.current = performance.now();
    }, []);

    useEffect(() => {
      if (startTime.current) {
        const endTime = performance.now();
        console.log(`Component ${componentName} rendered in ${endTime - startTime.current} milliseconds`);
      }
    });
  },

  // Debounce function for performance
  debounce: <T extends (...args: any[]) => any>(fn: T, delay: number): T => {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    }) as T;
  },

  // Throttle function for performance
  throttle: <T extends (...args: any[]) => any>(fn: T, limit: number): T => {
    let inThrottle: boolean;
    return ((...args: any[]) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  },

  // Memoize expensive calculations
  memoize: <T extends (...args: any[]) => any>(fn: T): T => {
    const cache = new Map();
    return ((...args: any[]) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  },

  // Check if performance API is available
  isPerformanceAPISupported: (): boolean => {
    return typeof window !== 'undefined' && 'performance' in window;
  },

  // Get memory usage (if available)
  getMemoryUsage: () => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  },

  // Check if device is low-end
  isLowEndDevice: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any).connection?.effectiveType || '4g';

    return memory < 4 || cores < 4 || connection === '2g' || connection === 'slow-2g';
  },

  // Get device performance category
  getDevicePerformanceCategory: (): 'low' | 'medium' | 'high' => {
    if (performanceUtils.isLowEndDevice()) return 'low';
    
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any).connection?.effectiveType || '4g';

    if (memory >= 8 && cores >= 8 && connection === '4g') return 'high';
    return 'medium';
  },

  // Optimize based on device performance
  optimizeForDevice: (): {
    enableAnimations: boolean;
    animationDuration: number;
    enableEffects: boolean;
    enableLazyLoading: boolean;
    batchSize: number;
  } => {
    const category = performanceUtils.getDevicePerformanceCategory();
    
    switch (category) {
      case 'low':
        return {
          enableAnimations: false,
          animationDuration: 0.1,
          enableEffects: false,
          enableLazyLoading: true,
          batchSize: 5,
        };
      case 'medium':
        return {
          enableAnimations: true,
          animationDuration: 0.25,
          enableEffects: true,
          enableLazyLoading: true,
          batchSize: 10,
        };
      case 'high':
        return {
          enableAnimations: true,
          animationDuration: 0.4,
          enableEffects: true,
          enableLazyLoading: false,
          batchSize: 20,
        };
    }
  },

  // Generate performance report
  generateReport: (): string => {
    const manager = PerformanceManager.getInstance();
    const metrics = manager.getMetrics();
    const score = manager.getPerformanceScore();
    const memory = performanceUtils.getMemoryUsage();
    const deviceCategory = performanceUtils.getDevicePerformanceCategory();

    return `
Performance Report
================
Score: ${score}/100
Device Category: ${deviceCategory}

Metrics:
- First Contentful Paint: ${metrics.fcp?.toFixed(2)}ms
- Largest Contentful Paint: ${metrics.lcp?.toFixed(2)}ms
- First Input Delay: ${metrics.fid?.toFixed(2)}ms
- Cumulative Layout Shift: ${metrics.cls?.toFixed(3)}
- Time to First Byte: ${metrics.ttfb?.toFixed(2)}ms
- DOM Content Loaded: ${metrics.domContentLoaded?.toFixed(2)}ms
- Load Complete: ${metrics.loadComplete?.toFixed(2)}ms

Memory Usage:
${memory ? `
- Used: ${(memory.used / 1024 / 1024).toFixed(2)}MB
- Total: ${(memory.total / 1024 / 1024).toFixed(2)}MB
- Limit: ${(memory.limit / 1024 / 1024).toFixed(2)}MB
` : 'Memory API not available'}

Recommendations:
${score < 70 ? '- Consider optimizing images and resources' : ''}
${score < 80 ? '- Enable lazy loading for non-critical resources' : ''}
${score < 90 ? '- Minimize JavaScript execution time' : ''}
${score >= 90 ? '- Great performance! Keep monitoring' : ''}
    `.trim();
  },
};

// Default instance
export const defaultPerformanceManager = PerformanceManager.getInstance();

export default {
  PerformanceManager,
  performanceUtils,
  defaultPerformanceManager,
};
