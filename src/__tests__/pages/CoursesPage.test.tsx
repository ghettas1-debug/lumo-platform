// CoursesPage Integration Tests
// Comprehensive integration tests for the CoursesPage

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CoursesPage from '../../app/courses/page';

// Mock Zustand store
vi.mock('../../lib/state/store', () => ({
  useUIStore: () => ({
    isLoading: false,
    setLoading: vi.fn(),
    theme: 'light',
    sidebarOpen: true,
    toggleSidebar: vi.fn(),
  }),
  useCourseStore: () => ({
    courses: [
      {
        id: '1',
        title: 'Introduction to React',
        description: 'Learn React from scratch',
        instructor: 'John Doe',
        level: 'beginner',
        duration: '8 weeks',
        price: 99.99,
        rating: 4.5,
        enrolled: 1234,
        image: '/react-course.jpg',
        category: 'Development',
        tags: ['React', 'JavaScript', 'Frontend'],
        progress: 0,
        isBookmarked: false,
        isEnrolled: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        id: '2',
        title: 'Advanced TypeScript',
        description: 'Master TypeScript concepts',
        instructor: 'Jane Smith',
        level: 'advanced',
        duration: '12 weeks',
        price: 149.99,
        rating: 4.8,
        enrolled: 567,
        image: '/typescript-course.jpg',
        category: 'Development',
        tags: ['TypeScript', 'JavaScript', 'Backend'],
        progress: 0,
        isBookmarked: true,
        isEnrolled: true,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15',
      },
    ],
    loading: false,
    error: null,
    fetchCourses: vi.fn(),
    searchCourses: vi.fn(),
    filterCourses: vi.fn(),
    enrollInCourse: vi.fn(),
    bookmarkCourse: vi.fn(),
    rateCourse: vi.fn(),
  }),
  useUserStore: () => ({
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: '/avatar.jpg',
      role: 'student',
      preferences: {
        language: 'en',
        theme: 'light',
        notifications: true,
      },
    },
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    updateProfile: vi.fn(),
  }),
}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn((key) => {
      const params = { page: '1', category: 'all', level: 'all' };
      return params[key];
    }),
  }),
}));

// Mock fetch API
global.fetch = vi.fn();

describe('CoursesPage Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetch).mockClear();
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('should render courses page correctly', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Courses')).toBeInTheDocument();
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
      expect(screen.getByText('Advanced TypeScript')).toBeInTheDocument();
    });
  });

  it('should display course cards with correct information', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const reactCourse = screen.getByText('Introduction to React');
      expect(reactCourse).toBeInTheDocument();
      
      expect(screen.getByText('Learn React from scratch')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('beginner')).toBeInTheDocument();
      expect(screen.getByText('8 weeks')).toBeInTheDocument();
      expect(screen.getByText('$99.99')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('1,234 enrolled')).toBeInTheDocument();
    });
  });

  it('should handle course search functionality', async () => {
    renderWithRouter(<CoursesPage />);
    
    const searchInput = screen.getByPlaceholderText('Search courses...');
    fireEvent.change(searchInput, { target: { value: 'React' } });
    
    await waitFor(() => {
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
      expect(screen.queryByText('Advanced TypeScript')).not.toBeInTheDocument();
    });
  });

  it('should handle course filtering by category', async () => {
    renderWithRouter(<CoursesPage />);
    
    const categoryFilter = screen.getByText('Development');
    fireEvent.click(categoryFilter);
    
    await waitFor(() => {
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
      expect(screen.getByText('Advanced TypeScript')).toBeInTheDocument();
    });
  });

  it('should handle course filtering by level', async () => {
    renderWithRouter(<CoursesPage />);
    
    const levelFilter = screen.getByText('beginner');
    fireEvent.click(levelFilter);
    
    await waitFor(() => {
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
      expect(screen.queryByText('Advanced TypeScript')).not.toBeInTheDocument();
    });
  });

  it('should handle course enrollment', async () => {
    const mockEnroll = vi.mocked(require('../../lib/state/store').useCourseStore().enrollInCourse);
    
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const enrollButton = screen.getAllByText('Enroll')[0];
      fireEvent.click(enrollButton);
    });
    
    expect(mockEnroll).toHaveBeenCalledWith('1');
  });

  it('should handle course bookmarking', async () => {
    const mockBookmark = vi.mocked(require('../../lib/state/store').useCourseStore().bookmarkCourse);
    
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const bookmarkButton = screen.getAllByLabelText('Bookmark')[0];
      fireEvent.click(bookmarkButton);
    });
    
    expect(mockBookmark).toHaveBeenCalledWith('1');
  });

  it('should handle course rating', async () => {
    const mockRate = vi.mocked(require('../../lib/state/store').useCourseStore().rateCourse);
    
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const ratingStars = screen.getAllByLabelText('Rate course')[0];
      fireEvent.click(ratingStars);
    });
    
    expect(mockRate).toHaveBeenCalledWith('1', expect.any(Number));
  });

  it('should handle pagination', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const nextPageButton = screen.getByText('Next');
      fireEvent.click(nextPageButton);
    });
    
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });

  it('should handle sorting options', async () => {
    renderWithRouter(<CoursesPage />);
    
    const sortDropdown = screen.getByText('Sort by');
    fireEvent.click(sortDropdown);
    
    await waitFor(() => {
      const sortByRating = screen.getByText('Rating');
      fireEvent.click(sortByRating);
    });
    
    expect(screen.getByText('Sorted by Rating')).toBeInTheDocument();
  });

  it('should handle loading state', async () => {
    vi.mocked(require('../../lib/state/store').useCourseStore).mockReturnValue({
      courses: [],
      loading: true,
      error: null,
      fetchCourses: vi.fn(),
      searchCourses: vi.fn(),
      filterCourses: vi.fn(),
      enrollInCourse: vi.fn(),
      bookmarkCourse: vi.fn(),
      rateCourse: vi.fn(),
    });
    
    renderWithRouter(<CoursesPage />);
    
    expect(screen.getByTestId('courses-loading')).toBeInTheDocument();
    expect(screen.getByText('Loading courses...')).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    vi.mocked(require('../../lib/state/store').useCourseStore).mockReturnValue({
      courses: [],
      loading: false,
      error: 'Failed to load courses',
      fetchCourses: vi.fn(),
      searchCourses: vi.fn(),
      filterCourses: vi.fn(),
      enrollInCourse: vi.fn(),
      bookmarkCourse: vi.fn(),
      rateCourse: vi.fn(),
    });
    
    renderWithRouter(<CoursesPage />);
    
    expect(screen.getByTestId('courses-error')).toBeInTheDocument();
    expect(screen.getByText('Failed to load courses')).toBeInTheDocument();
  });

  it('should handle empty state', async () => {
    vi.mocked(require('../../lib/state/store').useCourseStore).mockReturnValue({
      courses: [],
      loading: false,
      error: null,
      fetchCourses: vi.fn(),
      searchCourses: vi.fn(),
      filterCourses: vi.fn(),
      enrollInCourse: vi.fn(),
      bookmarkCourse: vi.fn(),
      rateCourse: vi.fn(),
    });
    
    renderWithRouter(<CoursesPage />);
    
    expect(screen.getByTestId('courses-empty')).toBeInTheDocument();
    expect(screen.getByText('No courses found')).toBeInTheDocument();
  });

  it('should handle responsive design', async () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mobile-courses-grid')).toBeInTheDocument();
    });
  });

  it('should handle keyboard navigation', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const firstCourse = screen.getByText('Introduction to React');
      firstCourse.focus();
      
      fireEvent.keyDown(firstCourse, { key: 'Enter' });
      
      expect(screen.getByTestId('course-modal')).toBeInTheDocument();
    });
  });

  it('should handle accessibility features', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const courseCards = screen.getAllByRole('article');
      courseCards.forEach(card => {
        expect(card).toHaveAttribute('aria-label');
      });
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });
  });

  it('should handle course detail navigation', async () => {
    const mockPush = vi.mocked(require('next/navigation').useRouter().push);
    
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const courseLink = screen.getByText('Introduction to React');
      fireEvent.click(courseLink);
    });
    
    expect(mockPush).toHaveBeenCalledWith('/courses/1');
  });

  it('should handle course comparison', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const compareButtons = screen.getAllByLabelText('Compare');
      compareButtons.forEach(button => fireEvent.click(button));
    });
    
    expect(screen.getByTestId('compare-modal')).toBeInTheDocument();
    expect(screen.getByText('Compare Courses')).toBeInTheDocument();
  });

  it('should handle course sharing', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const shareButton = screen.getAllByLabelText('Share')[0];
      fireEvent.click(shareButton);
    });
    
    expect(screen.getByTestId('share-modal')).toBeInTheDocument();
    expect(screen.getByText('Share Course')).toBeInTheDocument();
  });

  it('should handle course recommendations', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const recommendationsSection = screen.getByTestId('recommendations');
      expect(recommendationsSection).toBeInTheDocument();
      expect(screen.getByText('Recommended for you')).toBeInTheDocument();
    });
  });

  it('should handle course reviews', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const reviewsSection = screen.getByTestId('reviews');
      expect(reviewsSection).toBeInTheDocument();
      expect(screen.getByText('Student Reviews')).toBeInTheDocument();
    });
  });

  it('should handle course progress tracking', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const progressBars = screen.getAllByTestId('course-progress');
      progressBars.forEach(progressBar => {
        expect(progressBar).toBeInTheDocument();
      });
    });
  });

  it('should handle course certificates', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const certificateButton = screen.getAllByLabelText('Certificate')[0];
      fireEvent.click(certificateButton);
    });
    
    expect(screen.getByTestId('certificate-modal')).toBeInTheDocument();
  });

  it('should handle course notifications', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const notificationButton = screen.getByLabelText('Notifications');
      fireEvent.click(notificationButton);
    });
    
    expect(screen.getByTestId('notification-panel')).toBeInTheDocument();
  });

  it('should handle course wishlist', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const wishlistButton = screen.getByLabelText('Wishlist');
      fireEvent.click(wishlistButton);
    });
    
    expect(screen.getByTestId('wishlist-modal')).toBeInTheDocument();
  });

  it('should handle course analytics', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const analyticsButton = screen.getByLabelText('Analytics');
      fireEvent.click(analyticsButton);
    });
    
    expect(screen.getByTestId('analytics-modal')).toBeInTheDocument();
  });

  it('should handle course filters reset', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const resetButton = screen.getByText('Reset Filters');
      fireEvent.click(resetButton);
    });
    
    expect(screen.getByText('All Filters Reset')).toBeInTheDocument();
  });

  it('should handle course export', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const exportButton = screen.getByText('Export');
      fireEvent.click(exportButton);
    });
    
    expect(screen.getByTestId('export-modal')).toBeInTheDocument();
  });

  it('should handle course import', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const importButton = screen.getByText('Import');
      fireEvent.click(importButton);
    });
    
    expect(screen.getByTestId('import-modal')).toBeInTheDocument();
  });

  it('should handle course bulk actions', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => fireEvent.click(checkbox));
      
      const bulkActionsButton = screen.getByText('Bulk Actions');
      fireEvent.click(bulkActions);
    });
    
    expect(screen.getByTestId('bulk-actions-modal')).toBeInTheDocument();
  });

  it('should handle course search suggestions', async () => {
    renderWithRouter(<CoursesPage />);
    
    const searchInput = screen.getByPlaceholderText('Search courses...');
    fireEvent.change(searchInput, { target: { value: 'Re' } });
    
    await waitFor(() => {
      expect(screen.getByTestId('search-suggestions')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Redux')).toBeInTheDocument();
    });
  });

  it('should handle course tags filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const tagButton = screen.getByText('React');
      fireEvent.click(tagButton);
    });
    
    expect(screen.getByText('Filtered by: React')).toBeInTheDocument();
  });

  it('should handle course price filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const priceFilter = screen.getByText('Price Range');
      fireEvent.click(priceFilter);
      
      const priceRange = screen.getByTestId('price-range');
      fireEvent.change(priceRange, { target: { value: '0-100' } });
    });
    
    expect(screen.getByText('Price: $0 - $100')).toBeInTheDocument();
  });

  it('should handle course duration filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const durationFilter = screen.getByText('Duration');
      fireEvent.click(durationFilter);
      
      const durationRange = screen.getByTestId('duration-range');
      fireEvent.change(durationRange, { target: { value: '1-4' } });
    });
    
    expect(screen.getByText('Duration: 1-4 weeks')).toBeInTheDocument();
  });

  it('should handle course instructor filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const instructorFilter = screen.getByText('Instructor');
      fireEvent.click(instructorFilter);
      
      const instructorSelect = screen.getByTestId('instructor-select');
      fireEvent.change(instructorSelect, { target: { value: 'john-doe' } });
    });
    
    expect(screen.getByText('Instructor: John Doe')).toBeInTheDocument();
  });

  it('should handle course date filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const dateFilter = screen.getByText('Date');
      fireEvent.click(dateFilter);
      
      const dateRange = screen.getByTestId('date-range');
      fireEvent.change(dateRange, { target: { value: '2024-01-01' } });
    });
    
    expect(screen.getByText('From: 2024-01-01')).toBeInTheDocument();
  });

  it('should handle course rating filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const ratingFilter = screen.getByText('Rating');
      fireEvent.click(ratingFilter);
      
      const ratingStars = screen.getAllByLabelText('Rating star');
      fireEvent.click(ratingStars[3]); // 4 stars
    });
    
    expect(screen.getByText('Rating: 4+ stars')).toBeInTheDocument();
  });

  it('should handle course enrollment status filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const enrollmentFilter = screen.getByText('Enrollment');
      fireEvent.click(enrollmentFilter);
      
      const enrolledOption = screen.getByText('Enrolled');
      fireEvent.click(enrolledOption);
    });
    
    expect(screen.getByText('Status: Enrolled')).toBeInTheDocument();
  });

  it('should handle course bookmark status filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const bookmarkFilter = screen.getByText('Bookmarked');
      fireEvent.click(bookmarkFilter);
    });
    
    expect(screen.getByText('Bookmarked Courses')).toBeInTheDocument();
  });

  it('should handle course completion status filtering', async () => {
    renderWithRouter(<CoursesPage />);
    
    await waitFor(() => {
      const completionFilter = screen.getByText('Completion');
      fireEvent.click(completionFilter);
      
      const completedOption = screen.getByText('Completed');
      fireEvent.click(completedOption);
    });
    
    expect(screen.getByText('Completed Courses')).toBeInTheDocument();
  });
});
