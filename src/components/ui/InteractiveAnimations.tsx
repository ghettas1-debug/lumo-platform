'use client';

// Interactive Animation Components with Hover, Focus, Loading, Success/Error States
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  animationPresets, 
  transitionPresets, 
  useAnimationManager,
  useReducedMotion
} from '@/utils/motionUtils';

// Animated Button with all states
interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  error = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const manager = useAnimationManager();
  const prefersReducedMotion = useReducedMotion();

  const getVariantStyles = () => {
    const baseStyles = 'relative overflow-hidden transition-all duration-300 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  };

  const buttonVariants = {
    idle: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      transition: { ...transitionPresets.snappy, duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      rotate: 0,
      transition: { ...transitionPresets.instant },
    },
    focus: {
      scale: 1.02,
      rotate: 0,
      transition: { ...transitionPresets.smooth },
    },
    loading: {
      rotate: 0,
      scale: 1,
    },
    success: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
    error: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  const getState = () => {
    if (loading) return 'loading';
    if (success) return 'success';
    if (error) return 'error';
    if (isPressed) return 'tap';
    if (isHovered) return 'hover';
    if (isFocused) return 'focus';
    return 'idle';
  };

  return (
    <motion.button
      className={getVariantStyles()}
      variants={prefersReducedMotion ? {} : buttonVariants}
      animate={getState()}
      disabled={disabled || loading}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      whileTap={!prefersReducedMotion ? { scale: 0.95 } : undefined}
      whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
      whileFocus={!prefersReducedMotion ? { scale: 1.02 } : undefined}
    >
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="flex items-center justify-center"
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          </motion.div>
        )}
        
        {success && !loading && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: 'backOut' }}
            className="flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
        
        {error && !loading && !success && (
          <motion.div
            key="error"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.div>
        )}
        
        {!loading && !success && !error && (
          <motion.span
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Animated Input with focus and validation states
interface AnimatedInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  success?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error = false,
  success = false,
  loading = false,
  disabled = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const manager = useAnimationManager();
  const prefersReducedMotion = useReducedMotion();

  const inputVariants = {
    idle: {
      borderColor: '#e5e7eb',
      boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
    },
    focus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
      transition: { ...transitionPresets.smooth },
    },
    error: {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 },
    },
    success: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
      scale: [1, 1.02, 1],
      transition: { duration: 0.3 },
    },
    hover: {
      borderColor: '#9ca3af',
      transition: { duration: 0.2 },
    },
  };

  const getState = () => {
    if (error) return 'error';
    if (success) return 'success';
    if (isFocused) return 'focus';
    if (isHovered) return 'hover';
    return 'idle';
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <motion.label
          className={`block text-sm font-medium mb-2 ${
            error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-700'
          }`}
          animate={{
            color: error ? '#ef4444' : success ? '#10b981' : '#374151',
          }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-all duration-300 ${
            error ? 'pr-10' : success ? 'pr-10' : ''
          }`}
          variants={!prefersReducedMotion ? inputVariants : undefined}
          animate={getState()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full" />
            </motion.div>
          )}
          
          {success && !loading && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
          
          {error && !loading && !success && (
            <motion.div
              key="error"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Animated Card with hover effects
interface AnimatedCardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  hover = true,
  className = '',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const manager = useAnimationManager();
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    idle: {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 2,
      rotateY: 2,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { ...transitionPresets.bouncy, duration: 0.3 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer ${className}`}
      variants={!prefersReducedMotion && hover ? cardVariants : undefined}
      animate={hover && isHovered ? 'hover' : 'idle'}
      whileHover={hover && !prefersReducedMotion ? 'hover' : undefined}
      whileTap={hover && !prefersReducedMotion ? 'tap' : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// Loading Skeleton Component
interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  animated?: boolean;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = '1rem',
  className = '',
  animated = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      style={{ width, height }}
      animate={
        animated && !prefersReducedMotion
          ? {
              opacity: [0.3, 0.7, 0.3],
            }
          : undefined
      }
      transition={
        animated && !prefersReducedMotion
          ? {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
    />
  );
};

// Success Animation Component
interface SuccessAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  onComplete?: () => void;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  size = 'md',
  onComplete,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      className={`${sizes[size]} flex items-center justify-center`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
      onAnimationComplete={onComplete}
    >
      <motion.svg
        className={`${sizes[size]} text-green-500`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={{ pathLength: 0, rotate: -180 }}
        animate={{ pathLength: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </motion.svg>
    </motion.div>
  );
};

// Error Animation Component
interface ErrorAnimationProps {
  size?: 'sm' | 'md' | 'lg';
  onComplete?: () => void;
}

export const ErrorAnimation: React.FC<ErrorAnimationProps> = ({
  size = 'md',
  onComplete,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      className={`${sizes[size]} flex items-center justify-center`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
      onAnimationComplete={onComplete}
    >
      <motion.svg
        className={`${sizes[size]} text-red-500`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={{ pathLength: 0, rotate: -180 }}
        animate={{ 
          pathLength: 1, 
          rotate: [0, -10, 10, -10, 10, 0],
        }}
        transition={{ 
          duration: 0.8, 
          ease: 'easeInOut',
          rotate: {
            delay: 0.8,
            duration: 0.5,
          },
        }}
        onAnimationComplete={onComplete}
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </motion.svg>
    </motion.div>
  );
};

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = '#3b82f6',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <motion.div
      className={`${sizes[size]} border-2 border-gray-200 border-t-current rounded-full ${className}`}
      style={{ borderTopColor: color }}
      animate={
        !prefersReducedMotion
          ? {
              rotate: 360,
            }
          : undefined
      }
      transition={
        !prefersReducedMotion
          ? {
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }
          : undefined
      }
    />
  );
};

// Progress Bar with Animation
interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  animated?: boolean;
  className?: string;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  max = 100,
  color = '#3b82f6',
  animated = true,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={
          animated && !prefersReducedMotion
            ? {
                duration: 0.8,
                ease: 'easeInOut',
              }
            : { duration: 0 }
        }
      />
    </div>
  );
};

// Export all components
export {
  AnimatedButton as default,
  AnimatedInput,
  AnimatedCard,
  LoadingSkeleton,
  SuccessAnimation,
  ErrorAnimation,
  LoadingSpinner,
  AnimatedProgressBar,
};
