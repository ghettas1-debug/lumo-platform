'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Loader, AlertCircle, CheckCircle } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
}

interface ImageState {
  isLoading: boolean;
  isError: boolean;
  isLoaded: boolean;
  currentSrc: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  quality = 75,
  format = 'auto'
}: OptimizedImageProps) {
  const [imageState, setImageState] = useState<ImageState>({
    isLoading: true,
    isError: false,
    isLoaded: false,
    currentSrc: src
  });
  
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized image URL
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc) return '';
    
    // For local images, return as-is
    if (originalSrc.startsWith('/')) {
      return originalSrc;
    }
    
    // For external images, add optimization parameters
    const url = new URL(originalSrc);
    
    // Add quality parameter
    url.searchParams.set('quality', quality.toString());
    
    // Add format parameter
    if (format !== 'auto') {
      url.searchParams.set('format', format);
    }
    
    return url.toString();
  };

  // Generate placeholder
  const generatePlaceholder = () => {
    if (placeholder === 'blur') {
      return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='b'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='20' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23b)' fill='%23f3f4f6' /%3E%3C/svg%3E`;
    }
    return '';
  };

  // Handle image load
  const handleLoad = () => {
    setImageState(prev => ({
      ...prev,
      isLoading: false,
      isLoaded: true,
      isError: false
    }));
  };

  // Handle image error
  const handleError = () => {
    setImageState(prev => ({
      ...prev,
      isLoading: false,
      isLoaded: false,
      isError: true
    }));
  };

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (!imgRef.current || priority) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const optimizedSrc = getOptimizedSrc(src);
          setImageState(prev => ({ ...prev, currentSrc: optimizedSrc }));
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, priority]);

  // Set up image source for priority images
  useEffect(() => {
    if (priority && imgRef.current) {
      const optimizedSrc = getOptimizedSrc(src);
      setImageState(prev => ({ ...prev, currentSrc: optimizedSrc }));
    }
  }, [src, priority]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Loading State */}
      {imageState.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {imageState.isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">Failed to load image</span>
        </div>
      )}

      {/* Loaded State */}
      {imageState.isLoaded && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={imageState.currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageState.isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          filter: imageState.isLoading ? 'blur(20px)' : 'none',
          transition: 'filter 0.3s ease-in-out'
        }}
      />

      {/* Placeholder */}
      {placeholder === 'blur' && imageState.isLoading && (
        <img
          src={generatePlaceholder()}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// Hook for batch image optimization
export function useImageOptimizer() {
  const [optimizedImages, setOptimizedImages] = useState<Map<string, string>>(new Map());

  const optimizeImage = (src: string, options: {
    quality?: number;
    format?: string;
    width?: number;
    height?: number;
  } = {}) => {
    const cacheKey = `${src}-${JSON.stringify(options)}`;
    
    if (optimizedImages.has(cacheKey)) {
      return optimizedImages.get(cacheKey)!;
    }

    const optimizedSrc = getOptimizedSrc(src, options);
    setOptimizedImages(prev => new Map(prev).set(cacheKey, optimizedSrc));
    
    return optimizedSrc;
  };

  const preloadImage = (src: string) => {
    const img = new Image();
    img.src = getOptimizedSrc(src);
    return new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  return { optimizeImage, preloadImage };
}

// Helper function to get optimized src
function getOptimizedSrc(src: string, options: {
  quality?: number;
  format?: string;
  width?: number;
  height?: number;
} = {}) {
  if (!src || src.startsWith('/')) {
    return src;
  }

  const url = new URL(src, window.location.origin);
  
  if (options.quality) {
    url.searchParams.set('quality', options.quality.toString());
  }
  
  if (options.format && options.format !== 'auto') {
    url.searchParams.set('format', options.format);
  }
  
  if (options.width) {
    url.searchParams.set('width', options.width.toString());
  }
  
  if (options.height) {
    url.searchParams.set('height', options.height.toString());
  }

  return url.toString();
}
