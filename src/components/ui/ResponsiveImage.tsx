'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useBreakpoints } from '@/utils/breakpoints';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  crop?: string;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  optimize?: boolean;
}

interface ImageSource {
  srcSet: string;
  type?: string;
  sizes?: string;
  media?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  fill = false,
  className = '',
  sizes,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  lazy = true,
  aspectRatio,
  objectFit = 'cover',
  crop,
  format = 'webp',
  optimize = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const { currentBreakpoint } = useBreakpoints();
  const [imageSources, setImageSources] = useState<ImageSource[]>([]);

  // Generate responsive image sources
  useEffect(() => {
    const sources: ImageSource[] = [];
    
    if (optimize) {
      // Generate different sizes for different breakpoints
      const breakpoints = [320, 640, 768, 1024, 1280, 1536, 1920, 2560];
      
      breakpoints.forEach((bp) => {
        const optimizedSrc = generateOptimizedSrc(src, {
          width: bp,
          quality,
          format,
          crop,
        });
        
        const srcSet = `${optimizedSrc} ${bp}w`;
        
        // Add media query for responsive loading
        let media = '';
        if (bp === 320) media = '(max-width: 479px)';
        else if (bp === 640) media = '(min-width: 480px) and (max-width: 767px)';
        else if (bp === 768) media = '(min-width: 768px) and (max-width: 1023px)';
        else if (bp === 1024) media = '(min-width: 1024px) and (max-width: 1279px)';
        else if (bp === 1280) media = '(min-width: 1280px) and (max-width: 1535px)';
        else if (bp === 1536) media = '(min-width: 1536px) and (max-width: 1919px)';
        else if (bp === 1920) media = '(min-width: 1920px) and (max-width: 2559px)';
        else if (bp === 2560) media = '(min-width: 2560px)';
        
        sources.push({
          srcSet,
          media,
          type: `image/${format}`,
        });
      });
      
      // Add fallback formats
      if (format === 'webp') {
        sources.push({
          srcSet: generateOptimizedSrc(src, { width: 1024, quality, format: 'jpg', crop }),
          type: 'image/jpeg',
        });
      }
    }
    
    setImageSources(sources);
  }, [src, quality, format, crop, optimize]);

  // Generate optimized image URL
  const generateOptimizedSrc = (
    originalSrc: string,
    options: {
      width?: number;
      quality?: number;
      format?: string;
      crop?: string;
    }
  ): string => {
    if (!optimize) return originalSrc;
    
    const params = new URLSearchParams();
    
    if (options.width) params.append('w', options.width.toString());
    if (options.quality) params.append('q', options.quality.toString());
    if (options.format && options.format !== 'jpg') params.append('f', options.format);
    if (options.crop) params.append('c', options.crop);
    
    const paramString = params.toString();
    return paramString ? `${originalSrc}?${paramString}` : originalSrc;
  };

  // Generate sizes attribute
  const generateSizes = (): string => {
    if (sizes) return sizes;
    
    return `
      (max-width: 479px) 100vw,
      (max-width: 767px) 100vw,
      (max-width: 1023px) 100vw,
      (max-width: 1279px) 100vw,
      (max-width: 1535px) 100vw,
      (max-width: 1919px) 100vw,
      (max-width: 2559px) 100vw,
      2560px
    `.trim().replace(/\s+/g, ' ');
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  // Generate placeholder
  const renderPlaceholder = () => {
    if (placeholder === 'blur' && blurDataURL) {
      return (
        <img
          src={blurDataURL}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      );
    }
    
    return (
      <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
    );
  };

  // Generate responsive styles
  const containerStyle: React.CSSProperties = {};
  const imageStyle: React.CSSProperties = {};

  if (fill) {
    containerStyle.position = 'relative';
    containerStyle.width = '100%';
    containerStyle.height = '100%';
    imageStyle.position = 'absolute';
    imageStyle.top = 0;
    imageStyle.left = 0;
    imageStyle.width = '100%';
    imageStyle.height = '100%';
  } else {
    if (width) containerStyle.width = width;
    if (height) containerStyle.height = height;
    if (aspectRatio) containerStyle.aspectRatio = aspectRatio;
  }

  imageStyle.objectFit = objectFit;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      {/* Placeholder */}
      {!isLoaded && renderPlaceholder()}
      
      {/* Picture element for responsive images */}
      <picture>
        {/* Source elements for different formats and sizes */}
        {imageSources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            type={source.type}
            media={source.media}
            sizes={source.sizes}
          />
        ))}
        
        {/* Fallback img element */}
        <img
          ref={imgRef}
          src={currentSrc || generateOptimizedSrc(src, { width: 1024, quality, format: 'jpg', crop })}
          alt={alt}
          sizes={generateSizes()}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={imageStyle}
        />
      </picture>
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !isError && priority && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

// Responsive Typography Component
interface ResponsiveTypographyProps {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'small';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  decoration?: 'none' | 'underline' | 'overline' | 'line-through';
  spacing?: 'tight' | 'normal' | 'wide';
  truncate?: boolean;
  gradient?: string;
  className?: string;
  responsive?: boolean;
}

export const ResponsiveTypography: React.FC<ResponsiveTypographyProps> = ({
  children,
  variant,
  size,
  weight = 'normal',
  color = 'inherit',
  align = 'left',
  transform = 'none',
  decoration = 'none',
  spacing = 'normal',
  truncate = false,
  gradient,
  className = '',
  responsive = true,
}) => {
  const { currentBreakpoint } = useBreakpoints();

  // Get responsive size based on breakpoint
  const getResponsiveSize = () => {
    if (!responsive || !size) return '';

    const sizeMap: Record<string, Record<string, string>> = {
      xs: { xs: 'text-xs', sm: 'text-xs', md: 'text-sm', lg: 'text-sm', xl: 'text-sm' },
      sm: { xs: 'text-sm', sm: 'text-sm', md: 'text-base', lg: 'text-base', xl: 'text-base' },
      base: { xs: 'text-base', sm: 'text-base', md: 'text-lg', lg: 'text-lg', xl: 'text-lg' },
      lg: { xs: 'text-lg', sm: 'text-lg', md: 'text-xl', lg: 'text-xl', xl: 'text-2xl' },
      xl: { xs: 'text-xl', sm: 'text-xl', md: 'text-2xl', lg: 'text-2xl', xl: 'text-3xl' },
      '2xl': { xs: 'text-2xl', sm: 'text-2xl', md: 'text-3xl', lg: 'text-3xl', xl: 'text-4xl' },
      '3xl': { xs: 'text-3xl', sm: 'text-3xl', md: 'text-4xl', lg: 'text-4xl', xl: 'text-5xl' },
      '4xl': { xs: 'text-4xl', sm: 'text-4xl', md: 'text-5xl', lg: 'text-5xl', xl: 'text-6xl' },
      '5xl': { xs: 'text-5xl', sm: 'text-5xl', md: 'text-6xl', lg: 'text-6xl', xl: 'text-7xl' },
      '6xl': { xs: 'text-6xl', sm: 'text-6xl', md: 'text-7xl', lg: 'text-7xl', xl: 'text-8xl' },
      '7xl': { xs: 'text-7xl', sm: 'text-7xl', md: 'text-8xl', lg: 'text-8xl', xl: 'text-9xl' },
      '8xl': { xs: 'text-8xl', sm: 'text-8xl', md: 'text-9xl', lg: 'text-9xl', xl: 'text-9xl' },
      '9xl': { xs: 'text-9xl', sm: 'text-9xl', md: 'text-9xl', lg: 'text-9xl', xl: 'text-9xl' },
    };

    return sizeMap[size]?.[currentBreakpoint] || `text-${size}`;
  };

  // Get weight classes
  const getWeightClass = () => {
    const weightMap: Record<string, string> = {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    };

    return weightMap[weight] || 'font-normal';
  };

  // Get alignment classes
  const getAlignClass = () => {
    const alignMap: Record<string, string> = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    };

    return alignMap[align] || 'text-left';
  };

  // Get spacing classes
  const getSpacingClass = () => {
    const spacingMap: Record<string, string> = {
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
    };

    return spacingMap[spacing] || 'tracking-normal';
  };

  // Generate gradient style
  const gradientStyle = gradient
    ? {
        backgroundImage: `linear-gradient(135deg, ${gradient})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : {};

  const classes = [
    getResponsiveSize(),
    getWeightClass(),
    getAlignClass(),
    getSpacingClass(),
    truncate ? 'truncate' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    color: gradient ? 'transparent' : color,
    textTransform: transform,
    textDecoration: decoration,
    ...gradientStyle,
  };

  const Component = variant;

  return (
    <Component className={classes} style={style}>
      {children}
    </Component>
  );
};

// Responsive Layout Component
interface ResponsiveLayoutProps {
  children: React.ReactNode;
  type?: 'container' | 'grid' | 'flex' | 'stack';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  columns?: ResponsiveValue<number>;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  className?: string;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  type = 'container',
  maxWidth = 'full',
  padding = 'md',
  gap = 'md',
  columns,
  align = 'stretch',
  justify = 'start',
  direction = 'row',
  wrap = 'wrap',
  className = '',
}) => {
  const { currentBreakpoint, getResponsiveValue } = useBreakpoints();

  // Get container classes
  const getContainerClasses = () => {
    const maxWidthMap: Record<string, string> = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      full: 'max-w-full',
      none: '',
    };

    const paddingMap: Record<string, string> = {
      none: 'p-0',
      sm: 'p-2 sm:p-4',
      md: 'p-4 sm:p-6',
      lg: 'p-6 sm:p-8',
      xl: 'p-8 sm:p-12',
    };

    return [
      'mx-auto',
      maxWidthMap[maxWidth],
      paddingMap[padding],
      className,
    ].filter(Boolean).join(' ');
  };

  // Get grid classes
  const getGridClasses = () => {
    const gridCols = getResponsiveValue(columns || { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 });
    const gapMap: Record<string, string> = {
      none: 'gap-0',
      sm: 'gap-2 sm:gap-3',
      md: 'gap-4 sm:gap-6',
      lg: 'gap-6 sm:gap-8',
      xl: 'gap-8 sm:gap-12',
    };

    return [
      'grid',
      `grid-cols-${gridCols || 1}`,
      gapMap[gap],
      className,
    ].filter(Boolean).join(' ');
  };

  // Get flex classes
  const getFlexClasses = () => {
    const directionMap: Record<string, string> = {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    };

    const alignMap: Record<string, string> = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };

    const justifyMap: Record<string, string> = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const wrapMap: Record<string, string> = {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    };

    const gapMap: Record<string, string> = {
      none: 'gap-0',
      sm: 'gap-2 sm:gap-3',
      md: 'gap-4 sm:gap-6',
      lg: 'gap-6 sm:gap-8',
      xl: 'gap-8 sm:gap-12',
    };

    return [
      'flex',
      directionMap[direction],
      alignMap[align],
      justifyMap[justify],
      wrapMap[wrap],
      gapMap[gap],
      className,
    ].filter(Boolean).join(' ');
  };

  // Get stack classes
  const getStackClasses = () => {
    const gapMap: Record<string, string> = {
      none: 'space-y-0',
      sm: 'space-y-2 sm:space-y-3',
      md: 'space-y-4 sm:space-y-6',
      lg: 'space-y-6 sm:space-y-8',
      xl: 'space-y-8 sm:space-y-12',
    };

    return [
      'flex flex-col',
      gapMap[gap],
      className,
    ].filter(Boolean).join(' ');
  };

  // Get appropriate classes based on type
  const getClasses = () => {
    switch (type) {
      case 'container':
        return getContainerClasses();
      case 'grid':
        return getGridClasses();
      case 'flex':
        return getFlexClasses();
      case 'stack':
        return getStackClasses();
      default:
        return getContainerClasses();
    }
  };

  return (
    <div className={getClasses()}>
      {children}
    </div>
  );
};

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  size = 'lg',
  centered = true,
  className = '',
}) => {
  const sizeMap: Record<string, string> = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-8xl',
    full: 'max-w-full',
  };

  const classes = [
    centered ? 'mx-auto' : '',
    sizeMap[size],
    'px-4 sm:px-6 lg:px-8',
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: ResponsiveValue<number>;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
  gap = 'md',
  className = '',
}) => {
  const { getResponsiveValue } = useBreakpoints();
  const currentCols = getResponsiveValue(cols) || 1;

  const gapMap: Record<string, string> = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  };

  const classes = [
    'grid',
    `grid-cols-${currentCols}`,
    gapMap[gap],
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};

// Responsive Flex Component
interface ResponsiveFlexProps {
  children: React.ReactNode;
  direction?: ResponsiveValue<'row' | 'col'>;
  align?: ResponsiveValue<'start' | 'center' | 'end' | 'stretch'>;
  justify?: ResponsiveValue<'start' | 'center' | 'end' | 'between' | 'around'>;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  className?: string;
}

export const ResponsiveFlex: React.FC<ResponsiveFlexProps> = ({
  children,
  direction = { xs: 'col', sm: 'row' },
  align = 'center',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className = '',
}) => {
  const { getResponsiveValue } = useBreakpoints();
  const currentDirection = getResponsiveValue(direction) || 'row';
  const currentAlign = getResponsiveValue(align) || 'center';
  const currentJustify = getResponsiveValue(justify) || 'start';

  const directionMap: Record<string, string> = {
    row: 'flex-row',
    col: 'flex-col',
  };

  const alignMap: Record<string, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyMap: Record<string, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };

  const gapMap: Record<string, string> = {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  };

  const classes = [
    'flex',
    directionMap[currentDirection],
    alignMap[currentAlign],
    justifyMap[currentJustify],
    wrap ? 'flex-wrap' : 'flex-nowrap',
    gapMap[gap],
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
};

export default {
  ResponsiveImage,
  ResponsiveTypography,
  ResponsiveLayout,
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveFlex,
};
