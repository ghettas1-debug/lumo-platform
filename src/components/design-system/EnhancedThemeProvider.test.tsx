// EnhancedThemeProvider Component Unit Tests
// Comprehensive unit tests for the EnhancedThemeProvider component

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import EnhancedThemeProvider from '../../components/design-system/EnhancedThemeProvider';

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

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
  })),
});

describe('EnhancedThemeProvider Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('should render theme provider correctly', () => {
    render(
      <EnhancedThemeProvider>
        <div>Test Content</div>
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide default theme context', () => {
    render(
      <EnhancedThemeProvider>
        <div>Test Content</div>
      </EnhancedThemeProvider>
    );
    
    // Check if theme context is provided
    const themeProvider = screen.getByTestId('enhanced-theme-provider');
    expect(themeProvider).toBeInTheDocument();
  });

  it('should apply light theme by default', () => {
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    const testContent = screen.getByTestId('test-content');
    expect(testContent).toHaveClass('light-theme');
    expect(testContent).toHaveAttribute('data-theme', 'light');
  });

  it('should apply dark theme when specified', () => {
    render(
      <EnhancedThemeProvider defaultTheme="dark">
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    const testContent = screen.getByTestId('test-content');
    expect(testContent).toHaveClass('dark-theme');
    expect(testContent).toHaveAttribute('data-theme', 'dark');
  });

  it('should persist theme preference to localStorage', async () => {
    render(
      <EnhancedThemeProvider defaultTheme="dark">
        <div>Test Content</div>
      </EnhancedThemeProvider>
    );
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  should('load theme preference from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    const testContent = screen.getByTestId('test-content');
    expect(testContent).toHaveClass('dark-theme');
  });

  it('should handle localStorage errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage not available');
    });
    
    render(
      <EnhancedThemeProvider>
        <div>Test Content</div>
      </EnhancedThemeProvider>
    );
    
    // Should not crash and should use default theme
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should support theme switching', async () => {
    const mockSetTheme = vi.fn();
    
    render(
      <EnhancedThemeProvider>
        <div>Test Content</div>
      </EnhancedThemeProvider>
    );
    
    // Simulate theme change
    const themeProvider = screen.getByTestId('enhanced-theme-provider');
    const themeContext = themeProvider.evaluate((el: any) => el._context);
    
    if (themeContext?.setTheme) {
      themeContext.setTheme('dark');
    }
    
    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  it('should support system theme preference', async () => {
    // Mock prefers-color-scheme: dark
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    
    render(
      <EnhancedThemeProvider defaultTheme="system">
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    await waitFor(() => {
      const testContent = screen.getByTestId('test-content');
      expect(testContent).toHaveClass('dark-theme');
    });
  });

  it('should handle media query changes', async () => {
    const mockMatchMedia = vi.mocked(window.matchMedia);
    let mediaChangeCallback: ((event: MediaQueryListEvent) => void) | null = null;
    
    mockMatchMedia.mockImplementation((query) => {
      if (query === '(prefers-color-scheme: dark)') {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn((callback) => {
            mediaChangeCallback = callback;
          }),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      }
      return {
        matches: query === '(prefers-color-scheme: light)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });
    
    render(
      <EnhancedThemeProvider defaultTheme="system">
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    // Simulate media query change
    if (mediaChangeCallback) {
      mediaChangeCallback({
        matches: true,
        media: '(prefers-color-scheme: dark)',
      } as MediaQueryListEvent);
    }
    
    await waitFor(() => {
      const testContent = screen.getByTestId('test-content');
      expect(testContent).toHaveClass('dark-theme');
    });
  });

  it('should provide theme context to children', () => {
    const TestComponent = () => {
      const theme = useTheme();
      return <div data-testid="theme-context">{theme}</div>;
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('theme-context')).toHaveTextContent('light');
  });

  it('should provide theme toggle function', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="current-theme">{theme}</div>
          <button data-testid="toggle-theme" onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    
    fireEvent.click(screen.getByTestId('toggle-theme'));
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should provide theme setter function', () => {
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <div data-testid="current-theme">{theme}</div>
          <button data-testid="set-theme-dark" onClick={() => setTheme('dark')}>
            Set Dark Theme
          </button>
        </div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    
    fireEvent.click(screen.getByTestId('set-theme-dark'));
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should apply CSS custom properties for theme', () => {
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    const testContent = screen.getByTestId('test-content');
    const styles = window.getComputedStyle(testContent);
    
    expect(styles.getPropertyValue('--primary-color')).toBeTruthy();
    expect(styles.getPropertyValue('--background-color')).toBeTruthy();
    expect(styles.getPropertyValue('--text-color')).toBeTruthy();
  });

  it('should support custom theme tokens', () => {
    const customTheme = {
      colors: {
        primary: '#ff0000',
        background: '#ffffff',
        text: '#000000',
      },
      fonts: {
        primary: 'Arial',
        secondary: 'Helvetica',
      },
    };
    
    render(
      <EnhancedThemeProvider theme={customTheme}>
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    const testContent = screen.getByTestId('test-content');
    const styles = window.getComputedStyle(testContent);
    
    expect(styles.getPropertyValue('--primary-color')).toBe('#ff0000');
    expect(styles.getPropertyValue('--background-color')).toBe('#ffffff');
    expect(styles.getPropertyValue('--text-color')).toBe('#000000');
  });

  it('should support theme transitions', async () => {
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    const testContent = screen.getByTestId('test-content');
    const styles = window.getComputedStyle(testContent);
    
    expect(styles.transition).toContain('background-color');
    expect(styles.transition).toContain('color');
  });

  it('should handle theme switching animations', async () => {
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    const testContent = screen.getByTestId('test-content');
    const themeProvider = screen.getByTestId('enhanced-theme-provider');
    const themeContext = themeProvider.evaluate((el: any) => el._context);
    
    // Trigger theme change
    if (themeContext?.setTheme) {
      themeContext.setTheme('dark');
    }
    
    await waitFor(() => {
      const styles = window.getComputedStyle(testContent);
      expect(styles.transition).toContain('opacity');
    });
  });

  it('should support RTL layout', () => {
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content" dir="rtl">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    const testContent = screen.getByTestId('test-content');
    expect(testContent).toHaveAttribute('dir', 'rtl');
    expect(testContent).toHaveClass('rtl-layout');
  });

  it('should support LTR layout', () => {
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content" dir="ltr">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    const testContent = screen.getByTestId('test-content');
    expect(testContent).toHaveAttribute('dir', 'ltr');
    expect(testContent).toHaveClass('ltr-layout');
  });

  it('should handle invalid theme values gracefully', () => {
    const TestComponent = () => {
      const { setTheme } = useTheme();
      return (
        <button data-testid="set-theme-invalid" onClick={() => setTheme('invalid' as any)}>
          Set Invalid Theme
        </button>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    fireEvent.click(screen.getByTestId('set-theme-invalid'));
    
    // Should not crash and should fallback to default theme
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  should('provide theme detection utilities', () => {
    const TestComponent = () => {
      const { isDark, isLight, isSystem } = useThemeDetection();
      return (
        <div>
          <div data-testid="is-dark">{isDark.toString()}</div>
          <div data-testid="is-light">{isLight.toString()}</div>
          <div data-testid="is-system">{isSystem.toString()}</div>
        </div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
    expect(screen.getByTestId('is-light')).toHaveTextContent('true');
    expect(screen.getByTestId('is-system')).toHaveTextContent('false');
  });

  it('should provide color scheme detection', () => {
    const TestComponent = () => {
      const { colorScheme } = useColorScheme();
      return (
        <div data-testid="color-scheme">{colorScheme}</div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('color-scheme')).toHaveTextContent('light');
  });

  it('should support high contrast mode', async () => {
    // Mock prefers-contrast: high
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-contrast: high)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    await waitFor(() => {
      const testContent = screen.getByTestId('test-content');
      expect(testContent).toHaveClass('high-contrast');
    });
  });

  it('should support reduced motion', async () => {
    // Mock prefers-reduced-motion: reduce
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    
    render(
      <EnhancedThemeProvider>
        <div data-testid="test-content">Test Content</div>
      </EnhancedThemeProvider>
    );
    
    await waitFor(() => {
      const testContent = screen.getByTestId('test-content');
      expect(testContent).toHaveClass('reduced-motion');
    });
  });

  it('should handle theme provider errors gracefully', () => {
    const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
      const [hasError, setError] = React.useState(false);
      
      if (hasError) {
        return <div data-testid="error-boundary">Error occurred</div>;
      }
      
      return (
        <div data-testid="error-boundary-wrapper">
          {children}
        </div>
      );
    };
    
    render(
      <ErrorBoundary>
        <EnhancedThemeProvider>
          <div>Test Content</div>
        </EnhancedThemeProvider>
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should be performant with many theme changes', async () => {
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme-count">Theme changes: 0</div>
          <button data-testid="rapid-theme-change" onClick={() => {
            for (let i = 0; i < 10; i++) {
              setTheme(i % 2 === 0 ? 'light' : 'dark');
            }
          }}>
            Rapid Theme Change
          </button>
        </div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    const startTime = performance.now();
    fireEvent.click(screen.getByTestId('rapid-theme-change'));
    
    await waitFor(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      expect(duration).toBeLessThan(1000); // Should handle 10 theme changes within 1 second
    });
  });

  it('should provide theme validation', () => {
    const TestComponent = () => {
      const { isValidTheme, validateTheme } = useThemeValidation();
      return (
        <div>
          <div data-testid="is-valid-theme">{isValidTheme('light').toString()}</div>
          <button data-testid="validate-theme" onClick={() => validateTheme('custom')}>
            Validate Theme
          </button>
        </div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('is-valid-theme')).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('validate-theme'));
    
    expect(screen.getByTestId('is-valid-theme')).toHaveTextContent('false');
  });

  it('should support theme presets', () => {
    const presets = {
      professional: {
        colors: {
          primary: '#2563eb',
          background: '#ffffff',
          text: '#1e293b',
        },
      },
      creative: {
        colors: {
          primary: '#ec4899',
          background: '#fafafa',
          text: '#1e293b',
        },
      },
    };
    
    const TestComponent = () => {
      const { applyPreset } = useThemePresets(presets);
      return (
        <div>
          <button data-testid="apply-professional" onClick={() => applyPreset('professional')}>
            Apply Professional
          </button>
          <button data-testid="apply-creative" onClick={() => applyPreset('creative')}>
            Apply Creative
          </button>
        </div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    fireEvent.click(screen.getByTestId('apply-professional'));
    
    const testContent = screen.getByTestId('test-content');
    const styles = window.getComputedStyle(testContent);
    expect(styles.getPropertyValue('--primary-color')).toBe('#2563eb');
  });

  it('should support theme inheritance', () => {
    const ParentComponent = () => {
      const { theme } = useTheme();
      return (
        <div data-testid="parent-theme">{theme}</div>
      );
    };
    
    const ChildComponent = () => {
      const { theme } = useTheme();
      return (
        <div data-testid="child-theme">{theme}</div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <ParentComponent />
        <ChildComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('parent-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('child-theme')).toHaveTextContent('light');
  });

  it('should handle nested theme providers correctly', () => {
    render(
      <EnhancedThemeProvider defaultTheme="dark">
        <EnhancedThemeProvider defaultTheme="light">
          <div data-testid="nested-content">Nested Content</div>
        </EnhancedThemeProvider>
      </EnhancedThemeProvider>
    );
    
    const nestedContent = screen.getByTestId('nested-content');
    expect(nestedContent).toHaveClass('light-theme'); // Inner provider should override outer
  });

  it('should provide theme reset functionality', () => {
    const TestComponent = () => {
      const { theme, resetTheme } = useTheme();
      return (
        <div>
          <div data-testid="current-theme">{theme}</div>
          <button data-testid="reset-theme" onClick={resetTheme}>
            Reset Theme
          </button>
        </div>
      );
    };
    
    render(
      <EnhancedThemeProvider defaultTheme="dark">
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    
    fireEvent.click(screen.getByTestId('reset-theme'));
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should support theme persistence options', () => {
    render(
      <EnhancedThemeProvider persistTheme={false}>
        <div>Test Content</div>
      </EnhancedThemeProvider>
    );
    
    // Should not persist theme to localStorage
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('should handle theme persistence errors gracefully', () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    
    render(
      <EnhancedThemeProvider>
        <div>Test Content</div>
      </EnhancedThemeProvider>
    );
    
    // Should not crash and should use default theme
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide theme context hooks', () => {
    const TestComponent = () => {
      const theme = useTheme();
      const { isDark, isLight, toggleTheme, setTheme } = useTheme();
      const { colorScheme } = useColorScheme();
      const { isValidTheme, validateTheme } = useThemeValidation();
      const { applyPreset } = useThemePresets({});
      const { resetTheme } = useThemeReset();
      
      return (
        <div data-testid="hooks-test">
          <div data-testid="theme">{theme}</div>
          <div data-testid="is-dark">{isDark.toString()}</div>
          <div data-testid="is-light">{isLight.toString()}</div>
          <div data-testid="color-scheme">{colorScheme}</div>
          <div data-testid="is-valid-theme">{isValidTheme('light').toString()}</div>
        </div>
      );
    };
    
    render(
      <EnhancedThemeProvider>
        <TestComponent />
      </EnhancedThemeProvider>
    );
    
    expect(screen.getByTestId('theme')).toBeInTheDocument();
    expect(screen.getByTestId('is-dark')).toBeInTheDocument();
    expect(screen.getByTestId('is-light')).toBeInTheDocument();
    expect(screen.getByTestId('color-scheme')).toBeInTheDocument();
    expect(screen.getByTestId('is-valid-theme')).toBeInTheDocument();
  });
});
