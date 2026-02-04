import { ErrorReportingService } from '@/components/error/EnhancedErrorBoundary';

// Error types (redefined to avoid import issues)
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
  component?: string;
  additionalData?: Record<string, unknown>;
}

// Global error handler configuration
interface GlobalErrorHandlerConfig {
  enableConsoleLogging: boolean;
  enableErrorReporting: boolean;
  enableUserNotifications: boolean;
  maxErrorsPerSession: number;
  errorRetentionTime: number; // in minutes
  enableRetryMechanism: boolean;
  retryAttempts: number;
  retryDelay: number; // in milliseconds
}

// Error context for better error tracking
interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  additionalData?: Record<string, unknown>;
}

// Global error handler class
class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private config: GlobalErrorHandlerConfig;
  private errorHistory: ErrorInfo[] = [];
  private errorCounts: Map<string, number> = new Map();
  private retryCallbacks: Map<string, () => Promise<void>> = new Map();
  private isInitialized: boolean = false;

  private constructor() {
    this.config = {
      enableConsoleLogging: process.env.NODE_ENV === 'development',
      enableErrorReporting: process.env.NODE_ENV === 'production',
      enableUserNotifications: true,
      maxErrorsPerSession: 100,
      errorRetentionTime: 30, // 30 minutes
      enableRetryMechanism: true,
      retryAttempts: 3,
      retryDelay: 1000,
    };
  }

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  // Initialize global error handlers
  initialize(): void {
    if (this.isInitialized) return;

    this.setupGlobalErrorHandlers();
    this.setupUnhandledRejectionHandler();
    this.setupConsoleErrorOverride();
    this.isInitialized = true;

    if (this.config.enableConsoleLogging) {
      console.info('🛡️ Global Error Handler initialized');
    }
  }

  // Setup global error handlers for browser errors
  private setupGlobalErrorHandlers(): void {
    window.addEventListener('error', (event) => {
      this.handleError(new Error(event.message), {
        component: 'Global',
        action: 'window_error',
        additionalData: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error,
        },
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(
        new Error(event.reason instanceof Error ? event.reason.message : String(event.reason)),
        {
          component: 'Global',
          action: 'unhandled_promise_rejection',
          additionalData: {
            reason: event.reason,
            promise: event.promise,
          },
        }
      );
    });
  }

  // Setup unhandled rejection handler
  private setupUnhandledRejectionHandler(): void {
    if (typeof window !== 'undefined' && 'onunhandledrejection' in window) {
      window.onunhandledrejection = (event) => {
        this.handleError(
          new Error(event.reason instanceof Error ? event.reason.message : String(event.reason)),
          {
            component: 'Global',
            action: 'unhandled_rejection',
            additionalData: {
              reason: event.reason,
            },
          }
        );
        event.preventDefault(); // Prevent console error
      };
    }
  }

  // Override console methods for better error tracking
  private setupConsoleErrorOverride(): void {
    if (this.config.enableConsoleLogging && typeof window !== 'undefined') {
      const originalError = console.error;
      const originalWarn = console.warn;
      const originalLog = console.log;

      console.error = (...args: unknown[]) => {
        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        
        this.handleError(new Error(message), {
          component: 'Console',
          action: 'console_error',
          additionalData: { args },
        });
        
        originalError.apply(console, args);
      };

      console.warn = (...args: unknown[]) => {
        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        
        this.handleError(new Error(message), {
          component: 'Console',
          action: 'console_warn',
          additionalData: { args },
          severity: ErrorSeverity.LOW,
        });
        
        originalWarn.apply(console, args);
      };

      // Keep console.log as is for debugging
      console.log = originalLog;
    }
  }

  // Main error handling method
  handleError(error: Error, context?: Partial<ErrorContext>): void {
    const errorContext: ErrorContext = {
      component: context?.component || 'Unknown',
      action: context?.action || 'unknown_action',
      userId: context?.userId || this.getUserId(),
      sessionId: context?.sessionId || this.getSessionId(),
      timestamp: new Date().toISOString(),
      url: context?.url || window.location.href,
      userAgent: navigator.userAgent,
      additionalData: context?.additionalData || {},
      ...context,
    };

    // Classify the error
    const classification = this.classifyError(error);
    
    // Create error info
    const errorInfo: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack: '', // Could be enhanced with React error boundaries
      severity: classification.severity,
      category: classification.category,
      timestamp: errorContext.timestamp,
      userId: errorContext.userId,
      sessionId: errorContext.sessionId,
      url: errorContext.url,
      userAgent: errorContext.userAgent,
      additionalData: {
        ...errorContext.additionalData,
        errorId: this.generateErrorId(),
        retryCount: this.getRetryCount(error.message),
      },
    };

    // Add to error history
    this.addToErrorHistory(errorInfo);

    // Log to console if enabled
    if (this.config.enableConsoleLogging) {
      this.logError(errorInfo);
    }

    // Report error if enabled
    if (this.config.enableErrorReporting) {
      this.reportError(errorInfo);
    }

    // Show user notification if enabled and error is severe
    if (this.config.enableUserNotifications && classification.severity !== ErrorSeverity.LOW) {
      this.showUserNotification(errorInfo);
    }

    // Attempt retry if enabled and error is retryable
    if (this.config.enableRetryMechanism && this.isRetryable(error) && this.getRetryCount(error.message) < this.config.retryAttempts) {
      this.scheduleRetry(error, errorContext);
    }

    // Clean up old errors
    this.cleanupOldErrors();
  }

  // Classify error severity and category
  private classifyError(error: Error): { severity: ErrorSeverity; category: ErrorCategory } {
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

  // Add error to history
  private addToErrorHistory(errorInfo: ErrorInfo): void {
    this.errorHistory.push(errorInfo);
    this.errorHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Keep only the most recent errors
    if (this.errorHistory.length > this.config.maxErrorsPerSession) {
      this.errorHistory = this.errorHistory.slice(0, this.config.maxErrorsPerSession);
    }

    // Update error counts
    const key = `${errorInfo.category}:${errorInfo.severity}`;
    this.errorCounts.set(key, (this.errorCounts.get(key) || 0) + 1);
  }

  // Log error to console
  private logError(errorInfo: ErrorInfo): void {
    const logLevel = this.getLogLevel(errorInfo.severity);
    const logMessage = `[${errorInfo.severity.toUpperCase()}] ${errorInfo.category}: ${errorInfo.message}`;
    
    switch (logLevel) {
      case 'error':
        console.error(logMessage, {
          errorId: errorInfo.additionalData?.errorId,
          component: errorInfo.component,
          action: errorInfo.additionalData?.action,
          timestamp: errorInfo.timestamp,
          url: errorInfo.url,
          stack: errorInfo.stack,
        });
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

  // Get log level based on severity
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

  // Report error to external service
  private async reportError(errorInfo: ErrorInfo): Promise<void> {
    try {
      await ErrorReportingService.getInstance().reportError(errorInfo);
    } catch (reportingError) {
      console.warn('Failed to report error:', reportingError);
    }
  }

  // Show user notification for errors
  private showUserNotification(errorInfo: ErrorInfo): void {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      const title = this.getNotificationTitle(errorInfo);
      const options: NotificationOptions = {
        body: errorInfo.message,
        icon: this.getNotificationIcon(errorInfo),
        tag: 'lumo-error',
        requireInteraction: errorInfo.severity === ErrorSeverity.HIGH || errorInfo.severity === ErrorSeverity.CRITICAL,
      };

      new Notification(title, options);
    }
  }

  // Get notification title based on error severity
  private getNotificationTitle(errorInfo: ErrorInfo): string {
    switch (errorInfo.severity) {
      case ErrorSeverity.CRITICAL:
        return '🚨 خطأ حرج';
      case ErrorSeverity.HIGH:
        return '⚠️ خطأ مهم';
      case ErrorSeverity.MEDIUM:
        return 'ℹ️ تحذير';
      case ErrorSeverity.LOW:
        return 'ℹ️ ملاحظة';
      default:
        return 'ℹ️ خطأ';
    }
  }

  // Get notification icon based on error category
  private getNotificationIcon(errorInfo: ErrorInfo): string {
    switch (errorInfo.category) {
      case ErrorCategory.NETWORK:
        return '🌐';
      case ErrorCategory.AUTHENTICATION:
        return '🔐';
      case ErrorCategory.AUTHORIZATION:
        return '🚫';
      case ErrorCategory.NOT_FOUND:
        return '🔍';
      case ErrorCategory.VALIDATION:
        return '⚠️';
      case ErrorCategory.SERVER:
        return '🖥️';
      case ErrorCategory.CLIENT:
        return '💻';
      default:
        return '❌';
    }
  }

  // Check if error is retryable
  private isRetryable(error: Error): boolean {
    const retryableErrors = [
      'network',
      'timeout',
      'connection',
      'fetch',
      'rate limit',
      '503',
      '502',
      '504',
    ];

    return retryableErrors.some(keyword => 
      error.message.toLowerCase().includes(keyword)
    );
  }

  // Get retry count for an error
  private getRetryCount(errorMessage: string): number {
    return this.errorCounts.get(`retry:${errorMessage}`) || 0;
  }

  // Schedule retry for retryable errors
  private scheduleRetry(error: Error, context: Partial<ErrorContext>): void {
    const retryKey = `retry:${error.message}`;
    const retryCount = this.getRetryCount(error.message);
    
    if (retryCount >= this.config.retryAttempts) {
      return;
    }

    const retryDelay = this.config.retryDelay * Math.pow(2, retryCount); // Exponential backoff

    setTimeout(async () => {
      try {
        // Execute retry callback if exists
        const callback = this.retryCallbacks.get(retryKey);
        if (callback) {
          await callback();
          // Remove callback after successful retry
          this.retryCallbacks.delete(retryKey);
        }
      } catch (retryError) {
        // Increment retry count and try again
        this.errorCounts.set(retryKey, retryCount + 1);
        this.handleError(retryError, context);
      }
    }, retryDelay);
  }

  // Register retry callback for an error
  registerRetryCallback(errorKey: string, callback: () => Promise<void>): void {
    this.retryCallbacks.set(`retry:${errorKey}`, callback);
  }

  // Clean up old errors
  private cleanupOldErrors(): void {
    const cutoffTime = new Date(Date.now() - this.config.errorRetentionTime * 60 * 1000);
    this.errorHistory = this.errorHistory.filter(error => 
      new Date(error.timestamp) > cutoffTime
    );
  }

  // Get user ID from various sources
  private getUserId(): string | undefined {
    return (window as any).__lumo_user_id || 
           localStorage.getItem('userId') || 
           sessionStorage.getItem('userId'));
  }

  // Get session ID from various sources
  private getSessionId(): string | undefined {
    return (window as any).__lumo_session_id || 
           sessionStorage.getItem('sessionId'));
  }

  // Generate unique error ID
  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get error statistics
  getErrorStats(): {
    const totalErrors = this.errorHistory.length;
    const errorsByCategory: Record<string, number> = {};
    const errorsBySeverity: Record<string, number> = {};
    const recentErrors = this.errorHistory.slice(0, 10);

    this.errorHistory.forEach(error => {
      errorsByCategory[error.category] = (errorsByCategory[error.category] || 0) + 1;
      errorsBySeverity[error.severity] = (errorsBySeverity[error.severity] || 0) + 1;
    });

    return {
      totalErrors,
      errorsByCategory,
      errorsBySeverity,
      recentErrors,
      errorRate: this.calculateErrorRate(),
    };
  }

  // Calculate error rate (errors per minute)
  private calculateErrorRate(): number {
    if (this.errorHistory.length === 0) return 0;
    
    const now = Date.now();
    const oneMinuteAgo = now - 60000; // 1 minute ago
    
    const recentErrors = this.errorHistory.filter(error => 
      new Date(error.timestamp).getTime() > oneMinuteAgo
    );
    
    return recentErrors.length;
  }

  // Clear error history
  clearErrorHistory(): void {
    this.errorHistory = [];
    this.errorCounts.clear();
    this.retryCallbacks.clear();
  }

  // Update configuration
  updateConfig(newConfig: Partial<GlobalErrorHandlerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current configuration
  getConfig(): GlobalErrorHandlerConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const globalErrorHandler = GlobalErrorHandler.getInstance();

// Export convenience functions
export const handleError = (error: Error, context?: Partial<ErrorContext>) => {
  globalErrorHandler.handleError(error, context);
};

export const initializeGlobalErrorHandler = () => {
  globalErrorHandler.initialize();
};

export const getErrorStats = () => {
  return globalErrorHandler.getErrorStats();
};

export const clearErrorHistory = () => {
  globalErrorHandler.clearErrorHistory();
};

export default GlobalErrorHandler;
