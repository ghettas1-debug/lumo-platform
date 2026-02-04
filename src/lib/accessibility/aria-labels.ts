// ARIA Labels and Accessibility Utilities
// Comprehensive ARIA label management for better accessibility

// ARIA role definitions
export const ARIA_ROLES = {
  // Navigation roles
  NAVIGATION: 'navigation',
  MAIN: 'main',
  BANNER: 'banner',
  CONTENTINFO: 'contentinfo',
  SEARCH: 'search',
  COMPLEMENTARY: 'complementary',
  
  // Widget roles
  BUTTON: 'button',
  LINK: 'link',
  DIALOG: 'dialog',
  ALERTDIALOG: 'alertdialog',
  MENU: 'menu',
  MENUBAR: 'menubar',
  MENUITEM: 'menuitem',
  MENUITEMCHECKBOX: 'menuitemcheckbox',
  MENUITEMRADIO: 'menuitemradio',
  OPTION: 'option',
  LISTBOX: 'listbox',
  COMBOBOX: 'combobox',
  SPINBUTTON: 'spinbutton',
  SLIDER: 'slider',
  TAB: 'tab',
  TABLIST: 'tablist',
  TABPANEL: 'tabpanel',
  TOOLTIP: 'tooltip',
  TREE: 'tree',
  TREEITEM: 'treeitem',
  GRID: 'grid',
  GRIDCELL: 'gridcell',
  ROW: 'row',
  ROWGROUP: 'rowgroup',
  ROWHEADER: 'rowheader',
  COLUMNHEADER: 'columnheader',
  
  // Structure roles
  ARTICLE: 'article',
  ASIDE: 'aside',
  SECTION: 'section',
  HEADER: 'header',
  FOOTER: 'footer',
  FIGURE: 'figure',
  FIGCAPTION: 'figcaption',
  GROUP: 'group',
  LIST: 'list',
  LISTITEM: 'listitem',
  DESCRIPTION: 'description',
  TERM: 'term',
  DEFINITION: 'definition',
  
  // Landmark roles
  APPLICATION: 'application',
  DOCUMENT: 'document',
  FORM: 'form',
  LOG: 'log',
  MARQUEE: 'marquee',
  MATH: 'math',
  NOTE: 'note',
  PRESENTATION: 'presentation',
  REGION: 'region',
  SEPARATOR: 'separator',
  STATUS: 'status',
  TIMER: 'timer',
  TOOLBAR: 'toolbar'
} as const;

// ARIA properties
export const ARIA_PROPERTIES = {
  // Widget attributes
  AUTOCOMPLETE: 'autocomplete',
  CHECKED: 'checked',
  DISABLED: 'disabled',
  EXPANDED: 'expanded',
  HASPOPUP: 'haspopup',
  HIDDEN: 'hidden',
  INVALID: 'invalid',
  LABEL: 'label',
  LABELLEDBY: 'labelledby',
  LEVEL: 'level',
  MULTILINE: 'multiline',
  MULTIPLE: 'multiple',
  ORIENTATION: 'orientation',
  PLACEHOLDER: 'placeholder',
  PRESSED: 'pressed',
  READONLY: 'readonly',
  REQUIRED: 'required',
  SELECTED: 'selected',
  SORT: 'sort',
  VALUEMAX: 'valuemax',
  VALUEMIN: 'valuemin',
  VALUENOW: 'valuenow',
  VALUETEXT: 'valuetext',
  
  // Live region attributes
  ATOMIC: 'atomic',
  BUSY: 'busy',
  LIVE: 'live',
  RELEVANT: 'relevant',
  
  // Relationship attributes
  ACTIVESCENDANT: 'activedescendant',
  CONTROLS: 'controls',
  DESCRIBEDBY: 'describedby',
  DETAILS: 'details',
  ERRORMESSAGE: 'errormessage',
  FLOWTO: 'flowto',
  OWNS: 'owns',
  POSINSET: 'posinset',
  SETSIZE: 'setsize'
} as const;

// ARIA states
export const ARIA_STATES = {
  // Widget states
  CHECKED_TRUE: 'true',
  CHECKED_FALSE: 'false',
  CHECKED_MIXED: 'mixed',
  DISABLED_TRUE: 'true',
  DISABLED_FALSE: 'false',
  EXPANDED_TRUE: 'true',
  EXPANDED_FALSE: 'false',
  INVALID_TRUE: 'true',
  INVALID_FALSE: 'false',
  INVALID_GRAMMAR: 'grammar',
  INVALID_SPELLING: 'spelling',
  PRESSED_TRUE: 'true',
  PRESSED_FALSE: 'false',
  PRESSED_MIXED: 'mixed',
  SELECTED_TRUE: 'true',
  SELECTED_FALSE: 'false',
  
  // Live region states
  ATOMIC_TRUE: 'true',
  ATOMIC_FALSE: 'false',
  BUSY_TRUE: 'true',
  BUSY_FALSE: 'false',
  LIVE_OFF: 'off',
  LIVE_POLITE: 'polite',
  LIVE_ASSERTIVE: 'assertive',
  LIVE_ASR: 'rude'
} as const;

// ARIA label generators
export function generateButtonLabel(text: string, context?: string): string {
  if (context) {
    return `${text} - ${context}`;
  }
  return text;
}

export function generateLinkLabel(text: string, destination?: string): string {
  if (destination) {
    return `${text} - ينتقل إلى ${destination}`;
  }
  return text;
}

export function generateInputLabel(label: string, type?: string, required?: boolean): string {
  let ariaLabel = label;
  
  if (type) {
    ariaLabel += ` (${type})`;
  }
  
  if (required) {
    ariaLabel += ' (مطلوب)';
  }
  
  return ariaLabel;
}

export function generateMenuLabel(menuName: string, itemCount?: number): string {
  if (itemCount !== undefined) {
    return `${menuName} - ${itemCount} عناصر`;
  }
  return menuName;
}

export function generateTabLabel(tabName: string, active?: boolean, panelDescription?: string): string {
  let label = tabName;
  
  if (active) {
    label += ' (نشط)';
  }
  
  if (panelDescription) {
    label += ` - ${panelDescription}`;
  }
  
  return label;
}

export function generateStatusLabel(status: string, type?: 'success' | 'error' | 'warning' | 'info'): string {
  const statusMap: Record<string, string> = {
    success: 'نجاح',
    error: 'خطأ',
    warning: 'تحذير',
    info: 'معلومات'
  };
  
  const statusText = type ? statusMap[type] : status;
  return `${statusText} - ${status}`;
}

// ARIA attribute builders
export function buildAriaAttributes(attributes: Record<string, string | boolean | number>): Record<string, string> {
  const ariaAttributes: Record<string, string> = {};
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== false) {
      const ariaKey = key.startsWith('aria-') ? key : `aria-${key}`;
      ariaAttributes[ariaKey] = String(value);
    }
  });
  
  return ariaAttributes;
}

// Common ARIA patterns
export function createButtonProps(
  label: string,
  options: {
    disabled?: boolean;
    pressed?: boolean;
    expanded?: boolean;
    hasPopup?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    describedBy?: string;
    labelledBy?: string;
  } = {}
) {
  return {
    role: ARIA_ROLES.BUTTON,
    'aria-label': label,
    'aria-disabled': options.disabled || undefined,
    'aria-pressed': options.pressed || undefined,
    'aria-expanded': options.expanded || undefined,
    'aria-haspopup': options.hasPopup || undefined,
    'aria-describedby': options.describedBy || undefined,
    'aria-labelledby': options.labelledBy || undefined,
  };
}

export function createLinkProps(
  label: string,
  destination?: string,
  options: {
    disabled?: boolean;
    describedBy?: string;
    labelledBy?: string;
  } = {}
) {
  return {
    role: ARIA_ROLES.LINK,
    'aria-label': generateLinkLabel(label, destination),
    'aria-disabled': options.disabled || undefined,
    'aria-describedby': options.describedBy || undefined,
    'aria-labelledby': options.labelledBy || undefined,
  };
}

export function createInputProps(
  label: string,
  type?: string,
  options: {
    required?: boolean;
    invalid?: boolean;
    describedBy?: string;
    labelledBy?: string;
    placeholder?: string;
    autoComplete?: string;
  } = {}
) {
  return {
    'aria-label': generateInputLabel(label, type, options.required),
    'aria-required': options.required || undefined,
    'aria-invalid': options.invalid || undefined,
    'aria-describedby': options.describedBy || undefined,
    'aria-labelledby': options.labelledBy || undefined,
    'aria-placeholder': options.placeholder || undefined,
    'aria-autocomplete': options.autoComplete || undefined,
  };
}

export function createMenuProps(
  label: string,
  options: {
    expanded?: boolean;
    itemCount?: number;
    describedBy?: string;
  } = {}
) {
  return {
    role: ARIA_ROLES.MENU,
    'aria-label': generateMenuLabel(label, options.itemCount),
    'aria-expanded': options.expanded || undefined,
    'aria-describedby': options.describedBy || undefined,
  };
}

export function createTabProps(
  label: string,
  options: {
    selected?: boolean;
    active?: boolean;
    controls?: string;
    panelDescription?: string;
  } = {}
) {
  return {
    role: ARIA_ROLES.TAB,
    'aria-label': generateTabLabel(label, options.active, options.panelDescription),
    'aria-selected': options.selected || undefined,
    'aria-controls': options.controls || undefined,
  };
}

export function createStatusProps(
  message: string,
  type?: 'polite' | 'assertive' | 'off',
  options: {
    atomic?: boolean;
    relevant?: 'additions' | 'removals' | 'text' | 'all';
  } = {}
) {
  const statusType = type as 'success' | 'error' | 'warning' | 'info' | undefined;
  
  return {
    role: ARIA_ROLES.STATUS,
    'aria-live': type || 'polite',
    'aria-atomic': options.atomic || undefined,
    'aria-relevant': options.relevant || undefined,
    'aria-label': generateStatusLabel(message, statusType),
  };
}

// Accessibility validation utilities
export function validateAriaAttributes(element: HTMLElement): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for required attributes
  if (element.getAttribute('role') === 'button' && !element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
    errors.push('Button requires aria-label or aria-labelledby');
  }
  
  if (element.getAttribute('role') === 'img' && !element.getAttribute('aria-label') && !element.getAttribute('alt')) {
    errors.push('Image requires aria-label or alt attribute');
  }
  
  if (element.getAttribute('aria-required') === 'true' && !element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
    warnings.push('Required field should have aria-label or aria-labelledby');
  }
  
  // Check for invalid combinations
  if (element.getAttribute('aria-expanded') === 'true' && element.getAttribute('aria-pressed') === 'true') {
    warnings.push('aria-expanded and aria-pressed should not both be true');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Screen reader announcements
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
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
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Focus management utilities
export function manageFocus(container: HTMLElement, trapFocus: boolean = true): () => void {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!trapFocus) return;
    
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  };
  
  container.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

// Export all utilities
export const ARIAUtils = {
  ROLES: ARIA_ROLES,
  PROPERTIES: ARIA_PROPERTIES,
  STATES: ARIA_STATES,
  generateButtonLabel,
  generateLinkLabel,
  generateInputLabel,
  generateMenuLabel,
  generateTabLabel,
  generateStatusLabel,
  buildAriaAttributes,
  createButtonProps,
  createLinkProps,
  createInputProps,
  createMenuProps,
  createTabProps,
  createStatusProps,
  validateAriaAttributes,
  announceToScreenReader,
  manageFocus
};

export default ARIAUtils;
