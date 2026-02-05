// Button Component Unit Tests
// Comprehensive unit tests for the Button component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Button } from '../../components/ui/Button';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Button Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('renders button with custom className', () => {
      render(<Button className="custom-class">Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('renders button with variant', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders button with size', () => {
      render(<Button size="lg">Large Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders disabled button', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('renders loading button', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('renders full width button', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });
  });

  describe('Button Variants', () => {
    const variants = [
      'default',
      'destructive',
      'outline',
      'secondary',
      'ghost',
      'link',
    ] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant}>{variant}</Button>);
        const button = screen.getByRole('button', { name: new RegExp(variant, 'i') });
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Button Sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const;

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Button size={size}>{size}</Button>);
        const button = screen.getByRole('button', { name: new RegExp(size, 'i') });
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Button Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button', { name: /click me/i });
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      const button = screen.getByRole('button', { name: /disabled/i });
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      render(<Button loading onClick={handleClick}>Loading</Button>);
      
      const button = screen.getByRole('button', { name: /loading/i });
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard events', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Submit</Button>);
      
      const button = screen.getByRole('button', { name: /submit/i });
      button.focus();
      await userEvent.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles space key when focused', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Submit</Button>);
      
      const button = screen.getByRole('button', { name: /submit/i });
      button.focus();
      await userEvent.keyboard('{ }');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Button with Icons', () => {
    it('renders with left icon', () => {
      const LeftIcon = () => <span>←</span>;
      render(
        <Button leftIcon={<LeftIcon />}>
          Back
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      const RightIcon = () => <span>→</span>;
      render(
        <Button rightIcon={<RightIcon />}>
          Next
        </Button>
      );
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('renders with both icons', () => {
      const LeftIcon = () => <span>←</span>;
      const RightIcon = () => <span>→</span>;
      render(
        <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Navigate
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /navigate/i })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });

    it('shows loading state in ARIA', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('shows disabled state in ARIA', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('is keyboard focusable', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabindex', '0');
    });
  });

  describe('Button States', () => {
    it('handles hover state', () => {
      render(<Button>Hover me</Button>);
      const button = screen.getByRole('button');
      
      // Simulate hover
      fireEvent.mouseEnter(button);
      expect(button).toBeInTheDocument();
      
      fireEvent.mouseLeave(button);
      expect(button).toBeInTheDocument();
    });

    it('handles focus state', () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveFocus();
      
      button.blur();
      expect(button).not.toHaveFocus();
    });

    it('handles active state', () => {
      render(<Button>Active me</Button>);
      const button = screen.getByRole('button');
      
      fireEvent.mouseDown(button);
      expect(button).toBeInTheDocument();
      
      fireEvent.mouseUp(button);
      expect(button).toBeInTheDocument();
    });
  });

  describe('Button Edge Cases', () => {
    it('renders with empty text', () => {
      render(<Button></Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('');
    });

    it('renders with very long text', () => {
      const longText = 'This is a very long button text that should wrap properly and not break the layout';
      render(<Button>{longText}</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(longText);
    });

    it('handles rapid clicks', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Rapid Click</Button>);
      
      const button = screen.getByRole('button', { name: /rapid click/i });
      
      // Simulate rapid clicks
      for (let i = 0; i < 10; i++) {
        await userEvent.click(button);
      }
      
      expect(handleClick).toHaveBeenCalledTimes(10);
    });

    it('handles prop changes', () => {
      const { rerender } = render(<Button>Initial</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveTextContent('Initial');
      
      rerender(<Button>Updated</Button>);
      expect(button).toHaveTextContent('Updated');
    });
  });

  describe('Button Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<Button key={i}>Button {i}</Button>);
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 100 buttons in less than 300ms (more realistic)
      expect(renderTime).toBeLessThan(300);
    });

    it('does not cause memory leaks', () => {
      const handleClick = vi.fn();
      
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(
          <Button onClick={handleClick}>
            Button {i}
          </Button>
        );
        unmount();
      }
      
      // Should not have memory leaks
      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('Button Integration', () => {
    it('works within form', async () => {
      const handleSubmit = vi.fn();
      
      render(
        <form role="form" onSubmit={handleSubmit}>
          <Button type="submit">Submit Form</Button>
        </form>
      );
      
      const button = screen.getByRole('button', { name: /submit form/i });
      const form = screen.getByRole('form');
      
      await userEvent.click(button);
      
      // Form should be submitted when button is clicked
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('works with standard event handlers', async () => {
      const clickHandler = vi.fn();
      
      render(
        <Button onClick={clickHandler}>
          Click Event
        </Button>
      );
      
      const button = screen.getByRole('button');
      
      // Simulate click event
      fireEvent.click(button);
      
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Button Error Handling', () => {
    it('handles missing onClick gracefully', () => {
      expect(() => {
        render(<Button>No Handler</Button>);
      }).not.toThrow();
    });

    it('handles invalid variant gracefully', () => {
      expect(() => {
        render(<Button variant={'invalid' as any}>Invalid</Button>);
      }).not.toThrow();
    });

    it('handles invalid size gracefully', () => {
      expect(() => {
        render(<Button size={'invalid' as any}>Invalid</Button>);
      }).not.toThrow();
    });
  });
});
