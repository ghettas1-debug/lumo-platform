'use client';

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useUIStore, useAuthStore } from '@/store';
import { localStorageUtils } from '@/utils/localStorage';
import { csrfProtectionUtils } from '@/utils/csrfProtection';

// HTTP Client Configuration
export interface HTTPClientConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  retryCondition?: (error: AxiosError) => boolean;
  cache?: boolean;
  cacheTTL?: number;
  deduplication?: boolean;
  interceptors?: {
    request?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestError?: (error: AxiosError) => AxiosError;
    response?: (response: AxiosResponse) => AxiosResponse;
    responseError?: (error: AxiosError) => AxiosError;
  };
  headers?: Record<string, string>;
  params?: Record<string, any>;
  transformRequest?: (data: any) => any;
  transformResponse?: (data: any) => any;
  validateStatus?: (status: number) => boolean;
}

export interface RequestCacheEntry {
  key: string;
  data: any;
  timestamp: number;
  ttl: number;
  expires: number;
}

export interface RequestQueueEntry {
  id: string;
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (error: any) => void;
  retryCount: number;
  timestamp: number;
}

// HTTP Client Class
export class HTTPClient {
  private instance: AxiosInstance;
  private config: HTTPClientConfig;
  private cache: Map<string, RequestCacheEntry> = new Map();
  private requestQueue: Map<string, RequestQueueEntry[]> = new Map();
  private pendingRequests: Set<string> = new Set();
  private defaultConfig: HTTPClientConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000,
    retries: 3,
    retryDelay: 1000,
    retryCondition: (error: AxiosError) => {
      // Retry on network errors and 5xx server errors
      return !error.response || (error.response.status >= 500);
    },
    cache: true,
    cacheTTL: 5 * 60 * 1000, // 5 minutes
    deduplication: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    interceptors: {},
  };

  constructor(config: Partial<HTTPClientConfig> = {}) {
    this.config = { ...this.defaultConfig, ...config };
    this.instance = axios.create(this.config);
    this.setupInterceptors();
    this.setupCacheCleanup();
  }

  // Setup interceptors
  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add CSRF token if available
        const token = csrfProtectionUtils.getTokenHeader(config.headers || {});
        if (token) {
          config.headers = { ...config.headers, ...token };
        }

        // Add auth token if available
        const authStore = useAuthStore.getState();
        if (authStore.isAuthenticated && authStore.user) {
          config.headers.Authorization = `Bearer ${authStore.user.token}`;
        }

        // Add user preferences
        const uiStore = useUIStore.getState();
        if (uiStore.language) {
          config.headers['Accept-Language'] = uiStore.language;
        }

        // Add custom headers
        if (this.config.interceptors?.request) {
          config = this.config.interceptors.request(config);
        }

        // Transform request data if needed
        if (this.config.transformRequest) {
          config.data = this.config.transformRequest(config.data);
        }

        // Add request metadata
        config.metadata = {
          startTime: Date.now(),
          retryCount: 0,
          cached: false,
          deduplicated: false,
        };

        return config;
      },
      (error) => {
        // Handle request errors
        if (this.config.interceptors?.requestError) {
          return this.config.interceptors.requestError(error);
        }

        // Log error
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Transform response data if needed
        if (this.config.transformResponse) {
          response.data = this.config.transformResponse(response.data);
        }

        // Add response metadata
        response.config.metadata = {
          ...response.config.metadata,
          endTime: Date.now(),
          duration: Date.now() - (response.config.metadata?.startTime || 0),
          cached: response.config.metadata?.cached || false,
          deduplicated: response.config.metadata?.deduplicated || false,
        };

        // Handle custom response interceptor
        if (this.config.interceptors?.response) {
          return this.config.interceptors.response(response);
        }

        return response;
      },
      (error) => {
        // Handle response errors
        if (this.config.interceptors?.responseError) {
          return this.config.interceptors.responseError(error);
        }

        // Log error
        console.error('Response error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Setup cache cleanup
  private setupCacheCleanup(): void {
    // Clean expired cache entries every minute
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.cache.entries()) {
        if (entry.expires < now) {
          this.cache.delete(key);
        }
      }
    }, 60000); // Every minute
  }

  // Generate cache key
  private getCacheKey(config: AxiosRequestConfig): string {
    const { url, method, params, data } = config;
    const key = `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`;
    return key;
  }

  // Check if request should be cached
  private shouldCache(config: AxiosRequestConfig): boolean {
    if (!this.config.cache) return false;
    
    // Only cache GET requests by default
    if (config.method?.toLowerCase() !== 'get') return false;
    
    // Don't cache requests with authentication
    if (config.headers?.Authorization) return false;
    
    // Don't cache requests with sensitive data
    if (config.data && typeof config.data === 'object' && 
        (config.data.password || config.data.token || config.data.secret)) {
      return false;
    }
    
    return true;
  }

  // Check if request should be deduplicated
  private shouldDeduplicate(config: AxiosRequestConfig): boolean {
    if (!this.config.deduplication) return false;
    
    const key = this.getCacheKey(config);
    return this.pendingRequests.has(key);
  }

  // Get cached response
  private getCachedResponse<T>(config: AxiosRequestConfig): T | null {
    const key = this.getCacheKey(config);
    const entry = this.cache.get(key);
    
    if (entry && entry.expires > Date.now()) {
      return entry.data;
    }
    
    return null;
  }

  // Cache response
  private cacheResponse<T>(config: AxiosRequestConfig, response: AxiosResponse<T>): void {
    if (!this.shouldCache(config)) return;
    
    const key = this.getCacheKey(config);
    const entry: RequestCacheEntry = {
      key,
      data: response.data,
      timestamp: Date.now(),
      ttl: this.config.cacheTTL || 5 * 60 * 1000, // 5 minutes
      expires: Date.now() + (this.config.cacheTTL || 5 * 60 * 1000),
    };
    
    this.cache.set(key, entry);
  }

  // Add request to queue
  private addToQueue(config: AxiosRequestConfig): Promise<any> {
    const key = this.getCacheKey(config);
    
    return new Promise((resolve, reject) => {
      const queue = this.requestQueue.get(key) || [];
      const entry: RequestQueueEntry = {
        id: Math.random().toString(36).substr(2, 9),
        config,
        resolve,
        reject,
        retryCount: 0,
        timestamp: Date.now(),
      };
      
      queue.push(entry);
      this.requestQueue.set(key, queue);
      this.processQueue(key);
    });
  }

  // Process request queue
  private async processQueue(key: string): Promise<void> {
    const queue = this.requestQueue.get(key);
    if (!queue || queue.length === 0) return;

    const entry = queue[0];
    this.requestQueue.set(key, queue.slice(1));

    try {
      const response = await this.instance.request(entry.config);
      entry.resolve(response);
    } catch (error) {
      entry.reject(error);
    }
  }

  // Retry request
  private async retryRequest<T>(config: AxiosRequestConfig, error: AxiosError): Promise<AxiosResponse<T>> {
    const retryCount = config.metadata?.retryCount || 0;
    
    if (retryCount >= (this.config.retries || 0)) {
      throw error;
    }

    const delay = this.config.retryDelay ? 
      this.config.retryDelay * Math.pow(2, retryCount) : 1000;
    
    await new Promise(resolve => setTimeout(resolve, delay));

    const retryConfig = {
      ...config,
      metadata: {
        ...config.metadata,
        retryCount: retryCount + 1,
      },
    };

    return this.instance.request(retryConfig);
  }

  // Main request method
  public async request<T = async (config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const finalConfig = { ...this.config, ...config };

    // Check cache first
    if (this.shouldCache(finalConfig)) {
      const cached = this.getCachedResponse<T>(finalConfig);
      if (cached) {
        const response = {
          data: cached,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: finalConfig,
          metadata: {
            ...finalConfig.metadata,
            cached: true,
            deduplicated: false,
          },
        } as AxiosResponse<T>;

        this.cacheResponse(finalConfig, response);
        return response;
      }
    }

    // Check for deduplication
    if (this.shouldDeduplicate(finalConfig)) {
      return this.addToQueue(finalConfig);
    }

    // Add to pending requests
    const key = this.getCacheKey(finalConfig);
    this.pendingRequests.add(key);

    try {
      const response = await this.instance.request(finalConfig);
      
      // Remove from pending requests
      this.pendingRequests.delete(key);
      
      // Cache response if applicable
      if (this.shouldCache(finalConfig)) {
        this.cacheResponse(finalConfig, response);
      }
      
      return response;
    } catch (error) {
      // Remove from pending requests
      this.pendingRequests.delete(key);
      
      // Retry if applicable
      if (this.config.retryCondition?.(error as AxiosError)) {
        return this.retryRequest<T>(finalConfig, error as AxiosError);
      }
      
      throw error;
    }
  }

  // HTTP methods
  public get<T = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>({ ...config, method: 'GET', url });
  };

  public post<T = (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>({ ...config, method: 'POST', url, data });
  };

  public put<T = (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  };

  public patch<T = (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  };

  public delete<T = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  // Utility methods
  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  public updateConfig(config: Partial<HTTPClientConfig>): void {
    this.config = { ...this.config, ...config };
    this.instance.defaults = { ...this.instance.defaults, ...config };
  }

  public getConfig(): HTTPClientConfig {
    return this.config;
  }

  // Cache management
  public clearCache(): void {
    this.cache.clear();
  }

  public getCacheSize(): number {
    return this.cache.size;
  }

  public getCacheEntries(): Array<{ key: string; entry: RequestCacheEntry }> {
    return Array.from(this.cache.entries()).map(([key, entry]) => ({ key, entry }));
  }

  // Queue management
  public clearQueue(): void {
    this.requestQueue.clear();
    this.pendingRequests.clear();
  }

  public getQueueSize(): number {
    return this.requestQueue.size;
  }

  public getQueueEntries(): Array<{ key: string; queue: RequestQueueEntry[] }> {
    return Array.from(this.requestQueue.entries()).map(([key, queue]) => ({ key, queue }));
  }

  // Retry management
  public setRetryCondition(condition: (error: AxiosError) => boolean): void {
    this.config.retryCondition = condition;
  }

  public setRetryDelay(delay: number): void {
    this.config.retryDelay = delay;
  }

  // Cache management
  public setCacheConfig(enabled: boolean, ttl?: number): void {
    this.config.cache = enabled;
    if (ttl !== undefined) {
      this.config.cacheTTL = ttl;
    }
  }

  public setDeduplication(enabled: boolean): void {
    this.config.deduplication = enabled;
  }

  // Error handling
  public setErrorHandler(handler: (error: AxiosError) => void): void {
    this.config.interceptors = {
      ...this.config.interceptors,
      responseError: handler,
    };
  }

  // Success handler
  public setSuccessHandler(handler: (response: AxiosResponse) => AxiosResponse => {
    this.config.interceptors = {
      ...this.config.interceptors,
      response: handler,
    };
    return handler;
  }

  // Transform handlers
  public setRequestTransformer(transformer: (data: any) => any): void {
    this.config.transformRequest = transformer;
  }

  public setResponseTransformer(transformer: (data: any) => any): void {
    this.config.transformResponse = transformer;
  }

  // Status validation
  public setStatusValidator(validator: (status: number) => boolean): void {
    this.config.validateStatus = validator;
  }

  // Headers management
  public setDefaultHeaders(headers: Record<string, string>): void {
    this.config.headers = { ...this.config.headers, ...headers };
    this.instance.defaults.headers = { ...this.instance.defaults.headers, ...headers };
  }

  public addDefaultHeader(key: string, value: string): void {
    this.config.headers[key] = value;
    this.instance.defaults.headers[key] = value;
  }

  public removeDefaultHeader(key: string): void {
    delete this.config.headers[key];
    delete this.instance.defaults.headers[key];
  }

  // Params management
  public setDefaultParams(params: Record<string, any>): void {
    this.config.params = { ...this.config.params, ...params };
    this.instance.defaults.params = { ...this.instance.defaults.params, ...params };
  }

  // Instance management
  public createInstance(config?: Partial<HTTPClientConfig>): HTTPClient {
    return new HTTPClient(config);
  }

  // Clone instance
  public clone(): HTTPClient {
    const cloned = new HTTPClient(this.config);
    cloned.instance = axios.create(this.config);
    return cloned;
  }
}

// Create default instance
export const httpClient = new HTTPClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  cache: true,
  cacheTTL: 5 * 60 * 1000, // 5 minutes
  deduplication: true,
  interceptors: {
    request: (config) => {
      // Add request ID for debugging
      config.headers['X-Request-ID'] = Math.random().toString(36).substr(2, 9);
      return config;
    },
    response: (response) => {
      // Add response metadata
      response.headers['X-Response-Time'] = response.config.metadata?.duration?.toString() || '0';
      return response;
    },
    responseError: (error) => {
      // Log error details
      if (error.response) {
        console.error(`HTTP Error ${error.response.status}: ${error.config.method?.toUpperCase()} ${error.config.url}`, {
          status: error.response.status,
          statusText: error.response.statusText,
          url: error.config.url,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else {
        console.error('HTTP Error:', error.message);
      }
      return error;
    },
  },
});

// React hook for HTTP client
export const useHTTPClient = (config?: Partial<HTTPClientConfig>) => {
  const [client, setClient] = useState<HTTPClient>(() => 
    config ? new HTTPClient(config) : httpClient
  );

  // Update client when config changes
  useEffect(() => {
    if (config) {
      const newClient = new HTTPClient(config);
      setClient(newClient);
    }
  }, [config]);

  return {
    client,
    updateConfig: client.updateConfig.bind(client),
    getAxiosInstance: client.getAxiosInstance.bind(client),
    clone: client.clone.bind(client),
  };
};

// API endpoints
export const apiEndpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  // Users
  users: {
    list: '/users',
    get: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    me: '/users/me',
  },
  // Courses
  courses: {
    list: '/courses',
    get: (id: string) => `/courses/${id}`,
    create: '/courses',
    update: (id: string) => `/courses/${id}`,
    delete: (id: string) => `/courses/${id}`,
    enroll: (id: string) => `/courses/${id}/enroll`,
    unenroll: (id: string) => `/courses/${id}/unenroll`,
    progress: (id: string) => `/courses/${id}/progress`,
    reviews: (id: string) => `/courses/${id}/reviews`,
    search: '/courses/search',
    filters: '/courses/filters',
  },
  // Notifications
  notifications: {
    list: '/notifications',
    get: (id: string) => `/notifications/${id}`,
    markAsRead: (id: string) => `/notifications/${id}/read`,
    delete: (id: string) => `/notifications/${id}`,
    markAllAsRead: '/notifications/mark-all-read',
    settings: '/notifications/settings',
  },
  // Dashboard
  dashboard: {
    overview: '/dashboard',
    stats: '/dashboard/stats',
    activity: '/dashboard/activity',
    analytics: '/dashboard/analytics',
  },
  // Settings
  settings: {
    profile: '/settings/profile',
    preferences: '/settings/preferences',
    notifications: '/settings/notifications',
    security: '/settings/security',
    accessibility: '/settings/accessibility',
  },
};

// API service
export const apiService = {
  // Auth
  login: (credentials: { email: string; password: string }) => {
    return httpClient.post(apiEndpoints.auth.login, credentials);
  },
  logout: () => {
    return httpClient.post(apiEndpoints.auth.logout);
  },
  register: (userData: any) => {
    return httpClient.post(apiEndpoints.auth.register, userData);
  },
  refreshToken: () => {
    return httpClient.post(apiEndpoints.auth.refresh);
  },
  getProfile: () => {
    return httpClient.get(apiEndpoints.auth.profile);
  },
  updateProfile: (data: any) => {
    return httpClient.put(apiEndpoints.auth.profile, data);
  },
  forgotPassword: (email: string) => {
    return httpClient.post(apiEndpoints.auth.forgotPassword, { email });
  },
  resetPassword: (token: string, password: string) => {
    return httpClient.post(apiEndpoints.auth.resetPassword, { token, password });
  },

  // Users
  getUsers: () => {
    return httpClient.get(apiEndpoints.users.list);
  },
  getUser: (id: string) => {
    return httpClient.get(apiEndpoints.users.get(id));
  },
  createUser: (userData: any) => {
    return httpClient.post(apiEndpoints.users.create, userData);
  },
  updateUser: (id: string, userData: any) => {
    return httpClient.put(apiEndpoints.users.update(id), userData);
  },
  deleteUser: (id: string) => {
    return httpClient.delete(apiEndpoints.users.delete(id));
  },
  getCurrentUser: () => {
    return httpClient.get(apiEndpoints.users.me);
  },

  // Courses
  getCourses: (params?: any) => {
    return httpClient.get(apiEndpoints.courses.list, { params });
  },
  getCourse: (id: string) => {
    return httpClient.get(apiEndpoints.courses.get(id));
  },
  createCourse: (courseData: any) => {
    return httpClient.post(apiEndpoints.courses.create, courseData);
  },
  updateCourse: (id: string, courseData: any) => {
    return httpClient.put(apiEndpoints.courses.update(id), courseData);
  },
  deleteCourse: (id: string) => {
    return httpClient.delete(apiEndpoints.courses.delete(id));
  },
  enrollInCourse: (id: string) => {
    return httpClient.post(apiEndpoints.courses.enroll(id));
  },
  unenrollFromCourse: (id: string) => {
    return httpClient.post(apiEndpoints.courses.unenroll(id));
  },
  getCourseProgress: (id: string) => {
    return httpClient.get(apiEndpoints.courses.progress(id));
  },
  getCourseReviews: (id: string) => {
    return httpClient.get(apiEndpoints.courses.reviews(id));
  },
  searchCourses: (params: any) => {
    return httpClient.get(apiEndpoints.courses.search, { params });
  },
  getCourseFilters: () => {
    return httpClient.get(apiEndpoints.courses.filters);
  },

  // Notifications
  getNotifications: () => {
    return httpClient.get(apiEndpoints.notifications.list);
  },
  getNotification: (id: string) => {
    return httpClient.get(apiEndpoints.notifications.get(id));
  },
  markNotificationAsRead: (id: string) => {
    return httpClient.post(apiEndpoints.notifications.markAsRead(id));
  },
  deleteNotification: (id: string) => {
    return httpClient.delete(apiEndpoints.notifications.delete(id));
  },
  markAllNotificationsAsRead: () => {
    return httpClient.post(apiEndpoints.notifications.markAllAsRead);
  },
  getNotificationSettings: () => {
    return httpClient.get(apiEndpoints.notifications.settings);
  },

  // Dashboard
  getDashboardOverview: () => {
    return httpClient.get(apiEndpoints.dashboard.overview);
  },
  getDashboardStats: () => {
    return httpClient.get(apiEndpoints.dashboard.stats);
  },
  getDashboardActivity: () => {
    return httpClient.get(apiEndpoints.dashboard.activity);
  },
  getDashboardAnalytics: () => {
    return httpClient.get(apiEndpoints.dashboard.analytics);
  },

  // Settings
  getSettingsProfile: () => {
    return httpClient.get(apiEndpoints.settings.profile);
  },
  updateSettingsProfile: (data: any) => {
    return httpClient.put(apiEndpoints.settings.profile, data);
  },
  getSettingsNotifications: () => {
    return httpClient.get(apiEndpoints.notifications.settings);
  },
  updateSettingsNotifications: (data: any) => {
    return httpClient.put(apiEndpoints.notifications.settings, data);
  },
  getSettingsSecurity: () => {
    return httpClient.get(apiEndpoints.settings.security);
  },
  getSettingsAccessibility: () => {
    return httpClient.get(apiEndpoints.settings.accessibility);
  },
};

// Error handling utilities
export const errorHandling = {
  // Handle API errors
  handleApiError: (error: any): string => {
    if (error.response) {
      const status = error.response.status;
      const statusText = error.response.statusText;
      const url = error.config?.url;
      
      switch (status) {
        case 400:
          return 'البيانات المرسالة غير صحيحة';
        case 401:
          return 'غير مصرح بهذه الصفحة';
        case 403:
          return 'غير مصرح بهذه الصفحة';
        case 404:
          return 'الصفحة غير موجودة';
        case 405:
          return 'الطريقة غير مسموح';
        case 409:
          return 'تم تجاوز الحصة المسموح';
        case 422:
          return 'البيانات غير مقبول بالصيغة';
        case 429:
          return 'ممنع الوصول إلى هذا المورد';
        case 500:
          return 'خطأ في الخادم';
        default:
          return `خطأ في الاتصال (${status} ${statusText})`;
      }
    } else if (error.code === 'ECONNABORT') {
      return 'لا يمكن الاتصال بالخادم';
    } else if (error.code === 'NETWORK_ERROR') {
      return 'خطأ في الشبكة';
    } else {
      return error.message || 'حدث خطأ غير متوقع';
    }
  },

  // Handle network errors
  handleNetworkError: (error: any): string => {
    if (error.code === 'ECONNABORT') {
      return 'لا يمكن الاتصال بالخادم';
    } else if (error.code === 'NETWORK_ERROR') {
      return 'خطأ في الشبكة';
    } else if (error.name === 'AbortError') {
      return 'تم إلغاء الطلب';
    } else {
      return error.message || 'خطأ في الشبكة';
    }
  },

  // Handle timeout errors
  handleTimeoutError: (error: any): string => {
    return 'استغرق الوقت المستغرق';
  },

  // Handle cancellation errors
  handleCancellationError: (error: any): string => {
    return 'تم إلغاء الطلب';
  },

  // Generic error handler
  handleError: (error: any, fallback?: string): string => {
    if (error?.isAxiosError) {
      return this.handleApiError(error);
    } else if (error?.code === 'ECONNABORT' || error?.code === 'NETWORK_ERROR') {
      return this.handleNetworkError(error);
    } else if (error?.name === 'AbortError') {
      return this.handleCancellationError(error);
    } else if (error?.code === 'ECONNABORT') {
      return this.handleTimeoutError(error);
    } else {
      return fallback || error?.message || 'حدث خطأ غير متوقع';
    }
  },
};

// Response utilities
export const responseUtils = {
  // Check if response is successful
  isSuccess: (response: AxiosResponse): boolean => {
    return response.status >= 200 && response.status < 300;
  },

  // Get error message from response
  getErrorMessage: (response: AxiosResponse): string => {
    if (response.data?.message) {
      return response.data.message;
    }
    return response.statusText || 'Unknown error';
  },

  // Get data from response
  getData: <T>(response: AxiosResponse<T>): T => {
    return response.data;
  },

  // Check if response has data
  hasData: (response: AxiosResponse): boolean => {
    return !!response.data;
  },

  // Get status code
  getStatusCode: (response: AxiosResponse): number => {
    return response.status;
  },

  // Get status text
  getStatusText: (response: AxiosResponse): string => {
    return response.statusText;
  },

  // Format response for logging
  formatResponse: (response: AxiosResponse): string => {
    const { status, statusText, config } = response;
    const method = config?.method?.toUpperCase() || 'UNKNOWN';
    const url = config?.url || 'UNKNOWN';
    const duration = response.config?.metadata?.duration || 0;
    
    return `${method} ${status} ${statusText} (${url}) - ${duration}ms`;
  },
};

// Request utilities
export const requestUtils = {
  // Create request config
  createConfig: (config: Partial<AxiosRequestConfig>): AxiosRequestConfig => {
    return {
      ...httpClient.getConfig(),
      ...config,
    };
  },

  // Add authentication headers
  addAuth: (config: AxiosRequestConfig, token: string): AxiosRequestConfig => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  },

  // Add CSRF token
  addCSRFToken: (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = csrfProtectionUtils.getTokenHeader(config.headers || {});
    if (token) {
      config.headers = { ...config.headers, ...token };
    }
    return config;
  },

  // Add content type
  addContentType: (config: AxiosRequestConfig, contentType: string): AxiosRequestConfig => {
    config.headers = {
      ...config.headers,
      'Content-Type': contentType,
    };
    return config;
  },

  // Add accept language
  addAcceptLanguage: (config: AxiosRequestConfig, language: string): AxiosRequestConfig => {
    config.headers = {
      ...config.headers,
      'Accept-Language': language,
    };
    return config;
  },

  // Add custom headers
  addCustomHeaders: (config: AxiosRequestConfig, headers: Record<string, string>): AxiosRequestConfig => {
    config.headers = {
      ...config.headers,
      ...headers,
    };
    return config;
  },

  // Add timeout
  addTimeout: (config: AxiosRequestConfig, timeout: number): AxiosRequestConfig => {
    config.timeout = timeout;
    return config;
  },

  // Add retry configuration
  addRetry: (config: AxiosRequestConfig, retries: number, delay?: number): AxiosRequestConfig => {
    config.retries = retries;
    if (delay) {
      config.retryDelay = delay;
    }
    return config;
  },
};

// Cache utilities
export const cacheUtils = {
  // Clear cache
  clear: () => {
    httpClient.clearCache();
  },

  // Get cache size
  getSize: () => {
    return httpClient.getCacheSize();
  },

  // Get cache entries
  getEntries: () => {
    return httpClient.getCacheEntries();
  },

  // Clear expired entries
  clearExpired: () => {
    const entries = httpClient.getCacheEntries();
    const now = Date.now();
    
    entries.forEach(({ key, entry }) => {
      if (entry.expires < now) {
        httpClient.clearCache();
        return;
      }
    });
  },

  // Get cache statistics
  getStats: () => {
    const size = httpClient.getCacheSize();
    const entries = httpClient.getCacheEntries();
    
    return {
      size,
      entries: entries.length,
      expired: entries.filter(entry => entry.expires < Date.now()).length,
      active: entries.filter(entry => entry.expires > Date.now()).length,
    };
  },
};

// Queue utilities
export const queueUtils = {
  // Clear queue
  clear: () => {
    httpClient.clearQueue();
  },

  // Get queue size
  getSize: () => {
    return httpClient.getQueueSize();
  },

  // Get queue entries
  getEntries: () => {
    return httpClient.getQueueEntries();
  },

  // Clear expired queue entries
  clearExpired: () => {
    const entries = httpClient.getQueueEntries();
    const now = Date.now();
    
    entries.forEach(({ key, queue }) => {
      if (queue.some(entry => entry.timestamp < now - 30000)) {
        // Remove entries older than 30 seconds
        httpClient.clearQueue();
        return;
      }
    });
  },
};

// Export default instance and utilities
export default httpClient;
export { apiService, errorHandling, responseUtils, requestUtils, cacheUtils, queueUtils, apiEndpoints };
export type { HTTPClientConfig, RequestCacheEntry, RequestQueueEntry };

export default httpClient;
