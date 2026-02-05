'use client';

// Code Splitting Utilities for Lumo Platform
import React, { lazy, Suspense, ComponentType, useState, useEffect } from 'react';

// Route configuration interface
export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
  fallback?: ComponentType<any>;
  preload?: boolean;
  priority?: 'high' | 'medium' | 'low';
  chunkName?: string;
}

// Code splitting manager
export class CodeSplittingManager {
  private static instance: CodeSplittingManager;
  private routes: Map<string, RouteConfig> = new Map();
  private preloadedChunks: Set<string> = new Set();
  private loadingChunks: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): CodeSplittingManager {
    if (!CodeSplittingManager.instance) {
      CodeSplittingManager.instance = new CodeSplittingManager();
    }
    return CodeSplittingManager.instance;
  }

  // Add route configuration
  public addRoute(config: RouteConfig): void {
    this.routes.set(config.path, config);
    
    if (config.preload) {
      this.preloadRoute(config.path);
    }
  }

  // Get route configuration
  public getRoute(path: string): RouteConfig | undefined {
    return this.routes.get(path);
  }

  // Get all routes
  public getAllRoutes(): RouteConfig[] {
    return Array.from(this.routes.values());
  }

  // Preload route
  public preloadRoute(path: string): void {
    const config = this.routes.get(path);
    if (!config || this.preloadedChunks.has(config.chunkName || path)) {
      return;
    }

    this.loadingChunks.add(config.chunkName || path);
    
    // Dynamically import the component
    import(`../pages/${config.chunkName || path}`).then(() => {
      this.preloadedChunks.add(config.chunkName || path);
      this.loadingChunks.delete(config.chunkName || path);
    }).catch(error => {
      console.warn(`Failed to preload route: ${path}`, error);
      this.loadingChunks.delete(config.chunkName || path);
    });
  }

  // Preload multiple routes
  public preloadRoutes(paths: string[]): void {
    paths.forEach(path => this.preloadRoute(path));
  }

  // Check if chunk is preloaded
  public isPreloaded(path: string): boolean {
    return this.preloadedChunks.has(path);
  }

  // Check if chunk is loading
  public isLoading(path: string): boolean {
    return this.loadingChunks.has(path);
  }

  // Get preloading status
  public getPreloadingStatus(): {
    total: number;
    preloaded: number;
    loading: number;
    pending: number;
  } {
    const total = this.routes.size;
    const preloaded = this.preloadedChunks.size;
    const loading = this.loadingChunks.size;
    const pending = total - preloaded - loading;

    return { total, preloaded, loading, pending };
  }

  // Clear preloaded chunks
  public clearPreloadedChunks(): void {
    this.preloadedChunks.clear();
  }
}

// Lazy loading utilities
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ComponentType<any>
): ComponentType<any> => {
  const LazyComponent = lazy(importFunc);
  
  return function LazyWrapper(props: any) {
    return React.createElement(
      Suspense,
      { fallback: fallback ? React.createElement(fallback) : React.createElement('div', null, 'Loading...') },
      React.createElement(LazyComponent, props)
    );
  };
};

// Route lazy loading with error boundary
export const createLazyRoute = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ComponentType<any>,
  errorFallback?: ComponentType<{ error: Error; retry: () => void }>
): ComponentType<any> => {
  const LazyComponent = lazy(importFunc);
  
  return function LazyRouteWrapper(props: any) {
    return React.createElement(
      'div',
      null,
      React.createElement(
        Suspense,
        { fallback: fallback ? React.createElement(fallback) : React.createElement('div', null, 'Loading...') },
        React.createElement(
          ErrorBoundary,
          { fallback: errorFallback, children: React.createElement(LazyComponent, props) }
        )
      )
    );
  };
};

// Error boundary for lazy loaded components
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: ComponentType<{ error: Error; retry: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.props.fallback) {
      const FallbackComponent = this.props.fallback;
      return React.createElement(FallbackComponent, { error: this.state.error!, retry: this.retry });
    }

    if (this.state.hasError) {
      return React.createElement('div', null,
        React.createElement('h2', null, 'Something went wrong.'),
        React.createElement('button', { onClick: this.retry }, 'Try again')
      );
    }

    return this.props.children;
  }
}

// Preloading strategies
export const preloadingStrategies = {
  // Preload critical routes immediately
  preloadCritical: (routes: string[]) => {
    const manager = CodeSplittingManager.getInstance();
    manager.preloadRoutes(routes);
  },

  // Preload routes on idle
  preloadOnIdle: (routes: string[]) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const manager = CodeSplittingManager.getInstance();
        manager.preloadRoutes(routes);
      });
    }
  },

  // Preload routes on hover
  preloadOnHover: (path: string) => {
    const manager = CodeSplittingManager.getInstance();
    if (!manager.isPreloaded(path) && !manager.isLoading(path)) {
      setTimeout(() => {
        manager.preloadRoute(path);
      }, 100);
    }
  },

  // Preload routes on intersection
  preloadOnIntersection: (path: string, element: HTMLElement) => {
    const manager = CodeSplittingManager.getInstance();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            manager.preloadRoute(path);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
  },

  // Preload routes on network change
  preloadOnNetworkChange: (routes: string[]) => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const handleNetworkChange = () => {
        if (connection.effectiveType === '4g') {
          const manager = CodeSplittingManager.getInstance();
          manager.preloadRoutes(routes);
        }
      };

      connection.addEventListener('change', handleNetworkChange);
    }
  },
};

// React hooks
export const useCodeSplitting = () => {
  const manager = CodeSplittingManager.getInstance();
  const [status, setStatus] = useState(manager.getPreloadingStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(manager.getPreloadingStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, [manager]);

  return {
    status,
    addRoute: (config: RouteConfig) => manager.addRoute(config),
    getRoute: (path: string) => manager.getRoute(path),
    preloadRoute: (path: string) => manager.preloadRoute(path),
    preloadRoutes: (paths: string[]) => manager.preloadRoutes(paths),
    isPreloaded: (path: string) => manager.isPreloaded(path),
    isLoading: (path: string) => manager.isLoading(path),
    clearPreloadedChunks: () => manager.clearPreloadedChunks(),
  };
};

// Default instance
export const defaultCodeSplittingManager = CodeSplittingManager.getInstance();

export default {
  CodeSplittingManager,
  createLazyComponent,
  createLazyRoute,
  preloadingStrategies,
  useCodeSplitting,
  defaultCodeSplittingManager,
};
