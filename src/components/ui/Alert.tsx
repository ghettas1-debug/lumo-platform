"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-900 border-gray-200',
        destructive: 'bg-red-50 text-red-900 border-red-200',
        warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        success: 'bg-green-50 text-green-900 border-green-200',
        info: 'bg-blue-50 text-blue-900 border-blue-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconVariants = cva(
  'flex-shrink-0',
  {
    variants: {
      variant: {
        default: 'text-gray-500',
        destructive: 'text-red-500',
        warning: 'text-yellow-500',
        success: 'text-green-500',
        info: 'text-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant,
    title,
    description,
    icon,
    showIcon = true,
    closable = false,
    onClose,
    children,
    ...props 
  }, ref) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const getDefaultIcon = () => {
    switch (variant) {
      case 'destructive':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-6m6 4a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      className={alertVariants({ variant, className })}
      {...props}
    >
      <div className="flex gap-3">
        {showIcon && (
          <div className={iconVariants({ variant })}>
            {icon || getDefaultIcon()}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold leading-none tracking-tight">
              {title}
            </h3>
          )}
          {description && (
            <div className="text-sm opacity-90 mt-1">
              {description}
            </div>
          )}
          {children}
        </div>
        {closable && (
          <button
            onClick={handleClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`text-sm opacity-90 ${className}`} {...props} />
  )
);

AlertDescription.displayName = 'AlertDescription';

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={`font-semibold leading-none tracking-tight ${className}`} {...props} />
  )
);

AlertTitle.displayName = 'AlertTitle';

export { Alert, AlertDescription, AlertTitle, alertVariants, iconVariants };
