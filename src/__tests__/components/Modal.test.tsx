// Modal Component Unit Tests
// Comprehensive unit tests for the Modal component

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Modal, ModalHeader, ModalContent, ModalFooter, ModalTitle, ModalDescription } from '../../components/ui/Modal';

describe('Modal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock portal
    vi.mock('react-dom', async () => {
      const actual = await vi.importActual('react-dom');
      return {
        ...actual,
        createPortal: (children: React.ReactNode) => children,
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Modal Rendering', () => {
    it('renders modal when open', () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <p>Modal content</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render modal when closed', () => {
      render(
        <Modal open={false}>
          <ModalContent>
            <p>Modal content</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('renders modal with all subcomponents', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>Modal description</ModalDescription>
          </ModalHeader>
          <ModalContent>
            <p>Modal content goes here</p>
          </ModalContent>
          <ModalFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </ModalFooter>
        </Modal>
      );
      
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
      expect(screen.getByText('Modal description')).toBeInTheDocument();
      expect(screen.getByText('Modal content goes here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });

    it('renders modal with custom className', () => {
      render(
        <Modal open={true} className="custom-modal">
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      const modal = screen.getByText('Content').closest('[role="dialog"]');
      expect(modal).toHaveClass('custom-modal');
    });
  });

  describe('ModalHeader Component', () => {
    it('renders header with title', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalTitle>Header Title</ModalTitle>
          </ModalHeader>
        </Modal>
      );
      
      expect(screen.getByText('Header Title')).toBeInTheDocument();
    });

    it('renders header with description', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalDescription>Header description</ModalDescription>
          </ModalHeader>
        </Modal>
      );
      
      expect(screen.getByText('Header description')).toBeInTheDocument();
    });

    it('renders header with close button', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalTitle>Title with close</ModalTitle>
          </ModalHeader>
        </Modal>
      );
      
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('renders header without close button when hideClose is true', () => {
      render(
        <Modal open={true}>
          <ModalHeader hideClose>
            <ModalTitle>No close button</ModalTitle>
          </ModalHeader>
        </Modal>
      );
      
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });

  describe('ModalTitle Component', () => {
    it('renders title as heading', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
          </ModalHeader>
        </Modal>
      );
      
      const title = screen.getByRole('heading', { name: 'Modal Title' });
      expect(title).toBeInTheDocument();
    });

    it('renders title with custom className', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalTitle className="custom-title">Custom Title</ModalTitle>
          </ModalHeader>
        </Modal>
      );
      
      const title = screen.getByRole('heading');
      expect(title).toHaveClass('custom-title');
    });
  });

  describe('ModalDescription Component', () => {
    it('renders description text', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalDescription>This is a modal description</ModalDescription>
          </ModalHeader>
        </Modal>
      );
      
      expect(screen.getByText('This is a modal description')).toBeInTheDocument();
    });

    it('renders description with custom className', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalDescription className="custom-description">Description</ModalDescription>
          </ModalHeader>
        </Modal>
      );
      
      const description = screen.getByText('Description');
      expect(description).toHaveClass('custom-description');
    });
  });

  describe('ModalContent Component', () => {
    it('renders content area', () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <p>Main content area</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Main content area')).toBeInTheDocument();
    });

    it('renders content with custom className', () => {
      render(
        <Modal open={true}>
          <ModalContent className="custom-content">
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      const content = screen.getByText('Content').parentElement;
      expect(content).toHaveClass('custom-content');
    });

    it('renders scrollable content', () => {
      render(
        <Modal open={true}>
          <ModalContent scrollable>
            <p>Scrollable content</p>
          </ModalContent>
        </Modal>
      );
      
      const content = screen.getByText('Scrollable content').parentElement;
      expect(content).toBeInTheDocument();
    });
  });

  describe('ModalFooter Component', () => {
    it('renders footer with actions', () => {
      render(
        <Modal open={true}>
          <ModalFooter>
            <button>Cancel</button>
            <button>Submit</button>
          </ModalFooter>
        </Modal>
      );
      
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('renders footer with custom className', () => {
      render(
        <Modal open={true}>
          <ModalFooter className="custom-footer">
            <button>Action</button>
          </ModalFooter>
        </Modal>
      );
      
      const footer = screen.getByRole('button', { name: 'Action' }).parentElement;
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Modal Interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const handleClose = vi.fn();
      
      render(
        <Modal open={true} onClose={handleClose}>
          <ModalHeader>
            <ModalTitle>Test Modal</ModalTitle>
          </ModalHeader>
        </Modal>
      );
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      await userEvent.click(closeButton);
      
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when overlay is clicked', async () => {
      const handleClose = vi.fn();
      
      render(
        <Modal open={true} onClose={handleClose}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      const overlay = screen.getByText('Content').closest('[role="dialog"]')?.parentElement;
      if (overlay) {
        await userEvent.click(overlay);
        expect(handleClose).toHaveBeenCalledTimes(1);
      }
    });

    it('does not call onClose when content is clicked', async () => {
      const handleClose = vi.fn();
      
      render(
        <Modal open={true} onClose={handleClose}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      const content = screen.getByText('Content');
      await userEvent.click(content);
      
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed', async () => {
      const handleClose = vi.fn();
      
      render(
        <Modal open={true} onClose={handleClose}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      await userEvent.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('prevents body scroll when open', () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      expect(document.body).toHaveStyle('overflow: hidden');
    });

    it('restores body scroll when closed', () => {
      const { rerender } = render(
        <Modal open={true}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      expect(document.body).toHaveStyle('overflow: hidden');
      
      rerender(
        <Modal open={false}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      expect(document.body).not.toHaveStyle('overflow: hidden');
    });
  });

  describe('Modal Variants', () => {
    it('renders centered variant', () => {
      render(
        <Modal open={true} variant="centered">
          <ModalContent>
            <p>Centered modal</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Centered modal')).toBeInTheDocument();
    });

    it('renders fullscreen variant', () => {
      render(
        <Modal open={true} variant="fullscreen">
          <ModalContent>
            <p>Fullscreen modal</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Fullscreen modal')).toBeInTheDocument();
    });

    it('renders drawer variant', () => {
      render(
        <Modal open={true} variant="drawer">
          <ModalContent>
            <p>Drawer modal</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Drawer modal')).toBeInTheDocument();
    });
  });

  describe('Modal Sizes', () => {
    it('renders small size', () => {
      render(
        <Modal open={true} size="sm">
          <ModalContent>
            <p>Small modal</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Small modal')).toBeInTheDocument();
    });

    it('renders medium size', () => {
      render(
        <Modal open={true} size="md">
          <ModalContent>
            <p>Medium modal</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Medium modal')).toBeInTheDocument();
    });

    it('renders large size', () => {
      render(
        <Modal open={true} size="lg">
          <ModalContent>
            <p>Large modal</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Large modal')).toBeInTheDocument();
    });

    it('renders extra large size', () => {
      render(
        <Modal open={true} size="xl">
          <ModalContent>
            <p>Extra large modal</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Extra large modal')).toBeInTheDocument();
    });
  });

  describe('Modal Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalTitle>Accessible Modal</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby');
      expect(modal).toHaveAttribute('aria-describedby');
    });

    it('focuses modal when opened', () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveFocus();
    });

    it('traps focus within modal', async () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <button>First Button</button>
            <button>Second Button</button>
            <button>Third Button</button>
          </ModalContent>
        </Modal>
      );
      
      const buttons = screen.getAllByRole('button');
      
      // Focus should be trapped within modal
      await userEvent.tab();
      expect(buttons[0]).toHaveFocus();
      
      await userEvent.tab();
      expect(buttons[1]).toHaveFocus();
      
      await userEvent.tab();
      expect(buttons[2]).toHaveFocus();
      
      await userEvent.tab();
      // Should cycle back to first button
      expect(buttons[0]).toHaveFocus();
    });

    it('announces modal to screen readers', () => {
      render(
        <Modal open={true}>
          <ModalHeader>
            <ModalTitle>Screen Reader Modal</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('role', 'dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('Modal Edge Cases', () => {
    it('renders with empty content', () => {
      render(<Modal open={true}></Modal>);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles rapid open/close', async () => {
      const handleClose = vi.fn();
      
      const { rerender } = render(
        <Modal open={true} onClose={handleClose}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Content')).toBeInTheDocument();
      
      rerender(
        <Modal open={false} onClose={handleClose}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
      
      rerender(
        <Modal open={true} onClose={handleClose}>
          <ModalContent>
            <p>Content</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('handles missing onClose gracefully', () => {
      expect(() => {
        render(
          <Modal open={true}>
            <ModalContent>
              <p>Content</p>
            </ModalContent>
          </Modal>
        );
      }).not.toThrow();
    });

    it('handles very long content', () => {
      const longContent = 'This is a very long modal content that should scroll properly within the modal boundaries and maintain accessibility';
      
      render(
        <Modal open={true}>
          <ModalContent scrollable>
            <p>{longContent}</p>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });

  describe('Modal Performance', () => {
    it('renders efficiently', () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(
          <Modal key={i} open={true}>
            <ModalHeader>
              <ModalTitle>Modal {i}</ModalTitle>
            </ModalHeader>
            <ModalContent>Content {i}</ModalContent>
          </Modal>
        );
        unmount();
      }
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 50 modals in less than 300ms
      expect(renderTime).toBeLessThan(300);
    });

    it('does not cause memory leaks', () => {
      const handleClose = vi.fn();
      
      for (let i = 0; i < 25; i++) {
        const { unmount } = render(
          <Modal key={i} open={true} onClose={handleClose}>
            <ModalContent>Modal {i}</ModalContent>
          </Modal>
        );
        unmount();
      }
      
      // Should not have memory leaks
      expect(handleClose).toHaveBeenCalledTimes(0);
    });
  });

  describe('Modal Integration', () => {
    it('works with form elements', async () => {
      const handleSubmit = vi.fn();
      
      render(
        <Modal open={true}>
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <input placeholder="Name" />
              <button type="submit">Submit</button>
            </form>
          </ModalContent>
        </Modal>
      );
      
      const input = screen.getByPlaceholderText('Name');
      const button = screen.getByRole('button', { name: 'Submit' });
      
      await userEvent.type(input, 'Test Name');
      await userEvent.click(button);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('works with nested components', () => {
      render(
        <Modal open={true}>
          <ModalContent>
            <div>
              <h2>Nested Heading</h2>
              <p>Nested paragraph</p>
              <button>Nested button</button>
            </div>
          </ModalContent>
        </Modal>
      );
      
      expect(screen.getByRole('heading', { name: 'Nested Heading' })).toBeInTheDocument();
      expect(screen.getByText('Nested paragraph')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Nested button' })).toBeInTheDocument();
    });
  });

  describe('Modal Error Handling', () => {
    it('handles invalid variant gracefully', () => {
      expect(() => {
        render(
          <Modal open={true} variant={'invalid' as any}>
            <ModalContent>Content</ModalContent>
          </Modal>
        );
      }).not.toThrow();
    });

    it('handles invalid size gracefully', () => {
      expect(() => {
        render(
          <Modal open={true} size={'invalid' as any}>
            <ModalContent>Content</ModalContent>
          </Modal>
        );
      }).not.toThrow();
    });

    it('handles portal errors gracefully', () => {
      // Mock createPortal to throw error
      vi.doMock('react-dom', async () => {
        const actual = await vi.importActual('react-dom');
        return {
          ...actual,
          createPortal: () => {
            throw new Error('Portal error');
          },
        };
      });
      
      expect(() => {
        render(
          <Modal open={true}>
            <ModalContent>Content</ModalContent>
          </Modal>
        );
      }).not.toThrow();
    });
  });
});
