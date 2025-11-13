import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ImageWithFallback } from "../../common/media/ImageWithFallback";
import astroNature from "../../../assets/astro_nature.webp";
// floralWall was previously used in the gallery; no longer needed after reordering
// keep import commented for now in case you want to re-enable it later
// import floralWall from "../../../assets/flowal_wall.jpeg";
import wallArt from "../../../assets/wall_art.webp";
import cowboys from "../../../assets/Cowboys.webp";


export function Hero(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  const [cursorPosition, setCursorPosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  // Detect mobile viewport with a debounced/RAF-backed resize handler
  useEffect(() => {
    let raf = 0;
    const onResize = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setIsMobile(window.innerWidth < 768));
    };

    // initial check
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', onResize, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      if (typeof window !== 'undefined') window.removeEventListener('resize', onResize as EventListener);
    };
  }, []);

  // Track cursor for interactive gradient (desktop only)
  useEffect(() => {
    if (reduce || isMobile) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setCursorPosition({ x, y });
    };

    const el = containerRef.current;
    el?.addEventListener('mousemove', handleMouseMove, { passive: true } as AddEventListenerOptions);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, [reduce, isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Reduced parallax motion on mobile for better performance
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ['0%', '0%'] : isMobile ? ['0%', '8%'] : ['0%', '24%']
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1, 0.85, 0.12]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce || isMobile ? [1, 1] : [1, 1.05]);

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
      className="relative min-h-screen isolate overflow-hidden"
    >
      {/* Interactive cursor gradient - desktop only */}
      {!reduce && !isMobile && (
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
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 p-3 md:p-8 lg:p-12">
            {gallery.map((image, i) => {
              const isCenter = i === 1;
              return (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: isMobile ? 12 : 36, scale: 0.99 }}
                  animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: isMobile ? i * 0.06 : i * 0.12, duration: isMobile ? 0.45 : 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`relative ${i === 2 ? "hidden lg:block" : ""}`}
                  onMouseEnter={() => !isMobile && setIsHovering(true)}
                  onMouseLeave={() => !isMobile && setIsHovering(false)}
                  whileHover={reduce || isMobile ? undefined : { y: -4 }}
                >
                  <motion.div
                    className={`relative w-full overflow-hidden ${isCenter ? 'rounded-xl md:rounded-3xl bg-surface' : 'rounded-lg bg-surface'} ${isMobile ? 'h-[48vh]' : 'h-[70vh] md:h-[96vh]'}`}
                    whileTap={isMobile ? { scale: 0.985 } : undefined}
                    style={isCenter ? { boxShadow: '0 18px 48px rgba(0,0,0,0.12)' } : {}}
                  >
                    <motion.div
                      whileHover={reduce || isMobile ? undefined : { y: isCenter ? -8 : -6, scale: isCenter ? 1.03 : 1.01 }}
                      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                      className={`w-full h-full ${isCenter ? '' : 'filter blur-sm opacity-60'}`}
                    >
                      <ImageWithFallback
                        src={image.src}
                        alt={image.alt}
                        className={image.className ?? "w-full h-full object-cover grayscale-[60%] contrast-[1.1] brightness-[0.95]"}
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </motion.div>

                    {/* Active-card inner glow / subtle inner border */}
                    {isCenter && (
                      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.06), inset 0 0 18px rgba(255,200,150,0.03)' }} />
                    )}

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
              );
            })}
          </div>

          {/* Optimized foreground fade */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              // strengthen the bottom gradient so the headline reads clearly
              background: "linear-gradient(180deg, transparent 0%, rgba(250, 250, 248, 0.9) 55%, #fafaf8 95%)",
            }}
          />
        </motion.div>
      </div>

      {/* Text block with enhanced layout */}
      <motion.div
        ref={textRef}
        style={{ opacity: opacity }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-20 md:py-32"
      >
        <div className="text-center max-w-6xl w-full">
          

          {/* Eyebrow */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: isMobile ? 12 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-6 md:mb-16"
          >
            <div className="inline-flex items-center gap-4 md:gap-6">
              <span className="uppercase text-neutral-800 text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.2em]">
                Designer & Developer — Austin Carson
              </span>
            </div>
          </motion.div>

          {/* H1 with improved mobile sizing */}
          <motion.h1
            initial={reduce ? false : { y: isMobile ? 20 : 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-8 text-neutral-900 tracking-tight leading-[1.1] px-2"
          >
            Interfaces With Intent
          </motion.h1>

          {/* Subhead with better mobile spacing */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: isMobile ? 8 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-base md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 md:mb-20 px-4 text-neutral-500 leading-relaxed"
          >
            Design systems that scale. Experiences that connect. Impact you can measure.
          </motion.p>

          {/* Enhanced CTA with mobile-optimized touch targets */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: isMobile ? 8 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4"
          >
            <motion.a
              href="#work"
              aria-label="Explore the work section"
              whileHover={reduce || isMobile ? undefined : { y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-10 py-3 md:py-4 rounded-full bg-neutral-900 text-white shadow-lg w-full sm:w-auto min-h-[48px]"
              onClick={handleExploreClick}
              onFocus={(e) => e.currentTarget.setAttribute('data-focused', 'true')}
              onBlur={(e) => e.currentTarget.removeAttribute('data-focused')}
            >
              <span className="relative z-10 tracking-[0.08em] md:tracking-[0.12em] uppercase text-xs md:text-sm">
                Explore the work
              </span>
              <motion.span
                className="relative z-10 text-sm md:text-base"
                animate={reduce || isMobile ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                ↗
              </motion.span>
            </motion.a>
              <a
                href="#/resume"
                aria-label="View resume"
                className="inline-flex items-center justify-center px-4 md:px-6 py-3 md:py-3 rounded-full w-full sm:w-auto min-h-[48px] text-neutral-700 hover:underline"
              >
                <span className="tracking-[0.06em] md:tracking-[0.1em] uppercase text-xs md:text-sm">Resume</span>
              </a>
            </motion.div>

          {/* Enhanced scroll indicator - hidden on mobile */}
          <div className="hidden md:block absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2">
            <motion.div
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                Scroll
              </span>
              <motion.div
                className="w-[1px] h-16 bg-gradient-to-b from-neutral-400 to-transparent"
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