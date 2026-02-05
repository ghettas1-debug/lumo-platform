'use client';

// Transition Effects and Skeleton Loaders for Lumo Platform
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useAnimationManager, useReducedMotion } from '@/utils/motionUtils';

// Page Transition Component
interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'flip';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  direction = 'up',
  duration = 0.5,
}) => {
  const manager = useAnimationManager();
  const prefersReducedMotion = useReducedMotion();

  const getVariants = () => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }

    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      
      case 'slide':
        const slideVariants = {
          up: { y: 20 },
          down: { y: -20 },
          left: { x: 20 },
          right: { x: -20 },
        };
        return {
          initial: { opacity: 0, ...slideVariants[direction] },
          animate: { opacity: 1, y: 0, x: 0 },
          exit: { opacity: 0, ...slideVariants[direction] },
        };
      
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        };
      
      case 'flip':
        return {
          initial: { opacity: 0, rotateY: -90 },
          animate: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: 90 },
        };
      
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        ease: manager.getTransition().ease,
      }}
    >
      {children}
    </motion.div>
  );
};

// Skeleton Loader Components
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  className?: string;
  animated?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  className = '',
  animated = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
      default:
        return 'rounded-md';
    }
  };

  return (
    <motion.div
      className={`bg-gray-200 ${getVariantClasses()} ${className}`}
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

// Skeleton Card Component
interface SkeletonCardProps {
  showAvatar?: boolean;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showText?: boolean;
  textLines?: number;
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  showAvatar = true,
  showTitle = true,
  showSubtitle = true,
  showText = true,
  textLines = 3,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {showAvatar && (
        <div className="flex items-center space-x-4 mb-4">
          <Skeleton width={40} height={40} variant="circular" />
          <div className="flex-1">
            {showTitle && <Skeleton width="60%" height={20} className="mb-2" />}
            {showSubtitle && <Skeleton width="40%" height={16} />}
          </div>
        </div>
      )}
      
      {!showAvatar && showTitle && (
        <Skeleton width="80%" height={24} className="mb-4" />
      )}
      
      {showText && (
        <div className="space-y-2">
          {Array.from({ length: textLines }).map((_, index) => (
            <Skeleton
              key={index}
              width={index === textLines - 1 ? '80%' : '100%'}
              height={16}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Skeleton List Component
interface SkeletonListProps {
  items?: number;
  showAvatar?: boolean;
  className?: string;
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
  items = 5,
  showAvatar = true,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          {showAvatar && <Skeleton width={48} height={48} variant="circular" />}
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={16} />
          </div>
        </div>
      ))}
    </div>
  );
};

// Skeleton Table Component
interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = '',
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        {showHeader && (
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-6 py-3">
                  <Skeleton height={20} />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton height={16} width="80%" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Staggered Animation Component
interface StaggeredAnimationProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = '',
}) => {
  const manager = useAnimationManager();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: initialDelay,
      },
    },
    exit: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : manager.getAnimationConfig().duration,
      },
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: prefersReducedMotion ? 0.01 : manager.getAnimationConfig().duration,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Reveal Animation Component
interface RevealAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const RevealAnimation: React.FC<RevealAnimationProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const manager = useAnimationManager();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getDirectionVariants = () => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }

    const directions = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    };

    return {
      hidden: { opacity: 0, ...directions[direction] },
      visible: { opacity: 1, x: 0, y: 0 },
    };
  };

  const variants = getDirectionVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        delay,
        ease: manager.getTransition().ease,
      }}
    >
      {children}
    </motion.div>
  );
};

// Morphing Animation Component
interface MorphingAnimationProps {
  children: React.ReactNode;
  morphTo?: React.ReactNode;
  trigger?: 'hover' | 'click' | 'auto';
  duration?: number;
  className?: string;
}

export const MorphingAnimation: React.FC<MorphingAnimationProps> = ({
  children,
  morphTo,
  trigger = 'hover',
  duration = 0.3,
  className = '',
}) => {
  const [isMorphed, setIsMorphed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleTrigger = () => {
    if (trigger === 'click') {
      setIsMorphed(!isMorphed);
    }
  };

  const variants = {
    initial: {
      scale: 1,
      rotate: 0,
      borderRadius: '0.5rem',
    },
    morphed: {
      scale: 1.1,
      rotate: 5,
      borderRadius: '50%',
    },
  };

  return (
    <motion.div
      className={className}
      variants={!prefersReducedMotion ? variants : undefined}
      animate={isMorphed ? 'morphed' : 'initial'}
      transition={{
        duration: prefersReducedMotion ? 0.01 : duration,
        ease: 'easeInOut',
      }}
      onHoverStart={() => trigger === 'hover' && setIsMorphed(true)}
      onHoverEnd={() => trigger === 'hover' && setIsMorphed(false)}
      onClick={handleTrigger}
    >
      {isMorphed && morphTo ? morphTo : children}
    </motion.div>
  );
};

// Parallax Animation Component
interface ParallaxAnimationProps {
  children: React.ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
}

export const ParallaxAnimation: React.FC<ParallaxAnimationProps> = ({
  children,
  speed = 0.5,
  offset = 0,
  className = '',
}) => {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transform = prefersReducedMotion 
    ? 'translateY(0px)' 
    : `translateY(${(scrollY * speed) + offset}px)`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transform,
        willChange: prefersReducedMotion ? 'auto' : 'transform',
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating Animation Component
interface FloatingAnimationProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FloatingAnimation: React.FC<FloatingAnimationProps> = ({
  children,
  amplitude = 10,
  duration = 3,
  delay = 0,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        !prefersReducedMotion
          ? {
              y: [-amplitude, amplitude, -amplitude],
            }
          : undefined
      }
      transition={
        !prefersReducedMotion
          ? {
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
};

// Typing Animation Component
interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Export all components
export {
  PageTransition as default,
  Skeleton,
  SkeletonCard,
  SkeletonList,
  SkeletonTable,
  StaggeredAnimation,
  RevealAnimation,
  MorphingAnimation,
  ParallaxAnimation,
  FloatingAnimation,
  TypingAnimation,
};
