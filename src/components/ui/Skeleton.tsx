import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const skeletonVariants = cva(
  'animate-pulse rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-gray-200',
        dark: 'bg-gray-300',
        light: 'bg-gray-100',
        card: 'bg-gray-200',
        text: 'bg-gray-200',
        avatar: 'bg-gray-200',
        button: 'bg-gray-200',
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
        full: 'w-full',
        h4: 'h-4',
        h6: 'h-6',
        h8: 'h-8',
        h12: 'h-12',
      },
      shape: {
        rounded: 'rounded-md',
        circle: 'rounded-full',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'rounded',
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  asChild?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    return (
      <div
        className={skeletonVariants({ variant, size, shape, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Card Skeleton
const CardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4">
    <div className="skeleton h-40 rounded-2xl bg-gray-200" />
    <div className="space-y-3">
      <div className="skeleton h-6 w-3/4 bg-gray-200 rounded-lg" />
      <div className="skeleton h-4 w-1/2 bg-gray-200 rounded-lg" />
    </div>
    <div className="flex items-center justify-between">
      <div className="skeleton h-4 w-20 bg-gray-200 rounded-lg" />
      <div className="skeleton h-10 w-24 bg-gray-200 rounded-lg" />
    </div>
  </div>
);

// Course Card Skeleton
const CourseCardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    <div className="skeleton h-40 bg-gray-200" />
    <div className="p-6 flex flex-col grow space-y-4">
      <div className="skeleton h-6 w-full bg-gray-200 rounded-lg" />
      <div className="skeleton h-4 w-1/2 bg-gray-200 rounded-lg" />
      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="skeleton h-4 w-16 bg-gray-200 rounded-lg" />
          <div className="skeleton h-4 w-20 bg-gray-200 rounded-lg" />
        </div>
        <div className="skeleton h-12 w-full bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

// List Skeleton
const ListSkeleton = ({ items = 3 }: { items?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
        <div className="skeleton h-12 w-12 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4 bg-gray-200 rounded-lg" />
          <div className="skeleton h-3 w-1/2 bg-gray-200 rounded-lg" />
        </div>
        <div className="skeleton h-8 w-20 bg-gray-200 rounded-lg" />
      </div>
    ))}
  </div>
);

// Table Skeleton
const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="w-full space-y-3">
    {/* Header */}
    <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
      {Array.from({ length: columns }).map((_, index) => (
        <div key={index} className="flex-1 skeleton h-4 bg-gray-300 rounded" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="flex-1 skeleton h-4 bg-gray-200 rounded" />
        ))}
      </div>
    ))}
  </div>
);

// Loading Spinner
const LoadingSpinner = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <svg
        className="h-full w-full text-blue-600"
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
    </div>
  );
};

// Loading Dots
const LoadingDots = ({ className = '' }: { className?: string }) => (
  <div className={`flex space-x-1 ${className}`}>
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

// Loading Pulse
const LoadingPulse = ({ className = '' }: { className?: string }) => (
  <div className={`flex space-x-2 ${className}`}>
    <div className="w-2 h-8 bg-blue-600 rounded animate-pulse"></div>
    <div className="w-2 h-8 bg-blue-600 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
    <div className="w-2 h-8 bg-blue-600 rounded animate-pulse" style={{ animationDelay: '400ms' }}></div>
    <div className="w-2 h-8 bg-blue-600 rounded animate-pulse" style={{ animationDelay: '600ms' }}></div>
  </div>
);

// Full Page Loading
const FullPageLoading = ({ message = 'جاري التحميل...' }: { message?: string }) => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center space-y-6">
      <LoadingSpinner size="xl" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{message}</h3>
        <p className="text-sm text-gray-600">يرجى الانتظار لحظة...</p>
      </div>
    </div>
  </div>
);

export {
  Skeleton,
  skeletonVariants,
  CardSkeleton,
  CourseCardSkeleton,
  ListSkeleton,
  TableSkeleton,
  LoadingSpinner,
  LoadingDots,
  LoadingPulse,
  FullPageLoading,
};
