import React, {
  useState,
  useEffect,
  useCallback,
  type ReactElement,
  type MouseEvent,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

// ======================================
// Constants
// ======================================

const BREAKPOINT_SMALL = 375;
const BREAKPOINT_MOBILE = 768;
const BREAKPOINT_TABLET = 1024;
const BREAKPOINT_DESKTOP = 1280;

// ======================================
// Types
// ======================================

// CursorState removed — not needed in the new hero.

// ======================================
// Hooks
// ======================================

function useDeviceSize(): {
  isSmall: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} {
  const [deviceSize, setDeviceSize] = useState({
    isSmall: false,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const checkDevice = (): void => {
      const width = window.innerWidth;
      setDeviceSize({
        isSmall: width < BREAKPOINT_SMALL,
        isMobile: width < BREAKPOINT_MOBILE,
        isTablet: width >= BREAKPOINT_MOBILE && width < BREAKPOINT_TABLET,
        isDesktop: width >= BREAKPOINT_DESKTOP,
      });
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceSize;
}

// ======================================
// Visual Components
// ======================================

function TechnicalGrid(): ReactElement {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          radial-gradient(circle at center, rgba(0,0,0,0.15) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    />
  );
}

function BackgroundGradient(): ReactElement {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at top, var(--surface) 0%, #f8f8f8 40%, #f0f0f0 100%)
        `,
      }}
    />
  );
}

function RadialSpotlight(): ReactElement {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div
        className="w-full max-w-4xl h-96 opacity-[0.08]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}

// ======================================
// Visual Components
// ======================================

// (previous cursor + texture + glow visuals removed; replaced by TechnicalGrid and RadialSpotlight)

// ======================================
// Hero Text Components
// ======================================

const HeroBadge = React.memo(function HeroBadge({
  shouldAnimate,
  isMobile,
}: {
  shouldAnimate: boolean;
  isMobile: boolean;
}): ReactElement {
  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={isMobile ? 'mb-6' : 'mb-8'}
    >
      <span
        className="inline-flex items-center gap-2.5 rounded-full border backdrop-blur-md px-4 py-2"
        style={{
          fontSize: isMobile ? '0.75rem' : '0.8125rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'rgba(0, 0, 0, 0.65)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full relative"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.3), 0 0 16px rgba(0, 0, 0, 0.15)',
          }}
        >
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          />
        </span>
        <span className="sr-only">Status: </span>
        Designer & Developer
      </span>
    </motion.div>
  );
});

const HeroHeading = React.memo(function HeroHeading({
  shouldAnimate,
  isMobile,
  isTablet,
}: {
  shouldAnimate: boolean;
  isMobile: boolean;
  isTablet: boolean;
}): ReactElement {
  const headingText = 'Interfaces With Intent';
  const words = headingText.split(' ');

  const getFontSize = (): string => {
    if (isMobile) return '2.5rem'; // 40px for mobile
    if (isTablet) return '4rem'; // 64px for tablet
    return '5rem'; // 80px for desktop
  };

  const getLineHeight = (): string => {
    if (isMobile) return '2.375rem'; // 38px for mobile
    if (isTablet) return '3.75rem'; // 60px for tablet
    return '4.75rem'; // 76px for desktop
  };

  return (
    <h1 className="mb-6 text-center px-4">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-3 last:mr-0">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={shouldAnimate ? { opacity: 0, y: isMobile ? 10 : 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: wordIndex * 0.1 + charIndex * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: getFontSize(),
                fontWeight: 400,
                lineHeight: getLineHeight(),
                color: 'rgb(0, 0, 0)',
                letterSpacing: '-0.03em',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
});

const HeroSubheading = React.memo(function HeroSubheading({
  shouldAnimate,
  isMobile,
}: {
  shouldAnimate: boolean;
  isMobile: boolean;
}): ReactElement {
  return (
    <motion.p
      initial={shouldAnimate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`type-body mx-auto max-w-2xl leading-relaxed text-[color:var(--color-text-secondary)] ${isMobile ? 'text-sm px-2' : 'text-base'}`}
    >
      Design systems that scale, experiences that feel human, outcomes you can measure.
    </motion.p>
  );
});

const HeroCTA = React.memo(function HeroCTA({
  shouldAnimate,
  onExploreClick,
  isMobile,
}: {
  shouldAnimate: boolean;
  // eslint-disable-next-line no-unused-vars
  onExploreClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  isMobile: boolean;
}): ReactElement {
  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 flex flex-wrap items-center justify-center gap-4"
    >
      <motion.a
        href="#work"
        onClick={onExploreClick}
  className={`hero-cta inline-flex items-center justify-center rounded-full ${isMobile ? 'px-6 py-3 text-sm' : 'px-7 py-3.5 text-sm md:text-base'} font-medium text-inverse shadow-lg transition-transform duration-200 hover:-translate-y-0.5`}
        style={{
          backgroundImage:
            'linear-gradient(90deg, color-mix(in oklab, var(--accent) 80%, var(--color-neutral-0) 10%), var(--accent))',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Explore the work
        <ChevronRight className="ml-2 w-4 h-4" />
      </motion.a>
      <motion.a
        href="/resume"
  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-surface-70 backdrop-blur-sm px-5 py-3 text-sm font-medium text-neutral-800 transition-colors hover:bg-surface md:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        View résumé
      </motion.a>
    </motion.div>
  );
});

// ======================================
// Main Hero Text Component
// ======================================

type HeroTextProps = {
  isMobile: boolean;
  isTablet: boolean;
  shouldAnimate: boolean;
};

const HeroText = React.memo(function HeroText({
  isMobile,
  isTablet,
  shouldAnimate,
}: HeroTextProps): ReactElement {
  const handleExploreClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = '#work';
    }
  }, []);

  return (
    <div className="w-full text-center">
      <HeroBadge shouldAnimate={shouldAnimate} isMobile={isMobile} />
      <HeroHeading
        shouldAnimate={shouldAnimate}
        isMobile={isMobile}
        isTablet={isTablet}
      />
      <HeroSubheading shouldAnimate={shouldAnimate} isMobile={isMobile} />
      <HeroCTA
        shouldAnimate={shouldAnimate}
        onExploreClick={handleExploreClick}
        isMobile={isMobile}
      />
    </div>
  );
});

HeroText.displayName = 'HeroText';

// ======================================
// Hero Section
// ======================================

export function Hero(): ReactElement {
  const reduceMotion = useReducedMotion();
  const { isMobile, isTablet } = useDeviceSize();

  const shouldAnimate = !reduceMotion;

  const getMinHeight = (): string => {
    if (isMobile) return 'calc(100vh - 4rem)';
    return '800px';
  };

  const getPaddingTop = (): string => {
    if (isMobile) return 'calc(env(safe-area-inset-top) + 5rem)';
    return '0';
  };

  return (
    <div
      id="home"
      aria-label="Hero section"
      className="relative isolate overflow-hidden"
      style={{
        minHeight: getMinHeight(),
        paddingTop: getPaddingTop(),
      }}
    >
      {/* Background layers */}
      <BackgroundGradient />
      <TechnicalGrid />
      <RadialSpotlight />

      {/* Content container */}
  <div className="relative z-20 page-shell h-full flex items-center justify-center">
        <div className="relative z-30 flex flex-col items-center w-full">
          <HeroText
            isMobile={isMobile}
            isTablet={isTablet}
            shouldAnimate={shouldAnimate}
          />
        </div>
      </div>
  </div>
  );
}

export default Hero;
