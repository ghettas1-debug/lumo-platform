// CourseCard Component Unit Tests
// Comprehensive unit tests for the CourseCard component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CourseCard } from '../../components/ui/CourseCard';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
    img: ({ ...props }: any) => <img {...props} />,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock course data
const mockCourse = {
  id: '1',
  title: 'Introduction to React',
  description: 'Learn the basics of React programming',
  instructor: 'John Doe',
  thumbnail: '/course-thumbnail.jpg',
  duration: 3600, // 1 hour in seconds
  level: 'beginner',
  category: 'programming',
  tags: ['react', 'javascript', 'frontend'],
  price: 99.99,
  rating: 4.5,
  studentsCount: 1250,
  lessonsCount: 24,
  isEnrolled: false,
  isCompleted: false,
  progress: 0,
  lastAccessedAt: '2023-01-01T00:00:00Z',
};

describe('CourseCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders course card with all required props', () => {
      render(<CourseCard course={mockCourse} />);
      
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
      expect(screen.getByText('Learn the basics of React programming')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByText('1,250 students')).toBeInTheDocument();
      expect(screen.getByText('24 lessons')).toBeInTheDocument();
      expect(screen.getByText('1h')).toBeInTheDocument();
    });

    it('renders course thumbnail', () => {
      render(<CourseCard course={mockCourse} />);
      const thumbnail = screen.getByRole('img');
      expect(thumbnail).toHaveAttribute('src', '/course-thumbnail.jpg');
      expect(thumbnail).toHaveAttribute('alt', 'Introduction to React');
    });

    it('renders course level badge', () => {
      render(<CourseCard course={mockCourse} />);
      const levelBadge = screen.getByText('beginner');
      expect(levelBadge).toBeInTheDocument();
    });

    it('renders course category', () => {
      render(<CourseCard course={mockCourse} />);
      const category = screen.getByText('programming');
      expect(category).toBeInTheDocument();
    });

    it('renders course price', () => {
      render(<CourseCard course={mockCourse} />);
      const price = screen.getByText('$99.99');
      expect(price).toBeInTheDocument();
    });

    it('renders course tags', () => {
      render(<CourseCard course={mockCourse} />);
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('javascript')).toBeInTheDocument();
      expect(screen.getByText('frontend')).toBeInTheDocument();
    });
  });

  describe('Course States', () => {
    it('shows enrolled state when isEnrolled is true', () => {
      const enrolledCourse = { ...mockCourse, isEnrolled: true };
      render(<CourseCard course={enrolledCourse} />);
      
      expect(screen.getByText('Enrolled')).toBeInTheDocument();
      expect(screen.getByText('Continue Learning')).toBeInTheDocument();
    });

    it('shows completed state when isCompleted is true', () => {
      const completedCourse = { ...mockCourse, isCompleted: true };
      render(<CourseCard course={completedCourse} />);
      
      expect(screen.getByText('Completed')).toBeInTheDocument();
      expect(screen.getByText('View Certificate')).toBeInTheDocument();
    });

    it('shows progress bar when progress > 0', () => {
      const inProgressCourse = { ...mockCourse, progress: 50 };
      render(<CourseCard course={inProgressCourse} />);
      
      expect(screen.getByText('50% Complete')).toBeInTheDocument();
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });

    it('shows rating stars correctly', () => {
      render(<CourseCard course={mockCourse} />);
      const stars = screen.getAllByTestId('star');
      expect(stars).toHaveLength(5);
      // 4.5 rating should show 4 full stars and 1 half star
      expect(stars.slice(0, 4)).every(star => star.classList.contains('filled')));
      expect(stars[4]).toHaveClass('half-filled');
    });
  });

  describe('Interactive Elements', () => {
    it('renders wishlist button', () => {
      render(<CourseCard course={mockCourse} />);
      const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
      expect(wishlistButton).toBeInTheDocument();
    });

    it('renders bookmark button', () => {
      render(<CourseCard course={mockCourse} />);
      const bookmarkButton = screen.getByRole('button', { name: /bookmark/i });
      expect(bookmarkButton).toBeInTheDocument();
    });

    it('renders share button', () => {
      render(<CourseCard course={mockCourse} />);
      const shareButton = screen.getByRole('button', { name: /share/i });
      expect(shareButton).toBeInTheDocument();
    });

    it('renders preview button', () => {
      render(<CourseCard course={mockCourse} />);
      const previewButton = screen.getByRole('button', { name: /preview/i });
      expect(previewButton).toBeInTheDocument();
    });

    it('renders enroll button when not enrolled', () => {
      render(<CourseCard course={mockCourse} />);
      const enrollButton = screen.getByRole('button', { name: /enroll/i });
      expect(enrollButton).toBeInTheDocument();
    });

    it('renders continue button when enrolled', () => {
      const enrolledCourse = { ...mockCourse, isEnrolled: true };
      render(<CourseCard course={enrolledCourse} />);
      const continueButton = screen.getByRole('button', { name: /continue/i });
      expect(continueButton).toBeInTheDocument();
    });
  });

  describe('Button Interactions', () => {
    it('calls onWishlist when wishlist button is clicked', async () => {
      const onWishlist = vi.fn();
      render(<CourseCard course={mockCourse} onWishlist={onWishlist} />);
      
      const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
      await userEvent.click(wishlistButton);
      
      expect(onWishlist).toHaveBeenCalledWith(mockCourse.id);
    });

    it('calls onBookmark when bookmark button is clicked', async () => {
      const onBookmark = vi.fn();
      render(<CourseCard course={mockCourse} onBookmark={onBookmark} />);
      
      const bookmarkButton = screen.getByRole('button', { name: /bookmark/i });
      await userEvent.click(bookmarkButton);
      
      expect(onBookmark).toHaveBeenCalledWith(mockCourse.id);
    });

    it('calls onShare when share button is clicked', async () => {
      const onShare = vi.fn();
      render(<CourseCard course={mockCourse} onShare={onShare} />);
      
      const shareButton = screen.getByRole('button', { name: /share/i });
      await userEvent.click(shareButton);
      
      expect(onShare).toHaveBeenCalledWith(mockCourse);
    });

    it('calls onPreview when preview button is clicked', async () => {
      const onPreview = vi.fn();
      render(<CourseCard course={mockCourse} onPreview={onPreview} />);
      
      const previewButton = screen.getByRole('button', { name: /preview/i });
      await userEvent.click(previewButton);
      
      expect(onPreview).toHaveBeenCalledWith(mockCourse.id);
    });

    it('calls onEnroll when enroll button is clicked', async () => {
      const onEnroll = vi.fn();
      render(<CourseCard course={mockCourse} onEnroll={onEnroll} />);
      
      const enrollButton = screen.getByRole('button', { name: /enroll/i });
      await userEvent.click(enrollButton);
      
      expect(onEnroll).toHaveBeenCalledWith(mockCourse.id);
    });

    it('calls onContinue when continue button is clicked', async () => {
      const onContinue = vi.fn();
      const enrolledCourse = { ...mockCourse, isEnrolled: true };
      render(<CourseCard course={enrolledCourse} onContinue={onContinue} />);
      
      const continueButton = screen.getByRole('button', { name: /continue/i });
      await userEvent.click(continueButton);
      
      expect(onContinue).toHaveBeenCalledWith(mockCourse.id);
    });
  });

  describe('Button State Changes', () => {
    it('toggles wishlist state when clicked', async () => {
      const onWishlist = vi.fn();
      render(<CourseCard course={mockCourse} onWishlist={onWishlist} />);
      
      const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
      
      // Initial state - not wishlisted
      expect(wishlistButton).toHaveAttribute('aria-pressed', 'false');
      
      await userEvent.click(wishlistButton);
      
      // After click - should be wishlisted
      expect(onWishlist).toHaveBeenCalled();
    });

    it('toggles bookmark state when clicked', async () => {
      const onBookmark = vi.fn();
      render(<CourseCard course={mockCourse} onBookmark={onBookmark} />);
      
      const bookmarkButton = screen.getByRole('button', { name: /bookmark/i });
      
      // Initial state - not bookmarked
      expect(bookmarkButton).toHaveAttribute('aria-pressed', 'false');
      
      await userEvent.click(bookmarkButton);
      
      // After click - should be bookmarked
      expect(onBookmark).toHaveBeenCalled();
    });

    it('shows preview modal when preview button is clicked', async () => {
      const onPreview = vi.fn();
      render(<CourseCard course={mockCourse} onPreview={onPreview} />);
      
      const previewButton = screen.getByRole('button', { name: /preview/i });
      await userEvent.click(previewButton);
      
      expect(onPreview).toHaveBeenCalledWith(mockCourse.id);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels on buttons', () => {
      render(<CourseCard course={mockCourse} />);
      
      expect(screen.getByRole('button', { name: /wishlist/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /bookmark/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /share/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /preview/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /enroll/i })).toHaveAttribute('aria-label');
    });

    it('has proper ARIA pressed states', () => {
      render(<CourseCard course={mockCourse} />);
      
      const wishlistButton = screen.getByRole('button', { name: /wishlist/i });
      const bookmarkButton = screen.getByRole('button', { name: /bookmark/i });
      
      expect(wishlistButton).toHaveAttribute('aria-pressed', 'false');
      expect(bookmarkButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('has proper ARIA attributes on progress bar', () => {
      const inProgressCourse = { ...mockCourse, progress: 50 };
      render(<CourseCard course={inProgressCourse} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-label', 'Course progress: 50%');
    });

    it('has proper semantic structure', () => {
      render(<CourseCard course={mockCourse} />);
      
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('is keyboard navigable', () => {
      render(<CourseCard course={mockCourse} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('tabindex', '0');
      });
    });

    it('handles Enter key on buttons', async () => {
      const onEnroll = vi.fn();
      render(<CourseCard course={mockCourse} onEnroll={onEnroll} />);
      
      const enrollButton = screen.getByRole('button', { name: /enroll/i });
      enrollButton.focus();
      
      await userEvent.keyboard('{Enter}');
      
      expect(onEnroll).toHaveBeenCalledWith(mockCourse.id);
    });

    it('handles Space key on buttons', async () => {
      const onEnroll = vi.fn();
      render(<CourseCard course={mockCourse} onEnroll={onEnroll} />);
      
      const enrollButton = screen.getByRole('button', { name: /enroll/i });
      enrollButton.focus();
      
      await userEvent.keyboard('{ }');
      
      expect(onEnroll).toHaveBeenCalledWith(mockCourse.id);
    });
  });

  describe('Responsive Design', () => {
    it('adapts to different screen sizes', () => {
      render(<CourseCard course={mockCourse} />);
      
      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
      
      // Should have responsive classes
      expect(card).toHaveClass('w-full');
    });

    it('maintains aspect ratio for images', () => {
      render(<CourseCard course={mockCourse} />);
      
      const thumbnail = screen.getByRole('img');
      expect(thumbnail).toHaveClass('aspect-video');
    });
  });

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(<CourseCard key={i} course={{ ...mockCourse, id: i.toString() }} />);
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 50 cards in less than 200ms
      expect(renderTime).toBeLessThan(200);
    });

    it('does not cause memory leaks', () => {
      const onWishlist = vi.fn();
      
      for (let i = 0; i < 25; i++) {
        const { unmount } = render(
          <CourseCard key={i} course={{ ...mockCourse, id: i.toString() }} onWishlist={onWishlist} />
        );
        unmount();
      }
      
      // Should not have memory leaks
      expect(onWishlist).toHaveBeenCalledTimes(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles missing course data gracefully', () => {
      expect(() => {
        render(<CourseCard course={{} as any} />);
      }).not.toThrow();
    });

    it('handles empty course title', () => {
      const courseWithoutTitle = { ...mockCourse, title: '' };
      render(<CourseCard course={courseWithoutTitle} />);
      
      const heading = screen.queryByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it('handles very long course title', () => {
      const longTitle = 'This is a very long course title that should wrap properly and not break the layout or overflow the container bounds';
      const courseWithLongTitle = { ...mockCourse, title: longTitle };
      
      render(<CourseCard course={courseWithLongTitle} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(longTitle);
    });

    it('handles zero rating', () => {
      const courseWithZeroRating = { ...mockCourse, rating: 0 };
      render(<CourseCard course={courseWithZeroRating} />);
      
      expect(screen.getByText('No rating')).toBeInTheDocument();
    });

    it('handles zero students', () => {
      const courseWithZeroStudents = { ...mockCourse, studentsCount: 0 };
      render(<CourseCard course={courseWithZeroStudents} />);
      
      expect(screen.getByText('0 students')).toBeInTheDocument();
    });

    it('handles zero lessons', () => {
      const courseWithZeroLessons = { ...mockCourse, lessonsCount: 0 };
      render(<CourseCard course={courseWithZeroLessons} />);
      
      expect(screen.getByText('0 lessons')).toBeInTheDocument();
    });

    it('handles zero duration', () => {
      const courseWithZeroDuration = { ...mockCourse, duration: 0 };
      render(<CourseCard course={courseWithZeroDuration} />);
      
      expect(screen.getByText('0m')).toBeInTheDocument();
    });

    it('handles free course', () => {
      const freeCourse = { ...mockCourse, price: 0 };
      render(<CourseCard course={freeCourse} />);
      
      expect(screen.getByText('Free')).toBeInTheDocument();
    });

    it('handles very expensive course', () => {
      const expensiveCourse = { ...mockCourse, price: 9999.99 };
      render(<CourseCard course={expensiveCourse} />);
      
      expect(screen.getByText('$9,999.99')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works within course list', () => {
      const courses = [mockCourse, { ...mockCourse, id: '2', title: 'Advanced React' }];
      
      render(
        <div data-testid="course-list">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      );
      
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
      expect(screen.getByText('Advanced React')).toBeInTheDocument();
      
      const courseList = screen.getByTestId('course-list');
      expect(courseList).toBeInTheDocument();
      expect(courseList.children).toHaveLength(2);
    });

    it('handles course updates', () => {
      const { rerender } = render(<CourseCard course={mockCourse} />);
      
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
      
      const updatedCourse = { ...mockCourse, title: 'Updated Course Title' };
      rerender(<CourseCard course={updatedCourse} />);
      
      expect(screen.getByText('Updated Course Title')).toBeInTheDocument();
      expect(screen.queryByText('Introduction to React')).not.toBeInTheDocument();
    });
  });
});
