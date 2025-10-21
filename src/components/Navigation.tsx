import type { MouseEvent, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import squirrelLogo from '@/assets/race_car.svg';

// ---------------- Types
export type NavItem = { label: string; href: string; external?: boolean };
export type NavigationState = { scrollTo?: string } | null;

// ---------------- Constants
const SCROLL_STORAGE_KEY = 'navigation:pending-scroll-target';
const SECTION_IDS = ['work', 'contact'];

const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const externalLinks: NavItem[] = [
  { label: 'GitHub', href: 'https://github.com/austncarsn', external: true },
];

// ---------------- Utils
const scrollToSection = (sectionId: string, prefersReducedMotion: boolean): void => {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
  element.scrollIntoView({ behavior, block: 'start' });
};

/**
 * Site Navigation — editorial layout
 * Grid: [ left links | centered home logo | right links ]
 * - Sticky with paper bg and subtle underline hovers
 * - Maintains your in-page scroll + session handoff
 */
export default function Navigation(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { pathname } = location;
  const navigationState = location.state as NavigationState;
  const scrollTargetFromState = navigationState?.scrollTo;
  const isHomePage = pathname === '/';

  // Observe sections to reflect active state
  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { threshold: 0.5 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // Honor pending scroll target from router state / session
  useEffect(() => {
    if (!isHomePage) return;

    const pendingTarget = scrollTargetFromState ?? sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (!pendingTarget) return;

    const timer = window.setTimeout(() => {
      scrollToSection(pendingTarget, prefersReducedMotion);
      setActiveSection(pendingTarget);
      sessionStorage.removeItem(SCROLL_STORAGE_KEY);
      navigate(pathname, { replace: true, state: null });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [isHomePage, navigate, pathname, prefersReducedMotion, scrollTargetFromState]);

  const handleSectionClick = (e: MouseEvent<HTMLAnchorElement>, href: string): void => {
    const sectionId = href.replace('#', '');
    e.preventDefault();

    // Close mobile menu if open
    setMobileMenuOpen(false);

    if (isHomePage) {
      scrollToSection(sectionId, prefersReducedMotion);
      setActiveSection(sectionId);
      return;
    }

    sessionStorage.setItem(SCROLL_STORAGE_KEY, sectionId);
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full bg-paper/95 backdrop-blur-lg border-b border-structure/50"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 xl:px-12">
          {/* Desktop & Tablet Layout: Logo centered | Links balanced */}
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Left Section: Primary Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.slice(0, 1).map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    variant="primary"
                    isActive={isActive}
                    onClick={(e) => handleSectionClick(e, item.href)}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Center: Logo */}
            <Link
              to="/"
              aria-current={isHomePage ? 'page' : undefined}
              className="flex items-center justify-center p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 transition-all duration-200 hover:opacity-80 active:scale-95 min-h-[44px] min-w-[44px]"
              aria-label="Return to homepage"
            >
              <img
                src={squirrelLogo}
                alt="Austin Carson Logo"
                className="h-8 md:h-9 lg:h-10 w-auto transition-transform duration-200 ease-out hover:scale-105"
              />
            </Link>

            {/* Right Section: Secondary Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.slice(1).map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    variant="primary"
                    isActive={isActive}
                    onClick={(e) => handleSectionClick(e, item.href)}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
              {/* Separator */}
              <div className="hidden lg:block w-px h-6 bg-structure/50" />
              {externalLinks.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  variant="secondary"
                  isExternal={item.external}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center p-2.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 min-h-[44px] min-w-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        navItems={navItems}
        externalLinks={externalLinks}
        activeSection={activeSection}
        onLinkClick={handleSectionClick}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
