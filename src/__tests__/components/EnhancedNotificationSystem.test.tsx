// EnhancedNotificationSystem Component Unit Tests
// Comprehensive unit tests for the EnhancedNotificationSystem component

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import EnhancedNotificationSystem from '../../components/notifications/EnhancedNotificationSystem';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock Notification API
Object.defineProperty(window, 'Notification', {
  value: {
    requestPermission: vi.fn().mockResolvedValue('granted'),
    permission: 'granted',
  },
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  callback,
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  callback,
}));

describe('EnhancedNotificationSystem Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('should render notification system correctly', () => {
    render(<EnhancedNotificationSystem />);
    
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
  });

  it('should display notification count badge', () => {
    render(<EnhancedNotificationSystem />);
    
    const badge = screen.getByTestId('notification-badge');
    expect(badge).toBeInTheDocument();
  });

  it('should open notification panel when button is clicked', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /notifications/i })).toBeInTheDocument();
    });
  });

  it('should close notification panel when close button is clicked', async () => {
    render(<EnhancedNotificationSystem />);
    
    // Open panel
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /notifications/i })).toBeInTheDocument();
    });
    
    // Close panel
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should display different notification types', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      expect(screen.getByText(/new course available/i)).toBeInTheDocument();
      expect(screen.getByText(/assignment due soon/i)).toBeInTheDocument();
      expect(screen.getByText(/system update/i)).toBeInTheDocument();
    });
  });

  it('should mark notification as read when clicked', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const notification = screen.getByText(/new course available/i);
      fireEvent.click(notification);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/new course available/i)).toHaveClass('read');
    });
  });

  it('should delete notification when delete button is clicked', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: /delete notification/i });
      fireEvent.click(deleteButton);
    });
    
    await waitFor(() => {
      expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();
    });
  });

  it('should clear all notifications when clear all button is clicked', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const clearAllButton = screen.getByRole('button', { name: /clear all/i });
      fireEvent.click(clearAllButton);
    });
    
    await waitFor(() => {
      expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/assignment due soon/i)).not.toBeInTheDocument();
    });
  });

  it('should filter notifications by type', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const filterButton = screen.getByRole('button', { name: /filter/i });
      fireEvent.click(filterButton);
    });
    
    await waitFor(() => {
      const courseFilter = screen.getByRole('button', { name: /courses/i });
      fireEvent.click(courseFilter);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/new course available/i)).toBeInTheDocument();
      expect(screen.queryByText(/system update/i)).not.toBeInTheDocument();
    });
  });

  it('should search notifications', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/search notifications/i);
      fireEvent.change(searchInput, { target: { value: 'course' } });
    });
    
    await waitFor(() => {
      expect(screen.getByText(/new course available/i)).toBeInTheDocument();
      expect(screen.queryByText(/system update/i)).not.toBeInTheDocument();
    });
  });

  it('should request notification permission', async () => {
    render(<EnhancedNotificationSystem />);
    
    await waitFor(() => {
      expect(window.Notification.requestPermission).toHaveBeenCalled();
    });
  });

  it('should show browser notification when enabled', async () => {
    const mockShowNotification = vi.fn();
    Object.defineProperty(window, 'Notification', {
      value: {
        requestPermission: vi.fn().mockResolvedValue('granted'),
        permission: 'granted',
        create: vi.fn().mockReturnValue({ close: vi.fn() }),
      },
      writable: true,
    });

    render(<EnhancedNotificationSystem />);
    
    await waitFor(() => {
      expect(window.Notification.requestPermission).toHaveBeenCalled();
    });
  });

  it('should handle notification settings', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(settingsButton);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/notification preferences/i)).toBeInTheDocument();
    });
  });

  it('should toggle notification types in settings', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(settingsButton);
    });
    
    await waitFor(() => {
      const courseToggle = screen.getByRole('switch', { name: /course notifications/i });
      fireEvent.click(courseToggle);
    });
    
    await waitFor(() => {
      expect(courseToggle).not.toBeChecked();
    });
  });

  it('should persist notification preferences to localStorage', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(settingsButton);
    });
    
    await waitFor(() => {
      const courseToggle = screen.getByRole('switch', { name: /course notifications/i });
      fireEvent.click(courseToggle);
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'notification-preferences',
      expect.any(String)
    );
  });

  it('should load notification preferences from localStorage', () => {
    const preferences = {
      courseNotifications: false,
      assignmentNotifications: true,
      systemNotifications: false,
      emailNotifications: true,
      pushNotifications: true,
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(preferences));

    render(<EnhancedNotificationSystem />);
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('notification-preferences');
  });

  it('should handle keyboard navigation', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    
    // Tab to notification button
    fireEvent.focus(notificationButton);
    expect(notificationButton).toHaveFocus();
    
    // Enter to open
    fireEvent.keyDown(notificationButton, { key: 'Enter' });
    
    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /notifications/i })).toBeInTheDocument();
    });
    
    // Escape to close
    fireEvent.keyDown(document, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should be accessible', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    
    expect(notificationButton).toHaveAttribute('aria-label');
    expect(notificationButton).toHaveAttribute('aria-describedby');
  });

  it('should handle empty notification state', async () => {
    // Mock empty notifications
    vi.mock('../../lib/notifications', () => ({
      useNotifications: () => ({
        notifications: [],
        unreadCount: 0,
        markAsRead: vi.fn(),
        deleteNotification: vi.fn(),
        clearAll: vi.fn(),
      }),
    }));

    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      expect(screen.getByText(/no notifications/i)).toBeInTheDocument();
    });
  });

  it('should handle notification loading state', async () => {
    // Mock loading state
    vi.mock('../../lib/notifications', () => ({
      useNotifications: () => ({
        notifications: [],
        unreadCount: 0,
        isLoading: true,
        markAsRead: vi.fn(),
        deleteNotification: vi.fn(),
        clearAll: vi.fn(),
      }),
    }));

    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      expect(screen.getByText(/loading notifications/i)).toBeInTheDocument();
    });
  });

  it('should handle notification error state', async () => {
    // Mock error state
    vi.mock('../../lib/notifications', () => ({
      useNotifications: () => ({
        notifications: [],
        unreadCount: 0,
        error: 'Failed to load notifications',
        markAsRead: vi.fn(),
        deleteNotification: vi.fn(),
        clearAll: vi.fn(),
      }),
    }));

    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading notifications/i)).toBeInTheDocument();
    });
  });

  it('should show notification timestamp', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      expect(screen.getByText(/2 hours ago/i)).toBeInTheDocument();
      expect(screen.getByText(/1 day ago/i)).toBeInTheDocument();
    });
  });

  it('should handle notification pagination', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const loadMoreButton = screen.getByRole('button', { name: /load more/i });
      fireEvent.click(loadMoreButton);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/loading more notifications/i)).toBeInTheDocument();
    });
  });

  it('should handle notification priority display', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      expect(screen.getByText(/urgent/i)).toBeInTheDocument();
      expect(screen.getByText(/high/i)).toBeInTheDocument();
      expect(screen.getByText(/normal/i)).toBeInTheDocument();
    });
  });

  it('should handle notification actions', async () => {
    render(<EnhancedNotificationSystem />);
    
    const notificationButton = screen.getByRole('button', { name: /notifications/i });
    fireEvent.click(notificationButton);
    
    await waitFor(() => {
      const actionButton = screen.getByRole('button', { name: /view course/i });
      fireEvent.click(actionButton);
    });
    
    await waitFor(() => {
      expect(window.location.href).toContain('/courses/');
    });
  });
});
