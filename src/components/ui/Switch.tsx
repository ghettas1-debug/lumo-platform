"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const switchVariants = cva(
  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-gray-200 data-[state=checked]:bg-blue-600',
        success: 'bg-gray-200 data-[state=checked]:bg-green-600',
        warning: 'bg-gray-200 data-[state=checked]:bg-yellow-600',
        error: 'bg-gray-200 data-[state=checked]:bg-red-600',
        gradient: 'bg-gray-200 data-[state=checked]:bg-gradient-to-r from-blue-600 to-purple-600',
      },
      size: {
        sm: 'h-4 w-7',
        md: 'h-6 w-11',
        lg: 'h-8 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  'inline-block rounded-full bg-white transition-transform duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
        md: 'h-4 w-4 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ 
    className, 
    variant, 
    size,
    checked,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    label,
    description,
    ...props 
  }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const finalChecked = isControlled ? checked : isChecked;

    const handleToggle = () => {
      if (disabled) return;
      
      const newChecked = !finalChecked;
      
      if (!isControlled) {
        setIsChecked(newChecked);
      }
      
      onCheckedChange?.(newChecked);
    };

    return (
      <div className={`flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={finalChecked}
          disabled={disabled}
          className={switchVariants({ variant, size, className })}
          onClick={handleToggle}
          data-state={finalChecked ? 'checked' : 'unchecked'}
          {...props}
        >
          <span
            data-state={finalChecked ? 'checked' : 'unchecked'}
            className={thumbVariants({ size })}
          />
        </button>
        
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={handleToggle}>
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-gray-500">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch, switchVariants, thumbVariants };
