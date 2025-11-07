import { memo } from "react";
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
      className={`relative inline-flex rounded-full px-1.5 py-1.5 gap-2 ${className}`}
      style={{
        background: "var(--neu-bg)",
        boxShadow:
          "8px 8px 16px var(--neu-shadow-dark), -8px -8px 16px var(--neu-shadow-light)",
      }}
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
            className="relative rounded-full outline-none focus-visible:ring-2 transition-colors duration-300"
            style={{
              padding: "12px 24px",
              color: isActive ? "var(--neu-text-active)" : "var(--neu-text-inactive)",
              boxShadow: isActive
                ? "inset 4px 4px 8px var(--neu-press-inset-dark), inset -4px -4px 8px var(--neu-press-inset-light)"
                : "8px 8px 16px var(--neu-shadow-dark), -8px -8px 16px var(--neu-shadow-light)",
              // Tailwind focus ring bridge
              // @ts-ignore
              "--tw-ring-color": "var(--neu-ring)",
            } as React.CSSProperties}
          >
            {isActive && (
              <motion.div
                layoutId="neu-active-pill"
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={reduceMotion ? false : { scale: [1, 1.04, 1] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2.5">
              <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
              <span className="tracking-wide">{item.label}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
});
