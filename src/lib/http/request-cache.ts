// Advanced Request Caching and Deduplication
// Comprehensive caching, retry, and deduplication utilities for HTTP requests

import { useState, useCallback, useEffect, useRef } from 'react';

// Cache entry interface
export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
  lastAccessed: number;
  key: string;
}

// Cache configuration
export interface CacheConfig {
  maxSize: number;
  defaultTTL: number;
  cleanupInterval: number;
  strategy: 'lru' | 'lfu' | 'fifo' | 'ttl';
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
}

// Request deduplication interface
export interface RequestDeduplication {
  key: string;
  promise: Promise<any>;
  timestamp: number;
  timeout: number;
}

// Cache statistics
export interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  evictions: number;
  size: number;
  hitRate: number;
  averageResponseTime: number;
  totalResponseTime: number;
}

// Advanced cache manager
export class AdvancedCacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private deduplication: Map<string, RequestDeduplication> = new Map();
  private config: CacheConfig;
  private stats: CacheStats;
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: 1000,
      defaultTTL: 300000, // 5 minutes
      cleanupInterval: 60000, // 1 minute
      strategy: 'lru',
      compressionEnabled: false,
      encryptionEnabled: false,
      ...config,
    };

    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      evictions: 0,
      size: 0,
      hitRate: 0,
      averageResponseTime: 0,
      totalResponseTime: 0,
    };

    this.startCleanupTimer();
  }

  private generateKey(url: string, method: string, params?: any, data?: any): string {
    const keyData = {
      url,
      method,
      params,
      data,
    };
    return btoa(JSON.stringify(keyData));
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private shouldEvict(): boolean {
    return this.cache.size >= this.config.maxSize;
  }

  private evictByLRU(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  private evictByLFU(): void {
    let leastUsedKey = '';
    let leastHits = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.hits < leastHits) {
        leastHits = entry.hits;
        leastUsedKey = key;
      }
    }

    if (leastUsedKey) {
      this.delete(leastUsedKey);
      this.stats.evictions++;
    }
  }

  private evictByFIFO(): void {
    let oldestKey = '';
    let oldestTimestamp = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  private evictByTTL(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => {
      this.delete(key);
      this.stats.evictions++;
    });
  }

  private evict(): void {
    switch (this.config.strategy) {
      case 'lru':
        this.evictByLRU();
        break;
      case 'lfu':
        this.evictByLFU();
        break;
      case 'fifo':
        this.evictByFIFO();
        break;
      case 'ttl':
        this.evictByTTL();
        break;
    }
  }

  private startCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => {
      this.cache.delete(key);
      this.stats.evictions++;
    });

    // Clean up expired deduplication requests
    for (const [key, request] of this.deduplication.entries()) {
      if (now - request.timestamp > request.timeout) {
        this.deduplication.delete(key);
      }
    }

    this.updateStats();
  }

  private updateStats(): void {
    this.stats.size = this.cache.size;
    this.stats.hitRate = this.stats.hits / (this.stats.hits + this.stats.misses) || 0;
    this.stats.averageResponseTime = this.stats.totalResponseTime / (this.stats.hits + this.stats.misses) || 0;
  }

  // Public methods
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      this.updateStats();
      return null;
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.misses++;
      this.stats.evictions++;
      this.updateStats();
      return null;
    }

    // Update access statistics
    entry.hits++;
    entry.lastAccessed = Date.now();
    this.stats.hits++;
    this.updateStats();

    return entry.data;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTTL,
      hits: 0,
      lastAccessed: Date.now(),
      key,
    };

    // Evict if necessary
    if (this.shouldEvict()) {
      this.evict();
    }

    this.cache.set(key, entry);
    this.stats.sets++;
    this.updateStats();
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.stats.deletes++;
      this.updateStats();
    }
    return deleted;
  }

  clear(): void {
    this.cache.clear();
    this.deduplication.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      evictions: 0,
      size: 0,
      hitRate: 0,
      averageResponseTime: 0,
      totalResponseTime: 0,
    };
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    return entry !== undefined && !this.isExpired(entry);
  }

  // Deduplication methods
  deduplicate<T>(key: string, promise: Promise<T>, timeout: number = 30000): Promise<T> {
    // Check if request is already in progress
    const existing = this.deduplication.get(key);
    if (existing && Date.now() - existing.timestamp < existing.timeout) {
      return existing.promise as Promise<T>;
    }

    // Store new request
    const requestDeduplication: RequestDeduplication = {
      key,
      promise,
      timestamp: Date.now(),
      timeout,
    };

    this.deduplication.set(key, requestDeduplication);

    // Clean up after request completes
    promise.finally(() => {
      this.deduplication.delete(key);
    });

    return promise;
  }

  // Statistics methods
  getStats(): CacheStats {
    return { ...this.stats };
  }

  getCacheInfo(): {
    size: number;
    maxSize: number;
    strategy: string;
    hitRate: number;
    entries: Array<{
      key: string;
      size: number;
      age: number;
      hits: number;
      ttl: number;
    }>;
  } {
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      size: JSON.stringify(entry.data).length,
      age: Date.now() - entry.timestamp,
      hits: entry.hits,
      ttl: entry.ttl,
    }));

    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      strategy: this.config.strategy,
      hitRate: this.stats.hitRate,
      entries,
    };
  }

  // Cache warming
  async warm<T>(keys: string[], dataProvider: (key: string) => Promise<T>): Promise<void> {
    const promises = keys.map(async (key) => {
      try {
        const data = await dataProvider(key);
        this.set(key, data);
      } catch (error) {
        console.error(`Failed to warm cache for key ${key}:`, error);
      }
    });

    await Promise.all(promises);
  }

  // Cache invalidation
  invalidate(pattern: string | RegExp | ((key: string) => boolean)): number {
    let invalidated = 0;

    for (const key of this.cache.keys()) {
      let shouldDelete = false;

      if (typeof pattern === 'string') {
        shouldDelete = key.includes(pattern);
      } else if (pattern instanceof RegExp) {
        shouldDelete = pattern.test(key);
      } else if (typeof pattern === 'function') {
        shouldDelete = pattern(key);
      }

      if (shouldDelete) {
        this.delete(key);
        invalidated++;
      }
    }

    return invalidated;
  }

  // Cache compression (placeholder for actual implementation)
  private compress(data: any): string {
    // In a real implementation, you would use a compression library
    return JSON.stringify(data);
  }

  private decompress(data: string): any {
    // In a real implementation, you would use a decompression library
    return JSON.parse(data);
  }

  // Cache encryption (placeholder for actual implementation)
  private encrypt(data: string): string {
    // In a real implementation, you would use encryption
    return data;
  }

  private decrypt(data: string): string {
    // In a real implementation, you would use decryption
    return data;
  }

  // Cleanup
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    this.clear();
  }
}

// Retry manager
export class RetryManager {
  private static instance: RetryManager;
  private retryAttempts: Map<string, number> = new Map();
  private retryDelays: Map<string, number[]> = new Map();

  static getInstance(): RetryManager {
    if (!RetryManager.instance) {
      RetryManager.instance = new RetryManager();
    }
    return RetryManager.instance;
  }

  shouldRetry(key: string, error: Error, maxRetries: number = 3): boolean {
    const attempts = this.retryAttempts.get(key) || 0;
    return attempts < maxRetries && this.isRetryableError(error);
  }

  private isRetryableError(error: Error): boolean {
    // Network errors, timeouts, and 5xx server errors are retryable
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return true;
    }

    if (error instanceof Error && 'status' in error) {
      const status = (error as any).status;
      return status >= 500 && status < 600;
    }

    return false;
  }

  getRetryDelay(key: string, attempt: number, baseDelay: number = 1000): number {
    // Exponential backoff with jitter
    const delay = baseDelay * Math.pow(2, attempt);
    const jitter = Math.random() * 0.1 * delay;
    return Math.floor(delay + jitter);
  }

  recordAttempt(key: string, attempt: number, delay: number): void {
    this.retryAttempts.set(key, attempt);
    
    if (!this.retryDelays.has(key)) {
      this.retryDelays.set(key, []);
    }
    this.retryDelays.get(key)!.push(delay);
  }

  clearAttempts(key: string): void {
    this.retryAttempts.delete(key);
    this.retryDelays.delete(key);
  }

  getRetryStats(key: string): {
    attempts: number;
    delays: number[];
    totalDelay: number;
  } | null {
    const attempts = this.retryAttempts.get(key) || 0;
    const delays = this.retryDelays.get(key) || [];
    const totalDelay = delays.reduce((sum, delay) => sum + delay, 0);

    return {
      attempts,
      delays,
      totalDelay,
    };
  }
}

// React hook for advanced caching
export function useAdvancedCache(config?: Partial<CacheConfig>) {
  const cacheRef = useRef<AdvancedCacheManager | null>(null);

  if (!cacheRef.current) {
    cacheRef.current = new AdvancedCacheManager(config);
  }

  useEffect(() => {
    return () => {
      cacheRef.current?.destroy();
    };
  }, []);

  return cacheRef.current;
}

// React hook for request deduplication
export function useRequestDeduplication() {
  const cacheRef = useRef<AdvancedCacheManager | null>(null);

  if (!cacheRef.current) {
    cacheRef.current = new AdvancedCacheManager();
  }

  const deduplicate = useCallback(<T>(
    key: string,
    promiseFn: () => Promise<T>,
    timeout?: number
  ): Promise<T> => {
    const promise = promiseFn();
    return cacheRef.current!.deduplicate(key, promise, timeout);
  }, []);

  return { deduplicate, cache: cacheRef.current };
}

// React hook for retry logic
export function useRetry() {
  const retryManager = RetryManager.getInstance();

  const executeWithRetry = useCallback(async <T>(
    key: string,
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> => {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await fn();
        retryManager.clearAttempts(key);
        return result;
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxRetries || !retryManager.shouldRetry(key, lastError, maxRetries)) {
          retryManager.clearAttempts(key);
          throw lastError;
        }

        const delay = retryManager.getRetryDelay(key, attempt, baseDelay);
        retryManager.recordAttempt(key, attempt, delay);

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }, []);

  return { executeWithRetry, retryManager };
}

// Export all utilities
export const RequestCacheUtils = {
  AdvancedCacheManager,
  RetryManager,
  useAdvancedCache,
  useRequestDeduplication,
  useRetry,
};

export default RequestCacheUtils;
