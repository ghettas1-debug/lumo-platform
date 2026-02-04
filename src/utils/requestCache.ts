'use client';

// Request Caching, Retry, and Deduplication Utilities
export interface CacheEntry<T = any> {
  key: string;
  data: T;
  timestamp: number;
  ttl: number;
  expires: number;
  etag?: string;
  lastModified?: string;
  hitCount: number;
  size: number;
}

export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryDelayMultiplier: number;
  maxRetryDelay: number;
  retryCondition?: (error: any) => boolean;
  onRetry?: (attempt: number, error: any) => void;
  onMaxRetriesReached?: (error: any) => void;
}

export interface DeduplicationEntry {
  key: string;
  promise: Promise<any>;
  timestamp: number;
  timeout: NodeJS.Timeout;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

export interface RequestCacheConfig {
  maxSize: number;
  defaultTTL: number;
  cleanupInterval: number;
  enableCompression: boolean;
  enableEncryption: boolean;
  encryptionKey?: string;
  enableMetrics: boolean;
  enableDebug: boolean;
  cacheStrategy: 'lru' | 'fifo' | 'lfu';
  deduplicationTimeout: number;
  retryConfig: RetryConfig;
}

export interface CacheMetrics {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  evictions: number;
  size: number;
  hitRate: number;
  averageResponseTime: number;
  totalResponseTime: number;
  deduplicationHits: number;
  retryCount: number;
  retrySuccessCount: number;
  retryFailureCount: number;
}

// Request Cache Manager
export class RequestCacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private deduplicationQueue: Map<string, DeduplicationEntry> = new Map();
  private metrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    evictions: 0,
    size: 0,
    hitRate: 0,
    averageResponseTime: 0,
    totalResponseTime: 0,
    deduplicationHits: 0,
    retryCount: 0,
    retrySuccessCount: 0,
    retryFailureCount: 0,
  };
  private config: RequestCacheConfig;
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<RequestCacheConfig> = {}) {
    this.config = {
      maxSize: 1000,
      defaultTTL: 5 * 60 * 1000, // 5 minutes
      cleanupInterval: 60000, // 1 minute
      enableCompression: false,
      enableEncryption: false,
      enableMetrics: true,
      enableDebug: false,
      cacheStrategy: 'lru',
      deduplicationTimeout: 30000, // 30 seconds
      retryConfig: {
        maxRetries: 3,
        retryDelay: 1000,
        retryDelayMultiplier: 2,
        maxRetryDelay: 30000,
        retryCondition: (error) => {
          // Retry on network errors and 5xx server errors
          return !error.response || (error.response.status >= 500);
        },
      },
      ...config,
    };

    this.startCleanupTimer();
  }

  // Generate cache key
  private generateCacheKey(url: string, method: string, params?: any, data?: any): string {
    const keyData = {
      url,
      method: method.toUpperCase(),
      params: params || {},
      data: data || {},
    };
    
    return btoa(JSON.stringify(keyData));
  }

  // Compress data if enabled
  private compress(data: any): any {
    if (!this.config.enableCompression) {
      return data;
    }

    try {
      const serialized = JSON.stringify(data);
      // Simple compression - replace repeated patterns
      const compressed = serialized.replace(/"([^"]+)":/g, (match, key) => {
        const shortKeys: Record<string, string> = {
          'data': 'd',
          'result': 'r',
          'items': 'i',
          'total': 't',
          'page': 'p',
          'limit': 'l',
          'offset': 'o',
        };
        return `"${shortKeys[key] || key}":`;
      });
      
      return JSON.parse(compressed);
    } catch (error) {
      if (this.config.enableDebug) {
        console.warn('Compression failed:', error);
      }
      return data;
    }
  }

  // Decompress data if enabled
  private decompress(data: any): any {
    if (!this.config.enableCompression) {
      return data;
    }

    try {
      const serialized = JSON.stringify(data);
      // Decompress - restore original keys
      const decompressed = serialized.replace(/"([a-z])":/g, (match, key) => {
        const longKeys: Record<string, string> = {
          'd': 'data',
          'r': 'result',
          'i': 'items',
          't': 'total',
          'p': 'page',
          'l': 'limit',
          'o': 'offset',
        };
        return `"${longKeys[key] || key}":`;
      });
      
      return JSON.parse(decompressed);
    } catch (error) {
      if (this.config.enableDebug) {
        console.warn('Decompression failed:', error);
      }
      return data;
    }
  }

  // Encrypt data if enabled
  private encrypt(data: any): any {
    if (!this.config.enableEncryption || !this.config.encryptionKey) {
      return data;
    }

    try {
      const serialized = JSON.stringify(data);
      let encrypted = '';
      
      for (let i = 0; i < serialized.length; i++) {
        const char = serialized.charCodeAt(i);
        const keyChar = this.config.encryptionKey.charCodeAt(i % this.config.encryptionKey.length);
        encrypted += String.fromCharCode(char ^ keyChar);
      }
      
      return btoa(encrypted);
    } catch (error) {
      if (this.config.enableDebug) {
        console.warn('Encryption failed:', error);
      }
      return data;
    }
  }

  // Decrypt data if enabled
  private decrypt(data: any): any {
    if (!this.config.enableEncryption || !this.config.encryptionKey) {
      return data;
    }

    try {
      const decrypted = atob(data);
      let decryptedStr = '';
      
      for (let i = 0; i < decrypted.length; i++) {
        const char = decrypted.charCodeAt(i);
        const keyChar = this.config.encryptionKey.charCodeAt(i % this.config.encryptionKey.length);
        decryptedStr += String.fromCharCode(char ^ keyChar);
      }
      
      return JSON.parse(decryptedStr);
    } catch (error) {
      if (this.config.enableDebug) {
        console.warn('Decryption failed:', error);
      }
      return data;
    }
  }

  // Calculate data size
  private calculateSize(data: any): number {
    return JSON.stringify(data).length;
  }

  // Start cleanup timer
  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  // Cleanup expired entries
  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expires < now) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => {
      this.delete(key);
    });

    // Evict entries if cache is too large
    if (this.cache.size > this.config.maxSize) {
      this.evict();
    }

    if (this.config.enableDebug) {
      console.debug(`Cache cleanup: removed ${expiredKeys.length} expired entries`);
    }
  }

  // Evict entries based on strategy
  private evict(): void {
    const entries = Array.from(this.cache.entries());
    const toEvict = entries.length - this.config.maxSize + 1;

    if (toEvict <= 0) return;

    let keysToEvict: string[] = [];

    switch (this.config.cacheStrategy) {
      case 'lru':
        // Least Recently Used
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        keysToEvict = entries.slice(0, toEvict).map(([key]) => key);
        break;

      case 'fifo':
        // First In First Out
        keysToEvict = entries.slice(0, toEvict).map(([key]) => key);
        break;

      case 'lfu':
        // Least Frequently Used
        entries.sort((a, b) => a[1].hitCount - b[1].hitCount);
        keysToEvict = entries.slice(0, toEvict).map(([key]) => key);
        break;
    }

    keysToEvict.forEach(key => {
      this.delete(key);
      this.metrics.evictions++;
    });

    if (this.config.enableDebug) {
      console.debug(`Cache eviction: removed ${keysToEvict.length} entries`);
    }
  }

  // Get cached response
  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.metrics.misses++;
      return null;
    }

    // Check if expired
    if (entry.expires < Date.now()) {
      this.delete(key);
      this.metrics.misses++;
      return null;
    }

    // Update hit count and metrics
    entry.hitCount++;
    this.metrics.hits++;
    this.updateHitRate();

    const data = this.decompress(this.decrypt(entry.data));

    if (this.config.enableDebug) {
      console.debug(`Cache hit: ${key} (hits: ${entry.hitCount})`);
    }

    return data;
  }

  // Set cached response
  public set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const actualTTL = ttl || this.config.defaultTTL;
    
    // Process data
    const processedData = this.encrypt(this.compress(data));
    const size = this.calculateSize(processedData);

    // Create entry
    const entry: CacheEntry<T> = {
      key,
      data: processedData,
      timestamp: now,
      ttl: actualTTL,
      expires: now + actualTTL,
      hitCount: 0,
      size,
    };

    // Add to cache
    this.cache.set(key, entry);
    this.metrics.sets++;
    this.metrics.size = this.cache.size;

    // Evict if necessary
    if (this.cache.size > this.config.maxSize) {
      this.evict();
    }

    if (this.config.enableDebug) {
      console.debug(`Cache set: ${key} (TTL: ${actualTTL}ms, size: ${size} bytes)`);
    }
  }

  // Delete cached response
  public delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    
    if (deleted) {
      this.metrics.deletes++;
      this.metrics.size = this.cache.size;
      
      if (this.config.enableDebug) {
        console.debug(`Cache delete: ${key}`);
      }
    }

    return deleted;
  }

  // Clear cache
  public clear(): void {
    this.cache.clear();
    this.metrics.size = 0;
    
    if (this.config.enableDebug) {
      console.debug('Cache cleared');
    }
  }

  // Check if key exists
  public has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry !== undefined && entry.expires > Date.now();
  }

  // Get cache size
  public size(): number {
    return this.cache.size;
  }

  // Get cache keys
  public keys(): string[] {
    return Array.from(this.cache.keys());
  }

  // Get cache entries
  public entries(): Array<[string, CacheEntry]> {
    return Array.from(this.cache.entries());
  }

  // Update hit rate
  private updateHitRate(): void {
    const total = this.metrics.hits + this.metrics.misses;
    this.metrics.hitRate = total > 0 ? this.metrics.hits / total : 0;
  }

  // Get metrics
  public getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }

  // Reset metrics
  public resetMetrics(): void {
    this.metrics = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      evictions: 0,
      size: this.cache.size,
      hitRate: 0,
      averageResponseTime: 0,
      totalResponseTime: 0,
      deduplicationHits: 0,
      retryCount: 0,
      retrySuccessCount: 0,
      retryFailureCount: 0,
    };
  }

  // Deduplicate request
  public deduplicate<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // Check if request is already in progress
    const existingEntry = this.deduplicationQueue.get(key);
    
    if (existingEntry) {
      this.metrics.deduplicationHits++;
      
      if (this.config.enableDebug) {
        console.debug(`Request deduplicated: ${key}`);
      }
      
      return existingEntry.promise;
    }

    // Create new deduplication entry
    let resolve: (value: T) => void;
    let reject: (error: any) => void;
    
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const timeout = setTimeout(() => {
      this.deduplicationQueue.delete(key);
      reject(new Error('Request deduplication timeout'));
    }, this.config.deduplicationTimeout);

    const entry: DeduplicationEntry = {
      key,
      promise,
      timestamp: Date.now(),
      timeout,
      resolve: resolve!,
      reject: reject!,
    };

    this.deduplicationQueue.set(key, entry);

    // Execute request
    requestFn()
      .then((result) => {
        clearTimeout(timeout);
        this.deduplicationQueue.delete(key);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeout);
        this.deduplicationQueue.delete(key);
        reject(error);
      });

    return promise;
  }

  // Retry request with exponential backoff
  public async retry<T>(
    requestFn: () => Promise<T>,
    config: Partial<RetryConfig> = {}
  ): Promise<T> {
    const retryConfig = { ...this.config.retryConfig, ...config };
    let lastError: any;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          this.metrics.retryCount++;
          
          // Calculate delay with exponential backoff
          const delay = Math.min(
            retryConfig.retryDelay * Math.pow(retryConfig.retryDelayMultiplier, attempt - 1),
            retryConfig.maxRetryDelay
          );
          
          if (this.config.enableDebug) {
            console.debug(`Retry attempt ${attempt} after ${delay}ms`);
          }
          
          // Call retry callback
          retryConfig.onRetry?.(attempt, lastError);
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const result = await requestFn();
        
        if (attempt > 0) {
          this.metrics.retrySuccessCount++;
          
          if (this.config.enableDebug) {
            console.debug(`Retry succeeded on attempt ${attempt}`);
          }
        }
        
        return result;
      } catch (error) {
        lastError = error;
        
        // Check if we should retry
        if (attempt < retryConfig.maxRetries && 
            (!retryConfig.retryCondition || retryConfig.retryCondition(error))) {
          continue;
        }
        
        if (attempt === retryConfig.maxRetries) {
          this.metrics.retryFailureCount++;
          retryConfig.onMaxRetriesReached?.(error);
          
          if (this.config.enableDebug) {
            console.debug(`Max retries (${retryConfig.maxRetries}) reached`);
          }
        }
        
        throw error;
      }
    }

    throw lastError;
  }

  // Update configuration
  public updateConfig(config: Partial<RequestCacheConfig>): void {
    this.config = { ...this.config, ...config };
    
    // Restart cleanup timer if interval changed
    if (config.cleanupInterval) {
      this.startCleanupTimer();
    }
  }

  // Get configuration
  public getConfig(): RequestCacheConfig {
    return { ...this.config };
  }

  // Destroy cache manager
  public destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    
    this.cache.clear();
    this.deduplicationQueue.clear();
    
    // Clear all timeouts
    for (const entry of this.deduplicationQueue.values()) {
      clearTimeout(entry.timeout);
    }
    
    this.deduplicationQueue.clear();
  }

  // Export cache data
  public export(): string {
    const data = {
      cache: Array.from(this.cache.entries()),
      metrics: this.metrics,
      config: this.config,
      timestamp: Date.now(),
    };
    
    return JSON.stringify(data);
  }

  // Import cache data
  public import(data: string): void {
    try {
      const parsed = JSON.parse(data);
      
      // Validate data structure
      if (!parsed.cache || !Array.isArray(parsed.cache)) {
        throw new Error('Invalid cache data format');
      }
      
      // Import cache entries
      this.cache = new Map(parsed.cache);
      
      // Import metrics
      if (parsed.metrics) {
        this.metrics = { ...this.metrics, ...parsed.metrics };
      }
      
      // Import config
      if (parsed.config) {
        this.config = { ...this.config, ...parsed.config };
      }
      
      this.metrics.size = this.cache.size;
      
      if (this.config.enableDebug) {
        console.debug(`Cache imported: ${this.cache.size} entries`);
      }
    } catch (error) {
      if (this.config.enableDebug) {
        console.error('Cache import failed:', error);
      }
      throw error;
    }
  }

  // Get cache statistics
  public getStatistics(): {
    entries: number;
    size: number;
    hitRate: number;
    averageHitCount: number;
    oldestEntry: number;
    newestEntry: number;
    expiredEntries: number;
    memoryUsage: number;
  } {
    const entries = this.cache.size;
    const now = Date.now();
    
    let totalHitCount = 0;
    let oldestTimestamp = now;
    let newestTimestamp = 0;
    let expiredCount = 0;
    let totalSize = 0;

    for (const entry of this.cache.values()) {
      totalHitCount += entry.hitCount;
      oldestTimestamp = Math.min(oldestTimestamp, entry.timestamp);
      newestTimestamp = Math.max(newestTimestamp, entry.timestamp);
      
      if (entry.expires < now) {
        expiredCount++;
      }
      
      totalSize += entry.size;
    }

    return {
      entries,
      size: totalSize,
      hitRate: this.metrics.hitRate,
      averageHitCount: entries > 0 ? totalHitCount / entries : 0,
      oldestEntry: oldestTimestamp,
      newestEntry: newestTimestamp,
      expiredEntries: expiredCount,
      memoryUsage: totalSize,
    };
  }

  // Optimize cache
  public optimize(): {
    removedEntries: number;
    freedSpace: number;
    compressionRatio: number;
  } {
    const beforeStats = this.getStatistics();
    
    // Remove expired entries
    const now = Date.now();
    const expiredKeys: string[] = [];
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expires < now) {
        expiredKeys.push(key);
      }
    }
    
    expiredKeys.forEach(key => this.delete(key));
    
    // Evict least used entries if cache is too large
    if (this.cache.size > this.config.maxSize) {
      this.evict();
    }
    
    const afterStats = this.getStatistics();
    
    return {
      removedEntries: expiredKeys.length,
      freedSpace: beforeStats.size - afterStats.size,
      compressionRatio: afterStats.size > 0 ? beforeStats.size / afterStats.size : 1,
    };
  }
}

// React hook for request cache
export const useRequestCache = (config: Partial<RequestCacheConfig> = {}) => {
  const [cacheManager] = useState(() => new RequestCacheManager(config));
  const [metrics, setMetrics] = useState<CacheMetrics>(() => cacheManager.getMetrics());

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(cacheManager.getMetrics());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [cacheManager]);

  // Get cached data
  const getCached = useCallback(<T>(key: string): T | null => {
    return cacheManager.get<T>(key);
  }, [cacheManager]);

  // Set cached data
  const setCached = useCallback(<T>(key: string, data: T, ttl?: number): void => {
    cacheManager.set(key, data, ttl);
  }, [cacheManager]);

  // Delete cached data
  const deleteCached = useCallback((key: string): boolean => {
    return cacheManager.delete(key);
  }, [cacheManager]);

  // Clear cache
  const clearCache = useCallback((): void => {
    cacheManager.clear();
  }, [cacheManager]);

  // Deduplicate request
  const deduplicate = useCallback(<T>(key: string, requestFn: () => Promise<T>): Promise<T> => {
    return cacheManager.deduplicate(key, requestFn);
  }, [cacheManager]);

  // Retry request
  const retry = useCallback(<T>(requestFn: () => Promise<T>, config?: Partial<RetryConfig>): Promise<T> => {
    return cacheManager.retry(requestFn, config);
  }, [cacheManager]);

  // Get statistics
  const getStatistics = useCallback(() => {
    return cacheManager.getStatistics();
  }, [cacheManager]);

  // Optimize cache
  const optimizeCache = useCallback(() => {
    return cacheManager.optimize();
  }, [cacheManager]);

  // Update configuration
  const updateConfig = useCallback((newConfig: Partial<RequestCacheConfig>) => {
    cacheManager.updateConfig(newConfig);
  }, [cacheManager]);

  // Export cache
  const exportCache = useCallback(() => {
    return cacheManager.export();
  }, [cacheManager]);

  // Import cache
  const importCache = useCallback((data: string) => {
    cacheManager.import(data);
  }, [cacheManager]);

  // Reset metrics
  const resetMetrics = useCallback(() => {
    cacheManager.resetMetrics();
    setMetrics(cacheManager.getMetrics());
  }, [cacheManager]);

  return {
    cacheManager,
    metrics,
    getCached,
    setCached,
    deleteCached,
    clearCache,
    deduplicate,
    retry,
    getStatistics,
    optimizeCache,
    updateConfig,
    exportCache,
    importCache,
    resetMetrics,
  };
};

// Utility functions
export const requestCacheUtils = {
  // Create cache manager
  createManager: (config?: Partial<RequestCacheConfig>) => {
    return new RequestCacheManager(config);
  },

  // Generate cache key
  generateKey: (url: string, method: string, params?: any, data?: any): string => {
    const keyData = {
      url,
      method: method.toUpperCase(),
      params: params || {},
      data: data || {},
    };
    
    return btoa(JSON.stringify(keyData));
  },

  // Format cache size
  formatSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format hit rate
  formatHitRate: (hitRate: number): string => {
    return `${(hitRate * 100).toFixed(2)}%`;
  },

  // Format duration
  formatDuration: (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
    return `${(ms / 60000).toFixed(2)}m`;
  },

  // Validate cache config
  validateConfig: (config: Partial<RequestCacheConfig>): string[] => {
    const errors: string[] = [];
    
    if (config.maxSize !== undefined && config.maxSize < 1) {
      errors.push('maxSize must be at least 1');
    }
    
    if (config.defaultTTL !== undefined && config.defaultTTL < 0) {
      errors.push('defaultTTL must be non-negative');
    }
    
    if (config.cleanupInterval !== undefined && config.cleanupInterval < 1000) {
      errors.push('cleanupInterval must be at least 1000ms');
    }
    
    if (config.deduplicationTimeout !== undefined && config.deduplicationTimeout < 1000) {
      errors.push('deduplicationTimeout must be at least 1000ms');
    }
    
    if (config.retryConfig?.maxRetries !== undefined && config.retryConfig.maxRetries < 0) {
      errors.push('retryConfig.maxRetries must be non-negative');
    }
    
    if (config.retryConfig?.retryDelay !== undefined && config.retryConfig.retryDelay < 0) {
      errors.push('retryConfig.retryDelay must be non-negative');
    }
    
    if (config.retryConfig?.retryDelayMultiplier !== undefined && config.retryConfig.retryDelayMultiplier < 1) {
      errors.push('retryConfig.retryDelayMultiplier must be at least 1');
    }
    
    if (config.retryConfig?.maxRetryDelay !== undefined && config.retryConfig.maxRetryDelay < 0) {
      errors.push('retryConfig.maxRetryDelay must be non-negative');
    }
    
    return errors;
  },

  // Create default config
  createDefaultConfig: (): RequestCacheConfig => {
    return {
      maxSize: 1000,
      defaultTTL: 5 * 60 * 1000, // 5 minutes
      cleanupInterval: 60000, // 1 minute
      enableCompression: false,
      enableEncryption: false,
      enableMetrics: true,
      enableDebug: false,
      cacheStrategy: 'lru',
      deduplicationTimeout: 30000, // 30 seconds
      retryConfig: {
        maxRetries: 3,
        retryDelay: 1000,
        retryDelayMultiplier: 2,
        maxRetryDelay: 30000,
        retryCondition: (error) => {
          return !error.response || (error.response.status >= 500);
        },
      },
    };
  },
};

// Default cache manager instance
export const defaultCacheManager = new RequestCacheManager();

export default RequestCacheManager;
export type { CacheEntry, RetryConfig, DeduplicationEntry, RequestCacheConfig, CacheMetrics };
