import { ApiResponse, PaginatedResponse } from '@/types/common';

// API Client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.lumo.com';
const API_VERSION = 'v1';

// HTTP Client class with proper typing
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = `${baseURL}/api/${API_VERSION}`;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        0,
        { originalError: error }
      );
    }
  }

  // HTTP Methods with proper typing
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    return this.request<T>(url.pathname + url.search);
  }

  async post<T>(
    endpoint: string, 
    data?: Record<string, unknown>,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async put<T>(
    endpoint: string, 
    data?: Record<string, unknown>,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async patch<T>(
    endpoint: string, 
    data?: Record<string, unknown>,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  // File upload with proper typing
  async upload<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, unknown>,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new ApiError('Invalid JSON response', xhr.status));
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText);
            reject(new ApiError(errorData.message || 'Upload failed', xhr.status, errorData));
          } catch {
            reject(new ApiError('Upload failed', xhr.status));
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new ApiError('Network error during upload', 0));
      });

      xhr.open('POST', `${this.baseURL}${endpoint}`);
      
      // Set headers (excluding Content-Type as it's set automatically for FormData)
      Object.entries(this.defaultHeaders).forEach(([key, value]) => {
        if (key !== 'Content-Type') {
          xhr.setRequestHeader(key, value);
        }
      });

      xhr.send(formData);
    });
  }

  // Authentication methods
  setAuthToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.defaultHeaders.Authorization;
  }

  // Request interceptor for logging
  private logRequest(method: string, url: string, data?: unknown): void {
    if (process.env.NODE_ENV === 'development') {
      // Use debug logging instead of console.log for better filtering
      if (typeof window !== 'undefined' && (window as any).__lumo_debug) {
        console.debug(`🚀 API Request: ${method} ${url}`, data);
      }
    }
  }

  // Response interceptor for logging
  private logResponse(method: string, url: string, response: unknown): void {
    if (process.env.NODE_ENV === 'development') {
      // Use debug logging instead of console.log for better filtering
      if (typeof window !== 'undefined' && (window as any).__lumo_debug) {
        console.debug(`✅ API Response: ${method} ${url}`, response);
      }
    }
  }
}

// Custom Error class for API errors
export class ApiError extends Error {
  public status: number;
  public data?: Record<string, unknown>;

  constructor(message: string, status: number = 0, data?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// API endpoints with proper typing
export const apiEndpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  
  // Courses
  courses: {
    list: '/courses',
    detail: (id: string) => `/courses/${id}`,
    enroll: (id: string) => `/courses/${id}/enroll`,
    unenroll: (id: string) => `/courses/${id}/unenroll`,
    progress: (id: string) => `/courses/${id}/progress`,
    chapters: (id: string) => `/courses/${id}/chapters`,
    lessons: (courseId: string, chapterId: string) => `/courses/${courseId}/chapters/${chapterId}/lessons`,
    reviews: (id: string) => `/courses/${id}/reviews`,
    certificate: (id: string) => `/courses/${id}/certificate`,
  },
  
  // Users
  users: {
    profile: '/users/profile',
    preferences: '/users/preferences',
    notifications: '/users/notifications',
    achievements: '/users/achievements',
    progress: '/users/progress',
    certificates: '/users/certificates',
    bookmarks: '/users/bookmarks',
    notes: '/users/notes',
  },
  
  // Search
  search: {
    courses: '/search/courses',
    suggestions: '/search/suggestions',
    filters: '/search/filters',
  },
  
  // Categories
  categories: {
    list: '/categories',
    detail: (id: string) => `/categories/${id}`,
    courses: (id: string) => `/categories/${id}/courses`,
  },
  
  // Notifications
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
    archive: (id: string) => `/notifications/${id}/archive`,
    settings: '/notifications/settings',
  },
  
  // Analytics
  analytics: {
    dashboard: '/analytics/dashboard',
    courseStats: (id: string) => `/analytics/courses/${id}`,
    userProgress: '/analytics/progress',
    engagement: '/analytics/engagement',
  },
} as const;

// Create singleton instance
export const apiClient = new ApiClient();

// Export typed API methods
export const api = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post('/auth/login', credentials),
    register: (userData: { 
      firstName: string; 
      lastName: string; 
      email: string; 
      password: string;
    }) => apiClient.post('/auth/register', userData),
    logout: () => apiClient.post('/auth/logout'),
    refreshToken: () => apiClient.post('/auth/refresh'),
    getProfile: () => apiClient.get('/auth/profile'),
    updateProfile: (data: Partial<{ 
      firstName: string; 
      lastName: string; 
      email: string; 
      avatar?: string;
    }>) => apiClient.patch('/auth/profile', data),
    forgotPassword: (email: string) => 
      apiClient.post('/auth/forgot-password', { email }),
    resetPassword: (data: { token: string; password: string }) =>
      apiClient.post('/auth/reset-password', data),
  },

  // Courses
  courses: {
    getList: (params?: {
      page?: number;
      limit?: number;
      category?: string;
      level?: string;
      search?: string;
    }) => apiClient.get('/courses', params),
    getById: (id: string) => apiClient.get(`/courses/${id}`),
    enroll: (id: string) => apiClient.post(`/courses/${id}/enroll`),
    unenroll: (id: string) => apiClient.delete(`/courses/${id}/unenroll`),
    getProgress: (id: string) => apiClient.get(`/courses/${id}/progress`),
    getChapters: (id: string) => apiClient.get(`/courses/${id}/chapters`),
    getLessons: (courseId: string, chapterId: string) => 
      apiClient.get(`/courses/${courseId}/chapters/${chapterId}/lessons`),
    getReviews: (id: string, params?: { page?: number; limit?: number }) =>
      apiClient.get(`/courses/${id}/reviews`, params),
    addReview: (id: string, review: { rating: number; comment: string }) =>
      apiClient.post(`/courses/${id}/reviews`, review),
    getCertificate: (id: string) => apiClient.get(`/courses/${id}/certificate`),
  },

  // Users
  users: {
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (data: Partial<{
      firstName: string;
      lastName: string;
      bio: string;
      avatar?: string;
    }>) => apiClient.patch('/users/profile', data),
    getPreferences: () => apiClient.get('/users/preferences'),
    updatePreferences: (preferences: Record<string, unknown>) =>
      apiClient.patch('/users/preferences', preferences),
    getNotifications: (params?: { page?: number; limit?: number; unread?: boolean }) =>
      apiClient.get('/users/notifications', params),
    getAchievements: () => apiClient.get('/users/achievements'),
    getProgress: () => apiClient.get('/users/progress'),
    getCertificates: () => apiClient.get('/users/certificates'),
    getBookmarks: () => apiClient.get('/users/bookmarks'),
    addBookmark: (courseId: string) => 
      apiClient.post('/users/bookmarks', { courseId }),
    removeBookmark: (courseId: string) => 
      apiClient.delete(`/users/bookmarks/${courseId}`),
    getNotes: (params?: { courseId?: string }) =>
      apiClient.get('/users/notes', params),
    createNote: (note: {
      title: string;
      content: string;
      courseId?: string;
      lessonId?: string;
      tags?: string[];
      isPublic?: boolean;
    }) => apiClient.post('/users/notes', note),
    updateNote: (id: string, note: Partial<{
      title: string;
      content: string;
      tags?: string[];
      isPublic?: boolean;
    }>) => apiClient.patch(`/users/notes/${id}`, note),
    deleteNote: (id: string) => apiClient.delete(`/users/notes/${id}`),
  },

  // Search
  search: {
    courses: (query: {
      q?: string;
      category?: string;
      level?: string;
      price?: string;
      page?: number;
      limit?: number;
    }) => apiClient.get('/search/courses', query),
    suggestions: (q: string) => apiClient.get('/search/suggestions', { q }),
    getFilters: () => apiClient.get('/search/filters'),
  },

  // Categories
  categories: {
    getList: () => apiClient.get('/categories'),
    getById: (id: string) => apiClient.get(`/categories/${id}`),
    getCourses: (id: string, params?: { page?: number; limit?: number }) =>
      apiClient.get(`/categories/${id}/courses`, params),
  },

  // Notifications
  notifications: {
    getList: (params?: { 
      page?: number; 
      limit?: number; 
      type?: string; 
      unread?: boolean;
    }) => apiClient.get('/notifications', params),
    markAsRead: (id: string) => apiClient.post(`/notifications/${id}/read`),
    markAllAsRead: () => apiClient.post('/notifications/read-all'),
    archive: (id: string) => apiClient.post(`/notifications/${id}/archive`),
    getSettings: () => apiClient.get('/notifications/settings'),
    updateSettings: (settings: Record<string, unknown>) =>
      apiClient.patch('/notifications/settings', settings),
  },

  // File upload
  upload: {
    image: (file: File, onProgress?: (progress: number) => void) =>
      apiClient.upload('/upload/image', file, undefined, onProgress),
    video: (file: File, onProgress?: (progress: number) => void) =>
      apiClient.upload('/upload/video', file, undefined, onProgress),
    document: (file: File, onProgress?: (progress: number) => void) =>
      apiClient.upload('/upload/document', file, undefined, onProgress),
  },
};

export default api;
