"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const dropdownVariants = cva(
  'relative inline-block text-left',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const triggerVariants = cva(
  'inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 bg-white text-gray-900',
        outline: 'border-gray-300 bg-white text-gray-900',
        ghost: 'border-transparent bg-transparent text-gray-700 hover:bg-gray-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const contentVariants = cva(
  'absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50',
  {
    variants: {
      align: {
        start: 'left-0 right-auto',
        center: 'left-1/2 transform -translate-x-1/2',
        end: 'right-0 left-auto',
      },
    },
    defaultVariants: {
      align: 'end',
    },
  }
);

const itemVariants = cva(
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
  {
    variants: {
      variant: {
        default: 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100',
        destructive: 'text-red-600 hover:bg-red-50 focus:bg-red-50',
        success: 'text-green-600 hover:bg-green-50 focus:bg-green-50',
        warning: 'text-yellow-600 hover:bg-yellow-50 focus:bg-yellow-50',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
    },
  }
);

export interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'start' | 'center' | 'end';
}

export interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof triggerVariants> {
  asChild?: boolean;
}

export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentVariants> {
  forceMount?: boolean;
}

export interface DropdownItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof itemVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

export interface DropdownSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownContext = React.createContext<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>({});

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ 
    className, 
    size,
    trigger,
    open,
    onOpenChange,
    align = 'end',
    children,
    ...props 
  }, ref) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const el = ref && 'current' in ref ? ref.current : null;
      if (!el) return;
      if (!el.contains(target)) {
        handleOpenChange(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleOpenChange]);

  return (
    <DropdownContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      <div
        ref={ref}
        className={dropdownVariants({ size, className })}
        {...props}
      >
        {trigger}
        {isOpen && children}
      </div>
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = 'Dropdown';

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ 
    className, 
    variant, 
    size,
    asChild = false,
    children,
    ...props 
  }, ref) => {
  const { onOpenChange } = React.useContext(DropdownContext);

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      className={triggerVariants({ variant, size, className })}
      onClick={() => onOpenChange?.(true)}
      {...props}
    >
      {children}
    </button>
  );
});

DropdownTrigger.displayName = 'DropdownTrigger';

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ 
    className, 
    align,
    forceMount,
    children,
    ...props 
  }, ref) => {
  const { open } = React.useContext(DropdownContext);

  if (!open && !forceMount) return null;

  return (
    <div
      ref={ref}
      className={contentVariants({ align, className })}
      {...props}
    >
      {children}
    </div>
  );
});

DropdownContent.displayName = 'DropdownContent';

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ 
    className, 
    variant,
    disabled = false,
    asChild = false,
    icon,
    shortcut,
    children,
    ...props 
  }, ref) => {
  const { onOpenChange } = React.useContext(DropdownContext);

  const handleClick = () => {
    if (!disabled) {
      onOpenChange?.(false);
    }
  };

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      className={itemVariants({ variant, disabled, className })}
      disabled={disabled || undefined}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="ml-auto text-xs tracking-widest opacity-60">
          {shortcut}
        </span>
      )}
    </button>
  );
});

DropdownItem.displayName = 'DropdownItem';

const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`my-1 h-px bg-gray-100 ${className}`}
    {...props}
  />
)
);

DropdownSeparator.displayName = 'DropdownSeparator';

export { 
  Dropdown, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownSeparator,
  dropdownVariants,
  triggerVariants,
  contentVariants,
  itemVariants
};
