// Optimized image utilities for better performance
import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';

// Image optimization constants
export const IMAGE_CONFIG = {
  domains: ['localhost', 'example.com'], // Add your image domains here
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
} as const;

// Image quality presets
export const IMAGE_QUALITY = {
  thumbnail: 30,
  low: 50,
  medium: 70,
  high: 85,
  ultra: 95,
} as const;

// Common image sizes
export const IMAGE_SIZES = {
  avatar: { width: 64, height: 64 },
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
  banner: { width: 2400, height: 600 },
} as const;

// Responsive image sizes
export const RESPONSIVE_SIZES = {
  courseCard: {
    sm: { width: 300, height: 200 },
    md: { width: 400, height: 267 },
    lg: { width: 500, height: 333 },
  },
  hero: {
    sm: { width: 640, height: 360 },
    md: { width: 768, height: 432 },
    lg: { width: 1024, height: 576 },
    xl: { width: 1280, height: 720 },
    '2xl': { width: 1536, height: 864 },
  },
  profile: {
    sm: { width: 80, height: 80 },
    md: { width: 120, height: 120 },
    lg: { width: 160, height: 160 },
  },
} as const;

// Image loading strategies
export type LoadingStrategy = 'lazy' | 'eager' | 'auto';

// Image priority levels
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

// Optimized image component props
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  loading?: LoadingStrategy;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

// Memoized image component
export const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes,
  quality = IMAGE_QUALITY.medium,
  priority = false,
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
  className,
  onLoad,
  onError,
  fallbackSrc,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : src;

  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 ${className}`}
        style={{ width, height }}
      >
        <svg
          className="w-8 h-8 text-gray-400"
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
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Responsive image component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes: keyof typeof RESPONSIVE_SIZES;
  className?: string;
  priority?: PriorityLevel;
  quality?: number;
}

export const ResponsiveImage = React.memo(function ResponsiveImage({
  src,
  alt,
  sizes,
  className,
  priority = 'medium',
  quality = IMAGE_QUALITY.medium,
}: ResponsiveImageProps) {
  const responsiveConfig = RESPONSIVE_SIZES[sizes];
  
  const imageSizes = useMemo(() => {
    const config = responsiveConfig;
    return Object.entries(config)
      .map(([breakpoint, dimensions]) => {
        const maxWidth = dimensions.width;
        return `(max-width: ${breakpoint === 'sm' ? '640px' : breakpoint === 'md' ? '768px' : breakpoint === 'lg' ? '1024px' : breakpoint === 'xl' ? '1280px' : '1536px'}) ${maxWidth}px`
      })
      .join(', ');
  }, [responsiveConfig]);

  const largestSize = useMemo(() => {
    const config = responsiveConfig;
    const sizes = Object.values(config);
    return sizes[sizes.length - 1];
  }, [responsiveConfig]);

  const isPriority = priority === 'critical' || priority === 'high';

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={largestSize.width}
      height={largestSize.height}
      sizes={imageSizes}
      quality={quality}
      priority={isPriority}
      className={className}
    />
  );
});

ResponsiveImage.displayName = 'ResponsiveImage';

// Image gallery component with lazy loading
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  className?: string;
  imageClassName?: string;
  loadingStrategy?: LoadingStrategy;
}

export const ImageGallery = React.memo(function ImageGallery({
  images,
  className,
  imageClassName,
  loadingStrategy = 'lazy',
}: ImageGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {images.map((image, index) => (
        <div key={index} className="relative aspect-video">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            width={image.width || 400}
            height={image.height || 300}
            className={`w-full h-full object-cover ${imageClassName}`}
            loading={loadingStrategy}
            onLoad={() => handleImageLoad(index)}
          />
          {loadedImages.has(index) && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              Loaded
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

ImageGallery.displayName = 'ImageGallery';

// Progressive image loading component
interface ProgressiveImageProps {
  src: string;
  alt: string;
  placeholderSrc?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ProgressiveImage = React.memo(function ProgressiveImage({
  src,
  alt,
  placeholderSrc,
  width,
  height,
  className,
}: ProgressiveImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholderSrc || src);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    if (imageSrc === placeholderSrc) {
      setImageSrc(src);
      setIsLoading(false);
    }
  }, [imageSrc, placeholderSrc, src]);

  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-all duration-500 ${isLoading ? 'filter blur-sm' : ''}`}
        onLoad={handleLoad}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
    </div>
  );
});

ProgressiveImage.displayName = 'ProgressiveImage';

// Image optimization utilities
export const generateBlurDataURL = (width: number, height: number): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, width, height);
    
    // Add a simple pattern
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
  }
  
  return canvas.toDataURL();
};

export const getOptimalImageSize = (
  containerWidth: number,
  containerHeight: number,
  aspectRatio: number = 16 / 9
): { width: number; height: number } => {
  const containerAspectRatio = containerWidth / containerHeight;
  
  if (containerAspectRatio > aspectRatio) {
    return {
      width: Math.floor(containerHeight * aspectRatio),
      height: containerHeight,
    };
  } else {
    return {
      width: containerWidth,
      height: Math.floor(containerWidth / aspectRatio),
    };
  }
};

export const getResponsiveSrcSet = (
  baseUrl: string,
  sizes: Array<{ width: number; height: number }>
): string => {
  return sizes
    .map(size => `${baseUrl}?w=${size.width}&h=${size.height} ${size.width}w`)
    .join(', ');
};

// Image CDN utilities
export const getCdnUrl = (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png';
    crop?: boolean;
  } = {}
): string => {
  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('f', options.format);
  if (options.crop) params.set('c', '1');
  
  const paramString = params.toString();
  return paramString ? `${src}?${paramString}` : src;
};

// Image preloading utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

// Batch image preloading
export const preloadImages = async (srcs: string[]): Promise<void[]> => {
  const promises = srcs.map(src => preloadImage(src));
  return Promise.allSettled(promises).then(results => 
    results.map(result => 
      result.status === 'fulfilled' ? undefined : Promise.reject(result.reason)
    )
  );
};

// Image compression utility (client-side simulation)
export const simulateImageCompression = (
  file: File,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            }
          },
          'image/jpeg',
          quality
        );
      }
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Image format detection
export const getImageFormat = (file: File): string => {
  return file.type.split('/')[1] || 'unknown';
};

// Image validation
export const validateImage = (file: File): { isValid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!validTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid image format' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Image size too large' };
  }
  
  return { isValid: true };
};

// Export all utilities
export {
  OptimizedImage,
  ResponsiveImage,
  ImageGallery,
  ProgressiveImage,
  IMAGE_CONFIG,
  IMAGE_QUALITY,
  IMAGE_SIZES,
  RESPONSIVE_SIZES,
};
