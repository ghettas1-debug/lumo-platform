'use client';

import React, { Suspense, lazy } from 'react';

// Performance-optimized lazy loading with error boundaries
const createLazyComponent = (importFunc: () => Promise<any>, fallback: React.ReactNode) => {
  return lazy(() => 
    importFunc().catch(error => {
      console.error('Component loading failed:', error);
      // Return a fallback component
      return Promise.resolve({ 
        default: () => fallback 
      });
    })
  );
};

// Skeleton Loading Components
export const CourseCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 animate-pulse">
    <div className="container mx-auto px-6 pt-20">
      <div className="text-center space-y-8">
        <div className="h-16 bg-gray-200 rounded-lg mx-auto max-w-4xl"></div>
        <div className="h-8 bg-gray-200 rounded-lg mx-auto max-w-2xl"></div>
        <div className="h-12 bg-gray-200 rounded-lg mx-auto w-48"></div>
      </div>
    </div>
  </div>
);

export const StatsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="text-center">
        <div className="h-8 bg-gray-200 rounded mx-auto mb-2 w-20"></div>
        <div className="h-4 bg-gray-200 rounded mx-auto w-16"></div>
      </div>
    ))}
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">حدث خطأ ما</h3>
              <p className="text-gray-600">يرجى المحاولة مرة أخرى</p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Optimized Component Wrapper
export const OptimizedComponent: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ children, fallback, className }) => (
  <ErrorBoundary fallback={fallback}>
    <Suspense fallback={fallback || <div className="animate-pulse bg-gray-200 rounded-lg h-32" />}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  </ErrorBoundary>
);

// Performance Monitoring Hook
export const usePerformanceMonitor = (componentName: string) => {
  React.useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 100) { // Log slow renders
        console.warn(`Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);
};

// Intersection Observer Hook for lazy loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
};

// Image Optimization Component
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}> = ({ src, alt, className, width, height, priority = false }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const isIntersecting = useIntersectionObserver(imgRef as React.RefObject<Element>, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  React.useEffect(() => {
    if (!isIntersecting || !imgRef.current) return;

    const img = imgRef.current;
    
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);

    if (priority) {
      img.loading = 'eager';
    } else {
      img.loading = 'lazy';
    }
  }, [isIntersecting, priority]);

  if (hasError) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ width, height }}
      />
    </div>
  );
};

// Debounce Hook
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle Hook
export const useThrottle = <T,>(value: T, delay: number): T => {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const lastExecuted = React.useRef<number>(Date.now());

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastExecuted.current >= delay) {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }
    }, delay - (Date.now() - lastExecuted.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return throttledValue;
};

// Virtual Scroll Hook (for large lists)
export const useVirtualScroll = (
  items: any[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length - 1
  );

  const visibleItems = items.slice(visibleStart, visibleEnd + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll
  };
};

export default {
  CourseCardSkeleton,
  HeroSkeleton,
  StatsSkeleton,
  CategoryCardSkeleton,
  ErrorBoundary,
  OptimizedComponent,
  usePerformanceMonitor,
  useIntersectionObserver,
  OptimizedImage,
  useDebounce,
  useThrottle,
  useVirtualScroll,
  createLazyComponent
};
