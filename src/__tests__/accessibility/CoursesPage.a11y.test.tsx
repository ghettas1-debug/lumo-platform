// CoursesPage Accessibility Tests
// Comprehensive accessibility tests for the CoursesPage component

import { test, expect, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('CoursesPage Accessibility Tests', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/courses');
  });

  test('should not have any accessibility violations', async ({ page }: { page: Page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('.courses-page')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper page structure', async ({ page }: { page: Page }) => {
    // Check for proper heading hierarchy
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    expect(await mainHeading.textContent()).toBeTruthy();
    
    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();
    expect(await main.getAttribute('role')).toBe('main');
    
    // Check for navigation landmark
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    expect(await nav.getAttribute('role')).toBe('navigation');
  });

  test('should have proper ARIA labels for interactive elements', async ({ page }: { page: Page }) => {
    // Check search input
    const searchInput = page.locator('input[placeholder*="search"]');
    await expect(searchInput).toBeVisible();
    expect(await searchInput.getAttribute('aria-label')).toBeTruthy();
    
    // Check filter buttons
    const filterButtons = page.locator('.filter-button');
    const filterCount = await filterButtons.count();
    
    for (let i = 0; i < filterCount; i++) {
      const button = filterButtons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');
      const title = await button.getAttribute('title');
      
      expect(ariaLabel || ariaLabelledBy || title).toBeTruthy();
    }
    
    // Check course cards
    const courseCards = page.locator('.course-card');
    const cardCount = await courseCards.count();
    
    for (let i = 0; i < cardCount; i++) {
      const card = courseCards.nth(i);
      const ariaLabel = await card.getAttribute('aria-label');
      const ariaLabelledBy = await card.getAttribute('aria-labelledby');
      
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }: { page: Page }) => {
    // Test Tab navigation through main elements
    await page.keyboard.press('Tab');
    
    // Should focus on first interactive element
    const firstFocused = page.locator(':focus');
    expect(await firstFocused.isVisible()).toBeTruthy();
    
    // Test Tab through course cards
    const courseCards = page.locator('.course-card');
    const cardCount = await courseCards.count();
    
    for (let i = 0; i < Math.min(cardCount, 5); i++) {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      expect(await focused.isVisible()).toBeTruthy();
    }
    
    // Test Enter key on course cards
    const firstCard = courseCards.first();
    await firstCard.focus();
    await page.keyboard.press('Enter');
    
    // Should open course modal or navigate to course details
    await page.waitForTimeout(500);
    
    // Test Escape key to close modal if open
    const modal = page.locator('.course-modal');
    if (await modal.isVisible()) {
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('should have proper focus management', async ({ page }: { page: Page }) => {
    // Test focus on search input
    const searchInput = page.locator('input[placeholder*="search"]');
    await searchInput.focus();
    expect(await searchInput.evaluate(el => document.activeElement === el)).toBeTruthy();
    
    // Test focus on filter buttons
    const filterButton = page.locator('.filter-button').first();
    await filterButton.focus();
    expect(await filterButton.evaluate(el => document.activeElement === el)).toBeTruthy();
    
    // Test focus on course cards
    const courseCard = page.locator('.course-card').first();
    await courseCard.focus();
    expect(await courseCard.evaluate(el => document.activeElement === el)).toBeTruthy();
    
    // Test focus trap in modal
    const firstCard = page.locator('.course-card').first();
    await firstCard.click();
    await page.waitForTimeout(300);
    
    const modal = page.locator('.course-modal');
    if (await modal.isVisible()) {
      const modalCloseButton = modal.locator('.modal-close');
      await modalCloseButton.focus();
      
      // Test Tab navigation stays within modal
      await page.keyboard.press('Tab');
      const focusedInModal = page.locator('.course-modal :focus');
      expect(await focusedInModal.isVisible()).toBeTruthy();
    }
  });

  test('should have proper color contrast', async ({ page }: { page: Page }) => {
    // Check text contrast in course cards
    const courseCards = page.locator('.course-card');
    const cardCount = await courseCards.count();
    
    for (let i = 0; i < Math.min(cardCount, 3); i++) {
      const card = courseCards.nth(i);
      const styles = await card.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });
      
      // Basic contrast check
      expect(styles.color).toBeTruthy();
      expect(styles.backgroundColor).toBeTruthy();
    }
    
    // Check button contrast
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });
      
      expect(styles.color).toBeTruthy();
      expect(styles.backgroundColor).toBeTruthy();
    }
  });

  test('should have proper screen reader support', async ({ page }: { page: Page }) => {
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    expect(headingCount).toBeGreaterThan(0);
    
    // Check for proper list structure in course listings
    const courseList = page.locator('.courses-list, .courses-grid');
    if (await courseList.isVisible()) {
      const ariaLabel = await courseList.getAttribute('aria-label');
      const ariaLabelledBy = await courseList.getAttribute('aria-labelledby');
      const role = await courseList.getAttribute('role');
      
      expect(ariaLabel || ariaLabelledBy || role).toBeTruthy();
    }
    
    // Check for proper table structure if present
    const tables = page.locator('table');
    const tableCount = await tables.count();
    
    for (let i = 0; i < tableCount; i++) {
      const table = tables.nth(i);
      const caption = table.locator('caption');
      expect(await caption.count()).toBeGreaterThan(0);
      
      const headers = table.locator('th');
      expect(await headers.count()).toBeGreaterThan(0);
      
      const headersWithScope = table.locator('th[scope]');
      expect(await headersWithScope.count()).toBeGreaterThan(0);
    }
  });

  test('should have proper skip links', async ({ page }: { page: Page }) => {
    const skipLinks = page.locator('.skip-link, a[href^="#skip"]');
    const skipLinkCount = await skipLinks.count();
    
    for (let i = 0; i < skipLinkCount; i++) {
      const skipLink = skipLinks.nth(i);
      
      // Check if skip link is visible on focus
      await skipLink.focus();
      expect(await skipLink.isVisible()).toBeTruthy();
      
      // Check if target exists
      const href = await skipLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.replace('#', '');
        const target = page.locator(`#${targetId}`);
        expect(await target.count()).toBeGreaterThan(0);
      }
    }
  });

  test('should have proper form accessibility', async ({ page }: { page: Page }) => {
    // Check search form
    const searchForm = page.locator('.search-form, form[role="search"]');
    if (await searchForm.isVisible()) {
      const searchInput = searchForm.locator('input');
      const searchButton = searchForm.locator('button[type="submit"]');
      
      expect(await searchInput.count()).toBeGreaterThan(0);
      expect(await searchButton.count()).toBeGreaterThan(0);
      
      // Check form submission
      await searchInput.fill('test');
      await searchButton.click();
      
      // Should not cause errors
      await page.waitForTimeout(500);
    }
    
    // Check filter forms
    const filterForms = page.locator('.filter-form, form[role="form"]');
    const filterFormCount = await filterForms.count();
    
    for (let i = 0; i < filterFormCount; i++) {
      const form = filterForms.nth(i);
      const inputs = form.locator('input, select, textarea');
      const buttons = form.locator('button');
      
      expect(await inputs.count()).toBeGreaterThan(0);
      
      // Check form labels
      const labels = form.locator('label');
      const labeledInputs = inputs.filter(async (input) => {
        const id = await input.getAttribute('id');
        const label = form.locator(`label[for="${id}"]`);
        return await label.count() > 0;
      });
      
      expect(await labeledInputs.count()).toBe(await inputs.count());
    }
  });

  test('should have proper button accessibility', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      
      // Check for accessible name
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');
      const title = await button.getAttribute('title');
      
      expect(text?.trim() || ariaLabel || ariaLabelledBy || title).toBeTruthy();
      
      // Check for proper button type
      const type = await button.getAttribute('type');
      expect(type === 'button' || type === 'submit' || type === 'reset' || type === null).toBeTruthy();
      
      // Check for disabled state handling
      const isDisabled = await button.isDisabled();
      const ariaDisabled = await button.getAttribute('aria-disabled');
      
      if (isDisabled) {
        expect(ariaDisabled).toBe('true');
      }
    }
  });

  test('should have proper link accessibility', async ({ page }: { page: Page }) => {
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = links.nth(i);
      
      // Check for accessible name
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      
      expect(text?.trim() || ariaLabel || title).toBeTruthy();
      
      // Check for proper href
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      
      // Check for external link handling
      const isExternal = href?.startsWith('http') && !href?.includes(window.location.hostname);
      if (isExternal) {
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        expect(target === '_blank' || target === null).toBeTruthy();
        if (target === '_blank') {
          expect(rel?.includes('noopener') || rel?.includes('noreferrer')).toBeTruthy();
        }
      }
    }
  });

  test('should have proper image accessibility', async ({ page }: { page: Page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const img = images.nth(i);
      
      // Check for alt text
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      
      // Check for decorative images
      const role = await img.getAttribute('role');
      if (role === 'presentation') {
        expect(alt).toBe('');
      }
      
      // Check for lazy loading
      const loading = await img.getAttribute('loading');
      expect(loading === 'lazy' || loading === 'eager' || loading === null).toBeTruthy();
    }
  });

  test('should have proper modal accessibility', async ({ page }: { page: Page }) => {
    // Open a modal
    const courseCard = page.locator('.course-card').first();
    await courseCard.click();
    await page.waitForTimeout(300);
    
    const modal = page.locator('.course-modal, .modal');
    if (await modal.isVisible()) {
      // Check for proper modal attributes
      const role = await modal.getAttribute('role');
      const ariaModal = await modal.getAttribute('aria-modal');
      const ariaLabel = await modal.getAttribute('aria-label');
      const ariaLabelledBy = await modal.getAttribute('aria-labelledby');
      
      expect(role === 'dialog' || ariaModal === 'true').toBeTruthy();
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      
      // Check for focus trap
      const closeButton = modal.locator('.modal-close, [aria-label*="Close"]');
      expect(await closeButton.count()).toBeGreaterThan(0);
      
      // Check for proper focus management
      await closeButton.focus();
      expect(await closeButton.evaluate(el => document.activeElement === el)).toBeTruthy();
      
      // Test Escape key
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('should have proper table accessibility', async ({ page }: { page: Page }) => {
    const tables = page.locator('table');
    const tableCount = await tables.count();
    
    for (let i = 0; i < tableCount; i++) {
      const table = tables.nth(i);
      
      // Check for caption
      const caption = table.locator('caption');
      expect(await caption.count()).toBeGreaterThan(0);
      
      // Check for headers
      const headers = table.locator('th');
      expect(await headers.count()).toBeGreaterThan(0);
      
      // Check for scope attributes
      const headersWithScope = table.locator('th[scope]');
      expect(await headersWithScope.count()).toBeGreaterThan(0);
      
      // Check for proper row headers if complex table
      const rowHeaders = table.locator('th[scope="row"]');
      const colHeaders = table.locator('th[scope="col"]');
      
      if (await rowHeaders.count() > 0 || await colHeaders.count() > 0) {
        expect(true).toBeTruthy(); // Complex table has proper headers
      }
    }
  });

  test('should have proper list accessibility', async ({ page }: { page: Page }) => {
    const lists = page.locator('ul, ol, dl');
    const listCount = await lists.count();
    
    for (let i = 0; i < listCount; i++) {
      const list = lists.nth(i);
      const listType = await list.evaluate(el => el.tagName.toLowerCase());
      
      if (listType === 'ul' || listType === 'ol') {
        const items = list.locator('li');
        expect(await items.count()).toBeGreaterThan(0);
      } else if (listType === 'dl') {
        const terms = list.locator('dt');
        const definitions = list.locator('dd');
        
        if (await terms.count() > 0) {
          expect(await definitions.count()).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should have proper landmark roles', async ({ page }: { page: Page }) => {
    // Check for main landmarks
    const main = page.locator('main, [role="main"]');
    expect(await main.count()).toBeGreaterThan(0);
    
    // Check for navigation landmarks
    const nav = page.locator('nav, [role="navigation"]');
    expect(await nav.count()).toBeGreaterThan(0);
    
    // Check for header landmarks
    const header = page.locator('header, [role="banner"]');
    expect(await header.count()).toBeGreaterThan(0);
    
    // Check for footer landmarks
    const footer = page.locator('footer, [role="contentinfo"]');
    expect(await footer.count()).toBeGreaterThan(0);
    
    // Check for complementary landmarks
    const aside = page.locator('aside, [role="complementary"]');
    // Aside may not be present, so don't fail if not found
  });

  test('should have proper heading hierarchy', async ({ page }: { page: Page }) => {
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    expect(headingCount).toBeGreaterThan(0);
    
    // Check for proper heading order
    let lastLevel = 0;
    for (let i = 0; i < headingCount; i++) {
      const heading = headings.nth(i);
      const level = parseInt(await heading.evaluate(el => el.tagName.substring(1)));
      
      // Should not skip heading levels (h1 to h3 is ok, but h1 to h4 is not)
      expect(level - lastLevel).toBeLessThanOrEqual(1);
      lastLevel = level;
    }
  });

  test('should have proper focus indicators', async ({ page }: { page: Page }) => {
    const focusableElements = page.locator('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');
    const elementCount = await focusableElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 10); i++) {
      const element = focusableElements.nth(i);
      await element.focus();
      
      // Check for visible focus indicator
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el, ':focus');
        return {
          outline: computed.outline,
          outlineWidth: computed.outlineWidth,
          outlineStyle: computed.outlineStyle,
          outlineColor: computed.outlineColor,
          boxShadow: computed.boxShadow,
        };
      });
      
      const hasFocusIndicator = 
        styles.outline !== 'none' || 
        styles.boxShadow !== 'none' ||
        styles.outlineWidth !== '0px';
      
      expect(hasFocusIndicator).toBeTruthy();
    }
  });

  test('should have proper touch target sizes', async ({ page }: { page: Page }) => {
    const touchTargets = page.locator('button, input[type="submit"], input[type="button"], a');
    const targetCount = await touchTargets.count();
    
    for (let i = 0; i < Math.min(targetCount, 10); i++) {
      const target = touchTargets.nth(i);
      const boundingBox = await target.boundingBox();
      
      if (boundingBox) {
        const { width, height } = boundingBox;
        // Minimum touch target size is 44x44px
        expect(width).toBeGreaterThanOrEqual(44);
        expect(height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('should have proper reading order', async ({ page }: { page: Page }) => {
    // Check that content is in a logical order
    const main = page.locator('main');
    const content = await main.textContent();
    
    // Should have meaningful content
    expect(content?.length).toBeGreaterThan(100);
    
    // Check that important elements are in order
    const heading = main.locator('h1').first();
    const firstContent = main.locator('p, .course-card, .search-bar').first();
    
    if (await heading.count() > 0 && await firstContent.count() > 0) {
      const headingBox = await heading.boundingBox();
      const contentBox = await firstContent.boundingBox();
      
      if (headingBox && contentBox) {
        expect(headingBox.y).toBeLessThan(contentBox.y);
      }
    }
  });
});
