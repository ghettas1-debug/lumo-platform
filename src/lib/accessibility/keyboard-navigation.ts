// Keyboard Navigation Utilities
// Comprehensive keyboard navigation support for better accessibility

import { useEffect, useRef, useCallback, useState } from 'react';

// Keyboard event codes
export const KEY_CODES = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F4',
  F5: 'F5',
  F6: 'F6',
  F7: 'F7',
  F8: 'F8',
  F9: 'F9',
  F10: 'F10',
  F11: 'F11',
  F12: 'F12'
} as const;

// Navigation patterns
export interface NavigationPattern {
  name: string;
  keys: string[];
  description: string;
  behavior: (event: KeyboardEvent, element: HTMLElement, context?: any) => void;
}

// Common navigation patterns
export const NAVIGATION_PATTERNS: NavigationPattern[] = [
  {
    name: 'activate',
    keys: [KEY_CODES.ENTER, KEY_CODES.SPACE],
    description: 'Activate focused element',
    behavior: (event, element) => {
      if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.getAttribute('role') === 'button') {
        element.click();
      }
    }
  },
  {
    name: 'dismiss',
    keys: [KEY_CODES.ESCAPE],
    description: 'Dismiss or close current element',
    behavior: (event, element) => {
      const closeButton = element.querySelector('[aria-label="Close"], [aria-label="إغلاق"], button[title*="Close"], button[title*="إغلاق"]');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
    }
  },
  {
    name: 'navigate-vertical',
    keys: [KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN],
    description: 'Navigate vertically through list items',
    behavior: (event, element) => {
      const parent = element.parentElement;
      if (!parent) return;
      
      const items = Array.from(parent.children) as HTMLElement[];
      const currentIndex = items.indexOf(element);
      
      let nextIndex: number;
      if (event.key === KEY_CODES.ARROW_UP) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      } else {
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      }
      
      items[nextIndex]?.focus();
    }
  },
  {
    name: 'navigate-horizontal',
    keys: [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT],
    description: 'Navigate horizontally through list items',
    behavior: (event, element) => {
      const parent = element.parentElement;
      if (!parent) return;
      
      const items = Array.from(parent.children) as HTMLElement[];
      const currentIndex = items.indexOf(element);
      
      let nextIndex: number;
      if (event.key === KEY_CODES.ARROW_LEFT) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      } else {
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      }
      
      items[nextIndex]?.focus();
    }
  },
  {
    name: 'navigate-list',
    keys: [KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN, KEY_CODES.HOME, KEY_CODES.END],
    description: 'Navigate through list with home/end support',
    behavior: (event, element) => {
      const list = element.closest('[role="list"], [role="menu"], [role="tablist"], ul, ol') as HTMLElement;
      if (!list) return;
      
      const items = Array.from(list.querySelectorAll('[role="listitem"], [role="menuitem"], [role="tab"], li, a, button')) as HTMLElement[];
      const currentIndex = items.indexOf(element);
      
      let nextIndex: number;
      switch (event.key) {
        case KEY_CODES.ARROW_UP:
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          break;
        case KEY_CODES.ARROW_DOWN:
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          break;
        case KEY_CODES.HOME:
          nextIndex = 0;
          break;
        case KEY_CODES.END:
          nextIndex = items.length - 1;
          break;
        default:
          return;
      }
      
      items[nextIndex]?.focus();
    }
  },
  {
    name: 'navigate-tabs',
    keys: [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT, KEY_CODES.HOME, KEY_CODES.END],
    description: 'Navigate through tabs',
    behavior: (event, element) => {
      const tabList = element.closest('[role="tablist"]') as HTMLElement;
      if (!tabList) return;
      
      const tabs = Array.from(tabList.querySelectorAll('[role="tab"]')) as HTMLElement[];
      const currentIndex = tabs.indexOf(element);
      
      let nextIndex: number;
      switch (event.key) {
        case KEY_CODES.ARROW_LEFT:
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          break;
        case KEY_CODES.ARROW_RIGHT:
          nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case KEY_CODES.HOME:
          nextIndex = 0;
          break;
        case KEY_CODES.END:
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }
      
      tabs[nextIndex]?.focus();
    }
  }
];

// Hook for keyboard navigation
export function useKeyboardNavigation(
  elementRef: React.RefObject<HTMLElement>,
  patterns: NavigationPattern[],
  options: {
    enabled?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    context?: any;
  } = {}
) {
  const { enabled = true, preventDefault = true, stopPropagation = false, context } = options;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    const element = elementRef.current;
    if (!element || !element.contains(event.target as Node)) return;

    const matchingPattern = patterns.find(pattern => 
      pattern.keys.includes(event.key)
    );

    if (matchingPattern) {
      if (preventDefault) {
        event.preventDefault();
      }
      if (stopPropagation) {
        event.stopPropagation();
      }
      
      matchingPattern.behavior(event, element as HTMLElement, context);
    }
  }, [elementRef, patterns, enabled, preventDefault, stopPropagation, context]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
}

// Hook for roving tabindex
export function useRovingTabIndex(
  itemsRef: React.RefObject<HTMLElement[]>,
  options: {
    initialIndex?: number;
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
  } = {}
) {
  const { initialIndex = 0, orientation = 'vertical', loop = true } = options;
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const items = itemsRef.current;
    if (!items || items.length === 0) return;

    let nextIndex = activeIndex;

    switch (event.key) {
      case KEY_CODES.ARROW_UP:
      case KEY_CODES.ARROW_LEFT:
        if (orientation === 'vertical' && event.key === KEY_CODES.ARROW_LEFT) return;
        if (orientation === 'horizontal' && event.key === KEY_CODES.ARROW_UP) return;
        
        nextIndex = activeIndex > 0 ? activeIndex - 1 : loop ? items.length - 1 : activeIndex;
        break;
        
      case KEY_CODES.ARROW_DOWN:
      case KEY_CODES.ARROW_RIGHT:
        if (orientation === 'vertical' && event.key === KEY_CODES.ARROW_RIGHT) return;
        if (orientation === 'horizontal' && event.key === KEY_CODES.ARROW_DOWN) return;
        
        nextIndex = activeIndex < items.length - 1 ? activeIndex + 1 : loop ? 0 : activeIndex;
        break;
        
      case KEY_CODES.HOME:
        nextIndex = 0;
        break;
        
      case KEY_CODES.END:
        nextIndex = items.length - 1;
        break;
        
      default:
        return;
    }

    if (nextIndex !== activeIndex) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      items[nextIndex]?.focus();
    }
  }, [activeIndex, itemsRef, orientation, loop]);

  useEffect(() => {
    const items = itemsRef.current;
    if (!items || items.length === 0) return;

    // Set up roving tabindex
    items.forEach((item, index) => {
      if (item) {
        item.tabIndex = index === activeIndex ? 0 : -1;
      }
    });

    // Add keyboard event listener
    const handleKeyDownWrapper = (e: KeyboardEvent) => handleKeyDown(e);
    document.addEventListener('keydown', handleKeyDownWrapper);

    return () => {
      document.removeEventListener('keydown', handleKeyDownWrapper);
    };
  }, [activeIndex, itemsRef, handleKeyDown]);

  return { activeIndex, setActiveIndex };
}

// Hook for focus trap
export function useFocusTrap(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== KEY_CODES.TAB) return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Focus first element when trap is activated
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef]);
}

// Utility functions
export function isFocusable(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  const isFocusableTag = ['button', 'input', 'select', 'textarea', 'a', 'details'].includes(tagName);
  const hasTabIndex = element.getAttribute('tabindex') !== null;
  const isDisabled = element.hasAttribute('disabled');
  const isHidden = element.getAttribute('aria-hidden') === 'true' || element.style.display === 'none';
  
  return !isDisabled && !isHidden && (isFocusableTag || hasTabIndex);
}

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )) as HTMLElement[];
}

export function focusFirstElement(container: HTMLElement): boolean {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
    return true;
  }
  return false;
}

export function focusLastElement(container: HTMLElement): boolean {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[focusableElements.length - 1].focus();
    return true;
  }
  return false;
}

// Keyboard shortcuts manager
export class KeyboardShortcutManager {
  private shortcuts: Map<string, (event: KeyboardEvent) => void> = new Map();
  private enabled: boolean = true;

  register(key: string, handler: (event: KeyboardEvent) => void): void {
    this.shortcuts.set(key, handler);
  }

  unregister(key: string): void {
    this.shortcuts.delete(key);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  handle(event: KeyboardEvent): void {
    if (!this.enabled) return;

    const key = this.getKeyString(event);
    const handler = this.shortcuts.get(key);
    
    if (handler) {
      event.preventDefault();
      handler(event);
    }
  }

  private getKeyString(event: KeyboardEvent): string {
    const parts: string[] = [];
    
    if (event.ctrlKey) parts.push('ctrl');
    if (event.altKey) parts.push('alt');
    if (event.shiftKey) parts.push('shift');
    if (event.metaKey) parts.push('meta');
    
    parts.push(event.key);
    
    return parts.join('+').toLowerCase();
  }
}

// Global shortcut manager instance
export const globalShortcuts = new KeyboardShortcutManager();

// Hook for global shortcuts
export function useGlobalShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      globalShortcuts.handle(event);
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

// Export all utilities
export const KeyboardNavigationUtils = {
  KEY_CODES,
  NAVIGATION_PATTERNS,
  useKeyboardNavigation,
  useRovingTabIndex,
  useFocusTrap,
  isFocusable,
  getFocusableElements,
  focusFirstElement,
  focusLastElement,
  KeyboardShortcutManager,
  globalShortcuts,
  useGlobalShortcuts
};

export default KeyboardNavigationUtils;
