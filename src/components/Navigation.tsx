import { NeumorphicPillNav } from "./NeumorphicPillNav";

/**
 * Site Navigation — Floating glass pill navigation
 * Centered, sticky positioning with safe-area margin
 */
export default function Navigation() {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="sticky top-0 z-50 flex justify-center mt-3 lg:mt-6"
    >
      <NeumorphicPillNav />
    </nav>
  );
}
