'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff, Database, Clock, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Fallback component types
export interface FallbackProps {
  error?: Error;
  resetError?: () => void;
  component?: string;
  action?: string;
  customMessage?: string;
  showRetry?: boolean;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  onRetry?: () => void;
  onHome?: () => void;
  onBack?: () => void;
}

// Generic Error Fallback
export function ErrorFallback({
  error,
  resetError,
  component = 'Unknown',
  action = 'rendering',
  customMessage,
  showRetry = true,
  showHomeButton = true,
  showBackButton = false,
  onRetry,
  onHome,
  onBack,
}: FallbackProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (resetError) {
      resetError();
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.href = '/';
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          حدث خطأ غير متوقع
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {customMessage || `حدث خطأ أثناء ${action} المكون "${component}". نعتذر عن هذا الإزعاج.`}
        </p>

        {error && process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-right">
            <p className="text-red-800 dark:text-red-200 font-mono text-sm mb-2">
              {error.message}
            </p>
            {error.stack && (
              <details className="text-left">
                <summary className="cursor-pointer text-red-700 dark:text-red-300 hover:text-red-600 dark:hover:text-red-400">
                  Stack Trace
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto max-h-32">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && (
            <Button onClick={handleRetry} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              إعادة المحاولة
            </Button>
          )}

          {showHomeButton && (
            <Button variant="outline" onClick={handleHome} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              الرئيسية
            </Button>
          )}

          {showBackButton && (
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              رجوع
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

// Network Error Fallback
export function NetworkErrorFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
            <WifiOff className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          مشكلة في الاتصال
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          يبدو أنك غير متصل بالإنترنت. يرجى التحقق من اتصالك والمحاولة مرة أخرى.
        </p>

        <div className="space-y-3">
          <Button onClick={onRetry} className="w-full flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            إعادة المحاولة
          </Button>

          <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
            تحديث الصفحة
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Loading Error Fallback
export function LoadingErrorFallback({ component }: { component?: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <Card className="p-6 text-center max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
            <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          مهلة التحميل طويلة
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {component ? `المكون "${component}" يستغرق وقتاً أطول من المتوقع.` : 'يستغرق التحميل وقتاً أطول من المتوقع.'}
        </p>
      </Card>
    </div>
  );
}

// Data Error Fallback
export function DataErrorFallback({ 
  onRetry, 
  entity = 'البيانات' 
}: { 
  onRetry?: () => void; 
  entity?: string; 
}) {
  return (
    <div className="flex items-center justify-center p-8">
      <Card className="p-6 text-center max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          خطأ في تحميل {entity}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          لم نتمكن من تحميل {entity}. يرجى المحاولة مرة أخرى.
        </p>

        {onRetry && (
          <Button onClick={onRetry} size="sm" className="w-full">
            إعادة المحاولة
          </Button>
        )}
      </Card>
    </div>
  );
}

// Minimal Error Fallback (for inline components)
export function MinimalErrorFallback({ 
  message, 
  onRetry 
}: { 
  message?: string; 
  onRetry?: () => void; 
}) {
  return (
    <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-red-800 dark:text-red-200 text-sm">
            {message || 'حدث خطأ في تحميل هذا المكون.'}
          </p>
        </div>
        {onRetry && (
          <Button 
            onClick={onRetry} 
            size="sm" 
            variant="outline"
            className="flex-shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// Placeholder Fallback
export function PlaceholderFallback({ 
  title = 'مكون غير متاحر', 
  description 
}: { 
  title?: string; 
  description?: string; 
}) {
  return (
    <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <div className="text-center">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-xl">?</span>
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

// Skeleton Loading Fallback
export function SkeletonFallback({ 
  lines = 3, 
  height = 'h-4' 
}: { 
  lines?: number; 
  height?: string; 
}) {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
          style={{ 
            width: index === lines - 1 ? '60%' : '100%',
            animationDelay: `${index * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

// Card Skeleton Fallback
export function CardSkeletonFallback() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
        </div>
      </div>
    </Card>
  );
}

// List Skeleton Fallback
export function ListSkeletonFallback({ 
  items = 5 
}: { 
  items?: number; 
}) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

// HOC for wrapping components with fallback
export function withFallback<P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ComponentType<FallbackProps> = ErrorFallback
) {
  return function FallbackWrapper(props: P) {
    return <Component {...props} />;
  };
}

// Error Boundary with custom fallback
export function FallbackBoundary({ 
  children, 
  fallback: FallbackComponent = ErrorFallback,
  ...fallbackProps 
}: { 
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
} & Partial<FallbackProps>) {
  return (
    <React.Suspense fallback={<fallback {...fallbackProps} />}>
      {children}
    </React.Suspense>
  );
}

// Export all fallback components
export const FallbackComponents = {
  ErrorFallback,
  NetworkErrorFallback,
  LoadingErrorFallback,
  DataErrorFallback,
  MinimalErrorFallback,
  PlaceholderFallback,
  SkeletonFallback,
  CardSkeletonFallback,
  ListSkeletonFallback,
};

export default FallbackComponents;
