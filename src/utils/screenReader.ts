'use client';

// Screen Reader Support Utilities
export interface ScreenReaderAnnouncement {
  message: string;
  priority: 'polite' | 'assertive' | 'off';
  timeout?: number;
}

export interface ScreenReaderElement {
  element: HTMLElement;
  label?: string;
  description?: string;
  role?: string;
  state?: string;
  value?: string | number;
  checked?: boolean;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  busy?: boolean;
  live?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

class ScreenReaderManager {
  private liveRegions: Map<string, HTMLElement> = new Map();
  private announcementQueue: ScreenReaderAnnouncement[] = [];
  private isProcessingQueue = false;
  private currentLanguage = 'ar';

  constructor() {
    this.initializeLiveRegions();
    this.setupLanguageDetection();
  }

  // Initialize live regions for screen readers
  private initializeLiveRegions(): void {
    // Create polite live region for general announcements
    this.createLiveRegion('polite', 'polite');

    // Create assertive live region for important announcements
    this.createLiveRegion('assertive', 'assertive');

    // Create status live region for status updates
    this.createLiveRegion('status', 'polite');

    // Create navigation live region for navigation changes
    this.createLiveRegion('navigation', 'polite');
  }

  // Create a live region
  private createLiveRegion(id: string, politeness: 'polite' | 'assertive' | 'off'): void {
    let region = document.getElementById(`screen-reader-${id}`);
    
    if (!region) {
      region = document.createElement('div');
      region.setAttribute('id', `screen-reader-${id}`);
      region.setAttribute('aria-live', politeness);
      region.setAttribute('aria-atomic', politeness === 'off' ? 'false' : 'true');
      region.setAttribute('class', 'sr-only');
      document.body.appendChild(region);
    }
    
    this.liveRegions.set(id, region);
  }

  // Setup language detection
  private setupLanguageDetection(): void {
    // Detect page language
    const htmlLang = document.documentElement.getAttribute('lang') || 'ar';
    this.currentLanguage = htmlLang;
    
    // Listen for language changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
          const newLang = document.documentElement.getAttribute('lang');
          if (newLang && newLang !== this.currentLanguage) {
            this.currentLanguage = newLang;
            this.announce(`تم تغيير لغة الصفحة إلى ${this.getLanguageName(newLang)}`, 'polite');
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }

  // Get language name in Arabic
  private getLanguageName(lang: string): string {
    const languages: Record<string, string> = {
      'ar': 'العربية',
      'en': 'English',
      'fr': 'Français',
      'de': 'Deutsch',
      'es': 'Español',
      'it': 'Italiano',
      'pt': 'Português',
      'ru': 'Русский',
      'zh': 'الصينية',
      'ja': '日本語',
      'ko': '한국어',
      'tr': 'Türkçe',
      'fa': 'فارسی',
      'ur': 'اردو',
      'hi': 'हिन्दी',
      'bn': 'বাংলা',
      'th': 'ไทย',
      'vi': 'Tiếng Việt',
      'id': 'Bahasa Indonesia',
      'ms': 'Bahasa Melayu',
    };

    return languages[lang] || lang;
  }

  // Announce message to screen readers
  announce(message: string, priority: 'polite' | 'assertive' | 'off' = 'polite', timeout = 1000): void {
    const announcement: ScreenReaderAnnouncement = {
      message,
      priority,
      timeout,
    };

    if (priority === 'assertive') {
      // Immediately announce assertive messages
      this.announceImmediately(announcement);
    } else {
      // Queue polite messages
      this.announcementQueue.push(announcement);
      this.processQueue();
    }
  }

  // Immediately announce a message
  private announceImmediately(announcement: ScreenReaderAnnouncement): void {
    const region = this.liveRegions.get(announcement.priority);
    if (region) {
      region.textContent = announcement.message;
      
      if (announcement.timeout > 0) {
        setTimeout(() => {
          region.textContent = '';
        }, announcement.timeout);
      }
    }
  }

  // Process announcement queue
  private processQueue(): void {
    if (this.isProcessingQueue || this.announcementQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    const processNext = () => {
      const announcement = this.announcementQueue.shift();
      if (announcement) {
        this.announceImmediately(announcement);
        
        // Process next announcement after a short delay
        setTimeout(processNext, 100);
      } else {
        this.isProcessingQueue = false;
      }
    };

    processNext();
  }

  // Announce element state change
  announceElement(element: ScreenReaderElement): void {
    const { element: el, label, description, role, state, value, checked, expanded, selected, disabled, invalid, required, busy } = element;

    let message = '';

    // Build announcement message based on element properties
    if (state) {
      message += `${state} `;
    }

    if (label) {
      message += label;
    } else if (el.textContent) {
      message += el.textContent.trim();
    }

    if (description) {
      message += ` - ${description}`;
    }

    if (role) {
      message += ` (${role})`;
    }

    if (value !== undefined) {
      message += ` القيمة: ${value}`;
    }

    if (checked !== undefined) {
      message += checked ? ' محدد' : ' غير محدد';
    }

    if (expanded !== undefined) {
      message += expanded ? ' موسع' : ' مطوي';
    }

    if (selected !== undefined) {
      message += selected ? ' محدد' : ' غير محدد';
    }

    if (disabled) {
      message += ' معطلق';
    }

    if (invalid) {
      message += ' غير صالح';
    }

    if (required) {
      message += ' مطلوب';
    }

    if (busy) {
      message += ' مشغول';
    }

    if (message) {
      const priority = (invalid || required) ? 'assertive' : 'polite';
      this.announce(message, priority);
    }
  }

  // Announce navigation change
  announceNavigation(from: string, to: string): void {
    this.announce(`الانتقل من ${from} إلى ${to}`, 'polite');
  }

  // Announce page title change
  announcePageTitle(title: string): void {
    this.announce(`صفحة ${title}`, 'polite');
  }

  // Announce form validation error
  announceFormError(field: string, error: string): void {
    this.announce(`خطأ في حقل ${field}: ${error}`, 'assertive');
  }

  // Announce form success
  announceFormSuccess(message: string): void {
    this.announcementQueue.push({
      message,
      priority: 'polite',
      timeout: 3000,
    });
    this.processQueue();
  }

  // Announce loading state
  announceLoading(message: string): void {
    this.announce(message, 'polite');
  }

  // Announce error
  announceError(error: string): void {
    this.announce(`خطأ: ${error}`, 'assertive');
  }

  // Announce success
  announceSuccess(message: string): void {
    this.announce(`نجاح: ${message}`, 'polite');
  }

  // Announce warning
  announceWarning(message: string): void {
    this.announce(`تحذير: ${message}`, 'polite');
  }

  // Announce info
  announceInfo(message: string): void {
    this.announce(`معلومات: ${message}`, 'polite');
  }

  // Get current language
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  // Check if screen reader is active
  isScreenReaderActive(): boolean {
    // Check if any screen reader is running
    return (
      window.speechSynthesis !== undefined ||
      navigator.userAgent.includes('NVDA') ||
      navigator.userAgent.includes('JAWS') ||
      navigator.userAgent.includes('ChromeVox') ||
      navigator.userAgent.includes('ZoomText')
    );
  }

  // Get screen reader info
  getScreenReaderInfo(): {
    name: string;
    version: string;
    isActive: boolean;
    language: string;
  } {
    const userAgent = navigator.userAgent;
    let name = 'Unknown';
    let version = 'Unknown';

    if (userAgent.includes('NVDA')) {
      name = 'NVDA';
      const match = userAgent.match(/NVDA\/([\d.]+)/);
      version = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('JAWS')) {
      name = 'JAWS';
    } else if (userAgent.includes('ChromeVox')) {
      name = 'ChromeVox';
    } else if (userAgent.includes('ZoomText')) {
      name = 'ZoomText';
    }

    return {
      name,
      version,
      isActive: this.isScreenReaderActive(),
      language: this.getCurrentLanguage(),
    };
  }

  // Test screen reader functionality
  testScreenReader(): void {
    this.announce('اختبار قارئ الشاشة', 'polite');
    setTimeout(() => {
      this.announce('اختبار اكتمل بنجاح', 'polite');
    }, 1000);
  }
}

// Create singleton instance
const screenReaderManager = new ScreenReaderManager();

// Export screen reader utilities
export const screenReaderUtils = {
  announce: (message: string, priority?: 'polite' | 'assertive' | 'off', timeout?: number) => {
    screenReaderManager.announce(message, priority, timeout);
  },

  announceElement: (element: HTMLElement, options?: Partial<ScreenReaderElement>) => {
    screenReaderManager.announceElement({ element, ...options });
  },

  announceNavigation: (from: string, to: string) => {
    screenReaderManager.announceNavigation(from, to);
  },

  announcePageTitle: (title: string) => {
    screenReaderManager.announcePageTitle(title);
  },

  announceFormError: (field: string, error: string) => {
    screenReaderManager.announceFormError(field, error);
  },

  announceFormSuccess: (message: string) => {
    screenReaderManager.announceFormSuccess(message);
  },

  announceLoading: (message: string) => {
    screenReaderManager.announceLoading(message);
  },

  announceError: (error: string) => {
      screenReaderManager.announceError(error);
    },

  announceSuccess: (message: string) => {
      screenReaderManager.announceSuccess(message);
    },

  announceWarning: (message: string) => {
      screenReaderManager.announceWarning(message);
    },

  announceInfo: (message: string) => {
      screenReaderManager.announceInfo(message);
    },

  getCurrentLanguage: () => screenReaderManager.getCurrentLanguage(),

  isScreenReaderActive: () => screenReaderManager.isScreenReaderActive(),

  getScreenReaderInfo: () => screenReaderManager.getScreenReaderInfo(),

  testScreenReader: () => screenReaderManager.testScreenReader(),
};

// Export default instance
export default screenReaderManager;

// Hook for screen reader integration
export const useScreenReader = () => {
  const [isScreenReader, setIsScreenReader] = useState(false);

  useEffect(() => {
    setIsScreenReader(screenReaderUtils.isScreenReaderActive());
    
    const checkInterval = setInterval(() => {
      setIsScreenReader(screenReaderUtils.isScreenReaderActive());
    }, 1000);

    return () => clearInterval(checkInterval);
  }, []);

  return {
    isScreenReader,
    announce: screenReaderUtils.announce,
    announceElement: screenReaderUtils.announceElement,
    announceNavigation: screenReaderUtils.announceNavigation,
    announcePageTitle: screenReaderUtils.announcePageTitle,
    announceFormError: screenReaderUtils.announceFormError,
    announceFormSuccess: screenReaderUtils.announceFormSuccess,
    announceLoading: screenReaderUtils.announceLoading,
    announceError: screenReaderUtils.announceError,
    announceSuccess: screenReaderUtils.announceSuccess,
    announceWarning: screenReaderUtils.announceWarning,
    announceInfo: screenReaderUtils.announceInfo,
    getCurrentLanguage: screenReaderUtils.getCurrentLanguage,
    getScreenReaderInfo: screenReaderUtils.getScreenReaderInfo,
    testScreenReader: screenReaderUtils.testScreenReader,
  };
};

// Hook for color contrast validation
export const useColorContrast = () => {
  const [contrastIssues, setContrastIssues] = useState<Array<{
    element: HTMLElement;
    issue: string;
    ratio: number;
    wcagLevel: 'AA' | 'AAA' | 'FAIL';
  }>>([]);

  // Check color contrast
  const checkContrast = useCallback((element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;

    // Convert RGB to hex
    const rgbToHex = (rgb: string): string => {
      const result = rgb.match(/\d+/g);
      return result ? '#' + result.slice(0, 3).map(x => {
        const hex = parseInt(x, 16).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('') : '#000000';
    };

    // Calculate relative luminance
    const getRelativeLuminance = (rgb: string): number => {
      const rgbArray = rgb.match(/\d+/g);
      if (!rgbArray || rgbArray.length < 3) return 0;

      const [r, g, b] = rgbArray.map(Number);
      const rsRGB = r / 255;
      const gsRGB = g / 255;
      const bsRGB = b / 255;

      let R, G, B;
      if (rsRGB <= 0.03928) {
        R = rsRGB / 12.92;
      } else if (element <= 0.03928) {
        R = Math.pow((rsRGB + 0.055) / 1.055, 2.4);
      } else {
        R = Math.pow(rsRGB, 2.4);
      }

      if (gsRGB <= 0.03928) {
        G = gsRGB / 12.92;
      } else if (gsRGB <= 0.03928) {
        G = Math.pow((gsRGB + 0.055) / 1.055, 2.4);
      } else {
        G = Math.pow(gsRGB, 2.4);
      }

      if (bsRGB <= 0.03928) {
        B = bsRGB / 12.92;
      } else if (bsRGB <= 0.03928) {
        B = Math.pow((bsRGB + 0.055) / 1.055, 2.4);
      } else {
         B = Math.pow(bsRGB, 2.4);
      }

      return 0.2126 * R + 0.7152 * G + 0.072 * B;
    };

    // Calculate contrast ratio
    const getContrastRatio = (color1: string, color2: string): number => {
      const lum1 = getRelativeLuminance(color1);
      const lum2 = getRelativeLuminance(color2);
      
      const lighter = Math.max(lum1, lum2);
      const darker = Math.min(lum1, lum2);
      
      return (lighter + 0.05) / (darker + 0.05);
    };

    const contrastRatio = getContrastRatio(color, backgroundColor);
    
    // Check WCAG compliance
    let wcagLevel: 'AA' | 'AAA' | 'FAIL' = 'FAIL';
    let issue = '';

    if (contrastRatio >= 7) {
      wcagLevel = 'AAA';
    } else if (contrastRatio >= 4.5) {
      wcagLevel = 'AA';
    } else {
      issue = `Contrast ratio ${contrastRatio.toFixed(2)} is below WCAG AA minimum of 4.5:1`;
    }

    return {
      element,
      issue,
      ratio: contrastRatio,
      wcagLevel,
    };
  }, []);

  // Check contrast for an element
  const checkElementContrast = useCallback((element: HTMLElement) => {
    const issue = checkContrast(element);
    
    if (issue.wcagLevel !== 'FAIL') {
      setContrastIssues(prev => [...prev, issue]);
    }
    
    return issue;
  }, [checkContrast]);

  // Check contrast for multiple elements
  const checkElementsContrast = useCallback((elements: HTMLElement[]) => {
    const issues = elements.map(checkElementContrast);
    setContrastIssues(issues);
    return issues;
  }, []);

  // Get contrast issues
  const getContrastIssues = useCallback(() => contrastIssues, [contrastIssues]);

  // Clear contrast issues
  const clearContrastIssues = useCallback(() => {
    setContrastIssues([]);
  }, []);

  // Fix contrast issues
  const fixContrastIssues = useCallback(() => {
    contrastIssues.forEach(({ element, issue }) => {
      if (issue.wcagLevel !== 'FAIL') return;

      const computedStyle = window.getComputedStyle(element);
      const currentColor = computedStyle.color;
      const currentBg = computedStyle.backgroundColor;

      // Simple contrast fix - adjust text color
      const bgColorLuminance = getRelativeLuminance(currentBg);
      
      let newColor = currentColor;
      
      if (bgColorLuminance > 0.5) {
        // Dark background - use light text
        newColor = '#000000';
      } else {
        // Light background - use dark text
        newColor = '#000000';
      }

      element.style.color = newColor;
      
      // Re-check contrast
      const newIssue = checkContrast(element);
      
      // Update issues list
      setContrastIssues(prev => {
        const index = prev.findIndex(item => item.element === element);
        if (index !== -1) {
          const updatedIssues = [...prev];
          updatedIssues[index] = newIssue;
          return updatedIssues;
        }
        return prev;
      });
    });
  }, [checkContrast, contrastIssues]);

  return {
    contrastIssues,
    checkContrast,
    checkElementContrast,
    checkElementsContrast,
    getContrastIssues,
    clearContrastIssues,
    fixContrastIssues,
  };
};

// Hook for accessibility validation
export const useAccessibilityValidation = () => {
  const [issues, setIssues] = useState<Array<{
    type: 'aria' | 'keyboard' | 'contrast' | 'focus' | 'color' | 'structure';
    element: HTMLElement;
    message: string;
    severity: 'error' | 'warning' | 'info';
    wcagLevel: 'A' | 'AA' | 'AAA' | 'FAIL';
  }>>([]);

  // Validate ARIA attributes
  const validateARIA = useCallback((element: HTMLElement): Array<{
    type: 'aria' | 'keyboard' | 'contrast' | 'focus' | 'color' | 'structure';
    element: HTMLElement;
    message: string;
    severity: 'error' | 'warning' | 'info';
    wcagLevel: 'A' | 'AA' | 'AAA' | 'FAIL';
  }> => {
    const issues: Array<{
      type: 'aria' | 'keyboard' | 'contrast' | 'focus' | 'color' | 'structure';
      element: HTMLElement;
      message: string;
      severity: 'error' | 'warning' | 'info';
      wcagLevel: 'A' | 'A' | 'AA' | 'AAA' | 'FAIL';
    }> = [];

    // Check for required ARIA attributes
    const requiredAttributes = {
      button: ['aria-label', 'aria-pressed'],
      a: ['aria-label', 'aria-describedby'],
      input: ['aria-label', 'aria-required', 'aria-invalid'],
      textarea: ['aria-label', 'aria-required', 'aria-invalid'],
      select: ['aria-label', 'aria-required', 'aria-invalid'],
      img: ['alt'],
      'aria-label': ['aria-expanded', 'aria-pressed', 'aria-selected', 'aria-checked'],
      'aria-describedby': ['aria-expanded', 'aria-pressed', 'aria-selected', 'aria-checked'],
      'aria-labelledby': ['aria-expanded', 'aria-pressed', 'aria-selected', 'aria-checked'],
    };

    const tagName = element.tagName.toLowerCase();
    const attributes = requiredAttributes[tagName as keyof typeof requiredAttributes];

    if (attributes) {
      attributes.forEach(attr => {
        if (!element.hasAttribute(attr)) {
          issues.push({
            type: 'aria',
            element,
            message: `Missing required ARIA attribute: ${attr}`,
            severity: 'error',
            wcagLevel: 'A',
          });
        }
      });
    }

    // Check for invalid ARIA attributes
    const invalidAttributes = [
      'aria-hidden="true" on focusable element',
      'aria-label=""',
      'aria-labelledby=""',
      'aria-describedby=""',
      'role="presentation" on interactive element',
      'role="img" on non-img element',
      'role="button" on non-button element',
    ];

    invalidAttributes.forEach(attr => {
      if (element.hasAttribute(attr)) {
        issues.push({
          type: 'aria',
          element,
          message: `Invalid ARIA attribute: ${attr}`,
          severity: 'warning',
          wcagLevel: 'AA',
        });
      }
    });

    return issues;
  }, []);

  // Validate keyboard accessibility
  const validateKeyboard = useCallback((element: HTMLElement): Array<{
    type: 'aria' | 'keyboard' | 'contrast' | 'focus' | 'color' | 'structure';
    element: HTMLElement;
    message: string;
    severity: 'error' | 'warning' | 'info';
    wcagLevel: 'A' | 'A' | 'AA' | 'AAA' | 'FAIL';
  }> => {
    const issues: Array<{
      type: 'aria' | 'keyboard' | 'contrast' | 'focus' | 'color' | 'structure';
      element: HTMLElement;
      message: string;
      severity: 'error' | 'warning' | 'info';
      wcagLevel: 'A' | 'A' | 'AA' | 'AAA' | 'FAIL';
    }> = [];

    // Check for keyboard accessibility
    if (element.tabIndex < 0 && element.getAttribute('tabindex') !== '-1') {
      issues.push({
        type: 'keyboard',
        element,
        message: 'Negative tabindex can cause keyboard navigation issues',
        severity: 'warning',
        wcagLevel: 'A',
      });
    }

    // Check for focus management
    if (!element.hasAttribute('tabindex') && 
        element.tagName !== 'script' && 
        element.tagName !== 'style' &&
        element.tagName !== 'meta' &&
        element.tagName !== 'link' &&
        !element.hasAttribute('aria-hidden')) {
      
      const style = window.getComputedStyle(element);
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        issues.push({
          type: 'focus',
          element,
          message: 'Element is focusable but lacks tabindex',
          severity: 'warning',
          wcagLevel: 'A',
        });
      }
    }

    return issues;
  }, []);

  // Validate structure
  const validateStructure = useCallback((element: HTMLElement): Array<{
    type: 'aria' | 'keyboard' | 'contrast' | 'focus' | 'color' | 'structure';
    element: HTMLElement;
    message: string;
    severity: 'error' | 'warning' | 'info';
    wcagLevel: 'A' | 'A' | 'AA' | 'AAA' | 'FAIL';
  }> => {
    const issues: Array<{
      type: 'aria' | 'keyboard' | 'contrast' | 'focus' | 'color' | 'structure';
      element: HTMLElement;
      message: string;
      severity: 'error' | 'warning' | 'info';
      wcagLevel: 'A' | 'A' | 'AA' | 'AAA' | 'FAIL';
    }> = [];

    // Check for proper heading structure
    if (element.tagName.match(/^h[1-6]$/)) {
      const level = parseInt(element.tagName.charAt(1));
      const nextHeading = element.nextElementSibling;
      
      if (nextHeading && nextHeading.tagName.match(/^h[1-6]$/)) {
        const nextLevel = parseInt(nextHeading.tagName.charAt(1));
        
        if (nextLevel > level + 1) {
          issues.push({
            type: 'structure',
            element,
            message: `Heading level jump detected: H${level} followed by H${nextLevel}`,
            severity: 'warning',
            wcagLevel: 'AA',
          });
        }
      }
    }

    // Check for proper list structure
    if (element.tagName === 'ul' || element.tagName === 'ol') {
      const listItems = element.querySelectorAll('li');
      if (listItems.length === 0) {
        issues.push({
          type: 'structure',
          element,
          message: 'Empty list found',
          severity: 'warning',
          wcagLevel: 'AA',
        });
      }
    }

    return issues;
  }, []);

  // Validate all accessibility aspects
  const validateAccessibility = useCallback((element: HTMLElement) => {
    const ariaIssues = validateARIA(element);
    const keyboardIssues = validateKeyboard(element);
    const structureIssues = validateStructure(element);
    
    const allIssues = [...ariaIssues, ...keyboardIssues, ...structureIssues];
    
    setIssues(allIssues);
    
    return {
      issues: allIssues,
      hasErrors: allIssues.some(issue => issue.severity === 'error'),
      hasWarnings: allIssues.some(issue => issue.severity === 'warning'),
      hasInfo: allIssues.some(issue => issue.severity === 'info'),
      wcagLevel: allIssues.length > 0 ? 
        Math.max(...allIssues.map(issue => 
          issue.wcagLevel === 'AAA' ? 3 : issue.wcagLevel === 'AA' ? 2 : issue.wcagLevel === 'A' ? 1 : 0
        )) : 0,
    };
  }, [validateARIA, validateKeyboard, validateStructure]);

  return {
    issues,
    validateAccessibility,
    validateARIA,
    validateKeyboard,
    validateStructure,
    getIssues: () => issues,
    clearIssues: () => setIssues([]),
  };
};

// Export screen reader utilities
export default screenReaderManager;
