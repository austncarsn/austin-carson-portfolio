import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NeumorphicPillNav } from './NeumorphicPillNav';

/**
 * Site Navigation — Neumorphic pill navigation with cream + navy palette
 * Optimized for both mobile and desktop with smooth animations
 */
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Handle scroll effect for nav bar
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      role="banner"
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled
          ? 'bg-[color:var(--neu-bg)]/88 backdrop-blur-xl border-b border-black/5'
          : 'bg-[color:var(--neu-bg)]/65 backdrop-blur-md',
      ].join(' ')}
      style={{ color: 'var(--neu-ink)' }}
    >
      <nav
        role="navigation"
        aria-label="Main"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      >
        <div className="flex items-center justify-between gap-6">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2"
            style={{ '--tw-ring-color': 'var(--neu-ring)' } as React.CSSProperties}
            aria-label="Home"
          >
            <div className="relative">
              <div
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl grid place-items-center font-bold text-xl tracking-tight"
                style={{
                  background: 'linear-gradient(145deg, #FFFFFF 0%, var(--neu-bg) 100%)',
                  boxShadow: '8px 8px 18px var(--neu-shadow-dark), -8px -8px 18px var(--neu-shadow-light)',
                  color: 'var(--neu-ink)',
                  fontWeight: 750,
                  letterSpacing: '-0.01em',
                }}
              >
                AC
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NeumorphicPillNav className="hidden md:inline-flex" />

          {/* Mobile Navigation */}
          <NeumorphicPillNav className="md:hidden" />
        </div>
      </nav>
    </header>
  );
}
