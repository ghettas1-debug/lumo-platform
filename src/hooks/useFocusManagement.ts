'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Focus management types
interface FocusManagementOptions {
  initialFocus?: HTMLElement | null;
  restoreFocus?: HTMLElement | null;
  trapFocus?: boolean;
  autoFocus?: boolean;
  onEscape?: () => void;
  onEnter?: () => void;
  enabled?: boolean;
}

interface FocusManagementReturn {
  focusRef: React.RefObject<HTMLElement>;
  lastFocusedElement: React.MutableRefObject<HTMLElement | null>;
  activateFocusTrap: () => void;
  deactivateFocusTrap: () => void;
  setInitialFocus: (element: HTMLElement | null) => void;
  setRestoreFocus: (element: HTMLElement | null) => void;
  focusFirstElement: () => void;
  focusLastElement: () => void;
  focusNextElement: () => void;
  focusPreviousElement: () => void;
  isFocusTrapped: boolean;
}

// Main focus management hook
export const useFocusManagement = ({
  initialFocus,
  restoreFocus,
  trapFocus = true,
  autoFocus = true,
  onEscape,
  onEnter,
  enabled = true,
}: FocusManagementOptions = {}): FocusManagementReturn => {
  const focusRef = useRef<HTMLElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const [isFocusTrapped, setIsFocusTrapped] = useState(false);
  const initialFocusRef = useRef<HTMLElement | null>(initialFocus || null);
  const restoreFocusRef = useRef<HTMLElement | null>(restoreFocus || null);

  // Get focusable elements within a container
  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'details summary',
      'iframe',
      'embed',
      'object',
    ];

    const selector = focusableSelectors.join(', ');
    const elements = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    
    // Filter out elements that are not visible or not in the DOM
    return elements.filter(element => {
      const style = window.getComputedStyle(element);
      return (
        element.offsetParent !== null && // Element is in the DOM
        style.display !== 'none' && // Element is not hidden
        style.visibility !== 'hidden' && // Element is visible
        !element.hasAttribute('disabled') && // Element is not disabled
        !element.hasAttribute('aria-hidden') // Element is not hidden from screen readers
      );
    });
  }, []);

  // Focus the first focusable element
  const focusFirstElement = useCallback(() => {
    if (!focusRef.current || !enabled) return;

    const focusableElements = getFocusableElements(focusRef.current);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return focusableElements[0];
    }
  }, [enabled, getFocusableElements]);

  // Focus the last focusable element
  const focusLastElement = useCallback(() => {
    if (!focusRef.current || !enabled) return;

    const focusableElements = getFocusableElements(focusRef.current);
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
      return focusableElements[focusableElements.length - 1];
    }
  }, [enabled, getFocusableElements]);

  // Focus the next focusable element
  const focusNextElement = useCallback(() => {
    if (!focusRef.current || !enabled) return;

    const focusableElements = getFocusableElements(focusRef.current);
    const currentElement = document.activeElement as HTMLElement;
    const currentIndex = focusableElements.indexOf(currentElement);

    if (currentIndex !== -1 && currentIndex < focusableElements.length - 1) {
      focusableElements[currentIndex + 1].focus();
      return focusableElements[currentIndex + 1];
    } else if (focusableElements.length > 0) {
      // Wrap around to the first element
      focusableElements[0].focus();
      return focusableElements[0];
    }
  }, [enabled, getFocusableElements]);

  // Focus the previous focusable element
  const focusPreviousElement = useCallback(() => {
    if (!focusRef.current || !enabled) return;

    const focusableElements = getFocusableElements(focusRef.current);
    const currentElement = document.activeElement as HTMLElement;
    const currentIndex = focusableElements.indexOf(currentElement);

    if (currentIndex > 0) {
      focusableElements[currentIndex - 1].focus();
      return focusableElements[currentIndex - 1];
    } else if (focusableElements.length > 0) {
      // Wrap around to the last element
      focusableElements[focusableElements.length - 1].focus();
      return focusableElements[focusableElements.length - 1];
    }
  }, [enabled, getFocusableElements]);

  // Activate focus trap
  const activateFocusTrap = useCallback(() => {
    if (!enabled || !focusRef.current || !trapFocus) return;

    // Store the currently focused element
    lastFocusedElement.current = document.activeElement as HTMLElement;

    // Focus the initial element if specified, otherwise focus the first focusable element
    if (initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else if (autoFocus) {
      focusFirstElement();
    }

    setIsFocusTrapped(true);
  }, [enabled, trapFocus, autoFocus, initialFocusRef, focusFirstElement]);

  // Deactivate focus trap
  const deactivateFocusTrap = useCallback(() => {
    if (!enabled) return;

    setIsFocusTrapped(false);

    // Restore focus to the previously focused element
    if (restoreFocusRef.current) {
      restoreFocusRef.current.focus();
    } else if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [enabled, restoreFocusRef, lastFocusedElement]);

  // Set initial focus element
  const setInitialFocus = useCallback((element: HTMLElement | null) => {
    initialFocusRef.current = element;
  }, []);

  // Set restore focus element
  const setRestoreFocus = useCallback((element: HTMLElement | null) => {
    restoreFocusRef.current = element;
  }, []);

  // Handle keyboard events for focus trap
  useEffect(() => {
    if (!enabled || !isFocusTrapped || !focusRef.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Tab':
          // Let the browser handle Tab navigation
          break;
        case 'Escape':
          event.preventDefault();
          onEscape?.();
          break;
        case 'Enter':
          event.preventDefault();
          onEnter?.();
          break;
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      // Prevent focus from leaving the trapped area
      if (focusRef.current && !focusRef.current.contains(event.relatedTarget as Node)) {
        event.preventDefault();
        focusFirstElement();
      }
    };

    const container = focusRef.current;
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [enabled, isFocusTrapped, focusRef, onEscape, onEnter, focusFirstElement]);

  // Auto-activate focus trap when enabled
  useEffect(() => {
    if (enabled && trapFocus && focusRef.current) {
      activateFocusTrap();
    }

    return () => {
      if (enabled && trapFocus) {
        deactivateFocusTrap();
      }
    };
  }, [enabled, trapFocus, activateFocusTrap, deactivateFocusTrap]);

  return {
    focusRef,
    lastFocusedElement,
    activateFocusTrap,
    deactivateFocusTrap,
    setInitialFocus,
    setRestoreFocus,
    focusFirstElement,
    focusLastElement,
    focusNextElement,
    focusPreviousElement,
    isFocusTrapped,
  };
};

// Hook for managing focus in modals
export const useModalFocus = (
  isOpen: boolean,
  options: {
    initialFocus?: HTMLElement | null;
    restoreFocus?: HTMLElement | null;
    onClose?: () => void;
    enabled?: boolean;
  } = {}
) => {
  const { initialFocus, restoreFocus, onClose, enabled = true } = options;
  
  const focusManagement = useFocusManagement({
    initialFocus,
    restoreFocus,
    trapFocus: true,
    autoFocus: true,
    onEscape: onClose,
    enabled: enabled && isOpen,
  });

  // Activate focus trap when modal opens
  useEffect(() => {
    if (isOpen && enabled) {
      focusManagement.activateFocusTrap();
    }
  }, [isOpen, enabled, focusManagement]);

  // Deactivate focus trap when modal closes
  useEffect(() => {
    if (!isOpen && enabled) {
      focusManagement.deactivateFocusTrap();
    }
  }, [isOpen, enabled, focusManagement]);

  return focusManagement;
};

// Hook for managing focus in dropdowns
export const useDropdownFocus = (
  isOpen: boolean,
  options: {
    initialFocus?: HTMLElement | null;
    onClose?: () => void;
    enabled?: boolean;
  } = {}
) => {
  const { initialFocus, onClose, enabled = true } = options;
  
  const focusManagement = useFocusManagement({
    initialFocus,
    trapFocus: true,
    autoFocus: true,
    onEscape: onClose,
    enabled: enabled && isOpen,
  });

  // Activate focus trap when dropdown opens
  useEffect(() => {
    if (isOpen && enabled) {
      focusManagement.activateFocusTrap();
    }
  }, [isOpen, enabled, focusManagement]);

  // Deactivate focus trap when dropdown closes
  useEffect(() => {
    if (!isOpen && enabled) {
      focusManagement.deactivateFocusTrap();
    }
  }, [isOpen, enabled, focusManagement]);

  return focusManagement;
};

// Hook for managing focus in dialogs
export const useDialogFocus = (
  isOpen: boolean,
  options: {
    initialFocus?: HTMLElement | null;
    restoreFocus?: HTMLElement | null;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    enabled?: boolean;
  } = {}
) => {
  const { initialFocus, restoreFocus, onClose, onConfirm, onCancel, enabled = true } = options;
  
  const focusManagement = useFocusManagement({
    initialFocus,
    restoreFocus,
    trapFocus: true,
    autoFocus: true,
    onEscape: onCancel || onClose,
    onEnter: onConfirm,
    enabled: enabled && isOpen,
  });

  // Activate focus trap when dialog opens
  useEffect(() => {
    if (isOpen && enabled) {
      focusManagement.activateFocusTrap();
    }
  }, [isOpen, enabled, focusManagement]);

  // Deactivate focus trap when dialog closes
  useEffect(() => {
    if (!isOpen && enabled) {
      focusManagement.deactivateFocusTrap();
    }
  }, [isOpen, enabled, focusManagement]);

  return focusManagement;
};

// Hook for managing focus in menus
export const useMenuFocus = (
  isOpen: boolean,
  options: {
    initialFocus?: HTMLElement | null;
    onClose?: () => void;
    enabled?: boolean;
  } = {}
) => {
  const { initialFocus, onClose, enabled = true } = options;
  
  const focusManagement = useFocusManagement({
    initialFocus,
    trapFocus: true,
    autoFocus: true,
    onEscape: onClose,
    enabled: enabled && isOpen,
  });

  // Activate focus trap when menu opens
  useEffect(() => {
    if (isOpen && enabled) {
      focusManagement.activateFocusTrap();
    }
  }, [isOpen, enabled, focusManagement]);

  // Deactivate focus trap when menu closes
  useEffect(() => {
    if (!isOpen && enabled) {
      focusManagement.deactivateFocusTrap();
    }
  }, [isOpen, enabled, focusManagement]);

  return focusManagement;
};

// Hook for managing focus in tooltips
export const useTooltipFocus = (
  isOpen: boolean,
  triggerRef: React.RefObject<HTMLElement>,
  options: {
    onClose?: () => void;
    enabled?: boolean;
  } = {}
) => {
  const { onClose, enabled = true } = options;
  
  const focusManagement = useFocusManagement({
    trapFocus: false,
    autoFocus: false,
    onEscape: onClose,
    enabled: enabled && isOpen,
  });

  // Handle focus on trigger
  useEffect(() => {
    if (triggerRef.current && enabled) {
      const handleFocus = () => {
        // Store the trigger element for later restoration
        focusManagement.lastFocusedElement.current = triggerRef.current;
      };

      const handleBlur = () => {
        // Close tooltip when focus leaves trigger
        onClose?.();
      };

      const trigger = triggerRef.current;
      trigger.addEventListener('focus', handleFocus);
      trigger.addEventListener('blur', handleBlur);

      return () => {
        trigger.removeEventListener('focus', handleFocus);
        trigger.removeEventListener('blur', handleBlur);
      };
    }
  }, [triggerRef, enabled, onClose, focusManagement]);

  return focusManagement;
};

// Hook for managing focus in forms
export const useFormFocus = (
  options: {
    initialFocus?: HTMLElement | null;
    onSubmit?: () => void;
    onCancel?: () => void;
    enabled?: boolean;
  } = {}
) => {
  const { initialFocus, onSubmit, onCancel, enabled = true } = options;
  
  const focusManagement = useFocusManagement({
    initialFocus,
    trapFocus: true,
    autoFocus: true,
    onEscape: onCancel,
    onEnter: onSubmit,
    enabled,
  });

  // Auto-focus first form field when enabled
  useEffect(() => {
    if (enabled && focusManagement.focusRef.current) {
      focusManagement.focusFirstElement();
    }
  }, [enabled, focusManagement]);

  return focusManagement;
};

// Hook for managing focus in tabs
export const useTabFocus = (
  tabs: HTMLElement[],
  panels: HTMLElement[],
  options: {
    initialTab?: number;
    enabled?: boolean;
  } = {}
) => {
  const { initialTab = 0, enabled = true } = options;
  const [activeTab, setActiveTab] = useState(initialTab);
  const focusManagement = useFocusManagement({
    trapFocus: false,
    autoFocus: false,
    enabled,
  });

  // Focus the active tab
  const focusActiveTab = useCallback(() => {
    if (tabs.length > 0 && activeTab >= 0 && activeTab < tabs.length) {
      tabs[activeTab].focus();
    }
  }, [tabs, activeTab]);

  // Handle tab activation
  const activateTab = useCallback((index: number) => {
    if (index < 0 || index >= tabs.length) return;

    setActiveTab(index);

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
  }, [tabs, panels]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!enabled || tabs.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentElement = event.target as HTMLElement;
      const currentIndex = tabs.indexOf(currentElement);

      if (currentIndex === -1) return;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % tabs.length;
          activateTab(nextIndex);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
          activateTab(prevIndex);
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
  }, [enabled, tabs, activateTab]);

  // Initialize first tab
  useEffect(() => {
    if (enabled && tabs.length > 0) {
      activateTab(initialTab);
    }
  }, [enabled, tabs.length, initialTab, activateTab]);

  return {
    activeTab,
    setActiveTab,
    activateTab,
    focusActiveTab,
    ...focusManagement,
  };
};

// Hook for managing focus in carousels
export const useCarouselFocus = (
  items: HTMLElement[],
  options: {
    initialIndex?: number;
    loop?: boolean;
    enabled?: boolean;
  } = {}
) => {
  const { initialIndex = 0, loop = true, enabled = true } = options;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const focusManagement = useFocusManagement({
    trapFocus: false,
    autoFocus: false,
    enabled,
  });

  // Focus the current item
  const focusCurrentItem = useCallback(() => {
    if (items.length > 0 && currentIndex >= 0 && currentIndex < items.length) {
      items[currentIndex].focus();
    }
  }, [items, currentIndex]);

  // Navigate to next item
  const navigateNext = useCallback(() => {
    const nextIndex = loop ? (currentIndex + 1) % items.length : Math.min(currentIndex + 1, items.length - 1);
    setCurrentIndex(nextIndex);
    items[nextIndex]?.focus();
  }, [currentIndex, items.length, loop]);

  // Navigate to previous item
  const navigatePrevious = useCallback(() => {
    const prevIndex = loop ? (currentIndex === 0 ? items.length - 1 : currentIndex - 1) : Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
    items[prevIndex]?.focus();
  }, [currentIndex, items.length, loop]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!enabled || items.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentElement = event.target as HTMLElement;
      const itemIndex = items.indexOf(currentElement);

      if (itemIndex === -1) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          navigateNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          navigatePrevious();
          break;
        case 'Home':
          event.preventDefault();
          setCurrentIndex(0);
          items[0]?.focus();
          break;
        case 'End':
          event.preventDefault();
          const lastIndex = items.length - 1;
          setCurrentIndex(lastIndex);
          items[lastIndex]?.focus();
          break;
      }
    };

    items.forEach(item => {
      item.addEventListener('keydown', handleKeyDown);
    });

    return () => {
      items.forEach(item => {
        item.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, [enabled, items, navigateNext, navigatePrevious]);

  return {
    currentIndex,
    setCurrentIndex,
    navigateNext,
    navigatePrevious,
    focusCurrentItem,
    ...focusManagement,
  };
};

export default useFocusManagement;
