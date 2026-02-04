// Skip Links Utilities
// Comprehensive skip links implementation for better accessibility

import { useEffect, useRef } from 'react';
import React from 'react';

// Skip link configuration
export interface SkipLinkConfig {
  id: string;
  text: string;
  target: string;
  description?: string;
  priority?: number;
  visible?: boolean;
}

// Default skip links configuration
export const DEFAULT_SKIP_LINKS: SkipLinkConfig[] = [
  {
    id: 'skip-to-main',
    text: 'تخطي إلى المحتوى الرئيسي',
    target: 'main',
    description: 'الانتقال مباشرة إلى المحتوى الرئيسي للصفحة',
    priority: 1,
    visible: false
  },
  {
    id: 'skip-to-navigation',
    text: 'تخطي إلى التنقل',
    target: 'nav',
    description: 'الانتقال مباشرة إلى قائمة التنقل',
    priority: 2,
    visible: false
  },
  {
    id: 'skip-to-search',
    text: 'تخطي إلى البحث',
    target: '[role="search"]',
    description: 'الانتقال مباشرة إلى مربع البحث',
    priority: 3,
    visible: false
  },
  {
    id: 'skip-to-content',
    text: 'تخطي إلى المحتوى',
    target: '[role="main"], main, #content',
    description: 'الانتقال مباشرة إلى المحتوى الرئيسي',
    priority: 4,
    visible: false
  }
];

// Skip link component
export function SkipLink({
  id,
  text,
  target,
  description,
  visible = false,
  onClick
}: SkipLinkConfig & {
  onClick?: () => void;
}) {
  const handleClick = () => {
    const targetElement = document.querySelector(target) as HTMLElement;
    if (targetElement) {
      targetElement.focus();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    onClick?.();
  };

  return React.createElement('a', {
    href: target,
    id: id,
    className: `skip-link ${visible ? 'visible' : ''}`,
    onClick: handleClick,
    'aria-label': description || text,
    children: text
  });
}

// Hook for managing skip links
export function useSkipLinks(
  customLinks: SkipLinkConfig[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing skip links
    const existingSkipLinks = container.querySelectorAll('.skip-links-container');
    existingSkipLinks.forEach(link => link.remove());

    // Create skip links container
    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.className = 'skip-links-container';
    skipLinksContainer.setAttribute('role', 'navigation');
    skipLinksContainer.setAttribute('aria-label', 'روابط التخطي');

    // Combine default and custom links
    const allLinks = [...DEFAULT_SKIP_LINKS, ...customLinks]
      .sort((a, b) => (a.priority || 999) - (b.priority || 999));

    // Create and add skip links
    allLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.target;
      skipLink.id = link.id;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      skipLink.setAttribute('aria-label', link.description || link.text);
      skipLink.setAttribute('tabindex', '0');
      
      // Add click handler
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const targetElement = document.querySelector(link.target) as HTMLElement;
        if (targetElement) {
          targetElement.focus();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });

      // Add to container
      skipLinksContainer.appendChild(skipLink);
    });

    // Add to document
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);

    return () => {
      // Cleanup
      if (document.body.contains(skipLinksContainer)) {
        document.body.removeChild(skipLinksContainer);
      }
    };
  }, [customLinks]);

  return { containerRef };
}

// Hook for skip link visibility
export function useSkipLinkVisibility() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const skipLinks = document.querySelectorAll('.skip-link');
      
      // Show skip links when Tab key is pressed
      if (e.key === 'Tab') {
        skipLinks.forEach(link => {
          link.classList.add('visible');
        });
      }
    };

    const handleMouseDown = () => {
      // Hide skip links when mouse is used
      const skipLinks = document.querySelectorAll('.skip-link');
      skipLinks.forEach(link => {
        link.classList.remove('visible');
      });
    };

    const handleFocusIn = (e: FocusEvent) => {
      // Hide skip links when focus moves to other elements
      const target = e.target as HTMLElement;
      if (!target.classList.contains('skip-link')) {
        const skipLinks = document.querySelectorAll('.skip-link');
        skipLinks.forEach(link => {
          link.classList.remove('visible');
        });
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
}

// Utility function to create skip link styles
export function createSkipLinkStyles(): string {
  return `
    .skip-links-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      pointer-events: none;
    }

    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: #fff;
      padding: 8px 16px;
      text-decoration: none;
      font-weight: bold;
      font-size: 14px;
      border-radius: 0 0 4px 4px;
      transition: top 0.2s ease-in-out;
      pointer-events: auto;
      opacity: 0;
    }

    .skip-link:focus,
    .skip-link.visible {
      top: 0;
      opacity: 1;
    }

    .skip-link:hover {
      background: #333;
    }

    .skip-link:focus {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }

    /* RTL support */
    [dir="rtl"] .skip-link {
      right: 0;
      left: auto;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .skip-link {
        border: 2px solid #fff;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .skip-link {
        transition: none;
      }
    }
  `;
}

// Hook to inject skip link styles
export function useSkipLinkStyles() {
  useEffect(() => {
    // Check if styles already exist
    const existingStyles = document.getElementById('skip-links-styles');
    if (existingStyles) return;

    // Create and inject styles
    const styleElement = document.createElement('style');
    styleElement.id = 'skip-links-styles';
    styleElement.textContent = createSkipLinkStyles();
    document.head.appendChild(styleElement);

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
}

// Utility function to add skip link to specific element
export function addSkipLinkToElement(
  element: HTMLElement,
  config: SkipLinkConfig
): void {
  const skipLink = document.createElement('a');
  skipLink.href = config.target;
  skipLink.id = config.id;
  skipLink.textContent = config.text;
  skipLink.className = 'skip-link';
  skipLink.setAttribute('aria-label', config.description || config.text);
  skipLink.setAttribute('tabindex', '0');
  
  // Position relative to element
  const rect = element.getBoundingClientRect();
  skipLink.style.position = 'absolute';
  skipLink.style.top = `${rect.top - 40}px`;
  skipLink.style.left = `${rect.left}px`;
  
  // Add click handler
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    element.focus();
    element.scrollIntoView({ behavior: 'smooth' });
  });

  // Add to document
  document.body.appendChild(skipLink);

  // Remove when element is no longer in DOM
  const observer = new MutationObserver((mutations) => {
    if (!document.body.contains(element)) {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
        observer.disconnect();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Utility function to create skip link for dynamic content
export function createDynamicSkipLink(
  targetSelector: string,
  text: string,
  id?: string
): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = targetSelector;
  skipLink.id = id || `skip-to-${Date.now()}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';
  skipLink.setAttribute('aria-label', text);
  skipLink.setAttribute('tabindex', '0');
  
  // Add click handler
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetSelector) as HTMLElement;
    if (targetElement) {
      targetElement.focus();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return skipLink;
}

// Export all utilities
export const SkipLinksUtils = {
  DEFAULT_SKIP_LINKS,
  SkipLink,
  useSkipLinks,
  useSkipLinkVisibility,
  createSkipLinkStyles,
  useSkipLinkStyles,
  addSkipLinkToElement,
  createDynamicSkipLink
};

export default SkipLinksUtils;
