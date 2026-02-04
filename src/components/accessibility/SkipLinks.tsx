'use client';

import React, { useEffect, useState } from 'react';
import { screenReaderUtils } from '@/utils/screenReader';

// Skip Link Types
interface SkipLink {
  id: string;
  href: string;
  label: string;
  description?: string;
  visible?: boolean;
  priority?: number;
}

interface SkipLinksProps {
  links: SkipLink[];
  className?: string;
  position?: 'top' | 'bottom' | 'both';
  showOnFocus?: boolean;
  announceOnShow?: boolean;
}

// Skip Links Component
export const SkipLinks: React.FC<SkipLinksProps> = ({
  links,
  className = '',
  position = 'top',
  showOnFocus = true,
  announceOnShow = true,
}) => {
  const [visibleLinks, setVisibleLinks] = useState<Set<string>>(new Set());

  // Handle link visibility
  const handleLinkFocus = (linkId: string) => {
    if (showOnFocus) {
      setVisibleLinks(prev => new Set(prev).add(linkId));
      
      if (announceOnShow) {
        const link = links.find(l => l.id === linkId);
        if (link) {
          screenReaderUtils.announce(`رابط التخطي: ${link.label}`, 'polite');
        }
      }
    }
  };

  const handleLinkBlur = (linkId: string) => {
    if (showOnFocus) {
      setVisibleLinks(prev => {
        const newSet = new Set(prev);
        newSet.delete(linkId);
        return newSet;
      });
    }
  };

  // Handle link click
  const handleLinkClick = (link: SkipLink, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    
    const targetElement = document.querySelector(link.href) as HTMLElement;
    
    if (targetElement) {
      // Announce navigation
      screenReaderUtils.announceNavigation(`رابط التخطي`, link.label);
      
      // Focus the target element
      targetElement.focus();
      
      // Scroll to the element
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      
      // Announce arrival at target
      setTimeout(() => {
        screenReaderUtils.announce(`تم الوصول إلى ${link.label}`, 'polite');
      }, 300);
    }
  };

  // Sort links by priority
  const sortedLinks = [...links].sort((a, b) => (a.priority || 0) - (b.priority || 0));

  // Render skip links
  const renderSkipLinks = () => (
    <nav 
      className={`skip-links ${className}`}
      aria-label="روابط التخطي"
      role="navigation"
    >
      <ul className="skip-links-list">
        {sortedLinks.map((link) => (
          <li key={link.id} className="skip-links-item">
            <a
              href={link.href}
              className={`skip-link ${visibleLinks.has(link.id) ? 'visible' : ''}`}
              onFocus={() => handleLinkFocus(link.id)}
              onBlur={() => handleLinkBlur(link.id)}
              onClick={(e) => handleLinkClick(link, e)}
              aria-label={link.label}
              aria-describedby={link.description ? `skip-${link.id}-desc` : undefined}
            >
              {link.label}
            </a>
            {link.description && (
              <span 
                id={`skip-${link.id}-desc`} 
                className="sr-only"
              >
                {link.description}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );

  // Render based on position
  if (position === 'top') {
    return renderSkipLinks();
  }

  if (position === 'bottom') {
    return (
      <div className="skip-links-bottom">
        {renderSkipLinks()}
      </div>
    );
  }

  if (position === 'both') {
    return (
      <>
        {renderSkipLinks()}
        <div className="skip-links-bottom">
          {renderSkipLinks()}
        </div>
      </>
    );
  }

  return null;
};

// Default skip links configuration
export const defaultSkipLinks: SkipLink[] = [
  {
    id: 'skip-to-content',
    href: '#main-content',
    label: 'تخطي إلى المحتوى الرئيسي',
    description: 'الانتقال مباشرة إلى المحتوى الرئيسي للصفحة',
    priority: 1,
  },
  {
    id: 'skip-to-navigation',
    href: '#main-navigation',
    label: 'تخطي إلى التنقل الرئيسي',
    description: 'الانتقال مباشرة إلى قائمة التنقل الرئيسية',
    priority: 2,
  },
  {
    id: 'skip-to-search',
    href: '#search-input',
    label: 'تخطي إلى البحث',
    description: 'الانتقال مباشرة إلى حقل البحث',
    priority: 3,
  },
  {
    id: 'skip-to-footer',
    href: '#main-footer',
    label: 'تخطي إلى التذييل',
    description: 'الانتقال مباشرة إلى تذييل الصفحة',
    priority: 4,
  },
];

// Hook for managing skip links
export const useSkipLinks = (customLinks?: SkipLink[]) => {
  const [skipLinks, setSkipLinks] = useState<SkipLink[]>(defaultSkipLinks);

  useEffect(() => {
    if (customLinks) {
      setSkipLinks(customLinks);
    }
  }, [customLinks]);

  // Add skip link
  const addSkipLink = (link: SkipLink) => {
    setSkipLinks(prev => [...prev, link]);
  };

  // Remove skip link
  const removeSkipLink = (id: string) => {
    setSkipLinks(prev => prev.filter(link => link.id !== id));
  };

  // Update skip link
  const updateSkipLink = (id: string, updates: Partial<SkipLink>) => {
    setSkipLinks(prev => 
      prev.map(link => 
        link.id === id ? { ...link, ...updates } : link
      )
    );
  };

  // Get skip link by ID
  const getSkipLink = (id: string) => {
    return skipLinks.find(link => link.id === id);
  };

  // Check if target exists
  const validateTargets = () => {
    const issues: Array<{ id: string; href: string; issue: string }> = [];
    
    skipLinks.forEach(link => {
      const target = document.querySelector(link.href);
      if (!target) {
        issues.push({
          id: link.id,
          href: link.href,
          issue: 'Target element not found',
        });
      }
    });
    
    return issues;
  };

  return {
    skipLinks,
    addSkipLink,
    removeSkipLink,
    updateSkipLink,
    getSkipLink,
    validateTargets,
  };
};

// Skip Links Provider Component
export const SkipLinksProvider: React.FC<{
  children: React.ReactNode;
  customLinks?: SkipLink[];
  position?: 'top' | 'bottom' | 'both';
  className?: string;
}> = ({ 
  children, 
  customLinks, 
  position = 'top',
  className = '',
}) => {
  const { skipLinks, validateTargets } = useSkipLinks(customLinks);

  // Validate targets on mount
  useEffect(() => {
    const issues = validateTargets();
    if (issues.length > 0) {
      console.warn('Skip links target validation issues:', issues);
      issues.forEach(issue => {
        console.warn(`Skip link "${issue.id}" target "${issue.href}" not found`);
      });
    }
  }, [validateTargets]);

  return (
    <>
      <SkipLinks 
        links={skipLinks}
        position={position}
        className={className}
      />
      {children}
    </>
  );
};

// Page-specific skip links configurations
export const pageSkipLinks = {
  // Home page skip links
  home: [
    {
      id: 'skip-to-hero',
      href: '#hero-section',
      label: 'تخطي إلى القسم الرئيسي',
      description: 'الانتقال مباشرة إلى القسم الرئيسي للصفحة',
      priority: 1,
    },
    {
      id: 'skip-to-courses',
      href: '#courses-section',
      label: 'تخطي إلى الدورات',
      description: 'الانتقال مباشرة إلى قسم الدورات',
      priority: 2,
    },
    {
      id: 'skip-to-features',
      href: '#features-section',
      label: 'تخطي إلى المميزات',
      description: 'الانتقال مباشرة إلى قسم المميزات',
      priority: 3,
    },
    ...defaultSkipLinks,
  ],

  // Courses page skip links
  courses: [
    {
      id: 'skip-to-filters',
      href: '#course-filters',
      label: 'تخطي إلى الفلاتر',
      description: 'الانتقال مباشرة إلى قسم فلترة الدورات',
      priority: 1,
    },
    {
      id: 'skip-to-grid',
      href: '#courses-grid',
      label: 'تخطي إلى شبكة الدورات',
      description: 'الانتقال مباشرة إلى شبكة عرض الدورات',
      priority: 2,
    },
    {
      id: 'skip-to-pagination',
      href: '#pagination',
      label: 'تخطي إلى الترقيم',
      description: 'الانتقال مباشرة إلى أرقام الصفحات',
      priority: 3,
    },
    ...defaultSkipLinks,
  ],

  // Dashboard page skip links
  dashboard: [
    {
      id: 'skip-to-overview',
      href: '#dashboard-overview',
      label: 'تخطي إلى نظرة عامة',
      description: 'الانتقال مباشرة إلى نظرة عامة على لوحة التحكم',
      priority: 1,
    },
    {
      id: 'skip-to-analytics',
      href: '#analytics-section',
      label: 'تخطي إلى التحليلات',
      description: 'الانتقال مباشرة إلى قسم التحليلات',
      priority: 2,
    },
    {
      id: 'skip-to-recent-activity',
      href: '#recent-activity',
      label: 'تخطي إلى النشاط الأخير',
      description: 'الانتقال مباشرة إلى قسم النشاط الأخير',
      priority: 3,
    },
    ...defaultSkipLinks,
  ],

  // Profile page skip links
  profile: [
    {
      id: 'skip-to-profile-info',
      href: '#profile-information',
      label: 'تخطي إلى معلومات الملف الشخصي',
      description: 'الانتقال مباشرة إلى معلومات الملف الشخصي',
      priority: 1,
    },
    {
      id: 'skip-to-settings',
      href: '#profile-settings',
      label: 'تخطي إلى الإعدادات',
      description: 'الانتقال مباشرة إلى إعدادات الملف الشخصي',
      priority: 2,
    },
    {
      id: 'skip-to-achievements',
      href: '#achievements-section',
      label: 'تخطي إلى الإنجازات',
      description: 'الانتقال مباشرة إلى قسم الإنجازات',
      priority: 3,
    },
    ...defaultSkipLinks,
  ],

  // Course detail page skip links
  courseDetail: [
    {
      id: 'skip-to-course-info',
      href: '#course-information',
      label: 'تخطي إلى معلومات الدورة',
      description: 'الانتقال مباشرة إلى معلومات الدورة',
      priority: 1,
    },
    {
      id: 'skip-to-curriculum',
      href: '#course-curriculum',
      label: 'تخطي إلى المنهج',
      description: 'الانتقال مباشرة إلى منهج الدورة',
      priority: 2,
    },
    {
      id: 'skip-to-instructor',
      href: '#instructor-info',
      label: 'تخطي إلى معلومات المدرب',
      description: 'الانتقال مباشرة إلى معلومات المدرب',
      priority: 3,
    },
    {
      id: 'skip-to-reviews',
      href: '#reviews-section',
      label: 'تخطي إلى التقييمات',
      description: 'الانتقال مباشرة إلى قسم التقييمات',
      priority: 4,
    },
    ...defaultSkipLinks,
  ],

  // Search page skip links
  search: [
    {
      id: 'skip-to-search-form',
      href: '#search-form',
      label: 'تخطي إلى نموذج البحث',
      description: 'الانتقال مباشرة إلى نموذج البحث',
      priority: 1,
    },
    {
      id: 'skip-to-results',
      href: '#search-results',
      label: 'تخطي إلى نتائج البحث',
      description: 'الانتقال مباشرة إلى نتائج البحث',
      priority: 2,
    },
    {
      id: 'skip-to-filters',
      href: '#search-filters',
      label: 'تخطي إلى فلاتر البحث',
      description: 'الانتقال مباشرة إلى فلاتر البحث',
      priority: 3,
    },
    ...defaultSkipLinks,
  ],
};

// Hook for page-specific skip links
export const usePageSkipLinks = (pageType: keyof typeof pageSkipLinks) => {
  const [currentPage, setCurrentPage] = useState<keyof typeof pageSkipLinks>(pageType);
  const { skipLinks, ...skipLinkUtils } = useSkipLinks(pageSkipLinks[pageType]);

  // Change page
  const changePage = (newPageType: keyof typeof pageSkipLinks) => {
    setCurrentPage(newPageType);
  };

  return {
    currentPage,
    skipLinks: pageSkipLinks[currentPage],
    changePage,
    ...skipLinkUtils,
  };
};

// Skip Links Manager Component
export const SkipLinksManager: React.FC<{
  pageType: keyof typeof pageSkipLinks;
  position?: 'top' | 'bottom' | 'both';
  className?: string;
}> = ({ pageType, position = 'top', className = '' }) => {
  const { skipLinks } = usePageSkipLinks(pageType);

  return (
    <SkipLinks 
      links={skipLinks}
      position={position}
      className={className}
    />
  );
};

// Utility functions for skip links
export const skipLinksUtils = {
  // Create skip link
  createSkipLink: (options: {
    id: string;
    href: string;
    label: string;
    description?: string;
    priority?: number;
  }): SkipLink => ({
    id: options.id,
    href: options.href,
    label: options.label,
    description: options.description,
    priority: options.priority || 999,
  }),

  // Generate skip link ID
  generateId: (label: string): string => {
    return `skip-${label.toLowerCase().replace(/\s+/g, '-')}`;
  },

  // Validate href
  validateHref: (href: string): boolean => {
    try {
      // Check if it's a valid selector
      document.querySelector(href);
      return true;
    } catch {
      return false;
    }
  },

  // Get all focusable elements
  getFocusableElements: (): HTMLElement[] => {
    const selectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'details summary',
    ];

    const elements = Array.from(document.querySelectorAll(selectors.join(', '))) as HTMLElement[];
    
    return elements.filter(element => {
      const style = window.getComputedStyle(element);
      return (
        element.offsetParent !== null &&
        style.display !== 'none' &&
        style.visibility !== 'hidden'
      );
    });
  },

  // Auto-generate skip links for focusable elements
  autoGenerateSkipLinks: (): SkipLink[] => {
    const elements = skipLinksUtils.getFocusableElements();
    const links: SkipLink[] = [];

    elements.forEach((element, index) => {
      const id = element.id || `skip-target-${index}`;
      const label = element.getAttribute('aria-label') || 
                   element.textContent?.trim() || 
                   `عنصر ${index + 1}`;
      
      // Add ID if element doesn't have one
      if (!element.id) {
        element.id = id;
      }

      links.push({
        id: skipLinksUtils.generateId(label),
        href: `#${id}`,
        label: `تخطي إلى ${label}`,
        priority: 100 + index,
      });
    });

    return links;
  },

  // Announce skip links to screen readers
  announceSkipLinks: (links: SkipLink[]) => {
    const count = links.length;
    screenReaderUtils.announce(
      `متاحد ${count} روابط تخطي${count > 1 ? 'ة' : ''}`,
      'polite'
    );
  },

  // Test skip links functionality
  testSkipLinks: (links: SkipLink[]) => {
    const results: Array<{
      id: string;
      href: string;
      targetExists: boolean;
      isFocusable: boolean;
      hasLabel: boolean;
    }> = [];

    links.forEach(link => {
      const target = document.querySelector(link.href);
      const targetExists = !!target;
      const isFocusable = target ? skipLinksUtils.getFocusableElements().includes(target as HTMLElement) : false;
      const hasLabel = !!link.label;

      results.push({
        id: link.id,
        href: link.href,
        targetExists,
        isFocusable,
        hasLabel,
      });
    });

    return results;
  },
};

export default SkipLinks;
