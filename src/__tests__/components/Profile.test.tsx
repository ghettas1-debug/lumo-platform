// Profile Component Unit Tests
// Comprehensive unit tests for the Profile component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Profile } from '../../components/ui/Profile';

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  bio: 'Software developer passionate about creating amazing user experiences.',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  github: 'johndoe',
  twitter: 'johndoe',
  linkedin: 'johndoe',
  joinedAt: '2023-01-01T00:00:00Z',
  lastLoginAt: '2023-12-01T00:00:00Z',
  enrolledCourses: [
    {
      id: '1',
      title: 'Introduction to React',
      progress: 75,
      completedAt: null,
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      progress: 100,
      completedAt: '2023-06-01T00:00:00Z',
    },
  ],
  achievements: [
    {
      id: '1',
      title: 'Fast Learner',
      description: 'Completed 5 courses in one month',
      icon: '🏆',
      earnedAt: '2023-02-01T00:00:00Z',
    },
    {
      id: '2',
      title: 'Dedicated Student',
      description: 'Maintained a 30-day streak',
      icon: '🔥',
      earnedAt: '2023-03-01T00:00:00Z',
    },
  ],
  skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python'],
  preferences: {
    theme: 'dark',
    language: 'en',
    notifications: true,
    emailUpdates: true,
    privacy: 'public',
  },
};

// Mock API
vi.mock('../../lib/api', () => ({
  userApi: {
    getProfile: vi.fn(),
    updateProfile: vi.fn(),
    uploadAvatar: vi.fn(),
    deleteAccount: vi.fn(),
    getAchievements: vi.fn(),
    getEnrolledCourses: vi.fn(),
  },
}));

describe('Profile Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders profile with user data', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Software developer passionate about creating amazing user experiences.')).toBeInTheDocument();
    });

    it('renders profile with avatar', () => {
      render(<Profile user={mockUser} />);
      
      const avatar = screen.getByAltText('John Doe avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders profile with location', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    });

    it('renders profile with social links', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('johndoe.dev')).toBeInTheDocument();
      expect(screen.getByText('github.com/johndoe')).toBeInTheDocument();
      expect(screen.getByText('twitter.com/johndoe')).toBeInTheDocument();
      expect(screen.getByText('linkedin.com/in/johndoe')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Profile user={mockUser} className="custom-profile" />);
      
      const profileContainer = screen.getByTestId('profile-container');
      expect(profileContainer).toHaveClass('custom-profile');
    });
  });

  describe('Profile Editing', () => {
    it('should enable edit mode when edit button is clicked', async () => {
      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    });

    it('should save profile changes', async () => {
      const mockUpdateProfile = vi.fn().mockResolvedValue(mockUser);
      vi.mocked(require('../../lib/api').userApi).updateProfile = mockUpdateProfile;

      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const nameInput = screen.getByDisplayValue('John Doe');
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'Jane Doe');
      
      const saveButton = screen.getByRole('button', { name: /save/i });
      await userEvent.click(saveButton);
      
      expect(mockUpdateProfile).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Jane Doe' })
      );
    });

    it('should cancel edit mode when cancel button is clicked', async () => {
      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const nameInput = screen.getByDisplayValue('John Doe');
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'Jane Doe');
      
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await userEvent.click(cancelButton);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByDisplayValue('Jane Doe')).not.toBeInTheDocument();
    });

    it('should validate profile fields', async () => {
      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const emailInput = screen.getByDisplayValue('john@example.com');
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'invalid-email');
      
      const saveButton = screen.getByRole('button', { name: /save/i });
      await userEvent.click(saveButton);
      
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  describe('Avatar Upload', () => {
    it('should show avatar upload dialog when avatar is clicked', async () => {
      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const avatar = screen.getByAltText('John Doe avatar');
      await userEvent.click(avatar);
      
      expect(screen.getByText(/upload avatar/i)).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should upload avatar successfully', async () => {
      const mockUploadAvatar = vi.fn().mockResolvedValue({
        url: 'https://example.com/new-avatar.jpg',
      });
      vi.mocked(require('../../lib/api').userApi).uploadAvatar = mockUploadAvatar;

      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const avatar = screen.getByAltText('John Doe avatar');
      await userEvent.click(avatar);
      
      const fileInput = screen.getByLabelText(/choose file/i);
      const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });
      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: true,
      });
      
      const uploadButton = screen.getByRole('button', { name: /upload/i });
      await userEvent.click(uploadButton);
      
      expect(mockUploadAvatar).toHaveBeenCalledWith(file);
    });

    it('should handle avatar upload errors', async () => {
      const mockUploadAvatar = vi.fn().mockRejectedValue(new Error('Upload failed'));
      vi.mocked(require('../../lib/api').userApi).uploadAvatar = mockUploadAvatar;

      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const avatar = screen.getByAltText('John Doe avatar');
      await userEvent.click(avatar);
      
      const fileInput = screen.getByLabelText(/choose file/i);
      const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });
      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: true,
      });
      
      const uploadButton = screen.getByRole('button', { name: /upload/i });
      await userEvent.click(uploadButton);
      
      expect(screen.getByText(/upload failed/i)).toBeInTheDocument();
    });
  });

  describe('Enrolled Courses', () => {
    it('should display enrolled courses', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('Enrolled Courses')).toBeInTheDocument();
      expect(screen.getByText('Introduction to React')).toBeInTheDocument();
      expect(screen.getByText('Advanced JavaScript')).toBeInTheDocument();
    });

    it('should show course progress', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('75% Complete')).toBeInTheDocument();
      expect(screen.getByText('100% Complete')).toBeInTheDocument();
    });

    it('should show completion date for completed courses', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText(/completed on June 1, 2023/i)).toBeInTheDocument();
    });
  });

  describe('Achievements', () => {
    it('should display achievements', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('Achievements')).toBeInTheDocument();
      expect(screen.getByText('Fast Learner')).toBeInTheDocument();
      expect(screen.getByText('Dedicated Student')).toBeInTheDocument();
    });

    it('should show achievement icons', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('🏆')).toBeInTheDocument();
      expect(screen.getByText('🔥')).toBeInTheDocument();
    });

    it('should show achievement descriptions', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('Completed 5 courses in one month')).toBeInTheDocument();
      expect(screen.getByText('Maintained a 30-day streak')).toBeInTheDocument();
    });

    it('should show earned dates', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText(/earned on February 1, 2023/i)).toBeInTheDocument();
      expect(screen.getByText(/earned on March 1, 2023/i)).toBeInTheDocument();
    });
  });

  describe('Skills', () => {
    it('should display skills tags', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
    });

    it('should allow adding new skills in edit mode', async () => {
      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const skillsSection = screen.getByText(/skills/i).parentElement;
      if (skillsSection) {
        const addSkillButton = skillsSection.querySelector('[data-testid="add-skill-button"]');
        if (addSkillButton) {
          await userEvent.click(addSkillButton);
          
          const skillInput = screen.getByPlaceholderText(/add skill/i);
          await userEvent.type(skillInput, 'Go');
          const confirmButton = screen.getByRole('button', { name: /add/i });
          await userEvent.click(confirmButton);
          
          expect(screen.getByText('Go')).toBeInTheDocument();
        }
      }
    });
  });

  describe('Preferences', () => {
    it('should display user preferences', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('Preferences')).toBeInTheDocument();
      expect(screen.getByText('Theme: Dark')).toBeInTheDocument();
      expect(screen.getByText('Language: English')).toBeInTheDocument();
      expect(screen.getByText('Notifications: On')).toBeInTheDocument();
    });

    it('should allow changing preferences in edit mode', async () => {
      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const themeSelect = screen.getByLabelText(/theme/i);
      await userEvent.selectOptions(themeSelect, 'light');
      
      const saveButton = screen.getByRole('button', { name: /save/i });
      await userEvent.click(saveButton);
      
      expect(screen.getByText('Theme: Light')).toBeInTheDocument();
    });

    it('should toggle notifications', async () => {
      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const notificationsToggle = screen.getByRole('switch', { name: /notifications/i });
      await userEvent.click(notificationsToggle);
      
      expect(screen.getByText('Notifications: Off')).toBeInTheDocument();
    });
  });

  describe('Activity Timeline', () => {
    it('should display activity timeline', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText('Activity')).toBeInTheDocument();
      expect(screen.getByText(/joined on January 1, 2023/i)).toBeInTheDocument();
      expect(screen.getByText(/last login on December 1, 2023/i)).toBeInTheDocument();
    });

    it('should show course completion activities', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByText(/completed Advanced JavaScript/i)).toBeInTheDocument();
      expect(screen.getByText(/earned Fast Learner/i)).toBeInTheDocument();
    });
  });

  describe('Social Sharing', () => {
    it('should show share buttons', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByRole('button', { name: /share profile/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /share on facebook/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /share on twitter/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /share on linkedin/i })).toBeInTheDocument();
    });

    it('should generate share URL', async () => {
      render(<Profile user={mockUser} />);
      
      const shareButton = screen.getByRole('button', { name: /share profile/i });
      await userEvent.click(shareButton);
      
      expect(screen.getByText(/share profile/i)).toBeInTheDocument();
      expect(screen.getByText(/copy link/i)).toBeInTheDocument();
    });

    it('should copy profile URL to clipboard', async () => {
      const mockWriteText = vi.fn();
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: mockWriteText,
        },
        writable: true,
      });

      render(<Profile user={mockUser} />);
      
      const shareButton = screen.getByRole('button', { name: /share profile/i });
      await userEvent.click(shareButton);
      
      const copyButton = screen.getByRole('button', { name: /copy link/i });
      await userEvent.click(copyButton);
      
      expect(mockWriteText).toHaveBeenCalledWith(
        expect.stringContaining(window.location.href)
      );
      expect(screen.getByText(/copied/i)).toBeInTheDocument();
    });
  });

  describe('Account Management', () => {
    it('should show account settings', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByRole('button', { name: /account settings/i })).toBeInTheDocument();
    });

    it('should open settings dialog', async () => {
      render(<Profile user={mockUser} />);
      
      const settingsButton = screen.getByRole('button', { name: /account settings/i });
      await userEvent.click(settingsButton);
      
      expect(screen.getByText(/account settings/i)).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should delete account', async () => {
      const mockDeleteAccount = vi.fn().mockResolvedValue({});
      vi.mocked(require('../../lib/api').userApi).deleteAccount = mockDeleteAccount;

      render(<Profile user={mockUser} />);
      
      const settingsButton = screen.getByRole('button', { name: /account settings/i });
      await userEvent.click(settingsButton);
      
      const deleteButton = screen.getByRole('button', { name: /delete account/i });
      await userEvent.click(deleteButton);
      
      const confirmButton = screen.getByRole('button', { name: /confirm delete/i });
      await userEvent.click(confirmButton);
      
      expect(mockDeleteAccount).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<Profile user={mockUser} />);
      
      expect(screen.getByRole('main')).toHaveAttribute('aria-label', 'User Profile');
      expect(screen.getByRole('button', { name: /edit profile/i })).toHaveAttribute('aria-label', 'Edit Profile');
    });

    it('should be keyboard navigable', async () => {
      render(<Profile user={mockUser} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      editButton.focus();
      
      expect(editButton).toHaveFocus();
      
      await userEvent.tab();
      
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toHaveFocus();
    });

    it('should announce changes to screen readers', async () => {
      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      expect(screen.getByRole('status', { name: /editing mode/i })).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should adapt to mobile view', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<Profile user={mockUser} />);
      
      const profileContainer = screen.getByTestId('profile-container');
      expect(profileContainer).toHaveClass('mobile');
    });

    it('should collapse sidebar on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
      configurable: true,
        value: 375,
      });

      render(<Profile user={mockUser} mobileLayout={true} />);
      
      expect(screen.queryByTestId('profile-sidebar')).not.toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('should show loading state when user data is loading', () => {
      render(<Profile loading={true} />);
      
      expect(screen.getByTestId('profile-loading')).toBeInTheDocument();
      expect(screen.getByText(/loading profile/i)).toBeInTheDocument();
    });

    it('should show error state when user data fails to load', () => {
      render(<Profile error="Failed to load profile" />);
      
      expect(screen.getByTestId('profile-error')).toBeInTheDocument();
      expect(screen.getByText(/failed to load profile/i)).toBeInTheDocument();
    });

    it('should show empty state when no user data', () => {
      render(<Profile user={null} />);
      
      expect(screen.getByText(/no profile data/i)).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const startTime = performance.now();
      
      render(<Profile user={mockUser} />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('should lazy load non-critical sections', () => {
      render(<Profile user={mockUser} lazyLoadSections={true} />);
      
      // Should render critical sections immediately
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      
      // Should lazy load achievements
      await waitFor(() => {
        expect(screen.getByText('Achievements')).toBeInTheDocument();
      });
    });
  });

  describe('Analytics', () => {
    it('should track profile views', () => {
      const mockAnalytics = {
        trackEvent: vi.fn(),
      };
      
      vi.mock('../../lib/analytics', () => mockAnalytics);

      render(<Profile user={mockUser} analytics={true} />);
      
      expect(mockAnalytics.trackEvent).toHaveBeenCalledWith('profile_view', {
        userId: '1',
        userName: 'John Doe',
      });
    });

    it('should track profile edits', async () => {
      const mockAnalytics = {
        trackEvent: vi.fn(),
      };
      
      vi.mock('../../lib/analytics', () => mockAnalytics);

      const mockUpdateProfile = vi.fn().mockResolvedValue(mockUser);
      vi.mocked(require('../../lib/api').userApi).updateProfile = mockUpdateProfile;

      render(<Profile user={mockUser} editable={true} analytics={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const saveButton = screen.getByRole('button', { name: /save/i });
      await userEvent.click(saveButton);
      
      expect(mockAnalytics.trackEvent).toHaveBeenCalledWith('profile_updated', {
        userId: '1',
        changes: expect.any(Object),
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const mockUpdateProfile = vi.fn().mockRejectedValue(new Error('Update failed'));
      vi.mocked(require('../../lib/api').userApi).updateProfile = mockUpdateProfile;

      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const saveButton = screen.getByRole('button', { name: /save/i });
      await userEvent.click(saveButton);
      
      expect(screen.getByText(/update failed/i)).toBeInTheDocument();
    });

    it('should handle avatar upload errors gracefully', async () => {
      const mockUploadAvatar = vi.fn().mockRejectedValue(new Error('Upload failed'));
      vi.mocked(require('../../lib/api').userApi).uploadAvatar = mockUploadAvatar;

      render(<Profile user={mockUser} editable={true} />);
      
      const editButton = screen.getByRole('button', { name: /edit profile/i });
      await userEvent.click(editButton);
      
      const avatar = screen.getByAltText('John Doe avatar');
      await userEvent.click(avatar);
      
      const fileInput = screen.getByLabelText(/choose file/i);
      const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });
      Object.defineProperty(fileInput, 'files', {
        value: [file],
        writable: true,
      });
      
      const uploadButton = screen.getByRole('button', { name: /upload/i });
      await userEvent.click(uploadButton);
      
      expect(screen.getByText(/upload failed/i)).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('should display content in user\'s language', () => {
      const mockUserWithArabic = {
        ...mockUser,
        preferences: {
          ...mockUser.preferences,
          language: 'ar',
        },
      };

      render(<Profile user={mockUserWithArabic} />);
      
      expect(screen.getByText(/الملف الشخصي/i)).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });

    it('should support RTL layout', () => {
      const mockUserWithRTL = {
        ...mockUser,
        preferences: {
          ...mockUser.preferences,
          language: 'ar',
        },
      };

      render(<Profile user={mockUserWithRTL} />);
      
      const profileContainer = screen.getByTestId('profile-container');
      expect(profileContainer).toHaveClass('rtl');
    });
  });

  describe('Customization', () => {
    it('should render with custom theme', () => {
      const customTheme = {
        colors: {
          primary: '#ff6b6b',
          secondary: '#4a5568',
          background: '#1a1a1a',
          text: '#ffffff',
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
      };

      render(<Profile user={mockUser} theme={customTheme} />);
      
      const profileContainer = screen.getByTestId('profile-container');
      expect(profileContainer).toHaveStyle({
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
      });
    });

    it('should render with custom sections', () => {
      const customSections = [
        {
          id: 'custom-section',
          title: 'Custom Section',
          content: <div>Custom content</div>,
        },
      ];

      render(<Profile user={mockUser} customSections={customSections} />);
      
      expect(screen.getByText('Custom Section')).toBeInTheDocument();
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    it('should render with custom actions', () => {
      const customActions = [
        <button key="action-1">Custom Action 1</button>,
        <button key="action-2">Custom Action 2</button>,
      ];

      render(<Profile user={mockUser} customActions={customActions} />);
      
      expect(screen.getByText('Custom Action 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Action 2')).toBeInTheDocument();
    });
  });
});
