// HomePage Integration Tests
// Integration tests for HomePage component with real dependencies

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../../pages/HomePage';
import { useAuthStore } from '../../store/authStore';
import { useCoursesStore } from '../../store/coursesStore';

// Mock stores
vi.mock('../../store/authStore');
vi.mock('../../store/coursesStore');

// Mock API calls
vi.mock('../../lib/api', () => ({
  coursesApi: {
    getFeaturedCourses: vi.fn(),
    getPopularCourses: vi.fn(),
    getNewCourses: vi.fn(),
    getCategories: vi.fn(),
  },
}));

// Mock components
vi.mock('../../components/ui/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}));

vi.mock('../../components/ui/Card', () => ({
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
}));

describe('HomePage Integration Tests', () => {
  let queryClient: QueryClient;
  let mockAuthStore: any;
  let mockCoursesStore: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    mockAuthStore = {
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        enrolledCourses: [],
      },
      isAuthenticated: true,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
    };

    mockCoursesStore = {
      featuredCourses: [],
      popularCourses: [],
      newCourses: [],
      categories: [],
      loading: false,
      error: null,
      fetchFeaturedCourses: vi.fn(),
      fetchPopularCourses: vi.fn(),
      fetchNewCourses: vi.fn(),
      fetchCategories: vi.fn(),
    };

    vi.mocked(useAuthStore).mockReturnValue(mockAuthStore);
    vi.mocked(useCoursesStore).mockReturnValue(mockCoursesStore);
  });

  const renderHomePage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it('should render home page with all sections', async () => {
    renderHomePage();

    // Check main sections
    expect(screen.getByRole('heading', { name: /welcome to lumo/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /featured courses/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /popular courses/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /new courses/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /categories/i })).toBeInTheDocument();
  });

  it('should load and display featured courses', async () => {
    const mockFeaturedCourses = [
      {
        id: '1',
        title: 'Featured Course 1',
        description: 'Featured Description',
        instructor: 'Featured Instructor',
        category: 'Programming',
        level: 'Beginner',
        price: 99.99,
        rating: 4.5,
        students: 1000,
        duration: '10 hours',
        image: 'featured-image.jpg',
        enrolledStudents: 500,
      },
    ];

    mockCoursesStore.featuredCourses = mockFeaturedCourses;
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Featured Course 1')).toBeInTheDocument();
      expect(screen.getByText('Featured Instructor')).toBeInTheDocument();
    });
  });

  it('should load and display popular courses', async () => {
    const mockPopularCourses = [
      {
        id: '2',
        title: 'Popular Course 1',
        description: 'Popular Description',
        instructor: 'Popular Instructor',
        category: 'Design',
        level: 'Advanced',
        price: 149.99,
        rating: 4.8,
        students: 2000,
        duration: '15 hours',
        image: 'popular-image.jpg',
        enrolledStudents: 800,
      },
    ];

    mockCoursesStore.popularCourses = mockPopularCourses;
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Popular Course 1')).toBeInTheDocument();
      expect(screen.getByText('Popular Instructor')).toBeInTheDocument();
    });
  });

  it('should load and display new courses', async () => {
    const mockNewCourses = [
      {
        id: '3',
        title: 'New Course 1',
        description: 'New Description',
        instructor: 'New Instructor',
        category: 'Marketing',
        level: 'Intermediate',
        price: 79.99,
        rating: 4.2,
        students: 500,
        duration: '8 hours',
        image: 'new-image.jpg',
        enrolledStudents: 200,
      },
    ];

    mockCoursesStore.newCourses = mockNewCourses;
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('New Course 1')).toBeInTheDocument();
      expect(screen.getByText('New Instructor')).toBeInTheDocument();
    });
  });

  it('should load and display categories', async () => {
    const mockCategories = [
      { id: '1', name: 'Programming', description: 'Learn programming', icon: '💻', courseCount: 50 },
      { id: '2', name: 'Design', description: 'Learn design', icon: '🎨', courseCount: 30 },
      { id: '3', name: 'Marketing', description: 'Learn marketing', icon: '📈', courseCount: 20 },
    ];

    mockCoursesStore.categories = mockCategories;
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Programming')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Marketing')).toBeInTheDocument();
    });
  });

  it('should handle course interactions', async () => {
    const mockCourse = {
      id: '1',
      title: 'Test Course',
      description: 'Test Description',
      instructor: 'Test Instructor',
      category: 'Programming',
      level: 'Beginner',
      price: 99.99,
      rating: 4.5,
      students: 1000,
      duration: '10 hours',
      image: 'test-image.jpg',
      enrolledStudents: 500,
    };

    mockCoursesStore.featuredCourses = [mockCourse];
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      const courseCard = screen.getByTestId('course-card-1');
      expect(courseCard).toBeInTheDocument();
    });

    // Test course card click
    const courseCard = screen.getByTestId('course-card-1');
    fireEvent.click(courseCard);

    await waitFor(() => {
      expect(window.location.pathname).toContain('/courses/1');
    });
  });

  it('should handle category interactions', async () => {
    const mockCategories = [
      { id: '1', name: 'Programming', description: 'Learn programming', icon: '💻', courseCount: 50 },
    ];

    mockCoursesStore.categories = mockCategories;
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      const categoryCard = screen.getByTestId('category-card-1');
      expect(categoryCard).toBeInTheDocument();
    });

    const categoryCard = screen.getByTestId('category-card-1');
    fireEvent.click(categoryCard);

    await waitFor(() => {
      expect(window.location.pathname).toContain('/courses?category=Programming');
    });
  });

  it('should handle search functionality', async () => {
    renderHomePage();

    const searchInput = screen.getByPlaceholderText(/search courses/i);
    fireEvent.change(searchInput, { target: { value: 'JavaScript' } });

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(window.location.pathname).toContain('/courses?search=JavaScript');
    });
  });

  it('should handle CTA button clicks', async () => {
    renderHomePage();

    const exploreButton = screen.getByRole('button', { name: /explore courses/i });
    fireEvent.click(exploreButton);

    await waitFor(() => {
      expect(window.location.pathname).toContain('/courses');
    });

    const getStartedButton = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(getStartedButton);

    await waitFor(() => {
      expect(window.location.pathname).toContain('/signup');
    });
  });

  it('should handle authentication state', async () => {
    mockAuthStore.isAuthenticated = false;

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });
  });

  it('should handle loading state', () => {
    mockCoursesStore.loading = true;

    renderHomePage();

    expect(screen.getByTestId('home-loading')).toBeInTheDocument();
    expect(screen.getByText(/loading content/i)).toBeInTheDocument();
  });

  it('should handle error state', () => {
    mockCoursesStore.error = 'Failed to load content';
    mockCoursesStore.loading = false;

    renderHomePage();

    expect(screen.getByTestId('home-error')).toBeInTheDocument();
    expect(screen.getByText(/failed to load content/i)).toBeInTheDocument();
  });

  it('should handle responsive design', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    renderHomePage();

    // Check mobile-specific elements
    expect(screen.getByTestId('mobile-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-hero')).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    renderHomePage();

    const searchInput = screen.getByPlaceholderText(/search courses/i);
    searchInput.focus();

    fireEvent.keyDown(searchInput, { key: 'Tab' });

    await waitFor(() => {
      const exploreButton = screen.getByRole('button', { name: /explore courses/i });
      expect(exploreButton).toHaveFocus();
    });
  });

  it('should handle analytics tracking', async () => {
    const mockAnalytics = {
      trackEvent: vi.fn(),
      trackPageView: vi.fn(),
    };

    vi.mock('../../lib/analytics', () => mockAnalytics);

    renderHomePage();

    await waitFor(() => {
      expect(mockAnalytics.trackPageView).toHaveBeenCalledWith('/');
    });

    const exploreButton = screen.getByRole('button', { name: /explore courses/i });
    fireEvent.click(exploreButton);

    await waitFor(() => {
      expect(mockAnalytics.trackEvent).toHaveBeenCalledWith('cta_click', {
        button: 'explore_courses',
        page: 'home',
      });
    });
  });

  it('should handle real-time updates', async () => {
    const mockCourse = {
      id: '1',
      title: 'Test Course',
      description: 'Test Description',
      instructor: 'Test Instructor',
      category: 'Programming',
      level: 'Beginner',
      price: 99.99,
      rating: 4.5,
      students: 1000,
      duration: '10 hours',
      image: 'test-image.jpg',
      enrolledStudents: 500,
    };

    mockCoursesStore.featuredCourses = [mockCourse];
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Test Course')).toBeInTheDocument();
    });

    // Simulate real-time update
    const updatedCourse = { ...mockCourse, enrolledStudents: 501 };
    mockCoursesStore.featuredCourses = [updatedCourse];

    await waitFor(() => {
      expect(screen.getByText('501 students')).toBeInTheDocument();
    });
  });

  it('should handle performance optimization', async () => {
    const startTime = performance.now();

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /welcome to lumo/i })).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within 100ms
    expect(renderTime).toBeLessThan(100);
  });

  it('should handle accessibility features', async () => {
    renderHomePage();

    // Check ARIA labels
    expect(screen.getByRole('heading', { name: /welcome to lumo/i })).toHaveAttribute('aria-level', '1');
    expect(screen.getByPlaceholderText(/search courses/i)).toHaveAttribute('aria-label', 'Search courses');

    // Check keyboard navigation
    const searchInput = screen.getByPlaceholderText(/search courses/i);
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    await waitFor(() => {
      expect(window.location.pathname).toContain('/courses');
    });

    // Check focus management
    const exploreButton = screen.getByRole('button', { name: /explore courses/i });
    fireEvent.click(exploreButton);

    await waitFor(() => {
      expect(exploreButton).toHaveFocus();
    });
  });

  it('should handle state persistence', async () => {
    // Mock localStorage
    const mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    renderHomePage();

    const searchInput = screen.getByPlaceholderText(/search courses/i);
    fireEvent.change(searchInput, { target: { value: 'JavaScript' } });

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'home-search',
        'JavaScript'
      );
    });
  });

  it('should handle concurrent requests', async () => {
    const mockFeaturedCourses = [{ id: '1', title: 'Featured Course' }];
    const mockPopularCourses = [{ id: '2', title: 'Popular Course' }];
    const mockNewCourses = [{ id: '3', title: 'New Course' }];

    mockCoursesStore.featuredCourses = mockFeaturedCourses;
    mockCoursesStore.popularCourses = mockPopularCourses;
    mockCoursesStore.newCourses = mockNewCourses;
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText('Featured Course')).toBeInTheDocument();
      expect(screen.getByText('Popular Course')).toBeInTheDocument();
      expect(screen.getByText('New Course')).toBeInTheDocument();
    });
  });

  it('should handle memory leaks', () => {
    const { unmount } = renderHomePage();

    // Cleanup
    unmount();

    // Check if event listeners are cleaned up
    expect(document.removeEventListener).toHaveBeenCalled();
  });

  it('should handle edge cases', async () => {
    // Test with very long course title
    const longTitle = 'A'.repeat(200);
    const mockCourse = {
      id: '1',
      title: longTitle,
      description: 'Test Description',
      instructor: 'Test Instructor',
      category: 'Programming',
      level: 'Beginner',
      price: 99.99,
      rating: 4.5,
      students: 1000,
      duration: '10 hours',
      image: 'test-image.jpg',
      enrolledStudents: 500,
    };

    mockCoursesStore.featuredCourses = [mockCourse];
    mockCoursesStore.loading = false;

    renderHomePage();

    await waitFor(() => {
      const courseTitle = screen.getByTestId('course-title-1');
      expect(courseTitle).toBeInTheDocument();
      expect(courseTitle).toHaveClass('truncate');
    });
  });

  it('should handle user preferences', async () => {
    // Mock user preferences
    const mockUser = {
      ...mockAuthStore.user,
      preferences: {
        theme: 'dark',
        language: 'en',
        notifications: true,
      },
    };

    mockAuthStore.user = mockUser;

    renderHomePage();

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark');
    });
  });

  it('should handle social sharing', async () => {
    renderHomePage();

    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText(/share on facebook/i)).toBeInTheDocument();
      expect(screen.getByText(/share on twitter/i)).toBeInTheDocument();
      expect(screen.getByText(/share on linkedin/i)).toBeInTheDocument();
    });
  });

  it('should handle newsletter subscription', async () => {
    renderHomePage();

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you for subscribing/i)).toBeInTheDocument();
    });
  });

  it('should handle testimonials', async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByTestId('testimonials-section')).toBeInTheDocument();
      expect(screen.getByText(/what our students say/i)).toBeInTheDocument();
    });

    const testimonialCards = screen.getAllByTestId('testimonial-card');
    expect(testimonialCards.length).toBeGreaterThan(0);
  });

  it('should handle statistics display', async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByTestId('statistics-section')).toBeInTheDocument();
      expect(screen.getByText(/1000\+ students/i)).toBeInTheDocument();
      expect(screen.getByText(/50\+ courses/i)).toBeInTheDocument();
      expect(screen.getByText(/100\+ instructors/i)).toBeInTheDocument();
    });
  });

  it('should handle error recovery', async () => {
    mockCoursesStore.error = 'Network error';
    mockCoursesStore.loading = false;

    renderHomePage();

    expect(screen.getByText(/network error/i)).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(mockCoursesStore.fetchFeaturedCourses).toHaveBeenCalled();
      expect(mockCoursesStore.fetchPopularCourses).toHaveBeenCalled();
      expect(mockCoursesStore.fetchNewCourses).toHaveBeenCalled();
    });
  });
});
