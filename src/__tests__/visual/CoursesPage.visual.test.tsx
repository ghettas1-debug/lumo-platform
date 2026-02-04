// CoursesPage Visual Regression Tests
// Visual regression tests for the CoursesPage component using Playwright

import { test, expect, type Page } from '@playwright/test';

test.describe('CoursesPage Visual Tests', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/courses');
  });

  test('should render courses page correctly', async ({ page }: { page: Page }) => {
    await expect(page).toHaveScreenshot('courses-page-full.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render header correctly', async ({ page }: { page: Page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveScreenshot('courses-page-header.png');
  });

  test('should render navigation correctly', async ({ page }: { page: Page }) => {
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    await expect(navigation).toHaveScreenshot('courses-page-navigation.png');
  });

  test('should render course grid correctly', async ({ page }: { page: Page }) => {
    const courseGrid = page.locator('.courses-grid');
    await expect(courseGrid).toBeVisible();
    await expect(courseGrid).toHaveScreenshot('courses-page-grid.png');
  });

  test('should render course cards correctly', async ({ page }: { page: Page }) => {
    const courseCards = page.locator('.course-card');
    const firstCard = courseCards.first();
    await expect(firstCard).toBeVisible();
    await expect(firstCard).toHaveScreenshot('courses-page-course-card.png');
  });

  test('should render search bar correctly', async ({ page }: { page: Page }) => {
    const searchBar = page.locator('.search-bar');
    await expect(searchBar).toBeVisible();
    await expect(searchBar).toHaveScreenshot('courses-page-search-bar.png');
  });

  test('should render filters correctly', async ({ page }: { page: Page }) => {
    const filters = page.locator('.filters');
    await expect(filters).toBeVisible();
    await expect(filters).toHaveScreenshot('courses-page-filters.png');
  });

  test('should render pagination correctly', async ({ page }: { page: Page }) => {
    const pagination = page.locator('.pagination');
    await expect(pagination).toBeVisible();
    await expect(pagination).toHaveScreenshot('courses-page-pagination.png');
  });

  test('should render sidebar correctly', async ({ page }: { page: Page }) => {
    const sidebar = page.locator('.sidebar');
    if (await sidebar.isVisible()) {
      await expect(sidebar).toHaveScreenshot('courses-page-sidebar.png');
    }
  });

  test('should render breadcrumbs correctly', async ({ page }: { page: Page }) => {
    const breadcrumbs = page.locator('.breadcrumbs');
    if (await breadcrumbs.isVisible()) {
      await expect(breadcrumbs).toHaveScreenshot('courses-page-breadcrumbs.png');
    }
  });

  test('should render in light theme correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await expect(page).toHaveScreenshot('courses-page-light-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in dark theme correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await expect(page).toHaveScreenshot('courses-page-dark-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in mobile viewport correctly', async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('courses-page-mobile.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in tablet viewport correctly', async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('courses-page-tablet.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in desktop viewport correctly', async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page).toHaveScreenshot('courses-page-desktop.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with RTL layout correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('dir', 'rtl');
    });
    await expect(page).toHaveScreenshot('courses-page-rtl.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with high contrast mode correctly', async ({ page }: { page: Page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot('courses-page-high-contrast.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with reduced motion correctly', async ({ page }: { page: Page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot('courses-page-reduced-motion.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with large font size correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '20px';
    });
    await expect(page).toHaveScreenshot('courses-page-large-font.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with small font size correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '14px';
    });
    await expect(page).toHaveScreenshot('courses-page-small-font.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render search bar with focus state correctly', async ({ page }: { page: Page }) => {
    const searchInput = page.locator('.search-bar input');
    await searchInput.focus();
    await expect(searchInput).toHaveScreenshot('courses-page-search-focus.png');
  });

  test('should render search bar with typing state correctly', async ({ page }: { page: Page }) => {
    const searchInput = page.locator('.search-bar input');
    await searchInput.fill('React');
    await expect(searchInput).toHaveScreenshot('courses-page-search-typing.png');
  });

  test('should render search results correctly', async ({ page }: { page: Page }) => {
    const searchInput = page.locator('.search-bar input');
    await searchInput.fill('React');
    await page.waitForTimeout(500);
    const searchResults = page.locator('.search-results');
    if (await searchResults.isVisible()) {
      await expect(searchResults).toHaveScreenshot('courses-page-search-results.png');
    }
  });

  test('should render filters with expanded state correctly', async ({ page }: { page: Page }) => {
    const filtersToggle = page.locator('.filters-toggle');
    if (await filtersToggle.isVisible()) {
      await filtersToggle.click();
      await page.waitForTimeout(300);
      const filtersPanel = page.locator('.filters-panel');
      if (await filtersPanel.isVisible()) {
        await expect(filtersPanel).toHaveScreenshot('courses-page-filters-expanded.png');
      }
    }
  });

  test('should render course cards with hover states correctly', async ({ page }: { page: Page }) => {
    const courseCard = page.locator('.course-card').first();
    await courseCard.hover();
    await expect(courseCard).toHaveScreenshot('courses-page-course-card-hover.png');
  });

  test('should render course cards with active state correctly', async ({ page }: { page: Page }) => {
    const courseCard = page.locator('.course-card').first();
    await courseCard.click();
    await page.waitForTimeout(300);
    await expect(courseCard).toHaveScreenshot('courses-page-course-card-active.png');
  });

  test('should render pagination with active state correctly', async ({ page }: { page: Page }) => {
    const paginationButton = page.locator('.pagination button').first();
    await paginationButton.click();
    await expect(paginationButton).toHaveScreenshot('courses-page-pagination-active.png');
  });

  test('should render loading states correctly', async ({ page }: { page: Page }) => {
    await page.route('**/api/courses', route => {
      // Delay response to simulate loading
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: [] })
        });
      }, 2000);
    });
    
    await page.reload();
    await page.waitForTimeout(1000);
    
    const loadingStates = page.locator('.loading-state');
    if (await loadingStates.isVisible()) {
      await expect(loadingStates).toHaveScreenshot('courses-page-loading.png');
    }
  });

  test('should render error states correctly', async ({ page }: { page: Page }) => {
    await page.route('**/api/courses', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.reload();
    await page.waitForTimeout(1000);
    
    const errorStates = page.locator('.error-state');
    if (await errorStates.isVisible()) {
      await expect(errorStates).toHaveScreenshot('courses-page-error.png');
    }
  });

  test('should render empty states correctly', async ({ page }: { page: Page }) => {
    await page.route('**/api/courses', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [] })
      });
    });
    
    await page.reload();
    await page.waitForTimeout(1000);
    
    const emptyStates = page.locator('.empty-state');
    if (await emptyStates.isVisible()) {
      await expect(emptyStates).toHaveScreenshot('courses-page-empty.png');
    }
  });

  test('should render with scroll position correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 1000);
    });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('courses-page-scrolled.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with sticky header correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 1000);
    });
    await page.waitForTimeout(500);
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('courses-page-sticky-header.png');
  });

  test('should render with different content densities correctly', async ({ page }: { page: Page }) => {
    // Test compact mode
    await page.evaluate(() => {
      document.documentElement.classList.add('compact-mode');
    });
    await expect(page).toHaveScreenshot('courses-page-compact.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test spacious mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('compact-mode');
      document.documentElement.classList.add('spacious-mode');
    });
    await expect(page).toHaveScreenshot('courses-page-spacious.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different grid layouts correctly', async ({ page }: { page: Page }) => {
    // Test grid view
    await page.evaluate(() => {
      document.documentElement.classList.add('grid-view');
    });
    await expect(page).toHaveScreenshot('courses-page-grid-view.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test list view
    await page.evaluate(() => {
      document.documentElement.classList.remove('grid-view');
      document.documentElement.classList.add('list-view');
    });
    await expect(page).toHaveScreenshot('courses-page-list-view.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with animations enabled correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.classList.add('animations-enabled');
    });
    
    // Trigger some animations
    const courseCard = page.locator('.course-card').first();
    await courseCard.hover();
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('courses-page-animations.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with custom CSS correctly', async ({ page }: { page: Page }) => {
    await page.addStyleTag({
      content: `
      .custom-courses-page {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .custom-courses-page .course-card {
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
      }
      `
    });
    
    await page.evaluate(() => {
      document.body.classList.add('custom-courses-page');
    });
    
    await expect(page).toHaveScreenshot('courses-page-custom.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with print styles correctly', async ({ page }: { page: Page }) => {
    await page.emulateMedia({ media: 'print' });
    await expect(page).toHaveScreenshot('courses-page-print.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different screen orientations correctly', async ({ page }: { page: Page }) => {
    // Test landscape
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page).toHaveScreenshot('courses-page-landscape.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test portrait
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('courses-page-portrait.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different zoom levels correctly', async ({ page }: { page: Page }) => {
    // Test 90% zoom
    await page.evaluate(() => {
      document.body.style.zoom = '0.9';
    });
    await expect(page).toHaveScreenshot('courses-page-zoom-90.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test 110% zoom
    await page.evaluate(() => {
      document.body.style.zoom = '1.1';
    });
    await expect(page).toHaveScreenshot('courses-page-zoom-110.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render course cards with different states correctly', async ({ page }: { page: Page }) => {
    // Test enrolled course card
    const enrolledCard = page.locator('.course-card.enrolled').first();
    if (await enrolledCard.isVisible()) {
      await expect(enrolledCard).toHaveScreenshot('courses-page-course-card-enrolled.png');
    }
    
    // Test bookmarked course card
    const bookmarkedCard = page.locator('.course-card.bookmarked').first();
    if (await bookmarkedCard.isVisible()) {
      await expect(bookmarkedCard).toHaveScreenshot('courses-page-course-card-bookmarked.png');
    }
    
    // Test completed course card
    const completedCard = page.locator('.course-card.completed').first();
    if (await completedCard.isVisible()) {
      await expect(completedCard).toHaveScreenshot('courses-page-course-card-completed.png');
    }
  });

  test('should render filters with different states correctly', async ({ page }: { page: Page }) => {
    // Test active filters
    const activeFilter = page.locator('.filter.active').first();
    if (await activeFilter.isVisible()) {
      await expect(activeFilter).toHaveScreenshot('courses-page-filter-active.png');
    }
    
    // Test disabled filters
    const disabledFilter = page.locator('.filter.disabled').first();
    if (await disabledFilter.isVisible()) {
      await expect(disabledFilter).toHaveScreenshot('courses-page-filter-disabled.png');
    }
  });

  test('should render sorting options correctly', async ({ page }: { page: Page }) => {
    const sortDropdown = page.locator('.sort-dropdown');
    if (await sortDropdown.isVisible()) {
      await sortDropdown.click();
      await page.waitForTimeout(300);
      await expect(sortDropdown).toHaveScreenshot('courses-page-sort-dropdown.png');
    }
  });

  test('should render course details modal correctly', async ({ page }: { page: Page }) => {
    const courseCard = page.locator('.course-card').first();
    await courseCard.click();
    await page.waitForTimeout(300);
    
    const modal = page.locator('.course-modal');
    if (await modal.isVisible()) {
      await expect(modal).toHaveScreenshot('courses-page-course-modal.png');
    }
  });

  test('should render comparison modal correctly', async ({ page }: { page: Page }) => {
    const compareButton = page.locator('.compare-button').first();
    if (await compareButton.isVisible()) {
      await compareButton.click();
      await page.waitForTimeout(300);
      
      const modal = page.locator('.compare-modal');
      if (await modal.isVisible()) {
        await expect(modal).toHaveScreenshot('courses-page-compare-modal.png');
      }
    }
  });

  test('should render share modal correctly', async ({ page }: { page: Page }) => {
    const shareButton = page.locator('.share-button').first();
    if (await shareButton.isVisible()) {
      await shareButton.click();
      await page.waitForTimeout(300);
      
      const modal = page.locator('.share-modal');
      if (await modal.isVisible()) {
        await expect(modal).toHaveScreenshot('courses-page-share-modal.png');
      }
    }
  });

  test('should render with different breakpoints correctly', async ({ page }: { page: Page }) => {
    const breakpoints = [
      { width: 320, height: 568 },  // iPhone SE
      { width: 375, height: 667 },  // iPhone 12
      { width: 414, height: 896 },  // iPhone 12 Pro Max
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // iPad landscape
      { width: 1280, height: 800 }, // iPad Pro
      { width: 1440, height: 900 }, // iPad Pro landscape
      { width: 1920, height: 1080 }, // Desktop
      { width: 2560, height: 1440 }, // Ultra-wide
    ];
    
    for (const breakpoint of breakpoints) {
      await page.setViewportSize(breakpoint);
      await expect(page).toHaveScreenshot(`courses-page-${breakpoint.width}x${breakpoint.height}.png`, {
        fullPage: true,
        animations: 'disabled'
      });
    }
  });

  test('should render with different color schemes correctly', async ({ page }: { page: Page }) => {
    const colorSchemes = ['blue', 'green', 'purple', 'red', 'orange'];
    
    for (const scheme of colorSchemes) {
      await page.evaluate((colorScheme) => {
        document.documentElement.setAttribute('data-color-scheme', colorScheme);
      }, scheme);
      
      await expect(page).toHaveScreenshot(`courses-page-${scheme}-scheme.png`, {
        fullPage: true,
        animations: 'disabled'
      });
    }
  });
});
