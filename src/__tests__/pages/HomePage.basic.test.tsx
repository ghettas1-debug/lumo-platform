// HomePage Basic Rendering Tests
// Unit tests for basic HomePage rendering

import React from 'react';
import { render, screen } from '@testing-library/react';
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
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    main: ({ children, ...props }: any) => <main {...props}>{children}</main>,
    footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('HomePage - Basic Rendering', () => {
  it('should render homepage correctly', () => {
    render(<HomePage />);

    // Check main elements
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main content
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // nav
  });

  it('should render with proper accessibility attributes', () => {
    render(<HomePage />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('aria-label', 'Main content');
  });

  it('should render navigation elements', () => {
    render(<HomePage />);

    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
    expect(navigation).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('should have proper semantic structure', () => {
    render(<HomePage />);

    // Check semantic HTML structure
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // nav
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });
});
