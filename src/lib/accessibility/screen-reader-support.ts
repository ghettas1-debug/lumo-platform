// Screen Reader Support and Color Contrast Utilities
// Comprehensive screen reader support and WCAG color contrast validation

// WCAG Color Contrast Ratios
export const WCAG_CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,      // Normal text (AA)
  AA_LARGE: 3.0,      // Large text (AA)
  AAA_NORMAL: 7.0,     // Normal text (AAA)
  AAA_LARGE: 4.5      // Large text (AAA)
} as const;

// Color contrast calculation utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const { r, g, b } = rgb;
  
  // Convert RGB to sRGB
  const sRGB = [r, g, b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  // Calculate luminance
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

export function validateColorContrast(
  foreground: string,
  background: string,
  isLargeText: boolean = false,
  level: 'AA' | 'AAA' = 'AA'
): {
  ratio: number;
  passes: boolean;
  level: 'AA' | 'AAA';
  recommendation: string;
} {
  const ratio = getContrastRatio(foreground, background);
  
  const requiredRatio = isLargeText 
    ? (level === 'AA' ? WCAG_CONTRAST_RATIOS.AA_LARGE : WCAG_CONTRAST_RATIOS.AAA_LARGE)
    : (level === 'AA' ? WCAG_CONTRAST_RATIOS.AA_NORMAL : WCAG_CONTRAST_RATIOS.AAA_NORMAL);
  
  const passes = ratio >= requiredRatio;
  
  let recommendation = '';
  if (!passes) {
    if (ratio < WCAG_CONTRAST_RATIOS.AA_NORMAL) {
      recommendation = 'Color contrast is too low. Consider using a darker or lighter color.';
    } else if (ratio < WCAG_CONTRAST_RATIOS.AA_LARGE) {
      recommendation = 'Color contrast is low for large text. Consider adjusting colors.';
    } else if (ratio < WCAG_CONTRAST_RATIOS.AAA_NORMAL) {
      recommendation = 'Color contrast meets AA but not AAA standards.';
    }
  }
  
  return {
    ratio,
    passes,
    level,
    recommendation
  };
}

// Screen reader announcement utilities
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
  timeout: number = 1000
): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after timeout
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, timeout);
}

export function announcePageChange(pageTitle: string): void {
  announceToScreenReader(`Page changed to: ${pageTitle}`, 'assertive');
}

export function announceError(error: string): void {
  announceToScreenReader(`Error: ${error}`, 'assertive');
}

export function announceSuccess(message: string): void {
  announceToScreenReader(`Success: ${message}`, 'polite');
}

export function announceLoading(message: string): void {
  announceToScreenReader(`Loading: ${message}`, 'polite');
}

// Screen reader content descriptions
export function generateImageDescription(
  alt: string,
  context?: string,
  decorative?: boolean
): string {
  if (decorative) {
    return '';
  }
  
  let description = alt;
  
  if (context) {
    description += ` - ${context}`;
  }
  
  return description;
}

export function generateLinkDescription(
  text: string,
  destination?: string,
  external?: boolean
): string {
  let description = text;
  
  if (destination) {
    description += ` - ينتقل إلى ${destination}`;
  }
  
  if (external) {
    description += ' - يفتح في نافذة جديدة';
  }
  
  return description;
}

export function generateButtonDescription(
  text: string,
  context?: string,
  state?: 'pressed' | 'expanded' | 'disabled'
): string {
  let description = text;
  
  if (context) {
    description += ` - ${context}`;
  }
  
  if (state === 'pressed') {
    description += ' - مضغوط';
  } else if (state === 'expanded') {
    description += ' - موسع';
  } else if (state === 'disabled') {
    description += ' - معطل';
  }
  
  return description;
}

// Screen reader navigation landmarks
export function addLandmarkRoles(): void {
  // Add landmark roles to common elements
  const landmarks = [
    { selector: 'header', role: 'banner' },
    { selector: 'nav', role: 'navigation' },
    { selector: 'main', role: 'main' },
    { selector: 'aside', role: 'complementary' },
    { selector: 'footer', role: 'contentinfo' },
    { selector: 'form', role: 'form' },
    { selector: 'section', role: 'region' },
    { selector: 'article', role: 'article' },
  ];

  landmarks.forEach(({ selector, role }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (!element.getAttribute('role')) {
        element.setAttribute('role', role);
      }
    });
  });
}

// Screen reader form utilities
export function enhanceFormAccessibility(form: HTMLElement): void {
  // Add form labels and descriptions
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    const element = input as HTMLElement;
    
    // Ensure each input has a label
    if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
      const label = form.querySelector(`label[for="${element.id}"]`);
      if (label) {
        element.setAttribute('aria-labelledby', label.id || '');
      }
    }
    
    // Add required indicator
    if (element.hasAttribute('required')) {
      element.setAttribute('aria-required', 'true');
    }
    
    // Add invalid indicator
    element.addEventListener('invalid', () => {
      element.setAttribute('aria-invalid', 'true');
      announceToScreenReader(`Field ${element.getAttribute('aria-label') || element.id} is invalid`, 'assertive');
    });
    
    element.addEventListener('input', () => {
      if (element.getAttribute('aria-invalid') === 'true') {
        element.removeAttribute('aria-invalid');
      }
    });
  });
}

// Screen reader table utilities
export function enhanceTableAccessibility(table: HTMLElement): void {
  // Add table caption if missing
  if (!table.querySelector('caption')) {
    const caption = document.createElement('caption');
    caption.textContent = 'جدول البيانات';
    table.insertBefore(caption, table.firstChild);
  }
  
  // Add table headers
  const headers = table.querySelectorAll('th');
  headers.forEach((header, index) => {
    const element = header as HTMLElement;
    if (!element.getAttribute('scope')) {
      element.setAttribute('scope', 'col');
    }
    element.setAttribute('aria-colindex', (index + 1).toString());
  });
  
  // Add table rows
  const rows = table.querySelectorAll('tr');
  rows.forEach((row, index) => {
    const element = row as HTMLElement;
    element.setAttribute('aria-rowindex', (index + 1).toString());
  });
}

// Screen reader list utilities
export function enhanceListAccessibility(list: HTMLElement): void {
  const listType = list.tagName.toLowerCase();
  const role = listType === 'ul' ? 'list' : listType === 'ol' ? 'list' : 'list';
  
  if (!list.getAttribute('role')) {
    list.setAttribute('role', role);
  }
  
  const items = list.querySelectorAll('li');
  items.forEach((item, index) => {
    const element = item as HTMLElement;
    element.setAttribute('aria-setsize', items.length.toString());
    element.setAttribute('aria-posinset', (index + 1).toString());
  });
}

// Screen reader progress utilities
export function enhanceProgressAccessibility(progress: HTMLElement): void {
  if (!progress.getAttribute('role')) {
    progress.setAttribute('role', 'progressbar');
  }
  
  const value = progress.getAttribute('value') || '0';
  const max = progress.getAttribute('max') || '100';
  
  progress.setAttribute('aria-valuenow', value);
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', max);
  progress.setAttribute('aria-valuetext', `${value} من ${max}`);
}

// Screen reader status utilities
export function updateStatus(status: string, type: 'polite' | 'assertive' = 'polite'): void {
  announceToScreenReader(status, type);
}

// Color contrast checker utility
export function checkPageColorContrast(): {
  elements: Array<{
    element: string;
    foreground: string;
    background: string;
    ratio: number;
    passes: boolean;
    level: string;
  }>;
  summary: {
    total: number;
    passing: number;
    failing: number;
    passRate: number;
  };
} {
  const elements: Array<{
    element: string;
    foreground: string;
    background: string;
    ratio: number;
    passes: boolean;
    level: string;
  }> = [];
  
  // Check common text elements
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, button');
  
  textElements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const foreground = computedStyle.color;
    const background = computedStyle.backgroundColor;
    
    if (foreground && background && background !== 'rgba(0, 0, 0, 0)') {
      const foregroundHex = rgbToHex(
        parseInt(foreground.slice(4, 7), 16),
        parseInt(foreground.slice(9, 12), 16),
        parseInt(foreground.slice(14, 17), 16)
      );
      
      const backgroundRgb = background.match(/\d+/g);
      if (backgroundRgb && backgroundRgb.length >= 3) {
        const backgroundHex = rgbToHex(
          parseInt(backgroundRgb[0]),
          parseInt(backgroundRgb[1]),
          parseInt(backgroundRgb[2])
        );
        
        const ratio = getContrastRatio(foregroundHex, backgroundHex);
        const isLargeText = parseInt(computedStyle.fontSize) >= 18;
        
        const validation = validateColorContrast(foregroundHex, backgroundHex, isLargeText);
        
        elements.push({
          element: element.tagName.toLowerCase(),
          foreground: foregroundHex,
          background: backgroundHex,
          ratio,
          passes: validation.passes,
          level: validation.level
        });
      }
    }
  });
  
  const passing = elements.filter(el => el.passes).length;
  const failing = elements.length - passing;
  
  return {
    elements,
    summary: {
      total: elements.length,
      passing,
      failing,
      passRate: elements.length > 0 ? (passing / elements.length) * 100 : 0
    }
  };
}

// Export all utilities
export const ScreenReaderUtils = {
  WCAG_CONTRAST_RATIOS,
  hexToRgb,
  rgbToHex,
  getLuminance,
  getContrastRatio,
  validateColorContrast,
  announceToScreenReader,
  announcePageChange,
  announceError,
  announceSuccess,
  announceLoading,
  generateImageDescription,
  generateLinkDescription,
  generateButtonDescription,
  addLandmarkRoles,
  enhanceFormAccessibility,
  enhanceTableAccessibility,
  enhanceListAccessibility,
  enhanceProgressAccessibility,
  updateStatus,
  checkPageColorContrast
};

export default ScreenReaderUtils;
