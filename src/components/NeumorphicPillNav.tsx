import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Home, Briefcase as Work, Image as Gallery, Mail } from "lucide-react";

type Item = { id: string; label: string; to: string; icon: React.ComponentType<any> };

const DEFAULT_ITEMS: Item[] = [
  { id: "home", label: "Home", to: "/", icon: Home },
  { id: "work", label: "Work", to: "/#work", icon: Work },
  { id: "gallery", label: "Gallery", to: "/#gallery", icon: Gallery },
  { id: "contact", label: "Contact", to: "/#contact", icon: Mail },
];

export const NeumorphicPillNav = memo(function NeumorphicPillNav({
  items = DEFAULT_ITEMS,
  className = "",
}: { items?: Item[]; className?: string }) {
  const { pathname, hash } = useLocation();
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  return (
    <nav
      aria-label="Primary"
      role="tablist"
      className={`relative inline-flex rounded-pill px-1.5 py-1.5 gap-2 bg-glass backdrop-blur-[16px] shadow-elev ${className}`}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.to === "/"
            ? pathname === "/" && !hash
            : item.to.includes("#")
            ? pathname === "/" && hash === item.to.slice(1)
            : pathname.startsWith(item.to);

        return (
          <Link
            key={item.id}
            to={item.to}
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "page" : undefined}
            className={[
              "relative rounded-pill outline-none",
              "focus-visible:ring-2 focus-visible:ring-accent-mint focus-visible:ring-offset-4 focus-visible:ring-offset-cream",
              "transition-all",
              reduceMotion ? "duration-0" : "duration-[120ms] ease-out",
            ].join(" ")}
            style={{
              padding: "12px 24px",
              color: isActive
                ? "var(--color-ink)"
                : "color-mix(in oklch, var(--color-ink) 88%, transparent)",
              background: isActive
                ? "color-mix(in oklch, white 92%, transparent)"
                : "transparent",
              ...(isActive && {
                boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
              }),
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              if (isActive || reduceMotion) return;
              (e.currentTarget as HTMLElement).style.background =
                "color-mix(in oklch, black 6%, transparent)";
            }}
            onMouseLeave={(e) => {
              if (isActive) return;
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {isActive && !reduceMotion && (
              <motion.div
                layoutId="glass-active-pill"
                className="absolute inset-0 rounded-pill pointer-events-none"
                style={{
                  background: "color-mix(in oklch, white 92%, transparent)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                  mass: 0.8,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2.5">
              <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
              <span className="tracking-wide font-medium">{item.label}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
});
