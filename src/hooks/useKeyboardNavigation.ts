'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Keyboard navigation types
interface KeyboardNavigationOptions {
  items: HTMLElement[];
  currentIndex?: number;
  loop?: boolean;
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: (index: number, element: HTMLElement) => void;
  onSelect?: (index: number, element: HTMLElement) => void;
  onClose?: () => void;
  enabled?: boolean;
}

interface KeyboardNavigationReturn {
  currentIndex: number;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  navigateNext: () => void;
  navigatePrevious: () => void;
  navigateFirst: () => void;
  navigateLast: () => void;
  selectCurrent: () => void;
  close: () => void;
  focusItem: (index: number) => void;
  isNavigating: boolean;
}

// Main keyboard navigation hook
export const useKeyboardNavigation = ({
  items,
  currentIndex = 0,
  loop = true,
  orientation = 'vertical',
  onNavigate,
  onSelect,
  onClose,
  enabled = true,
}: KeyboardNavigationOptions): KeyboardNavigationReturn => {
  const [focusedIndex, setFocusedIndex] = useState(currentIndex);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();

  const navigateNext = useCallback(() => {
    if (!enabled || items.length === 0) return;

    setIsNavigating(true);
    const nextIndex = focusedIndex < items.length - 1 ? focusedIndex + 1 : (loop ? 0 : focusedIndex);
    setFocusedIndex(nextIndex);
    onNavigate?.(nextIndex, items[nextIndex]);

    // Clear existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Reset navigation state after delay
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 100);
  }, [enabled, items, focusedIndex, loop, onNavigate]);

  const navigatePrevious = useCallback(() => {
    if (!enabled || items.length === 0) return;

    setIsNavigating(true);
    const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : (loop ? items.length - 1 : focusedIndex);
    setFocusedIndex(prevIndex);
    onNavigate?.(prevIndex, items[prevIndex]);

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 100);
  }, [enabled, items, focusedIndex, loop, onNavigate]);

  const navigateFirst = useCallback(() => {
    if (!enabled || items.length === 0) return;

    setIsNavigating(true);
    setFocusedIndex(0);
    onNavigate?.(0, items[0]);

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 100);
  }, [enabled, items, onNavigate]);

  const navigateLast = useCallback(() => {
    if (!enabled || items.length === 0) return;

    setIsNavigating(true);
    setFocusedIndex(items.length - 1);
    onNavigate?.(items.length - 1, items[items.length - 1]);

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 100);
  }, [enabled, items, onNavigate]);

  const selectCurrent = useCallback(() => {
    if (!enabled || items.length === 0) return;

    onSelect?.(focusedIndex, items[focusedIndex]);
    items[focusedIndex]?.click();
  }, [enabled, items, focusedIndex, onSelect]);

  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const focusItem = useCallback((index: number) => {
    if (!enabled || index < 0 || index >= items.length) return;

    setFocusedIndex(index);
    items[index]?.focus();
    onNavigate?.(index, items[index]);
  }, [enabled, items, onNavigate]);

  // Handle keyboard events
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown':
          event.preventDefault();
          navigateNext();
          break;
        case orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp':
          event.preventDefault();
          navigatePrevious();
          break;
        case 'Home':
          event.preventDefault();
          navigateFirst();
          break;
        case 'End':
          event.preventDefault();
          navigateLast();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          selectCurrent();
          break;
        case 'Escape':
          event.preventDefault();
          close();
          break;
        case 'Tab':
          // Allow default Tab behavior
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, orientation, navigateNext, navigatePrevious, navigateFirst, navigateLast, selectCurrent, close]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentIndex,
    focusedIndex,
    setFocusedIndex,
    navigateNext,
    navigatePrevious,
    navigateFirst,
    navigateLast,
    selectCurrent,
    close,
    focusItem,
    isNavigating,
  };
};

// Hook for roving tabindex pattern
export const useRovingTabIndex = (items: HTMLElement[], enabled = true) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!enabled || items.length === 0) return;

    // Set initial tabindex
    items.forEach((item, index) => {
      item.tabIndex = index === activeIndex ? 0 : -1;
    });

    // Handle focus changes
    const handleFocus = (event: FocusEvent) => {
      const focusedElement = event.target as HTMLElement;
      const index = items.indexOf(focusedElement);
      
      if (index !== -1 && index !== activeIndex) {
        setActiveIndex(index);
        
        // Update tabindexes
        items.forEach((item, i) => {
          item.tabIndex = i === index ? 0 : -1;
        });
      }
    };

    items.forEach(item => {
      item.addEventListener('focus', handleFocus);
    });

    return () => {
      items.forEach(item => {
        item.removeEventListener('focus', handleFocus);
      });
    };
  }, [items, activeIndex, enabled]);

  return { activeIndex, setActiveIndex };
};

// Hook for trap focus within a container
export const useFocusTrap = (containerRef: React.RefObject<HTMLElement>, enabled = true) => {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ];

    const selector = focusableSelectors.join(', ');
    return Array.from(containerRef.current.querySelectorAll(selector)) as HTMLElement[];
  }, [containerRef]);

  const trapFocus = useCallback(() => {
    if (!enabled || !containerRef.current) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    containerRef.current.addEventListener('keydown', handleTabKey);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('keydown', handleTabKey);
      }
    };
  }, [enabled, containerRef, getFocusableElements]);

  const activate = useCallback(() => {
    if (!enabled) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the first focusable element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Start trapping focus
    return trapFocus();
  }, [enabled, getFocusableElements, trapFocus]);

  const deactivate = useCallback(() => {
    // Restore focus to the previously focused element
    if (previousActiveElement.current && previousActiveElement.current.focus) {
      previousActiveElement.current.focus();
    }
    previousActiveElement.current = null;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cleanup = activate();
    return cleanup;
  }, [enabled, activate]);

  return { activate, deactivate };
};

// Hook for keyboard shortcuts
export const useKeyboardShortcuts = (
  shortcuts: Record<string, (event: KeyboardEvent) => void>,
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifiers = {
        ctrl: event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
        meta: event.metaKey,
      };

      // Build the shortcut string
      const parts: string[] = [];
      if (modifiers.ctrl) parts.push('ctrl');
      if (modifiers.alt) parts.push('alt');
      if (modifiers.shift) parts.push('shift');
      if (modifiers.meta) parts.push('meta');
      parts.push(key);

      const shortcut = parts.join('+');

      // Check if the shortcut exists
      if (shortcuts[shortcut]) {
        event.preventDefault();
        shortcuts[shortcut](event);
      }

      // Also check for individual keys
      if (shortcuts[key]) {
        event.preventDefault();
        shortcuts[key](event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
};

// Hook for arrow key navigation in grids
export const useGridNavigation = (
  items: HTMLElement[],
  columns: number,
  enabled = true
) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const navigate = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (!enabled || items.length === 0) return;

    const row = Math.floor(focusedIndex / columns);
    const col = focusedIndex % columns;
    let newIndex = focusedIndex;

    switch (direction) {
      case 'up':
        newIndex = Math.max(0, (row - 1) * columns + col);
        break;
      case 'down':
        newIndex = Math.min(items.length - 1, (row + 1) * columns + col);
        break;
      case 'left':
        newIndex = col > 0 ? focusedIndex - 1 : focusedIndex;
        break;
      case 'right':
        newIndex = col < columns - 1 && focusedIndex < items.length - 1 ? focusedIndex + 1 : focusedIndex;
        break;
    }

    setFocusedIndex(newIndex);
    items[newIndex]?.focus();
  }, [enabled, items, focusedIndex, columns]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          navigate('up');
          break;
        case 'ArrowDown':
          event.preventDefault();
          navigate('down');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          navigate('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          navigate('right');
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          items[0]?.focus();
          break;
        case 'End':
          event.preventDefault();
          const lastIndex = items.length - 1;
          setFocusedIndex(lastIndex);
          items[lastIndex]?.focus();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, navigate, items]);

  return { focusedIndex, setFocusedIndex, navigate };
};

// Hook for menu navigation
export const useMenuNavigation = (
  menuItems: HTMLElement[],
  enabled = true
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    setFocusedIndex(0);
    if (menuItems.length > 0) {
      menuItems[0].focus();
    }
  }, [menuItems]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navigateNext = useCallback(() => {
    if (!isOpen || menuItems.length === 0) return;

    const nextIndex = (focusedIndex + 1) % menuItems.length;
    setFocusedIndex(nextIndex);
    menuItems[nextIndex].focus();
  }, [isOpen, menuItems, focusedIndex]);

  const navigatePrevious = useCallback(() => {
    if (!isOpen || menuItems.length === 0) return;

    const prevIndex = focusedIndex === 0 ? menuItems.length - 1 : focusedIndex - 1;
    setFocusedIndex(prevIndex);
    menuItems[prevIndex].focus();
  }, [isOpen, menuItems, focusedIndex]);

  const selectItem = useCallback(() => {
    if (!isOpen || menuItems.length === 0) return;

    menuItems[focusedIndex].click();
    closeMenu();
  }, [isOpen, menuItems, focusedIndex, closeMenu]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          navigateNext();
          break;
        case 'ArrowUp':
          event.preventDefault();
          navigatePrevious();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          selectItem();
          break;
        case 'Escape':
          event.preventDefault();
          closeMenu();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, isOpen, navigateNext, navigatePrevious, selectItem, closeMenu]);

  return {
    isOpen,
    focusedIndex,
    openMenu,
    closeMenu,
    navigateNext,
    navigatePrevious,
    selectItem,
  };
};

// Hook for tab navigation
export const useTabNavigation = (
  tabs: HTMLElement[],
  panels: HTMLElement[],
  enabled = true
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activateTab = useCallback((index: number) => {
    if (!enabled || index < 0 || index >= tabs.length) return;

    setActiveIndex(index);

    // Update tab states
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
      tab.setAttribute('tabindex', i === index ? '0' : '-1');
    });

    // Update panel states
    panels.forEach((panel, i) => {
      panel.setAttribute('aria-hidden', i === index ? 'false' : 'true');
      panel.style.display = i === index ? 'block' : 'none';
    });

    // Focus the active tab
    tabs[index].focus();
  }, [enabled, tabs, panels]);

  const navigateNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % tabs.length;
    activateTab(nextIndex);
  }, [activeIndex, tabs.length, activateTab]);

  const navigatePrevious = useCallback(() => {
    const prevIndex = activeIndex === 0 ? tabs.length - 1 : activeIndex - 1;
    activateTab(prevIndex);
  }, [activeIndex, tabs.length, activateTab]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          navigateNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          navigatePrevious();
          break;
        case 'Home':
          event.preventDefault();
          activateTab(0);
          break;
        case 'End':
          event.preventDefault();
          activateTab(tabs.length - 1);
          break;
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener('keydown', handleKeyDown);
    });

    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, [enabled, tabs, navigateNext, navigatePrevious, activateTab]);

  // Initialize first tab
  useEffect(() => {
    if (enabled && tabs.length > 0) {
      activateTab(0);
    }
  }, [enabled, tabs.length, activateTab]);

  return { activeIndex, activateTab, navigateNext, navigatePrevious };
};

// Hook for dialog/escape key handling
export const useEscapeKey = (onEscape: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, enabled]);
};

// Hook for enter key handling
export const useEnterKey = (onEnter: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnter();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, enabled]);
};

// Hook for space key handling
export const useSpaceKey = (onSpace: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        onSpace();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSpace, enabled]);
};

// Combined hook for common keyboard patterns
export const useKeyboardPatterns = (
  options: {
    onEscape?: () => void;
    onEnter?: () => void;
    onSpace?: () => void;
    shortcuts?: Record<string, (event: KeyboardEvent) => void>;
    enabled?: boolean;
  } = {}
) => {
  const { onEscape, onEnter, onSpace, shortcuts = {}, enabled = true } = options;

  useEscapeKey(onEscape || (() => {}), enabled && !!onEscape);
  useEnterKey(onEnter || (() => {}), enabled && !!onEnter);
  useSpaceKey(onSpace || (() => {}), enabled && !!onSpace);
  useKeyboardShortcuts(shortcuts, enabled);
};

export default useKeyboardNavigation;
