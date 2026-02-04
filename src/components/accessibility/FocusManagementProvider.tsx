'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useFocusManagement, useModalFocus, useDropdownFocus, useDialogFocus, useMenuFocus } from '@/hooks/useFocusManagement';

// Focus Management Context
interface FocusManagementContextType {
  isFocusTrapped: boolean;
  trapFocus: (element: HTMLElement | null) => void;
  releaseFocus: () => void;
  setInitialFocus: (element: HTMLElement | null) => void;
  setRestoreFocus: (element: HTMLElement | null) => void;
  announceFocusChange: (message: string) => void;
  registerModal: (id: string, element: HTMLElement | null) => void;
  unregisterModal: (id: string) => void;
  registerDropdown: (id: string, element: HTMLElement | null) => void;
  unregisterDropdown: (id: string) => void;
  getActiveModal: () => string | null;
  getActiveDropdown: () => string | null;
  enableFocusManagement: () => void;
  disableFocusManagement: () => void;
}

const FocusManagementContext = createContext<FocusManagementContextType | undefined>(undefined);

// Focus Management Provider Component
export const FocusManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocusTrapped, setIsFocusTrapped] = useState(false);
  const [focusTrapElement, setFocusTrapElement] = useState<HTMLElement | null>(null);
  const [initialFocusElement, setInitialFocusElement] = useState<HTMLElement | null>(null);
  const [restoreFocusElement, setRestoreFocusElement] = useState<HTMLElement | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [modals, setModals] = useState<Map<string, HTMLElement>>(new Map());
  const [dropdowns, setDropdowns] = useState<Map<string, HTMLElement>>(new Map());
  const [focusManagementEnabled, setFocusManagementEnabled] = useState(true);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Get focusable elements
  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
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
    
    return elements.filter(element => {
      const style = window.getComputedStyle(element);
      return (
        element.offsetParent !== null &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !element.hasAttribute('disabled') &&
        !element.hasAttribute('aria-hidden')
      );
    });
  };

  // Focus first element in container
  const focusFirstElement = useCallback(() => {
    if (!focusTrapElement || !focusManagementEnabled) return;

    const focusableElements = getFocusableElements(focusTrapElement);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      announceFocusChange('تم التركيز على أول عنصر');
    }
  }, [focusTrapElement, focusManagementEnabled]);

  // Focus last element in container
  const focusLastElement = useCallback(() => {
    if (!focusTrapElement || !focusManagementEnabled) return;

    const focusableElements = getFocusableElements(focusTrapElement);
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
      announceFocusChange('تم التركيز على آخر عنصر');
    }
  }, [focusTrapElement, focusManagementEnabled]);

  // Focus next element
  const focusNextElement = useCallback(() => {
    if (!focusTrapElement || !focusManagementEnabled) return;

    const focusableElements = getFocusableElements(focusTrapElement);
    const currentElement = document.activeElement as HTMLElement;
    const currentIndex = focusableElements.indexOf(currentElement);

    if (currentIndex !== -1 && currentIndex < focusableElements.length - 1) {
      focusableElements[currentIndex + 1].focus();
      announceFocusChange('تم الانتقال إلى العنصر التالي');
    } else if (focusableElements.length > 0) {
      focusableElements[0].focus();
      announceFocusChange('تم الانتقال إلى أول عنصر');
    }
  }, [focusTrapElement, focusManagementEnabled]);

  // Focus previous element
  const focusPreviousElement = useCallback(() => {
    if (!focusTrapElement || !focusManagementEnabled) return;

    const focusableElements = getFocusableElements(focusTrapElement);
    const currentElement = document.activeElement as HTMLElement;
    const currentIndex = focusableElements.indexOf(currentElement);

    if (currentIndex > 0) {
      focusableElements[currentIndex - 1].focus();
      announceFocusChange('تم الانتقال إلى العنصر السابق');
    } else if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
      announceFocusChange('تم الانتقال إلى آخر عنصر');
    }
  }, [focusTrapElement, focusManagementEnabled]);

  // Trap focus within element
  const trapFocus = useCallback((element: HTMLElement | null) => {
    if (!element || !focusManagementEnabled) return;

    // Store the currently focused element
    lastFocusedElement.current = document.activeElement as HTMLElement;

    setFocusTrapElement(element);
    setIsFocusTrapped(true);

    // Focus the initial element if specified
    if (initialFocusElement) {
      initialFocusElement.focus();
      announceFocusChange('تم تفعيل حبس التركيز');
    } else {
      focusFirstElement();
    }
  }, [initialFocusElement, focusManagementEnabled, focusFirstElement]);

  // Release focus trap
  const releaseFocus = useCallback(() => {
    if (!focusManagementEnabled) return;

    setIsFocusTrapped(false);
    setFocusTrapElement(null);

    // Restore focus to the previously focused element
    if (restoreFocusElement) {
      restoreFocusElement.focus();
      announceFocusChange('تم استعادة التركيز');
    } else if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
      announceFocusChange('تم استعادة التركيز');
    }
  }, [restoreFocusElement, focusManagementEnabled]);

  // Set initial focus element
  const setInitialFocus = useCallback((element: HTMLElement | null) => {
    setInitialFocusElement(element);
  }, []);

  // Set restore focus element
  const setRestoreFocus = useCallback((element: HTMLElement | null) => {
    setRestoreFocusElement(element);
  }, []);

  // Announce focus changes to screen readers
  const announceFocusChange = useCallback((message: string) => {
    // Create or use existing live region
    let liveRegion = document.getElementById('focus-management-announcements');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('id', 'focus-management-announcements');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.setAttribute('class', 'sr-only');
      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = message;

    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }, []);

  // Register modal
  const registerModal = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      setModals(prev => new Map(prev).set(id, element));
    }
  }, []);

  // Unregister modal
  const unregisterModal = useCallback((id: string) => {
    setModals(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  // Register dropdown
  const registerDropdown = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      setDropdowns(prev => new Map(prev).set(id, element));
    }
  }, []);

  // Unregister dropdown
  const unregisterDropdown = useCallback((id: string) => {
    setDropdowns(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  // Get active modal
  const getActiveModal = useCallback(() => activeModal, [activeModal]);

  // Get active dropdown
  const getActiveDropdown = useCallback(() => activeDropdown, [activeDropdown]);

  // Enable focus management
  const enableFocusManagement = useCallback(() => {
    setFocusManagementEnabled(true);
    announceFocusChange('تم تفعيل إدارة التركيز');
  }, []);

  // Disable focus management
  const disableFocusManagement = useCallback(() => {
    setFocusManagementEnabled(false);
    releaseFocus();
    announceFocusChange('تم إلغاء تفعيل إدارة التركيز');
  }, [releaseFocus]);

  // Handle keyboard events for focus trap
  useEffect(() => {
    if (!isFocusTrapped || !focusTrapElement || !focusManagementEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Tab':
          // Let the browser handle Tab navigation
          break;
        case 'Escape':
          event.preventDefault();
          releaseFocus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          focusNextElement();
          break;
        case 'ArrowUp':
          event.preventDefault();
          focusPreviousElement();
          break;
        case 'Home':
          event.preventDefault();
          focusFirstElement();
          break;
        case 'End':
          event.preventDefault();
          focusLastElement();
          break;
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      // Prevent focus from leaving the trapped area
      if (focusTrapElement && !focusTrapElement.contains(event.relatedTarget as Node)) {
        event.preventDefault();
        focusFirstElement();
      }
    };

    const container = focusTrapElement;
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [isFocusTrapped, focusTrapElement, focusManagementEnabled, releaseFocus, focusNextElement, focusPreviousElement, focusFirstElement, focusLastElement]);

  // Handle modal focus management
  useEffect(() => {
    if (activeModal && modals.has(activeModal)) {
      const modalElement = modals.get(activeModal);
      trapFocus(modalElement);
    } else {
      releaseFocus();
    }
  }, [activeModal, modals, trapFocus, releaseFocus]);

  // Handle dropdown focus management
  useEffect(() => {
    if (activeDropdown && dropdowns.has(activeDropdown)) {
      const dropdownElement = dropdowns.get(activeDropdown);
      trapFocus(dropdownElement);
    } else if (!activeModal) {
      releaseFocus();
    }
  }, [activeDropdown, dropdowns, activeModal, trapFocus, releaseFocus]);

  const value: FocusManagementContextType = {
    isFocusTrapped,
    trapFocus,
    releaseFocus,
    setInitialFocus,
    setRestoreFocus,
    announceFocusChange,
    registerModal,
    unregisterModal,
    registerDropdown,
    unregisterDropdown,
    getActiveModal,
    getActiveDropdown,
    enableFocusManagement,
    disableFocusManagement,
  };

  return (
    <FocusManagementContext.Provider value={value}>
      {children}
    </FocusManagementContext.Provider>
  );
};

// Hook to use focus management context
export const useFocusManagementContext = () => {
  const context = useContext(FocusManagementContext);
  if (!context) {
    throw new Error('useFocusManagementContext must be used within FocusManagementProvider');
  }
  return context;
};

// HOC to add focus management to components
export const withFocusManagement = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    role?: string;
    tabIndex?: number;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    trapFocus?: boolean;
  } = {}
) => {
  return React.forwardRef<any, P>((props, ref) => {
    const { 
      isFocusTrapped, 
      trapFocus, 
      releaseFocus, 
      announceFocusChange,
      registerModal,
      unregisterModal,
      registerDropdown,
      unregisterDropdown
    } = useFocusManagementContext();
    
    const elementRef = useRef<HTMLElement>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const componentId = React.useId();

    // Register component when mounted
    useEffect(() => {
      if (elementRef.current) {
        if (options.role === 'dialog' || options.role === 'modal') {
          registerModal(componentId, elementRef.current);
        } else if (options.role === 'menu' || options.role === 'dropdown') {
          registerDropdown(componentId, elementRef.current);
        }
        setIsRegistered(true);
      }

      return () => {
        if (isRegistered) {
          unregisterModal(componentId);
          unregisterDropdown(componentId);
        }
      };
    }, [componentId, options.role, registerModal, unregisterModal, registerDropdown, unregisterDropdown]);

    const handleFocus = (event: React.FocusEvent) => {
      if (isFocusTrapped) {
        const element = event.currentTarget as HTMLElement;
        const label = element.getAttribute('aria-label') || element.textContent || 'عنصر';
        announceFocusChange(`التركيز على ${label}`);
      }
      
      options.onFocus?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (options.trapFocus && event.key === 'Tab') {
        // Let the focus trap handle Tab navigation
        return;
      }
      
      options.onKeyDown?.(event);
    };

    const focusProps = {
      role: options.role,
      tabIndex: options.tabIndex ?? 0,
      onFocus: handleFocus,
      onBlur: options.onBlur,
      onKeyDown: handleKeyDown,
    };

    return <Component {...props} {...focusProps} ref={(node) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      elementRef.current = node;
    }} />;
  });
};

// Enhanced modal component with focus management
export const FocusManagedModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ isOpen, onClose, title, children, className }) => {
  const { trapFocus, releaseFocus, setInitialFocus, setRestoreFocus } = useFocusManagementContext();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle modal mount/unmount
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Store the element that had focus before modal opened
      setRestoreFocus(document.activeElement as HTMLElement);
    } else {
      setIsMounted(false);
    }
  }, [isOpen, setRestoreFocus]);

  // Handle focus trap when modal opens
  useEffect(() => {
    if (isMounted && modalRef.current && isOpen) {
      trapFocus(modalRef.current);
    }
  }, [isMounted, modalRef, isOpen, trapFocus]);

  // Release focus when modal closes
  useEffect(() => {
    if (!isOpen) {
      releaseFocus();
    }
  }, [isOpen, releaseFocus]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={className}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby="modal-description"
    >
      {title && (
        <h2 id="modal-title" className="sr-only">
          {title}
        </h2>
      )}
      <div id="modal-description">
        {children}
      </div>
    </div>
  );
};

// Enhanced dropdown component with focus management
export const FocusManagedDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
}> = ({ isOpen, onClose, children, trigger, className }) => {
  const { trapFocus, releaseFocus, setInitialFocus, setRestoreFocus } = useFocusManagementContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle dropdown mount/unmount
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setRestoreFocus(document.activeElement as HTMLElement);
    } else {
      setIsMounted(false);
    }
  }, [isOpen, setRestoreFocus]);

  // Handle focus trap when dropdown opens
  useEffect(() => {
    if (isMounted && dropdownRef.current && isOpen) {
      trapFocus(dropdownRef.current);
    }
  }, [isMounted, dropdownRef, isOpen, trapFocus]);

  // Release focus when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      releaseFocus();
    }
  }, [isOpen, releaseFocus]);

  return (
    <div className={className}>
      {trigger}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="menu"
          aria-orientation="vertical"
        >
          {children}
        </div>
      )}
    </div>
  );
};

// Utility functions for focus management
export const focusUtils = {
  // Create focusable element
  makeFocusable: (element: HTMLElement, tabIndex = 0) => {
    element.tabIndex = tabIndex;
    element.setAttribute('role', element.getAttribute('role') || 'button');
    return element;
  },

  // Create focus trap
  createFocusTrap: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
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
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  },

  // Add focus management to list
  addListFocusManagement: (list: HTMLElement) => {
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

  // Add focus management to grid
  addGridFocusManagement: (grid: HTMLElement, columns: number) => {
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
};

export default FocusManagementProvider;
