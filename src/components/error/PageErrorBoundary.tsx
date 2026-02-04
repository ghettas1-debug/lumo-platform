'use client';

import React from 'react';
import { EnhancedErrorBoundary } from './EnhancedErrorBoundary';

// Page-specific error boundary with page context
interface PageErrorBoundaryProps {
  children: React.ReactNode;
  pageName: string;
  pagePath: string;
  fallback?: React.ReactNode;
}

export function PageErrorBoundary({ 
  children, 
  pageName, 
  pagePath, 
  fallback 
}: PageErrorBoundaryProps) {
  return (
    <EnhancedErrorBoundary
      fallback={fallback}
      enableLogging={true}
      enableReporting={process.env.NODE_ENV === 'production'}
      maxRetries={2}
      retryDelay={1000}
      customErrorClassifier={(error) => {
        // Page-specific error classification
        const message = error.message.toLowerCase();
        
        // 404 errors for pages
        if (message.includes('not found') || message.includes('404')) {
          return {
            severity: 'low' as any,
            category: 'not_found' as any
          };
        }
        
        // Navigation errors
        if (message.includes('navigation') || message.includes('route')) {
          return {
            severity: 'medium' as any,
            category: 'client' as any
          };
        }
        
        // Default classification
        return {
          severity: 'medium' as any,
          category: 'client' as any
        };
      }}
      onError={(error, errorInfo) => {
        // Log page-specific error
        console.error(`[PAGE ERROR] ${pageName} (${pagePath}):`, {
          error: error.message,
          severity: errorInfo.severity,
          category: errorInfo.category,
          timestamp: errorInfo.timestamp,
        });
      }}
    >
      {children}
    </EnhancedErrorBoundary>
  );
}

// HOC for pages
export function withPageErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  pageName: string,
  pagePath: string
) {
  const WrappedComponent = (props: P) => (
    <PageErrorBoundary pageName={pageName} pagePath={pagePath}>
      <Component {...props} />
    </PageErrorBoundary>
  );

  WrappedComponent.displayName = `withPageErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Default page error fallback
export function DefaultPageErrorFallback({ 
  pageName, 
  onRetry, 
  onGoHome 
}: { 
  pageName: string; 
  onRetry: () => void; 
  onGoHome: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          حدث خطأ في الصفحة
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          عذراً، حدث خطأ غير متوقع أثناء تحميل صفحة "{pageName}".
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>

          <button
            onClick={onGoHome}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
