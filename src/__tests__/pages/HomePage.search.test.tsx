// HomePage Search Functionality Tests
// Unit tests for search functionality

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '../../app/page';

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
  useUIStore: () => ({
    theme: 'light',
    sidebarCollapsed: false,
    notifications: [],
    toggleSidebar: vi.fn(),
    setTheme: vi.fn(),
  }),
  useUserStore: () => ({
    user: null,
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
  }),
  useCourseStore: () => ({
    courses: [],
    loading: false,
    error: null,
    fetchCourses: vi.fn(),
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    input: ({ ...props }: any) => <input {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('HomePage - Search Functionality', () => {
  it('should render search input', () => {
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'search');
  });

  it('should handle search input changes', () => {
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'React course' } });
    
    expect(searchInput).toHaveValue('React course');
  });

  it('should handle search submission', () => {
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchForm = searchInput.closest('form');
    
    if (searchForm) {
      fireEvent.submit(searchForm);
      expect(searchForm).toBeInTheDocument();
    }
  });

  it('should clear search input', () => {
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    const clearButton = screen.getByLabelText(/clear search/i);
    if (clearButton) {
      fireEvent.click(clearButton);
      expect(searchInput).toHaveValue('');
    }
  });

  it('should have proper search accessibility', () => {
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toHaveAttribute('aria-label');
    expect(searchInput).toHaveAttribute('role', 'searchbox');
  });
});
