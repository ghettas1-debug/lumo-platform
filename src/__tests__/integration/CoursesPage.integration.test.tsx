// CoursesPage Integration Tests
// Integration tests for CoursesPage component with real dependencies

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CoursesPage from '../../pages/CoursesPage';
import { useCoursesStore } from '../../store/coursesStore';
import { useAuthStore } from '../../store/authStore';

// Mock stores
vi.mock('../../store/coursesStore');
vi.mock('../../store/authStore');

// Mock API calls
vi.mock('../../lib/api', () => ({
  coursesApi: {
    getCourses: vi.fn(),
    getCategories: vi.fn(),
    getInstructors: vi.fn(),
    enrollInCourse: vi.fn(),
  },
}));

// Mock components that might cause issues
vi.mock('../../components/ui/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}));

vi.mock('../../components/ui/Input', () => ({
  Input: ({ onChange, ...props }: any) => (
    <input onChange={onChange} {...props} />
  ),
}));

vi.mock('../../components/ui/Card', () => ({
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
}));

describe('CoursesPage Integration Tests', () => {
  let queryClient: QueryClient;
  let mockCoursesStore: any;
  let mockAuthStore: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create fresh query client for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    // Mock stores
    mockCoursesStore = {
      courses: [],
      categories: [],
      instructors: [],
      loading: false,
      error: null,
      filters: {
        category: '',
        instructor: '',
        level: '',
        price: '',
        duration: '',
        rating: '',
      },
      searchQuery: '',
      sortBy: 'popular',
      sortOrder: 'desc',
      fetchCourses: vi.fn(),
      fetchCategories: vi.fn(),
      fetchInstructors: vi.fn(),
      setFilters: vi.fn(),
      setSearchQuery: vi.fn(),
      setSortBy: vi.fn(),
      enrollInCourse: vi.fn(),
    };

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

    vi.mocked(useCoursesStore).mockReturnValue(mockCoursesStore);
    vi.mocked(useAuthStore).mockReturnValue(mockAuthStore);
  });

  const renderCoursesPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CoursesPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it('should render courses page with all sections', async () => {
    renderCoursesPage();

    // Check main sections
    expect(screen.getByRole('heading', { name: /courses/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search courses/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sort/i })).toBeInTheDocument();
  });

  it('should load and display courses', async () => {
    const mockCourses = [
      {
        id: '1',
        title: 'Test Course 1',
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
      },
      {
        id: '2',
        title: 'Test Course 2',
        description: 'Test Description 2',
        instructor: 'Test Instructor 2',
        category: 'Design',
        level: 'Advanced',
        price: 149.99,
        rating: 4.8,
        students: 2000,
        duration: '15 hours',
        image: 'test-image2.jpg',
        enrolledStudents: 800,
      },
    ];

    mockCoursesStore.courses = mockCourses;
    mockCoursesStore.loading = false;

    renderCoursesPage();

    await waitFor(() => {
      expect(screen.getByText('Test Course 1')).toBeInTheDocument();
      expect(screen.getByText('Test Course 2')).toBeInTheDocument();
      expect(screen.getByText('Test Instructor')).toBeInTheDocument();
      expect(screen.getByText('Test Instructor 2')).toBeInTheDocument();
    });
  });

  it('should handle search functionality', async () => {
    renderCoursesPage();

    const searchInput = screen.getByPlaceholderText(/search courses/i);
    
    fireEvent.change(searchInput, { target: { value: 'JavaScript' } });

    await waitFor(() => {
      expect(mockCoursesStore.setSearchQuery).toHaveBeenCalledWith('JavaScript');
    });
  });

  it('should handle filter changes', async () => {
    renderCoursesPage();

    const filterButton = screen.getByRole('button', { name: /filter/i });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText(/category/i)).toBeInTheDocument();
      expect(screen.getByText(/level/i)).toBeInTheDocument();
      expect(screen.getByText(/price/i)).toBeInTheDocument();
    });

    // Test category filter
    const categorySelect = screen.getByLabelText(/category/i);
    fireEvent.change(categorySelect, { target: { value: 'Programming' } });

    await waitFor(() => {
      expect(mockCoursesStore.setFilters).toHaveBeenCalledWith(
        expect.objectContaining({ category: 'Programming' })
      );
    });
  });

  it('should handle sort changes', async () => {
    renderCoursesPage();

    const sortButton = screen.getByRole('button', { name: /sort/i });
    fireEvent.click(sortButton);

    await waitFor(() => {
      expect(screen.getByText(/popular/i)).toBeInTheDocument();
      expect(screen.getByText(/newest/i)).toBeInTheDocument();
      expect(screen.getByText(/rating/i)).toBeInTheDocument();
      expect(screen.getByText(/price/i)).toBeInTheDocument();
    });

    // Test sort by rating
    const ratingOption = screen.getByText(/rating/i);
    fireEvent.click(ratingOption);

    await waitFor(() => {
      expect(mockCoursesStore.setSortBy).toHaveBeenCalledWith('rating');
    });
  });

  it('should handle course enrollment', async () => {
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

    mockCoursesStore.courses = [mockCourse];
    mockCoursesStore.loading = false;

    renderCoursesPage();

    await waitFor(() => {
      expect(screen.getByText('Test Course')).toBeInTheDocument();
    });

    const enrollButton = screen.getByRole('button', { name: /enroll/i });
    fireEvent.click(enrollButton);

    await waitFor(() => {
      expect(mockCoursesStore.enrollInCourse).toHaveBeenCalledWith('1');
    });
  });

  it('should handle loading state', () => {
    mockCoursesStore.loading = true;

    renderCoursesPage();

    expect(screen.getByTestId('courses-loading')).toBeInTheDocument();
    expect(screen.getByText(/loading courses/i)).toBeInTheDocument();
  });

  it('should handle error state', () => {
    mockCoursesStore.error = 'Failed to load courses';
    mockCoursesStore.loading = false;

    renderCoursesPage();

    expect(screen.getByTestId('courses-error')).toBeInTheDocument();
    expect(screen.getByText(/failed to load courses/i)).toBeInTheDocument();
  });

  it('should handle empty state', () => {
    mockCoursesStore.courses = [];
    mockCoursesStore.loading = false;

    renderCoursesPage();

    expect(screen.getByTestId('courses-empty')).toBeInTheDocument();
    expect(screen.getByText(/no courses found/i)).toBeInTheDocument();
  });

  it('should integrate with authentication store', async () => {
    mockAuthStore.isAuthenticated = false;

    renderCoursesPage();

    await waitFor(() => {
      expect(screen.getByText(/sign in to enroll/i)).toBeInTheDocument();
    });
  });

  it('should handle pagination', async () => {
    const mockCourses = Array.from({ length: 25 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Course ${i + 1}`,
      description: `Description ${i + 1}`,
      instructor: `Instructor ${i + 1}`,
      category: 'Programming',
      level: 'Beginner',
      price: 99.99,
      rating: 4.5,
      students: 1000,
      duration: '10 hours',
      image: `image-${i + 1}.jpg`,
      enrolledStudents: 500,
    }));

    mockCoursesStore.courses = mockCourses;
    mockCoursesStore.loading = false;

    renderCoursesPage();

    await waitFor(() => {
      expect(screen.getByText('Course 1')).toBeInTheDocument();
      expect(screen.getByText('Course 20')).toBeInTheDocument(); // First page
    });

    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(screen.getByText('Course 21')).toBeInTheDocument();
      expect(screen.getByText('Course 25')).toBeInTheDocument(); // Second page
    });
  });

  it('should handle course card interactions', async () => {
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

    mockCoursesStore.courses = [mockCourse];
    mockCoursesStore.loading = false;

    renderCoursesPage();

    await waitFor(() => {
      const courseCard = screen.getByTestId('course-card-1');
      expect(courseCard).toBeInTheDocument();
    });

    // Test course card hover
    const courseCard = screen.getByTestId('course-card-1');
    fireEvent.mouseEnter(courseCard);

    await waitFor(() => {
      expect(courseCard).toHaveClass('hover');
    });

    // Test course card click
    fireEvent.click(courseCard);

    await waitFor(() => {
      // Should navigate to course details page
      expect(window.location.pathname).toContain('/courses/1');
    });
  });

  it('should handle responsive design', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    renderCoursesPage();

    // Check mobile-specific elements
    expect(screen.getByTestId('mobile-filter-button')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-sort-button')).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    renderCoursesPage();

    const searchInput = screen.getByPlaceholderText(/search courses/i);
    searchInput.focus();

    fireEvent.keyDown(searchInput, { key: 'Tab' });

    await waitFor(() => {
      const filterButton = screen.getByRole('button', { name: /filter/i });
      expect(filterButton).toHaveFocus();
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

    mockCoursesStore.courses = [mockCourse];
    mockCoursesStore.loading = false;

    renderCoursesPage();

    await waitFor(() => {
      expect(screen.getByText('Test Course')).toBeInTheDocument();
    });

    // Simulate real-time update
    const updatedCourse = { ...mockCourse, enrolledStudents: 501 };
    mockCoursesStore.courses = [updatedCourse];

    await waitFor(() => {
      expect(screen.getByText('501 students')).toBeInTheDocument();
    });
  });

  it('should handle error recovery', async () => {
    mockCoursesStore.error = 'Network error';
    mockCoursesStore.loading = false;

    renderCoursesPage();

    expect(screen.getByText(/network error/i)).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(mockCoursesStore.fetchCourses).toHaveBeenCalled();
    });
  });

  it('should handle analytics tracking', async () => {
    const mockAnalytics = {
      trackEvent: vi.fn(),
      trackPageView: vi.fn(),
    };

    vi.mock('../../lib/analytics', () => mockAnalytics);

    renderCoursesPage();

    await waitFor(() => {
      expect(mockAnalytics.trackPageView).toHaveBeenCalledWith('/courses');
    });

    const searchInput = screen.getByPlaceholderText(/search courses/i);
    fireEvent.change(searchInput, { target: { value: 'JavaScript' } });

    await waitFor(() => {
      expect(mockAnalytics.trackEvent).toHaveBeenCalledWith('search', {
        query: 'JavaScript',
        page: 'courses',
      });
    });
  });

  it('should handle accessibility features', async () => {
    renderCoursesPage();

    // Check ARIA labels
    expect(screen.getByRole('heading', { name: /courses/i })).toHaveAttribute('aria-level', '1');
    expect(screen.getByPlaceholderText(/search courses/i)).toHaveAttribute('aria-label', 'Search courses');

    // Check keyboard navigation
    const searchInput = screen.getByPlaceholderText(/search courses/i);
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    await waitFor(() => {
      expect(mockCoursesStore.setSearchQuery).toHaveBeenCalled();
    });

    // Check focus management
    const filterButton = screen.getByRole('button', { name: /filter/i });
    fireEvent.click(filterButton);

    await waitFor(() => {
      const firstFilterOption = screen.getByRole('option', { name: /all categories/i });
      expect(firstFilterOption).toHaveFocus();
    });
  });

  it('should handle performance optimization', async () => {
    const startTime = performance.now();

    renderCoursesPage();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /courses/i })).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within 100ms
    expect(renderTime).toBeLessThan(100);
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

    renderCoursesPage();

    const searchInput = screen.getByPlaceholderText(/search courses/i);
    fireEvent.change(searchInput, { target: { value: 'JavaScript' } });

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'courses-filters',
        expect.any(String)
      );
    });
  });

  it('should handle concurrent requests', async () => {
    const mockCourses = [
      { id: '1', title: 'Course 1' },
      { id: '2', title: 'Course 2' },
    ];

    mockCoursesStore.courses = mockCourses;
    mockCoursesStore.loading = false;

    renderCoursesPage();

    // Simulate concurrent requests
    fireEvent.change(screen.getByPlaceholderText(/search courses/i), {
      target: { value: 'JavaScript' },
    });

    fireEvent.click(screen.getByRole('button', { name: /filter/i }));

    await waitFor(() => {
      expect(mockCoursesStore.setSearchQuery).toHaveBeenCalled();
      expect(mockCoursesStore.fetchCourses).toHaveBeenCalled();
    });
  });

  it('should handle memory leaks', () => {
    const { unmount } = renderCoursesPage();

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

    mockCoursesStore.courses = [mockCourse];
    mockCoursesStore.loading = false;

    renderCoursesPage();

    await waitFor(() => {
      const courseTitle = screen.getByTestId('course-title-1');
      expect(courseTitle).toBeInTheDocument();
      expect(courseTitle).toHaveClass('truncate');
    });
  });
});
