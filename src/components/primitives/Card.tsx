import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Card variants (visual hierarchy)
 */
export type CardVariant = 
  | 'elevated'   // Floating card with shadow
  | 'outlined'   // Card with border
  | 'filled'     // Subtle background fill
  | 'ghost';     // Minimal styling

/**
 * Card padding sizes
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Interactive card (adds hover state) */
  interactive?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Children */
  children: ReactNode;
}

/**
 * Padding styles mapping
 */
const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-10',
};

/**
 * Variant styles mapping using design tokens
 */
const variantStyles: Record<CardVariant, string> = {
  elevated: `
    bg-bg-surface
    shadow-md hover:shadow-lg
    border border-border-subtle
  `,
  outlined: `
    bg-bg-canvas
    border-2 border-border-default
  `,
  filled: `
    bg-bg-subtle
    border border-border-subtle
  `,
  ghost: `
    bg-transparent
  `,
};

/**
 * Card - Flexible container component with design token integration
 * 
 * Features:
 * - 4 visual variants (elevated, outlined, filled, ghost)
 * - 5 padding presets (none, sm, md, lg, xl)
 * - Interactive state for clickable cards
 * - Disabled state support
 * - Design token integration
 * - Responsive padding
 * 
 * @example
 * ```tsx
 * // Elevated card with medium padding
 * <Card variant="elevated" padding="md">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * // Interactive card with hover effect
 * <Card variant="elevated" interactive onClick={handleClick}>
 *   <h3>Clickable Card</h3>
 * </Card>
 * 
 * // Outlined card with large padding
 * <Card variant="outlined" padding="lg">
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      variant = 'elevated',
      padding = 'md',
      interactive = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) {
    // Base classes
    const baseClasses = `
      rounded-xl
      transition-all duration-200
    `;

    // Interactive classes
    const interactiveClasses = interactive
      ? `
        cursor-pointer
        hover:scale-[1.02]
        active:scale-[0.98]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand
        focus-visible:ring-offset-2
      `
      : '';

    // Disabled classes
    const disabledClasses = disabled
      ? `
        opacity-60
        cursor-not-allowed
        pointer-events-none
      `
      : '';

    // Combine all classes
    const classes = [
      baseClasses,
      paddingStyles[padding],
      variantStyles[variant],
      interactiveClasses,
      disabledClasses,
      className,
    ]
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    return (
      <div
        ref={ref}
        className={classes}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader - Semantic header section for cards
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className = '', children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`mb-4 ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Semantic title for card headers
 */
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className = '', children, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={`font-satoshi font-bold text-h4 text-text-primary mb-2 ${className}`.trim()}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Semantic description for card headers
 */
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className = '', children, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={`font-satoshi text-body-sm text-text-secondary ${className}`.trim()}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area of card
 */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className = '', children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Footer section for cards
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className = '', children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`mt-6 flex items-center gap-3 ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
