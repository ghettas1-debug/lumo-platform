// HomePage Performance Tests
// Comprehensive performance tests for the HomePage component

import { test, expect, type Page } from '@playwright/test';

test.describe('HomePage Performance Tests', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/');
  });

  test('should load within performance budget', async ({ page }: { page: Page }) => {
    // Start performance monitoring
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0,
        largestContentfulPaint: 0, // Will be measured separately
      };
    });

    // Performance budgets
    expect(performanceMetrics.domContentLoaded).toBeLessThan(3000); // 3s
    expect(performanceMetrics.loadComplete).toBeLessThan(5000); // 5s
    expect(performanceMetrics.firstPaint).toBeLessThan(1000); // 1s
    expect(performanceMetrics.firstContentfulPaint).toBeLessThan(1500); // 1.5s
  });

  test('should have good Core Web Vitals', async ({ page }: { page: Page }) => {
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Get Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {};

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const entry = entries[0] as any;
          if (entry && entry.processingStart) {
            vitals.fid = entry.processingStart - entry.startTime;
          }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          vitals.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });

        // Wait a bit for metrics to be collected
        setTimeout(() => resolve(vitals), 3000);
      });
    });

    // Core Web Vitals thresholds
    const vitals = webVitals as any;
    expect(vitals.lcp).toBeLessThan(2500); // 2.5s
    expect(vitals.fid).toBeLessThan(100); // 100ms
    expect(vitals.cls).toBeLessThan(0.1); // 0.1
  });

  test('should have efficient bundle size', async ({ page }: { page: Page }) => {
    // Monitor network requests
    const resources: any[] = [];
    page.on('response', (response) => {
      resources.push({
        url: response.url(),
        size: response.headers()['content-length'] || 0,
        type: response.request().resourceType(),
      });
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Calculate total bundle size
    const jsSize = resources
      .filter(r => r.type === 'script')
      .reduce((total, r) => total + parseInt(r.size || 0), 0);

    const cssSize = resources
      .filter(r => r.type === 'stylesheet')
      .reduce((total, r) => total + parseInt(r.size || 0), 0);

    const imageSize = resources
      .filter(r => r.type === 'image')
      .reduce((total, r) => total + parseInt(r.size || 0), 0);

    // Bundle size budgets (in bytes)
    expect(jsSize).toBeLessThan(500000); // 500KB
    expect(cssSize).toBeLessThan(100000); // 100KB
    expect(imageSize).toBeLessThan(1000000); // 1MB
  });

  test('should have minimal render blocking resources', async ({ page }: { page: Page }) => {
    const renderBlockingResources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return resources
        .filter(r => r.initiatorType === 'script' || r.initiatorType === 'stylesheet')
        .filter(r => !r.name.includes('async') && !r.name.includes('defer'))
        .map(r => ({
          name: r.name,
          type: r.initiatorType,
          size: r.transferSize,
          duration: r.duration,
        }));
    });

    // Should have minimal render blocking resources
    expect(renderBlockingResources.length).toBeLessThan(10);
    
    // Render blocking resources should be small
    renderBlockingResources.forEach(resource => {
      expect(resource.size).toBeLessThan(50000); // 50KB
      expect(resource.duration).toBeLessThan(100); // 100ms
    });
  });

  test('should have efficient image loading', async ({ page }: { page: Page }) => {
    const imageMetrics = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map(img => ({
        src: img.src,
        loading: img.getAttribute('loading'),
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
      }));
    });

    // Check for lazy loading
    const lazyLoadedImages = imageMetrics.filter(img => img.loading === 'lazy');
    const aboveFoldImages = imageMetrics.filter(img => {
      const rect = document.querySelector(`img[src="${img.src}"]`)?.getBoundingClientRect();
      return rect && rect.top < window.innerHeight;
    });

    // Above-fold images should not be lazy loaded
    const lazyAboveFold = aboveFoldImages.filter(img => img.loading === 'lazy');
    expect(lazyAboveFold.length).toBe(0);

    // Below-fold images should be lazy loaded
    const belowFoldImages = imageMetrics.filter(img => {
      const rect = document.querySelector(`img[src="${img.src}"]`)?.getBoundingClientRect();
      return rect && rect.top >= window.innerHeight;
    });
    const lazyBelowFold = belowFoldImages.filter(img => img.loading === 'lazy');
    expect(lazyBelowFold.length).toBeGreaterThan(belowFoldImages.length * 0.8); // 80% should be lazy loaded
  });

  test('should have smooth scrolling performance', async ({ page }: { page: Page }) => {
    const scrollMetrics = await page.evaluate(async () => {
      const metrics = {
        scrollDuration: 0,
        frameDrops: 0,
        totalFrames: 0,
      };

      const startTime = performance.now();
      let lastFrameTime = startTime;

      // Scroll down the page
      window.scrollTo({ top: 1000, behavior: 'smooth' });

      // Monitor frame rate during scroll
      const monitorFrames = () => {
        const currentTime = performance.now();
        const frameDuration = currentTime - lastFrameTime;
        
        if (frameDuration > 16.67) { // 60fps threshold
          metrics.frameDrops++;
        }
        
        metrics.totalFrames++;
        lastFrameTime = currentTime;

        if (currentTime - startTime < 1000) { // Monitor for 1 second
          requestAnimationFrame(monitorFrames);
        } else {
          metrics.scrollDuration = currentTime - startTime;
        }
      };

      requestAnimationFrame(monitorFrames);
      
      // Wait for scroll to complete
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return metrics;
    });

    // Scroll performance metrics
    expect(scrollMetrics.scrollDuration).toBeLessThan(1000); // 1s
    expect(scrollMetrics.frameDrops / scrollMetrics.totalFrames).toBeLessThan(0.1); // Less than 10% frame drops
  });

  test('should have efficient animation performance', async ({ page }: { page: Page }) => {
    const animationMetrics = await page.evaluate(async () => {
      const metrics = {
        animationDuration: 0,
        frameDrops: 0,
        totalFrames: 0,
      };

      // Find animated elements
      const animatedElements = document.querySelectorAll('[class*="animate"], [class*="motion"], [class*="transition"]');
      
      if (animatedElements.length === 0) {
        return metrics;
      }

      const startTime = performance.now();
      let lastFrameTime = startTime;

      // Trigger animations
      animatedElements.forEach(el => {
        el.classList.add('animate');
      });

      // Monitor frame rate during animations
      const monitorFrames = () => {
        const currentTime = performance.now();
        const frameDuration = currentTime - lastFrameTime;
        
        if (frameDuration > 16.67) { // 60fps threshold
          metrics.frameDrops++;
        }
        
        metrics.totalFrames++;
        lastFrameTime = currentTime;

        if (currentTime - startTime < 2000) { // Monitor for 2 seconds
          requestAnimationFrame(monitorFrames);
        } else {
          metrics.animationDuration = currentTime - startTime;
        }
      };

      requestAnimationFrame(monitorFrames);
      
      // Wait for animations to complete
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      return metrics;
    });

    // Animation performance metrics
    expect(animationMetrics.animationDuration).toBeLessThan(2000); // 2s
    expect(animationMetrics.frameDrops / animationMetrics.totalFrames).toBeLessThan(0.1); // Less than 10% frame drops
  });

  test('should have efficient memory usage', async ({ page }: { page: Page }) => {
    const memoryMetrics = await page.evaluate(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        return {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          memoryUsageRatio: memory.usedJSHeapSize / memory.jsHeapSizeLimit,
        };
      }
      return null;
    });

    if (memoryMetrics) {
      // Memory usage should be reasonable
      expect(memoryMetrics.memoryUsageRatio).toBeLessThan(0.5); // Less than 50% of limit
      expect(memoryMetrics.usedJSHeapSize).toBeLessThan(100 * 1024 * 1024); // Less than 100MB
    }
  });

  test('should have efficient network usage', async ({ page }: { page: Page }) => {
    const networkMetrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return {
        totalRequests: resources.length,
        totalSize: resources.reduce((total, r) => total + r.transferSize, 0),
        totalDuration: resources.reduce((total, r) => total + r.duration, 0),
        averageDuration: resources.reduce((total, r) => total + r.duration, 0) / resources.length,
        slowRequests: resources.filter(r => r.duration > 1000).length,
        largeRequests: resources.filter(r => r.transferSize > 100000).length,
      };
    });

    // Network performance metrics
    expect(networkMetrics.totalRequests).toBeLessThan(50); // Less than 50 requests
    expect(networkMetrics.totalSize).toBeLessThan(2 * 1024 * 1024); // Less than 2MB
    expect(networkMetrics.averageDuration).toBeLessThan(500); // Less than 500ms average
    expect(networkMetrics.slowRequests).toBeLessThan(5); // Less than 5 slow requests
    expect(networkMetrics.largeRequests).toBeLessThan(10); // Less than 10 large requests
  });

  test('should have efficient DOM complexity', async ({ page }: { page: Page }) => {
    const domMetrics = await page.evaluate(() => {
      const countNodes = (root: Element, selector: string) => {
        return root.querySelectorAll(selector).length;
      };

      return {
        totalElements: document.querySelectorAll('*').length,
        totalNodes: document.querySelectorAll('*').length,
        maxDepth: getMaxDepth(document.documentElement),
        domSize: JSON.stringify(document.documentElement).length,
        scriptElements: countNodes(document.documentElement, 'script'),
        styleElements: countNodes(document.documentElement, 'style'),
        linkElements: countNodes(document.documentElement, 'link'),
        imgElements: countNodes(document.documentElement, 'img'),
        buttonElements: countNodes(document.documentElement, 'button'),
        divElements: countNodes(document.documentElement, 'div'),
      };
    });

    function getMaxDepth(element: Element, depth = 0): number {
      let maxDepth = depth;
      for (const child of element.children) {
        const childDepth = getMaxDepth(child, depth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
      return maxDepth;
    }

    // DOM complexity metrics
    expect(domMetrics.totalElements).toBeLessThan(1000); // Less than 1000 elements
    expect(domMetrics.maxDepth).toBeLessThan(20); // Less than 20 levels deep
    expect(domMetrics.domSize).toBeLessThan(500000); // Less than 500KB DOM size
    expect(domMetrics.divElements).toBeLessThan(200); // Less than 200 divs
  });

  test('should have efficient CSS complexity', async ({ page }: { page: Page }) => {
    const cssMetrics = await page.evaluate(() => {
      const stylesheets = Array.from(document.styleSheets);
      let totalRules = 0;
      let totalSelectors = 0;

      stylesheets.forEach(sheet => {
        try {
          const rules = sheet.cssRules || sheet.rules;
          totalRules += rules.length;
          
          for (let i = 0; i < rules.length; i++) {
            const rule = rules[i] as any;
            if (rule.selectorText) {
              totalSelectors += rule.selectorText.split(',').length;
            }
          }
        } catch (e) {
          // Cross-origin stylesheets
        }
      });

      return {
        totalStylesheets: stylesheets.length,
        totalRules,
        totalSelectors,
        averageRulesPerStylesheet: totalRules / stylesheets.length,
        inlineStyles: document.querySelectorAll('[style]').length,
      };
    });

    // CSS complexity metrics
    expect(cssMetrics.totalStylesheets).toBeLessThan(10); // Less than 10 stylesheets
    expect(cssMetrics.totalRules).toBeLessThan(1000); // Less than 1000 rules
    expect(cssMetrics.totalSelectors).toBeLessThan(5000); // Less than 5000 selectors
    expect(cssMetrics.inlineStyles).toBeLessThan(50); // Less than 50 inline styles
  });

  test('should have efficient JavaScript execution', async ({ page }: { page: Page }) => {
    const jsMetrics = await page.evaluate(() => {
      const startTime = performance.now();
      
      // Simulate some JavaScript work
      const result = Array.from({ length: 10000 }, (_, i) => i * 2).reduce((sum, num) => sum + num, 0);
      
      const endTime = performance.now();
      
      return {
        executionTime: endTime - startTime,
        result,
      };
    });

    // JavaScript execution should be fast
    expect(jsMetrics.executionTime).toBeLessThan(100); // Less than 100ms
  });

  test('should have efficient reflow and repaint', async ({ page }: { page: Page }) => {
    const reflowMetrics = await page.evaluate(async () => {
      const metrics = {
        reflowCount: 0,
        repaintCount: 0,
        reflowDuration: 0,
        repaintDuration: 0,
      };

      // Monitor reflows and repaints
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('reflow')) {
            metrics.reflowCount++;
            metrics.reflowDuration += entry.duration;
          } else if (entry.name.includes('paint')) {
            metrics.repaintCount++;
            metrics.repaintDuration += entry.duration;
          }
        }
      });

      observer.observe({ entryTypes: ['measure', 'paint'] });

      // Trigger some DOM changes
      const elements = document.querySelectorAll('.course-card');
      elements.forEach((el, index) => {
        el.setAttribute('data-test', index.toString());
      });

      // Wait a bit for measurements
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      observer.disconnect();
      
      return metrics;
    });

    // Reflow and repaint metrics
    expect(reflowMetrics.reflowCount).toBeLessThan(10); // Less than 10 reflows
    expect(reflowMetrics.repaintCount).toBeLessThan(20); // Less than 20 repaints
    expect(reflowMetrics.reflowDuration).toBeLessThan(100); // Less than 100ms total reflow time
    expect(reflowMetrics.repaintDuration).toBeLessThan(200); // Less than 200ms total repaint time
  });

  test('should have efficient event handling', async ({ page }: { page: Page }) => {
    const eventMetrics = await page.evaluate(() => {
      const metrics = {
        eventListeners: 0,
        passiveListeners: 0,
        activeListeners: 0,
      };

      // Count event listeners (approximate)
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const listeners = (el as any)._eventListeners || [];
        metrics.eventListeners += listeners.length;
        
        listeners.forEach((listener: any) => {
          if (listener.passive) {
            metrics.passiveListeners++;
          }
          if (listener.active) {
            metrics.activeListeners++;
          }
        });
      });

      return metrics;
    });

    // Event handling metrics
    expect(eventMetrics.eventListeners).toBeLessThan(100); // Less than 100 event listeners
    expect(eventMetrics.passiveListeners / eventMetrics.eventListeners).toBeGreaterThan(0.5); // At least 50% passive
  });

  test('should have efficient accessibility tree', async ({ page }: { page: Page }) => {
    const a11yMetrics = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let accessibleElements = 0;
      let elementsWithAria = 0;
      let elementsWithRole = 0;

      elements.forEach(el => {
        const hasAccessibleName = 
          el.tagName === 'BUTTON' ||
          el.tagName === 'INPUT' ||
          el.tagName === 'SELECT' ||
          el.tagName === 'TEXTAREA' ||
          el.tagName === 'A' ||
          el.hasAttribute('aria-label') ||
          el.hasAttribute('aria-labelledby') ||
          el.textContent?.trim();

        if (hasAccessibleName) {
          accessibleElements++;
        }

        if (el.hasAttribute('aria-')) {
          elementsWithAria++;
        }

        if (el.hasAttribute('role')) {
          elementsWithRole++;
        }
      });

      return {
        totalElements: elements.length,
        accessibleElements,
        elementsWithAria,
        elementsWithRole,
        accessibilityRatio: accessibleElements / elements.length,
      };
    });

    // Accessibility tree metrics
    expect(a11yMetrics.accessibilityRatio).toBeGreaterThan(0.3); // At least 30% accessible
    expect(a11yMetrics.elementsWithAria).toBeLessThan(100); // Less than 100 ARIA attributes
    expect(a11yMetrics.elementsWithRole).toBeLessThan(50); // Less than 50 role attributes
  });

  test('should have efficient caching', async ({ page }: { page: Page }) => {
    const cacheMetrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return {
        cachedResources: resources.filter(r => r.transferSize === 0).length,
        totalResources: resources.length,
        cacheHitRatio: resources.filter(r => r.transferSize === 0).length / resources.length,
      };
    });

    // Caching metrics
    expect(cacheMetrics.cacheHitRatio).toBeGreaterThan(0.3); // At least 30% cache hit ratio
    expect(cacheMetrics.cachedResources).toBeGreaterThan(5); // At least 5 cached resources
  });

  test('should have efficient third-party resources', async ({ page }: { page: Page }) => {
    const thirdPartyMetrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const thirdPartyResources = resources.filter(r => {
        const url = new URL(r.name);
        return !url.hostname.includes(window.location.hostname);
      });

      return {
        totalThirdParty: thirdPartyResources.length,
        totalThirdPartySize: thirdPartyResources.reduce((total, r) => total + r.transferSize, 0),
        averageThirdPartyDuration: thirdPartyResources.reduce((total, r) => total + r.duration, 0) / thirdPartyResources.length,
      };
    });

    // Third-party resource metrics
    expect(thirdPartyMetrics.totalThirdParty).toBeLessThan(10); // Less than 10 third-party resources
    expect(thirdPartyMetrics.totalThirdPartySize).toBeLessThan(500000); // Less than 500KB
    expect(thirdPartyMetrics.averageThirdPartyDuration).toBeLessThan(1000); // Less than 1s average
  });
});
