'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ===== RESPONSIVE GRID COMPONENT =====

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  gap = { xs: 4, sm: 4, md: 6, lg: 6, xl: 8 },
  className,
}) => {
  const gridClasses = cn(
    'grid',
    columns.xs && `grid-cols-${columns.xs}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    columns['2xl'] && `2xl:grid-cols-${columns['2xl']}`,
    gap.xs && `gap-${gap.xs}`,
    gap.sm && `sm:gap-${gap.sm}`,
    gap.md && `md:gap-${gap.md}`,
    gap.lg && `lg:gap-${gap.lg}`,
    gap.xl && `xl:gap-${gap.xl}`,
    gap['2xl'] && `2xl:gap-${gap['2xl']}`,
    className
  );

  return <div className={gridClasses}>{children}</div>;
};

// ===== RESPONSIVE CONTAINER =====

interface ResponsiveContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  centerContent?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  size = 'lg',
  className,
  centerContent = true,
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const containerClasses = cn(
    'w-full px-4 sm:px-6 lg:px-8',
    sizeClasses[size],
    centerContent && 'mx-auto',
    className
  );

  return <div className={containerClasses}>{children}</div>;
};

// ===== RESPONSIVE STACK =====

interface ResponsiveStackProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal' | 'responsive';
  spacing?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
}

export const ResponsiveStack: React.FC<ResponsiveStackProps> = ({
  children,
  direction = 'vertical',
  spacing = 4,
  align = 'start',
  justify = 'start',
  wrap = false,
  className,
}) => {
  const baseClasses = 'flex';
  
  const directionClasses = {
    vertical: 'flex-col',
    horizontal: 'flex-row',
    responsive: 'flex-col sm:flex-row',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const stackClasses = cn(
    baseClasses,
    directionClasses[direction],
    alignClasses[align],
    justifyClasses[justify],
    wrap && 'flex-wrap',
    `gap-${spacing}`,
    className
  );

  return <div className={stackClasses}>{children}</div>;
};

// ===== RESPONSIVE CARD =====

interface ResponsiveCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hover?: boolean;
  clickable?: boolean;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  hover = false,
  clickable = false,
}) => {
  const variantClasses = {
    default: 'bg-white border border-gray-200 rounded-lg shadow-sm',
    elevated: 'bg-white border border-gray-200 rounded-xl shadow-lg',
    outlined: 'bg-white border-2 border-gray-300 rounded-xl',
    flat: 'bg-white rounded-xl',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const cardClasses = cn(
    variantClasses[variant],
    paddingClasses[padding],
    hover && 'hover:shadow-md transition-shadow duration-200',
    clickable && 'cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200',
    className
  );

  return <div className={cardClasses}>{children}</div>;
};

// ===== RESPONSIVE TEXT =====

interface ResponsiveTextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  size = 'base',
  weight = 'normal',
  color = 'text-gray-900',
  align = 'left',
  truncate = false,
  className,
}) => {
  const sizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl',
    '4xl': 'text-4xl sm:text-5xl',
    '5xl': 'text-5xl sm:text-6xl',
    '6xl': 'text-6xl sm:text-7xl',
  };

  const weightClasses = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const textClasses = cn(
    sizeClasses[size],
    weightClasses[weight],
    color,
    alignClasses[align],
    truncate && 'truncate',
    className
  );

  return <div className={textClasses}>{children}</div>;
};

// ===== RESPONSIVE IMAGE =====

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'custom';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  rounded?: boolean;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio = 'landscape',
  objectFit = 'cover',
  rounded = false,
  className,
}) => {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/9]',
    custom: '',
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  const imageClasses = cn(
    'w-full h-full',
    aspectRatioClasses[aspectRatio],
    objectFitClasses[objectFit],
    rounded && 'rounded-lg',
    className
  );

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={imageClasses}
    />
  );
};

// ===== RESPONSIVE BUTTON =====

interface ResponsiveButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  fullWidth?: boolean;
  fullWidthOnMobile?: boolean;
  className?: string;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  fullWidthOnMobile = false,
  className,
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    responsive: 'px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-lg',
  };

  const widthClasses = {
    full: fullWidth && 'w-full',
    mobile: fullWidthOnMobile && 'w-full sm:w-auto',
  };

  const buttonClasses = cn(
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    widthClasses.full,
    widthClasses.mobile,
    className
  );

  return <button className={buttonClasses}>{children}</button>;
};

// ===== RESPONSIVE BREAKPOINT HOOK =====

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('lg');

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('xs');
      else if (width < 768) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else if (width < 1280) setBreakpoint('lg');
      else if (width < 1536) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

// ===== RESPONSIVE VALUE HOOK =====

export const useResponsiveValue = <T,>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}): T => {
  const breakpoint = useBreakpoint();

  // Return the value for the current breakpoint or the nearest smaller one
  if (breakpoint === 'xs' && values.xs !== undefined) return values.xs;
  if (breakpoint === 'sm' && values.sm !== undefined) return values.sm;
  if (breakpoint === 'sm' && values.xs !== undefined) return values.xs;
  if (breakpoint === 'md' && values.md !== undefined) return values.md;
  if (breakpoint === 'md' && values.sm !== undefined) return values.sm;
  if (breakpoint === 'md' && values.xs !== undefined) return values.xs;
  if (breakpoint === 'lg' && values.lg !== undefined) return values.lg;
  if (breakpoint === 'lg' && values.md !== undefined) return values.md;
  if (breakpoint === 'lg' && values.sm !== undefined) return values.sm;
  if (breakpoint === 'lg' && values.xs !== undefined) return values.xs;
  if (breakpoint === 'xl' && values.xl !== undefined) return values.xl;
  if (breakpoint === 'xl' && values.lg !== undefined) return values.lg;
  if (breakpoint === 'xl' && values.md !== undefined) return values.md;
  if (breakpoint === 'xl' && values.sm !== undefined) return values.sm;
  if (breakpoint === 'xl' && values.xs !== undefined) return values.xs;
  if (breakpoint === '2xl' && values['2xl'] !== undefined) return values['2xl'];
  if (breakpoint === '2xl' && values.xl !== undefined) return values.xl;
  if (breakpoint === '2xl' && values.lg !== undefined) return values.lg;
  if (breakpoint === '2xl' && values.md !== undefined) return values.md;
  if (breakpoint === '2xl' && values.sm !== undefined) return values.sm;
  if (breakpoint === '2xl' && values.xs !== undefined) return values.xs;

  // Fallback to lg or first available value
  return values.lg || values.md || values.sm || values.xs || (values as any)[Object.keys(values)[0]] || values.lg!;
};
