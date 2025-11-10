import { motion } from "motion/react";
import type { JSX } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * HeroBrutalist Component — Noir Glass Theme (Refined)
 * Brutalist layout with grid-based design system
 * All colors use OKLCH tokens for perceptual uniformity
 * Refinements: Balanced headlines, glass overlay bars, perforation echo, scroll affordance
 */

export function HeroBrutalist(): JSX.Element {
  return (
    <section 
      className="relative min-h-screen px-8 md:px-16 py-16"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
      data-testid="hero-noir"
    >
      <div className="max-w-[1800px] mx-auto min-h-[calc(100vh-8rem)] relative">
        {/* Brutalist layout grid */}
        <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-8rem)]">
          {/* Large text block */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="col-span-12 lg:col-span-7 flex flex-col justify-between border-r"
            style={{ borderColor: 'color-mix(in oklab, white 12%, transparent)' }}
          >
            <div>
              <div 
                className="text-xs tracking-[0.5em] uppercase mb-12"
                style={{ color: 'color-mix(in oklab, white 50%, transparent)' }}
              >
                [001] — Portfolio
              </div>

              <h1 className="mb-16">
                <span 
                  className="block text-[clamp(2.75rem,8vw,6.5rem)] font-[600] leading-[0.9]"
                  style={{ color: 'color-mix(in oklab, white 95%, transparent)' }}
                >
                  Austin
                </span>
                <span 
                  className="relative inline-block text-[clamp(3rem,9vw,7rem)] font-[700] leading-[0.9]"
                  style={{ color: 'var(--accent)' }}
                >
                  Carson
                  <motion.div
                    className="absolute -left-6 md:-left-8 top-0 w-[2.5px] h-full"
                    style={{ backgroundColor: 'var(--accent)' }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </h1>
            </div>

            {/* Accent underline */}
            <div 
              className="mt-8 h-[3px] w-24 rounded-full" 
              style={{ background: 'var(--accent-300)' }}
            />

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 border-t pt-8" style={{ borderColor: 'color-mix(in oklab, white 15%, transparent)' }}>
              {[
                { value: '12', label: 'Projects' },
                { value: '03', label: 'Platforms' },
                { value: '05', label: 'Years' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div 
                    className="tabular-nums text-[clamp(1.5rem,3vw,2.25rem)] font-[600] mb-2"
                    style={{ color: 'color-mix(in oklab, white 92%, transparent)' }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="uppercase tracking-[0.18em] text-[0.7rem]"
                    style={{ color: 'color-mix(in oklab, white 60%, transparent)' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll affordance button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8"
            >
              <a 
                href="#work" 
                className="group inline-flex items-center gap-2 h-11 px-4 rounded-full border min-h-[44px] transition-colors"
                style={{ borderColor: 'color-mix(in oklab, white 20%, transparent)', color: 'color-mix(in oklab, white 70%, transparent)' }}
                aria-label="Scroll to work section"
              >
                <span className="text-xs tracking-wider uppercase">Scroll</span>
                <svg 
                  className="h-4 w-4 transition-transform group-hover:translate-y-[2px] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right sidebar with images and info */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {/* Image stack */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-96 border"
              style={{ borderColor: 'var(--warm-stone)', borderWidth: '1px' }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop"
                alt="Studio work"
                className="w-full h-full object-cover grayscale-[70%] hover:grayscale-0 transition-[filter] duration-300"
              />
              
              {/* Glass overlay label */}
              <a
                href="#projects"
                className="absolute top-0 left-0 right-0 flex justify-between items-center backdrop-blur-sm transition-opacity hover:opacity-90"
                style={{ 
                  backgroundColor: 'var(--overlay-80)',
                }}
                data-testid="hero-overlay-label"
                aria-label="View AI-Powered Educational Interfaces project"
              >
                {/* Top hairline */}
                <div 
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ backgroundColor: 'var(--warm-stone)', opacity: 0.4 }}
                />
                
                <div className="p-3 md:p-4 w-full flex justify-between items-center">
                  <span 
                    className="text-xs tracking-wider uppercase"
                    style={{ color: 'var(--warm-lightest)' }}
                  >
                    AI-Powered Educational Interfaces
                  </span>
                  <span 
                    className="text-xs tabular-nums"
                    style={{ color: 'var(--warm-tan)' }}
                  >
                    01/12
                  </span>
                </div>

                {/* Bottom hairline */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: 'var(--warm-stone)', opacity: 0.4 }}
                />
              </a>
            </motion.div>

            {/* Description block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="border p-3 md:p-4"
              style={{ 
                borderColor: 'var(--warm-stone)',
                borderWidth: '1px',
                backgroundColor: 'var(--warm-stone)'
              }}
            >
              <p 
                className="text-lg leading-relaxed mb-6"
                style={{ color: 'var(--warm-lightest)' }}
              >
                I build interactive learning experiences where AI-generated visuals drive the narrative. Sora generates the world, I architect the interface.
              </p>
              
              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 group min-w-[44px] min-h-[44px]"
                aria-label="View Work"
              >
                <span 
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: 'var(--warm-tan)' }}
                >
                  View Work
                </span>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl motion-reduce:animate-none"
                  style={{ color: 'var(--warm-tan)' }}
                  aria-hidden="true"
                >
                  →
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Secondary image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="relative h-64 border"
              style={{ borderColor: 'var(--warm-stone)', borderWidth: '1px' }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop"
                alt="Detail"
                className="w-full h-full object-cover grayscale-[70%] hover:grayscale-0 transition-[filter] duration-300"
              />
              
              {/* Corner markers - removed to keep only 2 accents total */}
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="border p-3 md:p-4"
              style={{ borderColor: 'var(--warm-stone)', borderWidth: '1px' }}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span 
                    className="text-xs tracking-wider uppercase"
                    style={{ color: 'var(--warm-light)', opacity: 0.5 }}
                  >
                    Email
                  </span>
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--warm-lightest)' }}
                  >
                    hello@austincarson.dev
                  </span>
                </div>
                <div 
                  className="w-full h-px"
                  style={{ backgroundColor: 'var(--warm-stone)' }}
                />
                <div className="flex justify-between items-center">
                  <span 
                    className="text-xs tracking-wider uppercase"
                    style={{ color: 'var(--warm-light)', opacity: 0.5 }}
                  >
                    Location
                  </span>
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--warm-lightest)' }}
                  >
                    United States
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Perforation echo */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute inset-x-0 -bottom-8 h-6 z-0"
        >
          <div 
            className="mx-auto max-w-[1800px] h-full"
            style={{
              WebkitMaskImage: 'radial-gradient(circle 1px, #000 98%, transparent 102%)',
              maskImage: 'radial-gradient(circle 1px, #000 98%, transparent 102%)',
              WebkitMaskSize: '14px 14px',
              maskSize: '14px 14px',
              backgroundColor: 'var(--warm-stone)',
              opacity: 0.18
            }}
          />
        </div>
      </div>
    </section>
  );
}

