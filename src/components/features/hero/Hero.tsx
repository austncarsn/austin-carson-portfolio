import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ImageWithFallback } from "../../common/media/ImageWithFallback";
import astroNature from "../../../assets/astro_nature.jpg";
// floralWall was previously used in the gallery; no longer needed after reordering
// keep import commented for now in case you want to re-enable it later
// import floralWall from "../../../assets/flowal_wall.jpeg";
import wallArt from "../../../assets/wall_art.png";
import cowboys from "../../../assets/Cowboys.jpg";


export function Hero(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  
  
  const [cursorPosition, setCursorPosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  // Track cursor for interactive gradient
  useEffect(() => {
    if (reduce) return;
    
  const handleMouseMove = (e: MouseEvent): void => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transforms must be called at top level, not inside useMemo
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1, 0.7, 0.05]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.05]);

  const gallery = useMemo(() => [
    {
      // leftmost tile: Cowboys image provided
      src: cowboys,
      alt: "Cowboys",
      className: "w-full h-full object-cover object-left contrast-[1.15] brightness-[1.02]",
    },
    {
      // center tile: previously left (wall art)
      src: wallArt,
      alt: "Wall art",
      className: "w-full h-full object-cover object-center contrast-[1.25] brightness-[1.05]",
    },
    {
      // right tile: previously center (astro nature)
      src: astroNature,
      alt: "Astro nature",
      className: "w-full h-full object-cover object-right contrast-[1.1] brightness-[0.98]",
    },
  ], []);


  const handleExploreClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // fallback to hash navigation
      window.location.hash = '#work';
    }
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Intro"
      className="relative min-h-screen isolate overflow-hidden bg-token-canvas"
    >
      {/* Interactive cursor gradient */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${cursorPosition.x * 100}% ${cursorPosition.y * 100}%, rgba(255, 200, 150, 0.08), transparent 60%)`,
          }}
          animate={{
            opacity: isHovering ? 1 : 0.6,
          }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Subtle texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% 10%, rgba(0, 0, 0, 0.04), transparent 60%), radial-gradient(900px 500px at 90% 15%, rgba(200, 150, 100, 0.06), transparent 55%)",
        }}
      />

      {/* Gallery parallax with optimized rendering */}
      <div className="absolute inset-0">
          <motion.div 
          style={{ 
            y: y, 
            scale: scale,
          }} 
          className="relative w-full h-[150vh]"
        >
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-4 md:p-8 lg:p-12">
            {gallery.map((image, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 48, scale: 0.985 }}
                animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                className={`relative ${i === 2 ? "hidden lg:block" : ""}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.div
                  className="relative w-full h-[84vh] md:h-[96vh] overflow-hidden rounded-2xl md:rounded-3xl bg-neutral-100"
                  whileHover={reduce ? undefined : { 
                    scale: 1.02,
                    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
                  }}
                >
                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className={image.className ?? "w-full h-full object-cover grayscale-[60%] contrast-[1.1] brightness-[0.95]"}
                    />
                  </motion.div>
                  
                  {/* Enhanced vignette with subtle grain texture */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      maskImage: "radial-gradient(120% 120% at 50% 40%, transparent 55%, black 100%)",
                      WebkitMaskImage: "radial-gradient(120% 120% at 50% 40%, transparent 55%, black 100%)",
                      background: "linear-gradient(180deg, rgba(0, 0, 0, 0.12), transparent 35%)",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Optimized foreground fade */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(250, 250, 248, 0.65) 55%, #fafaf8 85%)",
            }}
          />
        </motion.div>
      </div>

      {/* Text block with enhanced layout */}
      <motion.div
        ref={textRef}
        style={{ opacity: opacity }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-24 md:py-32"
      >
        <div className="text-center max-w-6xl">
          

          {/* Eyebrow */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-8 md:mb-16"
          >
            <div className="inline-flex items-center gap-6">
              <span className="uppercase text-token-muted text-xs md:text-sm tracking-[0.2em]">
                Designer & Developer — Austin Carson
              </span>
            </div>
          </motion.div>

          {/* H1 with improved spacing */}
          <motion.h1
            initial={reduce ? false : { y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-6xl md:text-7xl lg:text-8xl mb-6 md:mb-8 text-token-primary tracking-tight"
          >
            Interfaces With Intent
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 md:mb-20 px-4 text-token-muted leading-relaxed"
          >
            Design systems that scale. Experiences that connect. Impact you can measure.
          </motion.p>

          {/* Enhanced CTA with better hover state */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="inline-block"
          >
            <motion.a
              href="#work"
              aria-label="Explore the work section"
              whileHover={reduce ? undefined : { scale: 1.04, y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="group relative overflow-hidden inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-5 rounded-2xl bg-token-accent text-on-accent border border-token shadow-lg"
              onClick={handleExploreClick}
              onFocus={(e) => e.currentTarget.setAttribute('data-focused', 'true')}
              onBlur={(e) => e.currentTarget.removeAttribute('data-focused')}
            >
              <span className="relative z-10 tracking-[0.2em] md:tracking-[0.25em] uppercase text-xs md:text-sm">
                Explore the work
              </span>
              <motion.span
                className="relative z-10 text-lg"
                animate={reduce ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
              {/* Optimized hover wash with initial state */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 bg-token-overlay-accent"
                initial={{ opacity: 0 }}
                whileHover={reduce ? undefined : { opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </motion.a>
              <a
                href="#/resume"
                aria-label="View resume"
                className="ml-4 inline-flex items-center px-4 py-3 rounded-lg bg-token-surface border border-token text-token-primary font-medium"
              >
                Resume
              </a>
            </motion.div>

          {/* Enhanced scroll indicator with better animation */}
          <div className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2">
            <motion.div
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-token-muted">
                Scroll
              </span>
              <motion.div
                className="w-[1px] h-16"
                style={{ background: 'linear-gradient(to bottom, rgba(107,114,128,1), transparent)' }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}