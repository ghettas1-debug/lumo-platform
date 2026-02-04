// HomePage Integration Tests
// Comprehensive integration tests for the HomePage component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import HomePage from '../../app/page';
import { useUIStore, useUserStore, useCourseStore } from '../../lib/state/store';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Zustand stores
vi.mock('../../lib/state/store', () => ({
  useUIStore: vi.fn(),
  useUserStore: vi.fn(),
  useCourseStore: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    main: ({ children, ...props }: any) => <main {...props}>{children}</main>,
    footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    aside: ({ children, ...props }: any) => <aside {...props}>{children}</aside>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    input: ({ ...props }: any) => <input {...props} />,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock API calls
vi.mock('../../lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock components
vi.mock('../../components/ui/Button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

vi.mock('../../components/ui/CourseCard', () => ({
  CourseCard: ({ course, ...props }: any) => (
    <article data-testid="course-card" {...props}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <span>{course.price}</span>
    </article>
  ),
}));

vi.mock('../../components/video/AdvancedVideoPlayer', () => ({
  AdvancedVideoPlayer: ({ video, ...props }: any) => (
    <div data-testid="video-player" {...props}>
      <video data-testid="video-element" />
      <div>{video.title}</div>
    </div>
  ),
}));

vi.mock('../../components/notifications/NotificationCenter', () => ({
  NotificationCenter: () => <div data-testid="notification-center">Notifications</div>,
}));

vi.mock('../../components/ui/ConnectionStatus', () => ({
  ConnectionStatus: () => <div data-testid="connection-status">Connected</div>,
}));

// Mock course data
const mockCourses = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn React basics',
    instructor: 'John Doe',
    thumbnail: '/react-course.jpg',
    duration: 3600,
    level: 'beginner',
    category: 'programming',
    tags: ['react', 'javascript'],
    price: 99.99,
    rating: 4.5,
    studentsCount: 1250,
    lessonsCount: 24,
    isEnrolled: false,
    isCompleted: false,
    progress: 0,
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master TypeScript',
    instructor: 'Jane Smith',
    thumbnail: '/typescript-course.jpg',
    duration: 4800,
    level: 'advanced',
    category: 'programming',
    tags: ['typescript', 'javascript'],
    price: 149.99,
    rating: 4.8,
    studentsCount: 850,
    lessonsCount: 32,
    isEnrolled: true,
    isCompleted: false,
    progress: 75,
  },
];

// Mock user data
const mockUser = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  avatar: '/avatar.jpg',
  role: 'student' as const,
  preferences: {
    theme: 'light' as const,
    language: 'en' as const,
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
      fontSize: 'medium' as const,
      highContrast: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      skipLinks: true,
      focusIndicators: true,
    },
    privacy: {
      profileVisibility: 'public' as const,
      showProgress: true,
      showAchievements: true,
      allowAnalytics: true,
      allowPersonalization: true,
    },
  },
  enrolledCourses: ['2'],
  completedCourses: [],
  achievements: [],
  stats: {
    totalCoursesEnrolled: 1,
    totalCoursesCompleted: 0,
    totalHoursWatched: 12,
    totalCertificatesEarned: 0,
    streakDays: 5,
    lastActiveDate: '2023-01-01T00:00:00Z',
    averageCompletionTime: 3600,
    favoriteCategory: 'programming',
  },
};

describe('HomePage Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock store hooks
    (useUIStore as any).mockReturnValue({
      sidebarOpen: false,
      theme: 'light',
      language: 'en',
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
      searchFilters: {},
      searchLoading: false,
      currentCourse: null,
      currentLesson: null,
      courseProgress: 0,
      lessonProgress: 0,
      isPlaying: false,
      playbackSpeed: 1,
      volume: 1,
      userPreferences: mockUser.preferences,
      setSidebarOpen: vi.fn(),
      setTheme: vi.fn(),
      setLanguage: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      addNotification: vi.fn(),
      markNotificationAsRead: vi.fn(),
      markAllNotificationsAsRead: vi.fn(),
      removeNotification: vi.fn(),
      setCurrentPage: vi.fn(),
      setBreadcrumbs: vi.fn(),
      setActiveSection: vi.fn(),
      openModal: vi.fn(),
      closeModal: vi.fn(),
      closeAllModals: vi.fn(),
      setSearchQuery: vi.fn(),
      setSearchResults: vi.fn(),
      setSearchFilters: vi.fn(),
      setSearchLoading: vi.fn(),
      setCurrentCourse: vi.fn(),
      setCurrentLesson: vi.fn(),
      setCourseProgress: vi.fn(),
      setLessonProgress: vi.fn(),
      setIsPlaying: vi.fn(),
      setPlaybackSpeed: vi.fn(),
      setVolume: vi.fn(),
      updateUserPreferences: vi.fn(),
    });

    (useUserStore as any).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null,
      setUser: vi.fn(),
      setAuthenticated: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      updateUser: vi.fn(),
      logout: vi.fn(),
    });

    (useCourseStore as any).mockReturnValue({
      courses: mockCourses,
      currentCourse: null,
      currentLesson: null,
      enrolledCourses: [mockCourses[1]],
      completedCourses: [],
      favorites: [],
      progress: {},
      isLoading: false,
      error: null,
      setCourses: vi.fn(),
      setCurrentCourse: vi.fn(),
      setCurrentLesson: vi.fn(),
      setEnrolledCourses: vi.fn(),
      setCompletedCourses: vi.fn(),
      setFavorites: vi.fn(),
      updateProgress: vi.fn(),
      addToFavorites: vi.fn(),
      removeFromFavorites: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
    });

    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    // Mock ResizeObserver
    global.ResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Page Rendering', () => {
    it('renders the home page with all main sections', () => {
      render(<HomePage />);
      
      // Check main sections
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      
      // Check key components
      expect(screen.getByTestId('notification-center')).toBeInTheDocument();
      expect(screen.getByTestId('connection-status')).toBeInTheDocument();
    });

    it('renders the hero section', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Welcome to Lumo Platform')).toBeInTheDocument();
      expect(screen.getByText('Learn, Grow, and Succeed')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
    });

    it('renders the featured courses section', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Featured Courses')).toBeInTheDocument();
      expect(screen.getAllByTestId('course-card')).toHaveLength(mockCourses.length);
    });

    it('renders the course categories section', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Course Categories')).toBeInTheDocument();
      expect(screen.getByText('Programming')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Business')).toBeInTheDocument();
    });

    it('renders the testimonials section', () => {
      render(<HomePage />);
      
      expect(screen.getByText('What Our Students Say')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('renders the statistics section', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Platform Statistics')).toBeInTheDocument();
      expect(screen.getByText('10,000+')).toBeInTheDocument();
      expect(screen.getByText('500+')).toBeInTheDocument();
      expect(screen.getByText('50+')).toBeInTheDocument();
      expect(screen.getByText('95%')).toBeInTheDocument();
    });

    it('renders the call-to-action section', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Ready to Start Learning?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /browse courses/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });
  });

  describe('Navigation Interactions', () => {
    it('opens search modal when search button is clicked', async () => {
      const mockOpenModal = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        openModal: mockOpenModal,
      });
      
      render(<HomePage />);
      
      const searchButton = screen.getByRole('button', { name: /search/i });
      await userEvent.click(searchButton);
      
      expect(mockOpenModal).toHaveBeenCalledWith('search');
    });

    it('opens notifications modal when notification bell is clicked', async () => {
      const mockOpenModal = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        openModal: mockOpenModal,
      });
      
      render(<HomePage />);
      
      const notificationButton = screen.getByTestId('notification-center');
      await userEvent.click(notificationButton);
      
      // Should update notification state
      expect(mockOpenModal).toHaveBeenCalled();
    });

    it('navigates to course page when course card is clicked', async () => {
      const mockPush = vi.fn();
      vi.mocked(require('next/navigation').useRouter).mockReturnValue({
        push: mockPush,
        replace: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
      });
      
      render(<HomePage />);
      
      const courseCards = screen.getAllByTestId('course-card');
      await userEvent.click(courseCards[0]);
      
      expect(mockPush).toHaveBeenCalledWith('/courses/1');
    });

    it('navigates to category page when category is clicked', async () => {
      const mockPush = vi.fn();
      vi.mocked(require('next/navigation').useRouter).mockReturnValue({
        push: mockPush,
        replace: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
      });
      
      render(<HomePage />);
      
      const programmingCategory = screen.getByText('Programming');
      await userEvent.click(programmingCategory);
      
      expect(mockPush).toHaveBeenCalledWith('/courses?category=programming');
    });
  });

  describe('Search Functionality', () => {
    it('updates search query when typing in search bar', async () => {
      const mockSetSearchQuery = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        setSearchQuery: mockSetSearchQuery,
      });
      
      render(<HomePage />);
      
      const searchInput = screen.getByPlaceholderText(/search courses/i);
      await userEvent.type(searchInput, 'React');
      
      expect(mockSetSearchQuery).toHaveBeenCalledWith('React');
    });

    it('filters courses when search is performed', async () => {
      const mockSetSearchResults = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        setSearchResults: mockSetSearchResults,
      });
      
      render(<HomePage />);
      
      const searchInput = screen.getByPlaceholderText(/search courses/i);
      await userEvent.type(searchInput, 'React{Enter}');
      
      expect(mockSetSearchResults).toHaveBeenCalled();
    });

    it('shows search results when search is active', () => {
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        searchQuery: 'React',
        searchResults: [mockCourses[0]],
      });
      
      render(<HomePage />);
      
      expect(screen.getByText('Search Results')).toBeInTheDocument();
      expect(screen.getAllByTestId('course-card')).toHaveLength(1);
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
    });
  });

  describe('User Authentication', () => {
    it('shows login/signup buttons when user is not authenticated', () => {
      (useUserStore as any).mockReturnValue({
        ...((useUserStore as any).mockReturnValue({})),
        user: null,
        isAuthenticated: false,
      });
      
      render(<HomePage />);
      
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('shows user profile when user is authenticated', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByAltText('Test User avatar')).toBeInTheDocument();
    });

    it('opens profile modal when user avatar is clicked', async () => {
      const mockOpenModal = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        openModal: mockOpenModal,
      });
      
      render(<HomePage />);
      
      const userAvatar = screen.getByAltText('Test User avatar');
      await userEvent.click(userAvatar);
      
      expect(mockOpenModal).toHaveBeenCalledWith('profile');
    });

    it('logs out user when logout is clicked', async () => {
      const mockLogout = vi.fn();
      (useUserStore as any).mockReturnValue({
        ...((useUserStore as any).mockReturnValue({})),
        logout: mockLogout,
      });
      
      render(<HomePage />);
      
      const logoutButton = screen.getByRole('button', { name: /logout/i });
      await userEvent.click(logoutButton);
      
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  describe('Course Interactions', () => {
    it('enrolls user in course when enroll button is clicked', async () => {
      const mockEnroll = vi.fn();
      (useCourseStore as any).mockReturnValue({
        ...((useCourseStore as any).mockReturnValue({})),
        enrollInCourse: mockEnroll,
      });
      
      render(<HomePage />);
      
      const enrollButton = screen.getByRole('button', { name: /enroll/i });
      await userEvent.click(enrollButton);
      
      expect(mockEnroll).toHaveBeenCalledWith('1');
    });

    it('adds course to favorites when favorite button is clicked', async () => {
      const mockAddToFavorites = vi.fn();
      (useCourseStore as any).mockReturnValue({
        ...((useCourseStore as any).mockReturnValue({})),
        addToFavorites: mockAddToFavorites,
      });
      
      render(<HomePage />);
      
      const favoriteButton = screen.getByRole('button', { name: /favorite/i });
      await userEvent.click(favoriteButton);
      
      expect(mockAddToFavorites).toHaveBeenCalledWith(mockCourses[0]);
    });

    it('shows course preview when preview button is clicked', async () => {
      const mockOpenModal = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        openModal: mockOpenModal,
      });
      
      render(<HomePage />);
      
      const previewButton = screen.getByRole('button', { name: /preview/i });
      await userEvent.click(previewButton);
      
      expect(mockOpenModal).toHaveBeenCalled();
    });
  });

  describe('Responsive Design', () => {
    it('adapts to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        value: 768,
        writable: true,
      });
      
      render(<HomePage />);
      
      const page = screen.getByRole('main');
      expect(page).toHaveClass('mobile-layout');
    });

    it('adapts to tablet viewport', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        value: 1024,
        writable: true,
      });
      
      render(<HomePage />);
      
      const page = screen.getByRole('main');
      expect(page).toHaveClass('tablet-layout');
    });

    it('adapts to desktop viewport', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        value: 1920,
        writable: true,
      });
      
      render(<HomePage />);
      
      const page = screen.getByRole('main');
      expect(page).toHaveClass('desktop-layout');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<HomePage />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('has proper ARIA labels', () => {
      render(<HomePage />);
      
      expect(screen.getByRole('button', { name: /search/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /notifications/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute('aria-label');
    });

    it('supports keyboard navigation', async () => {
      render(<HomePage />);
      
      const firstButton = screen.getByRole('button');
      firstButton.focus();
      
      expect(firstButton).toHaveFocus();
      
      await userEvent.keyboard('{Tab}');
      
      // Should focus on next interactive element
      expect(document.activeElement).not.toBe(firstButton);
    });

    it('announces page changes to screen readers', () => {
      render(<HomePage />);
      
      const announcement = screen.getByRole('status');
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<HomePage key={i} />);
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 10 pages in less than 1000ms
      expect(renderTime).toBeLessThan(1000);
    });

    it('does not cause memory leaks', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<HomePage key={i} />);
        unmount();
      }
      
      // Should not have memory leaks
      expect(screen.queryAllByRole('main')).toHaveLength(0);
    });
  });

  describe('Error Handling', () => {
    it('handles API errors gracefully', () => {
      (useCourseStore as any).mockReturnValue({
        ...((useCourseStore as any).mockReturnValue({})),
        error: 'Failed to load courses',
        isLoading: false,
      });
      
      render(<HomePage />);
      
      expect(screen.getByText('Failed to load courses')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('handles network errors gracefully', () => {
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        error: 'Network error',
      });
      
      render(<HomePage />);
      
      expect(screen.getByText('Network error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('handles missing data gracefully', () => {
      (useCourseStore as any).mockReturnValue({
        ...((useCourseStore as any).mockReturnValue({})),
        courses: [],
      });
      
      render(<HomePage />);
      
      expect(screen.getByText('No courses available')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('updates UI when store state changes', async () => {
      const { rerender } = render(<HomePage />);
      
      // Initial state
      expect(screen.getByText('Featured Courses')).toBeInTheDocument();
      
      // Update store state
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        searchQuery: 'React',
        searchResults: [mockCourses[0]],
      });
      
      rerender(<HomePage />);
      
      expect(screen.getByText('Search Results')).toBeInTheDocument();
    });

    it('persists user preferences', () => {
      render(<HomePage />);
      
      // Should use user preferences from store
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByAltText('Test User avatar')).toBeInTheDocument();
    });

    it('updates course progress', () => {
      (useCourseStore as any).mockReturnValue({
        ...((useCourseStore as any).mockReturnValue({})),
        progress: {
          '2': 80,
        },
      });
      
      render(<HomePage />);
      
      const enrolledCourse = screen.getByText('Advanced TypeScript');
      expect(enrolledCourse).toBeInTheDocument();
    });
  });

  describe('Integration with Other Components', () => {
    it('integrates with notification system', () => {
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        notifications: [
          {
            id: '1',
            type: 'info',
            title: 'Welcome!',
            message: 'Welcome to Lumo Platform',
            timestamp: Date.now(),
            read: false,
          },
        ],
        unreadCount: 1,
      });
      
      render(<HomePage />);
      
      expect(screen.getByTestId('notification-center')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    it('integrates with connection status', () => {
      render(<HomePage />);
      
      expect(screen.getByTestId('connection-status')).toBeInTheDocument();
      expect(screen.getByText('Connected')).toBeInTheDocument();
    });

    it('integrates with video player', () => {
      render(<HomePage />);
      
      // Video player should be in featured section
      const videoPlayer = screen.queryByTestId('video-player');
      expect(videoPlayer).toBeInTheDocument();
    });
  });
});
