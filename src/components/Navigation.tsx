import type { MouseEvent, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import squirrelLogo from '@/assets/squirrel_logo.svg';

// ---------------- Types
export type NavItem = { label: string; href: string; external?: boolean };
export type NavigationState = { scrollTo?: string } | null;

// ---------------- Constants
const SCROLL_STORAGE_KEY = 'navigation:pending-scroll-target';
const SECTION_IDS = ['work', 'contact'];

// Elegant, editorial link style with underline reveal - enhanced for usability
const linkClasses = [
  "group/link relative",
  "font-['Satoshi'] font-semibold uppercase tracking-[0.12em]",
  "text-[13px] md:text-[14px]",
  "text-text-muted hover:text-brand focus:text-brand",
  "focus:outline-none transition-all duration-200 ease-out",
  "px-3 py-2",
  "min-h-[44px] inline-flex items-center",
  // underline
  "after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:bg-brand",
  "after:origin-left after:scale-x-0 group-hover/link:after:scale-x-100 hover:after:scale-x-100",
  "after:transition-transform after:duration-200 after:ease-out",
].join(' ');

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
    <nav className="sticky top-0 z-50 w-full bg-paper/95 backdrop-blur-lg border-b border-structure/50" aria-label="Main navigation">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16 xl:px-24">
        {/* Flex layout: logo left | links right */}
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Left: Logo */}
          <Link
            to="/"
            aria-current={isHomePage ? 'page' : undefined}
            className="inline-flex items-center justify-center p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 transition-all duration-200 hover:opacity-80 active:scale-95"
            aria-label="Return to homepage"
          >
            <img 
              src={squirrelLogo} 
              alt="Austin Carson Logo" 
              className="h-8 md:h-9 w-auto transition-transform duration-200 ease-out hover:scale-105" 
            />
          </Link>

          {/* Right: Navigation Links */}
          <div className="flex items-center gap-8 md:gap-10 lg:gap-12">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={linkClasses + (isActive ? ' text-brand after:scale-x-100' : '')}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleSectionClick(e, item.href)}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="hidden md:block w-px h-6 bg-structure/50" />
            {externalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden justify-self-end p-2.5 rounded-lg text-text-muted hover:text-brand hover:bg-surface/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 min-h-[44px] min-w-[44px]"
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

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-structure/50">
            <div className="py-4 space-y-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`block px-4 py-3 text-sm font-['Satoshi'] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 rounded-lg ${
                      isActive
                        ? 'text-brand bg-surface'
                        : 'text-text-muted hover:text-brand hover:bg-surface/50'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => handleSectionClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-3 mt-3 border-t border-structure/50">
                {externalLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-sm font-['Satoshi'] font-semibold uppercase tracking-[0.12em] text-text-muted hover:text-brand hover:bg-surface/50 transition-colors duration-200 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                    <span className="ml-2 text-xs opacity-60">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
