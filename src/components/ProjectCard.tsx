import React, { memo, useEffect, useMemo, useRef, useState, ForwardedRef } from 'react';
import type { JSX } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ImageWithFallback } from './common/media/ImageWithFallback';

/*************************************************************
 * Project cards with horizontal scroll FX
 *
 * Usage:
 *   <ProjectReel projects={projectsArray} />
 *************************************************************/

// Types
export type ProjectCardProps = Readonly<{
  id?: string;
  title: string;
  category: string;
  year: string;
  role?: string;
  description: string;
  subtitle?: string;
  liveUrl?: string;
  githubUrl?: string;
  previewImage?: string;
  ratio?: '4:5' | '16:9' | '1:1';
  /** Optional override for CSS object-position (for example 'center top') */
  objectPosition?: string;
  /** Optional per project fit: 'cover' keeps full bleed, 'contain' shows entire image, 'auto' chooses */
  fit?: 'cover' | 'contain' | 'auto';
}>;

// Utils
function assignRefs<T>(...refs: (ForwardedRef<T> | null | undefined)[]) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(value);
      else (ref as React.MutableRefObject<T | null>).current = value;
    }
  };
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (): void => setReduced(mq.matches);
    listener();
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  }, []);
  return reduced;
}

// ProjectCard (no flip, just preview)
export const ProjectCard = memo(
  React.forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
    { title, previewImage, ratio, objectPosition, fit },
    forwardedRef
  ) {
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const localRef = useRef<HTMLElement>(null);

    const cardHeightClass =
      ratio === '4:5'
        ? 'h-[520px] sm:h-[600px]'
        : ratio === '1:1'
          ? 'h-[480px] sm:h-[520px]'
          : 'h-[380px] sm:h-[440px]';

    const imgObjectPosition = ratio === '4:5' ? 'center top' : 'center center';

    // aspectClass was used in the older layout; the new card uses a stable aspect-[16/10]

    // Fade in once when in view
    useEffect(() => {
      const node = localRef.current;
      if (!node || hasBeenInView) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setHasBeenInView(true);
              obs.disconnect();
              break;
            }
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(node);
      return () => obs.disconnect();
    }, [hasBeenInView]);

    return (
      <article ref={assignRefs(localRef, forwardedRef)} className="group relative">
        <div className={`transition-transform duration-500 will-change-transform ${cardHeightClass}`}>
          {previewImage ? (
            <div className="overflow-hidden rounded-3xl bg-surface shadow-soft">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <ImageWithFallback
                  src={previewImage}
                  alt={`${title} preview`}
                  className="h-full w-full object-cover"
                  fit={fit === 'auto' ? 'contain' : fit}
                  imgStyle={{ objectPosition: objectPosition || imgObjectPosition }}
                />
              </div>

              <div className="px-4 py-3">
                <h3 className="type-heading-l font-bold leading-tight line-clamp-2 text-default">
                  {title}
                </h3>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl bg-neutral-200 shadow-soft">
              <div className="aspect-[16/10] w-full" />
              <div className="px-4 py-6 text-center">
                <p className="text-sm font-medium text-neutral-600">No preview</p>
                <p className="mt-2 text-xs text-neutral-500">{title}</p>
              </div>
            </div>
          )}
        </div>
      </article>
    );
  })
);

// Per card scroll FX
function CardScrollItem({
  children,
  container,
  index,
}: {
  children: React.ReactNode;
  container: React.RefObject<HTMLElement>;
  index: number;
}): JSX.Element {
  const reduceMotion = usePrefersReducedMotion();

  const { scrollXProgress } = useScroll({ target: container, axis: 'x' });

  const start = Math.max(0, 0.05 * index);
  const end = Math.min(1, start + 0.6);

  const rawScale = useTransform(scrollXProgress, [start, end], [0.96, 1]);
  const rawY = useTransform(scrollXProgress, [start, end], [18, 0]);
  const rawTilt = useTransform(scrollXProgress, [start, end], [6, 0]);
  const rawShadow = useTransform(scrollXProgress, [start, end], [0.18, 0.35]);

  const scale = useSpring(rawScale, { stiffness: 220, damping: 28, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 220, damping: 28, mass: 0.3 });
  const tilt = useSpring(rawTilt, { stiffness: 220, damping: 28, mass: 0.3 });
  const shadowAlpha = useSpring(rawShadow, {
    stiffness: 220,
    damping: 28,
    mass: 0.3,
  });

  const boxShadow = useTransform(
    shadowAlpha,
    (a: number) => `0 16px 50px rgba(0,0,0,${a})`
  );

  const style = useMemo(() => {
    if (reduceMotion) return {} as React.CSSProperties;
    return {
      scale,
      y,
      rotateX: tilt,
      boxShadow,
      transformStyle: 'preserve-3d' as const,
      willChange: 'transform',
    } as React.CSSProperties & {
      scale: typeof scale;
      y: typeof y;
      rotateX: typeof tilt;
      boxShadow: typeof boxShadow;
    };
  }, [reduceMotion, scale, y, tilt, boxShadow]);

  return (
    <motion.li className="snap-start shrink-0 w-[84vw] sm:w-[520px]" style={style}>
      {children}
    </motion.li>
  );
}

// Edge fade
function ScrollGradientMask(): JSX.Element {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 right-0"
      style={{
        maskImage: 'var(--card-edge-fade)',
        WebkitMaskComposite: 'destination-in',
        maskComposite: 'intersect',
      }}
    />
  );
}

// Project reel
export function ProjectReel({
  projects,
  title,
}: {
  projects: readonly ProjectCardProps[];
  title?: string;
}): JSX.Element {
  const scrollerRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const { scrollXProgress } = useScroll({ target: scrollerRef, axis: 'x' });
  const bgX = useTransform(scrollXProgress, [0, 1], [0, -120]);
  const bgOpacity = useTransform(scrollXProgress, [0, 1], [0.25, 0.35]);

  return (
    <section className="relative py-14">
      {title && (
        <h2 className="px-6 sm:px-8 type-display-xl font-semibold tracking-tight mb-4">
          {title}
        </h2>
      )}

      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="absolute -z-10 top-0 left-0 right-0 h-[200%] blur-3xl"
          style={
            {
              background: 'var(--reel-bg-radials)',
              x: bgX,
              opacity: bgOpacity,
            } as React.CSSProperties & {
              x: typeof bgX;
              opacity: typeof bgOpacity;
            }
          }
        />
      )}

      <ScrollGradientMask />

      <motion.div
        ref={scrollerRef as React.RefObject<HTMLDivElement>}
        className="relative overflow-x-auto overflow-y-visible snap-x snap-mandatory no-scrollbar px-6 sm:px-8"
        style={{
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '24px',
          scrollPaddingRight: '24px',
        }}
      >
        <ul className="flex gap-6 sm:gap-8 py-2">
          {projects.map((p, i) => (
            <CardScrollItem
              key={p.id ?? p.title}
              container={scrollerRef as React.RefObject<HTMLDivElement>}
              index={i}
            >
              <ProjectCard {...p} />
            </CardScrollItem>
          ))}
        </ul>
      </motion.div>

      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
