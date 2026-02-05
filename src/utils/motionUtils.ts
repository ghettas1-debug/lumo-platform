'use client';

// Framer Motion Animation Utilities for Lumo Platform
import { motion, AnimatePresence, MotionProps, Variants, Transition, animationControls } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

// Animation configuration interfaces
export interface AnimationConfig {
  duration: number;
  delay: number;
  ease: string | number[];
  repeat?: number | boolean;
  repeatType?: 'loop' | 'reverse' | 'mirror';
  yoyo?: boolean;
}

export interface MotionVariants {
  initial?: any;
  animate?: any;
  hover?: any;
  tap?: any;
  focus?: any;
  exit?: any;
  whileInView?: any;
  whileHover?: any;
  whileTap?: any;
  whileFocus?: any;
}

export interface DeviceAwareAnimation {
  lowEnd: AnimationConfig;
  midRange: AnimationConfig;
  highEnd: AnimationConfig;
}

export interface ResponsiveAnimation {
  xs: AnimationConfig;
  sm: AnimationConfig;
  md: AnimationConfig;
  lg: AnimationConfig;
  xl: AnimationConfig;
  '2xl': AnimationConfig;
}

// Animation presets
export const animationPresets = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },

  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },

  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },

  scaleUp: {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
    exit: { scale: 0.8 },
  },

  scaleDown: {
    initial: { scale: 1.2 },
    animate: { scale: 1 },
    exit: { scale: 1.2 },
  },

  // Slide animations
  slideInLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },

  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },

  slideInUp: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },

  slideInDown: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },

  // Rotate animations
  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
  },

  spin: {
    animate: { rotate: 360 },
  },

  // Bounce animations
  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  },

  bounceIn: {
    initial: { scale: 0.3, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  },

  // Pulse animations
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  },

  heartbeat: {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  },

  // Shake animations
  shake: {
    animate: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
      },
    },
  },

  wobble: {
    animate: {
      rotate: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
      },
    },
  },

  // Flip animations
  flip: {
    animate: {
      rotateY: 360,
      transition: {
        duration: 0.6,
      },
    },
  },

  flipInX: {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: 90 },
  },

  flipInY: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 },
  },

  // Glow animations
  glow: {
    animate: {
      boxShadow: [
        '0 0 5px rgba(59, 130, 246, 0.5)',
        '0 0 20px rgba(59, 130, 246, 0.8)',
        '0 0 5px rgba(59, 130, 246, 0.5)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  },

  // Loading animations
  loading: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },

  loadingDots: {
    animate: {
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  },
};

// Transition presets
export const transitionPresets = {
  // Basic transitions
  smooth: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  snappy: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  bouncy: { type: 'spring', stiffness: 400, damping: 10 },
  gentle: { type: 'spring', stiffness: 200, damping: 20 },

  // Fast transitions
  instant: { duration: 0.1 },
  quick: { duration: 0.15 },
  fast: { duration: 0.2 },

  // Slow transitions
  slow: { duration: 0.5 },
  slower: { duration: 0.8 },
  verySlow: { duration: 1.2 },

  // Special transitions
  elastic: { type: 'spring', stiffness: 300, damping: 15 },
  wobbly: { type: 'spring', stiffness: 200, damping: 10 },
  stiff: { type: 'spring', stiffness: 400, damping: 25 },
  soft: { type: 'spring', stiffness: 100, damping: 30 },

  // Easing functions
  easeIn: { duration: 0.3, ease: 'easeIn' },
  easeOut: { duration: 0.3, ease: 'easeOut' },
  easeInOut: { duration: 0.3, ease: 'easeInOut' },
  easeInQuad: { duration: 0.3, ease: [0.55, 0.085, 0.68, 0.53] },
  easeOutQuad: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  easeInOutQuad: { duration: 0.3, ease: [0.455, 0.03, 0.515, 0.955] },
};

// Device-aware animation configurations
export const deviceAnimations: DeviceAwareAnimation = {
  lowEnd: {
    duration: 0.1,
    delay: 0,
    ease: 'easeOut',
  },
  midRange: {
    duration: 0.25,
    delay: 0.05,
    ease: [0.4, 0, 0.2, 1],
  },
  highEnd: {
    duration: 0.4,
    delay: 0.1,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
};

// Responsive animation configurations
export const responsiveAnimations: ResponsiveAnimation = {
  xs: { duration: 0.15, delay: 0, ease: 'easeOut' },
  sm: { duration: 0.2, delay: 0.025, ease: 'easeOut' },
  md: { duration: 0.25, delay: 0.05, ease: [0.4, 0, 0.2, 1] },
  lg: { duration: 0.3, delay: 0.075, ease: [0.4, 0, 0.2, 1] },
  xl: { duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  '2xl': { duration: 0.4, delay: 0.125, ease: [0.25, 0.46, 0.45, 0.94] },
};

// Animation Manager Class
export class AnimationManager {
  private deviceCategory: 'low-end' | 'mid-range' | 'high-end' = 'mid-range';
  public currentBreakpoint: string = 'md';
  private reducedMotion: boolean = false;
  private observers: Set<IntersectionObserver> = new Set();

  constructor() {
    this.detectDeviceCapabilities();
    this.setupIntersectionObserver();
  }

  // Detect device capabilities
  private detectDeviceCapabilities(): void {
    // Check for reduced motion preference
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect device category
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any).connection?.effectiveType || '4g';

    if (memory < 4 || cores < 4 || connection === '2g' || connection === 'slow-2g') {
      this.deviceCategory = 'low-end';
    } else if (memory >= 8 && cores >= 8 && connection === '4g') {
      this.deviceCategory = 'high-end';
    } else {
      this.deviceCategory = 'mid-range';
    }

    // Detect current breakpoint
    this.updateBreakpoint();
    window.addEventListener('resize', this.updateBreakpoint.bind(this));
  }

  // Update current breakpoint
  private updateBreakpoint(): void {
    const width = window.innerWidth;
    if (width < 480) this.currentBreakpoint = 'xs';
    else if (width < 768) this.currentBreakpoint = 'sm';
    else if (width < 1024) this.currentBreakpoint = 'md';
    else if (width < 1280) this.currentBreakpoint = 'lg';
    else if (width < 1536) this.currentBreakpoint = 'xl';
    else if (width < 1920) this.currentBreakpoint = '2xl';
    else this.currentBreakpoint = '2xl';
  }

  // Setup intersection observer for scroll animations
  private setupIntersectionObserver(): void {
    // This will be used for scroll-triggered animations
  }

  // Get device-appropriate animation config
  public getAnimationConfig(): AnimationConfig {
    if (this.reducedMotion) {
      return {
        duration: 0.01,
        delay: 0,
        ease: 'linear',
      };
    }

    const deviceConfig = this.deviceCategory === 'low-end' ? deviceAnimations.lowEnd : 
                     this.deviceCategory === 'high-end' ? deviceAnimations.highEnd : 
                     deviceAnimations.midRange;
    const responsiveConfig = responsiveAnimations[this.currentBreakpoint as keyof ResponsiveAnimation];

    return {
      duration: Math.min(deviceConfig.duration, responsiveConfig.duration),
      delay: deviceConfig.delay + responsiveConfig.delay,
      ease: deviceConfig.ease,
    };
  }

  // Get transition based on device and breakpoint
  public getTransition(): Transition {
    const config = this.getAnimationConfig();
    return {
      duration: config.duration,
      delay: config.delay,
      ease: config.ease as any,
    };
  }

  // Get optimized variants
  public getVariants(baseVariants: MotionVariants): MotionVariants {
    const config = this.getAnimationConfig();
    const transition = this.getTransition();

    return {
      initial: baseVariants.initial,
      animate: {
        ...baseVariants.animate,
        transition,
      },
      exit: {
        ...baseVariants.exit,
        transition,
      },
      hover: baseVariants.hover,
      tap: baseVariants.tap,
      focus: baseVariants.focus,
      whileInView: baseVariants.whileInView,
      whileHover: baseVariants.whileHover,
      whileTap: baseVariants.whileTap,
      whileFocus: baseVariants.whileFocus,
    };
  }

  // Check if animations should be enabled
  public shouldAnimate(): boolean {
    return !this.reducedMotion;
  }

  // Get device category
  public getDeviceCategory(): string {
    return this.deviceCategory;
  }

  // Get current breakpoint
  public getCurrentBreakpoint(): string {
    return this.currentBreakpoint;
  }

  // Update device category (for testing)
  public setDeviceCategory(category: 'low-end' | 'mid-range' | 'high-end'): void {
    this.deviceCategory = category;
  }

  // Update breakpoint (for testing)
  public setCurrentBreakpoint(breakpoint: string): void {
    this.currentBreakpoint = breakpoint;
  }
}

// Custom hooks for animations
export const useAnimationManager = () => {
  const [manager] = useState(() => new AnimationManager());
  return manager;
};

export const useInViewAnimation = (
  ref: React.RefObject<HTMLElement | null>,
  variants: MotionVariants,
  threshold: number = 0.1
) => {
  const [isInView, setIsInView] = useState(false);
  const manager = useAnimationManager();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return {
    isInView,
    variants: manager.getVariants(variants),
    shouldAnimate: manager.shouldAnimate(),
  };
};

export const useScrollAnimation = (
  variants: MotionVariants,
  options: { threshold?: number; rootMargin?: string } = {}
) => {
  const ref = useRef<HTMLElement>(null);
  const { isInView, variants: optimizedVariants, shouldAnimate } = useInViewAnimation(ref, variants, options.threshold);

  return {
    ref,
    initial: shouldAnimate ? optimizedVariants.initial : undefined,
    animate: shouldAnimate && isInView ? optimizedVariants.animate : undefined,
    exit: shouldAnimate ? optimizedVariants.exit : undefined,
    whileInView: shouldAnimate ? optimizedVariants.whileInView : undefined,
  };
};

export const useStaggerAnimation = (
  itemCount: number,
  baseVariants: MotionVariants,
  staggerDelay: number = 0.1
) => {
  const manager = useAnimationManager();
  const variants = manager.getVariants(baseVariants);

  const staggerVariants: Variants = {
    initial: variants.initial,
    animate: {
      ...variants.animate,
      transition: {
        ...variants.animate?.transition,
        staggerChildren: staggerDelay,
      },
    },
    exit: variants.exit,
  };

  const itemVariants: Variants = {
    initial: variants.initial,
    animate: variants.animate,
    exit: variants.exit,
  };

  return {
    containerVariants: staggerVariants,
    itemVariants,
    shouldAnimate: manager.shouldAnimate(),
  };
};

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Utility functions
export const createOptimizedAnimation = (
  baseVariants: MotionVariants,
  customConfig?: Partial<AnimationConfig>
): MotionVariants => {
  const manager = new AnimationManager();
  const config = customConfig ? { ...manager.getAnimationConfig(), ...customConfig } : manager.getAnimationConfig();
  
  return manager.getVariants(baseVariants);
};

export const getDeviceOptimizedTransition = (deviceCategory?: 'low-end' | 'mid-range' | 'high-end'): Transition => {
  const manager = new AnimationManager();
  if (deviceCategory) {
    manager.setDeviceCategory(deviceCategory);
  }
  return manager.getTransition();
};

export const createResponsiveAnimation = (
  animations: Partial<ResponsiveAnimation>
): ((breakpoint: string) => AnimationConfig) => {
  return (breakpoint: string) => {
    const defaultConfig = responsiveAnimations[breakpoint as keyof ResponsiveAnimation];
    const customConfig = animations[breakpoint as keyof ResponsiveAnimation];
    return customConfig ? { ...defaultConfig, ...customConfig } : defaultConfig;
  };
};

// Animation components
export const AnimatedContainer = motion.div;
export const AnimatedSection = motion.section;
export const AnimatedArticle = motion.article;
export const AnimatedHeader = motion.header;
export const AnimatedFooter = motion.footer;
export const AnimatedNav = motion.nav;
export const AnimatedMain = motion.main;
export const AnimatedAside = motion.aside;

// Text animations
export const AnimatedHeading = motion.h1;
export const AnimatedSubheading = motion.h2;
export const AnimatedTitle = motion.h3;
export const AnimatedParagraph = motion.p;
export const AnimatedSpan = motion.span;
export const AnimatedText = motion.p;

// List animations
export const AnimatedList = motion.ul;
export const AnimatedListItem = motion.li;
export const AnimatedOrderedList = motion.ol;

// Form animations
export const AnimatedForm = motion.form;
export const AnimatedInput = motion.input;
export const AnimatedButton = motion.button;
export const AnimatedSelect = motion.select;
export const AnimatedTextarea = motion.textarea;
export const AnimatedLabel = motion.label;

// Media animations
export const AnimatedImage = motion.img;
export const AnimatedVideo = motion.video;
export const AnimatedFigure = motion.figure;
export const AnimatedFigcaption = motion.figcaption;

// Layout animations
export const AnimatedDiv = motion.div;
export const AnimatedFlex = motion.div;
export const AnimatedGrid = motion.div;
export const AnimatedCard = motion.div;
export const AnimatedModal = motion.div;

// Default instance
export const defaultAnimationManager = new AnimationManager();

export default {
  // Presets
  animationPresets,
  transitionPresets,
  deviceAnimations,
  responsiveAnimations,
  
  // Classes
  AnimationManager,
  
  // Hooks
  useAnimationManager,
  useInViewAnimation,
  useScrollAnimation,
  useStaggerAnimation,
  useReducedMotion,
  
  // Utilities
  createOptimizedAnimation,
  getDeviceOptimizedTransition,
  createResponsiveAnimation,
  
  // Components
  AnimatedContainer,
  AnimatedSection,
  AnimatedArticle,
  AnimatedHeader,
  AnimatedFooter,
  AnimatedNav,
  AnimatedMain,
  AnimatedAside,
  AnimatedHeading,
  AnimatedSubheading,
  AnimatedTitle,
  AnimatedParagraph,
  AnimatedSpan,
  AnimatedText,
  AnimatedList,
  AnimatedListItem,
  AnimatedOrderedList,
  AnimatedForm,
  AnimatedInput,
  AnimatedButton,
  AnimatedSelect,
  AnimatedTextarea,
  AnimatedLabel,
  AnimatedImage,
  AnimatedVideo,
  AnimatedFigure,
  AnimatedFigcaption,
  AnimatedDiv,
  AnimatedFlex,
  AnimatedGrid,
  AnimatedCard,
  AnimatedModal,
  
  // Default instance
  defaultAnimationManager,
};
