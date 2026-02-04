// Focus Management Utilities
// Comprehensive focus management for modals, dialogs, and interactive components

import { useEffect, useRef, useCallback } from 'react';

// Focus trap implementation
export class FocusTrap {
  private container: HTMLElement;
  private previousActiveElement: HTMLElement | null = null;
  private keydownHandler: (e: KeyboardEvent) => void;
  private isActive: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.keydownHandler = this.handleKeyDown.bind(this);
  }

  activate(): void {
    if (this.isActive) return;

    this.isActive = true;
    this.previousActiveElement = document.activeElement as HTMLElement;
    
    // Focus first focusable element
    const firstFocusable = this.getFirstFocusableElement();
    if (firstFocusable) {
      firstFocusable.focus();
    }

    // Add keyboard event listener
    document.addEventListener('keydown', this.keydownHandler);
  }

  deactivate(): void {
    if (!this.isActive) return;

    this.isActive = false;
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', this.keydownHandler);
    
    // Restore focus to previous element
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

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
  }

  private getFocusableElements(): HTMLElement[] {
    const selector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      'details summary',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(this.container.querySelectorAll(selector)) as HTMLElement[];
  }

  private getFirstFocusableElement(): HTMLElement | null {
    const elements = this.getFocusableElements();
    return elements.length > 0 ? elements[0] : null;
  }

  private getLastFocusableElement(): HTMLElement | null {
    const elements = this.getFocusableElements();
    return elements.length > 0 ? elements[elements.length - 1] : null;
  }
}

// Hook for focus trap
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  isActive: boolean = true
) {
  const focusTrapRef = useRef<FocusTrap | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create focus trap instance
    focusTrapRef.current = new FocusTrap(container);

    // Activate when isActive is true
    if (isActive) {
      focusTrapRef.current.activate();
    }

    return () => {
      // Cleanup
      if (focusTrapRef.current) {
        focusTrapRef.current.deactivate();
        focusTrapRef.current = null;
      }
    };
  }, [containerRef, isActive]);

  // Update trap when isActive changes
  useEffect(() => {
    if (focusTrapRef.current) {
      if (isActive) {
        focusTrapRef.current.activate();
      } else {
        focusTrapRef.current.deactivate();
      }
    }
  }, [isActive]);
}

// Hook for modal focus management
export function useModalFocus(
  isOpen: boolean,
  onClose: () => void,
  options: {
    closeOnEscape?: boolean;
    restoreFocus?: boolean;
    initialFocus?: string;
  } = {}
) {
  const { closeOnEscape = true, restoreFocus = true, initialFocus } = options;
  const modalRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen) {
      // Add keyboard event listener
      modal.addEventListener('keydown', handleKeyDown);

      // Focus initial element
      if (initialFocus) {
        const element = modal.querySelector(initialFocus) as HTMLElement;
        element?.focus();
      } else {
        const firstFocusable = modal.querySelector(
          'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        firstFocusable?.focus();
      }

      return () => {
        modal.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown, initialFocus]);

  return { modalRef };
}

// Hook for dialog focus management
export function useDialogFocus(
  dialogRef: React.RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus first focusable element in dialog
      const firstFocusable = dialog.querySelector(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      }

      // Add escape key handler
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };

      dialog.addEventListener('keydown', handleEscape);

      return () => {
        dialog.removeEventListener('keydown', handleEscape);
        
        // Restore focus when dialog closes
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [dialogRef, isOpen, onClose]);
}

// Focus management utilities
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    'details summary',
    '[contenteditable="true"]'
  ].join(', ');

  return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
}

export function isFocusable(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase();
  const isFocusableTag = ['button', 'input', 'select', 'textarea', 'a', 'details'].includes(tagName);
  const hasTabIndex = element.getAttribute('tabindex') !== null;
  const isDisabled = element.hasAttribute('disabled');
  const isHidden = element.getAttribute('aria-hidden') === 'true' || 
                   element.style.display === 'none' || 
                   element.style.visibility === 'hidden';
  
  return !isDisabled && !isHidden && (isFocusableTag || hasTabIndex);
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

export function focusNextElement(container: HTMLElement, currentElement: HTMLElement): boolean {
  const focusableElements = getFocusableElements(container);
  const currentIndex = focusableElements.indexOf(currentElement);
  
  if (currentIndex === -1) return false;
  
  const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
  focusableElements[nextIndex].focus();
  return true;
}

export function focusPreviousElement(container: HTMLElement, currentElement: HTMLElement): boolean {
  const focusableElements = getFocusableElements(container);
  const currentIndex = focusableElements.indexOf(currentElement);
  
  if (currentIndex === -1) return false;
  
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
  focusableElements[previousIndex].focus();
  return true;
}

// Focus restoration utilities
export function saveFocus(): HTMLElement | null {
  return document.activeElement as HTMLElement;
}

export function restoreFocus(element: HTMLElement | null): void {
  if (element && isFocusable(element)) {
    element.focus();
  }
}

// Focus management for dropdowns
export function useDropdownFocus(
  triggerRef: React.RefObject<HTMLElement>,
  dropdownRef: React.RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const trigger = triggerRef.current;
    
    if (!dropdown || !trigger) return;

    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus first element in dropdown
      const firstFocusable = getFocusableElements(dropdown)[0];
      if (firstFocusable) {
        firstFocusable.focus();
      }

      // Add keyboard navigation
      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case 'Escape':
            event.preventDefault();
            onClose();
            break;
          case 'ArrowDown':
            event.preventDefault();
            focusNextElement(dropdown, document.activeElement as HTMLElement);
            break;
          case 'ArrowUp':
            event.preventDefault();
            focusPreviousElement(dropdown, document.activeElement as HTMLElement);
            break;
          case 'Tab':
            // Allow natural tab navigation
            break;
        }
      };

      dropdown.addEventListener('keydown', handleKeyDown);

      return () => {
        dropdown.removeEventListener('keydown', handleKeyDown);
        
        // Restore focus when dropdown closes
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [dropdownRef, triggerRef, isOpen, onClose]);
}

// Focus management for tabs
export function useTabFocus(
  tabListRef: React.RefObject<HTMLElement>,
  activeTab: number,
  setActiveTab: (index: number) => void
) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const tabList = tabListRef.current;
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]')) as HTMLElement[];
    const currentTab = document.activeElement as HTMLElement;
    const currentIndex = tabs.indexOf(currentTab);

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        tabs[prevIndex]?.focus();
        setActiveTab(prevIndex);
        break;
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        tabs[nextIndex]?.focus();
        setActiveTab(nextIndex);
        break;
      case 'Home':
        event.preventDefault();
        tabs[0]?.focus();
        setActiveTab(0);
        break;
      case 'End':
        event.preventDefault();
        tabs[tabs.length - 1]?.focus();
        setActiveTab(tabs.length - 1);
        break;
    }
  }, [tabListRef, setActiveTab]);

  useEffect(() => {
    const tabList = tabListRef.current;
    if (!tabList) return;

    tabList.addEventListener('keydown', handleKeyDown);
    
    return () => {
      tabList.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

// Export all utilities
export const FocusManagementUtils = {
  FocusTrap,
  useFocusTrap,
  useModalFocus,
  useDialogFocus,
  getFocusableElements,
  isFocusable,
  focusFirstElement,
  focusLastElement,
  focusNextElement,
  focusPreviousElement,
  saveFocus,
  restoreFocus,
  useDropdownFocus,
  useTabFocus
};

export default FocusManagementUtils;
