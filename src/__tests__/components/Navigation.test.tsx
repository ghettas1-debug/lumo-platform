// Navigation Component Unit Tests
// Comprehensive unit tests for the Navigation component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Navigation from '../../components/Navigation';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Zustand store
vi.mock('../../lib/state/store', () => ({
  useUIStore: () => ({
    sidebarOpen: true,
    toggleSidebar: vi.fn(),
    theme: 'light',
    setTheme: vi.fn(),
  }),
  useUserStore: () => ({
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: '/avatar.jpg',
      role: 'student',
    },
    isAuthenticated: true,
    logout: vi.fn(),
  }),
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Navigation Rendering', () => {
    it('renders navigation component', () => {
      render(<Navigation />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders logo/brand', () => {
      render(<Navigation />);
      
      expect(screen.getByText(/lumo/i)).toBeInTheDocument();
    });

    it('renders main navigation links', () => {
      render(<Navigation />);
      
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /courses/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    });

    it('renders user menu when authenticated', () => {
      render(<Navigation />);
      
      expect(screen.getByText(/test user/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /user menu/i })).toBeInTheDocument();
    });

    it('renders login/signup when not authenticated', () => {
      vi.doMock('../../lib/state/store', () => ({
        useUIStore: () => ({
          sidebarOpen: true,
          toggleSidebar: vi.fn(),
          theme: 'light',
          setTheme: vi.fn(),
        }),
        useUserStore: () => ({
          user: null,
          isAuthenticated: false,
          logout: vi.fn(),
        }),
      }));

      render(<Navigation />);
      
      expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /signup/i })).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders correct navigation items for student role', () => {
      render(<Navigation />);
      
      expect(screen.getByRole('link', { name: /my courses/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /progress/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /certificates/i })).toBeInTheDocument();
    });

    it('renders correct navigation items for instructor role', () => {
      vi.doMock('../../lib/state/store', () => ({
        useUIStore: () => ({
          sidebarOpen: true,
          toggleSidebar: vi.fn(),
          theme: 'light',
          setTheme: vi.fn(),
        }),
        useUserStore: () => ({
          user: {
            id: '1',
            name: 'Instructor User',
            email: 'instructor@example.com',
            avatar: '/avatar.jpg',
            role: 'instructor',
          },
          isAuthenticated: true,
          logout: vi.fn(),
        }),
      }));

      render(<Navigation />);
      
      expect(screen.getByRole('link', { name: /my courses/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /analytics/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /students/i })).toBeInTheDocument();
    });

    it('renders correct navigation items for admin role', () => {
      vi.doMock('../../lib/state/store', () => ({
        useUIStore: () => ({
          sidebarOpen: true,
          toggleSidebar: vi.fn(),
          theme: 'light',
          setTheme: vi.fn(),
        }),
        useUserStore: () => ({
          user: {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            avatar: '/avatar.jpg',
            role: 'admin',
          },
          isAuthenticated: true,
          logout: vi.fn(),
        }),
      }));

      render(<Navigation />);
      
      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument();
    });

    it('highlights active navigation item', () => {
      vi.doMock('next/navigation', () => ({
        useRouter: () => ({
          push: vi.fn(),
          replace: vi.fn(),
          back: vi.fn(),
          forward: vi.fn(),
          refresh: vi.fn(),
          prefetch: vi.fn(),
        }),
        usePathname: () => '/courses',
        useSearchParams: () => new URLSearchParams(),
      }));

      render(<Navigation />);
      
      const coursesLink = screen.getByRole('link', { name: /courses/i });
      expect(coursesLink).toHaveClass('active');
    });
  });

  describe('Mobile Navigation', () => {
    it('renders mobile menu button', () => {
      render(<Navigation />);
      
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    });

    it('toggles mobile menu when menu button is clicked', async () => {
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await userEvent.click(menuButton);
      
      expect(screen.getByRole('navigation')).toHaveClass('mobile-open');
    });

    it('closes mobile menu when link is clicked', async () => {
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await userEvent.click(menuButton);
      
      const homeLink = screen.getByRole('link', { name: /home/i });
      await userEvent.click(homeLink);
      
      expect(screen.getByRole('navigation')).not.toHaveClass('mobile-open');
    });

    it('closes mobile menu when escape key is pressed', async () => {
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      await userEvent.click(menuButton);
      
      await userEvent.keyboard('{Escape}');
      
      expect(screen.getByRole('navigation')).not.toHaveClass('mobile-open');
    });
  });

  describe('User Menu', () => {
    it('opens user menu when user button is clicked', async () => {
      render(<Navigation />);
      
      const userButton = screen.getByRole('button', { name: /user menu/i });
      await userEvent.click(userButton);
      
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /profile/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /settings/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    });

    it('closes user menu when clicking outside', async () => {
      render(<Navigation />);
      
      const userButton = screen.getByRole('button', { name: /user menu/i });
      await userEvent.click(userButton);
      
      fireEvent.mouseDown(document.body);
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('calls logout when logout menu item is clicked', async () => {
      const mockLogout = vi.fn();
      vi.doMock('../../lib/state/store', () => ({
        useUIStore: () => ({
          sidebarOpen: true,
          toggleSidebar: vi.fn(),
          theme: 'light',
          setTheme: vi.fn(),
        }),
        useUserStore: () => ({
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: '/avatar.jpg',
            role: 'student',
          },
          isAuthenticated: true,
          logout: mockLogout,
        }),
      }));

      render(<Navigation />);
      
      const userButton = screen.getByRole('button', { name: /user menu/i });
      await userEvent.click(userButton);
      
      const logoutItem = screen.getByRole('menuitem', { name: /logout/i });
      await userEvent.click(logoutItem);
      
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('Theme Toggle', () => {
    it('renders theme toggle button', () => {
      render(<Navigation />);
      
      expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
    });

    it('toggles theme when theme button is clicked', async () => {
      const mockSetTheme = vi.fn();
      vi.doMock('../../lib/state/store', () => ({
        useUIStore: () => ({
          sidebarOpen: true,
          toggleSidebar: vi.fn(),
          theme: 'light',
          setTheme: mockSetTheme,
        }),
        useUserStore: () => ({
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: '/avatar.jpg',
            role: 'student',
          },
          isAuthenticated: true,
          logout: vi.fn(),
        }),
      }));

      render(<Navigation />);
      
      const themeButton = screen.getByRole('button', { name: /theme/i });
      await userEvent.click(themeButton);
      
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('shows correct theme icon', () => {
      vi.doMock('../../lib/state/store', () => ({
        useUIStore: () => ({
          sidebarOpen: true,
          toggleSidebar: vi.fn(),
          theme: 'dark',
          setTheme: vi.fn(),
        }),
        useUserStore: () => ({
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: '/avatar.jpg',
            role: 'student',
          },
          isAuthenticated: true,
          logout: vi.fn(),
        }),
      }));

      render(<Navigation />);
      
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('renders search input', () => {
      render(<Navigation />);
      
      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

    it('handles search input changes', async () => {
      render(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText(/search/i);
      await userEvent.type(searchInput, 'React course');
      
      expect(searchInput).toHaveValue('React course');
    });

    it('submits search when enter is pressed', async () => {
      const mockPush = vi.fn();
      vi.doMock('next/navigation', () => ({
        useRouter: () => ({
          push: mockPush,
          replace: vi.fn(),
          back: vi.fn(),
          forward: vi.fn(),
          refresh: vi.fn(),
          prefetch: vi.fn(),
        }),
        usePathname: () => '/',
        useSearchParams: () => new URLSearchParams(),
      }));

      render(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText(/search/i);
      await userEvent.type(searchInput, 'React course');
      await userEvent.keyboard('{Enter}');
      
      expect(mockPush).toHaveBeenCalledWith('/search?q=React course');
    });

    it('clears search when clear button is clicked', async () => {
      render(<Navigation />);
      
      const searchInput = screen.getByPlaceholderText(/search/i);
      await userEvent.type(searchInput, 'React course');
      
      const clearButton = screen.getByRole('button', { name: /clear search/i });
      await userEvent.click(clearButton);
      
      expect(searchInput).toHaveValue('');
    });
  });

  describe('Notifications', () => {
    it('renders notification button', () => {
      render(<Navigation />);
      
      expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
    });

    it('shows notification count badge', () => {
      render(<Navigation />);
      
      expect(screen.getByTestId('notification-badge')).toBeInTheDocument();
    });

    it('opens notifications panel when button is clicked', async () => {
      render(<Navigation />);
      
      const notificationButton = screen.getByRole('button', { name: /notifications/i });
      await userEvent.click(notificationButton);
      
      expect(screen.getByRole('dialog', { name: /notifications/i })).toBeInTheDocument();
    });
  });

  describe('Navigation Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('supports keyboard navigation', async () => {
      render(<Navigation />);
      
      const firstLink = screen.getByRole('link', { name: /home/i });
      firstLink.focus();
      expect(firstLink).toHaveFocus();
      
      await userEvent.tab();
      const secondLink = screen.getByRole('link', { name: /courses/i });
      expect(secondLink).toHaveFocus();
    });

    it('announces current page to screen readers', () => {
      vi.doMock('next/navigation', () => ({
        useRouter: () => ({
          push: vi.fn(),
          replace: vi.fn(),
          back: vi.fn(),
          forward: vi.fn(),
          refresh: vi.fn(),
          prefetch: vi.fn(),
        }),
        usePathname: () => '/courses',
        useSearchParams: () => new URLSearchParams(),
      }));

      render(<Navigation />);
      
      const coursesLink = screen.getByRole('link', { name: /courses/i });
      expect(coursesLink).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Navigation Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(<Navigation key={i} />);
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 50 navigation components in less than 200ms
      expect(renderTime).toBeLessThan(200);
    });

    it('does not cause memory leaks', () => {
      for (let i = 0; i < 25; i++) {
        const { unmount } = render(<Navigation key={i} />);
        unmount();
      }
      
      // Should not have memory leaks
      expect(document.querySelectorAll('[role="navigation"]')).toHaveLength(0);
    });
  });

  describe('Navigation Responsive Behavior', () => {
    it('adapts to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<Navigation />);
      
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toHaveClass('mobile');
    });

    it('adapts to tablet viewport', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(<Navigation />);
      
      expect(screen.getByRole('navigation')).toHaveClass('tablet');
    });

    it('adapts to desktop viewport', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(<Navigation />);
      
      expect(screen.getByRole('navigation')).toHaveClass('desktop');
    });
  });

  describe('Navigation Error Handling', () => {
    it('handles missing user data gracefully', () => {
      vi.doMock('../../lib/state/store', () => ({
        useUIStore: () => ({
          sidebarOpen: true,
          toggleSidebar: vi.fn(),
          theme: 'light',
          setTheme: vi.fn(),
        }),
        useUserStore: () => ({
          user: undefined,
          isAuthenticated: false,
          logout: vi.fn(),
        }),
      }));

      expect(() => {
        render(<Navigation />);
      }).not.toThrow();
    });

    it('handles navigation errors gracefully', () => {
      vi.doMock('next/navigation', () => ({
        useRouter: () => ({
          push: vi.fn().mockImplementation(() => {
            throw new Error('Navigation error');
          }),
          replace: vi.fn(),
          back: vi.fn(),
          forward: vi.fn(),
          refresh: vi.fn(),
          prefetch: vi.fn(),
        }),
        usePathname: () => '/',
        useSearchParams: () => new URLSearchParams(),
      }));

      expect(() => {
        render(<Navigation />);
      }).not.toThrow();
    });
  });
});
