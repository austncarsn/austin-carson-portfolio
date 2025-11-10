import React, { type ReactElement } from 'react';
import { NavLink } from './NavLink';

// Navigation item type
type NavItem = { 
  label: string; 
  href: string; 
  external?: boolean;
};

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  externalLinks: NavItem[];
  activeSection: string | null;
  // eslint-disable-next-line no-unused-vars
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onClose: () => void;
}

// Motion tokens for consistent animations
const MOTION = {
  scrim: {
    enter: 'animate-in fade-in duration-300 ease-out',
    exit: 'animate-out fade-out duration-200 ease-in'
  },
  menu: {
    enter: 'animate-in slide-in-from-right-4 duration-300 ease-out',
    exit: 'animate-out slide-out-to-right-4 duration-200 ease-in'
  }
};

/**
 * MobileMenu Component
 *
 * Full-screen overlay drawer for mobile navigation.
 * Features scrim backdrop, smooth slide transitions, and proper focus management.
 */
export function MobileMenu({
  isOpen,
  navItems,
  externalLinks,
  activeSection,
  onLinkClick,
  onClose
}: MobileMenuProps): ReactElement {
  if (!isOpen) return <></>;

  return (
    <>
      {/* Scrim Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${MOTION.scrim.enter}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel: full-screen overlay on small, right-docked on large */}
      <div
        className={`fixed inset-0 z-50 ${MOTION.menu.enter}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Panel container: full width on small, right-docked panel on large */}
        <div className="absolute inset-0 flex justify-end">
          <div className="h-full w-full lg:w-[420px] bg-canvas border-l border-structure/50 flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-structure/50">
              <h2 className="text-lg font-semibold text-text-primary">Menu</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-3 rounded-full text-text-primary bg-transparent hover:text-brand hover:bg-[var(--interactive-hover)]/12 hover:scale-105 transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
                aria-label="Close menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-2">
                {/* Primary Navigation */}
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const sectionId = item.href.replace('#', '');
                    const isActive = activeSection === sectionId;
                    return (
                      <NavLink
                        key={item.label}
                        href={item.href}
                        size="mobile"
                        isActive={isActive}
                        onClick={(e) => {
                          onLinkClick(e, item.href);
                          onClose();
                        }}
                      >
                        {item.label}
                      </NavLink>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-structure/50" />

                {/* Secondary Links */}
                <div className="space-y-1">
                  {externalLinks.map((item) => (
                    <NavLink
                      key={item.label}
                      href={item.href}
                      size="mobile"
                      isExternal={item.external}
                      onClick={() => onClose()}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-structure/50">
              <p className="text-xs text-text-muted">Austin Carson • Portfolio</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}