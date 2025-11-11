import { motion } from 'motion/react';
import type { JSX } from 'react';

const EASING = [0.22, 1, 0.36, 1] as const;

const BACKGROUND_WORDS = [
  'AUSTIN',
  'CARSON',
  'INTERACTIVE',
  'LEARNING',
  'AI',
  'VISUALS',
  'SORA',
  'INTERFACE',
  'NARRATIVE',
  'DESIGN',
] as const;

const titleAnimation = {
  initial: { x: -80, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 1, ease: EASING },
};

const subtitleAnimation = {
  initial: { x: -80, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 1, delay: 0.3, ease: EASING },
};

export function HeroBrutalist(): JSX.Element {
  const repeatedWords = [...BACKGROUND_WORDS, ...BACKGROUND_WORDS, ...BACKGROUND_WORDS, ...BACKGROUND_WORDS];

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden relative"
      style={{ 
        background: 'linear-gradient(135deg, var(--powder-blue) 0%, color-mix(in oklab, var(--powder-blue) 85%, var(--chinese-white)) 100%)'
      }}
      aria-label="Hero section"
    >
      <div 
        className="absolute inset-0 flex items-center justify-end pr-8 sm:pr-20 pointer-events-none"
        style={{ opacity: 0.03 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: ['0%', '-50%'] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: 'linear',
            repeatType: 'loop'
          }}
          className="flex flex-col gap-6 sm:gap-8"
        >
          {repeatedWords.map((word, i) => (
            <div 
              key={`${word}-${i}`}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl whitespace-nowrap font-bold"
              style={{ color: 'var(--pitch-black)' }}
            >
              {word}
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="relative z-10 max-w-5xl w-full text-center">
        <motion.h1
          {...titleAnimation}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 sm:mb-12 tracking-tight font-bold"
          style={{ color: 'var(--pitch-black)' }}
        >
          AUSTIN CARSON
        </motion.h1>
        
        <motion.div
          {...subtitleAnimation}
          className="space-y-3 sm:space-y-4 max-w-3xl mx-auto"
        >
          <p 
            className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium"
            style={{ color: 'color-mix(in oklab, var(--pitch-black) 75%, transparent)' }}
          >
            Product Designer & Front-End Developer
          </p>
          <p 
            className="text-base sm:text-lg md:text-xl leading-relaxed"
            style={{ color: 'color-mix(in oklab, var(--pitch-black) 60%, transparent)' }}
          >
            Crafting elegant interfaces and design systems that bridge creativity with code. 
            Specializing in React, TypeScript, and AI-powered educational experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}