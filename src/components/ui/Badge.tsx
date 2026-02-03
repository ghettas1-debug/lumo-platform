"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-blue-100 text-blue-800 border border-blue-200',
        secondary: 'bg-gray-100 text-gray-800 border border-gray-200',
        success: 'bg-green-100 text-green-800 border border-green-200',
        warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        destructive: 'bg-red-100 text-red-800 border border-red-200',
        outline: 'border border-gray-300 text-gray-700 bg-white',
        ghost: 'text-gray-600 hover:bg-gray-100',
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0',
      },
      size: {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-1.5 text-base',
        lg: 'px-5 py-2 text-lg',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-105 active:scale-95',
        false: '',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      interactive: false,
      animated: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  count?: number;
  maxCount?: number;
  showZero?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive, 
    animated,
    icon,
    count,
    maxCount = 99,
    showZero = false,
    children,
    ...props 
  }, ref) => {
    const displayCount = count !== undefined ? (count > maxCount ? `${maxCount}+` : count) : null;
    const shouldShow = displayCount !== null ? (showZero || count !== 0) : true;
    
    if (!shouldShow) return null;
    
    return (
      <div
        ref={ref}
        className={badgeVariants({ variant, size, interactive, animated, className })}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {displayCount !== null ? displayCount : children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
