// LanguageSelector Component Unit Tests
// Comprehensive unit tests for the LanguageSelector component

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LanguageSelector from '../../components/LanguageSelector';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
}));

describe('LanguageSelector Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render language selector correctly', () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    expect(selector).toBeInTheDocument();
  });

  it('should display current language', () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    expect(selector).toHaveTextContent('English');
  });

  it('should open language dropdown when clicked', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('should display all available languages', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('العربية')).toBeInTheDocument();
      expect(screen.getByText('Français')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
    });
  });

  it('should change language when option is selected', async () => {
    const mockChangeLanguage = vi.fn();
    vi.mocked(require('react-i18next').useTranslation).mockReturnValue({
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: 'en',
      },
    });

    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      const arabicOption = screen.getByText('العربية');
      fireEvent.click(arabicOption);
    });

    expect(mockChangeLanguage).toHaveBeenCalledWith('ar');
  });

  it('should close dropdown after language selection', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    const arabicOption = screen.getByText('العربية');
    fireEvent.click(arabicOption);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('should have proper ARIA attributes', () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    expect(selector).toHaveAttribute('aria-label', 'Select language');
    expect(selector).toHaveAttribute('aria-expanded', 'false');
  });

  it('should update ARIA attributes when dropdown is open', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(selector).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('should be keyboard navigable', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    selector.focus();
    
    fireEvent.keyDown(selector, { key: 'Enter' });
    
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('should support arrow key navigation in dropdown', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      
      const firstOption = screen.getAllByRole('menuitem')[0];
      firstOption.focus();
      
      fireEvent.keyDown(firstOption, { key: 'ArrowDown' });
      
      const secondOption = screen.getAllByRole('menuitem')[1];
      expect(secondOption).toHaveFocus();
    });
  });

  it('should close dropdown on Escape key', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    fireEvent.keyDown(selector, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('should close dropdown when clicking outside', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('should display language flags', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(screen.getByAltText('US flag')).toBeInTheDocument();
      expect(screen.getByAltText('Saudi Arabia flag')).toBeInTheDocument();
      expect(screen.getByAltText('France flag')).toBeInTheDocument();
    });
  });

  it('should have proper hover states', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.mouseEnter(selector);
    
    expect(selector).toHaveClass('hover');
    
    fireEvent.mouseLeave(selector);
    expect(selector).not.toHaveClass('hover');
  });

  it('should have proper focus styles', () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    selector.focus();
    
    expect(selector).toHaveClass('focus');
  });

  it('should be accessible with screen readers', () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    expect(selector).toHaveAttribute('role', 'button');
    expect(selector).toHaveAttribute('tabindex', '0');
  });

  it('should handle language change errors gracefully', async () => {
    const mockChangeLanguage = vi.fn().mockRejectedValue(new Error('Failed to change language'));
    vi.mocked(require('react-i18next').useTranslation).mockReturnValue({
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: 'en',
      },
    });

    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      const arabicOption = screen.getByText('العربية');
      fireEvent.click(arabicOption);
    });

    // Should not crash and should close dropdown
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('should persist language preference in localStorage', async () => {
    const mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      const arabicOption = screen.getByText('العربية');
      fireEvent.click(arabicOption);
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('selectedLanguage', 'ar');
  });

  it('should load saved language preference from localStorage', () => {
    const mockLocalStorage = {
      getItem: vi.fn().mockReturnValue('ar'),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    render(<LanguageSelector />);
    
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('selectedLanguage');
  });

  it('should have proper transition animations', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('animate-in');
    });
  });

  it('should support RTL layout', async () => {
    document.documentElement.setAttribute('dir', 'rtl');
    
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    expect(selector).toHaveClass('rtl');
    
    fireEvent.click(selector);
    
    await waitFor(() => {
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('rtl');
    });
  });

  it('should be responsive on mobile devices', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    expect(selector).toHaveClass('mobile');
  });

  it('should have proper loading state during language change', async () => {
    const mockChangeLanguage = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));
    vi.mocked(require('react-i18next').useTranslation).mockReturnValue({
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: 'en',
      },
    });

    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      const arabicOption = screen.getByText('العربية');
      fireEvent.click(arabicOption);
    });

    expect(screen.getByTestId('language-loading')).toBeInTheDocument();
  });

  it('should display language names in their native script', async () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('العربية')).toBeInTheDocument();
      expect(screen.getByText('Français')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
      expect(screen.getByText('Deutsch')).toBeInTheDocument();
      expect(screen.getByText('中文')).toBeInTheDocument();
      expect(screen.getByText('日本語')).toBeInTheDocument();
    });
  });

  it('should have proper contrast ratios', () => {
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    const styles = window.getComputedStyle(selector);
    
    // Check for minimum contrast ratio (basic check)
    expect(styles.color).toBeTruthy();
    expect(styles.backgroundColor).toBeTruthy();
  });

  it('should be performant with many language options', async () => {
    const startTime = performance.now();
    
    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    fireEvent.click(selector);
    
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
    
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // Should render within 100ms
  });

  it('should handle missing translations gracefully', async () => {
    vi.mocked(require('react-i18next').useTranslation).mockReturnValue({
      i18n: {
        changeLanguage: vi.fn(),
        language: 'unknown',
      },
    });

    render(<LanguageSelector />);
    
    const selector = screen.getByRole('button', { name: /language/i });
    expect(selector).toBeInTheDocument();
    expect(selector).toHaveTextContent('Select Language');
  });
});
