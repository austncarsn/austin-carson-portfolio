# Primitive UI Components

## Overview

The Primitive UI library provides production-ready, accessible, and design token-based components for building consistent user interfaces. All components follow WCAG 2.2 AA accessibility standards and integrate seamlessly with the design token system.

## Philosophy

**Primitives** are foundational building blocks that:

- ✅ Use design tokens exclusively (no hardcoded colors/sizes)
- ✅ Support multiple variants and sizes
- ✅ Include comprehensive TypeScript types
- ✅ Follow accessibility best practices
- ✅ Provide consistent API patterns
- ✅ Work across all viewport sizes

## Components

### Button

Versatile button component with 6 visual variants and 5 size presets.

#### Features

- **Variants**: primary, secondary, ghost, outline, danger, success
- **Sizes**: xs, sm, md, lg, xl
- **States**: loading, disabled
- **Icons**: before, after, icon-only
- **Accessibility**: Full keyboard support, ARIA attributes

#### Basic Usage

```tsx
import { Button } from '@/components/primitives';

// Primary CTA
<Button variant="primary" size="lg">
  Get Started
</Button>

// Secondary action
<Button variant="secondary" size="md">
  Learn More
</Button>

// Danger action
<Button variant="danger" size="md">
  Delete Account
</Button>
```

#### With Icons

```tsx
import { ArrowRight, Download, X } from 'lucide-react';

// Icon after text
<Button variant="primary" iconAfter={<ArrowRight />}>
  Continue
</Button>

// Icon before text
<Button variant="secondary" iconBefore={<Download />}>
  Download
</Button>

// Icon only
<Button variant="ghost" iconOnly aria-label="Close">
  <X />
</Button>
```

#### Loading State

```tsx
<Button variant="primary" loading disabled>
  Saving...
</Button>
```

#### Full Width

```tsx
<Button variant="primary" fullWidth>
  Submit Form
</Button>
```

#### API Reference

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent) => void;
  // ... all standard button HTML attributes
}
```

#### Size Guide

| Size | Height | Padding | Font Size | Use Case                   |
| ---- | ------ | ------- | --------- | -------------------------- |
| `xs` | 28px   | 10px    | caption   | Compact UIs, table actions |
| `sm` | 36px   | 14px    | body-sm   | Form inputs, toolbars      |
| `md` | 44px   | 20px    | body-md   | Default buttons, dialogs   |
| `lg` | 48px   | 24px    | body-lg   | Hero CTAs, marketing       |
| `xl` | 56px   | 32px    | body-xl   | Large hero sections        |

#### Variant Guide

| Variant     | Purpose             | Example Use Case                  |
| ----------- | ------------------- | --------------------------------- |
| `primary`   | Highest emphasis    | Main CTAs, form submissions       |
| `secondary` | Medium emphasis     | Secondary actions, cancel buttons |
| `ghost`     | Lowest emphasis     | Tertiary actions, menu items      |
| `outline`   | Alternative medium  | Filters, toggles, alternatives    |
| `danger`    | Destructive actions | Delete, remove, clear             |
| `success`   | Positive actions    | Confirm, approve, save            |

---

### Card

Flexible container component with 4 visual variants and semantic sub-components.

#### Features

- **Variants**: elevated, outlined, filled, ghost
- **Padding**: none, sm, md, lg, xl
- **Interactive**: Clickable cards with hover states
- **Sub-components**: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Accessibility**: Proper ARIA roles for interactive cards

#### Basic Usage

```tsx
import { Card } from '@/components/primitives';

<Card variant="elevated" padding="md">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>;
```

#### With Semantic Sub-components

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/primitives';

<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Project Showcase</CardTitle>
    <CardDescription>A collection of my recent work and experiments</CardDescription>
  </CardHeader>

  <CardContent>
    <img src="/preview.jpg" alt="Preview" />
    <p>Detailed project information...</p>
  </CardContent>

  <CardFooter>
    <Button variant="primary">View Project</Button>
    <Button variant="ghost">Learn More</Button>
  </CardFooter>
</Card>;
```

#### Interactive Cards

```tsx
<Card variant="elevated" interactive onClick={() => navigate('/project/1')}>
  <CardTitle>Clickable Project Card</CardTitle>
  <CardDescription>Click anywhere to view details</CardDescription>
</Card>
```

#### API Reference

```typescript
interface CardProps {
  variant?: 'elevated' | 'outlined' | 'filled' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  // ... all standard div HTML attributes
}
```

#### Variant Guide

| Variant    | Description               | Use Case                          |
| ---------- | ------------------------- | --------------------------------- |
| `elevated` | Floating card with shadow | Default cards, important content  |
| `outlined` | Card with visible border  | Grouped content, form sections    |
| `filled`   | Subtle background fill    | Less emphasis, secondary content  |
| `ghost`    | Minimal styling           | Very low emphasis, inline content |

#### Padding Guide

| Padding | Size        | Responsive       |
| ------- | ----------- | ---------------- |
| `none`  | 0px         | Static           |
| `sm`    | 12px → 16px | Mobile → Desktop |
| `md`    | 16px → 24px | Mobile → Desktop |
| `lg`    | 24px → 32px | Mobile → Desktop |
| `xl`    | 32px → 40px | Mobile → Desktop |

---

## Design Token Integration

All primitive components use design tokens from `src/styles/tokens.css`:

### Colors

```css
/* Button/Card backgrounds */
--color-bg-canvas: Base canvas color --color-bg-surface: Elevated surface color
  --color-bg-subtle: Subtle background /* Text colors */ --color-text-primary: Primary
  text --color-text-secondary: Secondary text --color-text-muted: Muted text
  /* Brand colors */ --brand: Primary brand color --brand-hover: Hover state
  --brand-active: Active state /* Semantic colors */ --error: Error/danger state
  --success: Success/positive state --warning: Warning state --info: Information state;
```

### Typography

```css
/* Font sizes (fluid scaling) */
--font-size-caption: 12-13px --font-size-body-xs: 12-14px --font-size-body-sm: 14-16px
  --font-size-body-md: 16-18px --font-size-body-lg: 18-20px --font-size-body-xl: 20-22px;
```

---

## Accessibility

All primitive components follow WCAG 2.2 AA guidelines:

### Button Accessibility

- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Focus visible indicators (ring-2)
- ✅ Proper ARIA attributes
- ✅ Loading state announcements
- ✅ Icon-only buttons require aria-label
- ✅ Disabled state prevents interaction

### Card Accessibility

- ✅ Interactive cards have role="button"
- ✅ Keyboard navigation (Tab, Enter)
- ✅ Focus indicators on interactive cards
- ✅ aria-disabled for disabled state
- ✅ Semantic HTML structure

---

## Real-World Examples

### Hero CTA Section

```tsx
<section className="py-20">
  <h1 className="text-display-2xl mb-6">Welcome to My Portfolio</h1>
  <p className="text-body-lg mb-8">Discover my latest work and projects</p>

  <div className="flex gap-4">
    <Button variant="primary" size="xl" iconAfter={<ArrowRight />}>
      View Projects
    </Button>
    <Button variant="outline" size="xl">
      Contact Me
    </Button>
  </div>
</section>
```

### Project Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project) => (
    <Card key={project.id} variant="elevated" interactive>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.category}</CardDescription>
      </CardHeader>

      <CardContent>
        <AspectVideo>
          <img src={project.image} alt={project.title} />
        </AspectVideo>
        <p className="mt-4 text-body-sm">{project.description}</p>
      </CardContent>

      <CardFooter>
        <Button variant="primary" fullWidth>
          View Details
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

### Form with Validation

```tsx
<Card variant="outlined" padding="lg">
  <CardHeader>
    <CardTitle>Contact Form</CardTitle>
    <CardDescription>Get in touch with me</CardDescription>
  </CardHeader>

  <CardContent>
    <form onSubmit={handleSubmit}>
      <input type="email" required />
      <textarea required />
    </form>
  </CardContent>

  <CardFooter>
    <Button
      variant="primary"
      type="submit"
      loading={isSubmitting}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </Button>
    <Button variant="ghost" onClick={handleCancel}>
      Cancel
    </Button>
  </CardFooter>
</Card>
```

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+

---

## Migration from Ad-Hoc Buttons

### Before (Inline Styles)

```tsx
<button
  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg"
  onClick={handleClick}
>
  Click Me
</button>
```

### After (Primitive Component)

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Benefits

- ✅ Consistent styling across application
- ✅ Type-safe props with IntelliSense
- ✅ Built-in accessibility
- ✅ Automatic responsive sizing
- ✅ Design token integration
- ✅ Loading states included
- ✅ Icon support out of the box

---

## Future Enhancements

Planned additions to the primitive library:

- [ ] **Input** - Text input, textarea, number, email, password
- [ ] **Select** - Dropdown select with search
- [ ] **Checkbox** - Checkbox and checkbox group
- [ ] **Radio** - Radio button and radio group
- [ ] **Switch** - Toggle switch component
- [ ] **Badge** - Status and count badges
- [ ] **Avatar** - User avatar with fallback
- [ ] **Tooltip** - Accessible tooltip with arrow
- [ ] **Dialog** - Modal dialog with overlay
- [ ] **Popover** - Floating popover component

---

**Version:** 1.0.0  
**Last Updated:** November 6, 2025 (PR #4)  
**Maintainer:** Austin Carson
