"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const progressVariants = cva(
  'w-full bg-gray-200 rounded-full overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-gray-200',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        error: 'bg-red-100',
        gradient: 'bg-gradient-to-r from-gray-200 to-gray-300',
      },
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
      animated: {
        true: 'transition-all duration-500 ease-out',
        false: '',
      },
      striped: {
        true: 'bg-gradient-to-r from-transparent via-white/20 to-transparent',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      animated: true,
      striped: false,
    },
  }
);

const progressFillVariants = cva(
  'h-full rounded-full transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-blue-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600',
        gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
        rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500',
      },
      animated: {
        true: 'transition-all duration-500 ease-out',
        false: '',
      },
      striped: {
        true: 'bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: true,
      striped: false,
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  fillVariant?: VariantProps<typeof progressFillVariants>['variant'];
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    variant, 
    size, 
    animated, 
    striped,
    value,
    max = 100,
    label,
    showValue = false,
    fillVariant = 'default',
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div className="space-y-2">
        {(label || showValue) && (
          <div className="flex justify-between items-center text-sm">
            {label && <span className="font-medium text-gray-700">{label}</span>}
            {showValue && (
              <span className="text-gray-600">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={progressVariants({ variant, size, animated, striped, className })}
          {...props}
        >
          <div
            className={progressFillVariants({ 
              variant: fillVariant, 
              animated, 
              striped 
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress, progressVariants, progressFillVariants };
