// Error Reporting Service
// Advanced error reporting with multiple providers and intelligent batching

export interface ErrorReport {
  id: string;
  timestamp: string;
  message: string;
  stack?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  userId?: string;
  sessionId?: string;
  url: string;
  userAgent: string;
  component?: string;
  action?: string;
  additionalData?: Record<string, unknown>;
  environment: 'development' | 'staging' | 'production';
  version: string;
  buildNumber?: string;
}

export interface ReportingProvider {
  name: string;
  enabled: boolean;
  priority: number;
  report: (error: ErrorReport) => Promise<boolean>;
  configure?: (config: Record<string, unknown>) => void;
}

export interface ReportingConfig {
  providers: ReportingProvider[];
  batchSize: number;
  batchInterval: number; // in milliseconds
  maxRetries: number;
  retryDelay: number;
  enableOfflineSupport: boolean;
  enableCompression: boolean;
  enableSampling: boolean;
  samplingRate: number; // 0.0 to 1.0
  enableDeduplication: boolean;
  deduplicationWindow: number; // in milliseconds
}

class ErrorReportingService {
  private static instance: ErrorReportingService;
  private config: ReportingConfig;
  private reportQueue: ErrorReport[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private isOnline: boolean = true;
  private offlineReports: ErrorReport[] = [];
  private deduplicationCache: Map<string, number> = new Map();

  private constructor() {
    this.config = {
      providers: [],
      batchSize: 10,
      batchInterval: 5000, // 5 seconds
      maxRetries: 3,
      retryDelay: 1000,
      enableOfflineSupport: true,
      enableCompression: false,
      enableSampling: false,
      samplingRate: 1.0,
      enableDeduplication: true,
      deduplicationWindow: 60000, // 1 minute
    };

    // Setup online/offline detection
    this.setupConnectivityDetection();
  }

  static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  // Initialize the service with providers
  initialize(config: Partial<ReportingConfig> = {}): void {
    this.config = { ...this.config, ...config };
    
    // Setup default providers if none provided
    if (this.config.providers.length === 0) {
      this.setupDefaultProviders();
    }

    // Start batch processing
    this.startBatchProcessing();

    // Process any offline reports
    this.processOfflineReports();
  }

  // Setup default error reporting providers
  private setupDefaultProviders(): void {
    // Console provider (always available)
    this.addProvider({
      name: 'console',
      enabled: true,
      priority: 1,
      report: async (error: ErrorReport) => {
        if (process.env.NODE_ENV === 'development') {
          console.group(`🚨 Error Report: ${error.severity.toUpperCase()}`);
          console.error('Message:', error.message);
          console.error('Component:', error.component);
          console.error('Action:', error.action);
          console.error('URL:', error.url);
          console.error('Timestamp:', error.timestamp);
          if (error.stack) console.error('Stack:', error.stack);
          console.groupEnd();
        }
        return true;
      }
    });

    // LocalStorage provider (for offline support)
    this.addProvider({
      name: 'localStorage',
      enabled: this.config.enableOfflineSupport,
      priority: 2,
      report: async (error: ErrorReport) => {
        try {
          const existingReports = JSON.parse(localStorage.getItem('error_reports') || '[]');
          existingReports.push(error);
          
          // Keep only last 1000 reports
          if (existingReports.length > 1000) {
            existingReports.splice(0, existingReports.length - 1000);
          }
          
          localStorage.setItem('error_reports', JSON.stringify(existingReports));
          return true;
        } catch (e) {
          console.warn('Failed to save error to localStorage:', e);
          return false;
        }
      }
    });

    // Remote provider (for production)
    if (process.env.NODE_ENV === 'production') {
      this.addProvider({
        name: 'remote',
        enabled: true,
        priority: 3,
        report: async (error: ErrorReport) => {
          try {
            const endpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT;
            if (!endpoint) return false;

            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.NEXT_PUBLIC_ERROR_REPORTING_API_KEY || '',
              },
              body: JSON.stringify(error),
            });

            return response.ok;
          } catch (e) {
            console.warn('Failed to report error to remote service:', e);
            return false;
          }
        }
      });
    }
  }

  // Add a reporting provider
  addProvider(provider: ReportingProvider): void {
    this.config.providers.push(provider);
    // Sort by priority (higher priority first)
    this.config.providers.sort((a, b) => b.priority - a.priority);
  }

  // Remove a reporting provider
  removeProvider(name: string): void {
    this.config.providers = this.config.providers.filter(p => p.name !== name);
  }

  // Report an error
  async reportError(error: ErrorReport): Promise<void> {
    // Check if we should sample this error
    if (this.config.enableSampling && Math.random() > this.config.samplingRate) {
      return;
    }

    // Check for deduplication
    if (this.config.enableDeduplication && this.isDuplicate(error)) {
      return;
    }

    // Add to queue
    this.reportQueue.push(error);

    // If batch size reached, process immediately
    if (this.reportQueue.length >= this.config.batchSize) {
      await this.processBatch();
    }
  }

  // Check if error is duplicate
  private isDuplicate(error: ErrorReport): boolean {
    const key = this.generateDeduplicationKey(error);
    const now = Date.now();
    const lastReported = this.deduplicationCache.get(key);

    if (lastReported && (now - lastReported) < this.config.deduplicationWindow) {
      return true;
    }

    this.deduplicationCache.set(key, now);
    return false;
  }

  // Generate deduplication key
  private generateDeduplicationKey(error: ErrorReport): string {
    return `${error.category}:${error.component}:${error.action}:${error.message}`;
  }

  // Process batch of errors
  private async processBatch(): Promise<void> {
    if (this.reportQueue.length === 0) return;

    const batch = this.reportQueue.splice(0, this.config.batchSize);
    
    if (!this.isOnline) {
      // Store offline for later
      this.offlineReports.push(...batch);
      return;
    }

    // Try each provider in order of priority
    for (const provider of this.config.providers) {
      if (!provider.enabled) continue;

      const results = await Promise.allSettled(
        batch.map(error => provider.report(error))
      );

      // Check if any provider succeeded
      const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
      
      if (successCount > 0) {
        // At least one provider succeeded, we can stop
        break;
      }
    }
  }

  // Start batch processing timer
  private startBatchProcessing(): void {
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
    }

    this.batchTimer = setInterval(() => {
      this.processBatch();
    }, this.config.batchInterval);
  }

  // Setup connectivity detection
  private setupConnectivityDetection(): void {
    this.isOnline = navigator.onLine;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processOfflineReports();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Process offline reports when coming back online
  private async processOfflineReports(): Promise<void> {
    if (this.offlineReports.length === 0) return;

    const offlineBatch = [...this.offlineReports];
    this.offlineReports = [];

    // Add to regular queue for processing
    this.reportQueue.unshift(...offlineBatch);
    
    // Process immediately
    await this.processBatch();
  }

  // Get reporting statistics
  getStats(): {
    queueSize: number;
    offlineSize: number;
    providers: Array<{ name: string; enabled: boolean; priority: number }>;
    isOnline: boolean;
    deduplicationCacheSize: number;
  } {
    return {
      queueSize: this.reportQueue.length,
      offlineSize: this.offlineReports.length,
      providers: this.config.providers.map(p => ({
        name: p.name,
        enabled: p.enabled,
        priority: p.priority,
      })),
      isOnline: this.isOnline,
      deduplicationCacheSize: this.deduplicationCache.size,
    };
  }

  // Clear all cached data
  clearCache(): void {
    this.reportQueue = [];
    this.offlineReports = [];
    this.deduplicationCache.clear();
    
    if (this.batchTimer) {
      clearInterval(this.batchTimer);
      this.batchTimer = null;
    }
  }

  // Update configuration
  updateConfig(newConfig: Partial<ReportingConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Restart batch processing if interval changed
    if (newConfig.batchInterval) {
      this.startBatchProcessing();
    }
  }

  // Get current configuration
  getConfig(): ReportingConfig {
    return { ...this.config };
  }

  // Force process current queue
  async flush(): Promise<void> {
    await this.processBatch();
  }

  // Export error reports for debugging
  exportReports(): ErrorReport[] {
    return [...this.reportQueue, ...this.offlineReports];
  }

  // Import error reports (for testing/debugging)
  importReports(reports: ErrorReport[]): void {
    this.reportQueue.push(...reports);
  }
}

// Export singleton instance
export const errorReportingService = ErrorReportingService.getInstance();

// Convenience functions
export const reportError = (error: Error, context?: {
  component?: string;
  action?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  category?: string;
  additionalData?: Record<string, unknown>;
}): void => {
  const errorReport: ErrorReport = {
    id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    severity: context?.severity || 'medium',
    category: context?.category || 'unknown',
    userId: (window as any).__lumo_user_id || localStorage.getItem('userId') || undefined,
    sessionId: (window as any).__lumo_session_id || sessionStorage.getItem('sessionId') || undefined,
    url: window.location.href,
    userAgent: navigator.userAgent,
    component: context?.component,
    action: context?.action,
    additionalData: context?.additionalData,
    environment: (process.env.NODE_ENV as any) || 'development',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    buildNumber: process.env.NEXT_PUBLIC_BUILD_NUMBER,
  };

  errorReportingService.reportError(errorReport);
};

export const initializeErrorReporting = (config?: Partial<ReportingConfig>) => {
  errorReportingService.initialize(config);
};

export const getErrorReportingStats = () => {
  return errorReportingService.getStats();
};

export const flushErrorReports = async () => {
  await errorReportingService.flush();
};

export default ErrorReportingService;
