// PerformanceOptimizer Component Unit Tests
// Comprehensive unit tests for the PerformanceOptimizer component

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import PerformanceOptimizer from '../../components/PerformanceOptimizer';

// Mock performance APIs
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
  },
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  callback,
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  callback,
}));

describe('PerformanceOptimizer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render performance optimizer correctly', () => {
    render(<PerformanceOptimizer />);
    
    const optimizer = screen.getByTestId('performance-optimizer');
    expect(optimizer).toBeInTheDocument();
  });

  it('should initialize performance monitoring', () => {
    render(<PerformanceOptimizer />);
    
    expect(window.performance.mark).toHaveBeenCalledWith('optimizer-init');
    expect(window.performance.mark).toHaveBeenCalledWith('optimizer-ready');
  });

  it('should monitor component render performance', async () => {
    render(<PerformanceOptimizer />);
    
    await waitFor(() => {
      expect(window.performance.measure).toHaveBeenCalledWith(
        'optimizer-render',
        'optimizer-init',
        'optimizer-ready'
      );
    });
  });

  it('should implement lazy loading for heavy components', () => {
    render(<PerformanceOptimizer />);
    
    const lazyComponent = screen.queryByTestId('heavy-component');
    expect(lazyComponent).not.toBeInTheDocument();
  });

  it('should load heavy components when in viewport', async () => {
    const mockCallback = vi.fn();
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn((element) => {
        // Simulate element entering viewport
        callback([{ isIntersecting: true, target: element }]);
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      callback,
    }));

    render(<PerformanceOptimizer />);
    
    await waitFor(() => {
      expect(screen.getByTestId('heavy-component')).toBeInTheDocument();
    });
  });

  it('should implement code splitting', () => {
    render(<PerformanceOptimizer />);
    
    const codeSplitIndicator = screen.getByTestId('code-split-indicator');
    expect(codeSplitIndicator).toBeInTheDocument();
  });

  it('should optimize images with lazy loading', () => {
    render(<PerformanceOptimizer />);
    
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('should implement virtual scrolling for large lists', () => {
    render(<PerformanceOptimizer />);
    
    const virtualList = screen.getByTestId('virtual-list');
    expect(virtualList).toBeInTheDocument();
  });

  it('should debounce scroll events', async () => {
    render(<PerformanceOptimizer />);
    
    const scrollContainer = screen.getByTestId('scroll-container');
    
    // Simulate multiple scroll events
    for (let i = 0; i < 10; i++) {
      fireEvent.scroll(scrollContainer, { target: { scrollTop: i * 100 } });
    }
    
    // Should only call scroll handler once due to debouncing
    await waitFor(() => {
      expect(screen.getByTestId('scroll-count')).toHaveTextContent('1');
    });
  });

  it('should implement memoization for expensive calculations', () => {
    render(<PerformanceOptimizer />);
    
    const calculateButton = screen.getByTestId('calculate-button');
    
    // Click multiple times
    fireEvent.click(calculateButton);
    fireEvent.click(calculateButton);
    fireEvent.click(calculateButton);
    
    // Should only calculate once due to memoization
    expect(screen.getByTestId('calculation-count')).toHaveTextContent('1');
  });

  it('should optimize bundle size with dynamic imports', async () => {
    render(<PerformanceOptimizer />);
    
    const dynamicImportButton = screen.getByTestId('dynamic-import-button');
    fireEvent.click(dynamicImportButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dynamic-content')).toBeInTheDocument();
    });
  });

  it('should implement requestAnimationFrame for smooth animations', () => {
    const mockRAF = vi.fn((callback) => setTimeout(callback, 16));
    global.requestAnimationFrame = mockRAF;
    
    render(<PerformanceOptimizer />);
    
    const animateButton = screen.getByTestId('animate-button');
    fireEvent.click(animateButton);
    
    expect(mockRAF).toHaveBeenCalled();
  });

  it('should use Web Workers for heavy computations', async () => {
    const mockWorker = {
      postMessage: vi.fn(),
      terminate: vi.fn(),
      addEventListener: vi.fn(),
    };
    global.Worker = vi.fn(() => mockWorker);
    
    render(<PerformanceOptimizer />);
    
    const computeButton = screen.getByTestId('compute-button');
    fireEvent.click(computeButton);
    
    expect(global.Worker).toHaveBeenCalled();
  });

  it('should implement caching for computed results', () => {
    render(<PerformanceOptimizer />);
    
    const cacheButton = screen.getByTestId('cache-button');
    
    // First call should compute
    fireEvent.click(cacheButton);
    expect(screen.getByTestId('cache-status')).toHaveTextContent('computed');
    
    // Second call should use cache
    fireEvent.click(cacheButton);
    expect(screen.getByTestId('cache-status')).toHaveTextContent('cached');
  });

  it('should optimize re-renders with React.memo', () => {
    const { rerender } = render(<PerformanceOptimizer />);
    
    const renderCount = screen.getByTestId('render-count');
    expect(renderCount).toHaveTextContent('1');
    
    // Rerender with same props
    rerender(<PerformanceOptimizer />);
    expect(renderCount).toHaveTextContent('1'); // Should not re-render
    
    // Rerender with different props
    rerender(<PerformanceOptimizer priority="high" />);
    expect(renderCount).toHaveTextContent('2'); // Should re-render
  });

  it('should implement intersection observer for visibility detection', () => {
    render(<PerformanceOptimizer />);
    
    const observedElement = screen.getByTestId('observed-element');
    expect(global.IntersectionObserver).toHaveBeenCalled();
  });

  it('should handle resize events efficiently', async () => {
    render(<PerformanceOptimizer />);
    
    const resizeContainer = screen.getByTestId('resize-container');
    
    // Simulate multiple resize events
    for (let i = 0; i < 10; i++) {
      fireEvent.resize(resizeContainer);
    }
    
    // Should only handle once due to debouncing
    await waitFor(() => {
      expect(screen.getByTestId('resize-count')).toHaveTextContent('1');
    });
  });

  it('should implement progressive image loading', () => {
    render(<PerformanceOptimizer />);
    
    const progressiveImage = screen.getByTestId('progressive-image');
    expect(progressiveImage).toHaveAttribute('srcset');
    expect(progressiveImage).toHaveAttribute('sizes');
  });

  it('should optimize font loading', () => {
    render(<PerformanceOptimizer />);
    
    const fontLink = screen.getByTestId('font-link');
    expect(fontLink).toHaveAttribute('rel', 'preload');
    expect(fontLink).toHaveAttribute('as', 'font');
  });

  it('should implement service worker caching', () => {
    render(<PerformanceOptimizer />);
    
    const swIndicator = screen.getByTestId('sw-indicator');
    expect(swIndicator).toBeInTheDocument();
    expect(swIndicator).toHaveTextContent('Service Worker Active');
  });

  it('should monitor performance metrics', async () => {
    render(<PerformanceOptimizer />);
    
    await waitFor(() => {
      const metrics = screen.getByTestId('performance-metrics');
      expect(metrics).toBeInTheDocument();
      
      expect(screen.getByTestId('fps-metric')).toBeInTheDocument();
      expect(screen.getByTestId('memory-metric')).toBeInTheDocument();
      expect(screen.getByTestId('network-metric')).toBeInTheDocument();
    });
  });

  it('should implement error boundaries for performance failures', () => {
    render(<PerformanceOptimizer />);
    
    const errorButton = screen.getByTestId('trigger-error');
    fireEvent.click(errorButton);
    
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it('should support performance profiling in development', () => {
    process.env.NODE_ENV = 'development';
    
    render(<PerformanceOptimizer />);
    
    const profiler = screen.getByTestId('performance-profiler');
    expect(profiler).toBeInTheDocument();
  });

  it('should disable performance optimizations in test environment', () => {
    process.env.NODE_ENV = 'test';
    
    render(<PerformanceOptimizer />);
    
    const optimizations = screen.getByTestId('optimizations-disabled');
    expect(optimizations).toBeInTheDocument();
  });

  it('should implement adaptive loading based on network speed', async () => {
    // Mock slow network
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: 'slow-2g',
        saveData: true,
      },
      writable: true,
    });

    render(<PerformanceOptimizer />);
    
    await waitFor(() => {
      const networkIndicator = screen.getByTestId('network-indicator');
      expect(networkIndicator).toHaveTextContent('Slow Network Detected');
    });
  });

  it('should implement resource hints for prefetching', () => {
    render(<PerformanceOptimizer />);
    
    const prefetchLink = screen.getByTestId('prefetch-link');
    expect(prefetchLink).toHaveAttribute('rel', 'prefetch');
  });

  it('should optimize critical rendering path', async () => {
    render(<PerformanceOptimizer />);
    
    await waitFor(() => {
      const criticalCSS = screen.getByTestId('critical-css');
      expect(criticalCSS).toBeInTheDocument();
      expect(criticalCSS).toHaveAttribute('media', 'print');
    });
  });

  it('should implement skeleton loading for async content', () => {
    render(<PerformanceOptimizer />);
    
    const skeleton = screen.getByTestId('skeleton-loader');
    expect(skeleton).toBeInTheDocument();
  });

  it('should handle performance degradation gracefully', async () => {
    // Mock performance degradation
    vi.mocked(window.performance.now).mockReturnValue(1000);
    
    render(<PerformanceOptimizer />);
    
    await waitFor(() => {
      const degradationWarning = screen.getByTestId('performance-warning');
      expect(degradationWarning).toBeInTheDocument();
    });
  });

  it('should implement analytics for performance tracking', () => {
    const mockAnalytics = {
      track: vi.fn(),
      timing: vi.fn(),
    };
    global.analytics = mockAnalytics;
    
    render(<PerformanceOptimizer />);
    
    expect(mockAnalytics.timing).toHaveBeenCalledWith('optimizer', 'load', expect.any(Number), expect.any(Number));
  });

  it('should support performance budgeting', () => {
    render(<PerformanceOptimizer />);
    
    const budgetIndicator = screen.getByTestId('budget-indicator');
    expect(budgetIndicator).toBeInTheDocument();
    expect(budgetIndicator).toHaveTextContent('Within Budget');
  });

  it('should implement automatic performance optimization', async () => {
    render(<PerformanceOptimizer />);
    
    await waitFor(() => {
      const autoOptimize = screen.getByTestId('auto-optimize');
      expect(autoOptimize).toBeInTheDocument();
      expect(autoOptimize).toHaveAttribute('data-optimized', 'true');
    });
  });
});
