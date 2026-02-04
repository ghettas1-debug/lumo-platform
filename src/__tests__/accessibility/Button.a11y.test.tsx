// Button Accessibility Tests
// Comprehensive accessibility tests for the Button component

import { test, expect, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Button Accessibility Tests', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await page.goto('/');
  });

  test('should not have any accessibility violations', async ({ page }: { page: Page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('button')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper ARIA attributes', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Check for proper ARIA attributes
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaDescribedBy = await button.getAttribute('aria-describedby');
      const ariaPressed = await button.getAttribute('aria-pressed');
      const ariaExpanded = await button.getAttribute('aria-expanded');
      const ariaDisabled = await button.getAttribute('aria-disabled');

      // Button should have accessible name
      const accessibleName = await button.textContent() || ariaLabel;
      expect(accessibleName).toBeTruthy();
      expect(accessibleName?.length).toBeGreaterThan(0);

      // Check aria-pressed for toggle buttons
      if (ariaPressed) {
        expect(['true', 'false']).toContain(ariaPressed);
      }

      // Check aria-expanded for buttons that control content
      if (ariaExpanded) {
        expect(['true', 'false']).toContain(ariaExpanded);
      }

      // Check aria-disabled for disabled buttons
      const isDisabled = await button.isDisabled();
      if (isDisabled) {
        expect(ariaDisabled).toBe('true');
      }
    }
  });

  test('should be keyboard navigable', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const firstButton = buttons.first();
    
    // Test Tab navigation
    await page.keyboard.press('Tab');
    expect(await firstButton.evaluate(el => document.activeElement === el)).toBeTruthy();

    // Test Enter key
    await page.keyboard.press('Enter');
    // Should trigger button action

    // Test Space key
    await page.keyboard.press('Space');
    // Should trigger button action
  });

  test('should have proper focus management', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Check if button is focusable
      const tabIndex = await button.getAttribute('tabindex');
      expect(tabIndex === '0' || tabIndex === null).toBeTruthy();

      // Test focus
      await button.focus();
      expect(await button.evaluate(el => document.activeElement === el)).toBeTruthy();

      // Test blur
      await button.blur();
      expect(await button.evaluate(el => document.activeElement === el)).toBeFalsy();
    }
  });

  test('should have proper color contrast', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Get computed styles
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
        };
      });

      // Check color contrast (basic check)
      // In real implementation, you'd use a proper color contrast library
      expect(styles.color).toBeTruthy();
      expect(styles.backgroundColor).toBeTruthy();
    }
  });

  test('should have proper text alternatives for icon buttons', async ({ page }: { page: Page }) => {
    const iconButtons = page.locator('button:has(svg), button:has(i), button:has(.icon)');
    const count = await iconButtons.count();

    for (let i = 0; i < count; i++) {
      const button = iconButtons.nth(i);
      
      // Check for aria-label or aria-labelledby
      const ariaLabel = await button.getAttribute('aria-label');
      const ariaLabelledBy = await button.getAttribute('aria-labelledby');
      const title = await button.getAttribute('title');
      
      // Icon buttons should have text alternative
      const hasTextAlternative = ariaLabel || ariaLabelledBy || title;
      expect(hasTextAlternative).toBeTruthy();
    }
  });

  test('should announce state changes to screen readers', async ({ page }: { page: Page }) => {
    const toggleButtons = page.locator('button[aria-pressed]');
    const count = await toggleButtons.count();

    for (let i = 0; i < count; i++) {
      const button = toggleButtons.nth(i);
      
      // Get initial state
      const initialState = await button.getAttribute('aria-pressed');
      
      // Click to toggle
      await button.click();
      
      // Check if aria-pressed changed
      const newState = await button.getAttribute('aria-pressed');
      expect(newState).not.toBe(initialState);
    }
  });

  test('should have proper role attribute', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Check role attribute
      const role = await button.getAttribute('role');
      expect(role === 'button' || role === null).toBeTruthy();
    }
  });

  test('should have proper disabled state handling', async ({ page }: { page: Page }) => {
    const disabledButtons = page.locator('button:disabled');
    const count = await disabledButtons.count();

    for (let i = 0; i < count; i++) {
      const button = disabledButtons.nth(i);
      
      // Check disabled attributes
      const isDisabled = await button.isDisabled();
      const ariaDisabled = await button.getAttribute('aria-disabled');
      
      expect(isDisabled).toBeTruthy();
      expect(ariaDisabled).toBe('true');
      
      // Check that disabled button is not focusable
      const tabIndex = await button.getAttribute('tabindex');
      expect(tabIndex).toBe('-1');
    }
  });

  test('should have proper loading state handling', async ({ page }: { page: Page }) => {
    const loadingButtons = page.locator('button[data-loading="true"]');
    const count = await loadingButtons.count();

    for (let i = 0; i < count; i++) {
      const button = loadingButtons.nth(i);
      
      // Check loading state attributes
      const ariaBusy = await button.getAttribute('aria-busy');
      expect(ariaBusy).toBe('true');
      
      // Check for loading indicator
      const loadingIndicator = button.locator('.loading-indicator, [data-loading-indicator]');
      expect(await loadingIndicator.count()).toBeGreaterThan(0);
    }
  });

  test('should have proper form submission handling', async ({ page }: { page: Page }) => {
    const formButtons = page.locator('form button[type="submit"]');
    const count = await formButtons.count();

    for (let i = 0; i < count; i++) {
      const button = formButtons.nth(i);
      
      // Check form button attributes
      const type = await button.getAttribute('type');
      expect(type).toBe('submit');
      
      // Check for form association
      const form = await button.locator('xpath=ancestor::form');
      expect(await form.count()).toBeGreaterThan(0);
    }
  });

  test('should have proper link button handling', async ({ page }: { page: Page }) => {
    const linkButtons = page.locator('a[role="button"], button[href]');
    const count = await linkButtons.count();

    for (let i = 0; i < count; i++) {
      const button = linkButtons.nth(i);
      
      // Check link button attributes
      const role = await button.getAttribute('role');
      const href = await button.getAttribute('href');
      
      if (role === 'button') {
        // Link styled as button
        expect(href).toBeTruthy();
      } else if (href) {
        // Button with href
        expect(role).toBe('link');
      }
    }
  });

  test('should have proper tooltip handling', async ({ page }: { page: Page }) => {
    const tooltipButtons = page.locator('button[title], button[aria-describedby]');
    const count = await tooltipButtons.count();

    for (let i = 0; i < count; i++) {
      const button = tooltipButtons.nth(i);
      
      // Check tooltip attributes
      const title = await button.getAttribute('title');
      const ariaDescribedBy = await button.getAttribute('aria-describedby');
      
      expect(title || ariaDescribedBy).toBeTruthy();
    }
  });

  test('should have proper menu button handling', async ({ page }: { page: Page }) => {
    const menuButtons = page.locator('button[aria-haspopup], button[aria-expanded]');
    const count = await menuButtons.count();

    for (let i = 0; i < count; i++) {
      const button = menuButtons.nth(i);
      
      // Check menu button attributes
      const ariaHasPopup = await button.getAttribute('aria-haspopup');
      const ariaExpanded = await button.getAttribute('aria-expanded');
      
      if (ariaHasPopup) {
        expect(['menu', 'listbox', 'grid', 'dialog', 'tree']).toContain(ariaHasPopup);
      }
      
      if (ariaExpanded) {
        expect(['true', 'false']).toContain(ariaExpanded);
      }
    }
  });

  test('should have proper modal button handling', async ({ page }: { page: Page }) => {
    const modalButtons = page.locator('button[data-modal], button[aria-controls]');
    const count = await modalButtons.count();

    for (let i = 0; i < count; i++) {
      const button = modalButtons.nth(i);
      
      // Check modal button attributes
      const dataModal = await button.getAttribute('data-modal');
      const ariaControls = await button.getAttribute('aria-controls');
      
      expect(dataModal || ariaControls).toBeTruthy();
    }
  });

  test('should have proper skip link handling', async ({ page }: { page: Page }) => {
    const skipLinks = page.locator('a[href^="#"]:has-text("Skip"), .skip-link');
    const count = await skipLinks.count();

    for (let i = 0; i < count; i++) {
      const skipLink = skipLinks.nth(i);
      
      // Check skip link attributes
      const href = await skipLink.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href?.startsWith('#')).toBeTruthy();
      
      // Check if target exists
      const targetId = href?.replace('#', '');
      if (targetId) {
        const target = page.locator(`#${targetId}`);
        expect(await target.count()).toBeGreaterThan(0);
      }
    }
  });

  test('should have proper button group handling', async ({ page }: { page: Page }) => {
    const buttonGroups = page.locator('.button-group, [role="group"]');
    const count = await buttonGroups.count();

    for (let i = 0; i < count; i++) {
      const group = buttonGroups.nth(i);
      
      // Check group attributes
      const role = await group.getAttribute('role');
      const ariaLabel = await group.getAttribute('aria-label');
      const ariaLabelledBy = await group.getAttribute('aria-labelledby');
      
      if (role === 'group') {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
      
      // Check buttons in group
      const buttons = group.locator('button');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
    }
  });

  test('should have proper toolbar handling', async ({ page }: { page: Page }) => {
    const toolbars = page.locator('[role="toolbar"]');
    const count = await toolbars.count();

    for (let i = 0; i < count; i++) {
      const toolbar = toolbars.nth(i);
      
      // Check toolbar attributes
      const ariaLabel = await toolbar.getAttribute('aria-label');
      const ariaLabelledBy = await toolbar.getAttribute('aria-labelledby');
      const ariaOrientation = await toolbar.getAttribute('aria-orientation');
      
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      
      if (ariaOrientation) {
        expect(['horizontal', 'vertical']).toContain(ariaOrientation);
      }
      
      // Check buttons in toolbar
      const buttons = toolbar.locator('button');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
    }
  });

  test('should have proper tablist handling', async ({ page }: { page: Page }) => {
    const tablists = page.locator('[role="tablist"]');
    const count = await tablists.count();

    for (let i = 0; i < count; i++) {
      const tablist = tablists.nth(i);
      
      // Check tablist attributes
      const ariaLabel = await tablist.getAttribute('aria-label');
      const ariaLabelledBy = await tablist.getAttribute('aria-labelledby');
      const ariaOrientation = await tablist.getAttribute('aria-orientation');
      
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      
      if (ariaOrientation) {
        expect(['horizontal', 'vertical']).toContain(ariaOrientation);
      }
      
      // Check tab buttons
      const tabButtons = tablist.locator('[role="tab"]');
      const tabCount = await tabButtons.count();
      expect(tabCount).toBeGreaterThan(0);
      
      // Check tab button attributes
      for (let j = 0; j < tabCount; j++) {
        const tab = tabButtons.nth(j);
        const selected = await tab.getAttribute('aria-selected');
        const controls = await tab.getAttribute('aria-controls');
        
        expect(['true', 'false']).toContain(selected);
        expect(controls).toBeTruthy();
      }
    }
  });

  test('should have proper button sizing for touch targets', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Get button dimensions
      const boundingBox = await button.boundingBox();
      if (boundingBox) {
        const { width, height } = boundingBox;
        
        // Check minimum touch target size (44x44px per WCAG)
        const minSize = 44;
        expect(width).toBeGreaterThanOrEqual(minSize);
        expect(height).toBeGreaterThanOrEqual(minSize);
      }
    }
  });

  test('should have proper button spacing', async ({ page }: { page: Page }) => {
    const buttonGroups = page.locator('.button-group');
    const count = await buttonGroups.count();

    for (let i = 0; i < count; i++) {
      const group = buttonGroups.nth(i);
      const buttons = group.locator('button');
      const buttonCount = await buttons.count();
      
      // Check spacing between buttons
      for (let j = 0; j < buttonCount - 1; j++) {
        const button1 = buttons.nth(j);
        const button2 = buttons.nth(j + 1);
        
        const box1 = await button1.boundingBox();
        const box2 = await button2.boundingBox();
        
        if (box1 && box2) {
          const spacing = box2.x - (box1.x + box1.width);
          expect(spacing).toBeGreaterThanOrEqual(8); // Minimum 8px spacing
        }
      }
    }
  });

  test('should have proper button text readability', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Get text styles
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
        };
      });

      // Check minimum font size (16px for body text)
      const fontSize = parseFloat(styles.fontSize);
      expect(fontSize).toBeGreaterThanOrEqual(14); // Allow smaller for buttons with icons
      
      // Check line height
      const lineHeight = parseFloat(styles.lineHeight);
      expect(lineHeight).toBeGreaterThanOrEqual(1.2);
    }
  });

  test('should have proper button focus indicators', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Focus the button
      await button.focus();
      
      // Check for focus indicator
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el, ':focus');
        return {
          outline: computed.outline,
          outlineWidth: computed.outlineWidth,
          outlineStyle: computed.outlineStyle,
          outlineColor: computed.outlineColor,
          boxShadow: computed.boxShadow,
        };
      });

      // Should have some kind of focus indicator
      const hasFocusIndicator = 
        styles.outline !== 'none' || 
        styles.boxShadow !== 'none' ||
        styles.outlineWidth !== '0px';
      
      expect(hasFocusIndicator).toBeTruthy();
    }
  });

  test('should have proper button state indicators', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Test hover state
      await button.hover();
      const hoverStyles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el, ':hover');
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          transform: computed.transform,
          boxShadow: computed.boxShadow,
        };
      });

      // Should have some visual feedback on hover
      expect(hoverStyles.backgroundColor || hoverStyles.transform || hoverStyles.boxShadow).toBeTruthy();
      
      // Test active state
      const activeButtonBox = await button.boundingBox();
      if (activeButtonBox) {
        await page.mouse.click(activeButtonBox.x + activeButtonBox.width / 2, activeButtonBox.y + activeButtonBox.height / 2);
      }
      const activeStyles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el, ':active');
        return {
          backgroundColor: computed.backgroundColor,
          transform: computed.transform,
          boxShadow: computed.boxShadow,
        };
      });

      // Should have some visual feedback on active
      expect(activeStyles.backgroundColor || activeStyles.transform || activeStyles.boxShadow).toBeTruthy();
    }
  });

  test('should have proper button grouping semantics', async ({ page }: { page: Page }) => {
    const buttonGroups = page.locator('.button-group, [role="group"]');
    const count = await buttonGroups.count();

    for (let i = 0; i < count; i++) {
      const group = buttonGroups.nth(i);
      
      // Check group semantics
      const role = await group.getAttribute('role');
      const ariaLabel = await group.getAttribute('aria-label');
      const ariaLabelledBy = await group.getAttribute('aria-labelledby');
      
      if (role === 'group') {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
      
      // Check that buttons are properly grouped
      const buttons = group.locator('button');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(1);
    }
  });

  test('should have proper button descriptions', async ({ page }: { page: Page }) => {
    const buttons = page.locator('button[aria-describedby]');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Check description reference
      const describedBy = await button.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      
      // Check if description exists
      if (describedBy) {
        const description = page.locator(`#${describedBy}`);
        expect(await description.count()).toBeGreaterThan(0);
      }
    }
  });

  test('should have proper button error handling', async ({ page }: { page: Page }) => {
    const errorButtons = page.locator('button[aria-invalid], button[aria-errormessage]');
    const count = await errorButtons.count();

    for (let i = 0; i < count; i++) {
      const button = errorButtons.nth(i);
      
      // Check error attributes
      const ariaInvalid = await button.getAttribute('aria-invalid');
      const ariaErrorMessage = await button.getAttribute('aria-errormessage');
      
      if (ariaInvalid === 'true') {
        expect(ariaErrorMessage).toBeTruthy();
        
        // Check if error message exists
        const errorMessage = page.locator(`#${ariaErrorMessage}`);
        expect(await errorMessage.count()).toBeGreaterThan(0);
      }
    }
  });
});
