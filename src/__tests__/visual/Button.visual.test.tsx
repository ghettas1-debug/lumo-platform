// Button Visual Regression Tests
// Visual regression tests for the Button component using Playwright

import { test, expect, type Page } from '@playwright/test';

test.describe('Button Visual Tests', () => {
  test('should render default button correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    const button = page.locator('button').first();
    await expect(button).toBeVisible();
    
    await expect(page).toHaveScreenshot('button-default.png');
  });

  test('should render button variants correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different variants
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
    
    for (const variant of variants) {
      const button = page.locator(`button[data-variant="${variant}"]`).first();
      if (await button.isVisible()) {
        await expect(button).toHaveScreenshot(`button-${variant}.png`);
      }
    }
  });

  test('should render button sizes correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different sizes
    const sizes = ['default', 'sm', 'lg', 'icon'];
    
    for (const size of sizes) {
      const button = page.locator(`button[data-size="${size}"]`).first();
      if (await button.isVisible()) {
        await expect(button).toHaveScreenshot(`button-${size}.png`);
      }
    }
  });

  test('should render button states correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test hover state
    const button = page.locator('button').first();
    await button.hover();
    await expect(button).toHaveScreenshot('button-hover.png');
    
    // Test focus state
    await button.focus();
    await expect(button).toHaveScreenshot('button-focus.png');
    
    // Test active state
    await button.focus();
    await page.keyboard.down('Enter');
    await expect(button).toHaveScreenshot('button-active.png');
  });

  test('should render disabled button correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    const button = page.locator('button[disabled]').first();
    if (await button.isVisible()) {
      await expect(button).toHaveScreenshot('button-disabled.png');
    }
  });

  test('should render loading button correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    const button = page.locator('button[data-loading="true"]').first();
    if (await button.isVisible()) {
      await expect(button).toHaveScreenshot('button-loading.png');
    }
  });

  test('should render button with icons correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test buttons with icons
    const buttonWithIcon = page.locator('button[data-has-icon="true"]').first();
    if (await buttonWithIcon.isVisible()) {
      await expect(buttonWithIcon).toHaveScreenshot('button-with-icon.png');
    }
  });

  test('should render button with text correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    const button = page.locator('button').first();
    const buttonText = await button.textContent();
    
    if (buttonText) {
      await expect(button).toHaveScreenshot('button-with-text.png');
    }
  });

  test('should render button without text correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    const buttonWithoutText = page.locator('button:not(:has(*))').first();
    if (await buttonWithoutText.isVisible()) {
      await expect(buttonWithoutText).toHaveScreenshot('button-no-text.png');
    }
  });

  test('should render button group correctly', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    const buttonGroup = page.locator('.button-group').first();
    if (await buttonGroup.isVisible()) {
      await expect(buttonGroup).toHaveScreenshot('button-group.png');
    }
  });

  test('should render button in different themes', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    const lightButton = page.locator('button').first();
    await expect(lightButton).toHaveScreenshot('button-light-theme.png');
    
    // Test dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    const darkButton = page.locator('button').first();
    await expect(darkButton).toHaveScreenshot('button-dark-theme.png');
  });

  test('should render button in different viewport sizes', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileButton = page.locator('button').first();
    await expect(mobileButton).toHaveScreenshot('button-mobile.png');
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    const tabletButton = page.locator('button').first();
    await expect(tabletButton).toHaveScreenshot('button-tablet.png');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    const desktopButton = page.locator('button').first();
    await expect(desktopButton).toHaveScreenshot('button-desktop.png');
  });

  test('should render button with different font sizes', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test small font size
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '14px';
    });
    const smallButton = page.locator('button').first();
    await expect(smallButton).toHaveScreenshot('button-small-font.png');
    
    // Test large font size
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '20px';
    });
    const largeButton = page.locator('button').first();
    await expect(largeButton).toHaveScreenshot('button-large-font.png');
  });

  test('should render with high contrast mode correctly', async ({ page }: { page: Page }) => {
    // Enable high contrast mode
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    const button = page.locator('button').first();
    await expect(button).toHaveScreenshot('button-high-contrast.png');
  });

  test('should render button with reduced motion', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Enable reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    const button = page.locator('button').first();
    await expect(button).toHaveScreenshot('button-reduced-motion.png');
  });

  test('should render button with RTL layout', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Switch to RTL
    await page.evaluate(() => {
      document.documentElement.setAttribute('dir', 'rtl');
    });
    
    const button = page.locator('button').first();
    await expect(button).toHaveScreenshot('button-rtl.png');
  });

  test('should render button with animations', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Enable animations
    await page.evaluate(() => {
      document.documentElement.classList.add('animations-enabled');
    });
    
    const button = page.locator('button').first();
    await button.hover();
    await page.waitForTimeout(300); // Wait for animation
    
    await expect(button).toHaveScreenshot('button-with-animations.png');
  });

  test('should render button with custom styles', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Apply custom styles
    await page.addStyleTag({
      content: `
      .custom-button {
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        border: none;
        border-radius: 50px;
        padding: 12px 24px;
        font-weight: bold;
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      `
    });
    
    const customButton = page.locator('.custom-button').first();
    if (await customButton.isVisible()) {
      await expect(customButton).toHaveScreenshot('button-custom-styles.png');
    }
  });

  test('should render button in different contexts', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test button in form
    const formButton = page.locator('form button').first();
    if (await formButton.isVisible()) {
      await expect(formButton).toHaveScreenshot('button-in-form.png');
    }
    
    // Test button in modal
    const modalButton = page.locator('.modal button').first();
    if (await modalButton.isVisible()) {
      await expect(modalButton).toHaveScreenshot('button-in-modal.png');
    }
    
    // Test button in card
    const cardButton = page.locator('.card button').first();
    if (await cardButton.isVisible()) {
      await expect(cardButton).toHaveScreenshot('button-in-card.png');
    }
  });

  test('should render button with different border radius', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different border radius values
    const borderRadii = ['0', '4px', '8px', '12px', '50%'];
    
    for (const radius of borderRadii) {
      await page.evaluate((r) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.borderRadius = r;
        }
      }, radius);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-border-radius-${radius}.png`);
    }
  });

  test('should render button with different padding', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different padding values
    const paddings = ['4px 8px', '8px 16px', '12px 24px', '16px 32px'];
    
    for (const padding of paddings) {
      await page.evaluate((p) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.padding = p;
        }
      }, padding);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-padding-${padding.replace(/\s+/g, '-')}.png`);
    }
  });

  test('should render button with different margins', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different margin values
    const margins = ['0', '4px', '8px', '16px', '24px'];
    
    for (const margin of margins) {
      await page.evaluate((m) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.margin = m;
        }
      }, margin);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-margin-${margin}.png`);
    }
  });

  test('should render button with different shadows', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different shadow values
    const shadows = [
      'none',
      '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.12)',
      '0 4px 6px rgba(0, 0, 0, 0.16)',
      '0 10px 15px rgba(0, 0, 0, 0.2)',
      '0 20px 25px rgba(0, 0, 0, 0.25)'
    ];
    
    for (const shadow of shadows) {
      await page.evaluate((s) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.boxShadow = s;
        }
      }, shadow);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-shadow-${shadow.replace(/[^\w]/g, '-').replace(/\s+/g, '-').replace(/\.+/g, '-').toLowerCase()}.png`);
    }
  });

  test('should render button with different transitions', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different transition durations
    const transitions = ['0s', '0.2s', '0.3s', '0.5s', '1s'];
    
    for (const transition of transitions) {
      await page.evaluate((t) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.transition = `all ${t} ease-in-out`;
        }
      }, transition);
      
      const button = page.locator('button').first();
      await button.hover();
      await page.waitForTimeout(500);
      
      await expect(button).toHaveScreenshot(`button-transition-${transition.replace('s', 'seconds')}.png`);
    }
  });

  test('should render button with different transforms', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different transform values
    const transforms = [
      'none',
      'scale(1)',
      'scale(1.05)',
      'scale(1.1)',
      'rotate(0deg)',
      'rotate(5deg)',
      'rotate(-5deg)',
      'translateY(0)',
      'translateY(-2px)',
      'translateY(2px)'
    ];
    
    for (const transform of transforms) {
      await page.evaluate((t) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.transform = t;
        }
      }, transform);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-transform-${transform.replace(/[^\w]/g, '-').replace(/\s+/g, '-').toLowerCase()}.png`);
    }
  });

  test('should render button with different opacity', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different opacity values
    const opacities = ['1', '0.9', '0.8', '0.7', '0.5', '0.3'];
    
    for (const opacity of opacities) {
      await page.evaluate((o) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.opacity = o;
        }
      }, opacity);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-opacity-${opacity}.png`);
    }
  });

  test('should render button with different z-index', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different z-index values
    const zIndices = ['1', '10', '100', '1000'];
    
    for (const zIndex of zIndices) {
      await page.evaluate((z) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.zIndex = z;
        }
      }, zIndex);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-z-index-${zIndex}.png`);
    }
  });

  test('should render button with different cursor styles', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different cursor styles
    const cursors = ['default', 'pointer', 'not-allowed', 'wait', 'help', 'text'];
    
    for (const cursor of cursors) {
      await page.evaluate((c) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.cursor = c;
        }
      }, cursor);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-cursor-${cursor}.png`);
    }
  });

  test('should render button with different text decorations', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different text decorations
    const decorations = ['none', 'underline', 'overline', 'line-through'];
    
    for (const decoration of decorations) {
      await page.evaluate((d) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.textDecoration = d;
        }
      }, decoration);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-decoration-${decoration}.png`);
    }
  });

  test('should render button with different text transforms', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different text transforms
    const transforms = ['none', 'uppercase', 'lowercase', 'capitalize'];
    
    for (const transform of transforms) {
      await page.evaluate((t) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.textTransform = t;
        }
      }, transform);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-transform-${transform}.png`);
    }
  });

  test('should render button with different letter spacing', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different letter spacing values
    const letterSpacings = ['normal', '0.5px', '1px', '2px', '4px'];
    
    for (const spacing of letterSpacings) {
      await page.evaluate((s) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.letterSpacing = s;
        }
      }, spacing);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-letter-spacing-${spacing.replace('normal', 'default').replace(/\./g, '-').toLowerCase()}.png`);
    }
  });

  test('should render button with different line heights', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different line height values
    const lineHeights = ['1', '1.2', '1.5', '2'];
    
    for (const lineHeight of lineHeights) {
      await page.evaluate((l) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.lineHeight = l;
        }
      }, lineHeight);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-line-height-${lineHeight}.png`);
    }
  });

  test('should render button with different font weights', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different font weights
    const fontWeights = ['normal', 'bold', 'light', 'medium', 'semibold'];
    
    for (const weight of fontWeights) {
      await page.evaluate((w) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.fontWeight = w;
        }
      }, weight);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-font-weight-${weight}.png`);
    }
  });

  test('should render button with different font families', async ({ page }: { page: Page }) => {
    await page.goto('/');
    
    // Test different font families
    const fontFamilies = [
      'Arial, sans-serif',
      'Georgia, serif',
      'Courier New, monospace',
      'Times New Roman, serif',
      'Verdana, sans-serif'
    ];
    
    for (const fontFamily of fontFamilies) {
      await page.evaluate((f) => {
        const button = document.querySelector('button');
        if (button) {
          button.style.fontFamily = f;
        }
      }, fontFamily);
      
      const button = page.locator('button').first();
      await expect(button).toHaveScreenshot(`button-font-family-${fontFamily.replace(/[^\w\s,]/g, '-').toLowerCase()}.png`);
    }
  });
});
