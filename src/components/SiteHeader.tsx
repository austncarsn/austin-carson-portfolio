import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import type { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useScrollDir } from '@/hooks/useScrollDir';
import { useCompactHeader } from '@/hooks/useCompactHeader';

type NavItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type CTA = {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
};

type Props = {
  brandTitle?: string;
  since?: string;
  items?: NavItem[];
  statusText?: string;
  statusIndicatorColor?: string;
  cta?: CTA;
  tickerText?: string;
  tickerRepeat?: number;
  tickerSpeedSec?: number;
  className?: string;
};

export const SiteHeader = memo(function SiteHeader({
  items = [
    { label: 'Index', href: '/' },
    { label: 'Work', href: '/#work' },
    { label: 'Contact', href: '/#contact' },
  ],
  tickerText = 'Available for projects',
  tickerRepeat = 8,
  tickerSpeedSec = 25,
  className = '',
}: Props): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dir = useScrollDir();
  const compact = useCompactHeader(80);

  const tokens = useMemo(
    () => ({
      bg: 'var(--accent)',
      border: 'color-mix(in oklab, var(--accent) 18%, transparent)',
      textMuted: 'rgba(255,255,255,0.75)',
      textPrimary: 'white',
      accent: 'var(--accent)',
    }),
    []
  );

  useEffect(() => {
    let foundIndex = 0;
    for (let i = 0; i < items.length; i++) {
      const route = items[i].href;
      if (!route) continue;
      if (route.includes('/#')) {
        const [path, hash] = route.split('/#');
        if (
          (pathname === '/' || pathname === path) &&
          window.location.hash === `#${hash}`
        ) {
          foundIndex = i;
          break;
        }
      } else if (pathname === route || pathname.startsWith(route + '/')) {
        foundIndex = i;
        break;
      }
    }
    setActiveIndex(foundIndex);
  }, [pathname, items]);

  const handleNavClick = useCallback(
    (index: number, href?: string): void => {
      setActiveIndex(index);
      if (!href) return;
      if (href.includes('/#')) {
        const [path, hash] = href.split('/#');
        if (pathname !== path && path) navigate(path);
        setTimeout(
          () => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }),
          100
        );
      } else if (href.startsWith('#')) {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    },
    [navigate, pathname]
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-transform duration-300 ${dir === 'down' ? '-translate-y-6 md:-translate-y-8' : 'translate-y-0'} ${compact ? 'header--translucent' : ''} ${className}`}
      style={{
        backgroundColor: tokens.bg,
        borderColor: tokens.border,
        transitionProperty: 'background-color, transform, backdrop-filter',
      }}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-lg focus:font-medium"
        style={{
          backgroundColor: tokens.bg,
          color: tokens.textPrimary,
          outline: `2px solid ${tokens.accent}`,
        }}
      >
        Skip to main content
      </a>
      <div
        className={`${compact ? 'py-3' : 'py-4 md:py-6'} px-4 md:px-8 lg:px-12 transition-[padding] duration-300`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <nav className="navbar-nav" aria-label="Primary navigation">
            {items.map((item, index) => (
              <button
                key={item.href || item.label}
                onClick={() => {
                  handleNavClick(index, item.href);
                  item.onClick?.();
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`nav-item ${activeIndex === index ? 'active' : ''}`}
                aria-current={activeIndex === index ? 'page' : undefined}
              >
                <span
                  className={`${compact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl lg:text-3xl'} font-medium`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
          {/* simple CTA / brand area (keeps header balanced) */}
          <div className="hidden md:block">
            {/** preserve space for possible CTA or logo; intentionally small to avoid layout shifts */}
            <a
              href="#contact"
              className="inline-block text-sm font-medium"
              style={{ color: tokens.textMuted }}
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
      <div
        className={`overflow-hidden border-t ${compact ? 'py-2' : 'py-2.5 md:py-3'} relative`}
        style={{ borderColor: tokens.border }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, ${tokens.bg} 0%, transparent 100%)`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none z-10"
          style={{
            background: `linear-gradient(270deg, ${tokens.bg} 0%, transparent 100%)`,
          }}
        />
        <div className="navbar-ticker" aria-hidden="true">
          <div
            className="ticker-track"
            style={{ animationDuration: `${tickerSpeedSec}s` }}
          >
            {Array.from({ length: tickerRepeat }).map((_, i) => (
              <span
                key={i}
                className={`${compact ? 'text-[10px]' : 'text-xs'} tracking-wider uppercase`}
                style={{ color: tokens.textMuted, opacity: 0.45 }}
              >
                {tickerText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
});
