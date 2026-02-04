'use client';

// Device-Specific Optimizations for Lumo Platform
export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  os: 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'unknown';
  browser: 'chrome' | 'firefox' | 'safari' | 'edge' | 'unknown';
  capabilities: {
    touch: boolean;
    webgl: boolean;
    webgl2: boolean;
    webassembly: boolean;
    serviceworker: boolean;
    pushnotifications: boolean;
    geolocation: boolean;
    camera: boolean;
    microphone: boolean;
    fullscreen: boolean;
    orientation: boolean;
    vibration: boolean;
    bluetooth: boolean;
    usb: boolean;
    nfc: boolean;
  };
  performance: {
    memory: number; // in GB
    cores: number;
    connection: {
      effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
      downlink: number; // in Mbps
      rtt: number; // in ms
      saveData: boolean;
    };
    battery: {
      level: number; // 0-1
      charging: boolean;
    };
  };
  display: {
    width: number;
    height: number;
    pixelRatio: number;
    colorDepth: number;
    orientation: 'portrait' | 'landscape';
    safeArea: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
}

export interface OptimizationConfig {
  images: {
    quality: number;
    format: 'webp' | 'avif' | 'jpg' | 'png';
    lazy: boolean;
    adaptive: boolean;
  };
  animations: {
    reduced: boolean;
    fps: number;
    duration: number;
    easing: string;
  };
  performance: {
    debounce: number;
    throttle: number;
    batchSize: number;
    maxConcurrent: number;
  };
  features: {
    shadows: boolean;
    gradients: boolean;
    transitions: boolean;
    transforms: boolean;
    filters: boolean;
    backdrop: boolean;
  };
  network: {
    preload: boolean;
    prefetch: boolean;
    compression: boolean;
    caching: boolean;
  };
}

// Device Detection Manager
export class DeviceDetectionManager {
  private deviceInfo: DeviceInfo | null = null;
  private listeners: Set<(deviceInfo: DeviceInfo) => void> = new Set();

  constructor() {
    this.detectDeviceInfo();
  }

  // Detect device information
  private async detectDeviceInfo(): Promise<void> {
    const deviceInfo: DeviceInfo = {
      type: this.detectDeviceType(),
      os: this.detectOS(),
      browser: this.detectBrowser(),
      capabilities: await this.detectCapabilities(),
      performance: await this.detectPerformance(),
      display: this.detectDisplay(),
    };

    this.deviceInfo = deviceInfo;
    this.notifyListeners();
  }

  // Detect device type
  private detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const userAgent = navigator.userAgent.toLowerCase();
    const maxTouchPoints = navigator.maxTouchPoints || 0;
    const width = window.innerWidth;

    // Tablet detection
    if (/ipad|android(?!.*mobile)|tablet/i.test(userAgent) || 
        (maxTouchPoints > 1 && width >= 768 && width <= 1024)) {
      return 'tablet';
    }

    // Mobile detection
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || 
        maxTouchPoints > 0) {
      return 'mobile';
    }

    return 'desktop';
  }

  // Detect operating system
  private detectOS(): 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'unknown' {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
    if (/android/.test(userAgent)) return 'android';
    if (/win/.test(userAgent)) return 'windows';
    if (/mac/.test(userAgent)) return 'mac';
    if (/linux/.test(userAgent)) return 'linux';

    return 'unknown';
  }

  // Detect browser
  private detectBrowser(): 'chrome' | 'firefox' | 'safari' | 'edge' | 'unknown' {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/chrome/.test(userAgent) && !/edge/.test(userAgent)) return 'chrome';
    if (/firefox/.test(userAgent)) return 'firefox';
    if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) return 'safari';
    if (/edge/.test(userAgent)) return 'edge';

    return 'unknown';
  }

  // Detect capabilities
  private async detectCapabilities(): Promise<DeviceInfo['capabilities']> {
    const capabilities = {
      touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      webgl: this.checkWebGL(),
      webgl2: this.checkWebGL2(),
      webassembly: this.checkWebAssembly(),
      serviceworker: 'serviceWorker' in navigator,
      pushnotifications: 'PushManager' in window,
      geolocation: 'geolocation' in navigator,
      camera: await this.checkCamera(),
      microphone: await this.checkMicrophone(),
      fullscreen: 'fullscreenEnabled' in document,
      orientation: 'orientation' in screen,
      vibration: 'vibrate' in navigator,
      bluetooth: 'bluetooth' in navigator,
      usb: 'usb' in navigator,
      nfc: 'nfc' in navigator,
    };

    return capabilities;
  }

  // Check WebGL support
  private checkWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  // Check WebGL2 support
  private checkWebGL2(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!canvas.getContext('webgl2');
    } catch (e) {
      return false;
    }
  }

  // Check WebAssembly support
  private checkWebAssembly(): boolean {
    try {
      return typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function';
    } catch (e) {
      return false;
    }
  }

  // Check camera access
  private async checkCamera(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (e) {
      return false;
    }
  }

  // Check microphone access
  private async checkMicrophone(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (e) {
      return false;
    }
  }

  // Detect performance information
  private async detectPerformance(): Promise<DeviceInfo['performance']> {
    const performance = {
      memory: this.getMemoryInfo(),
      cores: navigator.hardwareConcurrency || 4,
      connection: this.getConnectionInfo(),
      battery: await this.getBatteryInfo(),
    };

    return performance;
  }

  // Get memory information
  private getMemoryInfo(): number {
    if ('deviceMemory' in navigator) {
      return (navigator as any).deviceMemory || 4;
    }
    return 4; // Default assumption
  }

  // Get connection information
  private getConnectionInfo(): DeviceInfo['performance']['connection'] {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType || '4g',
        downlink: connection.downlink || 10,
        rtt: connection.rtt || 100,
        saveData: connection.saveData || false,
      };
    }

    return {
      effectiveType: '4g',
      downlink: 10,
      rtt: 100,
      saveData: false,
    };
  }

  // Get battery information
  private async getBatteryInfo(): Promise<DeviceInfo['performance']['battery']> {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return {
          level: battery.level || 1,
          charging: battery.charging || true,
        };
      } catch (e) {
        // Battery API might be blocked
      }
    }

    return {
      level: 1,
      charging: true,
    };
  }

  // Detect display information
  private detectDisplay(): DeviceInfo['display'] {
    const safeArea = {
      top: this.getCSSVariable('safe-area-inset-top') || 0,
      right: this.getCSSVariable('safe-area-inset-right') || 0,
      bottom: this.getCSSVariable('safe-area-inset-bottom') || 0,
      left: this.getCSSVariable('safe-area-inset-left') || 0,
    };

    return {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio || 1,
      colorDepth: screen.colorDepth || 24,
      orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
      safeArea,
    };
  }

  // Get CSS variable value
  private getCSSVariable(name: string): number | null {
    const value = getComputedStyle(document.documentElement).getPropertyValue(`env(${name})`);
    return value ? parseInt(value, 10) : null;
  }

  // Add listener
  public addListener(listener: (deviceInfo: DeviceInfo) => void): () => void {
    this.listeners.add(listener);
    
    if (this.deviceInfo) {
      listener(this.deviceInfo);
    }

    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify listeners
  private notifyListeners(): void {
    if (this.deviceInfo) {
      this.listeners.forEach(listener => {
        try {
          listener(this.deviceInfo!);
        } catch (error) {
          console.error('Error in device listener:', error);
        }
      });
    }
  }

  // Get device info
  public getDeviceInfo(): DeviceInfo | null {
    return this.deviceInfo;
  }

  // Check if device supports feature
  public supportsFeature(feature: keyof DeviceInfo['capabilities']): boolean {
    return this.deviceInfo?.capabilities[feature] || false;
  }

  // Check if device is low-end
  public isLowEnd(): boolean {
    if (!this.deviceInfo) return false;

    const { memory, cores, connection } = this.deviceInfo.performance;
    const isLowMemory = memory < 4;
    const isLowCores = cores < 4;
    const isSlowConnection = connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';

    return isLowMemory || isLowCores || isSlowConnection;
  }

  // Check if device is high-end
  public isHighEnd(): boolean {
    if (!this.deviceInfo) return false;

    const { memory, cores, connection } = this.deviceInfo.performance;
    const isHighMemory = memory >= 8;
    const isHighCores = cores >= 8;
    const isFastConnection = connection.effectiveType === '4g';

    return isHighMemory && isHighCores && isFastConnection;
  }

  // Get device category
  public getDeviceCategory(): 'low-end' | 'mid-range' | 'high-end' {
    if (this.isLowEnd()) return 'low-end';
    if (this.isHighEnd()) return 'high-end';
    return 'mid-range';
  }
}

// Performance Optimization Manager
export class PerformanceOptimizationManager {
  private deviceInfo: DeviceInfo | null = null;
  private config: OptimizationConfig;
  private observers: Set<IntersectionObserver> = new Set();
  private timers: Map<string, NodeJS.Timeout> = new Map();

  constructor(deviceInfo: DeviceInfo | null = null) {
    this.deviceInfo = deviceInfo;
    this.config = this.generateOptimizationConfig();
  }

  // Generate optimization config based on device
  private generateOptimizationConfig(): OptimizationConfig {
    if (!this.deviceInfo) {
      return this.getDefaultConfig();
    }

    const category = this.getDeviceCategory();
    const { connection, battery } = this.deviceInfo.performance;
    const { type } = this.deviceInfo;

    const baseConfig = this.getDefaultConfig();

    // Adjust based on device category
    switch (category) {
      case 'low-end':
        return {
          ...baseConfig,
          images: {
            ...baseConfig.images,
            quality: 60,
            lazy: true,
            adaptive: true,
          },
          animations: {
            ...baseConfig.animations,
            reduced: true,
            fps: 30,
            duration: 200,
          },
          performance: {
            ...baseConfig.performance,
            debounce: 300,
            throttle: 200,
            batchSize: 5,
            maxConcurrent: 2,
          },
          features: {
            ...baseConfig.features,
            shadows: false,
            gradients: false,
            transitions: false,
            filters: false,
            backdrop: false,
          },
          network: {
            ...baseConfig.network,
            preload: false,
            prefetch: false,
          },
        };

      case 'high-end':
        return {
          ...baseConfig,
          images: {
            ...baseConfig.images,
            quality: 90,
            lazy: false,
            adaptive: false,
          },
          animations: {
            ...baseConfig.animations,
            reduced: false,
            fps: 60,
            duration: 300,
          },
          performance: {
            ...baseConfig.performance,
            debounce: 100,
            throttle: 50,
            batchSize: 20,
            maxConcurrent: 10,
          },
          features: {
            ...baseConfig.features,
            shadows: true,
            gradients: true,
            transitions: true,
            transforms: true,
            filters: true,
            backdrop: true,
          },
          network: {
            ...baseConfig.network,
            preload: true,
            prefetch: true,
          },
        };

      default:
        return baseConfig;
    }
  }

  // Get default config
  private getDefaultConfig(): OptimizationConfig {
    return {
      images: {
        quality: 75,
        format: 'webp',
        lazy: true,
        adaptive: true,
      },
      animations: {
        reduced: false,
        fps: 60,
        duration: 250,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      performance: {
        debounce: 150,
        throttle: 100,
        batchSize: 10,
        maxConcurrent: 5,
      },
      features: {
        shadows: true,
        gradients: true,
        transitions: true,
        transforms: true,
        filters: false,
        backdrop: false,
      },
      network: {
        preload: true,
        prefetch: true,
        compression: true,
        caching: true,
      },
    };
  }

  // Get device category
  private getDeviceCategory(): 'low-end' | 'mid-range' | 'high-end' {
    if (!this.deviceInfo) return 'mid-range';

    const { memory, cores, connection } = this.deviceInfo.performance;
    const isLowMemory = memory < 4;
    const isLowCores = cores < 4;
    const isSlowConnection = connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';

    if (isLowMemory || isLowCores || isSlowConnection) return 'low-end';

    const isHighMemory = memory >= 8;
    const isHighCores = cores >= 8;
    const isFastConnection = connection.effectiveType === '4g';

    if (isHighMemory && isHighCores && isFastConnection) return 'high-end';

    return 'mid-range';
  }

  // Get optimization config
  public getConfig(): OptimizationConfig {
    return { ...this.config };
  }

  // Update config
  public updateConfig(updates: Partial<OptimizationConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Setup lazy loading
  public setupLazyLoading(selector: string = '[data-lazy]'): void {
    if (!this.config.images.lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            this.loadLazyElement(element);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    document.querySelectorAll(selector).forEach((element) => {
      observer.observe(element);
    });

    this.observers.add(observer);
  }

  // Load lazy element
  private loadLazyElement(element: HTMLElement): void {
    const src = element.dataset.src;
    const bg = element.dataset.background;

    if (src && element.tagName === 'IMG') {
      const img = element as HTMLImageElement;
      img.src = src;
      img.onload = () => {
        element.classList.add('loaded');
      };
    }

    if (bg) {
      element.style.backgroundImage = `url(${bg})`;
      element.classList.add('loaded');
    }
  }

  // Setup performance monitoring
  public setupPerformanceMonitoring(): void {
    // Monitor FPS
    this.monitorFPS();

    // Monitor memory usage
    this.monitorMemory();

    // Monitor network changes
    this.monitorNetwork();
  }

  // Monitor FPS
  private monitorFPS(): void {
    let lastTime = performance.now();
    let frames = 0;

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        
        // Adjust animations if FPS is too low
        if (fps < this.config.animations.fps * 0.8) {
          this.reduceAnimations();
        }

        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  // Monitor memory usage
  private monitorMemory(): void {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

        // Reduce features if memory usage is high
        if (usage > 0.8) {
          this.reduceFeatures();
        }

        setTimeout(checkMemory, 5000);
      };

      checkMemory();
    }
  }

  // Monitor network changes
  private monitorNetwork(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const handleConnectionChange = () => {
        this.updateNetworkOptimizations(connection);
      };

      connection.addEventListener('change', handleConnectionChange);
      handleConnectionChange();
    }
  }

  // Reduce animations
  private reduceAnimations(): void {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    document.documentElement.classList.add('reduced-motion');
  }

  // Reduce features
  private reduceFeatures(): void {
    document.documentElement.classList.add('reduced-features');
  }

  // Update network optimizations
  private updateNetworkOptimizations(connection: any): void {
    const isSlowConnection = connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';
    const saveData = connection.saveData;

    if (isSlowConnection || saveData) {
      this.config.images.quality = 50;
      this.config.images.lazy = true;
      this.config.network.preload = false;
      this.config.network.prefetch = false;
      document.documentElement.classList.add('data-saver');
    } else {
      document.documentElement.classList.remove('data-saver');
    }
  }

  // Debounce function
  public debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number = this.config.performance.debounce
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  // Throttle function
  public throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number = this.config.performance.throttle
  ): (...args: Parameters<T>) => void {
    let lastCall = 0;

    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }

  // Batch processing
  public async batchProcess<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    batchSize: number = this.config.performance.batchSize
  ): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(processor));
      results.push(...batchResults);

      // Allow UI to breathe between batches
      if (i + batchSize < items.length) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }

    return results;
  }

  // Concurrent processing with limit
  public async concurrentProcess<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    maxConcurrent: number = this.config.performance.maxConcurrent
  ): Promise<R[]> {
    const results: R[] = [];
    const inProgress: Promise<void>[] = [];

    for (const item of items) {
      const promise = processor(item).then(result => {
        results.push(result);
        // Remove from inProgress when done
        const index = inProgress.indexOf(promise as any);
        if (index > -1) {
          inProgress.splice(index, 1);
        }
      });

      inProgress.push(promise as any);

      // Wait for some to finish if we hit the limit
      if (inProgress.length >= maxConcurrent) {
        await Promise.race(inProgress);
      }
    }

    // Wait for all remaining
    await Promise.all(inProgress);
    return results;
  }

  // Cleanup
  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
}

// Resource Optimization Manager
export class ResourceOptimizationManager {
  private deviceInfo: DeviceInfo | null = null;
  private config: OptimizationConfig;

  constructor(deviceInfo: DeviceInfo | null = null) {
    this.deviceInfo = deviceInfo;
    this.config = this.generateOptimizationConfig();
  }

  // Generate optimization config
  private generateOptimizationConfig(): OptimizationConfig {
    if (!this.deviceInfo) {
      return this.getDefaultConfig();
    }

    const { connection, battery } = this.deviceInfo.performance;
    const { type } = this.deviceInfo;

    const baseConfig = this.getDefaultConfig();

    // Adjust based on connection
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return {
        ...baseConfig,
        images: {
          ...baseConfig.images,
          quality: 50,
          lazy: true,
          adaptive: true,
        },
        network: {
          ...baseConfig.network,
          preload: false,
          prefetch: false,
        },
      };
    }

    // Adjust based on battery
    if (battery.level < 0.2 && !battery.charging) {
      return {
        ...baseConfig,
        images: {
          ...baseConfig.images,
          quality: 60,
          lazy: true,
        },
        animations: {
          ...baseConfig.images,
          reduced: true,
        },
      };
    }

    return baseConfig;
  }

  // Get default config
  private getDefaultConfig(): OptimizationConfig {
    return {
      images: {
        quality: 75,
        format: 'webp',
        lazy: true,
        adaptive: true,
      },
      animations: {
        reduced: false,
        fps: 60,
        duration: 250,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      performance: {
        debounce: 150,
        throttle: 100,
        batchSize: 10,
        maxConcurrent: 5,
      },
      features: {
        shadows: true,
        gradients: true,
        transitions: true,
        transforms: true,
        filters: false,
        backdrop: false,
      },
      network: {
        preload: true,
        prefetch: true,
        compression: true,
        caching: true,
      },
    };
  }

  // Optimize image loading
  public optimizeImageLoading(): void {
    const images = document.querySelectorAll('img[data-optimize]');
    
    images.forEach(img => {
      const element = img as HTMLImageElement;
      const src = element.dataset.src;
      
      if (src) {
        const optimizedSrc = this.generateOptimizedImageUrl(src);
        element.src = optimizedSrc;
        element.loading = this.config.images.lazy ? 'lazy' : 'eager';
      }
    });
  }

  // Generate optimized image URL
  private generateOptimizedImageUrl(originalUrl: string): string {
    const params = new URLSearchParams();
    
    params.append('q', this.config.images.quality.toString());
    params.append('f', this.config.images.format);
    
    if (this.config.images.adaptive) {
      const width = Math.min(window.innerWidth, 1920);
      params.append('w', width.toString());
    }
    
    return `${originalUrl}?${params.toString()}`;
  }

  // Setup resource hints
  public setupResourceHints(): void {
    if (!this.config.network.preload) return;

    // Preload critical resources
    const criticalResources = document.querySelectorAll('[data-preload]');
    
    criticalResources.forEach(element => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      if (element.tagName === 'IMG') {
        link.as = 'image';
        link.href = (element as HTMLImageElement).src;
      } else if (element.tagName === 'SCRIPT') {
        link.as = 'script';
        link.href = (element as HTMLScriptElement).src;
      } else if (element.tagName === 'LINK' && (element as HTMLLinkElement).rel === 'stylesheet') {
        link.as = 'style';
        link.href = (element as HTMLLinkElement).href;
      }
      
      document.head.appendChild(link);
    });
  }

  // Setup prefetching
  public setupPrefetching(): void {
    if (!this.config.network.prefetch) return;

    // Prefetch likely next pages
    const links = document.querySelectorAll('[data-prefetch]');
    
    links.forEach(link => {
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = (link as HTMLAnchorElement).href;
      document.head.appendChild(prefetchLink);
    });
  }

  // Optimize animations
  public optimizeAnimations(): void {
    if (this.config.animations.reduced) {
      document.documentElement.classList.add('reduce-motion');
    }

    // Set CSS variables for animation performance
    document.documentElement.style.setProperty('--animation-duration', `${this.config.animations.duration}ms`);
    document.documentElement.style.setProperty('--animation-easing', this.config.animations.easing);
  }

  // Optimize features
  public optimizeFeatures(): void {
    const features = this.config.features;
    
    if (!features.shadows) {
      document.documentElement.classList.add('no-shadows');
    }
    
    if (!features.gradients) {
      document.documentElement.classList.add('no-gradients');
    }
    
    if (!features.transitions) {
      document.documentElement.classList.add('no-transitions');
    }
    
    if (!features.filters) {
      document.documentElement.classList.add('no-filters');
    }
    
    if (!features.backdrop) {
      document.documentElement.classList.add('no-backdrop');
    }
  }

  // Get config
  public getConfig(): OptimizationConfig {
    return { ...this.config };
  }
}

// Device Utilities
export const deviceUtils = {
  // Create device detection manager
  createDeviceManager: () => {
    return new DeviceDetectionManager();
  },

  // Create performance optimization manager
  createPerformanceManager: (deviceInfo?: DeviceInfo) => {
    return new PerformanceOptimizationManager(deviceInfo);
  },

  // Create resource optimization manager
  createResourceManager: (deviceInfo?: DeviceInfo) => {
    return new ResourceOptimizationManager(deviceInfo);
  },

  // Check if device is mobile
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Check if device is tablet
  isTablet: () => {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
  },

  // Check if device is desktop
  isDesktop: () => {
    return !deviceUtils.isMobile() && !deviceUtils.isTablet();
  },

  // Get device pixel ratio
  getPixelRatio: () => {
    return window.devicePixelRatio || 1;
  },

  // Check if device supports touch
  supportsTouch: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  // Check if device supports WebGL
  supportsWebGL: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  },

  // Check if device supports WebGL2
  supportsWebGL2: () => {
    try {
      const canvas = document.createElement('canvas');
      return !!canvas.getContext('webgl2');
    } catch (e) {
      return false;
    }
  },

  // Get connection type
  getConnectionType: () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType || 'unknown';
    }
    return 'unknown';
  },

  // Check if data saver is enabled
  isDataSaverEnabled: () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.saveData || false;
    }
    return false;
  },

  // Get battery level
  getBatteryLevel: async (): Promise<number> => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return battery.level;
      } catch (e) {
        return 1;
      }
    }
    return 1;
  },

  // Check if device is charging
  isCharging: async (): Promise<boolean> => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return battery.charging;
      } catch (e) {
        return true;
      }
    }
    return true;
  },

  // Get device memory
  getDeviceMemory: (): number => {
    if ('deviceMemory' in navigator) {
      return (navigator as any).deviceMemory || 4;
    }
    return 4;
  },

  // Get hardware concurrency
  getHardwareConcurrency: (): number => {
    return navigator.hardwareConcurrency || 4;
  },

  // Check if prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check if prefers dark mode
  prefersDarkMode: () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },

  // Check if prefers high contrast
  prefersHighContrast: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },

  // Get viewport width
  getViewportWidth: (): number => {
    return window.innerWidth;
  },

  // Get viewport height
  getViewportHeight: (): number => {
    return window.innerHeight;
  },

  // Get screen width
  getScreenWidth: (): number => {
    return screen.width;
  },

  // Get screen height
  getScreenHeight: (): number => {
    return screen.height;
  },

  // Get orientation
  getOrientation: (): 'portrait' | 'landscape' => {
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
  },

  // Generate device fingerprint
  generateFingerprint: (): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device fingerprint', 2, 2);
      
      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        canvas.toDataURL()
      ].join('|');
      
      return btoa(fingerprint);
    }
    
    return 'unknown';
  },
};

// Default instances
export const defaultDeviceManager = new DeviceDetectionManager();
export const defaultPerformanceManager = new PerformanceOptimizationManager();
export const defaultResourceManager = new ResourceOptimizationManager();

export default {
  DeviceDetectionManager,
  PerformanceOptimizationManager,
  ResourceOptimizationManager,
  deviceUtils,
  defaultDeviceManager,
  defaultPerformanceManager,
  defaultResourceManager,
};
