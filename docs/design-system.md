# Lumo Platform Design System

## Overview

The Lumo Platform Design System is a comprehensive set of guidelines, components, and tools that ensure consistency, accessibility, and excellent user experience across all platform interfaces.

## Table of Contents

- [Core Principles](#core-principles)
- [Design Tokens](#design-tokens)
- [Component Library](#component-library)
- [Layout System](#layout-system)
- [Typography](#typography)
- [Colors](#colors)
- [Spacing](#spacing)
- [Icons](#icons)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [Internationalization](#internationalization)
- [Animation & Motion](#animation--motion)
- [Development Guidelines](#development-guidelines)

## Core Principles

### 1. **Consistency**
- Unified visual language across all interfaces
- Predictable interactions and behaviors
- Cohesive user experience

### 2. **Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios

### 3. **Performance**
- Optimized components
- Lazy loading strategies
- Minimal bundle size impact
- Fast rendering

### 4. **Flexibility**
- Themeable components
- Customizable design tokens
- Extensible architecture
- Multi-language support

### 5. **Developer Experience**
- Clear documentation
- Type-safe components
- Easy integration
- Comprehensive testing

## Design Tokens

Design tokens are the single source of truth for all design decisions.

### Color Tokens

```typescript
// Primary colors
{
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
}
```

### Typography Tokens

```typescript
{
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}
```

### Spacing Tokens

```typescript
{
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem',
    8: '2rem',
    16: '4rem',
  },
}
```

## Component Library

### Button Component

The Button component is a versatile interactive element with multiple variants and states.

#### Variants
- **Primary**: Main action buttons
- **Secondary**: Secondary actions
- **Outline**: Bordered buttons
- **Ghost**: Minimal buttons
- **Link**: Link-style buttons

#### Sizes
- **Small** (sm): 32px height
- **Medium** (md): 40px height
- **Large** (lg): 48px height
- **Extra Large** (xl): 56px height

#### States
- Default
- Hover
- Active
- Disabled
- Loading

#### Usage Example
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

### Input Component

Form input with validation, states, and accessibility features.

#### Types
- Text
- Email
- Password
- Number
- Search

#### States
- Default
- Focus
- Error
- Disabled
- Success

#### Usage Example
```tsx
<Input
  type="email"
  placeholder="Enter your email"
  error={hasError}
  helperText={errorMessage}
/>
```

### Card Component

Flexible container for grouping related content.

#### Variants
- Default
- Elevated
- Outlined
- Filled

#### Usage Example
```tsx
<Card variant="elevated" padding="md">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Modal Component

Dialog overlay for focused interactions.

#### Features
- Backdrop click to close
- Escape key support
- Focus management
- Accessibility attributes

#### Usage Example
```tsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <ModalHeader>
    <ModalTitle>Modal Title</ModalTitle>
  </ModalHeader>
  <ModalBody>
    Modal content
  </ModalBody>
  <ModalFooter>
    <Button onClick={handleClose}>Close</Button>
  </ModalFooter>
</Modal>
```

## Layout System

### Grid System

Responsive grid system based on CSS Grid and Flexbox.

#### Breakpoints
- **xs**: 0px - 575px
- **sm**: 576px - 767px
- **md**: 768px - 991px
- **lg**: 992px - 1199px
- **xl**: 1200px - 1399px
- **2xl**: 1400px+

#### Container Classes
```css
.container { max-width: 1200px; }
.container-sm { max-width: 540px; }
.container-md { max-width: 720px; }
.container-lg { max-width: 960px; }
.container-xl { max-width: 1140px; }
.container-2xl { max-width: 1320px; }
```

#### Grid Classes
```css
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
```

### Flexbox Utilities

```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
```

## Typography

### Font Hierarchy

```css
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
```

### Font Weights

```css
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

## Colors

### Color Palette

#### Primary Colors
- Blue 500: #3b82f6 (Primary)
- Blue 600: #2563eb (Primary Dark)
- Blue 400: #60a5fa (Primary Light)

#### Semantic Colors
- Success: #10b981
- Warning: #f59e0b
- Error: #ef4444
- Info: #06b6d4

#### Neutral Colors
- Gray 50: #f9fafb
- Gray 100: #f3f4f6
- Gray 200: #e5e7eb
- Gray 300: #d1d5db
- Gray 400: #9ca3af
- Gray 500: #6b7280
- Gray 600: #4b5563
- Gray 700: #374151
- Gray 800: #1f2937
- Gray 900: #111827

### Color Usage Guidelines

1. **Primary Blue**: Used for main actions, links, and important elements
2. **Success Green**: Used for successful actions, confirmations
3. **Warning Orange**: Used for warnings, attention-grabbing elements
4. **Error Red**: Used for errors, destructive actions
5. **Info Cyan**: Used for informational messages

## Spacing

### Spacing Scale

Based on 4px base unit for consistency:

```css
.p-0 { padding: 0; }
.p-1 { padding: 0.25rem; }  /* 4px */
.p-2 { padding: 0.5rem; }   /* 8px */
.p-3 { padding: 0.75rem; }  /* 12px */
.p-4 { padding: 1rem; }     /* 16px */
.p-5 { padding: 1.25rem; }  /* 20px */
.p-6 { padding: 1.5rem; }   /* 24px */
.p-8 { padding: 2rem; }     /* 32px */
.p-10 { padding: 2.5rem; }  /* 40px */
.p-12 { padding: 3rem; }    /* 48px */
```

### Margin Classes

Same scale as padding, using `m-` prefix:
```css
.m-4 { margin: 1rem; }
.mt-4 { margin-top: 1rem; }
.mr-4 { margin-right: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.ml-4 { margin-left: 1rem; }
.mx-4 { margin-left: 1rem; margin-right: 1rem; }
.my-4 { margin-top: 1rem; margin-bottom: 1rem; }
```

## Icons

### Icon System

- **SVG Icons**: Scalable, accessible, and themeable
- **Icon Components**: React components for each icon
- **Icon Sizes**: Consistent sizing (16px, 20px, 24px, 32px)

### Icon Categories

1. **UI Icons**: Interface elements (close, menu, search)
2. **Action Icons**: User actions (edit, delete, download)
3. **Navigation Icons**: Navigation elements (arrow, chevron)
4. **Social Icons**: Social media platforms
5. **File Icons**: File types and formats

### Usage Example

```tsx
<Icon name="check" size="md" className="text-success" />
<Icon name="alert-circle" size="sm" className="text-warning" />
```

## Accessibility

### WCAG 2.1 AA Compliance

#### Color Contrast
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

#### Keyboard Navigation
- Tab order follows logical sequence
- Focus indicators are visible
- Skip links provided
- Focus management in modals

#### Screen Reader Support
- Semantic HTML elements
- ARIA labels and descriptions
- Live regions for dynamic content
- Alternative text for images

### Accessibility Guidelines

1. **Always provide alt text** for meaningful images
2. **Use semantic HTML** elements appropriately
3. **Ensure keyboard accessibility** for all interactive elements
4. **Provide focus indicators** for keyboard users
5. **Test with screen readers** regularly
6. **Use ARIA attributes** when native HTML is insufficient

## Responsive Design

### Mobile-First Approach

All components are designed mobile-first, with progressive enhancement for larger screens.

#### Responsive Utilities

```css
/* Mobile first */
.text-sm { font-size: 0.875rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .md\:text-base { font-size: 1rem; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .lg\:text-lg { font-size: 1.125rem; }
}
```

### Responsive Patterns

1. **Navigation**: Hamburger menu on mobile, full navigation on desktop
2. **Cards**: Single column on mobile, multi-column on desktop
3. **Forms**: Stacked on mobile, inline on desktop
4. **Tables**: Horizontal scroll on mobile, full width on desktop

## Internationalization

### Multi-Language Support

The design system supports multiple languages with RTL/LTR support.

#### Supported Languages
- English (en) - LTR
- Arabic (ar) - RTL
- Spanish (es) - LTR
- French (fr) - LTR
- German (de) - LTR
- Chinese (zh) - LTR
- Japanese (ja) - LTR

#### Text Direction

```css
/* LTR (default) */
[dir="ltr"] .ml-4 { margin-left: 1rem; }

/* RTL */
[dir="rtl"] .ml-4 { margin-right: 1rem; }
```

#### Font Optimization

Language-specific fonts are loaded based on user locale:
- Arabic: Noto Sans Arabic
- Chinese: Noto Sans SC
- Japanese: Noto Sans JP
- Korean: Noto Sans KR
- Others: Inter

## Animation & Motion

### Animation Principles

1. **Purposeful**: Animations should have a clear purpose
2. **Performant**: Use CSS transforms and opacity
3. **Accessible**: Respect `prefers-reduced-motion`
4. **Consistent**: Use consistent timing and easing

### Animation Tokens

```css
{
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    ease-in: 'cubic-bezier(0.4, 0, 1, 1)',
    ease-out: 'cubic-bezier(0, 0, 0.2, 1)',
    ease-in-out: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
```

### Common Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide Up
```css
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

#### Scale
```css
@keyframes scale {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
```

## Development Guidelines

### Component Development

#### File Structure
```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   ├── Button.styles.ts
│   └── index.ts
```

#### Component Template

```tsx
import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        'button',
        `button--${variant}`,
        `button--${size}`,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Testing Guidelines

#### Unit Testing
- Test all props and states
- Test accessibility attributes
- Test user interactions
- Use meaningful test names

#### Visual Testing
- Test all variants
- Test different screen sizes
- Test different themes
- Test RTL/LTR directions

#### Accessibility Testing
- Test keyboard navigation
- Test screen reader compatibility
- Test color contrast
- Test focus management

### Performance Guidelines

1. **Use React.memo** for pure components
2. **Lazy load** heavy components
3. **Optimize images** with proper formats
4. **Minimize re-renders** with proper state management
5. **Use CSS-in-JS** efficiently
6. **Bundle size optimization** with tree shaking

## Contributing

### How to Contribute

1. **Create an issue** for new features or bug reports
2. **Fork the repository** and create a feature branch
3. **Follow the coding standards** and guidelines
4. **Write tests** for new components
5. **Update documentation** for changes
6. **Submit a pull request** with clear description

### Code Review Process

1. **Automated checks** (linting, testing, build)
2. **Design review** for visual changes
3. **Accessibility review** for a11y compliance
4. **Performance review** for optimization
5. **Documentation review** for completeness

## Version History

### v1.0.0 (Current)
- Initial release
- Core component library
- Design tokens system
- Accessibility compliance
- Internationalization support

### Future Roadmap
- v1.1.0: Advanced components (Data Tables, Forms)
- v1.2.0: Dark theme improvements
- v1.3.0: Performance optimizations
- v2.0.0: Design system 2.0 with new architecture

## Resources

### Documentation
- [Component API Reference](./components/)
- [Design Tokens Reference](./tokens/)
- [Accessibility Guidelines](./accessibility/)
- [Migration Guide](./migration/)

### Tools
- [Storybook](http://localhost:6006) - Component playground
- [Figma Design System](https://figma.com/lumo-design-system)
- [Design Token Generator](./tools/token-generator/)

### Support
- [GitHub Issues](https://github.com/lumo-platform/design-system/issues)
- [Discord Community](https://discord.gg/lumo-platform)
- [Documentation Site](https://design-system.lumo-platform.com)

---

This design system is continuously evolving to meet the needs of the Lumo Platform and its users. Contributions and feedback are welcome!
