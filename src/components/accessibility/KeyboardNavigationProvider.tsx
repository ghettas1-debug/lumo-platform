'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useKeyboardNavigation, useFocusTrap, useKeyboardShortcuts } from '@/hooks/useKeyboardNavigation';

// Keyboard Navigation Context
interface KeyboardNavigationContextType {
  isKeyboardUser: boolean;
  announceNavigation: (message: string) => void;
  setFocusTrap: (element: HTMLElement | null) => void;
  removeFocusTrap: () => void;
  registerKeyboardHandler: (key: string, handler: (event: KeyboardEvent) => void) => void;
  unregisterKeyboardHandler: (key: string) => void;
  enableKeyboardNavigation: () => void;
  disableKeyboardNavigation: () => void;
}

const KeyboardNavigationContext = createContext<KeyboardNavigationContextType | undefined>(undefined);

// Keyboard Navigation Provider Component
export const KeyboardNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [focusTrapElement, setFocusTrapElement] = useState<HTMLElement | null>(null);
  const [keyboardHandlers, setKeyboardHandlers] = useState<Map<string, (event: KeyboardEvent) => void>>(new Map());
  const [navigationEnabled, setNavigationEnabled] = useState(true);
  const lastInteractionTime = useRef<number>(Date.now());
  const mouseTimeoutRef = useRef<NodeJS.Timeout>();

  // Detect keyboard vs mouse usage
  useEffect(() => {
    const handleKeyDown = () => {
      setIsKeyboardUser(true);
      lastInteractionTime.current = Date.now();
      
      // Clear existing timeout
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      lastInteractionTime.current = Date.now();
      
      // Clear existing timeout
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if focus was triggered by keyboard
      if (event.relatedTarget === null && target.tabIndex >= 0) {
        setIsKeyboardUser(true);
        lastInteractionTime.current = Date.now();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  // Focus trap management
  const { activate: activateFocusTrap, deactivate: deactivateFocusTrap } = useFocusTrap(
    { current: focusTrapElement } as React.RefObject<HTMLElement>,
    navigationEnabled && focusTrapElement !== null
  );

  useEffect(() => {
    if (focusTrapElement && navigationEnabled) {
      const cleanup = activateFocusTrap();
      return cleanup;
    }
  }, [focusTrapElement, navigationEnabled, activateFocusTrap]);

  // Announce navigation changes to screen readers
  const announceNavigation = (message: string) => {
    // Create or use existing live region
    let liveRegion = document.getElementById('keyboard-navigation-announcements');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('id', 'keyboard-navigation-announcements');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.setAttribute('class', 'sr-only');
      document.body.appendChild(liveRegion);
    }

    // Announce the message
    liveRegion.textContent = message;

    // Clear the message after a delay
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  };

  // Set focus trap
  const setFocusTrap = (element: HTMLElement | null) => {
    setFocusTrapElement(element);
    if (element && navigationEnabled) {
      announceNavigation('تم تفعيل التركيز في هذه المنطقة');
    }
  };

  // Remove focus trap
  const removeFocusTrap = () => {
    if (focusTrapElement && navigationEnabled) {
      announceNavigation('تم إلغاء تفعيل التركيز');
    }
    setFocusTrapElement(null);
    deactivateFocusTrap();
  };

  // Register keyboard handler
  const registerKeyboardHandler = (key: string, handler: (event: KeyboardEvent) => void) => {
    setKeyboardHandlers(prev => new Map(prev).set(key, handler));
  };

  // Unregister keyboard handler
  const unregisterKeyboardHandler = (key: string) => {
    setKeyboardHandlers(prev => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };

  // Enable/disable keyboard navigation
  const enableKeyboardNavigation = () => {
    setNavigationEnabled(true);
    announceNavigation('تم تفعيل التنقل بلوحة المفاتيح');
  };

  const disableKeyboardNavigation = () => {
    setNavigationEnabled(false);
    announceNavigation('تم إلغاء تفعيل التنقل بلوحة المفاتيح');
  };

  // Global keyboard shortcuts
  const globalShortcuts = {
    // Navigation shortcuts
    'alt+m': () => {
      // Toggle main menu
      const mainMenu = document.querySelector('[role="navigation"]');
      if (mainMenu) {
        const firstItem = mainMenu.querySelector('button, [href], input, select, textarea');
        if (firstItem) {
          (firstItem as HTMLElement).focus();
          announceNavigation('تم الانتقال إلى القائمة الرئيسية');
        }
      }
    },
    'alt+s': () => {
      // Focus search
      const searchInput = document.querySelector('input[type="search"], [placeholder*="search" i]') as HTMLElement;
      if (searchInput) {
        searchInput.focus();
        announceNavigation('تم الانتقال إلى حقل البحث');
      }
    },
    'alt+c': () => {
      // Focus content
      const mainContent = document.querySelector('main, [role="main"]') as HTMLElement;
      if (mainContent) {
        mainContent.focus();
        announceNavigation('تم الانتقال إلى المحتوى الرئيسي');
      }
    },
    'alt+h': () => {
      // Go to home
      const homeLink = document.querySelector('a[href="/"], a[href*="/home"]') as HTMLElement;
      if (homeLink) {
        homeLink.click();
        announceNavigation('تم الانتقال إلى الصفحة الرئيسية');
      }
    },
    'alt+1': () => {
      // First level navigation
      const firstNavItem = document.querySelector('[role="navigation"] a, [role="navigation"] button') as HTMLElement;
      if (firstNavItem) {
        firstNavItem.focus();
        announceNavigation('تم الانتقال إلى أول عنصر في التنقل');
      }
    },
    'alt+2': () => {
      // Second level navigation
      const navItems = document.querySelectorAll('[role="navigation"] a, [role="navigation"] button');
      if (navItems.length > 1) {
        (navItems[1] as HTMLElement).focus();
        announceNavigation('تم الانتقال إلى ثاني عنصر في التنقل');
      }
    },
    'alt+3': () => {
      // Third level navigation
      const navItems = document.querySelectorAll('[role="navigation"] a, [role="navigation"] button');
      if (navItems.length > 2) {
        (navItems[2] as HTMLElement).focus();
        announceNavigation('تم الانتقال إلى ثالث عنصر في التنقل');
      }
    },
    'alt+f': () => {
      // Focus first interactive element
      const firstInteractive = document.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
      if (firstInteractive) {
        firstInteractive.focus();
        announceNavigation('تم الانتقال إلى أول عنصر تفاعلي');
      }
    },
    'alt+l': () => {
      // Focus last interactive element
      const interactiveElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (interactiveElements.length > 0) {
        const lastElement = interactiveElements[interactiveElements.length - 1] as HTMLElement;
        lastElement.focus();
        announceNavigation('تم الانتقال إلى آخر عنصر تفاعلي');
      }
    },
    // Accessibility shortcuts
    'alt+a': () => {
      // Toggle accessibility mode
      const body = document.body;
      const isHighContrast = body.classList.contains('high-contrast');
      
      if (isHighContrast) {
        body.classList.remove('high-contrast');
        announceNavigation('تم إلغاء وضع التباين العالي');
      } else {
        body.classList.add('high-contrast');
        announceNavigation('تم تفعيل وضع التباين العالي');
      }
    },
    'alt+r': () => {
      // Reduce motion
      const body = document.body;
      const isReducedMotion = body.classList.contains('reduced-motion');
      
      if (isReducedMotion) {
        body.classList.remove('reduced-motion');
        announceNavigation('تم إلغاء تقليل الحركة');
      } else {
        body.classList.add('reduced-motion');
        announceNavigation('تم تفعيل تقليل الحركة');
      }
    },
    'alt+t': () => {
      // Toggle text size
      const body = document.body;
      const currentSize = body.classList.contains('text-large') ? 'large' : 
                        body.classList.contains('text-small') ? 'small' : 'normal';
      
      // Remove all text size classes
      body.classList.remove('text-small', 'text-large', 'text-normal');
      
      let newSize: string;
      let announcement: string;
      
      switch (currentSize) {
        case 'normal':
          body.classList.add('text-large');
          newSize = 'large';
          announcement = 'تم تكبير النص';
          break;
        case 'large':
          body.classList.add('text-small');
          newSize = 'small';
          announcement = 'تم تصغير النص';
          break;
        case 'small':
          body.classList.add('text-normal');
          newSize = 'normal';
          announcement = 'تم إعادة النص إلى الحجم الطبيعي';
          break;
        default:
          body.classList.add('text-normal');
          newSize = 'normal';
          announcement = 'تم إعادة النص إلى الحجم الطبيعي';
      }
      
      announceNavigation(announcement);
    },
    // Help shortcuts
    'alt+?': () => {
      // Show keyboard shortcuts help
      const helpModal = document.querySelector('#keyboard-shortcuts-help');
      if (helpModal) {
        (helpModal as HTMLElement).style.display = 'block';
        announceNavigation('تم فتح مساعد اختصارات لوحة المفاتيح');
      } else {
        announceNavigation('مساعد اختصارات لوحة المفاتيح غير متوفر');
      }
    },
    'alt+/': () => {
      // Same as alt+?
      const helpModal = document.querySelector('#keyboard-shortcuts-help');
      if (helpModal) {
        (helpModal as HTMLElement).style.display = 'block';
        announceNavigation('تم فتح مساعد اختصارات لوحة المفاتيح');
      } else {
        announceNavigation('مساعد اختصارات لوحة المفاتيح غير متوفر');
      }
    },
  };

  // Apply global shortcuts
  useKeyboardShortcuts(globalShortcuts, navigationEnabled);

  // Apply custom keyboard handlers
  const customShortcuts: Record<string, (event: KeyboardEvent) => void> = {};
  keyboardHandlers.forEach((handler, key) => {
    customShortcuts[key] = handler;
  });
  useKeyboardShortcuts(customShortcuts, navigationEnabled);

  // Add keyboard navigation styles
  useEffect(() => {
    if (isKeyboardUser) {
      document.body.classList.add('keyboard-navigation');
    } else {
      document.body.classList.remove('keyboard-navigation');
    }
  }, [isKeyboardUser]);

  const value: KeyboardNavigationContextType = {
    isKeyboardUser,
    announceNavigation,
    setFocusTrap,
    removeFocusTrap,
    registerKeyboardHandler,
    unregisterKeyboardHandler,
    enableKeyboardNavigation,
    disableKeyboardNavigation,
  };

  return (
    <KeyboardNavigationContext.Provider value={value}>
      {children}
    </KeyboardNavigationContext.Provider>
  );
};

// Hook to use keyboard navigation context
export const useKeyboardNavigationContext = () => {
  const context = useContext(KeyboardNavigationContext);
  if (!context) {
    throw new Error('useKeyboardNavigationContext must be used within KeyboardNavigationProvider');
  }
  return context;
};

// HOC to add keyboard navigation to components
export const withKeyboardNavigation = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    role?: string;
    tabIndex?: number;
    onKeyDown?: (event: KeyboardEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
  } = {}
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const { isKeyboardUser, announceNavigation } = useKeyboardNavigationContext();
    
    const handleKeyDown = (event: React.KeyboardEvent) => {
      // Announce keyboard navigation
      if (isKeyboardUser && !options.onKeyDown) {
        const element = event.currentTarget as HTMLElement;
        const label = element.getAttribute('aria-label') || element.textContent || 'عنصر';
        announceNavigation(`التركيز على ${label}`);
      }
      
      options.onKeyDown?.(event.nativeEvent);
    };

    const handleFocus = (event: React.FocusEvent) => {
      if (isKeyboardUser) {
        const element = event.currentTarget as HTMLElement;
        const label = element.getAttribute('aria-label') || element.textContent || 'عنصر';
        announceNavigation(`التركيز على ${label}`);
      }
      
      options.onFocus?.(event.nativeEvent);
    };

    const keyboardProps = {
      role: options.role,
      tabIndex: options.tabIndex ?? (isKeyboardUser ? 0 : -1),
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      onBlur: options.onBlur,
    };

    return <Component {...props} {...keyboardProps} ref={ref} />;
  });
};

// Utility functions for keyboard navigation
export const keyboardUtils = {
  // Make element focusable
  makeFocusable: (element: HTMLElement, tabIndex = 0) => {
    element.tabIndex = tabIndex;
    element.setAttribute('role', element.getAttribute('role') || 'button');
    return element;
  },

  // Create keyboard accessible button
  createAccessibleButton: (label: string, onClick: () => void) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.setAttribute('aria-label', label);
    button.tabIndex = 0;
    button.addEventListener('click', onClick);
    return button;
  },

  // Create keyboard accessible link
  createAccessibleLink: (label: string, href: string) => {
    const link = document.createElement('a');
    link.textContent = label;
    link.href = href;
    link.setAttribute('aria-label', label);
    link.tabIndex = 0;
    return link;
  },

  // Add keyboard navigation to list
  addListNavigation: (list: HTMLElement) => {
    const items = list.querySelectorAll('li, [role="listitem"]');
    let currentIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          currentIndex = (currentIndex + 1) % items.length;
          (items[currentIndex] as HTMLElement).focus();
          break;
        case 'ArrowUp':
          event.preventDefault();
          currentIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          (items[currentIndex] as HTMLElement).focus();
          break;
        case 'Home':
          event.preventDefault();
          currentIndex = 0;
          (items[0] as HTMLElement).focus();
          break;
        case 'End':
          event.preventDefault();
          currentIndex = items.length - 1;
          (items[items.length - 1] as HTMLElement).focus();
          break;
      }
    };

    list.addEventListener('keydown', handleKeyDown);
    return () => list.removeEventListener('keydown', handleKeyDown);
  },

  // Add keyboard navigation to grid
  addGridNavigation: (grid: HTMLElement, columns: number) => {
    const items = grid.querySelectorAll('[role="gridcell"], [role="gridcell"] > *');
    let currentIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      const row = Math.floor(currentIndex / columns);
      const col = currentIndex % columns;
      let newIndex = currentIndex;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          newIndex = col < columns - 1 ? currentIndex + 1 : currentIndex;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = col > 0 ? currentIndex - 1 : currentIndex;
          break;
        case 'ArrowDown':
          event.preventDefault();
          newIndex = Math.min(items.length - 1, (row + 1) * columns + col);
          break;
        case 'ArrowUp':
          event.preventDefault();
          newIndex = Math.max(0, (row - 1) * columns + col);
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = items.length - 1;
          break;
      }

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < items.length) {
        currentIndex = newIndex;
        (items[newIndex] as HTMLElement).focus();
      }
    };

    grid.addEventListener('keydown', handleKeyDown);
    return () => grid.removeEventListener('keydown', handleKeyDown);
  },

  // Add keyboard navigation to tabs
  addTabNavigation: (tabList: HTMLElement, panels: HTMLElement[]) => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    let currentTab = 0;

    const activateTab = (index: number) => {
      // Update tabs
      tabs.forEach((tab, i) => {
        (tab as HTMLElement).setAttribute('aria-selected', i === index ? 'true' : 'false');
        (tab as HTMLElement).setAttribute('tabindex', i === index ? '0' : '-1');
      });

      // Update panels
      panels.forEach((panel, i) => {
        panel.setAttribute('aria-hidden', i === index ? 'false' : 'true');
        panel.style.display = i === index ? 'block' : 'none';
      });

      currentTab = index;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          currentTab = (currentTab + 1) % tabs.length;
          activateTab(currentTab);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          currentTab = currentTab === 0 ? tabs.length - 1 : currentTab - 1;
          activateTab(currentTab);
          break;
        case 'Home':
          event.preventDefault();
          currentTab = 0;
          activateTab(currentTab);
          break;
        case 'End':
          event.preventDefault();
          currentTab = tabs.length - 1;
          activateTab(currentTab);
          break;
      }
    };

    tabList.addEventListener('keydown', handleKeyDown);
    
    // Initialize first tab
    activateTab(0);

    return () => tabList.removeEventListener('keydown', handleKeyDown);
  },
};

export default KeyboardNavigationProvider;
