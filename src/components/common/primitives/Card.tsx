import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Card visual variants
 */
export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost';

/**
 * Card padding sizes
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Interactive hover state */
  interactive?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Padding styles mapping
 */
const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

/**
 * Variant styles mapping using design tokens
 */
const variantStyles: Record<CardVariant, string> = {
  elevated: `
    bg-surface
    border border-neutral-200
    shadow-md hover:shadow-lg
  `,
  outlined: `
    bg-surface
    border-2 border-neutral-300
    hover:border-neutral-400
  `,
  filled: `
    bg-surface
    border border-neutral-200
  `,
  ghost: `
    bg-transparent
    hover:bg-neutral-50
  `,
};

/**
 * Card - Flexible container component
 *
 * Features:
 * - 4 visual variants (elevated, outlined, filled, ghost)
 * - 5 padding sizes (none, sm, md, lg, xl)
 * - Optional interactive hover states
 * - Disabled state support
 * - Design token integration
 * - Semantic sub-components (Header, Title, Description, Content, Footer)
 *
 * @example
 * ```tsx
 * // Elevated card with content
 * <Card variant="elevated" padding="lg">
 *   <CardHeader>
 *     <CardTitle>Project Title</CardTitle>
 *     <CardDescription>Brief description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Main content here
 *   </CardContent>
 *   <CardFooter>
 *     <Button>View Details</Button>
 *   </CardFooter>
 * </Card>
 *
 * // Interactive card
 * <Card variant="outlined" interactive>
 *   Clickable card content
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
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
  const baseClasses = `
      rounded-xl
      transition-all duration-200
      overflow-hidden
    `;

  const interactiveClasses =
    interactive && !disabled
      ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
      : '';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

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
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * CardHeader - Header section for cards
 */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className = '', children, ...props }, ref) {
    return (
      <div ref={ref} className={`mb-4 ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Semantic heading for card headers
 */
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function CardTitle({ className = '', children, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={`font-satoshi font-bold text-h4 text-text-primary mb-1 ${className}`.trim()}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Semantic description for card headers
 */
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className = '', children, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={`font-satoshi text-body-sm text-text-secondary ${className}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area of card
 */
export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className = '', children, ...props }, ref) {
    return (
      <div ref={ref} className={`${className}`.trim()} {...props}>
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
