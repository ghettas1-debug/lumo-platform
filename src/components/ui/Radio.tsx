"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const radioGroupVariants = cva(
  'flex flex-col space-y-2',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row space-y-0 space-x-2',
        vertical: 'flex-col space-y-2',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

const radioVariants = cva(
  'h-4 w-4 rounded-full border border-gray-300 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 bg-white',
        primary: 'border-blue-300 bg-blue-50 text-blue-600',
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

const radioIndicatorVariants = cva(
  'flex items-center justify-center w-full h-full rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-gray-600',
        primary: 'bg-blue-600',
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

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioGroupVariants> {
  orientation?: 'horizontal' | 'vertical';
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value'>,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  checked?: boolean;
  value: string;
  onCheckedChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    className, 
    orientation,
    value,
    onValueChange,
    children,
    ...props 
  }, ref) => {
  return (
    <div
      ref={ref}
      className={radioGroupVariants({ orientation, className })}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === Radio) {
          const childProps = child.props as RadioProps;
          return React.cloneElement(child as React.ReactElement<RadioProps>, {
            key: child.key || index,
            checked: childProps.value === value,
            onCheckedChange: () => onValueChange?.(childProps.value),
          });
        }
        return child;
      })}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    className, 
    variant, 
    size,
    label,
    description,
    error,
    disabled = false,
    checked,
    value,
    onCheckedChange,
    ...props 
  }, ref) => {
  const finalVariant = error ? 'error' : variant;
  
  return (
    <div className={`flex items-start space-x-3 ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex h-5 items-center">
        <input
          type="radio"
          className={radioVariants({ variant: finalVariant, size, className })}
          ref={ref}
          checked={checked}
          disabled={disabled}
          value={value}
          onChange={(e) => onCheckedChange?.(e.target.value)}
          data-state={checked ? 'checked' : 'unchecked'}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
        <div className={radioIndicatorVariants({ variant: finalVariant })}>
          <svg
            className="h-2.5 w-2.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="7" />
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

Radio.displayName = 'Radio';

export { RadioGroup, Radio, radioGroupVariants, radioVariants, radioIndicatorVariants };
