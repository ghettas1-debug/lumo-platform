"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const dialogVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const overlayVariants = cva(
  'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {},
    defaultVariants: {},
  }
);

export interface DialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  preventClose?: boolean;
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  preventClose?: boolean;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end' | 'between';
}

const DialogContext = React.createContext<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  preventClose?: boolean;
}>({});

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ 
    className, 
    size,
    open,
    onOpenChange,
    title,
    description,
    showCloseButton = true,
    preventClose = false,
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
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen && !preventClose) {
          handleOpenChange(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, preventClose, handleOpenChange]);

    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange, preventClose }}>
        {/* Overlay */}
        <div
          className={overlayVariants()}
          data-state={isOpen ? 'open' : 'closed'}
          onClick={() => !preventClose && handleOpenChange(false)}
        />
        
        {/* Dialog */}
        <div
          ref={ref}
          className={dialogVariants({ size, className })}
          data-state={isOpen ? 'open' : 'closed'}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {(title || description || showCloseButton) && (
            <DialogHeader
              title={title}
              description={description}
              showCloseButton={showCloseButton}
            />
          )}
          {children}
        </div>
      </DialogContext.Provider>
    );
  }
);

Dialog.displayName = 'Dialog';

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ 
    className, 
    size,
    open,
    onOpenChange,
    showCloseButton = true,
    preventClose = false,
    children,
    ...props 
  }, ref) => {
    return (
      <Dialog
        ref={ref}
        size={size}
        open={open}
        onOpenChange={onOpenChange}
        showCloseButton={showCloseButton}
        preventClose={preventClose}
        className={className}
        {...props}
      >
        {children}
      </Dialog>
    );
  }
);

DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ 
    className, 
    title, 
    description, 
    showCloseButton = true,
    ...props 
  }, ref) => {
    const { onOpenChange, preventClose } = React.useContext(DialogContext);

    return (
      <div
        ref={ref}
        className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {title && (
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">
                {description}
              </p>
            )}
          </div>
          {showCloseButton && !preventClose && (
            <button
              onClick={() => onOpenChange?.(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 6 12 12" />
                <path d="m18 6-12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </div>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ 
    className, 
    align = 'end',
    ...props 
  }, ref) => {
    const alignClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={`flex flex-col-reverse sm:flex-row gap-2 sm:justify-end ${alignClasses[align]} ${className}`}
        {...props}
      />
    );
  }
);

DialogFooter.displayName = 'DialogFooter';

export { Dialog, DialogContent, DialogHeader, DialogFooter, dialogVariants, overlayVariants };
