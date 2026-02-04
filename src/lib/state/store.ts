// Centralized State Management with Zustand
// Comprehensive state management for the Lumo Platform

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

// Type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  preferences: UserPreferences;
  enrolledCourses: string[];
  completedCourses: string[];
  achievements: Achievement[];
  stats: UserStats;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'ar' | 'en';
  notifications: NotificationPreferences;
  accessibility: AccessibilityPreferences;
  privacy: PrivacyPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  courseUpdates: boolean;
  announcements: boolean;
  reminders: boolean;
  deadlines: boolean;
}

export interface AccessibilityPreferences {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  skipLinks: boolean;
  focusIndicators: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'friends';
  showProgress: boolean;
  showAchievements: boolean;
  allowAnalytics: boolean;
  allowPersonalization: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt: string;
  progress: number;
  maxProgress: number;
}

export interface UserStats {
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalHoursWatched: number;
  totalCertificatesEarned: number;
  streakDays: number;
  lastActiveDate: string;
  averageCompletionTime: number;
  favoriteCategory: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  price: number;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  isEnrolled: boolean;
  isCompleted: boolean;
  progress: number;
  lastAccessedAt: string;
  certificateUrl?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number;
  order: number;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  contentUrl: string;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
  notes: LessonNote[];
  bookmarks: Bookmark[];
}

export interface LessonNote {
  id: string;
  lessonId: string;
  content: string;
  timestamp: number;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  lessonId: string;
  timestamp: number;
  title?: string;
  note?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  icon?: string;
  category: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  level: string;
  priceRange: [number, number];
  duration: string;
  rating: number;
  instructor: string;
  tags: string[];
  sortBy: 'relevance' | 'newest' | 'oldest' | 'rating' | 'price_low' | 'price_high';
  sortOrder: 'asc' | 'desc';
}

export interface UIState {
  // UI state
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  language: 'ar' | 'en';
  loading: boolean;
  error: string | null;
  notifications: Notification[];
  unreadCount: number;
  
  // Navigation state
  currentPage: string;
  breadcrumbs: Breadcrumb[];
  activeSection: string;
  
  // Modal state
  modals: {
    search: boolean;
    notifications: boolean;
    profile: boolean;
    settings: boolean;
    help: boolean;
    feedback: boolean;
    share: boolean;
  };
  
  // Search state
  searchQuery: string;
  searchResults: Course[];
  searchFilters: SearchFilters;
  searchLoading: boolean;
  
  // Course state
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  courseProgress: number;
  lessonProgress: number;
  isPlaying: boolean;
  playbackSpeed: number;
  volume: number;
  
  // User preferences
  userPreferences: UserPreferences;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'ar' | 'en') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  removeNotification: (id: string) => void;
  setCurrentPage: (page: string) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  setActiveSection: (section: string) => void;
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Course[]) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  setSearchLoading: (loading: boolean) => void;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setCourseProgress: (progress: number) => void;
  setLessonProgress: (progress: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  setVolume: (volume: number) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

export interface Breadcrumb {
  label: string;
  href?: string;
  active?: boolean;
}

// UI Store
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        sidebarOpen: false,
        theme: 'system',
        language: 'ar',
        loading: false,
        error: null,
        notifications: [],
        unreadCount: 0,
        currentPage: '/',
        breadcrumbs: [],
        activeSection: 'home',
        modals: {
          search: false,
          notifications: false,
          profile: false,
          settings: false,
          help: false,
          feedback: false,
          share: false,
        },
        searchQuery: '',
        searchResults: [],
        searchFilters: {
          query: '',
          category: '',
          level: '',
          priceRange: [0, 1000],
          duration: '',
          rating: 0,
          instructor: '',
          tags: [],
          sortBy: 'relevance',
          sortOrder: 'desc',
        },
        searchLoading: false,
        currentCourse: null,
        currentLesson: null,
        courseProgress: 0,
        lessonProgress: 0,
        isPlaying: false,
        playbackSpeed: 1,
        volume: 1,
        userPreferences: {
          theme: 'system',
          language: 'ar',
          notifications: {
            email: true,
            push: true,
            sms: false,
            inApp: true,
            courseUpdates: true,
            announcements: true,
            reminders: true,
            deadlines: true,
          },
          accessibility: {
            fontSize: 'medium',
            highContrast: false,
            reducedMotion: false,
            screenReader: false,
            keyboardNavigation: true,
            skipLinks: true,
            focusIndicators: true,
          },
          privacy: {
            profileVisibility: 'public',
            showProgress: true,
            showAchievements: true,
            allowAnalytics: true,
            allowPersonalization: true,
          },
        },

        // Actions
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),
        
        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            read: false,
          };
          
          set((state) => ({
            notifications: [newNotification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
          }));
        },
        
        markNotificationAsRead: (id) => {
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          }));
        },
        
        markAllNotificationsAsRead: () => {
          set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, read: true })),
            unreadCount: 0,
          }));
        },
        
        removeNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: state.notifications.find((n) => n.id === id && !n.read)
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount,
          }));
        },
        
        setCurrentPage: (page) => set({ currentPage: page }),
        setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
        setActiveSection: (section) => set({ activeSection: section }),
        
        openModal: (modal) => set((state) => ({
          modals: { ...state.modals, [modal]: true },
        })),
        
        closeModal: (modal) => set((state) => ({
          modals: { ...state.modals, [modal]: false },
        })),
        
        closeAllModals: () => set({
          modals: {
            search: false,
            notifications: false,
            profile: false,
            settings: false,
            help: false,
            feedback: false,
            share: false,
          },
        }),
        
        setSearchQuery: (query) => set({ searchQuery: query }),
        setSearchResults: (results) => set({ searchResults: results }),
        setSearchFilters: (filters) => set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        })),
        setSearchLoading: (loading) => set({ searchLoading: loading }),
        
        setCurrentCourse: (course) => set({ currentCourse: course }),
        setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
        setCourseProgress: (progress) => set({ courseProgress: progress }),
        setLessonProgress: (progress) => set({ lessonProgress: progress }),
        setIsPlaying: (playing) => set({ isPlaying: playing }),
        setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
        setVolume: (volume) => set({ volume: volume }),
        
        updateUserPreferences: (preferences) => set((state) => ({
          userPreferences: { ...state.userPreferences, ...preferences },
        })),
      }),
      {
        name: 'ui-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          theme: state.theme,
          language: state.language,
          userPreferences: state.userPreferences,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    {
      name: 'ui-store',
    }
  )
);

// User Store
export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        
        setUser: (user) => set({ user }),
        setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        
        updateUser: (updates) => set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
        
        logout: () => set({
          user: null,
          isAuthenticated: false,
          error: null,
        }),
      }),
      {
        name: 'user-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'user-store',
    }
  )
);

// Course Store
export interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  enrolledCourses: Course[];
  completedCourses: Course[];
  favorites: Course[];
  progress: Record<string, number>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCourses: (courses: Course[]) => void;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setEnrolledCourses: (courses: Course[]) => void;
  setCompletedCourses: (courses: Course[]) => void;
  setFavorites: (courses: Course[]) => void;
  updateProgress: (courseId: string, progress: number) => void;
  addToFavorites: (course: Course) => void;
  removeFromFavorites: (courseId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCourseStore = create<CourseState>()(
  devtools(
    persist(
      (set) => ({
        courses: [],
        currentCourse: null,
        currentLesson: null,
        enrolledCourses: [],
        completedCourses: [],
        favorites: [],
        progress: {},
        isLoading: false,
        error: null,
        
        setCourses: (courses) => set({ courses }),
        setCurrentCourse: (course) => set({ currentCourse: course }),
        setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
        setEnrolledCourses: (courses) => set({ enrolledCourses: courses }),
        setCompletedCourses: (courses) => set({ completedCourses: courses }),
        setFavorites: (courses) => set({ favorites: courses }),
        
        updateProgress: (courseId, progress) => set((state) => ({
          progress: { ...state.progress, [courseId]: progress },
        })),
        
        addToFavorites: (course) => set((state) => ({
          favorites: [...state.favorites, course],
        })),
        
        removeFromFavorites: (courseId) => set((state) => ({
          favorites: state.favorites.filter((c) => c.id !== courseId),
        })),
        
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
      }),
      {
        name: 'course-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          favorites: state.favorites,
          progress: state.progress,
        }),
      }
    ),
    {
      name: 'course-store',
    }
  )
);

// Export all stores
export const stores = {
  useUIStore,
  useUserStore,
  useCourseStore,
};

export default stores;
