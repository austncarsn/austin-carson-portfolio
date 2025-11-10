import React, { memo, useEffect, useMemo, useRef, useState, KeyboardEvent, ForwardedRef } from "react";
import type { JSX } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, ExternalLink, Github, X } from "lucide-react";

/*************************************************************
 * Project Cards Scroll FX
 * -----------------------------------------------------------
 * What you get in this file:
 * 1) <ProjectCard/> — your original flip card, ref-enabled & SSR-safe
 * 2) <ProjectReel/> — horizontal scroll area with snap + per-card
 *    scroll-linked transforms (scale, lift, subtle 3D tilt)
 * 3) <ScrollGradientMask/> — optional edge mask to hint scroll affordance
 * 4) Minimal CSS helpers embedded via style tag for no-scrollbar
 *
 * Drop-in usage:
 *   <ProjectReel projects={projectsArray} />
 *
 * Notes:
 * - Uses motion/react (Framer Motion v11) hooks only; no external libs
 * - Honors prefers-reduced-motion
 * - Keeps your keyboard/a11y behaviors
 *************************************************************/

// -----------------------------
// Types
// -----------------------------
export type ProjectCardProps = {
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
};

// -----------------------------
// Utils
// -----------------------------
function assignRefs<T>(...refs: (ForwardedRef<T> | null | undefined)[]) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(value);
      else (ref as React.MutableRefObject<T | null>).current = value;
    }
  };
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const l = (): void => setReduced(mq.matches);
    l();
    mq.addEventListener?.("change", l);
    return () => mq.removeEventListener?.("change", l);
  }, []);
  return reduced;
}

// -----------------------------
// ProjectCard (ref-enabled)
// -----------------------------
export const ProjectCard = memo(
  React.forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard(
    {
      id,
      title,
      category,
      year,
      role,
      description,
      liveUrl,
      githubUrl,
      previewImage,
    },
    forwardedRef
  ) {
    const [flipped, setFlipped] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const localRef = useRef<HTMLElement>(null);
    const reduceMotion = usePrefersReducedMotion();

    // Basic in-view observer to fade in once
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

    const handleFlip = (): void => setFlipped(true);
    const handleClose = (): void => setFlipped(false);

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!flipped) handleFlip();
      }
      if (e.key === "Escape" && flipped) handleClose();
    };

    // Focus first actionable element when flipped
    useEffect(() => {
      if (flipped && localRef.current) {
        const firstLink = localRef.current.querySelector(
          ".card-back a, .card-back button"
        ) as HTMLElement | null;
        firstLink?.focus();
      }
    }, [flipped]);

    return (
      <article
        ref={assignRefs(localRef, forwardedRef)}
        className="group relative"
        style={{ perspective: "1200px" }}
        data-state={flipped ? "back" : "front"}
        onKeyDown={handleKeyDown}
      >
        <div
          className="card relative h-[420px] sm:h-[480px] rounded-[24px] transition-transform duration-500 will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped && !reduceMotion ? "rotateY(180deg)" : "none",
            opacity: hasBeenInView ? 1 : 0,
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          {/* FRONT */}
          <button
            type="button"
            onClick={handleFlip}
            aria-label={`Open details for ${title}`}
            aria-hidden={flipped}
            tabIndex={flipped ? -1 : 0}
            className="card-front absolute inset-0 overflow-hidden rounded-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_16px_50px_rgba(0,0,0,0.45)] active:translate-y-[-1px]"
            style={{ backfaceVisibility: "hidden" }}
          >
            {previewImage && (
              <img
                src={previewImage}
                alt={`${title} preview`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                width={640}
                height={420}
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.58), rgba(0,0,0,0) 62%)",
              }}
            />
            <div className="absolute left-5 bottom-5 right-5 max-w-[70%]">
              <h3
                className="text-white text-2xl sm:text-3xl font-bold leading-tight drop-shadow-lg line-clamp-2"
                style={{ letterSpacing: "-0.5px" }}
              >
                {title}
              </h3>
            </div>
          </button>

          {/* BACK */}
          <div
            className="card-back absolute inset-0 rounded-[24px] bg-[var(--surface)] text-[var(--text)] p-6 sm:p-7 flex flex-col justify-between overflow-y-auto"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            aria-hidden={!flipped}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close details"
              tabIndex={flipped ? 0 : -1}
              className="absolute top-4 right-4 p-2 text-[var(--muted)] hover:text-[var(--text)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 pr-8">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                {category} • {year}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">{title}</h3>
              {role && (
                <p className="text-sm text-[var(--muted)]">
                  <span className="font-medium">Role:</span> {role}
                </p>
              )}
              <p className="text-[var(--muted)] leading-relaxed">{description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              {id && (
                <Link
                  to={`/project/${id}`}
                  tabIndex={flipped ? 0 : -1}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {liveUrl && liveUrl !== "#" && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={flipped ? 0 : -1}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Live Demo
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {githubUrl && githubUrl !== "#" && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={flipped ? 0 : -1}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  Repo
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  })
);

// -----------------------------
// CardScrollItem — per-card scroll FX
// -----------------------------
function CardScrollItem({
  children,
  container,
  index,
}: {
  children: React.ReactNode;
  container: React.RefObject<HTMLElement>;
  index: number;
}): JSX.Element {
  const ref = useRef<HTMLLIElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Per-card scroll progress relative to the scroller container
  const { scrollXProgress } = useScroll({ target: container, axis: "x" });

  // Stagger each card's response slightly by index
  const start = Math.max(0, 0.05 * index);
  const end = Math.min(1, start + 0.6);

  const rawScale = useTransform(scrollXProgress, [start, end], [0.96, 1]);
  const rawY = useTransform(scrollXProgress, [start, end], [18, 0]);
  const rawTilt = useTransform(scrollXProgress, [start, end], [6, 0]);
  const rawShadow = useTransform(scrollXProgress, [start, end], [0.18, 0.35]);

  const scale = useSpring(rawScale, { stiffness: 220, damping: 28, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 220, damping: 28, mass: 0.3 });
  const tilt = useSpring(rawTilt, { stiffness: 220, damping: 28, mass: 0.3 });
  const shadowAlpha = useSpring(rawShadow, { stiffness: 220, damping: 28, mass: 0.3 });

  // Derive boxShadow string reactively using useTransform instead of .to()
  const boxShadow = useTransform(shadowAlpha, (a: number) => `0 16px 50px rgba(0,0,0,${a})`);

  const style = useMemo(() => {
    if (reduceMotion) return {} as React.CSSProperties;
    return {
      scale,
      y,
      rotateX: tilt,
      boxShadow,
      transformStyle: "preserve-3d" as const,
      willChange: "transform",
    } as any;
  }, [reduceMotion, scale, y, tilt, boxShadow]);

  return (
    <motion.li
      ref={ref}
      className="snap-start shrink-0 w-[84vw] sm:w-[520px]"
      style={style}
    >
      {children}
    </motion.li>
  );
}

// -----------------------------
// ScrollGradientMask — optional edge fade
// -----------------------------
function ScrollGradientMask(): JSX.Element {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 right-0"
      style={{
        maskImage:
          "linear-gradient(90deg, rgba(0,0,0,1) 6%, rgba(0,0,0,0) 16%), linear-gradient(90deg, rgba(0,0,0,0) 84%, rgba(0,0,0,1) 94%)",
        WebkitMaskComposite: "destination-in",
        maskComposite: "intersect",
      }}
    />
  );
}

// -----------------------------
// ProjectReel — horizontal scroller + snap + FX
// -----------------------------
export function ProjectReel({ projects, title }: { projects: ProjectCardProps[]; title?: string }): JSX.Element {
  const scrollerRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Global affordance: subtle background parallax as the reel scrolls
  const { scrollXProgress } = useScroll({ target: scrollerRef, axis: "x" });
  const bgX = useTransform(scrollXProgress, [0, 1], [0, -120]);
  const bgOpacity = useTransform(scrollXProgress, [0, 1], [0.25, 0.35]);

  return (
    <section className="relative py-14">
      {title && (
        <h2 className="px-6 sm:px-8 text-xl sm:text-2xl font-semibold tracking-tight mb-4">{title}</h2>
      )}

      {/* Background glow */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="absolute -z-10 top-0 left-0 right-0 h-[200%] blur-3xl"
          style={{
            background:
              "radial-gradient(600px 160px at 40% 20%, rgba(0,160,255,0.15), transparent 60%), radial-gradient(480px 140px at 80% 60%, rgba(255,64,0,0.12), transparent 60%)",
            x: bgX,
            opacity: bgOpacity,
          } as any}
        />
      )}

      <ScrollGradientMask />

      <motion.div
        ref={scrollerRef as any}
        className="relative overflow-x-auto overflow-y-visible snap-x snap-mandatory no-scrollbar px-6 sm:px-8"
        style={{
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "24px",
          scrollPaddingRight: "24px",
        }}
      >
        <ul className="flex gap-6 sm:gap-8 py-2">
          {projects.map((p, i) => (
            <CardScrollItem key={p.id ?? p.title} container={scrollerRef as any} index={i}>
              <ProjectCard {...p} />
            </CardScrollItem>
          ))}
        </ul>
      </motion.div>

      {/* Minimal CSS helpers */}
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

// -----------------------------
// Example data shape (remove in production)
// -----------------------------
// const demoProjects: ProjectCardProps[] = [
//   { id: '1', title: 'Cinematic Shop', category: 'Web', year: '2025', description: 'Ecomm with motion design.', previewImage: 'https://picsum.photos/seed/1/960/600' },
//   { id: '2', title: 'Heritage Atlas', category: 'Maps', year: '2025', description: 'Texas icon system & maps.', previewImage: 'https://picsum.photos/seed/2/960/600' },
//   { id: '3', title: 'Panda Pad', category: 'Product', year: '2025', description: 'Cute note app with tokens.', previewImage: 'https://picsum.photos/seed/3/960/600' },
// ];
// <ProjectReel projects={demoProjects} title="Selected Work" />
