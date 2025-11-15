import React, { type ReactElement } from 'react';

type NavLinkSize = 'mobile' | 'desktop';

type NavLinkProps = {
  href: string;
  size?: NavLinkSize;
  isActive?: boolean;
  isExternal?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
};

const SIZE_CLASSES: Record<NavLinkSize, string> = {
  mobile: 'text-lg',
  desktop: 'text-base',
};

const getStateClasses = (isActive: boolean): string => {
  if (isActive) {
    // active links use gradient text fill (bg-clip + transparent text)
    return 'font-medium';
  }
  return 'text-text hover:bg-surface-hover';
};

export function NavLink({
  href,
  size = 'desktop',
  isActive = false,
  isExternal = false,
  onClick,
  children,
}: NavLinkProps): ReactElement {
  const baseClasses = 'block px-4 py-3 rounded-lg transition-all duration-200';
  const stateClasses = getStateClasses(isActive);
  const sizeClasses = SIZE_CLASSES[size];

  return (
    <a
      href={href}
      className={`${baseClasses} ${stateClasses} ${sizeClasses} ${
        isActive ? 'navlink--active-gradient' : ''
      }`}
      onClick={onClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
