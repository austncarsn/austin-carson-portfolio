import type { ReactElement, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

export type NavLinkVariant = 'primary' | 'secondary';
export type NavLinkSize = 'default' | 'mobile';

export interface NavLinkProps {
  href: string;
  children: string;
  variant?: NavLinkVariant;
  size?: NavLinkSize;
  isActive?: boolean;
  isExternal?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

// Design tokens for consistent spacing and motion
const SPACING = {
  padding: {
    default: 'px-3 py-2',
    mobile: 'px-4 py-3'
  },
  minSize: 'min-h-[44px] min-w-[44px]'
};

const MOTION = {
  duration: 'duration-200',
  easing: 'ease-out',
  hover: 'hover:scale-[1.02] active:scale-[0.98]'
};

// Base styles shared across variants
const baseClasses = [
  'group/navlink relative inline-flex items-center justify-center',
  'font-semibold uppercase tracking-[0.12em]',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2',
  'transition-all duration-200 ease-out',
  'rounded-lg', // Consistent corner radius
  SPACING.minSize
].join(' ');

// Typography scales
const typography = {
  default: "font-satoshi text-[13px] md:text-[14px]",
  mobile: "font-satoshi text-sm"
};

// Color schemes for different states
const colorSchemes = {
  primary: {
    base: 'text-text-muted hover:text-brand focus:text-brand',
    active: 'text-brand',
    pressed: 'text-brand/80'
  },
  secondary: {
    base: 'text-text-muted hover:text-brand focus:text-brand',
    active: 'text-brand',
    pressed: 'text-brand/80'
  }
};

// Underline animation for primary links
const underlineStyles = [
  "after:absolute after:left-3 after:right-3 after:-bottom-0.5",
  "after:h-[2px] after:bg-brand after:origin-left after:scale-x-0",
  "group-hover/navlink:after:scale-x-100 group-focus/navlink:after:scale-x-100",
  "after:transition-transform after:duration-200 after:ease-out"
].join(' ');

/**
 * NavLink Component
 *
 * Reusable navigation link with consistent states and variants.
 * Supports hover, focus, active, and pressed states with smooth transitions.
 */
export function NavLink({
  href,
  children,
  variant = 'primary',
  size = 'default',
  isActive = false,
  isExternal = false,
  onClick,
  className = ''
}: NavLinkProps): ReactElement {
  const colors = colorSchemes[variant];
  const padding = SPACING.padding[size];
  const fontSize = typography[size];

  // Build state-based classes
  const stateClasses = isActive
    ? `${colors.active} ${variant === 'primary' ? 'after:scale-x-100' : ''}`
    : colors.base;

  // Combine all classes
  const linkClasses = [
    baseClasses,
    fontSize,
    stateClasses,
    padding,
    variant === 'primary' ? underlineStyles : '',
    MOTION.hover,
    className
  ].filter(Boolean).join(' ');

  // External link attributes
  const externalProps = isExternal ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  // Use React Router Link for internal navigation, regular anchor for external
  if (isExternal) {
    return (
      <a
        href={href}
        className={linkClasses}
        onClick={onClick}
        aria-current={isActive ? 'location' : undefined}
        {...externalProps}
      >
        {children}
        {isExternal && <span className="ml-2 text-xs opacity-60">↗</span>}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={linkClasses}
      onClick={onClick}
      aria-current={isActive ? 'location' : undefined}
    >
      {children}
    </Link>
  );
}