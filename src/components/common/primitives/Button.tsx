import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button size variants
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button emphasis variants (visual hierarchy)
 */
export type ButtonVariant = 
  | 'primary'    // High emphasis - main CTAs
  | 'secondary'  // Medium emphasis - secondary actions
  | 'ghost'      // Low emphasis - tertiary actions
  | 'outline'    // Medium emphasis - alternative style
  | 'danger'     // Destructive actions
  | 'success';   // Positive actions

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon before text */
  iconBefore?: ReactNode;
  /** Icon after text */
  iconAfter?: ReactNode;
  /** Icon-only button (no text) */
  iconOnly?: boolean;
  /** Children */
  children?: ReactNode;
}

/**
 * Size styles mapping
 */
const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-caption gap-1.5',
  sm: 'h-9 px-3.5 text-body-sm gap-2',
  md: 'h-11 px-5 text-body-md gap-2.5',
  lg: 'h-12 px-6 text-body-lg gap-3',
  xl: 'h-14 px-8 text-body-xl gap-3',
};

/**
 * Icon-only size styles
 */
const iconOnlySizeStyles: Record<ButtonSize, string> = {
  xs: 'w-7 h-7',
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
};

/**
 * Variant styles mapping using design tokens
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-brand text-white
    hover:bg-brand-hover active:bg-brand-active
    disabled:bg-neutral-200 disabled:text-neutral-400
    shadow-sm hover:shadow-md
    focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
  `,
  secondary: `
    bg-neutral-100 text-text-primary
    hover:bg-neutral-200 active:bg-neutral-300
    disabled:bg-neutral-50 disabled:text-neutral-300
    shadow-sm hover:shadow
    focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2
  `,
  ghost: `
    bg-transparent text-text-primary
    hover:bg-neutral-100 active:bg-neutral-200
    disabled:text-neutral-300
    focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2
  `,
  outline: `
    bg-transparent text-text-primary border-2 border-neutral-300
    hover:bg-neutral-50 hover:border-neutral-400
    active:bg-neutral-100 active:border-neutral-500
    disabled:border-neutral-200 disabled:text-neutral-300
    focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2
  `,
  danger: `
    bg-error text-white
    hover:bg-error-hover active:bg-error-active
    disabled:bg-error-subtle disabled:text-error-muted
    shadow-sm hover:shadow-md
    focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2
  `,
  success: `
    bg-success text-white
    hover:bg-success-hover active:bg-success-active
    disabled:bg-success-subtle disabled:text-success-muted
    shadow-sm hover:shadow-md
    focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2
  `,
};

/**
 * Button - Accessible, token-based button component
 * 
 * Features:
 * - 6 visual variants (primary, secondary, ghost, outline, danger, success)
 * - 5 size presets (xs, sm, md, lg, xl)
 * - Loading state with spinner
 * - Icon support (before/after/only)
 * - Full keyboard accessibility
 * - Design token integration
 * - Responsive touch targets
 * 
 * @example
 * ```tsx
 * // Primary CTA button
 * <Button variant="primary" size="lg">
 *   Get Started
 * </Button>
 * 
 * // Button with icon
 * <Button variant="secondary" iconAfter={<ArrowRight />}>
 *   Continue
 * </Button>
 * 
 * // Loading state
 * <Button variant="primary" loading disabled>
 *   Saving...
 * </Button>
 * 
 * // Icon-only button
 * <Button variant="ghost" iconOnly aria-label="Close">
 *   <X />
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      iconBefore,
      iconAfter,
      iconOnly = false,
      disabled,
      className = '',
      children,
      type = 'button',
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    const baseClasses = `
      inline-flex items-center justify-center
      font-satoshi font-semibold
      rounded-lg
      transition-all duration-200
      outline-none
      touch-manipulation
      select-none
      disabled:cursor-not-allowed
      disabled:opacity-60
    `;

    const classes = [
      baseClasses,
      iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
      variantStyles[variant],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={classes}
        {...props}
      >
        {loading && (
          <Loader2 className="animate-spin" size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />
        )}

        {!loading && iconBefore && <span className="flex-shrink-0">{iconBefore}</span>}
        
        {!iconOnly && children && <span>{children}</span>}
        
        {!loading && iconAfter && <span className="flex-shrink-0">{iconAfter}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
