import { useState, useEffect, useRef, type ReactElement } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * PRODUCTION-READY NAVIGATION COMPONENT
 *
 * Architecture:
 * Level 1: Nav Shell (outer white capsule)
 * Level 2: Inner Rail (full-width off-white pill)
 * Level 3: Starfield Track (right-aligned dark pill) + Nav Buttons (floating keys)
 *
 * Design System: Color & Effect Tokens for Engineering Handoff
 *
 * IMPORTANT: Add these CSS animations to your globals.css:
 *
 * @keyframes twinkle-far {
 *   0%, 100% { opacity: 0.15; }
 *   50% { opacity: 0.3; }
 * }
 *
 * @keyframes twinkle-near {
 *   0%, 100% { opacity: 0.6; }
 *   50% { opacity: 0.9; }
 * }
 *
 * .animate-twinkle-far {
 *   animation: twinkle-far 6s ease-in-out infinite;
 * }
 *
 * .animate-twinkle-near {
 *   animation: twinkle-near 4s ease-in-out infinite;
 * }
 */

// Production Design Tokens: use CSS variables from `src/styles/tokens.css`.

export function SiteHeader(): ReactElement {
  const [activeLink, setActiveLink] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // hover state previously used to animate pill hover background
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const pillTrackRef = useRef<HTMLDivElement | null>(null);
  // indicator state is set indirectly by CSS variables on the `pillTrackRef`

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevFocus = document.activeElement as HTMLElement | null;
    const toggleButton = toggleButtonRef.current;
    const root = mobileMenuRef.current;
    if (!root) return;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'a, button, input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));

    const focusables = getFocusable();
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (first) first.focus();

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        // prefer to return focus to the menu toggle; fall back to previous
        // focus if toggle isn't available (or if explicit focus was elsewhere)
        (toggleButton ?? prevFocus)?.focus();
      }
      if (e.key === 'Tab') {
        if (!first || !last) return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      (toggleButton ?? prevFocus)?.focus();
    };
  }, [mobileMenuOpen]);

  // nav pill indicator: measure the active pill and set CSS variables on the track
  useEffect(() => {
    const track = pillTrackRef.current;
    if (!track) return;

    const measure = (): void => {
      const active = track.querySelector<HTMLElement>('[aria-current="page"]');
      if (!active) {
        track.style.removeProperty('--nav-ind-left');
        track.style.removeProperty('--nav-ind-width');
        return;
      }

      const a = active.getBoundingClientRect();
      const c = track.getBoundingClientRect();
      track.style.setProperty('--nav-ind-left', `${a.left - c.left}px`);
      track.style.setProperty('--nav-ind-width', `${a.width}px`);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeLink]);

  // hover indicator: measure hovered or focused pill and set CSS variables
  const setHoverIndicator = (el: HTMLElement | null): void => {
    const track = pillTrackRef.current;
    if (!track) return;

    if (!el) {
      track.style.removeProperty('--nav-ind-hover-left');
      track.style.removeProperty('--nav-ind-hover-width');
      track.style.setProperty('--nav-ind-hover-visible', '0');
      return;
    }

    const a = el.getBoundingClientRect();
    const c = track.getBoundingClientRect();
    track.style.setProperty('--nav-ind-hover-left', `${a.left - c.left}px`);
    track.style.setProperty('--nav-ind-hover-width', `${a.width}px`);
    track.style.setProperty('--nav-ind-hover-visible', '1');
  };

  const navLinks: { id: string; label: string; href?: string }[] = [
    { id: 'home', label: 'HOME', href: '#home' },
    { id: 'work', label: 'PROJECTS', href: '#work' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
    { id: 'resume', label: 'RESUME', href: '/resume' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        role="navigation"
        aria-label="Primary navigation"
      >
        <div className="relative w-[900px] h-[76px]">
          {/* Outer Shell */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'var(--color-bg-elevated)',
              boxShadow: 'var(--shadow-1)',
            }}
          />

          {/* Inner Rail */}
          <div
            className="absolute rounded-full"
            style={{
              inset: 'var(--space-3)',
              background: 'var(--color-bg-elevated)',
              boxShadow:
                '0 0 0 1px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Logo (brand pill) */}
            <a
              href="/"
              aria-label="Home"
              className="nav-brand-pill absolute inset-y-0 left-6 flex items-center z-10"
              style={{ fontWeight: 500 }}
            >
              YOUR LOGO
            </a>

            {/* Starfield Track */}
            <div
              className="absolute top-0 bottom-0 rounded-full overflow-hidden"
              style={{
                left: 'var(--nav-track-start)',
                right: 0,
                background: 'var(--nav-track-bg)',
              }}
            >
              {/* Stars (simplified - add more for full effect) */}
              <div className="absolute inset-0" aria-hidden="true">
                <div
                  className="absolute w-[0.8px] h-[0.8px] rounded-full animate-twinkle-far"
                  style={{
                    top: '15%',
                    left: '8%',
                    background: 'var(--nav-star-far)',
                  }}
                />
                <div
                  className="absolute w-[1.5px] h-[1.5px] rounded-full animate-twinkle-near"
                  style={{
                    top: '38%',
                    left: '20%',
                    background: 'var(--nav-star-near)',
                    boxShadow: '0 0 2px var(--nav-star-near)',
                  }}
                />
                {/* Add more stars as needed */}
              </div>
            </div>

            {/* Navigation Pills */}
            <div
              className="absolute inset-y-0 flex items-center z-10"
              style={{
                right: 'var(--nav-button-margin-right)',
                gap: 'var(--nav-button-gap)',
              }}
            >
              <div className="nav-pills-container">
                <div ref={pillTrackRef} className="nav-pill-track">
                  <span className="nav-pill-indicator" aria-hidden="true" />
                  <span className="nav-pill-hover-indicator" aria-hidden="true" />
                  <ul role="list" className="flex items-center gap-2 md:gap-3">
                    {navLinks.map((link) => (
                      <li role="listitem" key={link.id}>
                        <a
                          className="nav-pill-item"
                          href={link.href ?? `#${link.id}`}
                          onClick={() => setActiveLink(link.id)}
                          onMouseEnter={(e) =>
                            setHoverIndicator(e.currentTarget as HTMLElement)
                          }
                          onMouseLeave={() => setHoverIndicator(null)}
                          onFocus={(e) =>
                            setHoverIndicator(e.currentTarget as HTMLElement)
                          }
                          onBlur={() => setHoverIndicator(null)}
                          aria-current={activeLink === link.id ? 'page' : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        role="navigation"
        aria-label="Primary mobile"
      >
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--color-bg-elevated)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="flex items-center justify-between px-5 sm:px-6 py-4">
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              YOUR LOGO
            </span>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-list"
              style={{
                background: mobileMenuOpen
                  ? 'var(--color-brand-700)'
                  : 'var(--color-brand-900)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              ref={toggleButtonRef}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-5 h-5" style={{ color: 'var(--color-text-inverse)' }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-5 h-5" style={{ color: 'var(--color-text-inverse)' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ background: 'var(--color-bg-elevated)' }}
              className="border-t p-5"
              id="mobile-navigation-list"
              ref={mobileMenuRef}
            >
              <ul role="list" className="space-y-2">
                {navLinks.map((link) => (
                  <li role="listitem" key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => {
                        setActiveLink(link.id);
                        setMobileMenuOpen(false);
                      }}
                      onFocus={(e) => setHoverIndicator(e.currentTarget as HTMLElement)}
                      onBlur={() => setHoverIndicator(null)}
                      className="block w-full text-left px-5 py-4 rounded-xl mb-2"
                      style={{
                        background:
                          activeLink === link.id
                            ? 'var(--color-brand-900)'
                            : 'rgba(0, 0, 0, 0.03)',
                        color:
                          activeLink === link.id
                            ? 'var(--color-text-inverse)'
                            : 'var(--color-text-primary)',
                        fontWeight: activeLink === link.id ? 600 : 500,
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default SiteHeader;
