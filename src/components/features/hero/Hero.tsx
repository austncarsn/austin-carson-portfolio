import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import { ImageWithFallback } from '../../common/media/ImageWithFallback';

import astroNature from '../../../assets/astro_nature.webp';
import wallArt from '../../../assets/wall_art.webp';
import cowboys from '../../../assets/Cowboys.webp';

const HeroContext = createContext<
  | {
      scrollYProgress?: MotionValue<number>;
      isMobile: boolean;
      reduceMotion: boolean;
    }
  | undefined
>(undefined);

function useHeroContext(): {
  scrollYProgress?: MotionValue<number>;
  isMobile: boolean;
  reduceMotion: boolean;
} {
  const ctx = useContext(HeroContext);
  if (!ctx) throw new Error('useHeroContext must be used within HeroContext.Provider');
  return ctx;
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const onResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

function CursorGradient({
  x,
  y,
  visible,
}: {
  x: number;
  y: number;
  visible: boolean;
}): React.ReactElement {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(150,200,255,0.08), transparent 60%)`,
      }}
      animate={{ opacity: visible ? 1 : 0.6 }}
      transition={{ duration: 0.35 }}
    />
  );
}

function TextureOverlay(): React.ReactElement {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.15]"
      style={{
        background:
          'radial-gradient(1200px 600px at 10% 10%, rgba(0,0,0,0.04), transparent 60%), radial-gradient(900px 500px at 90% 15%, rgba(150,200,255,0.06), transparent 55%)',
      }}
    />
  );
}

type GalleryImage = { src: string; alt: string; className?: string };

function GalleryItem({
  image,
  onMouseEnter,
  onMouseLeave,
  eager,
}: {
  image: GalleryImage;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  eager?: boolean;
}): React.ReactElement {
  const { reduceMotion, isMobile } = useHeroContext();
  const initialScale = reduceMotion ? 1 : 0.99;
  const initialY = reduceMotion ? 0 : isMobile ? 8 : 20;
  return (
    <motion.div
      initial={{ opacity: reduceMotion ? 1 : 0, y: initialY, scale: initialScale }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: isMobile ? 0.45 : 0.7 }}
      className="w-full max-w-[420px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow .28s ease, transform .28s ease',
      }}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl md:rounded-3xl bg-surface"
        style={{ aspectRatio: '3/4' }}
      >
        <motion.div
          whileHover={reduceMotion || isMobile ? undefined : { y: -6, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={image.src}
            alt={image.alt}
            className={image.className ?? 'w-full h-full object-cover'}
            loading={eager ? 'eager' : 'lazy'}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function MobileGalleryCarousel({
  images,
}: {
  images: GalleryImage[];
}): React.ReactElement {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < 0) setIndex(0);
    if (index > images.length - 1) setIndex(images.length - 1);
  }, [index, images.length]);
  if (images.length === 0) return <div />;
  return (
    <div className="w-full max-w-md">
      <div className="w-full">
        <GalleryItem image={images[index]} eager />
      </div>
      <div className="flex items-center justify-between mt-4 px-2">
        <button
          className="px-3 py-2 rounded-full bg-white/90 shadow-sm"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          aria-label="Previous"
          disabled={index === 0}
        >
          ←
        </button>
        <div className="flex gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`block w-2 h-2 rounded-full ${i === index ? 'bg-neutral-900' : 'bg-neutral-300'}`}
            />
          ))}
        </div>
        <button
          className="px-3 py-2 rounded-full bg-white/90 shadow-sm"
          onClick={() => setIndex((i) => Math.min(images.length - 1, i + 1))}
          aria-label="Next"
          disabled={index === images.length - 1}
        >
          →
        </button>
      </div>
    </div>
  );
}

const HeroText: React.FC = () => {
  const { reduceMotion, isMobile } = useHeroContext();
  const handleExploreClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('work');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.hash = '#work';
  }, []);
  return (
    <div className="text-center w-full">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: isMobile ? 8 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="uppercase text-neutral-800 text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.2em]">
          Designer & Developer — Austin Carson
        </span>
      </motion.div>
      <motion.h1
        initial={reduceMotion ? false : { y: isMobile ? 12 : 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hero-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 text-neutral-900 tracking-tight leading-[1.05] font-bold"
      >
        Interfaces With Intent
      </motion.h1>
      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-xl lg:text-2xl max-w-2xl mx-auto text-neutral-500 leading-relaxed"
      >
        Design systems that scale. Experiences that connect. Impact you can measure.
      </motion.p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <a
          href="#work"
          onClick={handleExploreClick}
          className="hero-cta inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-900 text-white shadow-lg"
        >
          Explore the work
        </a>
        <a
          href="#/resume"
          className="inline-flex items-center justify-center px-4 py-3 rounded-full text-neutral-700 hover:underline"
        >
          Resume
        </a>
      </div>
    </div>
  );
};

export function Hero(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['0%', '20%']
  );
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.04]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    reduceMotion ? [1, 1, 1] : [1, 0.9, 0.14]
  );

  const baseImgClass = 'w-full h-full object-cover contrast-[1.12] brightness-[1.02]';
  const images: GalleryImage[] = useMemo(
    () => [
      { src: cowboys, alt: 'Cowboys', className: baseImgClass },
      { src: wallArt, alt: 'Wall art', className: baseImgClass },
      { src: astroNature, alt: 'Astro nature', className: baseImgClass },
    ],
    []
  );

  useEffect(() => {
    if (reduceMotion || isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    const handle = (e: MouseEvent): void => {
      const r = el.getBoundingClientRect();
      setCursor({
        x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
        y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
      });
    };
    el.addEventListener('mousemove', handle, { passive: true });
    return () => el.removeEventListener('mousemove', handle);
  }, [reduceMotion, isMobile]);

  return (
    <HeroContext.Provider
      value={{
        scrollYProgress: scrollYProgress as MotionValue<number> | undefined,
        isMobile: !!isMobile,
        reduceMotion: !!reduceMotion,
      }}
    >
      <section
        ref={containerRef}
        aria-label="Intro"
        className="relative min-h-screen isolate overflow-hidden"
      >
        {!reduceMotion && !isMobile && (
          <CursorGradient x={cursor.x} y={cursor.y} visible={isHovering} />
        )}
        <TextureOverlay />
        <div className="hero-accent-glow" aria-hidden />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-28">
          <div className="relative z-30">
            <HeroText />
          </div>
        </div>

        <motion.div
          style={{ y, scale, opacity }}
          className="absolute inset-0 flex items-end justify-center pointer-events-none"
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col items-center">
            <div className="hidden lg:flex w-full justify-center items-end gap-10 pointer-events-auto">
              {images.map((img, i) => (
                <GalleryItem
                  key={i}
                  image={img}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              ))}
            </div>
            <div className="hidden md:flex lg:hidden w-full flex-col items-center gap-8 pointer-events-auto">
              <div className="flex w-full gap-6 justify-center">
                <GalleryItem image={images[0]} />
                <GalleryItem image={images[1]} />
              </div>
              <GalleryItem image={images[2]} />
            </div>
            <div className="md:hidden w-full flex items-center justify-center pointer-events-auto py-8">
              <MobileGalleryCarousel images={images} />
            </div>
          </div>
        </motion.div>
      </section>
    </HeroContext.Provider>
  );
}

export default Hero;
