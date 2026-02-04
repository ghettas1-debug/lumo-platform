// NotificationsPage Integration Tests
// Comprehensive integration tests for the NotificationsPage component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import NotificationsPage from '../../app/notifications/page';
import { useUIStore, useUserStore } from '../../lib/state/store';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/notifications',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Zustand stores
vi.mock('../../lib/state/store', () => ({
  useUIStore: vi.fn(),
  useUserStore: vi.fn(),
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

vi.mock('../../components/ui/NotificationItem', () => ({
  NotificationItem: ({ notification, ...props }: any) => (
    <article data-testid="notification-item" {...props}>
      <h4>{notification.title}</h4>
      <p>{notification.message}</p>
      <span>{notification.timestamp}</span>
    </article>
  ),
}));

vi.mock('../../components/ui/NotificationFilters', () => ({
  NotificationFilters: ({ filters, onFilterChange, ...props }: any) => (
    <div data-testid="notification-filters" {...props}>
      <button onClick={() => onFilterChange('all')}>All</button>
      <button onClick={() => onFilterChange('unread')}>Unread</button>
      <button onClick={() => onFilterChange('read')}>Read</button>
    </div>
  ),
}));

vi.mock('../../components/ui/NotificationSettings', () => ({
  NotificationSettings: ({ settings, onSettingsChange, ...props }: any) => (
    <div data-testid="notification-settings" {...props}>
      <label>
        <input
          type="checkbox"
          checked={settings.email}
          onChange={(e) => onSettingsChange('email', e.target.checked)}
        />
        Email Notifications
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.push}
          onChange={(e) => onSettingsChange('push', e.target.checked)}
        />
        Push Notifications
      </label>
    </div>
  ),
}));

// Mock notification data
const mockNotifications = [
  {
    id: '1',
    type: 'info',
    title: 'Welcome to Lumo Platform',
    message: 'Get started with your learning journey',
    timestamp: '2023-01-01T00:00:00Z',
    read: false,
    actionUrl: '/courses',
    actionText: 'Browse Courses',
    icon: 'info',
    category: 'system',
  },
  {
    id: '2',
    type: 'success',
    title: 'Course Completed',
    message: 'Congratulations! You completed "Introduction to React"',
    timestamp: '2023-01-02T00:00:00Z',
    read: false,
    actionUrl: '/certificate',
    actionText: 'View Certificate',
    icon: 'success',
    category: 'course',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Assignment Due Soon',
    message: 'Your assignment is due in 2 hours',
    timestamp: '2023-01-03T00:00:00Z',
    read: true,
    actionUrl: '/assignment',
    actionText: 'View Assignment',
    icon: 'warning',
    category: 'assignment',
  },
  {
    id: '4',
    type: 'error',
    title: 'Payment Failed',
    message: 'Your payment could not be processed',
    timestamp: '2023-01-04T00:00:00Z',
    read: true,
    actionUrl: '/payment',
    actionText: 'Retry Payment',
    icon: 'error',
    category: 'payment',
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
  enrolledCourses: [],
  completedCourses: [],
  achievements: [],
  stats: {
    totalCoursesEnrolled: 0,
    totalCoursesCompleted: 0,
    totalHoursWatched: 0,
    totalCertificatesEarned: 0,
    streakDays: 0,
    lastActiveDate: '2023-01-01T00:00:00Z',
    averageCompletionTime: 0,
    favoriteCategory: 'programming',
  },
};

describe('NotificationsPage Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock store hooks
    (useUIStore as any).mockReturnValue({
      sidebarOpen: false,
      theme: 'light',
      language: 'en',
      loading: false,
      error: null,
      notifications: mockNotifications,
      unreadCount: 2,
      currentPage: '/notifications',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Notifications', href: '/notifications' },
      ],
      activeSection: 'notifications',
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
    it('renders the notifications page with all main sections', () => {
      render(<NotificationsPage />);
      
      // Check main sections
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      
      // Check page title
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Manage your notifications')).toBeInTheDocument();
    });

    it('renders the notifications list', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByTestId('notification-filters')).toBeInTheDocument();
      expect(screen.getAllByTestId('notification-item')).toHaveLength(mockNotifications.length);
    });

    it('renders the notification filters', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Unread')).toBeInTheDocument();
      expect(screen.getByText('Read')).toBeInTheDocument();
    });

    it('renders the notification settings', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByTestId('notification-settings')).toBeInTheDocument();
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
      expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    });

    it('shows unread count badge', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Unread')).toBeInTheDocument();
    });

    it('shows breadcrumbs', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });
  });

  describe('Notification Interactions', () => {
    it('marks notification as read when clicked', async () => {
      const mockMarkAsRead = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        markNotificationAsRead: mockMarkAsRead,
      });
      
      render(<NotificationsPage />);
      
      const notificationItems = screen.getAllByTestId('notification-item');
      await userEvent.click(notificationItems[0]);
      
      expect(mockMarkAsRead).toHaveBeenCalledWith('1');
    });

    it('marks all notifications as read when mark all button is clicked', async () => {
      const mockMarkAllAsRead = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        markAllNotificationsAsRead: mockMarkAllAsRead,
      });
      
      render(<NotificationsPage />);
      
      const markAllButton = screen.getByRole('button', { name: /mark all as read/i });
      await userEvent.click(markAllButton);
      
      expect(mockMarkAllAsRead).toHaveBeenCalled();
    });

    it('removes notification when delete button is clicked', async () => {
      const mockRemoveNotification = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        removeNotification: mockRemoveNotification,
      });
      
      render(<NotificationsPage />);
      
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      await userEvent.click(deleteButton);
      
      expect(mockRemoveNotification).toHaveBeenCalled();
    });

    it('opens notification action when action button is clicked', async () => {
      const mockPush = vi.fn();
      vi.mocked(require('next/navigation').useRouter).mockReturnValue({
        push: mockPush,
        replace: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
      });
      
      render(<NotificationsPage />);
      
      const actionButton = screen.getByRole('button', { name: /browse courses/i });
      await userEvent.click(actionButton);
      
      expect(mockPush).toHaveBeenCalledWith('/courses');
    });
  });

  describe('Filter Functionality', () => {
    it('filters notifications when filter is selected', async () => {
      render(<NotificationsPage />);
      
      const unreadFilter = screen.getByText('Unread');
      await userEvent.click(unreadFilter);
      
      // Should show only unread notifications
      const notificationItems = screen.getAllByTestId('notification-item');
      expect(notificationItems).toHaveLength(2);
    });

    it('shows all notifications when all filter is selected', async () => {
      render(<NotificationsPage />);
      
      const unreadFilter = screen.getByText('Unread');
      await userEvent.click(unreadFilter);
      
      const allFilter = screen.getByText('All');
      await userEvent.click(allFilter);
      
      // Should show all notifications
      const notificationItems = screen.getAllByTestId('notification-item');
      expect(notificationItems).toHaveLength(mockNotifications.length);
    });

    it('shows read notifications when read filter is selected', async () => {
      render(<NotificationsPage />);
      
      const readFilter = screen.getByText('Read');
      await userEvent.click(readFilter);
      
      // Should show only read notifications
      const notificationItems = screen.getAllByTestId('notification-item');
      expect(notificationItems).toHaveLength(2);
    });

    it('updates filter state when filter changes', async () => {
      const mockSetSearchFilters = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        setSearchFilters: mockSetSearchFilters,
      });
      
      render(<NotificationsPage />);
      
      const unreadFilter = screen.getByText('Unread');
      await userEvent.click(unreadFilter);
      
      expect(mockSetSearchFilters).toHaveBeenCalled();
    });
  });

  describe('Settings Functionality', () => {
    it('updates email notification setting when toggled', async () => {
      const mockUpdateUserPreferences = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        updateUserPreferences: mockUpdateUserPreferences,
      });
      
      render(<NotificationsPage />);
      
      const emailCheckbox = screen.getByLabelText('Email Notifications');
      await userEvent.click(emailCheckbox);
      
      expect(mockUpdateUserPreferences).toHaveBeenCalled();
    });

    it('updates push notification setting when toggled', async () => {
      const mockUpdateUserPreferences = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        updateUserPreferences: mockUpdateUserPreferences,
      });
      
      render(<NotificationsPage />);
      
      const pushCheckbox = screen.getByLabelText('Push Notifications');
      await userEvent.click(pushCheckbox);
      
      expect(mockUpdateUserPreferences).toHaveBeenCalled();
    });

    it('saves settings when save button is clicked', async () => {
      const mockUpdateUserPreferences = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        updateUserPreferences: mockUpdateUserPreferences,
      });
      
      render(<NotificationsPage />);
      
      const saveButton = screen.getByRole('button', { name: /save settings/i });
      await userEvent.click(saveButton);
      
      expect(mockUpdateUserPreferences).toHaveBeenCalled();
    });
  });

  describe('Search Functionality', () => {
    it('filters notifications when search query is entered', async () => {
      const mockSetSearchQuery = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        setSearchQuery: mockSetSearchQuery,
      });
      
      render(<NotificationsPage />);
      
      const searchInput = screen.getByPlaceholderText(/search notifications/i);
      await userEvent.type(searchInput, 'Welcome');
      
      expect(mockSetSearchQuery).toHaveBeenCalledWith('Welcome');
    });

    it('shows search results when search is active', () => {
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        searchQuery: 'Welcome',
        searchResults: [mockNotifications[0]],
      });
      
      render(<NotificationsPage />);
      
      expect(screen.getByText('Search Results')).toBeInTheDocument();
      expect(screen.getAllByTestId('notification-item')).toHaveLength(1);
      expect(screen.getByText('Welcome to Lumo Platform')).toBeInTheDocument();
    });

    it('clears search when clear button is clicked', async () => {
      const mockSetSearchQuery = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        setSearchQuery: mockSetSearchQuery,
      });
      
      render(<NotificationsPage />);
      
      const clearButton = screen.getByRole('button', { name: /clear search/i });
      await userEvent.click(clearButton);
      
      expect(mockSetSearchQuery).toHaveBeenCalledWith('');
    });
  });

  describe('Pagination', () => {
    it('loads more notifications when load more button is clicked', async () => {
      const mockLoadMore = vi.fn();
      vi.mocked(require('../../lib/api-client').apiClient.get).mockResolvedValue({
        data: mockNotifications,
        hasMore: true,
      });
      
      render(<NotificationsPage />);
      
      const loadMoreButton = screen.getByRole('button', { name: /load more/i });
      await userEvent.click(loadMoreButton);
      
      expect(mockLoadMore).toHaveBeenCalled();
    });

    it('shows pagination info', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByText('Showing 1-4 of 4 notifications')).toBeInTheDocument();
    });

    it('disables load more button when no more notifications', () => {
      vi.mocked(require('../../lib/api-client').apiClient.get).mockResolvedValue({
        data: mockNotifications,
        hasMore: false,
      });
      
      render(<NotificationsPage />);
      
      const loadMoreButton = screen.getByRole('button', { name: /load more/i });
      expect(loadMoreButton).toBeDisabled();
    });
  });

  describe('Responsive Design', () => {
    it('adapts to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        value: 768,
        writable: true,
      });
      
      render(<NotificationsPage />);
      
      const page = screen.getByRole('main');
      expect(page).toHaveClass('mobile-layout');
    });

    it('adapts to tablet viewport', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        value: 1024,
        writable: true,
      });
      
      render(<NotificationsPage />);
      
      const page = screen.getByRole('main');
      expect(page).toHaveClass('tablet-layout');
    });

    it('adapts to desktop viewport', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        value: 1920,
        writable: true,
      });
      
      render(<NotificationsPage />);
      
      const page = screen.getByRole('main');
      expect(page).toHaveClass('desktop-layout');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('has proper ARIA labels', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByRole('button', { name: /mark all as read/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /delete/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /settings/i })).toHaveAttribute('aria-label');
    });

    it('supports keyboard navigation', async () => {
      render(<NotificationsPage />);
      
      const firstButton = screen.getByRole('button');
      firstButton.focus();
      
      expect(firstButton).toHaveFocus();
      
      await userEvent.keyboard('{Tab}');
      
      // Should focus on next interactive element
      expect(document.activeElement).not.toBe(firstButton);
    });

    it('announces notification changes to screen readers', () => {
      render(<NotificationsPage />);
      
      const announcement = screen.getByRole('status');
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<NotificationsPage key={i} />);
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 10 pages in less than 1000ms
      expect(renderTime).toBeLessThan(1000);
    });

    it('does not cause memory leaks', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<NotificationsPage key={i} />);
        unmount();
      }
      
      // Should not have memory leaks
      expect(screen.queryAllByRole('main')).toHaveLength(0);
    });
  });

  describe('Error Handling', () => {
    it('handles API errors gracefully', () => {
      vi.mocked(require('../../lib/api-client').apiClient.get).mockRejectedValue(
        new Error('Failed to load notifications')
      );
      
      render(<NotificationsPage />);
      
      expect(screen.getByText('Failed to load notifications')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('handles network errors gracefully', () => {
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        error: 'Network error',
      });
      
      render(<NotificationsPage />);
      
      expect(screen.getByText('Network error')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('handles empty notifications gracefully', () => {
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        notifications: [],
      });
      
      render(<NotificationsPage />);
      
      expect(screen.getByText('No notifications')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('updates UI when store state changes', async () => {
      const { rerender } = render(<NotificationsPage />);
      
      // Initial state
      expect(screen.getAllByTestId('notification-item')).toHaveLength(4);
      
      // Update store state
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        notifications: [mockNotifications[0]],
      });
      
      rerender(<NotificationsPage />);
      
      expect(screen.getAllByTestId('notification-item')).toHaveLength(1);
    });

    it('persists user preferences', () => {
      render(<NotificationsPage />);
      
      // Should use user preferences from store
      expect(screen.getByLabelText('Email Notifications')).toBeChecked();
      expect(screen.getByLabelText('Push Notifications')).toBeChecked();
    });

    it('updates unread count when notifications are marked as read', () => {
      const mockMarkAsRead = vi.fn();
      (useUIStore as any).mockReturnValue({
        ...((useUIStore as any).mockReturnValue({})),
        markNotificationAsRead: mockMarkAsRead,
      });
      
      render(<NotificationsPage />);
      
      const notificationItems = screen.getAllByTestId('notification-item');
      userEvent.click(notificationItems[0]);
      
      expect(mockMarkAsRead).toHaveBeenCalledWith('1');
    });
  });

  describe('Integration with Other Components', () => {
    it('integrates with notification filters', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByTestId('notification-filters')).toBeInTheDocument();
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Unread')).toBeInTheDocument();
      expect(screen.getByText('Read')).toBeInTheDocument();
    });

    it('integrates with notification settings', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByTestId('notification-settings')).toBeInTheDocument();
      expect(screen.getByText('Email Notifications')).toBeInTheDocument();
      expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    });

    it('integrates with navigation', () => {
      render(<NotificationsPage />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });
  });
});
