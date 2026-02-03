"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded border border-gray-300 ring-offset-background focus-visible:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 bg-white',
        success: 'border-green-300 bg-green-50 text-green-600',
        warning: 'border-yellow-300 bg-yellow-50 text-yellow-600',
        error: 'border-red-300 bg-red-50 text-red-600',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const checkboxIndicatorVariants = cva(
  'flex items-center justify-center text-white',
  {
    variants: {
      variant: {
        default: 'bg-blue-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    variant, 
    size,
    label,
    description,
    error,
    disabled = false,
    indeterminate = false,
    checked,
    ...props 
  }, ref) => {
  const finalVariant = error ? 'error' : variant;
  const finalChecked = indeterminate ? 'indeterminate' : checked;
  
  return (
    <div className={`flex items-start space-x-3 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex h-5 items-center">
        <input
          type="checkbox"
          className={checkboxVariants({ variant: finalVariant, size, className })}
          ref={ref}
          checked={finalChecked === 'indeterminate' ? false : finalChecked}
          disabled={disabled}
          data-state={finalChecked ? 'checked' : 'unchecked'}
          data-indeterminate={indeterminate ? 'indeterminate' : undefined}
          {...props}
        />
        <div className={checkboxIndicatorVariants({ variant: finalVariant })}>
          <svg
            className="h-2.5 w-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {indeterminate ? (
              <path d="M5 12h14" />
            ) : (
              <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      </div>
      {(label || description) && (
        <div className="grid gap-1">
          {label && (
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants, checkboxIndicatorVariants };
