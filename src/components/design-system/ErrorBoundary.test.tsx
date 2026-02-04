// ErrorBoundary Component Unit Tests
// Comprehensive unit tests for the ErrorBoundary component

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error for testing
const ThrowErrorComponent = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary Component', () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress console.error for tests
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('should catch and display error when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should display custom error message when provided', () => {
    render(
      <ErrorBoundary
        fallback={<div>Custom error message</div>}
      >
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('should call onError callback when error occurs', () => {
    const onError = vi.fn();
    
    render(
      <ErrorBoundary onError={onError}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('should reset error state when retry button is clicked', async () => {
    const TestComponent = () => {
      const [shouldThrow, setShouldThrow] = React.useState(false);
      
      return (
        <ErrorBoundary>
          <button onClick={() => setShouldThrow(true)}>
            Trigger Error
          </button>
          <ThrowErrorComponent shouldThrow={shouldThrow} />
        </ErrorBoundary>
      );
    };

    render(<TestComponent />);

    // Initially no error
    expect(screen.getByText('No error')).toBeInTheDocument();

    // Trigger error
    fireEvent.click(screen.getByText('Trigger Error'));
    
    // Error boundary should catch and display error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Click retry button
    fireEvent.click(screen.getByText(/try again/i));

    // Should reset and show original content
    await waitFor(() => {
      expect(screen.getByText('No error')).toBeInTheDocument();
    });
  });

  it('should log error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('should handle different types of errors', () => {
    const StringErrorComponent = () => {
      throw 'String error';
    };

    const NullErrorComponent = () => {
      throw null;
    };

    // Test string error
    render(
      <ErrorBoundary>
        <StringErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Test null error
    render(
      <ErrorBoundary>
        <NullErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should render custom fallback component', () => {
    const CustomFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
      <div>
        <h1>Custom Error: {error.message}</h1>
        <button onClick={resetError}>Custom Reset</button>
      </div>
    );

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Error: Test error')).toBeInTheDocument();
    expect(screen.getByText('Custom Reset')).toBeInTheDocument();
  });

  it('should handle async errors', async () => {
    const AsyncErrorComponent = () => {
      React.useEffect(() => {
        throw new Error('Async error');
      }, []);
      return <div>Loading...</div>;
    };

    render(
      <ErrorBoundary>
        <AsyncErrorComponent />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('should preserve component key for error tracking', () => {
    const onError = vi.fn();
    
    render(
      <ErrorBoundary key="test-boundary" onError={onError}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    );
  });

  it('should handle nested error boundaries', () => {
    const InnerErrorBoundary = ({ children }: { children: React.ReactNode }) => (
      <ErrorBoundary fallback={<div>Inner error caught</div>}>
        {children}
      </ErrorBoundary>
    );

    render(
      <ErrorBoundary fallback={<div>Outer error caught</div>}>
        <InnerErrorBoundary>
          <ThrowErrorComponent shouldThrow={true} />
        </InnerErrorBoundary>
      </ErrorBoundary>
    );

    // Inner boundary should catch the error
    expect(screen.getByText('Inner error caught')).toBeInTheDocument();
    expect(screen.queryByText('Outer error caught')).not.toBeInTheDocument();
  });

  it('should handle errors in event handlers', () => {
    const EventErrorComponent = () => {
      const handleClick = () => {
        throw new Error('Event handler error');
      };

      return <button onClick={handleClick}>Click me</button>;
    };

    render(
      <ErrorBoundary>
        <EventErrorComponent />
      </ErrorBoundary>
    );

    // Click should trigger error
    fireEvent.click(screen.getByText('Click me'));
    
    // Error boundary should catch the error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should provide error information to fallback component', () => {
    const InfoFallback = ({ error, errorInfo }: { error: Error; errorInfo: React.ErrorInfo }) => (
      <div>
        <div data-testid="error-message">{error.message}</div>
        <div data-testid="error-stack">{errorInfo.componentStack}</div>
      </div>
    );

    render(
      <ErrorBoundary fallback={InfoFallback}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-message')).toHaveTextContent('Test error');
    expect(screen.getByTestId('error-stack')).toBeInTheDocument();
  });

  it('should handle errors during development and production differently', () => {
    const originalEnv = process.env.NODE_ENV;
    
    // Test development mode
    process.env.NODE_ENV = 'development';
    
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Test production mode
    process.env.NODE_ENV = 'production';
    
    rerender(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    
    // Restore original env
    process.env.NODE_ENV = originalEnv;
  });

  it('should handle multiple rapid errors', async () => {
    let renderCount = 0;
    const MultipleErrorsComponent = () => {
      renderCount++;
      if (renderCount <= 3) {
        throw new Error(`Error ${renderCount}`);
      }
      return <div>Success after errors</div>;
    };

    const { rerender } = render(
      <ErrorBoundary>
        <MultipleErrorsComponent />
      </ErrorBoundary>
    );

    // Should catch first error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Reset and trigger second error
    fireEvent.click(screen.getByText(/try again/i));
    
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    // Reset and trigger third error
    fireEvent.click(screen.getByText(/try again/i));
    
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    // Reset and finally succeed
    fireEvent.click(screen.getByText(/try again/i));
    
    await waitFor(() => {
      expect(screen.getByText('Success after errors')).toBeInTheDocument();
    });
  });
});
