import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Item = { label: string; href: string; external?: boolean };

const ITEMS: Item[] = [
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
  { label: 'GITHUB ↗', href: 'https://github.com/austncarsn', external: true },
  { label: 'RESUME', href: '/resume' },
];

const SCROLL_STORAGE_KEY = 'navigation:pending-scroll-target';

function useRect(el: HTMLElement | null) {
  const [r, setR] = useState<DOMRect | null>(null);
  useEffect(() => {
    if (!el) return;
    const ro = new ResizeObserver(() => setR(el.getBoundingClientRect()));
    ro.observe(el);
    setR(el.getBoundingClientRect());
    return () => ro.disconnect();
  }, [el]);
  return r;
}

/**
 * AstralNav — Celestial instrument panel navigation
 * 
 * Z-order architecture:
 * - Cosmic field (z-0, back plane with starfield and nebula gradients)
 * - Constellation connector (z-10, middle layer, animated light beam to active button)
 * - Nav surface + orbital capsule buttons (z-20/z-30, floating glass elements)
 */
export default function BarcodeNav() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRect = useRect(headerRef.current);
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { pathname } = location;
  const isHomePage = pathname === '/';

  // Track which item is active (hover/focus). -1 = idle
  const [active, setActive] = useState<number>(-1);
  const [yDown, setYDown] = useState<number>(84);

  // refs for each button to compute centers
  const buttonsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const centers = useMemo(() => {
    if (!headerRect) return [];
    return buttonsRef.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left - headerRect.left + r.width / 2;
    });
  }, [headerRect, buttonsRef.current, active]);

  useEffect(() => {
    // Connector stops at button midline
    if (!buttonsRef.current[active] || !headerRef.current) return;
    const btnRect = buttonsRef.current[active]!.getBoundingClientRect();
    const headerTop = headerRef.current.getBoundingClientRect().top;
    const toY = btnRect.top - headerTop + btnRect.height / 2;
    setYDown(Math.max(84, toY));
  }, [active, headerRect]);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
    element.scrollIntoView({ behavior, block: 'start' });
  };

  const handleSectionClick = (e: MouseEvent<HTMLAnchorElement>, href: string): void => {
    const sectionId = href.replace('#', '');
    e.preventDefault();

    if (isHomePage) {
      scrollToSection(sectionId);
      return;
    }

    sessionStorage.setItem(SCROLL_STORAGE_KEY, sectionId);
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <header ref={headerRef} className="relative" role="banner">
      {/* BACK: Elegant starry night */}
      <div className="relative h-[var(--nav-h)] bg-gradient-to-b from-[#0d0d1a] via-[#111122] to-[#0a0a14] overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full z-0"
          viewBox="0 0 1200 84"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Starfield */}
          <Starfield />
        </svg>
      </div>

      {/* FRONT: Minimal nav surface */}
      <div className="relative z-20 bg-gradient-to-b from-[#0a0a14]/95 to-[#08081a]/95 backdrop-blur-sm border-b border-white/[0.03]">
        <nav
          ref={navRef}
          className="mx-auto max-w-6xl grid h-[64px] grid-cols-4 place-items-center gap-8
                     md:grid-cols-4 sm:grid-cols-2"
          onMouseLeave={() => setActive(-1)}
          role="navigation"
        >
          {ITEMS.map((it, i) => {
            const isActive = it.href === '/' ? pathname === '/' : pathname.startsWith(it.href);

            const className = `
              key relative z-30 inline-flex items-center justify-center
              px-4 py-2
              text-[13px] tracking-[.2em] font-medium 
              transition-all duration-300 ease-out
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
              ${isActive 
                ? 'text-white' 
                : 'text-white/60 hover:text-white/95'
              }
            `.trim();

            return it.external ? (
              <a
                key={it.label}
                ref={(n) => (buttonsRef.current[i] = n)}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className={className}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(-1)}
                onKeyDown={(e) => e.key === 'Escape' && (e.currentTarget as HTMLElement).blur()}
                aria-label={it.label.replace(' ↗', '')}
              >
                {it.label}
              </a>
            ) : it.href.startsWith('#') ? (
              <a
                key={it.label}
                ref={(n) => (buttonsRef.current[i] = n)}
                href={it.href}
                className={className}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(-1)}
                onKeyDown={(e) => e.key === 'Escape' && (e.currentTarget as HTMLElement).blur()}
                onClick={(e) => handleSectionClick(e, it.href)}
                aria-label={it.label}
              >
                {it.label}
              </a>
            ) : (
              <Link
                key={it.label}
                ref={(n) => (buttonsRef.current[i] = n)}
                to={it.href}
                className={className}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(-1)}
                onKeyDown={(e) => e.key === 'Escape' && (e.currentTarget as HTMLElement).blur()}
                aria-label={it.label}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

/* ---------- SVG parts ---------- */

// Starfield - elegant scattered stars
function Starfield() {
  const stars: { x: number; y: number; r: number; opacity: number; delay: number }[] = [];
  
  // Fewer, more refined stars for elegant look
  for (let i = 0; i < 45; i++) {
    stars.push({
      x: Math.random() * 1200,
      y: Math.random() * 84,
      r: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 5,
    });
  }
  
  return (
    <g>
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="white"
          opacity={star.opacity}
          filter="url(#glow)"
          style={{
            animation: `star-twinkle ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </g>
  );
}
