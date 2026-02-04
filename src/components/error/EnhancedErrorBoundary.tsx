'use client';

import React, { Component, ErrorInfo as ReactErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Error types
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ErrorCategory {
  NETWORK = 'network',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  SERVER = 'server',
  CLIENT = 'client',
  UNKNOWN = 'unknown'
}

// Error information interface
export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  additionalData?: Record<string, unknown>;
}

// Error Boundary Props
interface EnhancedErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  enableLogging?: boolean;
  enableReporting?: boolean;
  customErrorClassifier?: (error: Error) => { severity: ErrorSeverity; category: ErrorCategory };
}

// Error Boundary State
interface EnhancedErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
  isRetrying: boolean;
  showErrorDetails: boolean;
}

// Error classifier utility
function classifyError(error: Error): { severity: ErrorSeverity; category: ErrorCategory } {
  const message = error.message.toLowerCase();
  const stack = error.stack?.toLowerCase() || '';

  // Network errors
  if (message.includes('network') || message.includes('fetch') || message.includes('axios')) {
    return { severity: ErrorSeverity.MEDIUM, category: ErrorCategory.NETWORK };
  }

  // Authentication errors
  if (message.includes('unauthorized') || message.includes('401') || message.includes('authentication')) {
    return { severity: ErrorSeverity.HIGH, category: ErrorCategory.AUTHENTICATION };
  }

  // Authorization errors
  if (message.includes('forbidden') || message.includes('403') || message.includes('permission')) {
    return { severity: ErrorSeverity.HIGH, category: ErrorCategory.AUTHORIZATION };
  }

  // Not found errors
  if (message.includes('not found') || message.includes('404')) {
    return { severity: ErrorSeverity.LOW, category: ErrorCategory.NOT_FOUND };
  }

  // Validation errors
  if (message.includes('validation') || message.includes('invalid') || message.includes('required')) {
    return { severity: ErrorSeverity.MEDIUM, category: ErrorCategory.VALIDATION };
  }

  // Server errors
  if (message.includes('500') || message.includes('server error') || message.includes('internal')) {
    return { severity: ErrorSeverity.CRITICAL, category: ErrorCategory.SERVER };
  }

  // Client-side errors
  if (stack.includes('react') || stack.includes('component') || stack.includes('hook')) {
    return { severity: ErrorSeverity.HIGH, category: ErrorCategory.CLIENT };
  }

  // Default classification
  return { severity: ErrorSeverity.MEDIUM, category: ErrorCategory.UNKNOWN };
}

// Error reporting service
class ErrorReportingService {
  private static instance: ErrorReportingService;
  private isEnabled: boolean;
  private endpoint?: string;
  private apiKey?: string;

  private constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
    this.endpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT;
    this.apiKey = process.env.NEXT_PUBLIC_ERROR_REPORTING_API_KEY;
  }

  static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  async reportError(errorInfo: ErrorInfo): Promise<void> {
    if (!this.isEnabled || !this.endpoint) {
      return;
    }

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey || '',
        },
        body: JSON.stringify(errorInfo),
      });
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }
}

// Enhanced Error Boundary Component
export class EnhancedErrorBoundary extends Component<EnhancedErrorBoundaryProps, EnhancedErrorBoundaryState> {
  private retryTimeouts: NodeJS.Timeout[] = [];

  constructor(props: EnhancedErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false,
      showErrorDetails: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<EnhancedErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ReactErrorInfo) {
    const { customErrorClassifier, onError, enableLogging = true, enableReporting = true } = this.props;

    // Classify the error
    const classification = customErrorClassifier ? customErrorClassifier(error) : classifyError(error);

    // Create enhanced error info
    const enhancedErrorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack || undefined,
      componentStack: errorInfo.componentStack || undefined,
      severity: classification.severity,
      category: classification.category,
      timestamp: new Date().toISOString(),
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      additionalData: {
        reactVersion: React.version,
        componentName: this.constructor.name,
        props: this.getSafeProps(),
      },
    };

    // Update state
    this.setState({
      errorInfo: enhancedErrorInfo,
    });

    // Log error
    if (enableLogging) {
      this.logError(enhancedErrorInfo);
    }

    // Report error
    if (enableReporting) {
      ErrorReportingService.getInstance().reportError(enhancedErrorInfo);
    }

    // Call custom error handler
    if (onError) {
      onError(error, enhancedErrorInfo);
    }
  }

  componentDidUpdate(prevProps: EnhancedErrorBoundaryProps) {
    const { resetOnPropsChange = true, resetKeys = [] } = this.props;
    const { hasError } = this.state;

    if (
      hasError &&
      resetOnPropsChange &&
      resetKeys.some(key => prevProps[key as keyof EnhancedErrorBoundaryProps] !== this.props[key as keyof EnhancedErrorBoundaryProps])
    ) {
      this.resetError();
    }
  }

  componentWillUnmount() {
    // Clear any pending retry timeouts
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
    this.retryTimeouts = [];
  }

  private getUserId(): string | undefined {
    // Try to get user ID from various sources
    return (window as any).__lumo_user_id || 
           localStorage.getItem('userId') || 
           sessionStorage.getItem('userId');
  }

  private getSessionId(): string | undefined {
    return (window as any).__lumo_session_id || 
           sessionStorage.getItem('sessionId');
  }

  private getSafeProps(): Record<string, unknown> {
    const { children, fallback, onError, ...safeProps } = this.props;
    return safeProps;
  }

  private logError(errorInfo: ErrorInfo): void {
    const logLevel = this.getLogLevel(errorInfo.severity);
    const logMessage = `[${errorInfo.severity.toUpperCase()}] ${errorInfo.category}: ${errorInfo.message}`;
    
    switch (logLevel) {
      case 'error':
        console.error(logMessage, errorInfo);
        break;
      case 'warn':
        console.warn(logMessage, errorInfo);
        break;
      case 'info':
        console.info(logMessage, errorInfo);
        break;
      default:
        console.log(logMessage, errorInfo);
    }
  }

  private getLogLevel(severity: ErrorSeverity): 'error' | 'warn' | 'info' | 'log' {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        return 'error';
      case ErrorSeverity.MEDIUM:
        return 'warn';
      case ErrorSeverity.LOW:
        return 'info';
      default:
        return 'log';
    }
  }

  private resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRetrying: false,
      showErrorDetails: false,
    });
  };

  private handleRetry = (): void => {
    const { maxRetries = 3, retryDelay = 1000 } = this.props;
    const { retryCount } = this.state;

    if (retryCount >= maxRetries) {
      return;
    }

    this.setState({ isRetrying: true });

    const timeout = setTimeout(() => {
      this.setState(prevState => ({
        retryCount: prevState.retryCount + 1,
        isRetrying: false,
        hasError: false,
        error: null,
        errorInfo: null,
      }));
    }, retryDelay * Math.pow(2, retryCount)); // Exponential backoff

    this.retryTimeouts.push(timeout);
  };

  private toggleErrorDetails = (): void => {
    this.setState(prevState => ({
      showErrorDetails: !prevState.showErrorDetails,
    }));
  };

  private goHome = (): void => {
    window.location.href = '/';
  };

  private reportBug = (): void => {
    const { errorInfo } = this.state;
    if (!errorInfo) return;

    const subject = `Bug Report - ${errorInfo.category} - ${errorInfo.severity}`;
    const body = `
Error Details:
- Message: ${errorInfo.message}
- Category: ${errorInfo.category}
- Severity: ${errorInfo.severity}
- Timestamp: ${errorInfo.timestamp}
- URL: ${errorInfo.url}
- User Agent: ${errorInfo.userAgent}

Stack Trace:
${errorInfo.stack || 'No stack trace available'}

Component Stack:
${errorInfo.componentStack || 'No component stack available'}

Additional Data:
${JSON.stringify(errorInfo.additionalData, null, 2)}
    `.trim();

    window.location.href = `mailto:support@lumo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  render(): ReactNode {
    const { hasError, error, errorInfo, isRetrying, showErrorDetails } = this.state;
    const { children, fallback, isolate = false } = this.props;

    if (hasError && !isolate) {
      // If custom fallback is provided, use it
      if (fallback) {
        return fallback;
      }

      // Default error fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <Card className="max-w-2xl w-full p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              حدث خطأ غير متوقع
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              نعتذر عن هذا الإزعاج. فريقنا يعمل على إصلاح المشكلة.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-right">
                <p className="text-red-800 dark:text-red-200 font-medium">
                  {error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                onClick={this.handleRetry}
                disabled={isRetrying || this.state.retryCount >= (this.props.maxRetries || 3)}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'جاري إعادة المحاولة...' : `إعادة المحاولة (${this.state.retryCount}/${this.props.maxRetries || 3})`}
              </Button>

              <Button
                variant="outline"
                onClick={this.goHome}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                العودة للرئيسية
              </Button>

              <Button
                variant="outline"
                onClick={this.reportBug}
                className="flex items-center gap-2"
              >
                <Bug className="w-4 h-4" />
                إبلاغ عن مشكلة
              </Button>
            </div>

            <div className="text-center">
              <button
                onClick={this.toggleErrorDetails}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {showErrorDetails ? 'إخفاء' : 'عرض'} التفاصيل التقنية
              </button>

              {showErrorDetails && errorInfo && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>الفئة:</strong> {errorInfo.category}
                    </div>
                    <div>
                      <strong>الشدة:</strong> {errorInfo.severity}
                    </div>
                    <div>
                      <strong>الوقت:</strong> {new Date(errorInfo.timestamp).toLocaleString('ar-SA')}
                    </div>
                    {errorInfo.stack && (
                      <div>
                        <strong>Stack Trace:</strong>
                        <pre className="mt-1 p-2 bg-gray-200 dark:bg-gray-700 rounded text-xs overflow-auto max-h-40">
                          {errorInfo.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<EnhancedErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <EnhancedErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </EnhancedErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Hook for error handling outside of error boundaries
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    const classification = classifyError(error);
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack || undefined,
      severity: classification.severity,
      category: classification.category,
      timestamp: new Date().toISOString(),
      userId: (window as any).__lumo_user_id || localStorage.getItem('userId') || undefined,
      sessionId: (window as any).__lumo_session_id || sessionStorage.getItem('sessionId') || undefined,
      url: window.location.href,
      userAgent: navigator.userAgent,
      additionalData: {
        context,
        handledBy: 'useErrorHandler',
      },
    };

    // Log error
    console.error(`[ERROR] ${classification.category}: ${error.message}`, errorInfo);

    // Report error in production
    if (process.env.NODE_ENV === 'production') {
      ErrorReportingService.getInstance().reportError(errorInfo);
    }
  };

  return { handleError };
}

// Global error handler setup
export function setupGlobalErrorHandlers(): void {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = new Error(event.reason);
    const classification = classifyError(error);
    
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack || undefined,
      severity: classification.severity,
      category: classification.category,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      additionalData: {
        type: 'unhandledrejection',
        reason: event.reason,
      },
    };

    console.error('[UNHANDLED REJECTION]', errorInfo);
    
    if (process.env.NODE_ENV === 'production') {
      ErrorReportingService.getInstance().reportError(errorInfo);
    }
  });

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    const error = new Error(event.message);
    error.stack = event.error?.stack;
    const classification = classifyError(error);
    
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack || undefined,
      severity: classification.severity,
      category: classification.category,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      additionalData: {
        type: 'uncaught',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
    };

    console.error('[UNCAUGHT ERROR]', errorInfo);
    
    if (process.env.NODE_ENV === 'production') {
      ErrorReportingService.getInstance().reportError(errorInfo);
    }
  });
}

export default EnhancedErrorBoundary;
