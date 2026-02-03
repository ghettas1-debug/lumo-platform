'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ===== LOADING SPINNER COMPONENTS =====

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white' | 'current';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  variant = 'primary',
  className 
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const variantClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    current: 'text-current',
  };

  return (
    <div
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <svg
        className="w-full h-full"
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
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

// ===== SKELETON LOADING COMPONENTS =====

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style = {
    width: width || '100%',
    height: height || '1.2rem',
  };

  return (
    <div
      className={cn(
        'bg-gray-200',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
    />
  );
};

// ===== CARD SKELETON =====

export const CardSkeleton: React.FC<{ showAvatar?: boolean }> = ({ 
  showAvatar = false 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {showAvatar && (
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1">
            <Skeleton width="60%" height={16} className="mb-2" />
            <Skeleton width="40%" height={12} />
          </div>
        </div>
      )}
      
      <Skeleton height={20} className="mb-3" />
      <Skeleton height={16} className="mb-2" />
      <Skeleton height={16} className="mb-4" />
      
      <div className="flex items-center justify-between">
        <Skeleton width={80} height={24} />
        <Skeleton width={100} height={32} />
      </div>
    </div>
  );
};

// ===== COURSE CARD SKELETON =====

export const CourseCardSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <Skeleton height={200} className="w-full" />
      
      <div className="p-6">
        <div className="flex items-center space-x-3 space-x-reverse mb-3">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton width="40%" height={14} />
        </div>
        
        <Skeleton height={24} className="mb-2" />
        <Skeleton height={16} className="mb-4" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Skeleton width={60} height={14} />
            <Skeleton width={60} height={14} />
            <Skeleton width={60} height={14} />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Skeleton width={80} height={20} />
          <Skeleton width={120} height={36} />
        </div>
      </div>
    </motion.div>
  );
};

// ===== LIST SKELETON =====

export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1">
              <Skeleton width="70%" height={16} className="mb-2" />
              <Skeleton width="50%" height={14} className="mb-2" />
              <Skeleton width="30%" height={12} />
            </div>
            <Skeleton width={100} height={32} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ===== TABLE SKELETON =====

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} height={16} />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} height={14} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== FULL PAGE LOADING =====

interface FullPageLoadingProps {
  message?: string;
  showLogo?: boolean;
}

export const FullPageLoading: React.FC<FullPageLoadingProps> = ({
  message = 'جاري التحميل...',
  showLogo = true,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        {showLogo && (
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">L</span>
            </div>
          </div>
        )}
        
        <Spinner size="xl" className="mb-4" />
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
};

// ===== PROGRESS LOADING =====

interface ProgressLoadingProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

export const ProgressLoading: React.FC<ProgressLoadingProps> = ({
  progress,
  size = 'md',
  showPercentage = true,
  color = 'primary',
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    primary: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div className="w-full">
      <div className={cn('bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <motion.div
          className={cn('h-full rounded-full', colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      
      {showPercentage && (
        <div className="mt-2 text-center text-sm text-gray-600">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

// ===== PULSE LOADING OVERLAY =====

interface PulseLoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

export const PulseLoadingOverlay: React.FC<PulseLoadingOverlayProps> = ({
  isLoading,
  children,
  message = 'جاري التحميل...',
}) => {
  return (
    <div className="relative">
      {children}
      
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg"
        >
          <div className="text-center">
            <Spinner size="lg" className="mb-2" />
            <p className="text-gray-600 text-sm">{message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
