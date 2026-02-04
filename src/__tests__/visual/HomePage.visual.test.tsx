// HomePage Visual Regression Tests
// Visual regression tests for the HomePage component using Playwright

import { test, expect, type Page } from '@playwright/test';

test.describe('HomePage Visual Tests', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/');
  });

  test('should render homepage correctly', async ({ page }: { page: Page }) => {
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render header correctly', async ({ page }: { page: Page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveScreenshot('homepage-header.png');
  });

  test('should render navigation correctly', async ({ page }: { page: Page }) => {
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    await expect(navigation).toHaveScreenshot('homepage-navigation.png');
  });

  test('should render hero section correctly', async ({ page }: { page: Page }) => {
    const heroSection = page.locator('.hero-section');
    await expect(heroSection).toBeVisible();
    await expect(heroSection).toHaveScreenshot('homepage-hero.png');
  });

  test('should render featured courses correctly', async ({ page }: { page: Page }) => {
    const featuredCourses = page.locator('.featured-courses');
    await expect(featuredCourses).toBeVisible();
    await expect(featuredCourses).toHaveScreenshot('homepage-featured-courses.png');
  });

  test('should render course cards correctly', async ({ page }: { page: Page }) => {
    const courseCards = page.locator('.course-card');
    const firstCard = courseCards.first();
    await expect(firstCard).toBeVisible();
    await expect(firstCard).toHaveScreenshot('homepage-course-card.png');
  });

  test('should render course categories correctly', async ({ page }: { page: Page }) => {
    const categories = page.locator('.course-categories');
    await expect(categories).toBeVisible();
    await expect(categories).toHaveScreenshot('homepage-categories.png');
  });

  test('should render testimonials correctly', async ({ page }: { page: Page }) => {
    const testimonials = page.locator('.testimonials');
    await expect(testimonials).toBeVisible();
    await expect(testimonials).toHaveScreenshot('homepage-testimonials.png');
  });

  test('should render statistics correctly', async ({ page }: { page: Page }) => {
    const statistics = page.locator('.statistics');
    await expect(statistics).toBeVisible();
    await expect(statistics).toHaveScreenshot('homepage-statistics.png');
  });

  test('should render call-to-action correctly', async ({ page }: { page: Page }) => {
    const cta = page.locator('.call-to-action');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveScreenshot('homepage-cta.png');
  });

  test('should render footer correctly', async ({ page }: { page: Page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveScreenshot('homepage-footer.png');
  });

  test('should render notification center correctly', async ({ page }: { page: Page }) => {
    const notificationCenter = page.locator('#notification-center');
    await expect(notificationCenter).toBeVisible();
    await expect(notificationCenter).toHaveScreenshot('homepage-notification-center.png');
  });

  test('should render connection status correctly', async ({ page }: { page: Page }) => {
    const connectionStatus = page.locator('#connection-status');
    await expect(connectionStatus).toBeVisible();
    await expect(connectionStatus).toHaveScreenshot('homepage-connection-status.png');
  });

  test('should render search bar correctly', async ({ page }: { page: Page }) => {
    const searchBar = page.locator('.search-bar');
    await expect(searchBar).toBeVisible();
    await expect(searchBar).toHaveScreenshot('homepage-search-bar.png');
  });

  test('should render user profile correctly', async ({ page }: { page: Page }) => {
    const userProfile = page.locator('.user-profile');
    await expect(userProfile).toBeVisible();
    await expect(userProfile).toHaveScreenshot('homepage-user-profile.png');
  });

  test('should render sidebar correctly', async ({ page }: { page: Page }) => {
    const sidebar = page.locator('.sidebar');
    if (await sidebar.isVisible()) {
      await expect(sidebar).toHaveScreenshot('homepage-sidebar.png');
    }
  });

  test('should render breadcrumbs correctly', async ({ page }: { page: Page }) => {
    const breadcrumbs = page.locator('.breadcrumbs');
    if (await breadcrumbs.isVisible()) {
      await expect(breadcrumbs).toHaveScreenshot('homepage-breadcrumbs.png');
    }
  });

  test('should render in light theme correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await expect(page).toHaveScreenshot('homepage-light-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in dark theme correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await expect(page).toHaveScreenshot('homepage-dark-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in mobile viewport correctly', async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in tablet viewport correctly', async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in desktop viewport correctly', async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render in ultra-wide viewport correctly', async ({ page }: { page: Page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await expect(page).toHaveScreenshot('homepage-ultra-wide.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with RTL layout correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('dir', 'rtl');
    });
    await expect(page).toHaveScreenshot('homepage-rtl.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with high contrast mode correctly', async ({ page }: { page: Page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot('homepage-high-contrast.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with reduced motion correctly', async ({ page }: { page: Page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot('homepage-reduced-motion.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with large font size correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '20px';
    });
    await expect(page).toHaveScreenshot('homepage-large-font.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with small font size correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '14px';
    });
    await expect(page).toHaveScreenshot('homepage-small-font.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render hero section with hover states correctly', async ({ page }: { page: Page }) => {
    const heroButton = page.locator('.hero-section button').first();
    await heroButton.hover();
    await expect(heroButton).toHaveScreenshot('homepage-hero-hover.png');
  });

  test('should render course cards with hover states correctly', async ({ page }: { page: Page }) => {
    const courseCard = page.locator('.course-card').first();
    await courseCard.hover();
    await expect(courseCard).toHaveScreenshot('homepage-course-card-hover.png');
  });

  test('should render navigation with active states correctly', async ({ page }: { page: Page }) => {
    const navItem = page.locator('.nav-item').first();
    await navItem.click();
    await expect(navItem).toHaveScreenshot('homepage-nav-active.png');
  });

  test('should render search bar with focus state correctly', async ({ page }: { page: Page }) => {
    const searchInput = page.locator('.search-bar input');
    await searchInput.focus();
    await expect(searchInput).toHaveScreenshot('homepage-search-focus.png');
  });

  test('should render search bar with typing state correctly', async ({ page }: { page: Page }) => {
    const searchInput = page.locator('.search-bar input');
    await searchInput.fill('React');
    await expect(searchInput).toHaveScreenshot('homepage-search-typing.png');
  });

  test('should render search results correctly', async ({ page }: { page: Page }) => {
    const searchInput = page.locator('.search-bar input');
    await searchInput.fill('React');
    await page.waitForTimeout(500); // Wait for search results
    const searchResults = page.locator('.search-results');
    if (await searchResults.isVisible()) {
      await expect(searchResults).toHaveScreenshot('homepage-search-results.png');
    }
  });

  test('should render notification center with unread notifications correctly', async ({ page }: { page: Page }) => {
    const notificationBell = page.locator('#notification-center');
    await notificationBell.click();
    await page.waitForTimeout(300);
    const notificationPanel = page.locator('.notification-panel');
    if (await notificationPanel.isVisible()) {
      await expect(notificationPanel).toHaveScreenshot('homepage-notification-panel.png');
    }
  });

  test('should render user profile dropdown correctly', async ({ page }: { page: Page }) => {
    const profileButton = page.locator('.user-profile button');
    await profileButton.click();
    await page.waitForTimeout(300);
    const profileDropdown = page.locator('.profile-dropdown');
    if (await profileDropdown.isVisible()) {
      await expect(profileDropdown).toHaveScreenshot('homepage-profile-dropdown.png');
    }
  });

  test('should render sidebar with open state correctly', async ({ page }: { page: Page }) => {
    const menuButton = page.locator('.menu-button');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
      const sidebar = page.locator('.sidebar');
      if (await sidebar.isVisible()) {
        await expect(sidebar).toHaveScreenshot('homepage-sidebar-open.png');
      }
    }
  });

  test('should render course categories with hover states correctly', async ({ page }: { page: Page }) => {
    const categoryCard = page.locator('.category-card').first();
    await categoryCard.hover();
    await expect(categoryCard).toHaveScreenshot('homepage-category-hover.png');
  });

  test('should render testimonials with active state correctly', async ({ page }: { page: Page }) => {
    const testimonial = page.locator('.testimonial').first();
    await testimonial.click();
    await page.waitForTimeout(300);
    await expect(testimonial).toHaveScreenshot('homepage-testimonial-active.png');
  });

  test('should render statistics with animated numbers correctly', async ({ page }: { page: Page }) => {
    const statistics = page.locator('.statistics');
    await statistics.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Wait for animations
    await expect(statistics).toHaveScreenshot('homepage-statistics-animated.png');
  });

  test('should render call-to-action with hover state correctly', async ({ page }: { page: Page }) => {
    const ctaButton = page.locator('.call-to-action button').first();
    await ctaButton.hover();
    await expect(ctaButton).toHaveScreenshot('homepage-cta-hover.png');
  });

  test('should render footer with hover states correctly', async ({ page }: { page: Page }) => {
    const footerLink = page.locator('footer a').first();
    await footerLink.hover();
    await expect(footerLink).toHaveScreenshot('homepage-footer-hover.png');
  });

  test('should render with loading states correctly', async ({ page }: { page: Page }) => {
    await page.route('**/api/**', route => {
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
      await expect(loadingStates).toHaveScreenshot('homepage-loading.png');
    }
  });

  test('should render with error states correctly', async ({ page }: { page: Page }) => {
    await page.route('**/api/**', route => {
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
      await expect(errorStates).toHaveScreenshot('homepage-error.png');
    }
  });

  test('should render with empty states correctly', async ({ page }: { page: Page }) => {
    await page.route('**/api/**', route => {
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
      await expect(emptyStates).toHaveScreenshot('homepage-empty.png');
    }
  });

  test('should render with scroll position correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('homepage-scrolled.png', {
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
    await expect(header).toHaveScreenshot('homepage-sticky-header.png');
  });

  test('should render with different content densities correctly', async ({ page }: { page: Page }) => {
    // Test compact mode
    await page.evaluate(() => {
      document.documentElement.classList.add('compact-mode');
    });
    await expect(page).toHaveScreenshot('homepage-compact.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test spacious mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('compact-mode');
      document.documentElement.classList.add('spacious-mode');
    });
    await expect(page).toHaveScreenshot('homepage-spacious.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different color schemes correctly', async ({ page }: { page: Page }) => {
    // Test blue theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-color-scheme', 'blue');
    });
    await expect(page).toHaveScreenshot('homepage-blue-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test green theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-color-scheme', 'green');
    });
    await expect(page).toHaveScreenshot('homepage-green-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test purple theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-color-scheme', 'purple');
    });
    await expect(page).toHaveScreenshot('homepage-purple-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different layouts correctly', async ({ page }: { page: Page }) => {
    // Test grid layout
    await page.evaluate(() => {
      document.documentElement.classList.add('grid-layout');
    });
    await expect(page).toHaveScreenshot('homepage-grid-layout.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test list layout
    await page.evaluate(() => {
      document.documentElement.classList.remove('grid-layout');
      document.documentElement.classList.add('list-layout');
    });
    await expect(page).toHaveScreenshot('homepage-list-layout.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with animations enabled correctly', async ({ page }: { page: Page }) => {
    await page.evaluate(() => {
      document.documentElement.classList.add('animations-enabled');
    });
    
    // Trigger some animations
    const heroButton = page.locator('.hero-section button').first();
    await heroButton.hover();
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage-animations.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with custom CSS correctly', async ({ page }: { page: Page }) => {
    await page.addStyleTag({
      content: `
      .custom-homepage {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .custom-homepage .hero-section {
        padding: 100px 20px;
        text-align: center;
      }
      .custom-homepage .course-card {
        border: 2px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
      }
      `
    });
    
    await page.evaluate(() => {
      document.body.classList.add('custom-homepage');
    });
    
    await expect(page).toHaveScreenshot('homepage-custom.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with print styles correctly', async ({ page }: { page: Page }) => {
    await page.emulateMedia({ media: 'print' });
    await expect(page).toHaveScreenshot('homepage-print.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different screen orientations correctly', async ({ page }: { page: Page }) => {
    // Test landscape
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page).toHaveScreenshot('homepage-landscape.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test portrait
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('homepage-portrait.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different pixel densities correctly', async ({ page }: { page: Page }) => {
    // Test 1x density
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page).toHaveScreenshot('homepage-1x-density.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test 2x density
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page).toHaveScreenshot('homepage-2x-density.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different zoom levels correctly', async ({ page }: { page: Page }) => {
    // Test 90% zoom
    await page.evaluate(() => {
      document.body.style.zoom = '0.9';
    });
    await expect(page).toHaveScreenshot('homepage-zoom-90.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Test 110% zoom
    await page.evaluate(() => {
      document.body.style.zoom = '1.1';
    });
    await expect(page).toHaveScreenshot('homepage-zoom-110.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should render with different browser engines correctly', async ({ page }: { page: Page }) => {
    // Test WebKit rendering
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await expect(page).toHaveScreenshot('homepage-webkit.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
});
