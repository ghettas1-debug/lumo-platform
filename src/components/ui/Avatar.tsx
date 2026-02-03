"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full overflow-hidden',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      variant: {
        default: 'bg-gray-200 text-gray-600',
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-white',
        error: 'bg-red-500 text-white',
        gradient: 'bg-gradient-to-br from-blue-500 to-purple-500 text-white',
      },
      border: {
        true: 'border-2 border-white shadow-lg',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      border: false,
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    size, 
    variant, 
    border,
    src, 
    alt = '', 
    fallback = '',
    status,
    children,
    ...props 
  }, ref) => {
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
    };

    const getStatusColor = (statusType: string) => {
      switch (statusType) {
        case 'online': return 'bg-green-500';
        case 'offline': return 'bg-gray-400';
        case 'away': return 'bg-yellow-500';
        case 'busy': return 'bg-red-500';
        default: return 'bg-gray-400';
      }
    };

    const displayContent = () => {
      if (src) {
        return (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        );
      }
      
      if (children) return children;
      
      return (
        <span className="font-medium">
          {fallback ? getInitials(fallback) : '?'}
        </span>
      );
    };

    return (
      <div
        ref={ref}
        className={avatarVariants({ size, variant, border, className })}
        {...props}
      >
        {displayContent()}
        {status && (
          <div
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(status)}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };
