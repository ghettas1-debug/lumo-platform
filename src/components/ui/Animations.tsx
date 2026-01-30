import React from 'react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const slideDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const slideLeftVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const slideRightVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const bounceVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  exit: { opacity: 0, scale: 0.3 },
};

// Animation components
interface AnimatedWrapperProps extends MotionProps {
  children: React.ReactNode;
  variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedWrapper({
  children,
  variant = 'fadeIn',
  duration = 0.3,
  delay = 0,
  className = '',
  ...props
}: AnimatedWrapperProps) {
  const variants = {
    fadeIn: fadeInVariants,
    slideUp: slideUpVariants,
    slideDown: slideDownVariants,
    slideLeft: slideLeftVariants,
    slideRight: slideRightVariants,
    scale: scaleVariants,
    bounce: bounceVariants,
  };

  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger animation for lists
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  variant?: 'fadeIn' | 'slideUp' | 'scale';
  className?: string;
}

export function StaggerItem({
  children,
  variant = 'fadeIn',
  className = '',
}: StaggerItemProps) {
  const variants = {
    fadeIn: fadeInVariants,
    slideUp: slideUpVariants,
    scale: scaleVariants,
  };

  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  );
}

// Hover animations
interface HoverCardProps {
  children: React.ReactNode;
  scale?: number;
  rotate?: number;
  className?: string;
}

export function HoverCard({ children, scale = 1.05, rotate = 0, className = '' }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ scale, rotate }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Button animations
interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function AnimatedButton({ children, className = '', onClick, disabled = false }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// Progress bar animation
interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: string;
}

export function AnimatedProgress({ value, max = 100, className = '', color = '#3b82f6' }: AnimatedProgressProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}

// Counter animation
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ value, duration = 1, className = '', prefix = '', suffix = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(value * easeOutQuart);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

// Floating animation
interface FloatingProps {
  children: React.ReactNode;
  duration?: number;
  intensity?: number;
  className?: string;
}

export function Floating({ children, duration = 3, intensity = 10, className = '' }: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-intensity, intensity, -intensity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation
interface PulseProps {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export function Pulse({ children, scale = 1.05, duration = 2, className = '' }: PulseProps) {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Typing animation
interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypingAnimation({ text, className = '', speed = 50, delay = 0 }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed]);

  React.useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return <span className={className}>{displayedText}</span>;
}

// Page transition
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Modal animation
interface ModalAnimationProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAnimation({ children, isOpen, onClose }: ModalAnimationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Notification animation
interface NotificationAnimationProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export function NotificationAnimation({ children, isVisible }: NotificationAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
