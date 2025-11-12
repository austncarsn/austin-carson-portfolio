import React from "react";
import type { JSX } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useScrollDir } from "@/hooks/useScrollDir";
import { useCompactHeader } from "@/hooks/useCompactHeader";

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

export function SiteHeader({
  items = [
    { label: "Index", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "Contact", href: "/#contact" }
  ],
  tickerText = "Available for projects",
  tickerRepeat = 8,
  tickerSpeedSec = 25,
  className = "",
}: Props): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dir = useScrollDir();
  const compact = useCompactHeader(80);

  const tokens = {
    bg: "var(--bg)",
    border: "var(--line)",
    textMuted: "color-mix(in srgb, var(--text) 50%, transparent)",
    textPrimary: "var(--text)",
    accent: "var(--accent)",
  };

  useEffect(() => {
    let foundIndex = 0;
    for (let i = 0; i < items.length; i++) {
      const route = items[i].href;
      if (!route) continue;
      if (route.includes('/#')) {
        const [path, hash] = route.split('/#');
        if ((pathname === '/' || pathname === path) && window.location.hash === `#${hash}`) {
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

  const handleNavClick = (index: number, href?: string): void => {
    setActiveIndex(index);
    if (!href) return;
    if (href.includes('/#')) {
      const [path, hash] = href.split('/#');
      if (pathname !== path && path) navigate(path);
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-transform duration-300 ${dir === "down" ? "-translate-y-full" : "translate-y-0"} ${className}`}
      style={{ backgroundColor: tokens.bg, borderColor: tokens.border }}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-lg focus:font-medium"
        style={{ backgroundColor: tokens.bg, color: tokens.textPrimary, outline: `2px solid ${tokens.accent}` }}
      >
        Skip to main content
      </a>
      <div className={`${compact ? "py-4 md:py-6" : "py-6 md:py-10"} px-4 md:px-8 lg:px-12 transition-[padding] duration-300`}>
        <div className="max-w-[1600px] mx-auto">
          <nav className="flex flex-col gap-1 md:gap-2 items-end" aria-label="Primary navigation">
            {items.map((item, index) => (
              <motion.button 
                key={item.href || item.label} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }} 
                onClick={() => { 
                  handleNavClick(index, item.href); 
                  item.onClick?.(); 
                }} 
                onMouseEnter={() => setActiveIndex(index)} 
                className="text-right relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg w-fit" 
                style={{ '--tw-ring-color': tokens.accent, '--tw-ring-offset-color': tokens.bg } as React.CSSProperties}
              >
                <div className="flex items-baseline gap-4 md:gap-6 py-1.5 md:py-2">
                  <motion.span 
                    className={`${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl"} tracking-tighter font-medium transition-all duration-300`} 
                    animate={{ 
                      color: activeIndex === index ? tokens.accent : tokens.textMuted, 
                      x: activeIndex === index ? -10 : 0, 
                      opacity: activeIndex === index ? 1 : 0.5 
                    }} 
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {item.label}
                  </motion.span>
                </div>
                {activeIndex === index && (
                  <motion.div 
                    layoutId="navUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-px" 
                    style={{ backgroundColor: tokens.accent }} 
                    initial={{ scaleX: 0 }} 
                    animate={{ scaleX: 1 }} 
                    exit={{ scaleX: 0 }} 
                    transition={{ duration: 0.3 }} 
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
      <div className={`overflow-hidden border-t ${compact ? "py-2" : "py-2.5 md:py-3"} relative`} style={{ borderColor: tokens.border }}>
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none z-10" style={{ background: `linear-gradient(90deg, ${tokens.bg} 0%, transparent 100%)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none z-10" style={{ background: `linear-gradient(270deg, ${tokens.bg} 0%, transparent 100%)` }} />
        <motion.div animate={reduce ? {} : { x: ["0%", "-50%"] }} transition={{ duration: tickerSpeedSec, repeat: Infinity, ease: "linear" }} className="flex gap-8 md:gap-12 whitespace-nowrap" aria-hidden="true">
          {Array.from({ length: tickerRepeat }).map((_, i) => (
            <span key={i} className={`${compact ? "text-[10px]" : "text-xs"} tracking-wider uppercase`} style={{ color: tokens.textMuted, opacity: 0.4 }}>{tickerText}</span>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
