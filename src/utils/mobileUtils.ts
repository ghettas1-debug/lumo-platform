'use client';

// Mobile & Touch Experience Utilities for Lumo Platform
export interface TouchEvent {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startTime: number;
  endTime: number;
  velocity: number;
  direction: 'left' | 'right' | 'up' | 'down' | 'none';
}

export interface GestureConfig {
  swipeThreshold: number;
  swipeVelocityThreshold: number;
  tapThreshold: number;
  tapTimeout: number;
  longPressThreshold: number;
  longPressTimeout: number;
  pinchThreshold: number;
  doubleTapTimeout: number;
}

export interface TouchTarget {
  element: HTMLElement;
  minSize: number;
  padding: number;
  feedback: boolean;
}

export interface MobileViewport {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  devicePixelRatio: number;
  safeArea: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

// Mobile Detection Utilities
export const mobileDetection = {
  // Check if device is mobile
  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Check if device is tablet
  isTablet(): boolean {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
  },

  // Check if device is phone
  isPhone(): boolean {
    return this.isMobile() && !this.isTablet();
  },

  // Check if device supports touch
  isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  // Get device type
  getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (this.isTablet()) return 'tablet';
    if (this.isMobile()) return 'mobile';
    return 'desktop';
  },

  // Get operating system
  getOS(): 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'unknown' {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
    if (/android/.test(userAgent)) return 'android';
    if (/win/.test(userAgent)) return 'windows';
    if (/mac/.test(userAgent)) return 'mac';
    if (/linux/.test(userAgent)) return 'linux';
    
    return 'unknown';
  },

  // Get browser
  getBrowser(): 'chrome' | 'firefox' | 'safari' | 'edge' | 'unknown' {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/chrome/.test(userAgent) && !/edge/.test(userAgent)) return 'chrome';
    if (/firefox/.test(userAgent)) return 'firefox';
    if (/safari/.test(userAgent) && !/chrome/.test(userAgent)) return 'safari';
    if (/edge/.test(userAgent)) return 'edge';
    
    return 'unknown';
  },
};

// Touch Event Manager
export class TouchEventManager {
  private config: GestureConfig;
  private listeners: Map<string, (event: TouchEvent) => void> = new Map();
  private activeTouches: Map<number, TouchEvent> = new Map();
  private longPressTimer: NodeJS.Timeout | null = null;
  private doubleTapTimer: NodeJS.Timeout | null = null;
  private tapCount: number = 0;

  constructor(config: Partial<GestureConfig> = {}) {
    this.config = {
      swipeThreshold: 50,
      swipeVelocityThreshold: 0.3,
      tapThreshold: 10,
      tapTimeout: 300,
      longPressThreshold: 10,
      longPressTimeout: 500,
      pinchThreshold: 20,
      doubleTapTimeout: 300,
      ...config,
    };
  }

  // Add touch event listener
  public addListener(element: HTMLElement, callback: (event: TouchEvent) => void): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.listeners.set(id, callback);

    const touchStartHandler = (e: TouchEvent) => this.handleTouchStart(e, element);
    const touchMoveHandler = (e: TouchEvent) => this.handleTouchMove(e, element);
    const touchEndHandler = (e: TouchEvent) => this.handleTouchEnd(e, element);

    element.addEventListener('touchstart', touchStartHandler as any, { passive: false });
    element.addEventListener('touchmove', touchMoveHandler as any, { passive: false });
    element.addEventListener('touchend', touchEndHandler as any, { passive: false });

    // Store handlers for cleanup
    (element as any)._touchHandlers = { id, touchStartHandler, touchMoveHandler, touchEndHandler };

    return id;
  }

  // Remove touch event listener
  public removeListener(element: HTMLElement, id: string): void {
    this.listeners.delete(id);

    const handlers = (element as any)._touchHandlers;
    if (handlers && handlers.id === id) {
      element.removeEventListener('touchstart', handlers.touchStartHandler);
      element.removeEventListener('touchmove', handlers.touchMoveHandler);
      element.removeEventListener('touchend', handlers.touchEndHandler);
      delete (element as any)._touchHandlers;
    }
  }

  // Handle touch start
  private handleTouchStart(event: TouchEvent, element: HTMLElement): void {
    const touch = event.touches[0];
    const touchEvent: TouchEvent = {
      startX: touch.clientX,
      startY: touch.clientY,
      endX: touch.clientX,
      endY: touch.clientY,
      startTime: Date.now(),
      endTime: Date.now(),
      velocity: 0,
      direction: 'none',
    };

    this.activeTouches.set(touch.identifier, touchEvent);

    // Start long press timer
    this.longPressTimer = setTimeout(() => {
      if (this.activeTouches.has(touch.identifier)) {
        this.triggerCallback(touchEvent);
      }
    }, this.config.longPressTimeout);

    // Prevent default to avoid scrolling during interactions
    if (element.dataset.preventScroll === 'true') {
      event.preventDefault();
    }
  }

  // Handle touch move
  private handleTouchMove(event: TouchEvent, element: HTMLElement): void {
    const touch = event.touches[0];
    const touchEvent = this.activeTouches.get(touch.identifier);

    if (touchEvent) {
      touchEvent.endX = touch.clientX;
      touchEvent.endY = touch.clientY;

      // Cancel long press if moved too much
      const distance = this.calculateDistance(touchEvent.startX, touchEvent.startY, touchEvent.endX, touchEvent.endY);
      if (distance > this.config.longPressThreshold) {
        if (this.longPressTimer) {
          clearTimeout(this.longPressTimer);
          this.longPressTimer = null;
        }
      }

      // Prevent default if needed
      if (element.dataset.preventScroll === 'true' || distance > this.config.tapThreshold) {
        event.preventDefault();
      }
    }
  }

  // Handle touch end
  private handleTouchEnd(event: TouchEvent, element: HTMLElement): void {
    const touch = event.changedTouches[0];
    const touchEvent = this.activeTouches.get(touch.identifier);

    if (touchEvent) {
      touchEvent.endTime = Date.now();
      touchEvent.velocity = this.calculateVelocity(touchEvent);
      touchEvent.direction = this.calculateDirection(touchEvent);

      // Clear long press timer
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }

      // Check for tap vs swipe
      const distance = this.calculateDistance(touchEvent.startX, touchEvent.startY, touchEvent.endX, touchEvent.endY);
      const duration = touchEvent.endTime - touchEvent.startTime;

      if (distance < this.config.tapThreshold && duration < this.config.tapTimeout) {
        // Handle tap
        this.handleTap(touchEvent);
      } else if (Math.abs(touchEvent.velocity) > this.config.swipeVelocityThreshold && distance > this.config.swipeThreshold) {
        // Handle swipe
        this.triggerCallback(touchEvent);
      }

      this.activeTouches.delete(touch.identifier);
    }
  }

  // Handle tap
  private handleTap(touchEvent: TouchEvent): void {
    this.tapCount++;

    if (this.tapCount === 1) {
      this.doubleTapTimer = setTimeout(() => {
        if (this.tapCount === 1) {
          // Single tap
          this.triggerCallback(touchEvent);
        }
        this.tapCount = 0;
      }, this.config.doubleTapTimeout);
    } else if (this.tapCount === 2) {
      // Double tap
      if (this.doubleTapTimer) {
        clearTimeout(this.doubleTapTimer);
        this.doubleTapTimer = null;
      }
      this.triggerCallback(touchEvent);
      this.tapCount = 0;
    }
  }

  // Trigger callback
  private triggerCallback(touchEvent: TouchEvent): void {
    this.listeners.forEach(callback => {
      try {
        callback(touchEvent);
      } catch (error) {
        console.error('Error in touch event callback:', error);
      }
    });
  }

  // Calculate distance
  private calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  // Calculate velocity
  private calculateVelocity(touchEvent: TouchEvent): number {
    const distance = this.calculateDistance(touchEvent.startX, touchEvent.startY, touchEvent.endX, touchEvent.endY);
    const duration = touchEvent.endTime - touchEvent.startTime;
    return duration > 0 ? distance / duration : 0;
  }

  // Calculate direction
  private calculateDirection(touchEvent: TouchEvent): 'left' | 'right' | 'up' | 'down' | 'none' {
    const deltaX = touchEvent.endX - touchEvent.startX;
    const deltaY = touchEvent.endY - touchEvent.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }

  // Destroy manager
  public destroy(): void {
    this.listeners.clear();
    this.activeTouches.clear();
    
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
    
    if (this.doubleTapTimer) {
      clearTimeout(this.doubleTapTimer);
      this.doubleTapTimer = null;
    }
  }
}

// Mobile Viewport Manager
export class MobileViewportManager {
  private viewport: MobileViewport;
  private listeners: Set<(viewport: MobileViewport) => void> = new Set();
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    this.viewport = this.getCurrentViewport();
    this.setupListeners();
  }

  // Get current viewport
  private getCurrentViewport(): MobileViewport {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
      devicePixelRatio: window.devicePixelRatio || 1,
      safeArea: {
        top: this.getCSSVariable('safe-area-inset-top') || 0,
        right: this.getCSSVariable('safe-area-inset-right') || 0,
        bottom: this.getCSSVariable('safe-area-inset-bottom') || 0,
        left: this.getCSSVariable('safe-area-inset-left') || 0,
      },
    };
  }

  // Get CSS variable
  private getCSSVariable(name: string): number | null {
    const value = getComputedStyle(document.documentElement).getPropertyValue(`env(${name})`);
    return value ? parseInt(value, 10) : null;
  }

  // Setup listeners
  private setupListeners(): void {
    // Window resize listener
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));

    // Resize observer for more accurate measurements
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
      this.resizeObserver.observe(document.documentElement);
    }
  }

  // Handle resize
  private handleResize(): void {
    const newViewport = this.getCurrentViewport();
    
    if (JSON.stringify(newViewport) !== JSON.stringify(this.viewport)) {
      this.viewport = newViewport;
      this.notifyListeners();
    }
  }

  // Handle orientation change
  private handleOrientationChange(): void {
    setTimeout(() => {
      this.handleResize();
    }, 100); // Wait for orientation change to complete
  }

  // Add listener
  public addListener(listener: (viewport: MobileViewport) => void): () => void {
    this.listeners.add(listener);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.viewport);
      } catch (error) {
        console.error('Error in viewport listener:', error);
      }
    });
  }

  // Get viewport
  public getViewport(): MobileViewport {
    return { ...this.viewport };
  }

  // Check if mobile viewport
  public isMobile(): boolean {
    return this.viewport.width <= 768;
  }

  // Check if tablet viewport
  public isTablet(): boolean {
    return this.viewport.width > 768 && this.viewport.width <= 1024;
  }

  // Check if desktop viewport
  public isDesktop(): boolean {
    return this.viewport.width > 1024;
  }

  // Get safe area styles
  public getSafeAreaStyles(): React.CSSProperties {
    return {
      paddingTop: this.viewport.safeArea.top,
      paddingRight: this.viewport.safeArea.right,
      paddingBottom: this.viewport.safeArea.bottom,
      paddingLeft: this.viewport.safeArea.left,
    };
  }

  // Destroy manager
  public destroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    window.removeEventListener('orientationchange', this.handleOrientationChange.bind(this));
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    this.listeners.clear();
  }
}

// Touch Target Optimizer
export class TouchTargetOptimizer {
  private targets: Map<HTMLElement, TouchTarget> = new Map();

  // Optimize touch targets
  public optimize(element: HTMLElement, options: Partial<TouchTarget> = {}): void {
    const target: TouchTarget = {
      element,
      minSize: 44,
      padding: 12,
      feedback: true,
      ...options,
    };

    this.targets.set(element, target);
    this.applyOptimizations(target);
  }

  // Apply optimizations
  private applyOptimizations(target: TouchTarget): void {
    const { element, minSize, padding, feedback } = target;

    // Set minimum size
    const currentSize = Math.min(element.offsetWidth, element.offsetHeight);
    if (currentSize < minSize) {
      element.style.minWidth = `${minSize}px`;
      element.style.minHeight = `${minSize}px`;
    }

    // Add padding if needed
    if (padding > 0) {
      const currentPadding = parseInt(getComputedStyle(element).padding) || 0;
      if (currentPadding < padding) {
        element.style.padding = `${padding}px`;
      }
    }

    // Add touch feedback
    if (feedback) {
      element.classList.add('touch-feedback');
      this.setupTouchFeedback(element);
    }

    // Add touch target class
    element.classList.add('touch-target');
  }

  // Setup touch feedback
  private setupTouchFeedback(element: HTMLElement): void {
    let touchTimer: NodeJS.Timeout | null = null;

    const handleTouchStart = () => {
      element.classList.add('active');
      
      // Remove active class after animation
      touchTimer = setTimeout(() => {
        element.classList.remove('active');
      }, 300);
    };

    const handleTouchEnd = () => {
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
      element.classList.remove('active');
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);

    // Store handlers for cleanup
    (element as any)._feedbackHandlers = { handleTouchStart, handleTouchEnd, handleTouchCancel: handleTouchEnd };
  }

  // Remove optimizations
  public remove(element: HTMLElement): void {
    const target = this.targets.get(element);
    if (target) {
      // Remove classes
      element.classList.remove('touch-target', 'touch-feedback', 'active');

      // Remove styles
      element.style.removeProperty('min-width');
      element.style.removeProperty('min-height');
      element.style.removeProperty('padding');

      // Remove event listeners
      const handlers = (element as any)._feedbackHandlers;
      if (handlers) {
        element.removeEventListener('touchstart', handlers.handleTouchStart);
        element.removeEventListener('touchend', handlers.handleTouchEnd);
        element.removeEventListener('touchcancel', handlers.handleTouchCancel);
        delete (element as any)._feedbackHandlers;
      }

      this.targets.delete(element);
    }
  }

  // Optimize all touch targets in a container
  public optimizeContainer(container: HTMLElement, options: Partial<TouchTarget> = {}): void {
    const touchElements = container.querySelectorAll('button, a, input, [role="button"], [tabindex]');
    
    touchElements.forEach(element => {
      if (element instanceof HTMLElement) {
        this.optimize(element, options);
      }
    });
  }

  // Get all optimized targets
  public getTargets(): TouchTarget[] {
    return Array.from(this.targets.values());
  }

  // Destroy optimizer
  public destroy(): void {
    this.targets.forEach((target) => {
      this.remove(target.element);
    });
    this.targets.clear();
  }
}

// Mobile Performance Optimizer
export class MobilePerformanceOptimizer {
  private intersectionObserver: IntersectionObserver | null = null;
  private lazyElements: Set<HTMLElement> = new Set();

  constructor() {
    this.setupIntersectionObserver();
  }

  // Setup intersection observer for lazy loading
  private setupIntersectionObserver(): void {
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadElement(entry.target as HTMLElement);
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1,
        }
      );
    }
  }

  // Load element
  private loadElement(element: HTMLElement): void {
    // Handle images
    if (element.tagName === 'IMG') {
      const img = element as HTMLImageElement;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    }

    // Handle background images
    if (element.dataset.backgroundImage) {
      element.style.backgroundImage = `url(${element.dataset.backgroundImage})`;
      element.removeAttribute('data-background-image');
    }

    // Remove from lazy elements
    this.lazyElements.delete(element);
    
    // Stop observing
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(element);
    }
  }

  // Add lazy loading
  public addLazyLoading(element: HTMLElement): void {
    this.lazyElements.add(element);
    
    if (this.intersectionObserver) {
      this.intersectionObserver.observe(element);
    } else {
      // Fallback: load immediately
      this.loadElement(element);
    }
  }

  // Optimize images
  public optimizeImages(container: HTMLElement = document.body): void {
    const images = container.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
      if (img instanceof HTMLElement) {
        this.addLazyLoading(img);
      }
    });
  }

  // Optimize scrolling
  public optimizeScrolling(): void {
    // Add passive event listeners for better scroll performance
    const scrollOptions = { passive: true };
    
    window.addEventListener('scroll', () => {}, scrollOptions);
    window.addEventListener('touchmove', () => {}, scrollOptions);
    
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  // Optimize animations
  public optimizeAnimations(): void {
    // Use transform and opacity for better performance
    const style = document.createElement('style');
    style.textContent = `
      .mobile-optimized-animation {
        will-change: transform, opacity;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
    `;
    document.head.appendChild(style);
  }

  // Destroy optimizer
  public destroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    
    this.lazyElements.clear();
  }
}

// React Hooks
export const useMobileViewport = () => {
  const [viewport, setViewport] = useState<MobileViewport>(() => {
    const manager = new MobileViewportManager();
    return manager.getViewport();
  });

  useEffect(() => {
    const manager = new MobileViewportManager();
    
    const unsubscribe = manager.addListener((newViewport) => {
      setViewport(newViewport);
    });

    return () => {
      unsubscribe();
      manager.destroy();
    };
  }, []);

  return viewport;
};

export const useTouchEvents = (element: HTMLElement | null, config: Partial<GestureConfig> = {}) => {
  const [touchEvent, setTouchEvent] = useState<TouchEvent | null>(null);

  useEffect(() => {
    if (!element) return;

    const manager = new TouchEventManager(config);
    
    const listenerId = manager.addListener(element, (event) => {
      setTouchEvent(event);
    });

    return () => {
      manager.removeListener(element, listenerId);
      manager.destroy();
    };
  }, [element, config]);

  return touchEvent;
};

export const useMobileOptimization = (container: HTMLElement | null) => {
  const [optimizer] = useState(() => new MobilePerformanceOptimizer());

  useEffect(() => {
    if (container) {
      optimizer.optimizeImages(container);
      optimizer.optimizeScrolling();
      optimizer.optimizeAnimations();
    }
  }, [container, optimizer]);

  useEffect(() => {
    return () => {
      optimizer.destroy();
    };
  }, [optimizer]);

  return optimizer;
};

// Utility Functions
export const mobileUtils = {
  // Create touch event manager
  createTouchManager: (config?: Partial<GestureConfig>) => {
    return new TouchEventManager(config);
  },

  // Create viewport manager
  createViewportManager: () => {
    return new MobileViewportManager();
  },

  // Create touch target optimizer
  createTouchOptimizer: () => {
    return new TouchTargetOptimizer();
  },

  // Create performance optimizer
  createPerformanceOptimizer: () => {
    return new MobilePerformanceOptimizer();
  },

  // Get safe area CSS
  getSafeAreaCSS: () => {
    return `
      .mobile-safe-area {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
      }
    `;
  },

  // Get viewport CSS
  getViewportCSS: () => {
    return `
      .mobile-viewport-fix {
        min-height: 100vh;
        min-height: -webkit-fill-available;
      }
      
      .mobile-input-fix {
        font-size: 16px; /* Prevents zoom on iOS */
      }
    `;
  },

  // Check if element is touch-friendly
  isTouchFriendly: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    const minSize = 44;
    
    return rect.width >= minSize && rect.height >= minSize;
  },

  // Make element touch-friendly
  makeTouchFriendly: (element: HTMLElement, minSize: number = 44): void => {
    const rect = element.getBoundingClientRect();
    
    if (rect.width < minSize || rect.height < minSize) {
      element.style.minWidth = `${minSize}px`;
      element.style.minHeight = `${minSize}px`;
    }
    
    element.classList.add('touch-target');
  },

  // Add haptic feedback
  addHapticFeedback: (type: 'light' | 'medium' | 'heavy' = 'light'): void => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [40],
      };
      
      navigator.vibrate(patterns[type]);
    }
  },

  // Prevent zoom on input focus
  preventInputZoom: (): void => {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="search"], textarea');
    
    inputs.forEach(input => {
      if (input instanceof HTMLElement) {
        input.style.fontSize = '16px';
      }
    });
  },

  // Enable pull to refresh
  enablePullToRefresh: (callback: () => Promise<void>): (() => void) => {
    let startY = 0;
    let isPulling = false;
    let pullDistance = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isPulling) {
        pullDistance = e.touches[0].clientY - startY;
        
        if (pullDistance > 0 && window.scrollY === 0) {
          e.preventDefault();
          document.body.style.transform = `translateY(${Math.min(pullDistance / 2, 60)}px)`;
        }
      }
    };
    
    const handleTouchEnd = async () => {
      if (isPulling && pullDistance > 80) {
        await callback();
      }
      
      document.body.style.transform = '';
      isPulling = false;
      pullDistance = 0;
    };
    
    document.addEventListener('touchstart', handleTouchStart as any);
    document.addEventListener('touchmove', handleTouchMove as any);
    document.addEventListener('touchend', handleTouchEnd as any);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart as any);
      document.removeEventListener('touchmove', handleTouchMove as any);
      document.removeEventListener('touchend', handleTouchEnd as any);
    };
  },
};

// Default instances
export const defaultTouchManager = new TouchEventManager();
export const defaultViewportManager = new MobileViewportManager();
export const defaultTouchOptimizer = new TouchTargetOptimizer();
export const defaultPerformanceOptimizer = new MobilePerformanceOptimizer();

export default {
  mobileDetection,
  TouchEventManager,
  MobileViewportManager,
  TouchTargetOptimizer,
  MobilePerformanceOptimizer,
  useMobileViewport,
  useTouchEvents,
  useMobileOptimization,
  mobileUtils,
};
