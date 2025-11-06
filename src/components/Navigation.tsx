import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Site Navigation — Clean, professional, responsive navigation bar
 * Optimized for both mobile and desktop with smooth animations
 */
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Handle scroll effect for nav bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-in-out
        ${isScrolled 
          ? 'bg-zinc-900/98 backdrop-blur-xl shadow-2xl border-b border-white/5' 
          : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent backdrop-blur-sm'
        }
      `}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo / Brand - Responsive sizing */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 sm:gap-3 lg:gap-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-xl p-1.5 sm:p-2 -m-1.5 sm:-m-2 transition-all duration-300"
          aria-label="Home"
        >
          <div className="relative">
            {/* Glow effect - subtle on mobile, more prominent on desktop */}
            <div className="absolute inset-0 bg-emerald-500/15 sm:bg-emerald-500/20 blur-xl sm:blur-2xl group-hover:bg-emerald-500/25 sm:group-hover:bg-emerald-500/30 transition-all duration-300" />
            
            {/* Logo badge - responsive sizing */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 sm:shadow-emerald-500/25 group-hover:shadow-emerald-500/35 sm:group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105 active:scale-95">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                AC
              </span>
            </div>
          </div>
        </Link>
      </nav>
    </header>
  );
}
