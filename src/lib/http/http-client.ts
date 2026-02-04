// Advanced HTTP Client with Interceptors
// Comprehensive HTTP client with request/response interceptors, caching, and error handling

import { useState, useCallback, useEffect } from 'react';

// HTTP client configuration
export interface HttpClientConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
  interceptors?: {
    request?: RequestInterceptor[];
    response?: ResponseInterceptor[];
    error?: ErrorInterceptor[];
  };
  retry?: RetryConfig;
  cache?: CacheConfig;
}

// Request interceptor interface
export interface RequestInterceptor {
  id: string;
  priority: number;
  onFulfilled?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onRejected?: (error: Error) => Error | Promise<Error>;
}

// Response interceptor interface
export interface ResponseInterceptor {
  id: string;
  priority: number;
  onFulfilled?: (response: HttpResponse) => HttpResponse | Promise<HttpResponse>;
  onRejected?: (error: Error) => Error | Promise<Error>;
}

// Error interceptor interface
export interface ErrorInterceptor {
  id: string;
  priority: number;
  onError?: (error: Error, config: RequestConfig) => Error | Promise<Error>;
}

// Request configuration
export interface RequestConfig {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retry?: RetryConfig;
  cache?: CacheConfig;
  signal?: AbortSignal;
  validateStatus?: (status: number) => boolean;
}

// Retry configuration
export interface RetryConfig {
  retries: number;
  retryDelay?: number;
  retryCondition?: (error: Error) => boolean;
  onRetry?: (error: Error, attempt: number) => void;
}

// Cache configuration
export interface CacheConfig {
  enabled: boolean;
  ttl?: number;
  maxSize?: number;
  strategy?: 'cache-first' | 'network-first' | 'cache-only' | 'network-only';
}

// HTTP response interface
export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
  request: RequestConfig;
  cached?: boolean;
}

// HTTP error class
export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public response: HttpResponse,
    public config: RequestConfig,
    message?: string
  ) {
    super(message || `HTTP Error ${status}: ${statusText}`);
    this.name = 'HttpError';
  }
}

// Cache manager
class CacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private maxSize: number;
  private defaultTTL: number;

  constructor(maxSize: number = 100, defaultTTL: number = 300000) {
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
  }

  private generateKey(config: RequestConfig): string {
    const { url, method, params, data } = config;
    const key = `${method || 'GET'}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`;
    return key;
  }

  get(config: RequestConfig): HttpResponse | null {
    const key = this.generateKey(config);
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.response;
  }

  set(config: RequestConfig, response: HttpResponse, ttl?: number): void {
    const key = this.generateKey(config);
    
    // Check cache size limit
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      response,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    });
  }

  clear(): void {
    this.cache.clear();
  }

  delete(config: RequestConfig): boolean {
    const key = this.generateKey(config);
    return this.cache.delete(key);
  }

  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0 // Would need tracking implementation
    };
  }
}

interface CacheEntry {
  response: HttpResponse;
  timestamp: number;
  ttl: number;
}

// Main HTTP client class
export class HttpClient {
  private config: HttpClientConfig;
  private cacheManager: CacheManager;
  private interceptors: {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
    error: ErrorInterceptor[];
  };

  constructor(config: HttpClientConfig) {
    this.config = {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      interceptors: {
        request: [],
        response: [],
        error: [],
      },
      retry: {
        retries: 3,
        retryDelay: 1000,
        retryCondition: (error) => {
          return error instanceof HttpError && error.status >= 500 && error.status < 600;
        },
      },
      cache: {
        enabled: true,
        ttl: 300000,
        maxSize: 100,
        strategy: 'cache-first',
      },
      ...config,
    };

    this.cacheManager = new CacheManager(
      this.config.cache?.maxSize || 100,
      this.config.cache?.ttl || 300000
    );

    this.interceptors = {
      request: this.config.interceptors?.request || [],
      response: this.config.interceptors?.response || [],
      error: this.interceptors?.error || [],
    };

    // Sort interceptors by priority
    this.interceptors.request.sort((a, b) => a.priority - b.priority);
    this.interceptors.response.sort((a, b) => a.priority - b.priority);
    this.interceptors.error.sort((a, b) => a.priority - b.priority);
  }

  private async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let finalConfig = { ...config };

    for (const interceptor of this.interceptors.request) {
      if (interceptor.onFulfilled) {
        try {
          finalConfig = await interceptor.onFulfilled(finalConfig);
        } catch (error) {
          if (interceptor.onRejected) {
            throw await interceptor.onRejected(error as Error);
          }
          throw error;
        }
      }
    }

    return finalConfig;
  }

  private async applyResponseInterceptors(response: HttpResponse): Promise<HttpResponse> {
    let finalResponse = response;

    for (const interceptor of this.interceptors.response) {
      if (interceptor.onFulfilled) {
        try {
          finalResponse = await interceptor.onFulfilled(finalResponse);
        } catch (error) {
          if (interceptor.onRejected) {
            throw await interceptor.onRejected(error as Error);
          }
          throw error;
        }
      }
    }

    return finalResponse;
  }

  private async applyErrorInterceptors(error: Error, config: RequestConfig): Promise<Error> {
    for (const interceptor of this.interceptors.error) {
      if (interceptor.onError) {
        try {
          error = await interceptor.onError(error, config);
        } catch (newError) {
          error = newError;
        }
      }
    }

    return error;
  }

  private async executeRequest<T>(config: RequestConfig): Promise<HttpResponse<T>> {
    // Apply request interceptors
    const finalConfig = await this.applyRequestInterceptors(config);

    // Build URL
    const url = new URL(finalConfig.url || '', this.config.baseURL);
    if (finalConfig.params) {
      Object.entries(finalConfig.params).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
    }

    // Prepare request options
    const options: RequestInit = {
      method: finalConfig.method || 'GET',
      headers: {
        ...this.config.headers,
        ...finalConfig.headers,
      },
      signal: finalConfig.signal,
    };

    // Add body for POST/PUT/PATCH requests
    if (finalConfig.data && ['POST', 'PUT', 'PATCH'].includes(finalConfig.method || 'GET')) {
      options.body = typeof finalConfig.data === 'string' 
        ? finalConfig.data 
        : JSON.stringify(finalConfig.data);
    }

    // Set timeout
    const timeout = finalConfig.timeout || this.config.timeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url.toString(), options);
      clearTimeout(timeoutId);

      // Check if response is ok
      const validateStatus = finalConfig.validateStatus || ((status) => status >= 200 && status < 300);
      if (!validateStatus(response.status)) {
        throw new HttpError(
          response.status,
          response.statusText,
          {
            data: null,
            status: response.status,
            statusText: response.statusText,
            headers: {},
            config: finalConfig,
            request: finalConfig,
          },
          finalConfig
        );
      }

      // Parse response
      const contentType = response.headers.get('content-type');
      let data: T;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else if (contentType?.includes('text/')) {
        data = await response.text() as any;
      } else {
        data = await response.blob() as any;
      }

      const httpResponse: HttpResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        config: finalConfig,
        request: finalConfig,
      };

      // Apply response interceptors
      const finalResponse = await this.applyResponseInterceptors(httpResponse);

      return finalResponse;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        const abortError = new Error('Request timeout');
        abortError.name = 'AbortError';
        throw abortError;
      }

      // Apply error interceptors
      const finalError = await this.applyErrorInterceptors(error as Error, finalConfig);
      throw finalError;
    }
  }

  private async executeWithRetry<T>(config: RequestConfig): Promise<HttpResponse<T>> {
    const retryConfig = config.retry || this.config.retry;
    let lastError: Error;

    for (let attempt = 0; attempt <= retryConfig.retries; attempt++) {
      try {
        return await this.executeRequest<T>(config);
      } catch (error) {
        lastError = error as Error;

        // Check if we should retry
        if (attempt === retryConfig.retries || !retryConfig.retryCondition?.(lastError)) {
          throw lastError;
        }

        // Call retry callback
        if (retryConfig.onRetry) {
          retryConfig.onRetry(lastError, attempt);
        }

        // Wait before retry
        const delay = retryConfig.retryDelay || 1000;
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
      }
    }

    throw lastError;
  }

  private shouldUseCache(config: RequestConfig): boolean {
    const cacheConfig = config.cache || this.config.cache;
    if (!cacheConfig?.enabled) return false;

    const method = config.method || 'GET';
    return method === 'GET' || method === 'HEAD';
  }

  public async request<T = any>(config: RequestConfig): Promise<HttpResponse<T>> {
    const finalConfig = {
      ...this.config,
      ...config,
      url: config.url || '',
    };

    // Check cache for GET requests
    if (this.shouldUseCache(finalConfig)) {
      const cacheConfig = finalConfig.cache || this.config.cache;
      
      if (cacheConfig?.strategy === 'cache-first') {
        const cachedResponse = this.cacheManager.get(finalConfig);
        if (cachedResponse) {
          return { ...cachedResponse, cached: true };
        }
      } else if (cacheConfig?.strategy === 'cache-only') {
        const cachedResponse = this.cacheManager.get(finalConfig);
        if (cachedResponse) {
          return { ...cachedResponse, cached: true };
        }
        throw new Error('Cache miss and strategy is cache-only');
      }
    }

    // Execute request with retry
    const response = await this.executeWithRetry<T>(finalConfig);

    // Cache successful GET responses
    if (this.shouldUseCache(finalConfig)) {
      this.cacheManager.set(finalConfig, response);
    }

    return response;
  }

  // Convenience methods
  public get<T>(url: string, config?: Partial<RequestConfig>): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  public post<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'POST', data });
  }

  public put<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PUT', data });
  }

  public patch<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PATCH', data });
  }

  public delete<T>(url: string, config?: Partial<RequestConfig>): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }

  // Cache management
  public clearCache(): void {
    this.cacheManager.clear();
  }

  public getCacheStats(): {
    return this.cacheManager.getStats();
  }

  // Interceptor management
  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.interceptors.request.push(interceptor);
    this.interceptors.request.sort((a: RequestInterceptor, b: RequestInterceptor) => a.priority - b.priority);
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.interceptors.response.push(interceptor);
    this.interceptors.response.sort((a: ResponseInterceptor, b: ResponseInterceptor) => a.priority - b.priority);
  }

  public addErrorInterceptor(interceptor: ErrorInterceptor): void {
    this.interceptors.error.push(interceptor);
    this.interceptors.error.sort((a: ErrorInterceptor, b: ErrorInterceptor) => a.priority - b.priority);
  }

  public removeRequestInterceptor(id: string): boolean {
    const index = this.interceptors.request.findIndex((i: RequestInterceptor) => i.id === id);
    if (index !== -1) {
      this.interceptors.request.splice(index, 1);
      return true;
    }
    return false;
  }

  public removeResponseInterceptor(id: string): boolean {
    const index = this.interceptors.response.findIndex((i: ResponseInterceptor) => i.id === id);
    if (index !== -1) {
      this.interceptors.response.splice(index, 1);
      return true;
    }
    return false;
  }

  public removeErrorInterceptor(id: string): boolean {
    const index = this.interceptors.error.findIndex((i: ErrorInterceptor) => i.id === id);
    if (index !== -1) {
      this.interceptors.error.splice(index, 1);
      return true;
    }
    return false;
  }
}

// React hook for HTTP client
export function useHttpClient(config: HttpClientConfig) {
  const [client] = useState(() => new HttpClient(config));

  return client;
}

// Default client instance
export const defaultClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Export utilities
export const HttpUtils = {
  HttpClient,
  HttpError,
  useHttpClient,
  defaultClient,
};

export default HttpUtils;
