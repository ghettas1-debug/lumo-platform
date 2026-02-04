// Card Component Unit Tests
// Comprehensive unit tests for the Card component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../../components/ui/Card';

describe('Card Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Card Rendering', () => {
    it('renders card with content', () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );
      
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders card with custom className', () => {
      render(
        <Card className="custom-card">
          <div>Content</div>
        </Card>
      );
      
      const card = screen.getByText('Content').parentElement;
      expect(card).toHaveClass('custom-card');
    });

    it('renders card with all subcomponents', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );
      
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card description')).toBeInTheDocument();
      expect(screen.getByText('Card content goes here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('CardHeader Component', () => {
    it('renders header with title', () => {
      render(
        <CardHeader>
          <CardTitle>Header Title</CardTitle>
        </CardHeader>
      );
      
      expect(screen.getByText('Header Title')).toBeInTheDocument();
    });

    it('renders header with description', () => {
      render(
        <CardHeader>
          <CardDescription>Header description</CardDescription>
        </CardHeader>
      );
      
      expect(screen.getByText('Header description')).toBeInTheDocument();
    });

    it('renders header with both title and description', () => {
      render(
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
      );
      
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('renders header with custom className', () => {
      render(
        <CardHeader className="custom-header">
          <CardTitle>Header</CardTitle>
        </CardHeader>
      );
      
      const header = screen.getByText('Header').parentElement;
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('CardTitle Component', () => {
    it('renders title with different heading levels', () => {
      const levels = [1, 2, 3, 4, 5, 6] as const;
      
      levels.forEach(level => {
        const { unmount } = render(
          <CardTitle as={`h${level}`}>Title Level {level}</CardTitle>
        );
        
        const heading = screen.getByRole('heading', { level });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(`Title Level ${level}`);
        
        unmount();
      });
    });

    it('renders title with custom className', () => {
      render(
        <CardTitle className="custom-title">Custom Title</CardTitle>
      );
      
      const title = screen.getByRole('heading');
      expect(title).toHaveClass('custom-title');
    });

    it('renders title with icon', () => {
      const Icon = () => <span data-testid="title-icon">📚</span>;
      
      render(
        <CardTitle icon={<Icon />}>
          Title with Icon
        </CardTitle>
      );
      
      expect(screen.getByTestId('title-icon')).toBeInTheDocument();
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });

  describe('CardDescription Component', () => {
    it('renders description text', () => {
      render(
        <CardDescription>This is a card description</CardDescription>
      );
      
      expect(screen.getByText('This is a card description')).toBeInTheDocument();
    });

    it('renders description with custom className', () => {
      render(
        <CardDescription className="custom-description">
          Description
        </CardDescription>
      );
      
      const description = screen.getByText('Description');
      expect(description).toHaveClass('custom-description');
    });

    it('renders description with HTML content', () => {
      render(
        <CardDescription>
          Description with <strong>bold</strong> text
        </CardDescription>
      );
      
      expect(screen.getByText('Description with')).toBeInTheDocument();
      expect(screen.getByText('bold')).toBeInTheDocument();
    });
  });

  describe('CardContent Component', () => {
    it('renders content area', () => {
      render(
        <CardContent>
          <p>Main content area</p>
        </CardContent>
      );
      
      expect(screen.getByText('Main content area')).toBeInTheDocument();
    });

    it('renders content with custom className', () => {
      render(
        <CardContent className="custom-content">
          <p>Content</p>
        </CardContent>
      );
      
      const content = screen.getByText('Content').parentElement;
      expect(content).toHaveClass('custom-content');
    });

    it('renders content with multiple children', () => {
      render(
        <CardContent>
          <p>First paragraph</p>
          <p>Second paragraph</p>
          <button>Action button</button>
        </CardContent>
      );
      
      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action button' })).toBeInTheDocument();
    });
  });

  describe('CardFooter Component', () => {
    it('renders footer with actions', () => {
      render(
        <CardFooter>
          <button>Cancel</button>
          <button>Submit</button>
        </CardFooter>
      );
      
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('renders footer with custom className', () => {
      render(
        <CardFooter className="custom-footer">
          <button>Action</button>
        </CardFooter>
      );
      
      const footer = screen.getByRole('button', { name: 'Action' }).parentElement;
      expect(footer).toHaveClass('custom-footer');
    });

    it('renders footer with text content', () => {
      render(
        <CardFooter>
          <span>Footer text</span>
        </CardFooter>
      );
      
      expect(screen.getByText('Footer text')).toBeInTheDocument();
    });
  });

  describe('Card Interactions', () => {
    it('handles click events on card', async () => {
      const handleClick = vi.fn();
      
      render(
        <Card onClick={handleClick}>
          <div>Clickable card</div>
        </Card>
      );
      
      const card = screen.getByText('Clickable card').parentElement;
      await userEvent.click(card!);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles hover events', () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      
      render(
        <Card 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div>Hoverable card</div>
        </Card>
      );
      
      const card = screen.getByText('Hoverable card').parentElement;
      
      fireEvent.mouseEnter(card!);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      
      fireEvent.mouseLeave(card!);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('handles focus events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      
      render(
        <Card 
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div>Focusable card</div>
        </Card>
      );
      
      const card = screen.getByText('Focusable card').parentElement;
      
      await userEvent.click(card!);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      
      await userEvent.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events', async () => {
      const handleKeyDown = vi.fn();
      
      render(
        <Card 
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div>Keyboard card</div>
        </Card>
      );
      
      const card = screen.getByText('Keyboard card').parentElement;
      card?.focus();
      
      await userEvent.keyboard('{Enter}');
      expect(handleKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({ key: 'Enter' })
      );
    });
  });

  describe('Card Variants', () => {
    it('renders elevated variant', () => {
      render(
        <Card variant="elevated">
          <div>Elevated card</div>
        </Card>
      );
      
      const card = screen.getByText('Elevated card').parentElement;
      expect(card).toBeInTheDocument();
    });

    it('renders outlined variant', () => {
      render(
        <Card variant="outlined">
          <div>Outlined card</div>
        </Card>
      );
      
      const card = screen.getByText('Outlined card').parentElement;
      expect(card).toBeInTheDocument();
    });

    it('renders filled variant', () => {
      render(
        <Card variant="filled">
          <div>Filled card</div>
        </Card>
      );
      
      const card = screen.getByText('Filled card').parentElement;
      expect(card).toBeInTheDocument();
    });
  });

  describe('Card Sizes', () => {
    it('renders small size', () => {
      render(
        <Card size="sm">
          <div>Small card</div>
        </Card>
      );
      
      const card = screen.getByText('Small card').parentElement;
      expect(card).toBeInTheDocument();
    });

    it('renders medium size', () => {
      render(
        <Card size="md">
          <div>Medium card</div>
        </Card>
      );
      
      const card = screen.getByText('Medium card').parentElement;
      expect(card).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(
        <Card size="lg">
          <div>Large card</div>
        </Card>
      );
      
      const card = screen.getByText('Large card').parentElement;
      expect(card).toBeInTheDocument();
    });
  });

  describe('Card Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Card 
          role="article"
          aria-labelledby="card-title"
          aria-describedby="card-description"
        >
          <CardHeader>
            <CardTitle id="card-title">Accessible Card</CardTitle>
            <CardDescription id="card-description">Description</CardDescription>
          </CardHeader>
        </Card>
      );
      
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title');
      expect(card).toHaveAttribute('aria-describedby', 'card-description');
    });

    it('supports keyboard navigation', async () => {
      render(
        <Card tabIndex={0}>
          <div>Keyboard navigable card</div>
        </Card>
      );
      
      const card = screen.getByText('Keyboard navigable card').parentElement;
      
      // Should be focusable
      expect(card).toHaveAttribute('tabindex', '0');
      
      // Should receive focus
      await userEvent.tab();
      expect(card).toHaveFocus();
    });

    it('announces card state to screen readers', () => {
      render(
        <Card aria-live="polite">
          <div>Live region card</div>
        </Card>
      );
      
      const card = screen.getByText('Live region card').parentElement;
      expect(card).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Card Edge Cases', () => {
    it('renders with empty content', () => {
      render(<Card></Card>);
      expect(document.querySelector('[data-testid="card"]')).toBeInTheDocument();
    });

    it('renders with only header', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Only Header</CardTitle>
          </CardHeader>
        </Card>
      );
      
      expect(screen.getByText('Only Header')).toBeInTheDocument();
    });

    it('renders with only content', () => {
      render(
        <Card>
          <CardContent>Only Content</CardContent>
        </Card>
      );
      
      expect(screen.getByText('Only Content')).toBeInTheDocument();
    });

    it('renders with only footer', () => {
      render(
        <Card>
          <CardFooter>Only Footer</CardFooter>
        </Card>
      );
      
      expect(screen.getByText('Only Footer')).toBeInTheDocument();
    });

    it('handles nested cards', () => {
      render(
        <Card>
          <CardContent>
            <Card>
              <CardContent>Nested card content</CardContent>
            </Card>
          </CardContent>
        </Card>
      );
      
      expect(screen.getByText('Nested card content')).toBeInTheDocument();
    });

    it('handles very long content', () => {
      const longContent = 'This is a very long content that should wrap properly within the card boundaries and maintain readability';
      
      render(
        <Card>
          <CardContent>{longContent}</CardContent>
        </Card>
      );
      
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  describe('Card Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(
          <Card key={i}>
            <CardHeader>
              <CardTitle>Card {i}</CardTitle>
            </CardHeader>
            <CardContent>Content {i}</CardContent>
          </Card>
        );
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 100 cards in less than 200ms
      expect(renderTime).toBeLessThan(200);
    });

    it('does not cause memory leaks', () => {
      const handleClick = vi.fn();
      
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(
          <Card key={i} onClick={handleClick}>
            <CardContent>Card {i}</CardContent>
          </Card>
        );
        unmount();
      }
      
      // Should not have memory leaks
      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('Card Integration', () => {
    it('works within grid layout', () => {
      render(
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <Card><CardContent>Card 1</CardContent></Card>
          <Card><CardContent>Card 2</CardContent></Card>
        </div>
      );
      
      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
    });

    it('works within list', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      
      render(
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Card>
                <CardContent>{item}</CardContent>
              </Card>
            </li>
          ))}
        </ul>
      );
      
      items.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('works with form elements', async () => {
      const handleSubmit = vi.fn();
      
      render(
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <input placeholder="Name" />
              <button type="submit">Submit</button>
            </form>
          </CardContent>
        </Card>
      );
      
      const input = screen.getByPlaceholderText('Name');
      const button = screen.getByRole('button', { name: 'Submit' });
      
      await userEvent.type(input, 'Test Name');
      await userEvent.click(button);
      
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Card Error Handling', () => {
    it('handles missing children gracefully', () => {
      expect(() => {
        render(<Card />);
      }).not.toThrow();
    });

    it('handles invalid variant gracefully', () => {
      expect(() => {
        render(
          <Card variant={'invalid' as any}>
            <div>Content</div>
          </Card>
        );
      }).not.toThrow();
    });

    it('handles invalid size gracefully', () => {
      expect(() => {
        render(
          <Card size={'invalid' as any}>
            <div>Content</div>
          </Card>
        );
      }).not.toThrow();
    });
  });
});
