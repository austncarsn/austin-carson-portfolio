import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { memo, useRef, useEffect } from 'react';

import { useInView } from '@/hooks/useInView';

export interface ProjectCardProps {
  id?: string;
  title: string;
  category: string;
  year: string;
  role?: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  subtitle?: string;
  order?: number;
  previewImage?: string;
}

/* ------------------- Sub‑components ------------------- */

const ProjectImage = ({ previewImage, title }: { previewImage?: string; title: string }) => (
  previewImage ? (
  <div className="mb-8 md:mb-0 md:-ml-12 md:w-60 md:h-60 overflow-hidden bg-transparent flex-shrink-0">
      {/* Plain background image — no overlay, no transitions or hover effects.
          Container has no border or different background so the preview blends
          seamlessly with the project card surface. */}
      <img
        aria-hidden
        src={previewImage}
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
        className="w-full h-48 md:h-60 object-cover object-center block rounded-l-md"
        style={{ filter: 'saturate(0.98) contrast(1.03)' }}
      />
    </div>
  ) : null
);

const CategoryYear = ({ category, year }: { category: string; year: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-satoshi font-semibold text-xs tracking-wider uppercase text-text-muted">
      {category}
    </span>
    <div className="w-[3px] h-[3px] bg-neutral-500 rounded-full" />
    <span className="font-satoshi font-medium text-xs tracking-wide uppercase text-text-subtle">
      {year}
    </span>
  </div>
);

const Title = ({ title }: { title: string }) => (
  <h3 className="font-satoshi font-bold text-h4 md:text-h3 lg:text-h2 leading-tight tracking-tight text-text-primary mb-6 transition-colors duration-500">
    {title}
  </h3>
);

// YearBadge removed — render card content full-width so components fit properly

const ActionButton = ({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'github';
}) => {
  const base =
    'group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-satoshi font-semibold text-sm tracking-wide px-7 py-4 rounded-md transition-all duration-base';

  const styles = {
    primary:
      `${base} bg-brand text-white hover:bg-[var(--brand-hover)] hover:gap-3 hover:shadow-lg`,
    secondary:
      `${base} border-2 border-neutral-300 text-text-primary hover:border-neutral-400 hover:text-text-primary hover:bg-transparent hover:shadow-md`,
    github:
      `${base} bg-brand-700 text-white border border-brand-700 hover:bg-[var(--brand-hover)]`,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles[variant]}
      style={{ WebkitFontSmoothing: 'antialiased' }}
    >
      {children}
    </a>
  );
};

/* ------------------- Main component ------------------- */

export const ProjectCard = memo(function ProjectCard({
  id,
  title,
  category,
  year,
  role,
  description,
  subtitle,
  liveUrl,
  githubUrl,
  previewImage,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { threshold: 0.3, rootMargin: '-50px 0px' });
  // mouse-tracking glow removed for a cleaner hover

  // We'll compute a smooth per-card parallax using requestAnimationFrame and
  // a passive scroll listener. We avoid React state for the transform so the
  // update stays off the React render path for performance.
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;
    const maxOffset = 24; // px of maximum translate

    function update() {
      rafRef.current = null;
      if (!el) return;

      // If not in view, set a small offset and skip expensive geometry when hidden
      if (!isInView) {
        offsetRef.current = maxOffset;
        el.style.transform = `translate3d(0, ${offsetRef.current}px, 0)`;
        return;
      }

      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const vpCenter = window.innerHeight / 2;
      const distance = elCenter - vpCenter;
      // Normalize distance to range [-1, 1] and scale by maxOffset
      const normalized = Math.max(-1, Math.min(1, distance / (window.innerHeight / 1.2)));
      const target = normalized * maxOffset;

      // Lerp from previous offset toward target for smooth easing
      const prev = offsetRef.current || 0;
      const ease = 0.12; // lower => smoother/slower interpolation
      const next = prev + (target - prev) * ease;
      offsetRef.current = next;

      // Apply transform directly to the element — inexpensive and avoids rerenders
      el.style.transform = `translate3d(0, ${next}px, 0)`;
    }

    function onScroll() {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    }

    // Kick off initial position
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isInView]);

  // No dynamic border glow — keep decorations subtle and static

  return (
    <article
      ref={cardRef}
      className="group relative bg-canvas text-text-primary border border-neutral-200/30 rounded-md overflow-hidden transition-all duration-slower ease-smooth hover:border-neutral-300/40 shadow-sm"
      style={{ willChange: 'transform, opacity', opacity: isInView ? 1 : 0 }}
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none project-card-grid" />

      {/* Decorative top-right soft glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 opacity-[0.035] rounded-full blur-3xl transition-all duration-700"
        style={{
          background: isInView ? 'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.12), rgba(0,0,0,0) 60%)' : 'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%)',
          transform: isInView ? 'translate(2rem, -2rem)' : 'translate(4rem, -4rem)',
        }}
      />

      {/* Main content: image-led. On small screens image is full-bleed at top; on md+ we render an absolute side image that is flush with the card edge. */}
      {/* Side image for md+ — positioned against the card edge */}
      {previewImage && (
        <div className="hidden md:block absolute inset-y-0 left-0 w-64 z-0">
          {/* 1px canvas wrapper to create a subtle border that matches the card */}
          <div className="h-full p-[2px] bg-canvas rounded-l-lg overflow-hidden">
            {/* Inner image uses slightly smaller radius to show inner curvature */}
            <img
              src={previewImage}
              alt={`${title} preview`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center block rounded-l-md"
              style={{ filter: 'saturate(0.98) contrast(1.03)' }}
            />
          </div>

          {/* On-image chips for md+ */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="bg-white/80 text-text-primary text-[11px] font-satoshi font-semibold uppercase tracking-wider px-2 py-1 rounded">{category}</span>
            <span className="bg-white/80 text-text-primary text-[11px] font-satoshi font-medium px-2 py-1 rounded">{year}</span>
          </div>
        </div>
      )}

      <div className="relative p-6 md:p-12">
        <div className="md:flex md:items-start md:gap-8">
          {/* Mobile stacked image (keeps CLS low) — hidden on md+ */}
          {previewImage && (
            <div className="block md:hidden mb-6">
              {/* mobile: thin border via 1px canvas wrapper, rounded to match card */}
              <div className="w-full h-48 p-[2px] bg-canvas rounded-lg overflow-hidden">
                {/* mobile inner curvature: inner img slightly less rounded */}
                <img
                  src={previewImage}
                  alt={`${title} preview`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center block rounded-md"
                  style={{ filter: 'saturate(0.98) contrast(1.03)' }}
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="bg-white/80 text-text-primary text-[11px] font-satoshi font-semibold uppercase tracking-wider px-2 py-1 rounded">{category}</span>
                <span className="bg-white/80 text-text-primary text-[11px] font-satoshi font-medium px-2 py-1 rounded">{year}</span>
              </div>
            </div>
          )}

          {/* Content column */}
          <div className="flex-1 mb-6 md:pl-[calc(16rem+3rem)] relative z-10">
            <CategoryYear category={category} year={year} />

            {role && (
              <div className="mb-4">
                <span className="font-satoshi font-normal text-sm text-text-muted">{role}</span>
              </div>
            )}

            <Title title={title} />

            {subtitle && (
              <p className="font-satoshi font-normal text-body-sm leading-relaxed text-text-secondary max-w-[680px] mb-4">
                {subtitle}
              </p>
            )}

            <p className="font-satoshi font-normal text-base leading-relaxed text-text-muted max-w-[680px]">
              {description}
            </p>
          </div>

          {/* Year badge intentionally removed to allow content to use the full card width */}
        </div>

        {/* Divider Line */}
          <div className="relative h-[2px] bg-neutral-300/12 my-6 rounded-full">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 origin-left"
            style={{
              width: '140px',
              background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0))',
              transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />
        </div>

        {/* Action Buttons */}
        {/* Mobile / small screens: keep buttons inline under content to preserve stacking */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3 mt-4 z-10 md:hidden">
          {id && (
            <Link
              to={`/project/${id}`}
              className="group/btn inline-flex w-full sm:w-auto justify-center items-center gap-2 font-satoshi font-semibold text-sm tracking-wide px-7 py-4 bg-brand text-white rounded-md transition-all duration-base hover:bg-[var(--brand-hover)] hover:gap-3 hover:shadow-lg"
              style={{ WebkitFontSmoothing: 'antialiased' }}
            >
              VIEW DETAILS
              <ArrowRight className="w-4 h-4 transition-transform duration-base group-hover/btn:translate-x-0.5" />
            </Link>
          )}

          {liveUrl && liveUrl !== '#' && (
            <ActionButton href={liveUrl} variant="secondary">
              LIVE DEMO
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-base group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </ActionButton>
          )}

          {githubUrl && githubUrl !== '#' && (
            <ActionButton href={githubUrl} variant="github">
              <Github className="w-4 h-4 transition-transform duration-base group-hover/btn:rotate-12" />
              GITHUB
            </ActionButton>
          )}
        </div>

        {/* Desktop / md+: absolute bottom-right action row — same markup but horizontal and anchored to card bottom-right. */}
        <div className="hidden md:flex flex-row items-center gap-3 z-20 absolute right-6 bottom-6">
          {id && (
            <Link
              to={`/project/${id}`}
              className="group/btn inline-flex w-auto justify-center items-center gap-2 font-satoshi font-semibold text-sm tracking-wide px-6 py-3 bg-brand text-white rounded-md transition-all duration-base hover:bg-[var(--brand-hover)] hover:gap-3 hover:shadow-lg"
              style={{ WebkitFontSmoothing: 'antialiased' }}
            >
              VIEW DETAILS
              <ArrowRight className="w-4 h-4 transition-transform duration-base group-hover/btn:translate-x-0.5" />
            </Link>
          )}

          {liveUrl && liveUrl !== '#' && (
            <ActionButton href={liveUrl} variant="secondary">
              LIVE DEMO
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-base group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </ActionButton>
          )}

          {githubUrl && githubUrl !== '#' && (
            <ActionButton href={githubUrl} variant="github">
              <Github className="w-4 h-4 transition-transform duration-base group-hover/btn:rotate-12" />
              GITHUB
            </ActionButton>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-700 origin-right"
        style={{
          background: 'linear-gradient(to left, rgba(0,0,0,0.06), rgba(0,0,0,0))',
          transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </article>
  );
});