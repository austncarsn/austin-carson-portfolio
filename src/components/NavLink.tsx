import React, { type ReactElement } from 'react';

type NavLinkProps = {
  href: string;
  size?: 'mobile' | 'desktop';
  isActive?: boolean;
  isExternal?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
};
 

export function NavLink({
  href,
  size = 'desktop',
  isActive = false,
  isExternal = false,
  onClick,
  children
}: NavLinkProps): ReactElement {
  const baseClasses = "block px-4 py-3 rounded-lg transition-all duration-200";
  const activeClasses = isActive 
    ? "bg-token-accent text-on-accent font-medium" 
    : "text-token-primary hover:bg-token-surface-weak";
  const sizeClasses = size === 'mobile' 
    ? "text-lg" 
    : "text-base";

  return (
    <a
      href={href}
      className={`${baseClasses} ${activeClasses} ${sizeClasses}`}
      onClick={onClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
