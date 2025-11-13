# Design System Documentation

## Overview

This design system provides a comprehensive set of design tokens, components, and utilities for building consistent, accessible, and maintainable user interfaces.

## Token Architecture

### Three-Layer System

```
Primitive Tokens → Semantic Tokens → Component Tokens
```

1. **Primitive Tokens**: Raw values with no context (colors, spacing, typography)
2. **Semantic Tokens**: Context-aware mappings (backgrounds, text colors, interactive states)
3. **Component Tokens**: Specific tokens for components (button sizes, card padding)

### Usage Philosophy

- **Always use semantic tokens** in components (not primitives)
- Primitives should only be referenced in semantic token definitions
- Component tokens compose semantic tokens for specific use cases

## Color System

### Primitive Colors

#### Neutral Scale

Pure gray scale from white to black:

```css
--color-neutral-0      /* #ffffff - Pure white */
--color-neutral-50     /* #fafafa */
--color-neutral-100    /* #f5f5f5 */
--color-neutral-200    /* #e5e5e5 */
--color-neutral-300    /* #d4d4d4 */
--color-neutral-400    /* #a3a3a3 */
--color-neutral-500    /* #737373 */
--color-neutral-600    /* #525252 */
--color-neutral-700    /* #404040 */
--color-neutral-800    /* #262626 */
--color-neutral-900    /* #171717 */
--color-neutral-950    /* #0a0a0a */
--color-neutral-1000   /* #000000 - Pure black */
```

#### Brand Colors (Emerald)

Primary brand identity:

```css
--color-brand-50   to   --color-brand-950
```

#### Accent Colors (Amber)

Secondary/complementary colors:

```css
--color-accent-50   to   --color-accent-900
```

### Semantic Colors

#### Backgrounds

```css
--color-bg-canvas    /* Main page background */
--color-bg-surface   /* Card, panel backgrounds */
--color-bg-elevated  /* Floating elements */
--color-bg-overlay   /* Modal/drawer overlays */
--color-bg-muted     /* Disabled, secondary areas */
```

**Tailwind Usage:**

```tsx
<div className="bg-bg-canvas">
<div className="bg-bg-surface">
<div className="bg-bg-elevated">
```

#### Text Colors

```css
--color-text-primary    /* Main body text */
--color-text-secondary  /* Secondary text */
--color-text-muted      /* Helper, caption text */
--color-text-subtle     /* Placeholder text */
--color-text-on-brand   /* Text on brand backgrounds */
--color-text-inverse    /* Text on dark backgrounds */
```

**Tailwind Usage:**

```tsx
<h1 className="text-text-primary">
<p className="text-text-secondary">
<span className="text-text-muted">
```

#### Border Colors

```css
--color-border-subtle   /* Subtle dividers */
--color-border-default  /* Standard borders */
--color-border-strong   /* Emphasized borders */
--color-border-brand    /* Brand-colored borders */
--color-border-error    /* Error state borders */
```

**Tailwind Usage:**

```tsx
<div className="border border-border-default">
<div className="border-2 border-border-brand">
```

#### Interactive Colors

```css
/* Primary actions */
--color-interactive-primary
--color-interactive-primary-hover
--color-interactive-primary-active

/* Secondary actions */
--color-interactive-secondary
--color-interactive-secondary-hover
--color-interactive-secondary-active

/* Ghost/tertiary actions */
--color-interactive-ghost
--color-interactive-ghost-hover
--color-interactive-ghost-active

/* States */
--color-interactive-disabled
--color-interactive-focus
```

**Tailwind Usage:**

```tsx
<button className="bg-interactive-primary hover:bg-interactive-primary-hover">
```

#### Status Colors

```css
/* Success */
--color-status-success
--color-status-success-bg

/* Warning */
--color-status-warning
--color-status-warning-bg

/* Error */
--color-status-error
--color-status-error-bg

/* Info */
--color-status-info
--color-status-info-bg
```

### Color Modes

#### Light Mode (Default)

Optimized for readability in bright environments.

#### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  /* Automatically applies dark variants */
}
```

#### High Contrast Mode

```css
@media (prefers-contrast: high) {
  /* Increases contrast ratios for accessibility */
}
```

## Spacing System

### Scale

0.25rem (4px) step scale:

```css
--space-0   /* 0 */
--space-1   /* 4px */
--space-2   /* 8px */
--space-3   /* 12px */
--space-4   /* 16px */
--space-5   /* 20px */
--space-6   /* 24px */
--space-8   /* 32px */
--space-10  /* 40px */
--space-12  /* 48px */
--space-16  /* 64px */
--space-20  /* 80px */
--space-24  /* 96px */
--space-32  /* 128px */
--space-40  /* 160px */
--space-48  /* 192px */
--space-56  /* 224px */
--space-64  /* 256px */
```

### Tailwind Usage

```tsx
<div className="p-4">      {/* 16px padding */}
<div className="mt-8">     {/* 32px margin-top */}
<div className="gap-6">    {/* 24px gap */}
```

### Common Patterns

**Component Padding:**

```tsx
<Card className="p-6">           {/* 24px - Default */}
<Card className="p-4 md:p-8">    {/* Responsive */}
```

**Section Spacing:**

```tsx
<section className="py-16 md:py-24 lg:py-32">
```

**Inline Spacing:**

```tsx
<div className="space-x-4">  {/* 16px between children */}
```

## Typography System

### Fluid Type Scale

Uses `clamp()` for responsive sizing:

```css
--font-size-xs     /* 12-14px */
--font-size-sm     /* 14-16px */
--font-size-base   /* 16-18px */
--font-size-lg     /* 18-20px */
--font-size-xl     /* 20-24px */
--font-size-2xl    /* 24-30px */
--font-size-3xl    /* 30-36px */
--font-size-4xl    /* 36-48px */
--font-size-5xl    /* 48-60px */
--font-size-6xl    /* 60-72px */
```

### Type Scale Ratio

- **Mobile**: 1.25 (Major Third)
- **Desktop**: 1.333 (Perfect Fourth)

### Font Weights

```css
--font-weight-light     /* 300 */
--font-weight-normal    /* 400 */
--font-weight-medium    /* 500 */
--font-weight-semibold  /* 600 */
--font-weight-bold      /* 700 */
--font-weight-black     /* 900 */
```

### Line Heights

```css
--line-height-none     /* 1 */
--line-height-tight    /* 1.1 */
--line-height-snug     /* 1.25 */
--line-height-normal   /* 1.5 */
--line-height-relaxed  /* 1.625 */
--line-height-loose    /* 1.75 */
```

### Letter Spacing

```css
--letter-spacing-tighter  /* -0.03em */
--letter-spacing-tight    /* -0.02em */
--letter-spacing-normal   /* 0 */
--letter-spacing-wide     /* 0.025em */
--letter-spacing-wider    /* 0.05em */
--letter-spacing-widest   /* 0.1em */
```

### Typography Patterns

**Headings:**

```tsx
<h1 className="text-6xl font-bold leading-tight tracking-tight">
<h2 className="text-4xl font-semibold leading-snug">
<h3 className="text-2xl font-semibold leading-snug">
```

**Body Text:**

```tsx
<p className="text-base leading-relaxed">
<p className="text-lg leading-relaxed">  {/* Lead text */}
<p className="text-sm leading-normal">   {/* Small text */}
```

**Utility Text:**

```tsx
<span className="text-xs uppercase tracking-wider">LABEL</span>
<code className="text-sm font-medium">Code snippet</code>
```

## Border Radius

### Scale

```css
--radius-xs    /* 2px */
--radius-sm    /* 4px */
--radius-md    /* 6px - Default */
--radius-lg    /* 8px */
--radius-xl    /* 12px */
--radius-2xl   /* 16px */
--radius-3xl   /* 24px */
--radius-full  /* 9999px - Pill shape */
```

### Common Uses

- **Button**: `rounded-lg` (8px)
- **Input**: `rounded-md` (6px)
- **Card**: `rounded-xl` (12px)
- **Pill**: `rounded-full`

## Shadows

### Scale

```css
--shadow-xs   /* Subtle */
--shadow-sm   /* Small */
--shadow-md   /* Medium - Default */
--shadow-lg   /* Large */
--shadow-xl   /* Extra Large */
--shadow-2xl  /* Dramatic */
```

### Usage by Context

- **Card (rest)**: `shadow-md`
- **Card (hover)**: `shadow-lg`
- **Floating**: `shadow-xl`
- **Modal**: `shadow-2xl`

## Motion & Transitions

### Duration

```css
--duration-instant  /* 0ms */
--duration-fast     /* 100ms */
--duration-normal   /* 150ms - Default */
--duration-moderate /* 200ms */
--duration-slow     /* 250ms */
--duration-slower   /* 300ms */
--duration-slowest  /* 500ms */
```

### Easing

```css
--ease-linear   /* linear */
--ease-in       /* cubic-bezier(0.4, 0, 1, 1) */
--ease-out      /* cubic-bezier(0, 0, 0.2, 1) - Default */
--ease-in-out   /* cubic-bezier(0.4, 0, 0.2, 1) */
--ease-smooth   /* cubic-bezier(0.45, 0, 0.15, 1) */
```

### Common Patterns

```tsx
<button className="transition-colors duration-normal">
<div className="transition-all duration-moderate ease-smooth">
```

### Animations

```tsx
<div className="animate-fade-in">
<div className="animate-slide-in-up">
<div className="animate-scale-in">
```

## Responsive Design

### Breakpoints

```
xs:  360px  (Small mobile)
sm:  640px  (Mobile)
md:  768px  (Tablet)
lg:  1024px (Laptop)
xl:  1280px (Desktop)
2xl: 1536px (Large desktop)
```

### Mobile-First Approach

```tsx
<div className="text-sm md:text-base lg:text-lg">
<div className="p-4 md:p-6 lg:p-8">
```

### Container Queries

```tsx
<div className="@container">
  <div className="@md:flex @lg:grid">
    {/* Responds to container width, not viewport */}
  </div>
</div>
```

## Accessibility

### Interactive Targets

**Minimum touch target: 44x44px**

```tsx
<button className="min-h-[44px] min-w-[44px] p-3">
```

### Focus Indicators

```tsx
<button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-interactive-focus focus-visible:ring-offset-2">
```

### Reduced Motion

Automatically respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast

- **AA Standard**: 4.5:1 for text, 3:1 for UI components
- All semantic colors meet WCAG 2.2 AA requirements

## Component Tokens

### Button

```css
--button-height-xs  /* 24px */
--button-height-sm  /* 32px */
--button-height-md  /* 40px - Default */
--button-height-lg  /* 48px */

--button-padding-x-xs  /* 8px */
--button-padding-x-sm  /* 12px */
--button-padding-x-md  /* 16px - Default */
--button-padding-x-lg  /* 24px */

--button-radius        /* 8px */
```

### Input

```css
--input-height-sm      /* 32px */
--input-height-md      /* 40px - Default */
--input-height-lg      /* 48px */

--input-padding-x      /* 12px */
--input-border-width   /* 1px */
--input-radius         /* 6px */
```

### Card

```css
--card-padding         /* 24px - Default */
--card-padding-sm      /* 16px */
--card-padding-lg      /* 32px */

--card-radius          /* 12px */
--card-shadow          /* var(--shadow-md) */
--card-border-width    /* 1px */
```

### Layout

```css
--content-max-width        /* 1280px */
--content-max-width-narrow /* 768px */
--content-max-width-wide   /* 1536px */

--nav-height               /* 64px */
--nav-height-mobile        /* 56px */

--section-spacing-sm       /* 48px */
--section-spacing-md       /* 64px */
--section-spacing-lg       /* 96px */
--section-spacing-xl       /* 128px */
```

## Best Practices

### DO ✅

- Use semantic tokens (e.g., `bg-bg-canvas`, not `bg-neutral-50`)
- Respect the spacing scale (4px steps)
- Use fluid typography for better responsiveness
- Test with dark mode and high contrast
- Ensure 44px minimum touch targets on mobile
- Use `transition-colors` for simple state changes

### DON'T ❌

- Hardcode color values (e.g., `#ffffff`)
- Use arbitrary spacing values (e.g., `p-[17px]`)
- Skip accessibility considerations
- Use fixed font sizes (use fluid scale)
- Forget to test reduced motion

## Migration Guide

### From Hardcoded to Tokens

**Before:**

```tsx
<div className="bg-white text-gray-900 border-gray-300 rounded-lg p-6">
```

**After:**

```tsx
<div className="bg-bg-surface text-text-primary border-border-default rounded-xl p-6">
```

### From Fixed to Fluid Typography

**Before:**

```tsx
<h1 className="text-5xl md:text-6xl lg:text-7xl">
```

**After:**

```tsx
<h1 className="text-6xl"> {/* Automatically fluid */}
```

## Resources

- **Token Reference**: `src/styles/tokens.css`
- **Tailwind Config**: `tailwind.config.js`
- **Planning Doc**: `PLANNING.md`
- **Migration Guide**: `MIGRATION.md`

---

**Version**: 1.0.0  
**Last Updated**: November 6, 2025
