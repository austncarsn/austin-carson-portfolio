import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { memo, useRef, useState } from 'react';

import { useInView } from '@/hooks/useInView';
import { useMousePosition } from '@/hooks/useMousePosition';

interface ProjectCardProps {
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
    <div className="mb-8 md:mb-0 md:mr-10 md:float-left md:w-60 md:h-60 overflow-hidden rounded-sm border border-structure">
      <img
        src={previewImage}
        alt={`${title} preview`}
        className="w-full h-48 md:h-60 object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  ) : null
);

const CategoryYear = ({ category, year }: { category: string; year: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-satoshi font-semibold text-xs tracking-wider uppercase text-brand">
      {category}
    </span>
    <div className="w-[3px] h-[3px] bg-brand/40 rounded-full" />
    <span className="font-satoshi font-medium text-xs tracking-wide uppercase text-text-muted">
      {year}
    </span>
  </div>
);

const Title = ({ title }: { title: string }) => (
  <h3 className="font-satoshi font-bold text-h4 md:text-h3 lg:text-h2 leading-tight tracking-tight text-text-primary mb-6 transition-colors duration-500 group-hover:text-brand">
    {title}
  </h3>
);

const YearBadge = ({ year }: { year: string }) => (
  <div className="hidden md:flex items-center justify-center w-28 h-28 rounded-sm border-2 border-structure bg-surface transition-all duration-500 group-hover:border-brand group-hover:bg-slate-800">
    <span className="font-satoshi text-body-lg font-semibold text-text-primary tracking-tight group-hover:text-brand">
      '{year.slice(-2)}
    </span>
  </div>
);

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
      `${base} bg-dark text-text-on-dark hover:bg-brand hover:gap-3 hover:shadow-lg hover:shadow-brand/30`,
    secondary:
      `${base} border-2 border-structure text-text-muted hover:border-brand hover:text-text-primary hover:bg-elevated hover:shadow-md hover:shadow-brand/20`,
    github:
      `${base} border-2 border-structure text-text-muted hover:border-dark hover:text-text-primary hover:bg-elevated hover:shadow-md`,
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
  const { x, y } = useMousePosition(cardRef);
  const [isHovered, setIsHovered] = useState(false);

  const parallaxTransform = isInView
    ? 'translate3d(0, 0, 0) scale(1)'
    : 'translate3d(0, 60px, 0) scale(0.95)';

  const glowOpacity = isHovered ? 0.15 : 0;
  const borderGlow = `radial-gradient(600px circle at ${x}% ${y}%, rgba(99, 102, 241, ${glowOpacity}), transparent 40%)`;

  return (
    <article
      ref={cardRef}
      className="group relative bg-paper border border-slate-700/50 rounded-md overflow-hidden transition-all duration-700 hover:border-brand/40"
      style={{ willChange: 'transform, opacity', transform: parallaxTransform, opacity: isInView ? 1 : 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse‑tracking border glow */}
      <div
        className="absolute inset-0 opacity-100 pointer-events-none rounded-md transition-opacity duration-300"
        style={{ background: borderGlow, mixBlendMode: 'screen' }}
      />

      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none project-card-grid" />

      {/* Left accent border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand to-accent transition-all duration-700 origin-top"
        style={{ transform: isInView ? 'scaleY(1)' : 'scaleY(0)' }}
      />

      {/* Top corner decorative element */}
      <div
        className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-brand-400 to-accent-400 opacity-[0.025] rounded-full blur-3xl transition-all duration-700"
        style={{
          transform: isInView ? 'translate(2rem, -2rem)' : 'translate(4rem, -4rem)',
        }}
      />

      <div className="relative p-10 md:p-16">
        <ProjectImage previewImage={previewImage} title={title} />

        <div className="flex items-start justify-between gap-6 mb-10">
          <div className="flex-1">
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

          <YearBadge year={year} />
        </div>

        {/* Divider Line */}
        <div className="relative h-[2px] bg-structure/50 my-10 rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand via-accent to-transparent rounded-full transition-all duration-700 origin-left"
            style={{
              width: '140px',
              transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {id && (
            <Link
              to={`/project/${id}`}
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-satoshi font-semibold text-sm tracking-wide px-7 py-4 bg-dark text-text-on-dark rounded-md transition-all duration-base hover:bg-brand hover:gap-3 hover:shadow-lg hover:shadow-brand/30"
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
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-brand via-accent to-transparent rounded-full transition-all duration-700 origin-right"
        style={{
          transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </article>
  );
});