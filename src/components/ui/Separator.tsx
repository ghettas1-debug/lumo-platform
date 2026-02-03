"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const separatorVariants = cva(
  'shrink-0 bg-gray-200',
  {
    variants: {
      orientation: {
        horizontal: 'h-px w-full',
        vertical: 'h-full w-px',
      },
      variant: {
        default: 'bg-gray-200',
        primary: 'bg-blue-200',
        secondary: 'bg-gray-200',
        destructive: 'bg-red-200',
        warning: 'bg-yellow-200',
        success: 'bg-green-200',
        info: 'bg-blue-200',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
    },
  }
);

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ 
    className, 
    orientation = 'horizontal', 
    variant = 'default',
    ...props 
  }, ref) => {
    const { role, "aria-orientation": ariaOrientation, ...restProps } = props;
    
    return (
      <div
        ref={ref}
        role={role || "separator"}
        aria-orientation={ariaOrientation || orientation}
        className={separatorVariants({ orientation, variant, className })}
        {...restProps}
      />
    );
  }
);

Separator.displayName = 'Separator';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  labelPosition?: 'start' | 'center' | 'end';
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ 
    className, 
    label, 
    labelPosition = 'center',
    children,
    ...props 
  }, ref) => {
    if (!label && !children) {
      return <Separator ref={ref} className={className} {...props} />;
    }

    const labelContent = label || children;
    
    return (
      <div
        ref={ref}
        className={`flex items-center ${className}`}
        {...props}
      >
        {labelPosition !== 'end' && (
          <Separator className="flex-1" />
        )}
        {(labelContent) && (
          <span className={`px-2 text-xs text-gray-500 ${
            labelPosition === 'start' ? 'mr-2' : 
            labelPosition === 'end' ? 'ml-2' : 
            'mx-2'
          }`}>
            {labelContent}
          </span>
        )}
        {labelPosition !== 'start' && (
          <Separator className="flex-1" />
        )}
      </div>
    );
  }
);

Divider.displayName = 'Divider';

export { Separator, Divider };
