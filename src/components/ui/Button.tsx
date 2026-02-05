'use client';

import * as React from 'react';
import clsx from 'clsx';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50';

const variants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-300 hover:bg-gray-100',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  ghost: 'hover:bg-gray-100',
  link: 'text-blue-600 underline-offset-4 hover:underline',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
};

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        className,
        variant = 'default',
        size = 'md',
        loading = false,
        disabled,
        fullWidth,
        leftIcon,
        rightIcon,
        children,
        type = 'button',
        ...props
      },
      ref
    ) => {
      const isDisabled = disabled || loading;

      const classes = React.useMemo(
        () =>
          clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            className
          ),
        [variant, size, fullWidth, className]
      );

      return (
        <button
          ref={ref}
          type={type}
          className={classes}
          disabled={isDisabled}
          aria-busy={loading ? 'true' : 'false'}
          aria-disabled={isDisabled ? 'true' : 'false'}
          tabIndex={isDisabled ? -1 : 0}
          {...props}
        >
          {loading && (
            <span
              className="mr-2 animate-spin"
              data-testid="loading-spinner"
            >
              ⏳
            </span>
          )}

          {leftIcon && !loading && (
            <span
              data-testid="left-icon"
              className="mr-2 flex items-center"
            >
              {leftIcon}
            </span>
          )}

          <span>{children}</span>

          {rightIcon && !loading && (
            <span
              data-testid="right-icon"
              className="ml-2 flex items-center"
            >
              {rightIcon}
            </span>
          )}
        </button>
      );
    }
  )
);

Button.displayName = 'Button';

export { Button };
