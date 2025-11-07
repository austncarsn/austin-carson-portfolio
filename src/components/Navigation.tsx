import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NeumorphicPillNav } from "./NeumorphicPillNav";

/**
 * Site Navigation — Neumorphic pill navigation integrated with design system
 * Desktop: Pills docked to the right side
 * Mobile: Pills centered below logo
 */
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      role="banner"
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-[color:var(--color-bg-surface)]/88 backdrop-blur-xl border-b"
          : "bg-[color:var(--color-bg-surface)]/65 backdrop-blur-md",
      ].join(" ")}
      style={{ borderColor: "var(--color-border-subtle)" }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4" aria-label="Main">
        <div className="flex items-center justify-between gap-6">
          {/* Brand left */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2"
            style={{ "--tw-ring-color": "var(--neu-ring)" } as React.CSSProperties}
            aria-label="Home"
          >
            <div
              className="relative w-12 h-12 rounded-xl grid place-items-center"
              style={{
                background: "linear-gradient(145deg,#FFFFFF 0%, var(--color-bg-surface) 100%)",
                boxShadow: "8px 8px 18px var(--neu-shadow-dark), -8px -8px 18px var(--neu-shadow-light)",
                color: "var(--color-text-primary)",
                fontWeight: 750,
                fontSize: "1.1rem",
                letterSpacing: "-0.01em",
              }}
            >
              AC
            </div>
          </Link>

          {/* Pill nav: right on desktop, centered on mobile */}
          <div className="hidden md:block">
            <NeumorphicPillNav />
          </div>
          <div className="md:hidden flex-1 flex justify-center">
            <NeumorphicPillNav />
          </div>
        </div>
      </nav>
    </header>
  );
}
