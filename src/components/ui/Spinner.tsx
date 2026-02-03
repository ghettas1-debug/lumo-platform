"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva(
  'animate-spin',
  {
    variants: {
      variant: {
        default: 'text-gray-500',
        primary: 'text-blue-500',
        secondary: 'text-gray-500',
        success: 'text-green-500',
        warning: 'text-yellow-500',
        destructive: 'text-red-500',
        white: 'text-white',
      },
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
        '2xl': 'h-16 w-16',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
  showLabel?: boolean;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ 
    className, 
    variant, 
    size,
    label,
    showLabel = false,
    ...props 
  }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center gap-2 ${className}`}
      {...props}
    >
      <svg
        className={spinnerVariants({ variant, size })}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {showLabel && label && (
        <span className="text-sm text-gray-600">{label}</span>
      )}
    </div>
  );
});

Spinner.displayName = 'Spinner';

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ 
    className, 
    text,
    size = 'md',
    ...props 
  }, ref) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`} />
      {text && (
        <span className="ml-2 text-sm text-gray-600">{text}</span>
      )}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export interface ProgressSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressSpinner = React.forwardRef<HTMLDivElement, ProgressSpinnerProps>(
  ({ 
    className, 
    progress = 0,
    size = 'md',
    ...props 
  }, ref) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const circumference = 2 * Math.PI * 4; // radius of 4 for md size
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center justify-center ${className}`}
      {...props}
    >
      <svg
        className={`${sizeClasses[size]} animate-spin`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <circle
          className="opacity-75"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  );
});

ProgressSpinner.displayName = 'ProgressSpinner';

export { Spinner, LoadingSpinner, ProgressSpinner, spinnerVariants };
