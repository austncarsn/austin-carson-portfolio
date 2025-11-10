import { useState } from "react";
import type { JSX } from "react";
import { motion } from "motion/react";
import { Home, Briefcase, Image, Mail } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "work", label: "Work", icon: Briefcase, href: "#work" },
  { id: "gallery", label: "Gallery", icon: Image, href: "#gallery" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

/**
 * Site Navigation — Neumorphic design with soft shadows
 */
export default function Navigation(): JSX.Element {
  const [activeId, setActiveId] = useState("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full flex justify-center p-6 sm:p-12 bg-[#d2d9db] min-h-[160px] sm:min-h-[240px] items-center relative overflow-hidden">
      {/* Soft ambient light */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
      
      <nav 
        role="navigation"
        aria-label="Main navigation"
        className="relative bg-[#e0e5ec] rounded-[2rem] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] px-2 sm:px-3 py-2 sm:py-3 flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;
          
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                setActiveId(item.id);
                if (item.href.startsWith("#")) {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative px-4 sm:px-7 py-3 sm:py-4 rounded-[1.5rem] transition-all duration-500 flex-shrink-0"
              style={isActive ? {
                boxShadow: 'inset 6px 6px 12px rgba(163,177,198,0.5), inset -6px -6px 12px rgba(255,255,255,0.7)',
                background: 'linear-gradient(145deg, #d1d9e6, #e0e5ec)'
              } : isHovered ? {
                boxShadow: '6px 6px 12px rgba(163,177,198,0.4), -6px -6px 12px rgba(255,255,255,0.6)',
                background: 'linear-gradient(145deg, #e0e5ec, #f0f4f8)'
              } : {
                boxShadow: '5px 5px 10px rgba(163,177,198,0.5), -5px -5px 10px rgba(255,255,255,0.5)',
                background: '#e0e5ec'
              }}
            >
              <motion.span 
                className={`relative flex items-center gap-2 sm:gap-3 transition-all duration-500 ${
                  isActive ? "text-[#1a1a1a]" : isHovered ? "text-[#2a2a2a]" : "text-slate-500"
                }`}
                animate={{ 
                  scale: isActive ? 1.05 : isHovered ? 1.02 : 1,
                  y: isActive ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon className="w-[1.125rem] h-[1.125rem]" strokeWidth={isActive ? 2.5 : 2} />
                <span className="tracking-wide hidden xs:inline text-sm sm:text-base">{item.label}</span>
              </motion.span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
