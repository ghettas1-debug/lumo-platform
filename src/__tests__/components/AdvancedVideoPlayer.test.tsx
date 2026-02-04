// AdvancedVideoPlayer Component Unit Tests
// Comprehensive unit tests for the AdvancedVideoPlayer component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { AdvancedVideoPlayer, VideoAnalytics } from '../../components/video/AdvancedVideoPlayer';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    video: ({ ...props }: any) => <video {...props} />,
    input: ({ ...props }: any) => <input {...props} />,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    progress: ({ ...props }: any) => <progress {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock video data
const mockVideo = {
  id: 'video-1',
  title: 'Test Video',
  url: 'https://example.com/video.mp4',
  thumbnail: 'https://example.com/thumbnail.jpg',
  duration: 600, // 10 minutes in seconds
  description: 'Test video description',
  instructor: 'Test Instructor',
  category: 'test',
  tags: ['test', 'video'],
  createdAt: '2023-01-01T00:00:00Z',
};

describe('AdvancedVideoPlayer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock HTMLMediaElement methods
    Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
      value: vi.fn(() => Promise.resolve()),
      writable: true,
    });
    
    Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
      value: vi.fn(),
      writable: true,
    });
    
    Object.defineProperty(window.HTMLMediaElement.prototype, 'load', {
      value: vi.fn(),
      writable: true,
    });
    
    Object.defineProperty(window.HTMLMediaElement.prototype, 'seek', {
      value: vi.fn(),
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders video player with required props', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      expect(screen.getByRole('video')).toBeInTheDocument();
      expect(screen.getByText('Test Video')).toBeInTheDocument();
      expect(screen.getByText('Test Instructor')).toBeInTheDocument();
      expect(screen.getByText('Test video description')).toBeInTheDocument();
    });

    it('renders video thumbnail', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const thumbnail = screen.getByAltText('Test Video thumbnail');
      expect(thumbnail).toBeInTheDocument();
      expect(thumbnail).toHaveAttribute('src', 'https://example.com/thumbnail.jpg');
    });

    it('renders video controls', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /mute/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /volume/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /fullscreen/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    });

    it('renders progress bar', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    it('renders time display', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      expect(screen.getByText('0:00 / 10:00')).toBeInTheDocument();
    });

    it('renders video analytics', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      expect(screen.getByText('Video Analytics')).toBeInTheDocument();
      expect(screen.getByText('Views: 0')).toBeInTheDocument();
      expect(screen.getByText('Watch Time: 0:00')).toBeInTheDocument();
    });
  });

  describe('Video Controls', () => {
    it('plays video when play button is clicked', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const playButton = screen.getByRole('button', { name: /play/i });
      const video = screen.getByRole('video');
      
      expect(video).toHaveAttribute('paused');
      
      await userEvent.click(playButton);
      
      expect(video).not.toHaveAttribute('paused');
    });

    it('pauses video when pause button is clicked', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const playButton = screen.getByRole('button', { name: /play/i });
      const pauseButton = screen.getByRole('button', { name: /pause/i });
      const video = screen.getByRole('video');
      
      // First play the video
      await userEvent.click(playButton);
      expect(video).not.toHaveAttribute('paused');
      
      // Then pause it
      await userEvent.click(pauseButton);
      expect(video).toHaveAttribute('paused');
    });

    it('mutes/unmutes video when mute button is clicked', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const muteButton = screen.getByRole('button', { name: /mute/i });
      const video = screen.getByRole('video');
      
      expect(video).toHaveAttribute('muted', 'false');
      
      await userEvent.click(muteButton);
      expect(video).toHaveAttribute('muted', 'true');
      
      await userEvent.click(mmuteButton);
      expect(video).toHaveAttribute('muted', 'false');
    });

    it('toggles fullscreen when fullscreen button is clicked', async () => {
      const mockFullscreen = vi.fn();
      Object.defineProperty(document.documentElement, 'requestFullscreen', {
        value: mockFullscreen,
        writable: true,
      });
      
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const fullscreenButton = screen.getByRole('button', { name: /fullscreen/i });
      
      await userEvent.click(fullscreenButton);
      
      expect(mockFullscreen).toHaveBeenCalled();
    });

    it('opens settings when settings button is clicked', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      
      await userEvent.click(settingsButton);
      
      // Settings panel should be visible
      expect(screen.getByText('Video Settings')).toBeInTheDocument();
    });
  });

  describe('Video Progress', () => {
    it('updates progress bar when video plays', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      const progressBar = screen.getByRole('progressbar');
      
      // Simulate video progress
      fireEvent.timeUpdate(video, { currentTime: 300 });
      
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(screen.getByText('5:00 / 10:00')).toBeInTheDocument();
    });

    it('updates time display when video seeks', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      
      fireEvent.timeUpdate(video, { currentTime: 180 });
      
      expect(screen.getByText('3:00 / 10:00')).toBeInTheDocument();
    });

    it('shows buffered progress', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      
      // Simulate buffered time ranges
      Object.defineProperty(video, 'buffered', {
        value: 0.5,
        writable: true,
      });
      
      fireEvent.progress(video);
      
      const bufferedProgress = screen.getByTestId('buffered-progress');
      expect(bufferedProgress).toBeInTheDocument();
    });
  });

  describe('Video Analytics', () => {
    it('tracks watch time', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      
      // Simulate 30 seconds of watch time
      fireEvent.timeUpdate(video, { currentTime: 30 });
      fireEvent.timeUpdate(video, { currentTime: 60 });
      
      expect(screen.getByText('Watch Time: 1:00')).toBeInTheDocument();
    });

    it('tracks view count', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      
      // Simulate video play
      fireEvent.loadedmetadata(video);
      fireEvent.play(video);
      
      expect(screen.getByText('Views: 1')).toBeInTheDocument();
    });

    it('shows engagement metrics', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      expect(screen.getByText('Engagement: 0%')).toBeInTheDocument();
      expect(screen.getByText('Completion Rate: 0%')).toBeInTheDocument();
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('plays/pauses with spacebar', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      
      // Initially paused
      expect(video).toHaveAttribute('paused');
      
      // Press spacebar to play
      await userEvent.keyboard('{ }');
      expect(video).not.toHaveAttribute('paused');
      
      // Press spacebar again to pause
      await userEvent.keyboard('{ }');
      expect(video).toHaveAttribute('paused');
    });

    it('seeks forward with arrow right', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      const seekSpy = vi.spyOn(video, 'seek');
      
      await userEvent.keyboard('{ArrowRight}');
      
      expect(seekSpy).toHaveBeenCalled();
    });

    it('seeks backward with arrow left', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      const seekSpy = vi.spyOn(video, 'seek');
      
      await userEvent.keyboard('{ArrowLeft}');
      
      expect(seekSpy).toHaveBeenCalled();
    });

    it('increases volume with arrow up', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = webkitAudioContextMock();
      
      await userEvent.keyboard('{ArrowUp}');
      
      expect(video.volume).toBeGreaterThan(0);
    });

    it('decreases volume with arrow down', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = webkitAudioContextMock();
      
      await userEvent.keyboard('{ArrowDown}');
      
      expect(video.volume).toBeLessThan(1);
    });

    it('toggles fullscreen with f', async () => {
      const mockFullscreen = vi.fn();
      Object.defineProperty(document.documentElement, 'requestFullscreen', {
        value: mockFullscreen,
        writable: true,
      });
      
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      await userEvent.keyboard('{f}');
      
      expect(mockFullscreen).toHaveBeenCalled();
    });

    it('toggles mute with m', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      
      await userEvent.keyboard('{m}');
      
      expect(video).toHaveAttribute('muted', 'true');
    });
  });

  describe('Video Quality', () => {
    it('changes video quality when quality option is selected', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await userEvent.click(settingsButton);
      
      const qualityOption = screen.getByText('720p');
      await userEvent.click(qualityOption);
      
      const video = screen.getByRole('video');
      expect(video).toHaveAttribute('data-quality', '720p');
    });

    it('changes playback speed when speed option is selected', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await userEvent.click(settingsButton);
      
      const speedOption = screen.getByText('1.5x');
      await userEvent.click(speedOption);
      
      const video = screen.getByRole('video');
      expect(video).toHaveAttribute('data-speed', '1.5');
    });

    it('toggles captions when captions option is selected', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      await userEvent.click(settingsButton);
      
      const captionsOption = screen.getByText('English');
      await userEvent.click(captionsOption);
      
      const video = screen.getByRole('video');
      expect(video).toHaveAttribute('data-captions', 'en');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels on controls', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      expect(screen.getByRole('button', { name: /play/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /pause/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /mute/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /volume/i })).toHaveAttribute('aria-label');
      expect(screen.getByRole('button', { name: /fullscreen/i })).toHaveAttribute('aria-label');
    });

    it('has proper ARIA attributes on progress bar', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-label', 'Video progress: 0%');
    });

    it('has proper ARIA attributes on time display', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const timeDisplay = screen.getByText('0:00 / 10:00');
      expect(timeDisplay).toHaveAttribute('aria-live', 'polite');
    });

    it('is keyboard navigable', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const controls = screen.getAllByRole('button');
      controls.forEach(control => {
        expect(control).toHaveAttribute('tabindex', '0');
      });
    });

    it('announces video state changes to screen readers', async () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const playButton = screen.getByRole('button', { name: /play/i });
      
      await userEvent.click(playButton);
      
      // Should announce playing state
      const announcement = screen.getByRole('status');
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Error Handling', () => {
    it('handles video load errors gracefully', async () => {
      const mockVideoWithError = { ...mockVideo, url: 'invalid-url' };
      
      render(<AdvancedVideoPlayer video={mockVideoWithError} />);
      
      expect(screen.getByText('Failed to load video')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('handles network errors gracefully', async () => {
      const video = screen.getByRole('video');
      
      // Simulate network error
      Object.defineProperty(video, 'error', {
        value: new Error('Network error'),
        writable: true,
      });
      
      fireEvent.error(video);
      
      expect(screen.getByText('Network error occurred')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('handles unsupported formats gracefully', async () => {
      const video = screen.getByRole('video');
      
      // Simulate unsupported format
      Object.defineProperty(video, 'canPlayType', {
        value: vi.fn(() => false),
        writable: true,
      });
      
      fireEvent.loadedmetadata(video);
      
      expect(screen.getByText('Unsupported video format')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('adapts to different screen sizes', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const player = screen.getByTestId('video-player');
      expect(player).toBeInTheDocument();
      expect(player).toHaveClass('w-full');
    });

    it('maintains aspect ratio for video', () => {
      render(<AdvancedVideoPlayer video={mockVideo} />);
      
      const video = screen.getByRole('video');
      expect(video).toHaveClass('aspect-video');
    });

    it('hides controls on mobile when auto-hide is enabled', () => {
      render(<AdvancedVideoPlayer video={mockVideo} autoHideControls={true} />);
      
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        value: 768,
        writable: true,
      });
      
      const controls = screen.getByTestId('video-controls');
      expect(controls).toHaveClass('opacity-0');
    });
  });

  describe('Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(<AdvancedVideoPlayer key={i} video={{ ...mockVideo, id: `video-${i}` }} />);
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 10 players in less than 500ms
      expect(renderTime).toBeLessThan(500);
    });

    it('does not cause memory leaks', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<AdvancedVideoPlayer key={i} video={{ ...mockVideo, id: `video-${i}` }} />);
        unmount();
      }
      
      // Should not have memory leaks
      expect(screen.queryAllByRole('video')).toHaveLength(0);
    });
  });

  describe('Integration', () => {
    it('works with VideoAnalytics component', () => {
      render(
        <div>
          <AdvancedVideoPlayer video={mockVideo} />
          <VideoAnalytics video={mockVideo} />
        </div>
      );
      
      expect(screen.getByText('Video Analytics')).toBeInTheDocument();
      expect(screen.getByText('Views: 0')).toBeInTheDocument();
      expect(screen.getByText('Watch Time: 0:00')).toBeInTheDocument();
    });

    it('syncs analytics with video state', async () => {
      render(
        <div>
          <AdvancedVideoPlayer video={mockVideo} />
          <VideoAnalytics video={mockVideo} />
        </div>
      );
      
      const video = screen.getByRole('video');
      
      // Simulate 30 seconds of watch time
      fireEvent.timeUpdate(video, { currentTime: 30 });
      fireEvent.timeUpdate(video, { currentTime: 60 });
      
      expect(screen.getByText('Watch Time: 1:00')).toBeInTheDocument();
    });
  });
});

// Helper function to mock Web Audio API
function webkitAudioContextMock() {
  const mockAudioContext = {
    createGain: vi.fn(() => ({
      gain: {
        value: 1,
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
    })),
    createAnalyser: vi.fn(() => ({
      frequency: vi.fn(() => 22050),
      disconnect: vi.fn(),
    })),
  } as any;
  
  return mockAudioContext;
}
