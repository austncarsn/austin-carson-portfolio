import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "../../common/media/ImageWithFallback";

export function Hero(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
          opacity: 0.4
        }}
      />

      <div className="absolute inset-0">
        <motion.div 
          style={{ y, scale }}
          className="relative w-full h-[130vh]"
        >
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-4 md:p-8 lg:p-12">
            {[
              'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&h=800&fit=crop',
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop',
              'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop'
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: i * 0.15, 
                  duration: 1.2,
                  ease: [0.19, 1, 0.22, 1]
                }}
                className={`relative h-full ${i === 2 ? 'hidden lg:block' : ''}`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[12px] md:rounded-[20px]">
                  <ImageWithFallback
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover grayscale brightness-75 contrast-110 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-out"
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.2) 100%)'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(244, 250, 255, 0) 0%, rgba(244, 250, 255, 0.4) 25%, rgba(244, 250, 255, 0.75) 50%, rgba(244, 250, 255, 0.9) 70%, rgba(244, 250, 255, 0.95) 80%, var(--bg) 90%)',
              backdropFilter: 'blur(0.5px)'
            }}
          />
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-24 md:py-32"
      >
        <div className="text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="mb-8 md:mb-16"
          >
            <div className="inline-flex items-center gap-3 md:gap-6">
              <motion.div 
                className="h-[1px]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <span 
                className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium"
                style={{ color: 'var(--muted)' }}
              >
                Designer & Developer — Austin Carson
              </span>
              <motion.div 
                className="h-[1px]"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ backgroundColor: 'var(--accent)' }}
              />
            </div>
          </motion.div>

          <div className="mb-10 md:mb-20 overflow-hidden space-y-2 md:space-y-4">
            {[
              { word: 'Crafting', color: 'var(--ink)', italic: false },
              { word: 'Elegant', color: 'var(--accent)', italic: false },
              { word: 'Interfaces', color: 'var(--ink)', italic: true }
            ].map((item, i) => (
              <motion.div
                key={item.word}
                initial={{ y: 250, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: 0.9 + i * 0.12, 
                  duration: 1,
                  ease: [0.19, 1, 0.22, 1]
                }}
              >
                <h1 
                  className="text-[clamp(2.5rem,12vw,16rem)] leading-[0.88] tracking-[-0.04em]"
                  style={{ 
                    color: item.color,
                    fontStyle: item.italic ? 'italic' : 'normal',
                    fontWeight: item.italic ? 300 : 600
                  }}
                >
                  {item.word}
                </h1>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-base md:text-lg lg:text-2xl max-w-3xl mx-auto mb-10 md:mb-20 leading-relaxed px-4"
            style={{ color: 'var(--muted)', letterSpacing: '-0.01em' }}
          >
            Bridging creativity with code. I design and build digital experiences with React, TypeScript, and AI—creating design systems that resonate, inspire, and transform how people interact with technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="inline-block"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 md:px-12 py-4 md:py-5 overflow-hidden inline-flex items-center gap-3 md:gap-4 rounded-[16px] md:rounded-[20px]"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <span 
                className="relative z-10 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase"
                style={{ color: 'var(--bg)', fontWeight: 600 }}
              >
                View Projects
              </span>
              <motion.span
                className="relative z-10 text-base md:text-lg"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                style={{ color: 'var(--bg)' }}
              >
                →
              </motion.span>
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: 'var(--ink)' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 md:gap-4"
            >
              <span 
                className="text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase font-medium"
                style={{ color: 'var(--muted)', opacity: 0.7 }}
              >
                Scroll
              </span>
              <div 
                className="w-[1px] h-12 md:h-20"
                style={{ 
                  background: 'linear-gradient(to bottom, var(--accent), transparent)'
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
