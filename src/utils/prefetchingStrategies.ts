'use client';

// Prefetching and Caching Strategies for Lumo Platform
import { useEffect, useState, useCallback } from 'react';

// Prefetch configuration interface
export interface PrefetchConfig {
  strategy: 'network-idle' | 'visible' | 'hover' | 'immediate' | 'manual';
  priority: 'high' | 'medium' | 'low';
  timeout?: number;
  retryCount?: number;
  cachePolicy: 'cache-first' | 'network-first' | 'cache-only' | 'network-only';
  maxAge?: number;
  staleWhileRevalidate?: number;
}

// Cache configuration interface
export interface CacheConfig {
  name: string;
  maxAge: number;
  staleWhileRevalidate: number;
  maxEntries?: number;
  storageQuota?: number;
  storageType: 'memory' | 'localStorage' | 'sessionStorage' | 'indexedDB';
}

// Resource type
export type ResourceType = 'page' | 'component' | 'image' | 'font' | 'script' | 'style' | 'api' | 'data';

// Resource entry interface
export interface ResourceEntry {
  url: string;
  type: ResourceType;
  priority: 'high' | 'medium' | 'low';
  timestamp: number;
  lastAccessed: number;
  size?: number;
  status: 'pending' | 'loading' | 'loaded' | 'failed';
  retryCount: number;
  cacheKey?: string;
}

// Prefetching manager
export class PrefetchingManager {
  private static instance: PrefetchingManager;
  private prefetchQueue: ResourceEntry[] = [];
  private loadingResources: Set<string> = new Set();
  private loadedResources: Set<string> = new Set();
  private failedResources: Set<string> = new Set();
  private cache: Map<string, any> = new Map();
  private observers: Map<string, IntersectionObserver> = new Map();
  private networkSpeed: 'slow' | 'medium' | 'fast' = 'medium';
  private isOnline: boolean = true;
  private batteryLevel: 'high' | 'medium' | 'low' = 'high';

  private constructor() {
    this.initializeNetworkMonitoring();
    this.initializeBatteryMonitoring();
    this.setupServiceWorker();
  }

  public static getInstance(): PrefetchingManager {
    if (!PrefetchingManager.instance) {
      PrefetchingManager.instance = new PrefetchingManager();
    }
    return PrefetchingManager.instance;
  }

  // Initialize network monitoring
  private initializeNetworkMonitoring(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateNetworkSpeed = () => {
        const effectiveType = connection.effectiveType;
        switch (effectiveType) {
          case 'slow-2g':
          case '2g':
            this.networkSpeed = 'slow';
            break;
          case '3g':
            this.networkSpeed = 'medium';
            break;
          case '4g':
            this.networkSpeed = 'fast';
            break;
          default:
            this.networkSpeed = 'medium';
        }
      };

      updateNetworkSpeed();
      connection.addEventListener('change', updateNetworkSpeed);
    }

    // Monitor online/offline status
    const updateOnlineStatus = () => {
      this.isOnline = navigator.onLine;
      if (this.isOnline) {
        this.retryFailedResources();
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  // Initialize battery monitoring
  private initializeBatteryMonitoring(): void {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryLevel = () => {
          const level = battery.level;
          if (level > 0.7) {
            this.batteryLevel = 'high';
          } else if (level > 0.3) {
            this.batteryLevel = 'medium';
          } else {
            this.batteryLevel = 'low';
          }
        };

        updateBatteryLevel();
        battery.addEventListener('levelchange', updateBatteryLevel);
        battery.addEventListener('chargingchange', updateBatteryLevel);
      });
    }
  }

  // Setup service worker
  private setupServiceWorker(): void {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered:', registration);
      }).catch((error) => {
        console.warn('Service Worker registration failed:', error);
      });
    }
  }

  // Add resource to prefetch queue
  public prefetchResource(
    url: string,
    type: ResourceType,
    config: PrefetchConfig = { strategy: 'network-idle', priority: 'medium', cachePolicy: 'cache-first' }
  ): void {
    const entry: ResourceEntry = {
      url,
      type,
      priority: config.priority || 'medium',
      timestamp: Date.now(),
      lastAccessed: Date.now(),
      status: 'pending',
      retryCount: 0,
    };

    this.prefetchQueue.push(entry);
    this.processQueue();
  }

  // Process prefetch queue
  private processQueue(): void {
    if (this.prefetchQueue.length === 0) return;

    // Sort queue by priority and timestamp
    this.prefetchQueue.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      return a.timestamp - b.timestamp;
    });

    const entry = this.prefetchQueue.shift();
    if (entry) {
      this.executePrefetch(entry);
    }
  }

  // Execute prefetch
  private async executePrefetch(entry: ResourceEntry): Promise<void> {
    if (this.loadedResources.has(entry.url) || this.loadingResources.has(entry.url)) {
      return;
    }

    if (!this.shouldPrefetch(entry)) {
      this.prefetchQueue.push(entry);
      return;
    }

    this.loadingResources.add(entry.url);

    try {
      switch (entry.type) {
        case 'page':
          await this.prefetchPage(entry.url);
          break;
        case 'component':
          await this.prefetchComponent(entry.url);
          break;
        case 'image':
          await this.prefetchImage(entry.url);
          break;
        case 'font':
          await this.prefetchFont(entry.url);
          break;
        case 'script':
          await this.prefetchScript(entry.url);
          break;
        case 'style':
          await this.prefetchStyle(entry.url);
          break;
        case 'api':
          await this.prefetchAPI(entry.url);
          break;
        case 'data':
          await this.prefetchData(entry.url);
          break;
        default:
          await this.prefetchGeneric(entry.url);
      }

      this.loadedResources.add(entry.url);
      this.loadingResources.delete(entry.url);
      entry.status = 'loaded';
      entry.lastAccessed = Date.now();
    } catch (error) {
      console.warn(`Failed to prefetch ${entry.type}: ${entry.url}`, error);
      this.loadingResources.delete(entry.url);
      entry.status = 'failed';
      entry.retryCount++;
      
      // Retry failed resources
      if (entry.retryCount < 3) {
        setTimeout(() => {
          this.prefetchResource(entry.url, entry.type, {
            strategy: 'immediate',
            priority: entry.priority,
            cachePolicy: 'cache-first',
          });
        }, 1000 * Math.pow(2, entry.retryCount));
      }
    }
  }

  // Check if should prefetch
  private shouldPrefetch(entry: ResourceEntry): boolean {
    // Don't prefetch if offline
    if (!this.isOnline) return false;

    // Don't prefetch if battery is low
    if (this.batteryLevel === 'low') return false;

    // Don't prefetch if network is slow for high priority resources
    if (this.networkSpeed === 'slow' && entry.priority === 'high') return false;

    // Don't prefetch if already loaded
    if (this.loadedResources.has(entry.url)) return false;

    // Don't prefetch if currently loading
    if (this.loadingResources.has(entry.url)) return false;

    return true;
  }

  // Prefetch page
  private async prefetchPage(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'document';
    document.head.appendChild(link);
  }

  // Prefetch component
  private async prefetchComponent(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'script';
    document.head.appendChild(link);
  }

  // Prefetch image
  private async prefetchImage(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'image';
    document.head.appendChild(link);
  }

  // Prefetch font
  private async prefetchFont(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  // Prefetch script
  private async prefetchScript(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'script';
    document.head.appendChild(link);
  }

  // Prefetch style
  private async prefetchStyle(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'style';
    document.head.appendChild(link);
  }

  // Prefetch API
  private async prefetchAPI(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'fetch';
    document.head.appendChild(link);
  }

  // Prefetch data
  private async prefetchData(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'fetch';
    document.head.appendChild(link);
  }

  // Prefetch generic
  private async prefetchGeneric(url: string): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }

  // Setup intersection observer for visible prefetching
  public setupIntersectionObserver(element: HTMLElement, url: string, type: ResourceType): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.prefetchResource(url, type, {
              strategy: 'visible',
              priority: 'medium',
              cachePolicy: 'cache-first',
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observers.set(url, observer);
    observer.observe(element);
  }

  // Setup hover prefetching
  public setupHoverPrefetch(element: HTMLElement, url: string, type: ResourceType): void {
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
      timeoutId = setTimeout(() => {
        this.prefetchResource(url, type, {
          strategy: 'hover',
          priority: 'medium',
          cachePolicy: 'cache-first',
        });
      }, 100);
    };

    const handleMouseLeave = () => {
      clearTimeout(timeoutId);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  }

  // Retry failed resources
  private retryFailedResources(): void {
    const failedResources = Array.from(this.failedResources);
    this.failedResources.clear();

    failedResources.forEach(url => {
      const entry = this.prefetchQueue.find(e => e.url === url);
      if (entry) {
        this.prefetchResource(url, entry.type, {
          strategy: 'immediate',
          priority: entry.priority,
          cachePolicy: 'cache-first',
        });
      }
    });
  }

  // Get prefetching status
  public getPrefetchingStatus(): {
    total: number;
    pending: number;
    loading: number;
    loaded: number;
    failed: number;
  } {
    const total = this.prefetchQueue.length + this.loadedResources.size + this.loadingResources.size + this.failedResources.size;
    const pending = this.prefetchQueue.length;
    const loading = this.loadingResources.size;
    const loaded = this.loadedResources.size;
    const failed = this.failedResources.size;

    return { total, pending, loading, loaded, failed };
  }

  // Clear prefetch queue
  public clearPrefetchQueue(): void {
    this.prefetchQueue = [];
  }

  // Clear all resources
  public clearAllResources(): void {
    this.prefetchQueue = [];
    this.loadedResources.clear();
    this.loadingResources.clear();
    this.failedResources.clear();
    this.cache.clear();
    
    // Clear intersection observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }

  // Get network speed
  public getNetworkSpeed(): 'slow' | 'medium' | 'fast' {
    return this.networkSpeed;
  }

  // Get battery level
  public getBatteryLevel(): 'high' | 'medium' | 'low' {
    return this.batteryLevel;
  }

  // Get online status
  public getOnlineStatus(): boolean {
    return this.isOnline;
  }

  // Update configuration
  public updateConfig(updates: {
    networkSpeed?: 'slow' | 'medium' | 'fast';
    batteryLevel?: 'high' | 'medium' | 'low';
    isOnline?: boolean;
  }): void {
    if (updates.networkSpeed !== undefined) {
      this.networkSpeed = updates.networkSpeed;
    }
    if (updates.batteryLevel !== undefined) {
      this.batteryLevel = updates.batteryLevel;
    }
    if (updates.isOnline !== undefined) {
      this.isOnline = updates.isOnline;
    }
  }
}

// React hooks
export const usePrefetching = () => {
  const manager = PrefetchingManager.getInstance();
  const [status, setStatus] = useState(manager.getPrefetchingStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(manager.getPrefetchingStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, [manager]);

  return {
    status,
    prefetchResource: (url: string, type: ResourceType, config?: PrefetchConfig) => 
      manager.prefetchResource(url, type, config),
    setupIntersectionObserver: (element: HTMLElement, url: string, type: ResourceType) => 
      manager.setupIntersectionObserver(element, url, type),
    setupHoverPrefetch: (element: HTMLElement, url: string, type: ResourceType) => 
      manager.setupHoverPrefetch(element, url, type),
    clearPrefetchQueue: () => manager.clearPrefetchQueue(),
    clearAllResources: () => manager.clearAllResources(),
    getNetworkSpeed: () => manager.getNetworkSpeed(),
    getBatteryLevel: () => manager.getBatteryLevel(),
    getOnlineStatus: () => manager.getOnlineStatus(),
    updateConfig: (updates: {
      networkSpeed?: 'slow' | 'medium' | 'fast';
      batteryLevel?: 'high' | 'medium' | 'low';
      isOnline?: boolean;
    }) => manager.updateConfig(updates),
  };
};

// Utility functions
export const prefetchingUtils = {
  // Create managers
  createPrefetchingManager: () => PrefetchingManager.getInstance(),

  // Smart prefetching based on user behavior
  smartPrefetch: (resources: Array<{
    url: string;
    type: ResourceType;
    priority?: 'high' | 'medium' | 'low';
    trigger?: 'hover' | 'visible' | 'idle' | 'immediate';
  }>) => {
    const manager = PrefetchingManager.getInstance();
    
    resources.forEach(resource => {
      switch (resource.trigger) {
        case 'hover':
          // Setup hover prefetching for elements with data-prefetch attributes
          document.querySelectorAll('[data-prefetch]').forEach(element => {
            const url = element.getAttribute('data-prefetch');
            const type = element.getAttribute('data-prefetch-type') as ResourceType;
            if (url && type) {
              element.addEventListener('mouseenter', () => {
                manager.prefetchResource(url, type, {
                  strategy: 'hover',
                  priority: resource.priority || 'medium',
                  cachePolicy: 'cache-first',
                });
              });
            }
          });
          break;
        
        case 'visible':
          // Setup intersection observer for elements with data-prefetch-visible attributes
          document.querySelectorAll('[data-prefetch-visible]').forEach(element => {
            const url = element.getAttribute('data-prefetch-visible');
            const type = element.getAttribute('data-prefetch-type') as ResourceType;
            if (url && type && element instanceof HTMLElement) {
              manager.setupIntersectionObserver(element, url, type);
            }
          });
          break;
        
        case 'idle':
          // Prefetch on idle time
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              resources.forEach(resource => {
                manager.prefetchResource(resource.url, resource.type, {
                  strategy: 'network-idle',
                  priority: resource.priority || 'medium',
                  cachePolicy: 'cache-first',
                });
              });
            });
          }
          break;
        
        case 'immediate':
          // Prefetch immediately
          resources.forEach(resource => {
            manager.prefetchResource(resource.url, resource.type, {
              strategy: 'immediate',
              priority: resource.priority || 'medium',
              cachePolicy: 'cache-first',
            });
          });
          break;
      }
    });
  },

  // Prefetch based on route changes
  prefetchRouteResources: (routePath: string, resources: Array<{
    url: string;
    type: ResourceType;
    priority?: 'high' | 'medium' | 'low';
  }>) => {
    const manager = PrefetchingManager.getInstance();
    
    resources.forEach(resource => {
      manager.prefetchResource(resource.url, resource.type, {
        strategy: 'immediate',
        priority: resource.priority || 'medium',
        cachePolicy: 'cache-first',
      });
    });
  },

  // Prefetch critical resources
  prefetchCriticalResources: () => {
    const manager = PrefetchingManager.getInstance();
    
    // Prefetch critical pages
    const criticalPages = [
      '/',
      '/login',
      '/signup',
      '/courses',
      '/dashboard',
    ];

    criticalPages.forEach(page => {
      manager.prefetchResource(page, 'page', {
        strategy: 'immediate',
        priority: 'high',
        cachePolicy: 'cache-first',
      });
    });

    // Prefetch critical components
    const criticalComponents = [
      '/components/Header',
      '/components/Footer',
      '/components/Navigation',
    ];

    criticalComponents.forEach(component => {
      manager.prefetchResource(component, 'component', {
        strategy: 'immediate',
        priority: 'high',
        cachePolicy: 'cache-first',
      });
    });
  },

  // Prefetch based on user interaction
  setupInteractionPrefetching: () => {
    const manager = PrefetchingManager.getInstance();
    
    // Prefetch on link hover
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        link.addEventListener('mouseenter', () => {
          manager.prefetchResource(href, 'page', {
            strategy: 'hover',
            priority: 'medium',
            cachePolicy: 'cache-first',
          });
        });
      }
    });

    // Prefetch on button click
    document.querySelectorAll('button[data-prefetch]').forEach(button => {
      const url = button.getAttribute('data-prefetch');
      const type = button.getAttribute('data-prefetch-type') as ResourceType;
      if (url && type) {
        button.addEventListener('click', () => {
          manager.prefetchResource(url, type, {
            strategy: 'immediate',
            priority: 'medium',
            cachePolicy: 'cache-first',
          });
        });
      }
    });
  },

  // Get optimal prefetching strategy based on conditions
  getOptimalStrategy: (
    networkSpeed: 'slow' | 'medium' | 'fast',
    batteryLevel: 'high' | 'medium' | 'low',
    priority: 'high' | 'medium' | 'low'
  ): PrefetchConfig => {
    let strategy: PrefetchConfig['strategy'];
    let timeout: number | undefined;
    let retryCount: number | undefined;

    // Adjust based on network speed
    if (networkSpeed === 'slow') {
      strategy = 'manual';
      timeout = 5000;
      retryCount = 1;
    } else if (networkSpeed === 'medium') {
      strategy = 'network-idle';
      timeout = 10000;
      retryCount = 2;
    } else {
      strategy = 'visible';
      timeout = 30000;
      retryCount = 3;
    }

    // Adjust based on battery level
    if (batteryLevel === 'low') {
      strategy = 'manual';
      timeout = 10000;
    }

    // Adjust based on priority
    if (priority === 'high') {
      timeout = Math.min(timeout || 30000, 5000);
    } else if (priority === 'medium') {
      timeout = Math.min(timeout || 10000, 10000);
    }

    return {
      strategy,
      timeout,
      retryCount,
      priority,
      cachePolicy: 'cache-first',
    };
  },
};

// Default instance
export const defaultPrefetchingManager = PrefetchingManager.getInstance();

export default {
  PrefetchingManager,
  usePrefetching,
  prefetchingUtils,
  defaultPrefetchingManager,
};
