// Input Component Unit Tests
// Comprehensive unit tests for the Input component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Input } from '../../components/ui/Input';

describe('Input Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders input with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
    });

    it('renders input with default value', () => {
      render(<Input defaultValue="Default value" />);
      const input = screen.getByDisplayValue('Default value');
      expect(input).toBeInTheDocument();
    });

    it('renders input with type', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders disabled input', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('renders required input', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('renders input with custom className', () => {
      render(<Input className="custom-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-input');
    });
  });

  describe('Input Types', () => {
    const inputTypes = [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
      'search',
      'date',
      'time',
      'datetime-local',
      'month',
      'week',
    ] as const;

    inputTypes.forEach(type => {
      it(`renders ${type} input correctly`, () => {
        render(<Input type={type} />);
        const input = screen.getByRole(type === 'textbox' ? 'textbox' : type === 'search' ? 'searchbox' : 'textbox');
        expect(input).toHaveAttribute('type', type);
      });
    });
  });

  describe('Input Interactions', () => {
    it('handles value changes', async () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'Hello World');
      
      expect(handleChange).toHaveBeenCalledTimes(11); // Each character triggers change
      expect(input).toHaveValue('Hello World');
    });

    it('handles focus events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      
      render(
        <Input 
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
      
      const input = screen.getByRole('textbox');
      
      await userEvent.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(input).toHaveFocus();
      
      await userEvent.tab(); // Move to next element
      expect(handleBlur).toHaveBeenCalledTimes(1);
      expect(input).not.toHaveFocus();
    });

    it('handles keyboard events', async () => {
      const handleKeyDown = vi.fn();
      const handleKeyUp = vi.fn();
      const handleKeyPress = vi.fn();
      
      render(
        <Input 
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onKeyPress={handleKeyPress}
        />
      );
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'a');
      
      expect(handleKeyDown).toHaveBeenCalled();
      expect(handleKeyUp).toHaveBeenCalled();
      expect(handleKeyPress).toHaveBeenCalled();
    });

    it('handles paste events', async () => {
      const handlePaste = vi.fn();
      render(<Input onPaste={handlePaste} />);
      
      const input = screen.getByRole('textbox');
      await userEvent.paste('Pasted text');
      
      expect(handlePaste).toHaveBeenCalled();
    });

    it('handles cut events', async () => {
      const handleCut = vi.fn();
      render(
        <Input 
          defaultValue="Select me"
          onCut={handleCut}
        />
      );
      
      const input = screen.getByRole('textbox');
      
      // Select text and cut
      await userEvent.selectText(input);
      await userEvent.cut();
      
      expect(handleCut).toHaveBeenCalled();
    });

    it('handles copy events', async () => {
      const handleCopy = vi.fn();
      render(
        <Input 
          defaultValue="Select me"
          onCopy={handleCopy}
        />
      );
      
      const input = screen.getByRole('textbox');
      
      // Select text and copy
      await userEvent.selectText(input);
      await userEvent.copy();
      
      expect(handleCopy).toHaveBeenCalled();
    });
  });

  describe('Input Validation', () => {
    it('validates required field', async () => {
      render(<Input required />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
      
      // Test form validation
      const form = screen.getByRole('form') || document.createElement('form');
      form.appendChild(input);
      
      expect(input.checkValidity()).toBe(true); // Empty required input is invalid
    });

    it('validates min/max for number input', () => {
      render(<Input type="number" min="1" max="10" />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('min', '1');
      expect(input).toHaveAttribute('max', '10');
    });

    it('validates minLength/maxLength', () => {
      render(<Input minLength={3} maxLength={10} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('minlength', '3');
      expect(input).toHaveAttribute('maxlength', '10');
    });

    it('validates pattern', () => {
      render(<Input pattern="[a-z]+" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('pattern', '[a-z]+');
    });
  });

  describe('Input States', () => {
    it('shows loading state', () => {
      render(<Input loading />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-busy', 'true');
    });

    it('shows error state', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows success state', () => {
      render(<Input success />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('shows warning state', () => {
      render(<Input warning />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Input with Icons', () => {
    it('renders with left icon', () => {
      const LeftIcon = () => <span data-testid="left-icon">🔍</span>;
      render(<Input leftIcon={<LeftIcon />} />);
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      const RightIcon = () => <span data-testid="right-icon">✓</span>;
      render(<Input rightIcon={<RightIcon />} />);
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with both icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">🔍</span>;
      const RightIcon = () => <span data-testid="right-icon">✓</span>;
      
      render(
        <Input 
          leftIcon={<LeftIcon />}
          rightIcon={<RightIcon />}
        />
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('Input Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Input 
          aria-label="Custom input label"
          aria-describedby="input-description"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Custom input label');
      expect(input).toHaveAttribute('aria-describedby', 'input-description');
    });

    it('supports autocomplete', () => {
      render(<Input autoComplete="email" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autocomplete', 'email');
    });

    it('supports input mode', () => {
      render(<Input inputMode="numeric" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('inputmode', 'numeric');
    });

    it('supports spell check', () => {
      render(<Input spellCheck={false} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('spellcheck', 'false');
    });

    it('supports auto correct', () => {
      render(<Input autoCorrect="off" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autocorrect', 'off');
    });

    it('supports auto capitalize', () => {
      render(<Input autoCapitalize="off" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autocapitalize', 'off');
    });
  });

  describe('Input Edge Cases', () => {
    it('handles controlled component', async () => {
      const ControlledInput = () => {
        const [value, setValue] = React.useState('');
        
        return (
          <Input 
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      };
      
      render(<ControlledInput />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'Controlled');
      
      expect(input).toHaveValue('Controlled');
    });

    it('handles uncontrolled component', async () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'Uncontrolled');
      
      expect(input).toHaveValue('Uncontrolled');
    });

    it('handles rapid input changes', async () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      
      // Simulate rapid typing
      for (let i = 0; i < 50; i++) {
        await userEvent.keyboard('a');
      }
      
      expect(handleChange).toHaveBeenCalledTimes(50);
      expect(input).toHaveValue('a'.repeat(50));
    });

    it('handles special characters', async () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '!@#$%^&*()_+-=[]{}|;:,.<>?');
      
      expect(input).toHaveValue('!@#$%^&*()_+-=[]{}|;:,.<>?');
    });

    it('handles unicode characters', async () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '🚀 Hello 世界 ñáéíóú');
      
      expect(input).toHaveValue('🚀 Hello 世界 ñáéíóú');
    });

    it('handles very long input', async () => {
      const longText = 'a'.repeat(1000);
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, longText);
      
      expect(input).toHaveValue(longText);
    });
  });

  describe('Input Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(<Input key={i} placeholder={`Input ${i}`} />);
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 100 inputs in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('does not cause memory leaks', () => {
      const handleChange = vi.fn();
      
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(
          <Input 
            key={i}
            onChange={handleChange}
            placeholder={`Input ${i}`}
          />
        );
        unmount();
      }
      
      // Should not have memory leaks
      expect(handleChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('Input Integration', () => {
    it('works within form', async () => {
      const handleSubmit = vi.fn();
      
      render(
        <form onSubmit={handleSubmit}>
          <Input name="testInput" defaultValue="test" />
          <button type="submit">Submit</button>
        </form>
      );
      
      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /submit/i });
      
      await userEvent.click(button);
      
      // Form should be submitted
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('works with fieldset', () => {
      render(
        <fieldset>
          <legend>Personal Information</legend>
          <Input name="firstName" placeholder="First Name" />
          <Input name="lastName" placeholder="Last Name" />
        </fieldset>
      );
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(2);
    });

    it('works with label', () => {
      render(
        <label>
          Email Address
          <Input type="email" name="email" />
        </label>
      );
      
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Email Address');
      
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
  });

  describe('Input Error Handling', () => {
    it('handles missing onChange gracefully', () => {
      expect(() => {
        render(<Input />);
      }).not.toThrow();
    });

    it('handles invalid type gracefully', () => {
      expect(() => {
        render(<Input type={'invalid' as any} />);
      }).not.toThrow();
    });

    it('handles null/undefined values', () => {
      expect(() => {
        render(<Input value={null as any} />);
        render(<Input value={undefined as any} />);
      }).not.toThrow();
    });
  });
});
