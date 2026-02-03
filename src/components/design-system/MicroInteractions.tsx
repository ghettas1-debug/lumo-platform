'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ===== HOVER EFFECT COMPONENTS =====

interface HoverEffectProps {
  children: React.ReactNode;
  scale?: number;
  rotate?: number;
  brightness?: number;
  className?: string;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({
  children,
  scale = 1.05,
  rotate = 0,
  brightness = 1.1,
  className,
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale, 
        rotate,
        filter: `brightness(${brightness})`
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      className={cn('cursor-pointer', className)}
    >
      {children}
    </motion.div>
  );
};

// ===== RIPPLE EFFECT COMPONENT =====

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  className,
  color = 'rgba(59, 130, 246, 0.3)',
}) => {
  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// ===== MAGNETIC EFFECT COMPONENT =====

interface MagneticEffectProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticEffect: React.FC<MagneticEffectProps> = ({
  children,
  strength = 0.3,
  className,
}) => {
  return (
    <motion.div
      className={cn('inline-block', className)}
      whileHover={{
        x: strength * 10,
        y: strength * 10,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

// ===== STAGGERED ANIMATION COMPONENT =====

interface StaggeredAnimationProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  className?: string;
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  direction = 'up',
  className,
}) => {
  const variants = {
    up: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    down: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
    },
    left: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
    },
    right: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  };

  const currentVariant = variants[direction];

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={currentVariant.initial}
          animate={currentVariant.animate}
          transition={{
            delay: initialDelay + index * staggerDelay,
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

// ===== MORPHING SHAPE COMPONENT =====

interface MorphingShapeProps {
  isActive: boolean;
  children: React.ReactNode;
  activeShape?: 'circle' | 'square' | 'rounded';
  className?: string;
}

export const MorphingShape: React.FC<MorphingShapeProps> = ({
  isActive,
  children,
  activeShape = 'circle',
  className,
}) => {
  const getBorderRadius = () => {
    if (!isActive) return '0.5rem';
    
    switch (activeShape) {
      case 'circle':
        return '50%';
      case 'square':
        return '0';
      case 'rounded':
        return '0.5rem';
      default:
        return '0.5rem';
    }
  };

  return (
    <motion.div
      className={cn('transition-colors duration-300', className)}
      animate={{
        borderRadius: getBorderRadius(),
        scale: isActive ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

// ===== PARALLAX EFFECT COMPONENT =====

interface ParallaxEffectProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  children,
  speed = 0.5,
  className,
}) => {
  return (
    <motion.div
      className={className}
      whileInView={{
        y: [0, -speed * 100, 0],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// ===== FLOATING ANIMATION COMPONENT =====

interface FloatingAnimationProps {
  children: React.ReactNode;
  duration?: number;
  intensity?: number;
  className?: string;
}

export const FloatingAnimation: React.FC<FloatingAnimationProps> = ({
  children,
  duration = 3,
  intensity = 10,
  className,
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// ===== TYPING ANIMATION COMPONENT =====

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
}) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={cn('font-mono', className)}>
      {displayedText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-current ml-1"
        />
      )}
    </span>
  );
};

// ===== COUNTER ANIMATION COMPONENT =====

interface CounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  from,
  to,
  duration = 2,
  className,
  prefix = '',
  suffix = '',
  decimals = 0,
}) => {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = from + (to - from) * easeOutQuart;
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [from, to, duration]);

  return (
    <span className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// ===== PROGRESS RING COMPONENT =====

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  showPercentage = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          strokeLinecap="round"
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

// ===== SLIDE IN ANIMATION COMPONENT =====

interface SlideInAnimationProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export const SlideInAnimation: React.FC<SlideInAnimationProps> = ({
  children,
  direction = 'up',
  distance = 30,
  delay = 0,
  duration = 0.5,
  className,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, opacity: 0 };
      case 'right':
        return { x: distance, opacity: 0 };
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        delay,
        duration,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
