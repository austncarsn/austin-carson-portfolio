import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Home, Briefcase, Image, Mail } from "lucide-react";

type Item = {
  id: string;
  label: string;
  to: string;
  icon: React.ComponentType<any>;
};

const DEFAULT_ITEMS: Item[] = [
  { id: "home", label: "Home", to: "/", icon: Home },
  { id: "work", label: "Work", to: "/#work", icon: Briefcase },
  { id: "gallery", label: "Gallery", to: "/#gallery", icon: Image },
  { id: "contact", label: "Contact", to: "/#contact", icon: Mail },
];

export const NeumorphicPillNav = memo(function NeumorphicPillNav({
  items = DEFAULT_ITEMS,
  className = "",
}: {
  items?: Item[];
  className?: string;
}) {
  const { pathname } = useLocation();
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <nav
      aria-label="Primary"
      className={`relative inline-flex rounded-full px-1.5 py-1.5 gap-1 ${className}`}
      style={{
        background: "var(--neu-bg)",
        boxShadow: `8px 8px 16px var(--neu-shadow-dark), -8px -8px 16px var(--neu-shadow-light)`,
      }}
      role="tablist"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

        return (
          <Link
            key={item.id}
            to={item.to}
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "page" : undefined}
            className="relative px-6 py-3 rounded-full outline-none focus-visible:ring-2 transition-colors duration-300"
            style={{
              color: isActive ? "var(--neu-accent)" : "var(--neu-muted)",
              boxShadow: isActive
                ? `inset 4px 4px 8px var(--neu-press-inset-dark), inset -4px -4px 8px var(--neu-press-inset-light)`
                : `4px 4px 8px var(--neu-shadow-dark), -4px -4px 8px var(--neu-shadow-light)`,
              // @ts-ignore custom property
              "--tw-ring-color": "var(--neu-ring)",
            } as React.CSSProperties}
          >
            {isActive && (
              <motion.div
                layoutId="neu-active"
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={reduceMotion ? false : { scale: [1, 1.04, 1] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2.5 font-satoshi font-medium">
              <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
              <span className="tracking-wide">{item.label}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
});
