import type { ReactElement, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

export type NavLinkVariant = 'primary' | 'secondary';
export type NavLinkSize = 'default' | 'mobile';

export interface NavLinkProps {
  href: string;
  children: string;
  size?: NavLinkSize;
  isActive?: boolean;
  isExternal?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

/**
 * NavLink Component - Navy + Mint theme
 * Uses role variables: --muted (default), --accent (active/hover)
 */
export function NavLink({
  href,
  children,
  size = 'default',
  isActive = false,
  isExternal = false,
  onClick,
  className = ''
}: NavLinkProps): ReactElement {
  
  const baseStyle = {
    color: isActive ? 'var(--accent)' : 'var(--muted)',
    transition: 'color 200ms ease-out'
  };

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.currentTarget.style.color = 'var(--accent)';
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.currentTarget.style.color = isActive ? 'var(--accent)' : 'var(--muted)';
  };

  const baseClasses = [
    'group/navlink relative inline-flex items-center justify-center',
    'font-semibold uppercase tracking-[0.12em]',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'transition-all duration-200 ease-out',
    'rounded-lg min-h-[44px] min-w-[44px]',
    size === 'mobile' ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-sm md:text-base',
    className
  ].filter(Boolean).join(' ');

  // Final link classes (keep simple and predictable).
  const linkClasses = baseClasses;

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
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-current={isActive ? 'location' : undefined}
    >
      {children}
    </Link>
  );
}