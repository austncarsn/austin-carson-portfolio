import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  cta?: CTA;
  tickerText?: string;
  tickerRepeat?: number;
  tickerSpeedSec?: number;
  className?: string;
  variant?: "default" | "noir";
  LinkComponent?: React.ComponentType<any>;
};

export function SiteHeader({
  brandTitle = "KINETIC",
  since = "Since 2025",
  items = ["Index", "Archive", "Info", "Shop"].map(l => ({ label: l })),
  statusText = "Open for work",
  cta = { label: "Contact" },
  tickerText = "Available for projects • Design & Development • Based in LA",
  tickerRepeat = 8,
  tickerSpeedSec = 20,
  className = "",
  variant = "default",
  LinkComponent,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const dir = useScrollDir();
  const compact = useCompactHeader(64);

  // Route-aware highlight - sync active index to URL
  useEffect(() => {
    const routeMap = items.map(item => {
      if (!item.href) return null;
      // Extract pathname from href (handle both /path and /#anchor formats)
      const cleanPath = item.href.replace(/^#/, '/#');
      return cleanPath;
    });
    
    // Find matching route index
    let foundIndex = 0;
    for (let i = 0; i < routeMap.length; i++) {
      const route = routeMap[i];
      if (!route) continue;
      
      // Handle hash routes
      if (route.includes('/#')) {
        const [, hash] = route.split('/#');
        if (pathname === '/' && window.location.hash === `#${hash}`) {
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

  const tokens = useMemo(() => {
    if (variant === "noir") {
      return {
        bg: "var(--bg)",
        border: "var(--line)",
        light: "var(--muted)",
        lightest: "var(--ink)",
        accent: "var(--accent)",
        pulse: "var(--accent-300)",
      };
    }
    return {
      bg: "var(--bg)",
      border: "var(--line)",
      light: "var(--muted)",
      lightest: "var(--ink)",
      accent: "var(--accent)",
      pulse: "var(--accent-300)",
    };
  }, [variant]);

  const NavWrapper = ({
    href,
    className,
    style,
    children,
    onClick,
    external,
  }: { 
    href?: string; 
    className?: string; 
    style?: React.CSSProperties;
    children: React.ReactNode; 
    onClick?: () => void;
    external?: boolean;
  }) => {
    if (href && LinkComponent && !external) return <LinkComponent to={href} className={className} style={style}>{children}</LinkComponent>;
    if (href) return (
      <a 
        href={href} 
        className={className} 
        style={style} 
        onClick={onClick}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
    return <button type="button" className={className} style={style} onClick={onClick}>{children}</button>;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-transform duration-300 ${
        dir === "down" ? "-translate-y-full" : "translate-y-0"
      } ${className ?? ""}`}
      style={{ backgroundColor: tokens.bg, borderColor: tokens.border }}
      role="banner"
    >
      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded"
        style={{ 
          backgroundColor: tokens.bg, 
          color: tokens.lightest,
          outline: `2px solid ${tokens.accent}`
        }}
      >
        Skip to content
      </a>

      {/* Main header content with compact-aware padding */}
      <div className={`${compact ? "py-3 md:py-8" : "py-5 md:py-8"} px-6 md:px-16 transition-[padding] duration-300`}>
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Brand */}
            <div className="col-span-12 md:col-span-3 mb-6 md:mb-0">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent }} />
                  <span
                    className={`${compact ? "text-[9px]" : "text-[10px]"} md:text-xs tracking-[0.3em] uppercase`}
                    style={{ color: tokens.light, opacity: 0.6 }}
                    aria-label={since}
                  >
                    {since}
                  </span>
                </div>
                <div
                  className={`${compact ? "text-2xl" : "text-3xl"} md:text-5xl tracking-tight md:tracking-tighter select-none`}
                  style={{ color: tokens.lightest }}
                >
                  {brandTitle}
                </div>
              </motion.div>
            </div>

            {/* Nav */}
            <nav
              className="col-span-12 md:col-span-6 border-l border-r"
              style={{ borderColor: tokens.border }}
              aria-label="Primary"
            >
              {/* Mobile compact: single pinned active item */}
              {compact ? (
                <div className="md:hidden px-6 flex items-baseline gap-4 py-1.5">
                  {/* index hidden entirely on compact mobile */}
                  <span className="sr-only">Current section</span>
                  <span
                    className="text-2xl tracking-tight"
                    style={{ color: tokens.accent }}
                  >
                    {items[activeIndex]?.label ?? items[0]?.label}
                  </span>
                </div>
              ) : null}

              {/* Full list (always on md+, also on mobile when not compact) */}
              <div className={`px-6 md:px-8 flex flex-col gap-1 md:gap-2 ${compact ? "hidden md:flex" : "flex"}`}>
                {items.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <NavWrapper
                        href={item.href}
                        onClick={() => {
                          setActiveIndex(index);
                          item.onClick?.();
                        }}
                        className="text-left relative group outline-none nav-link-item"
                      >
                        <div className="flex items-baseline gap-5 py-1.5 md:py-2">
                          {/* Hide indices on mobile when compact; visible otherwise */}
                          <span
                            className={`${compact ? "hidden md:inline" : "inline"} text-[11px] md:text-xs tabular-nums`}
                            style={{ color: tokens.light, opacity: isActive ? 1 : 0.35 }}
                            aria-hidden="true"
                          >
                            [{String(index + 1).padStart(2, "0")}]
                          </span>
                          <span
                            className={`nav-label ${compact ? "text-2xl" : "text-3xl"} md:text-5xl tracking-tight md:tracking-tighter transition-all duration-300`}
                            style={{
                              color: isActive 
                                ? tokens.accent 
                                : 'color-mix(in oklab, var(--text) 30%, var(--muted))',
                              transform: isActive ? "translateX(8px)" : "translateX(0px)",
                              opacity: isActive ? 1 : 0.8,
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span className="sr-only">{isActive ? "Current section" : ""}</span>
                      </NavWrapper>
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Status + CTA */}
            <div className="col-span-12 md:col-span-3 flex flex-col gap-5 md:items-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <div
                  className="text-[10px] md:text-xs tracking-widest uppercase"
                  style={{ color: tokens.light, opacity: 0.6 }}
                >
                  {statusText}
                </div>
                <motion.div
                  animate={reduce ? {} : { scale: [1, 1.25, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tokens.pulse }}
                  aria-hidden="true"
                />
              </motion.div>

              <NavWrapper
                href={cta.href}
                onClick={cta.onClick}
                external={cta.external}
                className={`text-[10px] md:text-xs tracking-[0.3em] uppercase px-5 md:px-6 py-2.5 md:py-3 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                style={{ borderColor: tokens.accent }}
              >
                <span
                  style={{ color: tokens.lightest }}
                  className="pointer-events-none"
                >
                  {cta.label}
                </span>
              </NavWrapper>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker with edge fade */}
      <div 
        className={`overflow-hidden border-t ${compact ? "py-2" : "py-2.5 md:py-3"} ticker-mask`}
        style={{ borderColor: tokens.border }}
      >
        <motion.div
          animate={reduce ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: tickerSpeedSec, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 whitespace-nowrap"
          aria-hidden="true"
        >
          {Array.from({ length: tickerRepeat }).map((_, i) => (
            <span
              key={i}
              className="text-xs md:text-sm tracking-wider uppercase"
              style={{ color: tokens.light, opacity: 0.35 }}
            >
              {tickerText}
            </span>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
