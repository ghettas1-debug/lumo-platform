'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';

// Store interfaces
export interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  
  // Layout
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  headerHeight: number;
  footerHeight: number;
  
  // Navigation
  currentPage: string;
  previousPage: string;
  navigationHistory: string[];
  
  // Modals
  activeModal: string | null;
  modalStack: string[];
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Loading
  loading: Record<string, boolean>;
  globalLoading: boolean;
  
  // Error Handling
  errors: Record<string, string>;
  globalError: string | null;
  
  // User Preferences
  language: string;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  animationsEnabled: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  
  // Search
  searchQuery: string;
  searchFilters: Record<string, any>;
  searchResults: any[];
  
  // Pagination
  currentPageIndex: number;
  itemsPerPage: number;
  totalItems: number;
  
  // Sorting
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  
  // Filters
  activeFilters: Record<string, any>;
  
  // Forms
  formStates: Record<string, any>;
  formErrors: Record<string, Record<string, string>>;
  formTouched: Record<string, Record<string, boolean>>;
  
  // Selection
  selectedItems: Record<string, any[]>;
  selectedCount: Record<string, number>;
  
  // View Modes
  viewMode: 'grid' | 'list' | 'table' | 'card';
  
  // UI State
  isOnline: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  
  // Accessibility
  keyboardNavigation: boolean;
  screenReaderActive: boolean;
  focusVisible: boolean;
  
  // Performance
  performanceMode: 'fast' | 'balanced' | 'battery';
  
  // Debug
  debugMode: boolean;
  showDevTools: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  autoClose?: boolean;
  duration?: number;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  }>;
}

// UI Store
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        // Theme
        theme: 'system',
        colorScheme: 'blue',
        setTheme: (theme: UIState['theme']) => set({ theme }),
        setColorScheme: (colorScheme: UIState['colorScheme']) => set({ colorScheme }),
        
        // Layout
        sidebarOpen: true,
        sidebarCollapsed: false,
        headerHeight: 64,
        footerHeight: 48,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        setHeaderHeight: (height: number) => set({ headerHeight: height }),
        setFooterHeight: (height: number) => set({ footerHeight: height }),
        
        // Navigation
        currentPage: '/',
        previousPage: '',
        navigationHistory: [],
        setCurrentPage: (page: string) => {
          set((state) => ({
            previousPage: state.currentPage,
            currentPage: page,
            navigationHistory: [...state.navigationHistory.slice(-9), page],
          }));
        },
        goBack: () => {
          set((state) => {
            const history = state.navigationHistory;
            if (history.length > 1) {
              const previousPage = history[history.length - 2];
              return {
                currentPage: previousPage,
                previousPage: state.currentPage,
                navigationHistory: history.slice(0, -1),
              };
            }
            return state;
          });
        },
        
        // Modals
        activeModal: null,
        modalStack: [],
        openModal: (modalId: string) => {
          set((state) => ({
            activeModal: modalId,
            modalStack: [...state.modalStack, modalId],
          }));
        },
        closeModal: (modalId?: string) => {
          if (modalId) {
            set((state) => {
              const index = state.modalStack.indexOf(modalId);
              if (index > -1) {
                const newStack = [...state.modalStack];
                newStack.splice(index, 1);
                return {
                  modalStack: newStack,
                  activeModal: newStack.length > 0 ? newStack[newStack.length - 1] : null,
                };
              }
            });
          } else {
            set((state) => ({
              activeModal: null,
              modalStack: [],
            }));
        },
        closeAllModals: () => {
          set({
            activeModal: null,
            modalStack: [],
          });
        },
        
        // Notifications
        notifications: [],
        unreadCount: 0,
        addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => {
          const newNotification: Notification = {
            ...notification,
            id: notification.id || Math.random().toString(36).substr(2, 9),
            timestamp: notification.timestamp || Date.now(),
            read: false,
          };
          
          set((state) => ({
            notifications: [...state.notifications, newNotification],
            unreadCount: state.unreadCount + 1,
          }));
          
          // Auto-close notification
          if (newNotification.autoClose !== false) {
            const duration = newNotification.duration || 5000;
            setTimeout(() => {
              useUIStore.getState().removeNotification(newNotification.id);
            }, duration);
          }
        },
        removeNotification: (id: string) => {
          set((state) => {
            const notification = state.notifications.find(n => n.id === id);
            if (notification && !notification.read) {
              return {
                notifications: state.notifications.filter(n => n.id !== id),
                unreadCount: Math.max(0, state.unreadCount - 1),
              };
            }
            return {
              notifications: state.notifications.filter(n => n.id !== id),
            };
          });
        },
        markNotificationAsRead: (id: string) => {
          set((state) => {
            const notifications = state.notifications.map(n =>
              n.id === id ? { ...n, read: true } : n
            );
            const unreadCount = notifications.filter(n => !n.read).length;
            return { notifications, unreadCount };
          });
        },
        markAllNotificationsAsRead: () => {
          set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, read: true })),
            unreadCount: 0,
          }));
        },
        clearNotifications: () => {
          set({
            notifications: [],
            unreadCount: 0,
          });
        },
        
        // Loading
        loading: {},
        globalLoading: false,
        setLoading: (key: string, isLoading: boolean) => {
          set((state) => ({
            loading: { ...state.loading, [key]: isLoading },
            globalLoading: Object.values(state.loading).some(loading => loading) || isLoading,
          }));
        },
        setGlobalLoading: (isLoading: boolean) => set({ globalLoading: isLoading }),
        
        // Error Handling
        errors: {},
        globalError: null,
        setError: (key: string, error: string) => {
          set((state) => ({
            errors: { ...state.errors, [key]: error },
            globalError: Object.values(state.errors).some(e => e) || error ? error : null,
          }));
        },
        clearError: (key: string) => {
          set((state) => {
            const newErrors = { ...state.errors };
            delete newErrors[key];
            return {
              errors: newErrors,
              globalError: Object.values(newErrors).some(e => e) ? newErrors[key] : null,
            };
          });
        },
        clearAllErrors: () => {
          set({
            errors: {},
            globalError: null,
          });
        },
        setGlobalError: (error: string) => set({ globalError: error }),
        
        // User Preferences
        language: 'ar',
        fontSize: 'medium',
        animationsEnabled: true,
        reducedMotion: false,
        highContrast: false,
        setLanguage: (language: string) => set({ language }),
        setFontSize: (fontSize: UIState['fontSize']) => set({ fontSize }),
        setAnimationsEnabled: (enabled: boolean) => set({ animationsEnabled: enabled }),
        setReducedMotion: (enabled: boolean) => set({ reducedMotion: enabled }),
        setHighContrast: (enabled: boolean) => set({ highContrast: enabled }),
        
        // Search
        searchQuery: '',
        searchFilters: {},
        searchResults: [],
        setSearchQuery: (query: string) => set({ searchQuery: query }),
        setSearchFilters: (filters: Record<string, any>) => set({ searchFilters: filters }),
        setSearchResults: (results: any[]) => set({ searchResults: results }),
        clearSearch: () => set({
          searchQuery: '',
          searchFilters: {},
          searchResults: [],
        }),
        
        // Pagination
        currentPageIndex: 0,
        itemsPerPage: 10,
        totalItems: 0,
        setCurrentPageIndex: (index: number) => set({ currentPageIndex: index }),
        setItemsPerPage: (count: number) => set({ itemsPerPage: count }),
        setTotalItems: (count: number) => set({ totalItems: count }),
        nextPage: () => {
          set((state) => ({
            currentPageIndex: Math.min(
              state.currentPageIndex + 1,
              Math.ceil(state.totalItems / state.itemsPerPage) - 1
            ),
          }));
        },
        previousPage: () => {
          set((state) => ({
            currentPageIndex: Math.max(0, state.currentPageIndex - 1),
          }));
        },
        goToPage: (index: number) => set({ currentPageIndex: index }),
        resetPagination: () => set({
          currentPageIndex: 0,
          itemsPerPage: 10,
          totalItems: 0,
        }),
        
        // Sorting
        sortBy: 'createdAt',
        sortOrder: 'desc',
        setSortBy: (sortBy: string) => set({ sortBy }),
        setSortOrder: (sortOrder: UIState['sortOrder']) => set({ sortOrder }),
        toggleSortOrder: () => {
          set((state) => ({
            sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
          }));
        },
        
        // Filters
        activeFilters: {},
        setActiveFilters: (filters: Record<string, any>) => set({ activeFilters: filters }),
        addFilter: (key: string, value: any) => {
          set((state) => ({
            activeFilters: { ...state.activeFilters, [key]: value },
          }));
        },
        removeFilter: (key: string) => {
          set((state) => {
            const newFilters = { ...state.activeFilters };
            delete newFilters[key];
            return { activeFilters: newFilters };
          });
        },
        clearFilters: () => set({ activeFilters: {} }),
        
        // Selection
        selectedItems: {},
        selectedCount: {},
        setSelectedItems: (key: string, items: any[]) => {
          set((state) => ({
            selectedItems: { ...state.selectedItems, [key]: items },
            selectedCount: { ...state.selectedCount, [key]: items.length },
          }));
        },
        toggleSelection: (key: string, item: any) => {
          set((state) => {
            const currentItems = state.selectedItems[key] || [];
            const isSelected = currentItems.some(i => i.id === item.id);
            let newItems;
            
            if (isSelected) {
              newItems = currentItems.filter(i => i.id !== item.id);
            } else {
              newItems = [...currentItems, item];
            }
            
            return {
              selectedItems: { ...state.selectedItems, [key]: newItems },
              selectedCount: { ...state.selectedCount, [key]: newItems.length },
            };
          });
        },
        clearSelection: (key: string) => {
          set((state) => ({
            selectedItems: { ...state.selectedItems, [key]: [] },
            selectedCount: { ...state.selectedCount, [key]: 0 },
          }));
        },
        clearAllSelections: () => {
          set({
            selectedItems: {},
            selectedCount: {},
          });
        },
        
        // View Modes
        viewMode: 'grid',
        setViewMode: (mode: UIState['viewMode']) => set({ viewMode: mode }),
        
        // UI State
        isOnline: navigator.onLine,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        setIsOnline: (online: boolean) => set({ isOnline: online }),
        setIsMobile: (mobile: boolean) => set({ isMobile: mobile }),
        setIsTablet: (tablet: boolean) => set({ isTablet: }),
        setIsDesktop: (desktop: boolean) => set({ isDesktop: desktop }),
        
        // Accessibility
        keyboardNavigation: false,
        screenReaderActive: false,
        focusVisible: false,
        setKeyboardNavigation: (enabled: boolean) => set({ keyboardNavigation: enabled }),
        setScreenReaderActive: (active: boolean) => set({ screenReaderActive: active }),
        setFocusVisible: (visible: boolean) => set({ focusVisible: visible }),
        
        // Performance
        performanceMode: 'balanced',
        setPerformanceMode: (mode: UIState['performanceMode']) => set({ performanceMode: mode }),
        
        // Debug
        debugMode: false,
        showDevTools: false,
        setDebugMode: (enabled: boolean) => set({ debugMode: enabled }),
        setDevTools: (show: boolean) => set({ showDevTools: show }),
        
        // Reset
        reset: () => ({
          theme: 'system',
          colorScheme: 'blue',
          sidebarOpen: true,
          sidebarCollapsed: false,
          headerHeight: 64,
          footerHeight: 48,
          currentPage: '/',
          previousPage: '',
          navigationHistory: [],
          activeModal: null,
          modalStack: [],
          notifications: [],
          unreadCount: 0,
          loading: {},
          globalLoading: false,
          errors: {},
          globalError: null,
          language: 'ar',
          fontSize: 'medium',
          animationsEnabled: true,
          reducedMotion: false,
          highContrast: false,
          searchQuery: '',
          searchFilters: {},
          searchResults: [],
          currentPageIndex: 0,
          itemsPerPage: 10,
          totalItems: 0,
          sortBy: 'createdAt',
          sortOrder: 'desc',
          activeFilters: {},
          selectedItems: {},
          selectedCount: {},
          viewMode: 'grid',
          isOnline: navigator.onLine,
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          keyboardNavigation: false,
          screenReaderActive: false,
          focusVisible: false,
          performanceMode: 'balanced',
          debugMode: false,
          showDevTools: false,
        }),
      }),
      {
        name: 'ui-store',
        storage: createJSONStorage(() => localStorage.getItem('ui-store')),
        partialize: (state) => ({
          // Only persist these fields
          theme: state.theme,
          colorScheme: state.colorScheme,
          language: state.language,
          fontSize: state.fontSize,
          animationsEnabled: state.animationsEnabled,
          reducedMotion: state.reducedMotion,
          highContrast: state.highContrast,
          sidebarOpen: state.sidebarOpen,
          sidebarCollapsed: state.sidebarCollapsed,
          viewMode: state.viewMode,
          performanceMode: state.performanceMode,
        }),
        version: 1,
      }
    )
  ),
    {
      name: 'ui-store',
    }
  )
);

// Auth Store
export interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'admin';
    permissions: string[];
    preferences: Record<string, any>;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        login: async (credentials: { email: string; password: string }) => {
          set({ isLoading: true, error: null });
          
          try {
            // Mock login logic - replace with actual API call
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            });
            
            if (response.ok) {
              const userData = await response.json();
              set({
                user: userData.user,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Login failed');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false,
              isAuthenticated: false,
            });
          }
        },
        logout: async () => {
          set({ isLoading: true, error: null });
          
          try {
            await fetch('/api/auth/logout', {
              method: 'POST',
            });
            
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Logout failed',
              isLoading: false,
            });
          }
        },
        register: async (userData: any) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await fetch('/api/auth/register', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });
            
            if (response.ok) {
              const data = await response.json();
              set({
                user: data.user,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Registration failed');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Registration failed',
              isLoading: false,
              isAuthenticated: false,
            });
          }
        },
        updateUser: async (userData: Partial<AuthState['user']>) => {
          if (!get().user) return;
          
          set({ isLoading: true, error: null });
          
          try {
            const response = await fetch('/api/auth/profile', {
              method: 'PUT',
              headers: {
                'Content-Type': 'export 'application/json',
              },
              body: JSON.stringify(userData),
            });
            
            if (response.ok) {
              const data = await response.json();
              set({
                user: { ...get().user, ...data.user },
                isLoading: false,
              });
            } else {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Update failed');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Update failed',
              isLoading: false,
            });
          }
        },
        clearError: () => set({ error: null }),
        reset: () => ({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }),
      }),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => localStorage.getItem('auth-store')),
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        }),
        version: 1,
      }
    )
  ),
    {
      name: 'auth-store',
    }
  )
);

// Course Store
export interface CourseState {
  courses: any[];
  currentCourse: any | null;
  enrolledCourses: any[];
  completedCourses: any[];
  favoriteCourses: any[];
  courseProgress: Record<string, number>;
  searchQuery: string;
  filters: {
    category: string;
    level: string;
    price: string;
    duration: string;
    rating: string;
    instructor: string;
    tags: string[];
  };
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  viewMode: 'grid' | 'list' | 'card';
  isLoading: boolean;
  error: string | null;
}

export const useCourseStore = create<CourseState>()(
  devtools(
    persist(
      (set, get) => ({
        courses: [],
        currentCourse: null,
        enrolledCourses: [],
        completedCourses: [],
        favoriteCourses: [],
        courseProgress: {},
        searchQuery: '',
        filters: {
          category: '',
          level: '',
          price: '',
          duration: '',
          rating: '',
          instructor: '',
          tags: [],
        },
        sortBy: 'createdAt',
        sortOrder: 'desc',
        viewMode: 'grid',
        isLoading: false,
        error: null,
        
        // Course actions
        setCourses: (courses: any[]) => set({ courses }),
        setCurrentCourse: (course: any) => set({ currentCourse: course }),
        enrollInCourse: (courseId: string) => {
          set((state) => {
            const course = state.courses.find((c: any) => c.id === courseId);
            if (course && !state.enrolledCourses.includes(courseId)) {
              return {
                enrolledCourses: [...state.enrolledCourses, courseId],
                courseProgress: {
                  ...state.courseProgress,
                  [courseId]: 0,
                },
              };
            }
            return state;
          });
        },
        markCourseAsCompleted: (courseId: string) => {
          set((state) => {
            if (!state.completedCourses.includes(courseId)) {
              return {
                completedCourses: [...state.completedCourses, courseId],
                courseProgress: {
                  ...state.courseProgress,
                  [courseId]: 100,
                },
              };
            }
            return state;
          });
        },
        addToFavorites: (courseId: string) => {
          set((state) => {
            if (!state.favoriteCourses.includes(courseId)) {
              return {
                favoriteCourses: [...state.favoriteCourses, courseId],
              };
            }
            return state;
          });
        },
        removeFromFavorites: (courseId: string) => {
          set((state) => ({
            favoriteCourses: state.favoriteCourses.filter((id: string) => id !== courseId),
          }));
        },
        updateProgress: (courseId: string, progress: number) => {
          set((state) => ({
            courseProgress: {
              ...state.courseProgress,
              [courseId]: progress,
            },
          }));
        },
        
        // Search and filters
        setSearchQuery: (query: string) => set({ searchQuery: query }),
        setFilters: (filters: Partial<CourseState['filters']>) => {
          set((state) => ({
            filters: { ...state.filters, ...filters },
          }));
        },
        clearFilters: () => {
          set({
            filters: {
              category: '',
              level: '',
              price: '',
              duration: '',
              rating: '',
              instructor: '',
              tags: [],
            },
          });
        },
        setSortBy: (sortBy: string) => set({ sortBy }),
        setSortOrder: (sortOrder: 'asc' | 'desc') => set({ sortOrder }),
        setViewMode: (viewMode: 'grid' | 'list' | 'card') => set({ viewMode }),
        
        // Loading and error
        setLoading: (isLoading: boolean) => set({ isLoading }),
        setError: (error: string | null) => set({ error }),
        clearError: () => set({ error: null }),
        
        // Reset
        reset: () => ({
          courses: [],
          currentCourse: null,
          enrolledCourses: [],
          completedCourses: [],
          favoriteCourses: [],
          courseProgress: {},
          searchQuery: '',
          filters: {
            category: '',
            level: '',
            price: '',
            duration: '',
            rating: '',
            instructor: '',
            tags: [],
          },
          sortBy: 'createdAt',
          sortOrder: 'desc',
          viewMode: 'grid',
          isLoading: false,
          error: null,
        }),
      }),
      {
        name: 'course-store',
        storage: createJSONStorage(() => localStorage.getItem('course-store')),
        partialize: (state) => ({
          enrolledCourses: state.enrolledCourses,
          completedCourses: state.completedCourses,
          favoriteCourses: state.favoriteCourses,
          courseProgress: state.courseProgress,
        }),
        version: 1,
      }
    )
  ),
    {
      name: 'course-store',
    }
  )
);

// Notification Store
export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  settings: {
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    duration: number;
    maxVisible: number;
    soundEnabled: boolean;
    desktopNotifications: boolean;
    mobileNotifications: boolean;
  };
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    persist(
      (set, get) => ({
        notifications: [],
        unreadCount: 0,
        settings: {
          position: 'top-right',
          duration: 5000,
          maxVisible: 5,
          soundEnabled: true,
          desktopNotifications: true,
          mobileNotifications: true,
        },
        addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => {
          const newNotification: Notification = {
            ...notification,
            id: notification.id || Math.random().toString(36).substr(2, 9),
            timestamp: notification.timestamp || Date.now(),
            read: false,
          };
          
          set((state) => ({
            notifications: [...state.notifications, newNotification],
            unreadCount: state.unreadCount + (newNotification.read ? 0 : 1),
          }));
          
          // Auto-close notification
          if (newNotification.autoClose !== false) {
            const duration = newNotification.duration || state.settings.duration;
            setTimeout(() => {
              useNotificationStore.getState().removeNotification(newNotification.id);
            }, duration);
          }
        },
        removeNotification: (id: string) => {
          set((state) => {
            const notification = state.notifications.find(n => n.id === id);
            if (notification && !notification.read) {
              return {
                notifications: state.notifications.filter(n => n.id !== id),
                unreadCount: Math.max(0, state.unread_count - 1),
              };
            }
            return {
              notifications: state.notifications.filter(n => n.id !== id),
            };
          });
        },
        markAsRead: (id: string) => {
          set((state) => {
            const notifications = state.notifications.map(n =>
              n.id === id ? { ...n, read: true } : n
            );
            const unreadCount = notifications.filter(n => !n.read).length;
            return { notifications, unreadCount };
          });
        },
        markAllAsRead: () => {
          set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, read: true })),
            unreadCount: 0,
          }));
        },
        clearNotifications: () => {
          set({
            notifications: [],
            unreadCount: 0,
          });
        },
        updateSettings: (settings: Partial<NotificationState['settings']>) => {
          set((state) => ({
            settings: { ...state.settings, ...settings },
          }));
        },
        
        // Reset
        reset: () => ({
          notifications: [],
          unreadCount: 0,
          settings: {
            position: 'top-right',
            duration: 5000,
            maxVisible: 5,
            soundEnabled: true,
            desktopNotifications: true,
            mobileNotifications: true,
          },
        }),
      }),
      {
        name: 'notification-store',
        storage: createJSONStorage(() => localStorage.getItem('notification-store')),
        partialize: (state) => ({
          settings: state.settings,
        }),
        version: 1,
      }
    )
  ),
    {
      name: 'notification-store',
    }
  )
);

// Export all stores
export { useUIStore, useAuthStore, useCourseStore, useNotificationStore };

// Store types for TypeScript
export type { UIState as UIStateType, AuthState as AuthStateType, CourseState as CourseStateType, NotificationState as NotificationStateType };

// Default export
export default useUIStore;
